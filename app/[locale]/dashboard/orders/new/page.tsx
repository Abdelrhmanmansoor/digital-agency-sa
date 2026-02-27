"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

const SERVICES = [
  { id: "salla-design",     ar: "تصميم متجر سلة",       en: "Salla Store Design",    desc_ar: "تصميم احترافي لمتجرك على منصة سلة",    desc_en: "Professional Salla store design" },
  { id: "store-launch",     ar: "تأسيس متجر إلكتروني",  en: "E-Commerce Launch",     desc_ar: "إنشاء متجر من الصفر جاهز للبيع",       desc_en: "Full store launch from scratch" },
  { id: "store-management", ar: "إدارة المتجر",          en: "Store Management",      desc_ar: "إدارة شهرية لمتجرك ومنتجاتك",          desc_en: "Monthly store & product management" },
  { id: "brand-identity",   ar: "هوية بصرية",            en: "Brand Identity",        desc_ar: "شعار، ألوان، وهوية بصرية كاملة",       desc_en: "Logo, colors, and complete brand identity" },
  { id: "social-media",     ar: "سوشيال ميديا",          en: "Social Media",          desc_ar: "إدارة حسابات التواصل الاجتماعي",       desc_en: "Social media account management" },
  { id: "digital-marketing",ar: "تسويق رقمي",            en: "Digital Marketing",     desc_ar: "حملات إعلانية على Google وMeta",        desc_en: "Google & Meta ad campaigns" },
  { id: "content-creation", ar: "إنتاج محتوى",           en: "Content Creation",      desc_ar: "تصوير وتصميم محتوى احترافي",            desc_en: "Professional photo & content production" },
  { id: "custom",           ar: "خدمة مخصصة",            en: "Custom Service",        desc_ar: "خدمة تناسب احتياجاتك تحديداً",         desc_en: "A service tailored exactly to your needs" },
];

const BUDGETS_AR = ["أقل من 1,000 ر.س", "1,000 – 3,000 ر.س", "3,000 – 7,000 ر.س", "7,000 – 15,000 ر.س", "أكثر من 15,000 ر.س"];
const BUDGETS_EN = ["Under SAR 1,000", "SAR 1,000 – 3,000", "SAR 3,000 – 7,000", "SAR 7,000 – 15,000", "Over SAR 15,000"];

