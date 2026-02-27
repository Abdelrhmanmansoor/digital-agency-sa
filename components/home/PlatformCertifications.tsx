"use client";

import { useLocale } from "next-intl";

/* ─────────────────────────────────────────────────────────────
   Platform logos as inline SVG — no external images needed
──────────────────────────────────────────────────────────── */

function SallaLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 80 80" fill="none">
      {/* Salla brand: rounded orange square with house/store icon */}
      <rect width="80" height="80" rx="18" fill="#FF6B35" />
      {/* Simplified store/house mark */}
      <path d="M40 18L18 36h8v24h12V44h4v16h12V36h8L40 18z" fill="white" />
    </svg>
  );
}

function ZidLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 80 80" fill="none">
      {/* Zid brand: dark navy/indigo with Zid wordmark */}
      <rect width="80" height="80" rx="18" fill="#1A2980" />
      {/* "Z" letter simplified */}
      <path
        d="M22 24h36l-28 32h30"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function MetaLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="18" fill="#1877F2" />
      {/* Meta infinity-like mark (simplified) */}
      <path
        d="M16 42c0-8 5-16 12-16 4 0 7 3 12 9 5-6 8-9 12-9 7 0 12 8 12 16 0 7-4 12-9 12-4 0-7-3-10-8-3 5-6 8-10 8-5 0-9-5-9-12z"
        fill="white"
      />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="18" fill="#FAFAF7" />
      {/* Google G — four-color */}
      {/* Blue arc top */}
      <path d="M40 20c-11 0-20 9-20 20h20V20z" fill="#4285F4" />
      {/* Red arc right */}
      <path d="M60 40c0-11-9-20-20-20v20h20z" fill="#EA4335" />
      {/* Yellow arc bottom */}
      <path d="M40 60c11 0 20-9 20-20H40v20z" fill="#FBBC05" />
      {/* Green arc left */}
      <path d="M20 40c0 11 9 20 20 20V40H20z" fill="#34A853" />
      {/* White center circle */}
      <circle cx="40" cy="40" r="10" fill="white" />
      {/* Blue right tab */}
      <rect x="40" y="35" width="20" height="10" rx="2" fill="#4285F4" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Individual partner card
──────────────────────────────────────────────────────────── */
interface PartnerCardProps {
  logo: React.ReactNode;
  nameAr: string;
  nameEn: string;
  badgeAr: string;
  badgeEn: string;
  accentColor: string;
  features: { ar: string; en: string }[];
  isRTL: boolean;
}

