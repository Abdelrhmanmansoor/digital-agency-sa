import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import FeaturedPartner from "@/components/home/FeaturedPartner";
import Services from "@/components/home/Services";
import Pricing from "@/components/home/Pricing";
import Portfolio from "@/components/home/Portfolio";
import SallaTools from "@/components/home/SallaTools";
import BlogPreview from "@/components/home/BlogPreview";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    title: locale === "ar"
      ? "وكالة رقمية — تصميم متاجر سلة وتسويق رقمي احترافي"
      : "Digital Agency — Salla Store Design & Digital Marketing",
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}`,
      languages: { ar: "/ar", en: "/en", fr: "/fr" },
    },
  };
}

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <Header />
      <main>
        <Hero />
        <PartnersMarquee />
        <Services />
        <FeaturedPartner />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <SallaTools />
        <BlogPreview />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
