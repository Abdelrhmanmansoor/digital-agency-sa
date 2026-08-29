/* ══════════════════════════════════════════════════════════════════════════
   بيانات عرض السعر — مؤسسة سليمان

   كل قيمة هنا مستخرجة من الملفات المرفقة بالمشروع أو من الموقع الرسمي
   للعميل نفسه. لا يُضاف أي رقم أو نتيجة أو اسم علامة غير موثّق.

   logo  : أصل حقيقي داخل /public/proposal/clients مأخوذ من موقع العميل
   shot  : لقطة حقيقية للموقع أُخذت بمتصفح فعلي بمقاس 1440×900
   null  : الموقع غير متاح للوصول وقت الإعداد — لا شعار ولا لقطة مُختلقة
   ══════════════════════════════════════════════════════════════════════════ */

export type Project = {
  key: string;
  /** الاسم كما يظهر فعلياً في الموقع أو في الشعار — لا يُشتق من الدومين */
  name: string;
  /** وصف مؤكد من العنوان الرسمي للموقع، أو null إن لم يكن مؤكداً */
  note: string | null;
  url: string;
  domain: string;
  logo: string | null;
  shot: string | null;
  /** الشعار مرسوم بلون فاتح ويحتاج خلفية داكنة داخل حاوية الشعار */
  logoOnDark?: boolean;
};

