import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import LegalSolution from "@/components/legal/LegalSolution";
import { LEGAL_FAQ, PACKAGES, PRACTICE_AREAS } from "@/lib/legal-data";
import { SITE_URL, hreflangMap } from "@/lib/site";

const seo = {
  ar: {
    title: "تصميم مواقع المحامين ومكاتب المحاماة في السعودية | AM Design",
    description:
      "تصميم وتطوير مواقع مكاتب المحاماة والمحامين: صفحة لكل تخصص مهيأة للبحث، ملفات المحامين، حجز استشارة، وبوابة موكّلين. باقات بأسعار ومدد معلنة من 2,900 ر.س.",
    keywords: [
      "تصميم موقع محاماة",
      "تصميم موقع محامي",
      "موقع مكتب محاماة",
      "تصميم مواقع قانونية",
      "سيو مكاتب المحاماة",
      "منصة استشارات قانونية",
      "نظام إدارة قضايا",
      "بوابة موكلين",
    ],
    breadcrumb: "مواقع المحامين ومكاتب المحاماة",
    solutions: "الحلول",
  },
  en: {
    title: "Law Firm Website Design in Saudi Arabia | AM Design",
    description:
      "Websites and platforms for law firms and independent lawyers: a search-ready page per practice area, lawyer profiles, consultation booking and a client portal. Published prices from 2,900 SAR.",
    keywords: [
      "law firm website design",
      "lawyer website design Saudi Arabia",
      "legal website development",
      "law firm SEO",
      "legal consultation platform",
      "case management system",
      "client portal for law firms",
    ],
    breadcrumb: "Law firm websites",
    solutions: "Solutions",
  },
  fr: {
    title: "Création de sites pour cabinets d'avocats en Arabie saoudite | AM Design",
    description:
      "Sites et plateformes pour cabinets d'avocats : une page par domaine de pratique optimisée pour la recherche, profils d'avocats, prise de rendez-vous et espace client. À partir de 2 900 SAR.",
    keywords: [
      "site web cabinet d'avocats",
      "création site avocat",
      "SEO juridique",
      "plateforme de consultation juridique",
      "espace client avocat",
    ],
    breadcrumb: "Sites pour cabinets d'avocats",
    solutions: "Solutions",
  },
} as const;

type Lang = keyof typeof seo;

export function generateStaticParams() {
  return (["ar", "en", "fr"] as const).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const lang = (locale in seo ? locale : "en") as Lang;
  const data = seo[lang];
  const canonical = `${SITE_URL}/${lang}/solutions/legal`;

  return {
    title: data.title,
    description: data.description,
    keywords: [...data.keywords],
    alternates: { canonical, languages: hreflangMap("/solutions/legal") },
    openGraph: {
      title: data.title,
      description: data.description,
      url: canonical,
      siteName: "AM Design",
      type: "website",
      locale: lang === "ar" ? "ar_SA" : lang === "fr" ? "fr_FR" : "en_US",
      images: [{ url: `${SITE_URL}/og.png`, width: 1792, height: 936, alt: "AM Design" }],
    },
    twitter: { card: "summary_large_image", title: data.title, description: data.description, images: [`${SITE_URL}/og.png`] },
  };
}

export default async function LegalSolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = (locale in seo ? locale : "en") as Lang;
  const data = seo[lang];
  const isAr = lang === "ar";
  const url = `${SITE_URL}/${lang}/solutions/legal`;

  /* Three graphs the page can genuinely back: the service itself with its
     published offers, the questions it answers, and where it sits in the
     site. Nothing is described here that the page does not render. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: isAr ? "تصميم وتطوير مواقع مكاتب المحاماة" : "Law firm website design and development",
        description: data.description,
        serviceType: isAr ? "تصميم مواقع للقطاع القانوني" : "Website design for the legal sector",
        provider: { "@type": "ProfessionalService", "@id": `${SITE_URL}/#agency`, name: "AM Design", url: SITE_URL },
        areaServed: { "@type": "Country", name: "Saudi Arabia" },
        audience: { "@type": "Audience", audienceType: isAr ? "مكاتب المحاماة والمحامون" : "Law firms and lawyers" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: isAr ? "باقات مواقع المحاماة" : "Law firm website packages",
          itemListElement: PACKAGES.map((pack) => ({
            "@type": "Offer",
            name: isAr ? pack.name.ar : pack.name.en,
            description: isAr ? pack.summary.ar : pack.summary.en,
            price: pack.price,
            priceCurrency: "SAR",
            availability: "https://schema.org/InStock",
            url: `${url}#packages`,
          })),
        },
        /* The practice areas the build covers, so the page can be understood
           as more than one undifferentiated service. */
        serviceOutput: PRACTICE_AREAS.map((area) => (isAr ? area.name.ar : area.name.en)).join(", "),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        mainEntity: LEGAL_FAQ.map((item) => ({
          "@type": "Question",
          name: isAr ? item.q.ar : item.q.en,
          acceptedAnswer: { "@type": "Answer", text: isAr ? item.a.ar : item.a.en },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "AM Design", item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: data.solutions, item: `${SITE_URL}/${lang}/solutions/legal` },
          { "@type": "ListItem", position: 3, name: data.breadcrumb, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteShell>
        <LegalSolution />
      </SiteShell>
    </>
  );
}
