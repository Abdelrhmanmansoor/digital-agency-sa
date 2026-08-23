import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle, relatedArticles } from "@/lib/articles";
import { SITE_URL, LOCALES, hreflangMap } from "@/lib/site";

/* Without this the article route stayed dynamic and every crawl paid for a
   render. The set is small and known at build time. */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) => ARTICLES.map((a) => ({ locale, id: a.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const article = getArticle(id);
  if (!article) return { title: "Article Not Found", robots: { index: false, follow: false } };

  const isAr = locale === "ar";
  const title = isAr ? article.titleAr : article.titleEn;
  const description = isAr ? article.excerptAr : article.excerptEn;
  const canonical = `${SITE_URL}/${locale}/blog/${article.id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: hreflangMap(`/blog/${article.id}`),
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      siteName: "AM Design",
      publishedTime: article.date,
      images: [{ url: article.image, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [article.image] },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const isRTL = locale === "ar";
  const article = getArticle(id);

  if (!article) notFound();

  const related = relatedArticles(id);
  const canonical = `${SITE_URL}/${locale}/blog/${article.id}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: isRTL ? article.titleAr : article.titleEn,
        description: isRTL ? article.excerptAr : article.excerptEn,
        image: article.image,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: locale,
        mainEntityOfPage: canonical,
        author: { "@type": "Organization", name: "AM Design", url: SITE_URL },
        publisher: { "@type": "Organization", name: "AM Design", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isRTL ? "الرئيسية" : "Home", item: `${SITE_URL}/${locale}` },
          { "@type": "ListItem", position: 2, name: isRTL ? "المدونة" : "Blog", item: `${SITE_URL}/${locale}/blog` },
          { "@type": "ListItem", position: 3, name: isRTL ? article.titleAr : article.titleEn, item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section
          style={{
            background: "#0A0A0A",
            padding: "120px 0 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="max-w-[900px] mx-auto px-8 pb-12 relative z-10">
            {/* Breadcrumb */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "32px" }}>
              <Link href={`/${locale}`} style={{ color: "#8C8C7A", textDecoration: "none", fontSize: "13px", fontFamily: "Space Mono" }}>
                {isRTL ? "الرئيسية" : "Home"}
              </Link>
              <span style={{ color: "#3A3A35" }}>/</span>
              <Link href={`/${locale}/blog`} style={{ color: "#8C8C7A", textDecoration: "none", fontSize: "13px", fontFamily: "Space Mono" }}>
                {isRTL ? "المدونة" : "Blog"}
              </Link>
              <span style={{ color: "#3A3A35" }}>/</span>
              <span style={{ color: "#F0B100", fontSize: "13px", fontFamily: "Space Mono" }}>
                {isRTL ? article.categoryAr : article.categoryEn}
              </span>
            </div>

            {/* Category */}
            <div className="gold-badge mb-6">
              {isRTL ? article.categoryAr : article.categoryEn}
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 700,
                color: "#FAFAF7",
                lineHeight: 1.2,
                marginBottom: "24px",
              }}
            >
              {isRTL ? article.titleAr : article.titleEn}
            </h1>

            {/* Meta */}
            <div style={{ display: "flex", gap: "24px", alignItems: "center", color: "#8C8C7A" }}>
              <span style={{ fontFamily: "Space Mono", fontSize: "12px" }}>
                {new Date(article.date).toLocaleDateString(isRTL ? "ar-SA" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span style={{ fontFamily: "Space Mono", fontSize: "12px" }}>
                ⏱ {article.readTime} {isRTL ? "دقيقة قراءة" : "min read"}
              </span>
            </div>
          </div>

          {/* Hero Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt={isRTL ? article.titleAr : article.titleEn}
            style={{
              width: "100%",
              height: "480px",
              objectFit: "cover",
              display: "block",
              opacity: 0.7,
            }}
          />
        </section>

        {/* Article Content */}
        <section style={{ background: "#FAFAF7", padding: "80px 0" }}>
          <div className="max-w-[900px] mx-auto px-8">
            <div
              className="article-content"
              style={{
                fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                fontSize: "17px",
                lineHeight: 1.9,
                color: "#2A2A25",
                direction: isRTL ? "rtl" : "ltr",
              }}
              dangerouslySetInnerHTML={{
                __html: isRTL ? article.contentAr : article.contentEn,
              }}
            />

            {/* Share & Back */}
            <div
              style={{
                marginTop: "64px",
                paddingTop: "32px",
                borderTop: "1px solid #E8E6E1",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <Link
                href={`/${locale}/blog`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#8C8C7A",
                  textDecoration: "none",
                  fontFamily: "Space Mono",
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
              >
                {isRTL ? "→ العودة للمدونة" : "← Back to Blog"}
              </Link>
              <div style={{ display: "flex", gap: "12px" }}>
                <span style={{ color: "#8C8C7A", fontSize: "13px", fontFamily: "Space Mono" }}>
                  {isRTL ? "مشاركة:" : "Share:"}
                </span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(isRTL ? article.titleAr : article.titleEn)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#F0B100", textDecoration: "none", fontFamily: "Space Mono", fontSize: "13px" }}
                >
                  Twitter
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(isRTL ? article.titleAr : article.titleEn)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#F0B100", textDecoration: "none", fontFamily: "Space Mono", fontSize: "13px" }}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {related.length > 0 && (
          <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
            <div className="max-w-[1400px] mx-auto px-8">
              <h2
                style={{
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#0A0A0A",
                  marginBottom: "40px",
                }}
              >
                {isRTL ? "مقالات ذات صلة" : "Related Articles"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {related.map((rel) => (
                  <Link key={rel.id} href={`/${locale}/blog/${rel.id}`} style={{ textDecoration: "none" }}>
                    <div
                      className="blog-related-card"
                      style={{
                        border: "1px solid #E8E6E1",
                        overflow: "hidden",
                        transition: "border-color 0.3s",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rel.image}
                        alt={isRTL ? rel.titleAr : rel.titleEn}
                        style={{ height: "200px", width: "100%", objectFit: "cover", display: "block" }}
                      />
                      <div style={{ padding: "24px" }}>
                        <div className="gold-badge mb-3" style={{ fontSize: "10px" }}>
                          {isRTL ? rel.categoryAr : rel.categoryEn}
                        </div>
                        <h3
                          style={{
                            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#0A0A0A",
                            lineHeight: 1.4,
                          }}
                        >
                          {isRTL ? rel.titleAr : rel.titleEn}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />

      <style>{`
        .article-content h2 {
          font-family: 'ThmanyahSans', 'Zain', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #0A0A0A;
          margin: 40px 0 16px;
        }
        .article-content p {
          margin-bottom: 20px;
        }
        .article-content ul, .article-content ol {
          margin: 16px 0 20px;
          padding-${isRTL ? "right" : "left"}: 24px;
        }
        .article-content li {
          margin-bottom: 8px;
        }
        .article-content a {
          color: #F0B100;
          text-decoration: none;
        }
        .blog-related-card:hover {
          border-color: #F0B100 !important;
        }
      `}</style>
    </>
  );
}
