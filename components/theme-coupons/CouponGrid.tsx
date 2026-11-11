"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ACTIVE_COUPONS, SECTORS, afterCoupon, type ThemeCoupon, type ThemeSector } from "@/lib/theme-coupons";
import { COPY, type Lang } from "./copy";
import styles from "./ThemeCoupons.module.css";

/* Rendered on the server like any client component, so every theme name,
   code and alt text is in the first HTML response for crawlers. Filtering
   and sorting only hide or reorder what is already there. */

const fmt = (n: number, lang: Lang) =>
  n.toLocaleString(lang === "ar" ? "ar-SA" : "en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 });

function CopyCode({ code, lang }: { code: string; lang: Lang }) {
  const t = COPY[lang];
  const [done, setDone] = useState(false);
  const onCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const codeEl = e.currentTarget.previousElementSibling;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      if (codeEl) {
        const range = document.createRange();
        range.selectNodeContents(codeEl);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
    setDone(true);
    window.setTimeout(() => setDone(false), 1800);
  };
  return (
    <div className={styles.code}>
      <code>{code}</code>
      <button type="button" onClick={onCopy} data-done={done || undefined} aria-live="polite">
        {done ? t.copied : t.copy}
      </button>
    </div>
  );
}

function Card({ theme: th, lang, priority }: { theme: ThemeCoupon; lang: Lang; priority: boolean }) {
  const t = COPY[lang];
  const name = lang === "ar" ? th.name : th.latin;
  const title = lang === "ar" ? `${t.themePrefix} ${th.name}` : `${th.latin} theme`;
  return (
    <article id={`theme-${th.slug}`} className={styles.card}>
      <figure className={styles.shot}>
        <Image
          src={`/themes/coupons/${th.slug}.webp`}
          alt={t.altFor(name, th.sector)}
          width={th.width}
          height={th.height}
          sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 300px"
          priority={priority}
        />
        <span className={styles.off}>{t.off}</span>
      </figure>
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <h3>{title}</h3>
          <span className={styles.sector}>{SECTORS[th.sector][lang]}</span>
        </div>
        <p className={styles.fit}>{t.fitFor(th.sector)}</p>
        <p className={styles.meta}>
          {th.reviews > 0 ? (
            <span>
              <b aria-hidden>★</b> {fmt(th.rating, lang)} · {fmt(th.reviews, lang)} {t.reviews}
            </span>
          ) : (
            <span>{t.newTheme}</span>
          )}
          <span>
            {t.by}: {th.developer}
          </span>
        </p>
        <div className={styles.price}>
          <span className={styles.priceLabel}>{t.afterLabel}</span>
          <strong>{fmt(afterCoupon(th.price), lang)}</strong>
          <small>{t.sar}</small>
          <s>{fmt(th.price, lang)}</s>
        </div>
      </div>
      <div className={styles.stub}>
        {th.code ? <CopyCode code={th.code} lang={lang} /> : <p className={styles.linkOnly}>{t.linkOnly}</p>}
        <div className={styles.cardActions}>
          <a href={th.link} target="_blank" rel="sponsored noopener" className={styles.buy}>
            <span className={styles.dot} aria-hidden />
            {t.buy}
          </a>
          <a href={th.demo} target="_blank" rel="nofollow noopener" className={styles.demo}>
            {t.demo} <span aria-hidden>{lang === "ar" ? "←" : "→"}</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function CouponGrid({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const [sector, setSector] = useState<ThemeSector | "all">("all");
  const [sort, setSort] = useState<"default" | "price">("default");
  const sectors = useMemo(() => Array.from(new Set(ACTIVE_COUPONS.map((x) => x.sector))), []);

  const list = useMemo(() => {
    const base = ACTIVE_COUPONS.filter((x) => sector === "all" || x.sector === sector);
    return sort === "price" ? [...base].sort((a, b) => a.price - b.price) : [...base].sort((a, b) => b.reviews - a.reviews);
  }, [sector, sort]);

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.chips} role="group" aria-label={t.filterLabel}>
          {(["all", ...sectors] as const).map((s) => (
            <button key={s} type="button" aria-pressed={sector === s} onClick={() => setSector(s)}>
              {s === "all" ? t.all : SECTORS[s][lang]}
            </button>
          ))}
        </div>
        <label className={styles.sort}>
          <span>
            {fmt(list.length, lang)} {t.countSuffix} · {t.sortLabel}
          </span>
          <select id="coupon-sort" value={sort} onChange={(e) => setSort(e.target.value as "default" | "price")}>
            <option value="default">{t.sortDefault}</option>
            <option value="price">{t.sortPrice}</option>
          </select>
        </label>
      </div>
      <div className={styles.grid}>
        {list.map((th, i) => (
          <Card key={th.slug} theme={th} lang={lang} priority={i < 2} />
        ))}
      </div>
    </>
  );
}
