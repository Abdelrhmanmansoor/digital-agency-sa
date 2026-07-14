"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { InvoiceItem, PaymentMethodType, PaymentRecord, AdditionalCost, PaymentMethod } from "@/lib/db";

const DEFAULT_VAT_RATE = 15;

function today() {
  return new Date().toISOString().split("T")[0];
}
function inDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

const PAYMENT_METHODS: { type: PaymentMethodType; labelAr: string; labelEn: string; icon: string }[] = [
  { type: "bank", labelAr: "تحويل بنكي", labelEn: "Bank Transfer", icon: "🏦" },
  { type: "western_union", labelAr: "ويسترن يونيون", labelEn: "Western Union", icon: "💸" },
  { type: "paypal", labelAr: "باي بال", labelEn: "PayPal", icon: "💳" },
  { type: "instapay", labelAr: "إنستاباي", labelEn: "InstaPay", icon: "📱" },
  { type: "vodafone_cash", labelAr: "فودافون كاش", labelEn: "Vodafone Cash", icon: "📲" },
  { type: "cash", labelAr: "نقداً", labelEn: "Cash", icon: "💵" },
];

const CURRENCIES = [
  { code: "SAR", label: "ريال سعودي (SAR)", symbol: "ر.س" },
  { code: "USD", label: "دولار أمريكي (USD)", symbol: "$" },
  { code: "EGP", label: "جنيه مصري (EGP)", symbol: "ج.م" },
  { code: "EUR", label: "يورو (EUR)", symbol: "€" },
];

const FIELD = {
  input: (
    value: string | number,
    onChange: (v: string) => void,
    type = "text",
    placeholder = "",
    dir: "rtl" | "ltr" = "rtl"
  ) => (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      dir={dir}
      style={{
        width: "100%",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px",
        padding: "10px 14px",
        color: "#FAFAF7",
        fontFamily: dir === "ltr" ? "Space Mono, monospace" : "'ThmanyahSans', 'Zain', sans-serif",
        fontSize: "14px",
        boxSizing: "border-box",
        outline: "none",
      }}
    />
  ),
};

