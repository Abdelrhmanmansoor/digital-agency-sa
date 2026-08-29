import Link from "next/link";

/* Root-level 404. Anything that never resolved to a locale segment — a bad
   asset path, a stale link with an extension, a mistyped top-level route —
   used to fall through to Next's unstyled default page: black Helvetica on
   white, no branding and no way back into the site. This one is
   self-contained on purpose: it renders above `[locale]/layout.tsx`, so no
   next-intl provider exists here and nothing may call `useLocale()`.
   Arabic is the site's x-default, with the other two locales offered as
   plain links. */
export const metadata = { title: "404 — AM Design", robots: { index: false, follow: false } };

const LOCALES: [string, string][] = [
  ["ar", "العربية"],
  ["en", "English"],
  ["fr", "Français"],
];

export default function RootNotFound() {
  return (
    <div
      dir="rtl"
      lang="ar"
      style={{
        minHeight: "100dvh",
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
        Error 404
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
        الصفحة غير موجودة
      </h1>
      <p style={{ color: "#6B6B6B", fontSize: "16px", lineHeight: 1.85, maxWidth: "46ch", marginBottom: "30px" }}>
        الرابط الذي فتحته قد يكون قديمًا أو تغيّر. اختر لغة الموقع للمتابعة.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        {LOCALES.map(([code, label]) => (
          <Link
            key={code}
            href={`/${code}`}
            hrefLang={code}
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: "48px",
              padding: "0 26px",
              background: code === "ar" ? "#F0B100" : "#FFFFFF",
              border: code === "ar" ? "1px solid #F0B100" : "1px solid #EAEAE6",
              borderRadius: "10px",
              color: "#111111",
              fontWeight: 700,
              fontSize: "15px",
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