export const PROJECTS: Project[] = [
  {
    key: "shaim",
    name: "شايم للمحاماة",
    note: "محاماة واستشارات قانونية — الرياض",
    url: "https://shaim.com.sa/",
    domain: "shaim.com.sa",
    logo: "/proposal/clients/shaim.png",
    shot: "/proposal/shots/shaim.jpg",
  },
  {
    key: "sq",
    name: "SQ",
    note: "مكتب محاماة وتوثيق",
    url: "https://www.sq.sa/",
    domain: "sq.sa",
    logo: "/proposal/clients/sq.svg",
    shot: "/proposal/shots/sq.jpg",
  },
  {
    key: "avneum",
    name: "افنيوم",
    note: "متجر عطور",
    url: "https://avneum.com/ar/",
    domain: "avneum.com",
    logo: "/proposal/clients/avneum.png",
    shot: "/proposal/shots/avneum.jpg",
    /* متوسط إضاءة الشعار 182/255 — يختفي على خلفية فاتحة */
    logoOnDark: true,
  },
  {
    key: "roseparfume",
    name: "روز العطور",
    note: "عطور عالمية ونيش",
    url: "https://roseparfume.com/",
    domain: "roseparfume.com",
    logo: "/proposal/clients/roseparfume.png",
    shot: "/proposal/shots/roseparfume.jpg",
    /* متوسط إضاءة الشعار 225/255 — يختفي على خلفية فاتحة */
    logoOnDark: true,
  },
  {
    key: "khayala",
    name: "خياله",
    note: "عطورات وتجميل",
    url: "https://khayala-sa.com/",
    domain: "khayala-sa.com",
    logo: "/proposal/clients/khayala.png",
    shot: "/proposal/shots/khayala.jpg",
  },
  {
    key: "heather",
    name: "مجمع هيذر",
    note: "بوتيك — الرياض",
    url: "https://heather-roses.com/",
    domain: "heather-roses.com",
    logo: "/proposal/logofolio/heather.jpg",
    shot: null,
    logoOnDark: true,
  },
  {
    key: "hameesabaya",
    name: "hameesabaya.com",
    note: null,
    url: "https://hameesabaya.com/",
    domain: "hameesabaya.com",
    logo: null,
    shot: null,
  },
  {
    key: "ivaraline",
    name: "IVARA LINE",
    note: "عبايات",
    url: "https://ivaraline.com/",
    domain: "ivaraline.com",
    logo: "/proposal/clients/ivaraline.png",
    shot: "/proposal/shots/ivaraline.jpg",
  },
  {
    key: "serdababaya",
    name: "سرداب",
    note: "عبايات",
    url: "https://serdababaya.com/",
    domain: "serdababaya.com",
    logo: "/proposal/clients/serdababaya.png",
    shot: "/proposal/shots/serdababaya.jpg",
  },
  {
    key: "madakaest",
    name: "Saboreo",
    note: "أكواب كورن فليكس جاهزة",
    url: "https://madakaest.com/",
    domain: "madakaest.com",
    logo: "/proposal/clients/madakaest.png",
    shot: "/proposal/shots/madakaest.jpg",
  },
  {
    key: "almunawara",
    name: "متجر المنورة الإلكتروني",
    note: "المدينة المنورة",
    url: "https://almunawara.sa/",
    domain: "almunawara.sa",
    logo: "/proposal/clients/almunawara.png",
    shot: null,
  },
  {
    key: "aljamaalalraqi",
    name: "JR LINE — الجمال الراقي",
    note: "عبايات",
    url: "https://aljamaalalraqi-sa.com/ar/",
    domain: "aljamaalalraqi-sa.com",
    logo: "/proposal/clients/aljamaalalraqi.png",
    shot: "/proposal/shots/aljamaalalraqi.jpg",
  },
  {
    key: "haraer",
    name: "حرائر",
    note: "عبايات",
    url: "https://haraer.com/ar/",
    domain: "haraer.com",
    logo: "/proposal/clients/haraer.png",
    shot: "/proposal/shots/haraer.jpg",
  },
  {
    key: "ossagi",
    name: "اوساجي — OSSAGI",
    note: null,
    url: "https://ossagi-sa.com/",
    domain: "ossagi-sa.com",
    logo: "/proposal/clients/ossagi.png",
    shot: "/proposal/shots/ossagi.jpg",
    /* متوسط إضاءة الشعار 221/255 — يختفي على خلفية فاتحة */
    logoOnDark: true,
  },
  {
    key: "essence",
    name: "إيسنس",
    note: "أدوات قهوة وأكثر",
    url: "https://essence-ksa.com/ar/",
    domain: "essence-ksa.com",
    logo: "/proposal/clients/essence.webp",
    shot: "/proposal/shots/essence.jpg",
  },
  {
    key: "tooz",
    name: "محمصة توز",
    note: "قهوة مختصة",
    url: "https://toozstore.com/",
    domain: "toozstore.com",
    logo: "/proposal/clients/tooz.png",
    shot: "/proposal/shots/tooz.jpg",
  },
  {
    key: "lelast",
    name: "ليلاس للعطور",
    note: "عطور",
    url: "https://lelast.com/ar/",
    domain: "lelast.com",
    logo: "/proposal/clients/lelast.png",
    shot: "/proposal/shots/lelast.jpg",
  },
  {
    key: "jilanoud",
    name: "جيلان العود والعطور",
    note: "عود وعطور",
    url: "https://jilanoud.com/",
    domain: "jilanoud.com",
    logo: "/proposal/clients/jilanoud.png",
    shot: "/proposal/shots/jilanoud.jpg",
  },
  {
    key: "oud1scent",
    name: "Oud Scent",
    note: "عود وعطور",
    url: "https://oud1scent.com/",
    domain: "oud1scent.com",
    logo: "/proposal/clients/oud1scent.png",
    shot: "/proposal/shots/oud1scent.jpg",
    /* متوسط إضاءة الشعار 202/255 — يختفي على خلفية فاتحة */
    logoOnDark: true,
  },
  {
    key: "halahome",
    name: "حلا هوم — HALA HOME",
    note: null,
    url: "https://hala-home.com/",
    domain: "hala-home.com",
    logo: "/proposal/clients/halahome.png",
    shot: "/proposal/shots/halahome.jpg",
    /* متوسط إضاءة الشعار 177/255 — يختفي على خلفية فاتحة */
    logoOnDark: true,
  },
  {
    key: "gaadlegal",
    name: "gaadlegal.com",
    note: null,
    url: "https://gaadlegal.com/",
    domain: "gaadlegal.com",
    logo: null,
    shot: null,
  },
  /* TF1ONE يُعرض في قسم Case Study مستقل — يُستثنى من شبكة الأعمال */
  {
    key: "tf1one",
    name: "TF1ONE",
    note: "منصة سعودية متخصصة في الوظائف والتوظيف",
    url: "https://www.tf1one.com/",
    domain: "tf1one.com",
    logo: "/proposal/clients/tf1one.png",
    shot: "/proposal/shots/tf1one.jpg",
  },
];

/* ── شعارات علامات عملنا معها — من صفحة LOGOFOLIO في ملف الأعمال المرفق ── */
export const LOGOFOLIO = [
  { key: "heather", label: "مجمع هيذر", src: "/proposal/logofolio/heather.jpg" },
  { key: "mojah", label: "موجة للتسويق", src: "/proposal/logofolio/mojah.jpg" },
  { key: "soyo", label: "سويو", src: "/proposal/logofolio/soyo.jpg" },
  { key: "alama", label: "علامة", src: "/proposal/logofolio/alama.jpg" },
  { key: "elatar", label: "العطار للعطور", src: "/proposal/logofolio/elatar.jpg" },
  { key: "recare", label: "RECARE", src: "/proposal/logofolio/recare.jpg" },
  { key: "rakayiz", label: "ركائز الابتكار", src: "/proposal/logofolio/rakayiz.jpg" },
  { key: "saqya", label: "جمعية سقيا الماء", src: "/proposal/logofolio/saqya.jpg" },
];

