"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";

/* ── Competitor-informed keyword clusters ── */
const KEYWORD_CLUSTERS_AR = [
  { cluster: "تصميم المتاجر", keywords: ["تصميم متجر سلة", "تصميم متجر زد", "تصميم متجر احترافي", "إنشاء متجر إلكتروني السعودية", "تجهيز متجر سلة كامل", "تخصيص ثيم سلة"] },
  { cluster: "التطوير والبرمجة", keywords: ["برمجة مواقع السعودية", "تطوير متجر إلكتروني", "تصميم تطبيقات", "شركة تصميم مواقع السعودية", "موقع جاهز للبيع"] },
  { cluster: "الربط والتكامل", keywords: ["ربط بوابات الدفع", "تابي وتمارا", "STC Pay مدى", "ربط الشحن والتوصيل", "Google Analytics SEO"] },
  { cluster: "تحسين المبيعات", keywords: ["تحسين SEO المتاجر", "تحسين معدل التحويل", "تحسين صفحات المنتجات", "تصدر محركات البحث", "سيو متجر إلكتروني"] },
];
const KEYWORD_CLUSTERS_EN = [
  { cluster: "Store Design", keywords: ["Salla store design", "Zid store design", "professional store design", "create online store Saudi Arabia", "Shopify store design"] },
  { cluster: "Development", keywords: ["website development Saudi Arabia", "e-commerce development", "mobile app design", "web programming", "custom store build"] },
  { cluster: "Integration", keywords: ["payment gateway integration", "Tabby & Tamara setup", "shipping integration", "Google Analytics setup", "store automation"] },
  { cluster: "SEO & Sales", keywords: ["e-commerce SEO", "conversion optimization", "product page SEO", "rank #1 Google Saudi", "store traffic growth"] },
];

/* ── Service cards ── */
const SERVICES_AR = [
  {
    icon: "🛒",
    title: "تصميم متجر سلة احترافي",
    desc: "ثيم مخصص بالكامل يعكس هويتك، صفحات منتجات تقنع العميل بالشراء، وتجربة جوال مثالية",
    result: "+40% تحويل",
    resultColor: "#F0B100",
    time: "5 أيام",
  },
  {
    icon: "⚡",
    title: "إنشاء متجر زد من الصفر",
    desc: "من إنشاء الحساب حتى رفع المنتجات وربط الدفع والشحن — متجر كامل جاهز للبيع",
    result: "يوم واحد تأسيس",
    resultColor: "#F0B100",
    time: "3 أيام",
  },
  {
    icon: "💻",
    title: "برمجة مواقع وتطبيقات",
    desc: "مواقع Next.js سريعة بـ SEO قوي وواجهة فاخرة — مشاريع مخصصة تناسب علامتك التجارية",
    result: "3× سرعة تحميل",
    resultColor: "#F0B100",
    time: "10-14 يوم",
  },
  {
    icon: "🔗",
    title: "ربط الخدمات والتكاملات",
    desc: "تابي، تمارا، STC Pay، مدى، شحن، Google Analytics وجوجل ميرشنت — كل شيء مربوط",
    result: "100% ربط",
    resultColor: "#F0B100",
    time: "يومان",
  },
];
const SERVICES_EN = [
  {
    icon: "🛒",
    title: "Professional Salla Store Design",
    desc: "Fully custom theme reflecting your brand, product pages that convert, and perfect mobile UX",
    result: "+40% conversion",
    resultColor: "#F0B100",
    time: "5 days",
  },
  {
    icon: "⚡",
    title: "Zid Store from Scratch",
    desc: "From account setup to products, payment & shipping — complete store ready to sell",
    result: "1-day foundation",
    resultColor: "#F0B100",
    time: "3 days",
  },
  {
    icon: "💻",
    title: "Website & App Development",
    desc: "Fast Next.js sites with strong SEO and luxury UI — custom projects for your brand",
    result: "3× load speed",
    resultColor: "#F0B100",
    time: "10-14 days",
  },
  {
    icon: "🔗",
    title: "Integrations & Connections",
    desc: "Tabby, Tamara, STC Pay, Mada, shipping, Google Analytics & Merchant — all connected",
    result: "100% connected",
    resultColor: "#F0B100",
    time: "2 days",
  },
];

