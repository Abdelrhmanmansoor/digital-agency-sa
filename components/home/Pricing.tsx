"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";

const PACKAGES_AR = [
  {
    id: "starter",
    name: "باقة الانطلاق",
    tagline: "للمشاريع الناشئة التي تريد نتيجة سريعة",
    badge: null,
    featured: false,
    accentColor: "#F0B100",
    price: "1,499",
    currency: "ريال",
    valueLabel: "قيمة الباقة تفوق 3,000 ريال",
    features: [
      "تصميم متجر سلة / زد احترافي",
      "إعداد حتى 30 منتج",
      "ربط بوابة دفع واحدة (مدى / STC Pay)",
      "تهيئة الجوال والسرعة",
      "دعم فني لمدة شهر",
      "تسليم خلال 5 أيام مضمون",
    ],
    waMsg: "مرحباً! أريد الاستفسار عن باقة الانطلاق بسعر 1,499 ريال",
  },
  {
    id: "growth",
    name: "باقة النمو",
    tagline: "الأكثر اختياراً — نتائج أسرع وتأثير أعمق",
    badge: "★ الأكثر طلباً",
    featured: true,
    accentColor: "#F0B100",
    price: "2,999",
    currency: "ريال",
    valueLabel: "قيمة الباقة تفوق 7,000 ريال",
    features: [
      "تصميم ثيم مخصص 100% من الصفر",
      "منتجات غير محدودة + صفحات Landing",
      "ربط جميع بوابات الدفع (تابي، تمارا، STC)",
      "هوية بصرية كاملة — لوجو + ألوان + خطوط",
      "تحسين SEO للمتجر",
      "حملة إطلاق على سوشيال ميديا",
      "دعم VIP لمدة 3 أشهر",
      "تسليم خلال 10 أيام",
    ],
    waMsg: "مرحباً! أريد الاستفسار عن باقة النمو بسعر 2,999 ريال",
  },
  {
    id: "pro",
    name: "باقة الاحتراف",
    tagline: "للمشاريع الجادة التي تريد التصدر والسيطرة",
    badge: null,
    featured: false,
    accentColor: "#F0B100",
    price: "5,999",
    currency: "ريال",
    valueLabel: "قيمة الباقة تفوق 15,000 ريال",
    features: [
      "كل مميزات باقة النمو",
      "تصميم UX/UI متكامل من الصفر",
      "استراتيجية محتوى 3 أشهر",
      "إعلانات ممولة Meta + Snapchat + Google",
      "تصوير منتجات بالذكاء الاصطناعي",
      "تقارير أداء مفصلة شهرياً",
      "مدير حساب خاص مخصص لك",
      "دعم VIP لمدة 6 أشهر",
      "تسليم خلال 14 يوم",
    ],
    waMsg: "مرحباً! أريد الاستفسار عن باقة الاحتراف بسعر 5,999 ريال",
  },
];

