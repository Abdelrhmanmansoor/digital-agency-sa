"use client";

import { Invoice, PaymentMethodType, PaymentRecord, AdditionalCost, PaymentMethod } from "@/lib/db";

const STATUS_LABELS: Record<string, string> = {
  draft: "مسودة",
  sent: "مُرسلة",
  paid: "مدفوعة",
  partial: "مدفوعة جزئياً",
  cancelled: "ملغاة",
};

const STATUS_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  draft:     { bg: "#F5F5F4", color: "#6B7280", border: "#E5E7EB" },
  sent:      { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
  paid:      { bg: "#F0FDF4", color: "#15803D", border: "#BBF7D0" },
  partial:   { bg: "#FFFBEB", color: "#B45309", border: "#FDE68A" },
  cancelled: { bg: "#FEF2F2", color: "#B91C1C", border: "#FECACA" },
};

const PAYMENT_METHOD_LABELS: Record<PaymentMethodType, { ar: string; en: string; icon: string }> = {
  bank:          { ar: "تحويل بنكي", en: "Bank Transfer", icon: "🏦" },
  western_union: { ar: "ويسترن يونيون", en: "Western Union", icon: "💸" },
  paypal:        { ar: "باي بال", en: "PayPal", icon: "💳" },
  cash:          { ar: "نقداً", en: "Cash", icon: "💵" },
  instapay:      { ar: "إنستاباي", en: "InstaPay", icon: "📱" },
  vodafone_cash: { ar: "فودافون كاش", en: "Vodafone Cash", icon: "📲" },
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  SAR: "ر.س",
  USD: "$",
  EGP: "ج.م",
  EUR: "€",
};

function fmt(n: number, currency: string = "SAR") {
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

/* ── Logo watermark - MORE VISIBLE ─────────────────────────────────────────*/
function Watermark() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(-22deg)",
        width: "100%",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.12,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt=""
        style={{
          width: "280px",
          height: "auto",
          filter: "sepia(0.5) saturate(0.6)",
        }}
      />
      <div style={{
        fontFamily: "Space Mono, monospace",
        fontSize: "14px",
        letterSpacing: "0.3em",
        color: "#C8A962",
        marginTop: "8px",
        fontWeight: 600,
      }}>
        DIGITAL AGENCY
      </div>
    </div>
  );
}

