"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";

const GUARANTEES = [
  {
    icon: "↩",
    titleAr: "استرجاع كامل عند عدم الرضا",
    titleEn: "Full Refund if Not Satisfied",
    descAr: "إذا لم تكن راضياً عن النتيجة النهائية، نعيد لك المبلغ كاملاً — بدون أسئلة.",
    descEn: "If you're not satisfied with the final result, we refund you in full — no questions asked.",
  },
  {
    icon: "∞",
    titleAr: "تعديلات حتى الرضا التام",
    titleEn: "Revisions Until You're Happy",
    descAr: "نواصل التعديل والتحسين حتى تحصل على ما تريده بالضبط — بدون حد لعدد المراجعات.",
    descEn: "We keep refining until you get exactly what you envisioned — no revision limits.",
  },
  {
    icon: "◎",
    titleAr: "دعم مستمر بعد التسليم",
    titleEn: "Ongoing Support After Delivery",
    descAr: "لا نختفي بعد التسليم. نبقى معك لأي تعديل أو مشكلة تواجهها بعد إطلاق مشروعك.",
    descEn: "We don't disappear after delivery. We stay with you for any issue after your project launches.",
  },
];

export default function GoldGuarantee() {
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const ref    = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const whatsapp = getWhatsAppLink(
    isRTL
      ? "مرحباً! أريد الاستفادة من الضمان الذهبي وأبدأ مشروعي"
      : "Hello! I'd like to start a project with your gold guarantee."
  );

  return (
    <section
      ref={ref}
      id="guarantee"
      aria-label={isRTL ? "الضمان الذهبي — ضمان استرداد كامل" : "Gold Guarantee — full refund guarantee"}
      style={{ background: "#060606", padding: "88px 0 96px", position: "relative", overflow: "hidden" }}
    >
      {/* Gold radial glow */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "900px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(240,177,0,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Animated gold orbs */}
      <div aria-hidden style={{
        position: "absolute", top: "10%", left: "5%",
        width: "320px", height: "320px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(240,177,0,0.04) 0%, transparent 70%)",
        animation: "ggFloat1 8s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "10%", right: "5%",
        width: "240px", height: "240px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(240,177,0,0.04) 0%, transparent 70%)",
        animation: "ggFloat2 10s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      <div className="max-w-[1300px] mx-auto px-6 relative z-10" dir={isRTL ? "rtl" : "ltr"}>

        {/* ── Header ── */}
        <div style={{
          textAlign: "center", marginBottom: "60px",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "all 0.9s ease",
        }}>
          {/* Gold badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "rgba(240,177,0,0.08)", border: "1px solid rgba(240,177,0,0.3)",
            borderRadius: "100px", padding: "6px 20px", marginBottom: "22px",
          }}>
            <span style={{ fontSize: "14px", lineHeight: 1 }}>◆</span>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F0B100" }}>
              {isRTL ? "الضمان الذهبي" : "Gold Guarantee"}
            </span>
          </div>

          <h2 style={{
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
            fontSize: "clamp(28px, 4vw, 54px)",
            fontWeight: 800, color: "#FFFFFF",
            lineHeight: 1.1, marginBottom: "14px",
          }}>
            {isRTL
              ? <><span style={{ color: "#F0B100" }}>نشتغل بثقة</span> ونتحمّل النتيجة</>
              : <>We work with <span style={{ color: "#F0B100" }}>confidence</span> and own the result</>}
          </h2>

          <p style={{
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "17px",
            color: "rgba(255,255,255,0.4)", maxWidth: "520px",
            margin: "0 auto", lineHeight: 1.7,
          }}>
            {isRTL
              ? "ثقتنا في جودة عملنا تجعلنا نضمن رضاك الكامل — أو نعيد لك كل ريال"
              : "Our confidence in our quality means we guarantee your full satisfaction — or every penny back"}
          </p>
        </div>

        {/* ── Guarantee Cards ── */}
        <div className="gg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "48px" }}>
          {GUARANTEES.map((g, i) => {
            const isH = hovered === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isH
                    ? "linear-gradient(135deg, rgba(240,177,0,0.1) 0%, rgba(240,177,0,0.04) 100%)"
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isH ? "rgba(240,177,0,0.4)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "20px", padding: "36px 32px",
                  transition: "all 0.4s cubic-bezier(0.19,1,0.22,1)",
                  transform: isH ? "translateY(-6px)" : "none",
                  boxShadow: isH ? "0 24px 64px rgba(240,177,0,0.12)" : "none",
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${i * 0.12}s`,
                  cursor: "default",
                }}
              >
                {/* Icon */}
                <div style={{
                  width: "56px", height: "56px", borderRadius: "14px",
                  background: isH ? "rgba(240,177,0,0.15)" : "rgba(240,177,0,0.07)",
                  border: `1px solid ${isH ? "rgba(240,177,0,0.4)" : "rgba(240,177,0,0.15)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "24px", transition: "all 0.3s",
                  fontSize: "22px", color: "#F0B100", fontFamily: "Space Mono, monospace",
                }}>
                  {g.icon}
                </div>

                <h3 style={{
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "20px",
                  fontWeight: 700, color: "#FFFFFF",
                  marginBottom: "12px", lineHeight: 1.3,
                }}>
                  {isRTL ? g.titleAr : g.titleEn}
                </h3>

                <p style={{
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "14px",
                  color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0,
                }}>
                  {isRTL ? g.descAr : g.descEn}
                </p>

                {/* Bottom accent line */}
                <div style={{
                  marginTop: "24px", height: "2px", borderRadius: "2px",
                  background: isH
                    ? "linear-gradient(90deg, #F0B100, transparent)"
                    : "rgba(255,255,255,0.05)",
                  transition: "background 0.4s",
                }} />
              </div>
            );
          })}
        </div>

        {/* ── Seal + CTA ── */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "28px",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.9s ease 0.4s",
        }}>
          {/* Gold seal */}
          <div style={{
            position: "relative", width: "120px", height: "120px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* Rotating ring */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "#F0B100",
              borderRightColor: "rgba(240,177,0,0.3)",
              animation: "ggSpin 8s linear infinite",
            }} />
            <div style={{
              position: "absolute", inset: "8px", borderRadius: "50%",
              border: "1px solid rgba(240,177,0,0.15)",
            }} />
            {/* Inner content */}
            <div style={{
              position: "relative", textAlign: "center",
              background: "rgba(240,177,0,0.06)",
              borderRadius: "50%", width: "88px", height: "88px",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(240,177,0,0.2)",
            }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "20px", fontWeight: 700, color: "#F0B100", lineHeight: 1 }}>
                100%
              </div>
              <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "10px", color: "rgba(240,177,0,0.7)", marginTop: "2px" }}>
                {isRTL ? "ضمان" : "Guarantee"}
              </div>
            </div>
          </div>

          {/* Hook text */}
          <p style={{
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(255,255,255,0.55)", textAlign: "center",
            maxWidth: "480px", lineHeight: 1.6, margin: 0,
          }}>
            {isRTL
              ? "ابدأ مشروعك الآن بكل ثقة — ضمانك الذهبي يحميك في كل خطوة"
              : "Start your project with full confidence — your gold guarantee protects every step"}
          </p>

          {/* CTA */}
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button style={{
              padding: "16px 36px", borderRadius: "12px",
              background: "linear-gradient(135deg, #F0B100 0%, #e8c97a 50%, #F0B100 100%)",
              backgroundSize: "200% 100%",
              color: "#0A0A0A", fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              fontSize: "16px", fontWeight: 800, border: "none", cursor: "pointer",
              boxShadow: "0 0 32px rgba(240,177,0,0.3)",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 0 56px rgba(240,177,0,0.5)";
                e.currentTarget.style.backgroundPosition = "100% 0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 0 32px rgba(240,177,0,0.3)";
                e.currentTarget.style.backgroundPosition = "0% 0";
              }}
            >
              {isRTL ? "ابدأ مشروعك مع الضمان الذهبي ←" : "Start Your Project with the Gold Guarantee →"}
            </button>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes ggFloat1 {
          0%,100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.05); }
        }
        @keyframes ggFloat2 {
          0%,100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.08); }
        }
        @keyframes ggSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .gg-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  );
}
