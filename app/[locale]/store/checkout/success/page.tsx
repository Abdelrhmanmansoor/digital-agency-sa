import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SuccessClient from "./SuccessClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "تم استلام طلبك | AM Design" : "Order Received | AM Design";
  return { title, robots: { index: false, follow: false } };
}

export default function OrderSuccessPage() {
  return (
    <>
      <Header />
      <main style={{ background: "#FAFAF8", minHeight: "60vh" }}>
        <SuccessClient />
      </main>
      <Footer />
    </>
  );
}
