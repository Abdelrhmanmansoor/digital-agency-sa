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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  /* ── Titles — SEO keyword pattern: [primary keyword] + [geo] + [year] | [brand] ── */
  const metaTitle =
    locale === "ar"
      ? "تصميم متجر سلة وزد احترافي في السعودية 2026 | وكالة تسويق رقمي"
      : locale === "fr"
      ? "Conception Boutique Salla & Zid Professionnelle en Arabie 2026 | Agence Marketing Digital"
      : "Professional Salla & Zid Store Design Saudi Arabia 2026 | Digital Marketing Agency";

  /* ── Descriptions — keyword-dense but readable ── */
  const metaDesc =
    locale === "ar"
      ? "متخصصون في تصميم متجر سلة وزد احترافي يزيد مبيعاتك — تخصيص ثيم سلة، ربط بوابات الدفع تابي وتمارا وSTC Pay، إعداد المنتجات، SEO للمتاجر. نخدم الرياض وجدة والسعودية. تسويق رقمي، هوية بصرية، إعلانات سناب وجوجل. تواصل واتساب."
      : locale === "fr"
      ? "Experts en boutique Salla & Zid en Arabie Saoudite — thème personnalisé, passerelles de paiement, SEO e-commerce, marketing digital, identité visuelle. Contactez-nous sur WhatsApp."
      : "Specialists in Salla & Zid store design Saudi Arabia — custom themes, payment gateways (Tabby, Tamara, STC Pay), product setup, SEO for stores. Serving Riyadh, Jeddah & all KSA. WhatsApp for pricing.";

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
          // زد — secondary cluster
          "تصميم متجر زد",
          "تصميم متجر زد في السعودية",
          "تجهيز متجر زد من الصفر",
          "تصميم متجر سلة وزد",
          // متاجر عامة
          "إنشاء متجر الكتروني",
          "تصميم متجر الكتروني بالسعودية",
          // وكالة تسويق
          "وكالة تسويق رقمي في السعودية",
          "أفضل وكالة تسويق رقمي بالرياض",
          // خدمات أخرى
          "تصميم موقع مكتب محاماة",
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
          "site web cabinet avocats",
          "SEO boutique en ligne",
        ]
      : [
          "Salla store design Saudi Arabia",
          "Zid store design Saudi Arabia",
          "custom Salla theme design",
          "Salla store setup",
          "digital marketing agency Riyadh",
          "law firm website Saudi Arabia",
          "brand identity design",
          "SEO for online stores",
          "Snapchat ads Saudi",
          "social media management Saudi Arabia",
        ];

  /* ── OG title (shorter, for social sharing) ── */
  const metaOgTitle =
    locale === "ar"
      ? "تصميم متجر سلة وزد + هوية بصرية + تسويق رقمي — السعودية"
      : locale === "fr"
      ? "Boutique Salla & Zid + Identité Visuelle + Marketing Digital"
      : "Salla & Zid Store Design + Branding + Digital Marketing — KSA";

  const metaTwitterTitle =
    locale === "ar"
      ? "أفضل وكالة تصميم متجر سلة وزد في السعودية 2026"
      : locale === "fr"
      ? "Meilleure agence Salla & Zid en Arabie Saoudite"
      : "Best Salla & Zid Store Design Agency in Saudi Arabia 2026";

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
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <PartnersMarquee />
        <Services />
        <Portfolio />
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
