# Badja Sidali – portfolio (React + TypeScript + Vite)

## Run it
    npm install
    npm run dev        # local development with live reload
    npm run build      # type-check + production build -> dist/
    npm run preview    # serve the production build locally

`dist/` is ready to upload to GitHub Pages, Netlify or Vercel. Because the build is a single inlined
`dist/index.html` plus `dist/assets/`, it also opens by double-click.

## Structure
    index.html                  pre-paint theme/language script, meta tags, fonts
    src/main.tsx                entry
    src/App.tsx                 page composition + secret words
    src/i18n.tsx, theme.tsx     language and theme providers (EN / FR / AR, light / dark)
    src/data/translations.ts    ALL visible text. fr and ar are typed against en: a missing key fails the build
    src/data/adhkar.ts          the adhkar list
    src/hooks/                  useDhikr, useReveal, useScrollSpy, useTypedSecrets
    src/components/             Nav, Hero, About, Work, Contact, Footer, DhikrCard, EasterEggs ...
    src/styles.css              all styling (colours are CSS variables at the top)
    public/assets/              photo + favicon set

## Common edits
- Change a sentence: `src/data/translations.ts` (do it in all three languages).
- Add a project: add an entry to `PROJECTS` in `src/components/Work.tsx` and its texts in `translations.ts`.
- Add a dhikr: add an item to `src/data/adhkar.ts` (Arabic with diacritics, en, fr, and the source in 3 languages).
