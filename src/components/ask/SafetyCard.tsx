import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, Heart } from 'lucide-react';
import { ChatMessage } from '../../types';

interface SafetyCardProps {
  safetyData: NonNullable<ChatMessage['safetyData']>;
}

export const SafetyCard: React.FC<SafetyCardProps> = ({ safetyData }) => {
  return (
    <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-4 shadow-float space-y-3.5 my-2 animate-in zoom-in-95 duration-200 max-w-sm">
      {/* Alert Header */}
      <div className="flex items-center space-x-2 text-rose-800">
        <div className="w-8 h-8 rounded-full bg-rose-200 flex items-center justify-center shrink-0">
          <ShieldAlert size={18} className="text-rose-700" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full">
            Immediate Support & Safety
          </span>
          <h4 className="font-extrabold text-sm text-rose-950 mt-0.5">
            {safetyData.title}
          </h4>
        </div>
      </div>

      {/* Compassionate Message */}
      <p className="text-xs text-rose-950/90 leading-relaxed bg-white/80 p-3 rounded-2xl border border-rose-200/60 font-medium">
        {safetyData.compassionateMessage}
      </p>

      {/* Immediate Actions */}
      <div className="space-y-1">
        <span className="text-[11px] font-bold text-rose-900 uppercase tracking-wider block">
          What to do right now:
        </span>
        <ul className="text-xs text-rose-900 space-y-1.5 pl-1">
          {safetyData.immediateActions.map((action, idx) => (
            <li key={idx} className="flex items-start space-x-1.5">
              <span className="text-rose-600 font-bold">•</span>
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Free & Confidential Helplines */}
      <div className="space-y-2 pt-1">
        <span className="text-[11px] font-bold text-rose-950 uppercase tracking-wider block">
          Free, Confidential Helplines:
        </span>
        <div className="space-y-1.5">
          {safetyData.helplines.map((line, idx) => (
            <a
              key={idx}
              href={`tel:${line.number.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-between p-2.5 bg-white border border-rose-300 rounded-2xl hover:bg-rose-100/50 active:scale-98 transition-all text-xs group"
            >
              <div>
                <div className="font-extrabold text-rose-950 flex items-center space-x-1">
                  <span>{line.name}</span>
                  {line.tollFree && (
                    <span className="text-[9px] bg-green-100 text-green-800 font-bold px-1.5 py-0.2 rounded">
                      FREE
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-rose-700 font-semibold mt-0.5">
                  📞 {line.number}
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">
                  {line.description}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                <PhoneCall size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="text-[10px] text-center text-rose-700/80 font-medium">
        This is a pre-written emergency card. Your words are never judged or stored.
      </div>
    </div>
  );
};
