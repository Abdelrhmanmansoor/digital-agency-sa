/* ══════════════════════════════════════════════════════════════════════
   SidraComponentRegistry — قاموس أجزاء ثيم سِدرة

   كل selector هنا مستخرج من ملفات الثيم الفعلية (src/views/**.twig و
   src/assets/styles/**.scss) وليس مخترعًا. الرقم بجانب كل مجموعة في
   التعليق هو عدد مرات ظهور الاسم في المصدر وقت الاستخراج، حتى يمكن
   التحقق منه لاحقًا.

   قاعدة الاختيار: نفضّل الاسم الثابت الذي يملكه الثيم (sidra-* أو
   store-*) على الأسماء التي تولّدها سلة وقد تتغيّر (s-* الداخلية).
   ══════════════════════════════════════════════════════════════════════ */

export type DeviceScope = "all" | "mobile" | "desktop";
export type PageScope = "all" | "home" | "product" | "category" | "cart" | "blog";

export interface SidraComponent {
  key: string;
  /** الاسم المعروض في الواجهة */
  label: string;
  labelEn: string;
  /** كلمات يكتبها المستخدم للإشارة إلى هذا الجزء */
  aliases: string[];
  /** المحدِّد الأساسي المستخدم في توليد الكود */
  selector: string;
  /** محدِّدات فرعية لأجزاء داخل المكوّن */
  parts?: Record<string, { label: string; selector: string }>;
  /** ملاحظة تظهر مع الكود المولَّد */
  note?: string;
}

