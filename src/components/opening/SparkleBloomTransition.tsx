import React, { useEffect, useState } from 'react';

interface SparkleBloomTransitionProps {
  onTransitionEnd: () => void;
}

export const SparkleBloomTransition: React.FC<SparkleBloomTransitionProps> = ({ onTransitionEnd }) => {
  const [animState, setAnimState] = useState<'bloom' | 'float-up'>('bloom');

  useEffect(() => {
    // Phase 1: Sparkle blooms outward (400ms)
    // Phase 2: Sparkle floats smoothly to header position (800ms)
    const timerFloat = setTimeout(() => {
      setAnimState('float-up');
    }, 450);

    const timerDone = setTimeout(() => {
      onTransitionEnd();
    }, 1300);

    return () => {
      clearTimeout(timerFloat);
      clearTimeout(timerDone);
    };
  }, [onTransitionEnd]);

  return (
    <div className="fixed inset-0 z-50 bg-base-cream flex flex-col items-center justify-center overflow-hidden pointer-events-none font-sans">
      {/* Expanding soft radial bloom flare */}
      <div
        className={`absolute rounded-full transition-all duration-1000 ease-sparkle-bloom ${
          animState === 'bloom'
            ? 'w-96 h-96 opacity-80 scale-110'
            : 'w-[140vw] h-[140vw] opacity-0 scale-150'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(166,127,215,0.25) 35%, rgba(248,133,165,0.15) 55%, transparent 75%)'
        }}
      />

      {/* The Guiding Sparkle Star */}
      <div
        className={`absolute z-30 transition-all duration-900 ease-sparkle-bloom ${
          animState === 'bloom'
            ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-125'
            : 'top-7 left-1/2 transform -translate-x-1/2 scale-75 opacity-90'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 bg-violet-primary/30 rounded-full blur-lg animate-pulse" />
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
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
  );
};
