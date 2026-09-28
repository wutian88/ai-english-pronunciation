import { describe, expect, it } from 'vitest';
import { formatLog, issueNumberFromUrl, parseLog } from './github';

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
});
