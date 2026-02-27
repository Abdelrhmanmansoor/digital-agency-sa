"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

/* ─────────────────────────────────────────────────────────────
   Real logo images from /public/logos/
   salla.svg  — official Salla wide logo (dark teal)
   zid-wide.png — official Zid logo (purple)
   google.png — official Google wordmark
   meta.png   — official Meta wordmark
──────────────────────────────────────────────────────────── */
const LOGOS = {
  salla:  { src: "/logos/salla.svg",     w: 148, h: 62 },
  zid:    { src: "/logos/zid-wide.png",  w: 140, h: 79 },
  google: { src: "/logos/google.png",    w: 148, h: 50 },
  meta:   { src: "/logos/meta.png",      w: 148, h: 30 },
};

/* ─────────────────────────────────────────────────────────────
   Individual partner card
──────────────────────────────────────────────────────────── */
interface PartnerCardProps {
  logoKey: keyof typeof LOGOS;
  badgeAr: string;
  badgeEn: string;
  accentColor: string;
  accentRGB: string;
  features: { ar: string; en: string }[];
  isRTL: boolean;
}

function PartnerCard({ logoKey, badgeAr, badgeEn, accentColor, accentRGB, features, isRTL }: PartnerCardProps) {
  const [hovered, setHovered] = useState(false);
  const logo = LOGOS[logoKey];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.028)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.07)"}`,
        borderTop: `3px solid ${accentColor}`,
        borderRadius: "14px",
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        transition: "all 0.25s",
        direction: isRTL ? "rtl" : "ltr",
        cursor: "default",
      }}
    >
      {/* Logo on white background pill */}
      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "14px 20px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "flex-start",
          minWidth: "170px",
          minHeight: "64px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo.src}
          alt={logoKey}
          width={logo.w}
          height={logo.h}
          style={{ display: "block", objectFit: "contain", maxWidth: "100%", height: "auto" }}
        />
      </div>

      {/* Partner badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: `rgba(${accentRGB},0.1)`,
          border: `1px solid rgba(${accentRGB},0.3)`,
          borderRadius: "20px",
          padding: "5px 12px",
          alignSelf: "flex-start",
        }}
      >
        <svg width="9" height="9" viewBox="0 0 24 24" fill={accentColor}>
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
        <span style={{ fontFamily: "Space Mono, monospace", fontSize: "8px", color: accentColor, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
          {isRTL ? badgeAr : badgeEn}
        </span>
      </div>

      {/* Features */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill={accentColor} style={{ marginTop: "3px", flexShrink: 0 }}>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.55 }}>
              {isRTL ? f.ar : f.en}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main section
