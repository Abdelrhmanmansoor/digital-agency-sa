"use client";

import { Invoice } from "@/lib/db";

const STATUS_LABELS: Record<string, string> = {
  draft: "مسودة",
  sent: "مُرسلة",
  paid: "مدفوعة",
  cancelled: "ملغاة",
};

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  draft: { bg: "#f0f0f0", text: "#666" },
  sent: { bg: "#EFF6FF", text: "#1D4ED8" },
  paid: { bg: "#F0FDF4", text: "#16A34A" },
  cancelled: { bg: "#FEF2F2", text: "#DC2626" },
};

function fmt(n: number) {
  return n.toLocaleString("en-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(s: string) {
  try {
    return new Date(s).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return s;
  }
}

interface Props {
  invoice: Invoice;
}

/* ── Shared: Items table + Totals + Bank + Footer ────────────────────────── */
function InvoiceBody({ invoice, accent }: { invoice: Invoice; accent: string }) {
  return (
    <>
      {/* Items table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "28px",
          fontSize: "13px",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#f8f5ee",
              borderBottom: `2px solid ${accent}`,
              direction: "rtl",
            }}
          >
            <th style={{ padding: "11px 16px", textAlign: "right", fontFamily: "Space Mono, monospace", fontWeight: 400, color: "#666", letterSpacing: "0.04em" }}>
              الخدمة / الوصف
            </th>
            <th style={{ padding: "11px 12px", textAlign: "center", fontFamily: "Space Mono, monospace", fontWeight: 400, color: "#666", width: "60px" }}>
              الكمية
            </th>
            <th style={{ padding: "11px 12px", textAlign: "center", fontFamily: "Space Mono, monospace", fontWeight: 400, color: "#666", width: "110px" }}>
              سعر الوحدة
            </th>
            <th style={{ padding: "11px 16px", textAlign: "left", fontFamily: "Space Mono, monospace", fontWeight: 400, color: "#666", width: "110px" }}>
              الإجمالي
            </th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr
              key={i}
              style={{
                borderBottom: "1px solid #f0ece4",
                direction: "rtl",
              }}
            >
              <td style={{ padding: "12px 16px" }}>
                <div
                  style={{
                    fontFamily: "'Zain', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#1a1a1a",
                  }}
                >
                  {item.descAr}
                </div>
                {item.descEn && (
                  <div
                    style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "11px",
                      color: "#aaa",
                      marginTop: "2px",
                    }}
                  >
                    {item.descEn}
                  </div>
                )}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "center",
                  fontFamily: "Space Mono, monospace",
                }}
              >
                {item.qty}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "center",
                  fontFamily: "Space Mono, monospace",
                }}
              >
                {fmt(item.unitPrice)}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontFamily: "Space Mono, monospace",
                  fontWeight: 600,
                }}
              >
                {fmt(item.total)} {invoice.currency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "32px",
        }}
      >
        <div style={{ width: "280px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
              direction: "rtl",
            }}
          >
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "#666" }}>
              المجموع الفرعي
            </span>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "14px" }}>
              {fmt(invoice.subtotal)} {invoice.currency}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
              direction: "rtl",
            }}
          >
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "#666" }}>
              ضريبة القيمة المضافة ({invoice.vatRate}%)
            </span>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "14px" }}>
              {fmt(invoice.vat)} {invoice.currency}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 16px",
              background: "#f8f5ee",
              borderRadius: "8px",
              marginTop: "8px",
              direction: "rtl",
            }}
          >
            <span
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "17px",
                fontWeight: 800,
              }}
            >
              الإجمالي
            </span>
            <span
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "17px",
                fontWeight: 700,
                color: accent,
              }}
            >
              {fmt(invoice.total)} {invoice.currency}
            </span>
          </div>
        </div>
      </div>

      {/* Bank info */}
      {(invoice.bankName || invoice.iban || invoice.accountHolder) && (
        <div
          style={{
            background: "#f8f5ee",
            borderRadius: "10px",
            padding: "18px 22px",
            marginBottom: "24px",
            direction: "rtl",
          }}
        >
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "10px",
              color: "#aaa",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            معلومات الحساب البنكي
          </div>
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            {invoice.bankName && (
              <div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "#999" }}>
                  اسم البنك
                </div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 600 }}>
                  {invoice.bankName}
                </div>
              </div>
            )}
            {invoice.accountHolder && (
              <div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "#999" }}>
                  صاحب الحساب
                </div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 600 }}>
                  {invoice.accountHolder}
                </div>
              </div>
            )}
            {invoice.iban && (
              <div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "#999" }}>
                  رقم IBAN
                </div>
                <div
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "13px",
                    letterSpacing: "0.06em",
                  }}
                >
                  {invoice.iban}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notes */}
      {(invoice.notesAr || invoice.notes) && (
        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "18px",
            marginBottom: "24px",
            direction: "rtl",
          }}
        >
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "10px",
              color: "#aaa",
              letterSpacing: "0.15em",
              marginBottom: "8px",
            }}
          >
            ملاحظات
          </div>
          {invoice.notesAr && (
            <p
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "14px",
                color: "#555",
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              {invoice.notesAr}
            </p>
          )}
          {invoice.notes && (
            <p
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "11px",
                color: "#888",
                lineHeight: 1.8,
                margin: "6px 0 0",
              }}
            >
              {invoice.notes}
            </p>
          )}
        </div>
      )}
    </>
  );
}

