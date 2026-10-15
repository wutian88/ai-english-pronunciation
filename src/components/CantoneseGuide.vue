<script setup lang="ts">
import { cantoneseTones } from '../data/cantonese';
defineEmits<{ speak: [text: string] }>();
</script>

<template>
  <section class="panel cantonese-guide" aria-labelledby="cantonese-guide-heading">
    <p class="eyebrow">JYUTPING · 粤拼</p>
    <h2 id="cantonese-guide-heading">先听声调，再开口</h2>
    <p>从打招呼开始，每次学 5 个表达。课程使用常见繁体粤语字，配简体中文释义；拼音末尾的 1–6 是声调，不用按普通话拼音读。</p>
    <details>
      <summary>展开粤拼与六声调速查</summary>
      <div class="tone-grid"><article v-for="tone in cantoneseTones" :key="tone.number"><div class="word-head"><strong>{{ tone.number }} · {{ tone.name }}</strong><button type="button" class="icon-button" :aria-label="`听第 ${tone.number} 声：${tone.example}`" @click="$emit('speak', tone.example)">▶</button></div><p>{{ tone.example }} <span class="jyutping">{{ tone.jyutping }}</span></p><small>{{ tone.description }}</small></article></div>
      <p>先比较 1、3、6 的高、中、低平调，再区分 2、5 的升调。声调示例使用单字，系统合成语音仅供跟读参考。</p>
      <p>以 -p、-t、-k 结尾时，口腔收住，不额外补元音；这类入声在粤拼中仍用 1、3、6 标调。ng 可以在音节开头；m、ng 也能单独成音节，如「唔」m4、「五」ng5。</p>
      <a class="text-link" href="https://jyutping.org/jyutping/" target="_blank" rel="noopener noreferrer">香港语言学学会粤拼说明 ↗</a>
    </details>
  </section>
</template>
