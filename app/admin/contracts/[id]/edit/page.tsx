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
  const [providerType, setProviderType] = useState<"institution" | "individual-saudi" | "individual-expat">("institution");
  const [providerEntityName, setProviderEntityName] = useState("");
  const [providerOwnerName, setProviderOwnerName] = useState("");
  const [providerFullName, setProviderFullName] = useState("");
  const [providerNationalId, setProviderNationalId] = useState("");
  const [providerIqama, setProviderIqama] = useState("");
  const [providerIqamaExpiry, setProviderIqamaExpiry] = useState("");
  const [providerFreelanceDoc, setProviderFreelanceDoc] = useState("");
  const [providerCR, setProviderCR] = useState("");
  const [providerVAT, setProviderVAT] = useState("");
  const [providerProfession, setProviderProfession] = useState("");
  const [providerPhone, setProviderPhone] = useState("");
  const [providerEmail, setProviderEmail] = useState("");
  const [providerAddress, setProviderAddress] = useState("");
  const [providerCity, setProviderCity] = useState("الرياض");
  const [clientType, setClientType] = useState<"individual" | "institution">("individual");
  const [clientName, setClientName] = useState("");
  const [clientNationalId, setClientNationalId] = useState("");
  const [clientIqama, setClientIqama] = useState("");
  const [clientCR, setClientCR] = useState("");
  const [clientVAT, setClientVAT] = useState("");
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
  const [revisions, setRevisions] = useState("2");
  const [penaltyPerDay, setPenaltyPerDay] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("14");
  const [deliverables, setDeliverables] = useState<string[]>([""]);
  const [jurisdiction, setJurisdiction] = useState("الرياض");
  const [useArbitration, setUseArbitration] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/contracts/${id}`)
      .then(r => { if (r.status === 401) { router.push("/admin"); return null; } return r.json(); })
      .then((c: Contract | null) => {
        if (!c) return;
        setType(c.type); setStatus(c.status);
        setProviderType(c.providerType ?? "institution");
        setProviderEntityName(c.providerEntityName ?? "");
        setProviderOwnerName(c.providerOwnerName ?? "");
        setProviderFullName(c.providerFullName ?? "");
        setProviderNationalId(c.providerNationalId ?? "");
        setProviderIqama(c.providerIqama ?? "");
        setProviderIqamaExpiry(c.providerIqamaExpiry ?? "");
        setProviderFreelanceDoc(c.providerFreelanceDoc ?? "");
        setProviderCR(c.providerCR ?? "");
        setProviderVAT(c.providerVAT ?? "");
        setProviderProfession(c.providerProfession ?? "");
        setProviderPhone(c.providerPhone ?? "");
        setProviderEmail(c.providerEmail ?? "");
        setProviderAddress(c.providerAddress ?? "");
        setProviderCity(c.providerCity ?? "الرياض");
        setClientType(c.clientType ?? "individual");
        setClientName(c.clientName); setClientNationalId(c.clientNationalId ?? "");
        setClientIqama(c.clientIqama ?? "");
        setClientCR(c.clientCR ?? ""); setClientVAT(c.clientVAT ?? "");
        setClientPhone(c.clientPhone); setClientEmail(c.clientEmail);
        setClientAddress(c.clientAddress ?? ""); setClientCompany(c.clientCompany ?? "");
        setServiceTitle(c.serviceTitle); setServiceTitleAr(c.serviceTitleAr);
        setServiceDescription(c.serviceDescription); setServiceDescriptionAr(c.serviceDescriptionAr);
        setTotalAmount(String(c.totalAmount)); setPaymentTerms(c.paymentTerms);
        setPaymentNotes(c.paymentNotes ?? "");
        setRevisions(String(c.revisions ?? 2));
        setPenaltyPerDay(c.penaltyPerDay ? String(c.penaltyPerDay) : "");
        setStartDate(c.startDate); setDeliveryDays(String(c.deliveryDays));
        setJurisdiction(c.jurisdiction); setUseArbitration(c.useArbitration ?? false);
        setDeliverables(c.deliverables.length ? c.deliverables : [""]);
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const updateDeliverable = (i: number, v: string) =>
    setDeliverables(prev => prev.map((d, idx) => idx === i ? v : d));
  const addDeliverable = () => setDeliverables(prev => [...prev, ""]);
  const removeDeliverable = (i: number) => {
    if (deliverables.length === 1) return;
    setDeliverables(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`/api/admin/contracts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type, status,
        providerType,
        providerEntityName: providerEntityName || undefined,
        providerOwnerName: providerOwnerName || undefined,
        providerFullName: providerFullName || undefined,
        providerNationalId: providerNationalId || undefined,
        providerIqama: providerIqama || undefined,
        providerIqamaExpiry: providerIqamaExpiry || undefined,
        providerFreelanceDoc: providerFreelanceDoc || undefined,
        providerCR: providerCR || undefined,
        providerVAT: providerVAT || undefined,
        providerProfession: providerProfession || undefined,
        providerPhone: providerPhone || undefined,
        providerEmail: providerEmail || undefined,
        providerAddress: providerAddress || undefined,
        providerCity: providerCity || undefined,
        clientType,
        clientName, clientNationalId: clientNationalId || undefined,
        clientIqama: clientIqama || undefined,
        clientCR: clientCR || undefined, clientVAT: clientVAT || undefined,
        clientPhone, clientEmail,
        clientAddress: clientAddress || undefined,
        clientCompany: clientCompany || undefined,
        serviceTitle, serviceTitleAr, serviceDescription, serviceDescriptionAr,
        totalAmount: parseFloat(totalAmount) || 0,
        paymentTerms,
        paymentNotes: paymentTerms === "custom" ? paymentNotes : undefined,
        revisions: parseInt(revisions) || 2,
        penaltyPerDay: penaltyPerDay ? parseFloat(penaltyPerDay) : undefined,
        startDate, deliveryDays: parseInt(deliveryDays) || 14,
        deliverables: deliverables.filter(d => d.trim()),
        jurisdiction, useArbitration,
      }),
    });
    if (res.ok) { router.push(`/admin/contracts/${id}`); }
    else { alert("حدث خطأ أثناء الحفظ"); setSaving(false); }
  };

  const inp: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px", padding: "10px 14px", color: "#FAFAF7",
    fontFamily: "'Zain', sans-serif", fontSize: "14px", boxSizing: "border-box", outline: "none",
  };
  const lbl: React.CSSProperties = {
    display: "block", fontSize: "11px", color: "rgba(255,255,255,0.4)",
    fontFamily: "Space Mono, monospace", letterSpacing: "0.1em", marginBottom: "5px",
  };
  const sec: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px", padding: "24px 28px", marginBottom: "20px",
  };
  const secTitle: React.CSSProperties = {
    fontSize: "15px", fontWeight: 700, color: "#C8A962", marginBottom: "16px",
    fontFamily: "'Zain', sans-serif", display: "flex", alignItems: "center", gap: "8px",
  };
  const typeBtn = (active: boolean): React.CSSProperties => ({
    padding: "10px 14px", borderRadius: "10px", cursor: "pointer", fontSize: "13px",
    fontWeight: 600, fontFamily: "'Zain', sans-serif",
    border: `2px solid ${active ? "#C8A962" : "rgba(255,255,255,0.08)"}`,
    background: active ? "rgba(200,169,98,0.12)" : "rgba(255,255,255,0.03)",
    color: active ? "#C8A962" : "rgba(255,255,255,0.6)",
  });

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
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>تعديل العقد</h1>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: "4px 0 0", fontFamily: "Space Mono, monospace" }}>وفق نظام المعاملات المدنية السعودي</p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => router.back()} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)", borderRadius: "10px", padding: "11px 22px", fontSize: "14px", cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>إلغاء</button>
            <button onClick={handleSave} disabled={saving} style={{ background: "#C8A962", color: "#0A0A0A", border: "none", borderRadius: "10px", padding: "11px 28px", fontSize: "15px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Zain', sans-serif", opacity: saving ? 0.7 : 1 }}>
              {saving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
            </button>
          </div>
        </div>

        {/* Type */}
        <div style={sec}>
          <div style={secTitle}><span style={{ background: "#C8A962", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#0A0A0A", fontFamily: "Space Mono, monospace" }}>١</span> نوع العقد والحالة</div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
            {([["service-agreement", "خدمات"], ["maintenance", "صيانة"], ["marketing", "تسويق"], ["custom", "مخصص"]] as const).map(([val, lbl2]) => (
              <button key={val} onClick={() => setType(val)} style={typeBtn(type === val)}>{lbl2}</button>
            ))}
          </div>
          <div style={{ width: "200px" }}>
            <label style={lbl}>الحالة</label>
            <select value={status} onChange={e => setStatus(e.target.value as typeof status)} style={{ ...inp, cursor: "pointer" }}>
              <option value="draft">مسودة</option>
              <option value="active">نشط</option>
              <option value="completed">مكتمل</option>
              <option value="terminated">منتهي</option>
            </select>
          </div>
        </div>

        {/* Provider */}
        <div style={sec}>
          <div style={secTitle}><span style={{ background: "#C8A962", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#0A0A0A", fontFamily: "Space Mono, monospace" }}>٢</span> الطرف الأول — مقدم الخدمة</div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
            {([["institution", "مؤسسة / شركة"], ["individual-saudi", "فرد سعودي"], ["individual-expat", "مقيم / غير سعودي"]] as const).map(([val, label]) => (
              <button key={val} onClick={() => setProviderType(val)} style={{ ...typeBtn(providerType === val), flex: 1, fontSize: "12px" }}>{label}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {providerType === "institution" && (
              <>
                <div><label style={lbl}>اسم المؤسسة / الشركة</label><input value={providerEntityName} onChange={e => setProviderEntityName(e.target.value)} style={inp} /></div>
                <div><label style={lbl}>اسم المالك / الممثل</label><input value={providerOwnerName} onChange={e => setProviderOwnerName(e.target.value)} style={inp} /></div>
                <div><label style={lbl}>رقم السجل التجاري</label><input value={providerCR} onChange={e => setProviderCR(e.target.value)} style={{ ...inp, direction: "ltr" }} /></div>
                <div><label style={lbl}>رقم ضريبة القيمة المضافة</label><input value={providerVAT} onChange={e => setProviderVAT(e.target.value)} style={{ ...inp, direction: "ltr" }} /></div>
              </>
            )}
            {providerType === "individual-saudi" && (
              <>
                <div><label style={lbl}>الاسم الكامل</label><input value={providerFullName} onChange={e => setProviderFullName(e.target.value)} style={inp} /></div>
                <div><label style={lbl}>رقم الهوية الوطنية</label><input value={providerNationalId} onChange={e => setProviderNationalId(e.target.value)} style={{ ...inp, direction: "ltr" }} /></div>
                <div><label style={lbl}>رقم وثيقة العمل الحر</label><input value={providerFreelanceDoc} onChange={e => setProviderFreelanceDoc(e.target.value)} style={{ ...inp, direction: "ltr" }} /></div>
                <div><label style={lbl}>المهنة / النشاط</label><input value={providerProfession} onChange={e => setProviderProfession(e.target.value)} style={inp} /></div>
                <div><label style={lbl}>رقم ضريبة القيمة المضافة</label><input value={providerVAT} onChange={e => setProviderVAT(e.target.value)} style={{ ...inp, direction: "ltr" }} /></div>
              </>
            )}
            {providerType === "individual-expat" && (
              <>
                <div><label style={lbl}>الاسم الكامل</label><input value={providerFullName} onChange={e => setProviderFullName(e.target.value)} style={inp} /></div>
                <div><label style={lbl}>رقم الإقامة</label><input value={providerIqama} onChange={e => setProviderIqama(e.target.value)} style={{ ...inp, direction: "ltr" }} /></div>
                <div><label style={lbl}>تاريخ انتهاء الإقامة</label><input type="date" value={providerIqamaExpiry} onChange={e => setProviderIqamaExpiry(e.target.value)} style={inp} /></div>
                <div><label style={lbl}>رقم السجل التجاري</label><input value={providerCR} onChange={e => setProviderCR(e.target.value)} style={{ ...inp, direction: "ltr" }} /></div>
                <div><label style={lbl}>رقم ضريبة القيمة المضافة</label><input value={providerVAT} onChange={e => setProviderVAT(e.target.value)} style={{ ...inp, direction: "ltr" }} /></div>
              </>
            )}
            <div><label style={lbl}>رقم الجوال</label><input value={providerPhone} onChange={e => setProviderPhone(e.target.value)} style={inp} /></div>
            <div><label style={lbl}>البريد الإلكتروني</label><input value={providerEmail} onChange={e => setProviderEmail(e.target.value)} style={{ ...inp, direction: "ltr" }} /></div>
            <div><label style={lbl}>العنوان الوطني</label><input value={providerAddress} onChange={e => setProviderAddress(e.target.value)} style={inp} /></div>
            <div><label style={lbl}>المدينة</label><input value={providerCity} onChange={e => setProviderCity(e.target.value)} style={inp} /></div>
          </div>
        </div>

        {/* Client */}
        <div style={sec}>
          <div style={secTitle}><span style={{ background: "#C8A962", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#0A0A0A", fontFamily: "Space Mono, monospace" }}>٣</span> الطرف الثاني — العميل</div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
            {([["individual", "فرد"], ["institution", "مؤسسة / شركة"]] as const).map(([val, label]) => (
              <button key={val} onClick={() => setClientType(val)} style={{ ...typeBtn(clientType === val), minWidth: "120px" }}>{label}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {clientType === "institution" ? (
              <>
                <div><label style={lbl}>اسم المؤسسة</label><input value={clientCompany} onChange={e => setClientCompany(e.target.value)} style={inp} /></div>
                <div><label style={lbl}>الممثل القانوني</label><input value={clientName} onChange={e => setClientName(e.target.value)} style={inp} /></div>
                <div><label style={lbl}>رقم السجل التجاري</label><input value={clientCR} onChange={e => setClientCR(e.target.value)} style={{ ...inp, direction: "ltr" }} /></div>
                <div><label style={lbl}>رقم ضريبة القيمة المضافة</label><input value={clientVAT} onChange={e => setClientVAT(e.target.value)} style={{ ...inp, direction: "ltr" }} /></div>
              </>
            ) : (
              <>
                <div><label style={lbl}>الاسم الكامل</label><input value={clientName} onChange={e => setClientName(e.target.value)} style={inp} /></div>
                <div><label style={lbl}>رقم الهوية / الإقامة</label><input value={clientNationalId || clientIqama} onChange={e => setClientNationalId(e.target.value)} style={{ ...inp, direction: "ltr" }} /></div>
                <div><label style={lbl}>الشركة (إن وُجدت)</label><input value={clientCompany} onChange={e => setClientCompany(e.target.value)} style={inp} /></div>
              </>
            )}
            <div><label style={lbl}>رقم الجوال</label><input value={clientPhone} onChange={e => setClientPhone(e.target.value)} style={inp} /></div>
            <div><label style={lbl}>البريد الإلكتروني</label><input value={clientEmail} onChange={e => setClientEmail(e.target.value)} style={{ ...inp, direction: "ltr" }} /></div>
            <div style={{ gridColumn: "1 / -1" }}><label style={lbl}>العنوان</label><input value={clientAddress} onChange={e => setClientAddress(e.target.value)} style={inp} /></div>
          </div>
        </div>

        {/* Service */}
        <div style={sec}>
          <div style={secTitle}><span style={{ background: "#C8A962", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#0A0A0A", fontFamily: "Space Mono, monospace" }}>٤</span> موضوع العقد</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <div><label style={lbl}>عنوان الخدمة بالعربي</label><input value={serviceTitleAr} onChange={e => setServiceTitleAr(e.target.value)} style={inp} /></div>
            <div><label style={lbl}>Service Title (English)</label><input value={serviceTitle} onChange={e => setServiceTitle(e.target.value)} style={{ ...inp, direction: "ltr", fontFamily: "Space Mono, monospace", fontSize: "12px" }} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div><label style={lbl}>وصف الخدمة بالعربي</label><textarea value={serviceDescriptionAr} onChange={e => setServiceDescriptionAr(e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} /></div>
            <div><label style={lbl}>Description (English)</label><textarea value={serviceDescription} onChange={e => setServiceDescription(e.target.value)} rows={3} style={{ ...inp, resize: "vertical", direction: "ltr", fontFamily: "Space Mono, monospace", fontSize: "11px" }} /></div>
          </div>
        </div>

        {/* Financial */}
        <div style={sec}>
          <div style={secTitle}><span style={{ background: "#C8A962", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#0A0A0A", fontFamily: "Space Mono, monospace" }}>٥</span> القيمة المالية وشروط الدفع</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
            <div><label style={lbl}>المبلغ الإجمالي (ريال)</label><input type="number" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} style={{ ...inp, direction: "ltr", fontFamily: "Space Mono, monospace" }} /></div>
            <div>
              <label style={lbl}>طريقة الدفع</label>
              <select value={paymentTerms} onChange={e => setPaymentTerms(e.target.value as typeof paymentTerms)} style={{ ...inp, cursor: "pointer" }}>
                <option value="full">دفعة واحدة كاملة</option>
                <option value="50-50">٥٠٪ + ٥٠٪</option>
                <option value="3-installments">ثلاث دفعات</option>
                <option value="custom">مخصص</option>
              </select>
            </div>
            <div><label style={lbl}>عدد المراجعات</label><input type="number" value={revisions} onChange={e => setRevisions(e.target.value)} style={{ ...inp, direction: "ltr", fontFamily: "Space Mono, monospace" }} /></div>
          </div>
          {paymentTerms === "custom" && (
            <div style={{ marginTop: "14px" }}>
              <label style={lbl}>تفاصيل الدفع المخصص</label>
              <textarea value={paymentNotes} onChange={e => setPaymentNotes(e.target.value)} rows={2} style={{ ...inp, resize: "vertical" }} />
            </div>
          )}
          <div style={{ marginTop: "14px" }}>
            <label style={lbl}>غرامة التأخير اليومية (ريال)</label>
            <input type="number" value={penaltyPerDay} onChange={e => setPenaltyPerDay(e.target.value)} style={{ ...inp, direction: "ltr", fontFamily: "Space Mono, monospace", maxWidth: "220px" }} />
          </div>
        </div>

        {/* Timeline */}
        <div style={sec}>
          <div style={secTitle}><span style={{ background: "#C8A962", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#0A0A0A", fontFamily: "Space Mono, monospace" }}>٦</span> المدة والتسليمات</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "18px" }}>
            <div><label style={lbl}>تاريخ البدء</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inp} /></div>
            <div><label style={lbl}>مدة التنفيذ (أيام عمل)</label><input type="number" value={deliveryDays} onChange={e => setDeliveryDays(e.target.value)} style={{ ...inp, direction: "ltr", fontFamily: "Space Mono, monospace" }} /></div>
          </div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "10px", letterSpacing: "0.08em" }}>قائمة التسليمات</div>
          {deliverables.map((d, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <input value={d} onChange={e => updateDeliverable(i, e.target.value)} style={{ ...inp, flex: 1 }} />
              <button onClick={() => removeDeliverable(i)} disabled={deliverables.length === 1} style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#EF4444", borderRadius: "8px", padding: "0 13px", cursor: deliverables.length === 1 ? "not-allowed" : "pointer", opacity: deliverables.length === 1 ? 0.3 : 1, fontSize: "16px", flexShrink: 0 }}>×</button>
            </div>
          ))}
          <button onClick={addDeliverable} style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.45)", borderRadius: "8px", padding: "9px 18px", fontSize: "13px", cursor: "pointer", fontFamily: "'Zain', sans-serif", width: "100%", marginTop: "4px" }}>
            + إضافة تسليم
          </button>
        </div>

        {/* Legal */}
        <div style={sec}>
          <div style={secTitle}><span style={{ background: "#C8A962", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#0A0A0A", fontFamily: "Space Mono, monospace" }}>٧</span> الاختصاص القضائي</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div><label style={lbl}>المدينة / الاختصاص</label><input value={jurisdiction} onChange={e => setJurisdiction(e.target.value)} style={inp} /></div>
            <div>
              <label style={lbl}>آلية تسوية النزاعات</label>
              <div style={{ display: "flex", gap: "8px", marginTop: "2px" }}>
                <button onClick={() => setUseArbitration(false)} style={typeBtn(!useArbitration)}>المحاكم التجارية</button>
                <button onClick={() => setUseArbitration(true)} style={typeBtn(useArbitration)}>التحكيم (SCCA)</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingBottom: "40px" }}>
          <button onClick={() => router.back()} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)", borderRadius: "10px", padding: "12px 24px", fontSize: "14px", cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>إلغاء</button>
          <button onClick={handleSave} disabled={saving} style={{ background: "#C8A962", color: "#0A0A0A", border: "none", borderRadius: "10px", padding: "12px 32px", fontSize: "16px", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "'Zain', sans-serif", opacity: saving ? 0.7 : 1 }}>
            {saving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
          </button>
        </div>
      </div>
    </div>
  );
}
