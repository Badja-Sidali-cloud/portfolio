import Decode from './Decode';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { GLYPHS } from '../data/stackIcons';
import { useLang } from '../i18n';
import { prefersReducedMotion, scramble } from '../lib';

interface Item { name: string; glyph?: keyof typeof GLYPHS; custom?: ReactNode }

// Brand marks come from the icon set. Java, Canva and CapCut are simple line drawings of my own.
const L = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
const JAVA = <g {...L}><path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" /><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" /><path d="M8 3c-1 1.5 1 2.5 0 4M12 3c-1 1.5 1 2.5 0 4" /><path d="M4 21h13" /></g>;
const CANVA = <g {...L}><circle cx="12" cy="12" r="9" /><path d="M15.5 9.5a4 4 0 1 0 0 5" /></g>;
const CAPCUT = <g {...L}><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path d="M8 7.5 20 18M8 16.5 20 6" /></g>;

const GROUPS: { id: string; items: Item[] }[] = [
  { id: 'languages', items: [{ name: 'C', glyph: 'c' }, { name: 'Java', custom: JAVA }, { name: 'Python', glyph: 'python' }, { name: 'JavaScript', glyph: 'js' }] },
  { id: 'web', items: [{ name: 'HTML', glyph: 'html' }, { name: 'CSS', glyph: 'css' }] },
  { id: 'tools', items: [{ name: 'Git', glyph: 'git' }, { name: 'GitHub', glyph: 'github' }] },
  { id: 'design', items: [{ name: 'Figma', glyph: 'figma' }, { name: 'Canva', custom: CANVA }, { name: 'CapCut', custom: CAPCUT }] },
];

/** Brand colour for the hover accent; very dark or very light brands fall back to the site green. */
function accent(hex?: string): string {
  if (!hex) return 'var(--green)';
  const n = parseInt(hex, 16);
  const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return lum > 0.12 && lum < 0.8 ? `#${hex}` : 'var(--green)';
}

function Tile({ item, i }: { item: Item; i: number }) {
  const [label, setLabel] = useState(item.name);
  const stop = useRef<(() => void) | undefined>(undefined);
  const g = item.glyph ? GLYPHS[item.glyph] : undefined;
  useEffect(() => () => stop.current?.(), []);
  const run = () => {
    stop.current?.();
    if (prefersReducedMotion()) return;
    stop.current = scramble(item.name, setLabel, 420);
  };
  return (
    <li className="tile" onPointerEnter={run} style={{ '--i': i, '--c': accent(g?.hex) } as CSSProperties}>
      <svg viewBox="0 0 24 24" aria-hidden="true">{g ? <path d={g.path} /> : item.custom}</svg>
      <span className="tn" aria-hidden="true">{label}</span>
      <span className="vh">{item.name}</span>
      <i className="led" aria-hidden="true" />
    </li>
  );
}

export default function TechStack() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return;
    const cmd = 'cat stack.json';
    if (prefersReducedMotion()) { setTyped(cmd); return; }
    let k = 0;
    const id = setInterval(() => { k++; setTyped(cmd.slice(0, k)); if (k >= cmd.length) clearInterval(id); }, 60);
    return () => clearInterval(id);
  }, [seen]);

  let n = 0;
  return (
    <section id="stack">
      <div className="split">
        <h2><Decode text={t.stack_h} onView /></h2>
        <div className={`stack${seen ? ' in' : ''}`} ref={ref}>
          <p className="stk-p">{t.stack_p}</p>
          <div className="term" dir="ltr">
            <div className="tbar"><span className="dots3" aria-hidden="true"><i /><i /><i /></span><span>stack.json</span></div>
            <p className="prompt" aria-hidden="true"><b>$</b> {typed}<span className="cur" /></p>
            {GROUPS.map((g) => (
              <div className="sg" key={g.id}>
                <span className="gl">{g.id}/</span>
                <ul>{g.items.map((it) => <Tile key={it.name} item={it} i={n++} />)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