function PartnerCard({ logo, nameAr, nameEn, badgeAr, badgeEn, accentColor, features, isRTL }: PartnerCardProps) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid rgba(255,255,255,0.08)`,
        borderTop: `3px solid ${accentColor}`,
        borderRadius: "12px",
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        transition: "border-color 0.2s, background 0.2s",
        direction: isRTL ? "rtl" : "ltr",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
        (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(255,255,255,0.14)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
        (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(255,255,255,0.08)`;
      }}
    >
      {/* Logo + badge row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
        {logo}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: `rgba(${accentColor === "#FF6B35" ? "255,107,53" : accentColor === "#1A2980" ? "26,41,128" : accentColor === "#1877F2" ? "24,119,242" : "66,133,244"},0.12)`,
            border: `1px solid ${accentColor}44`,
            borderRadius: "20px",
            padding: "4px 10px",
          }}
        >
          <svg width="8" height="8" viewBox="0 0 24 24" fill={accentColor}>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          <span style={{ fontFamily: "Space Mono, monospace", fontSize: "8px", color: accentColor, letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
            {isRTL ? badgeAr : badgeEn}
          </span>
        </div>
      </div>

      {/* Name */}
      <div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "18px", fontWeight: 800, color: "#FAFAF7", lineHeight: 1.2 }}>
          {isRTL ? nameAr : nameEn}
        </div>
      </div>

      {/* Features */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={accentColor} style={{ marginTop: "2px", flexShrink: 0 }}>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
              {isRTL ? f.ar : f.en}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Section
──────────────────────────────────────────────────────────── */
export default function PlatformCertifications() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const partners = [
    {
      logo: <SallaLogo />,
      nameAr: "شريك سلة المعتمد",
      nameEn: "Certified Salla Partner",
      badgeAr: "شريك رسمي",
      badgeEn: "Official Partner",
      accentColor: "#FF6B35",
      features: [
        { ar: "تصميم متاجر سلة احترافية", en: "Professional Salla store design" },
        { ar: "تهيئة كاملة للجوال وسرعة التحميل", en: "Full mobile optimization & speed" },
        { ar: "ربط الدفع والشحن المحلي", en: "Local payment & shipping setup" },
        { ar: "تسليم خلال 5 أيام عمل", en: "5 business day delivery" },
      ],
    },
    {
      logo: <ZidLogo />,
      nameAr: "شريك زد المعتمد",
      nameEn: "Certified Zid Partner",
      badgeAr: "شريك رسمي",
      badgeEn: "Official Partner",
      accentColor: "#5B6CF9",
      features: [
        { ar: "تصميم متاجر زد بهوية بصرية متميزة", en: "Zid stores with strong visual identity" },
        { ar: "نموذج Figma قبل التنفيذ", en: "Figma prototype before development" },
        { ar: "تحليل المنافسين مجاناً", en: "Free competitor analysis" },
        { ar: "دعم فني لمدة شهر بعد التسليم", en: "1 month free post-launch support" },
      ],
    },
    {
      logo: <MetaLogo />,
      nameAr: "Meta Business Partner",
      nameEn: "Meta Business Partner",
      badgeAr: "معتمد",
      badgeEn: "Certified",
      accentColor: "#1877F2",
      features: [
        { ar: "إدارة حملات ميتا وإنستغرام", en: "Meta & Instagram ad management" },
        { ar: "إعداد Pixel ومتابعة التحويلات", en: "Pixel setup & conversion tracking" },
        { ar: "تصميم إعلانات بصرية احترافية", en: "Professional ad creative design" },
        { ar: "تقارير أداء أسبوعية تفصيلية", en: "Detailed weekly performance reports" },
      ],
    },
    {
      logo: <GoogleLogo />,
      nameAr: "Google Partner",
      nameEn: "Google Partner",
      badgeAr: "معتمد",
      badgeEn: "Certified",
      accentColor: "#34A853",
      features: [
        { ar: "إعلانات Google Ads بكفاءة عالية", en: "High-efficiency Google Ads campaigns" },
        { ar: "تحسين ظهور المتجر في البحث (SEO)", en: "Store SEO & search visibility" },
        { ar: "Google Shopping للمتاجر الإلكترونية", en: "Google Shopping for e-commerce" },
        { ar: "تتبع الأهداف وتقارير المبيعات", en: "Goal tracking & sales reports" },
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
      {/* Subtle gradient accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(200,169,98,0.4), transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(200,169,98,0.2), transparent)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">

        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "60px",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
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
            <span
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C8A962",
              }}
            >
              {isRTL ? "شراكات رسمية معتمدة" : "Official Certified Partnerships"}
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 800,
              color: "#FAFAF7",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            {isRTL
              ? "شركاء رسميون مع أبرز منصات التجارة الإلكترونية"
              : "Official Partners with Leading E-Commerce Platforms"}
          </h2>
          <p
            style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "17px",
              color: "rgba(255,255,255,0.45)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            {isRTL
              ? "نحن شركاء معتمدون مع سلة وزد ومنصات الإعلان العالمية — مما يعني أنك تحصل على الأفضل في كل منصة"
              : "We are certified partners with Salla, Zid, and global ad platforms — giving you the best across every channel"}
          </p>
        </div>

        {/* Cards grid */}
        <div
          className="pc-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {partners.map((p) => (
            <PartnerCard key={p.nameAr} {...p} isRTL={isRTL} />
          ))}
        </div>

        {/* Bottom strip — "48h turnaround" highlight inspired by U9Hands */}
        <div
          style={{
            marginTop: "48px",
            background: "rgba(200,169,98,0.04)",
            border: "1px solid rgba(200,169,98,0.14)",
            borderRadius: "12px",
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          {[
            { num: "48H",  labelAr: "أسرع تسليم في السوق",         labelEn: "Fastest delivery" },
            { num: "100%", labelAr: "رضا تام أو استرداد كامل",      labelEn: "Full refund if unsatisfied" },
            { num: "5★",   labelAr: "تقييم عملائنا الدائم",          labelEn: "Consistent 5-star rating" },
            { num: "2×",   labelAr: "مراجعات مجانية على كل مشروع",  labelEn: "Free revisions on every project" },
          ].map((item) => (
            <div key={item.num} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#C8A962",
                  lineHeight: 1,
                }}
              >
                {item.num}
              </span>
              <span
                style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.4,
                }}
              >
                {isRTL ? item.labelAr : item.labelEn}
              </span>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .pc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
