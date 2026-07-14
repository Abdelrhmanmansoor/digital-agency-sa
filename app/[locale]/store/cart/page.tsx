import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartPageClient from "./CartPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "سلة المشتريات | AM Design" : "Shopping Cart | AM Design";
  return {
    title,
    robots: { index: false, follow: true },
    alternates: { canonical: `/${locale}/store/cart` },
  };
}

export default function CartPage() {
  return (
    <>
      <Header />
      <main style={{ background: "#FAFAF8", minHeight: "60vh" }}>
        <CartPageClient />
      </main>
      <Footer />
    </>
  );
}
