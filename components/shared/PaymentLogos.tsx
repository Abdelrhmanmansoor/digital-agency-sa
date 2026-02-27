"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

export const PAYMENT_LOGOS = [
  // ─── بوابات الدفع الرئيسية ───
  { id: "visa",          src: "/payments/visa.png",           alt: "Visa",           width: 64  },
  { id: "paypal",        src: "/payments/paypal.png",         alt: "PayPal",         width: 72  },
  { id: "stc-pay",       src: "/payments/stc-pay.png",        alt: "STC Pay",        width: 72  },
  { id: "barq",          src: "/payments/barq.png",           alt: "Barq",           width: 64  },
  { id: "fawry",         src: "/payments/fawry.png",          alt: "Fawry",          width: 72  },
  { id: "western-union", src: "/payments/western-union.png",  alt: "Western Union",  width: 90  },
  { id: "enjaz",         src: "/payments/enjaz.png",          alt: "Enjaz",          width: 72  },
  { id: "d360",          src: "/payments/d360.png",           alt: "D360",           width: 56  },
  // ─── البنوك السعودية ───
  { id: "alrajhi",       src: "/payments/alrajhi.png",        alt: "Al Rajhi Bank",  width: 80  },
  { id: "riyad-bank",    src: "/payments/riyad-bank.png",     alt: "Riyad Bank",     width: 90  },
  { id: "bank-albilad",  src: "/payments/bank-albilad.png",   alt: "Bank Albilad",   width: 90  },
  { id: "alinma",        src: "/payments/alinma.png",         alt: "Alinma Bank",    width: 80  },
  // ─── بنوك عربية وعالمية ───
  { id: "arab-bank",       src: "/payments/arab-bank.png",       alt: "Arab Bank",       width: 80  },
  { id: "banque-du-caire", src: "/payments/banque-du-caire.png", alt: "Banque du Caire", width: 90  },
  { id: "cib",             src: "/payments/cib.png",             alt: "CIB",             width: 56  },
  { id: "alexbank",        src: "/payments/alexbank.png",        alt: "AlexBank",        width: 80  },
  { id: "bank-of-georgia", src: "/payments/bank-of-georgia.png", alt: "Bank of Georgia", width: 90  },
  { id: "tbc-bank",        src: "/payments/tbc-bank.png",        alt: "TBC Bank",        width: 80  },
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
          {PAYMENT_LOGOS.map((logo) => (
            <LogoChip key={logo.id} logo={logo} size="sm" />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    const main = PAYMENT_LOGOS.slice(0, 8);
    return (
      <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {showTitle && (
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>
            {isRTL ? "نقبل جميع طرق الدفع" : "We accept all payment methods"}
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
          {main.map((logo) => (
            <LogoChip key={logo.id} logo={logo} size="sm" />
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

      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px" }}>
          {isRTL ? "بوابات الدفع والمحافظ الإلكترونية" : "Payment Gateways & E-Wallets"}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
          {gateways.map((logo) => (
            <LogoChip key={logo.id} logo={logo} size="lg" />
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px" }}>
          {isRTL ? "التحويل البنكي والبنوك المعتمدة" : "Bank Transfers & Supported Banks"}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
          {banks.map((logo) => (
            <LogoChip key={logo.id} logo={logo} size="lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

function LogoChip({
  logo,
  size,
}: {
  logo: (typeof PAYMENT_LOGOS)[number];
  size: "sm" | "lg";
}) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  const height = size === "lg" ? 44 : 30;
  const imgH = size === "lg" ? 28 : 18;
  const px = size === "lg" ? "14px" : "10px";
  const radius = size === "lg" ? "8px" : "6px";

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: radius,
        padding: `0 ${px}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: `${height}px`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
        flexShrink: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={imgH}
        onError={() => setHidden(true)}
        style={{
          display: "block",
          objectFit: "contain",
          maxWidth: `${logo.width}px`,
          height: "auto",
          maxHeight: `${imgH}px`,
        }}
      />
    </div>
  );
}
