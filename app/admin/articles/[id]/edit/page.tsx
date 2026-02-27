"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

const CATEGORIES = ["سلة", "تسويق", "تصميم", "SEO", "تقنية", "عام"];

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    titleAr: "",
    titleEn: "",
    excerptAr: "",
    excerptEn: "",
    contentAr: "",
    contentEn: "",
    category: "سلة",
    image: "",
    status: "draft" as "draft" | "published",
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    fetch(`/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.article) {
          setForm({
            titleAr: data.article.titleAr || "",
            titleEn: data.article.titleEn || "",
            excerptAr: data.article.excerptAr || "",
            excerptEn: data.article.excerptEn || "",
            contentAr: data.article.contentAr || "",
            contentEn: data.article.contentEn || "",
            category: data.article.category || "سلة",
            image: data.article.image || "",
            status: data.article.status || "draft",
            metaTitle: data.article.metaTitle || "",
            metaDescription: data.article.metaDescription || "",
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setError("فشل تحميل المقال");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (status: "draft" | "published") => {
    if (!form.titleAr) {
      setError("العنوان بالعربية مطلوب");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status, publishedAt: status === "published" ? new Date().toISOString() : undefined }),
      });
      if (!res.ok) throw new Error("فشل الحفظ");
      router.push("/admin/articles");
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
    fontFamily: "Noto Sans Arabic, sans-serif",
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
        <AdminSidebar active="articles" />
        <main style={{ flex: 1, padding: "40px", marginRight: "260px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "#8C8C7A", fontFamily: "Space Mono" }}>جاري التحميل...</p>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0A" }}>
      <AdminSidebar active="articles" />

      <main style={{ flex: 1, padding: "40px", marginRight: "260px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <Link
            href="/admin/articles"
            style={{ color: "#8C8C7A", fontFamily: "Space Mono", fontSize: "12px", textDecoration: "none", display: "block", marginBottom: "8px" }}
          >
            ← العودة للمقالات
          </Link>
          <h1 style={{ fontFamily: "Noto Kufi Arabic", fontSize: "28px", fontWeight: 700, color: "#FAFAF7" }}>
            تعديل المقال
          </h1>
        </div>

        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#ef4444",
              padding: "12px 16px",
              marginBottom: "24px",
              fontFamily: "Noto Sans Arabic",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Titles */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
          <div>
            <label style={labelStyle}>العنوان (عربي) *</label>
            <input style={inputStyle} value={form.titleAr} onChange={(e) => handleChange("titleAr", e.target.value)} placeholder="عنوان المقال" required />
          </div>
          <div>
            <label style={labelStyle}>Title (English)</label>
            <input style={inputStyle} value={form.titleEn} onChange={(e) => handleChange("titleEn", e.target.value)} placeholder="Article title" />
          </div>
        </div>

        {/* Excerpts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
          <div>
            <label style={labelStyle}>المقتطف (عربي)</label>
            <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.excerptAr} onChange={(e) => handleChange("excerptAr", e.target.value)} placeholder="وصف مختصر للمقال" />
          </div>
          <div>
            <label style={labelStyle}>Excerpt (English)</label>
            <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={form.excerptEn} onChange={(e) => handleChange("excerptEn", e.target.value)} placeholder="Short article description" />
          </div>
        </div>

        {/* Content */}
        <div style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>المحتوى (عربي) — HTML</label>
          <textarea
            style={{ ...inputStyle, minHeight: "200px", resize: "vertical", direction: "rtl" }}
            value={form.contentAr}
            onChange={(e) => handleChange("contentAr", e.target.value)}
            placeholder="<p>محتوى المقال...</p>"
          />
        </div>
        <div style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>Content (English) — HTML</label>
          <textarea
            style={{ ...inputStyle, minHeight: "200px", resize: "vertical" }}
            value={form.contentEn}
            onChange={(e) => handleChange("contentEn", e.target.value)}
            placeholder="<p>Article content...</p>"
          />
        </div>

        {/* Meta fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", marginBottom: "24px" }}>
          <div>
            <label style={labelStyle}>الفئة</label>
            <select style={inputStyle} value={form.category} onChange={(e) => handleChange("category", e.target.value)}>
              {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Meta Title</label>
            <input style={inputStyle} value={form.metaTitle} onChange={(e) => handleChange("metaTitle", e.target.value)} placeholder="SEO title" />
          </div>
          <div>
            <label style={labelStyle}>Meta Description</label>
            <input style={inputStyle} value={form.metaDescription} onChange={(e) => handleChange("metaDescription", e.target.value)} placeholder="SEO description" />
          </div>
        </div>

        {/* Image */}
        <div style={{ marginBottom: "40px" }}>
          <label style={labelStyle}>رابط الصورة</label>
          <input
            style={inputStyle}
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
            placeholder="https://images.unsplash.com/..."
          />
          {form.image && (
            <div style={{ marginTop: "12px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.image} alt="Preview" style={{ height: "180px", objectFit: "cover", display: "block" }} onError={(e) => (e.currentTarget.style.display = "none")} />
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => handleSave("published")}
            disabled={saving}
            className="btn-primary"
            style={{ opacity: saving ? 0.7 : 1, cursor: saving ? "not-allowed" : "pointer" }}
          >
            {saving ? "جاري الحفظ..." : "حفظ ونشر"}
          </button>
          <button
            onClick={() => handleSave("draft")}
            disabled={saving}
            style={{
              padding: "14px 32px",
              background: "transparent",
              border: "1px solid rgba(200,169,98,0.3)",
              color: "#C8A962",
              fontFamily: "Space Mono",
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.7 : 1,
            }}
          >
            حفظ كمسودة
          </button>
          <Link
            href="/admin/articles"
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
      </main>
    </div>
  );
}
