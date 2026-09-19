import { LogEntry, PatternInsight } from '../types';

export interface CycleStats {
  periodStartDates: string[];
  cycleLengths: number[];
  averageCycleDays: number | null;
  bleedingDurationAvg: number;
  frequentSymptoms: Array<{ symptom: string; count: number }>;
  severePainOccurrences: number;
}

/**
 * Calculates cycle starts and statistics from logged entries
 */
export function analyzeCycleLogs(entries: LogEntry[]): CycleStats {
  if (!entries || entries.length === 0) {
    return {
      periodStartDates: [],
      cycleLengths: [],
      averageCycleDays: null,
      bleedingDurationAvg: 0,
      frequentSymptoms: [],
      severePainOccurrences: 0
    };
  }

  // Sort chronological
  const sorted = [...entries].sort((a, b) => a.timestamp - b.timestamp);

  // Identify period start dates (days with bleeding that are > 12 days after the previous period start)
  const periodStarts: string[] = [];
  let lastStartDate: Date | null = null;
  let bleedingDaysCount = 0;
  let periodsCount = 0;

  const bleedingEntries = sorted.filter(e => e.flow === 'light' || e.flow === 'medium' || e.flow === 'heavy');

  for (const entry of bleedingEntries) {
    const entryDate = new Date(entry.date);
    if (!lastStartDate || (entryDate.getTime() - lastStartDate.getTime()) > (14 * 86400000)) {
      periodStarts.push(entry.date);
      lastStartDate = entryDate;
      periodsCount++;
    }
  }

  // Calculate cycle lengths (days between consecutive period start dates)
  const cycleLengths: number[] = [];
  for (let i = 1; i < periodStarts.length; i++) {
    const prev = new Date(periodStarts[i - 1]);
    const curr = new Date(periodStarts[i]);
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays >= 14 && diffDays <= 120) {
      cycleLengths.push(diffDays);
    }
  }

  const avgCycle = cycleLengths.length > 0
    ? Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length)
    : null;

  // Track symptoms frequency
  const symptomMap = new Map<string, number>();
  let severePainCount = 0;

  for (const entry of sorted) {
    if (entry.pain === 3) {
      severePainCount++;
    }
    for (const s of entry.symptoms) {
      symptomMap.set(s, (symptomMap.get(s) || 0) + 1);
    }
  }

  const frequentSymptoms = Array.from(symptomMap.entries())
    .map(([symptom, count]) => ({ symptom, count }))
    .sort((a, b) => b.count - a.count);

  return {
    periodStartDates: periodStarts,
    cycleLengths,
    averageCycleDays: avgCycle,
    bleedingDurationAvg: 4, // standard healthy average
    frequentSymptoms,
    severePainOccurrences: severePainCount
  };
}

/**
 * Evaluates cycles against adolescent health rules
 * STRICT GUARDRAIL: Never diagnose PCOS; only highlight patterns worth discussing with a doctor
 */
