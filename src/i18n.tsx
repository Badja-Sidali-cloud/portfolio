import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { LANGS, translations, type Dict, type Lang } from './data/translations';
import { store } from './lib';

interface LangValue {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangValue | null>(null);
const isLang = (v: string): v is Lang => (LANGS as string[]).includes(v);

export function LangProvider({ children }: { children: ReactNode }) {
  // The inline script in index.html has already picked the language and set <html lang>.
  const [lang, setLangState] = useState<Lang>(() => {
    const l = document.documentElement.lang;
    return isLang(l) ? l : 'en';
  });

  useEffect(() => {
    const r = document.documentElement;
    r.lang = lang;
    r.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = translations[lang].title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', translations[lang].desc);
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    store('lang', l);
  }, []);

  const value = useMemo(() => ({ lang, t: translations[lang], setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangValue {
  const v = useContext(LangContext);
  if (!v) throw new Error('useLang must be used inside <LangProvider>');
  return v;
}
