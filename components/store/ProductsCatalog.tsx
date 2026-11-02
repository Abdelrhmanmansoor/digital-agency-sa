"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORIES, PRODUCTS, type Product } from "@/lib/store-data";
import { getWhatsAppLink } from "@/lib/utils";
import { orderMessage, productName, productShort, daysLabel, formatPrice, type Lang } from "./product-copy";
import styles from "./Products.module.css";

/* The catalogue, without a cart. Each card does two things: open the full
   product page, or start the order on WhatsApp with the product name and
   price already written into the message. */

const copy = {
  ar: { all: "الكل", from: "يبدأ من", sar: "ر.س", month: "/ شهريًا", order: "اطلب عبر واتساب", details: "التفاصيل", popular: "الأكثر طلبًا", count: "منتج" },
  en: { all: "All", from: "From", sar: "SAR", month: "/ month", order: "Order on WhatsApp", details: "Details", popular: "Most requested", count: "products" },
  fr: { all: "Tout", from: "Dès", sar: "SAR", month: "/ mois", order: "Commander sur WhatsApp", details: "Détails", popular: "Le plus demandé", count: "produits" },
} as const;

export default function ProductsCatalog({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [active, setActive] = useState("all");

  const items = useMemo(
    () => [...PRODUCTS].filter((p) => active === "all" || p.category === active).sort((a, b) => a.order - b.order),
    [active]
  );

  return (
    <div>
      <div className={styles.filters} role="tablist" aria-label={lang === "ar" ? "تصنيفات المنتجات" : "Product categories"}>
        {CATEGORIES.map((c) => {
          const count = c.key === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c.key).length;
          return (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={active === c.key}
              className={styles.filter}
              onClick={() => setActive(c.key)}
            >
              {c.key === "all" ? t.all : lang === "ar" ? c.labelAr : c.labelEn}
              <span>{count}</span>
            </button>
          );
        })}
      </div>

      <ProductsGrid products={items} lang={lang} />
    </div>
  );
}

export function ProductsGrid({ products, lang }: { products: Product[]; lang: Lang }) {
  const t = copy[lang];
  return (
    <div className={styles.grid}>
      {products.map((p) => (
        <Card key={p.id} product={p} lang={lang} t={t} />
      ))}
    </div>
  );
}

function Card({ product: p, lang, t }: { product: Product; lang: Lang; t: (typeof copy)[Lang] }) {
  const href = `/${lang}/store/${p.slug}`;
  return (
    <article className={styles.card} data-featured={p.badge === "bestseller" || undefined}>
      <div className={styles.cardTop}>
        <span className={styles.cardDays}>{p.isMonthly ? (lang === "ar" ? "اشتراك شهري" : lang === "fr" ? "Mensuel" : "Monthly") : daysLabel(p.deliveryDays, lang)}</span>
        {p.badge === "bestseller" && <span className={styles.cardBadge}>{t.popular}</span>}
      </div>
      <h3 className={styles.cardTitle}>
        <Link href={href}>{productName(p, lang)}</Link>
      </h3>
      <p className={styles.cardText}>{productShort(p, lang)}</p>
      <ul className={styles.cardPoints}>
        {p.features.slice(0, 3).map((f) => (
          <li key={f.en}>{lang === "ar" ? f.ar : f.en}</li>
        ))}
      </ul>
      <div className={styles.cardPrice}>
        <span>{t.from}</span>
        <strong>{formatPrice(p.price)}</strong>
        <small>{t.sar}</small>
        {p.isMonthly && <em>{t.month}</em>}
      </div>
      <div className={styles.cardActions}>
        <a href={getWhatsAppLink(orderMessage(p, lang))} target="_blank" rel="noopener noreferrer" className={styles.cardOrder}>
          {t.order}
        </a>
        <Link href={href} className={styles.cardMore}>
          {t.details}
        </Link>
      </div>
    </article>
  );
}
