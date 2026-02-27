"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function NewArticlePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
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
    tags: [] as string[],
  });

  const save = async (status: "draft" | "published") => {
    setSaving(true);
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status, publishedAt: status === "published" ? new Date().toISOString() : undefined }),
      });
      if (res.ok) router.push("/admin/articles");
    } catch {
      alert("خطأ في الحفظ");
    } finally {
      setSaving(false);
    }
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontFamily: "Space Mono, monospace",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#8C8C7A",
    marginBottom: "8px",
  };

  const inputStyle = {
    background: "#FFFFFF",
    color: "#0A0A0A",
    border: "1px solid #E8E6E1",
    width: "100%",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <main className="admin-main" style={{ padding: "40px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <h1 style={{ fontFamily: "'Zain', sans-serif", fontSize: "24px", fontWeight: 700, color: "#0A0A0A" }}>
            مقال جديد
          </h1>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => save("draft")}
              disabled={saving}
              style={{
                padding: "12px 24px",
                background: "transparent",
                border: "1px solid #E8E6E1",
                cursor: "pointer",
                fontFamily: "'Zain', sans-serif",
                fontSize: "14px",
                color: "#8C8C7A",
              }}
            >
              حفظ كمسودة
            </button>
            <button onClick={() => save("published")} disabled={saving} className="btn-primary" style={{ padding: "12px 24px" }}>
              <span>{saving ? "جاري النشر..." : "نشر المقال"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div style={{ background: "#FFFFFF", border: "1px solid #E8E6E1", padding: "28px" }}>
              <div className="space-y-5">
                <div>
                  <label style={labelStyle}>العنوان (عربي)</label>
                  <input
                    type="text"
                    placeholder="أدخل عنوان المقال بالعربية"
                    value={form.titleAr}
                    onChange={(e) => setForm((p) => ({ ...p, titleAr: e.target.value }))}
                    className="form-input"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Title (English)</label>
                  <input
                    type="text"
                    placeholder="Enter article title in English"
                    value={form.titleEn}
                    onChange={(e) => setForm((p) => ({ ...p, titleEn: e.target.value }))}
                    className="form-input"
                    style={{ ...inputStyle, fontFamily: "sans-serif" }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>مقتطف (عربي)</label>
                  <textarea
                    placeholder="وصف مختصر للمقال..."
                    value={form.excerptAr}
                    onChange={(e) => setForm((p) => ({ ...p, excerptAr: e.target.value }))}
                    rows={3}
                    className="form-input"
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>المحتوى (عربي) — HTML مسموح</label>
                  <textarea
                    placeholder="<p>محتوى المقال هنا...</p>"
                    value={form.contentAr}
                    onChange={(e) => setForm((p) => ({ ...p, contentAr: e.target.value }))}
                    rows={15}
                    className="form-input"
                    style={{ ...inputStyle, resize: "vertical", fontFamily: "'Zain', sans-serif" }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Content (English) — HTML allowed</label>
                  <textarea
                    placeholder="<p>Article content here...</p>"
                    value={form.contentEn}
                    onChange={(e) => setForm((p) => ({ ...p, contentEn: e.target.value }))}
                    rows={10}
                    className="form-input"
                    style={{ ...inputStyle, resize: "vertical", fontFamily: "sans-serif" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <div style={{ background: "#FFFFFF", border: "1px solid #E8E6E1", padding: "24px" }}>
              <h3 style={{ fontFamily: "'Zain', sans-serif", fontSize: "16px", fontWeight: 700, color: "#0A0A0A", marginBottom: "20px" }}>
                إعدادات المقال
              </h3>
              <div className="space-y-4">
                <div>
                  <label style={labelStyle}>التصنيف</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    className="form-input"
                    style={inputStyle}
                  >
                    {["سلة", "تسويق", "SEO", "تصميم", "أعمال", "أدوات"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>صورة المقال (URL)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={form.image}
                    onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                    className="form-input"
                    style={{ ...inputStyle, fontFamily: "Space Mono, monospace", fontSize: "12px" }}
                  />
                  {form.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={form.image} alt="Preview" style={{ width: "100%", height: "120px", objectFit: "cover", marginTop: "8px" }} />
                  )}
                </div>
              </div>
            </div>

            {/* SEO */}
            <div style={{ background: "#FFFFFF", border: "1px solid #E8E6E1", padding: "24px" }}>
              <h3 style={{ fontFamily: "'Zain', sans-serif", fontSize: "16px", fontWeight: 700, color: "#0A0A0A", marginBottom: "20px" }}>
                SEO
              </h3>
              <div className="space-y-4">
                <div>
                  <label style={labelStyle}>عنوان SEO</label>
                  <input
                    type="text"
                    placeholder="عنوان لمحركات البحث..."
                    value={form.metaTitle}
                    onChange={(e) => setForm((p) => ({ ...p, metaTitle: e.target.value }))}
                    className="form-input"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>وصف SEO</label>
                  <textarea
                    placeholder="وصف لمحركات البحث (150-160 حرف)..."
                    value={form.metaDescription}
                    onChange={(e) => setForm((p) => ({ ...p, metaDescription: e.target.value }))}
                    rows={3}
                    className="form-input"
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                  <div style={{ fontSize: "11px", color: form.metaDescription.length > 160 ? "#C94040" : "#8C8C7A", marginTop: "4px", fontFamily: "Space Mono" }}>
                    {form.metaDescription.length}/160
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
