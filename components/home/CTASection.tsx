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

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#0A0A0A", padding: "120px 0" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />

      {/* Islamic pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23C8A962' stroke-width='0.5'%3E%3Cpath d='M40 0 L80 20 L80 60 L40 80 L0 60 L0 20 Z'/%3E%3Cpath d='M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
          opacity: 0.04,
        }}
      />

      <div className="max-w-[800px] mx-auto px-8 text-center relative z-10">
        <div className="section-label justify-center mb-8" style={{ color: "rgba(200,169,98,0.6)" }}>
          {isRTL ? "ابدأ الآن" : "Get Started"}
        </div>

        <h2
          style={{
            fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 800,
            color: "#FAFAF7",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          {isRTL ? "جاهز تبدأ" : locale === "en" ? "Ready to Start"  : "Prêt à Commencer"}
          <br />
          <span style={{ color: "#C8A962" }}>
            {isRTL ? "مشروعك الرقمي؟" : locale === "en" ? "Your Digital Project?" : "Votre Projet Digital?"}
          </span>
        </h2>

        <p
          style={{
            color: "#8C8C7A",
            fontSize: "18px",
            lineHeight: 1.7,
            marginBottom: "48px",
          }}
        >
          {isRTL
            ? "دعنا نصنع معاً شيئاً استثنائياً. فريقنا جاهز لتحويل رؤيتك إلى واقع."
            : "Let's create something extraordinary together. Our team is ready to turn your vision into reality."}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary" style={{ fontSize: "14px", padding: "18px 48px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>{isRTL ? "تواصل معنا عبر واتساب" : "Contact Us on WhatsApp"}</span>
            </button>
          </a>
          <a href={consultationLink} target="_blank" rel="noopener noreferrer">
            <button className="btn-secondary" style={{ fontSize: "14px", padding: "18px 48px" }}>
              {isRTL ? "احجز استشارة مجانية" : "Book a Free Consultation"}
            </button>
          </a>
        </div>

        {/* Contact Info */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href={`tel:${AGENCY_INFO.phone}`}
            style={{ color: "#8C8C7A", fontSize: "16px", textDecoration: "none", transition: "color 0.2s", fontFamily: "Space Mono, monospace" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#FAFAF7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#8C8C7A"; }}
          >
            📱 {AGENCY_INFO.phone}
          </a>
          <a
            href={`mailto:${AGENCY_INFO.email}`}
            style={{ color: "#8C8C7A", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#FAFAF7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#8C8C7A"; }}
          >
            📧 {AGENCY_INFO.email}
          </a>
        </div>
      </div>
    </section>
  );
}
