import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n';
import { prefersReducedMotion, scramble } from '../lib';

/** Text that decodes into place. With onView it waits until it scrolls into view. Screen readers get the real text. */
export default function Decode({ text, onView = false }: { text: string; onView?: boolean }) {
  const { lang } = useLang();
  const [shown, setShown] = useState(text);
  const [vis, setVis] = useState(!onView);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (vis) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setVis(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [vis]);

  useEffect(() => {
    if (!vis) return;
    // Arabic letters connect, so they are never scrambled; reduced motion shows the text at once.
    if (prefersReducedMotion() || lang === 'ar') { setShown(text); return; }
    return scramble(text, setShown, onView ? 650 : 900);
  }, [text, lang, vis, onView]);

  return (<><span aria-hidden="true" ref={ref}>{shown}</span><span className="vh">{text}</span></>);
}
