"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

/* ─── Primary 5 payment methods shown prominently ─── */
const PRIMARY_PAYMENTS = [
  {
    id: "visa",
    name: "Visa",
    src: "/payments/visa.png",
    gradient: "linear-gradient(135deg, #1a1f71 0%, #2952be 100%)",
    glow: "rgba(41,82,190,0.35)",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    src: "/payments/mastercard.png",
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
    glow: "rgba(255,90,0,0.25)",
  },
  {
    id: "mada",
    name: "Mada",
    src: "/payments/mada.png",
    gradient: "linear-gradient(135deg, #005baa 0%, #0073d6 100%)",
    glow: "rgba(0,91,170,0.35)",
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    src: "/payments/apple-pay.png",
    gradient: "linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)",
    glow: "rgba(255,255,255,0.1)",
  },
  {
    id: "stc-pay",
    name: "STC Pay",
    src: "/payments/stc-pay.png",
    gradient: "linear-gradient(135deg, #5a0075 0%, #8b00b0 100%)",
    glow: "rgba(139,0,176,0.35)",
  },
];

/* ─── Secondary / banks shown smaller ─── */
const SECONDARY_PAYMENTS = [
  { id: "tabby",      name: "Tabby",      src: "/payments/tabby.png"      },
  { id: "tamara",     name: "Tamara",     src: "/payments/tamara.png"     },
  { id: "d360",       name: "D360",       src: "/payments/d360.png"       },
  { id: "alrajhi",    name: "Al Rajhi",   src: "/payments/alrajhi.png"    },
  { id: "alinma",     name: "Alinma",     src: "/payments/alinma.png"     },
  { id: "bank-albilad", name: "Albilad",  src: "/payments/bank-albilad.png" },
];

/* ─── For backward compat — old code imports PAYMENT_METHODS ─── */
export const PAYMENT_METHODS = [
  ...PRIMARY_PAYMENTS,
  ...SECONDARY_PAYMENTS,
  { id: "fawry",       name: "Fawry",       src: "/payments/fawry.png"       },
  { id: "enjaz",       name: "Enjaz",       src: "/payments/enjaz.png"       },
  { id: "western-union", name: "Western Union", src: "/payments/western-union.png" },
  { id: "arab-bank",   name: "Arab Bank",   src: "/payments/arab-bank.png"   },
  { id: "banque-du-caire", name: "Banque Caire", src: "/payments/banque-du-caire.png" },
];

interface Props {
  variant?: "footer" | "section" | "compact" | "grid" | "luxury";
  showTitle?: boolean;
  columns?: 4 | 5 | 6 | 8;
}

