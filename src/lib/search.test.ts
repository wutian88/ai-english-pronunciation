import { describe, expect, it } from 'vitest';
import { searchWords } from './search';
import type { WordItem } from '../types/wordbook';
const word = (text: string, translation = '', example = ''): WordItem => ({ id: text, word: text, translation, phonetic: '', category: 'daily', examples: [{ en: example, zh: '' }] });
describe('word search', () => {
  const words = [word('concatenate'), word('cat food'), word('cat', '猫'), word('pet', '宠物', 'My cat is sleeping.')];
  it('puts an exact word before prefixes, substrings and example matches', () => {
    expect(searchWords(words, '  CAT  ').map(item => item.word)).toEqual(['cat', 'cat food', 'concatenate', 'pet']);
  });
  it('searches meanings, phonetics, example translations and Jyutping', () => {
    const entry = { ...word('唔該', '谢谢'), phonetic: 'm4 goi1', examples: [{ en: '唔該，請再講一次。', zh: '请再说一次。', jyutping: 'cing2 zoi3 gong2' }] };
    for (const query of ['谢谢', 'm4 goi1', '再说一次', 'cing2 zoi3']) expect(searchWords([entry], query)).toEqual([entry]);
  });
  it('normalizes whitespace and returns no match for unknown words', () => {
    expect(searchWords(words, 'cat   food')[0]?.word).toBe('cat food');
    expect(searchWords(words, 'unknown')).toEqual([]);
  });
  it('searches beyond the default preview without mutating the source', () => {
    const entries = Array.from({ length: 30 }, (_, i) => word(`entry ${i}`));
    expect(searchWords(entries, '   ')).toHaveLength(24);
    expect(searchWords(entries, 'entry 29')[0]).toBe(entries[29]);
    expect(entries[0]?.word).toBe('entry 0');
  });
});
