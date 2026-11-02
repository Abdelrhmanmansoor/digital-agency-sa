/* ═══════════════════════════════════════════════════════════════════════
   GULF MARKETS — one landing page per country, /[locale]/markets/<slug>.

   Platform availability is taken from the platforms' own sites (Nov 2026):
   salla.com lists Saudi Arabia, the UAE, Kuwait, Qatar, Bahrain and Oman;
   zid.sa lists Saudi Arabia, the UAE, Kuwait, Oman, Bahrain, Egypt and
   Syria — so Qatar is offered on Salla only. Zid's Oman page names Aramex,
   SMSA, Asyad, Paymob and Amwal Pay as partners. VAT rates are the
   published national rates. Nothing here promises a gateway or carrier the
   merchant's own account may not have: the copy says we enable what is
   available to the store.
   ═══════════════════════════════════════════════════════════════════════ */

export type MarketSlug = "uae" | "oman" | "kuwait" | "qatar" | "bahrain";

type T = { ar: string; en: string };

export interface Market {
  slug: MarketSlug;
  name: T;
  /** "في الإمارات" / "in the UAE" — used inside sentences. */
  inName: T;
  currency: T;
  cities: { ar: string[]; en: string[] };
  platforms: ("salla" | "zid")[];
  vat: T;
  payments: T;
  shipping: T;
  domain: string;
  keywords: { ar: string[]; en: string[] };
  hook: T;
  faq: { ar: [string, string][]; en: [string, string][] };
}

const commonFaqAr = (inAr: string, platforms: string): [string, string][] => [
  [`هل يمكن فتح متجر سلة أو زد ${inAr}؟`, `نعم. ${platforms} ونحن نجهّز المتجر من التسجيل حتى أول طلب: التصميم، المنتجات، الدفع، الشحن، والصفحات القانونية.`],
  ["كم يستغرق إطلاق المتجر؟", "تجهيز متجر كامل يبدأ من 7 أيام عمل، وتصميم ثيم مخصص من 5 أيام. المدة النهائية نؤكدها بعد معرفة عدد المنتجات ومتطلباتك."],
  ["هل يجب أن أكون في السعودية للتعامل معكم؟", "لا. نعمل عن بُعد بالكامل مع تجار الخليج: الاجتماعات والمراجعات على واتساب، والعقد والفواتير إلكترونية."],
  ["كيف أدفع؟", "على مراحل: دفعة أولى للبدء، والباقي بعد مراجعتك لكل مرحلة. الأسعار المعروضة بالريال السعودي، ونؤكد لك المقابل بعملتك قبل البدء."],
  ["هل تديرون التسويق بعد الإطلاق؟", "نعم، لدينا باقات شهرية لإدارة الحملات على Google وMeta وSnapchat وTikTok، وإدارة حسابات السوشيال ميديا."],
];

const commonFaqEn = (inEn: string, platforms: string): [string, string][] => [
  [`Can I open a Salla or Zid store ${inEn}?`, `Yes. ${platforms} We set the store up from registration to the first order: design, products, payments, shipping and legal pages.`],
  ["How long does launch take?", "A complete store starts at 7 working days; a custom theme from 5. We confirm the final timeline once we know your catalogue and requirements."],
  ["Do I need to be in Saudi Arabia to work with you?", "No. We work fully remotely with Gulf merchants: reviews on WhatsApp, contracts and invoices electronic."],
  ["How do I pay?", "In phases: a first instalment to start, the rest after you review each stage. Prices are shown in SAR; we confirm the amount in your currency before we start."],
  ["Do you run marketing after launch?", "Yes — monthly plans for Google, Meta, Snapchat and TikTok campaigns, and social media management."],
];

