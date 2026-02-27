import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "المدونة | وكالة رقمية" : "Blog | Digital Agency",
    description: locale === "ar"
      ? "مقالات ونصائح في التسويق الرقمي وتصميم المتاجر الإلكترونية"
      : "Articles and tips on digital marketing and e-commerce store design",
  };
}

const CATEGORIES = [
  { key: "all", ar: "الكل", en: "All" },
  { key: "salla", ar: "سلة", en: "Salla" },
  { key: "marketing", ar: "تسويق", en: "Marketing" },
  { key: "seo", ar: "SEO", en: "SEO" },
  { key: "design", ar: "تصميم", en: "Design" },
];

const ARTICLES = [
  { id: 1, titleAr: "10 أسرار لتصميم متجر سلة يحقق مبيعات عالية", titleEn: "10 Secrets to Design a High-Converting Salla Store", category: "salla", date: "2025-01-15", readTime: 8, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" },
  { id: 2, titleAr: "دليل التسويق الرقمي لأصحاب المتاجر الإلكترونية", titleEn: "Digital Marketing Guide for E-commerce Store Owners", category: "marketing", date: "2025-01-10", readTime: 6, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
  { id: 3, titleAr: "كيف تبني هوية بصرية قوية لمتجرك", titleEn: "How to Build a Strong Brand Identity for Your Store", category: "design", date: "2025-01-05", readTime: 5, image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80" },
  { id: 4, titleAr: "SEO للمتاجر الإلكترونية: الدليل الشامل 2025", titleEn: "SEO for E-commerce Stores: The Complete Guide 2025", category: "seo", date: "2024-12-28", readTime: 12, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
  { id: 5, titleAr: "أفضل باقات سلة لعام 2025 — مقارنة شاملة", titleEn: "Best Salla Plans for 2025 — Complete Comparison", category: "salla", date: "2024-12-20", readTime: 7, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80" },
  { id: 6, titleAr: "كيف تزيد مبيعات متجرك بـ 300% في 3 أشهر", titleEn: "How to Increase Your Store Sales by 300% in 3 Months", category: "marketing", date: "2024-12-15", readTime: 9, image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=600&q=80" },
];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRTL = locale === "ar";

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          style={{
            background: "#0A0A0A",
            padding: "160px 0 80px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23C8A962' stroke-width='0.5'%3E%3Cpath d='M40 0 L80 20 L80 60 L40 80 L0 60 L0 20 Z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
              opacity: 0.04,
            }}
          />
          <div className="max-w-[1400px] mx-auto px-8 relative z-10 text-center">
            <div className="section-label justify-center mb-6" style={{ color: "rgba(200,169,98,0.6)" }}>
              {isRTL ? "المدونة" : "Blog"}
            </div>
            <h1
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                color: "#FAFAF7",
                marginBottom: "16px",
              }}
            >
              {isRTL ? "أحدث المقالات" : "Latest Articles"}
            </h1>
            <p style={{ color: "#8C8C7A", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
              {isRTL
                ? "نصائح ومقالات متخصصة في التسويق الرقمي وتصميم المتاجر الإلكترونية"
                : "Expert tips and articles on digital marketing and e-commerce store design"}
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <section style={{ background: "#FAFAF7", padding: "80px 0" }}>
          <div className="max-w-[1400px] mx-auto px-8">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-12">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.key}
                  href={`/${locale}/blog?category=${cat.key}`}
                  style={{
                    padding: "8px 20px",
                    border: "1px solid #E8E6E1",
                    fontSize: "13px",
                    fontFamily: "'Zain', sans-serif",
                    color: "#8C8C7A",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    background: "#FFFFFF",
                  }}
                >
                  {isRTL ? cat.ar : cat.en}
                </Link>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ARTICLES.map((article) => (
                <Link
                  key={article.id}
                  href={`/${locale}/blog/${article.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="blog-card"
                    style={{ background: "#FFFFFF", overflow: "hidden" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.image}
                      alt={isRTL ? article.titleAr : article.titleEn}
                      style={{ height: "200px", width: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div style={{ padding: "24px" }}>
                      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                        <span className="gold-badge" style={{ fontSize: "10px" }}>
                          {CATEGORIES.find((c) => c.key === article.category)?.[isRTL ? "ar" : "en"]}
                        </span>
                        <span style={{ color: "#8C8C7A", fontSize: "11px", fontFamily: "Space Mono" }}>
                          {new Date(article.date).toLocaleDateString(isRTL ? "ar-SA" : "en-US")}
                        </span>
                      </div>
                      <h2
                        style={{
                          fontFamily: "'Zain', sans-serif",
                          fontSize: "17px",
                          fontWeight: 700,
                          color: "#0A0A0A",
                          lineHeight: 1.4,
                          marginBottom: "16px",
                          transition: "color 0.2s",
                        }}
                      >
                        {isRTL ? article.titleAr : article.titleEn}
                      </h2>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "Space Mono", fontSize: "11px", color: "#8C8C7A" }}>
                          ⏱ {article.readTime} {isRTL ? "دقيقة" : "min read"}
                        </span>
                        <span style={{ fontFamily: "Space Mono", fontSize: "12px", color: "#C8A962", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                          {isRTL ? "اقرأ ←" : "Read →"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