export const SIDRA_COMPONENTS: SidraComponent[] = [
  {
    key: "header",
    label: "الهيدر",
    labelEn: "Header",
    aliases: ["الهيدر", "الهدر", "الرأس", "القائمة العلوية", "شريط علوي", "header", "navbar", "الترويسة"],
    selector: ".sidra-header",
    parts: {
      logo: { label: "الشعار", selector: ".store-header__logo" },
      nav: { label: "روابط القائمة", selector: ".store-header__menu-link" },
      icons: { label: "أيقونات الهيدر", selector: ".sh-iconbtn" },
      cart: { label: "أيقونة السلة", selector: ".sh-cart" },
      topbar: { label: "الشريط العلوي", selector: ".sidra-topbar" },
    },
    note: "الهيدر يحمل data-sticky و data-overlay — التعديلات التي تعتمد عليهما مذكورة في الكود.",
  },
  {
    key: "footer",
    label: "الفوتر",
    labelEn: "Footer",
    aliases: ["الفوتر", "التذييل", "الفوتير", "اسفل الصفحة", "footer"],
    selector: ".tf-footer",
    parts: {
      links: { label: "روابط الفوتر", selector: ".tf-footer .store-footer__links" },
      social: { label: "التواصل الاجتماعي", selector: ".tf-footer__social" },
      payments: { label: "طرق الدفع", selector: ".tf-brand-payments" },
      copyright: { label: "حقوق النشر", selector: ".store-footer__copyright" },
      logo: { label: "شعار الفوتر", selector: ".store-footer__logo" },
    },
  },
  {
    key: "productCard",
    label: "بطاقة المنتج",
    labelEn: "Product card",
    aliases: ["بطاقة المنتج", "بطاقات المنتجات", "كرت المنتج", "كروت المنتجات", "product card", "البطاقة"],
    selector: ".s-product-card-entry",
    parts: {
      image: { label: "صورة المنتج", selector: ".s-product-card-image" },
      title: { label: "اسم المنتج", selector: ".s-product-card-content-title" },
      wishlist: { label: "زر المفضلة", selector: ".s-product-card-wishlist-btn" },
      compare: { label: "زر المقارنة", selector: ".s-product-card-compare-btn" },
      quickView: { label: "المعاينة السريعة", selector: ".s-product-card-quickview-btn" },
      addButton: { label: "زر الإضافة للسلة", selector: ".s-product-card-entry salla-add-product-button" },
    },
    note: "البطاقة عنصر يبنيه الثيم من جهة العميل؛ التعديلات تُكتب على .s-product-card-entry لتشمل كل الأنماط الثمانية.",
  },
  {
    key: "productPage",
    label: "صفحة المنتج",
    labelEn: "Product page",
    aliases: ["صفحة المنتج", "تفاصيل المنتج", "صفحه المنتج", "product page", "pdp"],
    selector: ".sidra-pdp",
    parts: {
      title: { label: "اسم المنتج", selector: ".sidra-product-title" },
      gallery: { label: "معرض الصور", selector: ".sidra-pdp-gallery" },
      thumbs: { label: "الصور المصغّرة", selector: ".sidra-pdp-gallery__thumbs" },
      price: { label: "السعر", selector: ".sidra-price-block" },
      buyButtons: { label: "أزرار الشراء", selector: ".sidra-purchase-panel" },
      trust: { label: "شارات الثقة", selector: ".sidra-trust-mini" },
      stickyBar: { label: "شريط الشراء الثابت", selector: "#sidra-sticky-buy" },
    },
  },
  {
    key: "section",
    label: "أقسام الصفحة الرئيسية",
    labelEn: "Home sections",
    aliases: ["الاقسام", "الأقسام", "اقسام الصفحة", "المسافة بين الاقسام", "sections", "القسم"],
    selector: ".sidra-home > *",
    parts: {
      container: { label: "حاوية القسم", selector: ".sidra-container" },
      heading: { label: "عنوان القسم", selector: ".sidra-section-title" },
    },
    note: "‏.sidra-home عمود flex؛ المسافة بين الأقسام تُضبط بـ gap لا بـ margin.",
  },
  {
    key: "mobileNav",
    label: "شريط الجوال السفلي",
    labelEn: "Mobile bottom nav",
    aliases: ["شريط الجوال", "القائمة السفلية", "التنقل السفلي", "mobile nav", "bottom nav"],
    selector: ".sidra-mobnav",
  },
  {
    key: "sideMenu",
    label: "القائمة الجانبية",
    labelEn: "Side menu",
    aliases: ["القائمة الجانبية", "المنيو الجانبي", "الدرج", "side menu", "drawer"],
    selector: ".sidra-mobile-menu",
  },
  {
    key: "slider",
    label: "السلايدر",
    labelEn: "Slider",
    aliases: ["السلايدر", "البنر", "البانر", "الشرائح", "slider", "banner"],
    selector: ".sidra-slider",
    parts: {
      dots: { label: "نقاط التنقل", selector: ".sidra-slider__dots" },
      slide: { label: "الشريحة", selector: ".sidra-slide" },
    },
  },
  {
    key: "buttons",
    label: "الأزرار",
    labelEn: "Buttons",
    aliases: ["الازرار", "الأزرار", "الزر", "زر الشراء", "اضف للسلة", "أضف للسلة", "button", "buttons"],
    selector: ".sidra-btn, salla-add-product-button .s-button-element",
  },
];

/* ─── النوايا المدعومة ───────────────────────────────────────────────── */

export type IntentKind =
  | "background" | "textColor" | "borderColor"
  | "radius" | "spacing" | "gap" | "fontSize" | "fontWeight"
  | "hide" | "show" | "sticky" | "transparent"
  | "hoverLift" | "fullWidth" | "backToTop" | "smoothScroll" | "height";

export interface SidraIntent {
  kind: IntentKind;
  label: string;
  /** كلمات تدل على هذه النية */
  aliases: string[];
  /** هل تحتاج قيمة (لون / مقاس) قبل توليد الكود؟ */
  needs: "color" | "size" | "none";
  /** نوع الكود المولَّد */
  emits: "css" | "js";
  /** ينشئ عنصره بنفسه، فلا يحتاج مكوّنًا مستهدفًا */
  selfContained?: boolean;
}

