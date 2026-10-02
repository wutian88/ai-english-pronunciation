import type { Lesson, TrackId, WordItem } from '../types/wordbook';
import { dailyLessonsA } from './daily-a';
import { dailyLessonsB } from './daily-b';
import { aiLessons } from './ai';
import { aiLessonsExtraA } from './ai-extra-a';
import { aiLessonsExtraB } from './ai-extra-b';
import { aiProjectLessons } from './ai-project';

export const dailyLessons: Lesson[] = [...dailyLessonsA, ...dailyLessonsB].sort((a, b) => a.order - b.order);
export const lessonsByTrack: Record<TrackId, Lesson[]> = {
  daily: dailyLessons,
  ai: [...aiLessons, ...aiLessonsExtraA, ...aiLessonsExtraB, ...aiProjectLessons].sort((a, b) => a.order - b.order),
};

export function builtInWords(track: TrackId): WordItem[] {
  return lessonsByTrack[track].flatMap((lesson) => lesson.words);
}

export function wordById(id: string): WordItem | undefined {
  for (const lessons of Object.values(lessonsByTrack)) {
    for (const lesson of lessons) {
      const word = lesson.words.find((item) => item.id === id);
      if (word) return word;
    }
  }
  return undefined;
}