/* ─────────────────────────────── LUXURY 3D CARD ─────────────────────────────── */
function LuxuryPaymentCard({ method, idx }: { method: typeof PRIMARY_PAYMENTS[0]; idx: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "140px", height: "88px",
        borderRadius: "14px",
        background: method.gradient,
        border: `1px solid ${hovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "default", flexShrink: 0,
        transition: "all 0.3s cubic-bezier(0.19,1,0.22,1)",
        transform: hovered ? "translateY(-6px) scale(1.04)" : "none",
        boxShadow: hovered
          ? `0 20px 48px ${method.glow}, 0 0 0 1px rgba(255,255,255,0.12)`
          : `0 8px 24px rgba(0,0,0,0.4)`,
        animationDelay: `${idx * 0.1}s`,
        overflow: "hidden",
      }}
    >
      {/* Glass shine */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "45%",
        background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
        borderRadius: "14px 14px 0 0", pointerEvents: "none",
      }} />
      {/* Chip detail */}
      <div style={{
        position: "absolute", top: "10px",
        left: "12px",
        width: "20px", height: "16px", borderRadius: "3px",
        background: "linear-gradient(135deg, rgba(255,215,0,0.5), rgba(255,215,0,0.2))",
        border: "1px solid rgba(255,215,0,0.3)",
      }} />
      {/* Logo */}
      <PaymentImg src={method.src} name={method.name} size={48} />
    </div>
  );
}

/* ─────────────────────────────── COMPACT CARD ─────────────────────────────── */
function PaymentCard({ method, compact = false }: { method: (typeof PAYMENT_METHODS)[number]; compact?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff", borderRadius: "10px",
        padding: compact ? "10px 8px" : "14px 10px",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "6px", cursor: "default",
        minWidth: compact ? "64px" : "80px",
        border: "1px solid rgba(0,0,0,0.05)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <PaymentImg src={method.src} name={method.name} size={compact ? 22 : 30} />
      <span style={{
        fontFamily: "'Zain', sans-serif", fontSize: compact ? "10px" : "11px",
        fontWeight: 500, color: "#4a5568", textAlign: "center",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%",
      }}>
        {method.name}
      </span>
    </div>
  );
}

/* ─────────────────────────────── IMAGE WITH FALLBACK ─────────────────────────── */
function PaymentImg({ src, name, size }: { src: string; name: string; size: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <span style={{
      fontFamily: "Space Mono, monospace", fontSize: "10px",
      fontWeight: 700, color: "#fff", textAlign: "center",
      letterSpacing: "0.05em", lineHeight: 1.2,
    }}>
      {name}
    </span>
  );
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src} alt={name} onError={() => setFailed(true)}
      style={{ height: `${size}px`, width: "auto", maxWidth: "80px", objectFit: "contain" }}
    />
  );
}

/* ─────────────────────────────── MAIN EXPORT ─────────────────────────────── */
export default function PaymentLogos({ variant = "luxury", showTitle = true }: Props) {
  const locale = useLocale();
  const isRTL  = locale === "ar";

  /* ── LUXURY (default, used in MidCTA / standalone section) ── */
  if (variant === "luxury" || variant === "grid" || variant === "section") {
    return (
      <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {showTitle && (
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(163,255,18,0.08)", border: "1px solid rgba(163,255,18,0.2)",
              borderRadius: "100px", padding: "5px 16px", marginBottom: "16px",
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A3FF12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A3FF12" }}>
                {isRTL ? "دفع آمن 100%" : "100% Secure Payment"}
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "clamp(22px, 3vw, 34px)",
              fontWeight: 800, color: "#FAFAF7", margin: "0 0 10px",
            }}>
              {isRTL ? "ادفع بالطريقة التي تناسبك" : "Pay Your Way"}
            </h2>
            <p style={{ fontFamily: "'Zain', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.38)", margin: 0 }}>
              {isRTL ? "نقبل جميع طرق الدفع المحلية والدولية" : "We accept all local & international payment methods"}
            </p>
          </div>
        )}

        {/* Primary 3D cards */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "16px",
          justifyContent: "center", marginBottom: "32px",
        }}>
          {PRIMARY_PAYMENTS.map((m, i) => (
            <LuxuryPaymentCard key={m.id} method={m} idx={i} />
          ))}
        </div>

        {/* Trust badge */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "100px", padding: "8px 20px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A3FF12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
            </svg>
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>
              {isRTL
                ? "جميع المعاملات مشفرة بتقنية SSL 256-bit — دفعك آمن 100%"
                : "All transactions encrypted with SSL 256-bit — 100% secure payments"}
            </span>
          </div>
        </div>

        {/* Secondary smaller logos */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginTop: "24px", opacity: 0.6 }}>
          {SECONDARY_PAYMENTS.map((m) => (
            <div key={m.id} style={{
              background: "rgba(255,255,255,0.06)", borderRadius: "8px",
              padding: "6px 14px", display: "flex", alignItems: "center", gap: "6px",
            }}>
              <PaymentImg src={m.src} name={m.name} size={16} />
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}>
                {m.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── FOOTER variant — small flat logos ── */
  if (variant === "footer") {
    return (
      <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
        {showTitle && (
          <div style={{
            fontFamily: "Space Mono, monospace", fontSize: "10px",
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: "#C8A962", marginBottom: "12px",
          }}>
            {isRTL ? "طرق الدفع المقبولة" : "Accepted Payments"}
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {PAYMENT_METHODS.map((m) => (
            <PaymentCard key={m.id} method={m} compact />
          ))}
        </div>
      </div>
    );
  }

  /* ── COMPACT variant ── */
  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr" }}>
      {showTitle && (
        <div style={{
          fontFamily: "'Zain', sans-serif", fontSize: "13px",
          color: "rgba(255,255,255,0.4)", marginBottom: "10px",
        }}>
          {isRTL ? "نقبل جميع طرق الدفع" : "We accept all payment methods"}
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {PAYMENT_METHODS.slice(0, 8).map((m) => (
          <PaymentCard key={m.id} method={m} compact />
        ))}
      </div>
    </div>
  );
}
