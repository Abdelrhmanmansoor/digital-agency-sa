"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "ar";
  const isRTL = locale === "ar";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");
  const [passSaving, setPassSaving] = useState(false);
  const [passSuccess, setPassSuccess] = useState("");

  useEffect(() => {
    fetch("/api/client/auth/me").then(r => r.json()).then(d => {
      if (d.user) {
        setName(d.user.name || "");
        setEmail(d.user.email || "");
        setPhone(d.user.phone || "");
        setCompany(d.user.company || "");
      }
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setSaving(true);
    const res = await fetch("/api/client/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, company }),
    });
    setSaving(false);
    if (!res.ok) { const d = await res.json(); setError(d.error || "حدث خطأ"); return; }
    setSuccess(isRTL ? "تم حفظ التغييرات" : "Changes saved successfully");
  };

  const handlePassChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(""); setPassSuccess("");
    if (newPass !== confirmPass) { setPassError(isRTL ? "كلمتا المرور غير متطابقتان" : "Passwords do not match"); return; }
    if (newPass.length < 8) { setPassError(isRTL ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل" : "Password must be at least 8 characters"); return; }
    setPassSaving(true);
    const res = await fetch("/api/client/profile/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: curPass, newPassword: newPass }),
    });
    setPassSaving(false);
    if (!res.ok) { const d = await res.json(); setPassError(d.error || "حدث خطأ"); return; }
    setPassSuccess(isRTL ? "تم تغيير كلمة المرور" : "Password changed successfully");
    setCurPass(""); setNewPass(""); setConfirmPass("");
  };

  const S = {
    inputStyle: { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "10px", padding: "12px 16px", color: "#FAFAF7", fontSize: "15px", fontFamily: "'Zain', sans-serif", outline: "none", boxSizing: "border-box" as const, marginBottom: "20px" },
    labelStyle: { display: "block", fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "8px" },
    btn: { background: "#C8A962", color: "#0A0A0A", border: "none", borderRadius: "10px", padding: "12px 28px", cursor: "pointer", fontFamily: "Space Mono, monospace", fontSize: "12px", fontWeight: 700 } as React.CSSProperties,
    card: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "28px 32px", marginBottom: "24px" } as React.CSSProperties,
  };

  if (loading) return (
    <div style={{ padding: "40px", direction: isRTL ? "rtl" : "ltr" }}>
      <div style={{ fontFamily: "'Zain', sans-serif", color: "rgba(255,255,255,0.3)" }}>{isRTL ? "جاري التحميل..." : "Loading..."}</div>
    </div>
  );

  return (
    <div style={{ padding: "40px", direction: isRTL ? "rtl" : "ltr", maxWidth: "640px" }}>
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontFamily: "'Zain', sans-serif", fontSize: "28px", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>
          {isRTL ? "حسابي" : "My Profile"}
        </h1>
      </div>

      {/* Profile info */}
      <div style={S.card}>
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "24px" }}>
          {isRTL ? "المعلومات الشخصية" : "Personal Information"}
        </div>
        <form onSubmit={handleSave}>
          <label style={S.labelStyle}>{isRTL ? "الاسم الكامل" : "Full Name"}</label>
          <input style={S.inputStyle} type="text" required value={name} onChange={e => setName(e.target.value)} />

          <label style={S.labelStyle}>{isRTL ? "البريد الإلكتروني" : "Email"}</label>
          <input style={{ ...S.inputStyle, opacity: 0.5, cursor: "not-allowed" }} type="email" value={email} disabled />
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "-16px", marginBottom: "20px" }}>
            {isRTL ? "لا يمكن تغيير البريد الإلكتروني" : "Email cannot be changed"}
          </div>

          <label style={S.labelStyle}>{isRTL ? "رقم الجوال" : "Phone"}</label>
          <input style={S.inputStyle} type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+966 5X XXX XXXX" />

          <label style={S.labelStyle}>{isRTL ? "اسم الشركة" : "Company"}</label>
          <input style={S.inputStyle} type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder={isRTL ? "اسم علامتك التجارية" : "Your brand name"} />

          {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", padding: "10px 14px", color: "#FCA5A5", fontFamily: "'Zain', sans-serif", fontSize: "14px", marginBottom: "16px" }}>{error}</div>}
          {success && <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "8px", padding: "10px 14px", color: "#86EFAC", fontFamily: "'Zain', sans-serif", fontSize: "14px", marginBottom: "16px" }}>{success}</div>}

          <button type="submit" disabled={saving} style={S.btn}>
            {saving ? (isRTL ? "جاري الحفظ..." : "Saving...") : (isRTL ? "حفظ التغييرات" : "Save Changes")}
          </button>
        </form>
      </div>

      {/* Change password */}
      <div style={S.card}>
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "24px" }}>
          {isRTL ? "تغيير كلمة المرور" : "Change Password"}
        </div>
        <form onSubmit={handlePassChange}>
          <label style={S.labelStyle}>{isRTL ? "كلمة المرور الحالية" : "Current password"}</label>
          <input style={S.inputStyle} type="password" required value={curPass} onChange={e => setCurPass(e.target.value)} />

          <label style={S.labelStyle}>{isRTL ? "كلمة المرور الجديدة" : "New password"}</label>
          <input style={S.inputStyle} type="password" required minLength={8} value={newPass} onChange={e => setNewPass(e.target.value)} />

          <label style={S.labelStyle}>{isRTL ? "تأكيد كلمة المرور" : "Confirm password"}</label>
          <input style={S.inputStyle} type="password" required value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />

          {passError && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", padding: "10px 14px", color: "#FCA5A5", fontFamily: "'Zain', sans-serif", fontSize: "14px", marginBottom: "16px" }}>{passError}</div>}
          {passSuccess && <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "8px", padding: "10px 14px", color: "#86EFAC", fontFamily: "'Zain', sans-serif", fontSize: "14px", marginBottom: "16px" }}>{passSuccess}</div>}

          <button type="submit" disabled={passSaving} style={S.btn}>
            {passSaving ? (isRTL ? "جاري التغيير..." : "Changing...") : (isRTL ? "تغيير كلمة المرور" : "Change Password")}
          </button>
        </form>
      </div>

      {/* Logout */}
      <button
        onClick={async () => {
          await fetch("/api/client/auth/logout", { method: "POST" });
          router.push(`/${locale}/dashboard/login`);
        }}
        style={{ background: "transparent", border: "1px solid rgba(239,68,68,0.2)", color: "rgba(239,68,68,0.6)", borderRadius: "10px", padding: "11px 24px", cursor: "pointer", fontFamily: "'Zain', sans-serif", fontSize: "14px" }}
      >
        {isRTL ? "تسجيل الخروج" : "Sign out"}
      </button>
    </div>
  );
}
