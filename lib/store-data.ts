/* ═══════════════════════════════════════════════════════════════════════════
   STORE PRODUCTS DATA
   Professional e-commerce store with Salla, Zid, and digital services
═══════════════════════════════════════════════════════════════════════════ */

export type ProductCategory = 
  | "salla" 
  | "zid" 
  | "design" 
  | "marketing" 
  | "web" 
  | "seo";

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
  rating: number;
  reviewCount: number;
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
  { key: "salla", labelAr: "متاجر سلة", labelEn: "Salla Stores", icon: "🛒" },
  { key: "zid", labelAr: "متاجر زد", labelEn: "Zid Stores", icon: "🏪" },
  { key: "design", labelAr: "التصميم والهوية", labelEn: "Design & Branding", icon: "🎨" },
  { key: "marketing", labelAr: "التسويق الرقمي", labelEn: "Digital Marketing", icon: "📈" },
  { key: "web", labelAr: "تطوير المواقع", labelEn: "Web Development", icon: "💻" },
  { key: "seo", labelAr: "تحسين محركات البحث", labelEn: "SEO", icon: "🔍" },
];

/* ─── Badge Styles ─────────────────────────────────────────────────────────── */
export const BADGE_STYLES: Record<BadgeType, { bg: string; border: string; color: string }> = {
  bestseller: { bg: "rgba(189,238,99,0.15)", border: "rgba(189,238,99,0.4)", color: "#BDEE63" },
  new: { bg: "rgba(99,179,238,0.15)", border: "rgba(99,179,238,0.4)", color: "#63B3EE" },
  sale: { bg: "rgba(238,99,99,0.15)", border: "rgba(238,99,99,0.4)", color: "#EE6363" },
  limited: { bg: "rgba(238,179,99,0.15)", border: "rgba(238,179,99,0.4)", color: "#EEB363" },
  featured: { bg: "rgba(200,169,98,0.15)", border: "rgba(200,169,98,0.4)", color: "#C8A962" },
  monthly: { bg: "rgba(179,99,238,0.15)", border: "rgba(179,99,238,0.4)", color: "#B363EE" },
};

