"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

const BLOG_POSTS = [
  {
    id: 1,
    titleAr: "10 أسرار لتصميم متجر سلة يحقق مبيعات عالية",
    titleEn: "10 Secrets to Design a Salla Store That Drives High Sales",
    excerptAr: "اكتشف أهم العوامل التي تجعل متجرك على منصة سلة يتصدر المنافسة ويحقق تحويلات أعلى...",
    excerptEn: "Discover the key factors that make your Salla store stand out from competition and achieve higher conversions...",
    category: "سلة",
    categoryEn: "Salla",
    date: "2025-01-15",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    titleAr: "دليل التسويق الرقمي لأصحاب المتاجر الإلكترونية",
    titleEn: "Digital Marketing Guide for E-commerce Store Owners",
    excerptAr: "كل ما تحتاج معرفته عن التسويق الرقمي لتنمية متجرك الإلكتروني...",
    excerptEn: "Everything you need to know about digital marketing to grow your online store...",
    category: "تسويق",
    categoryEn: "Marketing",
    date: "2025-01-10",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    featured: false,
  },
  {
    id: 3,
    titleAr: "كيف تبني هوية بصرية قوية لمتجرك",
    titleEn: "How to Build a Strong Brand Identity for Your Store",
    excerptAr: "الهوية البصرية هي أول انطباع يتركه متجرك. تعلم كيف تبني هوية قوية...",
    excerptEn: "Brand identity is the first impression your store leaves. Learn how to build a strong identity...",
    category: "تصميم",
    categoryEn: "Design",
    date: "2025-01-05",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    featured: false,
  },
  {
    id: 4,
    titleAr: "SEO للمتاجر الإلكترونية: الدليل الشامل 2025",
    titleEn: "SEO for E-commerce Stores: The Complete Guide 2025",
    excerptAr: "تحسين محركات البحث للمتاجر الإلكترونية يختلف عن المواقع العادية...",
    excerptEn: "SEO for e-commerce stores differs from regular websites. Here's everything you need...",
    category: "SEO",
    categoryEn: "SEO",
    date: "2024-12-28",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    featured: false,
  },
];

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "ar" ? "ar-SA" : locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPreview() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featured = BLOG_POSTS[0];
  const others = BLOG_POSTS.slice(1);

  return (
    <section id="blog" ref={sectionRef} style={{ background: "#FAFAF7", padding: "120px 0" }}>
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(20px)",
              transition: "all 0.8s ease",
            }}
          >
            <div className="section-label mb-4">
              {isRTL ? "المدونة" : "Blog"}
            </div>
            <h2
              style={{
                fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                color: "#0A0A0A",
                lineHeight: 1.1,
              }}
            >
              {isRTL ? "أحدث المقالات" : locale === "en" ? "Latest Articles" : "Derniers Articles"}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            style={{ textDecoration: "none" }}
          >
            <button
              style={{
                background: "transparent",
                border: "1px solid #E8E6E1",
                padding: "12px 32px",
                cursor: "pointer",
                fontFamily: "Space Mono, monospace",
                fontSize: "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#0A0A0A",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8A962"; e.currentTarget.style.color = "#C8A962"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E6E1"; e.currentTarget.style.color = "#0A0A0A"; }}
            >
              {isRTL ? "اقرأ جميع المقالات ←" : "Read All Articles →"}
            </button>
          </Link>
        </div>

        {/* Featured Post */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(20px)",
            transition: "all 0.8s 0.1s ease",
          }}
        >
          <div
            className="blog-card"
            style={{ background: "#FFFFFF", cursor: "pointer" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.image}
              alt={isRTL ? featured.titleAr : featured.titleEn}
              style={{ height: "320px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              background: "#FFFFFF",
              padding: "48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span className="gold-badge">
                {isRTL ? featured.category : featured.categoryEn}
              </span>
              <span style={{ color: "#8C8C7A", fontSize: "12px", fontFamily: "Space Mono" }}>
                {formatDate(featured.date, locale)}
              </span>
            </div>

            <h3
              style={{
                fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif",
                fontSize: "clamp(20px, 2vw, 28px)",
                fontWeight: 700,
                color: "#0A0A0A",
                lineHeight: 1.3,
                marginBottom: "16px",
              }}
            >
              {isRTL ? featured.titleAr : featured.titleEn}
            </h3>

            <p style={{ color: "#8C8C7A", fontSize: "15px", lineHeight: 1.7, marginBottom: "24px" }}>
              {isRTL ? featured.excerptAr : featured.excerptEn}
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "#8C8C7A" }}>
                ⏱ {featured.readTime} {isRTL ? "دقيقة قراءة" : "min read"}
              </span>
              <Link href={`/${locale}/blog/${featured.id}`} style={{ textDecoration: "none" }}>
                <span
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#C8A962",
                    cursor: "pointer",
                  }}
                >
                  {isRTL ? "اقرأ المزيد ←" : "Read More →"}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Other Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {others.map((post, index) => (
            <div
              key={post.id}
              className="blog-card"
              style={{
                background: "#FFFFFF",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translateY(20px)",
                transition: `all 0.6s ${0.2 + index * 0.1}s ease`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={isRTL ? post.titleAr : post.titleEn}
                loading="lazy"
              />

              <div className="blog-card-content">
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span className="gold-badge" style={{ fontSize: "10px", padding: "3px 8px" }}>
                    {isRTL ? post.category : post.categoryEn}
                  </span>
                  <span style={{ color: "#8C8C7A", fontSize: "11px", fontFamily: "Space Mono" }}>
                    {formatDate(post.date, locale)}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif",
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#0A0A0A",
                    lineHeight: 1.4,
                    marginBottom: "12px",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#C8A962"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#0A0A0A"; }}
                >
                  {isRTL ? post.titleAr : post.titleEn}
                </h3>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "Space Mono", fontSize: "11px", color: "#8C8C7A" }}>
                    ⏱ {post.readTime} {isRTL ? "د" : "min"}
                  </span>
                  <Link href={`/${locale}/blog/${post.id}`} style={{ textDecoration: "none" }}>
                    <span
                      style={{
                        fontFamily: "Space Mono",
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#C8A962",
                        cursor: "pointer",
                      }}
                    >
                      {isRTL ? "←" : "→"}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
