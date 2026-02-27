"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "بيانات خاطئة");
      }
    } catch {
      setError("حدث خطأ، حاول مجدداً");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      {/* Left — Black side */}
      <div
        className="hidden md:flex flex-col justify-between p-16 relative overflow-hidden"
        style={{ background: "#0A0A0A" }}
      >
        {/* Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23C8A962' stroke-width='0.5'%3E%3Cpath d='M40 0 L80 20 L80 60 L40 80 L0 60 L0 20 Z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
            opacity: 0.05,
          }}
        />

        <div className="relative z-10">
          <div
            style={{
              fontFamily: "Noto Kufi Arabic, sans-serif",
              fontSize: "32px",
              fontWeight: 800,
              color: "#C8A962",
            }}
          >
            وكالة رقمية
          </div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", letterSpacing: "0.3em", color: "rgba(200,169,98,0.5)", textTransform: "uppercase", marginTop: "4px" }}>
            ADMIN PANEL
          </div>
        </div>

        <div className="relative z-10">
          <h1
            style={{
              fontFamily: "Noto Kufi Arabic, sans-serif",
              fontSize: "48px",
              fontWeight: 700,
              color: "#FAFAF7",
              lineHeight: 1.2,
              marginBottom: "24px",
            }}
          >
            لوحة التحكم
            <br />
            <span style={{ color: "#C8A962" }}>الاحترافية</span>
          </h1>
          <p style={{ color: "#8C8C7A", fontSize: "16px", lineHeight: 1.7 }}>
            أدر مقالاتك، أعمالك، خدماتك، ورسائل عملائك من مكان واحد.
          </p>
        </div>

        <div className="relative z-10" style={{ color: "#8C8C7A", fontFamily: "Space Mono", fontSize: "12px", letterSpacing: "0.1em" }}>
          © 2025 وكالة رقمية
        </div>
      </div>

      {/* Right — Login Form */}
      <div
        className="flex items-center justify-center p-8"
        style={{ background: "#FAFAF7" }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <div className="mb-12">
            <h2
              style={{
                fontFamily: "Noto Kufi Arabic, sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#0A0A0A",
                marginBottom: "8px",
              }}
            >
              تسجيل الدخول
            </h2>
            <p style={{ color: "#8C8C7A", fontSize: "15px" }}>
              ادخل بياناتك للوصول للوحة التحكم
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontFamily: "Space Mono, monospace",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#8C8C7A",
                  marginBottom: "8px",
                }}
              >
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@digitalagency.sa"
                required
                className="form-input"
                style={{ background: "#FFFFFF", color: "#0A0A0A", border: "1px solid #E8E6E1", width: "100%" }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontFamily: "Space Mono, monospace",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#8C8C7A",
                  marginBottom: "8px",
                }}
              >
                كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="form-input"
                style={{ background: "#FFFFFF", color: "#0A0A0A", border: "1px solid #E8E6E1", width: "100%" }}
              />
            </div>

            {error && (
              <div
                style={{
                  padding: "12px 16px",
                  background: "rgba(201,64,64,0.08)",
                  border: "1px solid rgba(201,64,64,0.2)",
                  color: "#C94040",
                  fontSize: "14px",
                  fontFamily: "Noto Sans Arabic, sans-serif",
                }}
              >
                ✗ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center"
              style={{ width: "100%", opacity: loading ? 0.7 : 1, justifyContent: "center" }}
            >
              <span>{loading ? "جاري الدخول..." : "دخول"}</span>
            </button>
          </form>

          <div style={{ marginTop: "24px", textAlign: "center", color: "#8C8C7A", fontSize: "12px", fontFamily: "Space Mono, monospace" }}>
            Default: admin@digitalagency.sa / Admin@2025!
          </div>
        </div>
      </div>
    </div>
  );
}
