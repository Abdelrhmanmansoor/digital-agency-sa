"use client";

import { useLocale } from "next-intl";

const PLATFORM_STATS = [
  { value: "500+", label_ar: "لاعب مسجّل",   label_en: "Players" },
  { value: "80+",  label_ar: "نادٍ شريك",     label_en: "Clubs" },
  { value: "1.2K", label_ar: "فرصة منشورة",   label_en: "Opportunities" },
  { value: "#1",   label_ar: "في المملكة",     label_en: "In KSA" },
];

/* ── Inline SVG: Ministry of Commerce Saudi Arabia ── */
function MinistryCommerceLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(0,130,60,0.07)",
        border: "1px solid rgba(0,130,60,0.25)",
        borderRadius: "8px",
        padding: "10px 14px",
      }}
    >
      {/* Emblem circle */}
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00823C, #005a28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
        </svg>
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Zain', sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            color: "#00823C",
            lineHeight: 1.2,
          }}
        >
          وزارة التجارة
        </div>
        <div
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "8px",
            color: "rgba(0,130,60,0.6)",
            letterSpacing: "0.05em",
          }}
        >
          معتمد رسمياً
        </div>
      </div>
    </div>
  );
}

/* ── Inline SVG: Ministry of Human Resources ── */
function MinistryHRLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(0,90,160,0.07)",
        border: "1px solid rgba(0,90,160,0.25)",
        borderRadius: "8px",
        padding: "10px 14px",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #005AA0, #003d70)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Zain', sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            color: "#005AA0",
            lineHeight: 1.2,
          }}
        >
          وزارة الموارد البشرية
        </div>
        <div
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "8px",
            color: "rgba(0,90,160,0.6)",
            letterSpacing: "0.05em",
          }}
        >
          معتمد رسمياً
        </div>
      </div>
    </div>
  );
}

