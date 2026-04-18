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
  /* ── 1. Salla / Zid store design ── */
  {
    id: "salla-design",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/><path d="M7 8h3M7 11h5"/><rect x="13" y="7" width="5" height="5" rx="1"/>
      </svg>
    ),
    nameAr: "تصميم متجر سلة / زد احترافي",
    nameEn: "Salla & Zid Store Design",
    problemAr: "متجرك لا يبيع لأن التصميم لا يثق به العميل",
    problemEn: "Your store doesn't sell because it lacks trust",
    solutionAr: "متجر جاهز للبيع خلال 5 أيام — ثيم مخصص + صفحات منتجات + تجربة جوال مثالية",
    solutionEn: "Store ready to sell in 5 days — custom theme, product pages & mobile UX",
    resultAr: "متوسط زيادة التحويل لدى عملائنا",
    resultEn: "Avg conversion increase for our clients",
    resultMetric: "+40%",
    ctaAr: "اطلب تصميم متجرك",
    ctaEn: "Request Store Design",
    waAr: "مرحباً! أريد الاستفسار عن تصميم متجر سلة / زد احترافي",
    waEn: "Hello! I want to inquire about professional Salla/Zid store design",
    accentColor: "#A3FF12",
    featured: true,
    badge: "الأكثر طلباً",
    badgeEn: "Most Popular",
  },
  /* ── 2. AI Product Photography ── */
  {
    id: "ai-photography",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
        <path d="m15 10 1-1.5"/>
      </svg>
    ),
    nameAr: "تصوير منتجات بالذكاء الاصطناعي",
    nameEn: "AI Product Photography",
    problemAr: "صور منتجاتك رديئة تجعل العميل يتراجع عن الشراء",
    problemEn: "Poor product images make customers hesitate to buy",
    solutionAr: "جلسات تصوير منتجات سينمائية فاخرة بالذكاء الاصطناعي — بدون استوديو وبنصف التكلفة",
    solutionEn: "Cinematic luxury product shoots using AI — no studio, half the cost",
    resultAr: "زيادة في معدل إضافة المنتج للسلة",
    resultEn: "Increase in add-to-cart rate",
    resultMetric: "+65%",
    ctaAr: "اطلب جلسة تصوير",
    ctaEn: "Request Photo Session",
    waAr: "مرحباً! أريد الاستفسار عن خدمة تصوير المنتجات بالذكاء الاصطناعي",
    waEn: "Hello! I'd like to inquire about AI Product Photography",
    accentColor: "#C8A962",
    badge: "جديد",
    badgeEn: "New",
  },
  /* ── 3. Website & App Development ── */
  {
    id: "web-dev",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        <line x1="12" y1="2" x2="12" y2="22"/>
      </svg>
    ),
    nameAr: "تطوير مواقع وتطبيقات",
    nameEn: "Website & App Development",
    problemAr: "مشروعك يحتاج منصة رقمية تعكس احترافيتك وتبيع تلقائياً",
    problemEn: "Your project needs a digital platform that sells automatically",
    solutionAr: "موقع أو تطبيق مخصص بالكامل — Next.js سريع، SEO قوي، واجهة فاخرة",
    solutionEn: "Fully custom website or app — fast Next.js, strong SEO, luxury UI",
    resultAr: "سرعة تحميل مقارنة بالمنافسين",
    resultEn: "Load speed vs competitors",
    resultMetric: "3×",
    ctaAr: "استشارة مجانية",
    ctaEn: "Free Consultation",
    waAr: "مرحباً! أريد الاستفسار عن تطوير موقع أو تطبيق لمشروعي",
    waEn: "Hello! I'd like to discuss website/app development for my project",
    accentColor: "#A3FF12",
  },
  /* ── 4. Conversion Optimization ── */
  {
    id: "conversion",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    nameAr: "تحسين معدل التحويل CRO",
    nameEn: "Conversion Rate Optimization",
    problemAr: "زوار كثيرون لكن مبيعات قليلة — مشكلتك في التحويل لا في الإعلانات",
    problemEn: "Lots of traffic but few sales — your issue is conversion not ads",
    solutionAr: "تحليل كامل للمتجر + تحسين صفحات المنتج والسلة والدفع لمضاعفة المبيعات",
    solutionEn: "Full store audit + product/cart/checkout optimization to multiply sales",
    resultAr: "زيادة المبيعات بدون زيادة ميزانية الإعلانات",
    resultEn: "Sales increase without extra ad spend",
    resultMetric: "+120%",
    ctaAr: "حلل متجري الآن",
    ctaEn: "Analyze My Store",
    waAr: "مرحباً! أريد تحليل متجري وتحسين معدل التحويل",
    waEn: "Hello! I want to analyze my store and improve conversion rate",
    accentColor: "#C8A962",
  },
  /* ── 5. Funnel Building ── */
  {
    id: "funnel",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
    ),
    nameAr: "بناء فنل مبيعات",
    nameEn: "Sales Funnel Building",
    problemAr: "عميلك يصل لمتجرك ثم يغادر بدون شراء — لأنك لا تملك فنل يحوّله",
    problemEn: "Visitors arrive then leave without buying — you have no funnel to convert them",
    solutionAr: "فنل مبيعات كامل: صفحة هبوط + عرض خاص + متابعة تلقائية + upsell",
    solutionEn: "Complete sales funnel: landing page + special offer + auto-follow-up + upsell",
    resultAr: "زيادة متوسط قيمة الطلب",
    resultEn: "Average order value increase",
    resultMetric: "+85%",
    ctaAr: "ابنِ فنلي الآن",
    ctaEn: "Build My Funnel",
    waAr: "مرحباً! أريد بناء فنل مبيعات لمتجري أو منتجي",
    waEn: "Hello! I want to build a sales funnel for my store/product",
    accentColor: "#A3FF12",
  },
  /* ── 6. Digital Marketing ── */
  {
    id: "marketing",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    nameAr: "تسويق رقمي وإعلانات ممولة",
    nameEn: "Digital Marketing & Paid Ads",
    problemAr: "إعلاناتك تستنزف الميزانية بلا نتائج حقيقية",
    problemEn: "Your ads drain the budget with no real results",
    solutionAr: "حملات إعلانية محترفة على سناب، انستغرام، تيك توك وجوجل — نستهدف المشتري الجاهز",
    solutionEn: "Pro campaigns on Snap, Instagram, TikTok & Google — targeting ready-to-buy audience",
    resultAr: "متوسط عائد على الإنفاق الإعلاني",
    resultEn: "Average Return on Ad Spend",
    resultMetric: "4.5× ROAS",
    ctaAr: "ابدأ حملتك الآن",
    ctaEn: "Launch Your Campaign",
    waAr: "مرحباً! أريد إطلاق حملات إعلانية ممولة لمتجري",
    waEn: "Hello! I want to launch paid ad campaigns for my store",
    accentColor: "#C8A962",
  },
  /* ── 7. SEO ── */
  {
    id: "seo",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        <path d="M11 8v6M8 11h6"/>
      </svg>
    ),
    nameAr: "تحسين محركات البحث SEO",
    nameEn: "Search Engine Optimization",
    problemAr: "متجرك غير مرئي على جوجل — عملاؤك يجدون المنافسين أولاً",
    problemEn: "Your store is invisible on Google — customers find competitors first",
    solutionAr: "SEO متكامل للمتاجر السعودية — كلمات مفتاحية، محتوى، روابط، وتقارير شهرية",
    solutionEn: "Full SEO for Saudi stores — keywords, content, links & monthly reports",
    resultAr: "تصدر جوجل خلال 90 يوم",
    resultEn: "Google rank #1 within 90 days",
    resultMetric: "#1",
    ctaAr: "تصدّر جوجل",
    ctaEn: "Rank on Google",
    waAr: "مرحباً! أريد تحسين ظهور متجري في محركات البحث SEO",
    waEn: "Hello! I want to improve my store's search engine visibility",
    accentColor: "#A3FF12",
  },
  /* ── 8. Brand Identity ── */
  {
    id: "branding",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
      </svg>
    ),
    nameAr: "هوية بصرية وجرافيك",
    nameEn: "Brand Identity & Graphic Design",
    problemAr: "علامتك التجارية لا تُميزك عن المنافسين — العميل لا يتذكرك",
    problemEn: "Your brand doesn't differentiate you — customers don't remember you",
    solutionAr: "هوية بصرية كاملة — لوجو، ألوان، خطوط، موشن جرافيك، وقالب سوشيال ميديا",
    solutionEn: "Full brand identity — logo, colors, fonts, motion graphics & social templates",
    resultAr: "علامة تجارية يثق بها العميل للشراء",
    resultEn: "Brand identity that builds purchase trust",
    resultMetric: "100%",
    ctaAr: "صمّم هويتي",
    ctaEn: "Design My Brand",
    waAr: "مرحباً! أريد تصميم هوية بصرية كاملة لمشروعي",
    waEn: "Hello! I want a complete brand identity designed for my project",
    accentColor: "#C8A962",
  },
  /* ── 9. Content Production ── */
  {
    id: "content",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
        <path d="m15 5 3 3"/>
      </svg>
    ),
    nameAr: "إنتاج محتوى رقمي بالذكاء الاصطناعي",
    nameEn: "AI-Powered Digital Content",
    problemAr: "إنتاج المحتوى اليومي مكلف ومستنزف للوقت والموارد",
    problemEn: "Daily content production is costly and time-consuming",
    solutionAr: "30 تصميم شهرياً + ريلز + قصص + كابشن + هاشتاقات — كل شيء بالذكاء الاصطناعي",
    solutionEn: "30 monthly designs + reels + stories + captions — all AI-powered",
    resultAr: "توفير في تكلفة إنتاج المحتوى",
    resultEn: "Content production cost savings",
    resultMetric: "-70%",
    ctaAr: "ابدأ إنتاج محتواك",
    ctaEn: "Start Content Production",
    waAr: "مرحباً! أريد خدمة إنتاج محتوى رقمي بالذكاء الاصطناعي",
    waEn: "Hello! I'd like AI-powered digital content production",
    accentColor: "#A3FF12",
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
        background: "#0D0D0D", padding: "80px 0 88px",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Subtle neon grid bg */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(163,255,18,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(163,255,18,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        {/* ── Section header ── */}
        <div className="text-center mb-16" dir={isRTL ? "rtl" : "ltr"}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(163,255,18,0.08)", border: "1px solid rgba(163,255,18,0.2)",
            borderRadius: "100px", padding: "6px 18px", marginBottom: "20px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#A3FF12", display: "inline-block", animation: "svcPulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A3FF12" }}>
              {isRTL ? "مشكلة → حل → نتيجة" : "Problem → Solution → Result"}
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Zain', sans-serif", fontSize: "clamp(30px, 4.5vw, 58px)",
            fontWeight: 800, color: "#FFFFFF", lineHeight: 1.05,
            marginBottom: "14px", letterSpacing: isRTL ? "0" : "-0.03em",
          }}>
            {title}
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.42)", fontSize: "clamp(15px, 2vw, 17px)",
            maxWidth: "560px", margin: "0 auto", lineHeight: 1.75,
            fontFamily: "'Zain', sans-serif",
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
                  background: svc.featured
                    ? `linear-gradient(160deg, ${ac}08 0%, rgba(10,10,10,0) 70%)`
                    : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isHovered || svc.featured ? ac + "45" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "20px", padding: "28px",
                  transition: "all 0.32s cubic-bezier(0.19,1,0.22,1)",
                  transform: isHovered ? "translateY(-6px)" : "none",
                  boxShadow: isHovered ? `0 24px 64px ${ac}12, 0 0 0 1px ${ac}20` : "none",
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
                    background: `${ac}12`, border: `1px solid ${ac}28`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: ac, flexShrink: 0,
                  }}>
                    {svc.icon}
                  </div>
                  {badge && (
                    <span style={{
                      padding: "4px 11px", borderRadius: "100px",
                      background: svc.featured ? ac : `${ac}20`,
                      color: svc.featured ? "#0D0D0D" : ac,
                      fontSize: "11px", fontWeight: 700,
                      fontFamily: isRTL ? "'Zain', sans-serif" : "Space Mono, monospace",
                    }}>
                      {badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: isRTL ? "20px" : "16px",
                  fontWeight: 700, color: "#FFFFFF",
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
                    background: "rgba(255,80,80,0.06)", border: "1px solid rgba(255,80,80,0.12)",
                  }}>
                    <span style={{ fontSize: "13px", flexShrink: 0, marginTop: "1px" }}>⚠️</span>
                    <p style={{
                      margin: 0, fontSize: isRTL ? "13px" : "12px",
                      color: "rgba(255,180,180,0.8)", lineHeight: 1.55,
                      fontFamily: "'Zain', sans-serif",
                    }}>
                      {problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div style={{
                    display: "flex", gap: "10px", alignItems: "flex-start",
                    padding: "10px 12px", borderRadius: "10px",
                    background: `${ac}07`, border: `1px solid ${ac}18`,
                  }}>
                    <span style={{ fontSize: "13px", flexShrink: 0, marginTop: "1px" }}>✅</span>
                    <p style={{
                      margin: 0, fontSize: isRTL ? "13px" : "12px",
                      color: "rgba(255,255,255,0.65)", lineHeight: 1.55,
                      fontFamily: "'Zain', sans-serif",
                    }}>
                      {solution}
                    </p>
                  </div>

                  {/* Result metric */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "10px 14px", borderRadius: "10px",
                    background: `${ac}10`, border: `1px solid ${ac}25`,
                  }}>
                    <span style={{
                      fontFamily: "Space Mono, monospace", fontSize: "22px",
                      fontWeight: 700, color: ac, lineHeight: 1, flexShrink: 0,
                    }}>
                      {svc.resultMetric}
                    </span>
                    <p style={{
                      margin: 0, fontSize: isRTL ? "12px" : "11px",
                      color: "rgba(255,255,255,0.45)", lineHeight: 1.4,
                      fontFamily: "'Zain', sans-serif",
                    }}>
                      {result}
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                  <button style={{
                    width: "100%", padding: "13px 20px", borderRadius: "10px",
                    background: isHovered || svc.featured
                      ? ac
                      : "transparent",
                    border: `1px solid ${isHovered || svc.featured ? ac : "rgba(255,255,255,0.14)"}`,
                    color: isHovered || svc.featured ? "#0D0D0D" : "rgba(255,255,255,0.7)",
                    fontWeight: 700,
                    fontFamily: "'Zain', sans-serif",
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
          color: "rgba(255,255,255,0.2)", fontSize: "12px",
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
