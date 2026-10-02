import { describe, expect, it } from 'vitest';
import { builtInWords, lessonsByTrack, wordById } from './content';
import { dueRecords, rateItem, selectNextLesson } from '../lib/scheduler';

describe('built-in curriculum', () => {
  it('has 40 daily lessons and 28 separate AI lessons', () => {
    expect(lessonsByTrack.daily).toHaveLength(40);
    expect(lessonsByTrack.ai).toHaveLength(28);
    expect(lessonsByTrack.daily.every((item) => item.track === 'daily')).toBe(true);
    expect(lessonsByTrack.ai.every((item) => item.track === 'ai')).toBe(true);
  });

  it('keeps every curriculum in continuous lesson order', () => {
    expect(lessonsByTrack.daily.map((item) => item.order)).toEqual(Array.from({ length: 40 }, (_, index) => index + 1));
    expect(lessonsByTrack.ai.map((item) => item.order)).toEqual(Array.from({ length: 28 }, (_, index) => index + 1));
  });

  it('offers the project lessons after the original AI track has been completed', () => {
    const completedIds = new Set(Array.from({ length: 20 }, (_, index) => `a${String(index + 1).padStart(2, '0')}`));
    expect(lessonsByTrack.ai.slice(0, 20).map((lesson) => lesson.id)).toEqual([...completedIds]);
    expect(selectNextLesson(lessonsByTrack.ai, completedIds)?.id).toBe('a21');
    expect(builtInWords('ai')).toHaveLength(224);
    expect(wordById('a28-w08')?.word).toBe('next step');
  });

  it('resolves old and new word records together without resetting review progress', () => {
    const now = Date.UTC(2026, 9, 2, 12);
    const oldRecord = rateItem('a01-w01', 'ai', 'good', undefined, now);
    const newRecord = rateItem('a21-w01', 'ai', 'good', undefined, now);
    const due = dueRecords([oldRecord, newRecord], 'ai', now + 24 * 60 * 60 * 1000);
    expect(due.map((record) => wordById(record.itemId)?.word)).toEqual(['AI tool', 'portfolio project']);
    expect(rateItem(oldRecord.itemId, 'ai', 'good', oldRecord, now).repetitions).toBe(2);
  });

  it('contains unique complete lessons, words, and shadowing sentences', () => {
    const ids = new Set<string>();
    for (const lesson of [...lessonsByTrack.daily, ...lessonsByTrack.ai]) {
      expect(ids.has(lesson.id)).toBe(false);
      ids.add(lesson.id);
      expect(lesson.words).toHaveLength(8);
      expect(lesson.sentences).toHaveLength(4);
      expect(lesson.dialogue.length).toBeGreaterThanOrEqual(4);
      expect(lesson.practicePrompts).toHaveLength(2);
      for (const word of lesson.words) {
        expect(ids.has(word.id)).toBe(false);
        ids.add(word.id);
        expect(word.word && word.phonetic && word.translation).toBeTruthy();
        expect(word.examples[0]?.en && word.examples[0]?.zh).toBeTruthy();
      }
      for (const sentence of lesson.sentences) {
        expect(ids.has(sentence.id)).toBe(false);
        ids.add(sentence.id);
        expect(sentence.en && sentence.zh).toBeTruthy();
      }
    }
  });
});
