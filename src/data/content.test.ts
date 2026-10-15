import { describe, expect, it } from 'vitest';
import { builtInWords, lessonsByTrack, wordById } from './content';
import { dueRecords, rateItem, selectNextLesson } from '../lib/scheduler';
import { cantoneseTones } from './cantonese';

describe('built-in curriculum', () => {
  it('adds Cantonese without reusing any existing curriculum IDs', () => {
    expect(lessonsByTrack.cantonese).toHaveLength(6);
    expect(builtInWords('cantonese')).toHaveLength(30);
    expect(lessonsByTrack.cantonese.map((lesson) => lesson.order)).toEqual([1, 2, 3, 4, 5, 6]);
    const allIds = Object.values(lessonsByTrack).flatMap((lessons) => lessons.flatMap((lesson) => [lesson.id, ...lesson.words.map((word) => word.id), ...lesson.sentences.map((sentence) => sentence.id)]));
    expect(new Set(allIds).size).toBe(allIds.length);
    expect(wordById('c01-w01')?.word).toBe('你好');
    expect(wordById('d01-w01')?.word).toBe('hello');
    expect(wordById('a01-w01')?.word).toBe('AI tool');
  });

  it('provides tone-numbered Jyutping for every Cantonese expression and example', () => {
    const check = (text: string, jyutping: string | undefined) => {
      expect(jyutping).toMatch(/^[a-z]+[1-6](?: [a-z]+[1-6])*$/);
      expect(jyutping!.split(' ').length, text).toBe((text.match(/\p{Script=Han}/gu) ?? []).length);
    };
    for (const lesson of lessonsByTrack.cantonese) {
      expect(lesson.track).toBe('cantonese');
      expect(lesson.words).toHaveLength(5);
      expect(lesson.sentences.length).toBeGreaterThanOrEqual(2);
      expect(new Set(lesson.words.map((word) => word.translation)).size).toBe(5);
      for (const word of lesson.words) {
        check(word.word, word.phonetic);
        for (const example of word.examples) check(example.en, example.jyutping);
      }
      for (const item of [...lesson.sentences, ...lesson.dialogue, ...lesson.practicePrompts]) check(item.en, item.jyutping);
    }
    expect(cantoneseTones.map((tone) => tone.number)).toEqual([1, 2, 3, 4, 5, 6]);
  });
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
