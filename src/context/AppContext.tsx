import React, { createContext, useContext, useState, useEffect } from 'react';
import { LogEntry, UserProfile, ChatMessage, PatternInsight } from '../types';
import {
  getStoredLogs,
  saveLogs,
  addLogEntry,
  getStoredProfile,
  saveProfile,
  getStoredChatHistory,
  saveChatHistory,
  clearAllData,
  resetToDemoData
} from '../utils/storage';
import { evaluatePattern, analyzeCycleLogs, CycleStats } from '../utils/patternEngine';

interface AppContextType {
  activeTab: 'home' | 'ask' | 'log';
  setActiveTab: (tab: 'home' | 'ask' | 'log') => void;
  logs: LogEntry[];
  stats: CycleStats;
  patternInsight: PatternInsight;
  profile: UserProfile;
  chatHistory: ChatMessage[];
  camouflageActive: boolean;
  setCamouflageActive: (active: boolean) => void;
  showSomeoneOpen: boolean;
  setShowSomeoneOpen: (open: boolean) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  logCycleEntry: (entry: LogEntry) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  sendChatMessage: (text: string) => Promise<void>;
  resetAllData: () => void;
  loadSampleDemoData: () => void;
  isChatLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'ask' | 'log'>('home');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile());
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [camouflageActive, setCamouflageActive] = useState<boolean>(false);
  const [showSomeoneOpen, setShowSomeoneOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  useEffect(() => {
    setLogs(getStoredLogs());
    setProfile(getStoredProfile());
    setChatHistory(getStoredChatHistory());
  }, []);

  const stats = analyzeCycleLogs(logs);
  const patternInsight = evaluatePattern(logs);

  const logCycleEntry = (entry: LogEntry) => {
    const updated = addLogEntry(entry);
    setLogs(updated);
  };

  const updateUserProfile = (newVals: Partial<UserProfile>) => {
    const updated = saveProfile(newVals);
    setProfile(updated);
  };

  const sendChatMessage = async (text: string) => {
    if (!text.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      timestamp: Date.now(),
      text: text.trim()
    };

    const updatedHistory = [...chatHistory, userMsg];
    setChatHistory(updatedHistory);
    saveChatHistory(updatedHistory);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text.trim(),
          customApiKey: profile.customApiKey
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      let sisterMsg: ChatMessage;

      if (data.type === 'safety_card') {
        sisterMsg = {
          id: 'sister-' + Date.now(),
          sender: 'sister',
          timestamp: Date.now(),
          text: data.safety.compassionateMessage,
          type: 'safety_card',
          safetyData: data.safety
        };
      } else {
        sisterMsg = {
          id: 'sister-' + Date.now(),
          sender: 'sister',
          timestamp: Date.now(),
          text: data.answer,
          type: 'citation_answer',
          citations: data.citations,
          doctorAdvice: data.doctorAdvice,
          keyTakeaway: data.keyTakeaway,
          source: data.source
        };
      }

      const finalHistory = [...updatedHistory, sisterMsg];
      setChatHistory(finalHistory);
      saveChatHistory(finalHistory);
    } catch (err) {
      console.error('Chat error:', err);
      // Resilient fallback message
      const fallbackMsg: ChatMessage = {
        id: 'sister-' + Date.now(),
        sender: 'sister',
        timestamp: Date.now(),
        text: "I'm having a little trouble connecting right now, but please remember: you are safe, your body is completely normal, and you can try asking again in a minute, or check our verified topics above!"
      };
      const finalHistory = [...updatedHistory, fallbackMsg];
      setChatHistory(finalHistory);
      saveChatHistory(finalHistory);
    } finally {
      setIsChatLoading(false);
    }
  };

  const resetAllData = () => {
    clearAllData();
    setLogs([]);
    setChatHistory(getStoredChatHistory());
    setProfile({
      hasCompletedOnboarding: false,
      discreetModeEnabled: false
    });
  };

  const loadSampleDemoData = () => {
    const demo = resetToDemoData();
    setLogs(demo);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        logs,
        stats,
        patternInsight,
        profile,
        chatHistory,
        camouflageActive,
        setCamouflageActive,
        showSomeoneOpen,
        setShowSomeoneOpen,
        settingsOpen,
        setSettingsOpen,
        logCycleEntry,
        updateUserProfile,
        sendChatMessage,
        resetAllData,
        loadSampleDemoData,
        isChatLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
