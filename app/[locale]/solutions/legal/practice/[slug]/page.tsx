import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import LegalLanding from "@/components/legal/LegalLanding";
import { PRACTICE_LANDINGS, getPractice } from "@/lib/legal-landing";
import { PRACTICE_AREAS } from "@/lib/legal-data";
import { legalJsonLd, legalLang, legalMetadata } from "@/lib/legal-seo";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ["ar", "en", "fr"].flatMap((locale) => PRACTICE_LANDINGS.map((x) => ({ locale, slug: x.slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getPractice(slug);
  if (!page) return {};
  return legalMetadata({
    lang: legalLang(locale),
    locale,
    path: `/solutions/legal/practice/${slug}`,
    title: page.title,
    description: page.lead,
    keywords: page.keywords,
  });
}

export default async function PracticePage({ params }: Params) {
  const { locale, slug } = await params;
  const page = getPractice(slug);
  if (!page) notFound();
  const lang = legalLang(locale);
  const area = PRACTICE_AREAS.find((a) => a.key === page.area);
  const kicker = area ? area.name[lang] : page.title[lang];
  const jsonLd = legalJsonLd({
    lang,
    locale,
    path: `/solutions/legal/practice/${slug}`,
    name: page.title[lang].split("|")[0].trim(),
    description: page.lead[lang],
    crumb: kicker,
    areaServed: lang === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia",
    faq: page.faq,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteShell>
        <LegalLanding
          lang={lang}
          kind="practice"
          slug={slug}
          kicker={kicker}
          h1={page.h1[lang]}
          lead={page.lead[lang]}
          searchesTitle={lang === "ar" ? "ماذا يكتب موكّلك في جوجل؟" : "What do your clients type into Google?"}
          searches={page.searches}
          listTitle={lang === "ar" ? "ما نبنيه في موقعك لهذا التخصص" : "What we build for this practice area"}
          list={page.blueprint}
          note={page.angle[lang]}
          faq={page.faq}
          waTopic={kicker}
        />
      </SiteShell>
    </>
  );
}
