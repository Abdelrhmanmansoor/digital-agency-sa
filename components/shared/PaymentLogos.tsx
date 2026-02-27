"use client";

import { useLocale } from "next-intl";

// All logos must be in /public/payments/ — see README in that folder
export const PAYMENT_LOGOS = [
  // ─── بوابات الدفع الرئيسية ───
  { id: "visa",          src: "/payments/visa.png",           alt: "Visa",           width: 80,  bg: "white" },
  { id: "paypal",        src: "/payments/paypal.png",         alt: "PayPal",         width: 90,  bg: "white" },
  { id: "stc-pay",       src: "/payments/stc-pay.png",        alt: "STC Pay",        width: 90,  bg: "white" },
  { id: "barq",          src: "/payments/barq.png",           alt: "Barq",           width: 80,  bg: "#0A0A0A" },
  { id: "fawry",         src: "/payments/fawry.png",          alt: "Fawry",          width: 90,  bg: "white" },
  { id: "western-union", src: "/payments/western-union.png",  alt: "Western Union",  width: 110, bg: "white" },
  { id: "enjaz",         src: "/payments/enjaz.png",          alt: "Enjaz",          width: 90,  bg: "white" },
  { id: "d360",          src: "/payments/d360.png",           alt: "D360",           width: 70,  bg: "white" },
  // ─── البنوك السعودية ───
  { id: "alrajhi",       src: "/payments/alrajhi.png",        alt: "Al Rajhi Bank",  width: 100, bg: "white" },
  { id: "riyad-bank",    src: "/payments/riyad-bank.png",     alt: "Riyad Bank",     width: 110, bg: "white" },
  { id: "bank-albilad",  src: "/payments/bank-albilad.png",   alt: "Bank Albilad",   width: 110, bg: "white" },
  { id: "alinma",        src: "/payments/alinma.png",         alt: "Alinma Bank",    width: 100, bg: "white" },
  // ─── بنوك عربية وعالمية ───
  { id: "arab-bank",         src: "/payments/arab-bank.png",         alt: "Arab Bank",          width: 100, bg: "white" },
  { id: "banque-du-caire",   src: "/payments/banque-du-caire.png",   alt: "Banque du Caire",    width: 110, bg: "white" },
  { id: "cib",               src: "/payments/cib.png",               alt: "CIB",                width: 70,  bg: "white" },
  { id: "alexbank",          src: "/payments/alexbank.png",          alt: "AlexBank",           width: 100, bg: "white" },
  { id: "bank-of-georgia",   src: "/payments/bank-of-georgia.png",   alt: "Bank of Georgia",    width: 110, bg: "white" },
  { id: "tbc-bank",          src: "/payments/tbc-bank.png",          alt: "TBC Bank",           width: 100, bg: "white" },
];

interface Props {
  variant?: "footer" | "section" | "compact";
  showTitle?: boolean;
}

export default function PaymentLogos({ variant = "section", showTitle = true }: Props) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  if (variant === "footer") {
    return (
      <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {showTitle && (
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C8A962", marginBottom: "14px" }}>
            {isRTL ? "طرق الدفع المقبولة" : "Accepted Payments"}
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
          {PAYMENT_LOGOS.map((logo) => (
            <div
              key={logo.id}
              style={{
                background: logo.bg === "white" ? "white" : logo.bg,
                borderRadius: "6px",
                padding: "5px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "32px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.width * 0.6}
                height={20}
                style={{ display: "block", objectFit: "contain", maxWidth: "100%", height: "auto", maxHeight: "20px" }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    // Just the main payment icons — no banks
    const main = PAYMENT_LOGOS.slice(0, 8);
    return (
      <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {showTitle && (
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>
            {isRTL ? "نقبل جميع طرق الدفع" : "We accept all payment methods"}
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
          {main.map((logo) => (
            <div
              key={logo.id}
              style={{
                background: logo.bg === "white" ? "white" : logo.bg,
                borderRadius: "6px",
                padding: "5px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "34px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.width * 0.65}
                height={22}
                style={{ display: "block", objectFit: "contain", maxWidth: "100%", height: "auto", maxHeight: "22px" }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Full section variant
  const gateways = PAYMENT_LOGOS.slice(0, 8);
  const banks = PAYMENT_LOGOS.slice(8);

  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      {showTitle && (
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(200,169,98,0.08)", border: "1px solid rgba(200,169,98,0.2)", borderRadius: "20px", padding: "6px 16px", marginBottom: "14px" }}>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A962" }}>
              {isRTL ? "طرق الدفع المقبولة" : "Accepted Payment Methods"}
            </span>
          </div>
          <h2 style={{ fontFamily: "'Zain', sans-serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>
            {isRTL ? "ادفع بالطريقة التي تناسبك" : "Pay Your Way"}
          </h2>
        </div>
      )}

      {/* Gateways & e-wallets */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px" }}>
          {isRTL ? "بوابات الدفع والمحافظ الإلكترونية" : "Payment Gateways & E-Wallets"}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
          {gateways.map((logo) => (
            <LogoCard key={logo.id} logo={logo} />
          ))}
        </div>
      </div>

      {/* Banks */}
      <div>
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px" }}>
          {isRTL ? "التحويل البنكي والبنوك المعتمدة" : "Bank Transfers & Supported Banks"}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
          {banks.map((logo) => (
            <LogoCard key={logo.id} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LogoCard({ logo }: { logo: typeof PAYMENT_LOGOS[number] }) {
  return (
    <div
      style={{
        background: logo.bg === "white" ? "white" : logo.bg,
        borderRadius: "10px",
        padding: "10px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "52px",
        minWidth: "90px",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={32}
        style={{ display: "block", objectFit: "contain", maxWidth: "100%", height: "auto", maxHeight: "32px" }}
      />
    </div>
  );
}
