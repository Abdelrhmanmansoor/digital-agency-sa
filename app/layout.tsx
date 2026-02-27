import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "وكالة رقمية — تصميم متاجر سلة وتسويق رقمي",
  description:
    "وكالة رقمية متخصصة في تصميم وتطوير متاجر سلة وزد وشوبيفاي، التسويق الرقمي، بناء الهويات البصرية، وإنتاج المحتوى.",
  metadataBase: new URL("https://digital-agency-sa.vercel.app"),
  robots: { index: true, follow: true },
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "وكالة رقمية",
  alternateName: "Digital Agency SA",
  description:
    "وكالة رقمية متخصصة في تصميم متاجر سلة وزد، التسويق الرقمي، والهويات البصرية",
  url: "https://digital-agency-sa.vercel.app",
  telephone: "+201007835547",
  email: "info@digitalagency.sa",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SA",
    addressRegion: "المملكة العربية السعودية",
  },
  areaServed: "SA",
  serviceType: ["Salla Store Design", "Digital Marketing", "Brand Identity", "E-commerce", "SEO"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "250",
    bestRating: "5",
    worstRating: "1",
  },
  priceRange: "$$",
  currenciesAccepted: "SAR",
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
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
