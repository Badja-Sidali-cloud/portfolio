import type { Dict } from '../data/translations';
import { useLang } from '../i18n';
import { useReveal } from '../hooks/useReveal';

interface Project {
  title: string | keyof Dict;
  translatedTitle?: boolean;
  meta: string;
  metaKey?: keyof Dict;
  tag?: keyof Dict;
  desc: keyof Dict;
  link?: { href: string; label: keyof Dict };
}

const PROJECTS: Project[] = [
  { title: 'Code Souls', meta: 'GDG HACK 3.0', tag: 'tag1', desc: 'w1_d' },
  { title: 'GCL', meta: 'GDG Clubs Link', desc: 'w2_d' },
  { title: 'Eat Around', meta: 'Visual Hack', metaKey: 'w3_m', desc: 'w3_d' },
  { title: 'w5_t', translatedTitle: true, meta: 'React · TypeScript · Vite', desc: 'w5_d', link: { href: 'https://github.com/Badja-Sidali-cloud/portfolio', label: 'w5_link' } },
  { title: 'w4_t', translatedTitle: true, meta: 'SEC, CSE', desc: 'w4_d', link: { href: 'https://www.behance.net/badjasidali', label: 'w4_link' } },
];

export default function Work() {
  const { t } = useLang();
  const headRef = useReveal<HTMLHeadingElement>();
  const listRef = useReveal<HTMLUListElement>();
  return (
    <section id="work">
      <div className="split">
        <h2 className="rv" ref={headRef}>{t.work_h}</h2>
        <ul className="work rv" ref={listRef}>
          {PROJECTS.map((p) => (
            <li key={p.title}>
              <b>
                {p.translatedTitle ? <span>{t[p.title as keyof Dict]}</span> : p.title}
                <span className="m">
                  <span>{p.metaKey ? t[p.metaKey] : p.meta}</span>
                  {p.tag && <span className="tag">{t[p.tag]}</span>}
                </span>
              </b>
              <p>
                {p.link ? <span>{t[p.desc]}</span> : t[p.desc]}
                {p.link && (
                  <>
                    <br />
                    <a href={p.link.href} target="_blank" rel="noopener">{t[p.link.label]}</a>
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
