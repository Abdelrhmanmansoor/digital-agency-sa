"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";

/* ─── Types ─── */
interface Service {
  id: string;
  icon: React.ReactNode;
  nameAr: string;
  nameEn: string;
  problemAr: string;
  problemEn: string;
  solutionAr: string;
  solutionEn: string;
  resultAr: string;
  resultEn: string;
  resultMetric: string; // e.g. "+40%"
  ctaAr: string;
  ctaEn: string;
  waAr: string;
  waEn: string;
  accentColor: string;
  featured?: boolean;
  badge?: string;
  badgeEn?: string;
}

const SERVICES: Service[] = [
  {
    id: "salla-theme",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="12" rx="2"/>
        <path d="M7 20h10M12 16v4"/><path d="M7 8h4M7 11h6"/>
      </svg>
    ),
    nameAr: "تصميم ثيم سلة خاص",
    nameEn: "Custom Salla Theme Design",
    problemAr: "ثيم المتجر لا يعكس هويتك ويضعف الثقة",
    problemEn: "Your store theme doesn't reflect your brand or build trust",
    solutionAr: "ثيم مخصص بالكامل يعكس هويتك، متوافق مع الجوال وسريع التحميل",
    solutionEn: "Fully custom theme reflecting your brand, mobile-ready and fast",
    resultAr: "تحسين تجربة المستخدم وزيادة الطلبات",
    resultEn: "Better UX and higher orders",
    resultMetric: "+32%",
    ctaAr: "اطلب الثيم الآن",
    ctaEn: "Order Your Theme",
    waAr: "مرحباً! أريد خدمة تصميم ثيم سلة خاص",
    waEn: "Hello! I want a custom Salla theme",
    accentColor: "#F0B100",
    featured: true,
    badge: "الأكثر طلباً",
    badgeEn: "Most Popular",
  },
  {
    id: "store-scrape",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 3h18v4H3z"/><path d="M3 11h18v10H3z"/><path d="M7 7h10M7 15h10"/>
      </svg>
    ),
    nameAr: "سحب منتجات المتاجر وتحليلها",
    nameEn: "Store Products Scraping & Analysis",
    problemAr: "تسعيرك وتسويقك عشوائي بدون بيانات منافسين",
    problemEn: "You price and market blindly without competitor data",
    solutionAr: "سحب المنتجات + تحليل المنافسين + توصيات سعرية ونقاط قوة",
    solutionEn: "Product scraping + competitor analysis + pricing insights",
    resultAr: "قرارات تسعير أدق وأسرع",
    resultEn: "Faster, data-driven pricing decisions",
    resultMetric: "+55%",
    ctaAr: "ابدأ التحليل",
    ctaEn: "Start Analysis",
    waAr: "مرحباً! أريد سحب منتجات متجر وتحليلها",
    waEn: "Hello! I want store products scraping and analysis",
    accentColor: "#2E6BFF",
    badge: "جديد",
    badgeEn: "New",
  },
  {
    id: "custom-apps",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="7" y="2" width="10" height="20" rx="2"/><path d="M12 18h.01"/>
      </svg>
    ),
    nameAr: "برمجة تطبيقات حسب الطلب",
    nameEn: "Custom App Development",
    problemAr: "تطبيقك يحتاج تجربة خاصة تناسب عملاءك",
    problemEn: "Your app needs a tailored experience for your users",
    solutionAr: "تصميم وبرمجة تطبيق من الفكرة للمنتج النهائي مع لوحات تحكم",
    solutionEn: "Full app design & development with admin dashboards",
    resultAr: "إطلاق أسرع مع جودة عالية",
    resultEn: "Faster launch with premium quality",
    resultMetric: "4–8 أسابيع",
    ctaAr: "ناقش فكرتك",
    ctaEn: "Discuss Your Idea",
    waAr: "مرحباً! أريد برمجة تطبيق حسب الطلب",
    waEn: "Hello! I want a custom app developed",
    accentColor: "#F0B100",
  },
  {
    id: "vibe-coding",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/><path d="M10 21l4-18"/>
      </svg>
    ),
    nameAr: "Vibe Coding Services",
    nameEn: "Vibe Coding Services",
    problemAr: "تحتاج تطوير سريع لفكرة رقمية بمرونة عالية",
    problemEn: "You need fast, flexible development for a digital idea",
    solutionAr: "تنفيذ سريع للمنتجات الرقمية والتجارب التفاعلية بأسلوب إبداعي",
    solutionEn: "Rapid builds for digital products and interactive experiments",
    resultAr: "سرعة تنفيذ وتكرار أعلى",
    resultEn: "Faster delivery cycles",
    resultMetric: "72h MVP",
    ctaAr: "ابدأ الآن",
    ctaEn: "Start Now",
    waAr: "مرحباً! أريد خدمة Vibe Coding",
    waEn: "Hello! I want Vibe Coding services",
    accentColor: "#2E6BFF",
  },
  {
    id: "digital-marketing",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    nameAr: "التسويق الإلكتروني",
    nameEn: "Digital Marketing",
    problemAr: "الإعلانات لا تحقق نتائج واضحة",
    problemEn: "Your ads don't deliver measurable results",
    solutionAr: "حملات Meta وTikTok وSnapchat بخطة محتوى وأهداف واضحة",
    solutionEn: "Meta, TikTok & Snapchat campaigns with clear goals",
    resultAr: "تحسين العائد على الإنفاق",
    resultEn: "Higher ROAS",
    resultMetric: "3.8×",
    ctaAr: "ابدأ التسويق",
    ctaEn: "Start Marketing",
    waAr: "مرحباً! أريد خدمة التسويق الإلكتروني",
    waEn: "Hello! I want digital marketing services",
    accentColor: "#F0B100",
  },
  {
    id: "social-media",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10M7 12h6M7 17h8"/>
      </svg>
    ),
    nameAr: "إدارة السوشيال ميديا",
    nameEn: "Social Media Management",
    problemAr: "المنشورات غير منتظمة ولا تبني ثقة",
    problemEn: "Inconsistent posting doesn't build trust",
    solutionAr: "محتوى + تصميم + تفاعل يومي لزيادة المتابعين والمبيعات",
    solutionEn: "Content, design, and daily engagement to grow sales",
    resultAr: "نمو تفاعل الحسابات",
    resultEn: "Higher engagement",
    resultMetric: "+120%",
    ctaAr: "ابدأ إدارة حسابي",
    ctaEn: "Manage My Accounts",
    waAr: "مرحباً! أريد خدمة إدارة السوشيال ميديا",
    waEn: "Hello! I want social media management",
    accentColor: "#2E6BFF",
  },
  {
    id: "automation",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-1.5 2.6-0.08-.03a1.65 1.65 0 0 0-1.87.33l-.06.06-2.6-1.5.03-.08A1.65 1.65 0 0 0 12 17.6a1.65 1.65 0 0 0-1.82.33l-.06.06-2.6-1.5.03-.08a1.65 1.65 0 0 0-.33-1.87l-.06-.06 1.5-2.6.08.03A1.65 1.65 0 0 0 10.4 12c0-.47-.18-.92-.5-1.24l-.06-.06 1.5-2.6.08.03A1.65 1.65 0 0 0 12 6.4c.47 0 .92.18 1.24.5l.06.06 2.6-1.5-.03-.08a1.65 1.65 0 0 0 .33-1.87l-.06-.06 2.6-1.5.08.03a1.65 1.65 0 0 0 1.87-.33l.06-.06"/>
      </svg>
    ),
    nameAr: "الأتمتة (Automation)",
    nameEn: "Automation",
    problemAr: "العمليات اليدوية تستهلك وقتك",
    problemEn: "Manual tasks waste your time",
    solutionAr: "نربط أدواتك في سير عمل واحد لتقليل الأخطاء وزيادة السرعة",
    solutionEn: "Connect your tools into one workflow for speed and accuracy",
    resultAr: "توفير وقت التشغيل",
    resultEn: "Operational time saved",
    resultMetric: "-60%",
    ctaAr: "أتمت عملي",
    ctaEn: "Automate My Work",
    waAr: "مرحباً! أريد خدمة الأتمتة وربط الأدوات",
    waEn: "Hello! I want automation and integrations",
    accentColor: "#F0B100",
  },
  {
    id: "booth-design",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 18v4M17 18v4"/>
      </svg>
    ),
    nameAr: "تصميم بوثات",
    nameEn: "Booth Design",
    problemAr: "بوث غير منظم يقلل الإقبال",
    problemEn: "An unstructured booth reduces engagement",
    solutionAr: "تصميم بوث احترافي يعكس الهوية ويجذب الزوار",
    solutionEn: "Professional booth design that attracts visitors",
    resultAr: "زيادة التفاعل في المعارض",
    resultEn: "Higher booth engagement",
    resultMetric: "+45%",
    ctaAr: "صمّم بوثي",
    ctaEn: "Design My Booth",
    waAr: "مرحباً! أريد تصميم بوث احترافي",
    waEn: "Hello! I want a professional booth design",
    accentColor: "#2E6BFF",
  },
  {
    id: "exhibitions",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 20h18"/><path d="M4 20V8l8-4 8 4v12"/><path d="M9 12h6"/>
      </svg>
    ),
    nameAr: "تجهيز المعارض",
    nameEn: "Exhibition Setup",
    problemAr: "المعرض يحتاج تجهيز متكامل يظهر احترافك",
    problemEn: "Exhibitions need a complete professional setup",
    solutionAr: "تجهيز كامل من التصميم إلى الشاشات والتجربة البصرية",
    solutionEn: "Full setup from design to screens and visuals",
    resultAr: "تحسين حضور العلامة في المعرض",
    resultEn: "Stronger brand presence",
    resultMetric: "+70%",
    ctaAr: "جهّز معرضي",
    ctaEn: "Set Up My Exhibition",
    waAr: "مرحباً! أريد تجهيز معرض بشكل احترافي",
    waEn: "Hello! I want a professional exhibition setup",
    accentColor: "#F0B100",
  },
  {
    id: "general-dev",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 19h16"/><path d="M8 5h8l2 6H6l2-6z"/><path d="M6 11v4h12v-4"/>
      </svg>
    ),
    nameAr: "البرمجة العامة",
    nameEn: "General Development",
    problemAr: "تحتاج تطوير مواقع ولوحات تحكم وواجهات",
    problemEn: "You need websites, dashboards, and APIs",
    solutionAr: "مواقع، لوحات تحكم، API وتكاملات حسب الطلب",
    solutionEn: "Websites, dashboards, APIs, and integrations on demand",
    resultAr: "حلول مرنة وقابلة للتوسع",
    resultEn: "Scalable and flexible solutions",
    resultMetric: "100%",
    ctaAr: "اطلب البرمجة",
    ctaEn: "Request Development",
    waAr: "مرحباً! أريد خدمة البرمجة العامة",
    waEn: "Hello! I want general development services",
    accentColor: "#2E6BFF",
  },
];

