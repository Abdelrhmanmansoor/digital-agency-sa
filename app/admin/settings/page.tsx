"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "وكالة رقمية",
    siteNameEn: "Digital Agency",
    whatsapp: "+201007835547",
    email: "info@digitalagency.sa",
    phone: "+966 5X XXX XXXX",
    address: "المملكة العربية السعودية",
    instagram: "",
    twitter: "",
    tiktok: "",
    snapchat: "",
  });

  const handleChange = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle = {
    width: "100%",
    background: "#0A0A0A",
    border: "1px solid rgba(200,169,98,0.2)",
    color: "#FAFAF7",
    padding: "12px 16px",
    fontSize: "14px",
    fontFamily: "'Zain', sans-serif",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    color: "#8C8C7A",
    fontSize: "11px",
    fontFamily: "Space Mono",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    marginBottom: "8px",
  };

  const sectionStyle = {
    background: "#141414",
    border: "1px solid rgba(200,169,98,0.1)",
    padding: "32px",
    marginBottom: "24px",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0A" }}>
      <AdminSidebar active="settings" />

      <main style={{ flex: 1, padding: "40px", marginRight: "260px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontFamily: "'Zain', sans-serif", fontSize: "28px", fontWeight: 700, color: "#FAFAF7", marginBottom: "4px" }}>
            الإعدادات
          </h1>
          <p style={{ color: "#8C8C7A", fontFamily: "Space Mono", fontSize: "12px" }}>
            SITE SETTINGS
          </p>
        </div>

        {saved && (
          <div
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.3)",
              color: "#22c55e",
              padding: "12px 16px",
              marginBottom: "24px",
              fontFamily: "'Zain', sans-serif",
              fontSize: "14px",
            }}
          >
            ✓ تم حفظ الإعدادات بنجاح
          </div>
        )}

        <form onSubmit={handleSave}>
          {/* Site Info */}
          <div style={sectionStyle}>
            <h2 style={{ fontFamily: "'Zain', sans-serif", fontSize: "18px", fontWeight: 700, color: "#FAFAF7", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid rgba(200,169,98,0.1)" }}>
              معلومات الموقع
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={labelStyle}>اسم الموقع (عربي)</label>
                <input style={inputStyle} value={settings.siteName} onChange={(e) => handleChange("siteName", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Site Name (English)</label>
                <input style={inputStyle} value={settings.siteNameEn} onChange={(e) => handleChange("siteNameEn", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div style={sectionStyle}>
            <h2 style={{ fontFamily: "'Zain', sans-serif", fontSize: "18px", fontWeight: 700, color: "#FAFAF7", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid rgba(200,169,98,0.1)" }}>
              معلومات التواصل
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={labelStyle}>واتساب</label>
                <input style={inputStyle} value={settings.whatsapp} onChange={(e) => handleChange("whatsapp", e.target.value)} placeholder="+966..." />
              </div>
              <div>
                <label style={labelStyle}>البريد الإلكتروني</label>
                <input style={inputStyle} value={settings.email} onChange={(e) => handleChange("email", e.target.value)} type="email" />
              </div>
              <div>
                <label style={labelStyle}>الهاتف</label>
                <input style={inputStyle} value={settings.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>العنوان</label>
                <input style={inputStyle} value={settings.address} onChange={(e) => handleChange("address", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div style={sectionStyle}>
            <h2 style={{ fontFamily: "'Zain', sans-serif", fontSize: "18px", fontWeight: 700, color: "#FAFAF7", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid rgba(200,169,98,0.1)" }}>
              وسائل التواصل الاجتماعي
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {[
                { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/..." },
                { key: "twitter", label: "Twitter/X", placeholder: "https://x.com/..." },
                { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@..." },
                { key: "snapchat", label: "Snapchat", placeholder: "https://snapchat.com/..." },
              ].map((social) => (
                <div key={social.key}>
                  <label style={labelStyle}>{social.label}</label>
                  <input
                    style={inputStyle}
                    value={settings[social.key as keyof typeof settings]}
                    onChange={(e) => handleChange(social.key, e.target.value)}
                    placeholder={social.placeholder}
                    type="url"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Admin Account */}
          <div style={sectionStyle}>
            <h2 style={{ fontFamily: "'Zain', sans-serif", fontSize: "18px", fontWeight: 700, color: "#FAFAF7", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid rgba(200,169,98,0.1)" }}>
              حساب المدير
            </h2>
            <div
              style={{
                background: "rgba(200,169,98,0.05)",
                border: "1px solid rgba(200,169,98,0.15)",
                padding: "16px",
                color: "#8C8C7A",
                fontFamily: "Space Mono",
                fontSize: "12px",
                lineHeight: 1.8,
              }}
            >
              <div>EMAIL: admin@digitalagency.sa</div>
              <div style={{ marginTop: "8px", color: "#C8A962" }}>
                لتغيير كلمة المرور، قم بتحديث متغيرات البيئة في ملف .env.local
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
          >
            حفظ الإعدادات
          </button>
        </form>
      </main>
    </div>
  );
}