/* ── Payment Method Details Section ─────────────────────────────────────────*/
function PaymentMethodSection({ 
  method, 
  invoice,
  accent 
}: { 
  method?: PaymentMethod; 
  invoice: Invoice;
  accent: string;
}) {
  // Fallback to legacy fields if no new payment methods
  const hasLegacyBank = invoice.bankName || invoice.iban || invoice.accountHolder;
  
  if (!method && !hasLegacyBank) return null;

  const renderBankDetails = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA", marginBottom: "3px" }}>اسم البنك</div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 700, color: "#222" }}>
          {method?.bankName || invoice.bankName}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA", marginBottom: "3px" }}>صاحب الحساب</div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 700, color: "#222" }}>
          {method?.accountHolder || invoice.accountHolder}
        </div>
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA", marginBottom: "3px" }}>رقم الآيبان (IBAN)</div>
        <div style={{ 
          fontFamily: "Space Mono, monospace", 
          fontSize: "13px", 
          letterSpacing: "0.08em", 
          color: "#0A0A0A",
          background: "rgba(200, 169, 98, 0.08)",
          padding: "8px 12px",
          borderRadius: "6px",
          border: `1px solid ${accent}30`,
          direction: "ltr",
          textAlign: "left",
        }}>
          {method?.iban || invoice.iban}
        </div>
      </div>
      {(method?.accountNumber) && (
        <div>
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA", marginBottom: "3px" }}>رقم الحساب</div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "#222", direction: "ltr" }}>
            {method.accountNumber}
          </div>
        </div>
      )}
      {(method?.swiftCode) && (
        <div>
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA", marginBottom: "3px" }}>SWIFT Code</div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "#222", direction: "ltr" }}>
            {method.swiftCode}
          </div>
        </div>
      )}
    </div>
  );

  const renderWesternUnion = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <div style={{ gridColumn: "1 / -1", background: "#FFF8E1", padding: "12px 16px", borderRadius: "8px", border: "1px solid #FFE082" }}>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", fontWeight: 700, color: "#F57C00", marginBottom: "8px" }}>
          ⚡ خطوات التحويل عبر ويسترن يونيون
        </div>
        <ol style={{ margin: 0, paddingRight: "16px", fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "#5D4037", lineHeight: 1.8 }}>
          <li>توجه لأقرب فرع ويسترن يونيون</li>
          <li>اختر "إرسال أموال" (Send Money)</li>
          <li>أدخل بيانات المستلم أدناه</li>
          <li>احتفظ برقم التتبع (MTCN) وأرسله لنا</li>
        </ol>
      </div>
      <div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA", marginBottom: "3px" }}>اسم المستلم (بالإنجليزية)</div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "15px", fontWeight: 800, color: "#0A0A0A" }}>
          {method?.receiverName}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA", marginBottom: "3px" }}>الدولة</div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 700, color: "#222" }}>
          {method?.receiverCountry}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA", marginBottom: "3px" }}>المدينة</div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 700, color: "#222" }}>
          {method?.receiverCity}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA", marginBottom: "3px" }}>رقم الهاتف</div>
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", color: "#222", direction: "ltr" }}>
          {method?.receiverPhone}
        </div>
      </div>
    </div>
  );

  const renderPayPal = () => (
    <div>
      <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA", marginBottom: "3px" }}>PayPal Email</div>
      <div style={{ 
        fontFamily: "Space Mono, monospace", 
        fontSize: "14px", 
        color: "#0A0A0A",
        background: "#E3F2FD",
        padding: "10px 14px",
        borderRadius: "6px",
        border: "1px solid #90CAF9",
        direction: "ltr",
        textAlign: "left",
      }}>
        {method?.paypalEmail}
      </div>
    </div>
  );

  const renderWallet = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA", marginBottom: "3px" }}>رقم المحفظة</div>
        <div style={{ 
          fontFamily: "Space Mono, monospace", 
          fontSize: "16px", 
          fontWeight: 700,
          color: "#0A0A0A",
          background: method?.type === "vodafone_cash" ? "#FFEBEE" : "#E8F5E9",
          padding: "10px 14px",
          borderRadius: "6px",
          border: `1px solid ${method?.type === "vodafone_cash" ? "#EF9A9A" : "#A5D6A7"}`,
          direction: "ltr",
          textAlign: "left",
        }}>
          {method?.walletNumber}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#AAA", marginBottom: "3px" }}>اسم صاحب المحفظة</div>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 700, color: "#222" }}>
          {method?.walletHolder}
        </div>
      </div>
    </div>
  );

  const selectedMethod = method || (hasLegacyBank ? { type: "bank" as PaymentMethodType } : null);
  const methodInfo = selectedMethod ? PAYMENT_METHOD_LABELS[selectedMethod.type] : null;

  return (
    <div style={{ 
      background: "#F8F5EE", 
      borderRadius: "12px", 
      padding: "20px 24px", 
      marginBottom: "24px", 
      direction: "rtl", 
      border: `2px solid ${accent}40`,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative corner */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "60px",
        height: "60px",
        background: `linear-gradient(135deg, ${accent} 0%, transparent 50%)`,
        opacity: 0.15,
      }} />
      
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "12px", 
        marginBottom: "16px",
        borderBottom: `1px solid ${accent}30`,
        paddingBottom: "12px",
      }}>
        <span style={{ fontSize: "24px" }}>{methodInfo?.icon || "💳"}</span>
        <div>
          <div style={{ 
            fontFamily: "Space Mono, monospace", 
            fontSize: "8px", 
            color: accent, 
            letterSpacing: "0.22em", 
            textTransform: "uppercase",
          }}>
            طريقة الدفع
          </div>
          <div style={{ 
            fontFamily: "'Zain', sans-serif", 
            fontSize: "16px", 
            fontWeight: 800, 
            color: "#0A0A0A",
          }}>
            {methodInfo?.ar || "تحويل بنكي"}
          </div>
        </div>
      </div>

      {(!selectedMethod || selectedMethod.type === "bank") && renderBankDetails()}
      {selectedMethod?.type === "western_union" && renderWesternUnion()}
      {selectedMethod?.type === "paypal" && renderPayPal()}
      {(selectedMethod?.type === "instapay" || selectedMethod?.type === "vodafone_cash") && renderWallet()}
    </div>
  );
}

