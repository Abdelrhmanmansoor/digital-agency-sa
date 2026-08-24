/* ═══════════════════════════════════════════════════════════════════════════
   BRAND REGISTRY
   Every platform, network, gateway and tool the agency actually works on,
   in one place, so no two sections ever disagree about which logos exist.

   Three sources, in order of preference:
   - "local"  — a real vector mark already in /public/logos. Best quality,
                zero network cost. Used where we hold the official file.
   - "simple" — Simple Icons' CDN (already whitelisted in next.config).
                Official monochrome glyphs, served as tiny SVGs.
   - "mark"   — drawn here as a wordmark chip. Reserved for brands Simple
                Icons does not carry: the Saudi payment rails, and Adobe,
                whose icons were withdrawn from the set over trademark.

   `url` is the brand's own site. Nothing here implies a partnership; these
   are the tools we build on and the rails the checkout accepts.
═══════════════════════════════════════════════════════════════════════════ */

export type BrandSource = "local" | "simple" | "mark";

export interface Brand {
  id: string;
  name: string;
  /** Arabic label where the brand has a commonly used Arabic name. */
  nameAr?: string;
  source: BrandSource;
  /** Simple Icons slug, or the /public path for a local file. */
  ref?: string;
  /** Brand hex, no leading hash. Drives the CDN colour and the mark chip. */
  hex: string;
  url?: string;
}

export interface BrandGroup {
  key: string;
  titleAr: string;
  titleEn: string;
  noteAr: string;
  noteEn: string;
  brands: Brand[];
}

