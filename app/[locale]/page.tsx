import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Header from "@/components/layout/Header";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Hero from "@/components/home/Hero";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import TechStack from "@/components/home/TechStack";
import FeaturedPartner from "@/components/home/FeaturedPartner";
import Services from "@/components/home/Services";
import PlatformCertifications from "@/components/home/PlatformCertifications";
import WorkProcess from "@/components/home/WorkProcess";
import Pricing from "@/components/home/Pricing";
import Portfolio from "@/components/home/Portfolio";
import AboutAgency from "@/components/home/AboutAgency";
import LawyerProduct from "@/components/home/LawyerProduct";
import RadarPromo from "@/components/home/RadarPromo";
import BlogPreview from "@/components/home/BlogPreview";
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
      ? "تصميم متجر سلة احترافي في السعودية 2026 | وكالة تسويق رقمي"
      : locale === "fr"
      ? "Conception Boutique Salla Professionnelle en Arabie 2026 | Agence Marketing Digital"
      : "Professional Salla Store Design Saudi Arabia 2026 | Digital Marketing Agency";

  /* ── Descriptions — keyword-dense but readable ── */
  const metaDesc =
    locale === "ar"
      ? "تصميم متجر سلة وزد احترافي يزيد مبيعاتك في الرياض والسعودية — تصميم موقع مكتب محاماة، تسويق رقمي متكامل، هوية بصرية، موشن جرافيك، إعلانات سناب وجوجل وتيك توك، إدارة حسابات سوشيال ميديا، تحسين SEO، ربط تابي وتمارا وSTC Pay. أسعار تنافسية وتسليم في الوقت المحدد."
      : locale === "fr"
      ? "Conception boutique Salla & Zid professionnelle en Arabie Saoudite — site web cabinet d'avocats, marketing digital, identité visuelle, SEO, gestion réseaux sociaux. Livraison rapide, prix compétitifs."
      : "Professional Salla & Zid store design in Saudi Arabia & Riyadh — law firm website, digital marketing, brand identity, SEO, Snapchat & Google ads, social media management. Competitive prices, on-time delivery.";

  /* ── Keywords per locale ── */
  const metaKeywords =
    locale === "ar"
      ? [
          "تصميم متجر سلة احترافي",
          "تصميم متجر سلة في الرياض",
          "تصميم متجر سلة في السعودية",
          "تصميم متجر زد",
          "تصميم متجر سلة وزد",
          "إنشاء متجر الكتروني",
          "تجهيز متجر سلة كامل",
          "تصميم متجر سلة يزيد المبيعات",
          "وكالة تسويق رقمي في السعودية",
          "أفضل وكالة تسويق رقمي بالرياض",
          "شركة تسويق الكتروني الرياض",
          "تصميم موقع مكتب محاماة",
          "تصميم موقع محامي في السعودية",
          "موقع مكتب محاماة احترافي",
          "تصميم هوية بصرية احترافية",
          "تصميم شعار احترافي السعودية",
          "موشن جرافيك",
          "إعلانات سناب شات السعودية",
          "إعلانات جوجل بالسعودية",
          "إعلانات تيك توك",
          "إدارة حسابات سوشيال ميديا",
          "تحسين محركات البحث SEO",
          "سيو للمتاجر الالكترونية",
          "ربط تابي وتمارا",
          "ربط STC Pay",
          "تصميم متجر سلة",
          "أفضل شركة تصميم متجر سلة",
          "تصميم متجر الكتروني بالسعودية",
        ]
      : locale === "fr"
      ? [
          "conception boutique Salla",
          "agence marketing digital Arabie Saoudite",
          "design identité visuelle",
          "site web cabinet avocats",
          "SEO arabe",
        ]
      : [
          "Salla store design Saudi Arabia",
          "Zid store design",
          "digital marketing agency Riyadh",
          "law firm website Saudi Arabia",
          "brand identity design",
          "SEO Arabic",
          "Snapchat ads Saudi",
          "social media management",
        ];

  /* ── OG title (shorter, for social sharing) ── */
  const metaOgTitle =
    locale === "ar"
      ? "تصميم متجر سلة وزد + موقع محامي + تسويق رقمي"
      : locale === "fr"
      ? "Boutique Salla + Site Cabinet + Marketing Digital"
      : "Salla Store + Law Firm Site + Digital Marketing";

  const metaTwitterTitle =
    locale === "ar"
      ? "أفضل وكالة تصميم متجر سلة في السعودية"
      : locale === "fr"
      ? "Meilleure agence Salla en Arabie Saoudite"
      : "Best Salla Store Design Agency in Saudi Arabia";

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
      url: `https://digital-agency-sa.vercel.app/${locale}`,
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
        <TechStack />
        <PlatformCertifications />
        <PartnersMarquee />
        <Services />
        <LawyerProduct />
        <WorkProcess />
        <FeaturedPartner />
        <Portfolio />
        <Pricing />
        <AboutAgency />
        <Testimonials />
        <RadarPromo />
        <BlogPreview />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
