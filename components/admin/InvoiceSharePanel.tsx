"use client";

/* لوحة الرابط الخاص داخل صفحة الفاتورة في لوحة التحكم.
   كل ما يخصّ مشاركة الفاتورة في مكان واحد: توليد الرابط، نسخه، إرساله،
   كلمة المرور، تاريخ الانتهاء، والإيقاف الفوري. */

import { useState } from "react";
import type { Invoice } from "@/lib/db";

type ShareState = {
  publicId?: string;
  shareEnabled: boolean;
  shareExpiresAt: string;
  hasPassword: boolean;
  viewCount: number;
  lastViewedAt: string | null;
};

const box: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "14px",
  padding: "24px 28px",
  marginTop: "24px",
  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
};

const label: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  color: "rgba(255,255,255,0.42)",
  fontFamily: "Space Mono, monospace",
  letterSpacing: "0.08em",
  marginBottom: "6px",
};

const input: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  padding: "10px 14px",
  color: "#FAFAF7",
  fontSize: "13px",
  fontFamily: "Space Mono, monospace",
  outline: "none",
};

const btn = (variant: "primary" | "ghost" | "danger" = "ghost"): React.CSSProperties => ({
  background:
    variant === "primary" ? "#F0B100" : variant === "danger" ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.06)",
  border:
    variant === "primary"
      ? "none"
      : variant === "danger"
      ? "1px solid rgba(239,68,68,0.24)"
      : "1px solid rgba(255,255,255,0.12)",
  color: variant === "primary" ? "#0A0A0A" : variant === "danger" ? "#EF4444" : "rgba(255,255,255,0.75)",
  borderRadius: "8px",
  padding: "9px 16px",
  fontSize: "13px",
  fontWeight: variant === "primary" ? 700 : 500,
  cursor: "pointer",
  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
});

