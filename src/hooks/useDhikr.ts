import { useCallback, useEffect, useRef, useState } from 'react';
import { ADHKAR } from '../data/adhkar';
import { store } from '../lib';

/** Time on screen: 2.2 s to 4.3 s, longer for longer adhkar. */
const duration = (i: number) => Math.min(4300, Math.max(2200, 1700 + ADHKAR[i].ar.length * 23));

function readLast(): number {
  const n = parseInt(store('dk-last') ?? '', 10);
  return Number.isNaN(n) || n < 0 || n >= ADHKAR.length ? -1 : n;
}

/**
 * Shuffled "bag": every dhikr is shown once before any repeats, and a new visit never starts
 * with the one seen last. The card opens only when `show()` is called (button or typed word)
 * and closes by itself, unless the pointer or keyboard focus is on it.
 */
export function useDhikr() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const bag = useRef<number[]>([]);
  const last = useRef<number>(readLast());

  const draw = useCallback((): number => {
    if (bag.current.length === 0) {
      const a = ADHKAR.map((_, i) => i);
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      if (a[0] === last.current) {
        const k = 1 + Math.floor(Math.random() * (a.length - 1));
        [a[0], a[k]] = [a[k], a[0]];
      }
      bag.current = a;
    }
    const n = bag.current.shift() as number;
    last.current = n;
    store('dk-last', String(n));
    return n;
  }, []);

  const show = useCallback(() => {
    setIdx(draw());
    setOpen(true);
  }, [draw]);

  const close = useCallback(() => {
    setOpen(false);
    setPaused(false);
  }, []);

  // Restarts whenever a new dhikr appears (idx changes) and pauses while the card is hovered or focused.
  useEffect(() => {
    if (!open || paused) return;
    const id = setTimeout(close, duration(idx));
    return () => clearTimeout(id);
  }, [open, paused, idx, close]);

  return { open, idx, show, close, setPaused };
}
