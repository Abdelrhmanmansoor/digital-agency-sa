import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import Link from "next/link";
import { getWhatsAppLink } from "@/lib/utils";
import styles from "./Article.module.css";
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

  const keywords = isAr ? article.keywordsAr : article.keywordsEn;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
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
          logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
        },
      },
      ...(isRTL && article.faqAr?.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${canonical}#faq`,
              inLanguage: "ar",
              mainEntity: article.faqAr.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
            },
          ]
        : []),
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

  const whatsapp = getWhatsAppLink(
    isRTL ? `مرحبًا، قرأت مقال «${title}» وأريد تطبيقه على متجري.` : `Hello, I read "${title}" and would like it applied to my store.`
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteShell>
      <PageShell>
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
              <div className={styles.meta}>
                <time dateTime={article.date}>{article.date}</time>
                <span>
                  {article.readTime} {isRTL ? "دقيقة قراءة" : locale === "fr" ? "min de lecture" : "min read"}
                </span>
              </div>
            }
          />

          <Section tone="paper">
            <div className={styles.layout}>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: isRTL ? article.contentAr : article.contentEn }}
              />

              <aside className={styles.aside}>
                <div className={styles.asideCard}>
                  <p className={styles.asideTitle}>
                    {isRTL ? "من نفس الموضوع" : locale === "fr" ? "Même sujet" : "More in this topic"}
                  </p>
                  <ul>
                    {related.map((rel) => (
                      <li key={rel.id}>
                        <Link href={`/${locale}/blog/${rel.id}`}>{isRTL ? rel.titleAr : rel.titleEn}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${locale}/blog`} className={styles.all}>
                    {isRTL ? "كل المقالات" : locale === "fr" ? "Tous les articles" : "All articles"}
                    <span aria-hidden>{isRTL ? "←" : "→"}</span>
                  </Link>
                </div>
                <div className={styles.help}>
                  <b>{isRTL ? "تحتاج من ينفّذ هذا؟" : locale === "fr" ? "Besoin d'aide pour l'appliquer ?" : "Need this done for you?"}</b>
                  <p>{isRTL ? "نرد خلال ساعة بخطة وسعر." : locale === "fr" ? "Plan et prix en une heure." : "A plan and a price within the hour."}</p>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold">
                    {isRTL ? "تحدث معنا على واتساب" : "WhatsApp"}
                  </a>
                </div>
              </aside>
            </div>
          </Section>

          <Section tone="ink" tight>
            <div className={styles.cta}>
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
              <div className={styles.ctaActions}>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  {isRTL ? "أرسل رابط متجرك" : locale === "fr" ? "Envoyer ma boutique" : "Send your store link"}
                </a>
                <Link href={`/${locale}/store`} className={styles.ghost}>
                  {isRTL ? "تصفح المنتجات" : locale === "fr" ? "Voir les produits" : "Browse products"}
                </Link>
              </div>
            </div>
          </Section>
      </PageShell>
      </SiteShell>

    </>
  );
}
