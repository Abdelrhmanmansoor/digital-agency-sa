import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle, relatedArticles, clusterOf } from "@/lib/articles";
import { SITE_URL, LOCALES, hreflangMap } from "@/lib/site";
import { PageShell, PageHero, Section } from "@/components/layout/PageShell";

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
    alternates: { canonical, languages: hreflangMap(`/blog/${article.id}`) },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      siteName: "AM Design",
      publishedTime: article.date,
    },
    twitter: { card: "summary_large_image", title, description },
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

  const cluster = clusterOf(article.cluster);
  const related = relatedArticles(id);
  const lang = (locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en") as "ar" | "en" | "fr";
  const canonical = `${SITE_URL}/${locale}/blog/${article.id}`;
  const title = isRTL ? article.titleAr : article.titleEn;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: title,
        description: isRTL ? article.excerptAr : article.excerptEn,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: locale,
        articleSection: cluster[lang],
        mainEntityOfPage: canonical,
        author: { "@type": "Organization", name: "AM Design", url: SITE_URL },
        publisher: {
          "@type": "Organization",
          name: "AM Design",
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isRTL ? "الرئيسية" : "Home", item: `${SITE_URL}/${locale}` },
          { "@type": "ListItem", position: 2, name: isRTL ? "المدونة" : "Blog", item: `${SITE_URL}/${locale}/blog` },
          { "@type": "ListItem", position: 3, name: title, item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <PageShell>
        <main>
          <PageHero
            kicker={cluster[lang]}
            title={title}
            lead={isRTL ? article.excerptAr : article.excerptEn}
            crumbs={[
              { label: isRTL ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home", href: `/${locale}` },
              { label: isRTL ? "المدونة" : "Blog", href: `/${locale}/blog` },
              { label: cluster[lang] },
            ]}
            crumbsLabel={isRTL ? "مسار التنقل" : "Breadcrumb"}
            aside={
              <span
                style={{
                  alignSelf: "start",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "#8d8a82",
                  borderTop: "2px solid #f0b100",
                  paddingTop: "12px",
                  lineHeight: 2,
                }}
              >
                <time dateTime={article.date}>{article.date}</time>
                <br />
                {article.readTime} {isRTL ? "دقيقة قراءة" : locale === "fr" ? "min de lecture" : "min read"}
              </span>
            }
          />

          <Section tone="paper">
            <div className="article-layout">
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: isRTL ? article.contentAr : article.contentEn }}
              />

              <aside className="article-aside">
                <p className="article-aside-title">
                  {isRTL ? "من نفس الموضوع" : locale === "fr" ? "Même sujet" : "More in this topic"}
                </p>
                <ul>
                  {related.map((rel) => (
                    <li key={rel.id}>
                      <Link href={`/${locale}/blog/${rel.id}`}>
                        {isRTL ? rel.titleAr : rel.titleEn}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/${locale}/blog`} className="article-aside-all">
                  {isRTL ? "كل المقالات" : locale === "fr" ? "Tous les articles" : "All articles"}
                  <span aria-hidden>{isRTL ? "←" : "→"}</span>
                </Link>
              </aside>
            </div>
          </Section>

          <Section tone="ink" tight>
            <div className="article-cta">
              <div>
                <h2>
                  {isRTL
                    ? "تريد تطبيق هذا على متجرك؟"
                    : locale === "fr"
                      ? "Appliquer cela à votre boutique ?"
                      : "Want this applied to your store?"}
                </h2>
                <p>
                  {isRTL
                    ? "أرسل رابط متجرك ونبذة قصيرة، ونعود إليك بترتيب مقترح للأولويات."
                    : locale === "fr"
                      ? "Envoyez le lien de votre boutique et un court descriptif ; nous revenons avec un ordre de priorités."
                      : "Send your store link and a short note, and we come back with a suggested order of priorities."}
                </p>
              </div>
              <Link href={`/${locale}/store`}>
                {isRTL ? "تصفح الخدمات" : locale === "fr" ? "Voir les prestations" : "Browse services"}
                <span aria-hidden>{isRTL ? "←" : "→"}</span>
              </Link>
            </div>
          </Section>
        </main>
      </PageShell>
      <Footer />

      <style>{`
        .article-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 280px;
          gap: 64px;
          align-items: start;
        }
        .article-content {
          background: #fff;
          border: 1px solid #e6e2d8;
          padding: 44px 48px;
          max-width: 74ch;
        }
        .article-content h2 {
          font-family: var(--font-arabic-display);
          font-size: clamp(20px, 2.4vw, 27px);
          letter-spacing: -0.02em;
          color: #14140f;
          margin: 40px 0 14px;
          line-height: 1.3;
        }
        .article-content h2:first-child { margin-top: 0; }
        .article-content p {
          color: #46433c;
          font-size: 16.5px;
          line-height: 2;
          margin: 0 0 18px;
        }
        .article-content ul, .article-content ol {
          margin: 0 0 20px;
          padding-${isRTL ? "right" : "left"}: 22px;
          color: #46433c;
        }
        .article-content li { font-size: 16px; line-height: 1.95; margin-bottom: 10px; }
        .article-content strong { color: #14140f; }
        .article-content code {
          font-family: 'Space Mono', monospace;
          font-size: 13.5px;
          background: #f4f2ec;
          padding: 2px 6px;
          color: #14140f;
        }

        .article-aside { position: sticky; top: 130px; }
        .article-aside-title {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8b6900;
          margin: 0 0 14px;
        }
        .article-aside ul {
          list-style: none;
          margin: 0 0 20px;
          padding: 0;
          border-top: 1px solid #e6e2d8;
        }
        .article-aside li { border-bottom: 1px solid #e6e2d8; }
        .article-aside a {
          display: block;
          padding: 14px 0;
          color: #46433c;
          font-size: 15px;
          line-height: 1.6;
          text-decoration: none;
          transition: color .2s;
        }
        .article-aside a:hover { color: #14140f; }
        .article-aside-all {
          display: inline-flex !important;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          color: #8b6900 !important;
        }

        .article-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }
        .article-cta h2 {
          font-family: var(--font-arabic-display);
          font-size: 26px;
          color: #fff;
          margin: 0 0 10px;
          letter-spacing: -0.02em;
        }
        .article-cta p { color: #a9a59b; font-size: 15.5px; line-height: 1.8; margin: 0; max-width: 52ch; }
        .article-cta a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 52px;
          padding-inline: 26px;
          background: #f0b100;
          color: #14140f;
          font-weight: 800;
          text-decoration: none;
          white-space: nowrap;
        }

        @media (max-width: 1000px) {
          .article-layout { grid-template-columns: 1fr; gap: 40px; }
          .article-aside { position: static; }
        }
        @media (max-width: 640px) {
          .article-content { padding: 28px 22px; }
        }
      `}</style>
    </>
  );
}
