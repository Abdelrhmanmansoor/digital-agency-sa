"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function NewContractPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // Client
  const [clientName, setClientName] = useState("");
  const [clientNationalId, setClientNationalId] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientCompany, setClientCompany] = useState("");

  // Contract meta
  const [type, setType] = useState<"service-agreement" | "maintenance" | "marketing" | "custom">("service-agreement");
  const [status, setStatus] = useState<"draft" | "active" | "completed" | "terminated">("draft");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);

  // Service
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceTitleAr, setServiceTitleAr] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceDescriptionAr, setServiceDescriptionAr] = useState("");

  // Financial
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentTerms, setPaymentTerms] = useState<"full" | "50-50" | "custom">("50-50");
  const [paymentNotes, setPaymentNotes] = useState("");

  // Timeline
  const [deliveryDays, setDeliveryDays] = useState("14");
  const [jurisdiction, setJurisdiction] = useState("الرياض");

  // Deliverables
  const [deliverables, setDeliverables] = useState<string[]>([""]);

  const updateDeliverable = (index: number, value: string) => {
    setDeliverables((prev) => prev.map((d, i) => (i === index ? value : d)));
  };
  const addDeliverable = () => setDeliverables((prev) => [...prev, ""]);
  const removeDeliverable = (index: number) => {
    if (deliverables.length === 1) return;
    setDeliverables((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!clientName || !clientPhone || !serviceTitle || !totalAmount) {
      alert("يرجى إدخال اسم العميل، رقم التواصل، الخدمة، والمبلغ");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/admin/contracts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        clientName,
        clientNationalId: clientNationalId || undefined,
        clientPhone,
        clientEmail,
        clientAddress: clientAddress || undefined,
        clientCompany: clientCompany || undefined,
        serviceTitle,
        serviceTitleAr: serviceTitleAr || serviceTitle,
        serviceDescription,
        serviceDescriptionAr: serviceDescriptionAr || serviceDescription,
        totalAmount: parseFloat(totalAmount) || 0,
        paymentTerms,
        paymentNotes: paymentTerms === "custom" ? paymentNotes : undefined,
        startDate,
        deliveryDays: parseInt(deliveryDays) || 14,
        deliverables: deliverables.filter((d) => d.trim()),
        jurisdiction,
        status,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      router.push(`/admin/contracts/${data.id}`);
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

  const sectionTitle = (t: string) => (
    <div style={{ fontSize: "16px", fontWeight: 700, color: "#C8A962", marginBottom: "20px", fontFamily: "'Zain', sans-serif" }}>{t}</div>
  );

  return (
    <div>
      <AdminSidebar />
      <div className="admin-main" style={{ background: "#0A0A0A", padding: "40px 48px", fontFamily: "'Zain', sans-serif", direction: "rtl" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>عقد جديد</h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: "4px 0 0", fontFamily: "Space Mono, monospace" }}>
              سيتم توليد رقم العقد تلقائياً · وفق القانون السعودي
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => router.back()} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", borderRadius: "10px", padding: "11px 22px", fontSize: "14px", cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>إلغاء</button>
            <button onClick={handleSubmit} disabled={saving} style={{ background: "#C8A962", color: "#0A0A0A", border: "none", borderRadius: "10px", padding: "11px 28px", fontSize: "15px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Zain', sans-serif", opacity: saving ? 0.7 : 1 }}>
              {saving ? "جارٍ الحفظ..." : "حفظ العقد"}
            </button>
          </div>
        </div>

        {/* Contract type */}
        <div style={sectionStyle}>
          {sectionTitle("نوع العقد")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px" }}>
            {([
              ["service-agreement", "عقد خدمات", "تصميم، تطوير، هوية"],
              ["maintenance", "صيانة ودعم", "دعم فني مستمر"],
              ["marketing", "تسويق رقمي", "حملات وإعلانات"],
              ["custom", "مخصص", "نوع مخصص"],
            ] as const).map(([val, label, desc]) => (
              <button
                key={val}
                onClick={() => setType(val)}
                style={{ padding: "14px", borderRadius: "10px", border: `2px solid ${type === val ? "#C8A962" : "rgba(255,255,255,0.08)"}`, background: type === val ? "rgba(200,169,98,0.1)" : "rgba(255,255,255,0.03)", cursor: "pointer", textAlign: "right" }}
              >
                <div style={{ fontSize: "14px", fontWeight: 700, color: type === val ? "#C8A962" : "#FAFAF7", fontFamily: "'Zain', sans-serif" }}>{label}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "4px", fontFamily: "'Zain', sans-serif" }}>{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Client info */}
        <div style={sectionStyle}>
          {sectionTitle("بيانات الطرف الثاني (العميل)")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div><label style={labelStyle}>الاسم الكامل *</label><input value={clientName} onChange={(e) => setClientName(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>رقم الهوية / الإقامة</label><input value={clientNationalId} onChange={(e) => setClientNationalId(e.target.value)} style={{ ...inputStyle, direction: "ltr" }} placeholder="1xxxxxxxxx" /></div>
            <div><label style={labelStyle}>رقم التواصل *</label><input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} style={inputStyle} placeholder="+966..." /></div>
            <div><label style={labelStyle}>البريد الإلكتروني</label><input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} style={{ ...inputStyle, direction: "ltr" }} /></div>
            <div><label style={labelStyle}>الشركة / المؤسسة</label><input value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>العنوان</label><input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} style={inputStyle} /></div>
          </div>
        </div>

        {/* Service */}
        <div style={sectionStyle}>
          {sectionTitle("موضوع العقد")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>عنوان الخدمة بالعربي *</label>
              <input value={serviceTitleAr} onChange={(e) => setServiceTitleAr(e.target.value)} style={inputStyle} placeholder="تصميم وتطوير متجر سلة" />
            </div>
            <div>
              <label style={labelStyle}>Service Title (English)</label>
              <input value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} style={{ ...inputStyle, direction: "ltr", fontFamily: "Space Mono, monospace", fontSize: "12px" }} placeholder="Salla Store Design" />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>وصف تفصيلي بالعربي</label>
              <textarea value={serviceDescriptionAr} onChange={(e) => setServiceDescriptionAr(e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical" }} placeholder="يشمل تصميم ثيم مخصص كامل للمتجر..." />
            </div>
            <div>
              <label style={labelStyle}>Detailed Description (English)</label>
              <textarea value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical", direction: "ltr", fontFamily: "Space Mono, monospace", fontSize: "12px" }} />
            </div>
          </div>
        </div>

        {/* Financial */}
        <div style={sectionStyle}>
          {sectionTitle("القيمة المالية والدفع")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>المبلغ الإجمالي (ريال سعودي) *</label>
              <input type="number" min={0} value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} style={{ ...inputStyle, direction: "ltr", fontFamily: "Space Mono, monospace" }} placeholder="5000" />
            </div>
            <div>
              <label style={labelStyle}>طريقة الدفع</label>
              <select value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value as typeof paymentTerms)} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="full">دفعة واحدة كاملة</option>
                <option value="50-50">٥٠٪ مقدماً + ٥٠٪ عند التسليم</option>
                <option value="custom">مخصص</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>الحالة</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="draft">مسودة</option>
                <option value="active">نشط</option>
                <option value="completed">مكتمل</option>
                <option value="terminated">منتهي</option>
              </select>
            </div>
          </div>
          {paymentTerms === "custom" && (
            <div>
              <label style={labelStyle}>تفاصيل الدفع المخصصة</label>
              <textarea value={paymentNotes} onChange={(e) => setPaymentNotes(e.target.value)} rows={2} style={{ ...inputStyle, resize: "vertical" }} placeholder="٣٠٪ عند التوقيع، ٣٠٪ بعد التصميم، ٤٠٪ عند التسليم" />
            </div>
          )}
        </div>

        {/* Timeline */}
        <div style={sectionStyle}>
          {sectionTitle("المدة والتنفيذ")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>تاريخ بدء العقد</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>مدة التنفيذ (أيام عمل)</label>
              <input type="number" min={1} value={deliveryDays} onChange={(e) => setDeliveryDays(e.target.value)} style={{ ...inputStyle, direction: "ltr", fontFamily: "Space Mono, monospace" }} />
            </div>
            <div>
              <label style={labelStyle}>مكان الاختصاص القضائي</label>
              <input value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} style={inputStyle} placeholder="الرياض" />
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div style={sectionStyle}>
          {sectionTitle("التسليمات")}
          {deliverables.map((d, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <input
                value={d}
                onChange={(e) => updateDeliverable(i, e.target.value)}
                placeholder={`تسليم ${i + 1}: مثل "ثيم سلة مخصص كامل"`}
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                onClick={() => removeDeliverable(i)}
                disabled={deliverables.length === 1}
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#EF4444", borderRadius: "8px", padding: "0 14px", cursor: deliverables.length === 1 ? "not-allowed" : "pointer", opacity: deliverables.length === 1 ? 0.3 : 1, fontSize: "16px", flexShrink: 0 }}
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={addDeliverable}
            style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", borderRadius: "8px", padding: "10px 20px", fontSize: "14px", cursor: "pointer", fontFamily: "'Zain', sans-serif", width: "100%", marginTop: "4px" }}
          >
            + إضافة تسليم
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingBottom: "40px" }}>
          <button onClick={() => router.back()} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", borderRadius: "10px", padding: "12px 24px", fontSize: "14px", cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>إلغاء</button>
          <button onClick={handleSubmit} disabled={saving} style={{ background: "#C8A962", color: "#0A0A0A", border: "none", borderRadius: "10px", padding: "12px 32px", fontSize: "16px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Zain', sans-serif", opacity: saving ? 0.7 : 1 }}>
            {saving ? "جارٍ الحفظ..." : "حفظ وعرض العقد"}
          </button>
        </div>
      </div>
    </div>
  );
}