export default function Services() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const title     = isRTL ? "خدماتنا — نتائج حقيقية" : "Our Services — Real Results";
  const subtitle  = isRTL
    ? "كل خدمة مصممة حول نتيجة واحدة فقط: مشروعك يبيع أكثر"
    : "Every service is designed around one goal: your project sells more";

  return (
    <section
      id="services"
      style={{
        background: "#FFFFFF", padding: "80px 0 88px",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Subtle neon grid bg */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        {/* ── Section header ── */}
        <div className="text-center mb-16" dir={isRTL ? "rtl" : "ltr"}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(240,177,0,0.1)", border: "1px solid rgba(240,177,0,0.25)",
            borderRadius: "100px", padding: "6px 18px", marginBottom: "20px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F0B100", display: "inline-block", animation: "svcPulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F0B100" }}>
              {isRTL ? "مشكلة → حل → نتيجة" : "Problem → Solution → Result"}
            </span>
          </div>

          <h2 style={{
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "clamp(30px, 4.5vw, 58px)",
            fontWeight: 800, color: "#1A1A1A", lineHeight: 1.05,
            marginBottom: "14px", letterSpacing: isRTL ? "0" : "-0.03em",
          }}>
            {title}
          </h2>
          <p style={{
            color: "rgba(26,26,26,0.65)", fontSize: "clamp(15px, 2vw, 17px)",
            maxWidth: "560px", margin: "0 auto", lineHeight: 1.75,
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
          }}>
            {subtitle}
          </p>
        </div>

        {/* ── Services grid ── */}
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className="svc-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}
        >
          {SERVICES.map((svc) => {
            const isHovered = hoveredId === svc.id;
            const whatsapp  = getWhatsAppLink(isRTL ? svc.waAr : svc.waEn);
            const name      = isRTL ? svc.nameAr    : svc.nameEn;
            const problem   = isRTL ? svc.problemAr  : svc.problemEn;
            const solution  = isRTL ? svc.solutionAr : svc.solutionEn;
            const result    = isRTL ? svc.resultAr   : svc.resultEn;
            const cta       = isRTL ? svc.ctaAr      : svc.ctaEn;
            const badge     = isRTL ? svc.badge       : svc.badgeEn;
            const ac        = svc.accentColor;

            return (
              <div
                key={svc.id}
                onMouseEnter={() => setHoveredId(svc.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: "#FFFFFF",
                  border: `1px solid ${isHovered || svc.featured ? ac + "55" : "rgba(0,0,0,0.08)"}`,
                  borderRadius: "20px", padding: "28px",
                  transition: "all 0.32s cubic-bezier(0.19,1,0.22,1)",
                  transform: isHovered ? "translateY(-6px)" : "none",
                  boxShadow: isHovered ? `0 24px 64px ${ac}18, 0 0 0 1px ${ac}20` : "0 6px 20px rgba(0,0,0,0.05)",
                  position: "relative", overflow: "hidden",
                  display: "flex", flexDirection: "column", gap: "20px",
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                  background: `linear-gradient(to right, transparent, ${ac}70, transparent)`,
                  opacity: isHovered || svc.featured ? 1 : 0, transition: "opacity 0.3s",
                }} />

                {/* Icon + Badge row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "14px",
                    background: `${ac}14`, border: `1px solid ${ac}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: ac, flexShrink: 0,
                  }}>
                    {svc.icon}
                  </div>
                  {badge && (
                    <span style={{
                      padding: "4px 11px", borderRadius: "100px",
                      background: svc.featured ? ac : `${ac}20`,
                      color: svc.featured ? "#1A1A1A" : ac,
                      fontSize: "11px", fontWeight: 700,
                      fontFamily: isRTL ? "'ThmanyahSans', 'Zain', sans-serif" : "Space Mono, monospace",
                    }}>
                      {badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                  fontSize: isRTL ? "20px" : "16px",
                    fontWeight: 700, color: "#1A1A1A",
                    lineHeight: 1.2, margin: 0,
                  }}>
                    {name}
                  </h3>

                {/* Problem → Solution → Result */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                  {/* Problem */}
                  <div style={{
                    display: "flex", gap: "10px", alignItems: "flex-start",
                    padding: "10px 12px", borderRadius: "10px",
                    background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.18)",
                  }}>
                    <span style={{ fontSize: "13px", flexShrink: 0, marginTop: "1px" }}>⚠️</span>
                    <p style={{
                      margin: 0, fontSize: isRTL ? "13px" : "12px",
                      color: "#8B2C2C", lineHeight: 1.55,
                      fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                    }}>
                      {problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div style={{
                    display: "flex", gap: "10px", alignItems: "flex-start",
                    padding: "10px 12px", borderRadius: "10px",
                    background: `${ac}10`, border: `1px solid ${ac}22`,
                  }}>
                    <span style={{ fontSize: "13px", flexShrink: 0, marginTop: "1px" }}>✅</span>
                    <p style={{
                      margin: 0, fontSize: isRTL ? "13px" : "12px",
                      color: "rgba(26,26,26,0.75)", lineHeight: 1.55,
                      fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                    }}>
                      {solution}
                    </p>
                  </div>

                  {/* Result metric */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "10px 14px", borderRadius: "10px",
                    background: `${ac}12`, border: `1px solid ${ac}25`,
                  }}>
                    <span style={{
                      fontFamily: "Space Mono, monospace", fontSize: "22px",
                      fontWeight: 700, color: ac, lineHeight: 1, flexShrink: 0,
                    }}>
                      {svc.resultMetric}
                    </span>
                    <p style={{
                      margin: 0, fontSize: isRTL ? "12px" : "11px",
                      color: "rgba(26,26,26,0.65)", lineHeight: 1.4,
                      fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                    }}>
                      {result}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                  <button style={{
                    width: "100%", padding: "13px 20px", borderRadius: "10px",
                    background: isHovered || svc.featured ? ac : "transparent",
                    border: `1px solid ${isHovered || svc.featured ? ac : "rgba(0,0,0,0.12)"}`,
                    color: isHovered || svc.featured ? "#1A1A1A" : "#1A1A1A",
                    fontWeight: 700,
                    fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {cta}
                  </button>
                </a>
              </div>
            );
          })}
        </div>

        {/* Guarantee bar */}
        <p dir={isRTL ? "rtl" : "ltr"} style={{
          textAlign: "center", marginTop: "48px",
          color: "rgba(26,26,26,0.4)", fontSize: "12px",
          fontFamily: "Space Mono, monospace", letterSpacing: "0.12em",
        }}>
          {isRTL
            ? "✓ ضمان جودة 30 يوم  ·  ✓ دفع 50% مقدماً فقط  ·  ✓ تسليم في الوقت المحدد  ·  ✓ رد خلال ساعة"
            : "✓ 30-day quality guarantee  ·  ✓ 50% upfront only  ·  ✓ On-time delivery  ·  ✓ 1-hour reply"}
        </p>
      </div>

      <style>{`
        @keyframes svcPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.75); }
        }
        @media (max-width: 1100px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .svc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
