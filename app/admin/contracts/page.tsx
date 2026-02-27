"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Contract } from "@/lib/db";

const TYPE_LABELS: Record<string, string> = {
  "service-agreement": "عقد خدمات",
  maintenance: "صيانة ودعم",
  marketing: "تسويق رقمي",
  custom: "مخصص",
};

const STATUS_LABELS: Record<string, string> = {
  draft: "مسودة",
  active: "نشط",
  completed: "مكتمل",
  terminated: "منتهي",
};

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  draft: { bg: "rgba(255,255,255,0.08)", text: "#aaa" },
  active: { bg: "rgba(200,169,98,0.15)", text: "#C8A962" },
  completed: { bg: "rgba(34,197,94,0.15)", text: "#22C55E" },
  terminated: { bg: "rgba(239,68,68,0.15)", text: "#EF4444" },
};

function fmt(n: number) {
  return n.toLocaleString("en-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ContractsPage() {
  const router = useRouter();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/contracts")
      .then((r) => {
        if (r.status === 401) { router.push("/admin"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setContracts(data); })
      .finally(() => setLoading(false));
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("هل تريد حذف هذا العقد؟")) return;
    setDeleting(id);
    await fetch(`/api/admin/contracts/${id}`, { method: "DELETE" });
    setContracts((prev) => prev.filter((c) => c.id !== id));
    setDeleting(null);
  };

  const filtered =
    filter === "all" ? contracts : contracts.filter((c) => c.status === filter);

  return (
    <div>
      <AdminSidebar />
      <div className="admin-main" style={{ background: "#0A0A0A", padding: "40px 48px", fontFamily: "'Zain', sans-serif" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>العقود</h1>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "4px 0 0", fontFamily: "Space Mono, monospace" }}>
              إنشاء وإدارة عقود العملاء حسب القانون السعودي
            </p>
          </div>
          <Link href="/admin/contracts/new">
            <button style={{ background: "#C8A962", color: "#0A0A0A", border: "none", borderRadius: "10px", padding: "12px 24px", fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>
              + عقد جديد
            </button>
          </Link>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {["all", "draft", "active", "completed", "terminated"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                background: filter === s ? "rgba(200,169,98,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${filter === s ? "rgba(200,169,98,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: filter === s ? "#C8A962" : "rgba(255,255,255,0.5)",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "'Zain', sans-serif",
              }}
            >
              {s === "all" ? "الكل" : STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono, monospace", fontSize: "13px", textAlign: "center", marginTop: "80px" }}>جارٍ التحميل...</div>
        ) : filtered.length === 0 ? (
          <div style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono, monospace", fontSize: "13px", textAlign: "center", marginTop: "80px" }}>لا توجد عقود</div>
        ) : (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  {["رقم العقد", "العميل", "نوع الخدمة", "المبلغ", "تاريخ البدء", "الحالة", "إجراءات"].map((h) => (
                    <th key={h} style={{ padding: "14px 20px", textAlign: "right", fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", fontWeight: 400 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", color: "#C8A962", fontWeight: 600 }}>{c.number}</span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#FAFAF7" }}>{c.clientName}</div>
                      {c.clientCompany && <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{c.clientCompany}</div>}
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", fontFamily: "'Zain', sans-serif" }}>
                        {TYPE_LABELS[c.type] ?? c.type}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", color: "#FAFAF7" }}>{fmt(c.totalAmount)} SAR</span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
                        {new Date(c.startDate).toLocaleDateString("ar-SA")}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, background: STATUS_COLORS[c.status]?.bg, color: STATUS_COLORS[c.status]?.text, fontFamily: "'Zain', sans-serif" }}>
                        {STATUS_LABELS[c.status] ?? c.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Link href={`/admin/contracts/${c.id}`}>
                          <button style={{ background: "rgba(200,169,98,0.1)", border: "1px solid rgba(200,169,98,0.3)", color: "#C8A962", borderRadius: "6px", padding: "6px 12px", fontSize: "12px", cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>عرض</button>
                        </Link>
                        <Link href={`/admin/contracts/${c.id}/edit`}>
                          <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", borderRadius: "6px", padding: "6px 12px", fontSize: "12px", cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>تعديل</button>
                        </Link>
                        <button
                          onClick={() => handleDelete(c.id)}
                          disabled={deleting === c.id}
                          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444", borderRadius: "6px", padding: "6px 12px", fontSize: "12px", cursor: "pointer", fontFamily: "'Zain', sans-serif", opacity: deleting === c.id ? 0.5 : 1 }}
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
