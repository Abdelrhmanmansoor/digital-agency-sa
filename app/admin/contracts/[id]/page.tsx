"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ContractPrintView from "@/components/admin/ContractPrintView";
import { Contract } from "@/lib/db";

const STATUS_LABELS: Record<string, string> = {
  draft: "مسودة",
  active: "نشط",
  completed: "مكتمل",
  terminated: "منتهي",
};

export default function ContractDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/contracts/${id}`)
      .then((r) => {
        if (r.status === 401) { router.push("/admin"); return null; }
        if (r.status === 404) { router.push("/admin/contracts"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setContract(data); })
      .finally(() => setLoading(false));
  }, [id, router]);

  const handlePrint = () => window.print();

  const handleDelete = async () => {
    if (!confirm("هل تريد حذف هذا العقد؟")) return;
    await fetch(`/api/admin/contracts/${id}`, { method: "DELETE" });
    router.push("/admin/contracts");
  };

  const handleStatusChange = async (newStatus: Contract["status"]) => {
    if (!contract) return;
    setUpdatingStatus(true);
    const res = await fetch(`/api/admin/contracts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) setContract(await res.json());
    setUpdatingStatus(false);
  };

  const handleWhatsApp = () => {
    if (!contract) return;
    const phone = contract.clientPhone.replace(/\D/g, "");
    const text = encodeURIComponent(
      `السلام عليكم ${contract.clientName}،\n\nيسعدنا إرسال عقد التعاون رقم ${contract.number} للخدمة: ${contract.serviceTitleAr}.\n\nالمبلغ الإجمالي: ${contract.totalAmount.toFixed(2)} ريال سعودي.\n\nوكالة رقمية — +201007835547`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const handleEmail = () => {
    if (!contract) return;
    const subject = encodeURIComponent(`عقد رقم ${contract.number} — وكالة رقمية`);
    const body = encodeURIComponent(
      `السلام عليكم ${contract.clientName},\n\nيسعدنا إرسال عقد التعاون رقم ${contract.number}.\n\nالخدمة: ${contract.serviceTitleAr}\nالمبلغ: ${contract.totalAmount.toFixed(2)} SAR\n\nوكالة رقمية`
    );
    window.open(`mailto:${contract.clientEmail}?subject=${subject}&body=${body}`);
  };

  if (loading) {
    return (
      <div>
        <AdminSidebar />
        <div className="admin-main" style={{ background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono, monospace" }}>
          جارٍ التحميل...
        </div>
      </div>
    );
  }

  if (!contract) return null;

  return (
    <div>
      <AdminSidebar />
      <div className="admin-main" style={{ background: "#0A0A0A", padding: "40px 48px", fontFamily: "'Zain', sans-serif", direction: "rtl" }}>

        {/* Action bar */}
        <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link href="/admin/contracts" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontFamily: "Space Mono, monospace", fontSize: "12px" }}>
                ← العقود
              </Link>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "#C8A962" }}>{contract.number}</span>
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#FAFAF7", margin: "8px 0 0" }}>
              {contract.clientName}
            </h1>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <select
              value={contract.status}
              onChange={(e) => handleStatusChange(e.target.value as Contract["status"])}
              disabled={updatingStatus}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#FAFAF7", borderRadius: "8px", padding: "9px 14px", fontFamily: "'Zain', sans-serif", fontSize: "13px", cursor: "pointer", outline: "none" }}
            >
              <option value="draft">مسودة</option>
              <option value="active">نشط</option>
              <option value="completed">مكتمل</option>
              <option value="terminated">منتهي</option>
            </select>

            <button onClick={handleWhatsApp} style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)", color: "#25D366", borderRadius: "8px", padding: "9px 16px", fontSize: "13px", cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>
              واتساب
            </button>

            <button onClick={handleEmail} style={{ background: "rgba(66,133,244,0.1)", border: "1px solid rgba(66,133,244,0.25)", color: "#4285F4", borderRadius: "8px", padding: "9px 16px", fontSize: "13px", cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>
              إيميل
            </button>

            <Link href={`/admin/contracts/${id}/edit`}>
              <button style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", borderRadius: "8px", padding: "9px 16px", fontSize: "13px", cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>
                تعديل
              </button>
            </Link>

            <button onClick={handlePrint} style={{ background: "#C8A962", border: "none", color: "#0A0A0A", borderRadius: "8px", padding: "9px 20px", fontSize: "14px", fontWeight: 700, cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>
              طباعة / PDF
            </button>

            <button onClick={handleDelete} style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444", borderRadius: "8px", padding: "9px 16px", fontSize: "13px", cursor: "pointer", fontFamily: "'Zain', sans-serif" }}>
              حذف
            </button>
          </div>
        </div>

        {/* Contract preview */}
        <div style={{ background: "white", boxShadow: "0 4px 40px rgba(0,0,0,0.5)", borderRadius: "12px", overflow: "hidden", width: "fit-content", maxWidth: "100%" }}>
          <ContractPrintView contract={contract} />
        </div>

        {/* Meta info */}
        <div className="no-print" style={{ marginTop: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "16px 24px", display: "flex", gap: "32px", fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "Space Mono, monospace" }}>
          <span>الحالة: <strong style={{ color: "#C8A962" }}>{STATUS_LABELS[contract.status]}</strong></span>
          <span>أيام التنفيذ: <strong style={{ color: "#FAFAF7" }}>{contract.deliveryDays}</strong></span>
          <span>الاختصاص: <strong style={{ color: "#FAFAF7" }}>{contract.jurisdiction}</strong></span>
          <span>أُنشئ: {new Date(contract.createdAt).toLocaleDateString("ar-SA")}</span>
        </div>
      </div>
    </div>
  );
}
