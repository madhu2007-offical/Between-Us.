import React, { useState, useEffect } from 'react';

interface BrandVideoIntroProps {
  onComplete: () => void;
}

export const BrandVideoIntro: React.FC<BrandVideoIntroProps> = ({ onComplete }) => {
  const [showSkip, setShowSkip] = useState(false);
  const [phase, setPhase] = useState<'drift' | 'converge' | 'sparkle' | 'lockup'>('drift');

  useEffect(() => {
    // Reveal subtle skip button strictly after 3.0 seconds
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 3000);

    // Choreographed animation sequence matching brand video (0:00–0:10)
    const t1 = setTimeout(() => setPhase('converge'), 1500);
    const t2 = setTimeout(() => setPhase('sparkle'), 3800);
    const t3 = setTimeout(() => setPhase('lockup'), 6200);
    const tEnd = setTimeout(() => {
      onComplete();
    }, 9500);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tEnd);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-base-cream flex flex-col items-center justify-center overflow-hidden font-sans select-none">
      {/* Ambient soft background particle field */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-violet-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-coral-primary/10 blur-3xl animate-pulse" style={{ animationDelay: '1.2s' }} />
      </div>

      {/* Main Vector Motion Canvas (The Brand Mark) */}
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Left Figure: Violet (Older Sister / Guidance) */}
        <div
          className={`absolute transition-all duration-[2200ms] ease-ribbon-morph ${
            phase === 'drift'
              ? 'transform -translate-x-14 -translate-y-4 opacity-70 scale-90'
              : phase === 'converge' || phase === 'sparkle' || phase === 'lockup'
              ? 'transform -translate-x-4 translate-y-0 opacity-100 scale-100'
              : ''
          }`}
        >
          <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
            {/* Violet Head */}
            <circle cx="68" cy="38" r="28" fill="#A67FD7" />
            {/* Violet Body Ribbon */}
            <path
              d="M68 70 C40 70, 20 95, 20 124 C20 150, 60 155, 90 135 C95 120, 95 90, 68 70 Z"
              fill="#A67FD7"
            />
          </svg>
        </div>

        {/* Right Figure: Coral-Pink (Her / Personal) */}
        <div
          className={`absolute transition-all duration-[2200ms] ease-ribbon-morph ${
            phase === 'drift'
              ? 'transform translate-x-14 translate-y-4 opacity-70 scale-90'
              : phase === 'converge' || phase === 'sparkle' || phase === 'lockup'
              ? 'transform translate-x-5 translate-y-2 opacity-100 scale-100'
              : ''
          }`}
        >
          <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
            {/* Coral Head */}
            <circle cx="52" cy="44" r="24" fill="#F885A5" />
            {/* Coral Body Ribbon */}
            <path
              d="M52 72 C78 72, 96 95, 96 122 C96 148, 58 152, 30 134 C26 120, 28 92, 52 72 Z"
              fill="#F885A5"
            />
          </svg>
        </div>

        {/* Overlap Connection Blend (#8D63B1) */}
        {(phase === 'converge' || phase === 'sparkle' || phase === 'lockup') && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000">
            <svg width="60" height="70" viewBox="0 0 60 70" fill="none" className="opacity-45 mix-blend-multiply">
              <path
                d="M15 15 C35 25, 45 45, 30 65 C20 50, 15 35, 15 15 Z"
                fill="#8D63B1"
              />
            </svg>
          </div>
        )}

        {/* The Emotional Peak: The Brilliant 4-Pointed Sparkle */}
        <div
          className={`absolute z-20 transition-all duration-1000 ease-sparkle-bloom ${
            phase === 'sparkle' || phase === 'lockup'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-50'
          }`}
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing Light Aura */}
            <div className="absolute w-20 h-20 bg-white/70 rounded-full blur-xl animate-ping opacity-60" />
            
            {/* Crisp 4-Pointed Diamond Star */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 2 C24 14, 34 24, 46 24 C34 24, 24 34, 24 46 C24 34, 14 24, 2 24 C14 24, 24 14, 24 2 Z"
                fill="#A67FD7"
              />
              <path
                d="M24 10 C24 18, 30 24, 38 24 C30 24, 24 30, 24 38 C24 30, 18 24, 10 24 C18 24, 24 18, 24 10 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Brand Lockup & Tagline (Fades in during second half of the video) */}
      <div
        className={`text-center space-y-2.5 transition-all duration-1000 ease-out mt-4 ${
          phase === 'lockup' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-3'
        }`}
      >
        <h1 className="font-display text-display text-ink tracking-tight font-extrabold">
          between <span className="text-coral-primary">us</span>
        </h1>
        <p className="font-body text-caption tracking-widest text-ink/70 uppercase font-semibold">
          Real Questions. Better Answers.
        </p>
      </div>

      {/* Subtle Skip Button: Strictly invisible for first 3.0 seconds, then gently fades in */}
      {showSkip && (
        <button
          onClick={onComplete}
          className="absolute bottom-8 right-8 font-body text-caption text-ink/60 hover:text-ink transition-all duration-500 py-1.5 px-3 rounded-full border border-ink/10 hover:border-ink/20 active:scale-95 animate-in fade-in"
          aria-label="Skip brand video intro"
        >
          Skip Intro →
        </button>
      )}
    </div>
  );
};
