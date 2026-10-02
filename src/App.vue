<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { builtInWords, lessonsByTrack, wordById } from './data/content';
import { createBackup, downloadBackup, importBackup, parseBackup } from './lib/backup';
import {
  allCustomWords, allProgress, allSessions, deleteCustomWord, getSetting,
  latestRecording, progressFor, saveCustomWord, saveProgress, saveRecording,
  saveCustomWords, saveSession, setSetting,
} from './lib/db';
import { DEFAULT_ISSUE_URL, fetchOwnerLogs, formatLog, issueNumberFromUrl, REPOSITORY } from './lib/github';
import { dueRecords, localDate, rateItem, selectNextLesson } from './lib/scheduler';
import { checkWaitingUpdate } from './lib/updates';
import type { CustomWord, DailySession, Lesson, PracticeRecord, Rating, TrackId, WordItem } from './types/wordbook';

type Tab = 'today' | 'courses' | 'shadow' | 'wordbook' | 'mine';

// Keep the shadowing/recording flow intact for a future release; hide it for now.
const shadowingEnabled = false;
const track = ref<TrackId>('daily');
const { needRefresh, updateServiceWorker } = useRegisterSW();
const tab = ref<Tab>('today');
const activeLessonId = ref<string | null>(null);
const sentenceIndex = ref(0);
const progress = ref<PracticeRecord[]>([]);
const sessions = ref<DailySession[]>([]);
const customWords = ref<CustomWord[]>([]);
const ready = ref(false);
const error = ref('');
const toast = ref('');
const todayKey = ref(localDate());
const nowTick = ref(Date.now());
const online = ref(navigator.onLine);
const speakingRate = ref(0.95);
const checkingUpdates = ref(false);
const updatingApp = ref(false);
const updateBannerDismissed = ref(false);
const updateStatus = ref('联网检查新版本；下载完成后，可以在这里直接更新。');
const voices = ref<SpeechSynthesisVoice[]>([]);
const recordingState = ref<'idle' | 'recording' | 'saving'>('idle');
const recordingUrl = ref('');
const issueUrl = ref(DEFAULT_ISSUE_URL);
const logText = ref('');
const backupUrl = ref('');
const backupName = ref('');
const wordSearch = ref('');
const editingWordId = ref('');
const wordForm = ref({ word: '', phonetic: '', translation: '', exampleEn: '', exampleZh: '', linkingNotes: '' });

let toastTimer: number | undefined;
let dayTimer: number | undefined;
let recordTimer: number | undefined;
let recorder: MediaRecorder | undefined;
let stream: MediaStream | undefined;
let chunks: Blob[] = [];
let lastAudio: HTMLAudioElement | undefined;

const trackName = computed(() => track.value === 'daily' ? '日常英语' : 'AI 英语');
const lessons = computed(() => lessonsByTrack[track.value]);
const completedIds = computed(() => new Set(sessions.value.filter((item) => item.track === track.value && item.completedAt).map((item) => item.lessonId)));
const nextLesson = computed(() => selectNextLesson(lessons.value, completedIds.value));
const currentLesson = computed<Lesson | undefined>(() => lessons.value.find((item) => item.id === activeLessonId.value) ?? nextLesson.value);
const completedCount = computed(() => completedIds.value.size);
const due = computed(() => dueRecords(progress.value, track.value, nowTick.value));
const dueWords = computed(() => due.value.map((record) => ({ record, word: wordById(record.itemId) ?? customWords.value.find((item) => item.id === record.itemId) })).filter((item): item is { record: PracticeRecord; word: WordItem } => Boolean(item.word)));
const todayCompleted = computed(() => sessions.value.filter((item) => item.track === track.value && item.date === todayKey.value && item.completedAt));
const studyAdvice = computed(() => {
  if (dueWords.value.length > 20) return `有 ${dueWords.value.length} 项到期，今天建议先复习最早的 20 项；新课可以缓一天，也可自行打开。`;
  if (track.value === 'daily' && completedCount.value > 0 && completedCount.value % 5 === 0 && !todayCompleted.value.length) return '你刚完成一组 5 课，今天适合用课程对话做一次综合复习，再决定是否继续新课。';
  return nextLesson.value ? `今日建议：先复习，再学《${nextLesson.value.title}》。` : '这个词库已学完新课，今天可以复习到期词句，或重听喜欢的课程发音。';
});
const currentSentence = computed(() => currentLesson.value?.sentences[sentenceIndex.value]);
const allTrackWords = computed(() => [...builtInWords(track.value), ...customWords.value.filter((item) => item.track === track.value)]);
const filteredWords = computed(() => {
  const query = wordSearch.value.trim().toLowerCase();
  return query ? allTrackWords.value.filter((item) => `${item.word} ${item.translation}`.toLowerCase().includes(query)) : allTrackWords.value.slice(0, 24);
});
const issueLink = computed(() => issueNumberFromUrl(issueUrl.value)
  ? issueUrl.value
  : `https://github.com/${REPOSITORY}/issues/new?title=${encodeURIComponent('我的英语学习进度')}`);
