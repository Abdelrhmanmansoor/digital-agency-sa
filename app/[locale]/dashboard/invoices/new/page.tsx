"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Item {
  id: string;
  descAr: string;
  descEn: string;
  qty: number;
  unitPrice: number;
  total: number;
}

function newItem(): Item {
  return { id: Date.now().toString(), descAr: "", descEn: "", qty: 1, unitPrice: 0, total: 0 };
}

export default function NewInvoicePage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";

  const [items, setItems] = useState<Item[]>([newItem()]);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = items.reduce((s, i) => s + i.total, 0);
  const vat = Math.round(subtotal * 15) / 100;
  const total = subtotal + vat;

  function updateItem(id: string, field: keyof Item, val: string | number) {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: val };
      updated.total = updated.qty * updated.unitPrice;
      return updated;
    }));
  }

  function removeItem(id: string) {
    if (items.length === 1) return;
    setItems(prev => prev.filter(i => i.id !== id));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.some(i => !i.descAr || i.unitPrice <= 0)) {
      setError(isRTL ? "يرجى تعبئة جميع بنود الخدمة" : "Please fill all service items");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/client/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, dueDate: new Date(dueDate).toISOString(), notes, notesAr: notes }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "حدث خطأ");
        return;
      }
      router.push(`/${locale}/dashboard/invoices`);
    } catch {
      setError("حدث خطأ، حاول مجدداً");
    } finally {
      setLoading(false);
    }
  }

  const inp: React.CSSProperties = {
    width: "100%", padding: "10px 12px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px", color: "#FAFAF7",
    fontFamily: "'Zain', sans-serif", fontSize: "14px",
    outline: "none", boxSizing: "border-box",
  };
  const label: React.CSSProperties = {
    display: "block", fontFamily: "Space Mono, monospace",
    fontSize: "10px", letterSpacing: "0.12em",
    textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
    marginBottom: "6px",
  };

  return (
    <div style={{ padding: "32px 24px", maxWidth: "760px", direction: isRTL ? "rtl" : "ltr" }}>
      {/* Back */}
      <Link href={`/${locale}/dashboard/invoices`} style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        color: "rgba(255,255,255,0.4)", fontFamily: "'Zain', sans-serif",
        fontSize: "13px", textDecoration: "none", marginBottom: "24px",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d={isRTL ? "M5 12h14M12 5l7 7-7 7" : "M19 12H5M12 19l-7-7 7-7"} />
        </svg>
        {isRTL ? "رجوع للفواتير" : "Back to Invoices"}
      </Link>

      <h1 style={{ fontFamily: "'Zain', sans-serif", fontSize: "26px", fontWeight: 800, color: "#FAFAF7", marginBottom: "4px" }}>
        {isRTL ? "إنشاء فاتورة جديدة" : "New Invoice"}
      </h1>
      <p style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "32px" }}>
        {isRTL ? "ستُرسل الفاتورة للمراجعة وتفعيلها من فريقنا" : "Invoice will be reviewed and activated by our team"}
      </p>

      <form onSubmit={handleSubmit}>

        {/* Items */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "16px", fontWeight: 700, color: "#C8A962" }}>
              {isRTL ? "بنود الخدمة" : "Service Items"}
            </span>
            <button
              type="button"
              onClick={() => setItems(prev => [...prev, newItem()])}
              style={{
                padding: "6px 14px", background: "rgba(200,169,98,0.1)",
                border: "1px solid rgba(200,169,98,0.2)", borderRadius: "7px",
                color: "#C8A962", fontFamily: "'Zain', sans-serif", fontSize: "13px", cursor: "pointer",
              }}
            >
              + {isRTL ? "إضافة بند" : "Add Item"}
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {items.map((item, idx) => (
              <div key={item.id} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px", padding: "16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>
                    {isRTL ? `البند ${idx + 1}` : `Item ${idx + 1}`}
                  </span>
                  {items.length > 1 && (
                    <button type="button" onClick={() => removeItem(item.id)} style={{
                      background: "none", border: "none", color: "rgba(239,68,68,0.6)",
                      cursor: "pointer", padding: "2px 6px", fontSize: "16px",
                    }}>×</button>
                  )}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: "10px", alignItems: "end" }}>
                  <div>
                    <label style={label}>{isRTL ? "وصف الخدمة" : "Description"}</label>
                    <input
                      style={inp} required value={item.descAr}
                      placeholder={isRTL ? "مثال: تصميم متجر سلة" : "e.g. Salla store design"}
                      onChange={e => updateItem(item.id, "descAr", e.target.value)}
                    />
                  </div>
                  <div style={{ minWidth: "64px" }}>
                    <label style={label}>{isRTL ? "الكمية" : "Qty"}</label>
                    <input
                      style={{ ...inp, textAlign: "center" }} type="number" min="1" value={item.qty}
                      onChange={e => updateItem(item.id, "qty", Number(e.target.value))}
                    />
                  </div>
                  <div style={{ minWidth: "100px" }}>
                    <label style={label}>{isRTL ? "سعر الوحدة" : "Unit Price"}</label>
                    <input
                      style={{ ...inp, textAlign: "center" }} type="number" min="0" value={item.unitPrice || ""}
                      placeholder="0"
                      onChange={e => updateItem(item.id, "unitPrice", Number(e.target.value))}
                    />
                  </div>
                  <div style={{ minWidth: "90px" }}>
                    <label style={label}>{isRTL ? "الإجمالي" : "Total"}</label>
                    <div style={{
                      padding: "10px 12px", background: "rgba(200,169,98,0.06)",
                      border: "1px solid rgba(200,169,98,0.15)", borderRadius: "8px",
                      fontFamily: "Space Mono, monospace", fontSize: "13px",
                      color: "#C8A962", textAlign: "center", whiteSpace: "nowrap",
                    }}>
                      {item.total.toLocaleString(isRTL ? "ar-SA" : "en-US")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Totals summary */}
          <div style={{
            marginTop: "14px", padding: "14px 18px",
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "10px", display: "flex", flexDirection: "column", gap: "6px",
            alignItems: "flex-end",
          }}>
            <div style={{ display: "flex", gap: "32px" }}>
              <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                {isRTL ? "المجموع" : "Subtotal"}
              </span>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", color: "rgba(255,255,255,0.7)", minWidth: "80px", textAlign: "end" }}>
                {subtotal.toLocaleString(isRTL ? "ar-SA" : "en-US")} SAR
              </span>
            </div>
            <div style={{ display: "flex", gap: "32px" }}>
              <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                {isRTL ? "ضريبة 15%" : "VAT 15%"}
              </span>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", color: "rgba(255,255,255,0.7)", minWidth: "80px", textAlign: "end" }}>
                {vat.toLocaleString(isRTL ? "ar-SA" : "en-US")} SAR
              </span>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "8px", marginTop: "2px", display: "flex", gap: "32px" }}>
              <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "15px", fontWeight: 700, color: "#FAFAF7" }}>
                {isRTL ? "الإجمالي" : "Total"}
              </span>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "16px", fontWeight: 700, color: "#C8A962", minWidth: "80px", textAlign: "end" }}>
                {total.toLocaleString(isRTL ? "ar-SA" : "en-US")} SAR
              </span>
            </div>
          </div>
        </div>

        {/* Due date + Notes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
          <div>
            <label style={label}>{isRTL ? "تاريخ الاستحقاق" : "Due Date"}</label>
            <input style={inp} type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
          </div>
          <div>
            <label style={label}>{isRTL ? "ملاحظات (اختياري)" : "Notes (optional)"}</label>
            <input style={inp} type="text" value={notes}
              placeholder={isRTL ? "أي تفاصيل إضافية..." : "Any additional details..."}
              onChange={e => setNotes(e.target.value)} />
          </div>
        </div>

        {error && (
          <div style={{
            marginBottom: "20px", padding: "12px 16px",
            background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "8px", color: "#EF4444",
            fontFamily: "'Zain', sans-serif", fontSize: "14px",
          }}>
            {error}
          </div>
        )}

        <button
          type="submit" disabled={loading}
          style={{
            width: "100%", padding: "14px",
            background: loading ? "rgba(200,169,98,0.3)" : "rgba(200,169,98,0.15)",
            border: "1px solid rgba(200,169,98,0.4)",
            borderRadius: "10px", color: "#C8A962",
            fontFamily: "'Zain', sans-serif", fontSize: "16px", fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s",
          }}
        >
          {loading
            ? (isRTL ? "جاري الإرسال..." : "Submitting...")
            : (isRTL ? "إرسال الفاتورة للمراجعة" : "Submit Invoice for Review")}
        </button>
      </form>
    </div>
  );
}
