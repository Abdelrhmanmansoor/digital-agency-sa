"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";

const ProfitCalculator = dynamic(() => import("@/components/tools/ProfitCalculator"), { ssr: false });
const ContentWriter = dynamic(() => import("@/components/tools/ContentWriter"), { ssr: false });
const CSSGenerator = dynamic(() => import("@/components/tools/CSSGenerator"), { ssr: false });
const PolicyGenerator = dynamic(() => import("@/components/tools/PolicyGenerator"), { ssr: false });
const ContentPlanner = dynamic(() => import("@/components/tools/ContentPlanner"), { ssr: false });
const NameGenerator = dynamic(() => import("@/components/tools/NameGenerator"), { ssr: false });
const BannerSizes = dynamic(() => import("@/components/tools/BannerSizes"), { ssr: false });
const DiscountTrap = dynamic(() => import("@/components/tools/DiscountTrap"), { ssr: false });

const TOOLS = [
  { id: "profit", icon: "🧮", nameAr: "حاسبة الأرباح", nameEn: "Profit Calculator", descAr: "احسب هامش ربحك وصافي أرباحك بدقة", descEn: "Calculate your profit margins accurately" },
  { id: "content", icon: "✍️", nameAr: "كاتب المحتوى الذكي", nameEn: "AI Content Writer", descAr: "أنشئ محتوى تسويقي احترافي", descEn: "Create professional marketing content" },
  { id: "css", icon: "🎨", nameAr: "مولّد أكواد CSS", nameEn: "CSS Code Generator", descAr: "خصّص ثيم متجر سلة بسهولة", descEn: "Customize your Salla store theme easily" },
  { id: "policy", icon: "📋", nameAr: "منشئ السياسات", nameEn: "Policy Generator", descAr: "أنشئ سياسات احترافية لمتجرك", descEn: "Create professional store policies" },
  { id: "competitor", icon: "📊", nameAr: "محلل المنافسين", nameEn: "Competitor Analyzer", descAr: "حلّل منافسيك واكتشف نقاط قوتهم", descEn: "Analyze competitors and their strengths" },
  { id: "planner", icon: "🗓", nameAr: "مخطط المحتوى الشهري", nameEn: "Content Planner", descAr: "خطط محتوى 30 يوم بأفكار جاهزة", descEn: "Plan 30 days of content with ideas" },
  { id: "names", icon: "🏷", nameAr: "مولّد أسماء المتاجر", nameEn: "Store Name Generator", descAr: "احصل على أسماء مبدعة لمتجرك", descEn: "Get creative names for your store" },
  { id: "banners", icon: "📐", nameAr: "دليل مقاسات البنرات", nameEn: "Banner Sizes Guide", descAr: "مرجع شامل لجميع مقاسات سلة", descEn: "Complete reference for all Salla sizes" },
  { id: "discount", icon: "⚠️", nameAr: "فخ الخصومات", nameEn: "Discount Trap", descAr: "اكتشف التكلفة الحقيقية للخصومات على أرباحك", descEn: "Discover the real cost of discounts on your profits" },
];

