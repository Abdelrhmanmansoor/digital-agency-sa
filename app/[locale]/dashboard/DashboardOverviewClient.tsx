"use client";

import type { ServiceOrder, OrderStatus } from "@/lib/client-db";

const STATUS_LABELS: Record<OrderStatus, { ar: string; en: string; color: string; bg: string }> = {
  pending:     { ar: "قيد الانتظار", en: "Pending",     color: "#C8A962", bg: "rgba(200,169,98,0.12)" },
  in_progress: { ar: "جاري التنفيذ", en: "In Progress", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  review:      { ar: "مراجعة",       en: "Review",      color: "#A855F7", bg: "rgba(168,85,247,0.12)" },
  delivered:   { ar: "تم التسليم",   en: "Delivered",   color: "#BDEE63", bg: "rgba(189,238,99,0.12)" },
  completed:   { ar: "مكتمل",        en: "Completed",   color: "#22C55E", bg: "rgba(34,197,94,0.12)" },
  cancelled:   { ar: "ملغى",         en: "Cancelled",   color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
};

interface Props {
  userName: string;
  stats: { total: number; inProgress: number; delivered: number; files: number };
  recentOrders: ServiceOrder[];
  locale: string;
}

export default function DashboardOverviewClient({ userName, stats, recentOrders, locale }: Props) {
  const isRTL = locale === "ar";
  const basePath = `/${locale}/dashboard`;

  const statCards = [
    { num: stats.total,      labelAr: "إجمالي الطلبات",    labelEn: "Total Orders",    icon: "📋", color: "#C8A962" },
    { num: stats.inProgress, labelAr: "قيد التنفيذ",        labelEn: "In Progress",     icon: "⚡", color: "#3B82F6" },
    { num: stats.delivered,  labelAr: "مكتملة ومسلّمة",    labelEn: "Delivered",       icon: "✅", color: "#22C55E" },
    { num: stats.files,      labelAr: "ملفات مستلمة",       labelEn: "Files Received",  icon: "📁", color: "#BDEE63" },
  ];

  return (
    <div style={{ padding: "40px", direction: isRTL ? "rtl" : "ltr", maxWidth: "1100px" }}>
      {/* Welcome */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
          {isRTL ? "مرحباً بك" : "Welcome back"}
        </div>
        <h1 style={{ fontFamily: "'Zain', sans-serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>
          {isRTL ? `مرحباً، ${userName}` : `Hello, ${userName}`}
        </h1>
        <p style={{ fontFamily: "'Zain', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.4)", marginTop: "8px" }}>
          {isRTL ? "هنا يمكنك متابعة طلباتك واستلام ملفاتك" : "Track your orders and receive your delivered files"}
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "40px" }}>
        {statCards.map((s) => (
          <div
            key={s.labelEn}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "14px",
              padding: "24px 20px",
            }}
          >
            <div style={{ fontSize: "22px", marginBottom: "12px" }}>{s.icon}</div>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "28px", fontWeight: 700, color: s.color, lineHeight: 1 }}>
              {s.num}
            </div>
            <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "6px" }}>
              {isRTL ? s.labelAr : s.labelEn}
            </div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "28px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontFamily: "'Zain', sans-serif", fontSize: "18px", fontWeight: 700, color: "#FAFAF7", margin: 0 }}>
            {isRTL ? "آخر الطلبات" : "Recent Orders"}
          </h2>
          <a href={`${basePath}/orders`} style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "#C8A962", textDecoration: "none", letterSpacing: "0.1em" }}>
            {isRTL ? "عرض الكل ←" : "View all →"}
          </a>
        </div>

        {recentOrders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>📭</div>
            <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.3)" }}>
              {isRTL ? "لا توجد طلبات بعد" : "No orders yet"}
            </div>
            <a
              href={`${basePath}/orders/new`}
              style={{
                display: "inline-block",
                marginTop: "16px",
                padding: "10px 24px",
                background: "#C8A962",
                color: "#0A0A0A",
                borderRadius: "8px",
                textDecoration: "none",
                fontFamily: "'Zain', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              {isRTL ? "اطلب خدمة الآن" : "Place your first order"}
            </a>
          </div>
        ) : (
          <div>
            {recentOrders.map((o) => {
              const sl = STATUS_LABELS[o.status];
              return (
                <a
                  key={o.id}
                  href={`${basePath}/orders/${o.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    marginBottom: "6px",
                    transition: "background 0.2s",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "15px", fontWeight: 700, color: "#FAFAF7", marginBottom: "3px" }}>{o.title}</div>
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
                      {isRTL ? o.serviceNameAr : o.serviceNameEn} · {new Date(o.createdAt).toLocaleDateString(isRTL ? "ar-SA" : "en-US")}
                    </div>
                  </div>
                  <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontFamily: "Space Mono, monospace", color: sl.color, background: sl.bg, flexShrink: 0 }}>
                    {isRTL ? sl.ar : sl.en}
                  </span>
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "24px" }}>
        <a
          href={`${basePath}/orders/new`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "20px 24px",
            background: "rgba(200,169,98,0.06)",
            border: "1px solid rgba(200,169,98,0.15)",
            borderRadius: "12px",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
        >
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(200,169,98,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C8A962", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </div>
          <div>
            <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "15px", fontWeight: 700, color: "#C8A962" }}>{isRTL ? "طلب خدمة جديدة" : "New Service Order"}</div>
            <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>{isRTL ? "8 خدمات متاحة" : "8 services available"}</div>
          </div>
        </a>
        <a
          href={`${basePath}/files`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "20px 24px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "12px",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
        >
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(189,238,99,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#BDEE63", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
          </div>
          <div>
            <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "15px", fontWeight: 700, color: "#BDEE63" }}>{isRTL ? "ملفاتي المستلمة" : "My Delivered Files"}</div>
            <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>
              {stats.files > 0 ? (isRTL ? `${stats.files} ملف جاهز للتحميل` : `${stats.files} files ready`) : (isRTL ? "لا توجد ملفات بعد" : "No files yet")}
            </div>
          </div>
        </a>
      </div>

      <style>{`
        @media (max-width: 900px) {
          main { margin-inline-start: 0 !important; padding-top: 60px; }
        }
        @media (max-width: 700px) {
          .stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
