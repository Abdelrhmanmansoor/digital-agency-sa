"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

/* ── Mock data for platform preview ── */
const PLAYERS = [
  {
    initials: "AQ",
    name_ar: "أحمد القحطاني",
    name_en: "Ahmed Al-Qahtani",
    pos_ar: "مهاجم",
    pos_en: "Striker",
    rating: "4.9",
    offers: 4,
    age: 22,
    color: "#C8A962",
    verified: true,
  },
  {
    initials: "KM",
    name_ar: "خالد المالكي",
    name_en: "Khalid Al-Malki",
    pos_ar: "وسط ميدان",
    pos_en: "Midfielder",
    rating: "4.7",
    offers: 2,
    age: 24,
    color: "#22C55E",
    verified: true,
  },
  {
    initials: "SG",
    name_ar: "سلطان الغامدي",
    name_en: "Sultan Al-Ghamdi",
    pos_ar: "حارس مرمى",
    pos_en: "Goalkeeper",
    rating: "4.8",
    offers: 5,
    age: 26,
    color: "#3B82F6",
    verified: false,
  },
];

const PLATFORM_STATS = [
  { value: "500+", label_ar: "لاعب مسجّل",   label_en: "Players" },
  { value: "80+",  label_ar: "نادٍ شريك",     label_en: "Clubs" },
  { value: "1.2K", label_ar: "فرصة منشورة",   label_en: "Opportunities" },
  { value: "#1",   label_ar: "في المملكة",     label_en: "In KSA" },
];

const FILTERS_AR = ["الكل", "مهاجم", "وسط", "مدافع", "حارس", "جناح"];
const FILTERS_EN = ["All", "Striker", "Mid", "Defender", "GK", "Winger"];

