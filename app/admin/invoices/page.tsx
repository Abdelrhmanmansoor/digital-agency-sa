"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Invoice } from "@/lib/db";

const STATUS_LABELS: Record<string, string> = {
  draft: "مسودة",
  sent: "مُرسلة",
  paid: "مدفوعة",
  cancelled: "ملغاة",
};

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  draft: { bg: "rgba(255,255,255,0.08)", text: "#aaa" },
  sent: { bg: "rgba(66,133,244,0.15)", text: "#4285F4" },
  paid: { bg: "rgba(34,197,94,0.15)", text: "#22C55E" },
  cancelled: { bg: "rgba(239,68,68,0.15)", text: "#EF4444" },
};

function fmt(n: number) {
  return n.toLocaleString("en-SA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function InvoicesPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/invoices")
      .then((r) => {
        if (r.status === 401) { router.push("/admin"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setInvoices(data); })
      .finally(() => setLoading(false));
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("هل تريد حذف هذه الفاتورة؟")) return;
    setDeleting(id);
    await fetch(`/api/admin/invoices/${id}`, { method: "DELETE" });
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    setDeleting(null);
  };

  /* بحث واحد يغطي رقم الفاتورة واسم العميل والشركة — لا حاجة لأكثر من ذلك
     عند هذا الحجم. */
  const needle = query.trim().toLowerCase();
  const filtered = invoices
    .filter((inv) => filter === "all" || inv.status === filter)
    .filter((inv) =>
      !needle ||
      [inv.number, inv.clientName, inv.clientCompany, inv.clientEmail]
        .some((field) => (field ?? "").toLowerCase().includes(needle))
    );

  const copyLink = async (inv: Invoice) => {
    if (!inv.publicId) return;
    const url = `${window.location.origin}/invoice/${inv.publicId}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      try { document.execCommand("copy"); } catch { /* تجاهل */ }
      document.body.removeChild(el);
    }
    setCopiedId(inv.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div>
      <AdminSidebar />
      <div className="admin-main" style={{ background: "#0A0A0A", padding: "40px 48px", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>
              الفواتير
            </h1>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: "4px 0 0", fontFamily: "Space Mono, monospace" }}>
              إنشاء وإدارة فواتير العملاء
            </p>
          </div>
          <Link href="/admin/invoices/new">
            <button
              style={{
                background: "#F0B100",
                color: "#0A0A0A",
                border: "none",
                borderRadius: "10px",
                padding: "12px 24px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              }}
            >
              + فاتورة جديدة
            </button>
          </Link>
        </div>

        {/* Search */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث برقم الفاتورة أو اسم العميل..."
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            padding: "11px 16px",
            color: "#FAFAF7",
            fontSize: "14px",
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
            outline: "none",
            marginBottom: "16px",
          }}
        />

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {["all", "draft", "sent", "paid", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                background: filter === s ? "rgba(240,177,0,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${filter === s ? "rgba(240,177,0,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: filter === s ? "#F0B100" : "rgba(255,255,255,0.5)",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              }}
            >
              {s === "all" ? "الكل" : STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono, monospace", fontSize: "13px", textAlign: "center", marginTop: "80px" }}>
            جارٍ التحميل...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono, monospace", fontSize: "13px", textAlign: "center", marginTop: "80px" }}>
            لا توجد فواتير
          </div>
        ) : (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  {["رقم الفاتورة", "العميل", "الإجمالي", "تاريخ الإصدار", "الحالة", "الرابط الخاص", "إجراءات"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "14px 20px",
                        textAlign: "right",
                        fontFamily: "Space Mono, monospace",
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "0.1em",
                        fontWeight: 400,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", color: "#F0B100", fontWeight: 600 }}>
                        {inv.number}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#FAFAF7" }}>
                        {inv.clientName}
                      </div>
                      {inv.clientCompany && (
                        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                          {inv.clientCompany}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", color: "#FAFAF7" }}>
                        {fmt(inv.total)} {inv.currency}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
                        {new Date(inv.issueDate).toLocaleDateString("ar-SA")}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                        background: STATUS_COLORS[inv.status]?.bg,
                        color: STATUS_COLORS[inv.status]?.text,
                        fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                      }}>
                        {STATUS_LABELS[inv.status] ?? inv.status}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      {!inv.publicId ? (
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", fontFamily: "Space Mono, monospace" }}>
                          — لم يُنشأ
                        </span>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button
                            onClick={() => copyLink(inv)}
                            title={`/invoice/${inv.publicId}`}
                            style={{
                              background: copiedId === inv.id ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)",
                              border: `1px solid ${copiedId === inv.id ? "rgba(34,197,94,0.35)" : "rgba(255,255,255,0.1)"}`,
                              color: copiedId === inv.id ? "#22C55E" : "rgba(255,255,255,0.6)",
                              borderRadius: "6px",
                              padding: "6px 12px",
                              fontSize: "12px",
                              cursor: "pointer",
                              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                            }}
                          >
                            {copiedId === inv.id ? "تم النسخ ✓" : "نسخ الرابط"}
                          </button>
                          {inv.shareEnabled === false && (
                            <span style={{ fontSize: "11px", color: "#EF4444", fontFamily: "Space Mono, monospace" }}>موقوف</span>
                          )}
                          {inv.sharePasswordHash && (
                            <span title="محمية بكلمة مرور" style={{ fontSize: "12px" }}>🔒</span>
                          )}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Link href={`/admin/invoices/${inv.id}`}>
                          <button style={{
                            background: "rgba(240,177,0,0.1)",
                            border: "1px solid rgba(240,177,0,0.3)",
                            color: "#F0B100",
                            borderRadius: "6px",
                            padding: "6px 12px",
                            fontSize: "12px",
                            cursor: "pointer",
                            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                          }}>
                            عرض
                          </button>
                        </Link>
                        <Link href={`/admin/invoices/${inv.id}/edit`}>
                          <button style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.6)",
                            borderRadius: "6px",
                            padding: "6px 12px",
                            fontSize: "12px",
                            cursor: "pointer",
                            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                          }}>
                            تعديل
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(inv.id)}
                          disabled={deleting === inv.id}
                          style={{
                            background: "rgba(239,68,68,0.08)",
                            border: "1px solid rgba(239,68,68,0.2)",
                            color: "#EF4444",
                            borderRadius: "6px",
                            padding: "6px 12px",
                            fontSize: "12px",
                            cursor: "pointer",
                            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                            opacity: deleting === inv.id ? 0.5 : 1,
                          }}
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
