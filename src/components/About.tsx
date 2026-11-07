import { useLang } from '../i18n';
import { useReveal } from '../hooks/useReveal';

export default function About() {
  const { t } = useLang();
  const ref = useReveal<HTMLElement>();
  return (
    <section id="about" className="rv" ref={ref}>
      <div className="split">
        <h2>{t.about_h}</h2>
        <div className="about">
          <p>{t.about_1}</p>
          <p>{t.about_2}</p>
          <p>{t.about_3}</p>
        </div>
      </div>
    </section>
  );
}
