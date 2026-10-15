import { describe, expect, it } from 'vitest';
import { formatLog, issueNumberFromUrl, parseLog } from './github';
import { rateItem } from './scheduler';

describe('GitHub progress comments', () => {
  it('only accepts an issue in the configured repository', () => {
    expect(issueNumberFromUrl('https://github.com/wutian88/ai-english-pronunciation/issues/12')).toBe(12);
    expect(issueNumberFromUrl('https://github.com/other/repo/issues/12')).toBeUndefined();
  });

  it('round trips a daily log and ignores unrelated text', () => {
    const session = {
      id: '2026-09-28:daily:d01', date: '2026-09-28', track: 'daily',
      lessonId: 'd01', completedAt: 123, reviewedItemIds: [],
    } as const;
    const body = formatLog('2026-09-28', [{ ...session, reviewedItemIds: [] }], [], { d01: '打招呼' });
    expect(parseLog(body)?.sessions[0].lessonId).toBe('d01');
    expect(parseLog('some unrelated comment')).toBeUndefined();
  });

  it('can store several lessons and a review-only day', () => {
    const body = formatLog('2026-09-28', [
      { id: '1', date: '2026-09-28', track: 'daily', lessonId: 'd01', completedAt: 1, reviewedItemIds: [] },
      { id: '2', date: '2026-09-28', track: 'ai', lessonId: 'a01', completedAt: 2, reviewedItemIds: [] },
    ], [], {});
    expect(parseLog(body)?.sessions).toHaveLength(2);
    expect(parseLog(formatLog('2026-09-29', [], [], {}))?.sessions).toHaveLength(0);
  });

  it('round trips all three tracks and labels Cantonese lessons correctly', () => {
    const progress = [
      rateItem('d01-w01', 'daily', 'good', undefined, 123),
      rateItem('a01-w01', 'ai', 'good', undefined, 123),
      rateItem('c01-w01', 'cantonese', 'good', undefined, 123),
    ];
    const sessions = progress.map((record) => ({
      id: `2026-10-15:${record.track}`, date: '2026-10-15', track: record.track,
      lessonId: record.itemId.slice(0, 3), completedAt: 123, reviewedItemIds: [record.itemId],
    }));
    const body = formatLog('2026-10-15', sessions, progress, { d01: '打招呼', a01: '提示词', c01: '问候' });
    expect(body).toContain('日常《打招呼》、AI《提示词》、粤语《问候》');
    expect(body).toContain('<!-- ENGLISH_PROGRESS_V1');
    expect(parseLog(body)).toEqual({
      schemaVersion: 1, date: '2026-10-15', progress,
      sessions: sessions.map(({ track, lessonId, completedAt }) => ({ track, lessonId, completedAt })),
    });
  });

  it('still reads the original English marker and existing item IDs', () => {
    const legacy = {
      schemaVersion: 1, date: '2026-09-28',
      sessions: [{ track: 'daily', lessonId: 'd01', completedAt: 123 }],
      progress: [{ itemId: 'a01-w01', track: 'ai', userRating: 'good', lastPracticed: 123,
        nextReviewDate: 86400123, reviewStage: 1, repetitions: 1 }],
    };
    expect(parseLog(`📘 2026-09-28 · 英语学习记录\n<!-- ENGLISH_PROGRESS_V1\n${JSON.stringify(legacy)}\n-->`)).toEqual(legacy);
  });

  it.each(['sessions', 'progress'] as const)('rejects an unknown track in %s', (collection) => {
    const payload = {
      schemaVersion: 1, date: '2026-10-15',
      sessions: [{ track: 'cantonese', lessonId: 'c01', completedAt: 123 }],
      progress: [rateItem('c01-w01', 'cantonese', 'good', undefined, 123)],
    };
    const invalid = { ...payload, [collection]: [{ ...payload[collection][0], track: 'unknown' }] };
    expect(parseLog(`<!-- ENGLISH_PROGRESS_V1\n${JSON.stringify(invalid)}\n-->`)).toBeUndefined();
  });
});