/* ── Previous Payments History Section ──────────────────────────────────────*/
function PaymentsHistory({ 
  payments, 
  totalPaid, 
  total, 
  currency,
  accent 
}: { 
  payments?: PaymentRecord[];
  totalPaid?: number;
  total: number;
  currency: string;
  accent: string;
}) {
  if (!payments?.length) return null;

  const remaining = total - (totalPaid || 0);
  const paidPercentage = Math.min(100, ((totalPaid || 0) / total) * 100);
  const currencySymbol = CURRENCY_SYMBOLS[currency] || currency;

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #F8F5EE 0%, #FFF 100%)", 
      borderRadius: "12px", 
      padding: "20px 24px", 
      marginBottom: "24px", 
      direction: "rtl",
      border: "1px solid #E0D8CC",
    }}>
      <div style={{ 
        fontFamily: "Space Mono, monospace", 
        fontSize: "8px", 
        color: accent, 
        letterSpacing: "0.22em", 
        textTransform: "uppercase", 
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <span style={{ fontSize: "16px" }}>📋</span>
        سجل المدفوعات السابقة
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          marginBottom: "8px",
          fontFamily: "'Zain', sans-serif",
          fontSize: "12px",
        }}>
          <span style={{ color: "#666" }}>نسبة السداد</span>
          <span style={{ fontWeight: 700, color: accent }}>{paidPercentage.toFixed(0)}%</span>
        </div>
        <div style={{ 
          height: "10px", 
          background: "#E8E6E1", 
          borderRadius: "5px", 
          overflow: "hidden",
        }}>
          <div style={{ 
            width: `${paidPercentage}%`, 
            height: "100%", 
            background: `linear-gradient(90deg, ${accent}, #BDEE63)`,
            borderRadius: "5px",
            transition: "width 0.5s ease",
          }} />
        </div>
      </div>

      {/* Payments table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
        <thead>
          <tr style={{ background: "#0A0A0A" }}>
            <th style={{ padding: "8px 12px", textAlign: "right", fontFamily: "Space Mono, monospace", fontSize: "8px", color: accent, letterSpacing: "0.12em" }}>التاريخ</th>
            <th style={{ padding: "8px 12px", textAlign: "center", fontFamily: "Space Mono, monospace", fontSize: "8px", color: accent, letterSpacing: "0.12em" }}>المبلغ</th>
            <th style={{ padding: "8px 12px", textAlign: "center", fontFamily: "Space Mono, monospace", fontSize: "8px", color: accent, letterSpacing: "0.12em" }}>الطريقة</th>
            <th style={{ padding: "8px 12px", textAlign: "left", fontFamily: "Space Mono, monospace", fontSize: "8px", color: accent, letterSpacing: "0.12em" }}>رقم الحوالة</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, i) => (
            <tr key={payment.id} style={{ borderBottom: "1px solid #E8E6E1", background: i % 2 === 1 ? "#FAFAF8" : "white" }}>
              <td style={{ padding: "10px 12px", fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "#333" }}>
                {fmtDate(payment.date)}
              </td>
              <td style={{ padding: "10px 12px", textAlign: "center", fontFamily: "Space Mono, monospace", fontSize: "12px", fontWeight: 600, color: "#15803D" }}>
                +{fmt(payment.amount)} {currencySymbol}
              </td>
              <td style={{ padding: "10px 12px", textAlign: "center", fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "#666" }}>
                {PAYMENT_METHOD_LABELS[payment.method]?.ar || payment.method}
              </td>
              <td style={{ padding: "10px 12px", textAlign: "left", fontFamily: "Space Mono, monospace", fontSize: "11px", color: "#888" }}>
                {payment.transferNumber || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr 1fr", 
        gap: "12px",
        padding: "16px",
        background: "#0A0A0A",
        borderRadius: "8px",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "8px", color: "rgba(200,169,98,0.6)", letterSpacing: "0.12em", marginBottom: "4px" }}>إجمالي الفاتورة</div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "14px", fontWeight: 700, color: "#FFF" }}>{fmt(total)} {currencySymbol}</div>
        </div>
        <div style={{ textAlign: "center", borderInline: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "8px", color: "rgba(200,169,98,0.6)", letterSpacing: "0.12em", marginBottom: "4px" }}>المدفوع</div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "14px", fontWeight: 700, color: "#BDEE63" }}>{fmt(totalPaid || 0)} {currencySymbol}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "8px", color: "rgba(200,169,98,0.6)", letterSpacing: "0.12em", marginBottom: "4px" }}>المتبقي</div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "14px", fontWeight: 700, color: remaining > 0 ? "#F87171" : "#BDEE63" }}>
            {fmt(remaining)} {currencySymbol}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Additional Costs Section ───────────────────────────────────────────────*/
function AdditionalCostsSection({ 
  costs, 
  total,
  currency,
  accent 
}: { 
  costs?: AdditionalCost[];
  total?: number;
  currency: string;
  accent: string;
}) {
  if (!costs?.length) return null;

  const currencySymbol = CURRENCY_SYMBOLS[currency] || currency;
  const typeIcons: Record<string, string> = {
    hosting: "☁️",
    domain: "🌐",
    fee: "📄",
    other: "📦",
  };
  const typeLabels: Record<string, string> = {
    hosting: "استضافة",
    domain: "دومين",
    fee: "رسوم",
    other: "أخرى",
  };

  return (
    <div style={{ 
      background: "#FFF9E6", 
      borderRadius: "10px", 
      padding: "16px 20px", 
      marginBottom: "20px", 
      direction: "rtl",
      border: "1px solid #FFE082",
    }}>
      <div style={{ 
        fontFamily: "Space Mono, monospace", 
        fontSize: "8px", 
        color: "#F57C00", 
        letterSpacing: "0.18em", 
        textTransform: "uppercase", 
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}>
        <span>💰</span>
        مصروفات ورسوم إضافية
      </div>

      {costs.map((cost) => (
        <div key={cost.id} style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          padding: "8px 0",
          borderBottom: "1px dashed #FFE082",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px" }}>{typeIcons[cost.type]}</span>
            <div>
              <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 600, color: "#333" }}>
                {cost.descAr}
              </div>
              <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "10px", color: "#888" }}>
                {typeLabels[cost.type]}
              </div>
            </div>
          </div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", fontWeight: 600, color: "#F57C00" }}>
            {fmt(cost.amount)} {currencySymbol}
          </div>
        </div>
      ))}

      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginTop: "12px",
        padding: "10px 12px",
        background: "#FFE082",
        borderRadius: "6px",
      }}>
        <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 800, color: "#5D4037" }}>
          إجمالي المصروفات
        </div>
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "14px", fontWeight: 700, color: "#5D4037" }}>
          {fmt(total || 0)} {currencySymbol}
        </div>
      </div>
    </div>
  );
}

