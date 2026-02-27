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
import Pricing from "@/components/home/Pricing";
import Portfolio from "@/components/home/Portfolio";
import AboutAgency from "@/components/home/AboutAgency";
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
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    title:
      locale === "ar"
        ? "وكالة رقمية — تصميم متاجر سلة وتسويق رقمي احترافي"
        : "Digital Agency — Salla Store Design & Digital Marketing",
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: "/ar", en: "/en", fr: "/fr" },
    },
    openGraph: {
      title:
        locale === "ar"
          ? "وكالة رقمية — تصميم متاجر سلة وتسويق رقمي"
          : "Digital Agency — Salla Store Design & Marketing",
      description: t("subtitle"),
      url: `https://digital-agency-sa.vercel.app/${locale}`,
      siteName: "وكالة رقمية",
      locale: locale === "ar" ? "ar_SA" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title:
        locale === "ar"
          ? "وكالة رقمية — تصميم متاجر سلة"
          : "Digital Agency — Salla Store Design",
      description: t("subtitle"),
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
        <PartnersMarquee />
        <Services />
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
