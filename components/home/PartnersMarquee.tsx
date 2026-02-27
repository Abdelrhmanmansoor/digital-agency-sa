"use client";

import { useTranslations } from "next-intl";

/* ─────────────────────────────────────────
   Real client logos — all images go in
   /public/partners/[filename]
   ───────────────────────────────────────── */
const PARTNERS_ROW1 = [
  { name: "Serdab",          file: "serdab.png",       invert: true  },
  { name: "إبرة وخيط",      file: "ebra-khait.png",   invert: true  },
  { name: "JR Line",         file: "jr-line.png",      invert: false },
  { name: "Darlena",         file: "darlena.png",      invert: false },
  { name: "LP",              file: "lp.png",           invert: true  },
  { name: "JOGH",            file: "jogh.png",         invert: false },
  { name: "عسل وعافية",     file: "asal-afia.png",    invert: false },
];

const PARTNERS_ROW2 = [
  { name: "العواج",          file: "awaj.png",         invert: false },
  { name: "Romany Olive",    file: "romany-olive.png", invert: false },
  { name: "E-Store",         file: "e-store.png",      invert: false },
  { name: "عود الصفوة",     file: "oud-safwa.png",    invert: false },
  { name: "Banafa for Oud",  file: "banafa-oud.png",   invert: true  },
  { name: "السعودي ترند",   file: "saudi-trend.png",  invert: false },
  { name: "Bronze Abaya",    file: "bronze-abaya.png", invert: false },
];

/* ─────────────────────────────────────────
   Platform & payment logos — /public/logos/
   ───────────────────────────────────────── */
const LOGOS_ROW3 = [
  { name: "Salla",          file: "Salla2-01.png",          invert: true  },
  { name: "Zid",            file: "Zid-En-01.png",          invert: true  },
  { name: "Google",         file: "google.png",             invert: false },
  { name: "Meta",           file: "meta.png",               invert: false },
  { name: "Al Rajhi Bank",  file: "Al-Rajhi.png",           invert: true  },
  { name: "Alinma Bank",    file: "Alinma.png",             invert: true  },
  { name: "D360",           file: "D360.png",               invert: true  },
  { name: "Fawry",          file: "Fawry.png",              invert: false },
  { name: "Enjaz",          file: "Enjaz.png",              invert: true  },
  { name: "Bank Al-Bilad",  file: "Bank-Albilad-01-1.png",  invert: true  },
  { name: "Western Union",  file: "western Union-01.png",   invert: true  },
  { name: "Arab Bank",      file: "Arab Bank.png",          invert: true  },
];

type Partner = { name: string; file: string; invert: boolean };

function PartnerLogo({ partner, basePath = "/partners/" }: { partner: Partner; basePath?: string }) {
  return (
    <div
      className="partner-logo-item"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        height: "64px",
        padding: "0 40px",
        opacity: 0.55,
        transition: "opacity 0.3s ease",
        borderLeft: "1px solid rgba(255,255,255,0.04)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.55"; }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}${partner.file}`}
        alt={partner.name}
        style={{
          height: "40px",
          width: "auto",
          maxWidth: "140px",
          objectFit: "contain",
          filter: partner.invert
            ? "brightness(0) invert(1)"
            : "brightness(1.1) saturate(0.9)",
          display: "block",
        }}
        loading="lazy"
      />
    </div>
  );
}

/* triplicate for seamless scroll */
function buildRow(arr: Partner[]) {
  return [...arr, ...arr, ...arr];
}

export default function PartnersMarquee() {
  const t = useTranslations("partners");
  const row1 = buildRow(PARTNERS_ROW1);
  const row2 = buildRow(PARTNERS_ROW2);
  const row3 = buildRow(LOGOS_ROW3);

  return (
    <section
      className="partners-section"
      style={{
        background: "#0A0A0A",
        padding: "80px 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(200,169,98,0.08)",
        borderBottom: "1px solid rgba(200,169,98,0.08)",
        position: "relative",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .partners-fade-left,
          .partners-fade-right {
            width: 60px !important;
          }
          .partner-logo-item {
            padding: 0 20px !important;
            height: 52px !important;
          }
          .partner-logo-item img {
            height: 30px !important;
            max-width: 100px !important;
          }
          .partners-section {
            padding: 48px 0 !important;
          }
          .partners-title-area {
            margin-bottom: 28px !important;
            padding: 0 16px !important;
          }
          .partners-divider {
            padding: 0 16px !important;
            margin-bottom: 20px !important;
          }
        }
      `}</style>
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,169,98,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Title */}
      <div className="partners-title-area max-w-[1400px] mx-auto px-8 mb-14 relative z-10">
        <div className="flex items-center justify-center gap-5">
          <div
            style={{
              flex: 1,
              maxWidth: "120px",
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(200,169,98,0.3))",
            }}
          />
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "11px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "rgba(200,169,98,0.55)",
              whiteSpace: "nowrap",
            }}
          >
            {t("title")}
          </div>
          <div
            style={{
              flex: 1,
              maxWidth: "120px",
              height: "1px",
              background: "linear-gradient(to left, transparent, rgba(200,169,98,0.3))",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "8px",
            fontFamily: "Space Mono, monospace",
            fontSize: "10px",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.12)",
          }}
        >
          +50 BRAND
        </div>
      </div>

      {/* Fade edges */}
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          className={side === "left" ? "partners-fade-left" : "partners-fade-right"}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            [side]: 0,
            width: "160px",
            background: `linear-gradient(to ${side === "left" ? "right" : "left"}, #0A0A0A 0%, transparent 100%)`,
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Row 1 → */}
      <div style={{ overflow: "hidden", marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            animation: "marquee 50s linear infinite",
            width: "max-content",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "running";
          }}
        >
          {row1.map((p, i) => (
            <PartnerLogo key={`r1-${i}`} partner={p} />
          ))}
        </div>
      </div>

      {/* Row 2 ← */}
      <div style={{ overflow: "hidden", marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            animation: "marquee-reverse 40s linear infinite",
            width: "max-content",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "running";
          }}
        >
          {row2.map((p, i) => (
            <PartnerLogo key={`r2-${i}`} partner={p} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="partners-divider" style={{
        maxWidth: "1400px", margin: "0 auto 28px", padding: "0 40px",
        display: "flex", alignItems: "center", gap: "20px",
      }}>
        <div style={{ flex: 1, height: "1px", background: "rgba(200,169,98,0.08)" }} />
        <span style={{
          fontFamily: "Space Mono, monospace", fontSize: "9px",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(200,169,98,0.3)", whiteSpace: "nowrap",
        }}>
          PLATFORMS &amp; INTEGRATIONS
        </span>
        <div style={{ flex: 1, height: "1px", background: "rgba(200,169,98,0.08)" }} />
      </div>

      {/* Row 3 → (platforms & payment logos) */}
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            animation: "marquee 35s linear infinite",
            width: "max-content",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "running";
          }}
        >
          {row3.map((p, i) => (
            <PartnerLogo key={`r3-${i}`} partner={p} basePath="/logos/" />
          ))}
        </div>
      </div>
    </section>
  );
}
