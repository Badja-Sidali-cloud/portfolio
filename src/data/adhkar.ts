import type { Lang } from './translations';

export interface Dhikr {
  ar: string;
  en: string;
  fr: string;
  s: Record<Lang, string>;
}

/* The Arabic text is shown as-is in every language; en/fr are translations, `s` is the source. */
export const ADHKAR: Dhikr[] = [
  { ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    en: 'Glory be to Allah and praise be to Him; glory be to Allah, the Magnificent.',
    fr: 'Gloire à Allah et louange à Lui ; gloire à Allah, l’Immense.',
    s: { en: 'Agreed upon (al-Bukhari & Muslim)', fr: 'Rapporté par al-Bukhârî et Muslim', ar: 'متفق عليه' } },
  { ar: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    en: 'There is no power and no strength except with Allah.',
    fr: 'Il n’y a de puissance ni de force qu’en Allah.',
    s: { en: 'Agreed upon (al-Bukhari & Muslim)', fr: 'Rapporté par al-Bukhârî et Muslim', ar: 'متفق عليه' } },
  { ar: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    en: 'I ask Allah for forgiveness and I turn to Him in repentance.',
    fr: 'Je demande pardon à Allah et je me repens auprès de Lui.',
    s: { en: 'Al-Bukhari', fr: 'Al-Bukhârî', ar: 'رواه البخاري' } },
  { ar: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
    en: 'O Allah, send prayers and peace upon our Prophet Muhammad ﷺ.',
    fr: 'Ô Allah, accorde Ta prière et Ton salut à notre Prophète Muhammad ﷺ.',
    s: { en: 'Salawat on the Prophet ﷺ', fr: 'Invocation sur le Prophète ﷺ', ar: 'الصلاة على النبي ﷺ' } },
  { ar: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    en: 'None has the right to be worshipped but Allah alone, with no partner. His is the dominion and His is the praise, and He has power over all things.',
    fr: 'Nul n’est digne d’adoration en dehors d’Allah, Seul, sans associé. À Lui la royauté, à Lui la louange, et Il est capable de toute chose.',
    s: { en: 'Agreed upon (al-Bukhari & Muslim)', fr: 'Rapporté par al-Bukhârî et Muslim', ar: 'متفق عليه' } },
  { ar: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    en: 'Allah is sufficient for me; there is no god but Him. In Him I place my trust, and He is the Lord of the Mighty Throne.',
    fr: 'Allah me suffit ; il n’y a de divinité que Lui. En Lui je place ma confiance, et Il est le Seigneur du Trône immense.',
    s: { en: 'Qur’an 9:129', fr: 'Coran 9:129', ar: 'سورة التوبة، الآية 129' } },
  { ar: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ',
    en: 'Glory be to Allah, praise be to Allah, there is no god but Allah, and Allah is the Greatest.',
    fr: 'Gloire à Allah, louange à Allah, il n’y a de divinité qu’Allah, et Allah est le Plus Grand.',
    s: { en: 'Muslim', fr: 'Muslim', ar: 'رواه مسلم' } },
  { ar: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
    en: 'My Lord, forgive me and accept my repentance; You are the Ever-Accepting of repentance, the Most Merciful.',
    fr: 'Seigneur, pardonne-moi et accepte mon repentir ; Tu es Celui qui accepte le repentir, le Miséricordieux.',
    s: { en: 'Abu Dawud & at-Tirmidhi', fr: 'Abû Dâwûd et at-Tirmidhî', ar: 'رواه أبو داود والترمذي' } },
  { ar: 'رَبِّ زِدْنِي عِلْمًا',
    en: 'My Lord, increase me in knowledge.',
    fr: 'Seigneur, augmente mes connaissances.',
    s: { en: 'Qur’an 20:114', fr: 'Coran 20:114', ar: 'سورة طه، الآية 114' } },
  { ar: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    en: 'My Lord, open my chest for me and make my task easy for me.',
    fr: 'Seigneur, ouvre-moi ma poitrine et facilite-moi ma mission.',
    s: { en: 'Qur’an 20:25–26', fr: 'Coran 20:25-26', ar: 'سورة طه، الآيتان 25–26' } }
];
