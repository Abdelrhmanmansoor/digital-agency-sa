/* ═══════════════════════════════════════════════════════════════════════
   SERVICE CATEGORIES — the visual index on the home page.
   Each category opens the product that delivers it. Where no product has a
   published price yet, the card opens WhatsApp with the category already
   named in the message instead of sending the visitor to a page that would
   only say "ask us".
   ═══════════════════════════════════════════════════════════════════════ */

type L = { ar: string; en: string; fr: string };

export interface ServiceCategory {
  key: string;
  image: string;
  title: L;
  /** Slug in lib/store-data.ts. Absent → the card opens WhatsApp. */
  product?: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { key: "salla-stores", image: "/categories/salla-stores.webp", product: "salla-store-setup", title: { ar: "متاجر سلة", en: "Salla stores", fr: "Boutiques Salla" } },
  { key: "zid-stores", image: "/categories/zid-stores.webp", title: { ar: "متاجر زد", en: "Zid stores", fr: "Boutiques Zid" } },
  { key: "store-design", image: "/categories/store-design.webp", product: "salla-custom-theme", title: { ar: "تصميم متاجر", en: "Store design", fr: "Design de boutique" } },
  { key: "salla-zid-themes", image: "/categories/salla-zid-themes.webp", title: { ar: "برمجة ثيمات سلة وزد", en: "Salla & Zid themes", fr: "Thèmes Salla & Zid" } },
  { key: "salla-apps", image: "/categories/salla-apps.webp", title: { ar: "برمجة تطبيقات سلة", en: "Salla apps", fr: "Applications Salla" } },
  { key: "salla-products-upload", image: "/categories/salla-products-upload.webp", title: { ar: "رفع منتجات سلة", en: "Product uploading", fr: "Mise en ligne produits" } },
  { key: "store-management", image: "/categories/store-management.webp", title: { ar: "إدارة متاجر", en: "Store management", fr: "Gestion de boutique" } },
  { key: "seo", image: "/categories/seo.webp", product: "store-seo", title: { ar: "سيو", en: "SEO", fr: "SEO" } },
  { key: "marketing-campaigns", image: "/categories/marketing-campaigns.webp", product: "digital-marketing", title: { ar: "حملات تسويقية", en: "Ad campaigns", fr: "Campagnes" } },
  { key: "social-media", image: "/categories/social-media.webp", product: "social-media-management", title: { ar: "إدارة سوشيال ميديا", en: "Social media", fr: "Réseaux sociaux" } },
  { key: "graphic-design", image: "/categories/graphic-design.webp", product: "brand-identity-design", title: { ar: "تصميم جرافيك", en: "Graphic design", fr: "Design graphique" } },
  { key: "product-photography", image: "/categories/product-photography.webp", product: "ai-product-photography", title: { ar: "تصوير المنتجات", en: "Product photography", fr: "Photo produit" } },
  { key: "web-development", image: "/categories/web-development.webp", product: "general-programming", title: { ar: "برمجة مواقع", en: "Websites", fr: "Sites web" } },
  { key: "platform-development", image: "/categories/platform-development.webp", product: "vibe-coding-services", title: { ar: "برمجة منصات", en: "Platforms", fr: "Plateformes" } },
  { key: "app-development", image: "/categories/app-development.webp", product: "custom-app-development", title: { ar: "برمجة تطبيقات", en: "Mobile apps", fr: "Applications" } },
  { key: "css-development", image: "/categories/css-development.webp", title: { ar: "برمجة CSS", en: "CSS customisation", fr: "Personnalisation CSS" } },
  { key: "automation", image: "/categories/automation.webp", product: "automation-workflows", title: { ar: "أوتوميشن", en: "Automation", fr: "Automatisation" } },
];
