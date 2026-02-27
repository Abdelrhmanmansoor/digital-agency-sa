"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const CONTRACT_TYPES = [
  { value: "service-agreement", ar: "اتفاقية خدمة", en: "Service Agreement" },
  { value: "maintenance",       ar: "صيانة",        en: "Maintenance" },
  { value: "marketing",         ar: "تسويق رقمي",   en: "Digital Marketing" },
  { value: "custom",            ar: "مخصص",         en: "Custom" },
];

const PAYMENT_TERMS = [
  { value: "full",            ar: "دفعة كاملة",     en: "Full Payment" },
  { value: "50-50",           ar: "50% مقدم + 50%", en: "50% Upfront + 50%" },
  { value: "3-installments",  ar: "3 أقساط",        en: "3 Installments" },
  { value: "custom",          ar: "مخصص",           en: "Custom" },
];

export default function NewContractPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";

  const [type, setType] = useState("service-agreement");
  const [serviceTitleAr, setServiceTitleAr] = useState("");
  const [serviceDescriptionAr, setServiceDescriptionAr] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("full");
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [deliveryDays, setDeliveryDays] = useState("14");
  const [deliverablesText, setDeliverablesText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!serviceTitleAr || !totalAmount || !deliveryDays) {
      setError(isRTL ? "يرجى تعبئة الحقول المطلوبة" : "Please fill required fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const deliverables = deliverablesText
        .split("\n")
        .map(s => s.trim())
        .filter(Boolean);

      const res = await fetch("/api/client/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type, serviceTitleAr, serviceTitle: serviceTitleAr,
          serviceDescriptionAr, serviceDescription: serviceDescriptionAr,
          totalAmount: Number(totalAmount), paymentTerms,
          startDate: new Date(startDate).toISOString(),
          deliveryDays: Number(deliveryDays),
          deliverables,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "حدث خطأ");
        return;
      }
      router.push(`/${locale}/dashboard/contracts`);
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
  const selectStyle: React.CSSProperties = {
    ...inp, appearance: "none" as const,
  };

  return (
    <div style={{ padding: "32px 24px", maxWidth: "680px", direction: isRTL ? "rtl" : "ltr" }}>
      {/* Back */}
      <Link href={`/${locale}/dashboard/contracts`} style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        color: "rgba(255,255,255,0.4)", fontFamily: "'Zain', sans-serif",
        fontSize: "13px", textDecoration: "none", marginBottom: "24px",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d={isRTL ? "M5 12h14M12 5l7 7-7 7" : "M19 12H5M12 19l-7-7 7-7"} />
        </svg>
        {isRTL ? "رجوع للعقود" : "Back to Contracts"}
      </Link>

      <h1 style={{ fontFamily: "'Zain', sans-serif", fontSize: "26px", fontWeight: 800, color: "#FAFAF7", marginBottom: "4px" }}>
        {isRTL ? "طلب عقد جديد" : "New Contract Request"}
      </h1>
      <p style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "32px" }}>
        {isRTL ? "سيُراجع فريقنا الطلب ويتواصل معك" : "Our team will review the request and contact you"}
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Type */}
        <div>
          <label style={label}>{isRTL ? "نوع العقد" : "Contract Type"}</label>
          <select style={selectStyle} value={type} onChange={e => setType(e.target.value)}>
            {CONTRACT_TYPES.map(t => (
              <option key={t.value} value={t.value}>{isRTL ? t.ar : t.en}</option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label style={label}>{isRTL ? "عنوان الخدمة *" : "Service Title *"}</label>
          <input style={inp} required value={serviceTitleAr}
            placeholder={isRTL ? "مثال: تصميم متجر سلة احترافي" : "e.g. Professional Salla Store Design"}
            onChange={e => setServiceTitleAr(e.target.value)} />
        </div>

        {/* Description */}
        <div>
          <label style={label}>{isRTL ? "وصف الخدمة المطلوبة" : "Service Description"}</label>
          <textarea
            style={{ ...inp, minHeight: "100px", resize: "vertical" }}
            value={serviceDescriptionAr}
            placeholder={isRTL ? "اشرح ما تحتاجه بالتفصيل..." : "Describe what you need in detail..."}
            onChange={e => setServiceDescriptionAr(e.target.value)}
          />
        </div>

        {/* Amount + Payment */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div>
            <label style={label}>{isRTL ? "الميزانية / المبلغ (SAR) *" : "Budget / Amount (SAR) *"}</label>
            <input style={inp} required type="number" min="1" value={totalAmount}
              placeholder="0"
              onChange={e => setTotalAmount(e.target.value)} />
          </div>
          <div>
            <label style={label}>{isRTL ? "شروط الدفع" : "Payment Terms"}</label>
            <select style={selectStyle} value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)}>
              {PAYMENT_TERMS.map(p => (
                <option key={p.value} value={p.value}>{isRTL ? p.ar : p.en}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dates */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div>
            <label style={label}>{isRTL ? "تاريخ البداية المفضل" : "Preferred Start Date"}</label>
            <input style={inp} type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div>
            <label style={label}>{isRTL ? "مدة التنفيذ (أيام) *" : "Delivery Days *"}</label>
            <input style={inp} required type="number" min="1" value={deliveryDays}
              onChange={e => setDeliveryDays(e.target.value)} />
          </div>
        </div>

        {/* Deliverables */}
        <div>
          <label style={label}>{isRTL ? "المنجزات المطلوبة (كل سطر = منجز واحد)" : "Deliverables (one per line)"}</label>
          <textarea
            style={{ ...inp, minHeight: "90px", resize: "vertical" }}
            value={deliverablesText}
            placeholder={isRTL
              ? "مثال:\nتصميم الهوية البصرية\nتركيب الثيم\nربط طرق الدفع"
              : "Example:\nBrand identity design\nTheme installation\nPayment gateway setup"}
            onChange={e => setDeliverablesText(e.target.value)}
          />
        </div>

        {error && (
          <div style={{
            padding: "12px 16px",
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
            : (isRTL ? "إرسال طلب العقد" : "Submit Contract Request")}
        </button>
      </form>
    </div>
  );
}
