import { useCallback } from 'react';
import { LangProvider, useLang } from './i18n';
import { ThemeProvider } from './theme';
import { useDhikr } from './hooks/useDhikr';
import { useTypedSecrets } from './hooks/useTypedSecrets';
import About from './components/About';
import Contact from './components/Contact';
import DhikrCard from './components/DhikrCard';
import { EasterEggLayer, useEasterEggs } from './components/EasterEggs';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Nav from './components/Nav';
import ScrollProgress from './components/ScrollProgress';
import TechStack from './components/TechStack';
import Work from './components/Work';

function Page() {
  const { t } = useLang();
  const dhikr = useDhikr();
  const eggs = useEasterEggs(dhikr.close);
  const onCatPaw = useCallback((x: number, y: number) => eggs.addPaw(x, y), []);

  // Secret words: `mca` and `cat` as before, plus the adhkar words in Latin and Arabic letters.
  useTypedSecrets({
    mouloudia: eggs.mca,
    mca: eggs.mca,
    cat: eggs.runCat,
    meow: eggs.runCat,
    dhikr: dhikr.show,
    adhkar: dhikr.show,
    'ذكر': dhikr.show,
    'اذكار': dhikr.show,
    'أذكار': dhikr.show,
  });

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <ScrollProgress />
      <Nav />
      <div className="wrap">
        <main id="main">
          <Hero />
          <About />
          <Work />
          <TechStack />
          <Contact />
        </main>
        <Footer onMca={eggs.mca} onPaw={eggs.runCat} onDhikr={dhikr.show} />
      </div>
      <DhikrCard open={dhikr.open} idx={dhikr.idx} onNext={dhikr.show} onClose={dhikr.close} onPause={dhikr.setPaused} />
      <EasterEggLayer
        sweepKey={eggs.sweepKey}
        paws={eggs.paws}
        cat={eggs.cat}
        onPawDone={eggs.removePaw}
        onCatPaw={onCatPaw}
        onCatDone={eggs.endCat}
      />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </LangProvider>
  );
}
