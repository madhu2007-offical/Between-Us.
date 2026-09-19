import React from 'react';
import { EyeOff, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { setCamouflageActive, setSettingsOpen } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-[#FAF6F6]/95 backdrop-blur-md border-b border-cream-200 px-4 py-2.5 transition-all font-sans shadow-xs">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand & Sister Tag with Official Logo */}
        <div className="flex items-center space-x-2.5">
          <img
            src="/logo.png"
            alt="Between Us"
            className="w-10 h-10 object-contain rounded-xl bg-white p-0.5 shadow-sm border border-cream-200 shrink-0"
          />
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-tight text-ink leading-none font-display">
                between <span className="text-coral-primary">us</span>
              </span>
              <span className="text-[9px] font-extrabold text-violet-700 bg-violet-100 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Natchkin
              </span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-emerald-700 font-bold mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-bold text-ink bg-white hover:bg-cream-100 active:scale-95 border border-cream-300 rounded-full shadow-xs transition-all"
            aria-label="Quick Disguise Screen"
          >
            <EyeOff size={13} className="text-ink/70" />
            <span>Disguise</span>
          </button>

          {/* Privacy & Settings */}
          <button
            onClick={() => setSettingsOpen(true)}
            title="Privacy Details & Options"
            className="w-8 h-8 rounded-full flex items-center justify-center text-ink/70 hover:bg-cream-200 active:scale-95 border border-transparent hover:border-cream-300 transition-all"
            aria-label="App settings and privacy guarantee"
          >
            <SlidersHorizontal size={15} />
          </button>
        </div>
      </div>
    </header>
  );
};
