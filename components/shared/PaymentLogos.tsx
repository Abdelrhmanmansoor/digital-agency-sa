"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

// Available payment methods — images go in /public/payments/
// Banks/gateways with confirmed images in /public/payments/:
// alinma.png, alrajhi.png, arab-bank.png, bank-albilad.png,
// banque-du-caire.png, d360.png, enjaz.png, fawry.png, western-union.png
export const PAYMENT_METHODS = [
  // ─── بوابات الدفع الإلكترونية ───
  { id: "visa",          name: "VISA",          src: "/payments/visa.png"          },
  { id: "mastercard",    name: "Mastercard",    src: "/payments/mastercard.png"    },
  { id: "mada",          name: "Mada",          src: "/payments/mada.png"          },
  { id: "apple-pay",     name: "Apple Pay",     src: "/payments/apple-pay.png"     },
  { id: "stc-pay",       name: "STC Pay",       src: "/payments/stc-pay.png"       },
  { id: "d360",          name: "D360",          src: "/payments/d360.png"          },
  { id: "fawry",         name: "Fawry",         src: "/payments/fawry.png"         },
  { id: "enjaz",         name: "Enjaz",         src: "/payments/enjaz.png"         },
  { id: "western-union", name: "Western Union", src: "/payments/western-union.png" },
  // ─── البنوك السعودية ───
  { id: "alrajhi",       name: "Al Rajhi",      src: "/payments/alrajhi.png"       },
  { id: "alinma",        name: "Alinma",        src: "/payments/alinma.png"        },
  { id: "bank-albilad",  name: "Bank Albilad",  src: "/payments/bank-albilad.png"  },
  // ─── بنوك عربية ───
  { id: "arab-bank",     name: "Arab Bank",     src: "/payments/arab-bank.png"     },
  { id: "banque-du-caire", name: "Banque Caire", src: "/payments/banque-du-caire.png" },
];

interface Props {
  variant?: "footer" | "section" | "compact" | "grid";
  showTitle?: boolean;
  columns?: 4 | 5 | 6 | 8;
}

export default function PaymentLogos({
  variant = "grid",
  showTitle = true,
}: Props) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  if (variant === "grid") {
    return (
      <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {showTitle && (
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h2 style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 700,
              color: "#1a1a2e",
              margin: 0,
            }}>
              {isRTL ? "طرق الدفع المتاحة" : "Available Payment Methods"}
            </h2>
            <p style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "15px",
              color: "#666",
              marginTop: "6px",
            }}>
              {isRTL ? "نقبل جميع طرق الدفع المحلية والدولية" : "We accept all local and international payment methods"}
            </p>
          </div>
        )}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
          gap: "12px",
          maxWidth: "860px",
          margin: "0 auto",
        }}>
          {PAYMENT_METHODS.map((method) => (
            <PaymentCard key={method.id} method={method} />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {showTitle && (
          <div style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#C8A962",
            marginBottom: "12px",
          }}>
            {isRTL ? "طرق الدفع المقبولة" : "Accepted Payments"}
          </div>
        )}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}>
          {PAYMENT_METHODS.map((method) => (
            <PaymentCard key={method.id} method={method} compact />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {showTitle && (
          <div style={{
            fontFamily: "'Zain', sans-serif",
            fontSize: "13px",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "10px",
          }}>
            {isRTL ? "نقبل جميع طرق الدفع" : "We accept all payment methods"}
          </div>
        )}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}>
          {PAYMENT_METHODS.slice(0, 8).map((method) => (
            <PaymentCard key={method.id} method={method} compact />
          ))}
        </div>
      </div>
    );
  }

  // Section variant — two groups
  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      {showTitle && (
        <div style={{ marginBottom: "28px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(200,169,98,0.08)",
            border: "1px solid rgba(200,169,98,0.2)",
            borderRadius: "20px",
            padding: "6px 16px",
            marginBottom: "12px",
          }}>
            <span style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C8A962",
            }}>
              {isRTL ? "طرق الدفع المقبولة" : "Accepted Payment Methods"}
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Zain', sans-serif",
            fontSize: "clamp(22px, 3vw, 34px)",
            fontWeight: 800,
            color: "#FAFAF7",
            margin: 0,
          }}>
            {isRTL ? "ادفع بالطريقة التي تناسبك" : "Pay Your Way"}
          </h2>
        </div>
      )}

      <div style={{ marginBottom: "24px" }}>
        <div style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "9px",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}>
          {isRTL ? "بوابات الدفع والمحافظ الإلكترونية" : "Payment Gateways & E-Wallets"}
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
          gap: "12px",
        }}>
          {PAYMENT_METHODS.slice(0, 9).map((method) => (
            <PaymentCard key={method.id} method={method} />
          ))}
        </div>
      </div>

      <div>
        <div style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "9px",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}>
          {isRTL ? "التحويل البنكي والبنوك المعتمدة" : "Bank Transfers & Supported Banks"}
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
          gap: "12px",
        }}>
          {PAYMENT_METHODS.slice(9).map((method) => (
            <PaymentCard key={method.id} method={method} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PaymentCard({
  method,
  compact = false,
}: {
  method: (typeof PAYMENT_METHODS)[number];
  compact?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "10px",
        padding: compact ? "10px 8px" : "14px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.04)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "default",
        minWidth: compact ? "64px" : "80px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
      }}
    >
      {!imgFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={method.src}
          alt={method.name}
          onError={() => setImgFailed(true)}
          style={{
            height: compact ? "24px" : "32px",
            width: "auto",
            maxWidth: "72px",
            objectFit: "contain",
            display: "block",
          }}
        />
      ) : (
        /* Fallback: show name as styled text when image is missing */
        <span style={{
          fontFamily: "Space Mono, monospace",
          fontSize: compact ? "9px" : "10px",
          fontWeight: 700,
          color: "#1a1a2e",
          textAlign: "center",
          letterSpacing: "0.05em",
          lineHeight: 1.2,
        }}>
          {method.name}
        </span>
      )}
      <span style={{
        fontFamily: "'Zain', sans-serif",
        fontSize: compact ? "10px" : "11px",
        fontWeight: 500,
        color: "#4a5568",
        textAlign: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%",
      }}>
        {method.name}
      </span>
    </div>
  );
}
