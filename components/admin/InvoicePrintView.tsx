"use client";

import { Invoice } from "@/lib/db";

const STATUS_LABELS: Record<string, string> = {
  draft: "مسودة",
  sent: "مُرسلة",
  paid: "مدفوعة",
  cancelled: "ملغاة",
};

const STATUS_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  draft:     { bg: "#F5F5F4", color: "#6B7280", border: "#E5E7EB" },
  sent:      { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
  paid:      { bg: "#F0FDF4", color: "#15803D", border: "#BBF7D0" },
  cancelled: { bg: "#FEF2F2", color: "#B91C1C", border: "#FECACA" },
};

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(s: string) {
  try {
    return new Date(s).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
  } catch { return s; }
}

interface Props { invoice: Invoice }

/* ── Reusable badge ────────────────────────────────────────────────────────── */
function Badge({ status }: { status: string }) {
  const c = STATUS_COLORS[status] ?? { bg: "#f5f5f5", color: "#555", border: "#ddd" };
  return (
    <span style={{
      display: "inline-block", padding: "3px 11px", borderRadius: "20px",
      fontFamily: "'Zain', sans-serif", fontSize: "11px", fontWeight: 700,
      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
    }}>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

/* ── Logo watermark (real logo, centered, diagonal) ─────────────────────────*/
function Watermark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt=""
      aria-hidden
      style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%) rotate(-22deg)",
        width: "62%", maxWidth: "400px", opacity: 0.055,
        pointerEvents: "none", userSelect: "none", zIndex: 0,
        filter: "sepia(1) saturate(0.4)",
      }}
    />
  );
}

/* ── Shared: items table + totals + bank + notes ────────────────────────────*/
function InvoiceBody({ invoice, accent }: { invoice: Invoice; accent: string }) {
  return (
    <>
      {/* ── Items table ── */}
      <table style={{ width: "100%", borderCollapse: "collapse", direction: "rtl", marginBottom: "24px" }}>
        <thead>
          <tr style={{ background: `${accent}1A`, borderBottom: `2px solid ${accent}` }}>
            <th style={{ padding: "10px 16px", textAlign: "right", fontFamily: "Space Mono, monospace", fontSize: "8.5px", fontWeight: 400, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              الخدمة / الوصف
            </th>
            <th style={{ padding: "10px 10px", textAlign: "center", fontFamily: "Space Mono, monospace", fontSize: "8.5px", fontWeight: 400, color: "#888", letterSpacing: "0.12em", width: "52px", textTransform: "uppercase" }}>
              الكمية
            </th>
            <th style={{ padding: "10px 10px", textAlign: "center", fontFamily: "Space Mono, monospace", fontSize: "8.5px", fontWeight: 400, color: "#888", letterSpacing: "0.12em", width: "105px", textTransform: "uppercase" }}>
              سعر الوحدة
            </th>
            <th style={{ padding: "10px 16px", textAlign: "left", fontFamily: "Space Mono, monospace", fontSize: "8.5px", fontWeight: 400, color: "#888", letterSpacing: "0.12em", width: "110px", textTransform: "uppercase" }}>
              الإجمالي
            </th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #F0EDE8", background: i % 2 === 1 ? "#FDFBF8" : "transparent" }}>
              <td style={{ padding: "11px 16px", textAlign: "right" }}>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "15px", fontWeight: 600, color: "#111" }}>{item.descAr}</div>
                {item.descEn && (
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9.5px", color: "#C0B89A", marginTop: "2px", direction: "ltr", textAlign: "left" }}>
                    {item.descEn}
                  </div>
                )}
              </td>
              <td style={{ padding: "11px 10px", textAlign: "center", fontFamily: "Space Mono, monospace", fontSize: "13px", color: "#555" }}>
                {item.qty}
              </td>
              <td style={{ padding: "11px 10px", textAlign: "center", fontFamily: "Space Mono, monospace", fontSize: "13px", color: "#555" }}>
                {fmt(item.unitPrice)}
              </td>
              <td style={{ padding: "11px 16px", textAlign: "left", fontFamily: "Space Mono, monospace", fontSize: "13px", fontWeight: 700, color: "#111" }}>
                {fmt(item.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Totals ── */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "28px" }}>
        <div style={{ width: "268px", direction: "rtl" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 2px", borderBottom: "1px solid #EEEBE5" }}>
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "#777" }}>المجموع الفرعي</span>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12.5px", color: "#333" }}>{fmt(invoice.subtotal)} SAR</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 2px", borderBottom: "1px solid #EEEBE5" }}>
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "#777" }}>ضريبة القيمة المضافة ({invoice.vatRate}٪)</span>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12.5px", color: "#333" }}>{fmt(invoice.vat)} SAR</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px", background: accent, borderRadius: "8px", marginTop: "10px" }}>
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "18px", fontWeight: 800, color: "#0A0A0A" }}>الإجمالي</span>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "16px", fontWeight: 700, color: "#0A0A0A" }}>{fmt(invoice.total)} SAR</span>
          </div>
        </div>
      </div>

      {/* ── Bank info ── */}
      {(invoice.bankName || invoice.iban || invoice.accountHolder) && (
        <div style={{ background: "#F8F5EE", borderRadius: "8px", padding: "15px 20px", marginBottom: "20px", direction: "rtl", borderRight: `3px solid ${accent}` }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "#C8A962", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "10px" }}>
            معلومات التحويل البنكي
          </div>
          <div style={{ display: "flex", gap: "36px", flexWrap: "wrap" }}>
            {invoice.bankName && (
              <div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "#AAA" }}>اسم البنك</div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 700, color: "#222" }}>{invoice.bankName}</div>
              </div>
            )}
            {invoice.accountHolder && (
              <div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "#AAA" }}>صاحب الحساب</div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 700, color: "#222" }}>{invoice.accountHolder}</div>
              </div>
            )}
            {invoice.iban && (
              <div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "#AAA" }}>رقم IBAN</div>
                <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", letterSpacing: "0.04em", color: "#222", direction: "ltr" }}>{invoice.iban}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Notes ── */}
      {(invoice.notesAr || invoice.notes) && (
        <div style={{ borderTop: "1px solid #EEEBE5", paddingTop: "16px", direction: "rtl" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "#BBA", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "7px" }}>ملاحظات</div>
          {invoice.notesAr && (
            <p style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "#555", lineHeight: 1.9, margin: 0 }}>{invoice.notesAr}</p>
          )}
          {invoice.notes && (
            <p style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "#999", lineHeight: 1.7, margin: "5px 0 0", direction: "ltr" }}>{invoice.notes}</p>
          )}
        </div>
      )}
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   TEMPLATE 1 — CLASSIC
   Gold header band · warm info bar · clean table · gold footer line
