import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StoreContent from "@/components/store/StoreContent";
import FloatingActions from "@/components/home/FloatingActions";
import ScrollProgress from "@/components/layout/ScrollProgress";
import { PRODUCTS } from "@/lib/store-data";
import { STORE_FAQ } from "@/lib/store-faq";
import { SITE_URL, hreflangMap } from "@/lib/site";

/* ─── SEO Metadata ───────────────────────────────────────── */
/* Rewritten: the previous copy sold on "رخيص / cheap" and an unverifiable
   "70% cheaper than competitors", which contradicts the positioning the rest
   of the site builds and is a claim nothing on the site substantiates. The
   price anchor and the phased-payment promise are real and stay. */
const seo = {
  ar: {
    title: "متجر الخدمات الرقمية | باقات تصميم متاجر سلة وزد بأسعار معلنة",
    description:
      "خدمات المتاجر الإلكترونية بسعر ومدة معلنين: ثيم سلة مخصص من 399 ر.س، تجهيز متجر كامل من 1,099 ر.س، هوية بصرية، سيو، تصوير منتجات وتسويق.",
    listName: "متجر الخدمات الرقمية",
    listDescription: "باقات تصميم وتطوير وتسويق المتاجر الإلكترونية بأسعار ومدد معلنة.",
  },
  en: {
    title: "Digital Services Store | Salla & Zid Packages with Public Pricing",
    description:
      "E-commerce services with published prices and timelines: custom Salla theme from 399 SAR, full store setup from 1,099 SAR, brand identity, SEO, product photography and marketing.",
    listName: "Digital Services Store",
    listDescription: "E-commerce design, development and marketing packages with published prices and timelines.",
  },
  fr: {
    title: "Boutique de services | Offres Salla & Zid à prix affichés",
    description:
      "Services e-commerce à prix et délais affichés : thème Salla sur mesure dès 399 SAR, boutique complète dès 1 099 SAR, identité visuelle, SEO et marketing.",
    listName: "Boutique de services numériques",
    listDescription: "Offres de design, développement et marketing e-commerce à prix et délais affichés.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = (locale in seo ? locale : "en") as keyof typeof seo;
  const data = seo[lang];
  const canonical = `${SITE_URL}/${lang}/store`;

  return {
    title: data.title,
    description: data.description,
    /* Trimmed from 24 near-duplicate phrases to the intents this page can
       actually answer. */
    keywords:
      lang === "ar"
        ? [
            "باقات تصميم متجر سلة",
            "أسعار تصميم متجر سلة",
            "تصميم ثيم سلة مخصص",
            "تجهيز متجر سلة كامل",
            "تصميم متجر زد",
            "سيو المتاجر الإلكترونية",
            "تصميم هوية بصرية لمتجر إلكتروني",
          ]
        : [
            "Salla store design packages",
            "Salla store design pricing",
            "custom Salla theme",
            "Zid store setup",
            "ecommerce SEO Saudi Arabia",
            "ecommerce brand identity",
          ],
    alternates: { canonical, languages: hreflangMap("/store") },
    openGraph: {
      title: data.title,
      description: data.description,
      url: canonical,
      /* Was a keyword phrase rather than the publisher's name. */
      siteName: "AM Design",
      locale: lang === "ar" ? "ar_SA" : lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: data.title, description: data.description },
  };
}

/* ─── JSON-LD ────────────────────────────────────────────────
   Both graphs are now derived from the same data the page renders. The
   ItemList used to declare `numberOfItems: 8` while listing three hand-typed
   services, and the FAQPage asked questions the visible FAQ never showed —
   markup that does not match the page is a structured-data policy breach. */
function buildJsonLd(lang: keyof typeof seo, locale: string) {
  const isAr = lang === "ar";
  const data = seo[lang];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/${locale}/store#catalog`,
        name: data.listName,
        description: data.listDescription,
        numberOfItems: PRODUCTS.length,
        itemListElement: PRODUCTS.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: isAr ? product.nameAr : product.nameEn,
            description: isAr ? product.shortDescAr : product.shortDescEn,
            url: `${SITE_URL}/${locale}/store/${product.slug}`,
            provider: { "@type": "Organization", name: "AM Design", url: SITE_URL },
            offers: {
              "@type": "Offer",
              price: String(product.price),
              priceCurrency: "SAR",
              availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              url: `${SITE_URL}/${locale}/store/${product.slug}`,
            },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/${locale}/store#faq`,
        inLanguage: lang,
        mainEntity: STORE_FAQ[lang].map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isAr ? "الرئيسية" : "Home", item: `${SITE_URL}/${locale}` },
          { "@type": "ListItem", position: 2, name: data.listName, item: `${SITE_URL}/${locale}/store` },
        ],
      },
    ],
  };
}

/* ─── Page Component ─────────────────────────────────────── */
export default async function StorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = (locale in seo ? locale : "en") as keyof typeof seo;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang, locale)) }}
      />
      <ScrollProgress />
      <Header />
      <main>
        <StoreContent />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
