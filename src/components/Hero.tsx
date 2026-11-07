import { useLang } from '../i18n';
import { assetUrl } from '../lib';
import Decode from './Decode';
import NetworkCanvas from './NetworkCanvas';
import TypingKicker from './TypingKicker';

export default function Hero() {
  const { t } = useLang();
  return (
    <header className="hero">
      <NetworkCanvas />
      <TypingKicker />
      <h1>
        <span>{t.n1}</span>
        <span>{t.n2}</span>
      </h1>
      <div className="rest">
        <div className="rule" aria-hidden="true"><i /><i /></div>
        <p className="role"><Decode text={t.role} /></p>
        <p className="in">{t.intro}</p>
        <div className="btns">
          <a className="btn g" href="#work">{t.btn_work}</a>
          <a className="btn" href="#contact">{t.btn_contact}</a>
        </div>
      </div>
      <figure className="photo">
        <img src={assetUrl('photo.jpg')} width={480} height={640} alt={t.alt} fetchPriority="high" decoding="async" />
        <figcaption>{t.caption}</figcaption>
      </figure>
    </header>
  );
}