/* ── Template: Classic ────────────────────────────────────────────────────── */
function ClassicTemplate({ invoice }: Props) {
  return (
    <div
      id="invoice-print-root"
      style={{
        width: "210mm",
        minHeight: "297mm",
        background: "white",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Zain', sans-serif",
        color: "#1a1a1a",
        boxSizing: "border-box",
      }}
    >
      {/* Logo watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-25deg)",
          fontFamily: "'Zain', sans-serif",
          fontSize: "110px",
          fontWeight: 800,
          color: "rgba(200,169,98,0.07)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          lineHeight: 1,
        }}
      >
        وكالة رقمية
      </div>

      {/* Gold header */}
      <div
        style={{
          background: "#C8A962",
          padding: "28px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          direction: "rtl",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "26px",
              fontWeight: 800,
              color: "#0A0A0A",
            }}
          >
            وكالة رقمية
          </div>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "9px",
              color: "rgba(0,0,0,0.55)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            DIGITAL AGENCY
          </div>
        </div>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "26px",
              fontWeight: 700,
              color: "#0A0A0A",
            }}
          >
            INVOICE
          </div>
          <div
            style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "13px",
              color: "rgba(0,0,0,0.65)",
            }}
          >
            فاتورة
          </div>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "13px",
              color: "#0A0A0A",
              fontWeight: 600,
              marginTop: "4px",
            }}
          >
            {invoice.number}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "36px 40px", position: "relative", zIndex: 1 }}>
        {/* Client + dates row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "36px",
            direction: "rtl",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "9px",
                color: "#aaa",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              صادرة إلى
            </div>
            <div
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              {invoice.clientName}
            </div>
            {invoice.clientCompany && (
              <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "#555" }}>
                {invoice.clientCompany}
              </div>
            )}
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "11px",
                color: "#888",
                marginTop: "4px",
              }}
            >
              {invoice.clientEmail}
            </div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "11px",
                color: "#888",
              }}
            >
              {invoice.clientPhone}
            </div>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ marginBottom: "10px" }}>
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "9px",
                  color: "#aaa",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                تاريخ الإصدار
              </div>
              <div
                style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                {fmtDate(invoice.issueDate)}
              </div>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "9px",
                  color: "#aaa",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                تاريخ الاستحقاق
              </div>
              <div
                style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                {fmtDate(invoice.dueDate)}
              </div>
            </div>
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 600,
                background: STATUS_COLORS[invoice.status]?.bg ?? "#eee",
                color: STATUS_COLORS[invoice.status]?.text ?? "#333",
                fontFamily: "'Zain', sans-serif",
              }}
            >
              {STATUS_LABELS[invoice.status] ?? invoice.status}
            </span>
          </div>
        </div>

        <InvoiceBody invoice={invoice} accent="#C8A962" />

        {/* Footer */}
        <div
          style={{
            borderTop: "2px solid #C8A962",
            paddingTop: "14px",
            marginTop: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            direction: "rtl",
          }}
        >
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "10px",
              color: "#aaa",
            }}
          >
            وكالة رقمية · +201007835547 · info@digitalagency.sa
          </div>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "11px",
              color: "#C8A962",
              fontWeight: 600,
            }}
          >
            {invoice.number}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Template: Modern ─────────────────────────────────────────────────────── */
