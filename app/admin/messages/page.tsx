import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { messagesDB } from "@/lib/db";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function MessagesPage() {
  const session = await getSession();
  if (!session) redirect("/admin");

  const messages = await messagesDB.getAll();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <main className="admin-main" style={{ padding: "40px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontFamily: "Noto Kufi Arabic", fontSize: "28px", fontWeight: 700, color: "#0A0A0A", marginBottom: "4px" }}>
            الرسائل
          </h1>
          <p style={{ color: "#8C8C7A", fontSize: "14px" }}>
            {messages.filter((m) => m.status === "new").length} رسالة جديدة من أصل {messages.length}
          </p>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #E8E6E1" }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                padding: "24px",
                borderBottom: "1px solid #F0EDE8",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "20px",
                alignItems: "start",
                background: msg.status === "new" ? "rgba(200,169,98,0.03)" : "transparent",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  background: msg.status === "new" ? "rgba(200,169,98,0.15)" : "#F0EDE8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
              >
                {msg.status === "new" ? "🔔" : "📬"}
              </div>

              <div>
                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontFamily: "Noto Kufi Arabic", fontSize: "16px", fontWeight: msg.status === "new" ? 700 : 500, color: "#0A0A0A" }}>
                    {msg.name}
                  </span>
                  {msg.status === "new" && (
                    <span style={{ padding: "2px 8px", background: "#C8A962", color: "#0A0A0A", fontSize: "10px", fontFamily: "Space Mono", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      جديد
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "13px", color: "#8C8C7A", fontFamily: "Space Mono", marginBottom: "8px" }}>
                  {msg.email} {msg.phone && `| ${msg.phone}`}
                </div>
                <div style={{ fontSize: "14px", color: "#2D2D2D", fontFamily: "Noto Sans Arabic", lineHeight: 1.7 }}>
                  {msg.message}
                </div>
              </div>

              <div style={{ textAlign: "left", whiteSpace: "nowrap" }}>
                <div style={{ fontSize: "11px", color: "#8C8C7A", fontFamily: "Space Mono", marginBottom: "8px" }}>
                  {new Date(msg.createdAt).toLocaleDateString("ar-SA")}
                </div>
                <a
                  href={`https://wa.me/${msg.phone?.replace(/[^0-9]/g, "") || ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    padding: "6px 14px",
                    background: "rgba(200,169,98,0.1)",
                    border: "1px solid rgba(200,169,98,0.2)",
                    color: "#C8A962",
                    fontSize: "11px",
                    fontFamily: "Space Mono",
                    textDecoration: "none",
                    textAlign: "center",
                    marginBottom: "6px",
                  }}
                >
                  واتساب
                </a>
                <a
                  href={`mailto:${msg.email}`}
                  style={{
                    display: "block",
                    padding: "6px 14px",
                    border: "1px solid #E8E6E1",
                    color: "#8C8C7A",
                    fontSize: "11px",
                    fontFamily: "Space Mono",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  إيميل
                </a>
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div style={{ padding: "80px", textAlign: "center", color: "#8C8C7A", fontFamily: "Noto Sans Arabic", fontSize: "16px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
              لا توجد رسائل بعد
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
