import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib';

const LINES = ['hello_world();', 'building.exe', 'designing.fig'];

/** Types each line once (deleting the previous one), then rests on the last line. */
export default function TypingKicker() {
  const [text, setText] = useState(() => (prefersReducedMotion() ? LINES[0] : ''));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let li = 0;
    let ci = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const s = LINES[li];
      if (!deleting) {
        ci++;
        setText(s.slice(0, ci));
        if (ci === s.length) {
          if (li === LINES.length - 1) return;
          deleting = true;
          timer = setTimeout(tick, 1600);
          return;
        }
        timer = setTimeout(tick, 95);
        return;
      }
      ci--;
      setText(s.slice(0, ci));
      if (ci === 0) {
        deleting = false;
        li++;
        timer = setTimeout(tick, 350);
        return;
      }
      timer = setTimeout(tick, 45);
    };
    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="kick">
      <span className="sr">hello_world();</span>
      <span aria-hidden="true">
        <b>{text}</b>
        <i className="cur" />
      </span>
    </p>
  );
}
