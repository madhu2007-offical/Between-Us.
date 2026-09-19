import React from 'react';
import { AlertCircle, CheckCircle2, Info, ChevronRight, Stethoscope, HeartHandshake } from 'lucide-react';
import { PatternInsight } from '../../types';

interface PatternAlertProps {
  insight: PatternInsight;
  onOpenSummary: () => void;
}

export const PatternAlert: React.FC<PatternAlertProps> = ({ insight, onOpenSummary }) => {
  const isDoctorNotice = insight.status === 'irregular_gap' || insight.status === 'hormonal_cluster' || insight.status === 'high_pain';
  const isHealthy = insight.status === 'regular';

  return (
    <div className={`rounded-[28px] p-4.5 border transition-all ${
      isDoctorNotice
        ? 'bg-gradient-to-br from-[#FFF9F2] to-[#FFF3E8] border-amber-200/90 shadow-soft'
        : isHealthy
        ? 'bg-gradient-to-br from-[#F5FAF6] to-[#EBF5EE] border-sage-200 shadow-soft'
        : 'bg-white border-cream-200'
    }`}>
      {/* Visual Top Header Badge */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
            isDoctorNotice ? 'bg-amber-100 text-amber-700' : isHealthy ? 'bg-sage-100 text-sage-700' : 'bg-cream-100 text-plum-600'
          }`}>
            {isDoctorNotice ? <AlertCircle size={15} /> : isHealthy ? <CheckCircle2 size={15} /> : <Info size={15} />}
          </div>
          <span className="font-extrabold text-xs text-plum-950">
            {insight.title}
          </span>
        </div>

        {insight.averageCycleDays && (
          <span className="text-[11px] font-bold text-plum-800 bg-white/80 border border-cream-200 px-2.5 py-0.5 rounded-full shadow-sm">
            {insight.averageCycleDays}d Interval
          </span>
        )}
      </div>

      {/* Visual Reason Chips (Less text, more visual tokens) */}
      {insight.flaggedReasons.length > 0 ? (
        <div className="flex flex-wrap gap-1.5 my-2.5">
          {insight.flaggedReasons.map((reason, idx) => (
            <span
              key={idx}
              className="text-[11px] font-semibold bg-white/90 text-plum-900 px-2.5 py-1 rounded-xl border border-amber-200/70 shadow-sm flex items-center space-x-1"
            >
              <span className="text-amber-500">✦</span>
              <span>{reason}</span>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-plum-700 font-medium my-2">
          {insight.summary}
        </p>
      )}

      {/* Reassurance pill */}
      <div className="bg-white/90 rounded-2xl p-2.5 border border-cream-200/70 text-xs text-plum-900 font-medium flex items-center space-x-2 mb-3 shadow-sm">
        <span className="text-base">🌸</span>
        <span className="text-[11px] leading-snug">
          {insight.reassurance.slice(0, 110)}...
        </span>
      </div>

      {/* 1-Tap Summary Action Button */}
      {isDoctorNotice && (
        <button
          onClick={onOpenSummary}
          className="w-full py-2.5 px-3 bg-gradient-to-r from-plum-800 to-plum-900 hover:from-plum-900 hover:to-plum-950 active:scale-98 text-cream-50 font-bold text-xs rounded-2xl flex items-center justify-center space-x-2 shadow-sm transition-all"
        >
          <HeartHandshake size={15} className="text-blush-300" />
          <span>Prepare Summary for Mom or Doctor</span>
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
};
