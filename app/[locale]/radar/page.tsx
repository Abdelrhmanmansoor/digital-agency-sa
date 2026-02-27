import { redirect } from "next/navigation";
import { getRadarSession } from "@/lib/radar-auth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RadarAuth from "@/components/radar/RadarAuth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "رادار — محلل المتجر الذكي | مجاني",
  description: "حلل منتجاتك، قارن أسعار المنافسين في السوق السعودي، واعرف هامش ربحك الحقيقي.",
};

const FEATURES = [
  {
    icon: "◉",
    title: "مقارنة حقيقية",
    desc: "أسعار من Amazon.sa وNoon وسلة وزد ومتاجر أخرى في وقت واحد",
  },
  {
    icon: "◈",
    title: "معادلة الربح الحقيقية",
    desc: "هامشك بعد الشحن والإرجاع وضريبة القيمة المضافة — لا تخمين",
  },
  {
    icon: "◆",
    title: "ذكاء سعودي",
    desc: "تحليل AI يفهم السوق السعودي ويتكلم بالعربي مباشرة",
  },
  {
    icon: "◇",
    title: "تتبع مستمر",
    desc: "أضف منتجاتك وتابع تحركات أسعار المنافسين من داشبورد واحد",
  },
];

export default async function RadarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await getRadarSession();
  if (user) redirect(`/${locale}/radar/dashboard`);

  return (
    <>
      <Header />
      <main style={{ background: "#0A0A0A", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ padding: "140px 24px 80px", position: "relative", overflow: "hidden" }}>
          {/* Grid background */}
          <div
            style={{
              position: "absolute", inset: 0,
              backgroundImage: `
                linear-gradient(rgba(200,169,98,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(200,169,98,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Radial glow */}
          <div style={{
            position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
            width: "600px", height: "600px",
            background: "radial-gradient(circle, rgba(200,169,98,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}
              className="radar-hero-grid"
            >

              {/* Left: Copy */}
              <div dir="rtl">
                {/* Badge */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  border: "1px solid rgba(200,169,98,0.3)",
                  padding: "6px 16px", marginBottom: "28px",
                  fontSize: "12px", letterSpacing: "0.15em",
                  color: "#C8A962", fontFamily: "Space Mono, monospace",
                }}>
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "#C8A962",
                    animation: "pulse 2s infinite",
                    display: "inline-block",
                  }} />
                  مجاني للأبد ● يعمل الآن
                </div>

                <h1 style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "clamp(48px, 6vw, 80px)",
                  fontWeight: 800,
                  color: "#FAFAF7",
                  lineHeight: 1.05,
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}>
                  رادار
                </h1>
                <h2 style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  fontWeight: 400,
                  color: "#C8A962",
                  marginBottom: "24px",
                }}>
                  محلل المتجر الذكي
                </h2>

                <p style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "18px",
                  color: "rgba(250,250,247,0.6)",
                  lineHeight: 1.7,
                  marginBottom: "40px",
                  maxWidth: "480px",
                }}>
                  اعرف موقعك الحقيقي في السوق السعودي. قارن أسعار المنافسين، احسب هامشك الفعلي، وخذ قرارات مبنية على أرقام — لا على تخمين.
                </p>

                {/* Features grid */}
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}>
                  {FEATURES.map((f) => (
                    <div
                      key={f.title}
                      style={{
                        padding: "16px",
                        border: "1px solid rgba(200,169,98,0.1)",
                        borderRadius: "2px",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <span style={{ color: "#C8A962", fontSize: "18px", display: "block", marginBottom: "6px" }}>
                        {f.icon}
                      </span>
                      <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "15px", color: "#FAFAF7", fontWeight: 600, marginBottom: "4px" }}>
                        {f.title}
                      </div>
                      <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                        {f.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Auth Form */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <RadarAuth />
              </div>

            </div>
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: "80px 24px", borderTop: "1px solid rgba(200,169,98,0.08)" }} dir="rtl">
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <div style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "#C8A962",
              marginBottom: "16px",
            }}>
              كيف يشتغل
            </div>
            <h3 style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              color: "#FAFAF7",
              marginBottom: "60px",
              fontWeight: 700,
            }}>
              ثلاث خطوات وتعرف كل شيء
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "40px" }} className="steps-grid">
              {[
                { num: "01", title: "أضف منتجك", desc: "ادخل اسم المنتج، سعر البيع، التكلفة، ورسوم الشحن" },
                { num: "02", title: "رادار يبحث", desc: "يجمع أسعار المنافسين من Amazon وNoon وسلة وزد وأكثر" },
                { num: "03", title: "خذ قرارك", desc: "تحليل AI يخبرك أين تقف وما الخطوة التالية بالضبط" },
              ].map((step) => (
                <div key={step.num} style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "42px",
                    color: "rgba(200,169,98,0.2)",
                    fontWeight: 700,
                    marginBottom: "12px",
                    lineHeight: 1,
                  }}>
                    {step.num}
                  </div>
                  <div style={{
                    fontFamily: "'Zain', sans-serif",
                    fontSize: "20px",
                    color: "#FAFAF7",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}>
                    {step.title}
                  </div>
                  <div style={{
                    fontFamily: "'Zain', sans-serif",
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.6,
                  }}>
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 768px) {
          .radar-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </>
  );
}