function ModernTemplate({ invoice }: Props) {
  return (
    <div
      id="invoice-print-root"
      style={{
        width: "210mm",
        minHeight: "297mm",
        background: "white",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Zain', sans-serif",
        color: "#1a1a1a",
        boxSizing: "border-box",
      }}
    >
      {/* Watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-25deg)",
          fontFamily: "'Zain', sans-serif",
          fontSize: "110px",
          fontWeight: 800,
          color: "rgba(200,169,98,0.06)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        وكالة رقمية
      </div>

      {/* Dark header */}
      <div
        style={{
          background: "#0A0A0A",
          padding: "36px 40px",
          position: "relative",
          zIndex: 1,
          direction: "rtl",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "26px",
                fontWeight: 800,
                color: "#C8A962",
              }}
            >
              وكالة رقمية
            </div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "9px",
                color: "rgba(200,169,98,0.5)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              DIGITAL AGENCY
            </div>
          </div>
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "11px",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.18em",
              }}
            >
              INVOICE
            </div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "20px",
                fontWeight: 700,
                color: "#C8A962",
              }}
            >
              {invoice.number}
            </div>
          </div>
        </div>

        {/* Client + dates in dark area */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "9px",
                color: "rgba(200,169,98,0.5)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              صادرة إلى
            </div>
            <div
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "17px",
                fontWeight: 700,
                color: "#FAFAF7",
              }}
            >
              {invoice.clientName}
            </div>
            {invoice.clientCompany && (
              <div
                style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {invoice.clientCompany}
              </div>
            )}
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "11px",
                color: "rgba(255,255,255,0.4)",
                marginTop: "4px",
              }}
            >
              {invoice.clientEmail}
            </div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "11px",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {invoice.clientPhone}
            </div>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ marginBottom: "8px" }}>
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(200,169,98,0.5)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                تاريخ الإصدار
              </div>
              <div
                style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 600,
                }}
              >
                {fmtDate(invoice.issueDate)}
              </div>
            </div>
            <div style={{ marginBottom: "8px" }}>
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "9px",
                  color: "rgba(200,169,98,0.5)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                تاريخ الاستحقاق
              </div>
              <div
                style={{
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 600,
                }}
              >
                {fmtDate(invoice.dueDate)}
              </div>
            </div>
            <span
              style={{
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 600,
                background: STATUS_COLORS[invoice.status]?.bg ?? "#eee",
                color: STATUS_COLORS[invoice.status]?.text ?? "#333",
                fontFamily: "'Zain', sans-serif",
              }}
            >
              {STATUS_LABELS[invoice.status] ?? invoice.status}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "36px 40px", position: "relative", zIndex: 1 }}>
        <InvoiceBody invoice={invoice} accent="#C8A962" />

        <div
          style={{
            borderTop: "1px solid #e8e2d8",
            paddingTop: "14px",
            marginTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            direction: "rtl",
          }}
        >
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "10px",
              color: "#aaa",
            }}
          >
            وكالة رقمية · +201007835547 · info@digitalagency.sa
          </div>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "11px",
              color: "#C8A962",
            }}
          >
            {invoice.number}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Template: Minimal ────────────────────────────────────────────────────── */
