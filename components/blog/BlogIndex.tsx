"use client";

import { useState } from "react";
import Link from "next/link";
import { ARTICLES, CLUSTERS } from "@/lib/articles";
import type { ClusterId } from "@/lib/articles";

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
        className="blog-filters"
      >
        <button
          type="button"
          onClick={() => setActive("all")}
          aria-pressed={active === "all"}
          className={active === "all" ? "is-active" : ""}
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
              className={active === cluster.id ? "is-active" : ""}
            >
              {cluster[lang]}
              <span>{n}</span>
            </button>
          );
        })}
      </div>

      {activeCluster && (
        <p className="blog-cluster-blurb">{isRTL ? activeCluster.blurbAr : activeCluster.blurbEn}</p>
      )}

      <p className="blog-count">{label.count(visible.length)}</p>

      <div className="blog-grid">
        {visible.map((article) => {
          const cluster = CLUSTERS.find((c) => c.id === article.cluster);
          return (
            <Link key={article.id} href={`/${locale}/blog/${article.id}`} className="blog-card">
              <article>
                <div className="blog-card-top">
                  <span className="blog-card-cluster">{cluster ? cluster[lang] : ""}</span>
                  <time dateTime={article.date}>{article.date}</time>
                </div>
                <h2>{isRTL ? article.titleAr : article.titleEn}</h2>
                <p>{isRTL ? article.excerptAr : article.excerptEn}</p>
                <div className="blog-card-foot">
                  <span>
                    {article.readTime} {label.read}
                  </span>
                  <span className="blog-card-go" aria-hidden>
                    {isRTL ? "←" : "→"}
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      <style>{`
        .blog-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 22px;
        }
        .blog-filters button {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          min-height: 44px;
          padding: 0 18px;
          border: 1px solid #e6e2d8;
          background: #fff;
          color: #56534b;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color .2s, background .2s, color .2s;
        }
        .blog-filters button span {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #a9a498;
        }
        .blog-filters button:hover { border-color: #d4cfc2; }
        .blog-filters button.is-active { background: #14140f; border-color: #14140f; color: #fff; }
        .blog-filters button.is-active span { color: #e0b53c; }

        .blog-cluster-blurb {
          color: #6e6a61;
          font-size: 15px;
          line-height: 1.85;
          max-width: 68ch;
          margin: 0 0 6px;
        }
        .blog-count {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #a9a498;
          margin: 0 0 24px;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1px;
          background: #e6e2d8;
          border: 1px solid #e6e2d8;
        }
        .blog-card { text-decoration: none; display: block; background: #fff; transition: background .2s; }
        .blog-card:hover { background: #fffdf6; }
        .blog-card article {
          padding: 28px 26px;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .blog-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-bottom: 14px;
          border-bottom: 1px solid #eeeae0;
        }
        .blog-card-cluster {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8b6900;
        }
        .blog-card-top time {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #a9a498;
        }
        .blog-card h2 {
          font-family: var(--font-arabic-display);
          font-size: 21px;
          line-height: 1.4;
          letter-spacing: -0.015em;
          color: #14140f;
          margin: 0;
        }
        .blog-card p {
          color: #6e6a61;
          font-size: 14.5px;
          line-height: 1.8;
          margin: 0;
        }
        .blog-card-foot {
          margin-top: auto;
          padding-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #a9a498;
        }
        .blog-card-go { color: #8b6900; font-size: 14px; }

        @media (max-width: 560px) {
          .blog-grid { grid-template-columns: 1fr; }
          .blog-card article { padding: 24px 20px; }
        }
      `}</style>
    </>
  );
}
