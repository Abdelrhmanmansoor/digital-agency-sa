"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

/* ─────────────────────────────────────────────────────────────
   Accurate SVG reproductions of the real logos
   Based on official brand assets
──────────────────────────────────────────────────────────── */

/* Salla — teal #1B6B74, rounded-square basket + smile arc */
function SallaLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Icon: rounded square outline with smile inside */}
      <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
        <rect x="7" y="7" width="86" height="86" rx="24" stroke="#1B6B74" strokeWidth="8" fill="none" />
        {/* Smile / basket arc */}
        <path
          d="M28 60 Q50 80 72 60"
          stroke="#1B6B74"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {/* Text */}
      <div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "19px", fontWeight: 800, color: "#1B6B74", lineHeight: 1 }}>سلة</div>
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "14px", fontWeight: 700, color: "#1B6B74", letterSpacing: "0.02em" }}>salla</div>
      </div>
    </div>
  );
}

/* Zid — purple #8B2FC9, 3-loop asterisk flower + "zid" */
function ZidLogo() {
  const purple = "#8B2FC9";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Icon: 3 figure-8 loops at 0°/60°/120° */}
      <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
        {/* Horizontal infinity loop */}
        <path
          d="M50 50 C50 34 70 30 74 50 C78 70 58 66 50 50 C42 34 22 30 26 50 C30 70 50 66 50 50Z"
          stroke={purple} strokeWidth="5.5" fill="none" strokeLinecap="round"
        />
        {/* Rotated 60° */}
        <g transform="rotate(60, 50, 50)">
          <path
            d="M50 50 C50 34 70 30 74 50 C78 70 58 66 50 50 C42 34 22 30 26 50 C30 70 50 66 50 50Z"
            stroke={purple} strokeWidth="5.5" fill="none" strokeLinecap="round"
          />
        </g>
        {/* Rotated 120° */}
        <g transform="rotate(120, 50, 50)">
          <path
            d="M50 50 C50 34 70 30 74 50 C78 70 58 66 50 50 C42 34 22 30 26 50 C30 70 50 66 50 50Z"
            stroke={purple} strokeWidth="5.5" fill="none" strokeLinecap="round"
          />
        </g>
        {/* Center dot */}
        <circle cx="50" cy="50" r="5" fill={purple} />
      </svg>
      {/* Text */}
      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "26px", fontWeight: 800, color: purple, letterSpacing: "-0.02em" }}>
        zid
      </div>
    </div>
  );
}

