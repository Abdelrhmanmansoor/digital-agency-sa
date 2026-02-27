import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { articlesDB } from "@/lib/db";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

export default async function ArticlesPage() {
  const session = await getSession();
  if (!session) redirect("/admin");

  const articles = await articlesDB.getAll();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <main className="admin-main" style={{ padding: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontFamily: "Noto Kufi Arabic", fontSize: "28px", fontWeight: 700, color: "#0A0A0A", marginBottom: "4px" }}>
              المقالات
            </h1>
            <p style={{ color: "#8C8C7A", fontSize: "14px" }}>{articles.length} مقال</p>
          </div>
          <Link href="/admin/articles/new" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", padding: "12px 24px" }}>
            <span>+ مقال جديد</span>
          </Link>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #E8E6E1" }}>
          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto auto",
              gap: "16px",
              padding: "16px 24px",
              background: "#0A0A0A",
              color: "#8C8C7A",
              fontSize: "11px",
              fontFamily: "Space Mono, monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span>العنوان</span>
            <span>التصنيف</span>
            <span>الحالة</span>
            <span>إجراءات</span>
          </div>

          {/* Articles */}
          {articles.map((article) => (
            <div
              key={article.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto auto",
                gap: "16px",
                padding: "20px 24px",
                alignItems: "center",
                borderBottom: "1px solid #F0EDE8",
              }}
            >
              <div>
                <div style={{ fontFamily: "Noto Sans Arabic", fontSize: "15px", fontWeight: 600, color: "#0A0A0A", marginBottom: "4px" }}>
                  {article.titleAr}
                </div>
                <div style={{ fontSize: "12px", color: "#8C8C7A" }}>
                  {new Date(article.createdAt).toLocaleDateString("ar-SA")}
                </div>
              </div>

              <span
                style={{
                  padding: "4px 12px",
                  background: "rgba(200,169,98,0.1)",
                  border: "1px solid rgba(200,169,98,0.2)",
                  color: "#C8A962",
                  fontSize: "11px",
                  fontFamily: "Noto Sans Arabic",
                  whiteSpace: "nowrap",
                }}
              >
                {article.category}
              </span>

              <span
                style={{
                  padding: "4px 12px",
                  background: article.status === "published" ? "rgba(74,140,111,0.1)" : "rgba(200,200,200,0.1)",
                  border: `1px solid ${article.status === "published" ? "rgba(74,140,111,0.2)" : "rgba(200,200,200,0.2)"}`,
                  color: article.status === "published" ? "#4A8C6F" : "#8C8C7A",
                  fontSize: "11px",
                  fontFamily: "Space Mono",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {article.status === "published" ? "منشور" : "مسودة"}
              </span>

              <div style={{ display: "flex", gap: "8px" }}>
                <Link
                  href={`/admin/articles/${article.id}/edit`}
                  style={{
                    padding: "6px 16px",
                    border: "1px solid #E8E6E1",
                    fontSize: "12px",
                    color: "#0A0A0A",
                    textDecoration: "none",
                    fontFamily: "Space Mono",
                    letterSpacing: "0.05em",
                    transition: "all 0.2s",
                    display: "inline-block",
                  }}
                >
                  تعديل
                </Link>
              </div>
            </div>
          ))}

          {articles.length === 0 && (
            <div style={{ padding: "60px", textAlign: "center", color: "#8C8C7A", fontFamily: "Noto Sans Arabic", fontSize: "15px" }}>
              لا توجد مقالات بعد. اضغط "+ مقال جديد" للبدء.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