export default function EcommerceSection() {
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const ref    = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active,  setActive]  = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const wa = getWhatsAppLink(
    isRTL
      ? "مرحباً! أريد الاستفسار عن تصميم وتطوير متجر إلكتروني أو موقع ويب"
      : "Hello! I'd like to inquire about e-commerce store design or website development"
  );
  const clusters   = isRTL ? KEYWORD_CLUSTERS_AR : KEYWORD_CLUSTERS_EN;
  const services   = isRTL ? SERVICES_AR : SERVICES_EN;

  return (
    <section
      ref={ref}
      id="ecommerce"
      aria-label={isRTL ? "تصميم وتطوير المتاجر الإلكترونية" : "E-commerce Design & Development"}
      style={{ background: "#FFFFFF", padding: "88px 0 96px", position: "relative", overflow: "hidden" }}
    >
      {/* Neon grid bg */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
      {/* Glow */}
      <div aria-hidden style={{
        position: "absolute", bottom: "-10%", left: "50%", transform: "translateX(-50%)",
        width: "900px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(240,177,0,0.12) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10" dir={isRTL ? "rtl" : "ltr"}>

        {/* ── SEO H1 + intro ── */}
        <div style={{
          textAlign: "center", marginBottom: "60px",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "all 0.8s ease",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(240,177,0,0.12)", border: "1px solid rgba(240,177,0,0.3)",
            borderRadius: "100px", padding: "5px 18px", marginBottom: "18px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F0B100", animation: "ecPulse 2s infinite" }} />
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F0B100" }}>
              {isRTL ? "متاجر جاهزة للبيع من أول يوم" : "Stores Ready to Sell From Day One"}
            </span>
          </div>

          {/* H1 — SEO */}
          <h1 style={{
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
            fontSize: "clamp(26px, 4vw, 56px)",
            fontWeight: 800, color: "#1A1A1A",
            lineHeight: 1.1, marginBottom: "16px",
          }}>
            {isRTL
              ? <>تصميم وتطوير <span style={{ color: "#F0B100" }}>متاجر إلكترونية</span><br />وبرمجة مواقع وتطبيقات</>
              : <>E-Commerce Store Design &<br /><span style={{ color: "#F0B100" }}>Website & App Development</span></>}
          </h1>
          <p style={{
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "clamp(15px, 2vw, 18px)",
            color: "rgba(26,26,26,0.65)", maxWidth: "620px", margin: "0 auto",
            lineHeight: 1.75,
          }}>
            {isRTL
              ? "خبراء منصات سلة وزد وشوبيفاي — نبني متاجرك من الصفر وندمج الدفع والشحن والـ SEO لتبدأ البيع فوراً"
              : "Salla, Zid & Shopify platform experts — we build your store from scratch with payments, shipping & SEO ready to sell immediately"}
          </p>
        </div>

        {/* ── 4 Service Cards ── */}
        <div
          className="ec-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "56px" }}
        >
          {services.map((svc, i) => {
            const isH = active === i;
            return (
              <div
                key={svc.title}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(0)}
                style={{
                  background: "#FFFFFF",
                  border: `1px solid ${isH ? "rgba(240,177,0,0.4)" : "rgba(0,0,0,0.08)"}`,
                  borderRadius: "18px", padding: "24px 20px",
                  display: "flex", flexDirection: "column", gap: "14px",
                  transition: "all 0.3s cubic-bezier(0.19,1,0.22,1)",
                  transform: isH ? "translateY(-5px)" : "none",
                  boxShadow: isH ? "0 20px 60px rgba(0,0,0,0.12)" : "0 6px 20px rgba(0,0,0,0.05)",
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${i * 0.08}s`,
                  cursor: "default",
                  position: "relative", overflow: "hidden",
                }}
              >
                {/* Top line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                  background: "linear-gradient(to right, transparent, rgba(240,177,0,0.5), transparent)",
                  opacity: isH ? 1 : 0, transition: "opacity 0.3s",
                }} />
                <div style={{ fontSize: "28px" }}>{svc.icon}</div>
                <h3 style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "17px", fontWeight: 700, color: "#1A1A1A", margin: 0, lineHeight: 1.25 }}>
                  {svc.title}
                </h3>
                <p style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "13px", color: "rgba(26,26,26,0.65)", lineHeight: 1.6, margin: 0, flex: 1 }}>
                  {svc.desc}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <span style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", fontWeight: 700, color: svc.resultColor }}>
                    {svc.result}
                  </span>
                  <span style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "12px", color: "rgba(26,26,26,0.55)" }}>
                    {isRTL ? `تسليم: ${svc.time}` : `Delivery: ${svc.time}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Keyword Clusters Grid (SEO + UI value) ── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.8s 0.3s ease",
        }}>
          <h2 style={{
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "18px",
            fontWeight: 700, color: "rgba(26,26,26,0.7)",
            marginBottom: "20px", textAlign: "center",
          }}>
            {isRTL ? "خدماتنا تشمل" : "Our services include"}
          </h2>
          <div className="cluster-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "48px" }}>
            {clusters.map((c) => (
              <div key={c.cluster} style={{
                background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "14px", padding: "20px",
              }}>
                <div style={{
                  fontFamily: "Space Mono, monospace", fontSize: "9px",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "#F0B100", marginBottom: "14px",
                }}>
                  {c.cluster}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                  {c.keywords.map((kw) => (
                    <span key={kw} style={{
                      fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "13px",
                      color: "rgba(26,26,26,0.65)", lineHeight: 1.4,
                      display: "flex", alignItems: "center", gap: "8px",
                    }}>
                      <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(240,177,0,0.6)", flexShrink: 0 }} />
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA row ── */}
        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "center",
          justifyContent: "space-between", gap: "24px",
          background: "rgba(240,177,0,0.08)", border: "1px solid rgba(240,177,0,0.25)",
          borderRadius: "20px", padding: "32px 40px",
          opacity: visible ? 1 : 0, transition: "all 0.8s 0.4s ease",
        }}>
          <div>
            <h3 style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "22px", fontWeight: 800, color: "#1A1A1A", margin: "0 0 6px" }}>
              {isRTL ? "خلّي متجرك يبدأ يبيع من أول يوم" : "Let your store sell from day one"}
            </h3>
            <p style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px", color: "rgba(26,26,26,0.65)", margin: 0 }}>
              {isRTL ? "نبني لك متجراً جاهزاً للبيع — من التصميم حتى ربط الدفع والشحن والـ SEO" : "We build you a sale-ready store — from design to payments, shipping & SEO"}
            </p>
          </div>
          <a href={wa} target="_blank" rel="noopener noreferrer">
            <button style={{
              padding: "15px 32px", borderRadius: "12px",
              background: "#F0B100", color: "#1A1A1A",
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px",
              fontWeight: 800, border: "none", cursor: "pointer",
              whiteSpace: "nowrap", boxShadow: "0 0 28px rgba(240,177,0,0.25)",
              transition: "all 0.25s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 44px rgba(240,177,0,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 28px rgba(240,177,0,0.25)"; }}
            >
              {isRTL ? "ابدأ مشروعك الآن" : "Start Your Project Now"}
            </button>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes ecPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.75); }
        }
        @media (max-width: 1100px) {
          .ec-grid { grid-template-columns: repeat(2,1fr) !important; }
          .cluster-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 640px) {
          .ec-grid { grid-template-columns: 1fr !important; }
          .cluster-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
