import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import Link from "next/link";
import BlogIndex from "@/components/blog/BlogIndex";
import { PageHero, PageShell, Section } from "@/components/layout/PageShell";
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
      <SiteShell>
        <PageShell>
          <PageHero
            crumbs={[{ label: isRTL ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home", href: `/${locale}` }, { label: data.kicker }]}
            crumbsLabel={isRTL ? "مسار التنقل" : "Breadcrumb"}
            kicker={data.kicker}
            title={data.h1}
            lead={data.lead}
          />
          <Section tight>
            <BlogIndex locale={locale} />
          </Section>
        </PageShell>
      </SiteShell>
    </>
  );
}
