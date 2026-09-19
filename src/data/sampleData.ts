import { LogEntry } from '../types';

// Helper to generate dates relative to today
const createRelativeDate = (daysAgo: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

// 3 realistic logged cycles showing a slightly extended rhythm (~46-48 days)
// with hormonal acne and moderate cramps — perfect for testing pattern detection
export const DEMO_LOG_ENTRIES: LogEntry[] = [
  // Cycle 1 (Starts 98 days ago, 4 days of bleeding)
  {
    id: 'demo-1',
    date: createRelativeDate(98),
    timestamp: Date.now() - 98 * 86400000,
    flow: 'medium',
    pain: 2,
    mood: 'sensitive',
    symptoms: ['cramps', 'bloating']
  },
  {
    id: 'demo-2',
    date: createRelativeDate(97),
    timestamp: Date.now() - 97 * 86400000,
    flow: 'heavy',
    pain: 2,
    mood: 'tired',
    symptoms: ['cramps', 'backache']
  },
  {
    id: 'demo-3',
    date: createRelativeDate(96),
    timestamp: Date.now() - 96 * 86400000,
    flow: 'light',
    pain: 1,
    mood: 'calm',
    symptoms: ['bloating']
  },
  {
    id: 'demo-4',
    date: createRelativeDate(95),
    timestamp: Date.now() - 95 * 86400000,
    flow: 'spotting',
    pain: 0,
    mood: 'energetic',
    symptoms: []
  },

  // Mid-cycle hormonal symptom logs
  {
    id: 'demo-5',
    date: createRelativeDate(75),
    timestamp: Date.now() - 75 * 86400000,
    flow: 'none',
    pain: 0,
    mood: 'anxious',
    symptoms: ['acne', 'bloating']
  },

  // Cycle 2 (Starts 50 days ago -> 48 day cycle gap, 5 days of bleeding)
  {
    id: 'demo-6',
    date: createRelativeDate(50),
    timestamp: Date.now() - 50 * 86400000,
    flow: 'medium',
    pain: 3,
    mood: 'sensitive',
    symptoms: ['cramps', 'headache', 'acne']
  },
  {
    id: 'demo-7',
    date: createRelativeDate(49),
    timestamp: Date.now() - 49 * 86400000,
    flow: 'heavy',
    pain: 2,
    mood: 'tired',
    symptoms: ['cramps', 'backache']
  },
  {
    id: 'demo-8',
    date: createRelativeDate(48),
    timestamp: Date.now() - 48 * 86400000,
    flow: 'medium',
    pain: 1,
    mood: 'calm',
    symptoms: []
  },
  {
    id: 'demo-9',
    date: createRelativeDate(47),
    timestamp: Date.now() - 47 * 86400000,
    flow: 'light',
    pain: 0,
    mood: 'calm',
    symptoms: []
  },

  // Mid-cycle check
  {
    id: 'demo-10',
    date: createRelativeDate(25),
    timestamp: Date.now() - 25 * 86400000,
    flow: 'none',
    pain: 0,
    mood: 'sensitive',
    symptoms: ['acne']
  },

  // Cycle 3 (Starts 4 days ago -> 46 day cycle gap)
  {
    id: 'demo-11',
    date: createRelativeDate(4),
    timestamp: Date.now() - 4 * 86400000,
    flow: 'medium',
    pain: 2,
    mood: 'tired',
    symptoms: ['cramps', 'bloating', 'acne']
  },
  {
    id: 'demo-12',
    date: createRelativeDate(3),
    timestamp: Date.now() - 3 * 86400000,
    flow: 'heavy',
    pain: 2,
    mood: 'sensitive',
    symptoms: ['cramps', 'backache']
  },
  {
    id: 'demo-13',
    date: createRelativeDate(2),
    timestamp: Date.now() - 2 * 86400000,
    flow: 'light',
    pain: 1,
    mood: 'calm',
    symptoms: ['bloating']
  }
];
