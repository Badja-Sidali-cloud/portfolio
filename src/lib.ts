export const prefersReducedMotion = (): boolean => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Safe localStorage access (private windows and blocked storage can throw). */
export function store(key: string, value?: string): string | null {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
  return null;
}

export const assetUrl = (name: string): string => `${import.meta.env.BASE_URL}assets/${name}`;

const NOISE = '01<>/{}[]#$%&*+=';
/** "Decode" effect: letters resolve left to right out of random glyphs. Returns a cancel function. */
export function scramble(target: string, set: (s: string) => void, ms = 500): () => void {
  let raf = 0;
  const t0 = performance.now();
  const tick = (now: number) => {
    const p = Math.min((now - t0) / ms, 1);
    const keep = Math.floor(p * target.length);
    set(target.split('').map((ch, i) => (i < keep || /[\s|·,.;:–-]/.test(ch) ? ch : NOISE[Math.floor(Math.random() * NOISE.length)])).join(''));
    if (p < 1) raf = requestAnimationFrame(tick); else set(target);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
