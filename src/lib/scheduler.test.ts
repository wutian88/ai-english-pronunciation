import { describe, expect, it } from 'vitest';
import { dueRecords, localDate, rateItem, selectNextLesson } from './scheduler';

describe('spaced repetition', () => {
  const now = Date.UTC(2026, 8, 28, 12);

  it('schedules a new good answer for tomorrow', () => {
    const record = rateItem('d01-w01', 'daily', 'good', undefined, now);
    expect(record.reviewStage).toBe(1);
    expect(record.nextReviewDate).toBe(now + 24 * 60 * 60 * 1000);
  });

  it('brings again back within the same day', () => {
    const prior = rateItem('d01-w01', 'daily', 'easy', undefined, now);
    const record = rateItem('d01-w01', 'daily', 'again', prior, now);
    expect(record.reviewStage).toBe(0);
    expect(record.nextReviewDate).toBe(now + 10 * 60 * 1000);
  });

  it('keeps independent tracks and selects unfinished lessons', () => {
    const daily = rateItem('d01-w01', 'daily', 'again', undefined, now);
    const ai = rateItem('a01-w01', 'ai', 'again', undefined, now);
    expect(dueRecords([daily, ai], 'daily', now + 11 * 60 * 1000)).toEqual([daily]);
    expect(selectNextLesson([{ id: 'd01' }, { id: 'd02' }], new Set(['d01']))?.id).toBe('d02');
  });

  it('uses the phone local date for daily sessions', () => {
    expect(localDate(new Date(2026, 8, 28))).toBe('2026-09-28');
  });
});