/* ─── Products Database ────────────────────────────────────────────────────── */
export const PRODUCTS: Product[] = [
  // ═══════════════════ SALLA SERVICES ═══════════════════
  {
    id: "salla-basic",
    slug: "salla-basic-package",
    category: "salla",
    nameAr: "الباقة الأساسية — متجر سلة",
    nameEn: "Basic Package — Salla Store",
    shortDescAr: "تأسيس متجر سلة احترافي جاهز للبيع",
    shortDescEn: "Professional Salla store ready to sell",
    descriptionAr: `باقة تأسيس متجر إلكتروني احترافي على منصة سلة تشمل كل ما تحتاجه لبدء البيع فوراً.
    
نقوم بإعداد متجرك بالكامل من الصفر، ربط بوابات الدفع (مدى، Apple Pay، فيزا، STC Pay)، ربط شركات الشحن، إضافة الصفحات الأساسية (من نحن، سياسة الخصوصية، الشروط والأحكام)، توثيق المتجر، وإضافة منتجاتك.

هذه الباقة مثالية لمن يريد دخول عالم التجارة الإلكترونية بأقل تكلفة وأعلى جودة.`,
    descriptionEn: `Professional e-commerce store setup on Salla platform including everything you need to start selling immediately.

We set up your store from scratch, connect payment gateways (Mada, Apple Pay, Visa, STC Pay), shipping companies, add essential pages (About, Privacy Policy, Terms), verify the store, and add your products.

Perfect for those entering e-commerce with minimal cost and maximum quality.`,
    price: 899,
    originalPrice: 2500,
    currency: "SAR",
    badge: "bestseller",
    badgeLabelAr: "الأكثر طلباً",
    badgeLabelEn: "Bestseller",
    features: [
      { ar: "إنشاء متجر سلة من الصفر", en: "Salla store creation from scratch" },
      { ar: "ضبط جميع إعدادات المتجر", en: "Complete store settings configuration" },
      { ar: "ربط بوابات الدفع (مدى، Apple Pay، فيزا)", en: "Payment gateways (Mada, Apple Pay, Visa)" },
      { ar: "ربط شركات الشحن والتوصيل", en: "Shipping companies integration" },
      { ar: "إضافة الصفحات الأساسية", en: "Essential pages setup" },
      { ar: "توثيق المتجر رسمياً", en: "Official store verification" },
      { ar: "ربط Google Analytics", en: "Google Analytics integration" },
      { ar: "إضافة 15 منتج مع الصور", en: "Add 15 products with images" },
      { ar: "تصميم 3 بنرات احترافية", en: "3 professional banners design" },
    ],
    deliveryDays: 4,
    rating: 4.9,
    reviewCount: 234,
    popular: true,
    inStock: true,
    order: 1,
  },
  {
    id: "salla-pro",
    slug: "salla-professional-package",
    category: "salla",
    nameAr: "الباقة الاحترافية — متجر سلة",
    nameEn: "Professional Package — Salla Store",
    shortDescAr: "متجر سلة كامل مع ثيم مخصص وتدريب",
    shortDescEn: "Complete Salla store with custom theme & training",
    descriptionAr: `الباقة الاحترافية الأكثر شمولاً لتأسيس متجر سلة متكامل يعكس هوية علامتك التجارية.

تشمل كل مميزات الباقة الأساسية بالإضافة إلى: ثيم مخصص بالكامل، تصميم 50 منتج، إعداد قسائم الخصم، ربط أدوات التسويق، تدريب عملي ساعتين، ودعم فني شهر كامل.

مثالية لمن يريد متجراً احترافياً يتميز عن المنافسين.`,
    descriptionEn: `The most comprehensive professional package for a complete Salla store reflecting your brand identity.

Includes all Basic package features plus: fully custom theme, 50 products setup, discount coupons, marketing tools integration, 2-hour training, and one month technical support.

Perfect for those wanting a professional store that stands out.`,
    price: 1499,
    originalPrice: 5000,
    currency: "SAR",
    badge: "featured",
    badgeLabelAr: "الأكثر تميزاً",
    badgeLabelEn: "Featured",
    features: [
      { ar: "كل مميزات الباقة الأساسية", en: "All Basic package features" },
      { ar: "ثيم سلة مخصص بالكامل", en: "Fully custom Salla theme" },
      { ar: "إضافة 50 منتج مع الوصف والصور", en: "50 products with descriptions & images" },
      { ar: "تصميم 8 بنرات احترافية", en: "8 professional banners" },
      { ar: "إعداد قسائم الخصم والعروض", en: "Discount coupons & offers setup" },
      { ar: "ربط Pixel فيسبوك وسناب", en: "Facebook & Snap Pixel integration" },
      { ar: "تدريب عملي ساعتين على إدارة المتجر", en: "2-hour hands-on training" },
      { ar: "دعم فني شهر كامل", en: "One month technical support" },
    ],
    deliveryDays: 7,
    rating: 4.9,
    reviewCount: 156,
    popular: true,
    inStock: true,
    order: 2,
  },
  {
    id: "salla-theme",
    slug: "salla-custom-theme",
    category: "salla",
    nameAr: "تصميم ثيم سلة مخصص",
    nameEn: "Custom Salla Theme Design",
    shortDescAr: "ثيم سلة فريد يعكس هوية علامتك",
    shortDescEn: "Unique Salla theme reflecting your brand",
    descriptionAr: `ثيم سلة احترافي مصمم خصيصاً لمتجرك يجعلك تتميز عن آلاف المتاجر الأخرى.

نصمم ثيم فريد من الصفر يعكس هوية علامتك التجارية، متوافق 100% مع الجوال، سريع التحميل، ومحسّن لتجربة المستخدم لزيادة المبيعات.`,
    descriptionEn: `Professional Salla theme designed specifically for your store to stand out from thousands of others.

We design a unique theme from scratch reflecting your brand, 100% mobile compatible, fast loading, and optimized for UX to increase sales.`,
    price: 1199,
    originalPrice: 4000,
    currency: "SAR",
    features: [
      { ar: "تصميم UI/UX مخصص من الصفر", en: "Custom UI/UX design from scratch" },
      { ar: "متوافق 100% مع جميع الأجهزة", en: "100% compatible with all devices" },
      { ar: "سرعة تحميل عالية", en: "High loading speed" },
      { ar: "ألوان وخطوط مخصصة", en: "Custom colors and fonts" },
      { ar: "صفحة منتج محسّنة للتحويل", en: "Conversion-optimized product page" },
      { ar: "مراجعات غير محدودة", en: "Unlimited revisions" },
    ],
    deliveryDays: 7,
    rating: 4.8,
    reviewCount: 189,
    inStock: true,
    order: 3,
  },

  // ═══════════════════ ZID SERVICES ═══════════════════
  {
    id: "zid-basic",
    slug: "zid-basic-package",
    category: "zid",
    nameAr: "الباقة الأساسية — متجر زد",
    nameEn: "Basic Package — Zid Store",
    shortDescAr: "تأسيس متجر زد احترافي جاهز للبيع",
    shortDescEn: "Professional Zid store ready to sell",
    descriptionAr: `باقة تأسيس متجر إلكتروني على منصة زد تشمل الإعداد الكامل وربط بوابات الدفع والشحن.

زد منصة سعودية قوية للتجارة الإلكترونية، ونحن نساعدك على الانطلاق بشكل احترافي.`,
    descriptionEn: `E-commerce store setup package on Zid platform including complete setup, payment and shipping integration.

Zid is a powerful Saudi e-commerce platform, and we help you launch professionally.`,
    price: 899,
    originalPrice: 2500,
    currency: "SAR",
    badge: "new",
    badgeLabelAr: "جديد",
    badgeLabelEn: "New",
    features: [
      { ar: "إنشاء متجر زد من الصفر", en: "Zid store creation from scratch" },
      { ar: "ضبط جميع إعدادات المتجر", en: "Complete store settings" },
      { ar: "ربط بوابات الدفع", en: "Payment gateways integration" },
      { ar: "ربط شركات الشحن", en: "Shipping companies integration" },
      { ar: "إضافة الصفحات الأساسية", en: "Essential pages setup" },
      { ar: "إضافة 15 منتج", en: "Add 15 products" },
      { ar: "تصميم 3 بنرات", en: "3 banners design" },
    ],
    deliveryDays: 4,
    rating: 4.8,
    reviewCount: 87,
    inStock: true,
    order: 4,
  },
  {
    id: "zid-pro",
    slug: "zid-professional-package",
    category: "zid",
    nameAr: "الباقة الاحترافية — متجر زد",
    nameEn: "Professional Package — Zid Store",
    shortDescAr: "متجر زد كامل مع ثيم مخصص وتدريب",
    shortDescEn: "Complete Zid store with custom theme & training",
    descriptionAr: `الباقة الاحترافية لتأسيس متجر زد متكامل مع ثيم مخصص وتدريب عملي.`,
    descriptionEn: `Professional package for complete Zid store with custom theme and hands-on training.`,
    price: 1499,
    originalPrice: 5000,
    currency: "SAR",
    features: [
      { ar: "كل مميزات الباقة الأساسية", en: "All Basic package features" },
      { ar: "ثيم زد مخصص", en: "Custom Zid theme" },
      { ar: "إضافة 50 منتج", en: "50 products setup" },
      { ar: "تصميم 8 بنرات", en: "8 banners design" },
      { ar: "ربط أدوات التسويق", en: "Marketing tools integration" },
      { ar: "تدريب عملي ساعتين", en: "2-hour training" },
      { ar: "دعم فني شهر", en: "One month support" },
    ],
    deliveryDays: 7,
    rating: 4.9,
    reviewCount: 64,
    inStock: true,
    order: 5,
  },

  // ═══════════════════ DESIGN SERVICES ═══════════════════
  {
    id: "brand-identity",
    slug: "brand-identity-design",
    category: "design",
    nameAr: "هوية بصرية احترافية كاملة",
    nameEn: "Complete Professional Brand Identity",
    shortDescAr: "شعار وهوية بصرية تحكي قصة علامتك",
    shortDescEn: "Logo & brand identity telling your story",
    descriptionAr: `هوية بصرية متكاملة تشمل الشعار ودليل الهوية وجميع التطبيقات.

نصمم لك هوية بصرية فريدة تعكس شخصية علامتك وتترك انطباعاً لا يُنسى.`,
    descriptionEn: `Complete brand identity including logo, brand guide, and all applications.

We design a unique visual identity reflecting your brand personality and leaving an unforgettable impression.`,
    price: 999,
    originalPrice: 4000,
    currency: "SAR",
    badge: "bestseller",
    badgeLabelAr: "الأكثر طلباً",
    badgeLabelEn: "Bestseller",
    features: [
      { ar: "شعار بنسختين (عربي + إنجليزي)", en: "Logo in 2 versions (Arabic + English)" },
      { ar: "دليل الهوية البصرية الكامل", en: "Complete brand guide" },
      { ar: "بطاقة أعمال + ورق رسمي", en: "Business card + letterhead" },
      { ar: "قوالب سوشيال ميديا (10 تصاميم)", en: "Social media templates (10 designs)" },
      { ar: "ملفات مفتوحة AI / PSD", en: "Open files AI / PSD" },
      { ar: "3 مراجعات مجانية", en: "3 free revisions" },
    ],
    deliveryDays: 5,
    rating: 4.9,
    reviewCount: 203,
    popular: true,
    inStock: true,
    order: 6,
  },
  {
    id: "product-photography",
    slug: "product-photography",
    category: "design",
    nameAr: "تصوير منتجات احترافي",
    nameEn: "Professional Product Photography",
    shortDescAr: "صور منتجات بجودة تزيد المبيعات",
    shortDescEn: "Product photos that increase sales",
    descriptionAr: `تصوير منتجاتك بجودة احترافية تجعل العميل يشتري فوراً.`,
    descriptionEn: `Professional product photography that makes customers buy immediately.`,
    price: 599,
    originalPrice: 2000,
    currency: "SAR",
    features: [
      { ar: "تصوير حتى 20 منتج", en: "Up to 20 products" },
      { ar: "خلفيات متعددة", en: "Multiple backgrounds" },
      { ar: "تعديل احترافي", en: "Professional editing" },
      { ar: "صيغة JPG + PNG", en: "JPG + PNG formats" },
      { ar: "جاهزة للمتاجر", en: "Store-ready" },
    ],
    deliveryDays: 3,
    rating: 4.8,
    reviewCount: 78,
    inStock: true,
    order: 7,
  },

  // ═══════════════════ MARKETING SERVICES ═══════════════════
  {
    id: "social-management",
    slug: "social-media-management",
    category: "marketing",
    nameAr: "إدارة السوشيال ميديا",
    nameEn: "Social Media Management",
    shortDescAr: "حضور رقمي قوي ومحتوى يبيع",
    shortDescEn: "Strong digital presence & content that sells",
    descriptionAr: `إدارة حساباتك على السوشيال ميديا بشكل احترافي يزيد التفاعل والمبيعات.`,
    descriptionEn: `Professional social media management that increases engagement and sales.`,
    price: 799,
    originalPrice: 3000,
    currency: "SAR",
    isMonthly: true,
    badge: "monthly",
    badgeLabelAr: "شهري",
    badgeLabelEn: "Monthly",
    features: [
      { ar: "20 منشور شهري (تصميم + كتابة)", en: "20 monthly posts (design + copy)" },
      { ar: "إدارة إنستغرام + تويتر + تيك توك", en: "Instagram + Twitter + TikTok" },
      { ar: "تقرير أداء أسبوعي", en: "Weekly performance report" },
      { ar: "رد على التعليقات والرسائل", en: "Comments & messages response" },
      { ar: "قصص يومية (Stories)", en: "Daily Stories" },
    ],
    deliveryDays: 30,
    rating: 4.7,
    reviewCount: 112,
    inStock: true,
    order: 8,
  },
  {
    id: "paid-ads",
    slug: "paid-advertising-campaigns",
    category: "marketing",
    nameAr: "إعلانات Google و Meta",
    nameEn: "Google & Meta Ads",
    shortDescAr: "حملات إعلانية تصل لعميلك المثالي",
    shortDescEn: "Ad campaigns reaching your ideal customer",
    descriptionAr: `حملات إعلانية مدروسة على Google و Meta تحقق أعلى عائد على الاستثمار.`,
    descriptionEn: `Strategic advertising campaigns on Google & Meta achieving highest ROI.`,
    price: 899,
    originalPrice: 3500,
    currency: "SAR",
    isMonthly: true,
    badge: "limited",
    badgeLabelAr: "ROI مضمون",
    badgeLabelEn: "Guaranteed ROI",
    features: [
      { ar: "إعداد وإدارة الحملات", en: "Campaign setup & management" },
      { ar: "استهداف دقيق للجمهور", en: "Precise audience targeting" },
      { ar: "Meta + Google + TikTok", en: "Meta + Google + TikTok" },
      { ar: "A/B Testing", en: "A/B Testing" },
      { ar: "تقرير أسبوعي مفصّل", en: "Detailed weekly report" },
    ],
    deliveryDays: 30,
    rating: 4.9,
    reviewCount: 94,
    inStock: true,
    order: 9,
  },

  // ═══════════════════ WEB DEVELOPMENT ═══════════════════
  {
    id: "website-dev",
    slug: "professional-website-development",
    category: "web",
    nameAr: "تطوير موقع ويب احترافي",
    nameEn: "Professional Website Development",
    shortDescAr: "موقع سريع وجميل يحقق أهدافك",
    shortDescEn: "Fast & beautiful website achieving your goals",
    descriptionAr: `موقع ويب احترافي مصمم ومطوّر خصيصاً لعلامتك التجارية.

نستخدم أحدث التقنيات (Next.js / React) لبناء موقع سريع، آمن، ومتوافق مع جميع الأجهزة.`,
    descriptionEn: `Professional website designed and developed specifically for your brand.

We use latest technologies (Next.js / React) to build a fast, secure website compatible with all devices.`,
    price: 2499,
    originalPrice: 8000,
    currency: "SAR",
    badge: "featured",
    badgeLabelAr: "مميز",
    badgeLabelEn: "Featured",
    features: [
      { ar: "تصميم UX/UI مخصص", en: "Custom UX/UI design" },
      { ar: "تطوير Next.js / React", en: "Next.js / React development" },
      { ar: "لوحة تحكم سهلة", en: "Easy admin panel" },
      { ar: "SEO أساسي محسّن", en: "Basic SEO optimized" },
      { ar: "متوافق مع الجوال 100%", en: "100% mobile compatible" },
      { ar: "صيانة مجانية شهر", en: "One month free maintenance" },
    ],
    deliveryDays: 14,
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
    order: 10,
  },

  // ═══════════════════ SEO SERVICES ═══════════════════
  {
    id: "seo-package",
    slug: "seo-optimization-package",
    category: "seo",
    nameAr: "خدمة SEO متكاملة",
    nameEn: "Complete SEO Service",
    shortDescAr: "ظهر في نتائج البحث الأولى",
    shortDescEn: "Appear in top search results",
    descriptionAr: `تحسين موقعك أو متجرك للظهور في نتائج البحث الأولى على جوجل.`,
    descriptionEn: `Optimize your website or store to appear in top Google search results.`,
    price: 699,
    originalPrice: 2500,
    currency: "SAR",
    isMonthly: true,
    features: [
      { ar: "تحليل الكلمات المفتاحية", en: "Keyword analysis" },
      { ar: "تحسين On-Page SEO", en: "On-Page SEO optimization" },
      { ar: "بناء روابط خارجية", en: "Link building" },
      { ar: "تحسين سرعة الموقع", en: "Site speed optimization" },
      { ar: "تقرير ترتيب شهري", en: "Monthly ranking report" },
    ],
    deliveryDays: 30,
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    order: 11,
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

/* ─── Competitor Comparison Data ───────────────────────────────────────────── */
export const COMPETITOR_COMPARISON = [
  { service: "الباقة الأساسية سلة", competitor: "2,500+", ours: "899" },
  { service: "الباقة الاحترافية سلة", competitor: "5,000+", ours: "1,499" },
  { service: "ثيم سلة مخصص", competitor: "4,000+", ours: "1,199" },
  { service: "هوية بصرية كاملة", competitor: "4,000+", ours: "999" },
  { service: "إدارة سوشيال / شهر", competitor: "3,000+", ours: "799" },
  { service: "موقع ويب احترافي", competitor: "8,000+", ours: "2,499" },
];
