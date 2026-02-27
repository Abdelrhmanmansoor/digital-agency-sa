"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

/* ─── Simple Icons CDN — real brand logos ─── */
const ADOBE_TOOLS = [
  { name: "Photoshop",    slug: "adobephotoshop",   color: "#31A8FF" },
  { name: "Illustrator",  slug: "adobeillustrator",  color: "#FF9A00" },
  { name: "After Effects",slug: "adobeaftereffects", color: "#9999FF" },
  { name: "Premiere Pro", slug: "adobepremierepro",  color: "#EA77FF" },
  { name: "InDesign",     slug: "adobeindesign",     color: "#FF3366" },
  { name: "Lightroom",    slug: "adobelightroom",    color: "#31A8FF" },
  { name: "Audition",     slug: "adobeaudition",     color: "#00E4BB" },
  { name: "XD",           slug: "adobexd",           color: "#FF61F6" },
];

const PLATFORM_TOOLS = [
  { name: "Figma",        slug: "figma",             color: "#F24E1E", type: "cdn" },
  { name: "Salla",        slug: "",                  color: "#04BE64", type: "salla" },
  { name: "Zid",          slug: "",                  color: "#5B4EE8", type: "zid" },
  { name: "Shopify",      slug: "shopify",           color: "#7AB55C", type: "cdn" },
  { name: "WordPress",    slug: "wordpress",         color: "#21759B", type: "cdn" },
  { name: "WooCommerce",  slug: "woocommerce",       color: "#7F54B3", type: "cdn" },
  { name: "Claude AI",    slug: "anthropic",         color: "#C97B56", type: "cdn" },
  { name: "123",          slug: "",                  color: "#FF6B35", type: "123" },
] as const;

