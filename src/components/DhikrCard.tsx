import { useEffect, useRef, useState } from 'react';
import { ADHKAR } from '../data/adhkar';
import { useLang } from '../i18n';
import { prefersReducedMotion } from '../lib';
import { Close, Refresh, Rosette } from './icons';

interface Props { open: boolean; idx: number; onNext: () => void; onClose: () => void; onPause: (p: boolean) => void }

export default function DhikrCard({ open, idx, onNext, onClose, onPause }: Props) {
  const { lang, t } = useLang();
  const [shown, setShown] = useState<number | null>(null);
  const [fade, setFade] = useState(false);
  const wasOpen = useRef(false);

  // Cross-fade between adhkar while open; swap instantly when the card (re)opens.
  useEffect(() => {
    if (!open) { wasOpen.current = false; return; }
    if (!wasOpen.current || prefersReducedMotion()) {
      wasOpen.current = true;
      setShown(idx);
      return;
    }
    setFade(true);
    const id = setTimeout(() => { setShown(idx); setFade(false); }, 250);
    return () => clearTimeout(id);
  }, [open, idx]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const x = shown === null ? null : ADHKAR[shown];

  return (
    <aside
      className={`dhikr${open ? ' on' : ''}`}
      role="status"
      aria-live="polite"
      onMouseEnter={() => onPause(true)}
      onMouseLeave={() => onPause(false)}
      onFocus={() => onPause(true)}
      onBlur={() => onPause(false)}
    >
      <div className="dk-top">
        <span className="dk-l"><Rosette />{t.dk_label}</span>
        <span className="dk-btns">
          <button type="button" onClick={onNext} aria-label={t.dk_next} title={t.dk_next}><Refresh /></button>
          <button type="button" onClick={onClose} aria-label={t.dk_close} title={t.dk_close}><Close /></button>
        </span>
      </div>
      <div className={`dk-body${fade ? ' fade' : ''}`}>
        {x && (
          <>
            <p className="dk-ar" lang="ar" dir="rtl">{x.ar}</p>
            {lang !== 'ar' && <p className="dk-tr">{x[lang]}</p>}
            <p className="dk-src">{x.s[lang]}</p>
          </>
        )}
      </div>
    </aside>
  );
}
