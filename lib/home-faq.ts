/* Homepage FAQ — shared by the rendered accordion and the FAQPage JSON-LD.
   It lived inside the client component only, so the section was invisible to
   the rich-result parsers that read structured data. Answers only restate
   what the site already commits to elsewhere; nothing here is invented. */

export type FaqEntry = readonly [question: string, answer: string];

export const HOME_FAQ: Record<"ar" | "en" | "fr", readonly FaqEntry[]> = {
  ar: [
    [
      "كم يستغرق تصميم المتجر؟",
      "غالبًا من 10 إلى 20 يوم عمل، بحسب حجم المتجر والمحتوى والتخصيص المطلوب.",
    ],
    [
      "هل تعملون على سلة وزد؟",
      "نعم. نتخصص في تصميم وتطوير متاجر سلة وزد، إضافة إلى المواقع المخصصة عند الحاجة.",
    ],
    [
      "هل تشمل الخدمة تحسين الظهور في Google؟",
      "نهيئ البنية التقنية، العناوين، المحتوى، البيانات المنظمة، السرعة، وخريطة الموقع. التحسن العضوي يحتاج أيضًا إلى محتوى مستمر ووقت.",
    ],
    [
      "هل يمكن البدء باستشارة فقط؟",
      "نعم. نراجع وضع المشروع ونقترح الأولويات قبل اختيار الخدمة المناسبة.",
    ],
    [
      "هل يُبنى المتجر ليعمل على الجوال أولًا؟",
      "نعم. نصمم ونختبر على مقاسات الجوال أولًا لأن أغلب زيارات المتاجر في السعودية تأتي من الجوال، ثم نضبط النسخة الأوسع.",
    ],
    [
      "كيف تكون الخطوة الأولى؟",
      "أرسل نبذة قصيرة عن نشاطك وما تريد تحقيقه عبر واتساب. نرد عادة خلال أقل من ساعة بخطوة أولى واضحة، أو بتحليل مجاني لمتجرك الحالي.",
    ],
  ],
  en: [
    [
      "How long does a store take?",
      "Most projects take 10–20 working days, depending on store size, content and customization.",
    ],
    [
      "Do you work with Salla and Zid?",
      "Yes. They are our core specialty, alongside custom websites when needed.",
    ],
    [
      "Is Google visibility included?",
      "We optimize structure, titles, content, structured data, speed and sitemap. Organic growth also requires consistent content and time.",
    ],
    [
      "Can we start with consultation only?",
      "Yes. We can review your current position and recommend priorities before selecting a service.",
    ],
    [
      "Is the store built mobile-first?",
      "Yes. We design and test on phone widths first, because most store traffic in Saudi Arabia arrives on mobile, then scale the layout up.",
    ],
    [
      "What is the first step?",
      "Send a short brief about your business and what you want to achieve on WhatsApp. We usually reply in under an hour with a clear first step, or with a free audit of your current store.",
    ],
  ],
  fr: [
    [
      "Combien de temps faut-il ?",
      "La plupart des projets prennent 10 à 20 jours ouvrés, selon la taille de la boutique, le contenu et le niveau de personnalisation.",
    ],
    [
      "Travaillez-vous avec Salla et Zid ?",
      "Oui, c’est notre spécialité principale, ainsi que les sites sur mesure lorsque le projet le demande.",
    ],
    [
      "Le SEO est-il inclus ?",
      "Nous optimisons la structure, les titres, le contenu, les données structurées, la vitesse et le sitemap. La croissance organique demande aussi du contenu régulier et du temps.",
    ],
    [
      "Peut-on commencer par une consultation ?",
      "Oui. Nous auditons d’abord votre situation et définissons les priorités avant de choisir une prestation.",
    ],
    [
      "La boutique est-elle conçue mobile-first ?",
      "Oui. Nous concevons et testons d’abord sur mobile, car l’essentiel du trafic e-commerce en Arabie saoudite vient du téléphone.",
    ],
    [
      "Quelle est la première étape ?",
      "Envoyez un bref descriptif de votre activité et de vos objectifs sur WhatsApp. Nous répondons généralement en moins d’une heure, ou proposons un audit gratuit de votre boutique.",
    ],
  ],
};
