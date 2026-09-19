import React, { useState } from 'react';
import {
  Droplets,
  Heart,
  Smile,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FlowLevel, PainLevel, MoodType } from '../../types';

export const LogTab: React.FC = () => {
  const { logCycleEntry, setActiveTab } = useApp();

  const [flow, setFlow] = useState<FlowLevel>('medium');
  const [pain, setPain] = useState<PainLevel>(1);
  const [mood, setMood] = useState<MoodType>('calm');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['cramps']);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];

  const flowOptions: Array<{ id: FlowLevel; label: string; icon: string; bg: string }> = [
    { id: 'none', label: 'None', icon: '🤍', bg: 'bg-gray-50' },
    { id: 'spotting', label: 'Spotting', icon: '🌸', bg: 'bg-blush-50' },
    { id: 'light', label: 'Light', icon: '💧', bg: 'bg-rose-50' },
    { id: 'medium', label: 'Medium', icon: '🩸', bg: 'bg-rose-100' },
    { id: 'heavy', label: 'Heavy', icon: '✨🩸', bg: 'bg-rose-200' },
  ];

  const painLevels: Array<{ level: PainLevel; label: string; desc: string; emoji: string }> = [
    { level: 0, label: 'None', desc: 'No cramps', emoji: '🌿' },
    { level: 1, label: 'Mild', desc: 'Light flutter', emoji: '🦋' },
    { level: 2, label: 'Moderate', desc: 'Heat pack helps', emoji: '☕' },
    { level: 3, label: 'Severe', desc: 'Need rest', emoji: '🛌' },
  ];

  const moods: Array<{ id: MoodType; emoji: string; label: string }> = [
    { id: 'calm', emoji: '😌', label: 'Calm' },
    { id: 'sensitive', emoji: '🥺', label: 'Sensitive' },
    { id: 'tired', emoji: '😴', label: 'Sleepy' },
    { id: 'energetic', emoji: '⚡', label: 'Energetic' },
    { id: 'anxious', emoji: '😰', label: 'Anxious' },
  ];

  const commonSymptoms = [
    { id: 'cramps', label: 'Cramps', emoji: '⚡' },
    { id: 'bloating', label: 'Bloating', emoji: '🎈' },
    { id: 'acne', label: 'Acne', emoji: '✨' },
    { id: 'backache', label: 'Backache', emoji: '🧘' },
    { id: 'tender_breasts', label: 'Tender Breasts', emoji: '🌸' },
    { id: 'headache', label: 'Headache', emoji: '🤕' },
  ];

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    logCycleEntry({
      id: 'log-' + Date.now(),
      date: todayStr,
      timestamp: Date.now(),
      flow,
      pain,
      mood,
      symptoms: selectedSymptoms
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveTab('home');
    }, 1100);
  };

  return (
    <div className="space-y-3.5 pb-24 pt-2 px-3.5 max-w-md mx-auto font-sans">
      {/* Visual Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blush-600 bg-blush-100 px-2.5 py-0.5 rounded-full">
            10-Second Silent Log
          </span>
          <h2 className="text-xl font-bold font-serif text-plum-950 mt-1">
            How is your body today?
          </h2>
        </div>
        <div className="text-right text-xs text-plum-600 font-bold bg-white px-2.5 py-1 rounded-full border border-cream-200 shadow-xs flex items-center">
          <Calendar size={12} className="mr-1 text-blush-500" />
          Today
        </div>
      </div>

      {savedSuccess ? (
        <div className="bg-gradient-to-br from-[#F5FAF6] to-[#EBF5EE] border border-sage-200 rounded-[32px] p-8 text-center space-y-2 animate-in zoom-in-95 duration-200 shadow-soft">
          <div className="w-16 h-16 bg-sage-500 text-white rounded-full mx-auto flex items-center justify-center shadow-float text-2xl">
            🌸
          </div>
          <h3 className="text-xl font-bold text-sage-900 font-serif">
            Logged with Love!
          </h3>
          <p className="text-xs text-sage-700 font-medium">
            Saved 100% privately on your device.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* TAP 1: FLOW LEVEL (Cute Visual Tiles) */}
          <div className="bg-white rounded-[28px] p-3.5 border border-blush-100 shadow-soft space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-plum-950">
              <span className="flex items-center space-x-1.5">
                <span className="text-sm">🩸</span>
                <span>Tap 1: Flow Today</span>
              </span>
              <span className="text-[10px] font-bold text-blush-500 capitalize bg-blush-50 px-2 py-0.5 rounded-full">
                {flow}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {flowOptions.map(opt => {
                const isSelected = flow === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFlow(opt.id)}
                    className={`py-2 px-1 rounded-2xl border flex flex-col items-center justify-center transition-all min-h-[58px] active:scale-95 ${
                      isSelected
                        ? 'border-plum-800 bg-plum-800 text-cream-50 font-bold shadow-sm'
                        : 'border-cream-200 bg-cream-50/50 hover:bg-cream-100 text-plum-900'
                    }`}
                  >
                    <span className="text-lg leading-none mb-1">{opt.icon}</span>
                    <span className="text-[11px] font-bold leading-none">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAP 2: PAIN LEVEL (4 Visual Mood Tiles) */}
          <div className="bg-white rounded-[28px] p-3.5 border border-blush-100 shadow-soft space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-plum-950">
              <span className="flex items-center space-x-1.5">
                <span className="text-sm">🦋</span>
                <span>Tap 2: Cramps & Comfort</span>
              </span>
              <span className="text-[10px] font-bold text-blush-500 bg-blush-50 px-2 py-0.5 rounded-full">
                {painLevels[pain].label}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {painLevels.map(p => {
                const isSelected = pain === p.level;
                return (
                  <button
                    key={p.level}
                    type="button"
                    onClick={() => setPain(p.level)}
                    className={`py-2 px-1 rounded-2xl border flex flex-col items-center justify-center transition-all min-h-[56px] active:scale-95 ${
                      isSelected
                        ? 'border-plum-800 bg-plum-800 text-cream-50 font-bold shadow-sm'
                        : 'border-cream-200 bg-cream-50/50 text-plum-900 hover:bg-cream-100'
                    }`}
                  >
                    <span className="text-base leading-none mb-0.5">{p.emoji}</span>
                    <span className="text-[11px] font-bold">{p.label}</span>
                    <span className={`text-[9px] ${isSelected ? 'text-dustyrose-200' : 'text-plum-500'}`}>
                      {p.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAP 3: MOOD EMOJIS & 1-TAP SYMPTOMS */}
          <div className="bg-white rounded-[28px] p-3.5 border border-blush-100 shadow-soft space-y-2.5">
            <div className="text-xs font-bold text-plum-950 flex items-center space-x-1.5">
              <span className="text-sm">🌸</span>
              <span>Tap 3: Mood & Feelings</span>
            </div>

            {/* Big friendly emoji bubbles */}
            <div className="grid grid-cols-5 gap-1.5">
              {moods.map(m => {
                const isSelected = mood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMood(m.id)}
                    className={`py-2 px-1 rounded-2xl border flex flex-col items-center justify-center transition-all min-h-[52px] active:scale-95 ${
                      isSelected
                        ? 'border-plum-800 bg-plum-800 text-cream-50 font-bold shadow-sm'
                        : 'border-cream-200 bg-cream-50/50 text-plum-900 hover:bg-cream-100'
                    }`}
                  >
                    <span className="text-xl leading-none mb-1">{m.emoji}</span>
                    <span className="text-[10px] font-bold">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Cute 1-tap symptom pills */}
            <div className="pt-2 border-t border-cream-100">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-plum-600 block mb-1.5">
                Quick 1-Tap Signs:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {commonSymptoms.map(sym => {
                  const isChecked = selectedSymptoms.includes(sym.id);
                  return (
                    <button
                      key={sym.id}
                      type="button"
                      onClick={() => toggleSymptom(sym.id)}
                      className={`text-xs py-1 px-2.5 rounded-full border transition-all active:scale-95 font-bold flex items-center space-x-1 ${
                        isChecked
                          ? 'bg-plum-100 border-plum-400 text-plum-900 shadow-xs'
                          : 'bg-white border-cream-200 text-plum-700 hover:border-plum-300'
                      }`}
                    >
                      <span>{sym.emoji}</span>
                      <span>{sym.label}</span>
                      {isChecked && <span className="text-blush-500 ml-0.5">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ONE-THUMB 1-TAP SAVE CTA */}
          <div className="pt-1">
            <button
              onClick={handleSave}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-plum-800 via-plum-700 to-plum-900 hover:from-plum-900 hover:to-plum-950 active:scale-98 text-cream-50 font-bold text-sm rounded-full shadow-float flex items-center justify-center space-x-2 transition-all min-h-[52px]"
            >
              <Sparkles size={16} className="text-blush-300" />
              <span>Log Entry in 1-Tap</span>
              <span>🌸</span>
            </button>
            <p className="text-[11px] text-center text-plum-600 mt-2 font-medium">
              🔒 Completely private • No sound, no typing
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
