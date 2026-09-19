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
      {/* Feminine Soft Welcome Banner */}
      <div className="bg-gradient-to-br from-plum-900 via-plum-800 to-plum-950 text-cream-50 rounded-[32px] p-5 shadow-float relative overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-blush-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-petal-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-1">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[11px] font-bold text-blush-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% Private On Your Phone</span>
            </div>
            <img
              src="/logo.png"
              alt="Between Us Logo"
              className="w-10 h-7 object-contain bg-white/95 rounded-lg px-1 py-0.5 shadow-sm"
            />
          </div>
          <h2 className="text-2xl font-bold font-serif tracking-tight text-cream-50 pt-1">
            Hey, take a gentle breath.
          </h2>
          <p className="text-xs text-dustyrose-100 font-medium leading-relaxed">
            Real questions. Better answers. Your body is safe here.
          </p>
        </div>

        {/* 3 Visual Action Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 relative z-10">
          <button
            onClick={() => setActiveTab('ask')}
            className="flex flex-col items-center justify-center p-2.5 bg-white/10 hover:bg-white/20 active:scale-95 rounded-2xl transition-all group"
          >
            <span className="text-lg mb-1 group-hover:scale-110 transition-transform">💬</span>
            <span className="text-[11px] font-bold text-cream-50">Ask Sister</span>
          </button>

          <button
            onClick={() => setActiveTab('log')}
            className="flex flex-col items-center justify-center p-2.5 bg-gradient-to-br from-blush-400 to-blush-500 hover:from-blush-500 hover:to-blush-600 active:scale-95 rounded-2xl transition-all shadow-sm group text-plum-950"
          >
            <span className="text-lg mb-1 group-hover:scale-110 transition-transform">🩸</span>
            <span className="text-[11px] font-extrabold">10s Log</span>
          </button>

          <button
            onClick={() => setShowSomeoneOpen(true)}
            className="flex flex-col items-center justify-center p-2.5 bg-white/10 hover:bg-white/20 active:scale-95 rounded-2xl transition-all group"
          >
            <span className="text-lg mb-1 group-hover:scale-110 transition-transform">💌</span>
            <span className="text-[11px] font-bold text-cream-50">Summary Card</span>
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
      <div
        onClick={() => setShowSomeoneOpen(true)}
        className="bg-gradient-to-r from-[#FFF5F7] to-[#FFF9FB] rounded-[28px] p-4.5 border border-blush-200/90 shadow-soft cursor-pointer active:scale-98 transition-all hover:border-blush-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-blush-100 text-blush-600 flex items-center justify-center text-xl shrink-0 shadow-sm">
              💌
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h4 className="font-extrabold text-sm text-plum-950">
                  "Show Someone" Card
                </h4>
                <span className="text-[10px] font-bold text-blush-600 bg-blush-100 px-2 py-0.2 rounded-full">
                  1-Tap PNG
                </span>
              </div>
              <p className="text-[11px] text-plum-700 font-medium mt-0.5">
                Hand phone to mom or doctor without awkward words
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-plum-400 shrink-0 ml-2" />
        </div>
      </div>

      {/* Visual Logged Days Strip */}
      <div className="bg-white rounded-[28px] p-4.5 border border-cream-200 shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 font-extrabold text-xs text-plum-950">
            <Calendar size={14} className="text-blush-500" />
            <span>Recent Logged Days</span>
          </div>
          <span className="text-[11px] text-plum-600 font-bold bg-cream-100 px-2 py-0.5 rounded-full">
            {logs.length} logged
          </span>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-6 space-y-1">
            <span className="text-3xl block">🌸</span>
            <p className="text-xs text-plum-600 font-medium">
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
                  className="flex items-center justify-between p-2.5 rounded-2xl bg-blush-50/40 border border-blush-100 text-xs"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-8 h-8 rounded-full bg-white text-plum-900 font-bold flex items-center justify-center shadow-xs text-[11px] border border-blush-100">
                      {dateObj.getDate()}
                    </span>
                    <div>
                      <div className="font-bold text-plum-900 text-xs">{formattedDate}</div>
                      <div className="text-[11px] text-plum-600 flex items-center space-x-1.5 mt-0.5">
                        <span className="capitalize font-medium">Flow: {entry.flow}</span>
                        <span>•</span>
                        <span className="font-medium">Pain: {entry.pain}/3</span>
                      </div>
                    </div>
                  </div>

                  {entry.symptoms.length > 0 && (
                    <div className="flex gap-1 flex-wrap justify-end">
                      {entry.symptoms.slice(0, 2).map(s => (
                        <span
                          key={s}
                          className="text-[10px] font-bold bg-white text-plum-800 px-2 py-0.5 rounded-full border border-blush-100 capitalize shadow-xs"
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
          <span className="text-plum-500 font-medium">
            {isDemoActive ? '🌸 3-cycle demo active' : '📱 Clean phone storage'}
          </span>
          {isDemoActive ? (
            <button
              onClick={resetAllData}
              className="text-blush-600 hover:text-blush-700 font-bold"
            >
              Clear to Blank State
            </button>
          ) : (
            <button
              onClick={loadSampleDemoData}
              className="text-plum-800 hover:text-plum-950 font-bold flex items-center"
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
