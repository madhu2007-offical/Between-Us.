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
import { SparkleBloomTransition } from './components/opening/SparkleBloomTransition';
import { WelcomeEntryScreen } from './components/opening/WelcomeEntryScreen';
import { MicroOnboarding } from './components/opening/MicroOnboarding';

export const App: React.FC = () => {
  const { activeTab, camouflageActive, profile, updateUserProfile } = useApp();

  // First-Contact Stage Management
  // 'video' -> 'transition' -> 'welcome' -> 'onboarding' -> 'app'
  const [openingStage, setOpeningStage] = useState<'video' | 'transition' | 'welcome' | 'onboarding' | 'app'>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('intro') === '1' || urlParams.get('intro') === 'true') {
        return 'video';
      }
    }
    return profile.hasCompletedOnboarding ? 'app' : 'video';
  });

  useEffect(() => {
    const handleReplay = () => setOpeningStage('video');
    window.addEventListener('replay-brand-intro', handleReplay);
    return () => window.removeEventListener('replay-brand-intro', handleReplay);
  }, []);

  // If Camouflage Mode is activated (for privacy in bathroom stall or home),
  // immediately show the innocuous revision notes & calculator screen!
  if (camouflageActive) {
    return <CamouflageView />;
  }

  // 1. Step 1: Full-Screen Brand Video Intro (0:00–0:10, skip after 3s)
  if (openingStage === 'video') {
    return <BrandVideoIntro onComplete={() => setOpeningStage('transition')} />;
  }

  // 2. Step 2: Sparkle Bloom Transition (dissolves seamlessly without hard cut)
  if (openingStage === 'transition') {
    return <SparkleBloomTransition onTransitionEnd={() => setOpeningStage('welcome')} />;
  }

  // 3. Step 3: Reimagined Privacy Entry Screen ("Start privately" / "I've been here before")
  if (openingStage === 'welcome') {
    return (
      <WelcomeEntryScreen
        onStartPrivately={() => setOpeningStage('onboarding')}
        onReturningUserSuccess={() => setOpeningStage('app')}
      />
    );
  }

  // 4. Step 4: 3-Screen Custom Micro-Onboarding (No progress dots, emotional continuity)
  if (openingStage === 'onboarding') {
    return (
      <MicroOnboarding
        onComplete={() => {
          updateUserProfile({ hasCompletedOnboarding: true });
          setOpeningStage('app');
        }}
      />
    );
  }

  // 5. Live App Experience
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
      </div>
    </div>
  );
};

export default App;
