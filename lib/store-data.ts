/* ═══════════════════════════════════════════════════════════════════════════
   STORE PRODUCTS DATA — متجر الخدمات الرقمية
   أسعار أقل من متوسط السوق السعودي مع تسليمات موثقة لكل خدمة.
   originalPrice = متوسط سعر السوق (المرساة السعرية) — price = سعرنا الفعلي.
═══════════════════════════════════════════════════════════════════════════ */

export type ProductCategory =
  | "store"
  | "integrations"
  | "marketing"
  | "development";

export type BadgeType =
  | "bestseller"
  | "new"
  | "sale"
  | "limited"
  | "featured"
  | "monthly";

export interface Product {
  id: string;
  slug: string;
  category: ProductCategory;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  shortDescAr: string;
  shortDescEn: string;
  keywordsAr?: string[];
  keywordsEn?: string[];
  price: number;
  originalPrice: number;
  currency: "SAR" | "USD";
  isMonthly?: boolean;
  badge?: BadgeType;
  badgeLabelAr?: string;
  badgeLabelEn?: string;
  image?: string;
  gallery?: string[];
  features: { ar: string; en: string }[];
  deliveryDays: number;
  /* No `rating` / `reviewCount`. There is no review system behind this store,
     so every value either field could hold would be invented — and inventing
     them is exactly what this site's own SEO article tells merchants never to
     do (lib/blog/c8-seo.ts). They also fed an AggregateRating into the Product
     schema, which is a Google structured-data policy violation that can cost
     the whole domain its rich results. If real, verifiable reviews are ever
     collected, add both fields back together with the markup. */
  monthlyOrders: number;
  views: number;
  popular?: boolean;
  inStock: boolean;
  order: number;
}

export interface CategoryItem {
  key: string;
  labelAr: string;
  labelEn: string;
  icon: string;
}

/* ─── Categories ───────────────────────────────────────────────────────────── */
export const CATEGORIES: { key: string; labelAr: string; labelEn: string; icon: string }[] = [
  { key: "all", labelAr: "جميع الخدمات", labelEn: "All Services", icon: "◈" },
  { key: "store", labelAr: "المتاجر الإلكترونية", labelEn: "E-commerce Stores", icon: "🛒" },
  { key: "integrations", labelAr: "الربط والأتمتة", labelEn: "Integrations & Automation", icon: "🔗" },
  { key: "marketing", labelAr: "التسويق والسيو", labelEn: "Marketing & SEO", icon: "📈" },
  { key: "development", labelAr: "البرمجة والتطوير", labelEn: "Web Development", icon: "💻" },
];

/* ─── Badge Styles — الهوية الصفراء/السوداء ───────────────────────────────── */
export const BADGE_STYLES: Record<BadgeType, { bg: string; border: string; color: string }> = {
  bestseller: { bg: "rgba(240,177,0,0.14)", border: "rgba(240,177,0,0.45)", color: "#8A6D00" },
  new: { bg: "rgba(43,108,176,0.10)", border: "rgba(43,108,176,0.35)", color: "#2B6CB0" },
  sale: { bg: "rgba(214,69,69,0.10)", border: "rgba(214,69,69,0.35)", color: "#D64545" },
  limited: { bg: "rgba(17,17,17,0.06)", border: "rgba(17,17,17,0.25)", color: "#111111" },
  featured: { bg: "rgba(240,177,0,0.14)", border: "rgba(240,177,0,0.45)", color: "#8A6D00" },
  monthly: { bg: "rgba(47,133,90,0.10)", border: "rgba(47,133,90,0.35)", color: "#2F855A" },
};

