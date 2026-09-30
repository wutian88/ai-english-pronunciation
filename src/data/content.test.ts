import { describe, expect, it } from 'vitest';
import { lessonsByTrack } from './content';

describe('built-in curriculum', () => {
  it('has 40 daily lessons and 20 separate AI lessons', () => {
    expect(lessonsByTrack.daily).toHaveLength(40);
    expect(lessonsByTrack.ai).toHaveLength(20);
    expect(lessonsByTrack.daily.every((item) => item.track === 'daily')).toBe(true);
    expect(lessonsByTrack.ai.every((item) => item.track === 'ai')).toBe(true);
  });

  it('keeps every curriculum in continuous lesson order', () => {
    expect(lessonsByTrack.daily.map((item) => item.order)).toEqual(Array.from({ length: 40 }, (_, index) => index + 1));
    expect(lessonsByTrack.ai.map((item) => item.order)).toEqual(Array.from({ length: 20 }, (_, index) => index + 1));
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
