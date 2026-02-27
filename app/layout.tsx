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
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
