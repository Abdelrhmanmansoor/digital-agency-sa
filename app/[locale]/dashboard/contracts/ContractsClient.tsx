"use client";

import { Contract } from "@/lib/db";

interface Props {
  contracts: Contract[];
  locale: string;
}

const STATUS_LABELS: Record<string, { ar: string; en: string; color: string; bg: string }> = {
  draft:      { ar: "مسودة",    en: "Draft",      color: "#94A3B8", bg: "rgba(148,163,184,0.1)" },
  active:     { ar: "نشط",      en: "Active",     color: "#3B82F6", bg: "rgba(59,130,246,0.1)" },
  completed:  { ar: "مكتمل",    en: "Completed",  color: "#BDEE63", bg: "rgba(189,238,99,0.1)" },
  terminated: { ar: "منتهي",    en: "Terminated", color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
};

const TYPE_LABELS: Record<string, { ar: string; en: string }> = {
  "service-agreement": { ar: "اتفاقية خدمة",  en: "Service Agreement" },
  maintenance:         { ar: "صيانة",          en: "Maintenance" },
  marketing:           { ar: "تسويق رقمي",     en: "Digital Marketing" },
  custom:              { ar: "مخصص",           en: "Custom" },
};

const PAYMENT_LABELS: Record<string, { ar: string; en: string }> = {
  full:            { ar: "دفعة كاملة",        en: "Full Payment" },
  "50-50":         { ar: "50% مقدم + 50%",    en: "50% Upfront + 50%" },
  "3-installments":{ ar: "3 أقساط",           en: "3 Installments" },
  custom:          { ar: "مخصص",              en: "Custom" },
};

export default function ContractsClient({ contracts, locale }: Props) {
  const isRTL = locale === "ar";

  return (
    <div style={{ padding: "40px", direction: isRTL ? "rtl" : "ltr", maxWidth: "1000px" }}>
      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontFamily: "'Zain', sans-serif", fontSize: "28px", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>
          {isRTL ? "عقودي" : "My Contracts"}
        </h1>
        <p style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)", marginTop: "8px" }}>
          {contracts.length} {isRTL ? "عقد" : "contract(s)"}
        </p>
      </div>

      {/* Empty state */}
      {contracts.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "80px 40px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "16px",
        }}>
          <div style={{ marginBottom: "16px" }}>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto", display: "block" }}>
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="9" y1="16" x2="12" y2="16" />
            </svg>
          </div>
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "18px", fontWeight: 700, color: "#FAFAF7", marginBottom: "8px" }}>
            {isRTL ? "لا توجد عقود بعد" : "No contracts yet"}
          </div>
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)" }}>
            {isRTL ? "ستظهر عقودك هنا بعد إعدادها من فريقنا" : "Your contracts will appear here once set up by our team"}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {contracts.map((c) => {
            const status = STATUS_LABELS[c.status] ?? STATUS_LABELS.draft;
            const type = TYPE_LABELS[c.type] ?? { ar: c.type, en: c.type };
            const payment = PAYMENT_LABELS[c.paymentTerms] ?? { ar: c.paymentTerms, en: c.paymentTerms };
            const startDate = new Date(c.startDate).toLocaleDateString(isRTL ? "ar-SA" : "en-US", { year: "numeric", month: "short", day: "numeric" });
            const endDate = new Date(new Date(c.startDate).getTime() + c.deliveryDays * 86400000).toLocaleDateString(isRTL ? "ar-SA" : "en-US", { year: "numeric", month: "short", day: "numeric" });

            return (
              <div
                key={c.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "24px",
                }}
              >
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    {/* Icon */}
                    <div style={{
                      width: "48px", height: "48px", borderRadius: "12px",
                      background: "rgba(200,169,98,0.08)", border: "1px solid rgba(200,169,98,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A962" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        <line x1="9" y1="12" x2="15" y2="12" />
                        <line x1="9" y1="16" x2="12" y2="16" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", color: "#C8A962", letterSpacing: "0.05em" }}>
                        {c.number}
                      </div>
                      <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "17px", fontWeight: 800, color: "#FAFAF7", marginTop: "2px" }}>
                        {isRTL ? c.serviceTitleAr : c.serviceTitle}
                      </div>
                      <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>
                        {isRTL ? type.ar : type.en}
                      </div>
                    </div>
                  </div>

                  {/* Status + Amount */}
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{
                      padding: "5px 14px", borderRadius: "7px",
                      background: status.bg, color: status.color,
                      fontFamily: "'Zain', sans-serif", fontSize: "12px", fontWeight: 700,
                    }}>
                      {isRTL ? status.ar : status.en}
                    </span>
                    <div style={{ textAlign: isRTL ? "left" : "right" }}>
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "18px", fontWeight: 700, color: "#FAFAF7" }}>
                        {c.totalAmount.toLocaleString(isRTL ? "ar-SA" : "en-US")}
                      </div>
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>SAR</div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginBottom: "16px" }} />

                {/* Info grid */}
                <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", marginBottom: "14px" }}>
                  <div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "3px" }}>
                      {isRTL ? "تاريخ البداية" : "Start Date"}
                    </div>
                    <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                      {startDate}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "3px" }}>
                      {isRTL ? "تاريخ التسليم" : "Delivery"}
                    </div>
                    <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                      {endDate}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "3px" }}>
                      {isRTL ? "مدة التنفيذ" : "Duration"}
                    </div>
                    <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                      {c.deliveryDays} {isRTL ? "يوم" : "days"}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "3px" }}>
                      {isRTL ? "شروط الدفع" : "Payment Terms"}
                    </div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
                      {isRTL ? payment.ar : payment.en}
                    </div>
                  </div>
                  {c.revisions != null && (
                    <div>
                      <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "3px" }}>
                        {isRTL ? "جولات المراجعة" : "Revisions"}
                      </div>
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                        {c.revisions}
                      </div>
                    </div>
                  )}
                </div>

                {/* Service description */}
                {(c.serviceDescriptionAr || c.serviceDescription) && (
                  <div style={{ marginBottom: "14px", padding: "12px 14px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: "6px" }}>
                      {isRTL ? "نطاق العمل" : "Scope of Work"}
                    </div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
                      {isRTL ? (c.serviceDescriptionAr || c.serviceDescription) : (c.serviceDescription || c.serviceDescriptionAr)}
                    </div>
                  </div>
                )}

                {/* Deliverables */}
                {c.deliverables && c.deliverables.length > 0 && (
                  <div style={{ padding: "12px 14px", background: "rgba(200,169,98,0.04)", border: "1px solid rgba(200,169,98,0.1)", borderRadius: "8px" }}>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(200,169,98,0.6)", marginBottom: "8px" }}>
                      {isRTL ? "المنجزات المتفق عليها" : "Agreed Deliverables"}
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "5px" }}>
                      {c.deliverables.map((d, idx) => (
                        <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                          <span style={{ color: "#C8A962", marginTop: "1px", flexShrink: 0 }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                          <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Jurisdiction */}
                {c.jurisdiction && (
                  <div style={{ marginTop: "12px", fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
                    {isRTL ? `الاختصاص القضائي: ${c.jurisdiction}` : `Jurisdiction: ${c.jurisdiction}`}
                    {c.useArbitration != null && (
                      <span style={{ marginInlineStart: "12px" }}>
                        {isRTL
                          ? (c.useArbitration ? "· التحكيم عبر هيئة التحكيم التجاري السعودي" : "· المحاكم التجارية")
                          : (c.useArbitration ? "· SCCA Arbitration" : "· Commercial Courts")}
                      </span>
                    )}
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