function MinimalTemplate({ invoice }: Props) {
  return (
    <div
      id="invoice-print-root"
      style={{
        width: "210mm",
        minHeight: "297mm",
        background: "white",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Zain', sans-serif",
        color: "#1a1a1a",
        boxSizing: "border-box",
      }}
    >
      {/* Watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-25deg)",
          fontFamily: "'Zain', sans-serif",
          fontSize: "110px",
          fontWeight: 800,
          color: "rgba(200,169,98,0.06)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        وكالة رقمية
      </div>

      {/* Minimal header — left gold bar */}
      <div
        style={{
          borderRight: "4px solid #C8A962",
          padding: "32px 40px 28px 36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          direction: "rtl",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "28px",
              fontWeight: 800,
              color: "#0A0A0A",
            }}
          >
            وكالة رقمية
          </div>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "9px",
              color: "#aaa",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            DIGITAL AGENCY
          </div>
        </div>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "14px",
              color: "#aaa",
            }}
          >
            فاتورة
          </div>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "18px",
              fontWeight: 700,
              color: "#0A0A0A",
            }}
          >
            {invoice.number}
          </div>
          <span
            style={{
              marginTop: "6px",
              display: "inline-block",
              padding: "3px 10px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600,
              background: STATUS_COLORS[invoice.status]?.bg ?? "#eee",
              color: STATUS_COLORS[invoice.status]?.text ?? "#333",
              fontFamily: "'Zain', sans-serif",
            }}
          >
            {STATUS_LABELS[invoice.status] ?? invoice.status}
          </span>
        </div>
      </div>

      {/* Thin gold separator */}
      <div style={{ height: "1px", background: "#C8A962", opacity: 0.35, marginInline: "40px" }} />

      {/* Body */}
      <div style={{ padding: "28px 40px", position: "relative", zIndex: 1 }}>
        {/* Client + dates */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "32px",
            direction: "rtl",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "9px",
                color: "#aaa",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              صادرة إلى
            </div>
            <div
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "17px",
                fontWeight: 700,
              }}
            >
              {invoice.clientName}
            </div>
            {invoice.clientCompany && (
              <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "#666" }}>
                {invoice.clientCompany}
              </div>
            )}
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "11px",
                color: "#999",
                marginTop: "3px",
              }}
            >
              {invoice.clientEmail}
            </div>
            <div
              style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", color: "#999" }}
            >
              {invoice.clientPhone}
            </div>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ marginBottom: "8px" }}>
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "9px",
                  color: "#aaa",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                تاريخ الإصدار
              </div>
              <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 600 }}>
                {fmtDate(invoice.issueDate)}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "9px",
                  color: "#aaa",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                تاريخ الاستحقاق
              </div>
              <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 600 }}>
                {fmtDate(invoice.dueDate)}
              </div>
            </div>
          </div>
        </div>

        <InvoiceBody invoice={invoice} accent="#C8A962" />

        <div
          style={{
            borderTop: "1px solid #e8e2d8",
            paddingTop: "14px",
            marginTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            direction: "rtl",
          }}
        >
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "10px",
              color: "#aaa",
            }}
          >
            وكالة رقمية · +201007835547 · info@digitalagency.sa
          </div>
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "11px",
              color: "#C8A962",
            }}
          >
            {invoice.number}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────────────────── */
export default function InvoicePrintView({ invoice }: Props) {
  const Template =
    invoice.template === "modern"
      ? ModernTemplate
      : invoice.template === "minimal"
      ? MinimalTemplate
      : ClassicTemplate;

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0 !important; padding: 0 !important; background: white !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #invoice-print-root { margin: 0 !important; box-shadow: none !important; }
        }
      `}</style>
      <Template invoice={invoice} />
    </>
  );
}
