import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Trash2,
  Key,
  RotateCcw,
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsModal: React.FC = () => {
  const {
    settingsOpen,
    setSettingsOpen,
    resetAllData,
    loadSampleDemoData,
    profile,
    updateUserProfile
  } = useApp();

  const [apiKeyInput, setApiKeyInput] = useState(profile.customApiKey || '');
  const [savedKey, setSavedKey] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  if (!settingsOpen) return null;

  const handleSaveApiKey = () => {
    updateUserProfile({ customApiKey: apiKeyInput.trim() });
    setSavedKey(true);
    setTimeout(() => setSavedKey(false), 2000);
  };

  const handleClearData = () => {
    resetAllData();
    setShowConfirmClear(false);
    setSettingsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-plum-950/70 backdrop-blur-md flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-[#FDFBF7] border border-cream-200 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-modal">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-cream-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-plum-100 text-plum-800 flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-plum-950">
                Privacy & Settings
              </h3>
              <span className="text-[10px] text-plum-600">
                Between Us by Natchkin
              </span>
            </div>
          </div>

          <button
            onClick={() => setSettingsOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-plum-500 hover:bg-cream-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* 100% Privacy Guarantee Card */}
        <div className="bg-sage-50 border border-sage-200 rounded-2xl p-3.5 space-y-2 text-xs">
          <div className="font-bold text-sage-900 flex items-center space-x-1.5">
            <ShieldCheck size={15} className="text-sage-700" />
            <span>Privacy by Architecture</span>
          </div>
          <p className="text-[11px] text-sage-800 leading-relaxed">
            Your logs and chat queries live strictly in your browser's local memory. No accounts, no advertising trackers, and no background notifications ever.
          </p>
        </div>

        {/* Optional Gemini API Key (For Evaluator or Live Generation) */}
        <div className="bg-white border border-cream-200 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-plum-900 flex items-center space-x-1">
              <Key size={13} className="text-dustyrose-500" />
              <span>Gemini API Key (Optional)</span>
            </label>
            <span className="text-[9px] bg-cream-100 text-plum-600 px-1.5 py-0.5 rounded font-semibold">
              Dev / Tester
            </span>
          </div>
          <p className="text-[11px] text-plum-600 leading-relaxed">
            The app works 100% reliably out-of-the-box using the vetted curated library. You can optionally supply an API key to enable live Gemini Flash synthesis.
          </p>
          <div className="flex space-x-1.5">
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="flex-1 text-xs px-2.5 py-1.5 border border-cream-300 rounded-xl outline-none focus:border-plum-500"
            />
            <button
              onClick={handleSaveApiKey}
              className="px-3 py-1.5 bg-plum-800 hover:bg-plum-900 text-cream-50 font-bold text-xs rounded-xl flex items-center space-x-1"
            >
              {savedKey ? <Check size={13} /> : null}
              <span>{savedKey ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Demo Data & Replay Opening Experience */}
        <div className="space-y-2 pt-1 border-t border-cream-200">
          <button
            onClick={() => {
              updateUserProfile({ hasCompletedOnboarding: false });
              setSettingsOpen(false);
              window.location.reload();
            }}
            className="w-full py-2.5 px-3 bg-white border border-cream-300 hover:bg-cream-100 text-ink font-semibold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-all"
          >
            <Sparkles size={14} className="text-violet-primary" />
            <span>Replay Brand Opening & Welcome</span>
          </button>

          <button
            onClick={() => {
              loadSampleDemoData();
              setSettingsOpen(false);
            }}
            className="w-full py-2.5 px-3 bg-white border border-cream-300 hover:bg-cream-100 text-ink font-semibold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-all"
          >
            <RotateCcw size={14} className="text-coral-primary" />
            <span>Load 3-Cycle Demo Data (For Testing)</span>
          </button>

          {showConfirmClear ? (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-center">
              <p className="text-xs text-rose-900 font-bold">
                Permanently delete all logs on this phone?
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={handleClearData}
                  className="flex-1 py-1.5 bg-rose-600 text-white font-bold text-xs rounded-lg"
                >
                  Yes, Wipe Everything
                </button>
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 py-1.5 bg-white border text-gray-700 text-xs rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmClear(true)}
              className="w-full py-2 text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center justify-center space-x-1"
            >
              <Trash2 size={13} />
              <span>Clear All Data on This Device</span>
            </button>
          )}
        </div>

        {/* Natchkin Mission Footer */}
        <div className="text-center pt-2 text-[10px] text-plum-400">
          Between Us by Natchkin • Empowering girls with gentle, honest health knowledge.
        </div>
      </div>
    </div>
  );
};
