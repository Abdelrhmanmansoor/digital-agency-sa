"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Invoice, InvoiceItem } from "@/lib/db";

const VAT_RATE = 15;

export default function EditInvoicePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [template, setTemplate] = useState<"classic" | "modern" | "minimal">("classic");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [status, setStatus] = useState<Invoice["status"]>("draft");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [bankName, setBankName] = useState("");
  const [iban, setIban] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [notesAr, setNotesAr] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch(`/api/admin/invoices/${id}`)
      .then((r) => {
        if (r.status === 401) { router.push("/admin"); return null; }
        return r.json();
      })
      .then((inv: Invoice | null) => {
        if (!inv) return;
        setTemplate(inv.template);
        setClientName(inv.clientName);
        setClientEmail(inv.clientEmail);
        setClientPhone(inv.clientPhone);
        setClientCompany(inv.clientCompany ?? "");
        setStatus(inv.status);
        setIssueDate(inv.issueDate);
        setDueDate(inv.dueDate);
        setItems(inv.items);
        setBankName(inv.bankName ?? "");
        setIban(inv.iban ?? "");
        setAccountHolder(inv.accountHolder ?? "");
        setNotesAr(inv.notesAr ?? "");
        setNotes(inv.notes ?? "");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

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

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`/api/admin/invoices/${id}`, {
      method: "PUT",
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
        status,
        issueDate,
        dueDate,
        bankName: bankName || undefined,
        iban: iban || undefined,
        accountHolder: accountHolder || undefined,
        notesAr: notesAr || undefined,
        notes: notes || undefined,
      }),
    });
    if (res.ok) {
      router.push(`/admin/invoices/${id}`);
    } else {
      alert("حدث خطأ أثناء الحفظ");
      setSaving(false);
    }
  };

  const inputStyle: React.CSSProperties = {
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
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    color: "rgba(255,255,255,0.45)",
    fontFamily: "Space Mono, monospace",
    letterSpacing: "0.08em",
    marginBottom: "6px",
  };

  const sectionStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "28px 32px",
    marginBottom: "24px",
  };

  if (loading) {
    return (
      <div>
        <AdminSidebar />
        <div className="admin-main" style={{ background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono, monospace" }}>
          جارٍ التحميل...
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminSidebar />
      <div className="admin-main" style={{ background: "#0A0A0A", padding: "40px 48px", fontFamily: "'Zain', sans-serif", direction: "rtl" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>
            تعديل الفاتورة
          </h1>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => router.back()} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", borderRadius: "10px", padding: "11px 22px", fontSize: "14px", cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>
              إلغاء
            </button>
            <button onClick={handleSave} disabled={saving} style={{ background: "#C8A962", color: "#0A0A0A", border: "none", borderRadius: "10px", padding: "11px 28px", fontSize: "15px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Zain', sans-serif", opacity: saving ? 0.7 : 1 }}>
              {saving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
            </button>
          </div>
        </div>

        {/* Template */}
        <div style={sectionStyle}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#C8A962", marginBottom: "16px", fontFamily: "'Zain', sans-serif" }}>النموذج</div>
          <div style={{ display: "flex", gap: "12px" }}>
            {(["classic", "modern", "minimal"] as const).map((t) => {
              const labels = { classic: "كلاسيك", modern: "عصري", minimal: "مبسط" };
              return (
                <button key={t} onClick={() => setTemplate(t)} style={{ flex: 1, padding: "14px", borderRadius: "10px", border: `2px solid ${template === t ? "#C8A962" : "rgba(255,255,255,0.08)"}`, background: template === t ? "rgba(200,169,98,0.1)" : "rgba(255,255,255,0.03)", cursor: "pointer", textAlign: "right" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: template === t ? "#C8A962" : "#FAFAF7", fontFamily: "'Zain', sans-serif" }}>{labels[t]}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Client */}
        <div style={sectionStyle}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#C8A962", marginBottom: "16px", fontFamily: "'Zain', sans-serif" }}>بيانات العميل</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div><label style={labelStyle}>اسم العميل</label><input value={clientName} onChange={(e) => setClientName(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>الشركة</label><input value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>البريد الإلكتروني</label><input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>رقم الجوال</label><input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} style={inputStyle} /></div>
          </div>
        </div>

        {/* Settings */}
        <div style={sectionStyle}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#C8A962", marginBottom: "16px", fontFamily: "'Zain', sans-serif" }}>إعدادات الفاتورة</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div><label style={labelStyle}>تاريخ الإصدار</label><input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>تاريخ الاستحقاق</label><input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={inputStyle} /></div>
            <div>
              <label style={labelStyle}>الحالة</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as Invoice["status"])} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="draft">مسودة</option>
                <option value="sent">مُرسلة</option>
                <option value="paid">مدفوعة</option>
                <option value="cancelled">ملغاة</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items */}
        <div style={sectionStyle}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#C8A962", marginBottom: "16px", fontFamily: "'Zain', sans-serif" }}>بنود الفاتورة</div>
          {items.map((item, i) => (
            <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 80px 110px 110px 40px", gap: "8px", marginBottom: "10px" }}>
              <div>
                <input value={item.descAr} onChange={(e) => updateItem(i, "descAr", e.target.value)} placeholder="وصف الخدمة" style={inputStyle} />
                <div style={{ marginTop: "4px" }}>
                  <input value={item.descEn} onChange={(e) => updateItem(i, "descEn", e.target.value)} placeholder="English description" style={{ ...inputStyle, fontFamily: "Space Mono, monospace", fontSize: "11px", direction: "ltr" }} />
                </div>
              </div>
              <input type="number" min={1} value={item.qty} onChange={(e) => updateItem(i, "qty", parseFloat(e.target.value) || 0)} style={{ ...inputStyle, textAlign: "center", fontFamily: "Space Mono, monospace" }} />
              <input type="number" min={0} value={item.unitPrice} onChange={(e) => updateItem(i, "unitPrice", parseFloat(e.target.value) || 0)} style={{ ...inputStyle, textAlign: "center", fontFamily: "Space Mono, monospace" }} />
              <div style={{ background: "rgba(200,169,98,0.06)", border: "1px solid rgba(200,169,98,0.15)", borderRadius: "8px", padding: "10px", textAlign: "center", fontFamily: "Space Mono, monospace", fontSize: "13px", color: "#C8A962" }}>
                {item.total.toFixed(2)}
              </div>
              <button onClick={() => removeItem(i)} disabled={items.length === 1} style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#EF4444", borderRadius: "8px", cursor: items.length === 1 ? "not-allowed" : "pointer", opacity: items.length === 1 ? 0.3 : 1, fontSize: "16px" }}>×</button>
            </div>
          ))}
          <button onClick={addItem} style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", borderRadius: "8px", padding: "10px 20px", fontSize: "14px", cursor: "pointer", fontFamily: "'Zain', sans-serif", width: "100%", marginTop: "8px" }}>
            + إضافة بند
          </button>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <div style={{ width: "240px", fontSize: "13px", fontFamily: "Space Mono, monospace", color: "rgba(255,255,255,0.6)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}><span>المجموع:</span><span>{subtotal.toFixed(2)} ر.س</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}><span>الضريبة 15%:</span><span>{vat.toFixed(2)} ر.س</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "rgba(200,169,98,0.1)", borderRadius: "6px", marginTop: "6px" }}><span style={{ color: "#FAFAF7" }}>الإجمالي:</span><span style={{ color: "#C8A962", fontWeight: 700 }}>{total.toFixed(2)} ر.س</span></div>
            </div>
          </div>
        </div>

        {/* Bank */}
        <div style={sectionStyle}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#C8A962", marginBottom: "16px", fontFamily: "'Zain', sans-serif" }}>معلومات البنك</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div><label style={labelStyle}>اسم البنك</label><input value={bankName} onChange={(e) => setBankName(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>صاحب الحساب</label><input value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>IBAN</label><input value={iban} onChange={(e) => setIban(e.target.value)} style={{ ...inputStyle, direction: "ltr" }} /></div>
          </div>
        </div>

        {/* Notes */}
        <div style={sectionStyle}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#C8A962", marginBottom: "16px", fontFamily: "'Zain', sans-serif" }}>ملاحظات</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>عربي</label>
              <textarea value={notesAr} onChange={(e) => setNotesAr(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div>
              <label style={labelStyle}>English</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical", direction: "ltr", fontFamily: "Space Mono, monospace", fontSize: "12px" }} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingBottom: "40px" }}>
          <button onClick={() => router.back()} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", borderRadius: "10px", padding: "12px 24px", fontSize: "14px", cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>إلغاء</button>
          <button onClick={handleSave} disabled={saving} style={{ background: "#C8A962", color: "#0A0A0A", border: "none", borderRadius: "10px", padding: "12px 32px", fontSize: "16px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Zain', sans-serif", opacity: saving ? 0.7 : 1 }}>
            {saving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
          </button>
        </div>
      </div>
    </div>
  );
}
