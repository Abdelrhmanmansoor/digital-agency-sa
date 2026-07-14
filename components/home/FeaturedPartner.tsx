"use client";

import { useLocale } from "next-intl";

const PLATFORM_STATS = [
  { value: "500+", label_ar: "لاعب مسجّل",   label_en: "Players" },
  { value: "80+",  label_ar: "نادٍ شريك",     label_en: "Clubs" },
  { value: "1.2K", label_ar: "فرصة منشورة",   label_en: "Opportunities" },
  { value: "#1",   label_ar: "في المملكة",     label_en: "In KSA" },
];

/* ─────────────────────────────────────────────────────────
   وزارة التجارة — Ministry of Commerce
   Official dark-teal (#005E45) with Saudi palm+swords emblem
───────────────────────────────────────────────────────── */
function MinistryCommerceLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        background: "rgba(0,94,69,0.08)",
        border: "1px solid rgba(0,94,69,0.3)",
        borderRadius: "10px",
        padding: "14px 18px",
        flex: 1,
        minWidth: "200px",
      }}
    >
      {/* Saudi coat-of-arms SVG */}
      <svg width="52" height="52" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Teal rounded-square background */}
        <rect width="80" height="80" rx="8" fill="#005E45" />

        {/* Palm trunk */}
        <rect x="37" y="30" width="6" height="28" rx="2" fill="white" />

        {/* Palm fronds — 9 lines radiating from trunk top */}
        {([
          [40, 30, 12, 12],  // far right
          [40, 30, 20, 16],
          [40, 30, 26, 22],
          [40, 30, 29, 27],
          [40, 30, 40, 14],  // straight up
          [40, 30, 51, 27],
          [40, 30, 54, 22],
          [40, 30, 60, 16],
          [40, 30, 68, 12],  // far left
        ] as [number, number, number, number][]).map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        ))}

        {/* Crossed swords below trunk */}
        {/* Sword 1: left-handle → right-tip */}
        <line x1="16" y1="70" x2="60" y2="56" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        {/* Sword 2: right-handle → left-tip */}
        <line x1="64" y1="70" x2="20" y2="56" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        {/* Sword guards (small cross-bars) */}
        <line x1="22" y1="66" x2="28" y2="60" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="58" y1="66" x2="52" y2="60" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>

      {/* Text block */}
      <div>
        <div
          style={{
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
            fontSize: "16px",
            fontWeight: 800,
            color: "#005E45",
            lineHeight: 1.2,
          }}
        >
          وزارة التجارة
        </div>
        <div
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "8.5px",
            color: "#005E45",
            opacity: 0.65,
            letterSpacing: "0.06em",
            marginTop: "3px",
          }}
        >
          Ministry of Commerce
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            marginTop: "6px",
            background: "rgba(0,94,69,0.12)",
            borderRadius: "3px",
            padding: "2px 7px",
          }}
        >
          <svg width="7" height="7" viewBox="0 0 24 24" fill="#005E45">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          <span
            style={{
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              color: "#005E45",
            }}
          >
            معتمدة رسمياً
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   وزارة الموارد البشرية والتنمية الاجتماعية
   Official colorful pinwheel (orange + teal + green)
