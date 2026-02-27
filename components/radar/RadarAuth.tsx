"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function RadarAuth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const locale = useLocale();

  const [form, setForm] = useState({
    name: "", email: "", password: "", storeName: "",
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = mode === "login"
      ? "/api/radar/auth/login"
      : "/api/radar/auth/register";

    const body = mode === "login"
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password, storeName: form.storeName };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "حدث خطأ");
      } else {
        router.push(`/${locale}/radar/dashboard`);
        router.refresh();
      }
    } catch {
      setError("خطأ في الاتصال، تحقق من الإنترنت");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(200,169,98,0.2)",
    borderRadius: "2px",
    padding: "14px 16px",
    color: "#FAFAF7",
    fontSize: "15px",
    fontFamily: "'Zain', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
    direction: "rtl",
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(200,169,98,0.15)",
        borderRadius: "4px",
        padding: "40px",
        maxWidth: "440px",
        width: "100%",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Toggle */}
      <div style={{ display: "flex", gap: "0", marginBottom: "32px", border: "1px solid rgba(200,169,98,0.15)", borderRadius: "2px", overflow: "hidden" }}>
        {(["login", "register"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setError(""); }}
            style={{
              flex: 1,
              padding: "10px",
              background: mode === m ? "#C8A962" : "transparent",
              color: mode === m ? "#0A0A0A" : "rgba(255,255,255,0.5)",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Zain', sans-serif",
              fontSize: "15px",
              fontWeight: mode === m ? 700 : 400,
              transition: "all 0.2s",
            }}
          >
            {m === "login" ? "دخول" : "حساب جديد"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {mode === "register" && (
          <>
            <input
              type="text"
              placeholder="اسمك الكريم"
              value={form.name}
              onChange={set("name")}
              required
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="اسم متجرك (اختياري)"
              value={form.storeName}
              onChange={set("storeName")}
              style={inputStyle}
            />
          </>
        )}

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={form.email}
          onChange={set("email")}
          required
          style={inputStyle}
          dir="ltr"
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={form.password}
          onChange={set("password")}
          required
          style={{ ...inputStyle, dir: "ltr" } as React.CSSProperties}
          dir="ltr"
        />

        {error && (
          <div style={{ color: "#ff6b6b", fontSize: "13px", textAlign: "center", fontFamily: "'Zain', sans-serif" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading ? "rgba(200,169,98,0.4)" : "#C8A962",
            color: "#0A0A0A",
            border: "none",
            borderRadius: "2px",
            fontSize: "16px",
            fontWeight: 700,
            fontFamily: "'Zain', sans-serif",
            cursor: loading ? "not-allowed" : "pointer",
            letterSpacing: "0.05em",
            transition: "all 0.2s",
            marginTop: "8px",
          }}
        >
          {loading
            ? "جاري التحميل..."
            : mode === "login"
            ? "دخول للرادار"
            : "إنشاء حسابي"}
        </button>
      </form>

      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "12px", marginTop: "20px", fontFamily: "'Zain', sans-serif" }}>
        مجاني للأبد — لا بيانات بنكية مطلوبة
      </p>
    </div>
  );
}
