"use client";

import { useRef, useState, useEffect } from "react";
import { useLocale } from "next-intl";

const VALUES = [
  {
    titleAr: "الجودة أولاً",
    titleEn: "Quality First",
    titleFr: "La Qualité Avant Tout",
    descAr: "كل مشروع نُسلّمه يمر بمراجعة دقيقة للتفاصيل — لأننا نعرف أن تفاصيل الهوية تُحدث الفارق.",
    descEn: "Every project goes through meticulous detail review — because we know identity details make the difference.",
    descFr: "Chaque projet passe par une révision méticuleuse des détails — car les détails d'identité font toujours la différence.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    titleAr: "الابتكار المستمر",
    titleEn: "Continuous Innovation",
    titleFr: "Innovation Continue",
    descAr: "نتابع أحدث اتجاهات التصميم والتسويق لنُقدم لك حلولاً معاصرة تُفوق توقعاتك.",
    descEn: "We follow the latest design & marketing trends to deliver contemporary solutions that exceed expectations.",
    descFr: "Nous suivons les dernières tendances design & marketing pour livrer des solutions contemporaines qui dépassent les attentes.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    titleAr: "الشراكة الحقيقية",
    titleEn: "Real Partnership",
    titleFr: "Vrai Partenariat",
    descAr: "لسنا مجرد مزوّد خدمة — نحن شريك نجاحك على المدى البعيد ونستثمر في نموك.",
    descEn: "We're not just a service provider — we're your long-term success partner invested in your growth.",
    descFr: "Nous ne sommes pas un simple prestataire — nous sommes votre partenaire de succès à long terme, investis dans votre croissance.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    titleAr: "النتائج تتكلم",
    titleEn: "Results Speak",
    titleFr: "Les Résultats Parlent",
    descAr: "نقيس نجاحنا بنمو أعمالك — لا بعدد المشاريع التي سلّمناها بل بالأثر الذي تركناه.",
    descEn: "We measure success by your business growth — not by project count, but by the lasting impact we create.",
    descFr: "Nous mesurons notre succès par la croissance de votre activité — pas par le nombre de projets livrés, mais par l'impact durable créé.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
];

const STATS = [
  { numAr: "250+", numEn: "250+", labelAr: "مشروع منجز", labelEn: "Projects Done",  labelFr: "Projets Réalisés", accent: "#BDEE63" },
  { numAr: "86+",  numEn: "86+",  labelAr: "متجر مُطوَّر", labelEn: "Stores Built",  labelFr: "Boutiques Créées", accent: "#C8A962" },
  { numAr: "5",    numEn: "5",    labelAr: "سنوات خبرة",   labelEn: "Years Exp.",    labelFr: "Ans d'Expérience", accent: "#C8A962" },
  { numAr: "98%",  numEn: "98%",  labelAr: "رضا العملاء",  labelEn: "Satisfaction",  labelFr: "Satisfaction",     accent: "#BDEE63" },
];

export default function AboutAgency() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        background: "#0A0A0A",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orb */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          right: isRTL ? "auto" : "-8%",
          left: isRTL ? "-8%" : "auto",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(189,238,99,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "10%",
          left: isRTL ? "auto" : "-5%",
          right: isRTL ? "-5%" : "auto",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,169,98,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-8">

        {/* ── Top: Label + Heading + Description ── */}
        <div
          style={{
            maxWidth: "760px",
            marginBottom: "72px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(200,169,98,0.08)",
              border: "1px solid rgba(200,169,98,0.22)",
              borderRadius: "100px",
              padding: "6px 18px",
              fontSize: "11px",
              fontFamily: "Space Mono, monospace",
              letterSpacing: "0.2em",
              color: "#C8A962",
              textTransform: "uppercase",
              marginBottom: "28px",
            }}
          >
            {locale === "ar" ? "من نحن" : locale === "fr" ? "À Propos" : "About Us"}
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "clamp(34px, 5vw, 68px)",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.08,
              marginBottom: "24px",
              letterSpacing: isRTL ? "-0.01em" : "-0.03em",
            }}
          >
            {locale === "ar" ? (
              <>
                وكالة بُنيت على
                <br />
                <span style={{ color: "#BDEE63" }}>نجاح عملائها</span>
              </>
            ) : locale === "fr" ? (
              <>
                Une agence bâtie sur le
                <br />
                <span style={{ color: "#BDEE63" }}>succès de ses clients</span>
              </>
            ) : (
              <>
                An agency built on
                <br />
                <span style={{ color: "#BDEE63" }}>its clients&apos; success</span>
              </>
            )}
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.85,
              maxWidth: "640px",
            }}
          >
            {locale === "ar"
              ? "بدأنا بهدف واضح: تحويل متاجر سلة وزد إلى تجارب تسوّق استثنائية ترفع المبيعات وتُبهر العملاء. اليوم نخدم أكثر من 250 عميلاً في المملكة العربية السعودية، ونفخر بكل متجر بنيناه من الصفر وبكل هوية رسمناها من لا شيء."
              : locale === "fr"
              ? "Nous avons démarré avec un objectif clair : transformer les boutiques Salla et Zid en expériences d'achat exceptionnelles qui boostent les ventes. Aujourd'hui nous servons plus de 250 clients en Arabie Saoudite, fiers de chaque boutique construite et de chaque identité créée."
              : "We started with a clear goal: transform Salla and Zid stores into exceptional shopping experiences that boost sales and delight customers. Today we serve 250+ clients across Saudi Arabia, proud of every store built from scratch and every identity designed from nothing."}
          </p>
        </div>

        {/* ── Middle: Stats bar ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            marginBottom: "56px",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "20px",
            overflow: "hidden",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.9s 0.2s ease",
          }}
          className="about-stats"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "36px 28px",
                borderLeft: i > 0 && !isRTL ? "1px solid rgba(255,255,255,0.06)" : "none",
                borderRight: i > 0 && isRTL ? "1px solid rgba(255,255,255,0.06)" : "none",
                background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                transition: "background 0.25s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent"; }}
            >
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "clamp(26px, 2.8vw, 42px)",
                  fontWeight: 700,
                  color: stat.accent,
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {locale === "ar" ? stat.numAr : stat.numEn}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.32)",
                  fontFamily: "Space Mono, monospace",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {locale === "ar" ? stat.labelAr : locale === "fr" ? stat.labelFr : stat.labelEn}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom: Values grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s 0.38s ease, transform 0.9s 0.38s ease",
          }}
          className="about-values"
        >
          {VALUES.map((v, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "20px",
                padding: "32px 28px",
                transition: "border-color 0.25s ease, background 0.25s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,169,98,0.28)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: i < 2
                    ? "linear-gradient(to right, transparent, rgba(189,238,99,0.3), transparent)"
                    : "linear-gradient(to right, transparent, rgba(200,169,98,0.3), transparent)",
                }}
              />

              {/* Icon */}
              <div
                style={{
                  color: i < 2 ? "#BDEE63" : "#C8A962",
                  marginBottom: "16px",
                  opacity: 0.9,
                }}
              >
                {v.icon}
              </div>

              {/* Title */}
              <div
                style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#FAFAF7",
                  marginBottom: "10px",
                  lineHeight: 1.2,
                }}
              >
                {locale === "ar" ? v.titleAr : locale === "fr" ? v.titleFr : v.titleEn}
              </div>

              {/* Description */}
              <div
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.38)",
                  lineHeight: 1.8,
                }}
              >
                {locale === "ar" ? v.descAr : locale === "fr" ? v.descFr : v.descEn}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-stats { grid-template-columns: 1fr 1fr !important; }
          .about-values { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .about-stats { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
