"use client";

import Link from "next/link";
import { Invoice } from "@/lib/db";

interface Props {
  invoices: Invoice[];
  locale: string;
}

const STATUS_LABELS: Record<string, { ar: string; en: string; color: string; bg: string }> = {
  draft:     { ar: "مسودة",    en: "Draft",     color: "#94A3B8", bg: "rgba(148,163,184,0.1)" },
  sent:      { ar: "مُرسلة",   en: "Sent",      color: "#3B82F6", bg: "rgba(59,130,246,0.1)" },
  paid:      { ar: "مدفوعة",   en: "Paid",      color: "#BDEE63", bg: "rgba(189,238,99,0.1)" },
  cancelled: { ar: "ملغاة",    en: "Cancelled", color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
};

export default function InvoicesClient({ invoices, locale }: Props) {
  const isRTL = locale === "ar";

  return (
    <div style={{ padding: "40px", direction: isRTL ? "rtl" : "ltr", maxWidth: "1000px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "14px", marginBottom: "36px" }}>
        <div>
          <h1 style={{ fontFamily: "'Zain', sans-serif", fontSize: "28px", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>
            {isRTL ? "فواتيري" : "My Invoices"}
          </h1>
          <p style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)", marginTop: "8px" }}>
            {invoices.length} {isRTL ? "فاتورة" : "invoice(s)"}
          </p>
        </div>
        <Link
          href={`/${locale}/dashboard/invoices/new`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "10px 20px", borderRadius: "10px",
            background: "rgba(200,169,98,0.12)", border: "1px solid rgba(200,169,98,0.3)",
            color: "#C8A962", fontFamily: "'Zain', sans-serif",
            fontSize: "15px", fontWeight: 700, textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {isRTL ? "فاتورة جديدة" : "New Invoice"}
        </Link>
      </div>

      {/* Empty state */}
      {invoices.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "80px 40px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "16px",
        }}>
          <div style={{ marginBottom: "16px" }}>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto", display: "block" }}>
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "18px", fontWeight: 700, color: "#FAFAF7", marginBottom: "8px" }}>
            {isRTL ? "لا توجد فواتير بعد" : "No invoices yet"}
          </div>
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)" }}>
            {isRTL ? "ستظهر فواتيرك هنا بعد إصدارها من فريقنا" : "Your invoices will appear here once issued by our team"}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {invoices.map((inv) => {
            const status = STATUS_LABELS[inv.status] ?? STATUS_LABELS.draft;
            const issueDate = new Date(inv.issueDate).toLocaleDateString(isRTL ? "ar-SA" : "en-US", { year: "numeric", month: "short", day: "numeric" });
            const dueDate = new Date(inv.dueDate).toLocaleDateString(isRTL ? "ar-SA" : "en-US", { year: "numeric", month: "short", day: "numeric" });

            return (
              <div
                key={inv.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "14px",
                  padding: "20px 24px",
                }}
              >
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    {/* Icon */}
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "10px",
                      background: "rgba(200,169,98,0.08)", border: "1px solid rgba(200,169,98,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A962" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "#C8A962", letterSpacing: "0.05em" }}>
                        {inv.number}
                      </div>
                      <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "16px", fontWeight: 700, color: "#FAFAF7", marginTop: "2px" }}>
                        {isRTL ? inv.clientName : inv.clientName}
                      </div>
                    </div>
                  </div>

                  {/* Status + Amount */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{
                      padding: "4px 12px", borderRadius: "6px",
                      background: status.bg, color: status.color,
                      fontFamily: "'Zain', sans-serif", fontSize: "12px", fontWeight: 700,
                    }}>
                      {isRTL ? status.ar : status.en}
                    </span>
                    <div style={{ textAlign: isRTL ? "left" : "right" }}>
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "18px", fontWeight: 700, color: "#FAFAF7" }}>
                        {inv.total.toLocaleString(isRTL ? "ar-SA" : "en-US")}
                      </div>
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>
                        {inv.currency} {isRTL ? "(شامل الضريبة)" : "(incl. VAT)"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", margin: "16px 0" }} />

                {/* Bottom row — dates + items */}
                <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "3px" }}>
                      {isRTL ? "تاريخ الإصدار" : "Issue Date"}
                    </div>
                    <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                      {issueDate}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "3px" }}>
                      {isRTL ? "تاريخ الاستحقاق" : "Due Date"}
                    </div>
                    <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                      {dueDate}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "3px" }}>
                      {isRTL ? "البنود" : "Items"}
                    </div>
                    <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                      {inv.items.length}
                    </div>
                  </div>
                  {inv.vatRate > 0 && (
                    <div>
                      <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "3px" }}>
                        {isRTL ? "الضريبة" : "VAT"}
                      </div>
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                        {inv.vatRate}%
                      </div>
                    </div>
                  )}
                </div>

                {/* Items list */}
                {inv.items.length > 0 && (
                  <div style={{ marginTop: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "10px", overflow: "hidden" }}>
                    {inv.items.map((item, idx) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px 16px",
                          borderBottom: idx < inv.items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                          gap: "12px",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "#FAFAF7" }}>
                            {isRTL ? item.descAr : item.descEn}
                          </div>
                          {item.qty > 1 && (
                            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>
                              {item.qty} × {item.unitPrice.toLocaleString(isRTL ? "ar-SA" : "en-US")} {inv.currency}
                            </div>
                          )}
                        </div>
                        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", color: "#C8A962", whiteSpace: "nowrap" }}>
                          {item.total.toLocaleString(isRTL ? "ar-SA" : "en-US")} {inv.currency}
                        </div>
                      </div>
                    ))}
                    {/* Totals */}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "10px 16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                          {isRTL ? "المجموع قبل الضريبة" : "Subtotal"}
                        </span>
                        <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                          {inv.subtotal.toLocaleString(isRTL ? "ar-SA" : "en-US")} {inv.currency}
                        </span>
                      </div>
                      {inv.vat > 0 && (
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                            {isRTL ? `ضريبة القيمة المضافة (${inv.vatRate}%)` : `VAT (${inv.vatRate}%)`}
                          </span>
                          <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                            {inv.vat.toLocaleString(isRTL ? "ar-SA" : "en-US")} {inv.currency}
                          </span>
                        </div>
                      )}
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 700, color: "#FAFAF7" }}>
                          {isRTL ? "الإجمالي" : "Total"}
                        </span>
                        <span style={{ fontFamily: "Space Mono, monospace", fontSize: "14px", fontWeight: 700, color: "#C8A962" }}>
                          {inv.total.toLocaleString(isRTL ? "ar-SA" : "en-US")} {inv.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes */}
                {(inv.notesAr || inv.notes) && (
                  <div style={{ marginTop: "14px", padding: "12px 14px", background: "rgba(200,169,98,0.05)", borderRadius: "8px", borderInlineStart: "3px solid rgba(200,169,98,0.3)" }}>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>
                      {isRTL ? "ملاحظات" : "Notes"}
                    </div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
                      {isRTL ? (inv.notesAr || inv.notes) : (inv.notes || inv.notesAr)}
                    </div>
                  </div>
                )}

                {/* Bank info */}
                {inv.iban && (
                  <div style={{ marginTop: "14px", padding: "12px 14px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>
                      {isRTL ? "بيانات الدفع" : "Payment Details"}
                    </div>
                    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                      {inv.bankName && (
                        <div>
                          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{isRTL ? "البنك" : "Bank"}</div>
                          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "#FAFAF7" }}>{inv.bankName}</div>
                        </div>
                      )}
                      {inv.accountHolder && (
                        <div>
                          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{isRTL ? "اسم الحساب" : "Account Name"}</div>
                          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "#FAFAF7" }}>{inv.accountHolder}</div>
                        </div>
                      )}
                      <div>
                        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>IBAN</div>
                        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "#C8A962", letterSpacing: "0.05em" }}>{inv.iban}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
