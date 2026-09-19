import React, { useState } from 'react';
import {
  Droplets,
  Heart,
  Smile,
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap
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

  // 1-Tap Presets for ultra-fast bathroom logging
  const quickPresets = [
    {
      label: 'Just Spotting',
      emoji: '🌸',
      flow: 'spotting' as FlowLevel,
      pain: 0 as PainLevel,
      mood: 'calm' as MoodType,
      symptoms: []
    },
    {
      label: 'Day 1 Crampy',
      emoji: '⚡',
      flow: 'medium' as FlowLevel,
      pain: 2 as PainLevel,
      mood: 'sensitive' as MoodType,
      symptoms: ['cramps']
    },
    {
      label: 'Heavy Flow',
      emoji: '🩸',
      flow: 'heavy' as FlowLevel,
      pain: 2 as PainLevel,
      mood: 'tired' as MoodType,
      symptoms: ['cramps', 'backache']
    },
    {
      label: 'Clear & Good',
      emoji: '🌿',
      flow: 'none' as FlowLevel,
      pain: 0 as PainLevel,
      mood: 'energetic' as MoodType,
      symptoms: []
    },
  ];

  const flowOptions: Array<{ id: FlowLevel; label: string; icon: string }> = [
    { id: 'none', label: 'None', icon: '🤍' },
    { id: 'spotting', label: 'Spotting', icon: '🌸' },
    { id: 'light', label: 'Light', icon: '💧' },
    { id: 'medium', label: 'Medium', icon: '🩸' },
    { id: 'heavy', label: 'Heavy', icon: '🩸🩸' },
  ];

  const painLevels: Array<{ level: PainLevel; label: string; desc: string; emoji: string }> = [
    { level: 0, label: '0 • None', desc: 'No cramps', emoji: '🌿' },
    { level: 1, label: '1 • Mild', desc: 'Light flutter', emoji: '🦋' },
    { level: 2, label: '2 • Medium', desc: 'Heat bag helps', emoji: '☕' },
    { level: 3, label: '3 • Severe', desc: 'Need rest', emoji: '🛌' },
  ];

  const moods: Array<{ id: MoodType; emoji: string; label: string }> = [
    { id: 'calm', emoji: '😌', label: 'Calm' },
    { id: 'sensitive', emoji: '🥺', label: 'Sensitive' },
    { id: 'tired', emoji: '😴', label: 'Tired' },
    { id: 'energetic', emoji: '⚡', label: 'Active' },
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

  const executeSave = (f: FlowLevel, p: PainLevel, m: MoodType, syms: string[]) => {
    logCycleEntry({
      id: 'log-' + Date.now(),
      date: todayStr,
      timestamp: Date.now(),
      flow: f,
      pain: p,
      mood: m,
      symptoms: syms
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveTab('home');
    }, 1100);
  };

  const handleApplyPreset = (preset: typeof quickPresets[0]) => {
    setFlow(preset.flow);
    setPain(preset.pain);
    setMood(preset.mood);
    setSelectedSymptoms(preset.symptoms);
    executeSave(preset.flow, preset.pain, preset.mood, preset.symptoms);
  };

  return (
    <div className="space-y-3.5 pb-24 pt-2 px-3.5 max-w-md mx-auto font-sans select-none">
      {/* Visual Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-coral-primary bg-coral-50 px-2.5 py-0.5 rounded-full">
            Under 10 Seconds • Zero Sound
          </span>
          <h2 className="text-xl font-bold font-display text-ink mt-1">
            Log Today’s Rhythm
          </h2>
        </div>
        <div className="text-right text-xs text-ink/70 font-bold bg-white px-3 py-1 rounded-full border border-cream-200 shadow-xs flex items-center">
          <Calendar size={12} className="mr-1 text-coral-primary" />
          Today
        </div>
      </div>

      {savedSuccess ? (
        <div className="bg-[#FAF7F5] border border-sage-200 rounded-[32px] p-8 text-center space-y-2 animate-in zoom-in-95 duration-200 shadow-soft">
          <div className="w-16 h-16 bg-sage-500 text-white rounded-full mx-auto flex items-center justify-center shadow-float text-2xl">
            🌸
          </div>
          <h3 className="text-xl font-bold text-ink font-display">
            Logged with gentle care!
          </h3>
          <p className="text-xs text-ink/70 font-medium">
            Saved 100% privately on your device.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* USER-FRIENDLY FEATURE: 1-TAP INSTANT PRESETS */}
          <div className="bg-[#FAF7F5] rounded-[24px] p-3 border border-cream-200 shadow-xs">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-ink mb-2">
              <Zap size={13} className="text-coral-primary" />
              <span>In a hurry? 1-Tap Quick Presets:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {quickPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="p-2 rounded-xl bg-white hover:bg-coral-50 border border-cream-200 text-left active:scale-95 transition-all shadow-xs flex items-center space-x-2"
                >
                  <span className="text-base">{preset.emoji}</span>
                  <span className="text-[11px] font-bold text-ink leading-tight">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* TAP 1: FLOW LEVEL */}
          <div className="bg-white rounded-[26px] p-3.5 border border-cream-200 shadow-soft space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-ink">
              <span className="flex items-center space-x-1.5">
                <span>🩸</span>
                <span>Tap 1: Flow</span>
              </span>
              <span className="text-[10px] font-bold text-coral-primary capitalize bg-coral-50 px-2 py-0.5 rounded-full">
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
                        ? 'border-violet-primary bg-violet-primary text-white font-bold shadow-soft'
                        : 'border-cream-200 bg-cream-50/50 hover:bg-cream-100 text-ink'
                    }`}
                  >
                    <span className="text-lg leading-none mb-1">{opt.icon}</span>
                    <span className="text-[11px] font-bold leading-none">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAP 2: PAIN LEVEL */}
          <div className="bg-white rounded-[26px] p-3.5 border border-cream-200 shadow-soft space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-ink">
              <span className="flex items-center space-x-1.5">
                <span>🦋</span>
                <span>Tap 2: Cramps & Comfort</span>
              </span>
              <span className="text-[10px] font-bold text-coral-primary bg-coral-50 px-2 py-0.5 rounded-full">
                {painLevels[pain].desc}
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
                        ? 'border-violet-primary bg-violet-primary text-white font-bold shadow-soft'
                        : 'border-cream-200 bg-cream-50/50 text-ink hover:bg-cream-100'
                    }`}
                  >
                    <span className="text-base leading-none mb-0.5">{p.emoji}</span>
                    <span className="text-[11px] font-bold">{p.label}</span>
                    <span className={`text-[9px] ${isSelected ? 'text-violet-100' : 'text-ink/60'}`}>
                      {p.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAP 3: MOOD & SYMPTOMS */}
          <div className="bg-white rounded-[26px] p-3.5 border border-cream-200 shadow-soft space-y-2.5">
            <div className="text-xs font-bold text-ink flex items-center space-x-1.5">
              <span>🌸</span>
              <span>Tap 3: Mood & Feelings</span>
            </div>

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
                        ? 'border-violet-primary bg-violet-primary text-white font-bold shadow-soft'
                        : 'border-cream-200 bg-cream-50/50 text-ink hover:bg-cream-100'
                    }`}
                  >
                    <span className="text-xl leading-none mb-1">{m.emoji}</span>
                    <span className="text-[10px] font-bold">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick 1-Tap Signs */}
            <div className="pt-2 border-t border-cream-100">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink/60 block mb-1.5">
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
                          ? 'bg-violet-100 border-violet-300 text-violet-900 shadow-xs'
                          : 'bg-white border-cream-200 text-ink/75 hover:border-violet-300'
                      }`}
                    >
                      <span>{sym.emoji}</span>
                      <span>{sym.label}</span>
                      {isChecked && <span className="text-coral-primary ml-0.5">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ONE-THUMB 1-TAP SAVE CTA */}
          <div className="pt-1">
            <button
              onClick={() => executeSave(flow, pain, mood, selectedSymptoms)}
              className="w-full py-3.5 px-4 bg-coral-primary hover:bg-coral-500 active:scale-98 text-ink font-bold text-body rounded-full shadow-float flex items-center justify-center space-x-2 transition-all min-h-[52px]"
            >
              <Sparkles size={16} className="text-white" />
              <span>Save Entry in 1-Tap</span>
              <span>🌸</span>
            </button>
            <p className="text-[11px] text-center text-ink/50 mt-2 font-medium">
              Zero pressure. Log only when you want to • No streak shaming, ever.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