──────────────────────────────────────────────────────────── */
export default function PlatformCertifications() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const partners: Omit<PartnerCardProps, "isRTL">[] = [
    {
      logoKey: "salla",
      badgeAr: "شريك سلة الرسمي",
      badgeEn: "Official Salla Partner",
      accentColor: "#004956",
      accentRGB: "0,73,86",
      features: [
        { ar: "تصميم متاجر سلة احترافية", en: "Professional Salla store design" },
        { ar: "تهيئة كاملة للجوال وسرعة التحميل", en: "Full mobile & speed optimization" },
        { ar: "ربط بوابات الدفع والشحن المحلي", en: "Local payment & shipping setup" },
        { ar: "تسليم خلال 5 أيام عمل مضمونة", en: "Delivery in 5 guaranteed business days" },
      ],
    },
    {
      logoKey: "zid",
      badgeAr: "شريك زد الرسمي",
      badgeEn: "Official Zid Partner",
      accentColor: "#7B2FBE",
      accentRGB: "123,47,190",
      features: [
        { ar: "تصميم متاجر زد بهوية بصرية مميزة", en: "Zid stores with strong brand identity" },
        { ar: "نموذج Figma قبل أي تنفيذ", en: "Figma prototype before development" },
        { ar: "تحليل المنافسين مجاناً", en: "Free competitor analysis included" },
        { ar: "شهر دعم فني مجاني بعد التسليم", en: "1 month free post-launch support" },
      ],
    },
    {
      logoKey: "google",
      badgeAr: "Google Partner معتمد",
      badgeEn: "Certified Google Partner",
      accentColor: "#4285F4",
      accentRGB: "66,133,244",
      features: [
        { ar: "إعلانات Google Ads بكفاءة عالية", en: "High-ROI Google Ads campaigns" },
        { ar: "تحسين ظهور المتجر في البحث (SEO)", en: "Store SEO & search visibility" },
        { ar: "Google Shopping للمتاجر الإلكترونية", en: "Google Shopping for e-commerce" },
        { ar: "تتبع الأهداف وتقارير المبيعات", en: "Goal tracking & sales analytics" },
      ],
    },
    {
      logoKey: "meta",
      badgeAr: "Meta Business Partner",
      badgeEn: "Meta Business Partner",
      accentColor: "#0082FB",
      accentRGB: "0,130,251",
      features: [
        { ar: "إدارة حملات ميتا وإنستغرام", en: "Meta & Instagram ad management" },
        { ar: "إعداد Pixel ومتابعة التحويلات", en: "Pixel setup & conversion tracking" },
        { ar: "تصميم إعلانات بصرية احترافية", en: "Professional ad creative design" },
        { ar: "تقارير أداء أسبوعية تفصيلية", en: "Detailed weekly performance reports" },
      ],
    },
  ];

  return (
    <section
      style={{
        background: "#080808",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(200,169,98,0.35), transparent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(200,169,98,0.15), transparent)", pointerEvents: "none" }} />

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px", direction: isRTL ? "rtl" : "ltr" }}>
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
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#C8A962">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A962" }}>
              {isRTL ? "شراكات رسمية معتمدة" : "Official Certified Partnerships"}
            </span>
          </div>

          <h2 style={{ fontFamily: "'Zain', sans-serif", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, color: "#FAFAF7", lineHeight: 1.2, marginBottom: "16px" }}>
            {isRTL
              ? "شركاء رسميون مع أبرز منصات التجارة الإلكترونية"
              : "Official Partners with Leading E-Commerce Platforms"}
          </h2>
          <p style={{ fontFamily: "'Zain', sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.42)", maxWidth: "580px", margin: "0 auto", lineHeight: 1.8 }}>
            {isRTL
              ? "نحن شركاء معتمدون مع سلة وزد ومنصات الإعلان العالمية — مما يعني أنك تحصل على الأفضل في كل منصة"
              : "Certified partners with Salla, Zid, and global ad platforms — best results across every channel"}
          </p>
        </div>

        {/* Cards */}
        <div
          className="pc-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}
        >
          {partners.map((p) => (
            <PartnerCard key={p.logoKey} {...p} isRTL={isRTL} />
          ))}
        </div>

        {/* Guarantees strip */}
        <div
          style={{
            marginTop: "44px",
            background: "rgba(200,169,98,0.04)",
            border: "1px solid rgba(200,169,98,0.12)",
            borderRadius: "12px",
            padding: "22px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          {[
            { num: "48H",  ar: "أسرع تسليم في السوق",         en: "Fastest delivery in market" },
            { num: "100%", ar: "رضا تام أو استرداد كامل",      en: "Full refund if unsatisfied" },
            { num: "5★",   ar: "تقييم عملائنا الدائم",          en: "Consistent 5-star rating" },
            { num: "2×",   ar: "مراجعات مجانية على كل مشروع",  en: "Free revisions per project" },
          ].map((item) => (
            <div key={item.num} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "22px", fontWeight: 700, color: "#C8A962", lineHeight: 1 }}>
                {item.num}
              </span>
              <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.48)", lineHeight: 1.4 }}>
                {isRTL ? item.ar : item.en}
              </span>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) { .pc-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px)  { .pc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
