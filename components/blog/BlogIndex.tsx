"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ARTICLES, CATEGORIES } from "@/lib/articles";

/* The category chips used to be links to `?category=…` that no page ever
   read — five dead buttons. Filtering client-side keeps every article in the
   server HTML for crawlers while making the control actually do something. */
export default function BlogIndex({ locale }: { locale: string }) {
  const [active, setActive] = useState<string>("all");
  const isRTL = locale === "ar";
  const lang = (locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en") as "ar" | "en" | "fr";

  const visible = active === "all" ? ARTICLES : ARTICLES.filter((a) => a.category === active);

  return (
    <>
      <div
        role="group"
        aria-label={isRTL ? "تصفية المقالات حسب التصنيف" : "Filter articles by category"}
        style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActive(cat.key)}
              aria-pressed={isActive}
              style={{
                padding: "9px 20px",
                minHeight: "44px",
                border: `1px solid ${isActive ? "#111111" : "#EAEAE6"}`,
                background: isActive ? "#111111" : "#FFFFFF",
                color: isActive ? "#FFFFFF" : "#6B6B6B",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s, color 0.2s",
              }}
            >
              {cat[lang]}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((article, index) => (
          <Link
            key={article.id}
            href={`/${locale}/blog/${article.id}`}
            className="blog-card-link"
            style={{ textDecoration: "none", display: "block" }}
          >
            <article
              style={{
                background: "#FFFFFF",
                border: "1px solid #EAEAE6",
                borderRadius: "14px",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "16 / 10", background: "#F7F7F5" }}>
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      background: "#F0B100",
                      color: "#111111",
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: "999px",
                    }}
                  >
                    {isRTL ? article.categoryAr : article.categoryEn}
                  </span>
                  <time
                    dateTime={article.date}
                    style={{ color: "#6B6B6B", fontSize: "12px", fontFamily: "Space Mono, monospace" }}
                  >
                    {article.date}
                  </time>
                </div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#111111", lineHeight: 1.45 }}>
                  {isRTL ? article.titleAr : article.titleEn}
                </h2>
                <p style={{ color: "#6B6B6B", fontSize: "14px", lineHeight: 1.8, margin: 0 }}>
                  {isRTL ? article.excerptAr : article.excerptEn}
                </p>
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Space Mono, monospace",
                    fontSize: "12px",
                    color: "#6B6B6B",
                  }}
                >
                  <span>
                    {article.readTime} {isRTL ? "دقيقة قراءة" : locale === "fr" ? "min de lecture" : "min read"}
                  </span>
                  <span style={{ color: "#8A6D00", fontWeight: 700 }}>
                    {isRTL ? "اقرأ المقال ←" : locale === "fr" ? "Lire →" : "Read →"}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <style>{`
        .blog-card-link article { transition: border-color .2s, box-shadow .2s, transform .2s; }
        .blog-card-link:hover article {
          border-color: #DCDCD6;
          box-shadow: 0 12px 32px rgba(17,17,17,0.10);
          transform: translateY(-2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .blog-card-link:hover article { transform: none; }
        }
      `}</style>
    </>
  );
}
