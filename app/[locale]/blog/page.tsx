import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import BlogIndex from "@/components/blog/BlogIndex";
import { ARTICLES } from "@/lib/articles";
import { SITE_URL, LOCALES, hreflangMap } from "@/lib/site";

const seo = {
  ar: {
    title: "مدونة التجارة الإلكترونية | تصميم متاجر سلة وزد وSEO",
    description:
      "دليل عملي لأصحاب متاجر سلة وزد وشوبيفاي: التأسيس، الكتالوج، الطلبات، الدفع والفوترة، الشحن، التصميم، التسويق، والظهور في البحث.",
    kicker: "المدونة",
    h1: "مقالات تساعد متجرك على البيع",
    lead: "خمسون مقالًا مرتبة في ثمانية محاور، مكتوبة من أسئلة تصل التجّار فعلًا — لا نظريات عامة.",
  },
  en: {
    title: "E-commerce Blog | Salla & Zid Store Design, CRO and SEO",
    description:
      "A practical guide for Salla, Zid and Shopify merchants: setup, catalogue, orders, payments, shipping, design, marketing and search visibility.",
    kicker: "Blog",
    h1: "Articles that help your store sell",
    lead: "Fifty articles across eight topics, written from the questions merchants actually ask — not general theory.",
  },
  fr: {
    title: "Blog e-commerce | Design de boutiques Salla & Zid, CRO et SEO",
    description:
      "Un guide pratique pour les marchands Salla, Zid et Shopify : création, catalogue, commandes, paiement, livraison, design, marketing et référencement.",
    kicker: "Blog",
    h1: "Des articles qui aident votre boutique à vendre",
    lead: "Cinquante articles en huit thèmes, écrits à partir des questions que les marchands posent réellement.",
  },
} as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = (locale in seo ? locale : "en") as keyof typeof seo;
  const data = seo[lang];
  const canonical = `${SITE_URL}/${lang}/blog`;

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical,
      languages: hreflangMap("/blog"),
    },
    openGraph: {
      type: "website",
      title: data.title,
      description: data.description,
      url: canonical,
      siteName: "AM Design",
    },
    twitter: { card: "summary_large_image", title: data.title, description: data.description },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale in seo ? locale : "en") as keyof typeof seo;
  const data = seo[lang];
  const isRTL = locale === "ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/${locale}/blog#blog`,
        name: data.title,
        description: data.description,
        inLanguage: locale,
        publisher: { "@type": "Organization", name: "AM Design", url: SITE_URL },
        /* Articles carry no hero image — the index is typographic — so no
           `image` is declared rather than declaring one that does not exist. */
        blogPost: ARTICLES.map((a) => ({
          "@type": "BlogPosting",
          headline: isRTL ? a.titleAr : a.titleEn,
          url: `${SITE_URL}/${locale}/blog/${a.id}`,
          datePublished: a.date,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isRTL ? "الرئيسية" : "Home", item: `${SITE_URL}/${locale}` },
          { "@type": "ListItem", position: 2, name: data.kicker, item: `${SITE_URL}/${locale}/blog` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* Header block — white identity, matching the rest of the site.
            This page used to open on a near-black hero left over from the
            previous palette, so the blog read as a different product. */}
        <section data-own-spacing style={{ background: "#FFFFFF", borderBottom: "1px solid #EAEAE6" }}>
          <div className="max-w-[1400px] mx-auto px-4 md:px-8" style={{ paddingBlock: "56px 44px" }}>
            <nav
              aria-label={isRTL ? "مسار التنقل" : "Breadcrumb"}
              style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "22px", fontSize: "13px" }}
            >
              <Link href={`/${locale}`} style={{ color: "#6B6B6B", textDecoration: "none" }}>
                {isRTL ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home"}
              </Link>
              <span aria-hidden style={{ color: "#DCDCD6" }}>/</span>
              <span style={{ color: "#111111", fontWeight: 600 }}>{data.kicker}</span>
            </nav>
            <p
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8A6D00",
                marginBottom: "14px",
              }}
            >
              {data.kicker}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 700,
                color: "#111111",
                lineHeight: 1.15,
                marginBottom: "18px",
                maxWidth: "18ch",
              }}
            >
              {data.h1}
            </h1>
            <p style={{ color: "#6B6B6B", fontSize: "17px", lineHeight: 1.85, maxWidth: "62ch" }}>{data.lead}</p>
          </div>
        </section>

        <section data-own-spacing style={{ background: "#FAFAF8", paddingBlock: "48px 80px" }}>
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <BlogIndex locale={locale} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
