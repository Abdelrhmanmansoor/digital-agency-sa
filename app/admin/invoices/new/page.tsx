"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { InvoiceItem } from "@/lib/db";

const VAT_RATE = 15;

function today() {
  return new Date().toISOString().split("T")[0];
}
function inDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

const FIELD = {
  input: (
    value: string | number,
    onChange: (v: string) => void,
    type = "text",
    placeholder = ""
  ) => (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px",
        padding: "10px 14px",
        color: "#FAFAF7",
        fontFamily: "'Zain', sans-serif",
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
  const [status, setStatus] = useState<"draft" | "sent" | "paid" | "cancelled">("draft");
  const [issueDate, setIssueDate] = useState(today());
  const [dueDate, setDueDate] = useState(inDays(14));

  // Items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", descAr: "", descEn: "", qty: 1, unitPrice: 0, total: 0 },
  ]);

  // Bank
  const [bankName, setBankName] = useState("");
  const [iban, setIban] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  // Notes
  const [notesAr, setNotesAr] = useState("");
  const [notes, setNotes] = useState("");

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

  const subtotal = items.reduce((s, item) => s + item.total, 0);
  const vat = parseFloat(((subtotal * VAT_RATE) / 100).toFixed(2));
  const total = parseFloat((subtotal + vat).toFixed(2));

  const handleSubmit = async () => {
    if (!clientName || !clientEmail) {
      alert("يرجى إدخال اسم العميل والبريد الإلكتروني");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/admin/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        template,
        clientName,
        clientEmail,
        clientPhone,
        clientCompany: clientCompany || undefined,
        items,
        subtotal,
        vatRate: VAT_RATE,
        vat,
        total,
        currency: "SAR" as const,
        status,
        issueDate,
        dueDate,
        notes: notes || undefined,
        notesAr: notesAr || undefined,
        bankName: bankName || undefined,
        iban: iban || undefined,
        accountHolder: accountHolder || undefined,
      }),
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

  const sectionTitle = (title: string) => (
    <div
      style={{
        fontSize: "16px",
        fontWeight: 700,
        color: "#C8A962",
        marginBottom: "20px",
        fontFamily: "'Zain', sans-serif",
      }}
    >
      {title}
    </div>
  );

  return (
    <div>
      <AdminSidebar />
      <div className="admin-main" style={{ background: "#0A0A0A", padding: "40px 48px", fontFamily: "'Zain', sans-serif", direction: "rtl" }}>

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
                fontFamily: "'Zain', sans-serif",
              }}
            >
              إلغاء
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              style={{
                background: "#C8A962",
                color: "#0A0A0A",
                border: "none",
                borderRadius: "10px",
                padding: "11px 28px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer",
                fontFamily: "'Zain', sans-serif",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "جارٍ الحفظ..." : "حفظ الفاتورة"}
            </button>
          </div>
        </div>

        {/* Template picker */}
        <div style={sectionStyle}>
          {sectionTitle("اختر النموذج")}
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
                    border: `2px solid ${template === t ? "#C8A962" : "rgba(255,255,255,0.08)"}`,
                    background: template === t ? "rgba(200,169,98,0.1)" : "rgba(255,255,255,0.03)",
                    cursor: "pointer",
                    textAlign: "right",
                  }}
                >
                  <div style={{ fontSize: "15px", fontWeight: 700, color: template === t ? "#C8A962" : "#FAFAF7", fontFamily: "'Zain', sans-serif" }}>
                    {labels[t]}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "4px", fontFamily: "'Zain', sans-serif" }}>
                    {descs[t]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Client info */}
        <div style={sectionStyle}>
          {sectionTitle("بيانات العميل")}
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
              {FIELD.input(clientEmail, setClientEmail, "email", "client@example.com")}
            </div>
            <div>
              <label style={labelStyle}>رقم الجوال</label>
              {FIELD.input(clientPhone, setClientPhone, "tel", "+966...")}
            </div>
          </div>
        </div>

        {/* Invoice settings */}
        <div style={sectionStyle}>
          {sectionTitle("إعدادات الفاتورة")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>تاريخ الإصدار</label>
              {FIELD.input(issueDate, setIssueDate, "date")}
            </div>
            <div>
              <label style={labelStyle}>تاريخ الاستحقاق</label>
              {FIELD.input(dueDate, setDueDate, "date")}
            </div>
            <div>
              <label style={labelStyle}>الحالة</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as typeof status)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#FAFAF7",
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              >
                <option value="draft">مسودة</option>
                <option value="sent">مُرسلة</option>
                <option value="paid">مدفوعة</option>
                <option value="cancelled">ملغاة</option>
              </select>
            </div>
          </div>
        </div>

        {/* Line items */}
        <div style={sectionStyle}>
          {sectionTitle("بنود الفاتورة")}

          <div style={{ marginBottom: "8px", display: "grid", gridTemplateColumns: "1fr 80px 110px 110px 40px", gap: "8px" }}>
            {["الخدمة / الوصف", "الكمية", "سعر الوحدة (ر.س)", "الإجمالي", ""].map((h, i) => (
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
                  {FIELD.input(item.descEn, (v) => updateItem(i, "descEn", v), "text", "English description (optional)")}
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
                  background: "rgba(200,169,98,0.06)",
                  border: "1px solid rgba(200,169,98,0.15)",
                  borderRadius: "8px",
                  padding: "10px",
                  textAlign: "center",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "13px",
                  color: "#C8A962",
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
              fontFamily: "'Zain', sans-serif",
              width: "100%",
              marginTop: "8px",
            }}
          >
            + إضافة بند
          </button>

          {/* Totals summary */}
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ width: "260px" }}>
              {[
                { label: "المجموع الفرعي", value: `${subtotal.toFixed(2)} ر.س` },
                { label: `ضريبة (${VAT_RATE}%)`, value: `${vat.toFixed(2)} ر.س` },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", fontFamily: "'Zain', sans-serif" }}>{label}</span>
                  <span style={{ fontSize: "13px", fontFamily: "Space Mono, monospace", color: "rgba(255,255,255,0.7)" }}>{value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "rgba(200,169,98,0.1)", borderRadius: "8px", marginTop: "8px" }}>
                <span style={{ fontSize: "16px", fontWeight: 800, color: "#FAFAF7", fontFamily: "'Zain', sans-serif" }}>الإجمالي</span>
                <span style={{ fontSize: "16px", fontWeight: 700, color: "#C8A962", fontFamily: "Space Mono, monospace" }}>{total.toFixed(2)} ر.س</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bank info */}
        <div style={sectionStyle}>
          {sectionTitle("معلومات الحساب البنكي (اختياري)")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>اسم البنك</label>
              {FIELD.input(bankName, setBankName, "text", "بنك الراجحي")}
            </div>
            <div>
              <label style={labelStyle}>اسم صاحب الحساب</label>
              {FIELD.input(accountHolder, setAccountHolder, "text", "وكالة رقمية")}
            </div>
            <div>
              <label style={labelStyle}>رقم IBAN</label>
              {FIELD.input(iban, setIban, "text", "SA...")}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={sectionStyle}>
          {sectionTitle("ملاحظات (اختياري)")}
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
                  fontFamily: "'Zain', sans-serif",
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
                  direction: "ltr",
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
              fontFamily: "'Zain', sans-serif",
            }}
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            style={{
              background: "#C8A962",
              color: "#0A0A0A",
              border: "none",
              borderRadius: "10px",
              padding: "12px 32px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: saving ? "not-allowed" : "pointer",
              fontFamily: "'Zain', sans-serif",
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
