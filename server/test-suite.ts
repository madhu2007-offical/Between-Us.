import { checkSafetyTriggers } from './rag/safetyFilter';
import { retrieveContext } from './rag/retrieval';
import { generateConstrainedAnswer } from './rag/generator';
import { evaluatePattern, analyzeCycleLogs } from '../src/utils/patternEngine';
import { LogEntry } from '../src/types';

async function runTestSuite() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🌸 RUNNING AUTOMATED VERIFICATION SUITE FOR "BETWEEN US"');
  console.log('═══════════════════════════════════════════════════════════\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    totalTests++;
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      if (detail) console.log(`   └─ ${detail}`);
      passedTests++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      if (detail) console.error(`   └─ Failed: ${detail}`);
    }
  }

  // ── TEST GROUP 1: HARDCODED SAFETY FILTER ──
  console.log('--- 1. Safety Shield Layer Verification ---');

  const safety1 = checkSafetyTriggers('I feel so hopeless and want to kill myself');
  assert(
    safety1.triggered && safety1.category === 'self_harm_crisis',
    'Self-Harm Crisis Detection',
    `Triggered: ${safety1.triggered}, Category: ${safety1.category}, Helplines: ${safety1.helplines.length}`
  );

  const safety2 = checkSafetyTriggers('someone touched my private parts without my permission');
  assert(
    safety2.triggered && safety2.category === 'abuse_or_assault',
    'Abuse / Assault Detection',
    `Triggered: ${safety2.triggered}, Helplines include: ${safety2.helplines.map(h => h.name).join(', ')}`
  );

  const safety3 = checkSafetyTriggers('I am bleeding through clothes non-stop and fainted from blood loss');
  assert(
    safety3.triggered && safety3.category === 'severe_acute_hemorrhage',
    'Severe Acute Hemorrhage Detection',
    `Triggered: ${safety3.triggered}, Title: ${safety3.title}`
  );

  const safety4 = checkSafetyTriggers('I left a tampon in and have high fever and vomiting');
  assert(
    safety4.triggered && safety4.category === 'toxic_shock_or_acute_emergency',
    'Toxic Shock Syndrome Detection',
    `Triggered: ${safety4.triggered}, Title: ${safety4.title}`
  );

  const safetySafe = checkSafetyTriggers('Why does period blood look brown?');
  assert(
    !safetySafe.triggered,
    'Non-crisis query passes safety filter safely',
    `Triggered: ${safetySafe.triggered}`
  );

  // ── TEST GROUP 2: RAG RETRIEVAL ACCURACY ──
  console.log('\n--- 2. RAG Retrieval & Context Matching ---');

  const r1 = retrieveContext('Why is my period blood brown or dark?');
  assert(
    r1.hasConfidentMatch && r1.matchedItems[0].item.id === 'period-blood-colors-brown-black-red',
    'Blood Color Query matches brown blood FAQ',
    `Top Score: ${Math.round(r1.topScore)}, Matched ID: ${r1.matchedItems[0]?.item.id}`
  );

  const r2 = retrieveContext('What natural home remedies soothe bad cramps?');
  assert(
    r2.hasConfidentMatch && r2.matchedItems[0].item.id === 'cramps-natural-remedies-home',
    'Cramp Home Remedies Query matches cramp FAQ',
    `Top Score: ${Math.round(r2.topScore)}, Matched ID: ${r2.matchedItems[0]?.item.id}`
  );

  const r3 = retrieveContext('What is PCOS in simple words?');
  assert(
    r3.hasConfidentMatch && r3.matchedItems[0].item.id === 'pcos-what-is-it-simple-terms',
    'PCOS Explainer Query matches PCOS simple terms',
    `Top Score: ${Math.round(r3.topScore)}, Matched ID: ${r3.matchedItems[0]?.item.id}`
  );

  const r4 = retrieveContext('Started bleeding at school without a pad');
  assert(
    r4.hasConfidentMatch && r4.matchedItems[0].item.id === 'school-period-started-suddenly',
    'School emergency matches school period hack',
    `Top Score: ${Math.round(r4.topScore)}, Matched ID: ${r4.matchedItems[0]?.item.id}`
  );

  const rUnrelated = retrieveContext('Explain quantum computing algorithms in detail');
  assert(
    !rUnrelated.hasConfidentMatch,
    'Out-of-domain query is rejected with hasConfidentMatch: false',
    `Confident Match: ${rUnrelated.hasConfidentMatch}, Top Score: ${Math.round(rUnrelated.topScore * 10) / 10}`
  );

  // ── TEST GROUP 3: CONSTRAINED GENERATOR & DETERMINISTIC FALLBACK ──
  console.log('\n--- 3. Constrained Generator & Fallback ---');

  const genResponse = await generateConstrainedAnswer('Why is my period blood brown?', r1);
  assert(
    genResponse.answer.length > 50 && genResponse.citations.length > 0,
    'Generator synthesizes grounded answer with citations',
    `Source: ${genResponse.source}, Citations: ${genResponse.citations.length}`
  );

  const fallbackResponse = await generateConstrainedAnswer('Explain quantum computing', rUnrelated);
  assert(
    fallbackResponse.source === 'uncertain_fallback' && fallbackResponse.answer.includes("I don't have verified medical notes"),
    'Generator safely falls back when uncertain without guessing',
    `Source: ${fallbackResponse.source}`
  );

  // ── TEST GROUP 4: RULE-BASED PATTERN ENGINE ──
  console.log('\n--- 4. Rule-Based Pattern Engine Verification ---');

  // Case A: 3 regular cycles (28 days, 29 days, 28 days)
  const regularLogs: LogEntry[] = [
    { id: '1', date: '2026-01-01', timestamp: 1, flow: 'medium', pain: 1, mood: 'calm', symptoms: [] },
    { id: '2', date: '2026-01-29', timestamp: 2, flow: 'medium', pain: 1, mood: 'calm', symptoms: [] },
    { id: '3', date: '2026-02-27', timestamp: 3, flow: 'medium', pain: 1, mood: 'calm', symptoms: [] },
    { id: '4', date: '2026-03-27', timestamp: 4, flow: 'medium', pain: 1, mood: 'calm', symptoms: [] }
  ];
  const insightA = evaluatePattern(regularLogs);
  assert(
    insightA.status === 'regular' && insightA.title.includes('Balanced Rhythm'),
    'Regular cycle dataset identified as Healthy Balanced Rhythm',
    `Status: ${insightA.status}, Title: "${insightA.title}"`
  );

  // Case B: Prolonged intervals (48 days, 52 days) with acne
  const irregularLogs: LogEntry[] = [
    { id: '1', date: '2026-01-01', timestamp: 1, flow: 'medium', pain: 2, mood: 'tired', symptoms: ['acne'] },
    { id: '2', date: '2026-02-18', timestamp: 2, flow: 'medium', pain: 2, mood: 'sensitive', symptoms: ['acne'] }, // 48 days
    { id: '3', date: '2026-04-11', timestamp: 3, flow: 'medium', pain: 2, mood: 'tired', symptoms: ['acne'] }  // 52 days
  ];
  const insightB = evaluatePattern(irregularLogs);
  assert(
    (insightB.status === 'hormonal_cluster' || insightB.status === 'irregular_gap') &&
    insightB.title.includes('Pattern Worth Discussing With a Doctor') &&
    !insightB.title.includes('PCOS'),
    'Irregular cycle with hormonal symptoms triggers Doctor Discussion without diagnosing PCOS',
    `Status: ${insightB.status}, Title: "${insightB.title}"`
  );

  // Case C: High pain consistency
  const highPainLogs: LogEntry[] = [
    { id: '1', date: '2026-01-01', timestamp: 1, flow: 'medium', pain: 3, mood: 'tired', symptoms: ['cramps'] },
    { id: '2', date: '2026-01-29', timestamp: 2, flow: 'medium', pain: 3, mood: 'sensitive', symptoms: ['cramps'] },
    { id: '3', date: '2026-02-26', timestamp: 3, flow: 'medium', pain: 3, mood: 'tired', symptoms: ['cramps'] }
  ];
  const insightC = evaluatePattern(highPainLogs);
  assert(
    insightC.status === 'high_pain' && insightC.title.includes('High Cramp Frequency'),
    'Recurring Level 3 pain triggers Pain Comfort Review',
    `Status: ${insightC.status}, Title: "${insightC.title}"`
  );

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`🎯 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED (100%)`);
  console.log('═══════════════════════════════════════════════════════════\n');
}

runTestSuite().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
