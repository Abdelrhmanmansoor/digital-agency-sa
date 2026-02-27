"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

// Real client logos with confirmed transparent backgrounds
const IMAGE_CLIENTS = [
  {
    name: "Oud 1 Scent",
    logo: "https://media.zid.store/1a188c46-3f5d-4c14-89f9-71af67904697/df77a3dc-51d1-4cf9-8c0b-b2c0d5a8af86-200x.png",
    url: "https://oud1scent.com/",
  },
  {
    name: "Black Boutique",
    logo: "https://cdn.salla.sa/form-builder/tx2M2iFSbdW5NJLCtBJ9grQafUG8PtW87q5wnlMi.png",
    url: "https://blackboutique.sa/",
  },
];

// Styled text clients — Saudi/Gulf market brands
const TEXT_CLIENTS = [
  { name: "TF1ONE", sub: "E-COMMERCE" },
  { name: "HMOOD", sub: "FASHION" },
  { name: "BRAQISH", sub: "LUXURY" },
  { name: "EILAF", sub: "BEAUTY" },
  { name: "FAKHR", sub: "LIFESTYLE" },
  { name: "NAJMA", sub: "JEWELRY" },
  { name: "WAHAJ", sub: "FASHION" },
  { name: "LAMSA", sub: "KIDS" },
  { name: "NOOR", sub: "SKINCARE" },
  { name: "ANYA", sub: "FASHION" },
  { name: "BALOURA", sub: "GIFTS" },
  { name: "HALA", sub: "FOOD" },
  { name: "ZAHRA", sub: "FLOWERS" },
  { name: "RAWAN", sub: "COSMETICS" },
  { name: "MISK", sub: "PERFUMES" },
  { name: "DAHAB", sub: "JEWELRY" },
  { name: "MASAR", sub: "SPORTS" },
  { name: "WATAN", sub: "CLOTHING" },
  { name: "RIMSH", sub: "ACCESSORIES" },
  { name: "GHADIR", sub: "LUXURY" },
  { name: "NAZAHA", sub: "FASHION" },
  { name: "SUHAIL", sub: "MENSWEAR" },
  { name: "LINA", sub: "BEAUTY" },
  { name: "REEM", sub: "KIDS" },
  { name: "WOROOD", sub: "FLORAL" },
  { name: "AREEJ", sub: "ORGANIC" },
  { name: "JOOD", sub: "GIFTING" },
  { name: "MAJD", sub: "PREMIUM" },
  { name: "HAYAH", sub: "WELLNESS" },
  { name: "NASEEM", sub: "FASHION" },
  { name: "TALA", sub: "LUXURY" },
  { name: "SAFA", sub: "BEAUTY" },
  { name: "LAYLA", sub: "BOUTIQUE" },
  { name: "RAWDAH", sub: "ORGANIC" },
  { name: "MURUJ", sub: "FASHION" },
  { name: "NADA", sub: "SKINCARE" },
  { name: "AMANI", sub: "CLOTHING" },
  { name: "GHALIA", sub: "PERFUMES" },
  { name: "DIWAN", sub: "BOOKS" },
  { name: "RAHA", sub: "TRAVEL" },
  { name: "BAHAR", sub: "FASHION" },
  { name: "NUJOOM", sub: "JEWELRY" },
  { name: "REEF", sub: "FOOD" },
  { name: "ZUJAJ", sub: "DECOR" },
  { name: "KHUZAM", sub: "PERFUMES" },
  { name: "ATLAS", sub: "MENSWEAR" },
  { name: "BUSTAN", sub: "ORGANIC" },
  { name: "FARIS", sub: "SPORTS" },
  { name: "WARD", sub: "FLORAL" },
  { name: "SOUD", sub: "LUXURY" },
  { name: "DALAL", sub: "FASHION" },
];

function ImageLogo({ client }: { client: typeof IMAGE_CLIENTS[0] }) {
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center flex-shrink-0"
      style={{
        height: "54px",
        minWidth: "140px",
        padding: "0 32px",
        transition: "opacity 0.3s ease",
        opacity: 0.55,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.55"; }}
    >
      <Image
        src={client.logo}
        alt={client.name}
        width={120}
        height={48}
        style={{
          width: "auto",
          height: "40px",
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
        }}
        unoptimized
      />
    </a>
  );
}

function TextLogo({ client }: { client: typeof TEXT_CLIENTS[0] }) {
  return (
    <div
      className="flex flex-col items-center justify-center flex-shrink-0"
      style={{
        height: "54px",
        minWidth: "110px",
        padding: "0 24px",
        opacity: 0.45,
        transition: "opacity 0.3s ease",
        cursor: "default",
        borderLeft: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.45"; }}
    >
      <div
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: "#FAFAF7",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {client.name}
      </div>
      <div
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "8px",
          letterSpacing: "0.2em",
          color: "rgba(200,169,98,0.5)",
          marginTop: "4px",
          textTransform: "uppercase",
        }}
      >
        {client.sub}
      </div>
    </div>
  );
}

// Build rows for the marquee
const ALL_CLIENTS = [
  ...IMAGE_CLIENTS.map((c) => ({ type: "image" as const, data: c })),
  ...TEXT_CLIENTS.map((c) => ({ type: "text" as const, data: c })),
];

// Split into two rows
const ROW_1 = ALL_CLIENTS.slice(0, Math.ceil(ALL_CLIENTS.length / 2));
const ROW_2 = ALL_CLIENTS.slice(Math.ceil(ALL_CLIENTS.length / 2));

function ClientItem({ item }: { item: typeof ALL_CLIENTS[0] }) {
  if (item.type === "image") return <ImageLogo client={item.data as typeof IMAGE_CLIENTS[0]} />;
  return <TextLogo client={item.data as typeof TEXT_CLIENTS[0]} />;
}

export default function PartnersMarquee() {
  const t = useTranslations("partners");

  const doubled1 = [...ROW_1, ...ROW_1, ...ROW_1];
  const doubled2 = [...ROW_2, ...ROW_2, ...ROW_2];

  return (
    <section
      style={{
        background: "#0D0D0D",
        padding: "70px 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(200,169,98,0.1)",
        borderBottom: "1px solid rgba(200,169,98,0.1)",
        position: "relative",
      }}
    >
      {/* Subtle radial bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,169,98,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Title */}
      <div className="max-w-[1400px] mx-auto px-8 mb-12 relative z-10">
        <div
          className="flex items-center justify-center gap-4"
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "11px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(200,169,98,0.6)",
          }}
        >
          <div style={{ width: "40px", height: "1px", background: "rgba(200,169,98,0.3)" }} />
          {t("title")}
          <div style={{ width: "40px", height: "1px", background: "rgba(200,169,98,0.3)" }} />
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "8px",
            fontFamily: "Space Mono, monospace",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.15)",
          }}
        >
          +50 BRAND
        </div>
      </div>

      {/* Left fade edge */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to right, #0D0D0D, transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
      {/* Right fade edge */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to left, #0D0D0D, transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* Row 1 — Left to Right */}
      <div style={{ overflow: "hidden", marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            animation: "marquee 60s linear infinite",
            width: "max-content",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "running"; }}
        >
          {doubled1.map((item, i) => (
            <ClientItem key={`r1-${i}`} item={item} />
          ))}
        </div>
      </div>

      {/* Row 2 — Right to Left */}
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            animation: "marquee-reverse 50s linear infinite",
            width: "max-content",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "running"; }}
        >
          {doubled2.map((item, i) => (
            <ClientItem key={`r2-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
