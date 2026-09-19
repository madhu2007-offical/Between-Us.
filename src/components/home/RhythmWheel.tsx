import React from 'react';
import { Sparkles, Heart, Moon, Sun, Flower2, Coffee } from 'lucide-react';
import { CycleStats } from '../../utils/patternEngine';

interface RhythmWheelProps {
  stats: CycleStats;
  onLogClick: () => void;
}

export const RhythmWheel: React.FC<RhythmWheelProps> = ({ stats, onLogClick }) => {
  const hasLogs = stats.periodStartDates.length > 0;
  const lastPeriodDate = hasLogs ? new Date(stats.periodStartDates[0]) : null;

  let daysSinceLast = 0;
  if (lastPeriodDate) {
    const today = new Date();
    daysSinceLast = Math.max(0, Math.floor((today.getTime() - lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24)));
  }

  const avgDays = stats.averageCycleDays || 28;

  // Visual phases with feminine iconography
  let currentPhase = {
    name: 'Rest & Replenish',
    icon: Moon,
    color: 'text-blush-500 bg-blush-100',
    badge: 'Day 1–5 • Gentle Care',
    tip: 'Keep your belly warm with a hot pack'
  };

  if (daysSinceLast > 5 && daysSinceLast <= 13) {
    currentPhase = {
      name: 'Fresh Glow Phase',
      icon: Sun,
      color: 'text-amber-500 bg-amber-100',
      badge: `Day ${daysSinceLast} • Rising Energy`,
      tip: 'Natural energy is high today'
    };
  } else if (daysSinceLast > 13 && daysSinceLast <= 18) {
    currentPhase = {
      name: 'Bloom Window',
      icon: Flower2,
      color: 'text-rose-500 bg-rose-100',
      badge: `Day ${daysSinceLast} • Peak Vibrant`,
      tip: 'Great time for creative projects'
    };
  } else if (daysSinceLast > 18) {
    currentPhase = {
      name: 'Cozy Wind-Down',
      icon: Coffee,
      color: 'text-petal-500 bg-petal-100',
      badge: `Day ${daysSinceLast} • Self Kindness`,
      tip: 'Hydrate well and rest extra tonight'
    };
  }

  const IconComponent = currentPhase.icon;
  const progressPercent = Math.min(Math.round((daysSinceLast / avgDays) * 100), 100);

  return (
    <div className="bg-gradient-to-b from-white via-[#FFF9FA] to-[#FFF4F7] rounded-[32px] p-5 border border-blush-200/90 shadow-soft relative overflow-hidden">
      {/* Decorative floral glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blush-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-petal-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-2">
          <span className="text-base">🌸</span>
          <span className="font-extrabold text-sm text-plum-950 tracking-tight">
            Your Body's Rhythm Bloom
          </span>
        </div>
        <span className="text-[11px] font-bold text-blush-600 bg-white/80 border border-blush-200 px-2.5 py-0.5 rounded-full shadow-sm">
          {stats.periodStartDates.length} Cycles Tracked
        </span>
      </div>

      {/* Visual Blossom Wheel */}
      <div className="flex items-center justify-between py-1 relative z-10">
        {/* Glowing circular progress */}
        <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
          {/* Subtle pulsating outer flower ring */}
          <div className="absolute inset-0 rounded-full bg-blush-100/60 animate-pulse" />

          <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F98BAA" />
                <stop offset="50%" stopColor="#EE638A" />
                <stop offset="100%" stopColor="#864379" />
              </linearGradient>
            </defs>

            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#FDE2E4"
              strokeWidth="10"
              fill="none"
            />

            {/* Glowing animated progress stroke */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#roseGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="251.2"
              strokeDashoffset={
                hasLogs
                  ? 251.2 - (Math.min(daysSinceLast / avgDays, 1.2) * 251.2 * 0.85)
                  : 251.2
              }
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center visual counter */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
            {hasLogs ? (
              <>
                <span className="text-3xl font-extrabold text-plum-950 font-serif leading-none">
                  {daysSinceLast}
                </span>
                <span className="text-[10px] font-bold text-blush-500 uppercase tracking-widest mt-1">
                  Days
                </span>
              </>
            ) : (
              <Heart size={26} className="text-blush-400 fill-blush-200" />
            )}
          </div>
        </div>

        {/* Visual Phase Card */}
        <div className="flex-1 pl-4 space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 border border-blush-200 text-plum-900 shadow-sm">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${currentPhase.color}`}>
              <IconComponent size={12} />
            </div>
            <span>{currentPhase.name}</span>
          </div>

          <div className="text-xs text-plum-800 font-medium">
            {currentPhase.tip}
          </div>

          {/* Mini visual indicator */}
          <div className="pt-1">
            <div className="flex items-center justify-between text-[10px] text-plum-600 font-bold mb-1">
              <span>Cycle Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-blush-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blush-400 to-plum-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 10s Quick Log Trigger Banner */}
      <div className="mt-4 pt-3 border-t border-blush-200/70 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-1.5 text-xs text-plum-800 font-semibold">
          <span>✨ Log today's flow in 1-tap:</span>
        </div>
        <button
          onClick={onLogClick}
          className="px-4 py-2 bg-gradient-to-r from-plum-800 to-plum-900 hover:from-plum-900 hover:to-plum-950 active:scale-95 text-cream-50 font-bold text-xs rounded-full transition-all shadow-float flex items-center space-x-1.5"
        >
          <span>10s Log</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
