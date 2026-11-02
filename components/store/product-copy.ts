import type { Product } from "@/lib/store-data";

export type Lang = "ar" | "en" | "fr";

export function toLang(locale: string): Lang {
  return locale === "ar" || locale === "fr" ? locale : "en";
}

/* French copy is not authored per product, so French reads the English. */
export const productName = (p: Product, lang: Lang) => (lang === "ar" ? p.nameAr : p.nameEn);
export const productShort = (p: Product, lang: Lang) => (lang === "ar" ? p.shortDescAr : p.shortDescEn);
export const productBody = (p: Product, lang: Lang) => (lang === "ar" ? p.descriptionAr : p.descriptionEn);

/* Western digits, as Saudi banks and fintechs set prices. */
export const formatPrice = (n: number) => n.toLocaleString("en-US");

export function daysLabel(n: number, lang: Lang) {
  if (lang === "ar") return `${n} ${n >= 3 && n <= 10 ? "أيام" : "يومًا"}`;
  return `${n} ${lang === "fr" ? "jours" : "days"}`;
}

/* The WhatsApp message an order opens with. Name and price are written in,
   so the first reply can be a confirmation rather than a question. */
export function orderMessage(p: Product, lang: Lang) {
  const price = `${formatPrice(p.price)} ${lang === "ar" ? "ر.س" : "SAR"}${p.isMonthly ? (lang === "ar" ? " شهريًا" : " / month") : ""}`;
  if (lang === "ar") return `مرحبًا، أريد طلب: ${p.nameAr} (${price}).`;
  if (lang === "fr") return `Bonjour, je souhaite commander : ${p.nameEn} (${price}).`;
  return `Hello, I would like to order: ${p.nameEn} (${price}).`;
}

export function questionMessage(p: Product, lang: Lang) {
  if (lang === "ar") return `مرحبًا، لدي سؤال قبل طلب: ${p.nameAr}.`;
  if (lang === "fr") return `Bonjour, j'ai une question avant de commander : ${p.nameEn}.`;
  return `Hello, I have a question before ordering: ${p.nameEn}.`;
}