export const BRAND_GROUPS: BrandGroup[] = [
  {
    key: "commerce",
    titleAr: "منصات التجارة الإلكترونية",
    titleEn: "E-commerce platforms",
    noteAr: "نصمّم ونطوّر ونخصّص عليها مباشرة، ونعرف حدود كل واحدة قبل أن نعدك بشيء.",
    noteEn: "We design, build and customise on these directly, and we know the limits of each before promising anything.",
    brands: [
      { id: "salla", name: "Salla", nameAr: "سلة", source: "local", ref: "/logos/salla.svg", hex: "1FCFB5", url: "https://salla.sa" },
      { id: "zid", name: "Zid", nameAr: "زد", source: "local", ref: "/logos/zid.svg", hex: "6D28D9", url: "https://zid.sa" },
      { id: "shopify", name: "Shopify", nameAr: "شوبيفاي", source: "simple", ref: "shopify", hex: "7AB55C", url: "https://www.shopify.com" },
      { id: "woocommerce", name: "WooCommerce", source: "simple", ref: "woocommerce", hex: "96588A", url: "https://woocommerce.com" },
      { id: "wordpress", name: "WordPress", source: "simple", ref: "wordpress", hex: "21759B", url: "https://wordpress.org" },
      { id: "bigcommerce", name: "BigCommerce", source: "simple", ref: "bigcommerce", hex: "121118", url: "https://www.bigcommerce.com" },
      { id: "prestashop", name: "PrestaShop", source: "simple", ref: "prestashop", hex: "DF0067", url: "https://www.prestashop.com" },
      { id: "wix", name: "Wix", source: "simple", ref: "wix", hex: "0C6EFC", url: "https://www.wix.com" },
      { id: "squarespace", name: "Squarespace", source: "simple", ref: "squarespace", hex: "000000", url: "https://www.squarespace.com" },
      { id: "webflow", name: "Webflow", source: "simple", ref: "webflow", hex: "146EF5", url: "https://webflow.com" },
      { id: "elementor", name: "Elementor", source: "simple", ref: "elementor", hex: "92003B", url: "https://elementor.com" },
    ],
  },
  {
    key: "ads",
    titleAr: "الإعلان والتحليلات",
    titleEn: "Advertising and analytics",
    noteAr: "ندير الحملات ونقيسها على المنصات نفسها التي يشتري منها جمهورك.",
    noteEn: "We run and measure campaigns on the same networks your audience buys from.",
    brands: [
      { id: "googleads", name: "Google Ads", nameAr: "إعلانات جوجل", source: "simple", ref: "googleads", hex: "4285F4", url: "https://ads.google.com" },
      { id: "meta", name: "Meta", nameAr: "ميتا", source: "simple", ref: "meta", hex: "0467DF", url: "https://www.meta.com" },
      { id: "instagram", name: "Instagram", nameAr: "إنستقرام", source: "simple", ref: "instagram", hex: "E4405F", url: "https://www.instagram.com" },
      { id: "snapchat", name: "Snapchat", nameAr: "سناب شات", source: "simple", ref: "snapchat", hex: "FFFC00", url: "https://www.snapchat.com" },
      { id: "tiktok", name: "TikTok", nameAr: "تيك توك", source: "simple", ref: "tiktok", hex: "000000", url: "https://www.tiktok.com" },
      { id: "x", name: "X", source: "simple", ref: "x", hex: "000000", url: "https://x.com" },
      { id: "youtube", name: "YouTube", nameAr: "يوتيوب", source: "simple", ref: "youtube", hex: "FF0000", url: "https://www.youtube.com" },
      { id: "pinterest", name: "Pinterest", source: "simple", ref: "pinterest", hex: "BD081C", url: "https://www.pinterest.com" },
      { id: "ga", name: "Google Analytics", nameAr: "تحليلات جوجل", source: "simple", ref: "googleanalytics", hex: "E37400", url: "https://analytics.google.com" },
      { id: "gtm", name: "Tag Manager", source: "simple", ref: "googletagmanager", hex: "246FDB", url: "https://tagmanager.google.com" },
      { id: "gsc", name: "Search Console", source: "simple", ref: "googlesearchconsole", hex: "458CF5", url: "https://search.google.com/search-console" },
      { id: "gmaps", name: "Google Maps", nameAr: "خرائط جوجل", source: "simple", ref: "googlemaps", hex: "4285F4", url: "https://maps.google.com" },
    ],
  },
  {
    key: "payments",
    titleAr: "بوابات الدفع والشحن",
    titleEn: "Payment and checkout rails",
    noteAr: "نربط المتجر ببوابات الدفع المعتمدة في السعودية والخليج، ونختبر كل مسار قبل الإطلاق.",
    noteEn: "We connect the store to the gateways licensed across Saudi Arabia and the Gulf, and test every path before launch.",
    brands: [
      { id: "mada", name: "mada", nameAr: "مدى", source: "mark", hex: "1A4F9C", url: "https://www.mada.com.sa" },
      { id: "visa", name: "VISA", source: "simple", ref: "visa", hex: "1A1F71", url: "https://www.visa.com" },
      { id: "mastercard", name: "Mastercard", source: "simple", ref: "mastercard", hex: "EB001B", url: "https://www.mastercard.com" },
      { id: "applepay", name: "Apple Pay", source: "simple", ref: "applepay", hex: "000000", url: "https://www.apple.com/apple-pay/" },
      { id: "stcpay", name: "STC Pay", nameAr: "إس تي سي باي", source: "mark", hex: "4F008C", url: "https://stcpay.com.sa" },
      { id: "tamara", name: "Tamara", nameAr: "تمارا", source: "mark", hex: "1F1246", url: "https://tamara.co" },
      { id: "tabby", name: "Tabby", nameAr: "تابي", source: "mark", hex: "3EEDBF", url: "https://tabby.ai" },
      { id: "paypal", name: "PayPal", source: "simple", ref: "paypal", hex: "003087", url: "https://www.paypal.com" },
      { id: "stripe", name: "Stripe", source: "simple", ref: "stripe", hex: "635BFF", url: "https://stripe.com" },
    ],
  },
  {
    key: "craft",
    titleAr: "أدوات التصميم والتطوير",
    titleEn: "Design and engineering stack",
    noteAr: "الأدوات التي يخرج منها العمل فعليًا — من أول ملف تصميم حتى النشر على الإنتاج.",
    noteEn: "The tools the work actually comes out of, from the first design file to production.",
    brands: [
      { id: "figma", name: "Figma", source: "simple", ref: "figma", hex: "F24E1E", url: "https://www.figma.com" },
      { id: "photoshop", name: "Photoshop", source: "mark", hex: "31A8FF", url: "https://www.adobe.com/products/photoshop.html" },
      { id: "illustrator", name: "Illustrator", source: "mark", hex: "FF9A00", url: "https://www.adobe.com/products/illustrator.html" },
      { id: "aftereffects", name: "After Effects", source: "mark", hex: "9999FF", url: "https://www.adobe.com/products/aftereffects.html" },
      { id: "blender", name: "Blender", source: "simple", ref: "blender", hex: "E87D0D", url: "https://www.blender.org" },
      { id: "nextjs", name: "Next.js", source: "simple", ref: "nextdotjs", hex: "000000", url: "https://nextjs.org" },
      { id: "react", name: "React", source: "simple", ref: "react", hex: "61DAFB", url: "https://react.dev" },
      { id: "typescript", name: "TypeScript", source: "simple", ref: "typescript", hex: "3178C6", url: "https://www.typescriptlang.org" },
      { id: "tailwind", name: "Tailwind CSS", source: "simple", ref: "tailwindcss", hex: "06B6D4", url: "https://tailwindcss.com" },
      { id: "node", name: "Node.js", source: "simple", ref: "nodedotjs", hex: "5FA04E", url: "https://nodejs.org" },
      { id: "vercel", name: "Vercel", source: "simple", ref: "vercel", hex: "000000", url: "https://vercel.com" },
      { id: "cloudflare", name: "Cloudflare", source: "simple", ref: "cloudflare", hex: "F38020", url: "https://www.cloudflare.com" },
    ],
  },
  {
    key: "automation",
    titleAr: "الأتمتة وربط الأنظمة",
    titleEn: "Automation and integrations",
    noteAr: "نربط المتجر بأدوات التشغيل والتسويق حتى تتوقف المهام المتكررة عن استهلاك وقت فريقك.",
    noteEn: "We wire the store into the operational and marketing tools so repetitive work stops consuming your team's time.",
    brands: [
      { id: "zapier", name: "Zapier", source: "simple", ref: "zapier", hex: "FF4F00", url: "https://zapier.com" },
      { id: "make", name: "Make", source: "simple", ref: "make", hex: "6D00CC", url: "https://www.make.com" },
      { id: "n8n", name: "n8n", source: "simple", ref: "n8n", hex: "EA4B71", url: "https://n8n.io" },
      { id: "airtable", name: "Airtable", source: "simple", ref: "airtable", hex: "18BFFF", url: "https://airtable.com" },
      { id: "notion", name: "Notion", source: "simple", ref: "notion", hex: "000000", url: "https://www.notion.so" },
      { id: "hubspot", name: "HubSpot", source: "simple", ref: "hubspot", hex: "FF7A59", url: "https://www.hubspot.com" },
      { id: "mailchimp", name: "Mailchimp", source: "simple", ref: "mailchimp", hex: "FFE01B", url: "https://mailchimp.com" },
      { id: "whatsapp", name: "WhatsApp Business", nameAr: "واتساب للأعمال", source: "simple", ref: "whatsapp", hex: "25D366", url: "https://business.whatsapp.com" },
    ],
  },
];

/** Flat lookup for the places that need one brand rather than a group. */
export const BRANDS: Record<string, Brand> = Object.fromEntries(
  BRAND_GROUPS.flatMap((group) => group.brands.map((brand) => [brand.id, brand]))
);

/** The rails the checkout accepts, for the footer and the trust rows. */
export const CHECKOUT_BRANDS = ["mada", "visa", "mastercard", "applepay", "stcpay", "tamara", "tabby"].map(
  (id) => BRANDS[id]
);

/** The commerce platforms, for the compact rows on the home and store pages. */
export const PLATFORM_BRANDS = ["salla", "zid", "shopify", "woocommerce", "wordpress", "webflow"].map(
  (id) => BRANDS[id]
);
