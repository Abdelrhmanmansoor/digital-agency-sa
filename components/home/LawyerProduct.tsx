"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";

/* ── Scales of justice icon ── */
const ScalesIcon = ({ size = 20, color = "#C8A962" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20" />
    <path d="M3 9h18" />
    <path d="M6 9l-3 7h6l-3-7z" />
    <path d="M18 9l-3 7h6l-3-7z" />
    <path d="M3 22h18" />
  </svg>
);

/* ── Mini website mockup ── */
function LawSiteMockup() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "520px",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow:
          "0 0 0 1px rgba(200,169,98,0.15), 0 40px 100px rgba(0,0,0,0.75), 0 0 80px rgba(200,169,98,0.06)",
        background: "#0A0C10",
        fontFamily: "'Zain', sans-serif",
        userSelect: "none",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: "#16181C",
          padding: "11px 16px",
          display: "flex",
          alignItems: "center",
          gap: "7px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FF5F57", flexShrink: 0 }} />
        <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FFBD2E", flexShrink: 0 }} />
        <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#28CA41", flexShrink: 0 }} />
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            borderRadius: "6px",
            padding: "4px 12px",
            marginInlineStart: "10px",
            fontSize: "10px",
            color: "rgba(255,255,255,0.25)",
            fontFamily: "Space Mono, monospace",
            letterSpacing: "0.03em",
          }}
        >
          alqanoni-law.com
        </div>
        <div style={{ width: "28px", height: "20px", background: "rgba(200,169,98,0.08)", borderRadius: "4px", flexShrink: 0 }} />
      </div>

      {/* Site header */}
      <div
        style={{
          background: "linear-gradient(180deg, #0D0B07 0%, #0F0D09 100%)",
          padding: "13px 22px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          direction: "rtl",
          borderBottom: "2px solid #C8A962",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ScalesIcon size={18} color="#C8A962" />
          <div>
            <div style={{ color: "#C8A962", fontSize: "11px", fontWeight: 800, lineHeight: 1.2 }}>مكتب القانوني للمحاماة</div>
            <div style={{ color: "rgba(200,169,98,0.45)", fontSize: "7.5px", letterSpacing: "0.08em" }}>LAW FIRM & LEGAL CONSULTANCY</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "14px" }}>
          {["الرئيسية", "خدماتنا", "تواصل"].map((item) => (
            <span key={item} style={{ color: "rgba(255,255,255,0.38)", fontSize: "8.5px" }}>
              {item}
            </span>
          ))}
          <span
            style={{
              padding: "3px 10px",
              borderRadius: "100px",
              background: "rgba(200,169,98,0.15)",
              border: "1px solid rgba(200,169,98,0.3)",
              color: "#C8A962",
              fontSize: "8px",
              fontWeight: 700,
            }}
          >
            استشارة مجانية
          </span>
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #0C0A06 0%, #0E0C08 60%, #0A0C10 100%)",
          padding: "26px 22px 22px",
          direction: "rtl",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(200,169,98,0.07)",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "-30px",
            left: "-30px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,169,98,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(200,169,98,0.08)",
            border: "1px solid rgba(200,169,98,0.18)",
            borderRadius: "100px",
            padding: "3px 9px",
            marginBottom: "10px",
          }}
        >
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C8A962" }} />
          <span style={{ color: "#C8A962", fontSize: "7.5px", fontFamily: "Space Mono, monospace", letterSpacing: "0.12em" }}>
            LEGAL EXCELLENCE
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", alignItems: "center" }}>
          <div>
            <h3
              style={{
                color: "#FFFFFF",
                fontSize: "17px",
                fontWeight: 800,
                lineHeight: 1.3,
                marginBottom: "8px",
              }}
            >
              نحمي حقوقك بخبرة<br />
              <span style={{ color: "#C8A962" }}>واحترافية لا تُضاهى</span>
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.38)",
                fontSize: "9px",
                lineHeight: 1.7,
                marginBottom: "14px",
                maxWidth: "280px",
              }}
            >
              استشارات قانونية متخصصة في العقود والقضايا التجارية والعمالية وحقوق الملكية الفكرية
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <div
                style={{
                  padding: "6px 16px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, #B8963A, #C8A962, #DFC07A)",
                  fontSize: "9px",
                  fontWeight: 800,
                  color: "#0A0A0A",
                  boxShadow: "0 4px 16px rgba(200,169,98,0.25)",
                }}
              >
                احجز استشارة الآن
              </div>
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "9px",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                تعرف علينا
              </div>
            </div>
          </div>
          {/* Scales decoration */}
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "rgba(200,169,98,0.05)",
              border: "1px solid rgba(200,169,98,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ScalesIcon size={32} color="rgba(200,169,98,0.6)" />
          </div>
        </div>
      </div>

      {/* Services strip */}
      <div
        style={{
          background: "#080A0E",
          padding: "14px 22px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
          direction: "rtl",
          borderBottom: "1px solid rgba(200,169,98,0.06)",
        }}
      >
        {[
          {
            title: "قانون تجاري",
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A962" strokeWidth="1.5">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
            ),
          },
          {
            title: "عقود العمل",
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A962" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="15" y2="17" />
              </svg>
            ),
          },
          {
            title: "قضايا مدنية",
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A962" strokeWidth="1.5">
                <path d="M3 22V12l9-9 9 9v10H3z" />
                <rect x="9" y="14" width="6" height="8" />
              </svg>
            ),
          },
        ].map(({ icon, title }) => (
          <div
            key={title}
            style={{
              background: "rgba(200,169,98,0.03)",
              border: "1px solid rgba(200,169,98,0.08)",
              borderRadius: "8px",
              padding: "10px 8px",
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "5px" }}>{icon}</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "8px" }}>{title}</div>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div
        style={{
          background: "rgba(200,169,98,0.03)",
          padding: "12px 22px",
          display: "flex",
          justifyContent: "space-around",
          direction: "rtl",
        }}
      >
        {[
          ["500+", "قضية منجزة"],
          ["15+", "سنة خبرة"],
          ["98%", "نسبة النجاح"],
        ].map(([num, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div
              style={{
                color: "#C8A962",
                fontSize: "16px",
                fontFamily: "Space Mono, monospace",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {num}
            </div>
            <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "7.5px", marginTop: "2px" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Feature list ── */
const FEATURES = [
  { ar: "تصميم يعكس هيبة وهوية مكتبك القانوني", en: "Design reflecting your firm's prestige & identity" },
  { ar: "صفحة التخصصات والخدمات القانونية المفصّلة", en: "Detailed legal specializations & services page" },
  { ar: "نموذج حجز استشارة أولية مجانية", en: "Free initial consultation booking form" },
  { ar: "معرض القضايا والإنجازات الموثّقة", en: "Documented cases & achievements portfolio" },
  { ar: "نظام مواعيد ذكي مرتبط بالواتساب", en: "Smart appointment system linked to WhatsApp" },
  { ar: "محسّن لمحركات البحث — يظهر في Google", en: "SEO optimized — ranks on Google" },
  { ar: "آمن بشهادة SSL وسرعة تحميل فائقة", en: "SSL secured with blazing fast load speed" },
];

export default function LawyerProduct() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";
  const [hovered, setHovered] = useState(false);

  const whatsapp = getWhatsAppLink(
    isAr
      ? "مرحباً! أريد الاستفسار عن تصميم موقع احترافي لمكتب محاماة"
      : isFr
      ? "Bonjour! Je veux un site web pour mon cabinet d'avocats"
      : "Hello! I want a professional website for my law firm"
  );

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #060810 0%, #0A0A0A 40%, #06080E 100%)",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage:
            "linear-gradient(rgba(200,169,98,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,98,1) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          pointerEvents: "none",
        }}
      />

      {/* Top border line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(200,169,98,0.18) 40%, rgba(200,169,98,0.18) 60%, transparent 100%)",
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(200,169,98,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div
          dir={isAr ? "rtl" : "ltr"}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
          className="lawyer-product-grid"
        >
          {/* ── Text side ── */}
          <div>
            {/* Label */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(200,169,98,0.07)",
                border: "1px solid rgba(200,169,98,0.2)",
                borderRadius: "100px",
                padding: "6px 18px",
                marginBottom: "28px",
              }}
            >
              <ScalesIcon size={13} color="#C8A962" />
              <span
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  color: "#C8A962",
                  textTransform: "uppercase",
                }}
              >
                {isAr ? "حلول رقمية قانونية" : isFr ? "SOLUTIONS JURIDIQUES" : "LEGAL DIGITAL SOLUTIONS"}
              </span>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: isAr ? "'Zain', sans-serif" : "sans-serif",
                fontSize: "clamp(30px, 3.2vw, 54px)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#FFFFFF",
                marginBottom: "18px",
                letterSpacing: isAr ? "0" : "-0.03em",
              }}
            >
              {isAr ? (
                <>
                  موقع احترافي<br />
                  <span style={{ color: "#C8A962" }}>لمكتبك القانوني</span>
                </>
              ) : isFr ? (
                <>
                  Site Web Professionnel<br />
                  <span style={{ color: "#C8A962" }}>pour Votre Cabinet</span>
                </>
              ) : (
                <>
                  Professional Website<br />
                  <span style={{ color: "#C8A962" }}>for Your Law Firm</span>
                </>
              )}
            </h2>

            {/* Subheadline */}
            <p
              style={{
                color: "rgba(255,255,255,0.42)",
                fontSize: isAr ? "17px" : "15px",
                lineHeight: 1.8,
                marginBottom: "36px",
                fontFamily: isAr ? "'Zain', sans-serif" : "inherit",
                maxWidth: "500px",
              }}
            >
              {isAr
                ? "نبني مواقع قانونية متكاملة تعكس احترافية مكتبك وتبني الثقة مع موكليك — تصميم فاخر، محتوى قانوني متخصص، وظهور قوي في نتائج البحث السعودية والخليجية"
                : isFr
                ? "Nous créons des sites juridiques complets qui reflètent le professionnalisme de votre cabinet, renforcent la confiance de vos clients et améliorent votre visibilité en ligne"
                : "We build complete legal websites that reflect your firm's professionalism, build client trust, and dominate search results in Saudi Arabia & the Gulf"}
            </p>

            {/* Features */}
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "11px",
                marginBottom: "44px",
              }}
            >
              {FEATURES.map((f, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "rgba(255,255,255,0.68)",
                    fontSize: isAr ? "15.5px" : "14px",
                    fontFamily: isAr ? "'Zain', sans-serif" : "inherit",
                  }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: "rgba(200,169,98,0.08)",
                      border: "1px solid rgba(200,169,98,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C8A962" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                  {isAr ? f.ar : f.en}
                </li>
              ))}
            </ul>

            {/* Price + CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "28px",
                flexWrap: "wrap",
                padding: "24px 28px",
                background: "rgba(200,169,98,0.04)",
                border: "1px solid rgba(200,169,98,0.12)",
                borderRadius: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    fontSize: "10px",
                    marginBottom: "4px",
                    fontFamily: "Space Mono, monospace",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {isAr ? "يبدأ من" : "starting from"}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span
                    style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "42px",
                      fontWeight: 700,
                      color: "#C8A962",
                      lineHeight: 1,
                    }}
                  >
                    1,999
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      fontSize: "14px",
                      fontFamily: isAr ? "'Zain', sans-serif" : "inherit",
                    }}
                  >
                    {isAr ? "ريال" : "SAR"}
                  </span>
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontSize: "10px",
                    marginTop: "2px",
                    fontFamily: isAr ? "'Zain', sans-serif" : "Space Mono, monospace",
                  }}
                >
                  {isAr ? "✓ تسليم خلال 7 أيام  ·  ✓ مراجعتان مجانيتان" : "✓ 7-day delivery  ·  ✓ 2 free revisions"}
                </div>
              </div>

              <a href={whatsapp} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                    padding: "15px 36px",
                    borderRadius: "100px",
                    background: hovered
                      ? "linear-gradient(135deg, #B8963A, #C8A962, #E0C878)"
                      : "linear-gradient(135deg, #C8A962, #DFC07A)",
                    border: "none",
                    color: "#0A0A0A",
                    fontWeight: 800,
                    fontFamily: isAr ? "'Zain', sans-serif" : "Space Mono, monospace",
                    fontSize: isAr ? "17px" : "12px",
                    letterSpacing: isAr ? "0" : "0.04em",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.19,1,0.22,1)",
                    boxShadow: hovered
                      ? "0 12px 40px rgba(200,169,98,0.45)"
                      : "0 6px 24px rgba(200,169,98,0.25)",
                    transform: hovered ? "translateY(-2px)" : "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isAr ? "احجز استشارة مجانية" : isFr ? "Consultation Gratuite" : "Free Consultation"}
                </button>
              </a>
            </div>
          </div>

          {/* ── Mockup side ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Glow behind mockup */}
            <div
              style={{
                position: "absolute",
                width: "80%",
                height: "70%",
                background: "radial-gradient(ellipse, rgba(200,169,98,0.07) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />
            <LawSiteMockup />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .lawyer-product-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
          .lawyer-product-grid > div:last-child {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
