export type FlowLevel = 'none' | 'spotting' | 'light' | 'medium' | 'heavy';
export type PainLevel = 0 | 1 | 2 | 3; // 0: None, 1: Mild, 2: Moderate, 3: Intense
export type MoodType = 'calm' | 'sensitive' | 'tired' | 'energetic' | 'anxious';

export interface LogEntry {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  flow: FlowLevel;
  pain: PainLevel;
  mood: MoodType;
  symptoms: string[]; // 'cramps', 'bloating', 'acne', 'backache', 'headache', etc.
  notes?: string;
}

export interface UserProfile {
  hasCompletedOnboarding: boolean;
  ageBracket?: '12-14' | '15-17' | '18+';
  periodStage?: 'not_started' | 'first_year' | 'regular_awhile';
  discreetModeEnabled: boolean;
  customApiKey?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'sister';
  timestamp: number;
  text: string;
  type?: 'text' | 'safety_card' | 'citation_answer';
  safetyData?: {
    title: string;
    compassionateMessage: string;
    immediateActions: string[];
    helplines: Array<{
      name: string;
      number: string;
      description: string;
      tollFree?: boolean;
    }>;
  };
  citations?: Array<{
    id: string;
    question: string;
    keyTakeaway: string;
  }>;
  doctorAdvice?: string;
  keyTakeaway?: string;
  source?: 'gemini_grounded' | 'curated_fallback' | 'uncertain_fallback';
}

export interface PatternInsight {
  status: 'regular' | 'irregular_gap' | 'high_pain' | 'hormonal_cluster' | 'insufficient_data';
  title: string;
  badge: string;
  summary: string;
  reassurance: string;
  actionAdvice: string;
  averageCycleDays?: number;
  recordedCyclesCount: number;
  flaggedReasons: string[];
}