/* ── أرقام حملات فعلية — صفحة «نتائج موثقة» في ملف العرض المرفق ── */
export const RESULTS = [
  {
    value: "343,938",
    label: "وصول في حملة توعية واحدة",
    meta: "الإمارات · تكلفة 2.19 AED لكل 1,000 وصول",
  },
  {
    value: "1,781",
    label: "محادثة مع عملاء جدد — حملة واحدة",
    meta: "الإمارات · تكلفة 5.18 AED للمحادثة",
  },
  { value: "7,657", label: "تفاعل على منشور واحد", meta: "تكلفة التفاعل 0.009$" },
  { value: "2,802", label: "نقرة لرفع مشاهدات يوتيوب", meta: "تكلفة النقرة 0.41 AED" },
  { value: "967", label: "نقرة — حملة ترافيك إنستغرام", meta: "تكلفة النقرة 0.56$" },
  { value: "810", label: "محادثة — عيادة أسنان دبي", meta: "تكلفة المحادثة 9.04 AED" },
];

/* ── نماذج تنفيذ موثّقة — صفحة «من محفظة الأعمال» في ملف العرض ── */
export const CASES = [
  {
    brand: "البتيت — الإمارات",
    sector: "تجميل وعناية · تجارة إلكترونية",
    service: "تصميم حملات سوشيال ميديا وإعداد مواد إعلانية موسمية.",
    done: "حملة رمضان بخصم 50% — تصاميم متعددة لمنتجات متنوعة عبر Meta وتحقيق وصول واسع.",
  },
  {
    brand: "عطور ميست — السعودية",
    sector: "عطور فاخرة · تجارة إلكترونية",
    service: "حملات إعلانية لمنتج Mystic Wood مع محتوى تسويقي على المنصات.",
    done: "سلسلة إعلانية بثلاثة توجهات مختلفة — سعر، تجربة، وشخصية العطر لاستهداف شرائح متعددة.",
  },
  {
    brand: "مجمع هيذر — الرياض",
    sector: "بوتيك وهدايا · متجر سلة",
    service: "إدارة هوية المتجر وتصميم لإطلاق قسم شوكولاتة كلوفر الجديد.",
    done: "بانرات المتجر، حملة إطلاق CLOVER، وإعلانات خصومات العروض الموسمية.",
  },
  {
    brand: "جراتا للملابس",
    sector: "ملابس شبابية · متجر سلة",
    service: "تصميم حملات موسم الشتاء للهوديات مع محتوى يعكس هوية العلامة الشبابية.",
    done: "5+ تصاميم حملة إعلانية لمجموعة هوديات بخصومات تصل 30% — نتج عنها مبيعات فعلية موثقة.",
  },
];

/* ── صفحات فعلية من ملف الأعمال المرفق، مُحوّلة إلى صور ── */
export const WORK_GALLERY = [
  { src: "/proposal/work/work-05.jpg", label: "إنفوجرافيك" },
  { src: "/proposal/work/work-07.jpg", label: "محتوى منصات" },
  { src: "/proposal/work/work-09.jpg", label: "محتوى منصات" },
  { src: "/proposal/work/work-11.jpg", label: "محتوى منصات" },
  { src: "/proposal/work/work-13.jpg", label: "محتوى منصات" },
  { src: "/proposal/work/work-14.jpg", label: "بانرات" },
  { src: "/proposal/work/work-16.jpg", label: "بانرات" },
  { src: "/proposal/work/work-17.jpg", label: "رول أب" },
  { src: "/proposal/work/work-18.jpg", label: "حملات إعلانية" },
  { src: "/proposal/work/work-19.jpg", label: "حملات إعلانية" },
  { src: "/proposal/work/work-20.jpg", label: "حملات إعلانية" },
  { src: "/proposal/work/work-21.jpg", label: "تصميم كتيبات" },
];

/* ── مستندات العرض — ملفات PDF حقيقية داخل /public/proposal/docs ── */
export const DOCUMENTS = [
  {
    key: "proposal",
    title: "عرض الخدمات والأسعار 2026",
    desc: "الملف الكامل: نطاق تشغيل المتجر، خطة التسويق، هيكل الفريق، الباقات وتفاصيل الأسعار.",
    file: "/proposal/docs/soliman-business-proposal-2026.pdf",
    download: "Soliman-Business-Proposal-2026.pdf",
    preview: "/proposal/docs/proposal-cover.jpg",
    kind: "PDF",
    pages: 17,
  },
  {
    key: "portfolio",
    title: "ملف الأعمال — Portfolio",
    desc: "نماذج تصميم فعلية: شعارات، إنفوجرافيك، محتوى منصات، بانرات، وحملات إعلانية.",
    file: "/proposal/docs/soliman-portfolio.pdf",
    download: "Soliman-Portfolio.pdf",
    preview: "/proposal/docs/portfolio-cover.jpg",
    kind: "PDF",
    pages: 22,
  },
];

export const CONTACT = {
  whatsapp: "+201007835547",
  whatsappLabel: "+20 100 783 5547",
  email: "mansoorsoliman77@gmail.com",
  market: "السعودية · الخليج",
};
