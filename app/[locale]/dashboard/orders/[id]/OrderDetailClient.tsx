"use client";

import type { ServiceOrder, OrderStatus } from "@/lib/client-db";

const STATUS_FLOW: OrderStatus[] = ["pending", "in_progress", "review", "delivered", "completed"];

const STATUS_META: Record<OrderStatus, { ar: string; en: string; color: string; bg: string; icon: string }> = {
  pending:     { ar: "قيد الانتظار", en: "Pending",     color: "#C8A962", bg: "rgba(200,169,98,0.12)", icon: "⏳" },
  in_progress: { ar: "جاري التنفيذ", en: "In Progress", color: "#3B82F6", bg: "rgba(59,130,246,0.12)",  icon: "⚡" },
  review:      { ar: "مراجعة",       en: "Review",      color: "#A855F7", bg: "rgba(168,85,247,0.12)",  icon: "👁" },
  delivered:   { ar: "تم التسليم",   en: "Delivered",   color: "#BDEE63", bg: "rgba(189,238,99,0.12)",  icon: "📦" },
  completed:   { ar: "مكتمل",        en: "Completed",   color: "#22C55E", bg: "rgba(34,197,94,0.12)",   icon: "✅" },
  cancelled:   { ar: "ملغى",         en: "Cancelled",   color: "#EF4444", bg: "rgba(239,68,68,0.12)",   icon: "❌" },
};

const FILE_ICONS: Record<string, string> = {
  design: "🎨",
  document: "📄",
  video: "🎬",
  archive: "📦",
  other: "📎",
};

interface Props {
  order: ServiceOrder;
  locale: string;
}

export default function OrderDetailClient({ order, locale }: Props) {
  const isRTL = locale === "ar";
  const basePath = `/${locale}/dashboard`;
  const sm = STATUS_META[order.status];

  const activeStepIndex = STATUS_FLOW.indexOf(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <div style={{ padding: "40px", direction: isRTL ? "rtl" : "ltr", maxWidth: "860px" }}>
      {/* Back */}
      <a href={`${basePath}/orders`} style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "#C8A962", textDecoration: "none", letterSpacing: "0.1em", display: "inline-block", marginBottom: "24px" }}>
        {isRTL ? "← طلباتي" : "← My Orders"}
      </a>

      {/* Title + status */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontFamily: "'Zain', sans-serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "#FAFAF7", margin: 0, marginBottom: "8px" }}>
            {order.title}
          </h1>
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
            {isRTL ? order.serviceNameAr : order.serviceNameEn} · {new Date(order.createdAt).toLocaleDateString(isRTL ? "ar-SA" : "en-US")}
          </div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)", marginTop: "4px" }}>
            {order.id}
          </div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 18px", borderRadius: "24px", fontSize: "13px", fontFamily: "'Zain', sans-serif", fontWeight: 700, color: sm.color, background: sm.bg }}>
          {sm.icon} {isRTL ? sm.ar : sm.en}
        </span>
      </div>

      {/* Status timeline */}
      {!isCancelled && (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "28px 32px", marginBottom: "28px" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
            {isRTL ? "مسار الطلب" : "Order Timeline"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0", position: "relative" }}>
            {STATUS_FLOW.map((s, i) => {
              const isCompleted = activeStepIndex > i;
              const isActive = activeStepIndex === i;
              const meta = STATUS_META[s];
              return (
                <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                  {/* Connector line */}
                  {i < STATUS_FLOW.length - 1 && (
                    <div style={{
                      position: "absolute",
                      top: "15px",
                      [isRTL ? "right" : "left"]: "50%",
                      width: "100%",
                      height: "2px",
                      background: isCompleted ? meta.color : "rgba(255,255,255,0.08)",
                      transition: "background 0.3s",
                      zIndex: 0,
                    }} />
                  )}
                  {/* Circle */}
                  <div style={{
                    width: "30px", height: "30px", borderRadius: "50%",
                    background: isActive ? meta.bg : isCompleted ? meta.color : "rgba(255,255,255,0.06)",
                    border: `2px solid ${isActive ? meta.color : isCompleted ? meta.color : "rgba(255,255,255,0.1)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: isCompleted ? "#0A0A0A" : isActive ? meta.color : "rgba(255,255,255,0.2)",
                    fontSize: "12px", zIndex: 1, position: "relative",
                    transition: "all 0.3s",
                  }}>
                    {isCompleted ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                    ) : (
                      <span style={{ fontSize: "8px" }}>{i + 1}</span>
                    )}
                  </div>
                  {/* Label */}
                  <div style={{ marginTop: "8px", fontFamily: "'Zain', sans-serif", fontSize: "11px", color: isActive ? meta.color : isCompleted ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)", textAlign: "center", maxWidth: "70px" }}>
                    {isRTL ? meta.ar : meta.en}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Order details */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "24px" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
            {isRTL ? "تفاصيل الطلب" : "Order Details"}
          </div>
          <Section label={isRTL ? "الوصف" : "Description"} value={order.description} />
          <Section label={isRTL ? "المتطلبات" : "Requirements"} value={order.requirements} />
          {order.referenceLinks && <Section label={isRTL ? "روابط مرجعية" : "Reference links"} value={order.referenceLinks} />}
          {order.budget && <Section label={isRTL ? "الميزانية" : "Budget"} value={order.budget} />}
        </div>

        {/* Admin notes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {order.adminNotes && (
            <div style={{ background: "rgba(200,169,98,0.05)", border: "1px solid rgba(200,169,98,0.15)", borderRadius: "14px", padding: "24px" }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "#C8A962", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
                {isRTL ? "ملاحظة من الفريق" : "Note from team"}
              </div>
              <p style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>
                {order.adminNotes}
              </p>
            </div>
          )}

          {/* Status history */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "24px" }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
                {isRTL ? "سجل الحالات" : "Status history"}
              </div>
              {[...order.statusHistory].reverse().map((h, i) => {
                const m = STATUS_META[h.status];
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: m.color, flexShrink: 0 }} />
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: m.color }}>{isRTL ? m.ar : m.en}</div>
                    <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.25)" }}>
                      {new Date(h.changedAt).toLocaleDateString(isRTL ? "ar-SA" : "en-US")}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Delivered files */}
      {order.deliveredFiles && order.deliveredFiles.length > 0 && (
        <div style={{ marginTop: "24px", background: "rgba(189,238,99,0.03)", border: "1px solid rgba(189,238,99,0.12)", borderRadius: "16px", padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "#BDEE63", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {isRTL ? "الملفات المسلّمة" : "Delivered Files"}
            </div>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", background: "rgba(189,238,99,0.12)", color: "#BDEE63", padding: "2px 8px", borderRadius: "10px" }}>
              {order.deliveredFiles.length}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
            {order.deliveredFiles.map((f) => (
              <a
                key={f.id}
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(189,238,99,0.1)",
                  borderRadius: "10px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(189,238,99,0.06)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
              >
                <span style={{ fontSize: "20px", flexShrink: 0 }}>{FILE_ICONS[f.type] || "📎"}</span>
                <div style={{ overflow: "hidden" }}>
                  <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", fontWeight: 700, color: "#BDEE63", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {f.name}
                  </div>
                  {f.description && (
                    <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {f.description}
                    </div>
                  )}
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)", marginTop: "2px" }}>
                    {new Date(f.addedAt).toLocaleDateString(isRTL ? "ar-SA" : "en-US")}
                  </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(189,238,99,0.5)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginInlineStart: "auto" }}>
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "5px" }}>
        {label}
      </div>
      <p style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>
        {value}
      </p>
    </div>
  );
}
