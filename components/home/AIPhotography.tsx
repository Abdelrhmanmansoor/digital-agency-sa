"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";

/* ── Images from /public/جلسة التصوير ── */
const PHOTOS = [
  "/جلسة التصوير/Ultra-realistic_cinematic_close-up_202604030119.webp",
  "/جلسة التصوير/Ultra-realistic_cinematic_product_202604032116.webp",
  "/جلسة التصوير/Ultra-realistic_cinematic_portrait_202604032112.webp",
  "/جلسة التصوير/Ultra_luxury_perfume_202604042033.webp",
  "/جلسة التصوير/Ultra_luxury_perfume_202604042037.webp",
  "/جلسة التصوير/Ultra-realistic_cinematic_extreme_202604032107.webp",
  "/جلسة التصوير/Top-down_luxury_shot_202604030109.webp",
  "/جلسة التصوير/Ultra_luxury_macro_202604042031.webp",
];

/* ── SEO keyword clusters (rendered as hidden schema + visible tags) ── */
const KEYWORD_TAGS_AR = [
  "تصوير منتجات بالذكاء الاصطناعي",
  "تصوير منتجات احترافي",
  "تصوير منتجات سلة",
  "تصوير منتجات متجر إلكتروني",
  "تصوير منتجات انستقرام",
  "تصوير منتجات بدون مصور",
  "تصميم صور منتجات للبيع",
  "تصوير منتجات عطور",
  "تصوير منتجات تجميل",
  "تصوير منتجات أزياء",
  "تصوير منتجات قهوة",
];
const KEYWORD_TAGS_EN = [
  "AI product photography Saudi",
  "professional product photography",
  "Salla product photography",
  "e-commerce product photos",
  "Instagram product photography",
  "no-studio product shooting",
  "perfume product photography",
  "fashion AI photography",
];

