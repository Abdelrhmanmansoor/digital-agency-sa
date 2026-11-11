/* ═══════════════════════════════════════════════════════════════════════════
   SALLA THEME COUPONS
   Fourteen paid themes from the Salla theme store, each with its own 20%
   affiliate coupon and tracked link. Prices, ratings and demo stores were
   read from the public Salla marketplace API on 11 November 2026; the
   thumbnails in /public/themes/coupons are the store's own listing images.

   To refresh a price, edit `price` here and bump UPDATED. To retire a
   theme, set `active: false` rather than deleting it, so the page and the
   structured data drop it together.
═══════════════════════════════════════════════════════════════════════════ */

export const COUPON_DISCOUNT = 0.2;
export const COUPONS_UPDATED = "2026-11-11";

export type ThemeSector = "fashion" | "electronics" | "beauty" | "digital";

export interface ThemeCoupon {
  slug: string;
  name: string;
  /** Latin spelling, used in English copy and image alt text. */
  latin: string;
  /** Affiliate link (mtjr.at) that opens the theme page in Salla. */
  link: string;
  /** Empty when the discount rides on the link alone. */
  code: string;
  /** Current Salla store price in SAR, before the coupon. */
  price: number;
  /** Salla's list price before the store's own sale, in SAR. */
  listPrice: number;
  developer: string;
  sector: ThemeSector;
  rating: number;
  reviews: number;
  demo: string;
  width: number;
  height: number;
  active: boolean;
}

export const SECTORS: Record<ThemeSector, { ar: string; en: string; arFor: string; enFor: string }> = {
  fashion: { ar: "أزياء", en: "Fashion", arFor: "متاجر الأزياء والعبايات والملابس", enFor: "fashion, abaya and clothing stores" },
  electronics: { ar: "إلكترونيات", en: "Electronics", arFor: "متاجر الإلكترونيات والجوالات والإكسسوارات", enFor: "electronics, phone and accessory stores" },
  beauty: { ar: "تجميل وعناية", en: "Beauty & care", arFor: "متاجر العطور ومستحضرات التجميل والعناية", enFor: "perfume, cosmetics and skincare stores" },
  digital: { ar: "منتجات رقمية", en: "Digital products", arFor: "متاجر المنتجات الرقمية والبطاقات والاشتراكات", enFor: "digital product, gift card and subscription stores" },
};

