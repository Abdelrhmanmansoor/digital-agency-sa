"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { BADGE_STYLES, CATEGORIES, PRODUCTS, calculateSavings, type Product } from "@/lib/store-data";
import { useCart } from "./CartContext";
import styles from "./StoreCatalog.module.css";

const copy = {
  ar: {
    kicker: "الباقات المتاحة",
    title: "اختر الخدمة، والسعر والمدة معلنان قبل أن تسأل.",
    lead: "كل باقة أدناه لها نطاق عمل مكتوب ومدة تسليم ثابتة. ابحث أو صفِّ حسب ما يناسبك، وافتح المعاينة السريعة قبل أن تقرر.",
    search: "ابحث عن خدمة…",
    clear: "مسح البحث",
    filters: "التصنيفات",
    filterBtn: "التصنيف",
    sortLabel: "الترتيب",
    sort: {
      recommended: "المُرشَّح لك",
      priceAsc: "الأقل سعرًا",
      priceDesc: "الأعلى سعرًا",
      fastest: "الأسرع تسليمًا",
      popular: "الأكثر طلبًا",
    },
    results: (n: number, total: number) => `${n} من ${total} خدمة`,
    reset: "إعادة الضبط",
    apply: (n: number) => `عرض ${n} خدمة`,
    quick: "معاينة سريعة",
    details: "التفاصيل",
    add: "أضف للسلة",
    added: "أُضيف للسلة",
    fav: "حفظ في المفضلة",
    unfav: "إزالة من المفضلة",
    days: (n: number) => `${n} أيام`,
    monthly: "شهريًا",
    sar: "ر.س",
    save: (n: number) => `وفّر ${n.toLocaleString("en-US")}`,
    orders: (n: number) => `${n} طلب/شهر`,
    emptyTitle: "لا توجد خدمة مطابقة",
    emptyBody: "جرّب كلمة أبسط أو أعد ضبط التصنيف. إن كان ما تريده غير مدرج، أخبرنا وسنسعّره لك.",
    includes: "ما تشمله الباقة",
    close: "إغلاق",
    full: "الصفحة الكاملة",
    delivery: "مدة التسليم",
    all: "الكل",
  },
  en: {
    kicker: "Available packages",
    title: "Pick the service. The price and the timeline are published.",
    lead: "Every package below has a written scope and a fixed delivery window. Search or filter, and open the quick view before you decide.",
    search: "Search a service…",
    clear: "Clear search",
    filters: "Categories",
    filterBtn: "Category",
    sortLabel: "Sort",
    sort: {
      recommended: "Recommended",
      priceAsc: "Lowest price",
      priceDesc: "Highest price",
      fastest: "Fastest delivery",
      popular: "Most requested",
    },
    results: (n: number, total: number) => `${n} of ${total} services`,
    reset: "Reset",
    apply: (n: number) => `Show ${n} services`,
    quick: "Quick view",
    details: "Details",
    add: "Add to cart",
    added: "Added",
    fav: "Save to favourites",
    unfav: "Remove from favourites",
    days: (n: number) => `${n} days`,
    monthly: "monthly",
    sar: "SAR",
    save: (n: number) => `Save ${n.toLocaleString("en-US")}`,
    orders: (n: number) => `${n} orders/mo`,
    emptyTitle: "No matching service",
    emptyBody: "Try a simpler word or reset the category. If what you need is not listed, tell us and we will price it.",
    includes: "What the package includes",
    close: "Close",
    full: "Full page",
    delivery: "Delivery",
    all: "All",
  },
} as const;

type SortKey = keyof (typeof copy)["en"]["sort"];

/* Arabic arrives with and without diacritics and with alef variants often
   enough that a plain includes() misses products the visitor can see. */
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

/* One line glyph per category. Replaces the emoji the filter row used, which
   rendered as a different picture on every platform. */
const CATEGORY_ICON: Record<string, string> = {
  all: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  store: "M2.5 3h2.2l2.5 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21.5 7H6M9 21h.01M18 21h.01",
  integrations: "M9 15 4.5 10.5a4.24 4.24 0 0 1 6-6L15 9M15 9l4.5 4.5a4.24 4.24 0 0 1-6 6L9 15",
  marketing: "M3 17.5 9 11l4 4 8-8.5M21 6.5V12M21 6.5h-5.5",
  development: "m8 17-5-5 5-5M16 7l5 5-5 5M13.5 4l-3 16",
};

