"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

const FILTER_ID = "pay-no-white";

export const PAYMENT_LOGOS = [
  // ─── بوابات الدفع ───
  { id: "visa",          src: "/payments/visa.png",           alt: "Visa",           w: 64  },
  { id: "paypal",        src: "/payments/paypal.png",         alt: "PayPal",         w: 72  },
  { id: "stc-pay",       src: "/payments/stc-pay.png",        alt: "STC Pay",        w: 72  },
  { id: "barq",          src: "/payments/barq.png",           alt: "Barq",           w: 64  },
  { id: "fawry",         src: "/payments/fawry.png",          alt: "Fawry",          w: 72  },
  { id: "western-union", src: "/payments/western-union.png",  alt: "Western Union",  w: 90  },
  { id: "enjaz",         src: "/payments/enjaz.png",          alt: "Enjaz",          w: 72  },
  { id: "d360",          src: "/payments/d360.png",           alt: "D360",           w: 56  },
  // ─── البنوك السعودية ───
  { id: "alrajhi",       src: "/payments/alrajhi.png",        alt: "Al Rajhi",       w: 90  },
  { id: "riyad-bank",    src: "/payments/riyad-bank.png",     alt: "Riyad Bank",     w: 90  },
  { id: "bank-albilad",  src: "/payments/bank-albilad.png",   alt: "Bank Albilad",   w: 90  },
  { id: "alinma",        src: "/payments/alinma.png",         alt: "Alinma",         w: 80  },
  // ─── بنوك عربية وعالمية ───
  { id: "arab-bank",       src: "/payments/arab-bank.png",       alt: "Arab Bank",       w: 80 },
  { id: "banque-du-caire", src: "/payments/banque-du-caire.png", alt: "Banque du Caire", w: 90 },
  { id: "cib",             src: "/payments/cib.png",             alt: "CIB",             w: 56 },
  { id: "alexbank",        src: "/payments/alexbank.png",        alt: "AlexBank",        w: 80 },
  { id: "bank-of-georgia", src: "/payments/bank-of-georgia.png", alt: "Bank of Georgia", w: 90 },
  { id: "tbc-bank",        src: "/payments/tbc-bank.png",        alt: "TBC Bank",        w: 80 },
];

// SVG filter: removes white/near-white pixels → transparent
// For white (1,1,1): alpha = -4-4-4+12-1 = -1 → 0 (transparent) ✓
// For colored pixels: alpha = high → 1 (opaque) ✓
const SvgFilter = () => (
  <svg
    style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    aria-hidden="true"
  >
    <defs>
      <filter id={FILTER_ID} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  -3 -3 -3 10 -0.5"
        />
      </filter>
    </defs>
  </svg>
);

interface Props {
  variant?: "footer" | "section" | "compact";
  showTitle?: boolean;
}

export default function PaymentLogos({ variant = "section", showTitle = true }: Props) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  if (variant === "footer") {
    return (
      <div style={{ direction: isRTL ? "rtl" : "ltr", position: "relative" }}>
        <SvgFilter />
        {showTitle && (
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C8A962", marginBottom: "14px" }}>
            {isRTL ? "طرق الدفع المقبولة" : "Accepted Payments"}
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
          {PAYMENT_LOGOS.map((logo) => (
            <LogoChip key={logo.id} logo={logo} imgH={20} />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    const main = PAYMENT_LOGOS.slice(0, 8);
    return (
      <div style={{ direction: isRTL ? "rtl" : "ltr", position: "relative" }}>
        <SvgFilter />
        {showTitle && (
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>
            {isRTL ? "نقبل جميع طرق الدفع" : "We accept all payment methods"}
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
          {main.map((logo) => (
            <LogoChip key={logo.id} logo={logo} imgH={22} />
          ))}
        </div>
      </div>
    );
  }

  // Full section
  const gateways = PAYMENT_LOGOS.slice(0, 8);
  const banks = PAYMENT_LOGOS.slice(8);

  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr", position: "relative" }}>
      <SvgFilter />

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
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
          {isRTL ? "بوابات الدفع والمحافظ الإلكترونية" : "Payment Gateways & E-Wallets"}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
          {gateways.map((logo) => (
            <LogoChip key={logo.id} logo={logo} imgH={30} />
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
          {isRTL ? "التحويل البنكي والبنوك المعتمدة" : "Bank Transfers & Supported Banks"}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
          {banks.map((logo) => (
            <LogoChip key={logo.id} logo={logo} imgH={30} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LogoChip({
  logo,
  imgH,
}: {
  logo: (typeof PAYMENT_LOGOS)[number];
  imgH: number;
}) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "10px",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: `${imgH + 20}px`,
        flexShrink: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.alt}
        width={logo.w}
        height={imgH}
        onError={() => setHidden(true)}
        style={{
          display: "block",
          objectFit: "contain",
          maxWidth: `${logo.w}px`,
          height: "auto",
          maxHeight: `${imgH}px`,
          filter: `url(#${FILTER_ID})`,
        }}
      />
    </div>
  );
}