───────────────────────────────────────────────────────── */
function MinistryHRLogo() {
  // 6 petals at 60° intervals — cx=50,cy=50 center
  const petals = [
    { angle: -90,  color: "#2CB878" },  // top — bright green
    { angle: -30,  color: "#1CA8A4" },  // top-right — teal
    { angle:  30,  color: "#F7941D" },  // bottom-right — orange
    { angle:  90,  color: "#F9A825" },  // bottom — yellow-orange
    { angle: 150,  color: "#009F8D" },  // bottom-left — mid teal
    { angle: 210,  color: "#00A650" },  // top-left — green
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        background: "rgba(0,159,141,0.07)",
        border: "1px solid rgba(0,159,141,0.28)",
        borderRadius: "10px",
        padding: "14px 18px",
        flex: 1,
        minWidth: "200px",
      }}
    >
      {/* Pinwheel SVG */}
      <svg width="52" height="52" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {petals.map((p, i) => (
          <g key={i} transform={`rotate(${p.angle}, 50, 50)`}>
            {/* Each petal: ellipse centered above the origin */}
            <ellipse cx="50" cy="27" rx="13" ry="26" fill={p.color} />
          </g>
        ))}
        {/* White center circle */}
        <circle cx="50" cy="50" r="13" fill="white" />
      </svg>

      {/* Text block */}
      <div>
        <div
          style={{
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
            fontSize: "15px",
            fontWeight: 800,
            color: "#006B71",
            lineHeight: 1.25,
          }}
        >
          الموارد البشرية
        </div>
        <div
          style={{
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            color: "#006B71",
            lineHeight: 1.25,
          }}
        >
          والتنمية الاجتماعية
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            marginTop: "6px",
            background: "rgba(0,107,113,0.1)",
            borderRadius: "3px",
            padding: "2px 7px",
          }}
        >
          <svg width="7" height="7" viewBox="0 0 24 24" fill="#006B71">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          <span
            style={{
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              color: "#006B71",
            }}
          >
            معتمدة رسمياً
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TF1ONE Platform Mockup — visible, high-contrast UI
───────────────────────────────────────────────────────── */
function PlatformMockup() {
  const jobCards = [
    { role: "مدير فني", club: "نادي الهلال", city: "الرياض", type: "دوام كامل", accent: "#1B4FBE" },
    { role: "لياقة بدنية", club: "نادي النصر", city: "الرياض", type: "عقد موسمي", accent: "#F0B100" },
    { role: "مسوق رياضي", club: "أكاديمية الشباب", city: "جدة", type: "بدوام جزئي", accent: "#22C55E" },
  ];

  return (
    <div
      style={{
        background: "#111318",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 50px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05), 0 0 80px rgba(240,177,0,0.10)",
        position: "relative",
      }}
    >
      {/* Browser chrome — always LTR so dots stay left */}
      <div
        style={{
          background: "#1C1F28",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          direction: "ltr",  /* force LTR — dots must NEVER flip */
        }}
      >
        <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#FF5F57", flexShrink: 0 }} />
        <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#FEBC2E", flexShrink: 0 }} />
        <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#28C840", flexShrink: 0 }} />

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            height: "26px",
            background: "rgba(255,255,255,0.07)",
            borderRadius: "6px",
            marginLeft: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
          <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}>
            tf1one.com
          </span>
        </div>

        {/* Live badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "rgba(34,197,94,0.15)",
            border: "1px solid rgba(34,197,94,0.4)",
            borderRadius: "20px",
            padding: "3px 10px",
            flexShrink: 0,
          }}
        >
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22C55E", animation: "livePulse 2s infinite" }} />
          <span style={{ fontFamily: "Space Mono", fontSize: "8px", color: "#22C55E", letterSpacing: "0.06em" }}>LIVE</span>
        </div>
      </div>

      {/* Platform body */}
      <div style={{ background: "#14171F" }}>

        {/* Top nav */}
        <div
          style={{
            background: "#0E1018",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: "11px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            direction: "rtl",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                background: "linear-gradient(135deg, #F0B100, #8B6914)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontFamily: "Space Mono", fontSize: "8px", fontWeight: 700, color: "#000" }}>TF1</span>
            </div>
            <span style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px", fontWeight: 800, color: "#fff" }}>TF1ONE</span>
          </div>
          <div style={{ display: "flex", gap: "18px" }}>
            {["فرص العمل", "الأندية", "اللاعبون"].map((item) => (
              <span key={item} style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.55)", cursor: "pointer" }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Hero / banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #0E1018 0%, #141B2E 60%, #0E1018 100%)",
            padding: "22px 18px 18px",
            direction: "rtl",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative glow */}
          <div style={{ position: "absolute", top: "-30px", left: "20px", width: "120px", height: "120px", borderRadius: "50%", background: "radial-gradient(circle, rgba(240,177,0,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "8px", letterSpacing: "0.14em", color: "#F0B100", textTransform: "uppercase", marginBottom: "7px" }}>
            منصة التوظيف الرياضية #1 في السعودية
          </div>
          <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "19px", fontWeight: 800, color: "#FAFAF7", lineHeight: 1.3, marginBottom: "12px" }}>
            انضم إلى أقوى شبكة رياضية<br />
            <span style={{ color: "#F0B100" }}>في المملكة العربية السعودية</span>
          </div>

          {/* Search bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "8px", padding: "8px 12px", marginBottom: "12px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <span style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
              ابحث عن فرصة رياضية...
            </span>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "22px" }}>
            {[["500+", "لاعب"], ["80+", "نادي"], ["1,200+", "وظيفة"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "Space Mono", fontSize: "14px", fontWeight: 700, color: "#F0B100" }}>{num}</div>
                <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.45)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Job cards */}
        <div style={{ padding: "14px 18px 18px", direction: "rtl" }}>
          <div style={{ fontFamily: "Space Mono", fontSize: "8px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginBottom: "10px", textTransform: "uppercase" }}>
            أحدث الفرص المتاحة
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {jobCards.map((card) => (
              <div
                key={card.role}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "7px", background: card.accent, opacity: 0.9, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "13px", fontWeight: 700, color: "#FAFAF7" }}>{card.role}</div>
                    <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>{card.club} · {card.city}</div>
                  </div>
                </div>
                <span style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "10px", color: "#F0B100", background: "rgba(240,177,0,0.1)", border: "1px solid rgba(240,177,0,0.22)", borderRadius: "4px", padding: "3px 8px", whiteSpace: "nowrap" }}>
                  {card.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main Section
───────────────────────────────────────────────────────── */
export default function FeaturedPartner() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const label = locale === "ar" ? "مشروعنا الأبرز" : locale === "en" ? "Our Flagship Project" : "Notre Projet Phare";
  const headline_ar = "أول منصة توظيف رياضي ووكالة لاعبين في المملكة";
  const headline_en = "Saudi Arabia's First Sports Employment & Player Agency Platform";
  const sub_ar = "لم نكتفِ بتطوير المنصة — نحن من أسّسها من الصفر وأدرناها حتى اليوم. TF1ONE هي أول منصة رقمية في المملكة تربط اللاعبين بالأندية عبر نظام وكالة احترافي متكامل.";
  const sub_en = "We didn't just build it — we conceptualized and launched TF1ONE from scratch. Saudi Arabia's first platform connecting players with clubs through a fully integrated professional agency system.";
  const certLabel = isRTL ? "معتمدة رسمياً من الجهات الحكومية السعودية" : "Officially Certified by Saudi Government";

  return (
    <section style={{ background: "#050505", padding: "120px 0", position: "relative", overflow: "hidden" }}>

      {/* Ambient glows */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(240,177,0,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Grid texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(240,177,0,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(240,177,0,0.015) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">

        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "64px", direction: isRTL ? "rtl" : "ltr" }}>
          <span style={{ fontFamily: "Space Mono, monospace", fontSize: "72px", fontWeight: 800, color: "rgba(240,177,0,0.08)", lineHeight: 1, userSelect: "none" }}>01</span>
          <div>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(240,177,0,0.7)", marginBottom: "6px" }}>{label}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "2px", background: "#F0B100" }} />
              <span style={{ fontFamily: "Space Mono", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>TF1ONE.COM</span>
            </div>
          </div>
        </div>

        {/* Two-column: mockup LEFT, text RIGHT */}
        <div className="fp-grid" style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "80px", alignItems: "center" }}>

          {/* LEFT — Platform mockup */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: "-40px", background: "radial-gradient(ellipse, rgba(240,177,0,0.09) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <PlatformMockup />
            </div>
            {/* Floating badge */}
            <div style={{ position: "absolute", bottom: "-24px", right: "-20px", background: "#171A23", border: "1px solid rgba(240,177,0,0.3)", borderRadius: "12px", padding: "14px 18px", boxShadow: "0 8px 40px rgba(0,0,0,0.7)", zIndex: 10 }}>
              <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "13px", fontWeight: 700, color: "#FAFAF7", marginBottom: "2px" }}>
                {isRTL ? "بنيناها وندير كل شيء" : "Built & Fully Managed by Us"}
              </div>
              <div style={{ fontFamily: "Space Mono", fontSize: "9px", color: "rgba(240,177,0,0.6)", letterSpacing: "0.08em" }}>
                {isRTL ? "من الفكرة إلى التشغيل" : "From idea to operation"}
              </div>
            </div>
          </div>

          {/* RIGHT — Copy */}
          <div style={{ direction: isRTL ? "rtl" : "ltr" }}>

            {/* Pioneer badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "4px", padding: "6px 14px", marginBottom: "24px" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#22C55E"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#22C55E" }}>
                {isRTL ? "الأول في المملكة" : "First in Saudi Arabia"}
              </span>
            </div>

            {/* Headline */}
            <h2 style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "clamp(26px, 3.2vw, 48px)", fontWeight: 800, color: "#FAFAF7", lineHeight: 1.15, marginBottom: "20px", wordBreak: "break-word" }}>
              {isRTL ? headline_ar : headline_en}
            </h2>

            {/* Gold divider */}
            <div style={{ width: "48px", height: "3px", background: "linear-gradient(to right, #F0B100, #a07d3a)", marginBottom: "20px" }} />

            {/* Description */}
            <p style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: "32px", wordBreak: "break-word" }}>
              {isRTL ? sub_ar : sub_en}
            </p>

            {/* Timeline */}
            <div style={{ borderRight: isRTL ? "2px solid rgba(240,177,0,0.15)" : "none", borderLeft: !isRTL ? "2px solid rgba(240,177,0,0.15)" : "none", paddingRight: isRTL ? "24px" : 0, paddingLeft: !isRTL ? "24px" : 0, marginBottom: "32px", display: "flex", flexDirection: "column", gap: "18px" }}>
              {[
                { icon: "💡", title_ar: "التأسيس والرؤية", title_en: "Vision & Founding", text_ar: "أسّسنا الفكرة وبنينا نموذج العمل من الصفر", text_en: "Conceptualized the idea and built the business model from scratch" },
                { icon: "⚙️", title_ar: "التطوير التقني الكامل", title_en: "Full Technical Build", text_ar: "منصة ويب + تطبيق + لوحة تحكم للوكلاء والأندية", text_en: "Full web platform + app + control panel for agents & clubs" },
                { icon: "📈", title_ar: "الإدارة والنمو", title_en: "Management & Growth", text_ar: "ندير المنصة حتى اليوم ونشرف على استراتيجية النمو", text_en: "We manage the platform today and oversee the growth strategy" },
              ].map((item) => (
                <div key={item.title_ar} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "18px", marginTop: "2px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#F0B100", marginBottom: "4px" }}>
                      {isRTL ? item.title_ar : item.title_en}
                    </div>
                    <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                      {isRTL ? item.text_ar : item.text_en}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "32px" }}>
              {PLATFORM_STATS.map((s) => (
                <div key={s.value} style={{ textAlign: "center", padding: "14px 8px", border: "1px solid rgba(240,177,0,0.12)", background: "rgba(240,177,0,0.04)", borderRadius: "4px" }}>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "20px", fontWeight: 700, color: "#F0B100", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>{isRTL ? s.label_ar : s.label_en}</div>
                </div>
              ))}
            </div>

            {/* ── Government Certifications ── */}
            <div style={{ marginBottom: "30px" }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "12px", textAlign: isRTL ? "right" : "left" }}>
                {certLabel}
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <MinistryCommerceLogo />
                <MinistryHRLogo />
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="https://www.tf1one.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #F0B100, #a07d3a)", color: "#000", fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px", fontWeight: 700, padding: "12px 28px", borderRadius: "2px", textDecoration: "none", transition: "opacity 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <span>{isRTL ? "زيارة المنصة" : "Visit Platform"}</span>
                <span>↗</span>
              </a>
              <a
                href="https://wa.me/201007835547"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "transparent", color: "rgba(255,255,255,0.6)", fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px", fontWeight: 600, padding: "12px 24px", borderRadius: "2px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(240,177,0,0.4)"; e.currentTarget.style.color = "#F0B100"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              >
                {isRTL ? "ابدأ مشروعك معنا" : "Start Your Project"}
              </a>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .fp-grid { grid-template-columns: 1fr !important; gap: 52px !important; }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
