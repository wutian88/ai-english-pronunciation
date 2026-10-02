import { afterEach, describe, expect, it, vi } from 'vitest';
import { checkWaitingUpdate } from './updates';

class Worker extends EventTarget {
  state = 'installing';
  changeState(state: string) {
    this.state = state;
    this.dispatchEvent(new Event('statechange'));
  }
}

function registration() {
  return {
    waiting: null as Worker | null,
    installing: null as Worker | null,
    update: vi.fn(async () => undefined),
  };
}

afterEach(() => vi.useRealTimers());

describe('application update checking', () => {
  it('offers an already downloaded update without another network check', async () => {
    const sw = registration();
    sw.waiting = new Worker();
    expect(await checkWaitingUpdate(sw)).toBe(true);
    expect(sw.update).not.toHaveBeenCalled();
  });

  it('returns no update when the registered worker is unchanged', async () => {
    const sw = registration();
    expect(await checkWaitingUpdate(sw)).toBe(false);
    expect(sw.update).toHaveBeenCalledOnce();
  });

  it('detects an update that becomes ready during the check', async () => {
    const sw = registration();
    sw.update.mockImplementation(async () => { sw.waiting = new Worker(); });
    expect(await checkWaitingUpdate(sw)).toBe(true);
  });

  it('waits for the download after update() resolves, and removes its listener', async () => {
    const sw = registration();
    const worker = new Worker();
    const remove = vi.spyOn(worker, 'removeEventListener');
    sw.update.mockImplementation(async () => { sw.installing = worker; });
    let finished = false;
    const result = checkWaitingUpdate(sw).then((ready) => { finished = true; return ready; });
    await Promise.resolve();
    expect(finished).toBe(false);
    sw.waiting = worker;
    worker.changeState('installed');
    expect(await result).toBe(true);
    expect(remove).toHaveBeenCalledWith('statechange', expect.any(Function));
  });

  it('waits for an installation already in progress instead of checking twice', async () => {
    const sw = registration();
    const worker = new Worker();
    sw.installing = worker;
    const result = checkWaitingUpdate(sw);
    sw.waiting = worker;
    worker.changeState('installed');
    expect(await result).toBe(true);
    expect(sw.update).not.toHaveBeenCalled();
  });

  it('reports a failed install instead of claiming the app is up to date', async () => {
    const sw = registration();
    const worker = new Worker();
    sw.installing = worker;
    const result = checkWaitingUpdate(sw);
    worker.changeState('redundant');
    await expect(result).rejects.toThrow('更新下载失败');
  });

  it('stops waiting after a timeout so the user can retry', async () => {
    vi.useFakeTimers();
    const sw = registration();
    const worker = new Worker();
    sw.installing = worker;
    const remove = vi.spyOn(worker, 'removeEventListener');
    const result = expect(checkWaitingUpdate(sw, 100)).rejects.toThrow('更新下载仍在进行');
    await vi.advanceTimersByTimeAsync(100);
    await result;
    expect(remove).toHaveBeenCalledOnce();
  });

  it('propagates network failures for the page to display', async () => {
    const sw = registration();
    sw.update.mockRejectedValue(new Error('network unavailable'));
    await expect(checkWaitingUpdate(sw)).rejects.toThrow('network unavailable');
  });
});
