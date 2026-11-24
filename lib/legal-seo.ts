import type { Metadata } from "next";
import { SITE_URL, hreflangMap } from "./site";
import { PACKAGES, type Pair } from "./legal-data";

/* Shared metadata and structured data for the lawyer landing pages. French
   falls back to English, as on /solutions/legal itself. */

type Lang = "ar" | "en";
export const legalLang = (locale: string): Lang => (locale === "ar" ? "ar" : "en");

export function legalMetadata(opts: {
  lang: Lang;
  locale: string;
  path: string;
  title: Pair;
  description: Pair;
  keywords: { ar: string[]; en: string[] };
}): Metadata {
  const { lang, locale, path } = opts;
  const canonical = `${SITE_URL}/${locale}${path}`;
  const title = opts.title[lang];
  const description = opts.description[lang];
  return {
    title,
    description,
    keywords: [...opts.keywords[lang]],
    alternates: { canonical, languages: hreflangMap(path) },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "AM Design",
      type: "website",
      locale: lang === "ar" ? "ar_SA" : "en_US",
      images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "AM Design" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og.png`] },
  };
}

export function legalJsonLd(opts: {
  lang: Lang;
  locale: string;
  path: string;
  name: string;
  description: string;
  crumb: string;
  areaServed: string;
  faq: { q: Pair; a: Pair }[];
}) {
  const { lang, locale, path } = opts;
  const url = `${SITE_URL}/${locale}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: opts.name,
        description: opts.description,
        url,
        serviceType: lang === "ar" ? "تصميم مواقع المحامين ومكاتب المحاماة" : "Law firm website design",
        provider: { "@id": `${SITE_URL}/#agency` },
        areaServed: { "@type": "Place", name: opts.areaServed },
        audience: { "@type": "BusinessAudience", audienceType: lang === "ar" ? "المحامون ومكاتب المحاماة" : "Lawyers and law firms" },
        offers: PACKAGES.map((p) => ({
          "@type": "Offer",
          name: p.name[lang],
          price: p.price,
          priceCurrency: "SAR",
          availability: "https://schema.org/InStock",
          url: `${url}#packages`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: locale,
        mainEntity: opts.faq.map((f) => ({
          "@type": "Question",
          name: f.q[lang],
          acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "AM Design", item: `${SITE_URL}/${locale}` },
          { "@type": "ListItem", position: 2, name: lang === "ar" ? "مواقع المحامين" : "Law firm websites", item: `${SITE_URL}/${locale}/solutions/legal` },
          { "@type": "ListItem", position: 3, name: opts.crumb, item: url },
        ],
      },
    ],
  };
}
