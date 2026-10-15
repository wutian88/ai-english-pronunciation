import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createBackup, importBackup, parseBackup, type LearningBackup } from './backup';
import { allCustomWords, allProgress, allSessions, saveCustomWord, saveProgress, saveSession } from './db';
import type { TrackId } from '../types/wordbook';

vi.mock('./db', () => ({
  allProgress: vi.fn(), allSessions: vi.fn(), allCustomWords: vi.fn(),
  saveProgress: vi.fn(), saveSession: vi.fn(), saveCustomWord: vi.fn(),
}));

const tracks: TrackId[] = ['daily', 'ai', 'cantonese'];
const lessonIds = ['d01', 'a01', 'c01'];
const sample: LearningBackup = {
  schemaVersion: 1,
  exportedAt: '2026-10-15T12:00:00Z',
  progress: tracks.map((track, index) => ({
    itemId: `${lessonIds[index]}-w01`, track, userRating: 'good',
    lastPracticed: 123, nextReviewDate: 86400123, reviewStage: 1, repetitions: 1,
  })),
  sessions: tracks.map((track, index) => ({
    id: `2026-10-15:${track}:${lessonIds[index]}`, date: '2026-10-15', track,
    lessonId: lessonIds[index], completedAt: 123, reviewedItemIds: [`${lessonIds[index]}-w01`],
  })),
  customWords: tracks.map((track) => ({
    id: `custom-${track}`, track, category: 'custom',
    word: track === 'cantonese' ? '唔該' : 'thanks', phonetic: track === 'cantonese' ? 'm4 goi1' : '/θæŋks/',
    translation: '谢谢', examples: [{
      en: track === 'cantonese' ? '唔該晒。' : 'Thanks a lot.', zh: '非常感谢。',
      ...(track === 'cantonese' ? { jyutping: 'm4 goi1 saai3' } : {}),
    }],
  })),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(allProgress).mockResolvedValue([]);
  vi.mocked(allSessions).mockResolvedValue([]);
  vi.mocked(allCustomWords).mockResolvedValue([]);
});

describe('backup validation', () => {
  const empty = { schemaVersion: 1, exportedAt: '2026-09-28T12:00:00Z', progress: [], sessions: [], customWords: [] };

  it('accepts a correctly versioned learning backup', () => {
    expect(parseBackup(JSON.stringify(empty)).schemaVersion).toBe(1);
  });

  it('exports, parses and imports all three tracks without changing IDs or pronunciation', async () => {
    vi.mocked(allProgress).mockResolvedValueOnce(sample.progress);
    vi.mocked(allSessions).mockResolvedValueOnce(sample.sessions);
    vi.mocked(allCustomWords).mockResolvedValueOnce(sample.customWords);
    const exported = await createBackup();
    const restored = parseBackup(JSON.stringify(exported));
    expect(restored).toEqual({ ...sample, exportedAt: exported.exportedAt });

    await importBackup(restored);
    expect(saveProgress).toHaveBeenCalledTimes(3);
    expect(saveSession).toHaveBeenCalledTimes(3);
    expect(saveCustomWord).toHaveBeenCalledTimes(3);
    for (const record of sample.progress) expect(saveProgress).toHaveBeenCalledWith(record);
    for (const session of sample.sessions) expect(saveSession).toHaveBeenCalledWith(session);
    for (const word of sample.customWords) expect(saveCustomWord).toHaveBeenCalledWith(word);
  });

  it('accepts legacy English-only schema version 1 backups unchanged', () => {
    const legacy = {
      ...sample,
      progress: sample.progress.slice(0, 2),
      sessions: sample.sessions.slice(0, 2),
      customWords: sample.customWords.slice(0, 2),
    };
    expect(parseBackup(JSON.stringify(legacy))).toEqual(legacy);
  });

  it.each(['progress', 'sessions', 'customWords'] as const)('rejects an unknown track in %s', (collection) => {
    const invalid = { ...sample, [collection]: [{ ...sample[collection][0], track: 'unknown' }] };
    expect(() => parseBackup(JSON.stringify(invalid))).toThrow();
  });

  it('does not let an older Cantonese backup replace newer learning', async () => {
    const record = { ...sample.progress[2], lastPracticed: 456 };
    const session = { ...sample.sessions[2], completedAt: 456 };
    const word = { ...sample.customWords[2], updatedAt: 456 };
    vi.mocked(allProgress).mockResolvedValue([record]);
    vi.mocked(allSessions).mockResolvedValue([session]);
    vi.mocked(allCustomWords).mockResolvedValue([word]);
    await importBackup({
      ...sample, progress: sample.progress.slice(2), sessions: sample.sessions.slice(2),
      customWords: sample.customWords.slice(2),
    });
    expect(saveProgress).not.toHaveBeenCalled();
    expect(saveSession).not.toHaveBeenCalled();
    expect(saveCustomWord).not.toHaveBeenCalled();
  });

  it('rejects unsupported versions and malformed progress', () => {
    expect(() => parseBackup(JSON.stringify({ ...empty, schemaVersion: 2 }))).toThrow();
    expect(() => parseBackup(JSON.stringify({ ...empty, progress: [{ itemId: 'x', track: 'daily', reviewStage: 1 }] }))).toThrow();
  });

  it('rejects a custom word without usable bilingual examples', () => {
    expect(() => parseBackup(JSON.stringify({
      ...empty,
      customWords: [{ id: 'c1', track: 'ai', category: 'custom', word: 'prompt', phonetic: '', translation: '提示词', examples: [] }],
    }))).toThrow();
  });

  it.each([123, null, false, {}, ['m4 goi1']])('rejects non-string Jyutping in any example: %j', (jyutping) => {
    for (const invalidIndex of [0, 1]) {
      const examples = [{ en: '唔該。', zh: '谢谢。' }, { en: '唔該晒。', zh: '非常感谢。' }]
        .map((example, index) => index === invalidIndex ? { ...example, jyutping } : example);
      expect(() => parseBackup(JSON.stringify({
        ...sample, customWords: [{ ...sample.customWords[2], examples }],
      }))).toThrow('备份中的自定义词条无效');
    }
  });

  it('preserves optional string Jyutping alongside examples without it', () => {
    const backup = {
      ...sample,
      customWords: [{
        ...sample.customWords[2],
        examples: [{ en: '唔該。', zh: '谢谢。' }, { en: '唔該晒。', zh: '非常感谢。', jyutping: 'm4 goi1 saai3' }],
      }],
    };
    expect(parseBackup(JSON.stringify(backup))).toEqual(backup);
  });
});
