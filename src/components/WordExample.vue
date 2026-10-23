<script setup lang="ts">
import type { WordItem } from '../types/wordbook';

defineProps<{ example?: WordItem['examples'][number] }>();
defineEmits<{ speak: [text: string] }>();
</script>

<template>
  <p v-if="example?.en" class="example">{{ example.en }}</p>
  <p v-if="example?.jyutping" class="jyutping">{{ example.jyutping }}</p>
  <button
    v-if="example?.en"
    type="button"
    class="example-listen-button"
    :aria-label="`朗读例句：${example.en}`"
    @click="$emit('speak', example.en)"
  >🔊 听例句</button>
  <p v-if="example?.zh" class="example-zh">{{ example.zh }}</p>
</template>
