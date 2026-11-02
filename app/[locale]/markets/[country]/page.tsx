import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import MarketLanding from "@/components/markets/MarketLanding";
import { MARKETS, getMarket } from "@/lib/markets";
import { SITE_URL, hreflangMap } from "@/lib/site";

interface Props {
  params: Promise<{ locale: string; country: string }>;
}

export function generateStaticParams() {
  return MARKETS.flatMap((m) => ["ar", "en", "fr"].map((locale) => ({ locale, country: m.slug })));
}

/* French reads the English page: the audience for these markets searches in
   Arabic or English. */
const langOf = (locale: string) => (locale === "ar" ? "ar" : "en") as "ar" | "en";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country } = await params;
  const m = getMarket(country);
  if (!m) return { title: "Not Found", robots: { index: false, follow: false } };
  const lang = langOf(locale);
  const onlySalla = !m.platforms.includes("zid");

  const title =
    lang === "ar"
      ? `تصميم متجر إلكتروني ${m.inName.ar} | ${onlySalla ? "متاجر سلة" : "متاجر سلة وزد"} — AM Design`
      : `Online Store Design ${m.inName.en} | ${onlySalla ? "Salla" : "Salla & Zid"} Stores — AM Design`;
  const description =
    lang === "ar"
      ? `تصميم وتجهيز متاجر ${onlySalla ? "سلة" : "سلة وزد"} لتجار ${m.name.ar}: ${m.cities.ar.slice(0, 3).join("، ")}. دفع وشحن وضريبة مضبوطة على السوق، وإطلاق من 7 أيام عمل. تواصل عبر واتساب.`
      : `${onlySalla ? "Salla" : "Salla and Zid"} store design and setup for merchants in ${m.name.en}: ${m.cities.en.slice(0, 3).join(", ")}. Payments, shipping and tax set for the market; launch from 7 working days.`;
  const canonical = `${SITE_URL}/${locale}/markets/${m.slug}`;

  return {
    title,
    description,
    keywords: m.keywords[lang],
    alternates: { canonical, languages: hreflangMap(`/markets/${m.slug}`) },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "AM Design",
      type: "website",
      locale: lang === "ar" ? "ar_SA" : "en_US",
      images: [{ url: `${SITE_URL}/hero/hero-desktop.webp`, width: 1672, height: 941 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function MarketPage({ params }: Props) {
  const { locale, country } = await params;
  const m = getMarket(country);
  if (!m) notFound();
  const lang = langOf(locale);
  const url = `${SITE_URL}/${locale}/markets/${m.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: lang === "ar" ? `تصميم متجر إلكتروني ${m.inName.ar}` : `Online store design ${m.inName.en}`,
        serviceType: "E-commerce store design and development",
        provider: { "@id": `${SITE_URL}/#agency` },
        areaServed: { "@type": "Country", name: m.name.en },
        availableChannel: { "@type": "ServiceChannel", serviceUrl: url },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        mainEntity: m.faq[lang].map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "AM Design", item: `${SITE_URL}/${locale}` },
          { "@type": "ListItem", position: 2, name: m.name[lang], item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteShell>
        <MarketLanding market={m} lang={lang} locale={locale} />
      </SiteShell>
    </>
  );
}
