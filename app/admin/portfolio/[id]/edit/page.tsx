"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

const CATEGORIES = ["salla", "websites", "branding", "marketing", "app"];

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    nameAr: "",
    nameEn: "",
    descriptionAr: "",
    descriptionEn: "",
    category: "salla",
    image: "",
    url: "",
    featured: false,
    order: 0,
  });

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.project) {
          setForm({
            nameAr: data.project.nameAr || "",
            nameEn: data.project.nameEn || "",
            descriptionAr: data.project.descriptionAr || "",
            descriptionEn: data.project.descriptionEn || "",
            category: data.project.category || "salla",
            image: data.project.image || "",
            url: data.project.url || "",
            featured: data.project.featured || false,
            order: data.project.order || 0,
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setError("فشل تحميل المشروع");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (field: string, value: string | boolean | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nameAr || !form.image) {
      setError("اسم المشروع والصورة مطلوبان");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("فشل الحفظ");
      router.push("/admin/portfolio");
    } catch {
      setError("حدث خطأ أثناء الحفظ");
      setSaving(false);
    }
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

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0A" }}>
        <AdminSidebar active="portfolio" />
        <main style={{ flex: 1, padding: "40px", marginRight: "260px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "#8C8C7A", fontFamily: "Space Mono" }}>جاري التحميل...</p>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0A" }}>
      <AdminSidebar active="portfolio" />

      <main style={{ flex: 1, padding: "40px", marginRight: "260px" }}>
        <div style={{ marginBottom: "40px" }}>
          <Link
            href="/admin/portfolio"
            style={{ color: "#8C8C7A", fontFamily: "Space Mono", fontSize: "12px", textDecoration: "none", display: "block", marginBottom: "8px" }}
          >
            ← العودة للمشاريع
          </Link>
          <h1 style={{ fontFamily: "'Zain', sans-serif", fontSize: "28px", fontWeight: 700, color: "#FAFAF7" }}>
            تعديل المشروع
          </h1>
        </div>

        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", padding: "12px 16px", marginBottom: "24px", fontFamily: "'Zain', sans-serif", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
            <div>
              <label style={labelStyle}>اسم المشروع (عربي) *</label>
              <input style={inputStyle} value={form.nameAr} onChange={(e) => handleChange("nameAr", e.target.value)} required />
            </div>
            <div>
              <label style={labelStyle}>Project Name (English)</label>
              <input style={inputStyle} value={form.nameEn} onChange={(e) => handleChange("nameEn", e.target.value)} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
            <div>
              <label style={labelStyle}>الوصف (عربي)</label>
              <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.descriptionAr} onChange={(e) => handleChange("descriptionAr", e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Description (English)</label>
              <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} value={form.descriptionEn} onChange={(e) => handleChange("descriptionEn", e.target.value)} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", marginBottom: "24px" }}>
            <div>
              <label style={labelStyle}>الفئة</label>
              <select style={inputStyle} value={form.category} onChange={(e) => handleChange("category", e.target.value)}>
                {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>رابط الموقع</label>
              <input style={inputStyle} value={form.url} onChange={(e) => handleChange("url", e.target.value)} type="url" placeholder="https://..." />
            </div>
            <div>
              <label style={labelStyle}>الترتيب</label>
              <input style={inputStyle} value={form.order} onChange={(e) => handleChange("order", parseInt(e.target.value) || 0)} type="number" min="0" />
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>رابط الصورة *</label>
            <input style={inputStyle} value={form.image} onChange={(e) => handleChange("image", e.target.value)} required />
            {form.image && (
              <div style={{ marginTop: "12px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.image} alt="Preview" style={{ height: "200px", width: "100%", objectFit: "cover" }} onError={(e) => (e.currentTarget.style.display = "none")} />
              </div>
            )}
          </div>

          <div style={{ marginBottom: "40px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => handleChange("featured", e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "#C8A962" }}
              />
              <span style={{ color: "#FAFAF7", fontFamily: "'Zain', sans-serif", fontSize: "14px" }}>مشروع مميز</span>
            </label>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary"
              style={{ opacity: saving ? 0.7 : 1, cursor: saving ? "not-allowed" : "pointer" }}
            >
              {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>
            <Link
              href="/admin/portfolio"
              style={{
                padding: "14px 32px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#8C8C7A",
                fontFamily: "Space Mono",
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              إلغاء
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
