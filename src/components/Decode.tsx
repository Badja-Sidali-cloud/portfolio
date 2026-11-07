import { useEffect, useState } from 'react';
import { useLang } from '../i18n';
import { prefersReducedMotion, scramble } from '../lib';

/** Text that decodes into place on load. The real text stays available to screen readers. */
export default function Decode({ text }: { text: string }) {
  const { lang } = useLang();
  const [shown, setShown] = useState(text);
  useEffect(() => {
    // Arabic letters connect, so they are never scrambled; reduced motion shows the text at once.
    if (prefersReducedMotion() || lang === 'ar') { setShown(text); return; }
    return scramble(text, setShown, 900);
  }, [text, lang]);
  return (<><span aria-hidden="true">{shown}</span><span className="vh">{text}</span></>);
}
