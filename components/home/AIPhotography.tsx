"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";

/* Images from /public/جلسة التصوير — encoded as URL */
const PHOTOS = [
  "/جلسة التصوير/Ultra-realistic_cinematic_close-up_202604030119.png",
  "/جلسة التصوير/Ultra-realistic_cinematic_product_202604032116.png",
  "/جلسة التصوير/Ultra-realistic_cinematic_portrait_202604032112.png",
  "/جلسة التصوير/Ultra_luxury_perfume_202604042033.png",
  "/جلسة التصوير/Ultra_luxury_perfume_202604042037.png",
  "/جلسة التصوير/Ultra-realistic_cinematic_extreme_202604032107.png",
  "/جلسة التصوير/Top-down_luxury_shot_202604030109.png",
  "/جلسة التصوير/Ultra_luxury_macro_202604042031.png",
];

export default function AIPhotography() {
  const locale  = useLocale();
  const isRTL   = locale === "ar";
  const ref     = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active,  setActive]  = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  /* Auto-cycle every 3s */
  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActive((p) => (p + 1) % PHOTOS.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);
    return () => clearInterval(timer);
  }, [visible]);

  const wa = getWhatsAppLink(
    isRTL
      ? "مرحباً! أريد الاستفسار عن خدمة تصوير المنتجات بالذكاء الاصطناعي"
      : "Hello! I'd like to inquire about AI product photography"
  );

  return (
    <section
      ref={ref}
      id="ai-photography"
      style={{
        background: "#080808", padding: "80px 0 88px",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Gold glow bg */}
      <div aria-hidden style={{
        position: "absolute", top: "20%", right: "-10%",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,169,98,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div
        className="max-w-[1400px] mx-auto px-6 relative z-10"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div
          className="ai-photo-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "72px",
            alignItems: "center",
          }}
        >
          {/* ── LEFT: Image showcase ── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : isRTL ? "translateX(40px)" : "translateX(-40px)",
              transition: "all 0.9s cubic-bezier(0.19,1,0.22,1)",
            }}
          >
            {/* Main image */}
            <div style={{
              position: "relative", borderRadius: "20px", overflow: "hidden",
              aspectRatio: "4/3",
              border: "1px solid rgba(200,169,98,0.2)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,169,98,0.1)",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={encodeURI(PHOTOS[active])}
                alt={isRTL ? "تصوير منتجات بالذكاء الاصطناعي" : "AI Product Photography"}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transition: "opacity 0.3s ease",
                  opacity: isAnimating ? 0 : 1,
                }}
              />
              {/* AI badge overlay */}
              <div style={{
                position: "absolute", bottom: "16px",
                right: isRTL ? "auto" : "16px",
                left: isRTL ? "16px" : "auto",
                background: "rgba(10,10,10,0.85)",
                border: "1px solid rgba(200,169,98,0.3)",
                borderRadius: "10px", padding: "8px 14px",
                backdropFilter: "blur(12px)",
                display: "flex", alignItems: "center", gap: "8px",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A962" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/><path d="M12 12v9"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 7.76l2.83-2.83"/>
                </svg>
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "#C8A962", letterSpacing: "0.08em" }}>
                  AI Generated
                </span>
              </div>
              {/* Dots navigation */}
              <div style={{
                position: "absolute", bottom: "16px", left: "50%",
                transform: "translateX(-50%)",
                display: "flex", gap: "6px",
              }}>
                {PHOTOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    style={{
                      width: i === active ? "20px" : "6px",
                      height: "6px", borderRadius: "3px",
                      background: i === active ? "#C8A962" : "rgba(255,255,255,0.25)",
                      border: "none", cursor: "pointer", padding: 0,
                      transition: "all 0.3s",
                    }}
                    aria-label={`Photo ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div style={{
              display: "flex", gap: "8px", marginTop: "12px",
              overflowX: "auto", paddingBottom: "4px",
            }}>
              {PHOTOS.slice(0, 6).map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    flexShrink: 0, width: "60px", height: "46px",
                    borderRadius: "8px", overflow: "hidden",
                    border: `2px solid ${i === active ? "#C8A962" : "transparent"}`,
                    cursor: "pointer", padding: 0, background: "none",
                    transition: "border-color 0.2s",
                    opacity: i === active ? 1 : 0.55,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={encodeURI(photo)}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Copy ── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : isRTL ? "translateX(-40px)" : "translateX(40px)",
              transition: "all 0.9s 0.15s cubic-bezier(0.19,1,0.22,1)",
            }}
          >
            {/* Label */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(200,169,98,0.1)", border: "1px solid rgba(200,169,98,0.25)",
              borderRadius: "100px", padding: "5px 16px", marginBottom: "24px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C8A962", animation: "aipPulse 2s infinite" }} />
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8A962" }}>
                {isRTL ? "جديد — AI Photography" : "New — AI Photography"}
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800, color: "#FFFFFF",
              lineHeight: 1.1, marginBottom: "18px",
            }}>
              {isRTL ? (
                <>صور منتجاتك<br /><span style={{ color: "#C8A962" }}>بجودة سينمائية</span><br />بدون استوديو</>
              ) : (
                <>Cinematic product<br /><span style={{ color: "#C8A962" }}>photography</span><br />— no studio needed</>
              )}
            </h2>

            <p style={{
              fontFamily: "'Zain', sans-serif", fontSize: "16px",
              color: "rgba(255,255,255,0.5)", lineHeight: 1.75,
              marginBottom: "32px", maxWidth: "440px",
            }}>
              {isRTL
                ? "نحوّل صور منتجاتك إلى تحف فنية سينمائية باستخدام الذكاء الاصطناعي — بدون استوديو وبنصف التكلفة. نتائج تجعل العميل يشتري فوراً."
                : "We transform your product images into cinematic masterpieces using AI — no studio, half the cost. Results that make customers buy instantly."}
            </p>

            {/* Before/After callout */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "12px", marginBottom: "32px",
            }}>
              <div style={{
                padding: "16px", borderRadius: "12px",
                background: "rgba(255,80,80,0.06)", border: "1px solid rgba(255,80,80,0.12)",
              }}>
                <div style={{ fontSize: "11px", fontFamily: "Space Mono, monospace", color: "rgba(255,120,120,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>
                  {isRTL ? "قبل" : "Before"}
                </div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,180,180,0.75)", lineHeight: 1.5 }}>
                  {isRTL ? "صور عادية، خلفية بيضاء، لا تجذب العميل" : "Plain shots, white bg, no customer appeal"}
                </div>
              </div>
              <div style={{
                padding: "16px", borderRadius: "12px",
                background: "rgba(200,169,98,0.08)", border: "1px solid rgba(200,169,98,0.2)",
              }}>
                <div style={{ fontSize: "11px", fontFamily: "Space Mono, monospace", color: "#C8A962", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>
                  {isRTL ? "بعد" : "After"}
                </div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                  {isRTL ? "جلسة فاخرة سينمائية تبيع نفسها تلقائياً" : "Luxury cinematic scene that sells itself"}
                </div>
              </div>
            </div>

            {/* Features */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "36px" }}>
              {(isRTL ? [
                "تصوير عطور، إكسسوارات، ملابس، طعام",
                "بدون معدات — كل ما نحتاجه صورتك فقط",
                "تسليم خلال 24 ساعة",
                "مناسبة لمتاجر سلة وزد وانستغرام",
              ] : [
                "Perfumes, accessories, clothing, food & more",
                "No equipment needed — just send us your photo",
                "Delivered within 24 hours",
                "Perfect for Salla, Zid & Instagram stores",
              ]).map((feat) => (
                <div key={feat} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
                    background: "rgba(200,169,98,0.12)", border: "1px solid rgba(200,169,98,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C8A962" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.65)" }}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <button style={{
                  padding: "15px 30px", borderRadius: "12px",
                  background: "#C8A962", color: "#0A0A0A",
                  fontFamily: "'Zain', sans-serif", fontSize: "15px",
                  fontWeight: 800, border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "8px",
                  boxShadow: "0 0 28px rgba(200,169,98,0.3)",
                  transition: "all 0.25s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(200,169,98,0.45)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 28px rgba(200,169,98,0.3)"; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  {isRTL ? "اطلب جلسة تصوير" : "Request Photo Session"}
                </button>
              </a>
              <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                fontSize: "13px", fontFamily: "'Zain', sans-serif",
                color: "rgba(255,255,255,0.35)",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {isRTL ? "تسليم خلال 24 ساعة" : "24-hour delivery"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes aipPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.75); }
        }
        @media (max-width: 900px) {
          .ai-photo-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
