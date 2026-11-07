import { useLang } from '../i18n';
import { Rosette } from './icons';

interface Props { onMca: () => void; onPaw: () => void; onDhikr: () => void }

export default function Footer({ onMca, onPaw, onDhikr }: Props) {
  const { t } = useLang();
  return (
    <footer>
      <span className="fl">
        <span className="dots">
          <button type="button" style={{ '--c': 'var(--green)' } as React.CSSProperties} aria-label={t.dot_aria} onClick={onMca} />
          <button type="button" style={{ '--c': 'var(--red)' } as React.CSSProperties} aria-label={t.dot_aria} onClick={onMca} />
        </span>
        <span>{t.copy.replace('{y}', String(new Date().getFullYear()))}</span>
      </span>
      <span className="fr">
        <button className="ico" type="button" aria-label={t.star_aria} onClick={onDhikr}><Rosette /></button>
        <button className="ico" type="button" aria-label={t.paw_aria} onClick={onPaw}>🐾</button>
      </span>
    </footer>
  );
}
