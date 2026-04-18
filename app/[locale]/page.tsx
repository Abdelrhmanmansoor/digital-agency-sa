import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Header from "@/components/layout/Header";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Hero from "@/components/home/Hero";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import Services from "@/components/home/Services";
import Portfolio from "@/components/home/Portfolio";
import MidCTA from "@/components/home/MidCTA";
import Pricing from "@/components/home/Pricing";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/home/FloatingActions";
import AIPhotography from "@/components/home/AIPhotography";
import EcommerceSection from "@/components/home/EcommerceSection";
import SocialMediaSection from "@/components/home/SocialMediaSection";
import GoldGuarantee from "@/components/home/GoldGuarantee";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  /* ── Titles — SEO keyword pattern: [primary keyword] + [geo] + [year] | [brand] ── */
  const metaTitle =
    locale === "ar"
      ? "تصميم متجر سلة وزد احترافي يبيع يومياً 2026 | أفضل وكالة رقمية السعودية"
      : locale === "fr"
      ? "Conception Boutique Salla & Zid Pro en Arabie 2026 | Agence Marketing Digital"
      : "Salla & Zid Store Design That Sells Daily 2026 | Top Saudi Digital Agency";

  /* ── Descriptions — keyword-dense but readable ── */
  const metaDesc =
    locale === "ar"
      ? "نحوّل فكرتك إلى متجر إلكتروني يبيع يومياً — تصميم متجر سلة وزد احترافي، تصوير منتجات بالذكاء الاصطناعي، تحسين معدل التحويل CRO، بناء فنل مبيعات، SEO، إعلانات سناب وجوجل. نخدم الرياض وجدة وكامل السعودية. رد خلال أقل من ساعة."
      : locale === "fr"
      ? "Experts Salla & Zid en Arabie Saoudite — thème personnalisé, photographie IA, CRO, entonnoir de vente, SEO, publicités. Réponse en moins d'1 heure."
      : "We turn your idea into a daily-selling e-commerce store — Salla & Zid design, AI product photography, conversion optimization, sales funnels, SEO & ads. Serving all KSA. Reply in under 1 hour.";

  /* ── Keywords per locale ── */
  const metaKeywords =
    locale === "ar"
      ? [
          // سلة — primary cluster
          "تصميم متجر سلة احترافي",
          "تصميم متجر سلة في الرياض",
          "تصميم متجر سلة في السعودية",
          "تخصيص ثيم سلة",
          "تصميم ثيم سلة احترافي",
          "تجهيز متجر سلة كامل",
          "تصميم متجر سلة يزيد المبيعات",
          "أفضل شركة تصميم متجر سلة",
          "شركة تصميم متجر سلة الرياض",
          "تصميم صفحات منتجات سلة",
          "ربط بوابة دفع سلة",
          "إطلاق متجر سلة جاهز",
          "تعديل CSS سلة",
          "تعديلات سلة",
          "خبراء منصة سلة",
          // زد — secondary cluster
          "تصميم متجر زد",
          "تصميم متجر زد في السعودية",
          "تجهيز متجر زد من الصفر",
          "تصميم متجر سلة وزد",
          "متجر سلة زد",
          "متاجر السعودية",
          // شركة تسويق
          "افضل شركة تسويق سعودية",
          "وكالة تسويق رقمي في السعودية",
          "أفضل وكالة تسويق رقمي بالرياض",
          "شركة تسويق سعودية",
          "شركة برمجة سعودية",
          "أفضل شركة تسويق",
          // كيفية الإنشاء
          "كيف اصمم متجر سعودي",
          "إنشاء متجر الكتروني",
          "تصميم متجر الكتروني بالسعودية",
          // ادفاز
          "ادفاز",
          "خبراء المنصات",
          // خدمات تخصصية
          "تصوير منتجات بالذكاء الاصطناعي",
          "تحسين معدل التحويل",
          "بناء فنل مبيعات",
          "تصميم هوية بصرية احترافية",
          "موشن جرافيك",
          "إعلانات سناب شات السعودية",
          "إعلانات جوجل بالسعودية",
          "إدارة حسابات سوشيال ميديا",
          "تحسين محركات البحث SEO",
          "سيو للمتاجر الالكترونية",
          "ربط تابي وتمارا",
        ]
      : locale === "fr"
      ? [
          "conception boutique Salla",
          "conception boutique Zid",
          "agence marketing digital Arabie Saoudite",
          "design identité visuelle",
          "photographie produits IA",
          "SEO boutique en ligne",
          "entonnoir de vente",
        ]
      : [
          "Salla store design Saudi Arabia",
          "Zid store design Saudi Arabia",
          "custom Salla theme design",
          "Salla store setup",
          "digital marketing agency Riyadh",
          "AI product photography Saudi",
          "conversion rate optimization Saudi Arabia",
          "sales funnel building",
          "brand identity design Saudi",
          "SEO for online stores Saudi Arabia",
          "Snapchat ads Saudi",
          "social media management Saudi Arabia",
          "best digital agency Saudi Arabia",
        ];

  /* ── OG title (shorter, for social sharing) ── */
  const metaOgTitle =
    locale === "ar"
      ? "نحوّل فكرتك لمتجر يبيع يومياً — سلة + زد + تصوير AI + تسويق رقمي"
      : locale === "fr"
      ? "Transformez Votre Idée en Boutique Qui Vend Chaque Jour"
      : "Turn Your Idea Into a Store That Sells Daily — Salla, Zid, AI & Marketing";

  const metaTwitterTitle =
    locale === "ar"
      ? "أفضل وكالة تصميم متجر سلة وزد + تصوير AI في السعودية 2026"
      : locale === "fr"
      ? "Meilleure agence Salla & Zid + Photographie IA en Arabie Saoudite"
      : "Best Salla & Zid Store Design + AI Photography Agency in Saudi Arabia 2026";

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: metaKeywords,
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: "/ar", en: "/en", fr: "/fr" },
    },
    openGraph: {
      title: metaOgTitle,
      description: metaDesc,
      url: `https://www.solimanx.com/${locale}`,
      siteName:
        locale === "ar" ? "تصميم متجر سلة احترافي" : locale === "fr" ? "Conception Boutique Salla" : "Salla Store Design",
      locale: locale === "ar" ? "ar_SA" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTwitterTitle,
      description: metaDesc,
    },
  };
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.solimanx.com/#business",
        "name": "وكالة رقمية — AM Design",
        "alternateName": "AM Design KSA",
        "description": "وكالة رقمية متخصصة في تصميم متاجر سلة وزد، تصوير منتجات بالذكاء الاصطناعي، وتسويق رقمي في السعودية",
        "url": "https://www.solimanx.com",
        "telephone": "+201007835547",
        "priceRange": "1499 SAR - 5999 SAR",
        "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
        "address": { "@type": "PostalAddress", "addressCountry": "SA" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "300",
          "bestRating": "5",
          "worstRating": "1",
        },
        "sameAs": [
          "https://www.instagram.com/amdesign.ksa/",
          "https://x.com/am_designing",
          "https://www.tiktok.com/@amdesigne.sa",
        ],
      },
      {
        "@type": "Service",
        "@id": "https://www.solimanx.com/#salla-design",
        "name": "تصميم متجر سلة احترافي",
        "description": "تصميم وتخصيص متجر سلة احترافي يزيد المبيعات — ثيم مخصص، ربط بوابات دفع، تجهيز كامل",
        "provider": { "@id": "https://www.solimanx.com/#business" },
        "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
        "offers": {
          "@type": "Offer",
          "price": "1499",
          "priceCurrency": "SAR",
        },
      },
      {
        "@type": "Service",
        "@id": "https://www.solimanx.com/#ai-photography",
        "name": "تصوير منتجات بالذكاء الاصطناعي",
        "description": "تصوير منتجات احترافي بالذكاء الاصطناعي بجودة إعلانية — بدون تكلفة استوديو",
        "provider": { "@id": "https://www.solimanx.com/#business" },
        "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.solimanx.com/#website",
        "url": "https://www.solimanx.com",
        "name": "AM Design — تصميم متجر سلة وزد",
        "inLanguage": ["ar", "en", "fr"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.solimanx.com/ar?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LoadingScreen />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <PartnersMarquee />
        <Services />
        <AIPhotography />
        <EcommerceSection />
        <Portfolio />
        <SocialMediaSection />
        <GoldGuarantee />
        <MidCTA />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
