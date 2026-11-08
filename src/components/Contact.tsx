import Decode from './Decode';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLang } from '../i18n';
import { useReveal } from '../hooks/useReveal';
import { Behance, Check, Copy, Facebook, GitHub, Instagram, LinkedIn, Mail, Telegram } from './icons';

const EMAIL = 'badjasidali26@gmail.com';

interface Row { name: string; handle: string; href: string; icon: ReactNode; external?: boolean }

const ROWS: Row[] = [
  { name: 'LinkedIn', handle: 'in/badja-sid-ali', href: 'https://www.linkedin.com/in/badja-sid-ali-08145a360', icon: <LinkedIn />, external: true },
  { name: 'GitHub', handle: 'Badja-Sidali-cloud', href: 'https://github.com/Badja-Sidali-cloud', icon: <GitHub />, external: true },
  { name: 'Behance', handle: 'behance.net/badjasidali', href: 'https://www.behance.net/badjasidali', icon: <Behance />, external: true },
  { name: 'Instagram', handle: '@badja.sidali', href: 'https://www.instagram.com/badja.sidali/', icon: <Instagram />, external: true },
  { name: 'Telegram', handle: '@SidAliBadja', href: 'https://t.me/SidAliBadja', icon: <Telegram />, external: true },
  { name: 'Facebook', handle: 'Badja Sidali', href: 'https://www.facebook.com/profile.php?id=61579879705529', icon: <Facebook />, external: true },
];

function RowContent({ icon, name, handle }: { icon: ReactNode; name: string; handle: string }) {
  return (
    <>
      {icon}
      <span className="nm">{name}</span>
      <span className="hd">{handle}</span>
      <i className="ar" aria-hidden="true">↗</i>
    </>
  );
}

function CopyEmail() {
  const { t } = useLang();
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const ok = () => {
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1800);
  };
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = EMAIL;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { if (document.execCommand('copy')) ok(); } catch { /* ignore */ }
    ta.remove();
  };
  const copy = () => {
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(EMAIL).then(ok, fallback);
    else fallback();
  };

  return (
    <>
      <button className={`copy${done ? ' done' : ''}`} type="button" onClick={copy} aria-label={t.copy_btn} title={t.copy_btn}>
        <Copy />
        <Check />
      </button>
      <span className="sr" role="status" aria-live="polite">{done ? t.copied : ''}</span>
    </>
  );
}

export default function Contact() {
  const { t } = useLang();
  const ref = useReveal<HTMLElement>();
  return (
    <section id="contact" className="rv" ref={ref}>
      <div className="split">
        <h2><Decode text={t.contact_h} onView /></h2>
        <div>
          <p className="cp">{t.contact_p}</p>
          <ul className="soc">
            <li className="has-copy">
              <a href={`mailto:${EMAIL}`}><RowContent icon={<Mail />} name={t.c_email} handle={EMAIL} /></a>
              <CopyEmail />
            </li>
            {ROWS.map((r) => (
              <li key={r.name}>
                <a href={r.href} target="_blank" rel="noopener"><RowContent icon={r.icon} name={r.name} handle={r.handle} /></a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
