import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "وكالة رقمية — تصميم متاجر سلة وتسويق رقمي",
  description: "وكالة رقمية سعودية متخصصة في تصميم وتطوير متاجر سلة وزد وشوبيفاي، التسويق الرقمي، بناء الهويات البصرية، وإنتاج المحتوى.",
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
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