════════════════════════════════════════════════════════════════════════════ */
function ClassicTemplate({ invoice }: Props) {
  return (
    <div id="invoice-print-root" style={{
      width: "210mm", minHeight: "297mm", background: "white",
      position: "relative", overflow: "hidden",
      fontFamily: "'Zain', sans-serif", boxSizing: "border-box",
    }}>
      <Watermark />

      {/* ── Top gold strip ── */}
      <div style={{ background: "#C8A962", height: "7px" }} />

      {/* ── Header ── */}
      <div style={{
        padding: "22px 40px 18px", display: "flex", justifyContent: "space-between",
        alignItems: "center", direction: "rtl", position: "relative", zIndex: 1,
        borderBottom: "1px solid #EEE8DE",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="logo" style={{ height: "48px", objectFit: "contain", maxWidth: "170px" }} />

        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "#BBA87E", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            Invoice · فاتورة
          </div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "24px", fontWeight: 700, color: "#0A0A0A", lineHeight: 1.1 }}>
            {invoice.number}
          </div>
          <div style={{ marginTop: "5px" }}><Badge status={invoice.status} /></div>
        </div>
      </div>

      {/* ── Info bar ── */}
      <div style={{
        background: "#F8F5EE", borderBottom: "1px solid #EDE6D8",
        padding: "18px 40px", display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", direction: "rtl", position: "relative", zIndex: 1, gap: "20px",
      }}>
        {/* From */}
        <div style={{ minWidth: "130px" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "#C8A962", letterSpacing: "0.25em", marginBottom: "6px", textTransform: "uppercase" }}>صادرة من</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="logo" style={{ height: "20px", width: "auto", objectFit: "contain", display: "block", marginBottom: "2px" }} />
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9.5px", color: "#999", marginTop: "3px" }}>+201007835547</div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9.5px", color: "#999" }}>info@digitalagency.sa</div>
        </div>

        {/* Divider */}
        <div style={{ width: "1px", alignSelf: "stretch", background: "#DDD6C8", flexShrink: 0 }} />

        {/* To */}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "#C8A962", letterSpacing: "0.25em", marginBottom: "6px", textTransform: "uppercase" }}>صادرة إلى</div>
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "15px", fontWeight: 800, color: "#111" }}>{invoice.clientName}</div>
          {invoice.clientCompany && <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "#666" }}>{invoice.clientCompany}</div>}
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9.5px", color: "#999", marginTop: "3px" }}>{invoice.clientEmail}</div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9.5px", color: "#999" }}>{invoice.clientPhone}</div>
        </div>

        {/* Dates */}
        <div style={{ textAlign: "left", flexShrink: 0 }}>
          <div style={{ marginBottom: "10px" }}>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "#BBA", letterSpacing: "0.2em", textTransform: "uppercase" }}>تاريخ الإصدار</div>
            <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 600, color: "#333" }}>{fmtDate(invoice.issueDate)}</div>
          </div>
          <div>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "#BBA", letterSpacing: "0.2em", textTransform: "uppercase" }}>تاريخ الاستحقاق</div>
            <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 600, color: "#C8A962" }}>{fmtDate(invoice.dueDate)}</div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "26px 40px 24px", position: "relative", zIndex: 1 }}>
        <InvoiceBody invoice={invoice} accent="#C8A962" />

        {/* Footer */}
        <div style={{ marginTop: "32px", paddingTop: "13px", borderTop: "2px solid #C8A962", display: "flex", justifyContent: "space-between", alignItems: "center", direction: "rtl" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" style={{ height: "22px", objectFit: "contain", opacity: 0.4 }} />
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "8.5px", color: "#BBB", textAlign: "center" }}>
            +201007835547 · info@digitalagency.sa
          </div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "#C8A962", fontWeight: 600 }}>{invoice.number}</div>
        </div>
      </div>

      {/* Bottom gold strip */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#C8A962", height: "5px" }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   TEMPLATE 2 — MODERN
   Deep dark header · white logo (inverted) · gold accent line · white body
════════════════════════════════════════════════════════════════════════════ */
function ModernTemplate({ invoice }: Props) {
  return (
    <div id="invoice-print-root" style={{
      width: "210mm", minHeight: "297mm", background: "white",
      position: "relative", overflow: "hidden",
      fontFamily: "'Zain', sans-serif", boxSizing: "border-box",
    }}>
      <Watermark />

      {/* ── Dark header ── */}
      <div style={{ background: "#0A0A0A", padding: "30px 40px 26px", position: "relative", zIndex: 1, direction: "rtl" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          {/* Logo — inverted white on dark */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="logo"
            style={{ height: "42px", objectFit: "contain", maxWidth: "160px", filter: "brightness(0) invert(1)" }}
          />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "8.5px", color: "rgba(200,169,98,0.55)", letterSpacing: "0.32em", textTransform: "uppercase" }}>Invoice</div>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "22px", fontWeight: 700, color: "#C8A962", lineHeight: 1.1 }}>{invoice.number}</div>
            <div style={{ marginTop: "5px" }}><Badge status={invoice.status} /></div>
          </div>
        </div>

        {/* Client + dates in dark area */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "24px" }}>
          <div>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "rgba(200,169,98,0.5)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "5px" }}>صادرة إلى</div>
            <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "16px", fontWeight: 700, color: "#FAFAF7" }}>{invoice.clientName}</div>
            {invoice.clientCompany && <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>{invoice.clientCompany}</div>}
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9.5px", color: "rgba(255,255,255,0.38)", marginTop: "3px" }}>{invoice.clientEmail}</div>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9.5px", color: "rgba(255,255,255,0.38)" }}>{invoice.clientPhone}</div>
          </div>
          <div style={{ textAlign: "left", flexShrink: 0 }}>
            <div style={{ marginBottom: "10px" }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "rgba(200,169,98,0.5)", letterSpacing: "0.2em", textTransform: "uppercase" }}>تاريخ الإصدار</div>
              <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{fmtDate(invoice.issueDate)}</div>
            </div>
            <div>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "rgba(200,169,98,0.5)", letterSpacing: "0.2em", textTransform: "uppercase" }}>تاريخ الاستحقاق</div>
              <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 600, color: "#C8A962" }}>{fmtDate(invoice.dueDate)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Gold gradient accent line ── */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, #9A7B3E 0%, #C8A962 40%, #E8C97A 60%, #C8A962 100%)" }} />

      {/* ── Body ── */}
      <div style={{ padding: "28px 40px 24px", position: "relative", zIndex: 1 }}>
        <InvoiceBody invoice={invoice} accent="#C8A962" />

        {/* Footer */}
        <div style={{ marginTop: "32px", paddingTop: "13px", borderTop: "1px solid #E0DAD0", display: "flex", justifyContent: "space-between", alignItems: "center", direction: "rtl" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "8.5px", color: "#CCC" }}>
            +201007835547 · info@digitalagency.sa
          </div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "#C8A962", fontWeight: 600 }}>{invoice.number}</div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   TEMPLATE 3 — MINIMAL
   Off-white · right gold border · logo top · ultra-clean typography
