"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

const STEPS = [
  {
    num: "01",
    iconPath: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    titleAr: "الاستشارة المجانية",
    titleEn: "Free Consultation",
    descAr: "نبدأ بجلسة استشارية مجانية نفهم فيها نشاطك التجاري، جمهورك، والهدف الرئيسي من المشروع — لا نبدأ بدون فهم عميق.",
    descEn: "We start with a free consultation to understand your business, audience, and main project goal — we never begin without deep understanding.",
    tags: [
      { ar: "30 دقيقة مجاناً", en: "30 min free" },
      { ar: "واتساب أو زووم", en: "WhatsApp or Zoom" },
    ],
    accentColor: "#C8A962",
  },
  {
    num: "02",
    iconPath: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
    titleAr: "التصميم والنموذج الأولي",
    titleEn: "Design & Prototype",
    descAr: "نصمم نموذجاً أولياً Figma قبل أي تنفيذ — ترى كيف سيبدو مشروعك بالكامل وتوافق عليه قبل أن نبدأ البرمجة.",
    descEn: "We create a Figma prototype before any development — you see exactly how your project looks and approve it before we write a single line of code.",
    tags: [
      { ar: "نموذج Figma تفاعلي", en: "Interactive Figma prototype" },
      { ar: "تعديلات غير محدودة", en: "Unlimited revisions" },
    ],
    accentColor: "#BDEE63",
  },
  {
    num: "03",
    iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    titleAr: "التطوير والتنفيذ",
    titleEn: "Development & Build",
    descAr: "بعد موافقتك على التصميم، نبدأ التنفيذ الكامل — برمجة، ربط بوابات الدفع، إعداد الشحن، تحميل المنتجات، وتحسين الأداء.",
    descEn: "After design approval, we execute everything — coding, payment gateway setup, shipping config, product upload, and performance optimization.",
    tags: [
      { ar: "تحديثات يومية", en: "Daily updates" },
      { ar: "جاهز للجوال 100%", en: "100% mobile ready" },
    ],
    accentColor: "#C8A962",
  },
  {
    num: "04",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    titleAr: "التسليم والمتابعة",
    titleEn: "Delivery & Support",
    descAr: "نُسلّم مشروعك مع تدريب مجاني على الإدارة + شهر كامل من الدعم التقني المجاني. مشروعك ينجح ونجاحك هو نجاحنا.",
    descEn: "We deliver with free admin training + one full month of free technical support. Your project succeeds, and your success is our success.",
    tags: [
      { ar: "شهر دعم مجاني", en: "1 month free support" },
      { ar: "تدريب على الإدارة", en: "Admin training" },
    ],
    accentColor: "#22C55E",
  },
];

export default function WorkProcess() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [activeStep, setActiveStep] = useState(0);

  const active = STEPS[activeStep];

  return (
    <section
      style={{
        background: "#050505",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(200,169,98,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,98,0.012) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-8 relative z-10" dir={isRTL ? "rtl" : "ltr"}>

        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(200,169,98,0.08)",
              border: "1px solid rgba(200,169,98,0.2)",
              borderRadius: "20px",
              padding: "6px 18px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C8A962",
              }}
            >
              {isRTL ? "كيف نعمل" : "HOW WE WORK"}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              color: "#FAFAF7",
              lineHeight: 1.2,
              maxWidth: "700px",
            }}
          >
            {isRTL
              ? "من الفكرة إلى الإطلاق في 4 خطوات مضمونة"
              : "From Idea to Launch in 4 Guaranteed Steps"}
          </h2>
        </div>

        {/* Two-column: steps selector + active detail */}
        <div
          className="wp-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* LEFT — step selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {STEPS.map((step, i) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(i)}
                style={{
                  background: activeStep === i ? "rgba(255,255,255,0.06)" : "transparent",
                  border: `1px solid ${activeStep === i ? "rgba(200,169,98,0.3)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "10px",
                  padding: "20px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  cursor: "pointer",
                  textAlign: isRTL ? "right" : "left",
                  transition: "all 0.2s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (activeStep !== i) {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeStep !== i) {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }
                }}
              >
                {/* Active indicator line */}
                {activeStep === i && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      [isRTL ? "right" : "left"]: 0,
                      width: "3px",
                      background: step.accentColor,
                      borderRadius: "2px",
                    }}
                  />
                )}

                {/* Step number */}
                <span
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: activeStep === i ? step.accentColor : "rgba(255,255,255,0.2)",
                    letterSpacing: "0.1em",
                    flexShrink: 0,
                    transition: "color 0.2s",
                  }}
                >
                  {step.num}
                </span>

                {/* Icon */}
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "8px",
                    background: activeStep === i ? `${step.accentColor}18` : "rgba(255,255,255,0.04)",
                    border: `1px solid ${activeStep === i ? `${step.accentColor}44` : "rgba(255,255,255,0.06)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: activeStep === i ? step.accentColor : "rgba(255,255,255,0.3)",
                    transition: "all 0.2s",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={step.iconPath} />
                  </svg>
                </div>

                {/* Title */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Zain', sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: activeStep === i ? "#FAFAF7" : "rgba(255,255,255,0.45)",
                      transition: "color 0.2s",
                    }}
                  >
                    {isRTL ? step.titleAr : step.titleEn}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT — active step detail */}
          <div
            key={activeStep}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "40px",
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            {/* Big step number watermark */}
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "80px",
                fontWeight: 800,
                color: `${active.accentColor}10`,
                lineHeight: 1,
                marginBottom: "-20px",
                userSelect: "none",
              }}
            >
              {active.num}
            </div>

            {/* Icon */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                background: `${active.accentColor}14`,
                border: `1px solid ${active.accentColor}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: active.accentColor,
                marginBottom: "24px",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={active.iconPath} />
              </svg>
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 800,
                color: "#FAFAF7",
                marginBottom: "16px",
                lineHeight: 1.2,
              }}
            >
              {isRTL ? active.titleAr : active.titleEn}
            </h3>

            {/* Gold divider */}
            <div style={{ width: "40px", height: "2px", background: active.accentColor, marginBottom: "20px" }} />

            {/* Description */}
            <p
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "16px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.9,
                marginBottom: "28px",
              }}
            >
              {isRTL ? active.descAr : active.descEn}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {active.tags.map((tag, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: `${active.accentColor}10`,
                    border: `1px solid ${active.accentColor}30`,
                    borderRadius: "20px",
                    padding: "6px 14px",
                  }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill={active.accentColor}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: active.accentColor, fontWeight: 600 }}>
                    {isRTL ? tag.ar : tag.en}
                  </span>
                </div>
              ))}
            </div>

            {/* Step progress dots */}
            <div style={{ display: "flex", gap: "8px", marginTop: "32px", justifyContent: isRTL ? "flex-end" : "flex-start" }}>
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  style={{
                    width: i === activeStep ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: i === activeStep ? active.accentColor : "rgba(255,255,255,0.12)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .wp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
