"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";

const COMPETITORS = [
  { name: "Amazon.sa", price: 289, color: "#FF9900", isYou: false },
  { name: "Noon",      price: 312, color: "#FEEE00", isYou: false },
  { name: "سلة",       price: 274, color: "#7B8CDE", isYou: false },
  { name: "متجرك",     price: 249, color: "#BDEE63", isYou: true  },
];

const FEATURES = [
  {
    key: "compare",
    titleAr: "مقارنة أسعار حقيقية",
    titleEn: "Real Price Comparison",
    titleFr: "Comparaison de Prix Réels",
    descAr: "أسعار من 5+ منصات سعودية في نفس اللحظة — Amazon وNoon وسلة وزد وأكثر",
    descEn: "Prices from 5+ Saudi platforms simultaneously — Amazon, Noon, Salla, Zid, and more",
    descFr: "Prix de 5+ plateformes saoudiennes simultanément — Amazon, Noon, Salla, Zid et plus",
    color: "#C8A962" as const,
    svgPath: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
  {
    key: "profit",
    titleAr: "معادلة الربح الحقيقية",
    titleEn: "True Profit Formula",
    titleFr: "Vraie Formule de Profit",
    descAr: "هامشك بعد الشحن والإرجاع وضريبة القيمة المضافة — بريك إيفن ومكسب فعلي",
    descEn: "Your margin after shipping, returns & VAT — real breakeven and actual profit",
    descFr: "Votre marge après livraison, retours & TVA — seuil de rentabilité et profit réel",
    color: "#BDEE63" as const,
    svgPath: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  },
  {
    key: "ai",
    titleAr: "ذكاء اصطناعي سعودي",
    titleEn: "Saudi AI Intelligence",
    titleFr: "Intelligence IA Saoudienne",
    descAr: "تحليل مخصص يفهم ديناميكيات السوق السعودي ويتحدث بالعربية مباشرة",
    descEn: "Custom analysis understanding Saudi market dynamics, in Arabic",
    descFr: "Analyse personnalisée comprenant les dynamiques du marché saoudien, en arabe",
    color: "#C8A962" as const,
    svgPath: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  },
];

export default function RadarPromo() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [visible, setVisible] = useState(false);
  const [profit, setProfit] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let v = 0;
    const target = 34;
    const tick = () => {
      v += 1;
      setProfit(v);
      if (v < target) setTimeout(tick, 45);
    };
    const t = setTimeout(tick, 700);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <section
      ref={ref}
      id="radar"
      style={{
        background: "linear-gradient(180deg, #0D0D0D 0%, #0A0A0A 100%)",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold grid */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(200,169,98,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,98,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div aria-hidden style={{ position:"absolute", top:"-5%", right:"-5%", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle, rgba(189,238,99,0.05) 0%, transparent 65%)", pointerEvents:"none" }} />
      <div aria-hidden style={{ position:"absolute", bottom:"-10%", left:"-5%", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle, rgba(200,169,98,0.05) 0%, transparent 65%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"0 32px", position:"relative", zIndex:1 }}>

        {/* ── Header ── */}
        <div style={{ textAlign:"center", marginBottom:"72px" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            background:"rgba(189,238,99,0.07)", border:"1px solid rgba(189,238,99,0.2)",
            borderRadius:"100px", padding:"6px 18px", marginBottom:"24px",
          }}>
            <span style={{
              width:"6px", height:"6px", borderRadius:"50%",
              background:"#BDEE63", display:"inline-block",
              animation:"rp-pulse 2s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily:"Space Mono, monospace", fontSize:"11px",
              letterSpacing:"0.18em", color:"#BDEE63", textTransform:"uppercase",
            }}>
              {locale === "ar" ? "حصري — أداة رادار" : locale === "fr" ? "Exclusif — Outil Radar" : "Exclusive — Radar Tool"}
            </span>
          </div>

          <h2 style={{
            fontFamily:"'Zain', sans-serif",
            fontSize:"clamp(38px, 5.5vw, 72px)",
            fontWeight:800,
            color:"#FAFAF7",
            lineHeight:1.05,
            marginBottom:"20px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition:"opacity 0.8s ease, transform 0.8s ease",
          }}>
            {locale === "ar" ? (
              <>اعرف موقعك في السوق<br /><span style={{ color:"#C8A962" }}>قبل منافسيك</span></>
            ) : locale === "fr" ? (
              <>Connaissez Votre Position sur le Marché<br /><span style={{ color:"#C8A962" }}>Avant Vos Concurrents</span></>
            ) : (
              <>Know Your Market Position<br /><span style={{ color:"#C8A962" }}>Before Your Competitors</span></>
            )}
          </h2>

          <p style={{
            fontFamily:"'Zain', sans-serif",
            fontSize:"18px",
            color:"rgba(255,255,255,0.42)",
            maxWidth:"580px",
            margin:"0 auto",
            lineHeight:1.75,
            opacity: visible ? 1 : 0,
            transition:"opacity 0.8s 0.15s ease",
          }}>
            {locale === "ar"
              ? "رادار يجمع أسعار Amazon وNoon وسلة وزد في ثوانٍ، يحسب هامشك الحقيقي بعد الشحن والضريبة، ويعطيك تحليل AI بالعربي"
              : locale === "fr"
              ? "Radar agrège les prix d'Amazon, Noon, Salla & Zid en quelques secondes, calcule votre marge réelle après frais de livraison & TVA, et fournit une analyse IA"
              : "Radar aggregates prices from Amazon, Noon, Salla & Zid in seconds, calculates your real margin after shipping & VAT, and delivers AI analysis in Arabic"}
          </p>
        </div>

        {/* ── Two-column ── */}
        <div
          style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"64px", alignItems:"center" }}
          className="rp-grid"
          dir={isRTL ? "rtl" : "ltr"}
        >

          {/* ── Features + CTA ── */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : isRTL ? "translateX(30px)" : "translateX(-30px)",
            transition:"opacity 0.9s 0.2s ease, transform 0.9s 0.2s ease",
          }}>
            {FEATURES.map((feat, i) => (
              <div
                key={feat.key}
                style={{
                  display:"flex", gap:"18px", padding:"22px",
                  marginBottom:"14px",
                  background:"rgba(255,255,255,0.02)",
                  border:"1px solid rgba(255,255,255,0.05)",
                  borderRadius:"16px",
                  transition:"border-color 0.25s, background 0.25s, opacity 0.7s, transform 0.7s",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : isRTL ? "translateX(20px)" : "translateX(-20px)",
                  transitionDelay: visible ? `${0.3 + i * 0.12}s` : "0s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,169,98,0.22)";
                  e.currentTarget.style.background = "rgba(200,169,98,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <div style={{
                  width:"44px", height:"44px", borderRadius:"12px", flexShrink:0,
                  background: feat.color === "#C8A962" ? "rgba(200,169,98,0.1)" : "rgba(189,238,99,0.09)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke={feat.color} strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d={feat.svgPath} />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily:"'Zain', sans-serif", fontSize:"17px", fontWeight:700, color:"#FAFAF7", marginBottom:"4px" }}>
                    {locale === "ar" ? feat.titleAr : locale === "fr" ? feat.titleFr : feat.titleEn}
                  </div>
                  <div style={{ fontFamily:"'Zain', sans-serif", fontSize:"14px", color:"rgba(255,255,255,0.4)", lineHeight:1.55 }}>
                    {locale === "ar" ? feat.descAr : locale === "fr" ? feat.descFr : feat.descEn}
                  </div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div style={{ marginTop:"32px" }}>
              <Link href={`/${locale}/radar`}>
                <button
                  style={{
                    display:"inline-flex", alignItems:"center", gap:"10px",
                    background:"#BDEE63", color:"#0A0A0A",
                    border:"none", borderRadius:"12px",
                    padding:"16px 32px",
                    fontSize:"16px", fontWeight:700,
                    fontFamily:"'Zain', sans-serif",
                    cursor:"pointer", letterSpacing:"0.03em",
                    boxShadow:"0 4px 24px rgba(189,238,99,0.25)",
                    transition:"transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(189,238,99,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 4px 24px rgba(189,238,99,0.25)";
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  {locale === "ar" ? "جرّب رادار مجاناً" : locale === "fr" ? "Essayez Radar Gratuitement" : "Try Radar Free"}
                </button>
              </Link>
              <p style={{
                marginTop:"12px",
                fontSize:"11px", color:"rgba(255,255,255,0.2)",
                fontFamily:"Space Mono, monospace", letterSpacing:"0.08em",
              }}>
                {locale === "ar" ? "لا يحتاج بطاقة بنكية — مجاني للأبد" : locale === "fr" ? "Sans carte bancaire — Gratuit pour toujours" : "No credit card — Free forever"}
              </p>
            </div>
          </div>

          {/* ── Dashboard preview card ── */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition:"opacity 0.9s 0.4s ease, transform 0.9s 0.4s ease",
          }}>
            <div style={{
              background:"rgba(255,255,255,0.025)",
              border:"1px solid rgba(200,169,98,0.15)",
              borderRadius:"24px",
              padding:"28px",
              backdropFilter:"blur(12px)",
              boxShadow:"0 32px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}>

              {/* Card top bar */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"22px" }}>
                <div>
                  <div style={{ fontFamily:"Space Mono, monospace", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.25)", textTransform:"uppercase", marginBottom:"4px" }}>
                    {locale === "ar" ? "تحليل لحظي" : locale === "fr" ? "Analyse en Direct" : "Live Analysis"}
                  </div>
                  <div style={{ fontFamily:"'Zain', sans-serif", fontSize:"17px", fontWeight:700, color:"#FAFAF7" }}>
                    {locale === "ar" ? "كفر آيفون 15 برو" : locale === "fr" ? "Coque iPhone 15 Pro" : "iPhone 15 Pro Case"}
                  </div>
                </div>
                <div style={{
                  display:"flex", alignItems:"center", gap:"6px",
                  background:"rgba(189,238,99,0.08)", border:"1px solid rgba(189,238,99,0.2)",
                  borderRadius:"8px", padding:"5px 10px",
                }}>
                  <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#BDEE63", animation:"rp-pulse 2s infinite" }} />
                  <span style={{ fontFamily:"Space Mono, monospace", fontSize:"9px", color:"#BDEE63", letterSpacing:"0.12em" }}>LIVE</span>
                </div>
              </div>

              {/* Profit metric */}
              <div style={{
                background:"linear-gradient(135deg, rgba(200,169,98,0.1) 0%, rgba(200,169,98,0.03) 100%)",
                border:"1px solid rgba(200,169,98,0.18)",
                borderRadius:"16px",
                padding:"18px 20px",
                marginBottom:"18px",
              }}>
                <div style={{ fontFamily:"Space Mono, monospace", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(200,169,98,0.65)", textTransform:"uppercase", marginBottom:"8px" }}>
                  {locale === "ar" ? "هامش الربح الحقيقي" : locale === "fr" ? "Marge de Profit Réelle" : "True Profit Margin"}
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:"10px" }}>
                  <span style={{ fontFamily:"Space Mono, monospace", fontSize:"46px", fontWeight:700, color:"#C8A962", lineHeight:1 }}>
                    {profit}%
                  </span>
                  <span style={{ fontFamily:"'Zain', sans-serif", fontSize:"14px", color:"rgba(255,255,255,0.35)" }}>
                    {locale === "ar" ? "بعد كل التكاليف" : locale === "fr" ? "après tous les frais" : "after all costs"}
                  </span>
                </div>
              </div>

              {/* Competitor prices list */}
              <div style={{ marginBottom:"16px" }}>
                <div style={{ fontFamily:"Space Mono, monospace", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.2)", textTransform:"uppercase", marginBottom:"10px" }}>
                  {locale === "ar" ? "أسعار المنافسين" : locale === "fr" ? "Prix Concurrents" : "Competitor Prices"}
                </div>
                {COMPETITORS.map((c, i) => (
                  <div
                    key={c.name}
                    style={{
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"9px 0",
                      borderBottom: i < COMPETITORS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      opacity: visible ? 1 : 0,
                      transition:`opacity 0.4s ${0.65 + i * 0.1}s ease`,
                    }}
                  >
                    <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
                      <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:c.color, flexShrink:0 }} />
                      <span style={{
                        fontFamily:"Space Mono, monospace", fontSize:"11px",
                        color: c.isYou ? "#FAFAF7" : "rgba(255,255,255,0.42)",
                        fontWeight: c.isYou ? 700 : 400,
                      }}>
                        {c.name}
                      </span>
                      {c.isYou && (
                        <span style={{ fontFamily:"Space Mono, monospace", fontSize:"9px", color:"#BDEE63", background:"rgba(189,238,99,0.1)", padding:"1px 6px", borderRadius:"4px" }}>
                          {locale === "ar" ? "أنت" : locale === "fr" ? "VOUS" : "YOU"}
                        </span>
                      )}
                    </div>
                    <span style={{
                      fontFamily:"Space Mono, monospace", fontSize:"13px",
                      color: c.isYou ? "#BDEE63" : "rgba(255,255,255,0.45)",
                      fontWeight: c.isYou ? 700 : 400,
                    }}>
                      {c.price} ر.س
                    </span>
                  </div>
                ))}
              </div>

              {/* Verdict */}
              <div style={{
                display:"flex", alignItems:"center", gap:"10px",
                background:"rgba(189,238,99,0.07)", border:"1px solid rgba(189,238,99,0.15)",
                borderRadius:"12px", padding:"12px 16px",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BDEE63" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span style={{ fontFamily:"'Zain', sans-serif", fontSize:"14px", color:"#BDEE63", fontWeight:600 }}>
                  {locale === "ar" ? "سعرك تنافسي — الأفضل في السوق الآن" : locale === "fr" ? "Prix compétitif — meilleur du marché maintenant" : "Competitive price — best in market now"}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rp-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @media (max-width: 900px) {
          .rp-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