/* Google — official multicolor wordmark via SimpleIcons CDN */
function GoogleLogo() {
  const [err, setErr] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {err ? (
        /* Fallback: manual multicolor G */
        <svg width="48" height="48" viewBox="0 0 100 100">
          <path d="M90 50H52v16h22c-2 8-8 14-16 17l12 12c12-11 19-27 19-45H90z" fill="#4285F4" />
          <path d="M14 50C14 34 30 22 50 28L60 18C46 10 28 12 16 22 4 32 0 48 6 62L20 52C16 52 14 51 14 50z" fill="#EA4335" />
          <path d="M50 86c12 0 22-4 30-11L68 63C64 66 57 68 50 68c-14 0-26-9-30-22L6 58C14 74 30 86 50 86z" fill="#34A853" />
          <path d="M14 50C14 43 16 37 20 32L6 20C0 28 0 38 6 48L20 52C16 52 14 51 14 50z" fill="#FBBC05" />
        </svg>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="https://cdn.simpleicons.org/google"
          alt="Google"
          width={40}
          height={40}
          onError={() => setErr(true)}
          style={{ display: "block" }}
        />
      )}
      {/* Multicolor "Google" wordmark */}
      <span style={{ fontFamily: "Space Mono, monospace", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em" }}>
        <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#EA4335" }}>o</span>
        <span style={{ color: "#FBBC05" }}>o</span>
        <span style={{ color: "#4285F4" }}>g</span>
        <span style={{ color: "#34A853" }}>l</span>
        <span style={{ color: "#EA4335" }}>e</span>
      </span>
    </div>
  );
}

/* Meta — official blue infinity + bold "Meta" */
function MetaLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Infinity / Meta symbol */}
      <svg width="54" height="28" viewBox="0 0 160 80" fill="none">
        <defs>
          <linearGradient id="metaGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0082FB" />
            <stop offset="100%" stopColor="#0064E0" />
          </linearGradient>
        </defs>
        {/* Left lobe */}
        <path
          d="M24 40 C24 20 40 8 56 20 C66 28 76 40 80 40 C76 40 66 52 56 60 C40 72 24 60 24 40Z"
          fill="url(#metaGrad)"
        />
        {/* Right lobe */}
        <path
          d="M136 40 C136 20 120 8 104 20 C94 28 84 40 80 40 C84 40 94 52 104 60 C120 72 136 60 136 40Z"
          fill="url(#metaGrad)"
        />
        {/* Center overlap gap */}
        <path d="M80 40 C77 36 75 32 75 28 C75 20 82 16 90 20 L80 40Z" fill="url(#metaGrad)" />
        <path d="M80 40 C83 44 85 48 85 52 C85 60 78 64 70 60 L80 40Z" fill="url(#metaGrad)" />
      </svg>
      <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "26px", fontWeight: 800, color: "#FAFAF7", letterSpacing: "-0.01em" }}>
        Meta
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Individual partner card
──────────────────────────────────────────────────────────── */
interface PartnerCardProps {
  logo: React.ReactNode;
  badgeAr: string;
  badgeEn: string;
  accentColor: string;
  accentRGB: string;   /* "r,g,b" */
  features: { ar: string; en: string }[];
  isRTL: boolean;
}

function PartnerCard({ logo, badgeAr, badgeEn, accentColor, accentRGB, features, isRTL }: PartnerCardProps) {
  const [hovered, setHovered] = useState(false);

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
      {/* Logo area — white pill so real brand colors show correctly */}
      <div
        style={{
          background: "rgba(255,255,255,0.96)",
          borderRadius: "10px",
          padding: "14px 18px",
          display: "inline-flex",
          alignItems: "center",
          alignSelf: "flex-start",
        }}
      >
        {logo}
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

      {/* Feature list */}
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

  const partners = [
    {
      logo: <SallaLogo />,
      badgeAr: "شريك سلة الرسمي",
      badgeEn: "Official Salla Partner",
      accentColor: "#1B6B74",
      accentRGB: "27,107,116",
      features: [
        { ar: "تصميم متاجر سلة احترافية", en: "Professional Salla store design" },
        { ar: "تهيئة كاملة للجوال وسرعة التحميل", en: "Full mobile & speed optimization" },
        { ar: "ربط بوابات الدفع والشحن المحلي", en: "Local payment & shipping setup" },
        { ar: "تسليم خلال 5 أيام عمل مضمونة", en: "Delivery in 5 guaranteed business days" },
      ],
    },
    {
      logo: <ZidLogo />,
      badgeAr: "شريك زد الرسمي",
      badgeEn: "Official Zid Partner",
      accentColor: "#8B2FC9",
      accentRGB: "139,47,201",
      features: [
        { ar: "تصميم متاجر زد بهوية بصرية مميزة", en: "Zid stores with strong brand identity" },
        { ar: "نموذج Figma قبل أي تنفيذ", en: "Figma prototype before development" },
        { ar: "تحليل المنافسين مجاناً", en: "Free competitor analysis included" },
        { ar: "شهر دعم فني مجاني بعد التسليم", en: "1 month free post-launch support" },
      ],
    },
    {
      logo: <GoogleLogo />,
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
      logo: <MetaLogo />,
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
      {/* Top/bottom divider lines */}
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
              : "We are certified partners with Salla, Zid, and global ad platforms — giving you the best across every channel"}
          </p>
        </div>

        {/* Cards grid — 4 col → 2 → 1 */}
        <div
          className="pc-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}
        >
          {partners.map((p, i) => (
            <PartnerCard key={i} {...p} isRTL={isRTL} />
          ))}
        </div>

        {/* Bottom guarantees strip */}
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
