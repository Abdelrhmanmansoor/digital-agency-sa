import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import LegalLanding from "@/components/legal/LegalLanding";
import { CITY_LANDINGS, getCity } from "@/lib/legal-landing";
import { legalJsonLd, legalLang, legalMetadata } from "@/lib/legal-seo";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ["ar", "en", "fr"].flatMap((locale) => CITY_LANDINGS.map((x) => ({ locale, slug: x.slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getCity(slug);
  if (!page) return {};
  return legalMetadata({
    lang: legalLang(locale),
    locale,
    path: `/solutions/legal/city/${slug}`,
    title: page.title,
    description: page.lead,
    keywords: page.keywords,
  });
}

export default async function CityPage({ params }: Params) {
  const { locale, slug } = await params;
  const page = getCity(slug);
  if (!page) notFound();
  const lang = legalLang(locale);
  const city = page.name[lang];
  const jsonLd = legalJsonLd({
    lang,
    locale,
    path: `/solutions/legal/city/${slug}`,
    name: page.title[lang].split("|")[0].trim(),
    description: page.lead[lang],
    crumb: city,
    areaServed: city,
    faq: page.faq,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteShell>
        <LegalLanding
          lang={lang}
          kind="city"
          slug={slug}
          kicker={city}
          h1={page.h1[lang]}
          lead={page.lead[lang]}
          searchesTitle={lang === "ar" ? `ماذا يبحث الناس في ${city}؟` : `What people in ${city} search for`}
          searches={page.searches}
          listTitle={lang === "ar" ? `ما نبنيه لمكتب في ${city}` : `What we build for a firm in ${city}`}
          list={page.local}
          districts={page.districts}
          faq={page.faq}
          waTopic={city}
        />
      </SiteShell>
    </>
  );
}
