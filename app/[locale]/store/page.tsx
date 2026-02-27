import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StoreContent from "@/components/store/StoreContent";
import FloatingActions from "@/components/home/FloatingActions";
import ScrollProgress from "@/components/layout/ScrollProgress";

/* ─── SEO Metadata ───────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titleAr =
    "متجر الخدمات الرقمية | تصميم متجر سلة رخيص — أسعار لا تُقاوَم";
  const descAr =
    "خدمات تصميم متاجر سلة بأسعار تبدأ من 1,499 ر.س — أرخص من المنافسين بـ 70%. ثيمات سلة مخصصة، هوية بصرية احترافية، تسويق رقمي، SEO. ضمان رضا 100% + استرداد 7 أيام.";

  const titleEn =
    "Digital Services Store | Salla Store Design — Unbeatable Prices";
  const descEn =
    "Professional Salla store design from 1,499 SAR — 70% cheaper than competitors. Custom themes, brand identity, digital marketing, SEO. 100% satisfaction guarantee.";

  return {
    title: locale === "ar" ? titleAr : titleEn,
    description: locale === "ar" ? descAr : descEn,
    keywords: [
      "تصميم متجر سلة رخيص",
      "ثيم سلة مخصص بأسعار مناسبة",
      "أفضل وكالة تصميم متاجر سلة",
      "تصميم سلة الرياض جدة",
      "متجر سلة جاهز بسعر منافس",
      "تصميم ثيم سلة احترافي",
      "شركة تصميم متاجر إلكترونية",
      "خدمات رقمية بأسعار منافسة",
      "هوية بصرية رخيصة",
      "إدارة سوشيال ميديا بأسعار مناسبة",
      "تصميم موقع سلة",
      "وكالة تسويق رقمي",
      "Salla store design cheap",
      "affordable digital marketing Saudi Arabia",
    ],
    alternates: {
      canonical: `/${locale}/store`,
      languages: { ar: "/ar/store", en: "/en/store", fr: "/fr/store" },
    },
    openGraph: {
      title: locale === "ar" ? titleAr : titleEn,
      description: locale === "ar" ? descAr : descEn,
      url: `https://digital-agency-sa.vercel.app/${locale}/store`,
      siteName: "تصميم متجر سلة احترافي",
      locale: locale === "ar" ? "ar_SA" : locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: locale === "ar" ? titleAr : titleEn,
      description: locale === "ar" ? descAr : descEn,
    },
  };
}

/* ─── JSON-LD Schemas ────────────────────────────────────── */
const ITEM_LIST_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "متجر الخدمات الرقمية",
  description: "خدمات تصميم متاجر سلة وتسويق رقمي بأسعار منافسة",
  numberOfItems: 8,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "تصميم ثيم سلة مخصص",
        description: "ثيم سلة احترافي مصمم من الصفر بسعر 1,499 ر.س",
        offers: {
          "@type": "Offer",
          price: "1499",
          priceCurrency: "SAR",
          availability: "https://schema.org/InStock",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "إنشاء متجر سلة كامل",
        description: "متجر سلة جاهز للبيع بسعر 1,999 ر.س",
        offers: {
          "@type": "Offer",
          price: "1999",
          priceCurrency: "SAR",
          availability: "https://schema.org/InStock",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "هوية بصرية احترافية",
        description: "شعار وهوية بصرية كاملة بسعر 1,299 ر.س",
        offers: {
          "@type": "Offer",
          price: "1299",
          priceCurrency: "SAR",
          availability: "https://schema.org/InStock",
        },
      },
    },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "كم يكلف تصميم متجر سلة؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "تبدأ أسعار تصميم متجر سلة من 1,499 ر.س للثيم المخصص، و1,999 ر.س للمتجر الكامل — أرخص من المنافسين بـ 70%.",
      },
    },
    {
      "@type": "Question",
      name: "هل الجودة مضمونة؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "نعم. نضمن رضاك الكامل أو نرجع لك المبلغ خلال 7 أيام. لدينا أكثر من 500 عميل راضٍ.",
      },
    },
    {
      "@type": "Question",
      name: "كم يستغرق التسليم؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "تصميم الثيم 7 أيام، المتجر الكامل 10 أيام، الهوية البصرية 5 أيام. نلتزم بالمواعيد أو نعوضك.",
      },
    },
  ],
};

/* ─── Page Component ─────────────────────────────────────── */
export default function StorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ITEM_LIST_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
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
