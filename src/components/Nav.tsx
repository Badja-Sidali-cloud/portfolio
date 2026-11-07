import { LANGS, type Dict } from '../data/translations';
import { useLang } from '../i18n';
import { useTheme } from '../theme';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { Moon, Sun } from './icons';

const LINKS: { id: string; key: keyof Dict }[] = [
  { id: 'about', key: 'nav_about' },
  { id: 'work', key: 'nav_work' },
  { id: 'stack', key: 'nav_stack' },
  { id: 'contact', key: 'nav_contact' },
];

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const { toggle } = useTheme();
  const active = useScrollSpy(LINKS.map((l) => l.id));

  return (
    <div className="bar">
      <nav className="wrap navin" aria-label={t.nav_aria}>
        <a className="brand" href="#top">{t.nb}</a>
        <span className="links">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? 'true' : undefined}>{t[l.key]}</a>
          ))}
        </span>
        <span className="tools">
          <button className="tbtn" type="button" onClick={toggle} aria-label={t.theme} title={t.theme}>
            <Moon />
            <Sun />
          </button>
          <span className="lang" role="group" aria-label={t.lang_aria}>
            {LANGS.map((l) => (
              <button key={l} type="button" lang={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </span>
        </span>
      </nav>
    </div>
  );
}
