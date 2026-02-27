"use client";

import { useLocale } from "next-intl";
import { getWhatsAppLink, AGENCY_INFO } from "@/lib/utils";

export default function CTASection() {
  const locale = useLocale();
  const isRTL = locale === "ar";

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

  const heading = locale === "ar"
    ? "ارفع مشروعك\nلمستوى مختلف تماماً"
    : locale === "fr"
    ? "Élevez votre projet\nà un niveau différent"
    : "Elevate your brand\nto a different level";
  const sub = locale === "ar"
    ? "فريقنا جاهز لتحويل فكرتك إلى واقع رقمي مذهل"
    : locale === "fr"
    ? "Notre équipe est prête à transformer votre idée en réalité digitale"
    : "Our team is ready to turn your idea into a stunning digital reality";
  const btnPrimary = locale === "ar" ? "تواصل عبر واتساب" : locale === "fr" ? "Contactez via WhatsApp" : "Contact via WhatsApp";
  const btnSecondary = locale === "ar" ? "استشارة مجانية" : locale === "fr" ? "Consultation Gratuite" : "Free Consultation";

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#0D0D0D", padding: "120px 0" }}
    >
      {/* Arch top */}
      <div aria-hidden style={{ position:"absolute", top:"-120px", left:"50%", transform:"translateX(-50%)", width:"900px", height:"560px", borderRadius:"50% 50% 0 0 / 100% 100% 0 0", border:"1px solid rgba(189,238,99,0.07)", pointerEvents:"none" }} />
      {/* Arch bottom */}
      <div aria-hidden style={{ position:"absolute", bottom:"-120px", left:"50%", transform:"translateX(-50%) rotate(180deg)", width:"700px", height:"400px", borderRadius:"50% 50% 0 0 / 100% 100% 0 0", border:"1px solid rgba(189,238,99,0.04)", pointerEvents:"none" }} />
      {/* Glow */}
      <div aria-hidden style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 60% at 50% 50%, rgba(189,238,99,0.04) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div className="max-w-[720px] mx-auto px-8 text-center relative z-10" dir={isRTL ? "rtl" : "ltr"}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8" style={{ background:"rgba(189,238,99,0.08)", border:"1px solid rgba(189,238,99,0.18)", borderRadius:"100px", padding:"6px 16px", fontSize:"11px", fontFamily:"Space Mono, monospace", letterSpacing:"0.2em", color:"var(--lime)", textTransform:"uppercase" }}>
          <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"var(--lime)", display:"inline-block" }} />
          {isRTL ? "ابدأ الآن" : locale === "fr" ? "Commencez" : "Get Started"}
        </div>

        <h2 style={{ fontFamily: isRTL ? "Noto Kufi Arabic, sans-serif" : "sans-serif", fontSize:"clamp(34px, 5.5vw, 72px)", fontWeight:800, color:"#FFFFFF", lineHeight:1.08, marginBottom:"20px", letterSpacing: isRTL ? "0" : "-0.03em", whiteSpace:"pre-line" }}>
          {heading}
        </h2>

        <p style={{ color:"rgba(255,255,255,0.42)", fontSize:"18px", lineHeight:1.7, marginBottom:"48px" }}>
          {sub}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary" style={{ fontSize:"15px", padding:"18px 40px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>{btnPrimary}</span>
            </button>
          </a>
          <a href={consultationLink} target="_blank" rel="noopener noreferrer">
            <button className="btn-secondary" style={{ fontSize:"15px", padding:"18px 40px" }}>
              {btnSecondary}
            </button>
          </a>
        </div>

        {/* Contact pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { href:`https://wa.me/${AGENCY_INFO.phone.replace("+","")}`, label:`📱 ${AGENCY_INFO.phone}` },
            { href:`mailto:${AGENCY_INFO.email}`, label:`✉️ ${AGENCY_INFO.email}` },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"100px", padding:"10px 20px", color:"rgba(255,255,255,0.5)", fontSize:"13px", fontFamily:"Space Mono, monospace", textDecoration:"none", transition:"all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(189,238,99,0.3)"; e.currentTarget.style.color="var(--lime)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.color="rgba(255,255,255,0.5)"; }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
