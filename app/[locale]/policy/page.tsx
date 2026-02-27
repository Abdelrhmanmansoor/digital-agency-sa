import { getLocale } from "next-intl/server";
import PolicyClient from "./PolicyClient";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    title: locale === "ar"
      ? "سياسة الخصوصية والدفع والاسترجاع"
      : "Privacy, Payment & Return Policy",
    robots: "index,follow",
  };
}

export default async function PolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <PolicyClient locale={locale} />
      <Footer />
    </>
  );
}
