import React, { useState, useEffect } from 'react';

interface BrandVideoIntroProps {
  onComplete: () => void;
}

export const BrandVideoIntro: React.FC<BrandVideoIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'converge' | 'sparkle' | 'lockup'>('converge');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Choreographed sequence:
    // 0.0s - 1.2s: The two figures converge together into the embrace
    // 1.2s - 2.4s: The center 4-pointed sparkle blooms and radiates
    // 2.4s - 3.4s: Full lockup holds
    // 3.4s: Smooth fade-out into the app
    const t1 = setTimeout(() => setPhase('sparkle'), 1200);
    const t2 = setTimeout(() => setPhase('lockup'), 2400);
    const tExit = setTimeout(() => handleExit(), 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(tExit);
    };
  }, []);

  const handleExit = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div
      onClick={handleExit}
      className={`fixed inset-0 z-50 bg-[#FAF6F6] flex flex-col items-center justify-center p-6 select-none font-sans transition-opacity duration-400 cursor-pointer ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-[#9B72CF]/15 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-[#F77F98]/15 blur-3xl animate-pulse"
          style={{ animationDelay: '0.8s' }}
        />
      </div>

      {/* Main Logo Container matching media_1789803032883.png */}
      <div className="relative flex flex-col items-center justify-center max-w-sm w-full space-y-4">
        {/* Animated Figures + Sparkle Canvas */}
        <div className="relative w-64 h-56 flex items-center justify-center">
          {/* Left Figure: Violet Older Sister (#9B72CF) */}
          <div
            className={`absolute transition-all duration-1000 ease-out ${
              phase === 'converge'
                ? 'transform -translate-x-6 scale-95 opacity-90'
                : 'transform translate-x-0 scale-100 opacity-100'
            }`}
          >
            <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
              <circle cx="75" cy="38" r="30" fill="#9B72CF" />
              <path
                d="M72 68 C45 68, 20 92, 20 128 C20 156, 56 160, 90 140 C100 122, 98 90, 72 68 Z"
                fill="#9B72CF"
              />
            </svg>
          </div>

          {/* Right Figure: Coral Teen Girl (#F77F98) */}
          <div
            className={`absolute transition-all duration-1000 ease-out ${
              phase === 'converge'
                ? 'transform translate-x-6 scale-95 opacity-90'
                : 'transform translate-x-0 scale-100 opacity-100'
            }`}
          >
            <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
              <circle cx="45" cy="44" r="26" fill="#F77F98" />
              <path
                d="M48 72 C75 72, 100 95, 100 128 C100 156, 64 160, 30 140 C20 122, 22 92, 48 72 Z"
                fill="#F77F98"
              />
            </svg>
          </div>

          {/* Center Overlap Intersection (#7B5299) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path
                d="M30 15 C45 28, 45 45, 30 55 C15 45, 15 28, 30 15 Z"
                fill="#7B5299"
                style={{ mixBlendMode: 'multiply', opacity: 0.85 }}
              />
            </svg>
          </div>

          {/* The Radiant 4-Pointed Sparkle Star */}
          <div
            className={`absolute z-20 transition-all duration-700 ease-out ${
              phase === 'sparkle' || phase === 'lockup'
                ? 'opacity-100 scale-100'
                : 'opacity-40 scale-75'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute w-16 h-16 bg-[#B294DC]/40 rounded-full blur-md animate-ping" />
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <path
                  d="M22 2 C22 13, 31 22, 42 22 C31 22, 22 31, 22 42 C22 31, 13 22, 2 22 C13 22, 22 13, 22 2 Z"
                  fill="#B294DC"
                />
                <circle cx="22" cy="22" r="3" fill="#FFFFFF" />
              </svg>
            </div>
          </div>
        </div>

        {/* Wordmark & Tagline: Visible, Crisp, and Proud */}
        <div className="text-center space-y-1.5 transition-all duration-700">
          <h1 className="font-display text-4xl sm:text-5xl text-[#3A2A57] tracking-tight font-extrabold flex items-center justify-center space-x-2.5">
            <span>between</span>
            <span className="text-[#F77F98]">us</span>
          </h1>
          <p className="text-xs sm:text-sm tracking-[0.25em] text-[#3A2A57]/80 uppercase font-bold">
            Real Questions. Better Answers.
          </p>
        </div>
      </div>

      {/* Instant 1-Tap Entry Pill Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleExit();
        }}
        className="absolute bottom-8 right-6 text-xs font-bold text-ink bg-white/95 hover:bg-white active:scale-95 transition-all py-2.5 px-5 rounded-full border border-cream-300 shadow-float flex items-center space-x-1.5"
        aria-label="Enter app now"
      >
        <span>Enter App</span>
        <span>→</span>
      </button>

      {/* Tap anywhere hint */}
      <div className="absolute bottom-8 text-[11px] text-ink/40 font-medium text-center pointer-events-none">
        Tap anywhere to continue
      </div>
    </div>
  );
};
