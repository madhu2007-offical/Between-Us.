import React from 'react';
import {
  HeartHandshake,
  MessageCircleHeart,
  PlusCircle,
  Calendar,
  Sparkles,
  RotateCcw,
  Smile,
  ShieldCheck,
  Droplets,
  Heart,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RhythmWheel } from './RhythmWheel';
import { PatternAlert } from './PatternAlert';

export const HomeTab: React.FC = () => {
  const {
    logs,
    stats,
    patternInsight,
    setActiveTab,
    setShowSomeoneOpen,
    loadSampleDemoData,
    resetAllData
  } = useApp();

  const isDemoActive = logs.some(l => l.id.startsWith('demo-'));

  return (
    <div className="space-y-4 pb-24 pt-2 px-3.5 max-w-md mx-auto font-sans">
      {/* Feminine Soft Welcome Banner - High Contrast Deep Violet Plum */}
      <div className="bg-gradient-to-br from-[#381C54] via-[#2D1445] to-[#1E0B30] text-white rounded-[32px] p-5 shadow-float relative overflow-hidden border border-white/10">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-coral-primary/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-primary/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% Private On Your Phone</span>
            </div>
            <img
              src="/logo.png"
              alt="Between Us Logo"
              className="h-8 w-auto object-contain bg-white rounded-xl px-2 py-1 shadow-sm border border-white/20"
            />
          </div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-white pt-1">
            Hey, take a gentle breath.
          </h2>
          <p className="text-xs text-violet-100 font-medium leading-relaxed">
            Real questions. Better answers. Your body is safe here.
          </p>
        </div>

        {/* 3 Visual Action Buttons with High Contrast */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 pt-3.5 border-t border-white/15 relative z-10">
          <button
            onClick={() => setActiveTab('ask')}
            className="flex flex-col items-center justify-center p-3 bg-white/15 hover:bg-white/25 active:scale-95 rounded-2xl transition-all border border-white/25 shadow-sm group"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">💬</span>
            <span className="text-[12px] font-bold text-white">Ask Sister</span>
          </button>

          <button
            onClick={() => setActiveTab('log')}
            className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-coral-primary to-coral-600 hover:from-coral-400 hover:to-coral-500 active:scale-95 rounded-2xl transition-all shadow-md border border-coral-300/40 group text-white"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🩸</span>
            <span className="text-[12px] font-extrabold text-white">10s Log</span>
          </button>

          <button
            onClick={() => setShowSomeoneOpen(true)}
            className="flex flex-col items-center justify-center p-3 bg-white/15 hover:bg-white/25 active:scale-95 rounded-2xl transition-all border border-white/25 shadow-sm group"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">💌</span>
            <span className="text-[12px] font-bold text-white">Summary Card</span>
          </button>
        </div>
      </div>

      {/* Visual Rhythm Wheel */}
      <RhythmWheel
        stats={stats}
        onLogClick={() => setActiveTab('log')}
      />

      {/* Pattern Notice Alert */}
      <PatternAlert
        insight={patternInsight}
        onOpenSummary={() => setShowSomeoneOpen(true)}
      />

      {/* Visual "Show Someone" Feature Tile */}
      {/* Visual "Show Someone" Feature Tile */}
      <div
        onClick={() => setShowSomeoneOpen(true)}
        className="bg-gradient-to-r from-white to-[#FFF5F8] rounded-[28px] p-4.5 border border-cream-300 shadow-soft cursor-pointer active:scale-98 transition-all hover:border-coral-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-coral-100 text-coral-primary flex items-center justify-center text-xl shrink-0 shadow-sm">
              💌
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h4 className="font-extrabold text-sm text-ink">
                  "Show Someone" Card
                </h4>
                <span className="text-[10px] font-bold text-coral-primary bg-coral-100 px-2 py-0.5 rounded-full">
                  1-Tap PNG
                </span>
              </div>
              <p className="text-[12px] text-ink/75 font-medium mt-0.5">
                Hand phone to mom or doctor without awkward words
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-ink/40 shrink-0 ml-2" />
        </div>
      </div>

      {/* Visual Logged Days Strip */}
      <div className="bg-white rounded-[28px] p-4.5 border border-cream-200 shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 font-extrabold text-xs text-ink">
            <Calendar size={14} className="text-coral-primary" />
            <span>Recent Logged Days</span>
          </div>
          <span className="text-[11px] text-ink/80 font-bold bg-cream-100 px-2 py-0.5 rounded-full">
            {logs.length} logged
          </span>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-6 space-y-1">
            <span className="text-3xl block">🌸</span>
            <p className="text-xs text-ink/70 font-medium">
              No entries logged yet. Tap "10s Log" when you notice your period!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
            {logs.slice(0, 4).map((entry) => {
              const dateObj = new Date(entry.date);
              const formattedDate = dateObj.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              });

              return (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-cream-50/70 border border-cream-200 text-xs"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-8 h-8 rounded-full bg-white text-ink font-extrabold flex items-center justify-center shadow-xs text-[11px] border border-cream-200">
                      {dateObj.getDate()}
                    </span>
                    <div>
                      <div className="font-bold text-ink text-xs">{formattedDate}</div>
                      <div className="text-[11px] text-ink/70 flex items-center space-x-1.5 mt-0.5">
                        <span className="capitalize font-semibold">Flow: {entry.flow}</span>
                        <span>•</span>
                        <span className="font-semibold">Pain: {entry.pain}/3</span>
                      </div>
                    </div>
                  </div>

                  {entry.symptoms.length > 0 && (
                    <div className="flex gap-1 flex-wrap justify-end">
                      {entry.symptoms.slice(0, 2).map(s => (
                        <span
                          key={s}
                          className="text-[10px] font-bold bg-white text-ink px-2 py-0.5 rounded-full border border-cream-300 capitalize shadow-xs"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Demo Switcher for Evaluation */}
        <div className="pt-2 border-t border-cream-100 flex items-center justify-between text-[11px]">
          <span className="text-ink/60 font-medium">
            {isDemoActive ? '🌸 3-cycle demo active' : '📱 Clean phone storage'}
          </span>
          {isDemoActive ? (
            <button
              onClick={resetAllData}
              className="text-coral-primary hover:text-coral-600 font-bold"
            >
              Clear to Blank State
            </button>
          ) : (
            <button
              onClick={loadSampleDemoData}
              className="text-violet-800 hover:text-violet-950 font-bold flex items-center"
            >
              <RotateCcw size={11} className="mr-1" />
              Load Sample 3-Cycle Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
