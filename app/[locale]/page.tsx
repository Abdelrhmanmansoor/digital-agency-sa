import type { Metadata } from "next";
import HomeExperience from "@/components/home/HomeExperience";
import SiteShell from "@/components/layout/SiteShell";
import { HOME_FAQ } from "@/lib/home-faq";
import { SITE_URL } from "@/lib/site";

const seo = {
  ar: {
    title: "تصميم متاجر سلة وزد في السعودية | AM Design",
    description: "تصميم وتطوير متاجر سلة وزد، تحسين التحويل وSEO، الهوية البصرية والتسويق الرقمي للمتاجر الإلكترونية في السعودية.",
    keywords: ["تصميم متجر سلة", "تصميم متجر زد", "تطوير متجر إلكتروني", "تحسين متاجر سلة", "SEO للمتاجر الإلكترونية", "تصميم هوية تجارية", "تسويق المتاجر الإلكترونية", "شركة تصميم متاجر في السعودية"],
  },
  en: {
    title: "Salla & Zid Store Design Saudi Arabia | AM Design",
    description: "Salla and Zid e-commerce design, development, conversion optimization, SEO, branding and digital marketing in Saudi Arabia.",
    keywords: ["Salla store design", "Zid store design", "ecommerce agency Saudi Arabia", "ecommerce SEO Saudi Arabia", "conversion rate optimization", "digital marketing agency Saudi Arabia"],
  },
  fr: {
    title: "Design de boutiques Salla & Zid en Arabie saoudite | AM Design",
    description: "Design et développement e-commerce Salla et Zid, optimisation de conversion, SEO, identité et marketing digital.",
    keywords: ["design boutique Salla", "design boutique Zid", "agence e-commerce Arabie saoudite", "SEO e-commerce", "marketing digital Arabie saoudite"],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale in seo ? (locale as keyof typeof seo) : "en";
  const data = seo[lang];
  const canonical = `${SITE_URL}/${lang}`;
  return {
    title: data.title,
    description: data.description,
    keywords: [...data.keywords],
    alternates: { canonical, languages: { "ar-SA": `${SITE_URL}/ar`, "en": `${SITE_URL}/en`, "fr": `${SITE_URL}/fr`, "x-default": `${SITE_URL}/ar` } },
    openGraph: { title: data.title, description: data.description, url: canonical, siteName: "AM Design", type: "website", locale: lang === "ar" ? "ar_SA" : lang === "fr" ? "fr_FR" : "en_US", images: [{ url: `${SITE_URL}/og.png`, width: 1792, height: 936, alt: "AM Design — E-commerce built to grow" }] },
    twitter: { card: "summary_large_image", title: data.title, description: data.description, images: [`${SITE_URL}/og.png`] },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = (locale in seo ? locale : "en") as keyof typeof seo;
  const faq = HOME_FAQ[lang] ?? HOME_FAQ.en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "ProfessionalService", "@id": `${SITE_URL}/#agency`, name: "AM Design", url: SITE_URL, image: `${SITE_URL}/og.png`, telephone: "+201007835547", email: "mansoor77soliman@gmail.com", priceRange: "$$", areaServed: { "@type": "Country", name: "Saudi Arabia" }, sameAs: ["https://www.instagram.com/amdesign.ksa/", "https://x.com/am_designing", "https://www.tiktok.com/@amdesigne.sa"] },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: "AM Design", publisher: { "@id": `${SITE_URL}/#agency` }, inLanguage: ["ar", "en", "fr"] },
      /* The service list now mirrors the eight tracks the page actually
         renders; it used to name four, half of which were not on the page. */
      { "@type": "ItemList", name: "AM Design Services", itemListElement: ["Salla and Zid Store Design & Development", "Brand Identity and Creative Design", "E-commerce SEO and Conversion Optimization", "Digital Marketing and Campaign Management", "Custom Apps and Dashboards", "Automation and Systems Integration", "AI Product Photography and Content", "Exhibition Booth Design"].map((name, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Service", name, provider: { "@id": `${SITE_URL}/#agency` }, areaServed: { "@type": "Country", name: "Saudi Arabia" } } })) },
      /* The FAQ section was rendered but never described, so it could never
         qualify for an FAQ rich result. */
      { "@type": "FAQPage", "@id": `${SITE_URL}/${lang}#faq`, inLanguage: lang, mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "AM Design", item: `${SITE_URL}/${lang}` }] },
    ],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><SiteShell><HomeExperience /></SiteShell></>;
}
