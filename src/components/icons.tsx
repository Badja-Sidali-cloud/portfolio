import type { ReactNode } from 'react';

/* Stroke width, colour and size come from the CSS, so these are bare paths. */
const Svg = ({ children, className }: { children: ReactNode; className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>{children}</svg>
);

export const Moon = () => <Svg className="i-moon"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></Svg>;
export const Sun = () => (
  <Svg className="i-sun">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Svg>
);
export const Mail = () => <Svg><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></Svg>;
export const LinkedIn = () => (
  <Svg><path fill="currentColor" stroke="none" d="M4 9h3.5v11H4zM5.7 3.8a2 2 0 100 4 2 2 0 000-4zM10 9h3.3v1.6c.6-1 1.7-1.9 3.5-1.9 3.2 0 3.7 2.1 3.7 4.8V20H17v-5.6c0-1.4 0-2.9-1.9-2.9s-2.1 1.4-2.1 2.8V20h-3z" /></Svg>
);
export const GitHub = () => (
  <Svg><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></Svg>
);
export const Behance = () => <Svg><path d="M3 6v10.5h5.5a2.75 2.75 0 0 0 0-5.5H3m0 0h5a2.5 2.5 0 0 0 0-5H3M13.5 8.5h7M13.5 14.5h7a3.5 3.5 0 1 0-1 2.5" /></Svg>;
export const Instagram = () => (
  <Svg><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></Svg>
);
export const Telegram = () => <Svg><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4z" /></Svg>;
export const Facebook = () => <Svg><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></Svg>;
export const Copy = () => <Svg className="i-copy"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></Svg>;
export const Check = () => <Svg className="i-ok"><path d="m5 12.5 4.5 4.5L19 7.5" /></Svg>;
export const Rosette = () => (
  <Svg><rect x="5" y="5" width="14" height="14" /><rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" /></Svg>
);
export const Refresh = () => <Svg><path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" /></Svg>;
export const Close = () => <Svg><path d="M6 6l12 12M18 6L6 18" /></Svg>;
