"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Contract } from "@/lib/db";

export default function EditContractPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [type, setType] = useState<Contract["type"]>("service-agreement");
  const [status, setStatus] = useState<Contract["status"]>("draft");
  const [clientName, setClientName] = useState("");
  const [clientNationalId, setClientNationalId] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceTitleAr, setServiceTitleAr] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceDescriptionAr, setServiceDescriptionAr] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentTerms, setPaymentTerms] = useState<Contract["paymentTerms"]>("50-50");
  const [paymentNotes, setPaymentNotes] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("14");
  const [jurisdiction, setJurisdiction] = useState("الرياض");
  const [deliverables, setDeliverables] = useState<string[]>([""]);

  useEffect(() => {
    fetch(`/api/admin/contracts/${id}`)
      .then((r) => {
        if (r.status === 401) { router.push("/admin"); return null; }
        return r.json();
      })
      .then((c: Contract | null) => {
        if (!c) return;
        setType(c.type);
        setStatus(c.status);
        setClientName(c.clientName);
        setClientNationalId(c.clientNationalId ?? "");
        setClientPhone(c.clientPhone);
        setClientEmail(c.clientEmail);
        setClientAddress(c.clientAddress ?? "");
        setClientCompany(c.clientCompany ?? "");
        setServiceTitle(c.serviceTitle);
        setServiceTitleAr(c.serviceTitleAr);
        setServiceDescription(c.serviceDescription);
        setServiceDescriptionAr(c.serviceDescriptionAr);
        setTotalAmount(String(c.totalAmount));
        setPaymentTerms(c.paymentTerms);
        setPaymentNotes(c.paymentNotes ?? "");
        setStartDate(c.startDate);
        setDeliveryDays(String(c.deliveryDays));
        setJurisdiction(c.jurisdiction);
        setDeliverables(c.deliverables.length ? c.deliverables : [""]);
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const updateDeliverable = (i: number, v: string) =>
    setDeliverables((prev) => prev.map((d, idx) => (idx === i ? v : d)));
  const addDeliverable = () => setDeliverables((prev) => [...prev, ""]);
  const removeDeliverable = (i: number) => {
    if (deliverables.length === 1) return;
    setDeliverables((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`/api/admin/contracts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        status,
        clientName,
        clientNationalId: clientNationalId || undefined,
        clientPhone,
        clientEmail,
        clientAddress: clientAddress || undefined,
        clientCompany: clientCompany || undefined,
        serviceTitle,
        serviceTitleAr,
        serviceDescription,
        serviceDescriptionAr,
        totalAmount: parseFloat(totalAmount) || 0,
        paymentTerms,
        paymentNotes: paymentTerms === "custom" ? paymentNotes : undefined,
        startDate,
        deliveryDays: parseInt(deliveryDays) || 14,
        jurisdiction,
        deliverables: deliverables.filter((d) => d.trim()),
      }),
    });
    if (res.ok) {
      router.push(`/admin/contracts/${id}`);
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
      <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0A" }}>
        <AdminSidebar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono, monospace" }}>
          جارٍ التحميل...
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0A" }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: "40px 48px", fontFamily: "'Zain', sans-serif", direction: "rtl" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>تعديل العقد</h1>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => router.back()} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", borderRadius: "10px", padding: "11px 22px", fontSize: "14px", cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>إلغاء</button>
            <button onClick={handleSave} disabled={saving} style={{ background: "#C8A962", color: "#0A0A0A", border: "none", borderRadius: "10px", padding: "11px 28px", fontSize: "15px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Zain', sans-serif", opacity: saving ? 0.7 : 1 }}>
              {saving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
            </button>
          </div>
        </div>

        {/* Type */}
        <div style={sectionStyle}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#C8A962", marginBottom: "16px", fontFamily: "'Zain', sans-serif" }}>نوع العقد</div>
          <div style={{ display: "flex", gap: "12px" }}>
            {([["service-agreement", "عقد خدمات"], ["maintenance", "صيانة"], ["marketing", "تسويق"], ["custom", "مخصص"]] as const).map(([val, label]) => (
              <button key={val} onClick={() => setType(val)} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: `2px solid ${type === val ? "#C8A962" : "rgba(255,255,255,0.08)"}`, background: type === val ? "rgba(200,169,98,0.1)" : "rgba(255,255,255,0.03)", cursor: "pointer", fontSize: "14px", fontWeight: 700, color: type === val ? "#C8A962" : "#FAFAF7", fontFamily: "'Zain', sans-serif" }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Client */}
        <div style={sectionStyle}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#C8A962", marginBottom: "16px", fontFamily: "'Zain', sans-serif" }}>بيانات العميل</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div><label style={labelStyle}>الاسم الكامل</label><input value={clientName} onChange={(e) => setClientName(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>رقم الهوية</label><input value={clientNationalId} onChange={(e) => setClientNationalId(e.target.value)} style={{ ...inputStyle, direction: "ltr" }} /></div>
            <div><label style={labelStyle}>رقم التواصل</label><input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>البريد الإلكتروني</label><input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} style={{ ...inputStyle, direction: "ltr" }} /></div>
            <div><label style={labelStyle}>الشركة</label><input value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>العنوان</label><input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} style={inputStyle} /></div>
          </div>
        </div>

        {/* Service */}
        <div style={sectionStyle}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#C8A962", marginBottom: "16px", fontFamily: "'Zain', sans-serif" }}>موضوع العقد</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div><label style={labelStyle}>العنوان بالعربي</label><input value={serviceTitleAr} onChange={(e) => setServiceTitleAr(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>Title (English)</label><input value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} style={{ ...inputStyle, direction: "ltr", fontFamily: "Space Mono, monospace", fontSize: "12px" }} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div><label style={labelStyle}>الوصف بالعربي</label><textarea value={serviceDescriptionAr} onChange={(e) => setServiceDescriptionAr(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} /></div>
            <div><label style={labelStyle}>Description (English)</label><textarea value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical", direction: "ltr", fontFamily: "Space Mono, monospace", fontSize: "12px" }} /></div>
          </div>
        </div>

        {/* Financial */}
        <div style={sectionStyle}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#C8A962", marginBottom: "16px", fontFamily: "'Zain', sans-serif" }}>القيمة المالية</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div><label style={labelStyle}>المبلغ (ريال)</label><input type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} style={{ ...inputStyle, direction: "ltr", fontFamily: "Space Mono, monospace" }} /></div>
            <div>
              <label style={labelStyle}>طريقة الدفع</label>
              <select value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value as typeof paymentTerms)} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="full">دفعة واحدة</option>
                <option value="50-50">٥٠٪ + ٥٠٪</option>
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
            <div style={{ marginTop: "16px" }}>
              <label style={labelStyle}>تفاصيل الدفع</label>
              <textarea value={paymentNotes} onChange={(e) => setPaymentNotes(e.target.value)} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
          )}
        </div>

        {/* Timeline */}
        <div style={sectionStyle}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#C8A962", marginBottom: "16px", fontFamily: "'Zain', sans-serif" }}>المدة والتنفيذ</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div><label style={labelStyle}>تاريخ البدء</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>أيام التنفيذ</label><input type="number" value={deliveryDays} onChange={(e) => setDeliveryDays(e.target.value)} style={{ ...inputStyle, direction: "ltr", fontFamily: "Space Mono, monospace" }} /></div>
            <div><label style={labelStyle}>الاختصاص القضائي</label><input value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} style={inputStyle} /></div>
          </div>
        </div>

        {/* Deliverables */}
        <div style={sectionStyle}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#C8A962", marginBottom: "16px", fontFamily: "'Zain', sans-serif" }}>التسليمات</div>
          {deliverables.map((d, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <input value={d} onChange={(e) => updateDeliverable(i, e.target.value)} style={{ ...inputStyle, flex: 1 }} />
              <button onClick={() => removeDeliverable(i)} disabled={deliverables.length === 1} style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#EF4444", borderRadius: "8px", padding: "0 14px", cursor: deliverables.length === 1 ? "not-allowed" : "pointer", opacity: deliverables.length === 1 ? 0.3 : 1, fontSize: "16px", flexShrink: 0 }}>×</button>
            </div>
          ))}
          <button onClick={addDeliverable} style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", borderRadius: "8px", padding: "10px 20px", fontSize: "14px", cursor: "pointer", fontFamily: "'Zain', sans-serif", width: "100%", marginTop: "4px" }}>
            + إضافة تسليم
          </button>
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
