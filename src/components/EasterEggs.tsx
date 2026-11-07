import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib';

export interface Paw { id: number; x: number; y: number }

function Cat({ onPaw, onDone }: { onPaw: (x: number, y: number) => void; onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let n = 0;
    const iv = setInterval(() => {
      const b = ref.current?.getBoundingClientRect();
      if (b) onPaw(b.left - 26, b.bottom - (n++ % 2 ? 4 : 20));
    }, 320);
    return () => clearInterval(iv);
  }, [onPaw]);
  return <div ref={ref} className="cat" aria-hidden="true" onAnimationEnd={onDone}><span>🐈</span></div>;
}

interface LayerProps {
  sweepKey: number;
  paws: Paw[];
  cat: boolean;
  onPawDone: (id: number) => void;
  onCatPaw: (x: number, y: number) => void;
  onCatDone: () => void;
}

/** Purely visual layer for the MCA sweep, the paw prints and the walking cat. */
export function EasterEggLayer({ sweepKey, paws, cat, onPawDone, onCatPaw, onCatDone }: LayerProps) {
  return (
    <>
      {sweepKey > 0 && (
        <div key={sweepKey} className={`sweep ${prefersReducedMotion() ? 'fade' : 'go'}`} aria-hidden="true">
          <span lang="ar" dir="rtl">مولودية يا خو !</span>
        </div>
      )}
      {paws.map((p) => (
        <span key={p.id} className="step" style={{ left: p.x, top: p.y }} onAnimationEnd={() => onPawDone(p.id)}>🐾</span>
      ))}
      {cat && <Cat onPaw={onCatPaw} onDone={onCatDone} />}
    </>
  );
}

export function useEasterEggs(closeDhikr: () => void) {
  const [sweepKey, setSweepKey] = useState(0);
  const [paws, setPaws] = useState<Paw[]>([]);
  const [cat, setCat] = useState(false);
  const nextId = useRef(0);

  const addPaw = (x: number, y: number) => setPaws((p) => [...p, { id: nextId.current++, x, y }]);
  const removePaw = (id: number) => setPaws((p) => p.filter((q) => q.id !== id));

  // Using any egg dismisses the dhikr card, so only one thing is on screen at a time.
  const mca = () => { closeDhikr(); setSweepKey((k) => k + 1); };
  const paw = () => {
    closeDhikr();
    for (let i = 0; i < 6; i++) {
      setTimeout(() => addPaw(innerWidth * (0.1 + i * 0.15), innerHeight - 60 - (i % 2) * 22), i * 260);
    }
  };
  const runCat = () => {
    closeDhikr();
    if (prefersReducedMotion()) return paw();
    setCat((c) => (c ? c : true));
  };

  return { sweepKey, paws, cat, mca, paw, runCat, addPaw, removePaw, endCat: () => setCat(false) };
}
