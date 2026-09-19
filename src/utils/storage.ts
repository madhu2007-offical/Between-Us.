import { LogEntry, UserProfile, ChatMessage } from '../types';
import { DEMO_LOG_ENTRIES } from '../data/sampleData';

const STORAGE_KEYS = {
  LOGS: 'between_us_logs_v1',
  PROFILE: 'between_us_profile_v1',
  CHAT: 'between_us_chat_history_v1',
  SETTINGS: 'between_us_settings_v1',
};

export const getStoredLogs = (): LogEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (!data) {
      // First time initialization with demo data so the app demonstrates the pattern engine immediately
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(DEMO_LOG_ENTRIES));
      return DEMO_LOG_ENTRIES;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read logs from storage:', err);
    return [];
  }
};

export const saveLogs = (logs: LogEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  } catch (err) {
    console.error('Failed to save logs to storage:', err);
  }
};

export const addLogEntry = (entry: LogEntry): LogEntry[] => {
  const current = getStoredLogs();
  // If entry for this date already exists, update it; otherwise append
  const existingIdx = current.findIndex(e => e.date === entry.date);
  let updated: LogEntry[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = entry;
  } else {
    updated = [entry, ...current];
  }
  saveLogs(updated);
  return updated;
};

export const getStoredProfile = (): UserProfile => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {}
  return {
    hasCompletedOnboarding: false,
    discreetModeEnabled: false
  };
};

export const saveProfile = (profile: Partial<UserProfile>): UserProfile => {
  const current = getStoredProfile();
  const updated = { ...current, ...profile };
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
  } catch (e) {}
  return updated;
};

export const getStoredChatHistory = (): ChatMessage[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHAT);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {}
  // Default welcome message from Big Sister
  return [
    {
      id: 'welcome-sister-msg',
      sender: 'sister',
      timestamp: Date.now(),
      text: "Hey! 🌸 I'm your Big Sister companion. You can ask me anything about your period, cramps, weird changes in your body, or things you feel shy asking adults. Everything here stays 100% on your phone. What's on your mind today?"
    }
  ];
};

export const saveChatHistory = (messages: ChatMessage[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(messages));
  } catch (e) {}
};

export const clearAllData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.CHAT);
  } catch (e) {}
};

export const resetToDemoData = (): LogEntry[] => {
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(DEMO_LOG_ENTRIES));
  return DEMO_LOG_ENTRIES;
};
