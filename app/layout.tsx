import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "تصميم متجر سلة احترافي في السعودية 2026 | وكالة تسويق رقمي",
  description:
    "متخصصون في تصميم متجر سلة وزد احترافي، تصميم موقع مكتب محاماة، تسويق رقمي في الرياض والسعودية. هوية بصرية، SEO، إعلانات ممولة، إدارة حسابات سوشيال ميديا، موشن جرافيك — كل ما يحتاجه عملك.",
  keywords: [
    "تصميم متجر سلة احترافي",
    "تصميم متجر سلة في السعودية",
    "تصميم متجر زد",
    "تصميم متجر سلة وزد",
    "إنشاء متجر الكتروني",
    "تصميم متجر الكتروني",
    "وكالة تسويق رقمي في السعودية",
    "أفضل وكالة تسويق رقمي بالرياض",
    "شركة تسويق الكتروني في الرياض",
    "تصميم موقع مكتب محاماة",
    "تصميم موقع محامي في السعودية",
    "موقع مكتب محاماة احترافي",
    "تصميم هوية بصرية احترافية",
    "تصميم شعار احترافي",
    "تحسين محركات البحث SEO",
    "إعلانات سناب شات",
    "إعلانات جوجل",
    "إدارة حسابات سوشيال ميديا",
    "موشن جرافيك",
    "تصميم متجر سلة مع هوية بصرية",
    "تصميم متجر سلة يزيد المبيعات",
    "تجهيز متجر سلة كامل",
    "ربط بوابة الدفع تابي تمارا",
    "شركة تصميم متجر سلة في الرياض",
  ],
  metadataBase: new URL("https://digital-agency-sa.vercel.app"),
  robots: { index: true, follow: true },
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "تصميم متجر سلة احترافي",
  alternateName: ["Salla Store Design", "وكالة تسويق رقمي في السعودية"],
  description:
    "متخصصون في تصميم متجر سلة وزد احترافي، تصميم مواقع مكاتب المحاماة، تسويق رقمي، هوية بصرية، SEO، إعلانات ممولة سناب وجوجل وتيك توك، إدارة حسابات سوشيال ميديا، موشن جرافيك، ربط بوابات الدفع تابي وتمارا وSTC Pay.",
  url: "https://digital-agency-sa.vercel.app",
  telephone: "+201007835547",
  email: "info@digitalagency.sa",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SA",
    addressRegion: "الرياض",
    addressLocality: "المملكة العربية السعودية",
  },
  areaServed: ["SA", "الرياض", "جدة", "الدمام", "مكة المكرمة", "الخليج العربي"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "خدماتنا",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "تصميم متجر سلة احترافي",
          description: "تصميم متجر سلة متكامل يزيد مبيعاتك — ألوان، خطوط، صفحات، وتجربة مستخدم مثالية للجوال",
        },
        price: "1299",
        priceCurrency: "SAR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "تصميم متجر زد احترافي",
          description: "تصميم وتجهيز متجر زد بالكامل من إنشاء الحساب حتى ربط الدفع والشحن",
        },
        price: "799",
        priceCurrency: "SAR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "تصميم موقع مكتب محاماة",
          description: "موقع إلكتروني احترافي لمكاتب المحاماة والمحامين في السعودية — تصميم يعكس هيبة مكتبك ويبني الثقة مع موكليك",
        },
        price: "1999",
        priceCurrency: "SAR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "وكالة تسويق رقمي في السعودية",
          description: "خدمات التسويق الرقمي الشاملة — إعلانات سناب شات وجوجل وتيك توك، إدارة حسابات، تقارير أداء أسبوعية",
        },
        price: "899",
        priceCurrency: "SAR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "تصميم هوية بصرية احترافية",
          description: "شعار احترافي، ألوان العلامة التجارية، دليل الهوية البصرية، تصاميم سوشيال ميديا، موشن جرافيك",
        },
        price: "799",
        priceCurrency: "SAR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "تحسين محركات البحث SEO",
          description: "تصدر نتائج جوجل — تحسين كلمات مفتاحية، بناء روابط، تحسين سرعة الموقع، تقارير SEO شهرية",
        },
        price: "699",
        priceCurrency: "SAR",
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "250",
    bestRating: "5",
    worstRating: "1",
  },
  priceRange: "$$",
  currenciesAccepted: "SAR",
  paymentAccepted: "Cash, Credit Card, مدى, Apple Pay, STC Pay, تابي, تمارا",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
    opens: "09:00",
    closes: "23:00",
  },
  sameAs: [
    "https://www.instagram.com/digitalagencysa",
    "https://twitter.com/digitalagencysa",
    "https://www.snapchat.com/add/digitalagencysa",
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "تصميم متجر سلة وتسويق رقمي في السعودية",
  url: "https://digital-agency-sa.vercel.app",
  description: "متخصصون في تصميم متجر سلة وزد، تصميم موقع مكتب محاماة، تسويق رقمي بالرياض",
  inLanguage: ["ar", "en", "fr"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://digital-agency-sa.vercel.app/ar?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zain:ital,wght@0,200;0,300;0,400;0,700;0,800;0,900;1,300;1,400&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
