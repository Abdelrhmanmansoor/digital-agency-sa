"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { PRODUCTS } from "@/lib/store-data";
import { PRIMARY_NAV, SERVICE_LINKS, SOLUTION_LINKS, l, pick } from "@/lib/navigation";
import styles from "./HeaderSearch.module.css";

const copy = {
  ar: {
    title: "البحث في الموقع",
    placeholder: "ابحث عن خدمة، باقة، أو صفحة…",
    services: "الخدمات والباقات",
    pages: "الصفحات",
    empty: "لا توجد نتائج مطابقة.",
    browse: "تصفّح متجر الخدمات",
    nav: "للتنقل",
    open: "للفتح",
    close: "للإغلاق",
    sar: "ر.س",
  },
  en: {
    title: "Search the site",
    placeholder: "Search a service, package or page…",
    services: "Services and packages",
    pages: "Pages",
    empty: "No matching results.",
    browse: "Browse the services store",
    nav: "to navigate",
    open: "to open",
    close: "to close",
    sar: "SAR",
  },
  fr: {
    title: "Rechercher",
    placeholder: "Chercher un service, une offre ou une page…",
    services: "Services et offres",
    pages: "Pages",
    empty: "Aucun résultat.",
    browse: "Parcourir la boutique",
    nav: "naviguer",
    open: "ouvrir",
    close: "fermer",
    sar: "SAR",
  },
} as const;

type Hit = { href: string; title: string; hint?: string; price?: number; kind: "product" | "page" };

/* Match on a normalised haystack rather than the raw string: Arabic search
   terms arrive with and without diacritics, with alef variants, and with a
   tatweel in the middle of a word often enough that a plain includes() misses
   results the visitor can plainly see on the page. */
function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/[يى]/g, "ي")
    .replace(/\s+/g, " ")
    .trim();
}

export default function HeaderSearch({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const router = useRouter();
  const isAr = locale === "ar";
  const t = copy[(locale in copy ? locale : "en") as keyof typeof copy];

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const index = useMemo(() => {
    const products: (Hit & { hay: string })[] = PRODUCTS.map((p) => ({
      kind: "product" as const,
      href: l(locale, `/store/${p.slug}`),
      title: isAr ? p.nameAr : p.nameEn,
      hint: isAr ? p.shortDescAr : p.shortDescEn,
      price: p.price,
      hay: norm(
        [p.nameAr, p.nameEn, p.shortDescAr, p.shortDescEn, ...(p.keywordsAr ?? []), ...(p.keywordsEn ?? [])].join(" ")
      ),
    }));

    const pageLeaves = [
      ...SERVICE_LINKS,
      ...SOLUTION_LINKS,
      ...PRIMARY_NAV.filter((g) => g.href).map((g) => ({ href: g.href!, label: g.label, hint: undefined })),
      { href: "/store", label: { ar: "متجر الخدمات", en: "Services store", fr: "Boutique" }, hint: undefined },
      { href: "/blog", label: { ar: "المدونة", en: "Blog", fr: "Blog" }, hint: undefined },
      { href: "/policy", label: { ar: "الشروط وسياسة الخصوصية", en: "Terms and privacy", fr: "Conditions" }, hint: undefined },
      { href: "/dashboard", label: { ar: "بوابة العملاء", en: "Client portal", fr: "Espace client" }, hint: undefined },
    ];
    const seen = new Set<string>();
    const pages: (Hit & { hay: string })[] = [];
    for (const leaf of pageLeaves) {
      const href = l(locale, leaf.href);
      if (seen.has(href)) continue;
      seen.add(href);
      const title = pick(leaf.label, locale);
      const hint = leaf.hint ? pick(leaf.hint, locale) : undefined;
      pages.push({ kind: "page", href, title, hint, hay: norm(`${title} ${hint ?? ""} ${leaf.href}`) });
    }
    return { products, pages };
  }, [locale, isAr]);

  const results = useMemo(() => {
    const q = norm(query);
    if (!q) return { products: index.products.slice(0, 6), pages: index.pages.slice(0, 4) };
    const terms = q.split(" ");
    const match = (hay: string) => terms.every((term) => hay.includes(term));
    return {
      products: index.products.filter((p) => match(p.hay)).slice(0, 8),
      pages: index.pages.filter((p) => match(p.hay)).slice(0, 6),
    };
  }, [query, index]);

  const flat = useMemo(() => [...results.products, ...results.pages], [results]);

  useEffect(() => setActive(0), [query]);

  /* Keep the highlighted row in view when arrowing past the fold. */
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (flat.length ? (i + 1) % flat.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0));
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      go(flat[active].href);
    }
  };

  const Row = ({ hit, i }: { hit: Hit; i: number }) => (
    <button
      type="button"
      className={styles.row}
      data-active={i === active || undefined}
      onMouseMove={() => setActive(i)}
      onClick={() => go(hit.href)}
    >
      <span className={styles.rowIcon} aria-hidden>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          {hit.kind === "product" ? (
            <path d="M2.5 3h2.2l2.5 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21.5 7H6" />
          ) : (
            <path d="M4 4h16v16H4zM4 9h16" />
          )}
        </svg>
      </span>
      <span className={styles.rowText}>
        <span className={styles.rowTitle}>{hit.title}</span>
        {hit.hint && <span className={styles.rowHint}>{hit.hint}</span>}
      </span>
      {hit.price !== undefined && (
        <span className={styles.rowPrice} dir="ltr">
          {hit.price.toLocaleString("en-US")} {t.sar}
        </span>
      )}
    </button>
  );

  return (
    <div className={styles.scrim} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-label={t.title} onKeyDown={onKeyDown}>
        <div className={styles.field}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" style={{ color: "var(--warm-gray)", flexShrink: 0 }} aria-hidden>
            <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.placeholder}
            aria-label={t.title}
            type="search"
            autoComplete="off"
            spellCheck={false}
          />
          <span className={styles.esc}>ESC</span>
        </div>

        <div className={styles.list} ref={listRef}>
          {flat.length === 0 ? (
            <p className={styles.empty}>
              {t.empty}
              <br />
              <button type="button" className={styles.emptyLink} style={{ border: 0, background: "none", cursor: "pointer" }} onClick={() => go(l(locale, "/store"))}>
                {t.browse}
              </button>
            </p>
          ) : (
            <>
              {results.products.length > 0 && (
                <>
                  <p className={styles.groupLabel}>{t.services}</p>
                  {results.products.map((hit, i) => (
                    <Row key={hit.href} hit={hit} i={i} />
                  ))}
                </>
              )}
              {results.pages.length > 0 && (
                <>
                  <p className={styles.groupLabel}>{t.pages}</p>
                  {results.pages.map((hit, i) => (
                    <Row key={hit.href} hit={hit} i={results.products.length + i} />
                  ))}
                </>
              )}
            </>
          )}
        </div>

        <div className={styles.foot}>
          <span>
            <kbd>↑↓</kbd>
            {t.nav}
          </span>
          <span>
            <kbd>↵</kbd>
            {t.open}
          </span>
          <span>
            <kbd>ESC</kbd>
            {t.close}
          </span>
        </div>
      </div>
    </div>
  );
}