function Icon({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <path d={d} />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span className={styles.stars} aria-label={`${rating} / 5`}>
      {"★".repeat(rounded)}
      <span style={{ color: "var(--border-mid)" }}>{"★".repeat(5 - rounded)}</span>
    </span>
  );
}

export default function StoreCatalog() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = copy[isAr ? "ar" : "en"];
  const { addItem } = useCart();

  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [favourites, setFavourites] = useState<string[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  /* Favourites are read after mount only. The first render is identical on
     the server and the client (an empty list), so restoring them cannot
     cause a hydration mismatch — and the products themselves are always
     server-rendered, because a store whose catalogue only exists after
     JavaScript runs is a store search engines never see. */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("store-favorites");
      if (saved) setFavourites(JSON.parse(saved));
    } catch {
      /* private mode — favourites simply do not persist */
    }
  }, []);

  const toggleFavourite = (id: string) => {
    setFavourites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      try {
        localStorage.setItem("store-favorites", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  /* Typing stays responsive on a mid-range phone: the input updates every
     keystroke while the grid re-filters at React's own pace. */
  const deferredQuery = useDeferredValue(query);

  const haystacks = useMemo(() => {
    const map = new Map<string, string>();
    for (const product of PRODUCTS) {
      map.set(
        product.id,
        norm([product.nameAr, product.nameEn, product.shortDescAr, product.shortDescEn, ...(product.keywordsAr ?? []), ...(product.keywordsEn ?? [])].join(" "))
      );
    }
    return map;
  }, []);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: PRODUCTS.length };
    for (const product of PRODUCTS) map[product.category] = (map[product.category] ?? 0) + 1;
    return map;
  }, []);

  const results = useMemo(() => {
    const terms = norm(deferredQuery).split(" ").filter(Boolean);
    let list = PRODUCTS.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (!terms.length) return true;
      const hay = haystacks.get(product.id) ?? "";
      return terms.every((term) => hay.includes(term));
    });

    list = [...list];
    if (sort === "priceAsc") list.sort((a, b) => a.price - b.price);
    else if (sort === "priceDesc") list.sort((a, b) => b.price - a.price);
    else if (sort === "fastest") list.sort((a, b) => a.deliveryDays - b.deliveryDays);
    else if (sort === "popular") list.sort((a, b) => b.monthlyOrders - a.monthlyOrders);
    else list.sort((a, b) => a.order - b.order);
    return list;
  }, [category, deferredQuery, sort, haystacks]);

  const filtering = query !== deferredQuery;
  const dirty = category !== "all" || query.trim() !== "";

  /* Escape closes whichever layer is on top, and the page behind a sheet or
     a modal must not scroll under the finger. */
  useEffect(() => {
    if (!sheetOpen && !quickView) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (quickView) setQuickView(null);
      else setSheetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [sheetOpen, quickView]);

  const add = (product: Product) => {
    addItem({
      productId: product.id,
      slug: product.slug,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      price: product.price,
      originalPrice: product.originalPrice,
      isMonthly: product.isMonthly,
    });
    setJustAdded(product.id);
    window.setTimeout(() => setJustAdded((c) => (c === product.id ? null : c)), 1800);
  };

  const categoryList = (
    <>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          type="button"
          className={styles.railItem}
          aria-pressed={category === cat.key}
          onClick={() => {
            setCategory(cat.key);
            setSheetOpen(false);
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <Icon d={CATEGORY_ICON[cat.key] ?? CATEGORY_ICON.all} />
            {isAr ? cat.labelAr : cat.labelEn}
          </span>
          <span className={styles.railCount}>{counts[cat.key] ?? 0}</span>
        </button>
      ))}
    </>
  );

  return (
    <section id="products" className={styles.root} data-own-spacing>
      <div className={styles.shell}>
        <div className={styles.head}>
          <p className={styles.kicker}>{t.kicker}</p>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.lead}>{t.lead}</p>
        </div>

        <div className={styles.layout}>
          {/* ── Sticky rail (desktop) ── */}
          <aside className={styles.rail}>
            <div className={styles.railGroup}>
              <h3 className={styles.railTitle}>{t.filters}</h3>
              {categoryList}
            </div>
          </aside>

          <div>
            {/* ── Toolbar ── */}
            <div className={styles.toolbar}>
              <div className={styles.searchBox}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden>
                  <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM21 21l-4.35-4.35" />
                </svg>
                <input
                  className={styles.searchInput}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.search}
                  aria-label={t.search}
                  autoComplete="off"
                />
                {query && (
                  <button type="button" className={styles.searchClear} onClick={() => setQuery("")} aria-label={t.clear}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              <button type="button" className={styles.filterBtn} onClick={() => setSheetOpen(true)} aria-expanded={sheetOpen}>
                <Icon d="M4 6h16M7 12h10M10 18h4" />
                {t.filterBtn}
                {category !== "all" && <span className={styles.filterDot} aria-hidden />}
              </button>

              <label style={{ display: "contents" }}>
                <span className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                  {t.sortLabel}
                </span>
                <select className={styles.sort} value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label={t.sortLabel}>
                  {(Object.keys(t.sort) as SortKey[]).map((key) => (
                    <option key={key} value={key}>
                      {t.sort[key]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className={styles.meta}>
              <span aria-live="polite">{t.results(results.length, PRODUCTS.length)}</span>
              {dirty && (
                <button
                  type="button"
                  className={styles.reset}
                  onClick={() => {
                    setCategory("all");
                    setQuery("");
                  }}
                >
                  {t.reset}
                </button>
              )}
            </div>

            {/* ── Grid ── */}
            <div className={styles.grid}>
              {filtering ? (
                Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className={styles.skeleton} aria-hidden>
                    <div className={`${styles.skeletonPlate} skeleton`} />
                    <div className={styles.skeletonBody}>
                      <div className={`${styles.skeletonLine} skeleton`} style={{ width: "80%" }} />
                      <div className={`${styles.skeletonLine} skeleton`} style={{ width: "100%" }} />
                      <div className={`${styles.skeletonLine} skeleton`} style={{ width: "45%", height: 22 }} />
                      <div className={`${styles.skeletonLine} skeleton`} style={{ height: 46, borderRadius: 11 }} />
                    </div>
                  </div>
                ))
              ) : results.length === 0 ? (
                <div className={styles.empty}>
                  <span className={styles.emptyIcon}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM21 21l-4.35-4.35M9 9l4 4M13 9l-4 4" />
                    </svg>
                  </span>
                  <p className={styles.emptyTitle}>{t.emptyTitle}</p>
                  <p className={styles.emptyBody}>{t.emptyBody}</p>
                  <button
                    type="button"
                    className={styles.reset}
                    onClick={() => {
                      setCategory("all");
                      setQuery("");
                    }}
                  >
                    {t.reset}
                  </button>
                </div>
              ) : (
                results.map((product) => {
                  const name = isAr ? product.nameAr : product.nameEn;
                  const desc = isAr ? product.shortDescAr : product.shortDescEn;
                  const savings = calculateSavings(product);
                  const badgeStyle = product.badge ? BADGE_STYLES[product.badge] : null;
                  const badgeLabel = product.badge
                    ? isAr
                      ? product.badgeLabelAr ?? product.badge
                      : product.badgeLabelEn ?? product.badge
                    : null;
                  const isFav = favourites.includes(product.id);
                  const added = justAdded === product.id;
                  const cat = CATEGORIES.find((c) => c.key === product.category);

                  return (
                    <article key={product.id} className={styles.card}>
                      <div className={styles.plate}>
                        {badgeStyle && badgeLabel && (
                          <span
                            className={styles.badge}
                            style={{ background: badgeStyle.bg, borderColor: badgeStyle.border, color: badgeStyle.color }}
                          >
                            {badgeLabel}
                          </span>
                        )}
                        <button
                          type="button"
                          className={styles.fav}
                          aria-pressed={isFav}
                          aria-label={isFav ? t.unfav : t.fav}
                          onClick={() => toggleFavourite(product.id)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M20.8 5.6a5.4 5.4 0 0 0-7.7 0L12 6.7l-1.1-1.1a5.4 5.4 0 1 0-7.7 7.7l8.8 8.8 8.8-8.8a5.4 5.4 0 0 0 0-7.7Z" />
                          </svg>
                        </button>
                        <span className={styles.plateIcon}>
                          <Icon d={CATEGORY_ICON[product.category] ?? CATEGORY_ICON.all} size={24} />
                        </span>
                        <span className={styles.plateLabel}>{cat ? (isAr ? cat.labelAr : cat.labelEn) : ""}</span>
                        <button type="button" className={styles.quick} onClick={() => setQuickView(product)}>
                          <Icon d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" size={15} />
                          {t.quick}
                        </button>
                      </div>

                      <div className={styles.body}>
                        <h3 className={styles.name}>
                          <Link href={`/${locale}/store/${product.slug}`}>{name}</Link>
                        </h3>
                        <p className={styles.desc}>{desc}</p>

                        <div className={styles.stats}>
                          <span className={styles.stat}>
                            <Stars rating={product.rating} />
                            {product.rating}
                          </span>
                          <span className={styles.stat}>
                            <Icon d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 7v5l3 2" size={13} />
                            {t.days(product.deliveryDays)}
                          </span>
                        </div>

                        <div className={styles.priceRow}>
                          <span className={styles.price} dir="ltr">
                            {product.price.toLocaleString("en-US")}
                          </span>
                          <span className={styles.cur}>
                            {t.sar}
                            {product.isMonthly ? ` / ${t.monthly}` : ""}
                          </span>
                          {product.originalPrice > product.price && (
                            <>
                              <span className={styles.was} dir="ltr">
                                {product.originalPrice.toLocaleString("en-US")}
                              </span>
                              <span className={styles.save}>{t.save(savings)}</span>
                            </>
                          )}
                        </div>

                        <div className={styles.actions}>
                          <button type="button" className={styles.add} data-added={added || undefined} onClick={() => add(product)}>
                            {added ? (
                              <>
                                <Icon d="m4 12 5.5 5.5L20 7" size={16} />
                                {t.added}
                              </>
                            ) : (
                              <>
                                <Icon d="M2.5 3h2.2l2.5 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21.5 7H6" size={16} />
                                {t.add}
                              </>
                            )}
                          </button>
                          <Link href={`/${locale}/store/${product.slug}`} className={styles.details}>
                            {t.details}
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile filter sheet ── */}
      <div className={styles.sheetScrim} data-open={sheetOpen || undefined} onClick={() => setSheetOpen(false)} aria-hidden />
      <div className={styles.sheet} data-open={sheetOpen || undefined} role="dialog" aria-modal="true" aria-label={t.filters} inert={!sheetOpen}>
        <span className={styles.sheetGrip} aria-hidden />
        <div className={styles.sheetHead}>
          <span className={styles.sheetTitle}>{t.filters}</span>
          <button type="button" className={styles.qvClose} onClick={() => setSheetOpen(false)} aria-label={t.close}>
            <Icon d="M18 6 6 18M6 6l12 12" />
          </button>
        </div>
        <div className={styles.sheetBody}>{categoryList}</div>
        <div className={styles.sheetFoot}>
          <button type="button" className={styles.sheetApply} onClick={() => setSheetOpen(false)}>
            {t.apply(results.length)}
          </button>
        </div>
      </div>

      {/* ── Quick view ── */}
      {quickView && (
        <div className={styles.qvScrim} onMouseDown={(e) => e.target === e.currentTarget && setQuickView(null)}>
          <div className={styles.qv} role="dialog" aria-modal="true" aria-label={isAr ? quickView.nameAr : quickView.nameEn}>
            <div className={styles.qvHead}>
              <h3 className={styles.qvTitle}>{isAr ? quickView.nameAr : quickView.nameEn}</h3>
              <button type="button" className={styles.qvClose} onClick={() => setQuickView(null)} aria-label={t.close}>
                <Icon d="M18 6 6 18M6 6l12 12" />
              </button>
            </div>

            <div className={styles.qvBody}>
              <p className={styles.qvDesc}>{isAr ? quickView.descriptionAr : quickView.descriptionEn}</p>

              <div className={styles.qvSection}>
                <h4 className={styles.qvSectionTitle}>{t.includes}</h4>
                <ul className={styles.qvList}>
                  {quickView.features.slice(0, 7).map((feature, i) => (
                    <li key={i}>
                      <Icon d="m4 12 5.5 5.5L20 7" size={15} />
                      {isAr ? feature.ar : feature.en}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.qvSection}>
                <h4 className={styles.qvSectionTitle}>{t.delivery}</h4>
                <p className={styles.qvDesc}>{t.days(quickView.deliveryDays)}</p>
              </div>
            </div>

            <div className={styles.qvFoot}>
              <span className={styles.qvPrice}>
                <span className={styles.price} dir="ltr">
                  {quickView.price.toLocaleString("en-US")}{" "}
                  <span className={styles.cur}>
                    {t.sar}
                    {quickView.isMonthly ? ` / ${t.monthly}` : ""}
                  </span>
                </span>
              </span>
              <button
                type="button"
                className={styles.qvAdd}
                onClick={() => {
                  add(quickView);
                  setQuickView(null);
                }}
              >
                {t.add}
              </button>
              <Link href={`/${locale}/store/${quickView.slug}`} className={styles.qvLink}>
                {t.full}
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
