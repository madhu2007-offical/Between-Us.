import React, { useState, useEffect } from 'react';

interface BrandVideoIntroProps {
  onComplete: () => void;
}

export const BrandVideoIntro: React.FC<BrandVideoIntroProps> = ({ onComplete }) => {
  const [showSkip, setShowSkip] = useState(false);
  const [phase, setPhase] = useState<'enter' | 'converge' | 'sparkle' | 'lockup'>('enter');

  useEffect(() => {
    // Reveal visible skip button after 2.5 seconds
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 2500);

    // Choreographed animation sequence matching official brand logo:
    // 0.0s - 1.2s: Gentle entrance & float
    // 1.2s - 3.2s: Converge into the tender embrace
    // 3.2s - 5.2s: Luminous 4-pointed sparkle ignites and radiates
    // 5.2s - 8.8s: Exact brand lockup resolves cleanly
    const t1 = setTimeout(() => setPhase('converge'), 1200);
    const t2 = setTimeout(() => setPhase('sparkle'), 3200);
    const t3 = setTimeout(() => setPhase('lockup'), 5200);
    const tEnd = setTimeout(() => {
      onComplete();
    }, 8800);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tEnd);
    };
  }, [onComplete]);

  return (
    <div
      onClick={() => showSkip && onComplete()}
      className="fixed inset-0 z-50 bg-[#FAF6F6] flex flex-col items-center justify-center overflow-hidden font-sans select-none"
    >
      {/* Soft ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#9B72CF]/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#F77F98]/10 blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Main Motion Canvas: Exact geometry matching media_1789803032883.png */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Animated Vector Figures */}
        <div className="relative w-72 h-64 flex items-center justify-center">
          {/* Left Figure: Violet Older Sister (#9B72CF) */}
          <div
            className={`absolute transition-all duration-[1600ms] ease-out ${
              phase === 'enter'
                ? 'transform -translate-x-16 -translate-y-4 opacity-40 scale-90'
                : 'transform translate-x-0 translate-y-0 opacity-100 scale-100'
            }`}
          >
            <svg width="130" height="170" viewBox="0 0 130 170" fill="none">
              {/* Violet Head Circle */}
              <circle cx="80" cy="40" r="32" fill="#9B72CF" />
              {/* Violet Smooth Teardrop Body */}
              <path
                d="M78 72 C50 72, 22 98, 22 135 C22 165, 60 170, 95 148 C105 130, 105 95, 78 72 Z"
                fill="#9B72CF"
              />
            </svg>
          </div>

          {/* Right Figure: Coral-Pink Teen Girl (#F77F98) */}
          <div
            className={`absolute transition-all duration-[1600ms] ease-out ${
              phase === 'enter'
                ? 'transform translate-x-16 translate-y-4 opacity-40 scale-90'
                : 'transform translate-x-0 translate-y-0 opacity-100 scale-100'
            }`}
          >
            <svg width="130" height="170" viewBox="0 0 130 170" fill="none">
              {/* Coral Head Circle (slightly smaller) */}
              <circle cx="50" cy="48" r="28" fill="#F77F98" />
              {/* Coral Smooth Teardrop Body */}
              <path
                d="M52 76 C80 76, 108 100, 108 135 C108 165, 70 170, 35 148 C25 130, 25 98, 52 76 Z"
                fill="#F77F98"
              />
            </svg>
          </div>

          {/* Center Overlap Meeting Lens (#7B5299 with multiply blend) */}
          <div
            className={`absolute transition-opacity duration-1000 ${
              phase === 'converge' || phase === 'sparkle' || phase === 'lockup'
                ? 'opacity-85'
                : 'opacity-0'
            }`}
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path
                d="M30 15 C45 28, 45 45, 30 55 C15 45, 15 28, 30 15 Z"
                fill="#7B5299"
                style={{ mixBlendMode: 'multiply' }}
              />
            </svg>
          </div>

          {/* Emotional Heart Peak: The 4-Pointed Sparkle Star */}
          <div
            className={`absolute z-20 transition-all duration-700 ease-out ${
              phase === 'sparkle' || phase === 'lockup'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-0'
            }`}
          >
            <div className="relative flex items-center justify-center">
              {/* Pulsing Luminous Light Ring */}
              <div className="absolute w-16 h-16 bg-[#B294DC]/40 rounded-full blur-md animate-ping" />
              
              {/* 4-Pointed Star Diamond matching the logo exactly */}
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

        {/* Phase 4 Lockup: Seamless Overlay of the Official High-Res Artwork */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 pointer-events-none ${
            phase === 'lockup' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src="/logo.png"
            alt="Between Us by Natchkin"
            className="w-full h-auto object-contain max-h-72"
          />
        </div>
      </div>

      {/* Animated Wordmark & Tagline below */}
      <div
        className={`text-center space-y-2 transition-all duration-1000 ease-out mt-2 ${
          phase === 'sparkle' || phase === 'lockup'
            ? 'opacity-100 transform translate-y-0'
            : 'opacity-0 transform translate-y-4'
        }`}
      >
        <h1 className="font-display text-4xl text-[#3A2A57] tracking-tight font-extrabold flex items-center justify-center space-x-2">
          <span>between</span>
          <span className="text-[#F77F98]">us</span>
        </h1>
        <p className="text-xs tracking-[0.25em] text-[#3A2A57]/80 uppercase font-bold">
          Real Questions. Better Answers.
        </p>
      </div>

      {/* Clean, visible skip button */}
      {showSkip && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="absolute bottom-8 right-6 text-xs font-bold text-ink/80 bg-white/95 hover:bg-white hover:text-ink transition-all py-2 px-4 rounded-full border border-cream-300 shadow-sm active:scale-95 flex items-center space-x-1"
          aria-label="Skip brand intro"
        >
          <span>Skip to app</span>
          <span>→</span>
        </button>
      )}
    </div>
  );
};
