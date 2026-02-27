"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function DashboardLoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "ar";
  const isRTL = locale === "ar";

  const [tab, setTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCompany, setRegCompany] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/client/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "حدث خطأ"); return; }
    router.push(`/${locale}/dashboard`);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/client/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: regName, email: regEmail, password: regPassword, phone: regPhone, company: regCompany }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "حدث خطأ"); return; }
    router.push(`/${locale}/dashboard`);
  };

  const S = {
    page: {
      background: "#0A0A0A",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      direction: isRTL ? "rtl" : "ltr",
    } as React.CSSProperties,
    card: {
      background: "#111318",
      border: "1px solid rgba(200,169,98,0.15)",
      borderRadius: "20px",
      padding: "48px 40px",
      width: "100%",
      maxWidth: "440px",
    } as React.CSSProperties,
    logo: {
      textAlign: "center" as const,
      marginBottom: "36px",
    },
    logoText: {
      fontFamily: "Space Mono, monospace",
      fontSize: "13px",
      color: "#C8A962",
      letterSpacing: "0.2em",
      textTransform: "uppercase" as const,
    },
    logoSub: {
      fontFamily: "'Zain', sans-serif",
      fontSize: "13px",
      color: "rgba(255,255,255,0.3)",
      marginTop: "4px",
    },
    tabs: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      background: "rgba(255,255,255,0.04)",
      borderRadius: "10px",
      padding: "4px",
      marginBottom: "32px",
      gap: "0",
    },
    tab: (active: boolean) => ({
      background: active ? "#C8A962" : "transparent",
      color: active ? "#0A0A0A" : "rgba(255,255,255,0.4)",
      border: "none",
      borderRadius: "8px",
      padding: "10px",
      cursor: "pointer",
      fontFamily: "'Zain', sans-serif",
      fontSize: "15px",
      fontWeight: active ? 700 : 400,
      transition: "all 0.2s",
    }),
    label: {
      display: "block",
      fontFamily: "Space Mono, monospace",
      fontSize: "10px",
      color: "rgba(255,255,255,0.35)",
      letterSpacing: "0.1em",
      textTransform: "uppercase" as const,
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "10px",
      padding: "12px 16px",
      color: "#FAFAF7",
      fontSize: "15px",
      fontFamily: "'Zain', sans-serif",
      outline: "none",
      boxSizing: "border-box" as const,
      marginBottom: "20px",
    },
    submit: {
      width: "100%",
      background: loading ? "rgba(200,169,98,0.5)" : "#C8A962",
      color: "#0A0A0A",
      border: "none",
      borderRadius: "10px",
      padding: "14px",
      cursor: loading ? "not-allowed" : "pointer",
      fontFamily: "Space Mono, monospace",
      fontSize: "13px",
      fontWeight: 700,
      letterSpacing: "0.05em",
      marginTop: "8px",
      transition: "opacity 0.2s",
    } as React.CSSProperties,
    error: {
      background: "rgba(239,68,68,0.1)",
      border: "1px solid rgba(239,68,68,0.2)",
      borderRadius: "8px",
      padding: "12px 16px",
      color: "#FCA5A5",
      fontFamily: "'Zain', sans-serif",
      fontSize: "14px",
      marginBottom: "20px",
      textAlign: "center" as const,
    },
    homeLink: {
      textAlign: "center" as const,
      marginTop: "24px",
    },
    homeLinkA: {
      fontFamily: "'Zain', sans-serif",
      fontSize: "13px",
      color: "rgba(255,255,255,0.3)",
      textDecoration: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        {/* Logo */}
        <div style={S.logo}>
          <div style={S.logoText}>DIGITAL AGENCY</div>
          <div style={S.logoSub}>{isRTL ? "بوابة العملاء" : "Client Portal"}</div>
        </div>

        {/* Tabs */}
        <div style={S.tabs}>
          <button style={S.tab(tab === "login")} onClick={() => { setTab("login"); setError(""); }}>
            {isRTL ? "تسجيل الدخول" : "Login"}
          </button>
          <button style={S.tab(tab === "register")} onClick={() => { setTab("register"); setError(""); }}>
            {isRTL ? "حساب جديد" : "Register"}
          </button>
        </div>

        {error && <div style={S.error}>{error}</div>}

        {/* Login Form */}
        {tab === "login" && (
          <form onSubmit={handleLogin}>
            <label style={S.label}>{isRTL ? "البريد الإلكتروني" : "Email"}</label>
            <input style={S.input} type="email" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder={isRTL ? "example@email.com" : "example@email.com"} />

            <label style={S.label}>{isRTL ? "كلمة المرور" : "Password"}</label>
            <input style={S.input} type="password" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="••••••••" />

            <button style={S.submit} type="submit" disabled={loading}>
              {loading ? (isRTL ? "جاري الدخول..." : "Signing in...") : (isRTL ? "دخول" : "Sign In")}
            </button>
          </form>
        )}

        {/* Register Form */}
        {tab === "register" && (
          <form onSubmit={handleRegister}>
            <label style={S.label}>{isRTL ? "الاسم الكامل" : "Full Name"}</label>
            <input style={S.input} type="text" required value={regName} onChange={e => setRegName(e.target.value)} placeholder={isRTL ? "محمد عبدالله" : "Your Name"} />

            <label style={S.label}>{isRTL ? "البريد الإلكتروني" : "Email"}</label>
            <input style={S.input} type="email" required value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="example@email.com" />

            <label style={S.label}>{isRTL ? "كلمة المرور" : "Password"}</label>
            <input style={S.input} type="password" required minLength={8} value={regPassword} onChange={e => setRegPassword(e.target.value)} placeholder={isRTL ? "8 أحرف على الأقل" : "At least 8 characters"} />

            <label style={S.label}>{isRTL ? "رقم الجوال (اختياري)" : "Phone (optional)"}</label>
            <input style={S.input} type="tel" value={regPhone} onChange={e => setRegPhone(e.target.value)} placeholder="+966 5X XXX XXXX" />

            <label style={S.label}>{isRTL ? "اسم الشركة (اختياري)" : "Company (optional)"}</label>
            <input style={S.input} type="text" value={regCompany} onChange={e => setRegCompany(e.target.value)} placeholder={isRTL ? "اسم علامتك التجارية" : "Your brand name"} />

            <button style={S.submit} type="submit" disabled={loading}>
              {loading ? (isRTL ? "جاري إنشاء الحساب..." : "Creating account...") : (isRTL ? "إنشاء الحساب" : "Create Account")}
            </button>
          </form>
        )}

        {/* Back home */}
        <div style={S.homeLink}>
          <a style={S.homeLinkA} href={`/${locale}`}>
            {isRTL ? "← العودة للرئيسية" : "← Back to home"}
          </a>
        </div>
      </div>
    </div>
  );
}