/* ─── Products Database ────────────────────────────────────────────────────── */
export const PRODUCTS: Product[] = [
  /* ═══ 1 — تجهيز متجر سلة كامل ═══ */
  {
    id: "salla-store-full",
    slug: "salla-store-setup",
    category: "store",
    nameAr: "تجهيز متجر سلة كامل من الصفر",
    nameEn: "Complete Salla Store Setup",
    shortDescAr: "متجر جاهز للبيع خلال 7 أيام — تصميم + منتجات + دفع + شحن",
    shortDescEn: "A ready-to-sell store in 7 days — design, products, payments & shipping",
    descriptionAr: `متجر سلة متكامل جاهز لاستقبال أول طلب خلال 7 أيام. الباقة مفصّلة بالكامل أدناه — لا بند مؤجَّل للمكالمة.

ماذا ستستلم بالضبط؟
1. متجر سلة مفعّل باسم علامتك مع ربط نطاقك الخاص.
2. تصميم واجهة يبدأ من الجوال، وحتى 6 بنرات احترافية للصفحة الرئيسية.
3. بناء التصنيفات والأقسام وترتيب الكتالوج بحيث يصل العميل للمنتج في نقرتين.
4. رفع وتنسيق حتى 30 منتجاً بصور مرتبة ووصف تسويقي مهيأ لمحركات البحث.
5. تفعيل الدفع: مدى، فيزا، Apple Pay، التحويل البنكي، والتقسيط عبر تابي وتمارا.
6. ربط شركات الشحن ومناطق التوصيل والأسعار وبوالص الشحن وتتبع الطلب للعميل.
7. ضبط ضريبة القيمة المضافة والفوترة الإلكترونية بما يوافق متطلبات هيئة الزكاة والضريبة والجمارك.
8. تركيب بكسل سناب شات وتيك توك وميتا، وربط Google Analytics 4 وSearch Console.
9. تهيئة السيو قبل الإطلاق: العناوين والوصف والنص البديل للصور وخريطة الموقع.
10. صفحات السياسات (الاسترجاع، الشحن، الخصوصية) بصياغة متوافقة مع وزارة التجارة.
11. تفعيل أيقونة واتساب للتواصل المباشر من أي صفحة.
12. اختبار رحلة الشراء كاملة بعملية شراء حقيقية قبل التسليم.
13. جلسة تدريب مسجلة لإدارة متجرك بنفسك.

اشتراك منصة سلة يُدفع لسلة مباشرة وهو منفصل عن هذه الباقة.`,
    descriptionEn: `A complete Salla store ready to take its first order within 7 days. The full scope is itemised below — nothing is deferred to the call.

You get: a store live under your brand with your own domain connected; a mobile-first design with up to 6 professional homepage banners; categories and catalogue structured so any product is two clicks away; 30 products uploaded with ordered imagery and search-ready copy; mada, Visa, Apple Pay, bank transfer and BNPL via Tabby and Tamara enabled; carriers, delivery zones, shipping labels and order tracking configured; VAT and ZATCA e-invoicing set up; Snapchat, TikTok and Meta pixels installed with Google Analytics 4 and Search Console connected; SEO handled before launch — titles, descriptions, image alt text and sitemap; policy pages compliant with Ministry of Commerce requirements; a WhatsApp contact button; the full checkout tested with a real purchase; and a recorded training session so you can run the store yourself.

The Salla platform subscription is paid to Salla directly and is separate from this package.`,
    keywordsAr: [
      "تجهيز متجر سلة كامل",
      "إنشاء متجر سلة من الصفر",
      "تصميم متجر سلة احترافي",
      "فتح متجر الكتروني في السعودية",
      "تجهيز متجر سلة جاهز للبيع",
      "ربط بوابة دفع سلة",
      "أفضل شركة تجهيز متاجر سلة",
      "سعر تصميم متجر سلة",
      "متجر سلة رخيص واحترافي",
    ],
    keywordsEn: ["Salla store setup", "complete Salla store", "e-commerce store Saudi Arabia", "Salla payment integration", "open online store KSA"],
    price: 1099,
    originalPrice: 4000,
    currency: "SAR",
    badge: "bestseller",
    badgeLabelAr: "الأكثر طلباً",
    badgeLabelEn: "Bestseller",
    features: [
      { ar: "متجر مفعّل على نطاقك الخاص مع ربط الدومين", en: "Store live on your own domain, DNS connected" },
      { ar: "تصميم متوافق مع الجوال أولاً", en: "Mobile-first design" },
      { ar: "حتى 6 بنرات احترافية للرئيسية", en: "Up to 6 professional homepage banners" },
      { ar: "بناء التصنيفات والأقسام وترتيب الكتالوج", en: "Categories, sections and catalogue structure" },
      { ar: "رفع 30 منتجاً بوصف تسويقي وصور مرتبة", en: "30 products uploaded with marketing copy and ordered imagery" },
      { ar: "تفعيل مدى وApple Pay وفيزا والتحويل البنكي", en: "mada, Apple Pay, Visa and bank transfer enabled" },
      { ar: "تفعيل التقسيط: تابي وتمارا", en: "BNPL enabled: Tabby and Tamara" },
      { ar: "ربط شركات الشحن ومناطق التوصيل وبوالص الشحن", en: "Carriers, delivery zones and shipping labels" },
      { ar: "ضبط ضريبة القيمة المضافة والفوترة الإلكترونية", en: "VAT and ZATCA e-invoicing configured" },
      { ar: "تركيب بكسل سناب شات وتيك توك وميتا", en: "Snapchat, TikTok and Meta pixels installed" },
      { ar: "ربط Google Analytics 4 وSearch Console", en: "Google Analytics 4 and Search Console connected" },
      { ar: "تهيئة سيو: العناوين والوصف وalt للصور وخريطة الموقع", en: "SEO: titles, descriptions, image alt text and sitemap" },
      { ar: "صفحات سياسات متوافقة نظامياً", en: "Compliant policy pages" },
      { ar: "تفعيل أيقونة واتساب للتواصل المباشر", en: "WhatsApp contact button enabled" },
      { ar: "اختبار رحلة شراء كاملة بعملية حقيقية", en: "Full checkout tested with a real transaction" },
      { ar: "تدريب مسجّل على إدارة المتجر", en: "Recorded store-management training" },
    ],
    deliveryDays: 7,
    monthlyOrders: 27,
    views: 2140,
    popular: true,
    inStock: true,
    order: 1,
  },

  /* ═══ 2 — ثيم سلة مخصص ═══ */
  {
    id: "salla-theme-custom",
    slug: "salla-custom-theme",
    category: "store",
    nameAr: "تصميم ثيم سلة خاص بعلامتك",
    nameEn: "Custom Salla Theme Design",
    shortDescAr: "ثيم فريد يميزك عن آلاف المتاجر المتشابهة ويرفع معدل التحويل",
    shortDescEn: "A unique theme that separates you from thousands of identical stores",
    descriptionAr: `أكثر من 60,000 متجر سلة يستخدمون نفس الثيمات الجاهزة — العميل لا يفرّق بينك وبين منافسك. الثيم المخصص هو أول ما يبني الثقة ويرفع التحويل.

ماذا ستستلم بالضبط؟
1. تصميم صفحة رئيسية مخصصة بالكامل تعكس هوية علامتك (ألوان، خطوط، أسلوب).
2. صفحة منتج محسّنة للتحويل: صور أكبر، أزرار أوضح، عناصر ثقة (تقييمات، ضمان، شحن).
3. تخصيص صفحة السلة والدفع لتقليل معدل هجر السلة.
4. تحسين سرعة التحميل — كل ثانية تأخير تخسرك 7% من التحويلات.
5. توافق كامل مع الجوال واختبار على iOS وAndroid.
6. تعديلات CSS/JS نظيفة لا تتأثر بتحديثات سلة.
7. مراجعتان مجانيتان بعد التسليم.

متوسط السوق لنفس الخدمة 1,500+ ر.س — سعرنا 399 ر.س لأننا نعمل بنظام مكتبة مكونات جاهزة نخصصها لك بدل البناء من الصفر.`,
    descriptionEn: `60,000+ Salla stores use the same ready-made themes — customers can't tell you apart from competitors. A custom theme builds instant trust and lifts conversion.

You get: a fully custom homepage matching your brand, a conversion-optimized product page (bigger imagery, clearer CTAs, trust elements), customized cart/checkout to cut abandonment, speed optimization, full mobile compatibility tested on iOS and Android, clean CSS/JS that survives Salla updates, and two free revision rounds.`,
    keywordsAr: [
      "تصميم ثيم سلة",
      "ثيم سلة مخصص",
      "تعديل ثيم سلة",
      "تخصيص متجر سلة",
      "تعديلات CSS سلة",
      "تحسين معدل التحويل سلة",
      "أفضل ثيم سلة",
      "تصميم متجر سلة يزيد المبيعات",
    ],
    keywordsEn: ["custom Salla theme", "Salla theme design", "Salla CSS customization", "conversion rate optimization Salla"],
    price: 399,
    originalPrice: 1500,
    currency: "SAR",
    badge: "sale",
    badgeLabelAr: "أقل من السوق 70%",
    badgeLabelEn: "70% Below Market",
    features: [
      { ar: "صفحة رئيسية مخصصة بالكامل بهوية علامتك", en: "Fully custom homepage in your brand" },
      { ar: "صفحة منتج محسّنة للتحويل", en: "Conversion-optimized product page" },
      { ar: "تخصيص السلة وصفحة الدفع لتقليل هجر السلة", en: "Custom cart and checkout to cut abandonment" },
      { ar: "بنرات وأقسام رئيسية بتنسيق مخصص", en: "Custom-styled banners and homepage sections" },
      { ar: "تأثيرات CSS متحركة خفيفة لا تبطئ المتجر", en: "Light CSS motion that does not slow the store" },
      { ar: "تحسين سرعة التحميل", en: "Speed optimization" },
      { ar: "اختبار على iOS وAndroid", en: "Tested on iOS and Android" },
      { ar: "كود نظيف يتحمل تحديثات سلة", en: "Update-safe clean code" },
      { ar: "مراجعتان مجانيتان بعد التسليم", en: "Two free revision rounds after handover" },
    ],
    deliveryDays: 5,
    monthlyOrders: 23,
    views: 1320,
    popular: true,
    inStock: true,
    order: 2,
  },

  /* ═══ 3 — سيو المتاجر ═══ */
  {
    id: "seo-store-optimization",
    slug: "store-seo",
    category: "marketing",
    nameAr: "تحسين محركات البحث SEO للمتاجر",
    nameEn: "E-commerce SEO Optimization",
    shortDescAr: "زيارات مجانية من جوجل بدل ما تدفع لكل نقرة إعلان",
    shortDescEn: "Free Google traffic instead of paying for every ad click",
    descriptionAr: `الإعلانات تتوقف لحظة ما توقف الدفع — السيو أصل يبني لك زيارات مجانية تتراكم شهراً بعد شهر. المتاجر التي تتصدر جوجل تحصل على 33% من نقرات البحث.

ماذا ستستلم بالضبط؟
1. فحص فني شامل لمتجرك (سرعة، فهرسة، أخطاء زحف، روابط مكسورة) مع تقرير مفصل.
2. بحث كلمات مفتاحية للسوق السعودي: نستخرج الكلمات التي يبحث بها عملاؤك فعلاً وحجم بحثها.
3. تحسين 20 صفحة منتج/تصنيف: عناوين Meta، أوصاف، هيكلة H1-H3، نصوص بديلة للصور.
4. إعداد Schema (بيانات منظمة) للمنتجات لتظهر أسعارك وتقييماتك في نتائج جوجل مباشرة.
5. ربط وإعداد Google Search Console وGoogle Analytics 4.
6. خطة محتوى SEO لثلاثة أشهر قادمة جاهزة للتنفيذ.
7. تقرير قبل/بعد يوضح تحسن الترتيب.

متوسط السوق 2,500+ ر.س — سعرنا 699 ر.س.`,
    descriptionEn: `Ads stop the moment you stop paying — SEO compounds month after month. Top-ranking stores capture 33% of search clicks.

You get: a full technical audit (speed, indexing, crawl errors, broken links), Saudi-market keyword research with real search volumes, on-page optimization for 20 product/category pages (meta titles, descriptions, heading structure, alt texts), Product Schema so prices and ratings show in Google results, Search Console + GA4 setup, a 3-month SEO content plan, and a before/after ranking report.`,
    keywordsAr: [
      "سيو متجر الكتروني",
      "تحسين محركات البحث للمتاجر",
      "سيو سلة",
      "سيو زد",
      "تصدر نتائج جوجل السعودية",
      "خبير سيو سعودي",
      "زيادة زيارات المتجر",
      "تحسين ظهور المتجر في جوجل",
      "شركة سيو في السعودية",
    ],
    keywordsEn: ["ecommerce SEO Saudi Arabia", "Salla SEO", "store SEO optimization", "rank on Google KSA", "SEO expert Saudi"],
    price: 699,
    originalPrice: 2500,
    currency: "SAR",
    badge: "featured",
    badgeLabelAr: "استثمار طويل المدى",
    badgeLabelEn: "Long-term Asset",
    features: [
      { ar: "فحص تقني كامل مع تقرير أولويات", en: "Full technical audit with a prioritised report" },
      { ar: "بحث كلمات مفتاحية للسوق السعودي", en: "Keyword research for the Saudi market" },
      { ar: "تحسين 20 صفحة منتج/تصنيف", en: "20 product and category pages optimized" },
      { ar: "عناوين ووصف ميتا مكتوبة لكل صفحة", en: "Meta titles and descriptions written per page" },
      { ar: "نص بديل alt لصور المنتجات", en: "Alt text for product imagery" },
      { ar: "Schema المنتجات وخريطة الموقع", en: "Product schema and sitemap" },
      { ar: "ربط Search Console وGA4", en: "Search Console and GA4 connected" },
      { ar: "خطة محتوى 3 أشهر", en: "Three-month content plan" },
      { ar: "تقرير قبل/بعد للترتيب", en: "Before/after ranking report" },
    ],
    deliveryDays: 10,
    monthlyOrders: 17,
    views: 1560,
    popular: true,
    inStock: true,
    order: 3,
  },

  /* ═══ 4 — تصوير منتجات AI ═══ */
  {
    id: "ai-product-photography",
    slug: "ai-product-photography",
    category: "marketing",
    nameAr: "تصوير منتجات بالذكاء الاصطناعي",
    nameEn: "AI Product Photography",
    shortDescAr: "صور استوديو إعلانية لمنتجاتك بدون استوديو — 10 صور خلال 48 ساعة",
    shortDescEn: "Ad-grade studio shots without a studio — 10 images in 48 hours",
    descriptionAr: `جلسة تصوير تقليدية تكلفك 1,500+ ر.س وتأخذ أسبوعين بين الحجز والتعديل. نصور منتجاتك بالذكاء الاصطناعي بجودة إعلانية خلال 48 ساعة فقط.

ماذا ستستلم بالضبط؟
1. عشر صور نهائية عالية الدقة (مناسبة للمتجر، الإعلانات، والسوشيال ميديا).
2. خلفيات وإضاءات احترافية متنوعة: استوديو نظيف، لايف ستايل، خلفيات فاخرة تناسب منتجك.
3. نسختان من كل صورة: مربعة للسوشيال وعمودية للستوري والإعلانات.
4. صور متوافقة مع متطلبات إعلانات سناب وتيك توك وميتا.
5. تعديلان مجانيان على أي صورة لا تعجبك.

كل ما نحتاجه منك: صور عادية للمنتج بجوالك من زوايا مختلفة — والباقي علينا.`,
    descriptionEn: `A traditional photo shoot costs 1,500+ SAR and takes two weeks. We shoot your products with AI at advertising quality within 48 hours.

You get: 10 final high-resolution images (store, ads, social), varied professional backgrounds and lighting (clean studio, lifestyle, premium sets), two crops of every image (square for feed, vertical for stories/ads), files compliant with Snap, TikTok and Meta ad specs, and two free revisions. All we need: simple phone photos of your product from different angles.`,
    keywordsAr: [
      "تصوير منتجات بالذكاء الاصطناعي",
      "تصوير منتجات احترافي",
      "صور منتجات للمتجر الالكتروني",
      "تصوير منتجات بدون استوديو",
      "صور اعلانية للمنتجات",
      "تصوير منتجات سلة",
      "تصوير منتجات رخيص",
    ],
    keywordsEn: ["AI product photography", "product photos ecommerce", "studio-quality product images", "AI photography Saudi"],
    price: 249,
    originalPrice: 1500,
    currency: "SAR",
    badge: "new",
    badgeLabelAr: "خلال 48 ساعة",
    badgeLabelEn: "48-Hour Delivery",
    features: [
      { ar: "10 صور نهائية عالية الدقة", en: "10 high-res final images" },
      { ar: "خلفيات استوديو ولايف ستايل", en: "Studio & lifestyle backgrounds" },
      { ar: "نسخ مربعة وعمودية لكل صورة", en: "Square + vertical crops" },
      { ar: "متوافقة مع إعلانات سناب وتيك توك", en: "Snap & TikTok ad-ready" },
      { ar: "تعديلان مجانيان", en: "Two free revisions" },
    ],
    deliveryDays: 2,
    monthlyOrders: 31,
    views: 1890,
    popular: true,
    inStock: true,
    order: 4,
  },

  /* ═══ 5 — هوية بصرية ═══ */
  {
    id: "brand-identity",
    slug: "brand-identity-design",
    category: "marketing",
    nameAr: "هوية بصرية متكاملة",
    nameEn: "Complete Brand Identity",
    shortDescAr: "شعار + ألوان + خطوط + دليل استخدام — علامة يثق بها العميل من أول نظرة",
    shortDescEn: "Logo, colors, typography & brand guide — trusted at first glance",
    descriptionAr: `العميل يحكم على متجرك خلال 3 ثوانٍ من أول زيارة. الهوية المتناسقة ترفع إدراك القيمة وتسمح لك بالتسعير الأعلى.

ماذا ستستلم بالضبط؟
1. ثلاثة مقترحات شعار مختلفة الاتجاه، وتطوير المقترح المختار حتى الرضا الكامل.
2. لوحة ألوان أساسية وثانوية بأكوادها الجاهزة للويب والطباعة.
3. اختيار خطوط عربية وإنجليزية مرخصة تناسب شخصية علامتك.
4. دليل هوية PDF (Brand Guide) يضمن ثبات الشكل في كل تصاميمك القادمة.
5. ملفات الشعار بكل الصيغ: AI, SVG, PNG شفاف، ونسخ للسوشيال ميديا.
6. تطبيقات جاهزة: غلاف حسابات السوشيال، قالب ستوري، بطاقة عمل.

متوسط السوق 3,000+ ر.س — سعرنا 799 ر.س بنفس جودة المخرجات.`,
    descriptionEn: `Customers judge your store within 3 seconds. A consistent identity raises perceived value and lets you charge premium prices.

You get: three distinct logo concepts with unlimited refinement of the chosen one, primary/secondary color palettes with web and print codes, licensed Arabic + English font pairing, a PDF brand guide, logo files in every format (AI, SVG, transparent PNG, social versions), plus ready applications: social covers, a story template, and a business card.`,
    keywordsAr: [
      "تصميم هوية بصرية",
      "تصميم شعار احترافي",
      "هوية تجارية متكاملة",
      "تصميم لوجو سعودي",
      "دليل هوية بصرية",
      "تصميم هوية متجر الكتروني",
      "أسعار تصميم الهوية البصرية",
    ],
    keywordsEn: ["brand identity design", "professional logo design", "brand guidelines", "visual identity Saudi Arabia"],
    price: 799,
    originalPrice: 3000,
    currency: "SAR",
    badge: "featured",
    badgeLabelAr: "قيمة استثنائية",
    badgeLabelEn: "Exceptional Value",
    features: [
      { ar: "3 مقترحات شعار + تطوير غير محدود", en: "3 logo concepts, unlimited refinement" },
      { ar: "لوحة ألوان للويب والطباعة", en: "Web & print color palettes" },
      { ar: "خطوط عربية وإنجليزية مرخصة", en: "Licensed AR/EN fonts" },
      { ar: "دليل هوية PDF كامل", en: "Full PDF brand guide" },
      { ar: "ملفات بكل الصيغ AI/SVG/PNG", en: "All file formats" },
      { ar: "قوالب سوشيال وبطاقة عمل", en: "Social templates + business card" },
    ],
    deliveryDays: 6,
    monthlyOrders: 14,
    views: 1240,
    inStock: true,
    order: 5,
  },

  /* ═══ 6 — التسويق الإلكتروني الشامل ═══ */
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    category: "marketing",
    nameAr: "إدارة التسويق الإلكتروني الشاملة",
    nameEn: "Full Digital Marketing Management",
    shortDescAr: "حملات ميتا وتيك توك وسناب بإدارة كاملة وتقارير أسبوعية",
    shortDescEn: "Meta, TikTok & Snapchat campaigns fully managed with weekly reports",
    descriptionAr: `أغلب الميزانيات الإعلانية تُهدر بسبب استهداف خاطئ وإعلانات لا تُختبر. نحن ندير حملاتك بمنهجية اختبار مستمر: نجرب، نقيس، نوقف الخاسر ونضاعف الرابح.

ماذا ستستلم شهرياً؟
1. استراتيجية شهرية مبنية على بيانات متجرك وسلوك جمهورك.
2. إدارة كاملة للحملات على منصتين من اختيارك (ميتا، تيك توك، سناب).
3. ثمانية تصاميم إعلانية شهرياً (صور + فيديو قصير) بنصوص بيعية مختبرة.
4. إعداد وتتبع التحويلات (Pixel + Conversion API) لقياس المبيعات الفعلية.
5. اختبار A/B مستمر للجمهور والتصاميم والعروض.
6. تقرير أسبوعي واضح: كم صرفنا، كم بعنا، وما هي الخطوة القادمة.
7. اجتماع شهري لمراجعة الأداء والخطة.

ملاحظة: الميزانية الإعلانية تُدفع للمنصات مباشرة من حسابك — رسومنا للإدارة فقط. متوسط السوق 3,000+ ر.س شهرياً.`,
    descriptionEn: `Most ad budgets are wasted on wrong targeting and untested creatives. We manage your campaigns with a continuous testing methodology: test, measure, kill losers, scale winners.

Monthly you get: a data-driven strategy, full campaign management on two platforms of your choice (Meta, TikTok, Snapchat), 8 ad creatives (statics + short video) with tested sales copy, conversion tracking setup (Pixel + Conversion API), continuous A/B testing, a clear weekly report (spend, sales, next steps), and a monthly performance review call. Ad budget is paid directly to platforms from your own account — our fee covers management only.`,
    keywordsAr: [
      "إدارة حملات إعلانية",
      "إعلانات تيك توك السعودية",
      "إعلانات سناب شات",
      "إعلانات ميتا انستقرام",
      "وكالة تسويق رقمي سعودية",
      "إدارة إعلانات المتاجر",
      "أفضل شركة تسويق الكتروني",
      "زيادة مبيعات المتجر الالكتروني",
    ],
    keywordsEn: ["digital marketing management", "TikTok ads Saudi", "Snapchat ads KSA", "Meta ads ecommerce", "performance marketing agency"],
    price: 999,
    originalPrice: 3000,
    currency: "SAR",
    isMonthly: true,
    badge: "monthly",
    badgeLabelAr: "اشتراك شهري",
    badgeLabelEn: "Monthly",
    features: [
      { ar: "إدارة كاملة لمنصتين إعلانيتين", en: "Full management of 2 platforms" },
      { ar: "8 تصاميم إعلانية شهرياً", en: "8 monthly ad creatives" },
      { ar: "تتبع تحويلات Pixel + API", en: "Pixel + Conversion API tracking" },
      { ar: "اختبار A/B مستمر", en: "Continuous A/B testing" },
      { ar: "تقرير أسبوعي بالأرقام", en: "Weekly numbers report" },
      { ar: "اجتماع مراجعة شهري", en: "Monthly review call" },
    ],
    deliveryDays: 30,
    monthlyOrders: 21,
    views: 1600,
    inStock: true,
    order: 6,
  },

  /* ═══ 7 — إدارة سوشيال ميديا ═══ */
  {
    id: "social-media-management",
    slug: "social-media-management",
    category: "marketing",
    nameAr: "إدارة حسابات السوشيال ميديا",
    nameEn: "Social Media Management",
    shortDescAr: "محتوى يومي احترافي يبني الثقة ويحوّل المتابع إلى عميل",
    shortDescEn: "Daily professional content that turns followers into customers",
    descriptionAr: `الحساب المهمل يقتل الثقة: أول ما يفعله العميل قبل الشراء هو فتح حسابك. النشاط المستمر بمحتوى احترافي = ثقة = مبيعات.

ماذا ستستلم شهرياً؟
1. عشرون تصميم منشور احترافي متوافق مع هويتك البصرية.
2. ثمانية ستوريز تفاعلية (استطلاعات، أسئلة، عروض).
3. أربعة فيديوهات ريلز قصيرة بمونتاج جذاب.
4. كتابة المحتوى والكابشن بأسلوب يناسب جمهورك السعودي.
5. جدولة ونشر تلقائي في أفضل أوقات التفاعل.
6. الرد على التعليقات والرسائل خلال ساعات العمل.
7. تقرير شهري: نمو المتابعين، التفاعل، وأفضل المنشورات أداءً.

منصتان من اختيارك (انستقرام، تيك توك، سناب، X). متوسط السوق 2,000+ ر.س شهرياً.`,
    descriptionEn: `A neglected account kills trust — checking your profile is the first thing customers do before buying.

Monthly you get: 20 branded post designs, 8 interactive stories, 4 edited Reels, Saudi-audience copywriting, scheduled publishing at peak engagement times, comment/DM responses during business hours, and a monthly growth report. Two platforms of your choice (Instagram, TikTok, Snapchat, X).`,
    keywordsAr: [
      "إدارة حسابات سوشيال ميديا",
      "إدارة انستقرام للمتاجر",
      "صناعة محتوى سعودي",
      "تصميم منشورات سوشيال ميديا",
      "إدارة تيك توك",
      "شركة إدارة سوشيال ميديا",
      "أسعار إدارة السوشيال ميديا",
    ],
    keywordsEn: ["social media management Saudi", "Instagram management", "content creation KSA", "TikTok management"],
    price: 749,
    originalPrice: 2000,
    currency: "SAR",
    isMonthly: true,
    badge: "monthly",
    badgeLabelAr: "شهري",
    badgeLabelEn: "Monthly",
    features: [
      { ar: "20 تصميم منشور شهرياً", en: "20 monthly post designs" },
      { ar: "8 ستوريز تفاعلية", en: "8 interactive stories" },
      { ar: "4 فيديوهات ريلز", en: "4 Reels videos" },
      { ar: "كتابة محتوى بلهجة جمهورك", en: "Audience-tuned copywriting" },
      { ar: "نشر تلقائي بأفضل الأوقات", en: "Peak-time scheduling" },
      { ar: "رد على التعليقات والرسائل", en: "Comments & DM handling" },
      { ar: "تقرير نمو شهري", en: "Monthly growth report" },
    ],
    deliveryDays: 30,
    monthlyOrders: 19,
    views: 1420,
    inStock: true,
    order: 7,
  },

  /* ═══ 8 — صفحة هبوط + فنل ═══ */
  {
    id: "landing-funnel",
    slug: "landing-page-funnel",
    category: "development",
    nameAr: "صفحة هبوط + فنل مبيعات",
    nameEn: "Landing Page + Sales Funnel",
    shortDescAr: "صفحة مصممة لهدف واحد: تحويل زائر الإعلان إلى مشترٍ",
    shortDescEn: "One goal: turn ad visitors into buyers",
    descriptionAr: `إرسال زوار الإعلانات إلى الصفحة الرئيسية يهدر 80% منهم. صفحة الهبوط المتخصصة ترفع التحويل 2-5 أضعاف لأنها مبنية لهدف واحد فقط.

ماذا ستستلم بالضبط؟
1. صفحة هبوط سريعة (تحميل أقل من ثانيتين) مصممة على منهجية AIDA البيعية.
2. كتابة نصوص بيعية (Copywriting) عربية مقنعة: عنوان، فوائد، إثبات اجتماعي، عرض، ونداء إجراء.
3. نموذج طلب/تواصل مربوط بواتساب أو بريدك مباشرة.
4. تركيب Pixel لمنصات الإعلان وGoogle Analytics لقياس كل زيارة.
5. متوافقة تماماً مع الجوال حيث تأتي أغلب نقرات الإعلانات.
6. نسخة ثانية بعنوان وعرض مختلف لاختبار A/B.

متوسط السوق 2,000+ ر.س — سعرنا 599 ر.س.`,
    descriptionEn: `Sending ad traffic to your homepage wastes 80% of it. A dedicated landing page lifts conversion 2-5x because it's built for one goal.

You get: a fast landing page (sub-2s load) built on the AIDA framework, persuasive Arabic sales copy (headline, benefits, social proof, offer, CTA), a lead form wired to WhatsApp or email, ad Pixels + Google Analytics installed, full mobile optimization, and a second variant for A/B testing.`,
    keywordsAr: [
      "تصميم صفحة هبوط",
      "صفحة هبوط احترافية",
      "بناء فنل مبيعات",
      "صفحة بيع منتج",
      "زيادة تحويلات الإعلانات",
      "تصميم landing page بالعربي",
    ],
    keywordsEn: ["landing page design", "sales funnel", "conversion landing page Arabic", "lead generation page"],
    price: 599,
    originalPrice: 2000,
    currency: "SAR",
    badge: "sale",
    badgeLabelAr: "يضاعف التحويل",
    badgeLabelEn: "Conversion Multiplier",
    features: [
      { ar: "تحميل أقل من ثانيتين", en: "Sub-2s load time" },
      { ar: "نصوص بيعية بمنهجية AIDA", en: "AIDA sales copywriting" },
      { ar: "نموذج مربوط بواتساب", en: "WhatsApp-wired lead form" },
      { ar: "Pixel + Google Analytics", en: "Pixels + Analytics installed" },
      { ar: "نسخة ثانية لاختبار A/B", en: "A/B test variant included" },
    ],
    deliveryDays: 4,
    monthlyOrders: 15,
    views: 980,
    inStock: true,
    order: 8,
  },

  /* ═══ 9 — تحليل المنافسين ═══ */
  {
    id: "store-products-analysis",
    slug: "store-products-analysis",
    category: "integrations",
    nameAr: "تحليل المنافسين والأسعار",
    nameEn: "Competitor & Pricing Analysis",
    shortDescAr: "اعرف أسعار منافسيك ومنتجاتهم الرابحة قبل ما تقرر",
    shortDescEn: "Know competitor prices and winning products before you decide",
    descriptionAr: `التسعير العشوائي يخسّرك مرتين: سعر مرتفع يطرد العملاء، وسعر منخفض يأكل ربحك. القرار الصحيح يبدأ من بيانات السوق الحقيقية.

ماذا ستستلم بالضبط؟
1. سحب بيانات منتجات حتى 5 متاجر منافسة (أسعار، تقييمات، عدد المراجعات).
2. جدول مقارنة أسعار تفصيلي منتجاً بمنتج مقابل منتجاتك.
3. تحديد المنتجات الأكثر مبيعاً لدى منافسيك (بناءً على المراجعات والظهور).
4. كشف فجوات السوق: منتجات مطلوبة لا يوفرها منافسوك.
5. توصيات تسعير عملية لكل فئة منتجات.
6. تقرير PDF نهائي + ملف Excel قابل للفرز والتحديث.

متوسط السوق 1,800+ ر.س — سعرنا 549 ر.س.`,
    descriptionEn: `Random pricing hurts twice: too high repels customers, too low eats margin. Good decisions start with real market data.

You get: product data pulled from up to 5 competitor stores (prices, ratings, review counts), a product-by-product price comparison against yours, identification of their best sellers, market-gap discovery (in-demand products they don't carry), actionable pricing recommendations per category, and a final PDF report + sortable Excel file.`,
    keywordsAr: [
      "تحليل المنافسين",
      "سحب منتجات المتاجر",
      "تحليل أسعار السوق",
      "دراسة السوق السعودي",
      "مقارنة أسعار المنافسين",
      "تحليل متاجر سلة",
    ],
    keywordsEn: ["competitor analysis ecommerce", "product scraping", "pricing analysis Saudi", "market research KSA"],
    price: 549,
    originalPrice: 1800,
    currency: "SAR",
    badge: "featured",
    badgeLabelAr: "قرارات بالبيانات",
    badgeLabelEn: "Data-Driven",
    features: [
      { ar: "بيانات 5 متاجر منافسة", en: "Data from 5 competitor stores" },
      { ar: "مقارنة أسعار منتجاً بمنتج", en: "Product-level price comparison" },
      { ar: "كشف المنتجات الرابحة", en: "Best-seller identification" },
      { ar: "فجوات السوق غير المستغلة", en: "Market gap discovery" },
      { ar: "توصيات تسعير عملية", en: "Actionable pricing advice" },
      { ar: "تقرير PDF + ملف Excel", en: "PDF report + Excel file" },
    ],
    deliveryDays: 3,
    monthlyOrders: 18,
    views: 980,
    inStock: true,
    order: 9,
  },

  /* ═══ 10 — ربط الدفع والشحن ═══ */
  {
    id: "integrations-suite",
    slug: "payment-shipping-integrations",
    category: "integrations",
    nameAr: "ربط بوابات الدفع والشحن",
    nameEn: "Payment & Shipping Integrations",
    shortDescAr: "تابي وتمارا ومدى وApple Pay + شركات الشحن — خلال 48 ساعة",
    shortDescEn: "Tabby, Tamara, Mada, Apple Pay & shipping — within 48 hours",
    descriptionAr: `إضافة تابي وتمارا وحدها ترفع متوسط قيمة الطلب 30-40% لأن العميل يقسّط بدل ما يؤجل الشراء. وApple Pay يختصر الدفع لنقرة واحدة.

ماذا ستستلم بالضبط؟
1. تفعيل وربط بوابات الدفع: مدى، فيزا/ماستركارد، Apple Pay، STC Pay.
2. تفعيل التقسيط: تابي وتمارا مع ظهور شعاراتهما في صفحات المنتجات.
3. ربط شركات الشحن التي تختارها وإعداد مناطق وأسعار التوصيل.
4. إعداد الفواتير الضريبية المتوافقة مع هيئة الزكاة والضريبة.
5. اختبار عمليات دفع حقيقية على كل بوابة قبل التسليم.
6. توثيق بسيط بخطوات إدارة كل خدمة بنفسك.

متوسط السوق 1,200+ ر.س — سعرنا 449 ر.س وخلال 48 ساعة.`,
    descriptionEn: `Adding Tabby and Tamara alone lifts average order value 30-40% — customers split payments instead of postponing. Apple Pay cuts checkout to one tap.

You get: payment gateways activated (Mada, Visa/MC, Apple Pay, STC Pay), installment options (Tabby, Tamara) with product-page badges, your chosen shipping companies connected with zones and rates, ZATCA-compliant tax invoice setup, real test transactions on every gateway before handover, and simple documentation to manage everything yourself.`,
    keywordsAr: [
      "ربط تابي بالمتجر",
      "ربط تمارا",
      "تفعيل مدى للمتجر الالكتروني",
      "ربط Apple Pay",
      "ربط شركات الشحن",
      "بوابات الدفع السعودية",
      "ربط STC Pay",
    ],
    keywordsEn: ["Tabby integration", "Tamara integration", "Mada payment setup", "Apple Pay store", "shipping integration Saudi"],
    price: 449,
    originalPrice: 1200,
    currency: "SAR",
    badge: "sale",
    badgeLabelAr: "خلال 48 ساعة",
    badgeLabelEn: "48-Hour Setup",
    features: [
      { ar: "مدى وفيزا وApple Pay وSTC Pay", en: "mada, Visa, Apple Pay and STC Pay" },
      { ar: "التقسيط: تابي وتمارا وإمكان ومدفوع", en: "BNPL: Tabby, Tamara, Emkan and Madfu" },
      { ar: "ربط شركات الشحن ومناطق التوصيل", en: "Carriers and delivery zones connected" },
      { ar: "إعداد بوالص الشحن والتتبع للعميل", en: "Shipping labels and customer tracking" },
      { ar: "فواتير متوافقة مع الفوترة الإلكترونية ZATCA", en: "ZATCA-compliant e-invoicing" },
      { ar: "ضبط سياسات الاسترجاع داخل بوابة الدفع", en: "Refund policy configured inside the gateway" },
      { ar: "عمليات شراء اختبارية حقيقية قبل التسليم", en: "Real test transactions before handover" },
    ],
    deliveryDays: 2,
    monthlyOrders: 14,
    views: 740,
    inStock: true,
    order: 10,
  },

  /* ═══ 11 — الأتمتة ═══ */
  {
    id: "automation-workflows",
    slug: "automation-workflows",
    category: "integrations",
    nameAr: "أتمتة عمليات المتجر",
    nameEn: "Store Automation Workflows",
    shortDescAr: "وفّر 10+ ساعات أسبوعياً — المهام المتكررة تشتغل وحدها",
    shortDescEn: "Save 10+ hours weekly — repetitive tasks run themselves",
    descriptionAr: `كل ساعة تقضيها في نسخ الطلبات ومتابعة المخزون يدوياً هي ساعة مسروقة من نمو متجرك — والأخطاء اليدوية تكلف أكثر.

ماذا ستستلم بالضبط؟
1. ثلاثة سيناريوهات أتمتة كاملة من اختيارك، أمثلة:
   • طلب جديد → إشعار واتساب فوري لك + تسجيل تلقائي في Google Sheets.
   • مخزون منخفض → تنبيه تلقائي قبل نفاد المنتج.
   • عميل جديد → رسالة ترحيب + كود خصم لطلبه القادم.
   • سلة متروكة → رسالة تذكير تلقائية.
2. ربط أدواتك الحالية ببعضها (المتجر، الشيتات، الواتساب، البريد).
3. اختبار كل سيناريو على بيانات حقيقية قبل التفعيل.
4. فيديو شرح لإدارة وتعديل الأتمتة بنفسك.

متوسط السوق 2,000+ ر.س — سعرنا 649 ر.س.`,
    descriptionEn: `Every hour spent copying orders and checking stock manually is stolen from growth — and manual errors cost more.

You get: three complete automation scenarios of your choice (e.g., new order → instant WhatsApp alert + Google Sheets log; low stock → automatic warning; new customer → welcome message + discount code; abandoned cart → reminder), your existing tools connected together, every scenario tested on real data, and a walkthrough video to manage automations yourself.`,
    keywordsAr: [
      "أتمتة المتاجر الالكترونية",
      "أتمتة الطلبات",
      "ربط المتجر بقوقل شيت",
      "تنبيهات واتساب للطلبات",
      "رسائل السلة المتروكة",
      "أتمتة سلة",
    ],
    keywordsEn: ["ecommerce automation", "order automation", "abandoned cart messages", "store workflow automation"],
    price: 649,
    originalPrice: 2000,
    currency: "SAR",
    badge: "limited",
    badgeLabelAr: "وفّر وقتك",
    badgeLabelEn: "Time Saver",
    features: [
      { ar: "3 سيناريوهات أتمتة كاملة", en: "3 complete automation flows" },
      { ar: "إشعارات واتساب فورية", en: "Instant WhatsApp alerts" },
      { ar: "رسائل السلة المتروكة", en: "Abandoned cart recovery" },
      { ar: "ربط أدواتك الحالية", en: "Your tools connected" },
      { ar: "اختبار على بيانات حقيقية", en: "Tested on real data" },
      { ar: "فيديو شرح للإدارة الذاتية", en: "Self-management video guide" },
    ],
    deliveryDays: 4,
    monthlyOrders: 16,
    views: 860,
    inStock: true,
    order: 11,
  },

  /* ═══ 12 — تصميم بوثات ═══ */
  {
    id: "booth-design",
    slug: "booth-design",
    category: "marketing",
    nameAr: "تصميم بوثات المعارض",
    nameEn: "Exhibition Booth Design",
    shortDescAr: "بوث يوقف الزائر ويحوّل المعرض إلى عملاء حقيقيين",
    shortDescEn: "A booth that stops visitors and converts exhibitions into clients",
    descriptionAr: `في معرض فيه مئات الأجنحة، أمامك 3 ثوانٍ لتوقف الزائر. البوث المصمم باحتراف يجذب ضعف الزوار ويترك انطباعاً يبقى بعد المعرض.

ماذا ستستلم بالضبط؟
1. تصميم ثلاثي الأبعاد كامل للبوث من عدة زوايا قبل التنفيذ.
2. توزيع ذكي للمساحة: منطقة عرض، منطقة حوار، ونقطة جذب بصرية.
3. تصاميم جميع المطبوعات: خلفيات، رول أب، كاونتر، بروشورات.
4. ملفات طباعة جاهزة بالمقاسات والدقة المطلوبة لأي مطبعة.
5. تعديلات حتى الاعتماد النهائي من إدارة المعرض.

متوسط السوق 3,500+ ر.س — سعرنا 1,199 ر.س.`,
    descriptionEn: `In a hall of hundreds of booths, you have 3 seconds to stop a visitor. A professionally designed booth doubles foot traffic and outlasts the event.

You get: a full 3D booth design from multiple angles before production, smart space planning (display, conversation, and visual-anchor zones), all print designs (backdrops, roll-ups, counter, brochures), print-ready files at required specs for any printer, and revisions until exhibition-management approval.`,
    keywordsAr: [
      "تصميم بوث معرض",
      "تصميم أجنحة المعارض",
      "بوث ثلاثي الأبعاد",
      "تصميم جناح معرض الرياض",
      "مطبوعات المعارض",
    ],
    keywordsEn: ["exhibition booth design", "3D booth design", "trade show booth Saudi"],
    price: 1199,
    originalPrice: 3500,
    currency: "SAR",
    badge: "featured",
    badgeLabelAr: "مميز",
    badgeLabelEn: "Featured",
    features: [
      { ar: "تصميم 3D من عدة زوايا", en: "Multi-angle 3D design" },
      { ar: "تخطيط ذكي للمساحة", en: "Smart space planning" },
      { ar: "تصاميم كل المطبوعات", en: "All print designs" },
      { ar: "ملفات طباعة جاهزة", en: "Print-ready files" },
      { ar: "تعديلات حتى الاعتماد", en: "Revisions until approval" },
    ],
    deliveryDays: 7,
    monthlyOrders: 9,
    views: 620,
    inStock: true,
    order: 12,
  },

  /* ═══ 13 — تجهيز المعارض ═══ */
  {
    id: "exhibition-setup",
    slug: "exhibition-setup",
    category: "marketing",
    nameAr: "تجهيز المعارض المتكامل",
    nameEn: "Full Exhibition Production",
    shortDescAr: "من التصميم إلى يوم الافتتاح — تجربة زوار متكاملة",
    shortDescEn: "From design to opening day — a complete visitor experience",
    descriptionAr: `مشاركتك في المعرض استثمار كبير — لا تتركه لتنسيق عشوائي بين مصمم ومطبعة ومقاول لا يتواصلون.

ماذا ستستلم بالضبط؟
1. تصميم البوث ثلاثي الأبعاد واعتماده من إدارة المعرض.
2. إنتاج وتركيب كامل: هيكل، إضاءة، شاشات عرض، ومطبوعات.
3. محتوى الشاشات: فيديو تعريفي وعروض متحركة لمنتجاتك.
4. تجربة زوار مدروسة: مسار الحركة، نقاط التفاعل، ومنطقة تسجيل بيانات العملاء المهتمين.
5. إشراف يوم التركيب وتسليم البوث جاهزاً قبل الافتتاح.
6. تفكيك البوث بعد انتهاء المعرض.

متوسط السوق 6,000+ ر.س — سعرنا 2,499 ر.س.`,
    descriptionEn: `Exhibiting is a serious investment — don't leave it to uncoordinated designers, printers and contractors.

You get: 3D booth design with exhibition-management approval, full production and installation (structure, lighting, screens, prints), screen content (intro video + product motion graphics), a designed visitor journey (flow, interaction points, lead-capture zone), installation-day supervision with handover before opening, and post-event dismantling.`,
    keywordsAr: [
      "تجهيز معارض",
      "تنفيذ أجنحة معارض",
      "شركة تجهيز معارض الرياض",
      "تركيب بوثات",
      "معارض السعودية",
    ],
    keywordsEn: ["exhibition setup", "booth production Saudi", "trade show production"],
    price: 2499,
    originalPrice: 6000,
    currency: "SAR",
    badge: "limited",
    badgeLabelAr: "باقة متكاملة",
    badgeLabelEn: "Full Package",
    features: [
      { ar: "تصميم واعتماد 3D", en: "3D design + approval" },
      { ar: "إنتاج وتركيب كامل", en: "Full production & install" },
      { ar: "محتوى شاشات وفيديو", en: "Screen content & video" },
      { ar: "منطقة تسجيل عملاء مهتمين", en: "Lead-capture zone" },
      { ar: "إشراف يوم التركيب", en: "Install-day supervision" },
      { ar: "تفكيك بعد المعرض", en: "Post-event dismantling" },
    ],
    deliveryDays: 10,
    monthlyOrders: 6,
    views: 510,
    inStock: true,
    order: 13,
  },

  /* ═══ 14 — تطبيقات حسب الطلب ═══ */
  {
    id: "custom-app-development",
    slug: "custom-app-development",
    category: "development",
    nameAr: "برمجة تطبيقات حسب الطلب",
    nameEn: "Custom App Development",
    shortDescAr: "من الفكرة إلى تطبيق يعمل بأيدي عملائك — بلوحة تحكم كاملة",
    shortDescEn: "From idea to a live app in your customers' hands — with a full admin panel",
    descriptionAr: `الفرق بين فكرة ناجحة ومشروع متعثر هو التنفيذ. نبني تطبيقك بمنهجية واضحة: نفهم، نصمم، نطور، نختبر، نسلّم — وأنت تشاهد التقدم أسبوعياً.

ماذا ستستلم بالضبط؟
1. جلسة تحليل متطلبات وتحويل فكرتك إلى خارطة شاشات ووظائف موثقة.
2. تصميم UX/UI كامل لكل الشاشات تعتمده قبل كتابة أي سطر كود.
3. تطوير التطبيق (iOS + Android من كود واحد) بأداء عالٍ.
4. لوحة تحكم ويب كاملة لإدارة المحتوى والمستخدمين والطلبات.
5. ربط الخدمات الخارجية: دفع، إشعارات، خرائط، تسجيل دخول اجتماعي.
6. اختبار شامل ونشر على متجري آبل وجوجل.
7. الكود المصدري كاملاً ملكك + شهر دعم مجاني بعد الإطلاق.

متوسط السوق 10,000+ ر.س — سعرنا يبدأ من 3,499 ر.س.`,
    descriptionEn: `The difference between a successful idea and a stalled project is execution. We build with a clear methodology — analyze, design, develop, test, ship — with weekly progress visibility.

You get: a requirements session turning your idea into a documented screen/feature map, complete UX/UI design approved before any code, iOS + Android development from a single codebase, a full web admin panel, third-party integrations (payments, notifications, maps, social login), full testing plus App Store and Google Play publishing, complete source-code ownership, and one month of free post-launch support.`,
    keywordsAr: [
      "برمجة تطبيقات جوال",
      "تطوير تطبيق ايفون واندرويد",
      "شركة برمجة تطبيقات سعودية",
      "تكلفة برمجة تطبيق",
      "برمجة تطبيق متجر",
      "تطبيق حسب الطلب",
    ],
    keywordsEn: ["custom app development", "iOS Android app Saudi", "app development cost KSA", "mobile app agency"],
    price: 3499,
    originalPrice: 10000,
    currency: "SAR",
    badge: "featured",
    badgeLabelAr: "حسب الطلب",
    badgeLabelEn: "Custom",
    features: [
      { ar: "تحليل متطلبات موثق", en: "Documented requirements analysis" },
      { ar: "تصميم UX/UI تعتمده أولاً", en: "UX/UI approved before coding" },
      { ar: "iOS + Android من كود واحد", en: "iOS + Android, one codebase" },
      { ar: "لوحة تحكم ويب كاملة", en: "Full web admin panel" },
      { ar: "نشر على متجري التطبيقات", en: "App Store + Play publishing" },
      { ar: "الكود المصدري ملكك", en: "You own the source code" },
      { ar: "شهر دعم مجاني", en: "1 month free support" },
    ],
    deliveryDays: 21,
    monthlyOrders: 8,
    views: 920,
    inStock: true,
    order: 14,
  },

  /* ═══ 15 — MVP سريع ═══ */
  {
    id: "vibe-coding",
    slug: "vibe-coding-services",
    category: "development",
    nameAr: "إطلاق MVP سريع",
    nameEn: "Rapid MVP Launch",
    shortDescAr: "اختبر فكرتك بمنتج حقيقي خلال 7 أيام بدل 6 أشهر",
    shortDescEn: "Test your idea with a real product in 7 days, not 6 months",
    descriptionAr: `أخطر قرار في أي مشروع ناشئ هو بناء منتج كامل قبل التأكد أن أحداً يريده. الـ MVP يجاوبك على السؤال الأهم بأقل تكلفة: هل يدفع الناس مقابل فكرتي؟

ماذا ستستلم بالضبط؟
1. جلسة تحديد النطاق: نستخرج معك أصغر نسخة قابلة للاختبار من فكرتك.
2. تطوير المنتج خلال 7 أيام عمل بكود نظيف قابل للتوسع لاحقاً.
3. واجهة استخدام بسيطة وأنيقة تعطي انطباعاً احترافياً للمستخدمين الأوائل.
4. نشر المنتج على نطاقك ليصبح متاحاً للاستخدام الحقيقي فوراً.
5. أدوات قياس مدمجة: من سجّل، من استخدم، وأين توقف.
6. جلسة تسليم مع توصيات المرحلة القادمة بناءً على ما نراه.

متوسط السوق 3,000+ ر.س — سعرنا 999 ر.س.`,
    descriptionEn: `The riskiest startup decision is building a full product before proving anyone wants it. An MVP answers the crucial question at minimal cost: will people pay for this?

You get: a scoping session extracting the smallest testable version of your idea, development in 7 working days with clean scalable code, a simple polished UI that impresses early users, deployment on your domain for immediate real use, built-in analytics (signups, usage, drop-off), and a handover session with next-phase recommendations.`,
    keywordsAr: [
      "بناء MVP",
      "تطوير منتج أولي",
      "اختبار فكرة مشروع",
      "تطوير سريع للمشاريع",
      "برمجة مشروع ناشئ",
    ],
    keywordsEn: ["MVP development", "rapid prototyping", "startup MVP Saudi", "validate startup idea"],
    price: 999,
    originalPrice: 3000,
    currency: "SAR",
    badge: "new",
    badgeLabelAr: "خلال 7 أيام",
    badgeLabelEn: "7-Day Build",
    features: [
      { ar: "جلسة تحديد نطاق الفكرة", en: "Idea scoping session" },
      { ar: "تطوير خلال 7 أيام عمل", en: "Built in 7 working days" },
      { ar: "كود نظيف قابل للتوسع", en: "Clean scalable code" },
      { ar: "نشر على نطاقك فوراً", en: "Deployed on your domain" },
      { ar: "أدوات قياس مدمجة", en: "Built-in analytics" },
      { ar: "توصيات المرحلة القادمة", en: "Next-phase recommendations" },
    ],
    deliveryDays: 7,
    monthlyOrders: 11,
    views: 780,
    inStock: true,
    order: 15,
  },

  /* ═══ 16 — تطوير مواقع ولوحات تحكم ═══ */
  {
    id: "general-programming",
    slug: "general-programming",
    category: "development",
    nameAr: "تطوير مواقع ولوحات تحكم",
    nameEn: "Websites & Dashboards Development",
    shortDescAr: "موقع مؤسسي سريع ومحسّن للسيو مع لوحة تحكم تديره بنفسك",
    shortDescEn: "A fast, SEO-optimized corporate site with a self-service admin panel",
    descriptionAr: `موقعك هو مقرّك الرسمي على الإنترنت — العميل والشريك والممول كلهم يحكمون عليك منه قبل أول اجتماع.

ماذا ستستلم بالضبط؟
1. موقع مؤسسي حتى 8 صفحات (رئيسية، من نحن، خدمات، أعمال، مدونة، تواصل...).
2. تصميم متجاوب بالكامل مع الجوال والتابلت والشاشات الكبيرة.
3. لوحة تحكم لتعديل المحتوى والصور والمقالات بنفسك دون مبرمج.
4. تحسين SEO أساسي: عناوين، أوصاف، Schema، Sitemap، وسرعة تحميل عالية.
5. نماذج تواصل مربوطة ببريدك وواتساب مع حماية من الرسائل المزعجة.
6. استضافة سنة أولى مجاناً + شهادة SSL.
7. تدريب مسجل على إدارة الموقع.

متوسط السوق 3,500+ ر.س — سعرنا 1,199 ر.س.`,
    descriptionEn: `Your website is your official headquarters online — clients, partners and investors all judge you by it before the first meeting.

You get: a corporate site up to 8 pages, fully responsive design, an admin panel to edit content/images/articles yourself, essential SEO (titles, descriptions, Schema, sitemap, fast loading), contact forms wired to email and WhatsApp with spam protection, first-year hosting free with SSL, and recorded management training.`,
    keywordsAr: [
      "تصميم مواقع سعودية",
      "تطوير موقع شركة",
      "موقع مؤسسي احترافي",
      "تصميم موقع مع لوحة تحكم",
      "أسعار تصميم المواقع",
      "شركة برمجة مواقع",
    ],
    keywordsEn: ["corporate website Saudi", "website with admin panel", "web development KSA", "business website design"],
    price: 1199,
    originalPrice: 3500,
    currency: "SAR",
    badge: "sale",
    badgeLabelAr: "شامل الاستضافة",
    badgeLabelEn: "Hosting Included",
    features: [
      { ar: "حتى 8 صفحات مؤسسية", en: "Up to 8 corporate pages" },
      { ar: "متجاوب مع كل الأجهزة", en: "Fully responsive" },
      { ar: "لوحة تحكم للمحتوى", en: "Content admin panel" },
      { ar: "SEO أساسي + Schema", en: "Essential SEO + Schema" },
      { ar: "نماذج مربوطة بواتساب", en: "WhatsApp-wired forms" },
      { ar: "استضافة سنة + SSL مجاناً", en: "1-year hosting + SSL free" },
    ],
    deliveryDays: 10,
    monthlyOrders: 12,
    views: 840,
    inStock: true,
    order: 16,
  },
];

