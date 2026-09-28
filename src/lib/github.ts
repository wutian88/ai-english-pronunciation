import type { DailySession, PracticeRecord, TrackId } from '../types/wordbook';

export const REPOSITORY = 'wutian88/ai-english-pronunciation';
export const DEFAULT_ISSUE_URL = `https://github.com/${REPOSITORY}/issues/1`;
const MARKER = 'ENGLISH_PROGRESS_V1';

export interface GitHubLog {
  schemaVersion: 1;
  date: string;
  sessions: { track: TrackId; lessonId: string; completedAt: number }[];
  progress: PracticeRecord[];
}

export function issueNumberFromUrl(url: string): number | undefined {
  const match = /^https:\/\/github\.com\/wutian88\/ai-english-pronunciation\/issues\/(\d+)\/?$/.exec(url.trim());
  return match ? Number(match[1]) : undefined;
}

export function formatLog(date: string, sessions: DailySession[], progress: PracticeRecord[], lessonTitles: Record<string, string>): string {
  const payload: GitHubLog = {
    schemaVersion: 1,
    date,
    sessions: sessions.filter((item) => item.completedAt).map((item) => ({
      track: item.track, lessonId: item.lessonId, completedAt: item.completedAt!,
    })),
    progress,
  };
  return [
    `📘 ${date} · 英语学习记录`,
    `完成：${payload.sessions.map((item) => `${item.track === 'ai' ? 'AI' : '日常'}《${lessonTitles[item.lessonId] ?? item.lessonId}》`).join('、') || '今日复习'}`,
    `今日练习：${payload.progress.length} 项（不含录音）`,
    '',
    `<!-- ${MARKER}`,
    JSON.stringify(payload),
    '-->',
  ].join('\n');
}

export function parseLog(body: string): GitHubLog | undefined {
  const match = new RegExp(`<!-- ${MARKER}\\s*([\\s\\S]*?)\\s*-->`).exec(body);
  if (!match) return undefined;
  try {
    const payload: unknown = JSON.parse(match[1]);
    if (!payload || typeof payload !== 'object') return undefined;
    const value = payload as Partial<GitHubLog>;
    if (value.schemaVersion !== 1 || typeof value.date !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(value.date) ||
        !Array.isArray(value.sessions) || !Array.isArray(value.progress)) return undefined;
    if (value.sessions.some((session) => !session ||
      (session.track !== 'daily' && session.track !== 'ai') ||
      typeof session.lessonId !== 'string' || !Number.isFinite(session.completedAt))) return undefined;
    if (value.progress.some((record) => !record ||
      typeof record.itemId !== 'string' || (record.track !== 'daily' && record.track !== 'ai') ||
      !Number.isFinite(record.lastPracticed) || !Number.isFinite(record.nextReviewDate) ||
      !Number.isInteger(record.reviewStage) || record.reviewStage < 0 || record.reviewStage > 7 ||
      !Number.isInteger(record.repetitions) || record.repetitions < 0 ||
      !['again', 'hard', 'good', 'easy'].includes(record.userRating))) return undefined;
    return value as GitHubLog;
  } catch {
    return undefined;
  }
}

interface IssueComment {
  user?: { login?: string };
  body?: string;
}

export async function fetchOwnerLogs(issueNumber: number): Promise<GitHubLog[]> {
  const logs: GitHubLog[] = [];
  for (let page = 1; page <= 5; page += 1) {
    const response = await fetch(`https://api.github.com/repos/${REPOSITORY}/issues/${issueNumber}/comments?per_page=100&page=${page}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) throw new Error(`GitHub 读取失败（${response.status}）`);
    const comments = await response.json() as IssueComment[];
    for (const comment of comments) {
      if (comment.user?.login?.toLowerCase() !== 'wutian88' || !comment.body) continue;
      const log = parseLog(comment.body);
      if (log) logs.push(log);
    }
    if (comments.length < 100) break;
  }
  return logs;
}
