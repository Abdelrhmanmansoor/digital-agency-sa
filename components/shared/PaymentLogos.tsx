"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

export const PAYMENT_LOGOS = [
  // ─── بوابات الدفع ───
  { id: "visa",          src: "/payments/visa.png",           alt: "Visa"           },
  { id: "paypal",        src: "/payments/paypal.png",         alt: "PayPal"         },
  { id: "stc-pay",       src: "/payments/stc-pay.png",        alt: "STC Pay"        },
  { id: "barq",          src: "/payments/barq.png",           alt: "Barq"           },
  { id: "fawry",         src: "/payments/fawry.png",          alt: "Fawry"          },
  { id: "western-union", src: "/payments/western-union.png",  alt: "Western Union"  },
  { id: "enjaz",         src: "/payments/enjaz.png",          alt: "Enjaz"          },
  { id: "d360",          src: "/payments/d360.png",           alt: "D360"           },
  // ─── البنوك السعودية ───
  { id: "alrajhi",       src: "/payments/alrajhi.png",        alt: "Al Rajhi Bank"  },
  { id: "riyad-bank",    src: "/payments/riyad-bank.png",     alt: "Riyad Bank"     },
  { id: "bank-albilad",  src: "/payments/bank-albilad.png",   alt: "Bank Albilad"   },
  { id: "alinma",        src: "/payments/alinma.png",         alt: "Alinma Bank"    },
  // ─── بنوك عربية وعالمية ───
  { id: "arab-bank",       src: "/payments/arab-bank.png",       alt: "Arab Bank"       },
  { id: "banque-du-caire", src: "/payments/banque-du-caire.png", alt: "Banque du Caire" },
  { id: "cib",             src: "/payments/cib.png",             alt: "CIB"             },
  { id: "alexbank",        src: "/payments/alexbank.png",        alt: "AlexBank"        },
  { id: "bank-of-georgia", src: "/payments/bank-of-georgia.png", alt: "Bank of Georgia" },
  { id: "tbc-bank",        src: "/payments/tbc-bank.png",        alt: "TBC Bank"        },
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
          {PAYMENT_LOGOS.map((logo) => (
            <LogoItem key={logo.id} logo={logo} h={28} />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {showTitle && (
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>
            {isRTL ? "نقبل جميع طرق الدفع" : "We accept all payment methods"}
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
          {PAYMENT_LOGOS.slice(0, 8).map((logo) => (
            <LogoItem key={logo.id} logo={logo} h={28} />
          ))}
        </div>
      </div>
    );
  }

  // Full section
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

      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
          {isRTL ? "بوابات الدفع والمحافظ الإلكترونية" : "Payment Gateways & E-Wallets"}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", alignItems: "center" }}>
          {PAYMENT_LOGOS.slice(0, 8).map((logo) => (
            <LogoItem key={logo.id} logo={logo} h={40} />
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
          {isRTL ? "التحويل البنكي والبنوك المعتمدة" : "Bank Transfers & Supported Banks"}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", alignItems: "center" }}>
          {PAYMENT_LOGOS.slice(8).map((logo) => (
            <LogoItem key={logo.id} logo={logo} h={40} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LogoItem({
  logo,
  h,
}: {
  logo: (typeof PAYMENT_LOGOS)[number];
  h: number;
}) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={logo.alt}
      height={h}
      onError={() => setHidden(true)}
      style={{
        height: `${h}px`,
        width: "auto",
        maxWidth: "120px",
        objectFit: "contain",
        display: "block",
        opacity: 0.85,
        transition: "opacity 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
    />
  );
}