/* ── Platform mockup UI ── */
function PlatformPreview({ isRTL }: { isRTL: boolean }) {
  const [activeFilter, setActiveFilter] = useState(0);
  const [notification, setNotification] = useState(true);
  const filters = isRTL ? FILTERS_AR : FILTERS_EN;

  useEffect(() => {
    const t = setTimeout(() => setNotification(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        background: "#0D0D0D",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
        position: "relative",
      }}
    >
      {/* Browser bar */}
      <div
        style={{
          background: "#161616",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28C840" }} />
        <div
          style={{
            flex: 1,
            height: "22px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "6px",
            marginLeft: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
          <span style={{ fontFamily: "Space Mono", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>
            tf1one.sa
          </span>
        </div>
      </div>

      {/* Platform top nav */}
      <div
        style={{
          background: "#111",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              background: "linear-gradient(135deg, #C8A962, #a07d3a)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          </div>
          <span style={{ fontFamily: "Space Mono", fontSize: "13px", fontWeight: 700, color: "#C8A962", letterSpacing: "0.05em" }}>
            TF1ONE
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: "20px" }}>
          {(isRTL ? ["اللاعبون", "الأندية", "فرص"] : ["Players", "Clubs", "Jobs"]).map((item, i) => (
            <span key={i} style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: i === 0 ? "#C8A962" : "rgba(255,255,255,0.4)", cursor: "pointer" }}>
              {item}
            </span>
          ))}
        </div>

        {/* Post a job badge */}
        <div
          style={{
            background: "rgba(200,169,98,0.15)",
            border: "1px solid rgba(200,169,98,0.3)",
            borderRadius: "20px",
            padding: "4px 12px",
            fontFamily: "'Zain', sans-serif",
            fontSize: "11px",
            color: "#C8A962",
          }}
        >
          {isRTL ? "+ نشر فرصة" : "+ Post Job"}
        </div>
      </div>

      {/* Search + filters */}
      <div style={{ padding: "16px 20px", background: "#0F0F0F", borderBottom: "1px solid rgba(255,255,255,0.04)", direction: isRTL ? "rtl" : "ltr" }}>
        {/* Search bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "8px",
            padding: "8px 14px",
            marginBottom: "12px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.25)" }}>
            {isRTL ? "ابحث عن لاعب، وكيل، أو نادٍ..." : "Search player, agent, or club..."}
          </span>
          <div style={{ marginRight: isRTL ? "auto" : "unset", marginLeft: !isRTL ? "auto" : "unset" }}>
            <span style={{ fontFamily: "Space Mono", fontSize: "9px", color: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", padding: "2px 6px" }}>⌘K</span>
          </div>
        </div>

        {/* Filter chips */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "nowrap", overflowX: "auto" }}>
          {filters.map((f, i) => (
            <button
              key={i}
              onClick={() => setActiveFilter(i)}
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "11px",
                padding: "4px 12px",
                borderRadius: "20px",
                border: activeFilter === i ? "1px solid rgba(200,169,98,0.6)" : "1px solid rgba(255,255,255,0.08)",
                background: activeFilter === i ? "rgba(200,169,98,0.12)" : "transparent",
                color: activeFilter === i ? "#C8A962" : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Player cards */}
      <div
        style={{
          padding: "16px 20px 20px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          background: "#0A0A0A",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        {PLAYERS.map((player) => (
          <div
            key={player.initials}
            style={{
              background: "#141414",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "10px",
              padding: "14px",
              transition: "border-color 0.2s",
            }}
          >
            {/* Avatar + verified */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: `${player.color}22`,
                  border: `2px solid ${player.color}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Space Mono",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: player.color,
                }}
              >
                {player.initials}
              </div>
              {player.verified && (
                <div style={{ background: "rgba(34,197,94,0.15)", borderRadius: "4px", padding: "2px 6px", display: "flex", alignItems: "center", gap: "3px" }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="#22C55E"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  <span style={{ fontFamily: "Space Mono", fontSize: "8px", color: "#22C55E" }}>PRO</span>
                </div>
              )}
            </div>

            {/* Name */}
            <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 700, color: "#FAFAF7", marginBottom: "4px", lineHeight: 1.2 }}>
              {isRTL ? player.name_ar : player.name_en}
            </div>

            {/* Position + age */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
              <span
                style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "10px",
                  padding: "2px 8px",
                  borderRadius: "20px",
                  background: `${player.color}18`,
                  color: player.color,
                  border: `1px solid ${player.color}30`,
                }}
              >
                {isRTL ? player.pos_ar : player.pos_en}
              </span>
              <span style={{ fontFamily: "Space Mono", fontSize: "9px", color: "rgba(255,255,255,0.25)" }}>
                {player.age}y
              </span>
            </div>

            {/* Rating + offers */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#FEBC2E"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span style={{ fontFamily: "Space Mono", fontSize: "10px", color: "#FEBC2E" }}>{player.rating}</span>
              </div>
              <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>
                {player.offers} {isRTL ? "عرض" : "offers"}
              </span>
            </div>

            {/* CTA */}
            <div
              style={{
                background: "rgba(200,169,98,0.08)",
                border: "1px solid rgba(200,169,98,0.2)",
                borderRadius: "6px",
                padding: "6px",
                textAlign: "center",
                fontFamily: "'Zain', sans-serif",
                fontSize: "11px",
                color: "rgba(200,169,98,0.8)",
                cursor: "pointer",
              }}
            >
              {isRTL ? "عرض الملف" : "View Profile"}
            </div>
          </div>
        ))}
      </div>

      {/* Floating notification */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: isRTL ? "unset" : "12px",
          right: isRTL ? "12px" : "unset",
          background: "#1a1a1a",
          border: "1px solid rgba(34,197,94,0.3)",
          borderRadius: "10px",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
          opacity: notification ? 1 : 0,
          transform: notification ? "translateY(0)" : "translateY(-10px)",
          transition: "all 0.4s ease",
          zIndex: 20,
          minWidth: "200px",
        }}
      >
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#22C55E"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </div>
        <div>
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "#FAFAF7", lineHeight: 1.3 }}>
            {isRTL ? "عرض جديد من نادي النصر" : "New offer from Al-Nassr FC"}
          </div>
          <div style={{ fontFamily: "Space Mono", fontSize: "9px", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>
            {isRTL ? "الآن" : "Just now"}
          </div>
        </div>
      </div>

      {/* Live badge */}
      <div
        style={{
          position: "absolute",
          top: "56px",
          right: isRTL ? "unset" : "20px",
          left: isRTL ? "20px" : "unset",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(34,197,94,0.1)",
          border: "1px solid rgba(34,197,94,0.25)",
          borderRadius: "20px",
          padding: "4px 10px",
        }}
      >
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22C55E", animation: "pulse 2s infinite" }} />
        <span style={{ fontFamily: "Space Mono", fontSize: "9px", color: "#22C55E", letterSpacing: "0.05em" }}>LIVE</span>
      </div>
    </div>
  );
}

/* ── Main section ── */
export default function FeaturedPartner() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const label =
    locale === "ar" ? "مشروعنا الأبرز" :
    locale === "en" ? "Our Flagship Project" :
    "Notre Projet Phare";

  const headline_ar = "أول منصة توظيف رياضي ووكالة لاعبين في المملكة";
  const headline_en = "Saudi Arabia's First Sports Employment & Player Agency Platform";

  const sub_ar = "لم نكتفِ بتطوير المنصة — نحن من أسّسها من الصفر وأدرناها حتى اليوم. TF1ONE هي أول منصة رقمية في المملكة تربط اللاعبين بالأندية عبر نظام وكالة احترافي متكامل.";
  const sub_en = "We didn't just build it — we conceptualized and launched TF1ONE from scratch. Saudi Arabia's first platform connecting players with clubs through a fully integrated professional agency system.";

  return (
    <section
      style={{
        background: "#050505",
        padding: "140px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background glows */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,169,98,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Faint field lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(200,169,98,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,98,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">

        {/* ── Top label row ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "64px", direction: isRTL ? "rtl" : "ltr" }}>
          <span
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "72px",
              fontWeight: 800,
              color: "rgba(200,169,98,0.08)",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            01
          </span>
          <div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(200,169,98,0.7)",
                marginBottom: "6px",
              }}
            >
              {label}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "2px", background: "#C8A962" }} />
              <span style={{ fontFamily: "Space Mono", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
                TF1ONE.SA
              </span>
            </div>
          </div>
        </div>

        {/* ── Main two-column layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "80px",
            alignItems: "center",
            direction: isRTL ? "rtl" : "ltr",
          }}
          className="fp-grid"
        >
          {/* Left: Copy */}
          <div>
            {/* Pioneer badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: "4px",
                padding: "6px 14px",
                marginBottom: "28px",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#22C55E"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#22C55E" }}>
                {isRTL ? "الأول في المملكة" : "First in Saudi Arabia"}
              </span>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 50px)",
                fontWeight: 800,
                color: "#FAFAF7",
                lineHeight: 1.15,
                marginBottom: "24px",
              }}
            >
              {isRTL ? headline_ar : headline_en}
            </h2>

            {/* Gold line */}
            <div style={{ width: "48px", height: "3px", background: "linear-gradient(to right, #C8A962, #a07d3a)", marginBottom: "24px" }} />

            {/* Sub */}
            <p
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "16px",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.9,
                marginBottom: "40px",
              }}
            >
              {isRTL ? sub_ar : sub_en}
            </p>

            {/* What we did — timeline */}
            <div style={{ borderRight: isRTL ? "2px solid rgba(200,169,98,0.15)" : "none", borderLeft: !isRTL ? "2px solid rgba(200,169,98,0.15)" : "none", paddingRight: isRTL ? "24px" : 0, paddingLeft: !isRTL ? "24px" : 0, marginBottom: "40px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                {
                  icon: "💡",
                  title_ar: "التأسيس والرؤية",
                  title_en: "Vision & Founding",
                  text_ar: "أسّسنا الفكرة وبنينا نموذج العمل من الصفر",
                  text_en: "Conceptualized the idea and built the business model from scratch",
                },
                {
                  icon: "⚙️",
                  title_ar: "التطوير التقني الكامل",
                  title_en: "Full Technical Build",
                  text_ar: "منصة ويب كاملة + تطبيق + لوحة تحكم للوكلاء والأندية",
                  text_en: "Full web platform + app + control panel for agents & clubs",
                },
                {
                  icon: "📈",
                  title_ar: "الإدارة والنمو",
                  title_en: "Management & Growth",
                  text_ar: "ندير المنصة حتى اليوم ونشرف على استراتيجية النمو",
                  text_en: "We manage the platform today and oversee the growth strategy",
                },
              ].map((item) => (
                <div key={item.title_ar} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "18px", marginTop: "2px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8A962", marginBottom: "4px" }}>
                      {isRTL ? item.title_ar : item.title_en}
                    </div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                      {isRTL ? item.text_ar : item.text_en}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Platform stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "36px" }}>
              {PLATFORM_STATS.map((s) => (
                <div
                  key={s.value}
                  style={{
                    textAlign: "center",
                    padding: "14px 8px",
                    border: "1px solid rgba(200,169,98,0.1)",
                    background: "rgba(200,169,98,0.03)",
                  }}
                >
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "20px", fontWeight: 700, color: "#C8A962", lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>
                    {isRTL ? s.label_ar : s.label_en}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="https://www.tf1one.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #C8A962, #a07d3a)",
                  color: "#000",
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  padding: "12px 28px",
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <span>{isRTL ? "زيارة المنصة" : "Visit Platform"}</span>
                <span>↗</span>
              </a>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid rgba(200,169,98,0.2)",
                  color: "rgba(200,169,98,0.8)",
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "14px",
                  padding: "12px 24px",
                  borderRadius: "2px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                <span>{isRTL ? "مشاهدة العرض" : "Watch Demo"}</span>
              </div>
            </div>
          </div>

          {/* Right: Platform preview */}
          <div style={{ position: "relative" }}>
            {/* Glow behind mockup */}
            <div style={{ position: "absolute", inset: "-20px", background: "radial-gradient(ellipse, rgba(200,169,98,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <PlatformPreview isRTL={isRTL} />
            </div>

            {/* Floating badge — "بنينا ونديرها" */}
            <div
              style={{
                position: "absolute",
                bottom: "-24px",
                left: isRTL ? "unset" : "-24px",
                right: isRTL ? "-24px" : "unset",
                background: "#141414",
                border: "1px solid rgba(200,169,98,0.25)",
                borderRadius: "12px",
                padding: "14px 18px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
                zIndex: 10,
              }}
            >
              <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 700, color: "#FAFAF7", marginBottom: "2px" }}>
                {isRTL ? "بنيناها وندير كل شيء" : "Built & Fully Managed by Us"}
              </div>
              <div style={{ fontFamily: "Space Mono", fontSize: "9px", color: "rgba(200,169,98,0.6)", letterSpacing: "0.08em" }}>
                {isRTL ? "من الفكرة إلى التشغيل" : "From idea to operation"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1024px) {
          .fp-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
