<script setup lang="ts">
import { computed, ref } from 'vue';
import type { WordItem } from '../types/wordbook';

const props = defineProps<{ words: WordItem[] }>();
const emit = defineEmits<{ speak: [text: string] }>();
const index = ref(0);
const answers = ref<string[]>([]);
const finished = computed(() => index.value >= props.words.length);
const question = computed(() => props.words[index.value]);
const score = computed(() => answers.value.filter((answer, i) => answer === props.words[i]?.translation).length);
const choices = computed(() => {
  if (!question.value) return [];
  const others = [...new Set(props.words.map((word) => word.translation))].filter((value) => value !== question.value!.translation);
  const result = [question.value.translation, ...others.slice(0, 3)];
  // Shuffle only when moving to a question, so an answer never moves under a tap.
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
});
function answer(value: string) {
  if (answers.value[index.value] !== undefined) return;
  answers.value[index.value] = value;
}
function restart() { answers.value = []; index.value = 0; }
</script>

<template>
  <section class="lesson-quiz" aria-labelledby="quiz-heading">
    <h3 id="quiz-heading" class="subheading">本课小测 · 看粤语，选意思</h3>
    <p class="fine-print">检验词义记忆；不做发音打分，小测不会改动你的复习安排。</p>
    <template v-if="!finished && question">
      <p class="quiz-progress">第 {{ index + 1 }} / {{ words.length }} 题</p>
      <div class="word-head"><div><h4>{{ question.word }}</h4><p class="jyutping">{{ question.phonetic }}</p></div><button type="button" class="icon-button" :aria-label="`小测朗读 ${question.word}`" @click="emit('speak', question.word)">▶</button></div>
      <div class="quiz-choices"><button v-for="choice in choices" :key="choice" type="button" :disabled="answers[index] !== undefined" :class="{ correct: answers[index] !== undefined && choice === question.translation, incorrect: answers[index] === choice && choice !== question.translation }" @click="answer(choice)">{{ choice }}</button></div>
      <div v-if="answers[index] !== undefined" role="status"><p>{{ answers[index] === question.translation ? '答对了！' : `再记一次：${question.word} = ${question.translation}` }}</p><button type="button" class="secondary-button" @click="index++">{{ index + 1 === words.length ? '查看结果' : '下一题' }}</button></div>
    </template>
    <div v-else role="status"><p>完成！答对 {{ score }} / {{ words.length }} 题。</p><ul v-if="score < words.length"><template v-for="(word, i) in words" :key="word.id"><li v-if="answers[i] !== word.translation">{{ word.word }}（{{ word.phonetic }}）：{{ word.translation }}</li></template></ul><button type="button" class="secondary-button" @click="restart">再测一次</button></div>
  </section>
</template>
