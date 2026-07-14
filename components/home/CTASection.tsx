"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { getWhatsAppLink, AGENCY_INFO } from "@/lib/utils";

export default function CTASection() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const whatsappLink = getWhatsAppLink(
    isRTL
      ? "مرحباً! أريد البدء في مشروعي الرقمي. هل يمكننا التحدث؟"
      : "Hello! I want to start my digital project. Can we talk?"
  );
  const consultationLink = getWhatsAppLink(
    isRTL
      ? "مرحباً! أريد حجز استشارة مجانية مع فريقكم."
      : "Hello! I'd like to book a free consultation with your team."
  );

  const headingLine1 = locale === "ar" ? "مشروعك التالي" : locale === "fr" ? "Votre prochain" : "Your next";
  const headingLine2 = locale === "ar" ? "يبدأ الآن ." : locale === "fr" ? "projet commence ici." : "project starts now.";
  const sub = locale === "ar"
    ? "فريقنا متاح الآن — رد خلال أقل من ساعة. نحوّل فكرتك إلى مشروع رقمي يبيع يوميًا."
    : "Our team is available now — reply in under 1 hour. We turn your idea into a daily-selling digital project.";
  const btnPrimary  = locale === "ar" ? "ابدأ مشروعك الآن" : "Start Your Project Now";
  const btnSecondary = locale === "ar" ? "استشارة مجانية ←" : "Free Consultation →";

  return (
    <section
      id="contact"
      style={{ background:"#FFFFFF", padding:"140px 0", overflow:"hidden", position:"relative" }}
    >
      {/* Horizontal lime beam */}
      <div
        aria-hidden
        style={{
          position:"absolute", top:"50%", left:0, right:0,
          height:"1px",
          background:"linear-gradient(to right, transparent 0%, rgba(240,177,0,0.0) 20%, rgba(240,177,0,0.18) 50%, rgba(240,177,0,0.0) 80%, transparent 100%)",
          transform:"translateY(-50%)",
          pointerEvents:"none",
        }}
      />

      {/* Large background text */}
      <div
        aria-hidden
        style={{
          position:"absolute", top:"50%", left:"50%",
          transform:"translate(-50%, -50%)",
          fontFamily:"Space Mono, monospace",
          fontSize:"clamp(80px, 15vw, 220px)",
          fontWeight:900,
          color:"rgba(0,0,0,0.03)",
          letterSpacing:"-0.04em",
          whiteSpace:"nowrap",
          pointerEvents:"none",
          userSelect:"none",
          lineHeight:1,
        }}
      >
        START
      </div>

      <div ref={ref} className="max-w-[1200px] mx-auto px-8 relative z-10">
        {/* Two-column layout */}
        <div
          style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            gap:"80px",
            alignItems:"center",
          }}
          className="cta-grid"
        >
          {/* LEFT — Heading */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : isRTL ? "translateX(30px)" : "translateX(-30px)",
              transition:"all 0.9s cubic-bezier(0.19,1,0.22,1)",
            }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Section label */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(240,177,0,0.12)", border:"1px solid rgba(240,177,0,0.25)", borderRadius:"100px", padding:"6px 16px", fontSize:"11px", fontFamily:"Space Mono, monospace", letterSpacing:"0.2em", color:"#F0B100", textTransform:"uppercase", marginBottom:"28px" }}>
              <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#F0B100", display:"inline-block" }} />
              {isRTL ? "ابدأ الآن" : "Get Started"}
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily:"'ThmanyahSans', 'Zain', sans-serif",
                fontSize:"clamp(42px, 5.5vw, 76px)",
                fontWeight:800,
                color:"#1A1A1A",
                lineHeight:1.05,
                marginBottom:"24px",
                letterSpacing: isRTL ? "-0.01em" : "-0.03em",
              }}
            >
              {headingLine1}
              <br />
              <span style={{ color:"#F0B100" }}>{headingLine2}</span>
            </h2>

            <p style={{ color:"rgba(26,26,26,0.65)", fontSize:"17px", lineHeight:1.75, maxWidth:"440px" }}>
              {sub}
            </p>
          </div>

          {/* RIGHT — Actions card */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : isRTL ? "translateX(-30px)" : "translateX(30px)",
              transition:"all 0.9s 0.15s cubic-bezier(0.19,1,0.22,1)",
            }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div
              style={{
                background:"#FFFFFF",
                border:"1px solid rgba(0,0,0,0.08)",
                borderRadius:"24px",
                padding:"40px 36px",
                position:"relative",
                overflow:"hidden",
              }}
            >
              {/* Green top accent */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:"linear-gradient(to right, transparent, rgba(240,177,0,0.6), transparent)" }} />

              {/* Reply-time badge */}
              <div style={{
                display:"inline-flex", alignItems:"center", gap:"6px",
                background:"rgba(240,177,0,0.12)", border:"1px solid rgba(240,177,0,0.3)",
                borderRadius:"100px", padding:"5px 14px", marginBottom:"20px",
              }}>
                <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#F0B100", animation:"ctaPulse 2s infinite" }} />
                <span style={{ fontFamily:"Space Mono, monospace", fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", color:"#F0B100" }}>
                  {isRTL ? "رد خلال أقل من ساعة" : "Reply in under 1 hour"}
                </span>
              </div>

              {/* Main CTA */}
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ display:"block", marginBottom:"12px" }}>
                <button
                  className="btn-primary"
                  style={{ width:"100%", fontSize:"16px", padding:"18px 24px", borderRadius:"14px", justifyContent:"center" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink:0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>{btnPrimary}</span>
                </button>
              </a>

              <a href={consultationLink} target="_blank" rel="noopener noreferrer" style={{ display:"block", marginBottom:"28px" }}>
                <button
                  className="btn-secondary"
                  style={{ width:"100%", fontSize:"15px", padding:"16px 24px", borderRadius:"14px", justifyContent:"center" }}
                >
                  {btnSecondary}
                </button>
              </a>

              {/* Divider */}
              <div style={{ borderTop:"1px solid rgba(0,0,0,0.08)", marginBottom:"24px" }} />

              {/* Contact pills */}
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                {[
                  {
                    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>,
                    href: `https://wa.me/${AGENCY_INFO.whatsapp.replace(/\D/g,"")}`,
                    label: AGENCY_INFO.whatsapp,
                  },
                  {
                    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                    href: `mailto:${AGENCY_INFO.email}`,
                    label: AGENCY_INFO.email,
                  },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display:"flex", alignItems:"center", gap:"10px",
                      color:"rgba(26,26,26,0.65)", fontSize:"13px",
                      fontFamily:"Space Mono, monospace",
                      textDecoration:"none",
                      padding:"10px 0",
                      transition:"color 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#F0B100"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(26,26,26,0.65)"; }}
                  >
                    {item.svg}
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Trust note */}
              <div
                style={{
                  marginTop:"20px",
                  paddingTop:"20px",
                borderTop:"1px solid rgba(0,0,0,0.08)",
                display:"flex",
                alignItems:"center",
                gap:"8px",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,26,0.35)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <span style={{ fontSize:"12px", color:"rgba(26,26,26,0.5)", fontFamily:"Space Mono, monospace", letterSpacing:"0.08em" }}>
                {isRTL ? "بياناتك آمنة 100% — بدون تسليم بيانات لأطراف ثالثة" : "100% secure — no data shared with third parties"}
              </span>
            </div>
            </div>
          </div>
        </div>

        {/* Bottom achievement bar */}
        <div
          style={{
            marginTop:"80px",
            display:"grid",
            gridTemplateColumns:"repeat(4, 1fr)",
            gap:"0",
            border:"1px solid rgba(0,0,0,0.08)",
            borderRadius:"20px",
            overflow:"hidden",
            opacity: visible ? 1 : 0,
            transition:"opacity 0.9s 0.4s ease",
          }}
          className="cta-bottom-bar"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {[
            {
              metric: isRTL ? "+300" : "300+",
              svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F0B100" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
              title: isRTL ? "+300 عميل سعيد" : "300+ Happy Clients",
              sub: isRTL ? "في السعودية ودول الخليج" : "Across Saudi Arabia & Gulf",
            },
            {
              metric: "35%",
              svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E6BFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
              title: isRTL ? "متوسط زيادة المبيعات 35%" : "35% Avg Sales Increase",
              sub: isRTL ? "خلال أول 30 يوم من التسليم" : "Within first 30 days of delivery",
            },
            {
              metric: "<1h",
              svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F0B100" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
              title: isRTL ? "رد خلال أقل من ساعة" : "Reply in Under 1 Hour",
              sub: isRTL ? "فريقنا متاح على مدار الساعة" : "Our team is always available",
            },
            {
              metric: "5★",
              svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="#F0B100"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
              title: isRTL ? "تقييم 5 نجوم دائماً" : "Always 5-Star Rated",
              sub: isRTL ? "رضا 98% من عملائنا" : "98% client satisfaction",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding:"28px 24px",
                borderLeft: i > 0 ? "1px solid rgba(0,0,0,0.08)" : "none",
                background:"#FFFFFF",
                transition:"background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#FAFAFA"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}
            >
              <div style={{ marginBottom:"10px" }}>{item.svg}</div>
              <div style={{
                fontFamily:"Space Mono, monospace", fontSize:"22px",
                fontWeight:700, color: i % 2 === 0 ? "#F0B100" : "#2E6BFF",
                lineHeight:1, marginBottom:"6px",
              }}>
                {(item as {metric?: string}).metric}
              </div>
              <div style={{ fontFamily:"'ThmanyahSans', 'Zain', sans-serif", fontSize:"14px", fontWeight:700, color:"#1A1A1A", marginBottom:"3px" }}>
                {item.title}
              </div>
              <div style={{ fontSize:"12px", color:"rgba(26,26,26,0.6)", lineHeight:1.5 }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ctaPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.75); }
        }
        @media (max-width: 900px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .cta-bottom-bar { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .cta-bottom-bar { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
