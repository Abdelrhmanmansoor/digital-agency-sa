import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import ThemeCoupons from "@/components/theme-coupons/ThemeCoupons";
import { COPY } from "@/components/theme-coupons/copy";
import { ACTIVE_COUPONS, COUPONS_UPDATED, SECTORS, afterCoupon } from "@/lib/theme-coupons";
import { SITE_URL, hreflangMap } from "@/lib/site";

interface Props {
  params: Promise<{ locale: string }>;
}

/* French reads the English page, as the market pages do. */
const langOf = (locale: string) => (locale === "ar" ? "ar" : "en") as "ar" | "en";
const PATH = "/salla-theme-coupons";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lang = langOf(locale);
  const t = COPY[lang];
  const canonical = `${SITE_URL}/${locale}${PATH}`;
  const cover = `${SITE_URL}/themes/coupons/selia.webp`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: [...t.keywords],
    alternates: { canonical, languages: hreflangMap(PATH) },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: canonical,
      siteName: "AM Design",
      type: "website",
      locale: lang === "ar" ? "ar_SA" : "en_US",
      images: [{ url: cover, width: 960, height: 480, alt: t.h1 }],
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDescription, images: [cover] },
  };
}

export default async function SallaThemeCouponsPage({ params }: Props) {
  const { locale } = await params;
  const lang = langOf(locale);
  const t = COPY[lang];
  const url = `${SITE_URL}/${locale}${PATH}`;

  /* Everything a search engine reads here is also visible on the page: the
     theme list, prices, ratings and FAQ. Nothing is hidden from visitors. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: t.metaTitle,
        description: t.metaDescription,
        inLanguage: lang,
        dateModified: COUPONS_UPDATED,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#agency` },
        primaryImageOfPage: `${SITE_URL}/themes/coupons/selia.webp`,
        mainEntity: { "@id": `${url}#themes` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#themes`,
        name: t.gridTitle,
        numberOfItems: ACTIVE_COUPONS.length,
        itemListElement: ACTIVE_COUPONS.map((th, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${url}#theme-${th.slug}`,
          item: {
            "@type": "Product",
            name: lang === "ar" ? `ثيم ${th.name} لمنصة سلة` : `${th.latin} theme for Salla`,
            image: `${SITE_URL}/themes/coupons/${th.slug}.webp`,
            description: lang === "ar" ? `ثيم سلة مناسب لـ${SECTORS[th.sector].arFor}. كود خصم 20%.` : `A Salla theme for ${SECTORS[th.sector].enFor}. 20% coupon.`,
            category: SECTORS[th.sector][lang],
            brand: { "@type": "Brand", name: th.developer },
            offers: {
              "@type": "Offer",
              url: th.link,
              priceCurrency: "SAR",
              price: afterCoupon(th.price),
              availability: "https://schema.org/InStock",
              priceValidUntil: "2026-12-31",
            },
            ...(th.reviews > 0 && {
              aggregateRating: { "@type": "AggregateRating", ratingValue: th.rating, reviewCount: th.reviews, bestRating: 5 },
            }),
          },
        })),
      },
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: t.stepsTitle,
        inLanguage: lang,
        step: t.steps.map(([, name, text], i) => ({ "@type": "HowToStep", position: i + 1, name, text })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        mainEntity: t.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "AM Design", item: `${SITE_URL}/${locale}` },
          { "@type": "ListItem", position: 2, name: t.crumbsHere, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteShell>
        <ThemeCoupons lang={lang} locale={locale} />
      </SiteShell>
    </>
  );
}
