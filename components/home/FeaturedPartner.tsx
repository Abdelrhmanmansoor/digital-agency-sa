"use client";

import { useLocale } from "next-intl";

const PLATFORM_STATS = [
  { value: "500+", label_ar: "لاعب مسجّل",   label_en: "Players" },
  { value: "80+",  label_ar: "نادٍ شريك",     label_en: "Clubs" },
  { value: "1.2K", label_ar: "فرصة منشورة",   label_en: "Opportunities" },
  { value: "#1",   label_ar: "في المملكة",     label_en: "In KSA" },
];

/* ── Browser mockup with real screenshot ── */
function PlatformScreenshot({ isRTL }: { isRTL: boolean }) {
  return (
    <div
      style={{
        background: "#0D0D0D",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow:
          "0 50px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px rgba(200,169,98,0.06)",
        position: "relative",
      }}
    >
      {/* Browser top bar */}
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
            tf1one.sa
          </span>
        </div>
      </div>

      {/* Actual platform screenshot */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/tf1one-preview.jpg"
        alt="TF1ONE — منصة التوظيف الرياضي"
        style={{ width: "100%", display: "block", maxHeight: "460px", objectFit: "cover", objectPosition: "top" }}
      />

      {/* Live badge */}
      <div
        style={{
          position: "absolute",
          top: "52px",
          right: isRTL ? "unset" : "16px",
          left: isRTL ? "16px" : "unset",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(34,197,94,0.35)",
          borderRadius: "20px",
          padding: "4px 12px",
        }}
      >
        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#22C55E",
            animation: "livePulse 2s infinite",
          }}
        />
        <span style={{ fontFamily: "Space Mono", fontSize: "9px", color: "#22C55E", letterSpacing: "0.06em" }}>
          LIVE
        </span>
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

  return (
    <section
      style={{
        background: "#050505",
        padding: "140px 0",
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
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,169,98,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
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
                TF1ONE.SA
              </span>
            </div>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div
          className="fp-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "80px",
            alignItems: "center",
            direction: isRTL ? "rtl" : "ltr",
          }}
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
            <div
              style={{
                width: "48px",
                height: "3px",
                background: "linear-gradient(to right, #C8A962, #a07d3a)",
                marginBottom: "24px",
              }}
            />

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

            {/* Timeline */}
            <div
              style={{
                borderRight: isRTL ? "2px solid rgba(200,169,98,0.15)" : "none",
                borderLeft: !isRTL ? "2px solid rgba(200,169,98,0.15)" : "none",
                paddingRight: isRTL ? "24px" : 0,
                paddingLeft: !isRTL ? "24px" : 0,
                marginBottom: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
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
                gap: "16px",
                marginBottom: "36px",
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

            {/* CTAs */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="https://www.tf1one.sa/"
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
            </div>
          </div>

          {/* Right: Real platform screenshot */}
          <div style={{ position: "relative" }}>
            {/* Glow behind mockup */}
            <div
              style={{
                position: "absolute",
                inset: "-30px",
                background: "radial-gradient(ellipse, rgba(200,169,98,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <PlatformScreenshot isRTL={isRTL} />
            </div>

            {/* Floating badge */}
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
