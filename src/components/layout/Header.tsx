import React from 'react';
import { EyeOff, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { setCamouflageActive, setSettingsOpen } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-[#FDFBF8]/90 backdrop-blur-md border-b border-blush-100 px-4 py-2.5 transition-all font-sans">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand & Sister Tag with Official Logo */}
        <div className="flex items-center space-x-2.5">
          <img
            src="/logo.png"
            alt="Between Us"
            className="w-9 h-9 object-contain rounded-xl bg-white p-0.5 shadow-sm border border-blush-100 shrink-0"
          />
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-tight text-plum-950 leading-none">
                between <span className="text-blush-500">us</span>
              </span>
              <span className="text-[9px] font-extrabold text-blush-600 bg-blush-100 px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                Natchkin
              </span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-sage-700 font-bold mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>100% Private On Your Phone</span>
            </div>
          </div>
        </div>

        {/* Action Controls: Quick Disguise & Settings */}
        <div className="flex items-center space-x-1.5">
          {/* Quick Disguise Button (Camouflage mode for bathroom stalls / privacy) */}
          <button
            onClick={() => setCamouflageActive(true)}
            title="Quick Disguise: Immediately switches screen to notes"
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-bold text-plum-800 bg-white hover:bg-blush-50 active:scale-95 border border-blush-200 rounded-full shadow-xs transition-all"
            aria-label="Quick Disguise Screen"
          >
            <EyeOff size={13} className="text-plum-600" />
            <span>Disguise</span>
          </button>

          {/* Privacy & Settings */}
          <button
            onClick={() => setSettingsOpen(true)}
            title="Privacy Details & Options"
            className="w-8 h-8 rounded-full flex items-center justify-center text-plum-700 hover:bg-blush-50 active:scale-95 border border-transparent hover:border-blush-200 transition-all"
            aria-label="App settings and privacy guarantee"
          >
            <SlidersHorizontal size={15} />
          </button>
        </div>
      </div>
    </header>
  );
};