const PACKAGES_EN = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For new projects that need fast results",
    badge: null,
    featured: false,
    accentColor: "#F0B100",
    price: "1,499",
    currency: "SAR",
    valueLabel: "Package value exceeds 3,000 SAR",
    features: [
      "Professional Salla / Zid store design",
      "Setup up to 30 products",
      "One payment gateway (Mada / STC Pay)",
      "Mobile & speed optimization",
      "1 month technical support",
      "Guaranteed delivery in 5 days",
    ],
    waMsg: "Hello! I'm interested in the Starter package at 1,499 SAR",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Most chosen — faster results, deeper impact",
    badge: "★ Most Popular",
    featured: true,
    accentColor: "#F0B100",
    price: "2,999",
    currency: "SAR",
    valueLabel: "Package value exceeds 7,000 SAR",
    features: [
      "100% custom theme from scratch",
      "Unlimited products + Landing pages",
      "All gateways (Tabby, Tamara, STC)",
      "Full brand identity — logo + colors",
      "Store SEO optimization",
      "Social media launch campaign",
      "3 months VIP support",
      "Delivered in 10 days",
    ],
    waMsg: "Hello! I'm interested in the Growth package at 2,999 SAR",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For serious projects that want to dominate",
    badge: null,
    featured: false,
    accentColor: "#F0B100",
    price: "5,999",
    currency: "SAR",
    valueLabel: "Package value exceeds 15,000 SAR",
    features: [
      "Everything in Growth",
      "Full UX/UI design from scratch",
      "3-month content strategy",
      "Paid ads — Meta + Snap + Google",
      "AI product photography",
      "Detailed monthly performance reports",
      "Dedicated personal account manager",
      "6 months VIP support",
      "Delivered in 14 days",
    ],
    waMsg: "Hello! I'm interested in the Pro package at 5,999 SAR",
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
      style={{ background: "#0A0A0A", padding: "80px 0", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}
    >
      {/* Subtle bg pattern */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(240,177,0,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      <div ref={ref} className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-12" dir={isRTL ? "rtl" : "ltr"}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(240,177,0,0.08)", border: "1px solid rgba(240,177,0,0.2)",
            borderRadius: "100px", padding: "6px 18px", marginBottom: "20px",
          }}>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F0B100" }}>
              {isRTL ? "استثمار يعود بضعفه" : "Investment That Pays Back"}
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800,
            color: "#FAFAF7", marginBottom: "12px", lineHeight: 1.1,
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
          }}>
            {isRTL ? "باقات مدروسة للنتائج الحقيقية" : "Packages Built for Real Results"}
          </h2>
          <p style={{ color: "#8C8C7A", fontSize: "16px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7, fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>
            {isRTL
              ? "لا تدفع مقابل تصميم — تدفع مقابل نمو مبيعاتك. كل ريال تستثمره يعود بضعفه."
              : "You're not paying for design — you're paying for sales growth. Every riyal invested returns double."}
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
                  ? "linear-gradient(160deg, rgba(240,177,0,0.08) 0%, rgba(10,10,10,0) 60%)"
                  : "rgba(255,255,255,0.02)",
                border: pkg.featured
                  ? `1.5px solid rgba(240,177,0,0.45)`
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
                    background: "#F0B100",
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

              {/* Icon */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
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

              {/* Package name + price + tagline */}
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{
                  fontSize: "20px", fontWeight: 700, color: "#FAFAF7",
                  marginBottom: "4px", fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                }}>
                  {pkg.name}
                </h3>
                <p style={{ fontSize: "13px", color: "#6B6B5A", lineHeight: 1.5, marginBottom: "16px", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>
                  {pkg.tagline}
                </p>
                {/* Price */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "6px" }}>
                  <span style={{
                    fontFamily: "Space Mono, monospace", fontSize: "36px",
                    fontWeight: 700, color: pkg.accentColor, lineHeight: 1,
                  }}>
                    {(pkg as {price?: string}).price}
                  </span>
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>
                    {(pkg as {currency?: string}).currency}
                  </span>
                </div>
                {/* Value label */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "6px", padding: "3px 10px",
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={pkg.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>
                    {(pkg as {valueLabel?: string}).valueLabel}
                  </span>
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

              {/* CTA → WhatsApp */}
              <a
                href={getWhatsAppLink(pkg.waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block" }}
              >
                <button
                  style={{
                    width: "100%",
                    padding: "14px 24px",
                    background: pkg.featured ? "#F0B100" : "transparent",
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
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
                      e.currentTarget.style.background = "#F0B100";
                      e.currentTarget.style.transform = "translateY(0)";
                    } else {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = `${pkg.accentColor}50`;
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  {/* WhatsApp icon */}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {isRTL ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
                </button>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px",
              padding: "28px 40px",
              maxWidth: "520px",
            }}
          >
            <p style={{ color: "#6B6B5A", fontSize: "14px", fontFamily: "Space Mono, monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {isRTL ? "تحتاج باقة مخصصة؟" : "Need a custom package?"}
            </p>
            <p style={{ color: "#9C9C8A", fontSize: "15px", lineHeight: 1.6 }}>
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
                  border: "1px solid rgba(240,177,0,0.4)",
                  color: "#F0B100",
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
                  e.currentTarget.style.background = "rgba(240,177,0,0.1)";
                  e.currentTarget.style.borderColor = "#F0B100";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(240,177,0,0.4)";
                }}
              >
                {isRTL ? "تواصل معنا →" : "Contact Us →"}
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
