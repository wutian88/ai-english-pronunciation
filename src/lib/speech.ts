import type { TrackId } from '../types/wordbook';

export type VoiceInfo = Pick<SpeechSynthesisVoice, 'lang' | 'localService'>;

export function isCantoneseVoice(voice: VoiceInfo): boolean {
  const lang = voice.lang.toLowerCase().replaceAll('_', '-');
  return lang === 'yue' || lang.startsWith('yue-') || lang === 'zh-hk';
}

export function selectVoice<T extends VoiceInfo>(voices: T[], track: TrackId): T | undefined {
  const candidates = voices.filter((voice) => track === 'cantonese'
    ? isCantoneseVoice(voice)
    : voice.lang.toLowerCase().replaceAll('_', '-').startsWith('en'));
  if (track === 'cantonese') return candidates.find((voice) => voice.localService) ?? candidates[0];
  const american = candidates.filter((voice) => voice.lang.toLowerCase().replaceAll('_', '-') === 'en-us');
  return american.find((voice) => voice.localService) ?? american[0]
    ?? candidates.find((voice) => voice.localService) ?? candidates[0];
}