const voiceStatus = computed(() => {
  if (!('speechSynthesis' in window)) return '此设备不支持系统朗读';
  if (!voices.value.length) return '正在检测英文语音';
  return voices.value.some((item) => item.lang.toLowerCase().startsWith('en') && item.localService)
    ? '检测到本地英文语音，可尝试断网朗读'
    : '未检测到本地英文语音，断网朗读可能不可用';
});

function notify(message: string) {
  toast.value = message;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { toast.value = ''; }, 3500);
}

function postponeUpdate() { updateBannerDismissed.value = true; }

watch(needRefresh, (available) => {
  if (available) {
    updateBannerDismissed.value = false;
    updateStatus.value = '新版本已下载，点击下方「立即更新」即可使用。';
  }
}, { immediate: true });

async function applyAppUpdate() {
  if (updatingApp.value || checkingUpdates.value) return;
  if (recordingState.value !== 'idle') { notify('请先完成录音保存，再更新应用'); return; }
  updatingApp.value = true;
  updateStatus.value = '正在更新，页面即将重新打开…';
  try {
    await updateServiceWorker(true);
  } catch {
    updateStatus.value = '更新失败，请稍后点击「立即更新」重试。';
    notify(updateStatus.value);
  } finally { updatingApp.value = false; }
}

async function handleAppUpdate() {
  if (needRefresh.value) await applyAppUpdate();
  else await checkForUpdates();
}

async function checkForUpdates() {
  if (checkingUpdates.value || updatingApp.value) return;
  if (!online.value) { updateStatus.value = '当前离线，请联网后再检查更新。'; return; }
  if (!('serviceWorker' in navigator)) { updateStatus.value = '此浏览器不支持应用更新检查。'; return; }
  checkingUpdates.value = true;
  updateStatus.value = '正在检查并下载可用的新版本…';
  try {
    const registration = await navigator.serviceWorker.getRegistration(import.meta.env.BASE_URL);
    if (!registration) { updateStatus.value = '更新服务尚未就绪，请稍后重新打开应用再试。'; return; }
    if (await checkWaitingUpdate(registration)) {
      needRefresh.value = true;
      updateStatus.value = '新版本已下载，点击下方「立即更新」即可使用。';
    } else {
      updateStatus.value = needRefresh.value ? '新版本已下载，点击下方「立即更新」即可使用。' : '已检查，当前没有发现新版本。';
    }
  } catch { updateStatus.value = '检查或下载更新未完成，请联网后稍后再试。'; }
  finally { checkingUpdates.value = false; }
}

async function loadData() {
  try {
    const [savedProgress, savedSessions, savedCustom, savedTrack, savedIssue] = await Promise.all([
      allProgress(), allSessions(), allCustomWords(), getSetting('track'), getSetting('issueUrl'),
    ]);
    progress.value = savedProgress;
    sessions.value = savedSessions;
    customWords.value = savedCustom;
    if (savedTrack === 'daily' || savedTrack === 'ai') track.value = savedTrack;
    if (savedIssue) issueUrl.value = savedIssue;
    ready.value = true;
  } catch {
    error.value = '无法打开本地数据库。请检查 Safari 是否允许网站储存，并先导出已有数据。';
  }
}

function updateOnline() { online.value = navigator.onLine; }
function updateClock() { nowTick.value = Date.now(); todayKey.value = localDate(); }
function refreshVoices() { if ('speechSynthesis' in window) voices.value = speechSynthesis.getVoices(); }

onMounted(() => {
  void loadData();
  refreshVoices();
  if ('speechSynthesis' in window) speechSynthesis.addEventListener('voiceschanged', refreshVoices);
  window.addEventListener('online', updateOnline);
  window.addEventListener('offline', updateOnline);
  document.addEventListener('visibilitychange', updateClock);
  dayTimer = window.setInterval(updateClock, 60_000);
});

onUnmounted(() => {
  if (toastTimer) clearTimeout(toastTimer);
  if (dayTimer) clearInterval(dayTimer);
  if (recordTimer) clearTimeout(recordTimer);
  if (recorder?.state === 'recording') recorder.stop();
  stream?.getTracks().forEach((item) => item.stop());
  if (recordingUrl.value) URL.revokeObjectURL(recordingUrl.value);
  if (backupUrl.value) URL.revokeObjectURL(backupUrl.value);
  lastAudio?.pause();
  if ('speechSynthesis' in window) {
    speechSynthesis.removeEventListener('voiceschanged', refreshVoices);
    speechSynthesis.cancel();
  }
  window.removeEventListener('online', updateOnline);
  window.removeEventListener('offline', updateOnline);
  document.removeEventListener('visibilitychange', updateClock);
});

watch(currentSentence, async (sentence) => {
  if (recordingUrl.value) URL.revokeObjectURL(recordingUrl.value);
  recordingUrl.value = '';
  if (!sentence) return;
  try {
    const saved = await latestRecording(sentence.id);
    if (saved && currentSentence.value?.id === sentence.id) recordingUrl.value = URL.createObjectURL(saved.audio);
  } catch { /* A fresh install has no recording yet. */ }
}, { immediate: true });

async function changeTrack(value: TrackId) {
  if (recordingState.value === 'recording') stopRecording();
  clearWordForm();
  track.value = value;
  activeLessonId.value = null;
  sentenceIndex.value = 0;
  tab.value = 'today';
  await setSetting('track', value);
}

