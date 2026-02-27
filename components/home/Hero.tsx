"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";
import Link from "next/link";

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
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
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

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
];

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  const words = CYCLING_WORDS[locale as keyof typeof CYCLING_WORDS] || CYCLING_WORDS.en;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Cycling word animation
  useEffect(() => {
    if (!isVisible) return;
    const cycle = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setWordVisible(true);
      }, 400);
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
      className="relative flex flex-col justify-end"
      style={{ height: "100vh", minHeight: "700px", overflow: "hidden" }}
    >
      {/* Background Slides */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: currentSlide === index ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
              style={{
                transform: currentSlide === index ? "scale(1.05)" : "scale(1)",
                transition: "transform 6s ease-in-out",
              }}
            />
          </div>
        ))}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.3) 100%)",
          }}
        />
      </div>

      {/* Subtle pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23C8A962' stroke-width='0.4'%3E%3Cpath d='M40 0 L80 20 L80 60 L40 80 L0 60 L0 20 Z'/%3E%3Cpath d='M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
          opacity: 0.04,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-[1400px] mx-auto px-8 pb-24 w-full"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.19, 1, 0.22, 1)",
        }}
      >
        {/* Small label */}
        <div className="section-label mb-8" style={{ color: "rgba(200,169,98,0.8)" }}>
          {locale === "ar" ? "وكالة رقمية سعودية" : locale === "fr" ? "Agence Digitale Saoudienne" : "Saudi Digital Agency"}
        </div>

        {/* Main Heading */}
        <h1
          className="mb-8"
          style={{
            fontFamily: isRTL ? "Noto Kufi Arabic, sans-serif" : "sans-serif",
            fontSize: "clamp(44px, 7.5vw, 96px)",
            fontWeight: 800,
            lineHeight: 1.03,
            color: "#FFFFFF",
            maxWidth: "950px",
          }}
        >
          {/* Line 1 */}
          <span
            style={{
              display: "block",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(20px)",
              transition: "all 0.8s 0.1s cubic-bezier(0.19, 1, 0.22, 1)",
            }}
          >
            {t("title1")}{" "}
            {/* Cycling word */}
            <span
              style={{
                color: "#C8A962",
                display: "inline-block",
                transition: "opacity 0.35s ease, transform 0.35s ease",
                opacity: wordVisible ? 1 : 0,
                transform: wordVisible ? "translateY(0)" : "translateY(-12px)",
                minWidth: isRTL ? "4ch" : "3ch",
              }}
            >
              {words[wordIndex]}
            </span>
          </span>
          {/* Line 2 */}
          <span
            style={{
              display: "block",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(20px)",
              transition: "all 0.8s 0.25s cubic-bezier(0.19, 1, 0.22, 1)",
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.6em",
              fontWeight: 400,
              letterSpacing: isRTL ? "0" : "0.04em",
              marginTop: "4px",
            }}
          >
            {t("title3")}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mb-12"
          style={{
            fontSize: "17px",
            color: "#8C8C7A",
            maxWidth: "520px",
            lineHeight: 1.75,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(20px)",
            transition: "all 0.8s 0.4s cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          {t("subtitle")}
        </p>

        {/* Stats */}
        <div
          className="flex flex-wrap gap-0 mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(20px)",
            transition: "all 0.8s 0.55s cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          {STATS.map((stat, index) => (
            <div key={stat.key} className="flex items-stretch">
              <div className="px-8 py-4" style={{ minWidth: "120px" }}>
                <div className="counter-number" style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontFamily: "Space Mono, monospace",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#8C8C7A",
                    marginTop: "4px",
                  }}
                >
                  {t(`stats.${stat.key}` as "stats.projects")}
                </div>
              </div>
              {index < STATS.length - 1 && (
                <div style={{ width: "1px", background: "rgba(200,169,98,0.3)", margin: "4px 0" }} />
              )}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap gap-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(20px)",
            transition: "all 0.8s 0.7s cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary">
              <span>{t("cta_primary")}</span>
              <span>{isRTL ? "←" : "→"}</span>
            </button>
          </a>
          <Link href={`/${locale}#portfolio`}>
            <button className="btn-secondary">{t("cta_secondary")}</button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "rgba(255,255,255,0.4)", opacity: isVisible ? 1 : 0, transition: "opacity 1s 1.2s" }}
      >
        <div style={{ fontSize: "11px", fontFamily: "Space Mono", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          {t("scroll")}
        </div>
        <div className="animate-bounce-subtle">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L8 14M8 14L3 9M8 14L13 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Slide indicators */}
      <div
        className="absolute bottom-8 right-8 flex gap-2"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 1s 1.2s" }}
      >
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: currentSlide === index ? "24px" : "6px",
              height: "2px",
              background: currentSlide === index ? "#C8A962" : "rgba(255,255,255,0.3)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
