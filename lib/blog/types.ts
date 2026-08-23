/* Blog data model.
   Articles are grouped into clusters that mirror how a merchant's questions
   actually arrive — the taxonomy of Salla's own help centre — rather than the
   four loose tags the blog used before. Each cluster is a pillar; the
   articles inside it link to each other, which is what builds topical
   authority instead of fifty unrelated posts. */

export type ClusterId =
  | "start"
  | "catalog"
  | "orders"
  | "payments"
  | "shipping"
  | "design"
  | "marketing"
  | "seo";

export type Article = {
  /** URL slug — also the article id. */
  id: string;
  cluster: ClusterId;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  /** ISO date. */
  date: string;
  readTime: number;
  contentAr: string;
  contentEn: string;
};

export type Cluster = {
  id: ClusterId;
  ar: string;
  en: string;
  fr: string;
  /** One line on what a merchant gets from this cluster. */
  blurbAr: string;
  blurbEn: string;
};

export const CLUSTERS: Cluster[] = [
  {
    id: "start",
    ar: "التأسيس والانطلاق",
    en: "Setup & launch",
    fr: "Création et lancement",
    blurbAr: "اختيار المنصة، التوثيق، الدومين، والقرارات التي يصعب التراجع عنها لاحقًا.",
    blurbEn: "Choosing a platform, verification, domains, and the decisions that are hard to undo later.",
  },
  {
    id: "catalog",
    ar: "المنتجات والكتالوج",
    en: "Products & catalogue",
    fr: "Produits et catalogue",
    blurbAr: "رفع المنتجات وخياراتها والمخزون بطريقة تقلّل الإرجاع وتسهّل التشغيل.",
    blurbEn: "Products, options and inventory set up to cut returns and simplify operations.",
  },
  {
    id: "orders",
    ar: "الطلبات والتشغيل",
    en: "Orders & operations",
    fr: "Commandes et opérations",
    blurbAr: "دورة الطلب من السلة المتروكة حتى الإرجاع، وما تقوله التقارير فعلًا.",
    blurbEn: "The order cycle from abandoned cart to return, and what the reports actually say.",
  },
  {
    id: "payments",
    ar: "الدفع والفوترة",
    en: "Payments & invoicing",
    fr: "Paiement et facturation",
    blurbAr: "بوابات الدفع والتقسيط والضريبة والفوترة الإلكترونية في السوق السعودي.",
    blurbEn: "Gateways, BNPL, VAT and e-invoicing in the Saudi market.",
  },
  {
    id: "shipping",
    ar: "الشحن والتوصيل",
    en: "Shipping & delivery",
    fr: "Livraison",
    blurbAr: "حساب الشحن واختيار الناقل وبوالص الشحن ومناطق التوصيل.",
    blurbEn: "Rate calculation, carrier choice, waybills and delivery zones.",
  },
  {
    id: "design",
    ar: "التصميم والثيمات",
    en: "Design & themes",
    fr: "Design et thèmes",
    blurbAr: "الواجهة وصفحة المنتج والهوية — ما يبني الثقة في أول عشر ثوانٍ.",
    blurbEn: "Storefront, product page and identity — what earns trust in the first ten seconds.",
  },
  {
    id: "marketing",
    ar: "التسويق والإعلانات",
    en: "Marketing & ads",
    fr: "Marketing et publicité",
    blurbAr: "الكوبونات والعروض والبكسلات والحملات وبرامج الولاء.",
    blurbEn: "Coupons, offers, pixels, campaigns and loyalty programmes.",
  },
  {
    id: "seo",
    ar: "الظهور في البحث",
    en: "Search visibility",
    fr: "Visibilité sur les moteurs",
    blurbAr: "سيو المتاجر: صفحات المنتجات والتصنيفات والسرعة وأدوات القياس.",
    blurbEn: "E-commerce SEO: product and category pages, speed and measurement.",
  },
];

export function clusterOf(id: ClusterId): Cluster {
  return CLUSTERS.find((c) => c.id === id) ?? CLUSTERS[0];
}