export const THEME_COUPONS: ThemeCoupon[] = [
  { slug: "rabeh", name: "رابح", latin: "Rabeh", link: "https://mtjr.at/6af4d5fc54ai4y", code: "F-KKNCGWAK", price: 285, listPrice: 1594.86, developer: "ESLAM FARAG", sector: "electronics", rating: 5, reviews: 58, demo: "https://demostore.salla.sa/intend/1764966468", width: 960, height: 672, active: true },
  { slug: "qafila", name: "قافلة", latin: "Qafila", link: "https://mtjr.at/6af4d5d1s1e0xt", code: "", price: 454.86, listPrice: 1140, developer: "Abdullah Al Katheri", sector: "fashion", rating: 5, reviews: 2, demo: "https://demostore.salla.sa/intend/611868670", width: 800, height: 600, active: true },
  { slug: "yafa", name: "يافا", latin: "Yafa", link: "https://mtjr.at/6af4d5bftd8vl9", code: "F-KID2O7HX", price: 285, listPrice: 900.6, developer: "BAYO LTD", sector: "electronics", rating: 4.2, reviews: 152, demo: "https://demostore.salla.sa/intend/354131965", width: 960, height: 720, active: true },
  { slug: "aali", name: "عالي", latin: "Aali", link: "https://mtjr.at/6af4d5ac0zbb9i", code: "F-EXAQG3QP", price: 296.4, listPrice: 855, developer: "مؤسسة عادل الجهمي لتقنية المعلومات", sector: "digital", rating: 5, reviews: 1554, demo: "https://demostore.salla.sa/intend/1820544654", width: 960, height: 540, active: true },
  { slug: "mohra", name: "مهرة", latin: "Mohra", link: "https://mtjr.at/6af4d572ootzp2", code: "F-F2BYTYVS", price: 340.86, listPrice: 1138.86, developer: "عبدالله عبدالسلام", sector: "beauty", rating: 5, reviews: 7, demo: "https://demostore.salla.sa/intend/968306559", width: 960, height: 720, active: true },
  { slug: "mazaya", name: "مزايا", latin: "Mazaya", link: "https://mtjr.at/6af4d5579ew0la", code: "F-QLKC2UHA", price: 340.86, listPrice: 454.86, developer: "عبدالله عبدالسلام", sector: "fashion", rating: 5, reviews: 10, demo: "https://demostore.salla.sa/intend/733574013", width: 960, height: 720, active: true },
  { slug: "tamara", name: "تمارا", latin: "Tamara", link: "https://mtjr.at/6af4d548svcr1c", code: "F-LUKHNXTM", price: 340.86, listPrice: 1113.78, developer: "عبدالله عبدالسلام", sector: "fashion", rating: 5, reviews: 10, demo: "https://demostore.salla.sa/intend/1574574069", width: 960, height: 720, active: true },
  { slug: "malak", name: "ملاك", latin: "Malak", link: "https://mtjr.at/6af4d53942fbx1", code: "F-RRYHTXRF", price: 342, listPrice: 855, developer: "أفتر أدز", sector: "electronics", rating: 4.9, reviews: 1048, demo: "https://demostore.salla.sa/intend/1622417040", width: 960, height: 539, active: true },
  { slug: "najm", name: "نجم", latin: "Najm", link: "https://mtjr.at/6af4d514b574wt", code: "F-1PXIR4ZB", price: 296.4, listPrice: 1140, developer: "مؤسسة عادل الجهمي لتقنية المعلومات", sector: "beauty", rating: 5, reviews: 26, demo: "https://demostore.salla.sa/intend/1368204236", width: 960, height: 720, active: true },
  { slug: "faeq", name: "فائق", latin: "Faeq", link: "https://mtjr.at/6af4d4fbs7kdgs", code: "F-OMQYFSDY", price: 342, listPrice: 342, developer: "Madar Technical Solutions FZC", sector: "electronics", rating: 0, reviews: 0, demo: "https://demostore.salla.sa/intend/1637672648", width: 960, height: 720, active: true },
  { slug: "art", name: "آرت", latin: "Art", link: "https://mtjr.at/6af4d4ef4j07wg", code: "F-J0WWIOIB", price: 296.4, listPrice: 1824, developer: "كرافو لتقنية المعلومات", sector: "fashion", rating: 4.5, reviews: 68, demo: "https://demostore.salla.sa/intend/1598627722", width: 960, height: 540, active: true },
  { slug: "shohra", name: "شهرة", latin: "Shohra", link: "https://mtjr.at/6af4d4d47stw6y", code: "F-HVLC0G70", price: 340.86, listPrice: 454.86, developer: "عبدالله عبدالسلام", sector: "fashion", rating: 5, reviews: 15, demo: "https://demostore.salla.sa/intend/2135416433", width: 960, height: 720, active: true },
  { slug: "saji", name: "ساجي", latin: "Saji", link: "https://mtjr.at/6af4d47fyi1n5o", code: "F-SMC00N63", price: 395.58, listPrice: 1026, developer: "Ahmed Abdel Hamid", sector: "fashion", rating: 5, reviews: 200, demo: "https://demostore.salla.sa/intend/1967897340", width: 960, height: 540, active: true },
  { slug: "selia", name: "سيليا", latin: "Selia", link: "https://mtjr.at/6af376fb7imu3i", code: "F-JLII0ZOP", price: 395.58, listPrice: 763.8, developer: "Selia Tech", sector: "fashion", rating: 5, reviews: 1390, demo: "https://demostore.salla.sa/intend/1886435134", width: 960, height: 480, active: true },
];

export const ACTIVE_COUPONS = THEME_COUPONS.filter((t) => t.active);

export const afterCoupon = (price: number) => Math.round(price * (1 - COUPON_DISCOUNT) * 100) / 100;