export function evaluatePattern(entries: LogEntry[]): PatternInsight {
  const stats = analyzeCycleLogs(entries);
  const recordedCycles = stats.cycleLengths.length;

  if (recordedCycles < 2) {
    return {
      status: 'insufficient_data',
      title: 'Building Your Rhythm Profile',
      badge: 'Gathering Data',
      summary: recordedCycles === 0
        ? 'Log your period days to uncover your body\'s natural cycle rhythm.'
        : 'Logged 1 cycle so far! Once you have logged 2 to 3 cycles, we can show you your rhythm pattern.',
      reassurance: 'Remember: it takes 2 to 3 years after your very first period for your brain and ovaries to establish a regular pace. Irregularity early on is completely normal.',
      actionAdvice: 'Keep logging for a few seconds on days you notice flow or symptoms.',
      averageCycleDays: stats.averageCycleDays || undefined,
      recordedCyclesCount: recordedCycles,
      flaggedReasons: []
    };
  }

  const flaggedReasons: string[] = [];
  let isIrregularLength = false;
  let isHighPain = stats.severePainOccurrences >= 2;

  // Rule 1: Cycles consistently outside 21–45 days
  const outsideNormCount = stats.cycleLengths.filter(len => len < 21 || len > 45).length;
  if (outsideNormCount >= 2 || (stats.averageCycleDays && (stats.averageCycleDays > 45 || stats.averageCycleDays < 21))) {
    isIrregularLength = true;
    flaggedReasons.push(`Cycle intervals averaged ${stats.averageCycleDays || 'varying'} days (healthy teen range is 21–45 days).`);
  }

  // Rule 2: Hormonal symptom clusters (e.g. acne, severe backache, or persistent cramps)
  const hasAcneRecurrence = stats.frequentSymptoms.some(s => s.symptom === 'acne' && s.count >= 2);
  const hasCrampRecurrence = stats.frequentSymptoms.some(s => s.symptom === 'cramps' && s.count >= 3);

  let hormonalCluster = false;
  if (isIrregularLength && (hasAcneRecurrence || isHighPain)) {
    hormonalCluster = true;
    if (hasAcneRecurrence) {
      flaggedReasons.push('Recurring skin/acne breakouts noted alongside longer cycle gaps.');
    }
    if (isHighPain) {
      flaggedReasons.push('Frequent intense discomfort (Level 3) logged during cycle starts.');
    }
  }

  // Generate gentle, non-diagnostic response
  if (hormonalCluster || isIrregularLength) {
    return {
      status: hormonalCluster ? 'hormonal_cluster' : 'irregular_gap',
      title: 'A Pattern Worth Discussing With a Doctor',
      badge: 'Doctor Discussion',
      summary: `Over your last ${recordedCycles + 1} logged periods, your cycle intervals have averaged ${stats.averageCycleDays || 'several'} days apart${hormonalCluster ? ', with a few recurring hormonal symptoms' : ''}.`,
      reassurance: 'Please don\'t feel scared or anxious! Teen bodies frequently have irregular rhythms as the brain and ovaries mature. A longer cycle gap simply means your body is taking its time releasing eggs. It is NOT a disease or emergency.',
      actionAdvice: 'Showing this tracker summary to a gynecologist or pediatrician is a wonderful step. They can check your hormone levels with simple tests and give you personalized comfort advice.',
      averageCycleDays: stats.averageCycleDays || undefined,
      recordedCyclesCount: recordedCycles,
      flaggedReasons
    };
  }

  if (isHighPain) {
    return {
      status: 'high_pain',
      title: 'Comfort Notice: High Cramp Frequency',
      badge: 'Pain Comfort Review',
      summary: 'You have logged severe cramps (Level 3) across multiple cycles.',
      reassurance: 'While cramps are very common, you should never have to suffer through intense pain that disrupts school or daily activities.',
      actionAdvice: 'Consider sharing this with a doctor or school nurse. There are effective, gentle treatments to manage cramps so you feel comfortable every month.',
      averageCycleDays: stats.averageCycleDays || undefined,
      recordedCyclesCount: recordedCycles,
      flaggedReasons: ['Consistent high cramp pain scores logged.']
    };
  }

  // Regular healthy teen rhythm
  return {
    status: 'regular',
    title: 'Your Body Has a Balanced Rhythm',
    badge: 'Healthy Rhythm',
    summary: `Your cycles are averaging around ${stats.averageCycleDays} days, which falls nicely within the healthy 21–45 day teen window.`,
    reassurance: 'Your hormones are currently doing a great job finding their groove. It\'s still okay if a stressful exam month or travel causes an occasional delay.',
    actionAdvice: 'Keep tracking to stay in tune with your body\'s natural changes!',
    averageCycleDays: stats.averageCycleDays || undefined,
    recordedCyclesCount: recordedCycles,
    flaggedReasons: []
  };
}
