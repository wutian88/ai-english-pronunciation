import { describe, expect, it } from 'vitest';
import { isCantoneseVoice, selectVoice } from './speech';

describe('language-specific speech', () => {
  it('never falls back to Mandarin or English for Cantonese', () => {
    expect(selectVoice([{ lang: 'zh-CN', localService: true }, { lang: 'zh-TW', localService: true }, { lang: 'en-US', localService: true }], 'cantonese')).toBeUndefined();
    expect(selectVoice([], 'cantonese')).toBeUndefined();
  });
  it('accepts Cantonese identifiers and prefers an offline voice', () => {
    for (const lang of ['yue', 'yue-HK', 'yue-Hant-HK', 'zh-HK', 'zh_HK']) expect(isCantoneseVoice({ lang, localService: true })).toBe(true);
    const local = { lang: 'zh-HK', localService: true };
    expect(selectVoice([{ lang: 'yue-HK', localService: false }, local], 'cantonese')).toBe(local);
  });
  it('keeps English tracks on the same American voice preference', () => {
    const american = { lang: 'en-US', localService: true };
    const voices = [{ lang: 'zh-HK', localService: true }, { lang: 'en-GB', localService: true }, american];
    expect(selectVoice(voices, 'daily')).toBe(american);
    expect(selectVoice(voices, 'ai')).toBe(american);
  });
});
