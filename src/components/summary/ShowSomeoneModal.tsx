import React, { useState } from 'react';
import {
  X,
  Download,
  Share2,
  Copy,
  Check,
  Smartphone,
  Sparkles,
  HeartHandshake,
  Stethoscope,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateSummaryCardImage } from '../../utils/cardCanvas';

export const ShowSomeoneModal: React.FC = () => {
  const { showSomeoneOpen, setShowSomeoneOpen, stats, patternInsight } = useApp();
  const [recipient, setRecipient] = useState<'mom' | 'doctor'>('mom');
  const [copied, setCopied] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!showSomeoneOpen) return null;

  const handleDownloadImage = () => {
    const dataUrl = generateSummaryCardImage({
      timeframe: 'Past 3–4 Months',
      stats,
      insight: patternInsight,
      recipient
    });

    if (!dataUrl) return;

    const link = document.createElement('a');
    link.download = `BetweenUs-Health-Summary-${recipient}.png`;
    link.href = dataUrl;
    link.click();
  };

  const scriptText = recipient === 'mom'
    ? "Hey Mom, I've been keeping track of my periods on this private app over the last few months. My cycles have had some longer gaps (around " + (stats.averageCycleDays || '45+') + " days) and I've noticed a few symptoms. Can we visit a doctor together just to make sure everything is healthy and learn how to manage cramps?"
    : "Doctor, here is my cycle record for the last few months. My average cycle length is " + (stats.averageCycleDays ? `${stats.averageCycleDays} days` : 'irregular') + ", and I frequently experience " + (stats.frequentSymptoms.map(s => s.symptom).join(', ') || 'cramps') + ". Could we check my hormone levels and discuss ways to manage this?";

  const handleCopyText = () => {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-plum-950/70 backdrop-blur-md flex items-center justify-center p-3 overflow-y-auto">
      <div className={`bg-[#FDFBF8] border border-blush-100 rounded-[32px] w-full shadow-modal transition-all my-auto font-sans ${
        isFullScreen ? 'max-w-md h-[94vh] flex flex-col p-4' : 'max-w-md p-5 space-y-4 max-h-[90vh] overflow-y-auto'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-blush-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blush-100 text-blush-600 flex items-center justify-center text-base">
              💌
            </div>
            <div>
              <h3 className="font-bold font-serif text-base text-plum-950">
                Show Someone Summary Card
              </h3>
              <div className="flex items-center space-x-1 text-[10px] text-sage-700 font-bold">
                <ShieldCheck size={11} className="text-sage-600" />
                <span>Explicit Teen-Initiated • Never Auto-Sent</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSomeoneOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-plum-500 hover:bg-cream-100 active:scale-95"
            aria-label="Close summary card"
          >
            <X size={18} />
          </button>
        </div>

        {/* Audience Selector */}
        <div className="grid grid-cols-2 gap-2 bg-cream-100/70 p-1 rounded-2xl border border-cream-200">
          <button
            onClick={() => setRecipient('mom')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
              recipient === 'mom'
                ? 'bg-plum-800 text-cream-50 shadow-sm'
                : 'text-plum-700 hover:text-plum-900'
            }`}
          >
            <span>🌸 For Mom / Sister</span>
          </button>

          <button
            onClick={() => setRecipient('doctor')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
              recipient === 'doctor'
                ? 'bg-plum-800 text-cream-50 shadow-sm'
                : 'text-plum-700 hover:text-plum-900'
            }`}
          >
            <Stethoscope size={14} />
            <span>For Doctor / Clinic</span>
          </button>
        </div>

        {/* VISUAL SUMMARY CARD PREVIEW */}
        <div className="bg-white border-2 border-plum-200/80 rounded-3xl p-4 shadow-float space-y-3 relative overflow-hidden">
          {/* Top card banner */}
          <div className="flex items-center justify-between pb-2 border-b border-cream-100">
            <div>
              <span className="text-[10px] font-extrabold text-dustyrose-600 uppercase tracking-wider">
                Between Us • Personal Record
              </span>
              <h4 className="font-extrabold text-sm text-plum-950">
                {recipient === 'mom' ? 'Cycle Summary for Mom' : 'Clinical Rhythm Summary'}
              </h4>
            </div>
            <span className="text-[10px] font-semibold bg-cream-100 text-plum-700 px-2 py-0.5 rounded-full border border-cream-200">
              Past 3–4 Months
            </span>
          </div>

          {/* Metrics 2-Col */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-dustyrose-50/70 border border-dustyrose-200/60 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-dustyrose-700 block">
                Avg Cycle Interval
              </span>
              <span className="text-xl font-extrabold text-plum-950 block mt-0.5">
                {stats.averageCycleDays ? `${stats.averageCycleDays} Days` : 'Variable'}
              </span>
              <span className="text-[10px] text-plum-600 block mt-0.5">
                Normal teen range: 21–45d
              </span>
            </div>

            <div className="p-2.5 bg-sage-50/70 border border-sage-200/60 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sage-700 block">
                Cycles Recorded
              </span>
              <span className="text-xl font-extrabold text-plum-950 block mt-0.5">
                {stats.periodStartDates.length} Cycles
              </span>
              <span className="text-[10px] text-sage-800 block mt-0.5">
                Flow duration: ~3–5 days
              </span>
            </div>
          </div>

          {/* Pattern Notice */}
          <div className={`p-3 rounded-2xl border text-xs leading-relaxed ${
            patternInsight.status !== 'regular'
              ? 'bg-amber-50/80 border-amber-200 text-amber-950'
              : 'bg-cream-50 border-cream-200 text-plum-900'
          }`}>
            <span className="font-bold block mb-0.5">
              📌 {patternInsight.title}
            </span>
            <p className="text-[11px] text-plum-800">
              {patternInsight.summary}
            </p>
          </div>

          {/* Frequent Symptoms */}
          {stats.frequentSymptoms.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-plum-600 block">
                Logged Symptoms:
              </span>
              <div className="flex flex-wrap gap-1">
                {stats.frequentSymptoms.slice(0, 4).map(s => (
                  <span
                    key={s.symptom}
                    className="text-[10px] font-semibold bg-plum-50 text-plum-900 px-2 py-0.5 rounded-md capitalize border border-plum-100"
                  >
                    {s.symptom} ({s.count}x)
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Conversation Starter Script */}
          <div className="p-3 bg-cream-50 border border-cream-200 rounded-2xl space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-plum-700 block">
              💬 How to say it without feeling awkward:
            </span>
            <p className="text-xs text-plum-900 italic leading-relaxed">
              "{scriptText}"
            </p>
          </div>

          <div className="text-[9px] text-center text-plum-400 font-medium">
            Not a medical diagnosis • Prepared by teen for supportive conversation
          </div>
        </div>

        {/* 3 Explicit Action Triggers */}
        <div className="space-y-2 pt-1">
          {/* Download Image (PNG) */}
          <button
            onClick={handleDownloadImage}
            className="w-full py-3 px-4 bg-plum-800 hover:bg-plum-900 active:scale-98 text-cream-50 font-extrabold text-xs rounded-2xl flex items-center justify-center space-x-2 shadow-float transition-all"
          >
            <Download size={15} />
            <span>Download Shareable Image (PNG)</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            {/* Hand-Over Full Screen View */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="py-2.5 px-3 bg-white hover:bg-cream-100 active:scale-95 text-plum-900 border border-cream-300 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-all"
            >
              <Smartphone size={14} />
              <span>{isFullScreen ? 'Exit Full Screen' : 'Hand Phone to Mom'}</span>
            </button>

            {/* Copy Text Message */}
            <button
              onClick={handleCopyText}
              className="py-2.5 px-3 bg-white hover:bg-cream-100 active:scale-95 text-plum-900 border border-cream-300 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-all"
            >
              {copied ? <Check size={14} className="text-sage-600" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Text Script'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
