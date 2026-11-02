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
        background: "linear-gradient(180deg, #cfe9f5 0%, #fbfaf7 70%)",
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
              background: code === "ar" ? "#0B0C0E" : "#FFFFFF",
              border: code === "ar" ? "1px solid #0B0C0E" : "1px solid #E8E4DA",
              borderRadius: "999px",
              color: code === "ar" ? "#FFFFFF" : "#0B0C0E",
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
