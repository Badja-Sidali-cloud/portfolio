import { useEffect, useRef } from 'react';

/** Calls the matching handler when the visitor types one of the secret words anywhere on the page. */
export function useTypedSecrets(secrets: Record<string, () => void>) {
  const latest = useRef(secrets);
  latest.current = secrets;

  useEffect(() => {
    let buf = '';
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || !e.key || e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-8);
      for (const word of Object.keys(latest.current)) {
        if (buf.endsWith(word)) {
          buf = '';
          latest.current[word]();
          break;
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
}
