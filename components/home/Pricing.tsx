"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";

const PACKAGES_AR = [
  {
    id: "starter",
    name: "باقة الانطلاق",
    tagline: "للمبتدئين وأصحاب المشاريع الناشئة",
    price: "799",
    oldPrice: "2,500",
    discount: "68%",
    badge: null,
    featured: false,
    accentColor: "#C8A962",
    features: [
      "تصميم متجر سلة احترافي",
      "إعداد حتى 20 منتج",
      "ربط بوابة دفع واحدة",
      "تحسين صفحات المنتجات",
      "دعم فني لمدة شهر",
      "تسليم خلال 5 أيام",
    ],
  },
  {
    id: "pro",
    name: "باقة الاحتراف",
    tagline: "الخيار الأمثل للمتاجر الجادة",
    price: "1,499",
    oldPrice: "4,999",
    discount: "70%",
    badge: "★ الأكثر طلباً",
    featured: true,
    accentColor: "#C8A962",
    features: [
      "تصميم ثيم مخصص بالكامل",
      "إعداد منتجات غير محدودة",
      "ربط جميع بوابات الدفع",
      "هوية بصرية كاملة (لوجو + ألوان)",
      "إعداد حسابات سوشيال ميديا",
      "حملة إطلاق تسويقية",
      "تحسين SEO أساسي",
      "دعم فني لمدة 3 أشهر",
      "تسليم خلال 10 أيام",
    ],
  },
  {
    id: "enterprise",
    name: "باقة التميز",
    tagline: "للمتاجر الكبيرة والمشاريع المتطورة",
    price: "2,999",
    oldPrice: "8,500",
    discount: "65%",
    badge: null,
    featured: false,
    accentColor: "#BDEE63",
    features: [
      "كل مميزات باقة الاحتراف",
      "تصميم UX/UI من الصفر",
      "استراتيجية محتوى متكاملة",
      "إعلانات ممولة Meta + Google",
      "تقارير أداء شهرية مفصلة",
      "مدير حساب خاص",
      "أولوية قصوى في الدعم",
      "دعم VIP لمدة 6 أشهر",
      "تسليم خلال 14 يوم",
    ],
  },
];

const PACKAGES_EN = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For beginners & new projects",
    price: "799",
    oldPrice: "2,500",
    discount: "68%",
    badge: null,
    featured: false,
    accentColor: "#C8A962",
    features: [
      "Professional Salla store design",
      "Setup up to 20 products",
      "One payment gateway",
      "Product page optimization",
      "1 month technical support",
      "Delivered in 5 days",
    ],
  },
  {
    id: "pro",
    name: "Professional",
    tagline: "Best for serious stores",
    price: "1,499",
    oldPrice: "4,999",
    discount: "70%",
    badge: "★ Most Popular",
    featured: true,
    accentColor: "#C8A962",
    features: [
      "Fully custom theme design",
      "Unlimited products setup",
      "All payment gateways",
      "Full brand identity (logo + colors)",
      "Social media setup",
      "Launch marketing campaign",
      "Basic SEO optimization",
      "3 months technical support",
      "Delivered in 10 days",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large & advanced stores",
    price: "2,999",
    oldPrice: "8,500",
    discount: "65%",
    badge: null,
    featured: false,
    accentColor: "#BDEE63",
    features: [
      "All Professional features",
      "Custom UX/UI from scratch",
      "Full content strategy",
      "Paid ads — Meta + Google",
      "Detailed monthly reports",
      "Dedicated account manager",
      "Priority support",
      "6 months VIP support",
      "Delivered in 14 days",
    ],
  },
];