════════════════════════════════════════════════════════════════════════════ */
function MinimalTemplate({ invoice }: Props) {
  return (
    <div id="invoice-print-root" style={{
      width: "210mm", minHeight: "297mm", background: "#FAFAF8",
      position: "relative", overflow: "hidden",
      fontFamily: "'Zain', sans-serif", boxSizing: "border-box",
      borderRight: "5px solid #C8A962",
    }}>
      <Watermark />

      {/* ── Header ── */}
      <div style={{ padding: "36px 44px 28px 40px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", direction: "rtl", position: "relative", zIndex: 1 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="logo" style={{ height: "44px", objectFit: "contain", maxWidth: "160px" }} />
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "8.5px", color: "#C8A962", letterSpacing: "0.3em", textTransform: "uppercase" }}>فاتورة · Invoice</div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "20px", fontWeight: 700, color: "#111", lineHeight: 1.15 }}>{invoice.number}</div>
          <div style={{ marginTop: "5px" }}><Badge status={invoice.status} /></div>
        </div>
      </div>

      {/* ── Separator ── */}
      <div style={{ height: "1px", background: "#E0D8CC", marginInline: "40px 44px", position: "relative", zIndex: 1 }} />

      {/* ── Client + dates ── */}
      <div style={{ padding: "20px 44px 18px 40px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", direction: "rtl", position: "relative", zIndex: 1, gap: "24px" }}>
        <div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "#C8A962", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "5px" }}>صادرة إلى</div>
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "16px", fontWeight: 700, color: "#111" }}>{invoice.clientName}</div>
          {invoice.clientCompany && <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "#777" }}>{invoice.clientCompany}</div>}
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9.5px", color: "#AAA", marginTop: "3px" }}>{invoice.clientEmail}</div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9.5px", color: "#AAA" }}>{invoice.clientPhone}</div>
        </div>
        <div style={{ textAlign: "left", flexShrink: 0 }}>
          <div style={{ marginBottom: "10px" }}>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "#CCC", letterSpacing: "0.2em", textTransform: "uppercase" }}>تاريخ الإصدار</div>
            <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 600, color: "#333" }}>{fmtDate(invoice.issueDate)}</div>
          </div>
          <div>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "7.5px", color: "#CCC", letterSpacing: "0.2em", textTransform: "uppercase" }}>تاريخ الاستحقاق</div>
            <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 600, color: "#C8A962" }}>{fmtDate(invoice.dueDate)}</div>
          </div>
        </div>
      </div>

      {/* ── Separator 2 ── */}
      <div style={{ height: "1px", background: "#E0D8CC", marginInline: "40px 44px", position: "relative", zIndex: 1 }} />

      {/* ── Body ── */}
      <div style={{ padding: "20px 44px 24px 40px", position: "relative", zIndex: 1 }}>
        <InvoiceBody invoice={invoice} accent="#C8A962" />

        {/* Footer */}
        <div style={{ marginTop: "32px", paddingTop: "13px", borderTop: "1px solid #E0D8CC", display: "flex", justifyContent: "space-between", alignItems: "center", direction: "rtl" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" style={{ height: "20px", objectFit: "contain", opacity: 0.3 }} />
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "8.5px", color: "#CCC" }}>info@digitalagency.sa</div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "#C8A962", fontWeight: 600 }}>{invoice.number}</div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   PRINT CSS — hides sidebar, resets margins, forces A4
════════════════════════════════════════════════════════════════════════════ */
const PRINT_CSS = `
@media print {
  @page { size: A4 portrait; margin: 0; }

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    background: white !important;
  }

  /* Hide ALL admin chrome */
  .no-print,
  .admin-sidebar,
  nav,
  aside {
    display: none !important;
  }

  /* Remove sidebar margin offset */
  .admin-main {
    margin: 0 !important;
    padding: 0 !important;
    background: white !important;
    min-height: unset !important;
  }

  /* The invoice container itself */
  #invoice-print-root {
    width: 210mm !important;
    margin: 0 auto !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    page-break-inside: avoid;
  }

  /* Force-print background colors & images */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
}
`;

/* ════════════════════════════════════════════════════════════════════════════
   EXPORT
════════════════════════════════════════════════════════════════════════════ */
export default function InvoicePrintView({ invoice }: Props) {
  const Template =
    invoice.template === "modern"  ? ModernTemplate  :
    invoice.template === "minimal" ? MinimalTemplate :
    ClassicTemplate;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      <Template invoice={invoice} />
    </>
  );
}