export default function NewOrderPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "ar";
  const isRTL = locale === "ar";

  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [referenceLinks, setReferenceLinks] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const basePath = `/${locale}/dashboard`;

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    const res = await fetch("/api/client/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceType, title, description, requirements, referenceLinks, budget }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "حدث خطأ"); return; }
    router.push(`${basePath}/orders/${data.order.id}`);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#FAFAF7",
    fontSize: "15px",
    fontFamily: "'Zain', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: "20px",
    resize: "vertical" as const,
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "Space Mono, monospace",
    fontSize: "10px",
    color: "rgba(255,255,255,0.35)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "8px",
  };

  return (
    <div style={{ padding: "40px", direction: isRTL ? "rtl" : "ltr", maxWidth: "760px" }}>
      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <a href={`${basePath}/orders`} style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "#C8A962", textDecoration: "none", letterSpacing: "0.1em" }}>
          {isRTL ? "← طلباتي" : "← My Orders"}
        </a>
        <h1 style={{ fontFamily: "'Zain', sans-serif", fontSize: "28px", fontWeight: 800, color: "#FAFAF7", marginTop: "12px", marginBottom: "8px" }}>
          {isRTL ? "طلب خدمة جديدة" : "New Service Order"}
        </h1>
        {/* Progress */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: step >= s ? "#C8A962" : "rgba(255,255,255,0.06)",
                color: step >= s ? "#0A0A0A" : "rgba(255,255,255,0.25)",
                fontFamily: "Space Mono, monospace", fontSize: "11px", fontWeight: 700, flexShrink: 0,
              }}>{s}</div>
              {s < 3 && <div style={{ width: "32px", height: "2px", background: step > s ? "#C8A962" : "rgba(255,255,255,0.08)" }} />}
            </div>
          ))}
          <span style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", marginInlineStart: "8px" }}>
            {step === 1 ? (isRTL ? "اختر الخدمة" : "Choose service") : step === 2 ? (isRTL ? "تفاصيل الطلب" : "Order details") : (isRTL ? "مراجعة وإرسال" : "Review & submit")}
          </span>
        </div>
      </div>

      {/* Step 1: Service selector */}
      {step === 1 && (
        <div>
          <div style={labelStyle}>{isRTL ? "اختر نوع الخدمة" : "Select service type"}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setServiceType(s.id)}
                style={{
                  background: serviceType === s.id ? "rgba(200,169,98,0.1)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${serviceType === s.id ? "rgba(200,169,98,0.4)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "12px",
                  padding: "18px 16px",
                  cursor: "pointer",
                  textAlign: isRTL ? "right" : "left",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "15px", fontWeight: 700, color: serviceType === s.id ? "#C8A962" : "#FAFAF7", marginBottom: "4px" }}>
                  {isRTL ? s.ar : s.en}
                </div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
                  {isRTL ? s.desc_ar : s.desc_en}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => { if (serviceType) setStep(2); }}
            disabled={!serviceType}
            style={{
              background: serviceType ? "#C8A962" : "rgba(255,255,255,0.06)",
              color: serviceType ? "#0A0A0A" : "rgba(255,255,255,0.25)",
              border: "none", borderRadius: "10px", padding: "13px 32px",
              cursor: serviceType ? "pointer" : "not-allowed",
              fontFamily: "Space Mono, monospace", fontSize: "12px", fontWeight: 700,
              transition: "all 0.2s",
            }}
          >
            {isRTL ? "التالي ←" : "Next →"}
          </button>
        </div>
      )}

      {/* Step 2: Details */}
      {step === 2 && (
        <div>
          <label style={labelStyle}>{isRTL ? "عنوان المشروع" : "Project title"}</label>
          <input style={inputStyle} type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder={isRTL ? "مثال: متجر سلة لمنتجات العناية" : "e.g. Salla store for skincare products"} />

          <label style={labelStyle}>{isRTL ? "وصف المشروع" : "Project description"}</label>
          <textarea style={{ ...inputStyle, minHeight: "100px" }} required value={description} onChange={e => setDescription(e.target.value)} placeholder={isRTL ? "اشرح لنا ما تريده بالتفصيل..." : "Describe what you need in detail..."} />

          <label style={labelStyle}>{isRTL ? "المتطلبات والتفاصيل الخاصة" : "Requirements & specific details"}</label>
          <textarea style={{ ...inputStyle, minHeight: "100px" }} required value={requirements} onChange={e => setRequirements(e.target.value)} placeholder={isRTL ? "ألوان، خطوط، مرجع تصميمي، منتجات..." : "Colors, fonts, design references, products..."} />

          <label style={labelStyle}>{isRTL ? "روابط مرجعية (اختياري)" : "Reference links (optional)"}</label>
          <input style={inputStyle} type="text" value={referenceLinks} onChange={e => setReferenceLinks(e.target.value)} placeholder={isRTL ? "موقع، إنستغرام، أو أمثلة تعجبك..." : "Website, Instagram, or examples you like..."} />

          <label style={labelStyle}>{isRTL ? "الميزانية التقريبية (اختياري)" : "Approximate budget (optional)"}</label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
            {(isRTL ? BUDGETS_AR : BUDGETS_EN).map((b, i) => (
              <button
                key={i}
                onClick={() => setBudget(b)}
                style={{
                  padding: "7px 14px", borderRadius: "20px", border: "1px solid", cursor: "pointer", fontSize: "12px", fontFamily: "'Zain', sans-serif",
                  background: budget === b ? "rgba(200,169,98,0.12)" : "transparent",
                  color: budget === b ? "#C8A962" : "rgba(255,255,255,0.4)",
                  borderColor: budget === b ? "rgba(200,169,98,0.35)" : "rgba(255,255,255,0.12)",
                }}
              >{b}</button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => setStep(1)} style={{ background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "12px 24px", cursor: "pointer", fontFamily: "'Zain', sans-serif", fontSize: "14px" }}>
              {isRTL ? "→ السابق" : "← Back"}
            </button>
            <button
              onClick={() => { if (title && description && requirements) setStep(3); }}
              disabled={!title || !description || !requirements}
              style={{
                background: title && description && requirements ? "#C8A962" : "rgba(255,255,255,0.06)",
                color: title && description && requirements ? "#0A0A0A" : "rgba(255,255,255,0.25)",
                border: "none", borderRadius: "10px", padding: "12px 28px",
                cursor: title && description && requirements ? "pointer" : "not-allowed",
                fontFamily: "Space Mono, monospace", fontSize: "12px", fontWeight: 700,
              }}
            >
              {isRTL ? "التالي ←" : "Next →"}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "28px", marginBottom: "24px" }}>
            <h3 style={{ fontFamily: "'Zain', sans-serif", fontSize: "18px", fontWeight: 700, color: "#FAFAF7", marginBottom: "20px" }}>
              {isRTL ? "مراجعة الطلب" : "Order Review"}
            </h3>
            {[
              { label_ar: "الخدمة", label_en: "Service", value: SERVICES.find(s => s.id === serviceType)?.[isRTL ? "ar" : "en"] || serviceType },
              { label_ar: "عنوان المشروع", label_en: "Project title", value: title },
              { label_ar: "الوصف", label_en: "Description", value: description },
              { label_ar: "المتطلبات", label_en: "Requirements", value: requirements },
              budget ? { label_ar: "الميزانية", label_en: "Budget", value: budget } : null,
              referenceLinks ? { label_ar: "روابط مرجعية", label_en: "Reference links", value: referenceLinks } : null,
            ].filter(Boolean).map((item, i) => (
              <div key={i} style={{ marginBottom: "16px" }}>
                <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                  {isRTL ? item!.label_ar : item!.label_en}
                </div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "#FAFAF7", lineHeight: 1.6 }}>{item!.value}</div>
              </div>
            ))}
          </div>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", padding: "12px 16px", color: "#FCA5A5", fontFamily: "'Zain', sans-serif", fontSize: "14px", marginBottom: "16px" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => setStep(2)} style={{ background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "12px 24px", cursor: "pointer", fontFamily: "'Zain', sans-serif", fontSize: "14px" }}>
              {isRTL ? "→ تعديل" : "← Edit"}
            </button>
            <button onClick={handleSubmit} disabled={loading} style={{ background: loading ? "rgba(200,169,98,0.5)" : "#C8A962", color: "#0A0A0A", border: "none", borderRadius: "10px", padding: "12px 32px", cursor: loading ? "not-allowed" : "pointer", fontFamily: "Space Mono, monospace", fontSize: "13px", fontWeight: 700 }}>
              {loading ? (isRTL ? "جاري الإرسال..." : "Submitting...") : (isRTL ? "إرسال الطلب" : "Submit Order")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
