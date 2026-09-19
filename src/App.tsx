import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { CamouflageView } from './components/layout/CamouflageView';
import { HomeTab } from './components/home/HomeTab';
import { LogTab } from './components/log/LogTab';
import { AskTab } from './components/ask/AskTab';
import { ShowSomeoneModal } from './components/summary/ShowSomeoneModal';
import { SettingsModal } from './components/settings/SettingsModal';
import { BrandVideoIntro } from './components/opening/BrandVideoIntro';

export const App: React.FC = () => {
  const { activeTab, camouflageActive, profile, updateUserProfile } = useApp();

  // Show intro if ?intro=1 or if user opens for first time in tab session
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('intro') === '1' || urlParams.get('intro') === 'true') {
        return true;
      }
      const hasSeen = sessionStorage.getItem('between_us_intro_shown');
      if (!hasSeen && !profile.hasCompletedOnboarding) {
        sessionStorage.setItem('between_us_intro_shown', '1');
        return true;
      }
    }
    return false;
  });

  useEffect(() => {
    const handleReplay = () => setShowIntro(true);
    window.addEventListener('replay-brand-intro', handleReplay);
    return () => window.removeEventListener('replay-brand-intro', handleReplay);
  }, []);

  // If Camouflage Mode is activated (for privacy in bathroom stall or home),
  // immediately show the innocuous revision notes & calculator screen!
  if (camouflageActive) {
    return <CamouflageView />;
  }

  return (
    <div className="min-h-screen bg-[#DDD4D1] flex justify-center selection:bg-coral-200">
      {/* Mobile-first framed container */}
      <div className="w-full max-w-md bg-base-cream min-h-screen flex flex-col shadow-2xl relative border-x border-cream-200/80">
        <Header />

        <main className="flex-1 overflow-x-hidden">
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'log' && <LogTab />}
          {activeTab === 'ask' && <AskTab />}
        </main>

        <Navigation />

        {/* Floating Modals */}
        <ShowSomeoneModal />
        <SettingsModal />

        {/* Brand Video Intro Overlay: Non-blocking, instant visibility, smooth exit */}
        {showIntro && (
          <BrandVideoIntro
            onComplete={() => {
              setShowIntro(false);
              updateUserProfile({ hasCompletedOnboarding: true });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
