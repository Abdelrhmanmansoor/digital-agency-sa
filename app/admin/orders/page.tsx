"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { ServiceOrder, OrderStatus } from "@/lib/client-db";

const STATUS_LABELS: Record<OrderStatus, { ar: string; color: string; bg: string }> = {
  pending:     { ar: "قيد الانتظار", color: "#C8A962", bg: "rgba(200,169,98,0.12)" },
  in_progress: { ar: "جاري التنفيذ", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  review:      { ar: "مراجعة",       color: "#A855F7", bg: "rgba(168,85,247,0.12)" },
  delivered:   { ar: "تم التسليم",   color: "#BDEE63", bg: "rgba(189,238,99,0.12)" },
  completed:   { ar: "مكتمل",        color: "#22C55E", bg: "rgba(34,197,94,0.12)" },
  cancelled:   { ar: "ملغى",         color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
};

const ALL_STATUSES: OrderStatus[] = ["pending","in_progress","review","delivered","completed","cancelled"];

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [selected, setSelected] = useState<ServiceOrder | null>(null);
  const [saving, setSaving] = useState(false);
  const [editStatus, setEditStatus] = useState<OrderStatus>("pending");
  const [editNotes, setEditNotes] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [newFileType, setNewFileType] = useState("design");

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch("/api/admin/orders");
    if (r.status === 401) { router.push("/admin"); return; }
    const data = await r.json();
    setOrders(data.orders || []);
    setLoading(false);
  }, [router]);

  useEffect(() => { load(); }, [load]);

  const openOrder = (o: ServiceOrder) => {
    setSelected(o);
    setEditStatus(o.status);
    setEditNotes(o.adminNotes || "");
    setNewFileName("");
    setNewFileUrl("");
    setNewFileType("design");
  };

  const save = async () => {
    if (!selected) return;
    setSaving(true);
    const body: Record<string, unknown> = {
      status: editStatus,
      adminNotes: editNotes,
    };
    if (newFileName && newFileUrl) {
      body.newFile = { name: newFileName, url: newFileUrl, type: newFileType };
    }
    await fetch(`/api/admin/orders/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    setSelected(null);
    load();
  };

  const filtered = filterStatus === "all" ? orders : orders.filter(o => o.status === filterStatus);

  const S = {
    page: { background: "#0A0A0A", minHeight: "100vh", color: "#FAFAF7", fontFamily: "'Zain', sans-serif", padding: "40px" } as React.CSSProperties,
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap" as const, gap: "16px" },
    title: { fontFamily: "Space Mono, monospace", fontSize: "20px", color: "#C8A962", letterSpacing: "0.1em" },
    backBtn: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", color: "#FAFAF7", padding: "8px 16px", cursor: "pointer", fontSize: "14px", fontFamily: "'Zain', sans-serif" },
    filters: { display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" as const },
    filterBtn: (active: boolean) => ({ padding: "6px 14px", borderRadius: "20px", border: "1px solid", cursor: "pointer", fontSize: "13px", fontFamily: "Space Mono, monospace", transition: "all 0.2s", background: active ? "#C8A962" : "transparent", color: active ? "#0A0A0A" : "rgba(255,255,255,0.5)", borderColor: active ? "#C8A962" : "rgba(255,255,255,0.15)" }),
    card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "20px 24px", marginBottom: "12px", cursor: "pointer", transition: "all 0.2s", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "16px" },
    badge: (s: OrderStatus) => ({ display: "inline-block", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontFamily: "Space Mono, monospace", color: STATUS_LABELS[s].color, background: STATUS_LABELS[s].bg }),
    overlay: { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
    modal: { background: "#111318", border: "1px solid rgba(200,169,98,0.2)", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "640px", maxHeight: "90vh", overflowY: "auto" as const },
    label: { display: "block", fontSize: "11px", fontFamily: "Space Mono, monospace", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "8px" },
    input: { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "10px 14px", color: "#FAFAF7", fontSize: "14px", fontFamily: "'Zain', sans-serif", boxSizing: "border-box" as const },
    select: { width: "100%", background: "#1A1D26", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "10px 14px", color: "#FAFAF7", fontSize: "14px", fontFamily: "'Zain', sans-serif", boxSizing: "border-box" as const },
    saveBtn: { background: "#C8A962", color: "#0A0A0A", border: "none", borderRadius: "8px", padding: "12px 28px", cursor: "pointer", fontFamily: "Space Mono, monospace", fontSize: "13px", fontWeight: 700 },
    cancelBtn: { background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "12px 28px", cursor: "pointer", fontFamily: "'Zain', sans-serif", fontSize: "14px" },
  };

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <div style={S.title}>CLIENT ORDERS</div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>
            {orders.length} طلب إجمالي
          </div>
        </div>
        <button style={S.backBtn} onClick={() => router.push("/admin")}>
          ← لوحة التحكم
        </button>
      </div>

      {/* Filters */}
      <div style={S.filters}>
        {(["all", ...ALL_STATUSES] as const).map(s => (
          <button key={s} style={S.filterBtn(filterStatus === s)} onClick={() => setFilterStatus(s)}>
            {s === "all" ? "الكل" : STATUS_LABELS[s].ar}
            {" "}({s === "all" ? orders.length : orders.filter(o => o.status === s).length})
          </button>
        ))}
      </div>

      {/* Orders list */}
      {loading ? (
        <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: "60px 0" }}>جاري التحميل...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: "60px 0" }}>لا توجد طلبات</div>
      ) : (
        filtered.map(o => (
          <div key={o.id} style={S.card} onClick={() => openOrder(o)}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.055)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,169,98,0.2)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "6px" }}>{o.title}</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginBottom: "8px" }}>
                {o.serviceNameAr} — {o.userName} ({o.userEmail})
              </div>
              <div style={{ fontSize: "11px", fontFamily: "Space Mono, monospace", color: "rgba(255,255,255,0.25)" }}>
                {new Date(o.createdAt).toLocaleDateString("ar-SA")} · {o.id}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
              <span style={S.badge(o.status)}>{STATUS_LABELS[o.status].ar}</span>
              {o.deliveredFiles?.length > 0 && (
                <span style={{ fontSize: "11px", fontFamily: "Space Mono, monospace", color: "#BDEE63" }}>
                  {o.deliveredFiles.length} ملف
                </span>
              )}
            </div>
          </div>
        ))
      )}

      {/* Edit modal */}
      {selected && (
        <div style={S.overlay} onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
          <div style={S.modal}>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "4px" }}>
              {selected.id}
            </div>
            <h2 style={{ fontWeight: 800, fontSize: "20px", marginBottom: "4px" }}>{selected.title}</h2>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginBottom: "24px" }}>
              {selected.serviceNameAr} · {selected.userName}
            </div>

            {/* Order details */}
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
              <div style={{ ...S.label, marginBottom: "6px" }}>الوصف</div>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>{selected.description}</p>
              {selected.requirements && (
                <>
                  <div style={{ ...S.label, marginBottom: "6px", marginTop: "12px" }}>المتطلبات</div>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>{selected.requirements}</p>
                </>
              )}
              {selected.referenceLinks && (
                <>
                  <div style={{ ...S.label, marginBottom: "6px", marginTop: "12px" }}>روابط مرجعية</div>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", margin: 0 }}>{selected.referenceLinks}</p>
                </>
              )}
              {selected.budget && (
                <div style={{ marginTop: "12px", fontSize: "13px", color: "#C8A962" }}>الميزانية: {selected.budget}</div>
              )}
            </div>

            {/* Status */}
            <div style={{ marginBottom: "20px" }}>
              <label style={S.label}>الحالة</label>
              <select style={S.select} value={editStatus} onChange={e => setEditStatus(e.target.value as OrderStatus)}>
                {ALL_STATUSES.map(s => (
                  <option key={s} value={s}>{STATUS_LABELS[s].ar}</option>
                ))}
              </select>
            </div>

            {/* Admin notes */}
            <div style={{ marginBottom: "20px" }}>
              <label style={S.label}>ملاحظات للعميل</label>
              <textarea
                style={{ ...S.input, minHeight: "80px", resize: "vertical" }}
                value={editNotes}
                onChange={e => setEditNotes(e.target.value)}
                placeholder="ملاحظات اختيارية تظهر للعميل..."
              />
            </div>

            {/* Delivered files */}
            {selected.deliveredFiles?.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <label style={S.label}>الملفات المُسلَّمة</label>
                {selected.deliveredFiles.map(f => (
                  <div key={f.id} style={{ background: "rgba(189,238,99,0.06)", border: "1px solid rgba(189,238,99,0.15)", borderRadius: "8px", padding: "10px 14px", marginBottom: "8px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#BDEE63" }}>{f.name}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", wordBreak: "break-all" }}>{f.url}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Add new file */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "16px", marginBottom: "24px" }}>
              <label style={S.label}>إضافة ملف جديد</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                <input style={S.input} placeholder="اسم الملف" value={newFileName} onChange={e => setNewFileName(e.target.value)} />
                <select style={S.select} value={newFileType} onChange={e => setNewFileType(e.target.value)}>
                  <option value="design">تصميم</option>
                  <option value="document">مستند</option>
                  <option value="video">فيديو</option>
                  <option value="archive">ملف مضغوط</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
              <input style={S.input} placeholder="رابط الملف (Google Drive, Dropbox...)" value={newFileUrl} onChange={e => setNewFileUrl(e.target.value)} />
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button style={S.cancelBtn} onClick={() => setSelected(null)}>إلغاء</button>
              <button style={S.saveBtn} onClick={save} disabled={saving}>
                {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
