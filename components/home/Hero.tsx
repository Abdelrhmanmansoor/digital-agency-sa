"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const STATS = [
  { value: 250, suffix: "+", key: "projects" },
  { value: 86, suffix: "+", key: "stores" },
  { value: 15, suffix: "K+", key: "followers" },
  { value: 98, suffix: "%", key: "satisfaction" },
];

const CYCLING_WORDS = {
  ar: ["التأثير", "النجاح", "التميز", "الإبداع", "الهوية"],
  en: ["Impact", "Success", "Excellence", "Growth", "Identity"],
  fr: ["l'Impact", "le Succès", "l'Excellence", "la Croissance", "l'Identité"],
};

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
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  const words = CYCLING_WORDS[locale as keyof typeof CYCLING_WORDS] || CYCLING_WORDS.en;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const cycle = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => { setWordIndex((p) => (p + 1) % words.length); setWordVisible(true); }, 380);
    }, 2800);
    return () => clearInterval(cycle);
  }, [isVisible, words.length]);

  const whatsappLink = getWhatsAppLink(
    isRTL
      ? "مرحباً! أريد البدء في مشروعي الرقمي. هل يمكننا التحدث؟"
      : "Hello! I want to start my digital project. Can we talk?"
  );

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "80px",
        background: "#0D0D0D",
        overflow: "hidden",
      }}
    >
      {/* ── Arch / dome decoration ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "440px",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          border: "1px solid rgba(189,238,99,0.12)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Arch inner glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-60px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "560px",
          height: "360px",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          border: "1px solid rgba(189,238,99,0.06)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Radial glow behind arch */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          background: "radial-gradient(ellipse at 50% 0%, rgba(189,238,99,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        }}
      />

      {/* ── Content ── */}
      <div
        className="relative z-10 max-w-[900px] mx-auto px-6"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s var(--ease-out-expo), transform 1s var(--ease-out-expo)",
        }}
      >
        {/* Limited offer badge */}
        <div
          className="inline-flex items-center gap-2 mb-4"
          style={{
            background: "rgba(200,169,98,0.1)",
            border: "1px solid rgba(200,169,98,0.35)",
            borderRadius: "100px",
            padding: "5px 14px",
            fontSize: "12px",
            fontFamily: "Space Mono, monospace",
            letterSpacing: "0.12em",
            color: "#C8A962",
            textTransform: "uppercase",
          }}
        >
          <span style={{ fontSize: "13px" }}>⚡</span>
          {locale === "ar" ? "عرض محدود — توفير حتى 70%" : locale === "fr" ? "Offre Limitée — Jusqu'à 70% d'économies" : "Limited Offer — Save Up To 70%"}
        </div>

        {/* Label badge */}
        <div
          className="flex justify-center mb-8"
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(189,238,99,0.1)",
              border: "1px solid rgba(189,238,99,0.2)",
              borderRadius: "100px",
              padding: "6px 16px",
              fontSize: "12px",
              fontFamily: "Space Mono, monospace",
              letterSpacing: "0.15em",
              color: "var(--lime)",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "6px", height: "6px",
                borderRadius: "50%",
                background: "var(--lime)",
                display: "inline-block",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            {locale === "ar" ? "وكالة رقمية سعودية" : locale === "fr" ? "Agence Digitale Saoudienne" : "Saudi Digital Agency"}
          </div>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontFamily: isRTL ? "'Zain', sans-serif" : "sans-serif",
            fontSize: "clamp(42px, 6.5vw, 88px)",
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#FFFFFF",
            marginBottom: "20px",
            letterSpacing: isRTL ? "0" : "-0.03em",
          }}
        >
          {t("title1")}{" "}
          <span
            style={{
              color: "var(--lime)",
              display: "inline-block",
              transition: "opacity 0.35s ease, transform 0.35s ease",
              opacity: wordVisible ? 1 : 0,
              transform: wordVisible ? "translateY(0)" : "translateY(-10px)",
            }}
          >
            {words[wordIndex]}
          </span>
          <br />
          <span style={{ color: "rgba(255,255,255,0.28)", fontWeight: 300, fontSize: "0.62em", letterSpacing: isRTL ? "0" : "0.02em" }}>
            {t("title3")}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.45)",
            maxWidth: "560px",
            lineHeight: 1.75,
            margin: "0 auto 48px",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.8s 0.3s var(--ease-out-expo)",
          }}
        >
          {t("subtitle")}
        </p>

        {/* CTA row */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
          style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.8s 0.5s var(--ease-out-expo)" }}
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary" style={{ fontSize: "15px", padding: "16px 36px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>{t("cta_primary")}</span>
            </button>
          </a>
          <Link href={`/${locale}#portfolio`}>
            <button className="btn-secondary" style={{ fontSize: "15px", padding: "16px 36px" }}>
              {t("cta_secondary")}
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap justify-center gap-0"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.8s 0.7s var(--ease-out-expo)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(10px)",
            overflow: "hidden",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.key}
              className="flex items-stretch"
              style={{ flex: "1 1 120px" }}
            >
              <div className="px-8 py-6 flex flex-col items-center w-full">
                <div className="counter-number" style={{ fontSize: "clamp(24px,3vw,40px)" }}>
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: "11px", fontFamily: "Space Mono, monospace", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: "6px" }}>
                  {t(`stats.${stat.key}` as "stats.projects")}
                </div>
              </div>
              {i < STATS.length - 1 && (
                <div style={{ width: "1px", background: "rgba(255,255,255,0.07)", margin: "12px 0" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 1s 1.2s", color: "rgba(255,255,255,0.25)" }}
      >
        <div style={{ fontSize: "10px", fontFamily: "Space Mono", letterSpacing: "0.3em", textTransform: "uppercase" }}>
          {t("scroll")}
        </div>
        <div className="animate-bounce-subtle">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L8 14M8 14L3 9M8 14L13 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.5; transform:scale(0.8); }
        }
      `}</style>
    </section>
  );
}
