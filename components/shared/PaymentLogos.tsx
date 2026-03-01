"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

// Available payment methods with their display names
export const PAYMENT_METHODS = [
  // ─── بوابات الدفع الإلكترونية ───  { id: "visa", name: "VISA", src: "/payments/visa.png" },
  { id: "mastercard", name: "Mastercard", src: "/payments/mastercard.png" },
  { id: "paypal", name: "PayPal", src: "/payments/paypal.png" },
  { id: "apple-pay", name: "Apple Pay", src: "/payments/apple-pay.png" },
  { id: "stc-pay", name: "STC Pay", src: "/payments/stc-pay.png" },
  { id: "urpay", name: "URPAY", src: "/payments/urpay.png" },
  { id: "barq", name: "Barq", src: "/payments/barq.png" },
  { id: "fawry", name: "Fawry", src: "/payments/fawry.png" },
  { id: "western-union", name: "Western Union", src: "/payments/western-union.png" },
  { id: "enjaz", name: "Enjaz", src: "/payments/enjaz.png" },
  { id: "d360", name: "D360", src: "/payments/d360.png" },
  { id: "mada", name: "Mada", src: "/payments/mada.png" },
  // ─── البنوك السعودية ───
  { id: "alrajhi", name: "Al Rajhi Bank", src: "/payments/alrajhi.png" },
  { id: "alinma", name: "Alinma Bank", src: "/payments/alinma.png" },
  { id: "bank-albilad", name: "Bank Albilad", src: "/payments/bank-albilad.png" },
  { id: "riyad-bank", name: "Riyad Bank", src: "/payments/riyad-bank.png" },
  // ─── بنوك عربية ───
  { id: "arab-bank", name: "Arab Bank", src: "/payments/arab-bank.png" },
  { id: "banque-du-caire", name: "Banque du Caire", src: "/payments/banque-du-caire.png" },
  { id: "cib", name: "CIB", src: "/payments/cib.png" },
  { id: "alexbank", name: "AlexBank", src: "/payments/alexbank.png" },
];

interface Props {
  variant?: "footer" | "section" | "compact" | "grid";
  showTitle?: boolean;
  columns?: 4 | 5 | 6 | 8;
}

export default function PaymentLogos({ 
  variant = "grid", 
  showTitle = true,
  columns = 6 
}: Props) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Grid layout - organized cards like the reference image
  if (variant === "grid") {
    return (
      <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {showTitle && (
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2 style={{ 
              fontFamily: "'Zain', sans-serif", 
              fontSize: "clamp(24px, 3vw, 32px)", 
              fontWeight: 700, 
              color: "#1a1a2e",
              margin: 0 
            }}>
              {isRTL ? "طرق الدفع المتاحة" : "Available Payment Methods"}
            </h2>
            <p style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "16px",
              color: "#666",
              marginTop: "8px"
            }}>
              {isRTL ? "نقبل جميع طرق الدفع المحلية والدولية" : "We accept all local and international payment methods"}
            </p>
          </div>
        )}
        
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(100px, 1fr))`,
          gap: "16px",
          maxWidth: "900px",
          margin: "0 auto"
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
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C8A962", marginBottom: "14px" }}>
            {isRTL ? "طرق الدفع المقبولة" : "Accepted Payments"}
          </div>
        )}
        <div style={{ 
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(70px, 1fr))`,
          gap: "12px"
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
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>
            {isRTL ? "نقبل جميع طرق الدفع" : "We accept all payment methods"}
          </div>
        )}
        <div style={{ 
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(70px, 1fr))`,
          gap: "10px"
        }}>
          {PAYMENT_METHODS.slice(0, 8).map((method) => (
            <PaymentCard key={method.id} method={method} compact />
          ))}
        </div>
      </div>
    );
  }

  // Full section with categories
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
        <div style={{ 
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(100px, 1fr))`,
          gap: "16px"
        }}>
          {PAYMENT_METHODS.slice(0, 12).map((method) => (
            <PaymentCard key={method.id} method={method} />
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
          {isRTL ? "التحويل البنكي والبنوك المعتمدة" : "Bank Transfers & Supported Banks"}
        </div>
        <div style={{ 
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(100px, 1fr))`,
          gap: "16px"
        }}>
          {PAYMENT_METHODS.slice(12).map((method) => (
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
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: compact ? "12px 8px" : "16px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        border: "1px solid rgba(0, 0, 0, 0.04)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.06)";
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={method.src}
        alt={method.name}
        onError={() => setHidden(true)}
        style={{
          height: compact ? "28px" : "36px",
          width: "auto",
          maxWidth: "80px",
          objectFit: "contain",
          display: "block",
        }}
      />
      <span style={{
        fontFamily: "'Zain', sans-serif",
        fontSize: compact ? "11px" : "12px",
        fontWeight: 500,
        color: "#4a5568",
        textAlign: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%"
      }}>
        {method.name}
      </span>
    </div>
  );
}