export const SIDRA_INTENTS: SidraIntent[] = [
  { kind: "background", label: "تغيير لون الخلفية", needs: "color", emits: "css",
    aliases: ["لون الخلفيه", "لون الخلفية", "الخلفيه", "الخلفية", "خلفيه", "خلفية", "background"] },
  { kind: "textColor", label: "تغيير لون النص", needs: "color", emits: "css",
    aliases: ["لون النص", "لون الخط", "لون الكتابه", "لون الكتابة", "النص", "text color", "color", "اللون", "لون"] },
  { kind: "borderColor", label: "تغيير لون الحدود", needs: "color", emits: "css",
    aliases: ["لون الحدود", "الاطار", "الإطار", "border"] },
  { kind: "radius", label: "تدوير الحواف", needs: "size", emits: "css",
    aliases: ["حواف", "الحواف", "دائري", "دائريه", "دائرية", "تدوير", "radius", "مدور"] },
  { kind: "spacing", label: "تعديل المسافات الداخلية", needs: "size", emits: "css",
    aliases: ["المسافه الداخليه", "المسافة الداخلية", "padding", "حشو"] },
  { kind: "gap", label: "تعديل المسافة بين الأقسام", needs: "size", emits: "css",
    aliases: ["المسافه بين", "المسافة بين", "الفراغ بين", "gap", "تباعد"] },
  { kind: "fontSize", label: "تعديل حجم الخط", needs: "size", emits: "css",
    aliases: ["حجم الخط", "كبر", "كبّر", "صغر", "صغّر", "font size", "حجم"] },
  { kind: "fontWeight", label: "تعديل سماكة الخط", needs: "size", emits: "css",
    aliases: ["سماكه", "سماكة", "عريض", "غامق", "bold", "font weight"] },
  { kind: "height", label: "تعديل الارتفاع", needs: "size", emits: "css",
    aliases: ["ارتفاع", "الارتفاع", "ارتفاعه", "طول", "height"] },
  { kind: "hide", label: "إخفاء العنصر", needs: "none", emits: "css",
    aliases: ["اخفي", "أخفِ", "إخفاء", "اخفاء", "شيل", "احذف", "hide", "remove"] },
  { kind: "show", label: "إظهار العنصر", needs: "none", emits: "css",
    aliases: ["اظهر", "أظهر", "إظهار", "اظهار", "show"] },
  { kind: "sticky", label: "تثبيت أثناء التمرير", needs: "none", emits: "css",
    aliases: ["ثابت", "تثبيت", "يثبت", "sticky", "fixed"] },
  { kind: "transparent", label: "جعل الخلفية شفافة", needs: "none", emits: "css",
    aliases: ["شفاف", "شفافه", "شفافة", "transparent"] },
  { kind: "hoverLift", label: "تأثير عند مرور المؤشر", needs: "none", emits: "css",
    aliases: ["حركه", "حركة", "تاثير", "تأثير", "هوفر", "عند المرور", "hover", "animation"] },
  { kind: "fullWidth", label: "عرض كامل", needs: "none", emits: "css",
    aliases: ["عرض كامل", "بعرض كامل", "full width", "ياخد العرض"] },
  { kind: "backToTop", label: "زر العودة للأعلى", needs: "none", emits: "js", selfContained: true,
    aliases: ["العوده للاعلى", "العودة للأعلى", "زر يرجع لاعلى", "back to top", "الرجوع للاعلى"] },
  { kind: "smoothScroll", label: "تمرير سلس", needs: "none", emits: "js", selfContained: true,
    aliases: ["تمرير سلس", "سكرول سلس", "smooth scroll"] },
];

/* الصفحات التي يمكن حصر التعديل فيها — تعتمد على ما يضعه الثيم على <body> */
export const PAGE_SCOPES: Record<Exclude<PageScope, "all">, { label: string; selector: string }> = {
  home: { label: "الصفحة الرئيسية", selector: "body.index" },
  product: { label: "صفحة المنتج", selector: "body.product-single" },
  category: { label: "صفحة التصنيف", selector: "body.product-index" },
  cart: { label: "صفحة السلة", selector: "body.cart" },
  blog: { label: "المدونة", selector: "body.blog-index, body.blog-single" },
};