export default function InvoiceSharePanel({ invoice }: { invoice: Invoice }) {
  const [state, setState] = useState<ShareState>({
    publicId: invoice.publicId,
    shareEnabled: invoice.shareEnabled ?? Boolean(invoice.publicId),
    shareExpiresAt: invoice.shareExpiresAt ?? "",
    hasPassword: Boolean(invoice.sharePasswordHash),
    viewCount: invoice.viewCount ?? 0,
    lastViewedAt: invoice.lastViewedAt ?? null,
  });
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const url = state.publicId
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/invoice/${state.publicId}`
    : "";

  const call = async (body: Record<string, unknown>) => {
    setBusy(true);
    setError("");
    const res = await fetch(`/api/admin/invoices/${invoice.id}/share`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => null);

    if (res?.ok) {
      setState(await res.json());
    } else {
      const detail = await res?.json().catch(() => null);
      setError(detail?.error ?? "تعذّر حفظ الإعداد");
    }
    setBusy(false);
  };

  const copy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      try { document.execCommand("copy"); } catch { /* تجاهل */ }
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const shareWhatsApp = () => {
    const phone = (invoice.clientPhone || "").replace(/\D/g, "");
    const text = encodeURIComponent(
      `السلام عليكم ${invoice.clientName}،\n\nفاتورتكم رقم ${invoice.number} جاهزة على الرابط التالي:\n${url}\n\nالمبلغ: ${invoice.total.toFixed(2)} ${invoice.currency}`
    );
    window.open(phone ? `https://wa.me/${phone}?text=${text}` : `https://wa.me/?text=${text}`, "_blank");
  };

  const shareEmail = () => {
    const subject = encodeURIComponent(`فاتورة رقم ${invoice.number}`);
    const body = encodeURIComponent(
      `السلام عليكم ${invoice.clientName},\n\nتجدون فاتورتكم رقم ${invoice.number} على الرابط:\n${url}\n\nالمبلغ: ${invoice.total.toFixed(2)} ${invoice.currency}\n\nشكرًا لكم.`
    );
    window.open(`mailto:${invoice.clientEmail ?? ""}?subject=${subject}&body=${body}`);
  };

  return (
    <div className="no-print" style={box}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "18px" }}>
        <div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#F0B100" }}>الرابط الخاص للعميل</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "4px", lineHeight: 1.8 }}>
            معرّف عشوائي غير قابل للتخمين، غير مفهرس، وخارج خريطة الموقع. من يملك الرابط يفتحه — أضف كلمة مرور
            إن كانت الفاتورة حسّاسة.
          </div>
        </div>
        {state.publicId && (
          <span style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>
            {state.viewCount} مشاهدة
            {state.lastViewedAt && ` · آخرها ${new Date(state.lastViewedAt).toLocaleDateString("ar-EG")}`}
          </span>
        )}
      </div>

      {!state.publicId ? (
        <button style={btn("primary")} onClick={() => call({ action: "generate" })} disabled={busy}>
          {busy ? "..." : "إنشاء رابط خاص"}
        </button>
      ) : (
        <>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            <input readOnly value={url} style={{ ...input, flex: "1 1 320px", minWidth: 0 }} onFocus={(e) => e.target.select()} />
            <button style={btn(copied ? "primary" : "ghost")} onClick={copy}>
              {copied ? "تم النسخ ✓" : "نسخ"}
            </button>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <button style={btn()}>معاينة</button>
            </a>
            <button style={btn()} onClick={shareWhatsApp}>إرسال واتساب</button>
            <button style={btn()} onClick={shareEmail}>إرسال إيميل</button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* الحالة */}
            <div>
              <span style={label}>حالة الرابط</span>
              <button
                style={{
                  ...btn(state.shareEnabled ? "ghost" : "danger"),
                  width: "100%",
                  color: state.shareEnabled ? "#22C55E" : "#EF4444",
                  borderColor: state.shareEnabled ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.24)",
                  background: state.shareEnabled ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
                }}
                onClick={() => call({ shareEnabled: !state.shareEnabled })}
                disabled={busy}
              >
                {state.shareEnabled ? "مفعّل — اضغط للإيقاف" : "موقوف — اضغط للتفعيل"}
              </button>
            </div>

            {/* الانتهاء */}
            <div>
              <span style={label}>ينتهي في (اختياري)</span>
              <input
                type="date"
                value={state.shareExpiresAt}
                onChange={(e) => call({ shareExpiresAt: e.target.value })}
                style={input}
                disabled={busy}
              />
            </div>

            {/* كلمة المرور */}
            <div>
              <span style={label}>
                كلمة المرور {state.hasPassword ? "— مفعّلة" : "— غير مفعّلة"}
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={state.hasPassword ? "كلمة جديدة" : "4 أحرف فأكثر"}
                  style={{ ...input, flex: 1, minWidth: 0 }}
                />
                <button
                  style={btn()}
                  disabled={busy || password.length < 4}
                  onClick={async () => { await call({ password }); setPassword(""); }}
                >
                  حفظ
                </button>
                {state.hasPassword && (
                  <button style={btn("danger")} disabled={busy} onClick={() => call({ password: null })}>
                    إزالة
                  </button>
                )}
              </div>
            </div>

            {/* تدوير الرابط */}
            <div>
              <span style={label}>تدوير الرابط</span>
              <button
                style={{ ...btn("danger"), width: "100%" }}
                disabled={busy}
                onClick={() => {
                  if (confirm("سيتوقف الرابط الحالي فورًا ويُنشأ رابط جديد. متابعة؟")) {
                    call({ action: "regenerate" });
                  }
                }}
              >
                إبطال الرابط وإنشاء بديل
              </button>
            </div>
          </div>
        </>
      )}

      {error && (
        <p style={{ color: "#EF4444", fontSize: "12px", marginTop: "12px", fontFamily: "Space Mono, monospace" }}>
          {error}
        </p>
      )}
    </div>
  );
}
