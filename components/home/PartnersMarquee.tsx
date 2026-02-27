"use client";

import { useTranslations, useLocale } from "next-intl";

const PARTNERS = [
  { name: "TF1ONE", url: "https://www.tf1one.com/", slug: "tf1one" },
  { name: "سلة", url: "#", slug: "salla" },
  { name: "زد", url: "#", slug: "zid" },
  { name: "شوبيفاي", url: "#", slug: "shopify" },
  { name: "ماستركارد", url: "#", slug: "mastercard" },
  { name: "تاباي", url: "#", slug: "tabby" },
  { name: "تمارا", url: "#", slug: "tamara" },
  { name: "أرامكس", url: "#", slug: "aramex" },
  { name: "SMSA", url: "#", slug: "smsa" },
  { name: "Nana", url: "#", slug: "nana" },
  { name: "Noon", url: "#", slug: "noon" },
  { name: "مدى", url: "#", slug: "mada" },
];

function PartnerLogo({ partner }: { partner: typeof PARTNERS[0] }) {
  return (
    <div
      className="flex items-center justify-center group flex-shrink-0 cursor-pointer"
      style={{
        height: "50px",
        minWidth: "120px",
        padding: "0 40px",
        filter: "grayscale(100%) opacity(0.45)",
        transition: "filter 0.4s ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = "grayscale(0%) opacity(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(100%) opacity(0.45)"; }}
    >
      <div
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: "#0A0A0A",
          whiteSpace: "nowrap",
        }}
      >
        {partner.name}
      </div>
    </div>
  );
}

export default function PartnersMarquee() {
  const t = useTranslations("partners");
  const locale = useLocale();

  // Double the array for seamless infinite scroll
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section
      style={{
        background: "#FAFAF7",
        padding: "60px 0",
        overflow: "hidden",
        borderTop: "1px solid #E8E6E1",
        borderBottom: "1px solid #E8E6E1",
      }}
    >
      {/* Title */}
      <div className="max-w-[1400px] mx-auto px-8 mb-10">
        <div className="section-label justify-center" style={{ color: "#8C8C7A" }}>
          {t("title")}
        </div>
      </div>

      {/* Row 1 — Right to Left */}
      <div className="marquee-container mb-6">
        <div
          className="marquee-track"
          style={{ animation: "marquee 40s linear infinite" }}
          onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = "running"; }}
        >
          {doubled.map((partner, i) => (
            <PartnerLogo key={`row1-${i}`} partner={partner} />
          ))}
        </div>
      </div>

      {/* Row 2 — Left to Right */}
      <div className="marquee-container">
        <div
          className="marquee-track"
          style={{ animation: "marquee-reverse 35s linear infinite" }}
          onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = "running"; }}
        >
          {doubled.map((partner, i) => (
            <PartnerLogo key={`row2-${i}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
