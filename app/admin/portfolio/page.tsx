import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { projectsDB } from "@/lib/db";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";

export default async function AdminPortfolioPage() {
  const session = await getSession();
  if (!session) redirect("/admin");

  const projects = await projectsDB.getAll();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0A" }}>
      <AdminSidebar active="portfolio" />

      <main style={{ flex: 1, padding: "40px", marginRight: "260px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <div>
            <h1
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#FAFAF7",
                marginBottom: "4px",
              }}
            >
              إدارة المشاريع
            </h1>
            <p style={{ color: "#8C8C7A", fontFamily: "Space Mono", fontSize: "12px" }}>
              {projects.length} PROJECT{projects.length !== 1 ? "S" : ""}
            </p>
          </div>
          <Link
            href="/admin/portfolio/new"
            className="btn-primary"
            style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}
          >
            <span>+</span>
            <span>مشروع جديد</span>
          </Link>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "#8C8C7A",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📂</div>
            <p style={{ fontFamily: "'Zain', sans-serif", fontSize: "16px" }}>لا توجد مشاريع بعد</p>
            <Link
              href="/admin/portfolio/new"
              style={{
                display: "inline-block",
                marginTop: "16px",
                color: "#C8A962",
                fontFamily: "Space Mono",
                fontSize: "13px",
                textDecoration: "none",
              }}
            >
              أضف مشروعك الأول →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                style={{
                  background: "#141414",
                  border: "1px solid rgba(200,169,98,0.1)",
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(200,169,98,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(200,169,98,0.1)")}
              >
                {/* Image */}
                <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.nameAr}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {project.featured && (
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "#C8A962",
                        color: "#0A0A0A",
                        padding: "4px 10px",
                        fontSize: "10px",
                        fontFamily: "Space Mono",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: "20px" }}>
                  <div
                    style={{
                      fontFamily: "Space Mono",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#C8A962",
                      marginBottom: "6px",
                    }}
                  >
                    {project.category}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Zain', sans-serif",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#FAFAF7",
                      marginBottom: "8px",
                    }}
                  >
                    {project.nameAr}
                  </h3>
                  <p style={{ color: "#8C8C7A", fontSize: "13px", lineHeight: 1.6, marginBottom: "16px" }}>
                    {project.descriptionAr}
                  </p>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Link
                      href={`/admin/portfolio/${project.id}/edit`}
                      style={{
                        flex: 1,
                        textAlign: "center",
                        padding: "8px",
                        background: "transparent",
                        border: "1px solid rgba(200,169,98,0.3)",
                        color: "#C8A962",
                        fontSize: "12px",
                        fontFamily: "Space Mono",
                        textDecoration: "none",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        transition: "all 0.2s",
                      }}
                    >
                      تعديل
                    </Link>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          flex: 1,
                          textAlign: "center",
                          padding: "8px",
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#8C8C7A",
                          fontSize: "12px",
                          fontFamily: "Space Mono",
                          textDecoration: "none",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        زيارة ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
