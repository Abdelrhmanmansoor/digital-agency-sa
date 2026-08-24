/* ═══════════════════════════════════════════════════════════════════════════
   ONE INFORMATION ARCHITECTURE
   The header, the mobile drawer, the footer and the search palette all read
   from this file. Before it existed each of those declared its own link list
   and they had already drifted apart — the homepage header offered six
   destinations, the inner-page header seven, the footer a different nine,
   and three of them pointed at anchors that no longer existed.
═══════════════════════════════════════════════════════════════════════════ */

export type Loc = "ar" | "en" | "fr";

type L3 = { ar: string; en: string; fr: string };

export interface NavLeaf {
  /** Locale-relative, e.g. "/store" or "/#services". `l()` prefixes it. */
  href: string;
  label: L3;
  /** One line shown in the desktop dropdown and the search palette. */
  hint?: L3;
  badge?: L3;
}

export interface NavGroup {
  label: L3;
  href?: string;
  children?: NavLeaf[];
}

/** Prefix a locale-relative href. Anchors on the home page keep working. */
export function l(locale: string, href: string) {
  if (/^(https?:|mailto:|tel:)/.test(href)) return href;
  return `/${locale}${href === "/" ? "" : href}`;
}

export function pick(v: L3, locale: string) {
  return v[(locale in v ? locale : "en") as Loc];
}

/* ─── Services: the eight tracks the site actually delivers ─── */
export const SERVICE_LINKS: NavLeaf[] = [
  {
    href: "/store/salla-store-setup",
    label: { ar: "تجهيز متجر سلة", en: "Salla store setup", fr: "Boutique Salla" },
    hint: { ar: "متجر كامل جاهز للبيع من الصفر", en: "A complete store, ready to sell", fr: "Boutique complète, prête à vendre" },
  },
  {
    href: "/store/salla-custom-theme",
    label: { ar: "ثيم سلة مخصص", en: "Custom Salla theme", fr: "Thème Salla sur mesure" },
    hint: { ar: "واجهة مبنية حول علامتك وحدها", en: "A storefront built around your brand", fr: "Une vitrine à votre image" },
  },
  {
    href: "/store/store-seo",
    label: { ar: "تحسين التحويل وSEO", en: "Conversion & SEO", fr: "Conversion & SEO" },
    hint: { ar: "زيارات أكثر، وطلبات أكثر من نفس الزيارات", en: "More traffic, more orders from it", fr: "Plus de trafic, plus de commandes" },
  },
  {
    href: "/store/digital-marketing",
    label: { ar: "التسويق وإدارة الحملات", en: "Marketing & campaigns", fr: "Marketing & campagnes" },
    hint: { ar: "حملات Google وMeta وSnapchat بقياس مستمر", en: "Google, Meta and Snapchat, measured", fr: "Google, Meta et Snapchat, mesurés" },
  },
  {
    href: "/store/brand-identity-design",
    label: { ar: "الهوية البصرية", en: "Brand identity", fr: "Identité visuelle" },
    hint: { ar: "هوية متماسكة عبر كل نقطة تواصل", en: "One identity across every touchpoint", fr: "Une identité cohérente partout" },
  },
  {
    href: "/store/custom-app-development",
    label: { ar: "التطبيقات والمنصات المخصصة", en: "Custom apps & platforms", fr: "Applications sur mesure" },
    hint: { ar: "أنظمة مبنية حول طريقة عمل مشروعك", en: "Systems shaped around how you work", fr: "Des systèmes adaptés à vous" },
  },
  {
    href: "/store/automation-workflows",
    label: { ar: "الأتمتة وربط الأنظمة", en: "Automation & integrations", fr: "Automatisation & intégrations" },
    hint: { ar: "أقل عمل يدوي وأقل أخطاء تشغيلية", en: "Less manual work, fewer errors", fr: "Moins de travail manuel" },
  },
  {
    href: "/store/ai-product-photography",
    label: { ar: "التصوير بالذكاء الاصطناعي", en: "AI product photography", fr: "Photographie IA" },
    hint: { ar: "صور منتجات بجودة استوديو دون استوديو", en: "Studio-grade product shots, no studio", fr: "Photos studio, sans studio" },
  },
];

/* ─── Sector solutions: full landing pages, not store items ─── */
export const SOLUTION_LINKS: NavLeaf[] = [
  {
    href: "/solutions/legal",
    label: { ar: "مواقع المحامين ومكاتب المحاماة", en: "Law firm websites", fr: "Sites pour cabinets d'avocats" },
    hint: { ar: "موقع يبني الثقة ويحجز الاستشارات", en: "A site that earns trust and books consultations", fr: "Un site qui inspire confiance" },
    badge: { ar: "جديد", en: "New", fr: "Nouveau" },
  },
  {
    href: "/sidra-theme",
    label: { ar: "ثيم سِدرة لمنصة سلة", en: "SIDRA theme for Salla", fr: "Thème SIDRA pour Salla" },
    hint: { ar: "منتجنا الخاص: 46 مكوّنًا وتوثيق كامل", en: "Our own product: 46 blocks, fully documented", fr: "Notre produit : 46 blocs documentés" },
  },
];

/* ─── Primary navigation ─── */
export const PRIMARY_NAV: NavGroup[] = [
  {
    label: { ar: "الخدمات", en: "Services", fr: "Services" },
    href: "/#services",
    children: SERVICE_LINKS,
  },
  {
    label: { ar: "الحلول", en: "Solutions", fr: "Solutions" },
    children: SOLUTION_LINKS,
  },
  { label: { ar: "المتجر", en: "Store", fr: "Boutique" }, href: "/store" },
  { label: { ar: "أعمالنا", en: "Work", fr: "Réalisations" }, href: "/#work" },
  { label: { ar: "المدونة", en: "Blog", fr: "Blog" }, href: "/blog" },
];

/* ─── Footer-only link sets ─── */
export const COMPANY_LINKS: NavLeaf[] = [
  { href: "/#services", label: { ar: "ما نقدمه", en: "What we do", fr: "Ce que nous faisons" } },
  { href: "/#process", label: { ar: "طريقة العمل", en: "How we work", fr: "Notre méthode" } },
  { href: "/#work", label: { ar: "نماذج أعمال", en: "Selected work", fr: "Réalisations" } },
  { href: "/#faq", label: { ar: "الأسئلة الشائعة", en: "FAQ", fr: "FAQ" } },
  { href: "/#contact", label: { ar: "تواصل معنا", en: "Contact", fr: "Contact" } },
];

export const ACCOUNT_LINKS: NavLeaf[] = [
  { href: "/store", label: { ar: "متجر الخدمات", en: "Services store", fr: "Boutique de services" } },
  { href: "/store/cart", label: { ar: "سلة المشتريات", en: "Cart", fr: "Panier" } },
  { href: "/dashboard", label: { ar: "بوابة العملاء", en: "Client portal", fr: "Espace client" } },
  { href: "/dashboard/orders", label: { ar: "متابعة الطلبات", en: "Track orders", fr: "Suivi des commandes" } },
];

export const LEGAL_LINKS: NavLeaf[] = [
  { href: "/policy", label: { ar: "الشروط وسياسة الخصوصية", en: "Terms & privacy", fr: "Conditions & confidentialité" } },
];
