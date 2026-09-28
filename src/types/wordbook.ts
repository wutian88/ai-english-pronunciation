export type TrackId = 'daily' | 'ai';
export type Rating = 'again' | 'hard' | 'good' | 'easy';

export interface WordItem {
  id: string;
  word: string;
  phonetic: string;
  translation: string;
  category: 'phonetics' | 'daily' | 'business' | 'ai' | 'custom';
  linkingNotes?: string;
  examples: { en: string; zh: string }[];
}

export interface CustomWord extends WordItem {
  track: TrackId;
  updatedAt?: number;
}

export interface SentenceItem {
  id: string;
  en: string;
  zh: string;
  notes?: string;
}

export interface Lesson {
  id: string;
  track: TrackId;
  order: number;
  week: number;
  title: string;
  subtitle: string;
  words: WordItem[];
  sentences: SentenceItem[];
  dialogue: { speaker: 'A' | 'B'; en: string; zh: string }[];
  practicePrompts: { en: string; zh: string }[];
}

export interface PracticeRecord {
  itemId: string;
  track: TrackId;
  userRating: Rating;
  lastPracticed: number;
  nextReviewDate: number;
  reviewStage: number;
  repetitions: number;
}

export interface RecordingRecord {
  id: string;
  itemId: string;
  createdAt: number;
  mimeType: string;
  audio: Blob;
}

export interface DailySession {
  id: string;
  date: string;
  track: TrackId;
  lessonId: string;
  completedAt?: number;
  reviewedItemIds: string[];
}
