"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

/* Previously this was a hard-coded Arabic dead end on a near-black
   background — off-identity, wrong language for /en and /fr, and offering a
   single link back to the homepage. */
const copy = {
  ar: {
    kicker: "خطأ 404",
    title: "الصفحة غير موجودة",
    body: "الرابط الذي فتحته قد يكون قديمًا أو تغيّر. جرّب أحد المسارات التالية:",
    home: "الصفحة الرئيسية",
    links: [
      ["الخدمات", "#services"],
      ["ثيم سِدرة", "/sidra-theme"],
      ["متجر الخدمات", "/store"],
      ["المدونة", "/blog"],
    ],
  },
  en: {
    kicker: "Error 404",
    title: "This page doesn’t exist",
    body: "The link you opened may be outdated or have changed. Try one of these instead:",
    home: "Homepage",
    links: [
      ["Services", "#services"],
      ["SIDRA theme", "/sidra-theme"],
      ["Store", "/store"],
      ["Blog", "/blog"],
    ],
  },
  fr: {
    kicker: "Erreur 404",
    title: "Cette page n’existe pas",
    body: "Le lien que vous avez ouvert est peut-être obsolète. Essayez plutôt :",
    home: "Accueil",
    links: [
      ["Services", "#services"],
      ["Thème SIDRA", "/sidra-theme"],
      ["Boutique", "/store"],
      ["Blog", "/blog"],
    ],
  },
} as const;

export default function NotFound() {
  const locale = useLocale();
  const t = copy[locale as keyof typeof copy] ?? copy.en;

  return (
    <div
      style={{
        minHeight: "70vh",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "72px 24px",
      }}
    >
      <p
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "13px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#8A6D00",
          marginBottom: "18px",
        }}
      >
        {t.kicker}
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(30px, 5vw, 48px)",
          fontWeight: 700,
          color: "#111111",
          marginBottom: "14px",
        }}
      >
        {t.title}
      </h1>
      <p style={{ color: "#6B6B6B", fontSize: "16px", lineHeight: 1.85, maxWidth: "46ch", marginBottom: "30px" }}>
        {t.body}
      </p>

      <Link
        href={`/${locale}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          minHeight: "48px",
          padding: "0 30px",
          background: "#F0B100",
          color: "#111111",
          fontWeight: 800,
          borderRadius: "10px",
          textDecoration: "none",
        }}
      >
        {t.home}
      </Link>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginTop: "26px" }}>
        {t.links.map(([label, href]) => (
          <Link
            key={href}
            href={href.startsWith("#") ? `/${locale}${href}` : `/${locale}${href}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: "44px",
              padding: "0 18px",
              border: "1px solid #EAEAE6",
              borderRadius: "999px",
              color: "#111111",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