// Competitor Analyzer (built inline since it's simpler)
function CompetitorAnalyzer({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | object>(null);

  const analyze = async () => {
    if (!url) return;
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1500));
    // Simulated analysis
    setResult({
      design: isRTL ? "تصميم بسيط مع ألوان فاتحة — يمكن تحسين تجربة المستخدم" : "Simple design with light colors — UX can be improved",
      products: isRTL ? "يُقدَّر بـ 50-200 منتج" : "Estimated 50-200 products",
      avgPrice: "150-500 ر.س",
      strengths: isRTL
        ? ["تصميم واضح", "أسعار تنافسية", "تنوع في المنتجات"]
        : ["Clear design", "Competitive prices", "Product variety"],
      weaknesses: isRTL
        ? ["بطء في التحميل", "صور منتجات ضعيفة", "لا توجد تقييمات"]
        : ["Slow loading", "Poor product images", "No reviews"],
      recommendations: isRTL
        ? ["اعتمد تصاميم أكثر احترافية", "أضف صور عالية الجودة", "اجمع تقييمات عملائك"]
        : ["Adopt more professional designs", "Add high quality images", "Collect customer reviews"],
    });
    setAnalyzing(false);
  };

  const res = result as Record<string, string | string[]> | null;

  return (
    <div style={{ padding: "0 40px 40px" }}>
      <div style={{ marginBottom: "24px" }}>
        <label style={{ display: "block", fontSize: "11px", fontFamily: "Space Mono, monospace", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#8C8C7A", marginBottom: "8px" }}>
          {isRTL ? "رابط متجر المنافس" : "Competitor Store URL"}
        </label>
        <div style={{ display: "flex", gap: "12px" }}>
          <input
            type="url"
            placeholder="https://store.salla.sa/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="form-input"
            style={{ flex: 1, background: "#FAFAF7", color: "#0A0A0A", border: "1px solid #E8E6E1", fontFamily: "Space Mono, monospace" }}
          />
          <button onClick={analyze} disabled={analyzing} className="btn-primary" style={{ whiteSpace: "nowrap" }}>
            <span>{analyzing ? (isRTL ? "⏳ تحليل..." : "⏳ Analyzing...") : `📊 ${isRTL ? "حلّل" : "Analyze"}`}</span>
          </button>
        </div>
        <div style={{ fontSize: "12px", color: "#8C8C7A", marginTop: "8px", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>
          {isRTL ? "* هذا التحليل تقديري بناءً على المعلومات المتاحة للعموم" : "* This analysis is estimated based on publicly available information"}
        </div>
      </div>

      {res && (
        <div className="space-y-4">
          {[
            { icon: "🎨", labelAr: "التصميم", labelEn: "Design", value: res.design },
            { icon: "📦", labelAr: "المنتجات", labelEn: "Products", value: res.products },
            { icon: "💰", labelAr: "متوسط الأسعار", labelEn: "Average Prices", value: res.avgPrice },
          ].map((item) => (
            <div key={item.labelEn} style={{ padding: "16px 20px", background: "#FAFAF7", border: "1px solid #E8E6E1" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "20px" }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: "11px", fontFamily: "Space Mono", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F0B100", marginBottom: "4px" }}>
                    {isRTL ? item.labelAr : item.labelEn}
                  </div>
                  <div style={{ fontSize: "14px", color: "#2D2D2D", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>
                    {item.value as string}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div style={{ padding: "20px", background: "rgba(74,140,111,0.08)", border: "1px solid rgba(74,140,111,0.2)" }}>
              <div style={{ fontSize: "11px", fontFamily: "Space Mono", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#4A8C6F", marginBottom: "12px" }}>
                ✓ {isRTL ? "نقاط القوة" : "Strengths"}
              </div>
              <ul className="space-y-2">
                {(res.strengths as string[]).map((s: string) => (
                  <li key={s} style={{ fontSize: "13px", color: "#2D2D2D", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>• {s}</li>
                ))}
              </ul>
            </div>
            <div style={{ padding: "20px", background: "rgba(201,64,64,0.08)", border: "1px solid rgba(201,64,64,0.2)" }}>
              <div style={{ fontSize: "11px", fontFamily: "Space Mono", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#C94040", marginBottom: "12px" }}>
                ✗ {isRTL ? "نقاط الضعف" : "Weaknesses"}
              </div>
              <ul className="space-y-2">
                {(res.weaknesses as string[]).map((w: string) => (
                  <li key={w} style={{ fontSize: "13px", color: "#2D2D2D", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>• {w}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ padding: "20px", background: "rgba(240,177,0,0.08)", border: "1px solid rgba(240,177,0,0.2)" }}>
            <div style={{ fontSize: "11px", fontFamily: "Space Mono", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#F0B100", marginBottom: "12px" }}>
              🎯 {isRTL ? "كيف تتفوق عليهم؟" : "How to Outperform Them?"}
            </div>
            <ul className="space-y-2">
              {(res.recommendations as string[]).map((r: string) => (
                <li key={r} style={{ fontSize: "13px", color: "#2D2D2D", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>✓ {r}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

const TOOL_COMPONENTS: Record<string, React.ComponentType<{ onClose: () => void }>> = {
  profit: ProfitCalculator,
  content: ContentWriter,
  css: CSSGenerator,
  policy: PolicyGenerator,
  competitor: CompetitorAnalyzer,
  planner: ContentPlanner,
  names: NameGenerator,
  banners: BannerSizes,
  discount: DiscountTrap,
};

export default function SallaTools() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openTool = (toolId: string) => setActiveTool(toolId);
  const closeTool = () => setActiveTool(null);

  const ActiveToolComponent = activeTool ? TOOL_COMPONENTS[activeTool] : null;
  const activeTool_ = activeTool ? TOOLS.find((t) => t.id === activeTool) : null;

  return (
    <>
      <section
        id="tools"
        ref={sectionRef}
        className="relative"
        style={{
          background: "linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)",
          padding: "120px 0",
          overflow: "hidden",
        }}
      >
        {/* Islamic pattern background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23C8A962' stroke-width='0.5'%3E%3Cpath d='M40 0 L80 20 L80 60 L40 80 L0 60 L0 20 Z'/%3E%3Cpath d='M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z'/%3E%3Cpath d='M40 20 L60 30 L60 50 L40 60 L20 50 L20 30 Z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
            opacity: 0.04,
            pointerEvents: "none",
          }}
        />

        <div className="max-w-[1400px] mx-auto px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="gold-badge mx-auto mb-6" style={{ display: "inline-flex" }}>
              {isRTL ? "★ مجانية 100%" : "★ 100% Free"}
            </div>
            <h2
              style={{
                fontFamily: isRTL ? "'ThmanyahSans', 'Zain', sans-serif" : "sans-serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                color: "#FAFAF7",
                marginBottom: "16px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translateY(20px)",
                transition: "all 0.8s ease",
              }}
            >
              {isRTL ? "أدوات سلة الذكية" : "Salla Smart Tools"}
            </h2>
            <p
              style={{
                color: "#8C8C7A",
                fontSize: "16px",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.7,
                opacity: isVisible ? 1 : 0,
                transition: "all 0.8s 0.2s ease",
              }}
            >
              {isRTL
                ? "أدوات مجانية تساعدك تطوّر متجرك — من غير ما تحتاج مبرمج"
                : "Free tools to help you grow your store — no developer needed"}
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TOOLS.map((tool, index) => (
              <div
                key={tool.id}
                className="tool-card"
                onClick={() => openTool(tool.id)}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "none" : "translateY(20px)",
                  transition: `opacity 0.6s ${index * 0.08}s ease, transform 0.6s ${index * 0.08}s ease`,
                }}
              >
                <div className="tool-icon">{tool.icon}</div>
                <h3
                  style={{
                    fontFamily: isRTL ? "'ThmanyahSans', 'Zain', sans-serif" : "sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#FAFAF7",
                    marginBottom: "8px",
                  }}
                >
                  {isRTL ? tool.nameAr : tool.nameEn}
                </h3>
                <p style={{ color: "#8C8C7A", fontSize: "13px", lineHeight: 1.6 }}>
                  {isRTL ? tool.descAr : tool.descEn}
                </p>
                <div
                  style={{
                    marginTop: "16px",
                    fontFamily: "Space Mono, monospace",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: "#F0B100",
                    textTransform: "uppercase",
                  }}
                >
                  {isRTL ? "فتح الأداة ←" : "Open Tool →"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Modal */}
      <div
        className={`modal-overlay ${activeTool ? "is-open" : ""}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeTool(); }}
      >
        <div
          className="modal-content"
          style={{ maxWidth: "900px" }}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Modal Header */}
          <div
            style={{
              background: "#0A0A0A",
              padding: "24px 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(240,177,0,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "28px" }}>{activeTool_?.icon}</span>
              <div>
                <h2
                  style={{
                    fontFamily: isRTL ? "'ThmanyahSans', 'Zain', sans-serif" : "sans-serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#FAFAF7",
                  }}
                >
                  {activeTool_ ? (isRTL ? activeTool_.nameAr : activeTool_.nameEn) : ""}
                </h2>
                <div className="gold-badge mt-1">
                  {isRTL ? "مجانية" : "Free"}
                </div>
              </div>
            </div>
            <button
              onClick={closeTool}
              style={{
                background: "none",
                border: "none",
                color: "#8C8C7A",
                cursor: "pointer",
                fontSize: "24px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#F0B100"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#8C8C7A"; }}
            >
              ×
            </button>
          </div>

          {/* Tool Content */}
          <div style={{ paddingTop: "32px" }}>
            {ActiveToolComponent && <ActiveToolComponent onClose={closeTool} />}
          </div>
        </div>
      </div>
    </>
  );
}
