import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { describe, expect, it } from 'vitest';
import WordExample from './WordExample.vue';
import type { WordItem } from '../types/wordbook';

const render = (example?: WordItem['examples'][number]) =>
  renderToString(createSSRApp(WordExample, { example }));

describe('word example display shared by lessons, wordbook and review cards', () => {
  it('shows the complete example translation, separately from the word meaning', async () => {
    const html = await render({ en: 'Hello, I am Mia.', zh: '你好，我是米娅。' });
    expect(html).toContain('Hello, I am Mia.');
    expect(html).toContain('class="example-zh"');
    expect(html).toContain('你好，我是米娅。');
    expect(html).toContain('aria-label="朗读例句：Hello, I am Mia."');
    expect(html).toContain('🔊 听例句');
  });

  it('keeps Cantonese source text, Jyutping and Chinese translation together', async () => {
    const html = await render({ en: '唔該，請再講一次。', zh: '请再说一次。', jyutping: 'm4 goi1 cing2 zoi3 gong2 jat1 ci3' });
    expect(html).toContain('唔該，請再講一次。');
    expect(html).toContain('class="jyutping"');
    expect(html).toContain('m4 goi1 cing2 zoi3 gong2 jat1 ci3');
    expect(html).toContain('请再说一次。');
  });

  it('allows existing custom examples without a translation', async () => {
    const html = await render({ en: 'Please repeat that.', zh: '' });
    expect(html).toContain('Please repeat that.');
    expect(html).toContain('🔊 听例句');
    expect(html).not.toContain('class="example-zh"');
    expect(html).not.toContain('class="jyutping"');
  });

  it('does not offer playback when there is no example', async () => {
    expect(await render()).not.toContain('button');
  });

  it('escapes user-provided example text and translation', async () => {
    const html = await render({ en: '<script>alert(1)</script>', zh: '<img src=x onerror=alert(1)>' });
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;img');
  });
});
