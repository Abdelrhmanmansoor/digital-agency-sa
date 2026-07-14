"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

const PAYMENT_METHODS = [
  { id: "visa", name: "Visa", src: "/payments/visa.png" },
  { id: "mastercard", name: "Mastercard", src: "/payments/mastercard.png" },
  { id: "mada", name: "Mada", src: "/payments/mada.png" },
  { id: "apple-pay", name: "Apple Pay", src: "/payments/apple-pay.png" },
  { id: "stc-pay", name: "STC Pay", src: "/payments/stc-pay.png" },
  { id: "tabby", name: "Tabby", src: "/payments/tabby.png" },
  { id: "tamara", name: "Tamara", src: "/payments/tamara.png" },
  { id: "alrajhi", name: "Al Rajhi", src: "/payments/alrajhi.png" },
  { id: "alinma", name: "Alinma", src: "/payments/alinma.png" },
  { id: "albilad", name: "Albilad", src: "/payments/bank-albilad.png" },
  { id: "fawry", name: "Fawry", src: "/payments/fawry.png" },
  { id: "enjaz", name: "Enjaz", src: "/payments/enjaz.png" },
];

interface Props {
  variant?: "footer" | "section" | "compact" | "grid" | "luxury";
  showTitle?: boolean;
  columns?: 4 | 5 | 6 | 8;
}

function PaymentBox({ name, src }: { name: string; src?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      style={{
        width: "80px",
        height: "60px",
        background: "#FFFFFF",
        border: "1px solid #EEE",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
      }}
    >
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      ) : (
        <span
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "10px",
            fontWeight: 700,
            color: "#1A1A1A",
            letterSpacing: "0.04em",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {name}
        </span>
      )}
    </div>
  );
}

export default function PaymentLogos({ variant = "grid", showTitle = true }: Props) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const title =
    locale === "ar" ? "طرق الدفع المتاحة" : locale === "fr" ? "Moyens de paiement" : "Payment Methods";

  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      {showTitle && (
        <div
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6B6B6B",
            marginBottom: "14px",
            textAlign: "center",
          }}
        >
          {title}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
          gap: "12px",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        {PAYMENT_METHODS.map((method) => (
          <PaymentBox key={method.id} name={method.name} src={method.src} />
        ))}
      </div>
    </div>
  );
}
