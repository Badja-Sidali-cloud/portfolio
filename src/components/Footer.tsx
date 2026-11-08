import { useEffect, useState } from 'react';
import { useLang } from '../i18n';
import { prefersReducedMotion } from '../lib';
import { Rosette } from './icons';

interface Props { onMca: () => void; onPaw: () => void; onDhikr: () => void }

function algiersTime(d: Date): string {
  try { return d.toLocaleTimeString('en-GB', { timeZone: 'Africa/Algiers', hour12: false }); }
  catch { return d.toLocaleTimeString('en-GB', { hour12: false }); }
}

export default function Footer({ onMca, onPaw, onDhikr }: Props) {
  const { t } = useLang();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const top = () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  return (
    <footer className="site">
      <div className="fbar">
        <span className="stat"><i className="pulse" aria-hidden="true" />{t.foot_status} · {t.foot_city} <time dir="ltr">{algiersTime(now)}</time></span>
        <button type="button" className="totop" onClick={top}>↑ {t.foot_top}</button>
      </div>
      <div className="frow">
        <span className="fl">
          <span className="dots">
            <button type="button" style={{ '--c': 'var(--green)' } as React.CSSProperties} aria-label={t.dot_aria} onClick={onMca} />
            <button type="button" style={{ '--c': 'var(--red)' } as React.CSSProperties} aria-label={t.dot_aria} onClick={onMca} />
          </span>
          <span>{t.copy.replace('{y}', String(new Date().getFullYear()))}</span>
        </span>
        <span className="fr">
          <button className="ico" type="button" aria-label={t.star_aria} onClick={onDhikr}><Rosette /></button>
          <button className="ico" type="button" aria-label={t.paw_aria} onClick={onPaw}>🐾</button>
        </span>
      </div>
    </footer>
  );
}