/* ─── Individual card ─── */
function ToolCard({ name, slug, color }: { name: string; slug: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  const iconUrl = `https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "20px 12px",
        border: hovered ? `1px solid ${color}44` : "1px solid rgba(255,255,255,0.05)",
        background: hovered ? `${color}0A` : "rgba(255,255,255,0.02)",
        transition: "all 0.3s ease",
        cursor: "default",
        borderRadius: "2px",
        boxShadow: hovered ? `0 0 24px ${color}18` : "none",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconUrl}
        alt={name}
        width={40}
        height={40}
        style={{ width: "40px", height: "40px", objectFit: "contain", filter: hovered ? "none" : "grayscale(0.3) opacity(0.85)" }}
        loading="lazy"
      />
      <span
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "9px",
          letterSpacing: "0.08em",
          color: hovered ? color : "rgba(255,255,255,0.4)",
          textAlign: "center",
          textTransform: "uppercase",
          lineHeight: 1.3,
          transition: "color 0.3s",
        }}
      >
        {name}
      </span>
    </div>
  );
}

/* ─── Salla card — inline SVG ─── */
function SallaCard() {
  const [hovered, setHovered] = useState(false);
  const color = "#04BE64";
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "20px 12px",
        border: hovered ? `1px solid ${color}44` : "1px solid rgba(255,255,255,0.05)",
        background: hovered ? `${color}0A` : "rgba(255,255,255,0.02)",
        transition: "all 0.3s ease",
        cursor: "default",
        borderRadius: "2px",
        boxShadow: hovered ? `0 0 24px ${color}18` : "none",
      }}
    >
      <svg width="40" height="40" viewBox="0 0 80 80" fill="none" style={{ opacity: hovered ? 1 : 0.75, transition: "opacity 0.3s" }}>
        {/* Salla shopping bag icon */}
        <rect width="80" height="80" rx="16" fill="#04BE64" fillOpacity="0.12"/>
        <path d="M24 32h32l-4 22H28L24 32Z" stroke="#04BE64" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M33 32c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#04BE64" strokeWidth="3" strokeLinecap="round"/>
        <path d="M35 42h10M35 48h6" stroke="#04BE64" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <span style={{
        fontFamily: "Space Mono, monospace",
        fontSize: "9px",
        letterSpacing: "0.08em",
        color: hovered ? color : "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
        transition: "color 0.3s",
      }}>
        Salla
      </span>
    </div>
  );
}

/* ─── Zid card — inline SVG ─── */
function ZidCard() {
  const [hovered, setHovered] = useState(false);
  const color = "#5B4EE8";
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "20px 12px",
        border: hovered ? `1px solid ${color}44` : "1px solid rgba(255,255,255,0.05)",
        background: hovered ? `${color}0A` : "rgba(255,255,255,0.02)",
        transition: "all 0.3s ease",
        cursor: "default",
        borderRadius: "2px",
        boxShadow: hovered ? `0 0 24px ${color}18` : "none",
      }}
    >
      <svg width="40" height="40" viewBox="0 0 80 80" fill="none" style={{ opacity: hovered ? 1 : 0.75, transition: "opacity 0.3s" }}>
        <rect width="80" height="80" rx="16" fill="#5B4EE8" fillOpacity="0.12"/>
        {/* Z letter stylized */}
        <path d="M20 22h40L22 58h38" stroke="#5B4EE8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span style={{
        fontFamily: "Space Mono, monospace",
        fontSize: "9px",
        letterSpacing: "0.08em",
        color: hovered ? color : "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
        transition: "color 0.3s",
      }}>
        Zid
      </span>
    </div>
  );
}

/* ─── 123 card — inline SVG ─── */
function Card123() {
  const [hovered, setHovered] = useState(false);
  const color = "#FF6B35";
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "20px 12px",
        border: hovered ? `1px solid ${color}44` : "1px solid rgba(255,255,255,0.05)",
        background: hovered ? `${color}0A` : "rgba(255,255,255,0.02)",
        transition: "all 0.3s ease",
        cursor: "default",
        borderRadius: "2px",
        boxShadow: hovered ? `0 0 24px ${color}18` : "none",
      }}
    >
      <svg width="40" height="40" viewBox="0 0 80 80" fill="none" style={{ opacity: hovered ? 1 : 0.75, transition: "opacity 0.3s" }}>
        <rect width="80" height="80" rx="16" fill="#FF6B35" fillOpacity="0.12"/>
        <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="#FF6B35" fontSize="28" fontWeight="800" fontFamily="Space Mono, monospace">
          123
        </text>
      </svg>
      <span style={{
        fontFamily: "Space Mono, monospace",
        fontSize: "9px",
        letterSpacing: "0.08em",
        color: hovered ? color : "rgba(255,255,255,0.4)",
        textTransform: "uppercase",
        transition: "color 0.3s",
      }}>
        123
      </span>
    </div>
  );
}

/* ─── Main section ─── */
export default function TechStack() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section
      style={{
        background: "#060606",
        borderTop: "1px solid rgba(200,169,98,0.06)",
        borderBottom: "1px solid rgba(200,169,98,0.06)",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(200,169,98,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,98,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">

        {/* ── Header ── */}
        <div style={{ textAlign: isRTL ? "right" : "left", marginBottom: "64px", direction: isRTL ? "rtl" : "ltr" }}>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(200,169,98,0.7)",
              marginBottom: "16px",
            }}
          >
            {isRTL ? "الأدوات والمنصات" : "Tools & Platforms"}
          </div>
          <h2
            style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 800,
              color: "#FAFAF7",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            {isRTL ? "نعمل بأفضل الأدوات العالمية" : "We Work With The Best Global Tools"}
          </h2>
          <p
            style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "17px",
              color: "rgba(255,255,255,0.4)",
              maxWidth: "520px",
              lineHeight: 1.7,
            }}
          >
            {isRTL
              ? "خبرة متعمقة في مجموعة أدوبي الإبداعية وأبرز منصات التجارة الإلكترونية، لنقدم لك نتائج لا تقبل المقارنة."
              : "Deep expertise across Adobe Creative Suite and top e-commerce platforms, delivering incomparable results."}
          </p>
        </div>

        {/* ── Adobe Creative Suite ── */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px", direction: isRTL ? "rtl" : "ltr" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Adobe "A" icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000">
                <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624z"/>
              </svg>
              <span
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Adobe Creative Suite
              </span>
            </div>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          </div>

          <div
            className="tech-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: "8px",
            }}
          >
            {ADOBE_TOOLS.map((tool) => (
              <ToolCard key={tool.slug} name={tool.name} slug={tool.slug} color={tool.color} />
            ))}
          </div>
        </div>

        {/* ── Digital Platforms ── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px", direction: isRTL ? "rtl" : "ltr" }}>
            <span
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {isRTL ? "منصات التجارة الإلكترونية والتصميم" : "E-Commerce & Design Platforms"}
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          </div>

          <div
            className="tech-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: "8px",
            }}
          >
            <ToolCard name="Figma" slug="figma" color="#F24E1E" />
            <SallaCard />
            <ZidCard />
            <ToolCard name="Shopify" slug="shopify" color="#96BF48" />
            <ToolCard name="WordPress" slug="wordpress" color="#21759B" />
            <ToolCard name="WooCommerce" slug="woocommerce" color="#7F54B3" />
            <ToolCard name="Claude AI" slug="anthropic" color="#C97B56" />
            <Card123 />
          </div>
        </div>

        {/* ── Bottom note ── */}
        <div
          style={{
            marginTop: "48px",
            paddingTop: "32px",
            borderTop: "1px solid rgba(200,169,98,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          <span
            style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {isRTL ? "وأكثر من ذلك — نختار دائماً الأداة الأنسب لمشروعك" : "And more — we always choose the right tool for your project"}
          </span>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {["16+", isRTL ? "أداة احترافية" : "Pro Tools"].map((t, i) => (
              <span
                key={i}
                style={{
                  fontFamily: i === 0 ? "Space Mono, monospace" : "'Zain', sans-serif",
                  fontSize: i === 0 ? "20px" : "13px",
                  fontWeight: i === 0 ? 700 : 400,
                  color: i === 0 ? "#C8A962" : "rgba(255,255,255,0.3)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .tech-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .tech-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 400px) {
          .tech-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
