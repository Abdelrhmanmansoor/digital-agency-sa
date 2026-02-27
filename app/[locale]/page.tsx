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

  const metaTitle =
    locale === "ar"
      ? "وكالة رقمية — تصميم متاجر سلة وتسويق رقمي احترافي"
      : locale === "fr"
      ? "Agence Digitale — Conception Boutique Salla & Marketing Digital Professionnel"
      : "Digital Agency — Salla Store Design & Digital Marketing";

  const metaOgTitle =
    locale === "ar"
      ? "وكالة رقمية — تصميم متاجر سلة وتسويق رقمي"
      : locale === "fr"
      ? "Agence Digitale — Conception Boutique Salla & Marketing"
      : "Digital Agency — Salla Store Design & Marketing";

  const metaTwitterTitle =
    locale === "ar"
      ? "وكالة رقمية — تصميم متاجر سلة"
      : locale === "fr"
      ? "Agence Digitale — Boutique Salla"
      : "Digital Agency — Salla Store Design";

  return {
    title: metaTitle,
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: "/ar", en: "/en", fr: "/fr" },
    },
    openGraph: {
      title: metaOgTitle,
      description: t("subtitle"),
      url: `https://digital-agency-sa.vercel.app/${locale}`,
      siteName: locale === "ar" ? "وكالة رقمية" : locale === "fr" ? "Agence Digitale" : "Digital Agency",
      locale: locale === "ar" ? "ar_SA" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTwitterTitle,
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
        <PlatformCertifications />
        <PartnersMarquee />
        <Services />
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
