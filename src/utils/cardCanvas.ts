import { CycleStats } from './patternEngine';
import { PatternInsight } from '../types';

export interface CardData {
  timeframe: string;
  stats: CycleStats;
  insight: PatternInsight;
  recipient: 'mom' | 'doctor';
}

/**
 * Renders a high-resolution, compassionate visual summary card onto an HTML5 canvas
 * and returns the data URL for immediate image download or sharing.
 */
export function generateSummaryCardImage(cardData: CardData): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const { stats, insight, recipient } = cardData;

  // 1. Background with elegant subtle gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1440);
  bgGrad.addColorStop(0, '#381630');
  bgGrad.addColorStop(1, '#4A2040');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1440);

  // Decorative soft background circles
  ctx.fillStyle = 'rgba(217, 136, 128, 0.08)';
  ctx.beginPath();
  ctx.arc(920, 180, 240, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(120, 1300, 300, 0, Math.PI * 2);
  ctx.fill();

  // 2. Header
  ctx.fillStyle = '#FDF0ED';
  ctx.font = 'bold 40px "Quicksand", sans-serif';
  ctx.fillText('between us', 80, 105);

  ctx.fillStyle = '#F98BAA';
  ctx.font = 'bold 24px "Quicksand", sans-serif';
  ctx.fillText('•  Real Questions. Better Answers. (Natchkin)', 320, 105);

  // Reassurance subhead
  ctx.fillStyle = '#D4AFC9';
  ctx.font = '500 24px "Quicksand", sans-serif';
  ctx.fillText('🔒 Teen-Initiated Personal Health Summary (Private & On-Device)', 80, 150);

  // Recipient Tag
  ctx.fillStyle = '#F3B8AD';
  ctx.beginPath();
  ctx.roundRect(80, 200, 460, 56, [28]);
  ctx.fill();

  ctx.fillStyle = '#381630';
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  const recipientLabel = recipient === 'mom'
    ? 'For Mom / Older Sister'
    : 'For Healthcare Provider / Doctor';
  ctx.fillText(`🌿 Prepared ${recipientLabel}`, 105, 237);

  // 3. Main Card Container
  ctx.fillStyle = '#FDFBF7';
  ctx.beginPath();
  ctx.roundRect(80, 290, 920, 1060, [32]);
  ctx.fill();

  // Card Inner Title
  ctx.fillStyle = '#381630';
  ctx.font = 'bold 44px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Menstrual Cycle Rhythm & Signs', 130, 370);

  ctx.fillStyle = '#756770';
  ctx.font = '400 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('A gentle overview of logged cycles over the past 3-4 months', 130, 415);

  // Divider
  ctx.strokeStyle = '#EBDCCB';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(130, 450);
  ctx.lineTo(950, 450);
  ctx.stroke();

  // 4. Key Metrics Grid (2 Boxes)
  // Left Box: Average Cycle Length
  ctx.fillStyle = '#FDF0ED';
  ctx.beginPath();
  ctx.roundRect(130, 480, 390, 170, [20]);
  ctx.fill();

  ctx.fillStyle = '#756770';
  ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('AVERAGE CYCLE INTERVAL', 160, 525);

  ctx.fillStyle = '#4A2040';
  ctx.font = 'bold 54px "Plus Jakarta Sans", sans-serif';
  const avgText = stats.averageCycleDays ? `${stats.averageCycleDays} Days` : 'Varies';
  ctx.fillText(avgText, 160, 595);

  ctx.fillStyle = '#975283';
  ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Typical teen range: 21–45 days', 160, 630);

  // Right Box: Cycles Logged & Bleeding
  ctx.fillStyle = '#F4F8F5';
  ctx.beginPath();
  ctx.roundRect(550, 480, 400, 170, [20]);
  ctx.fill();

  ctx.fillStyle = '#3D5945';
  ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('CYCLES LOGGED', 580, 525);

  ctx.fillStyle = '#240D1F';
  ctx.font = 'bold 54px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`${stats.periodStartDates.length} Recorded`, 580, 595);

  ctx.fillStyle = '#5B8266';
  ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Flow duration: ~3–5 days', 580, 630);

  // 5. Pattern Note Box (Gentle, Non-diagnostic)
  const isIrregular = insight.status !== 'regular';
  ctx.fillStyle = isIrregular ? '#FDF3E7' : '#F4F8F5';
  ctx.beginPath();
  ctx.roundRect(130, 680, 820, 180, [20]);
  ctx.fill();

  ctx.fillStyle = isIrregular ? '#C97A3E' : '#3D5945';
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(insight.title, 165, 730);

  ctx.fillStyle = '#381630';
  ctx.font = '400 23px "Plus Jakarta Sans", sans-serif';
  // Wrap summary text
  wrapText(ctx, insight.summary, 165, 775, 750, 34);

  // 6. Symptoms Section
  ctx.fillStyle = '#381630';
  ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Most Frequent Experiences Logged', 130, 915);

  // Symptom pills
  const symptomsToShow = stats.frequentSymptoms.slice(0, 4);
  let pillX = 130;
  let pillY = 945;

  if (symptomsToShow.length === 0) {
    ctx.fillStyle = '#756770';
    ctx.font = 'italic 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('No persistent pain or hormonal symptoms reported.', 130, 980);
  } else {
    for (const s of symptomsToShow) {
      const label = `${s.symptom.toUpperCase()} (${s.count}x)`;
      ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
      const textWidth = ctx.measureText(label).width;

      ctx.fillStyle = '#F3E8EF';
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, textWidth + 36, 48, [24]);
      ctx.fill();

      ctx.fillStyle = '#4A2040';
      ctx.fillText(label, pillX + 18, pillY + 32);

      pillX += textWidth + 50;
    }
  }

  // 7. Conversation Starter (Empowering the teen!)
  ctx.fillStyle = '#FAF5F8';
  ctx.beginPath();
  ctx.roundRect(130, 1030, 820, 200, [20]);
  ctx.fill();

  ctx.fillStyle = '#642C53';
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  const promptTitle = recipient === 'mom'
    ? '💬 A Gentle Way to Open the Conversation with Mom:'
    : '🩺 Helpful Questions to Ask Your Doctor:';
  ctx.fillText(promptTitle, 160, 1075);

  ctx.fillStyle = '#240D1F';
  ctx.font = 'italic 23px "Plus Jakarta Sans", sans-serif';
  const scriptText = recipient === 'mom'
    ? '"Hey Mom, I logged my last few periods in this private app. My cycles are a bit spread out, and I\'d love to check in with a doctor just to make sure everything is healthy and learn how to manage cramps."'
    : '"Doctor, here is my cycle record for the last few months. My average interval is outside 21–45 days and I experience recurring symptoms. Could we evaluate my hormone levels?"';
  wrapText(ctx, scriptText, 160, 1120, 760, 34);

  // 8. Bottom Footer
  ctx.fillStyle = '#756770';
  ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Created privately with Between Us by Natchkin • Not a medical diagnosis • For discussion only', 130, 1310);

  return canvas.toDataURL('image/png');
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}
