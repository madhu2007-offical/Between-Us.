import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { CamouflageView } from './components/layout/CamouflageView';
import { WelcomeModal } from './components/onboarding/WelcomeModal';
import { HomeTab } from './components/home/HomeTab';
import { LogTab } from './components/log/LogTab';
import { AskTab } from './components/ask/AskTab';
import { ShowSomeoneModal } from './components/summary/ShowSomeoneModal';
import { SettingsModal } from './components/settings/SettingsModal';

export const App: React.FC = () => {
  const { activeTab, camouflageActive } = useApp();

  // If Camouflage Mode is activated (for privacy in bathroom stall or home),
  // immediately show the innocuous revision notes & calculator screen!
  if (camouflageActive) {
    return <CamouflageView />;
  }

  return (
    <div className="min-h-screen bg-[#F3EFEA] flex justify-center selection:bg-dustyrose-200">
      {/* Mobile-first framed container */}
      <div className="w-full max-w-md bg-[#FDFBF7] min-h-screen flex flex-col shadow-2xl relative border-x border-cream-200/80">
        <Header />

        <main className="flex-1 overflow-x-hidden">
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'log' && <LogTab />}
          {activeTab === 'ask' && <AskTab />}
        </main>

        <Navigation />

        {/* Floating Modals */}
        <WelcomeModal />
        <ShowSomeoneModal />
        <SettingsModal />
      </div>
    </div>
  );
};

export default App;