function openLesson(lesson: Lesson) {
  activeLessonId.value = lesson.id;
  sentenceIndex.value = 0;
  tab.value = 'today';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openNextLesson() {
  const next = nextLesson.value;
  if (next) openLesson(next);
  else notify('这个词库的课程已完成，可以继续复习或重练任意一课');
}

function speak(text: string) {
  if (!('speechSynthesis' in window)) { notify('此设备不支持系统朗读'); return; }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = speakingRate.value;
  utterance.voice = voices.value.find((item) => item.lang.toLowerCase().startsWith('en-us') && item.localService)
    ?? voices.value.find((item) => item.lang.toLowerCase().startsWith('en-us'))
    ?? voices.value.find((item) => item.lang.toLowerCase().startsWith('en'))
    ?? null;
  speechSynthesis.speak(utterance);
}

async function rate(word: WordItem, rating: Rating) {
  try {
    const previous = await progressFor(word.id);
    const record = rateItem(word.id, track.value, rating, previous);
    await saveProgress(record);
    progress.value = [...progress.value.filter((item) => item.itemId !== word.id), record];
    notify(rating === 'again' ? '已加入稍后再练' : '已安排下次复习');
  } catch { notify('保存失败，请检查本地存储空间'); }
}

async function completeLesson() {
  const lesson = currentLesson.value;
  if (!lesson) return;
  const date = localDate();
  const session: DailySession = {
    id: `${date}:${track.value}:${lesson.id}`,
    date,
    track: track.value,
    lessonId: lesson.id,
    completedAt: Date.now(),
    reviewedItemIds: lesson.words.filter((word) => progress.value.some((record) => record.itemId === word.id)).map((word) => word.id),
  };
  try {
    await saveSession(session);
    sessions.value = [...sessions.value.filter((item) => item.id !== session.id), session];
    notify('完成这一课！下一课已准备好');
    activeLessonId.value = null;
    sentenceIndex.value = 0;
  } catch { notify('完成记录保存失败'); }
}

async function startRecording() {
  if (!currentSentence.value) return;
  if (!navigator.mediaDevices?.getUserMedia || !('MediaRecorder' in window)) {
    notify('此浏览器无法录音，请在 iPhone Safari 的 HTTPS 页面打开');
    return;
  }
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mimeType = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm'].find((item) => MediaRecorder.isTypeSupported(item));
    recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    const itemId = currentSentence.value.id;
    chunks = [];
    recorder.ondataavailable = (event) => { if (event.data.size > 0) chunks.push(event.data); };
    recorder.onerror = () => { notify('录音失败，请检查麦克风权限'); recordingState.value = 'idle'; stream?.getTracks().forEach((item) => item.stop()); };
    recorder.onstop = async () => {
      recordingState.value = 'saving';
      stream?.getTracks().forEach((item) => item.stop());
      const audio = new Blob(chunks, { type: recorder?.mimeType || 'audio/mp4' });
      if (!audio.size) { notify('没有录到声音，请重试'); recordingState.value = 'idle'; return; }
      try {
        await saveRecording({ id: itemId, itemId, audio, mimeType: audio.type, createdAt: Date.now() });
        if (currentSentence.value?.id === itemId) {
          if (recordingUrl.value) URL.revokeObjectURL(recordingUrl.value);
          recordingUrl.value = URL.createObjectURL(audio);
        }
        notify('录音已保存在这台设备');
      } catch { notify('录音保存失败，可能是存储空间不足'); }
      recordingState.value = 'idle';
    };
    recorder.start();
    recordingState.value = 'recording';
    recordTimer = window.setTimeout(stopRecording, 90_000);
  } catch { notify('无法使用麦克风，请检查 Safari 权限'); stream?.getTracks().forEach((item) => item.stop()); }
}

function stopRecording() {
  if (recordTimer) clearTimeout(recordTimer);
  if (recorder?.state === 'recording') recorder.stop();
}

function playRecording() {
  if (!recordingUrl.value) return;
  lastAudio?.pause();
  lastAudio = new Audio(recordingUrl.value);
  void lastAudio.play().catch(() => notify('播放失败，请再点一次'));
}

