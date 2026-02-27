"use client";

import { useState } from "react";
import type { ServiceOrder, OrderStatus } from "@/lib/client-db";

const STATUS_LABELS: Record<OrderStatus, { ar: string; en: string; color: string; bg: string }> = {
  pending:     { ar: "قيد الانتظار", en: "Pending",     color: "#C8A962", bg: "rgba(200,169,98,0.12)" },
  in_progress: { ar: "جاري التنفيذ", en: "In Progress", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  review:      { ar: "مراجعة",       en: "Review",      color: "#A855F7", bg: "rgba(168,85,247,0.12)" },
  delivered:   { ar: "تم التسليم",   en: "Delivered",   color: "#BDEE63", bg: "rgba(189,238,99,0.12)" },
  completed:   { ar: "مكتمل",        en: "Completed",   color: "#22C55E", bg: "rgba(34,197,94,0.12)" },
  cancelled:   { ar: "ملغى",         en: "Cancelled",   color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
};

const FILTER_TABS: Array<{ key: OrderStatus | "all"; ar: string; en: string }> = [
  { key: "all",        ar: "الكل",         en: "All" },
  { key: "pending",    ar: "قيد الانتظار", en: "Pending" },
  { key: "in_progress",ar: "جاري التنفيذ", en: "In Progress" },
  { key: "review",     ar: "مراجعة",       en: "Review" },
  { key: "delivered",  ar: "تم التسليم",   en: "Delivered" },
  { key: "completed",  ar: "مكتمل",        en: "Completed" },
];

interface Props {
  orders: ServiceOrder[];
  locale: string;
}

export default function OrdersListClient({ orders, locale }: Props) {
  const isRTL = locale === "ar";
  const basePath = `/${locale}/dashboard`;
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div style={{ padding: "40px", direction: isRTL ? "rtl" : "ltr", maxWidth: "900px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontFamily: "'Zain', sans-serif", fontSize: "28px", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>
            {isRTL ? "طلباتي" : "My Orders"}
          </h1>
          <p style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)", marginTop: "6px" }}>
            {orders.length} {isRTL ? "طلب إجمالي" : "total orders"}
          </p>
        </div>
        <a
          href={`${basePath}/orders/new`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "11px 20px",
            background: "#C8A962",
            color: "#0A0A0A",
            borderRadius: "10px",
            textDecoration: "none",
            fontFamily: "'Zain', sans-serif",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          {isRTL ? "طلب جديد" : "New Order"}
        </a>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {FILTER_TABS.map((t) => {
          const count = t.key === "all" ? orders.length : orders.filter((o) => o.status === t.key).length;
          const active = filter === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: "1px solid",
                cursor: "pointer",
                fontSize: "12px",
                fontFamily: "Space Mono, monospace",
                transition: "all 0.2s",
                background: active ? "#C8A962" : "transparent",
                color: active ? "#0A0A0A" : "rgba(255,255,255,0.45)",
                borderColor: active ? "#C8A962" : "rgba(255,255,255,0.12)",
              }}
            >
              {isRTL ? t.ar : t.en} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.3)" }}>
            {isRTL ? "لا توجد طلبات في هذه الفئة" : "No orders in this category"}
          </div>
        </div>
      ) : (
        filtered.map((o) => {
          const sl = STATUS_LABELS[o.status];
          return (
            <a
              key={o.id}
              href={`${basePath}/orders/${o.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "20px 24px",
                marginBottom: "10px",
                textDecoration: "none",
                transition: "all 0.2s",
                gap: "16px",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,169,98,0.2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "16px", fontWeight: 700, color: "#FAFAF7", marginBottom: "5px" }}>{o.title}</div>
                <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                  {isRTL ? o.serviceNameAr : o.serviceNameEn} · {new Date(o.createdAt).toLocaleDateString(isRTL ? "ar-SA" : "en-US")}
                </div>
                {o.deliveredFiles?.length > 0 && (
                  <div style={{ marginTop: "8px", fontFamily: "Space Mono, monospace", fontSize: "10px", color: "#BDEE63" }}>
                    {o.deliveredFiles.length} {isRTL ? "ملف مسلّم" : "files delivered"}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "20px", fontSize: "11px", fontFamily: "Space Mono, monospace", color: sl.color, background: sl.bg }}>
                  {isRTL ? sl.ar : sl.en}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round">
                  <path d={isRTL ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
                </svg>
              </div>
            </a>
          );
        })
      )}
    </div>
  );
}
