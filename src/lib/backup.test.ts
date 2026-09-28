import { describe, expect, it } from 'vitest';
import { parseBackup } from './backup';

describe('backup validation', () => {
  const empty = { schemaVersion: 1, exportedAt: '2026-09-28T12:00:00Z', progress: [], sessions: [], customWords: [] };

  it('accepts a correctly versioned learning backup', () => {
    expect(parseBackup(JSON.stringify(empty)).schemaVersion).toBe(1);
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
});
