import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ticking = false;
    const paint = () => {
      const el = ref.current;
      const h = document.documentElement.scrollHeight - innerHeight;
      if (el) el.style.transform = `scaleX(${h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0})`;
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', paint);
    paint();
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', paint); };
  }, []);
  return <div className="prog" ref={ref} aria-hidden="true" />;
}
