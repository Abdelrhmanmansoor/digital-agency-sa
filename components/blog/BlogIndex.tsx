"use client";

import { useState } from "react";
import Link from "next/link";
import { ARTICLES, CLUSTERS } from "@/lib/articles";
import type { ClusterId } from "@/lib/articles";
import styles from "./BlogIndex.module.css";

/* Fifty articles need a way in. The filter is cluster-based rather than the
   old four loose tags, and every article stays in the server HTML — the
   filter hides cards rather than fetching, so crawlers see the full index. */
export default function BlogIndex({ locale }: { locale: string }) {
  const [active, setActive] = useState<ClusterId | "all">("all");
  const isRTL = locale === "ar";
  const lang = (locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en") as "ar" | "en" | "fr";

  const visible = active === "all" ? ARTICLES : ARTICLES.filter((a) => a.cluster === active);
  const activeCluster = CLUSTERS.find((c) => c.id === active);

  const label = {
    all: isRTL ? "كل المقالات" : lang === "fr" ? "Tous" : "All articles",
    count: (n: number) =>
      isRTL ? `${n} مقالًا` : lang === "fr" ? `${n} articles` : `${n} articles`,
    read: isRTL ? "دقيقة" : lang === "fr" ? "min" : "min",
  };

  return (
    <>
      <div
        role="group"
        aria-label={isRTL ? "تصفية حسب الموضوع" : "Filter by topic"}
        className={styles.filters}
      >
        <button
          type="button"
          onClick={() => setActive("all")}
          aria-pressed={active === "all"}
          
        >
          {label.all}
          <span>{ARTICLES.length}</span>
        </button>
        {CLUSTERS.map((cluster) => {
          const n = ARTICLES.filter((a) => a.cluster === cluster.id).length;
          return (
            <button
              key={cluster.id}
              type="button"
              onClick={() => setActive(cluster.id)}
              aria-pressed={active === cluster.id}
              
            >
              {cluster[lang]}
              <span>{n}</span>
            </button>
          );
        })}
      </div>

      {activeCluster && (
        <p className={styles.blurb}>{isRTL ? activeCluster.blurbAr : activeCluster.blurbEn}</p>
      )}

      <p className={styles.count}>{label.count(visible.length)}</p>

      <div className={styles.grid}>
        {visible.map((article) => {
          const cluster = CLUSTERS.find((c) => c.id === article.cluster);
          return (
            <Link key={article.id} href={`/${locale}/blog/${article.id}`} className={styles.card}>
              <article>
                <div className={styles.top}>
                  <span className={styles.cluster}>{cluster ? cluster[lang] : ""}</span>
                  <time dateTime={article.date}>{article.date}</time>
                </div>
                <h2>{isRTL ? article.titleAr : article.titleEn}</h2>
                <p>{isRTL ? article.excerptAr : article.excerptEn}</p>
                <div className={styles.foot}>
                  <span>
                    {article.readTime} {label.read}
                  </span>
                  <span className={styles.go} aria-hidden>
                    {isRTL ? "←" : "→"}
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

    </>
  );
}
