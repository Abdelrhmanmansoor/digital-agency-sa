import type { Metadata } from "next";
import { getWhatsAppLink, AGENCY_INFO } from "@/lib/utils";
import { SIDRA_INFO, SIDRA_MESSAGES, SIDRA_FAQ } from "@/lib/sidra-data";
import DocsShell from "@/components/sidra/DocsShell";
import AssistantSection from "@/components/sidra/assistant/AssistantSection";
import HeroSection from "@/components/sidra/HeroSection";
import { OverviewSection, FeaturesSection, ComparisonSection } from "@/components/sidra/OverviewSections";
import {
  QuickStartSection,
  IdentitySection,
  HeaderSection,
  FooterSection,
  MobileSection,
  NoCodeSection,
  AdvancedSection,
} from "@/components/sidra/SetupSections";
import {
  ComponentsSection,
  ProductCardsSection,
  ProductSourcesSection,
  HomeLayoutSection,
  ImageSizesSection,
  PresetsSection,
  PerformanceSection,
  IntegrationsSection,
} from "@/components/sidra/ReferenceSections";
import {
  ChangelogSection,
  OffersSection,
  SupportSection,
  FaqSection,
  TroubleshootingSection,
  ExtrasSection,
  FinalCTA,
} from "@/components/sidra/SupportSections";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tf1one.com";
const pageTitle = "ثيم سِدرة | SIDRA — مركز التوثيق الرسمي لثيم سلة الفاخر";
const pageDescription =
  "المركز الرسمي لثيم سِدرة على منصة سلة: 46 مكونًا للصفحة الرئيسية، دليل التثبيت والهوية والمقاسات والجوال والسرعة، الأسئلة الشائعة، حل المشكلات، وسجل التحديثات والدعم الفني — في مكان واحد.";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${siteUrl}/${locale}/sidra-theme`;

  return {
    metadataBase: new URL(siteUrl),
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "ثيم سدرة",
      "ثيم سلة فاخر",
      "ثيم سلة سعودي",
      "توثيق ثيم سدرة",
      "دليل استخدام ثيم سدرة",
      "تصميم متجر سلة",
      "ثيم متجر عربي",
      "Salla theme SIDRA",
    ],
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonical,
      siteName: "SolimanX",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [{ url: "/sidra-theme-logo.png", width: 1024, height: 1024, alt: "شعار ثيم سِدرة | SIDRA" }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: ["/sidra-theme-logo.png"],
    },
  };
}

export default async function SidraThemePage({ params }: PageProps) {
  const { locale } = await params;
  const canonical = `${siteUrl}/${locale}/sidra-theme`;

  const orderHref = getWhatsAppLink(SIDRA_MESSAGES.order);
  const demoHref = getWhatsAppLink(SIDRA_MESSAGES.demo);
  const supportHref = getWhatsAppLink(SIDRA_MESSAGES.support);
  const customHref = getWhatsAppLink(SIDRA_MESSAGES.custom);

  /* Structured Data: FAQ حقيقي + Breadcrumb + المنتج (بدون سعر ما لم يُحدد) */
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${siteUrl}/${locale}` },
        { "@type": "ListItem", position: 2, name: "ثيم سِدرة", item: canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "ثيم سِدرة | SIDRA",
      applicationCategory: "DesignApplication",
      operatingSystem: "Web (Salla Platform)",
      softwareVersion: SIDRA_INFO.version,
      description: pageDescription,
      author: { "@type": "Organization", name: SIDRA_INFO.author },
      image: `${siteUrl}/sidra-theme-logo.png`,
      ...(SIDRA_INFO.price !== null
        ? {
            offers: {
              "@type": "Offer",
              price: String(SIDRA_INFO.price),
              priceCurrency: SIDRA_INFO.currency,
              availability: "https://schema.org/InStock",
            },
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: SIDRA_FAQ.slice(0, 12).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8f2ec] text-[#211711]" dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <HeroSection orderHref={orderHref} demoHref={demoHref} />

      <DocsShell supportHref={supportHref}>
        {/* تعرف على الثيم */}
        <OverviewSection />
        <FeaturesSection />
        <ComparisonSection />

        {/* الإعداد والتخصيص */}
        <QuickStartSection />
        <IdentitySection />
        <HeaderSection />
        <FooterSection />
        <ProductCardsSection />
        <HomeLayoutSection />
        <MobileSection />
        <NoCodeSection />
        <AdvancedSection />
        <AssistantSection />

        {/* المرجع */}
        <ComponentsSection />
        <ProductSourcesSection />
        <ImageSizesSection />
        <PresetsSection />
        <PerformanceSection />
        <IntegrationsSection />

        {/* الدعم والتحديثات */}
        <ChangelogSection />
        <OffersSection orderHref={orderHref} />
        <SupportSection whatsappBase={getWhatsAppLink()} email={AGENCY_INFO.email} />
        <FaqSection />
        <TroubleshootingSection supportHref={supportHref} />
        <ExtrasSection />
      </DocsShell>

      <FinalCTA orderHref={orderHref} customHref={customHref} />
    </main>
  );
}