export default function AIPhotography() {
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const ref    = useRef<HTMLElement>(null);
  const [visible,     setVisible]     = useState(false);
  const [active,      setActive]      = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredTag,  setHoveredTag]  = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  /* Auto-cycle photos */
  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => { setActive((p) => (p + 1) % PHOTOS.length); setIsAnimating(false); }, 300);
    }, 3200);
    return () => clearInterval(timer);
  }, [visible]);

  const wa = getWhatsAppLink(
    isRTL
      ? "مرحباً! أريد الاستفسار عن خدمة تصوير المنتجات بالذكاء الاصطناعي — جودة إعلانية بدون تكلفة استوديو"
      : "Hello! I'd like AI product photography — cinematic quality, no studio cost"
  );
  const tags = isRTL ? KEYWORD_TAGS_AR : KEYWORD_TAGS_EN;

  return (
    <section
      ref={ref}
      id="ai-photography"
      aria-label={isRTL ? "تصوير منتجات بالذكاء الاصطناعي" : "AI Product Photography"}
      style={{
        background: "#FFFFFF", padding: "88px 0 96px",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Gold glow */}
      <div aria-hidden style={{
        position: "absolute", top: "15%", right: isRTL ? "auto" : "-8%", left: isRTL ? "-8%" : "auto",
        width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(240,177,0,0.12) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10" dir={isRTL ? "rtl" : "ltr"}>

        {/* ── SEO H1 header (full width, above grid) ── */}
        <div
          style={{
            textAlign: "center", marginBottom: "56px",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "all 0.8s ease",
          }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(240,177,0,0.12)", border: "1px solid rgba(240,177,0,0.3)",
            borderRadius: "100px", padding: "5px 18px", marginBottom: "18px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F0B100", animation: "aipPulse 2s infinite" }} />
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F0B100" }}>
              {isRTL ? "خدمة جديدة — مدعومة بالذكاء الاصطناعي" : "New Service — AI Powered"}
            </span>
          </div>

          {/* H1 — SEO primary keyword */}
          <h1 style={{
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
            fontSize: "clamp(28px, 4.5vw, 58px)",
            fontWeight: 800, color: "#1A1A1A",
            lineHeight: 1.1, marginBottom: "16px",
          }}>
            {isRTL
              ? <>تصوير منتجات <span style={{ color: "#F0B100" }}>احترافي بالذكاء الاصطناعي</span> في السعودية</>
              : <>Professional <span style={{ color: "#F0B100" }}>AI Product Photography</span> in Saudi Arabia</>}
          </h1>

          {/* Hook */}
          <p style={{
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "clamp(15px, 2vw, 19px)",
            color: "rgba(26,26,26,0.65)", maxWidth: "600px", margin: "0 auto 28px",
            lineHeight: 1.75,
          }}>
            {isRTL
              ? "جودة إعلانية بدون تكلفة استوديو — نحوّل صورك العادية إلى تحف سينمائية تبيع نفسها"
              : "Ad-quality visuals without studio costs — we transform your plain photos into cinematic art that sells itself"}
          </p>

          {/* Keyword tag cloud — SEO + visual */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "8px",
            justifyContent: "center", maxWidth: "760px", margin: "0 auto",
          }}>
            {tags.map((tag, i) => (
              <span
                key={tag}
                onMouseEnter={() => setHoveredTag(i)}
                onMouseLeave={() => setHoveredTag(null)}
                style={{
                  display: "inline-block", padding: "5px 14px",
                  borderRadius: "100px", fontSize: "12px",
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                  background: hoveredTag === i ? "rgba(240,177,0,0.12)" : "#FFFFFF",
                  border: `1px solid ${hoveredTag === i ? "rgba(240,177,0,0.4)" : "rgba(0,0,0,0.08)"}`,
                  color: hoveredTag === i ? "#F0B100" : "#6B6B6B",
                  cursor: "default",
                  transition: "all 0.2s",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Main two-column content ── */}
        <div className="ai-photo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>

          {/* LEFT — Image showcase */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : isRTL ? "translateX(40px)" : "translateX(-40px)",
            transition: "all 0.9s cubic-bezier(0.19,1,0.22,1)",
          }}>
            {/* Main image */}
            <div style={{
              position: "relative", borderRadius: "20px", overflow: "hidden",
              aspectRatio: "4/3",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 26px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(240,177,0,0.08)",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={encodeURI(PHOTOS[active])}
                alt={isRTL ? "تصوير منتجات بالذكاء الاصطناعي — عطور وتجميل وأزياء" : "AI product photography — perfumes, beauty & fashion"}
                loading="lazy"
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transition: "opacity 0.3s ease",
                  opacity: isAnimating ? 0 : 1,
                }}
              />
              {/* AI badge */}
              <div style={{
                position: "absolute", top: "14px",
                left: isRTL ? "14px" : "auto", right: isRTL ? "auto" : "14px",
                background: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(240,177,0,0.3)",
                borderRadius: "10px", padding: "7px 13px",
                backdropFilter: "blur(12px)",
                display: "flex", alignItems: "center", gap: "7px",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#F0B100" style={{ flexShrink: 0 }}>
                  <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/>
                </svg>
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "#F0B100", letterSpacing: "0.1em" }}>
                  AI GENERATED
                </span>
              </div>
              {/* Dot nav */}
              <div style={{
                position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)",
                display: "flex", gap: "6px",
              }}>
                {PHOTOS.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)} style={{
                    width: i === active ? "20px" : "6px", height: "6px", borderRadius: "3px",
                    background: i === active ? "#F0B100" : "rgba(0,0,0,0.18)",
                    border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s",
                  }} aria-label={`Photo ${i + 1}`} />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: "8px", marginTop: "12px", overflowX: "auto", paddingBottom: "4px" }}>
              {PHOTOS.slice(0, 6).map((photo, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  flexShrink: 0, width: "62px", height: "48px", borderRadius: "8px",
                  overflow: "hidden", border: `2px solid ${i === active ? "#F0B100" : "transparent"}`,
                  cursor: "pointer", padding: 0, background: "none",
                  transition: "border-color 0.2s", opacity: i === active ? 1 : 0.5,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={encodeURI(photo)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Copy */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : isRTL ? "translateX(-40px)" : "translateX(40px)",
            transition: "all 0.9s 0.15s cubic-bezier(0.19,1,0.22,1)",
          }}>
            {/* Problem → Solution → Result */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
              {/* Problem */}
              <div style={{
                padding: "16px 18px", borderRadius: "14px",
                background: "rgba(255,60,60,0.06)", border: "1px solid rgba(255,60,60,0.12)",
              }}>
                <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(255,120,120,0.7)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "7px" }}>
                  {isRTL ? "المشكلة" : "Problem"}
                </div>
                <p style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px", color: "rgba(255,180,180,0.8)", lineHeight: 1.65, margin: 0 }}>
                  {isRTL
                    ? "التصوير التقليدي مكلف جداً — استوديو، مصور، إضاءة، تعديل — يكلف آلاف الريالات لكل جلسة"
                    : "Traditional photography is expensive — studio, photographer, lighting, editing — thousands per session"}
                </p>
              </div>
              {/* Solution */}
              <div style={{
                padding: "16px 18px", borderRadius: "14px",
                background: "rgba(240,177,0,0.07)", border: "1px solid rgba(240,177,0,0.18)",
              }}>
                <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "#F0B100", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "7px" }}>
                  {isRTL ? "الحل" : "Solution"}
                </div>
                <p style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.65, margin: 0 }}>
                  {isRTL
                    ? "تصوير منتجات بالذكاء الاصطناعي — أرسل لنا صورة منتجك وستحصل على جلسة سينمائية فاخرة خلال 24 ساعة"
                    : "AI product photography — send us your product photo and get a cinematic luxury shoot within 24 hours"}
                </p>
              </div>
              {/* Result */}
              <div style={{
                padding: "16px 18px", borderRadius: "14px",
                background: "rgba(240,177,0,0.06)", border: "1px solid rgba(240,177,0,0.15)",
                display: "flex", alignItems: "center", gap: "16px",
              }}>
                <div style={{ flexShrink: 0, textAlign: "center" }}>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "28px", fontWeight: 700, color: "#F0B100", lineHeight: 1 }}>+65%</div>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(240,177,0,0.5)", letterSpacing: "0.1em", marginTop: "3px" }}>ADD TO CART</div>
                </div>
                <p style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>
                  {isRTL
                    ? "زيادة متوسط معدل إضافة المنتج للسلة عند عملائنا بعد تحسين صور المنتجات"
                    : "Avg increase in add-to-cart rate after upgrading product images for our clients"}
                </p>
              </div>
            </div>

            {/* H2 — Categories */}
            <h2 style={{
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "18px",
              fontWeight: 700, color: "rgba(255,255,255,0.8)",
              marginBottom: "14px",
            }}>
              {isRTL ? "نصوّر جميع أنواع المنتجات" : "We shoot all product types"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "32px" }}>
              {(isRTL ? [
                { icon: "🧴", label: "عطور وتجميل" },
                { icon: "👗", label: "أزياء وملابس" },
                { icon: "☕", label: "قهوة ومشروبات" },
                { icon: "📱", label: "إلكترونيات" },
                { icon: "🍫", label: "أغذية ومنتجات" },
                { icon: "💍", label: "مجوهرات وإكسسوار" },
              ] : [
                { icon: "🧴", label: "Perfumes & Beauty" },
                { icon: "👗", label: "Fashion & Clothing" },
                { icon: "☕", label: "Coffee & Beverages" },
                { icon: "📱", label: "Electronics" },
                { icon: "🍫", label: "Food & Products" },
                { icon: "💍", label: "Jewelry & Accessories" },
              ]).map((cat) => (
                <div key={cat.label} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 14px", borderRadius: "10px",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                }}>
                  <span style={{ fontSize: "16px" }}>{cat.icon}</span>
                  <span style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>{cat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <button style={{
                  padding: "15px 30px", borderRadius: "12px",
                  background: "#F0B100", color: "#0A0A0A",
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px",
                  fontWeight: 800, border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "8px",
                  boxShadow: "0 0 28px rgba(240,177,0,0.3)",
                  transition: "all 0.25s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(240,177,0,0.5)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 28px rgba(240,177,0,0.3)"; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  {isRTL ? "اطلب جلسة تصوير" : "Request Photo Session"}
                </button>
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", fontFamily: "'ThmanyahSans', 'Zain', sans-serif", color: "rgba(255,255,255,0.35)" }}>
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
          .ai-photo-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
