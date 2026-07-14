import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CheckoutClient from "./CheckoutClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "إتمام الطلب | AM Design" : "Checkout | AM Design";
  return {
    title,
    robots: { index: false, follow: false },
    alternates: { canonical: `/${locale}/store/checkout` },
  };
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main style={{ background: "#FAFAF8", minHeight: "60vh" }}>
        <CheckoutClient />
      </main>
      <Footer />
    </>
  );
}
