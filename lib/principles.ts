/* ═══════════════════════════════════════════════════════════════════════
   PRINCIPLES — five verses and what each one means in the work.

   Verse text is copied character for character from the "quran-simple"
   edition (Tanzil) served by api.alquran.cloud; English is Sahih
   International, French is Hamidullah — the same source, fetched together.
   Where only part of an ayah is quoted, the part is reproduced exactly and
   nothing is added inside the brackets. Do not retype these by hand.
   ═══════════════════════════════════════════════════════════════════════ */

type L = { ar: string; en: string; fr: string };

export interface Principle {
  key: string;
  verse: string;
  surah: L;
  ayah: number;
  meaning: { en: string; fr: string };
  title: L;
  practice: L;
}

export const PRINCIPLES: Principle[] = [
  {
    key: "trust",
    verse: "إِنَّ خَيْرَ مَنِ اسْتَأْجَرْتَ الْقَوِيُّ الْأَمِينُ",
    surah: { ar: "القصص", en: "Al-Qasas", fr: "Al-Qasas" },
    ayah: 26,
    meaning: {
      en: "Indeed, the best one you can hire is the strong and the trustworthy.",
      fr: "Le meilleur à engager c'est celui qui est fort et digne de confiance.",
    },
    title: { ar: "القوة والأمانة", en: "Strength and trust", fr: "Compétence et confiance" },
    practice: {
      ar: "خبرة تُنجز ما وعدنا به، وأمانة تحفظ حقك في كل خطوة.",
      en: "Skill that delivers what we promised, and integrity that protects you at every step.",
      fr: "Un savoir-faire qui tient ses promesses, une intégrité qui vous protège à chaque étape.",
    },
  },
  {
    key: "contracts",
    verse: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ",
    surah: { ar: "المائدة", en: "Al-Ma'idah", fr: "Al-Ma'ida" },
    ayah: 1,
    meaning: {
      en: "O you who have believed, fulfill [all] contracts.",
      fr: "O les croyants ! Remplissez fidèlement vos engagements.",
    },
    title: { ar: "العقد قبل العمل", en: "The contract comes first", fr: "Le contrat d'abord" },
    practice: {
      ar: "نطاق مكتوب وعقد واضح قبل أن نبدأ، ونلتزم بكل بند فيه.",
      en: "A written scope and a clear contract before we start — and we keep every clause.",
      fr: "Un périmètre écrit et un contrat clair avant de commencer, respectés clause par clause.",
    },
  },
  {
    key: "promise",
    verse: "وَأَوْفُوا بِالْعَهْدِ ۖ إِنَّ الْعَهْدَ كَانَ مَسْئُولًا",
    surah: { ar: "الإسراء", en: "Al-Isra", fr: "Al-Isra" },
    ayah: 34,
    meaning: {
      en: "And fulfill [every] commitment. Indeed, the commitment is ever [that about which one will be] questioned.",
      fr: "Et remplissez l'engagement, car on sera interrogé au sujet des engagements.",
    },
    title: { ar: "الموعد كلمة", en: "A deadline is a word given", fr: "Un délai est une parole" },
    practice: {
      ar: "المدة التي نعلنها هي المدة التي نسلّم فيها — وإن طرأ ما يؤخرها، تعرفه منا أولًا.",
      en: "The timeline we publish is the one we deliver on — and if anything moves it, you hear it from us first.",
      fr: "Le délai annoncé est celui que nous tenons ; si quelque chose le décale, vous l'apprenez de nous d'abord.",
    },
  },
  {
    key: "measure",
    verse: "فَأَوْفُوا الْكَيْلَ وَالْمِيزَانَ وَلَا تَبْخَسُوا النَّاسَ أَشْيَاءَهُمْ",
    surah: { ar: "الأعراف", en: "Al-A'raf", fr: "Al-A'raf" },
    ayah: 85,
    meaning: {
      en: "So fulfill the measure and weight and do not deprive people of their due.",
      fr: "Donnez donc la pleine mesure et le poids et ne donnez pas aux gens moins que ce qui leur est dû.",
    },
    title: { ar: "الكيل الوافي", en: "Full measure", fr: "La pleine mesure" },
    practice: {
      ar: "سعر معلن لا يتغير بعد الاتفاق، وتستلم كامل ما اتفقنا عليه دون نقص.",
      en: "A published price that does not change after we agree, and everything agreed delivered in full.",
      fr: "Un prix affiché qui ne change pas après accord, et tout ce qui est convenu livré en entier.",
    },
  },
  {
    key: "trusts",
    verse: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَنْ تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
    surah: { ar: "النساء", en: "An-Nisa", fr: "An-Nisa" },
    ayah: 58,
    meaning: {
      en: "Indeed, Allah commands you to render trusts to whom they are due.",
      fr: "Certes, Allah vous commande de rendre les dépôts à leurs ayants-droit.",
    },
    title: { ar: "الأمانة تعود لأهلها", en: "Trusts returned", fr: "Les dépôts rendus" },
    practice: {
      ar: "حساباتك وملفاتك وبيانات عملائك أمانة عندنا، تعود إليك كاملة عند التسليم.",
      en: "Your accounts, files and customer data are held in trust and handed back to you in full.",
      fr: "Vos comptes, fichiers et données clients sont un dépôt, rendu intégralement à la livraison.",
    },
  },
];
