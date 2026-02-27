import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SallaTools from "@/components/home/SallaTools";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "أدوات سلة الذكية — مجانية | وكالة رقمية" : "Salla Smart Tools — Free | Digital Agency",
    description: locale === "ar"
      ? "8 أدوات مجانية لأصحاب متاجر سلة: حاسبة الأرباح، مولّد CSS، منشئ السياسات، كاتب المحتوى الذكي، وأكثر"
      : "8 free tools for Salla store owners: Profit calculator, CSS generator, policy builder, AI content writer, and more",
  };
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRTL = locale === "ar";

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          style={{
            background: "#0A0A0A",
            padding: "160px 0 60px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23C8A962' stroke-width='0.5'%3E%3Cpath d='M40 0 L80 20 L80 60 L40 80 L0 60 L0 20 Z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
              opacity: 0.04,
            }}
          />
          <div className="max-w-[1400px] mx-auto px-8 relative z-10 text-center">
            <div className="gold-badge mx-auto mb-6" style={{ display: "inline-flex" }}>
              {isRTL ? "★ مجانية 100%" : "★ 100% Free"}
            </div>
            <h1
              style={{
                fontFamily: isRTL ? "'Zain', sans-serif" : "sans-serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                color: "#FAFAF7",
                marginBottom: "16px",
              }}
            >
              {isRTL ? "أدوات سلة الذكية" : "Salla Smart Tools"}
            </h1>
            <p style={{ color: "#8C8C7A", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
              {isRTL
                ? "8 أدوات مجانية تساعدك تطوّر متجرك وتزيد مبيعاتك — بدون خبرة تقنية"
                : "8 free tools to help you grow your store and increase sales — no technical expertise needed"}
            </p>
          </div>
        </section>

        {/* Tools Section (reused from home) */}
        <SallaTools />
      </main>
      <Footer />
    </>
  );
}
