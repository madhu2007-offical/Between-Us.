import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, KeyRound, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface WelcomeEntryScreenProps {
  onStartPrivately: () => void;
  onReturningUserSuccess: () => void;
}

export const WelcomeEntryScreen: React.FC<WelcomeEntryScreenProps> = ({
  onStartPrivately,
  onReturningUserSuccess
}) => {
  const { profile, updateUserProfile } = useApp();
  const [showPinModal, setShowPinModal] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [enteredNickname, setEnteredNickname] = useState('');
  const [pinError, setPinError] = useState('');
  const [isSettingPin, setIsSettingPin] = useState(false);

  // Stored PIN in local profile
  const storedPin = localStorage.getItem('between_us_local_pin_v1');
  const storedNick = localStorage.getItem('between_us_local_nickname_v1') || 'Friend';

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin.length !== 4) {
      setPinError('Please enter a 4-digit PIN');
      return;
    }

    if (storedPin) {
      if (enteredPin === storedPin) {
        setPinError('');
        setShowPinModal(false);
        onReturningUserSuccess();
      } else {
        setPinError('PIN does not match what was saved on this phone');
      }
    } else {
      // First time setting local device PIN
      localStorage.setItem('between_us_local_pin_v1', enteredPin);
      if (enteredNickname.trim()) {
        localStorage.setItem('between_us_local_nickname_v1', enteredNickname.trim());
      }
      setShowPinModal(false);
      onReturningUserSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-base-cream flex flex-col justify-between p-6 sm:p-8 font-sans max-w-md mx-auto select-none">
      {/* 1. TOP: Persistent Compact Brand Anchor (Natchkin Restraint) */}
      <div className="pt-6 flex flex-col items-center justify-center space-y-2">
        {/* Subtle compact brand mark */}
        <div className="flex items-center space-x-2">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
            <circle cx="18" cy="18" r="11" fill="#A67FD7" />
            <circle cx="30" cy="20" r="10" fill="#F885A5" />
            <path
              d="M24 6 C24 13, 29 18, 36 18 C29 18, 24 23, 24 30 C24 23, 19 18, 12 18 C19 18, 24 13, 24 6 Z"
              fill="#FFFFFF"
            />
          </svg>
          <span className="font-display text-h2 font-bold text-ink tracking-tight">
            between <span className="text-coral-primary">us</span>
          </span>
        </div>
        <span className="font-body text-micro uppercase tracking-widest text-ink/40 font-bold">
          by Natchkin
        </span>
      </div>

      {/* 2. CENTER: Generous Whitespace & Warm Headline in Her Voice */}
      <div className="my-auto space-y-4 py-8 text-center">
        <h1 className="font-display text-display text-ink font-bold leading-tight">
          You’re safe here.<br />
          <span className="text-violet-primary font-normal">Take your time.</span>
        </h1>

        <p className="font-body text-body text-ink/75 max-w-xs mx-auto leading-relaxed">
          No medical forms. No accounts. Just a private sanctuary to understand your body’s rhythm.
        </p>
      </div>

      {/* 3. BOTTOM: Actions & Quiet Trust Line */}
      <div className="pb-6 space-y-4">
        {/* Primary Action Button */}
        <button
          onClick={onStartPrivately}
          className="w-full min-h-[52px] py-4 px-6 bg-coral-primary hover:bg-coral-500 active:scale-98 text-ink font-body text-body font-bold rounded-full shadow-float flex items-center justify-center space-x-2 transition-all"
        >
          <span>Start privately</span>
          <ArrowRight size={17} className="stroke-[2.5]" />
        </button>

        {/* Quiet Trust Line (Essential Emotional Anchor) */}
        <p className="font-body text-caption text-center text-ink/65 font-medium px-4">
          Nothing here is shared unless you explicitly choose to.
        </p>

        {/* Secondary Action Path: "I've been here before" */}
        <div className="pt-2 text-center">
          <button
            onClick={() => {
              setShowPinModal(true);
              setIsSettingPin(!storedPin);
            }}
            className="inline-flex items-center space-x-1.5 font-body text-caption text-ink/60 hover:text-ink transition-colors py-2 px-3 rounded-full hover:bg-ink/5"
          >
            <KeyRound size={13} className="text-violet-primary" />
            <span>I’ve been here before (Local PIN)</span>
          </button>
        </div>
      </div>

      {/* Local 4-Digit PIN Modal (Device-Only, Zero Server Transmission) */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-base-cream border border-cream-200 rounded-[32px] p-6 w-full max-w-sm shadow-modal space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-ink/10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-violet-primary/20 text-violet-700 flex items-center justify-center">
                  <Lock size={15} />
                </div>
                <div>
                  <h3 className="font-display text-h2 font-semibold text-ink">
                    {storedPin ? 'Welcome Back' : 'Set a Private Local PIN'}
                  </h3>
                  <span className="font-body text-micro text-ink/50 block">
                    Saved strictly on this device
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowPinModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-ink/50 hover:bg-ink/5"
              >
                <X size={17} />
              </button>
            </div>

            <p className="font-body text-caption text-ink/80 leading-relaxed">
              {storedPin
                ? `Enter your 4-digit PIN to access your past cycle logs, ${storedNick}.`
                : 'Choose an optional 4-digit PIN and secret nickname so siblings or parents checking your phone cannot peek.'}
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              {!storedPin && (
                <div>
                  <label className="block font-body text-caption font-bold text-ink/70 mb-1">
                    Secret Nickname (Optional)
                  </label>
                  <input
                    type="text"
                    value={enteredNickname}
                    onChange={(e) => setEnteredNickname(e.target.value)}
                    placeholder="e.g. Starflower"
                    className="w-full py-2.5 px-3 rounded-2xl bg-white/70 border border-cream-300 font-body text-caption outline-none focus:border-violet-primary"
                  />
                </div>
              )}

              <div>
                <label className="block font-body text-caption font-bold text-ink/70 mb-1">
                  4-Digit PIN
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={enteredPin}
                  onChange={(e) => {
                    setEnteredPin(e.target.value.replace(/[^0-9]/g, ''));
                    setPinError('');
                  }}
                  placeholder="••••"
                  autoFocus
                  className="w-full py-3 px-4 rounded-2xl bg-white/70 border border-cream-300 font-display text-xl text-center tracking-[0.5em] outline-none focus:border-violet-primary text-ink"
                />
              </div>

              {pinError && (
                <p className="font-body text-caption text-coral-600 text-center font-bold">
                  {pinError}
                </p>
              )}

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={enteredPin.length !== 4}
                  className="w-full py-3 px-4 bg-violet-primary hover:bg-violet-600 disabled:opacity-50 text-white font-body text-body font-bold rounded-full shadow-soft transition-all"
                >
                  {storedPin ? 'Unlock My Space' : 'Save PIN & Enter'}
                </button>

                {storedPin && (
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem('between_us_local_pin_v1');
                      localStorage.removeItem('between_us_local_nickname_v1');
                      setShowPinModal(false);
                      onStartPrivately();
                    }}
                    className="w-full py-1 text-center font-body text-caption text-ink/40 hover:text-ink/70"
                  >
                    Forgot PIN? Reset local code
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