export default function Pricing() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const packages = locale === "ar" ? PACKAGES_AR : PACKAGES_EN;

  return (
    <section
      id="pricing"
      className="relative"
      style={{ background: "#0A0A0A", padding: "120px 0", fontFamily: "'Zain', sans-serif" }}
    >
      {/* Subtle bg pattern */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(200,169,98,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">

        {/* Limited offer banner */}
        <div className="flex justify-center mb-10">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(189,238,99,0.08)",
              border: "1px solid rgba(189,238,99,0.25)",
              borderRadius: "100px",
              padding: "8px 20px",
              fontSize: "13px",
              fontFamily: "Space Mono, monospace",
              color: "#BDEE63",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#BDEE63", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink:0 }}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            {isRTL ? "عرض محدود — توفير يصل إلى 70%" : "Limited Offer — Save Up To 70%"}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 800,
              color: "#FAFAF7",
              marginBottom: "12px",
              lineHeight: 1.1,
            }}
          >
            {isRTL ? "باقات لا تُقاوَم" : "Unbeatable Packages"}
          </h2>
          <p style={{ color: "#8C8C7A", fontSize: "17px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
            {isRTL
              ? "جودة احترافية بأسعار تنافسية — استثمر في نجاح متجرك"
              : "Professional quality at competitive prices — invest in your store's success"}
          </p>
        </div>

        {/* Cards grid */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "stretch" }}
        >
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              style={{
                position: "relative",
                background: pkg.featured
                  ? "linear-gradient(160deg, rgba(200,169,98,0.08) 0%, rgba(10,10,10,0) 60%)"
                  : "rgba(255,255,255,0.02)",
                border: pkg.featured
                  ? "1.5px solid rgba(200,169,98,0.45)"
                  : "1px solid rgba(255,255,255,0.07)",
                borderRadius: "20px",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(40px) scale(0.98)",
                transition: `all 0.65s ${index * 0.12}s cubic-bezier(0.19,1,0.22,1)`,
              }}
            >
              {/* Popular badge */}
              {pkg.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#C8A962",
                    color: "#0A0A0A",
                    padding: "5px 18px",
                    borderRadius: "100px",
                    fontSize: "11px",
                    fontFamily: "Space Mono, monospace",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {pkg.badge}
                </div>
              )}

              {/* Discount chip */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div
                  style={{
                    background: "rgba(189,238,99,0.12)",
                    color: "#BDEE63",
                    padding: "4px 12px",
                    borderRadius: "100px",
                    fontSize: "12px",
                    fontFamily: "Space Mono, monospace",
                    fontWeight: 700,
                  }}
                >
                  {isRTL ? `وفّر ${pkg.discount}` : `-${pkg.discount}`}
                </div>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: `${pkg.accentColor}12`,
                    border: `1px solid ${pkg.accentColor}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {pkg.id === "starter" ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={pkg.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19V5M5 12l7-7 7 7"/>
                    </svg>
                  ) : pkg.id === "pro" ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={pkg.accentColor}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={pkg.accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12l4 6-10 13L2 9z"/>
                      <path d="M11 3L8 9l4 13 4-13-3-6"/>
                      <path d="M2 9h20"/>
                    </svg>
                  )}
                </div>
              </div>

              {/* Package name + tagline */}
              <div style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#FAFAF7",
                    marginBottom: "6px",
                  }}
                >
                  {pkg.name}
                </h3>
                <p style={{ fontSize: "13px", color: "#6B6B5A", lineHeight: 1.5 }}>
                  {pkg.tagline}
                </p>
              </div>

              {/* Price block */}
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "14px",
                  padding: "20px 24px",
                  marginBottom: "28px",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {/* Old price crossed */}
                <div
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "13px",
                    color: "#555",
                    textDecoration: "line-through",
                    marginBottom: "4px",
                  }}
                >
                  {pkg.oldPrice} {isRTL ? "ر.س" : "SAR"}
                </div>
                {/* New price */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span
                    style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "clamp(38px, 3.5vw, 52px)",
                      fontWeight: 700,
                      color: pkg.featured ? "#C8A962" : "#FAFAF7",
                      lineHeight: 1,
                    }}
                  >
                    {pkg.price}
                  </span>
                  <span style={{ fontSize: "15px", color: "#8C8C7A" }}>
                    {isRTL ? "ر.س" : "SAR"}
                  </span>
                </div>
                <div style={{ fontSize: "12px", color: "#4A4A3A", marginTop: "6px", fontFamily: "Space Mono, monospace" }}>
                  {isRTL ? "دفعة واحدة — بدون رسوم خفية" : "One-time — no hidden fees"}
                </div>
              </div>

              {/* Features */}
              <ul style={{ flex: 1, marginBottom: "28px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {pkg.features.map((feature) => (
                  <li key={feature} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={pkg.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, marginTop:"3px" }}>
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                    <span style={{ color: "#9C9C8A", fontSize: "14px", lineHeight: 1.55 }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={getWhatsAppLink(
                  isRTL
                    ? `مرحباً! أريد الاستفسار عن ${pkg.name} بسعر ${pkg.price} ر.س`
                    : `Hello! I'm interested in the ${pkg.name} package at ${pkg.price} SAR`
                )}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block" }}
              >
                <button
                  style={{
                    width: "100%",
                    padding: "14px 24px",
                    background: pkg.featured ? "#C8A962" : "transparent",
                    border: pkg.featured ? "none" : `1px solid ${pkg.accentColor}50`,
                    borderRadius: "10px",
                    color: pkg.featured ? "#0A0A0A" : pkg.accentColor,
                    fontFamily: "Space Mono, monospace",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (pkg.featured) {
                      e.currentTarget.style.background = "#E0BF70";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    } else {
                      e.currentTarget.style.background = `${pkg.accentColor}15`;
                      e.currentTarget.style.borderColor = pkg.accentColor;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pkg.featured) {
                      e.currentTarget.style.background = "#C8A962";
                      e.currentTarget.style.transform = "translateY(0)";
                    } else {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = `${pkg.accentColor}50`;
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  {isRTL ? "اطلب الباقة الآن ←" : "Order Now →"}
                </button>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px",
              padding: "32px 48px",
              maxWidth: "560px",
            }}
          >
            <p style={{ color: "#6B6B5A", fontSize: "14px", fontFamily: "Space Mono, monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {isRTL ? "تحتاج باقة مخصصة؟" : "Need a custom package?"}
            </p>
            <p style={{ color: "#9C9C8A", fontSize: "16px", lineHeight: 1.6 }}>
              {isRTL
                ? "نبني لك حلاً مخصصاً حسب متطلبات مشروعك ومتجرك"
                : "We build a tailored solution for your project's specific needs"}
            </p>
            <a
              href={getWhatsAppLink(
                isRTL
                  ? "مرحباً! أريد الاستفسار عن باقة مخصصة لمشروعي"
                  : "Hello! I need a custom package for my project"
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                style={{
                  background: "transparent",
                  border: "1px solid rgba(200,169,98,0.4)",
                  color: "#C8A962",
                  padding: "12px 32px",
                  borderRadius: "8px",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(200,169,98,0.1)";
                  e.currentTarget.style.borderColor = "#C8A962";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(200,169,98,0.4)";
                }}
              >
                {isRTL ? "تواصل معنا →" : "Contact Us →"}
              </button>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.5; transform:scale(0.8); }
        }
      `}</style>
    </section>
  );
}