/* ─── Helper Functions ─────────────────────────────────────────────────────── */
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return PRODUCTS.sort((a, b) => a.order - b.order);
  return PRODUCTS.filter(p => p.category === category).sort((a, b) => a.order - b.order);
}

export function getPopularProducts(): Product[] {
  return PRODUCTS.filter(p => p.popular).sort((a, b) => a.order - b.order);
}

export function calculateSavings(product: Product): number {
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
}

/* ─── Competitor Comparison Data — أسعار السوق مقابل أسعارنا ────────────────── */
export const COMPETITOR_COMPARISON = [
  { service: "تجهيز متجر سلة كامل", competitor: "4,000+", ours: "1,099" },
  { service: "تصميم ثيم سلة خاص", competitor: "1,500+", ours: "399" },
  { service: "سيو المتاجر الإلكترونية", competitor: "2,500+", ours: "699" },
  { service: "تصوير منتجات (10 صور)", competitor: "1,500+", ours: "249" },
  { service: "هوية بصرية متكاملة", competitor: "3,000+", ours: "799" },
  { service: "التسويق الإلكتروني / شهر", competitor: "3,000+", ours: "999" },
  { service: "إدارة السوشيال / شهر", competitor: "2,000+", ours: "749" },
  { service: "برمجة تطبيق حسب الطلب", competitor: "10,000+", ours: "3,499" },
];
