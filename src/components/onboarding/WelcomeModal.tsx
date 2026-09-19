import React, { useState } from 'react';
import { ShieldCheck, Heart, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WelcomeModal: React.FC = () => {
  const { profile, updateUserProfile } = useApp();
  const [step, setStep] = useState<'welcome' | 'profile'>('welcome');
  const [age, setAge] = useState<'12-14' | '15-17' | '18+'>('12-14');
  const [stage, setStage] = useState<'not_started' | 'first_year' | 'regular_awhile'>('first_year');

  // If already completed onboarding, do not show
  if (profile.hasCompletedOnboarding) {
    return null;
  }

  const handleFinish = (skipProfile: boolean = false) => {
    if (skipProfile) {
      updateUserProfile({
        hasCompletedOnboarding: true
      });
    } else {
      updateUserProfile({
        hasCompletedOnboarding: true,
        ageBracket: age,
        periodStage: stage
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-plum-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] border border-cream-200 rounded-3xl p-6 max-w-sm w-full shadow-modal space-y-5 animate-in fade-in zoom-in duration-200">
        {step === 'welcome' ? (
          <>
            {/* Official Logo Banner */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-32 h-20 rounded-2xl bg-white p-1 shadow-sm border border-blush-100 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Between Us Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[11px] font-bold tracking-wider text-plum-600 uppercase">
                Real Questions. Better Answers.
              </span>
            </div>

            {/* Warm Welcome Copy */}
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl font-bold font-serif text-plum-950 tracking-tight leading-tight">
                Hey, you are safe here.
              </h2>
              <p className="text-xs text-plum-700/90 leading-relaxed font-medium">
                A private, judgment-free companion to understand your period, body changes, and early hormone signals.
              </p>
            </div>

            {/* THE PRIVACY PROMISE BOX */}
            <div className="bg-[#FAF5F8] border border-plum-100/80 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center space-x-2 text-plum-900 font-bold text-sm">
                <Lock size={16} className="text-sage-600" />
                <span>Our 100% Private Promise:</span>
              </div>
              <ul className="text-xs text-plum-800/90 space-y-2 pl-1">
                <li className="flex items-start space-x-2">
                  <ShieldCheck size={15} className="text-sage-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Sign-up:</strong> No name, email, or phone number ever requested.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ShieldCheck size={15} className="text-sage-600 shrink-0 mt-0.5" />
                  <span><strong>Stays on this phone:</strong> Your logs and questions never go to any ad company or social profile.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ShieldCheck size={15} className="text-sage-600 shrink-0 mt-0.5" />
                  <span><strong>Discreet mode:</strong> One tap quickly disguises the screen if someone approaches.</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => setStep('profile')}
                className="w-full py-3.5 px-4 bg-plum-800 hover:bg-plum-900 active:scale-98 text-cream-50 font-bold text-sm rounded-2xl shadow-float flex items-center justify-center space-x-2 transition-all"
              >
                <span>Let's Get Started</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => handleFinish(true)}
                className="w-full py-2 text-xs font-semibold text-plum-600 hover:text-plum-900 text-center"
              >
                Skip straight to the app
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Optional 2-question anonymous profile */}
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-dustyrose-600 uppercase tracking-wider">
                  Quick Personalization (Optional)
                </span>
                <h3 className="text-xl font-bold text-plum-950">
                  Help us give better answers
                </h3>
                <p className="text-xs text-plum-600">
                  Stored strictly on this device only.
                </p>
              </div>

              {/* Age Bracket */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-plum-800 block">
                  How old are you?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '12-14', label: '12–14 yrs' },
                    { id: '15-17', label: '15–17 yrs' },
                    { id: '18+', label: '18+' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAge(opt.id as any)}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all ${
                        age === opt.id
                          ? 'border-plum-800 bg-plum-800 text-cream-50'
                          : 'border-cream-300 bg-white text-plum-800 hover:border-plum-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Period Stage */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-plum-800 block">
                  Where are you in your period journey?
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'not_started', label: "Haven't got my first period yet", desc: 'Curious about what changes to expect' },
                    { id: 'first_year', label: 'Just started this past year', desc: 'Cycles are still very new and irregular' },
                    { id: 'regular_awhile', label: 'Had it for 2+ years', desc: 'Looking to track rhythm and ease cramps' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setStage(opt.id as any)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                        stage === opt.id
                          ? 'border-plum-800 bg-plum-50 text-plum-950 ring-1 ring-plum-800'
                          : 'border-cream-200 bg-white text-plum-800 hover:border-cream-300'
                      }`}
                    >
                      <div className="font-semibold text-xs text-plum-900">{opt.label}</div>
                      <div className="text-[11px] text-plum-600">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => handleFinish(false)}
                  className="w-full py-3 px-4 bg-plum-800 hover:bg-plum-900 text-cream-50 font-bold text-sm rounded-2xl shadow-sm transition-all"
                >
                  Enter Between Us
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
