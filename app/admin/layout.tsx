import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "لوحة التحكم | وكالة رقمية",
  description: "Admin Dashboard",
  robots: "noindex,nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "#FAFAF7", color: "#0A0A0A" }}>
        {children}
      </body>
    </html>
  );
}