function editCustomWord(word: CustomWord) {
  editingWordId.value = word.id;
  wordForm.value = {
    word: word.word, phonetic: word.phonetic, translation: word.translation,
    exampleEn: word.examples[0]?.en ?? '', exampleZh: word.examples[0]?.zh ?? '',
    linkingNotes: word.linkingNotes ?? '',
  };
  tab.value = 'wordbook';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function clearWordForm() {
  editingWordId.value = '';
  wordForm.value = { word: '', phonetic: '', translation: '', exampleEn: '', exampleZh: '', linkingNotes: '' };
}

async function saveWord() {
  const form = wordForm.value;
  if (!form.word.trim() || !form.translation.trim() || !form.exampleEn.trim()) {
    notify('请至少填写英文、中文和英文例句'); return;
  }
  const entry: CustomWord = {
    id: editingWordId.value || `custom-${crypto.randomUUID()}`,
    word: form.word.trim(), phonetic: form.phonetic.trim(), translation: form.translation.trim(),
    category: 'custom', track: track.value, updatedAt: Date.now(), linkingNotes: form.linkingNotes.trim(),
    examples: [{ en: form.exampleEn.trim(), zh: form.exampleZh.trim() }],
  };
  try {
    await saveCustomWord(entry);
    customWords.value = [...customWords.value.filter((item) => item.id !== entry.id), entry];
    clearWordForm();
    notify('已保存到我的词库');
  } catch { notify('词条保存失败'); }
}

async function removeCustomWord(word: CustomWord) {
  if (!window.confirm(`删除自定义词条“${word.word}”？`)) return;
  await deleteCustomWord(word.id);
  customWords.value = customWords.value.filter((item) => item.id !== word.id);
  if (editingWordId.value === word.id) clearWordForm();
  notify('已删除自定义词条');
}

async function importWordList(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  try {
    if (file.size > 2_000_000) throw new Error('词库文件超过 2 MB');
    const raw: unknown = JSON.parse(await file.text());
    if (!Array.isArray(raw) || raw.length > 500) throw new Error('词库应是最多 500 项的 JSON 数组');
    const existing = new Set(allTrackWords.value.map((item) => item.word.trim().toLowerCase()));
    const pending: CustomWord[] = [];
    for (const candidate of raw) {
      if (!candidate || typeof candidate !== 'object') throw new Error('词库中有无效词条');
      const item = candidate as Partial<WordItem>;
      if (typeof item.word !== 'string' || typeof item.translation !== 'string' ||
          !item.word.trim() || !item.translation.trim() || !Array.isArray(item.examples) ||
          typeof item.examples[0]?.en !== 'string' || !item.examples[0].en.trim() ||
          item.word.length > 200 || item.translation.length > 500) throw new Error('词条需包含简短的 word、translation 和 examples[0].en');
      const normalized = item.word.trim().toLowerCase();
      if (existing.has(normalized)) continue;
      const word: CustomWord = {
        id: `custom-${crypto.randomUUID()}`,
        word: item.word.trim(), phonetic: typeof item.phonetic === 'string' ? item.phonetic.trim() : '',
        translation: item.translation.trim(), category: 'custom', track: track.value, updatedAt: Date.now(),
        linkingNotes: typeof item.linkingNotes === 'string' ? item.linkingNotes.trim() : '',
        examples: [{ en: item.examples[0].en.trim(), zh: typeof item.examples[0].zh === 'string' ? item.examples[0].zh.trim() : '' }],
      };
      existing.add(normalized);
      pending.push(word);
    }
    await saveCustomWords(pending);
    customWords.value = [...customWords.value, ...pending];
    notify(`已导入 ${pending.length} 项，跳过重复词条`);
  } catch (reason) { notify(reason instanceof Error ? reason.message : '词库导入失败'); }
  input.value = '';
}

async function exportProgress() {
  try {
    if (backupUrl.value) URL.revokeObjectURL(backupUrl.value);
    const readyBackup = downloadBackup(await createBackup());
    backupUrl.value = readyBackup.url;
    backupName.value = readyBackup.filename;
    notify('备份已准备好；若未自动保存，请点下方下载链接');
  }
  catch { notify('导出失败，请检查本地存储'); }
}

async function importProgress(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  try {
    await importBackup(parseBackup(await file.text()));
    await loadData();
    notify('已合并恢复学习记录');
  } catch (reason) { notify(reason instanceof Error ? reason.message : '导入失败'); }
  input.value = '';
}

async function saveIssue() {
  if (!issueNumberFromUrl(issueUrl.value)) { notify('请粘贴本仓库固定 Issue 的完整链接'); return; }
  await setSetting('issueUrl', issueUrl.value.trim());
  notify('已保存固定 Issue 地址');
}

async function copyTodayLog() {
  const completedToday = sessions.value.filter((item) => item.date === todayKey.value && item.completedAt);
  const recent = progress.value.filter((item) => localDate(new Date(item.lastPracticed)) === todayKey.value);
  if (!completedToday.length && !recent.length) { notify('今天还没有学习记录'); return; }
  const titles = Object.fromEntries(Object.values(lessonsByTrack).flat().map((item) => [item.id, item.title]));
  logText.value = formatLog(todayKey.value, completedToday, recent, titles);
  try {
    await navigator.clipboard.writeText(logText.value);
    notify('已复制。接着打开固定 Issue，粘贴并发布评论');
  } catch { notify('复制受限，请长按下方文本手动复制'); }
}

async function restoreFromGitHub() {
  const number = issueNumberFromUrl(issueUrl.value);
  if (!number) { notify('先保存固定 Issue 地址'); return; }
  try {
    const logs = await fetchOwnerLogs(number);
    const existing = new Map(progress.value.map((item) => [item.itemId, item]));
    const existingSessions = new Map(sessions.value.map((item) => [item.id, item]));
    let updated = 0;
    for (const log of logs) {
      for (const completed of log.sessions) {
        const session: DailySession = {
          id: `${log.date}:${completed.track}:${completed.lessonId}`,
          date: log.date, track: completed.track, lessonId: completed.lessonId,
          completedAt: completed.completedAt,
          reviewedItemIds: log.progress.filter((item) => item.track === completed.track).map((item) => item.itemId),
        };
        if ((session.completedAt ?? 0) > (existingSessions.get(session.id)?.completedAt ?? 0)) {
          await saveSession(session);
          existingSessions.set(session.id, session);
        }
      }
      for (const record of log.progress) {
        if (record.lastPracticed <= (existing.get(record.itemId)?.lastPracticed ?? 0)) continue;
        await saveProgress(record);
        existing.set(record.itemId, record);
        updated += 1;
      }
    }
    await loadData();
    notify(`读到 ${logs.length} 条本人记录，恢复 ${updated} 条复习进度`);
  } catch (reason) { notify(reason instanceof Error ? reason.message : '读取 GitHub 失败'); }
}
</script>

<template>
  <div class="app-shell">
    <div v-if="needRefresh && !updateBannerDismissed && tab !== 'mine'" class="update-banner" role="status"><span>应用新版本已下载，也可在「我的」中更新。</span><button :disabled="recordingState !== 'idle' || updatingApp || checkingUpdates" @click="applyAppUpdate">{{ updatingApp ? '正在更新…' : '现在更新' }}</button><button @click="postponeUpdate">稍后</button></div>
    <header class="topbar">
      <div class="brand"><span class="brand-mark">E</span><div><strong>开口英语</strong><small>每天说一点，慢慢说顺</small></div></div>
      <span class="status-pill" :class="online ? '' : 'offline'">{{ online ? '可离线学习' : '当前离线' }}</span>
    </header>

    <div v-if="error" class="error-banner" role="alert">{{ error }}</div>
    <template v-else-if="ready">
      <section class="track-switch" aria-label="选择学习词库">
        <button :class="{ selected: track === 'daily' }" @click="changeTrack('daily')"><span>☀</span><strong>日常英语</strong><small>40 节生活口语</small></button>
        <button :class="{ selected: track === 'ai' }" @click="changeTrack('ai')"><span>✦</span><strong>AI 英语</strong><small>{{ lessonsByTrack.ai.length }} 节专项课程</small></button>
      </section>

      <main id="main-content">
        <section v-if="tab === 'today'" class="page">
          <div class="page-heading"><div><p class="eyebrow">{{ todayKey }} · {{ trackName }}</p><h1>今天，开口说英语</h1><p>先复习到期内容，再学一课新表达。两套词库互不覆盖进度。</p></div></div>
          <div class="metric-row"><div><strong>{{ completedCount }} / {{ lessons.length }}</strong><span>已完成课程</span></div><div><strong>{{ dueWords.length }}</strong><span>到期复习</span></div><div><strong>{{ todayCompleted.length }}</strong><span>今日完成</span></div></div>
          <p class="study-advice">{{ studyAdvice }}</p>

          <section class="panel" aria-labelledby="review-heading">
            <div class="section-top"><div><p class="eyebrow">SPACED REVIEW</p><h2 id="review-heading">先复习 · {{ dueWords.length }} 项</h2></div><span class="section-aside">按你的练习情况安排</span></div>
            <p v-if="!dueWords.length" class="empty-state">今天暂时没有到期内容。学完新课并给词句自评，之后会自动排复习。</p>
            <div v-else class="review-grid">
              <article v-for="item in dueWords.slice(0, 20)" :key="item.word.id" class="review-card">
                <div class="word-head"><div><h3>{{ item.word.word }}</h3><p class="ipa">{{ item.word.phonetic }}</p></div><button class="icon-button" :aria-label="`朗读 ${item.word.word}`" @click="speak(item.word.word)">▶</button></div>
                <p>{{ item.word.translation }}</p><small class="example">{{ item.word.examples[0]?.en }}</small><button v-if="item.word.examples[0]?.en" type="button" class="example-listen-button" :aria-label="`朗读例句：${item.word.examples[0].en}`" @click="speak(item.word.examples[0].en)">🔊 听例句</button>
                <div class="rating-row"><button @click="rate(item.word, 'again')">再练</button><button @click="rate(item.word, 'hard')">困难</button><button @click="rate(item.word, 'good')">良好</button><button @click="rate(item.word, 'easy')">熟练</button></div>
              </article>
            </div>
            <p v-if="dueWords.length > 20" class="fine-print">本页先显示最早到期的 20 项；完成后会继续显示剩余内容。</p>
          </section>

          <section v-if="customWords.some((item) => item.track === track)" class="panel">
            <div class="section-top"><div><p class="eyebrow">MY WORDS</p><h2>我添加的新内容</h2></div><button class="text-button" @click="tab = 'wordbook'">管理词库 →</button></div>
            <div class="review-grid"><article v-for="word in customWords.filter((item) => item.track === track).slice(-6).reverse()" :key="word.id" class="review-card"><div class="word-head"><div><h3>{{ word.word }}</h3><p class="ipa">{{ word.phonetic }}</p></div><button class="icon-button" :aria-label="`朗读 ${word.word}`" @click="speak(word.word)">▶</button></div><p>{{ word.translation }}</p><small class="example">{{ word.examples[0]?.en }}</small><button v-if="word.examples[0]?.en" type="button" class="example-listen-button" :aria-label="`朗读例句：${word.examples[0].en}`" @click="speak(word.examples[0].en)">🔊 听例句</button><div class="rating-row"><button @click="rate(word, 'again')">再练</button><button @click="rate(word, 'hard')">困难</button><button @click="rate(word, 'good')">良好</button><button @click="rate(word, 'easy')">熟练</button></div></article></div>
          </section>

          <section v-if="currentLesson" class="panel lesson-panel">
            <div class="section-top"><div><p class="eyebrow">LESSON {{ String(currentLesson.order).padStart(2, '0') }} · WEEK {{ currentLesson.week }}</p><h2>{{ currentLesson.title }}</h2><p>{{ currentLesson.subtitle }}</p></div><span class="lesson-count">{{ currentLesson.words.length }} 个表达</span></div>
            <div class="lesson-actions"><button class="secondary-button" @click="tab = 'courses'">换一课</button><button v-if="shadowingEnabled" class="primary-button" @click="tab = 'shadow'">去跟读 →</button></div>

            <h3 class="subheading">今天的词与句块</h3>
            <div class="word-grid">
              <article v-for="word in currentLesson.words" :key="word.id" class="word-card">
                <div class="word-head"><div><h4>{{ word.word }}</h4><p class="ipa">{{ word.phonetic }}</p></div><button class="icon-button" :aria-label="`朗读 ${word.word}`" @click="speak(word.word)">▶</button></div>
                <p class="translation">{{ word.translation }}</p><p class="example">{{ word.examples[0]?.en }}</p><button v-if="word.examples[0]?.en" type="button" class="example-listen-button" :aria-label="`朗读例句：${word.examples[0].en}`" @click="speak(word.examples[0].en)">🔊 听例句</button><p class="example-zh">{{ word.examples[0]?.zh }}</p><p v-if="word.linkingNotes" class="sound-note">发音提示：{{ word.linkingNotes }}</p>
                <div class="rating-row"><button @click="rate(word, 'again')">再练</button><button @click="rate(word, 'hard')">困难</button><button @click="rate(word, 'good')">良好</button><button @click="rate(word, 'easy')">熟练</button></div>
              </article>
            </div>

            <h3 class="subheading">常用句 · 点击听发音</h3>
            <div class="speed-row"><span>朗读速度</span><button :class="{ active: speakingRate === 0.72 }" @click="speakingRate = 0.72">慢速</button><button :class="{ active: speakingRate === 0.95 }" @click="speakingRate = 0.95">正常</button></div>
            <div class="sentence-list"><article v-for="(sentence, index) in currentLesson.sentences" :key="sentence.id" class="sentence-line"><div><strong>{{ index + 1 }}. {{ sentence.en }}</strong><p>{{ sentence.zh }}</p><small v-if="sentence.notes">发音提示：{{ sentence.notes }}</small></div><button class="listen-button" :aria-label="`朗读第 ${index + 1} 句`" @click="speak(sentence.en)">🔊 听发音</button></article></div>

            <h3 class="subheading">短对话 · 点击听发音</h3>
            <div class="dialogue"><div v-for="(line, index) in currentLesson.dialogue" :key="index" class="dialogue-line"><span>{{ line.speaker }}</span><div><p>{{ line.en }}</p><small>{{ line.zh }}</small></div><button class="icon-button small" :aria-label="`朗读对话第 ${index + 1} 句`" @click="speak(line.en)">▶</button></div></div>

            <h3 class="subheading">换成自己的话</h3>
            <div class="prompt-list"><div v-for="(prompt, index) in currentLesson.practicePrompts" :key="index"><strong>{{ index + 1 }}.</strong><span>{{ prompt.zh }}</span><small>参考：{{ prompt.en }}</small><button class="text-button" @click="speak(prompt.en)">听参考表达</button></div></div>
            <div class="bottom-actions"><button v-if="shadowingEnabled" class="secondary-button" @click="tab = 'shadow'">练 4 句跟读</button><button class="primary-button" @click="completeLesson">完成本课</button></div>
          </section>
          <section v-else class="panel"><p class="eyebrow">ALL DONE</p><h2>{{ trackName }}的新课都完成了！</h2><p>今天可以复习到期内容，或在课程列表中打开任意一课重听发音。</p><button class="secondary-button" @click="tab = 'courses'">查看全部课程 →</button></section>
        </section>

        <section v-else-if="tab === 'courses'" class="page">
          <div class="page-heading"><p class="eyebrow">{{ trackName }} · COURSE MAP</p><h1>想学哪一课？</h1><p>可以直接打开任意课程，不必等到第二天。</p></div>
          <div class="course-list"><button v-for="lesson in lessons" :key="lesson.id" class="course-item" :class="{ done: completedIds.has(lesson.id), current: currentLesson?.id === lesson.id }" @click="openLesson(lesson)"><span class="course-number">{{ String(lesson.order).padStart(2, '0') }}</span><span class="course-copy"><strong>{{ lesson.title }}</strong><small>第 {{ lesson.week }} 周 · {{ lesson.subtitle }}</small></span><span class="course-state">{{ completedIds.has(lesson.id) ? '已学 ✓' : '打开 →' }}</span></button></div>
          <button class="secondary-button full" @click="openNextLesson">打开下一节未完成课程</button>
        </section>

        <section v-else-if="shadowingEnabled && tab === 'shadow'" class="page">
          <div class="page-heading"><p class="eyebrow">LISTEN · SHADOW · COMPARE</p><h1>听一句，跟一句</h1><p>听示范、录自己的声音、交替对照。不用联网语音识别打分。</p></div>
          <template v-if="currentLesson && currentSentence">
            <div class="sentence-tabs"><button v-for="(sentence, index) in currentLesson.sentences" :key="sentence.id" :class="{ active: sentenceIndex === index }" @click="sentenceIndex = index">第 {{ index + 1 }} 句</button></div>
            <article class="shadow-card"><span class="shadow-index">{{ currentLesson.title }} · {{ sentenceIndex + 1 }} / {{ currentLesson.sentences.length }}</span><h2>{{ currentSentence.en }}</h2><p class="translation">{{ currentSentence.zh }}</p><p v-if="currentSentence.notes" class="sound-note">发音提示：{{ currentSentence.notes }}</p>
              <div class="speed-row"><span>朗读速度</span><button :class="{ active: speakingRate === 0.72 }" @click="speakingRate = 0.72">慢速</button><button :class="{ active: speakingRate === 0.95 }" @click="speakingRate = 0.95">正常</button></div>
              <div class="shadow-actions"><button class="secondary-button" @click="speak(currentSentence.en)">🔊 听示范</button><button v-if="recordingState !== 'recording'" class="primary-button" :disabled="recordingState === 'saving'" @click="startRecording">● 开始录音</button><button v-else class="danger-button" @click="stopRecording">■ 停止录音</button><button class="secondary-button" :disabled="!recordingUrl" @click="playRecording">▶ 听自己</button></div>
              <p class="fine-print">一次最多录 90 秒；每句只保留这台设备上的最新录音。请在安静处比较关键词、重音和节奏。</p>
            </article>
            <div class="self-check"><h3>自我检查</h3><label><input type="checkbox"> 关键词是否能听清？</label><label><input type="checkbox"> 重音和停顿是否自然？</label><label><input type="checkbox"> 不看文字能再说一遍吗？</label></div>
            <div class="bottom-actions"><button class="secondary-button" :disabled="sentenceIndex === 0" @click="sentenceIndex--">← 上一句</button><button class="primary-button" :disabled="sentenceIndex >= currentLesson.sentences.length - 1" @click="sentenceIndex++">下一句 →</button></div>
          </template>
          <div v-else class="empty-state">新课已经学完。请到“课程”页选择一课重新跟读。</div>
        </section>

        <section v-else-if="tab === 'wordbook'" class="page">
          <div class="page-heading"><p class="eyebrow">{{ trackName }} · WORD BANK</p><h1>词库与我的内容</h1><p>内置词条 {{ builtInWords(track).length }} 个；你添加的词条 {{ customWords.filter((item) => item.track === track).length }} 个。</p></div>
          <section class="panel editor-panel"><h2>{{ editingWordId ? '修改自定义词条' : '添加你想学的内容' }}</h2><p class="fine-print">写入后即可在本词库搜索、朗读并安排复习。</p>
            <form class="word-form" @submit.prevent="saveWord"><label>英文词或句块<input v-model="wordForm.word" required placeholder="Could you say that again?"></label><label>音标（可选）<input v-model="wordForm.phonetic" placeholder="/kʊd ju seɪ ðæt əˈɡen/"></label><label>中文意思<input v-model="wordForm.translation" required placeholder="你能再说一遍吗？"></label><label>英文例句<input v-model="wordForm.exampleEn" required placeholder="Could you say that again, please?"></label><label>例句翻译<input v-model="wordForm.exampleZh" placeholder="请问你能再说一遍吗？"></label><label>发音或连读提示<input v-model="wordForm.linkingNotes" placeholder="could you 可弱读"></label><div class="bottom-actions"><button v-if="editingWordId" type="button" class="secondary-button" @click="clearWordForm">取消编辑</button><button type="submit" class="primary-button">{{ editingWordId ? '保存修改' : '加入我的词库' }}</button></div></form>
          </section>
          <section class="panel"><h2>批量导入词库</h2><p>把 JSON 数组导入当前「{{ trackName }}」词库；重复英文词条会跳过。</p><label class="secondary-button import-button">选择词库 JSON<input type="file" accept="application/json,.json" @change="importWordList"></label><details class="fine-print"><summary>查看格式示例</summary><pre>[{"word":"Could you repeat that?","phonetic":"/kʊd ju rɪˈpiːt ðæt/","translation":"能再说一遍吗？","examples":[{"en":"Could you repeat that, please?","zh":"请再说一遍好吗？"}]}]</pre></details></section>
          <label class="search-label">搜索本词库<input v-model="wordSearch" type="search" placeholder="输入英文或中文"></label>
          <p v-if="!wordSearch" class="fine-print">默认显示前 24 项；搜索可查全部内容。</p>
          <div class="word-grid"><article v-for="word in filteredWords" :key="word.id" class="word-card"><div class="word-head"><div><h3>{{ word.word }}</h3><p class="ipa">{{ word.phonetic }}</p></div><button class="icon-button" :aria-label="`朗读 ${word.word}`" @click="speak(word.word)">▶</button></div><p>{{ word.translation }}</p><p class="example">{{ word.examples[0]?.en }}</p><button v-if="word.examples[0]?.en" type="button" class="example-listen-button" :aria-label="`朗读例句：${word.examples[0].en}`" @click="speak(word.examples[0].en)">🔊 听例句</button><p class="example-zh">{{ word.examples[0]?.zh }}</p><div class="rating-row"><button @click="rate(word, 'again')">再练</button><button @click="rate(word, 'hard')">困难</button><button @click="rate(word, 'good')">良好</button><button @click="rate(word, 'easy')">熟练</button></div><div v-if="word.category === 'custom'" class="custom-actions"><button @click="editCustomWord(word as CustomWord)">编辑</button><button @click="removeCustomWord(word as CustomWord)">删除</button></div></article></div>
          <p v-if="!filteredWords.length" class="empty-state">没有找到相关词条。</p>
        </section>

        <section v-else class="page">
          <div class="page-heading"><p class="eyebrow">MY LEARNING</p><h1>我的学习与备份</h1><p>记录在这台设备上；GitHub 仅是你手动提交的额外备份。</p></div>
          <section class="panel app-update-panel" aria-labelledby="app-update-heading">
            <h2 id="app-update-heading">应用更新</h2>
            <p role="status" aria-live="polite">{{ updateStatus }}</p>
            <button type="button" class="primary-button app-update-button" :disabled="checkingUpdates || updatingApp || recordingState !== 'idle'" @click="handleAppUpdate">{{ updatingApp ? '正在更新…' : checkingUpdates ? '正在检查…' : needRefresh ? '立即更新' : '检查更新' }}</button>
            <p class="fine-print">更新会重新打开页面，保留已保存的学习进度和自定义词库。</p>
          </section>
          <div class="metric-row"><div><strong>{{ sessions.filter((item) => item.track === 'daily' && item.completedAt).length }}</strong><span>日常课完成</span></div><div><strong>{{ sessions.filter((item) => item.track === 'ai' && item.completedAt).length }}</strong><span>AI 课完成</span></div><div><strong>{{ progress.length }}</strong><span>练过的表达</span></div></div>
          <section class="panel"><h2>本地备份</h2><p>导出学习进度和自定义词库，再存到“文件”应用。此前保存的录音会留在原设备，不包含在 JSON 中。</p><div class="stack-actions"><button class="primary-button" @click="exportProgress">导出进度 JSON</button><label class="secondary-button import-button">导入进度 JSON<input type="file" accept="application/json,.json" @change="importProgress"></label></div><a v-if="backupUrl" class="text-link backup-link" :href="backupUrl" :download="backupName">若未自动保存，点这里下载备份 →</a><p class="fine-print">Safari 与主屏幕应用可能是两份独立存储。换设备或重新安装前，请先导出备份。</p></section>
          <section class="panel"><h2>GitHub 每日记录</h2><p>固定 Issue 已准备好。学完后手动复制进度，再用 wutian88 账号去 Issue 粘贴并发布；应用不保存你的 GitHub 密码或密钥。</p><label class="search-label">固定 Issue 链接<input v-model="issueUrl" type="url" placeholder="https://github.com/wutian88/ai-english-pronunciation/issues/1"></label><div class="stack-actions"><button class="secondary-button" @click="saveIssue">保存 Issue 地址</button><a class="text-link" :href="issueLink" target="_blank" rel="noopener noreferrer">打开固定 Issue ↗</a></div><div class="stack-actions"><button class="primary-button" @click="copyTodayLog">复制今天的进度</button><button class="secondary-button" :disabled="!online || !issueNumberFromUrl(issueUrl)" @click="restoreFromGitHub">从 Issue 恢复进度</button></div><textarea v-if="logText" class="log-preview" readonly :value="logText" aria-label="可手动复制的今日进度"></textarea><p class="fine-print">Issue 仅备份课程与复习进度，不包含自定义词条或录音；换设备前请另存上面的 JSON。公开评论任何人都能看到；恢复时只读取仓库主人发布的有效记录。离线学习无需 GitHub。</p></section>
          <section class="panel"><h2>设备与离线说明</h2><p>{{ voiceStatus }}</p><p class="fine-print">应用界面和课程可离线使用；首次安装或课程更新后请联网打开一次。词语、例句、常用句和对话可点击发音按钮；系统朗读能否在断网时工作，取决于 iPhone 已安装的英文语音。</p><p class="fine-print">检查和更新应用都在本页上方的「应用更新」中完成。不要删除应用或清除网站数据，以免丢失本机进度。</p></section>
        </section>
      </main>

      <nav class="bottom-nav" :class="{ 'without-shadowing': !shadowingEnabled }" aria-label="主要导航"><button :class="{ active: tab === 'today' }" @click="tab = 'today'"><span>⌂</span>今日</button><button :class="{ active: tab === 'courses' }" @click="tab = 'courses'"><span>▦</span>课程</button><button v-if="shadowingEnabled" :class="{ active: tab === 'shadow' }" @click="tab = 'shadow'"><span>◉</span>跟读</button><button :class="{ active: tab === 'wordbook' }" @click="tab = 'wordbook'"><span>▤</span>词库</button><button :class="{ active: tab === 'mine' }" @click="tab = 'mine'"><span>●</span>我的</button></nav>
    </template>
    <div v-else class="loading">正在打开你的离线课程…</div>
    <div v-if="toast" class="toast" role="status">{{ toast }}</div>
  </div>
</template>