export default function NewInvoicePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // Client info
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCompany, setClientCompany] = useState("");

  // Invoice settings
  const [template, setTemplate] = useState<"classic" | "modern" | "minimal">("classic");
  const [status, setStatus] = useState<"draft" | "sent" | "paid" | "partial" | "cancelled">("draft");
  const [issueDate, setIssueDate] = useState(today());
  const [dueDate, setDueDate] = useState(inDays(14));
  const [currency, setCurrency] = useState<"SAR" | "USD" | "EGP" | "EUR">("SAR");

  // VAT settings
  const [vatEnabled, setVatEnabled] = useState(true);
  const [vatRate, setVatRate] = useState(DEFAULT_VAT_RATE);

  // Items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", descAr: "", descEn: "", qty: 1, unitPrice: 0, total: 0 },
  ]);

  // Payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>("bank");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "bank",
    bankName: "",
    iban: "",
    accountHolder: "",
    accountNumber: "",
    swiftCode: "",
    receiverName: "",
    receiverCountry: "",
    receiverCity: "",
    receiverPhone: "",
    paypalEmail: "",
    walletNumber: "",
    walletHolder: "",
  });

  // Previous payments
  const [payments, setPayments] = useState<PaymentRecord[]>([]);

  // Additional costs
  const [additionalCosts, setAdditionalCosts] = useState<AdditionalCost[]>([]);

  // Notes
  const [notesAr, setNotesAr] = useState("");
  const [notes, setNotes] = useState("");

  // Update payment method fields
  const updatePaymentMethod = (field: keyof PaymentMethod, value: string) => {
    setPaymentMethod((prev) => ({ ...prev, [field]: value }));
  };

  // Item handlers
  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) => {
      const updated = [...prev];
      const item = { ...updated[index], [field]: value };
      if (field === "qty" || field === "unitPrice") {
        item.total = Number(item.qty) * Number(item.unitPrice);
      }
      updated[index] = item;
      return updated;
    });
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), descAr: "", descEn: "", qty: 1, unitPrice: 0, total: 0 },
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Payment handlers
  const addPayment = () => {
    setPayments((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        date: today(),
        amount: 0,
        method: selectedPaymentMethod,
        transferNumber: "",
        notes: "",
      },
    ]);
  };

  const updatePayment = (index: number, field: keyof PaymentRecord, value: string | number) => {
    setPayments((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removePayment = (index: number) => {
    setPayments((prev) => prev.filter((_, i) => i !== index));
  };

  // Additional costs handlers
  const addCost = () => {
    setAdditionalCosts((prev) => [
      ...prev,
      { id: Date.now().toString(), descAr: "", descEn: "", amount: 0, type: "other" as const },
    ]);
  };

  const updateCost = (index: number, field: keyof AdditionalCost, value: string | number) => {
    setAdditionalCosts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removeCost = (index: number) => {
    setAdditionalCosts((prev) => prev.filter((_, i) => i !== index));
  };

  // Calculations
  const subtotal = items.reduce((s, item) => s + item.total, 0);
  const additionalCostsTotal = additionalCosts.reduce((s, c) => s + (Number(c.amount) || 0), 0);
  const taxableAmount = subtotal + additionalCostsTotal;
  const vat = vatEnabled ? parseFloat(((taxableAmount * vatRate) / 100).toFixed(2)) : 0;
  const total = parseFloat((taxableAmount + vat).toFixed(2));
  const totalPaid = payments.reduce((s, p) => s + (Number(p.amount) || 0), 0);
  const remainingBalance = total - totalPaid;

  const currencySymbol = CURRENCIES.find((c) => c.code === currency)?.symbol || currency;

  const handleSubmit = async () => {
    if (!clientName || !clientEmail) {
      alert("يرجى إدخال اسم العميل والبريد الإلكتروني");
      return;
    }
    setSaving(true);

    const invoiceData = {
      template,
      clientName,
      clientEmail,
      clientPhone,
      clientCompany: clientCompany || undefined,
      items,
      subtotal,
      vatRate: vatEnabled ? vatRate : 0,
      vat,
      total,
      currency,
      status,
      issueDate,
      dueDate,
      notes: notes || undefined,
      notesAr: notesAr || undefined,
      // Legacy bank fields for backwards compatibility
      bankName: paymentMethod.bankName || undefined,
      iban: paymentMethod.iban || undefined,
      accountHolder: paymentMethod.accountHolder || undefined,
      // New payment system
      paymentMethods: [{ ...paymentMethod, type: selectedPaymentMethod }],
      selectedPaymentMethod,
      // Payments
      payments: payments.length > 0 ? payments : undefined,
      totalPaid: totalPaid > 0 ? totalPaid : undefined,
      remainingBalance: remainingBalance > 0 ? remainingBalance : undefined,
      // Additional costs
      additionalCosts: additionalCosts.length > 0 ? additionalCosts : undefined,
      additionalCostsTotal: additionalCostsTotal > 0 ? additionalCostsTotal : undefined,
    };

    const res = await fetch("/api/admin/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoiceData),
    });
    if (res.ok) {
      const data = await res.json();
      router.push(`/admin/invoices/${data.id}`);
    } else {
      alert("حدث خطأ أثناء الحفظ");
      setSaving(false);
    }
  };

  const sectionStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "28px 32px",
    marginBottom: "24px",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    color: "rgba(255,255,255,0.45)",
    fontFamily: "Space Mono, monospace",
    letterSpacing: "0.08em",
    marginBottom: "6px",
  };

  const sectionTitle = (title: string, icon?: string) => (
    <div
      style={{
        fontSize: "16px",
        fontWeight: 700,
        color: "#F0B100",
        marginBottom: "20px",
        fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {icon && <span style={{ fontSize: "20px" }}>{icon}</span>}
      {title}
    </div>
  );

  const selectStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#FAFAF7",
    fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <div>
      <AdminSidebar />
      <div className="admin-main" style={{ background: "#0A0A0A", padding: "40px 48px", fontFamily: "'ThmanyahSans', 'Zain', sans-serif", direction: "rtl" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>
              فاتورة جديدة
            </h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: "4px 0 0", fontFamily: "Space Mono, monospace" }}>
              سيتم توليد رقم الفاتورة تلقائياً
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => router.back()}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.5)",
                borderRadius: "10px",
                padding: "11px 22px",
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              }}
            >
              إلغاء
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              style={{
                background: "#F0B100",
                color: "#0A0A0A",
                border: "none",
                borderRadius: "10px",
                padding: "11px 28px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer",
                fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "جارٍ الحفظ..." : "حفظ الفاتورة"}
            </button>
          </div>
        </div>

        {/* Template picker */}
        <div style={sectionStyle}>
          {sectionTitle("اختر النموذج", "🎨")}
          <div style={{ display: "flex", gap: "12px" }}>
            {(["classic", "modern", "minimal"] as const).map((t) => {
              const labels = { classic: "كلاسيك", modern: "عصري", minimal: "مبسط" };
              const descs = {
                classic: "خلفية ذهبية فاخرة",
                modern: "رأس داكن وتصميم حديث",
                minimal: "نظيف وبسيط",
              };
              return (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  style={{
                    flex: 1,
                    padding: "16px",
                    borderRadius: "10px",
                    border: `2px solid ${template === t ? "#F0B100" : "rgba(255,255,255,0.08)"}`,
                    background: template === t ? "rgba(240,177,0,0.1)" : "rgba(255,255,255,0.03)",
                    cursor: "pointer",
                    textAlign: "right",
                  }}
                >
                  <div style={{ fontSize: "15px", fontWeight: 700, color: template === t ? "#F0B100" : "#FAFAF7", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>
                    {labels[t]}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "4px", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>
                    {descs[t]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Client info */}
        <div style={sectionStyle}>
          {sectionTitle("بيانات العميل", "👤")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>اسم العميل *</label>
              {FIELD.input(clientName, setClientName, "text", "محمد أحمد")}
            </div>
            <div>
              <label style={labelStyle}>الشركة / المؤسسة</label>
              {FIELD.input(clientCompany, setClientCompany, "text", "اختياري")}
            </div>
            <div>
              <label style={labelStyle}>البريد الإلكتروني *</label>
              {FIELD.input(clientEmail, setClientEmail, "email", "client@example.com", "ltr")}
            </div>
            <div>
              <label style={labelStyle}>رقم الجوال</label>
              {FIELD.input(clientPhone, setClientPhone, "tel", "+966...", "ltr")}
            </div>
          </div>
        </div>

        {/* Invoice settings */}
        <div style={sectionStyle}>
          {sectionTitle("إعدادات الفاتورة", "⚙️")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>تاريخ الإصدار</label>
              {FIELD.input(issueDate, setIssueDate, "date")}
            </div>
            <div>
              <label style={labelStyle}>تاريخ الاستحقاق</label>
              {FIELD.input(dueDate, setDueDate, "date")}
            </div>
            <div>
              <label style={labelStyle}>العملة</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as typeof currency)}
                style={selectStyle}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>الحالة</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as typeof status)}
                style={selectStyle}
              >
                <option value="draft">مسودة</option>
                <option value="sent">مُرسلة</option>
                <option value="paid">مدفوعة</option>
                <option value="partial">مدفوعة جزئياً</option>
                <option value="cancelled">ملغاة</option>
              </select>
            </div>
          </div>

          {/* VAT Toggle */}
          <div style={{ marginTop: "20px", padding: "16px", background: "rgba(240,177,0,0.05)", borderRadius: "10px", border: "1px solid rgba(240,177,0,0.15)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  onClick={() => setVatEnabled(!vatEnabled)}
                  style={{
                    width: "52px",
                    height: "28px",
                    borderRadius: "14px",
                    border: "none",
                    background: vatEnabled ? "#F0B100" : "rgba(255,255,255,0.15)",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 0.3s",
                  }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "#FFF",
                      position: "absolute",
                      top: "3px",
                      left: vatEnabled ? "27px" : "3px",
                      transition: "left 0.3s",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  />
                </button>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#FAFAF7" }}>
                    ضريبة القيمة المضافة (VAT)
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                    {vatEnabled ? "مُفعّلة" : "معطّلة"}
                  </div>
                </div>
              </div>
              {vatEnabled && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <label style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>النسبة:</label>
                  <input
                    type="number"
                    value={vatRate}
                    onChange={(e) => setVatRate(Number(e.target.value) || 0)}
                    style={{
                      width: "70px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "6px",
                      padding: "6px 10px",
                      color: "#F0B100",
                      fontFamily: "Space Mono, monospace",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  />
                  <span style={{ fontSize: "14px", color: "#F0B100" }}>%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Line items */}
        <div style={sectionStyle}>
          {sectionTitle("بنود الفاتورة", "📝")}

          <div style={{ marginBottom: "8px", display: "grid", gridTemplateColumns: "1fr 80px 110px 110px 40px", gap: "8px" }}>
            {["الخدمة / الوصف", "الكمية", `سعر الوحدة (${currencySymbol})`, "الإجمالي", ""].map((h, i) => (
              <div key={i} style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono, monospace", letterSpacing: "0.05em", padding: "0 4px" }}>
                {h}
              </div>
            ))}
          </div>

          {items.map((item, i) => (
            <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 80px 110px 110px 40px", gap: "8px", marginBottom: "10px" }}>
              <div>
                {FIELD.input(item.descAr, (v) => updateItem(i, "descAr", v), "text", "وصف الخدمة بالعربي")}
                <div style={{ marginTop: "4px" }}>
                  {FIELD.input(item.descEn, (v) => updateItem(i, "descEn", v), "text", "English description (optional)", "ltr")}
                </div>
              </div>
              <input
                type="number"
                min={1}
                value={item.qty}
                onChange={(e) => updateItem(i, "qty", parseFloat(e.target.value) || 0)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "10px 10px",
                  color: "#FAFAF7",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "13px",
                  boxSizing: "border-box",
                  outline: "none",
                  textAlign: "center",
                }}
              />
              <input
                type="number"
                min={0}
                value={item.unitPrice}
                onChange={(e) => updateItem(i, "unitPrice", parseFloat(e.target.value) || 0)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "10px 10px",
                  color: "#FAFAF7",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "13px",
                  boxSizing: "border-box",
                  outline: "none",
                  textAlign: "center",
                }}
              />
              <div
                style={{
                  background: "rgba(240,177,0,0.06)",
                  border: "1px solid rgba(240,177,0,0.15)",
                  borderRadius: "8px",
                  padding: "10px",
                  textAlign: "center",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "13px",
                  color: "#F0B100",
                }}
              >
                {item.total.toFixed(2)}
              </div>
              <button
                onClick={() => removeItem(i)}
                disabled={items.length === 1}
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.15)",
                  color: "#EF4444",
                  borderRadius: "8px",
                  cursor: items.length === 1 ? "not-allowed" : "pointer",
                  opacity: items.length === 1 ? 0.3 : 1,
                  fontSize: "16px",
                }}
              >
                ×
              </button>
            </div>
          ))}

          <button
            onClick={addItem}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px dashed rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.5)",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              width: "100%",
              marginTop: "8px",
            }}
          >
            + إضافة بند
          </button>
        </div>

        {/* Additional Costs */}
        <div style={sectionStyle}>
          {sectionTitle("مصروفات إضافية (استضافة، دومين، رسوم...)", "💰")}
          
          {additionalCosts.map((cost, i) => (
            <div key={cost.id} style={{ display: "grid", gridTemplateColumns: "1fr 150px 120px 40px", gap: "12px", marginBottom: "10px" }}>
              <div>
                {FIELD.input(cost.descAr, (v) => updateCost(i, "descAr", v), "text", "وصف المصروف (مثل: استضافة سنوية)")}
              </div>
              <select
                value={cost.type}
                onChange={(e) => updateCost(i, "type", e.target.value)}
                style={selectStyle}
              >
                <option value="hosting">☁️ استضافة</option>
                <option value="domain">🌐 دومين</option>
                <option value="fee">📄 رسوم</option>
                <option value="other">📦 أخرى</option>
              </select>
              <input
                type="number"
                min={0}
                value={cost.amount}
                onChange={(e) => updateCost(i, "amount", parseFloat(e.target.value) || 0)}
                placeholder="المبلغ"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "10px 10px",
                  color: "#F59E0B",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "13px",
                  boxSizing: "border-box",
                  outline: "none",
                  textAlign: "center",
                }}
              />
              <button
                onClick={() => removeCost(i)}
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.15)",
                  color: "#EF4444",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                ×
              </button>
            </div>
          ))}

          <button
            onClick={addCost}
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1px dashed rgba(245,158,11,0.3)",
              color: "#F59E0B",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              width: "100%",
            }}
          >
            + إضافة مصروف
          </button>

          {additionalCostsTotal > 0 && (
            <div style={{ marginTop: "12px", padding: "10px 16px", background: "rgba(245,158,11,0.1)", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#F59E0B", fontWeight: 600 }}>إجمالي المصروفات</span>
              <span style={{ color: "#F59E0B", fontFamily: "Space Mono, monospace", fontWeight: 700 }}>{additionalCostsTotal.toFixed(2)} {currencySymbol}</span>
            </div>
          )}
        </div>

        {/* Totals */}
        <div style={sectionStyle}>
          {sectionTitle("ملخص الفاتورة", "🧾")}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ width: "320px" }}>
              {[
                { label: "المجموع الفرعي", value: `${subtotal.toFixed(2)} ${currencySymbol}`, color: "rgba(255,255,255,0.7)" },
                ...(additionalCostsTotal > 0 ? [{ label: "+ المصروفات", value: `${additionalCostsTotal.toFixed(2)} ${currencySymbol}`, color: "#F59E0B" }] : []),
                ...(vatEnabled ? [{ label: `ضريبة (${vatRate}%)`, value: `${vat.toFixed(2)} ${currencySymbol}`, color: "rgba(255,255,255,0.7)" }] : []),
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>{label}</span>
                  <span style={{ fontSize: "14px", fontFamily: "Space Mono, monospace", color }}>{value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", background: "rgba(240,177,0,0.15)", borderRadius: "10px", marginTop: "12px" }}>
                <span style={{ fontSize: "18px", fontWeight: 800, color: "#FAFAF7", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>الإجمالي</span>
                <span style={{ fontSize: "18px", fontWeight: 700, color: "#F0B100", fontFamily: "Space Mono, monospace" }}>{total.toFixed(2)} {currencySymbol}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div style={sectionStyle}>
          {sectionTitle("طريقة الدفع", "💳")}
          
          {/* Method selector */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.type}
                onClick={() => {
                  setSelectedPaymentMethod(m.type);
                  setPaymentMethod((prev) => ({ ...prev, type: m.type }));
                }}
                style={{
                  padding: "12px 20px",
                  borderRadius: "10px",
                  border: `2px solid ${selectedPaymentMethod === m.type ? "#F0B100" : "rgba(255,255,255,0.1)"}`,
                  background: selectedPaymentMethod === m.type ? "rgba(240,177,0,0.15)" : "rgba(255,255,255,0.03)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "20px" }}>{m.icon}</span>
                <span style={{ 
                  fontSize: "14px", 
                  fontWeight: 600, 
                  color: selectedPaymentMethod === m.type ? "#F0B100" : "#FAFAF7",
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                }}>
                  {m.labelAr}
                </span>
              </button>
            ))}
          </div>

          {/* Method-specific fields */}
          {selectedPaymentMethod === "bank" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>اسم البنك</label>
                {FIELD.input(paymentMethod.bankName || "", (v) => updatePaymentMethod("bankName", v), "text", "بنك الراجحي")}
              </div>
              <div>
                <label style={labelStyle}>اسم صاحب الحساب</label>
                {FIELD.input(paymentMethod.accountHolder || "", (v) => updatePaymentMethod("accountHolder", v), "text", "اسم صاحب الحساب")}
              </div>
              <div>
                <label style={labelStyle}>رقم IBAN</label>
                {FIELD.input(paymentMethod.iban || "", (v) => updatePaymentMethod("iban", v), "text", "SA...", "ltr")}
              </div>
              <div>
                <label style={labelStyle}>رقم الحساب (اختياري)</label>
                {FIELD.input(paymentMethod.accountNumber || "", (v) => updatePaymentMethod("accountNumber", v), "text", "", "ltr")}
              </div>
              <div>
                <label style={labelStyle}>SWIFT Code (اختياري)</label>
                {FIELD.input(paymentMethod.swiftCode || "", (v) => updatePaymentMethod("swiftCode", v), "text", "", "ltr")}
              </div>
            </div>
          )}

          {selectedPaymentMethod === "western_union" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>اسم المستلم (بالإنجليزية كما في الهوية)</label>
                {FIELD.input(paymentMethod.receiverName || "", (v) => updatePaymentMethod("receiverName", v), "text", "MOHAMED AHMED", "ltr")}
              </div>
              <div>
                <label style={labelStyle}>الدولة</label>
                {FIELD.input(paymentMethod.receiverCountry || "", (v) => updatePaymentMethod("receiverCountry", v), "text", "Egypt")}
              </div>
              <div>
                <label style={labelStyle}>المدينة</label>
                {FIELD.input(paymentMethod.receiverCity || "", (v) => updatePaymentMethod("receiverCity", v), "text", "Cairo")}
              </div>
              <div>
                <label style={labelStyle}>رقم الهاتف</label>
                {FIELD.input(paymentMethod.receiverPhone || "", (v) => updatePaymentMethod("receiverPhone", v), "tel", "+20...", "ltr")}
              </div>
            </div>
          )}

          {selectedPaymentMethod === "paypal" && (
            <div>
              <label style={labelStyle}>بريد PayPal</label>
              {FIELD.input(paymentMethod.paypalEmail || "", (v) => updatePaymentMethod("paypalEmail", v), "email", "payment@example.com", "ltr")}
            </div>
          )}

          {(selectedPaymentMethod === "instapay" || selectedPaymentMethod === "vodafone_cash") && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>رقم المحفظة</label>
                {FIELD.input(paymentMethod.walletNumber || "", (v) => updatePaymentMethod("walletNumber", v), "tel", "01xxxxxxxxx", "ltr")}
              </div>
              <div>
                <label style={labelStyle}>اسم صاحب المحفظة</label>
                {FIELD.input(paymentMethod.walletHolder || "", (v) => updatePaymentMethod("walletHolder", v), "text", "محمد أحمد")}
              </div>
            </div>
          )}
        </div>

        {/* Previous Payments */}
        <div style={sectionStyle}>
          {sectionTitle("المدفوعات السابقة", "📋")}
          
          {payments.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px", color: "rgba(255,255,255,0.3)" }}>
              لا توجد مدفوعات سابقة مسجلة
            </div>
          ) : (
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 130px 150px 40px", gap: "8px", marginBottom: "8px" }}>
                {["التاريخ", "المبلغ", "الطريقة", "رقم الحوالة", ""].map((h, i) => (
                  <div key={i} style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono, monospace" }}>{h}</div>
                ))}
              </div>
              {payments.map((payment, i) => (
                <div key={payment.id} style={{ display: "grid", gridTemplateColumns: "140px 1fr 130px 150px 40px", gap: "8px", marginBottom: "8px" }}>
                  <input
                    type="date"
                    value={payment.date}
                    onChange={(e) => updatePayment(i, "date", e.target.value)}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      padding: "10px",
                      color: "#FAFAF7",
                      fontFamily: "Space Mono, monospace",
                      fontSize: "12px",
                    }}
                  />
                  <input
                    type="number"
                    value={payment.amount}
                    onChange={(e) => updatePayment(i, "amount", parseFloat(e.target.value) || 0)}
                    placeholder="المبلغ"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      padding: "10px",
                      color: "#22C55E",
                      fontFamily: "Space Mono, monospace",
                      fontSize: "13px",
                      textAlign: "center",
                    }}
                  />
                  <select
                    value={payment.method}
                    onChange={(e) => updatePayment(i, "method", e.target.value)}
                    style={{
                      ...selectStyle,
                      fontSize: "12px",
                    }}
                  >
                    {PAYMENT_METHODS.map((m) => (
                      <option key={m.type} value={m.type}>{m.icon} {m.labelAr}</option>
                    ))}
                  </select>
                  {FIELD.input(payment.transferNumber || "", (v) => updatePayment(i, "transferNumber", v), "text", "MTCN / رقم الحوالة", "ltr")}
                  <button
                    onClick={() => removePayment(i)}
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.15)",
                      color: "#EF4444",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={addPayment}
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px dashed rgba(34,197,94,0.3)",
              color: "#22C55E",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              width: "100%",
            }}
          >
            + إضافة دفعة سابقة
          </button>

          {/* Payment summary */}
          {totalPaid > 0 && (
            <div style={{ marginTop: "20px", padding: "16px", background: "rgba(34,197,94,0.05)", borderRadius: "10px", border: "1px solid rgba(34,197,94,0.2)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", textAlign: "center" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>إجمالي الفاتورة</div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#FAFAF7", fontFamily: "Space Mono, monospace" }}>{total.toFixed(2)} {currencySymbol}</div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>المدفوع</div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#22C55E", fontFamily: "Space Mono, monospace" }}>{totalPaid.toFixed(2)} {currencySymbol}</div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>المتبقي</div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: remainingBalance > 0 ? "#EF4444" : "#22C55E", fontFamily: "Space Mono, monospace" }}>
                    {remainingBalance.toFixed(2)} {currencySymbol}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notes */}
        <div style={sectionStyle}>
          {sectionTitle("ملاحظات (اختياري)", "📝")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>ملاحظات بالعربي</label>
              <textarea
                value={notesAr}
                onChange={(e) => setNotesAr(e.target.value)}
                placeholder="شكراً على ثقتكم بنا..."
                rows={3}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#FAFAF7",
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>
            <div>
              <label style={labelStyle}>Notes (English)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Thank you for your business..."
                rows={3}
                dir="ltr"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#FAFAF7",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "12px",
                  boxSizing: "border-box",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        </div>

        {/* Save button bottom */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingBottom: "40px" }}>
          <button
            onClick={() => router.back()}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.5)",
              borderRadius: "10px",
              padding: "12px 24px",
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
            }}
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            style={{
              background: "#F0B100",
              color: "#0A0A0A",
              border: "none",
              borderRadius: "10px",
              padding: "12px 32px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: saving ? "not-allowed" : "pointer",
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? "جارٍ الحفظ..." : "حفظ وعرض الفاتورة"}
          </button>
        </div>
      </div>
    </div>
  );
}
