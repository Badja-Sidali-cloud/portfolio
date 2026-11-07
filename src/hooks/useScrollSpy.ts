import { useEffect, useState } from 'react';

/** Returns the id of the section currently in the reading zone, or null while the hero is showing. */
export function useScrollSpy(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    key.split('|').forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    const hero = document.querySelector('.hero');
    const heroObs = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) setActive(null);
    }, { threshold: 0.5 });
    if (hero) heroObs.observe(hero);
    return () => {
      spy.disconnect();
      heroObs.disconnect();
    };
  }, [key]);

  return active;
}
