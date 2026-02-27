"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";
import Link from "next/link";

const STATS = [
  { value: 250, suffix: "+", key: "projects" },
  { value: 86,  suffix: "+", key: "stores" },
  { value: 15,  suffix: "K+", key: "followers" },
  { value: 98,  suffix: "%",  key: "satisfaction" },
];

const CYCLING_WORDS = {
  ar: ["التأثير", "النجاح", "التميز", "الإبداع", "الهوية"],
  en: ["Impact",  "Success", "Excellence", "Growth",  "Identity"],
  fr: ["l'Impact", "le Succès", "l'Excellence", "la Croissance", "l'Identité"],
};

const CHART_BARS = [40, 65, 48, 80, 72, 90, 78, 95, 85, 100];

function CountUp({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = performance.now();
          const animate = (ct: number) => {
            const p = Math.min((ct - startTime) / duration, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [entered, setEntered] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  const words = CYCLING_WORDS[locale as keyof typeof CYCLING_WORDS] || CYCLING_WORDS.en;

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 180);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!entered) return;
    const cycle = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => { setWordIndex((p) => (p + 1) % words.length); setWordVisible(true); }, 360);
    }, 2800);
    return () => clearInterval(cycle);
  }, [entered, words.length]);

  const whatsappLink = getWhatsAppLink(
    isRTL
      ? "مرحباً! أريد البدء في مشروعي الرقمي مع وكالتكم. هل يمكننا التحدث؟"
      : "Hello! I'd like to start my digital project with your agency. Can we talk?"
  );

  return (
    <section
      aria-label="hero"
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Background: banner image ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {/* Desktop banner */}
        <img
          src="/hero-desktop.jpg"
          alt=""
          className="hero-bg-desktop"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            opacity: 0.35,
          }}
        />
        {/* Mobile banner */}
        <img
          src="/hero-mobile.jpg"
          alt=""
          className="hero-bg-mobile"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            opacity: 0.35,
          }}
        />
        {/* Elegant gradient overlay for premium look */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.95) 100%)",
          }}
        />
        {/* Gold/Lime accent gradient from sides */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(200,169,98,0.08) 0%, transparent 40%, transparent 60%, rgba(189,238,99,0.06) 100%)",
          }}
        />
        {/* Radial vignette for depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 100% 70% at 50% 20%, transparent 40%, rgba(10,10,10,0.7) 100%)",
          }}
        />
      </div>

      {/* ── Background: dot grid ── */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 40%, black 40%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Background: glowing orbs ── */}
      <div aria-hidden style={{ position:"absolute", top:"-10%", right:"5%", width:"700px", height:"700px", borderRadius:"50%", background:"radial-gradient(circle, rgba(189,238,99,0.06) 0%, transparent 65%)", pointerEvents:"none" }} />
      <div aria-hidden style={{ position:"absolute", bottom:"0", left:"-5%", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle, rgba(200,169,98,0.07) 0%, transparent 65%)", pointerEvents:"none" }} />

      {/* ── Background: horizontal accent line ── */}
      <div aria-hidden style={{ position:"absolute", top:"50%", left:0, right:0, height:"1px", background:"linear-gradient(to right, transparent, rgba(200,169,98,0.06) 30%, rgba(200,169,98,0.06) 70%, transparent)", pointerEvents:"none" }} />

      {/* ── MAIN CONTENT ── */}
      <div
        className="max-w-[1400px] mx-auto w-full"
        style={{ padding: "120px 32px 80px", position:"relative", zIndex:1 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* ── LEFT / TEXT ── */}
          <div
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            {/* Badges row */}
            <div style={{ display:"flex", gap:"8px", marginBottom:"28px", flexWrap:"wrap" }} dir="ltr">
              <span style={{ display:"inline-flex", alignItems:"center", gap:"7px", background:"rgba(200,169,98,0.1)", border:"1px solid rgba(200,169,98,0.3)", borderRadius:"100px", padding:"5px 14px", fontSize:"11px", fontFamily:"Space Mono, monospace", color:"#C8A962", letterSpacing:"0.12em", textTransform:"uppercase" }}>
                <span style={{ fontSize:"13px" }}>⚡</span>
                {locale === "ar" ? "توفير حتى 70%" : "Save Up To 70%"}
              </span>
              <span style={{ display:"inline-flex", alignItems:"center", gap:"7px", background:"rgba(189,238,99,0.07)", border:"1px solid rgba(189,238,99,0.2)", borderRadius:"100px", padding:"5px 14px", fontSize:"11px", fontFamily:"Space Mono, monospace", color:"#BDEE63", letterSpacing:"0.12em", textTransform:"uppercase" }}>
                <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#BDEE63", display:"inline-block", animation:"heroPulse 2s ease-in-out infinite" }} />
                {locale === "ar" ? "وكالة سعودية" : "KSA Agency"}
              </span>
            </div>

            {/* Main heading */}
            <h1
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "clamp(52px, 7vw, 100px)",
                fontWeight: 800,
                lineHeight: 1.0,
                color: "#FFFFFF",
                marginBottom: "28px",
                letterSpacing: isRTL ? "-0.01em" : "-0.03em",
              }}
            >
              {t("title1")}{" "}
              <span
                style={{
                  color: "var(--lime)",
                  display: "inline-block",
                  transition: "opacity 0.32s ease, transform 0.32s ease",
                  opacity: wordVisible ? 1 : 0,
                  transform: wordVisible ? "translateY(0)" : "translateY(-12px)",
                }}
              >
                {words[wordIndex]}
              </span>
              <br />
              <span
                style={{
                  color: "rgba(255,255,255,0.2)",
                  fontWeight: 300,
                  fontSize: "0.58em",
                  letterSpacing: isRTL ? "0" : "0.02em",
                  lineHeight: 1.3,
                  display: "block",
                  marginTop: "4px",
                }}
              >
                {t("title3")}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "17px",
                color: "rgba(255,255,255,0.42)",
                maxWidth: "500px",
                lineHeight: 1.8,
                marginBottom: "44px",
                opacity: entered ? 1 : 0,
                transition: "opacity 0.9s 0.2s ease",
              }}
            >
              {t("subtitle")}
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-3"
              style={{ marginBottom: "56px", opacity: entered ? 1 : 0, transition: "opacity 0.9s 0.35s ease" }}
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <button
                  className="btn-primary"
                  style={{ fontSize:"15px", padding:"16px 32px", borderRadius:"12px" }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>{t("cta_primary")}</span>
                </button>
              </a>
              <Link href={`/${locale}#portfolio`}>
                <button
                  className="btn-secondary"
                  style={{ fontSize:"15px", padding:"16px 32px", borderRadius:"12px" }}
                >
                  {t("cta_secondary")}
                </button>
              </Link>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                gap: "32px",
                flexWrap: "wrap",
                paddingTop: "28px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                opacity: entered ? 1 : 0,
                transition: "opacity 0.9s 0.5s ease",
              }}
            >
              {STATS.map((stat) => (
                <div key={stat.key}>
                  <div
                    style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "clamp(22px, 2.5vw, 32px)",
                      fontWeight: 700,
                      color: "#BDEE63",
                      lineHeight: 1,
                      marginBottom: "5px",
                    }}
                  >
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontFamily: "Space Mono, monospace",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.28)",
                    }}
                  >
                    {t(`stats.${stat.key}` as "stats.projects")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT / VISUAL DASHBOARD ── */}
          <div
            className="hero-right"
            style={{
              position: "relative",
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 1s 0.3s ease, transform 1s 0.3s ease",
            }}
          >
            {/* Main card — Results Dashboard */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "24px",
                padding: "28px",
                backdropFilter: "blur(12px)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Card header */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"24px" }}>
                <div>
                  <div style={{ fontFamily:"Space Mono, monospace", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:"4px" }}>
                    {isRTL ? "نتائج عملائنا" : "Client Results"}
                  </div>
                  <div style={{ fontFamily:"'Zain', sans-serif", fontSize:"18px", fontWeight:700, color:"#FAFAF7" }}>
                    {isRTL ? "أداء المتاجر المُدارة" : "Managed Stores Performance"}
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"6px", background:"rgba(189,238,99,0.1)", border:"1px solid rgba(189,238,99,0.2)", borderRadius:"8px", padding:"6px 12px" }}>
                  <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#BDEE63", animation:"heroPulse 2s infinite" }} />
                  <span style={{ fontFamily:"Space Mono, monospace", fontSize:"10px", color:"#BDEE63", letterSpacing:"0.1em" }}>LIVE</span>
                </div>
              </div>

              {/* Chart bars */}
              <div style={{ display:"flex", alignItems:"flex-end", gap:"6px", height:"80px", marginBottom:"20px" }}>
                {CHART_BARS.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      borderRadius: "4px 4px 0 0",
                      background: i === CHART_BARS.length - 1
                        ? "linear-gradient(to top, #BDEE63, #9DC832)"
                        : i >= CHART_BARS.length - 3
                        ? "rgba(189,238,99,0.4)"
                        : "rgba(255,255,255,0.08)",
                      transition: `height 1.2s ${0.5 + i * 0.06}s cubic-bezier(0.19,1,0.22,1)`,
                    }}
                  />
                ))}
              </div>

              {/* Key metrics row */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px" }}>
                {[
                  { label: isRTL ? "متوسط زيادة المبيعات" : "Avg Sales Increase", value: "+247%", color: "#BDEE63" },
                  { label: isRTL ? "رضا العملاء" : "Client Satisfaction", value: "98%", color: "#C8A962" },
                  { label: isRTL ? "وقت التسليم" : "Avg Delivery", value: isRTL ? "7 أيام" : "7 days", color: "#FAFAF7" },
                ].map((m) => (
                  <div
                    key={m.label}
                    style={{
                      background:"rgba(255,255,255,0.03)",
                      border:"1px solid rgba(255,255,255,0.06)",
                      borderRadius:"12px",
                      padding:"14px 12px",
                    }}
                  >
                    <div style={{ fontFamily:"Space Mono, monospace", fontSize:"18px", fontWeight:700, color:m.color, marginBottom:"4px", lineHeight:1 }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.3)", lineHeight:1.4 }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge — top */}
            <div
              style={{
                position:"absolute",
                top:"-18px",
                right: isRTL ? "auto" : "-18px",
                left: isRTL ? "-18px" : "auto",
                background:"#BDEE63",
                borderRadius:"14px",
                padding:"10px 16px",
                display:"flex",
                alignItems:"center",
                gap:"8px",
                boxShadow:"0 8px 32px rgba(189,238,99,0.3)",
                transform: entered ? "translateY(0) rotate(-2deg)" : "translateY(-20px)",
                transition: "all 0.8s 0.7s cubic-bezier(0.19,1,0.22,1)",
              }}
            >
              <span style={{ fontSize:"18px" }}>🚀</span>
              <div>
                <div style={{ fontFamily:"Space Mono, monospace", fontSize:"11px", fontWeight:700, color:"#0A0A0A", lineHeight:1 }}>
                  {isRTL ? "متجر سلة #1" : "Top Salla Agency"}
                </div>
                <div style={{ fontFamily:"Space Mono, monospace", fontSize:"9px", color:"rgba(10,10,10,0.5)", lineHeight:1, marginTop:"2px" }}>
                  {isRTL ? "في المملكة" : "in KSA"}
                </div>
              </div>
            </div>

            {/* Floating badge — bottom */}
            <div
              style={{
                position:"absolute",
                bottom:"24px",
                left: isRTL ? "auto" : "-28px",
                right: isRTL ? "-28px" : "auto",
                background:"rgba(10,10,10,0.9)",
                border:"1px solid rgba(200,169,98,0.4)",
                borderRadius:"14px",
                padding:"12px 16px",
                display:"flex",
                alignItems:"center",
                gap:"10px",
                backdropFilter:"blur(12px)",
                boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
                transform: entered ? "translateY(0) rotate(2deg)" : "translateY(20px)",
                transition: "all 0.8s 0.9s cubic-bezier(0.19,1,0.22,1)",
              }}
            >
              <div style={{ fontSize:"22px" }}>⭐</div>
              <div>
                <div style={{ fontFamily:"Space Mono, monospace", fontSize:"13px", fontWeight:700, color:"#C8A962", lineHeight:1 }}>
                  5.0 / 5.0
                </div>
                <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", marginTop:"2px" }}>
                  {isRTL ? "250+ تقييم" : "250+ Reviews"}
                </div>
              </div>
            </div>

            {/* Floating badge — middle left */}
            <div
              style={{
                position:"absolute",
                top:"45%",
                left: isRTL ? "auto" : "-36px",
                right: isRTL ? "-36px" : "auto",
                background:"rgba(10,10,10,0.88)",
                border:"1px solid rgba(189,238,99,0.3)",
                borderRadius:"12px",
                padding:"10px 14px",
                backdropFilter:"blur(12px)",
                transform: entered ? "translateY(-50%) rotate(-1deg)" : "translateY(-50%) translateX(-20px)",
                transition: "all 0.8s 1.1s cubic-bezier(0.19,1,0.22,1)",
                display:"flex",
                alignItems:"center",
                gap:"8px",
              }}
            >
              <span style={{ fontSize:"16px" }}>✓</span>
              <div style={{ fontFamily:"Space Mono, monospace", fontSize:"10px", color:"#BDEE63", letterSpacing:"0.08em", whiteSpace:"nowrap" }}>
                {isRTL ? "تسليم في 7 أيام" : "7-day delivery"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: entered ? 0.4 : 0, transition: "opacity 1s 1.4s", color:"rgba(255,255,255,0.5)" }}
      >
        <div style={{ fontSize:"9px", fontFamily:"Space Mono", letterSpacing:"0.4em", textTransform:"uppercase" }}>
          {t("scroll")}
        </div>
        <div className="animate-bounce-subtle">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L8 14M8 14L3 9M8 14L13 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes heroPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.75); }
        }
        .hero-bg-mobile { display: none !important; }
        .hero-bg-desktop { display: block !important; }
        @media (max-width: 768px) {
          .hero-bg-desktop { display: none !important; }
          .hero-bg-mobile { display: block !important; }
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-right { display: none !important; }
        }
      `}</style>
    </section>
  );
}
