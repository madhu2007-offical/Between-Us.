import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MicroOnboardingProps {
  onComplete: () => void;
}

export const MicroOnboarding: React.FC<MicroOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0);

  const steps = [
    {
      headline: 'This space is completely yours.',
      subhead: 'Stored only on this phone. No records, no tracking, zero judgment.',
      cta: 'Next',
      renderArt: () => (
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Protective organic sanctuary ribbons */}
          <div className="absolute w-44 h-44 rounded-full bg-violet-primary/15 blur-2xl animate-pulse" />
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            {/* Violet Ribbon Shield */}
            <path
              d="M100 25 C60 25, 30 65, 30 110 C30 155, 75 175, 100 175 C90 145, 70 120, 70 90 C70 60, 90 40, 100 25 Z"
              fill="#A67FD7"
              opacity="0.9"
            />
            {/* Coral Ribbon Shield */}
            <path
              d="M100 25 C140 25, 170 65, 170 110 C170 155, 125 175, 100 175 C110 145, 130 120, 130 90 C130 60, 110 40, 100 25 Z"
              fill="#F885A5"
              opacity="0.9"
            />
            {/* Overlap center */}
            <circle cx="100" cy="105" r="16" fill="#8D63B1" opacity="0.8" />
            {/* Central Sparkle */}
            <path
              d="M100 85 C100 95, 107 100, 115 100 C107 100, 100 105, 100 115 C100 105, 93 100, 85 100 C93 100, 100 95, 100 85 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      )
    },
    {
      headline: 'Ask anything you’re afraid to say out loud.',
      subhead: 'Medically vetted answers from an understanding big sister who knows what you’re feeling.',
      cta: 'Next',
      renderArt: () => (
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute w-44 h-44 rounded-full bg-coral-primary/15 blur-2xl animate-pulse" />
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            {/* Violet Sister presence */}
            <circle cx="70" cy="65" r="26" fill="#A67FD7" />
            <path
              d="M70 95 C45 95, 30 115, 30 145 C30 170, 75 170, 95 155 C100 135, 95 110, 70 95 Z"
              fill="#A67FD7"
            />
            {/* Coral Listening presence */}
            <circle cx="130" cy="75" r="22" fill="#F885A5" />
            <path
              d="M130 102 C150 102, 168 118, 168 145 C168 170, 125 168, 105 152 C102 135, 108 115, 130 102 Z"
              fill="#F885A5"
            />
            {/* Sparkle connection between them */}
            <path
              d="M100 85 C100 93, 106 97, 112 97 C106 97, 100 101, 100 109 C100 101, 94 97, 88 97 C94 97, 100 93, 100 85 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      )
    },
    {
      headline: 'Move at your own pace, not ours.',
      subhead: 'Log in 10 silent seconds when you feel like it. No streak shaming, ever.',
      cta: 'Enter Between Us',
      renderArt: () => (
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute w-44 h-44 rounded-full bg-violet-primary/15 blur-2xl animate-pulse" />
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            {/* Organic rhythmic petal loop */}
            <circle cx="100" cy="100" r="55" stroke="#DDD4D1" strokeWidth="6" strokeDasharray="12 8" />
            {/* Violet Arc */}
            <path
              d="M100 45 A55 55 0 0 1 155 100"
              stroke="#A67FD7"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Coral Arc */}
            <path
              d="M100 155 A55 55 0 0 1 45 100"
              stroke="#F885A5"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Centered Sparkle */}
            <circle cx="100" cy="100" r="14" fill="#8D63B1" opacity="0.25" />
            <path
              d="M100 86 C100 94, 106 98, 114 98 C106 98, 100 102, 100 110 C100 102, 94 98, 86 98 C94 98, 100 94, 100 86 Z"
              fill="#A67FD7"
            />
            <path
              d="M100 92 C100 96, 103 98, 107 98 C103 98, 100 100, 100 104 C100 100, 97 98, 93 98 C97 98, 100 96, 100 92 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      )
    }
  ];

  const current = steps[currentStep];

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => (prev + 1) as any);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-base-cream flex flex-col justify-between p-6 sm:p-8 font-sans max-w-md mx-auto select-none">
      {/* Top: Guiding Sparkle Star (No chore-like progress dots!) */}
      <div className="pt-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
            <circle cx="18" cy="18" r="11" fill="#A67FD7" />
            <circle cx="30" cy="20" r="10" fill="#F885A5" />
          </svg>
          <span className="font-display text-caption font-bold text-ink tracking-tight">
            between <span className="text-coral-primary">us</span>
          </span>
        </div>

        {/* Dynamic single sparkle indicator that moves forward */}
        <div className="flex items-center space-x-1.5">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Sparkles
              size={16}
              className={`transition-all duration-500 ${
                currentStep === 0
                  ? 'text-violet-primary transform scale-100'
                  : currentStep === 1
                  ? 'text-overlap-deep transform scale-110'
                  : 'text-coral-primary transform scale-125'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Center: Custom Vector Art + Short Sentence */}
      <div className="my-auto flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-500 key={currentStep}">
        {current.renderArt()}

        <div className="space-y-3 max-w-xs mx-auto">
          <h2 className="font-display text-h1 font-bold text-ink leading-snug">
            {current.headline}
          </h2>
          <p className="font-body text-body text-ink/75 leading-relaxed font-medium">
            {current.subhead}
          </p>
        </div>
      </div>

      {/* Bottom: Next Action */}
      <div className="pb-6">
        <button
          onClick={handleNext}
          className={`w-full min-h-[52px] py-4 px-6 font-body text-body font-bold rounded-full shadow-float flex items-center justify-center space-x-2 transition-all active:scale-98 ${
            currentStep === 2
              ? 'bg-coral-primary hover:bg-coral-500 text-ink shadow-sparkle'
              : 'bg-violet-primary hover:bg-violet-600 text-white'
          }`}
        >
          <span>{current.cta}</span>
          <ArrowRight size={17} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