export const MARKETS: Market[] = [
  {
    slug: "uae",
    name: { ar: "الإمارات", en: "UAE" },
    inName: { ar: "في الإمارات", en: "in the UAE" },
    currency: { ar: "الدرهم الإماراتي (AED)", en: "UAE dirham (AED)" },
    cities: { ar: ["دبي", "أبوظبي", "الشارقة", "عجمان", "العين", "رأس الخيمة"], en: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Al Ain", "Ras Al Khaimah"] },
    platforms: ["salla", "zid"],
    vat: { ar: "ضريبة القيمة المضافة 5% — نضبطها في المتجر والفواتير", en: "5% VAT — configured on the store and its invoices" },
    payments: { ar: "Apple Pay والبطاقات والتقسيط عبر تابي وتمارا حسب المتاح لحسابك", en: "Apple Pay, cards and BNPL through Tabby and Tamara, as available to your account" },
    shipping: { ar: "شحن داخل الإمارات وإلى دول الخليج عبر شركات الشحن المرتبطة بالمنصة", en: "Delivery across the UAE and to the Gulf through the platform's carriers" },
    domain: ".ae",
    keywords: {
      ar: ["تصميم متجر إلكتروني في الإمارات", "تصميم متجر سلة الإمارات", "إنشاء متجر زد في الإمارات", "تصميم متاجر إلكترونية دبي", "شركة تصميم متاجر أبوظبي", "فتح متجر إلكتروني في الإمارات", "تصميم ثيم سلة دبي", "تسويق متجر إلكتروني الإمارات"],
      en: ["ecommerce store design UAE", "Salla store UAE", "Zid store UAE", "online store design Dubai", "ecommerce agency Abu Dhabi", "open online store UAE"],
    },
    hook: { ar: "متجرك في دبي وأبوظبي يستحق أن يبدو كأفضل العلامات التي ينافسها.", en: "A store in Dubai or Abu Dhabi has to look like the best brands it competes with." },
    faq: {
      ar: commonFaqAr("في الإمارات", "سلة وزد كلاهما يعلن توفره في الإمارات،"),
      en: commonFaqEn("in the UAE", "Salla and Zid both list the UAE as an available market."),
    },
  },
  {
    slug: "oman",
    name: { ar: "عُمان", en: "Oman" },
    inName: { ar: "في عُمان", en: "in Oman" },
    currency: { ar: "الريال العُماني (OMR)", en: "Omani rial (OMR)" },
    cities: { ar: ["مسقط", "صلالة", "صحار", "نزوى", "صور", "البريمي"], en: ["Muscat", "Salalah", "Sohar", "Nizwa", "Sur", "Al Buraimi"] },
    platforms: ["salla", "zid"],
    vat: { ar: "ضريبة القيمة المضافة 5% — نضبطها في المتجر والفواتير", en: "5% VAT — configured on the store and its invoices" },
    payments: { ar: "البطاقات والتحويل والدفع عند الاستلام، وبوابات مثل Paymob وAmwal Pay المرتبطة بزد", en: "Cards, transfer and cash on delivery, with gateways such as Paymob and Amwal Pay listed by Zid" },
    shipping: { ar: "شحن عبر أسياد وأرامكس وسمسا — من شركاء الشحن المعلنين لعُمان", en: "Delivery through Asyad, Aramex and SMSA — carriers listed for Oman" },
    domain: ".om",
    keywords: {
      ar: ["تصميم متجر إلكتروني في عمان", "تصميم متجر زد عمان", "إنشاء متجر سلة في عمان", "تصميم متاجر إلكترونية مسقط", "شركة تصميم متاجر في سلطنة عمان", "فتح متجر إلكتروني عمان", "تسويق متجر إلكتروني مسقط"],
      en: ["ecommerce store design Oman", "Zid store Oman", "Salla store Oman", "online store design Muscat", "ecommerce agency Oman"],
    },
    hook: { ar: "من مسقط إلى صلالة: متجر يعمل بالريال العُماني ويشحن عبر أسياد من أول يوم.", en: "From Muscat to Salalah: a store priced in rials and shipping through Asyad from day one." },
    faq: {
      ar: commonFaqAr("في عُمان", "سلة وزد كلاهما يعلن توفره في عُمان،"),
      en: commonFaqEn("in Oman", "Salla and Zid both list Oman as an available market."),
    },
  },
  {
    slug: "kuwait",
    name: { ar: "الكويت", en: "Kuwait" },
    inName: { ar: "في الكويت", en: "in Kuwait" },
    currency: { ar: "الدينار الكويتي (KWD)", en: "Kuwaiti dinar (KWD)" },
    cities: { ar: ["مدينة الكويت", "حولي", "الفروانية", "الأحمدي", "الجهراء", "مبارك الكبير"], en: ["Kuwait City", "Hawalli", "Farwaniya", "Ahmadi", "Jahra", "Mubarak Al-Kabeer"] },
    platforms: ["salla", "zid"],
    vat: { ar: "لا ضريبة قيمة مضافة حاليًا — نضبط الأسعار والفواتير على هذا الأساس", en: "No VAT at present — prices and invoices set accordingly" },
    payments: { ar: "كي نت والبطاقات وApple Pay حسب ما يتيحه مزوّد الدفع لمتجرك", en: "KNET, cards and Apple Pay, as your payment provider allows" },
    shipping: { ar: "توصيل داخل الكويت وإلى الخليج عبر شركات الشحن المرتبطة بالمنصة", en: "Delivery across Kuwait and the Gulf through the platform's carriers" },
    domain: ".com.kw",
    keywords: {
      ar: ["تصميم متجر إلكتروني في الكويت", "تصميم متجر سلة الكويت", "متجر زد الكويت", "شركة تصميم متاجر الكويت", "فتح متجر إلكتروني في الكويت"],
      en: ["ecommerce store design Kuwait", "Salla store Kuwait", "Zid store Kuwait", "online store agency Kuwait"],
    },
    hook: { ar: "عميل الكويت يقارن كثيرًا قبل أن يشتري — اجعل متجرك الخيار الأوضح.", en: "Kuwaiti shoppers compare before they buy — make your store the obvious choice." },
    faq: {
      ar: commonFaqAr("في الكويت", "سلة وزد كلاهما يعلن توفره في الكويت،"),
      en: commonFaqEn("in Kuwait", "Salla and Zid both list Kuwait as an available market."),
    },
  },
  {
    slug: "qatar",
    name: { ar: "قطر", en: "Qatar" },
    inName: { ar: "في قطر", en: "in Qatar" },
    currency: { ar: "الريال القطري (QAR)", en: "Qatari riyal (QAR)" },
    cities: { ar: ["الدوحة", "الريان", "الوكرة", "الخور", "لوسيل"], en: ["Doha", "Al Rayyan", "Al Wakrah", "Al Khor", "Lusail"] },
    platforms: ["salla"],
    vat: { ar: "لا ضريبة قيمة مضافة حاليًا — نضبط الأسعار والفواتير على هذا الأساس", en: "No VAT at present — prices and invoices set accordingly" },
    payments: { ar: "البطاقات وApple Pay وبوابات الدفع المتاحة لحساب سلة في قطر", en: "Cards, Apple Pay and the gateways available to a Salla account in Qatar" },
    shipping: { ar: "توصيل داخل قطر وإلى الخليج عبر شركات الشحن المرتبطة بسلة", en: "Delivery across Qatar and the Gulf through Salla's carriers" },
    domain: ".qa",
    keywords: {
      ar: ["تصميم متجر إلكتروني في قطر", "تصميم متجر سلة قطر", "شركة تصميم متاجر الدوحة", "فتح متجر إلكتروني في قطر"],
      en: ["ecommerce store design Qatar", "Salla store Qatar", "online store design Doha"],
    },
    hook: { ar: "في الدوحة المنافسة على الثقة قبل السعر — ونحن نبني الثقة في كل صفحة.", en: "In Doha the competition is for trust before price — we build it into every page." },
    faq: {
      ar: commonFaqAr("في قطر", "سلة تعلن توفرها في قطر (زد لا تدرج قطر ضمن أسواقها حاليًا)،"),
      en: commonFaqEn("in Qatar", "Salla lists Qatar as an available market (Zid does not list Qatar at present)."),
    },
  },
  {
    slug: "bahrain",
    name: { ar: "البحرين", en: "Bahrain" },
    inName: { ar: "في البحرين", en: "in Bahrain" },
    currency: { ar: "الدينار البحريني (BHD)", en: "Bahraini dinar (BHD)" },
    cities: { ar: ["المنامة", "المحرق", "الرفاع", "مدينة حمد", "مدينة عيسى"], en: ["Manama", "Muharraq", "Riffa", "Hamad Town", "Isa Town"] },
    platforms: ["salla", "zid"],
    vat: { ar: "ضريبة القيمة المضافة 10% — نضبطها في المتجر والفواتير", en: "10% VAT — configured on the store and its invoices" },
    payments: { ar: "بنفت باي والبطاقات وApple Pay حسب ما يتيحه مزوّد الدفع لمتجرك", en: "BenefitPay, cards and Apple Pay, as your payment provider allows" },
    shipping: { ar: "توصيل داخل البحرين وإلى السعودية والخليج عبر شركات الشحن المرتبطة بالمنصة", en: "Delivery across Bahrain, to Saudi Arabia and the Gulf through the platform's carriers" },
    domain: ".bh",
    keywords: {
      ar: ["تصميم متجر إلكتروني في البحرين", "تصميم متجر سلة البحرين", "متجر زد البحرين", "شركة تصميم متاجر المنامة"],
      en: ["ecommerce store design Bahrain", "Salla store Bahrain", "Zid store Bahrain", "online store design Manama"],
    },
    hook: { ar: "سوق صغير بعملاء متطلبين، وجسر مباشر إلى السعودية — متجرك يحتاج أن يخدم الاثنين.", en: "A small market of demanding customers, and a bridge into Saudi Arabia — your store has to serve both." },
    faq: {
      ar: commonFaqAr("في البحرين", "سلة وزد كلاهما يعلن توفره في البحرين،"),
      en: commonFaqEn("in Bahrain", "Salla and Zid both list Bahrain as an available market."),
    },
  },
];

export const getMarket = (slug: string) => MARKETS.find((m) => m.slug === slug);
