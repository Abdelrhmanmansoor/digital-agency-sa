import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { articlesDB, projectsDB, messagesDB } from "@/lib/db";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/admin");

  const [articles, projects, messages] = await Promise.all([
    articlesDB.getAll(),
    projectsDB.getAll(),
    messagesDB.getAll(),
  ]);
  const newMessages = messages.filter((m) => m.status === "new").length;

  const stats = [
    { icon: "📄", label: "المقالات", value: articles.length, color: "#F0B100", href: "/admin/articles" },
    { icon: "💼", label: "الأعمال", value: projects.length, color: "#4A8C6F", href: "/admin/portfolio" },
    { icon: "📨", label: "رسائل جديدة", value: newMessages, color: "#C94040", href: "/admin/messages" },
    { icon: "🌐", label: "زوار اليوم", value: "—", color: "#8C8C7A", href: "#" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

      <main className="admin-main" style={{ padding: "40px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1
            style={{
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              fontSize: "28px",
              fontWeight: 700,
              color: "#0A0A0A",
              marginBottom: "8px",
            }}
          >
            لوحة التحكم
          </h1>
          <p style={{ color: "#8C8C7A", fontSize: "14px", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>
            مرحباً بك! إليك ملخص النشاط
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href} style={{ textDecoration: "none" }}>
              <div
                className="dash-stat-card"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E8E6E1",
                  padding: "28px 24px",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{stat.icon}</div>
                <div
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "32px",
                    fontWeight: 700,
                    color: stat.color,
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                    fontSize: "13px",
                    color: "#8C8C7A",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Articles */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E8E6E1", padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "18px", fontWeight: 700, color: "#0A0A0A" }}>
                أحدث المقالات
              </h2>
              <Link
                href="/admin/articles/new"
                className="btn-primary"
                style={{ padding: "8px 20px", fontSize: "12px", textDecoration: "none", display: "inline-flex" }}
              >
                <span>+ جديد</span>
              </Link>
            </div>

            <div className="space-y-3">
              {articles.slice(0, 5).map((article) => (
                <div
                  key={article.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 0",
                    borderBottom: "1px solid #F0EDE8",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "14px", fontWeight: 600, color: "#0A0A0A", marginBottom: "2px" }}>
                      {article.titleAr}
                    </div>
                    <div style={{ fontSize: "11px", color: "#8C8C7A", fontFamily: "Space Mono" }}>
                      {new Date(article.createdAt).toLocaleDateString("ar-SA")}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: "3px 10px",
                      fontSize: "10px",
                      fontFamily: "Space Mono",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      background: article.status === "published" ? "rgba(74,140,111,0.1)" : "rgba(240,177,0,0.1)",
                      color: article.status === "published" ? "#4A8C6F" : "#F0B100",
                      border: `1px solid ${article.status === "published" ? "rgba(74,140,111,0.2)" : "rgba(240,177,0,0.2)"}`,
                    }}
                  >
                    {article.status === "published" ? "منشور" : "مسودة"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E8E6E1", padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "18px", fontWeight: 700, color: "#0A0A0A" }}>
                آخر الرسائل
              </h2>
              <Link href="/admin/messages" style={{ fontFamily: "Space Mono", fontSize: "11px", color: "#F0B100", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                عرض الكل ←
              </Link>
            </div>

            <div className="space-y-3">
              {messages.slice(0, 5).map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 0",
                    borderBottom: "1px solid #F0EDE8",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      background: msg.status === "new" ? "rgba(240,177,0,0.15)" : "rgba(200,200,200,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    {msg.status === "new" ? "🔔" : "📬"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "14px", fontWeight: msg.status === "new" ? 700 : 400, color: "#0A0A0A", marginBottom: "2px" }}>
                      {msg.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#8C8C7A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "180px" }}>
                      {msg.message}
                    </div>
                  </div>
                  <div style={{ fontSize: "11px", color: "#8C8C7A", fontFamily: "Space Mono", whiteSpace: "nowrap" }}>
                    {new Date(msg.createdAt).toLocaleDateString("ar-SA")}
                  </div>
                </div>
              ))}

              {messages.length === 0 && (
                <div style={{ textAlign: "center", padding: "32px 0", color: "#8C8C7A", fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "14px" }}>
                  لا توجد رسائل بعد
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: "24px", background: "#FFFFFF", border: "1px solid #E8E6E1", padding: "28px" }}>
          <h2 style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "18px", fontWeight: 700, color: "#0A0A0A", marginBottom: "20px" }}>
            إجراءات سريعة
          </h2>
          <div className="flex flex-wrap gap-4">
            {[
              { href: "/admin/articles/new", label: "مقال جديد", icon: "✍️" },
              { href: "/admin/portfolio/new", label: "مشروع جديد", icon: "🎨" },
              { href: "/ar", label: "معاينة الموقع", icon: "👁", external: true },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                target={action.external ? "_blank" : "_self"}
                style={{ textDecoration: "none" }}
              >
                <div className="dash-action">
                  <span style={{ fontSize: "18px" }}>{action.icon}</span>
                  {action.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <style>{`
        .dash-stat-card:hover {
          border-color: #F0B100 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }
        .dash-action {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: 1px solid #E8E6E1;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-family: 'ThmanyahSans', 'Zain', sans-serif;
          color: #0A0A0A;
        }
        .dash-action:hover {
          border-color: #F0B100 !important;
          color: #F0B100 !important;
        }
      `}</style>
    </div>
  );
}