/* ── Realistic TF1ONE UI Mockup ── */
function PlatformMockup() {
  const jobCards = [
    { role: "مدير فني", club: "نادي الهلال", city: "الرياض", type: "دوام كامل", color: "#1B4FBE" },
    { role: "لياقة بدنية", club: "نادي النصر", city: "الرياض", type: "عقد موسمي", color: "#FFCC00" },
    { role: "مسوق رياضي", club: "أكاديمية الشباب", city: "جدة", type: "بدوام جزئي", color: "#00A651" },
  ];

  return (
    <div
      style={{
        background: "#0D0D0D",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow:
          "0 50px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px rgba(200,169,98,0.08)",
        position: "relative",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: "#141414",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#28C840" }} />
        <div
          style={{
            flex: 1,
            height: "24px",
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
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
          <span
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "10px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.04em",
            }}
          >
            tf1one.com
          </span>
        </div>
        {/* Live badge in browser bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: "20px",
            padding: "3px 8px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#22C55E",
              animation: "livePulse 2s infinite",
            }}
          />
          <span style={{ fontFamily: "Space Mono", fontSize: "8px", color: "#22C55E", letterSpacing: "0.06em" }}>
            LIVE
          </span>
        </div>
      </div>

      {/* Platform UI Body */}
      <div style={{ background: "#0f1117", padding: "0" }}>

        {/* Nav bar */}
        <div
          style={{
            background: "#0A0A0F",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            direction: "rtl",
          }}
        >
          {/* Logo area */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                background: "linear-gradient(135deg, #C8A962, #8B6914)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontFamily: "Space Mono", fontSize: "9px", fontWeight: 700, color: "#000" }}>TF1</span>
            </div>
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 700, color: "#fff" }}>
              TF1ONE
            </span>
          </div>
          {/* Nav links */}
          <div style={{ display: "flex", gap: "16px" }}>
            {["فرص العمل", "الأندية", "اللاعبون", "عن المنصة"].map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.45)",
                  cursor: "pointer",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Hero section */}
        <div
          style={{
            background: "linear-gradient(135deg, #0A0A0F 0%, #0D1525 50%, #0A0A0F 100%)",
            padding: "24px 20px 18px",
            direction: "rtl",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circle */}
          <div
            style={{
              position: "absolute",
              top: "-40px",
              left: "-40px",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(200,169,98,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "8px",
              letterSpacing: "0.15em",
              color: "#C8A962",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            منصة التوظيف الرياضية #1
          </div>
          <div
            style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "18px",
              fontWeight: 800,
              color: "#FAFAF7",
              lineHeight: 1.3,
              marginBottom: "12px",
            }}
          >
            انضم إلى أقوى شبكة رياضية<br />
            <span style={{ color: "#C8A962" }}>في المملكة العربية السعودية</span>
          </div>
          {/* Search bar mockup */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              padding: "8px 12px",
              alignItems: "center",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.35)">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
              ابحث عن فرصة عمل رياضية...
            </span>
          </div>
          {/* Stats row */}
          <div style={{ display: "flex", gap: "20px", marginTop: "12px" }}>
            {[["500+", "لاعب"], ["80+", "نادي"], ["1.2K", "وظيفة"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Space Mono", fontSize: "13px", fontWeight: 700, color: "#C8A962" }}>{num}</div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.35)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Job cards */}
        <div style={{ padding: "14px 20px 18px", direction: "rtl" }}>
          <div style={{ fontFamily: "Space Mono", fontSize: "8px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: "10px" }}>
            أحدث الفرص الرياضية
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {jobCards.map((card) => (
              <div
                key={card.role}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "6px",
                      background: card.color,
                      opacity: 0.9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", fontWeight: 700, color: "#FAFAF7" }}>{card.role}</div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>{card.club} · {card.city}</div>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "'Zain', sans-serif",
                    fontSize: "9px",
                    color: "#C8A962",
                    background: "rgba(200,169,98,0.08)",
                    border: "1px solid rgba(200,169,98,0.2)",
                    borderRadius: "4px",
                    padding: "3px 8px",
                    whiteSpace: "nowrap",
                  }}
                >
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

  const sub_ar =
    "لم نكتفِ بتطوير المنصة — نحن من أسّسها من الصفر وأدرناها حتى اليوم. TF1ONE هي أول منصة رقمية في المملكة تربط اللاعبين بالأندية عبر نظام وكالة احترافي متكامل.";
  const sub_en =
    "We didn't just build it — we conceptualized and launched TF1ONE from scratch. Saudi Arabia's first platform connecting players with clubs through a fully integrated professional agency system.";

  const certifiedLabel = isRTL ? "معتمدة رسمياً من الجهات الحكومية" : "Officially Certified by Saudi Authorities";

  return (
    <section
      style={{
        background: "#050505",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glows */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,169,98,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(200,169,98,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,98,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">

        {/* ── Top label row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "64px",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
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
              <span
                style={{
                  fontFamily: "Space Mono",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.2)",
                  textTransform: "uppercase",
                }}
              >
                TF1ONE.COM
              </span>
            </div>
          </div>
        </div>

        {/* ── Two-column layout — mockup always LEFT, text always RIGHT ── */}
        <div
          className="fp-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          {/* LEFT: Platform mockup */}
          <div style={{ position: "relative" }}>
            {/* Glow behind mockup */}
            <div
              style={{
                position: "absolute",
                inset: "-40px",
                background: "radial-gradient(ellipse, rgba(200,169,98,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <PlatformMockup />
            </div>

            {/* Floating "Built by us" badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-24px",
                right: "-20px",
                background: "#141414",
                border: "1px solid rgba(200,169,98,0.3)",
                borderRadius: "12px",
                padding: "14px 18px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#FAFAF7",
                  marginBottom: "2px",
                }}
              >
                {isRTL ? "بنيناها وندير كل شيء" : "Built & Fully Managed by Us"}
              </div>
              <div
                style={{
                  fontFamily: "Space Mono",
                  fontSize: "9px",
                  color: "rgba(200,169,98,0.6)",
                  letterSpacing: "0.08em",
                }}
              >
                {isRTL ? "من الفكرة إلى التشغيل" : "From idea to operation"}
              </div>
            </div>
          </div>

          {/* RIGHT: Copy */}
          <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
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
                marginBottom: "24px",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#22C55E">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#22C55E",
                }}
              >
                {isRTL ? "الأول في المملكة" : "First in Saudi Arabia"}
              </span>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "clamp(26px, 3.2vw, 48px)",
                fontWeight: 800,
                color: "#FAFAF7",
                lineHeight: 1.15,
                marginBottom: "20px",
                wordBreak: "break-word",
              }}
            >
              {isRTL ? headline_ar : headline_en}
            </h2>

            {/* Gold line */}
            <div
              style={{
                width: "48px",
                height: "3px",
                background: "linear-gradient(to right, #C8A962, #a07d3a)",
                marginBottom: "20px",
              }}
            />

            {/* Sub */}
            <p
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "16px",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.9,
                marginBottom: "32px",
                wordBreak: "break-word",
              }}
            >
              {isRTL ? sub_ar : sub_en}
            </p>

            {/* Timeline */}
            <div
              style={{
                borderRight: isRTL ? "2px solid rgba(200,169,98,0.15)" : "none",
                borderLeft: !isRTL ? "2px solid rgba(200,169,98,0.15)" : "none",
                paddingRight: isRTL ? "24px" : 0,
                paddingLeft: !isRTL ? "24px" : 0,
                marginBottom: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
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
                    <div
                      style={{
                        fontFamily: "Space Mono, monospace",
                        fontSize: "10px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#C8A962",
                        marginBottom: "4px",
                      }}
                    >
                      {isRTL ? item.title_ar : item.title_en}
                    </div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                      {isRTL ? item.text_ar : item.text_en}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "12px",
                marginBottom: "32px",
              }}
            >
              {PLATFORM_STATS.map((s) => (
                <div
                  key={s.value}
                  style={{
                    textAlign: "center",
                    padding: "14px 8px",
                    border: "1px solid rgba(200,169,98,0.1)",
                    background: "rgba(200,169,98,0.03)",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#C8A962",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>
                    {isRTL ? s.label_ar : s.label_en}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Government Certifications ── */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "28px",
              }}
            >
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "8px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                  marginBottom: "12px",
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {certifiedLabel}
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
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
              <a
                href="https://wa.me/201007835547"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "transparent",
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  padding: "12px 24px",
                  borderRadius: "2px",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,169,98,0.4)";
                  e.currentTarget.style.color = "#C8A962";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                {isRTL ? "ابدأ مشروعك معنا" : "Start Your Project"}
              </a>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .fp-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