/* ── Shared: items table + totals ────────────────────────────────────────────*/
function InvoiceBody({ invoice, accent }: { invoice: Invoice; accent: string }) {
  const currencySymbol = CURRENCY_SYMBOLS[invoice.currency] || invoice.currency;
  const selectedMethod = invoice.paymentMethods?.find(m => m.type === invoice.selectedPaymentMethod) 
    || invoice.paymentMethods?.[0];

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

      {/* ── Additional Costs ── */}
      <AdditionalCostsSection 
        costs={invoice.additionalCosts} 
        total={invoice.additionalCostsTotal}
        currency={invoice.currency}
        accent={accent}
      />

      {/* ── Totals ── */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "28px" }}>
        <div style={{ width: "300px", direction: "rtl" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 2px", borderBottom: "1px solid #EEEBE5" }}>
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "#777" }}>المجموع الفرعي</span>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12.5px", color: "#333" }}>{fmt(invoice.subtotal)} {currencySymbol}</span>
          </div>
          {(invoice.additionalCostsTotal || 0) > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 2px", borderBottom: "1px solid #EEEBE5" }}>
              <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "#F57C00" }}>+ المصروفات الإضافية</span>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12.5px", color: "#F57C00" }}>{fmt(invoice.additionalCostsTotal || 0)} {currencySymbol}</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 2px", borderBottom: "1px solid #EEEBE5" }}>
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "#777" }}>ضريبة القيمة المضافة ({invoice.vatRate}٪)</span>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12.5px", color: "#333" }}>{fmt(invoice.vat)} {currencySymbol}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px", background: accent, borderRadius: "8px", marginTop: "10px" }}>
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "18px", fontWeight: 800, color: "#0A0A0A" }}>الإجمالي</span>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "16px", fontWeight: 700, color: "#0A0A0A" }}>{fmt(invoice.total)} {currencySymbol}</span>
          </div>
          
          {/* Remaining balance if partial payment */}
          {invoice.status === "partial" && invoice.remainingBalance && invoice.remainingBalance > 0 && (
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "10px 16px", 
              background: "#FEF2F2", 
              borderRadius: "8px", 
              marginTop: "8px",
              border: "1px solid #FECACA",
            }}>
              <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 700, color: "#B91C1C" }}>المتبقي للسداد</span>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "14px", fontWeight: 700, color: "#B91C1C" }}>{fmt(invoice.remainingBalance)} {currencySymbol}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Payments History ── */}
      <PaymentsHistory 
        payments={invoice.payments}
        totalPaid={invoice.totalPaid}
        total={invoice.total}
        currency={invoice.currency}
        accent={accent}
      />

      {/* ── Payment Method ── */}
      <PaymentMethodSection method={selectedMethod} invoice={invoice} accent={accent} />

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
