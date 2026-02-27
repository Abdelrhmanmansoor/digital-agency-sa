"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import InvoicePrintView from "@/components/admin/InvoicePrintView";
import { Invoice } from "@/lib/db";

const STATUS_LABELS: Record<string, string> = {
  draft: "مسودة",
  sent: "مُرسلة",
  paid: "مدفوعة",
  cancelled: "ملغاة",
};

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/admin/invoices/${id}`)
      .then((r) => {
        if (r.status === 401) { router.push("/admin"); return null; }
        if (r.status === 404) { router.push("/admin/invoices"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setInvoice(data); })
      .finally(() => setLoading(false));
  }, [id, router]);

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = async () => {
    if (!confirm("هل تريد حذف هذه الفاتورة؟")) return;
    await fetch(`/api/admin/invoices/${id}`, { method: "DELETE" });
    router.push("/admin/invoices");
  };

  const handleStatusChange = async (newStatus: Invoice["status"]) => {
    if (!invoice) return;
    setUpdatingStatus(true);
    const res = await fetch(`/api/admin/invoices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const updated = await res.json();
      setInvoice(updated);
    }
    setUpdatingStatus(false);
  };

  const handleWhatsApp = () => {
    if (!invoice) return;
    const phone = invoice.clientPhone.replace(/\D/g, "");
    const text = encodeURIComponent(
      `السلام عليكم ${invoice.clientName}،\n\nيسعدنا إرسال فاتورتكم رقم ${invoice.number} بمبلغ ${invoice.total.toFixed(2)} ريال سعودي.\n\nتاريخ الاستحقاق: ${new Date(invoice.dueDate).toLocaleDateString("ar-SA")}\n\nوكالة رقمية — +201007835547`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const handleEmail = () => {
    if (!invoice) return;
    const subject = encodeURIComponent(`فاتورة رقم ${invoice.number} — وكالة رقمية`);
    const body = encodeURIComponent(
      `السلام عليكم ${invoice.clientName},\n\nيسعدنا إرسال فاتورتكم رقم ${invoice.number}.\n\nالمبلغ الإجمالي: ${invoice.total.toFixed(2)} SAR\nتاريخ الاستحقاق: ${new Date(invoice.dueDate).toLocaleDateString("ar-SA")}\n\nشكراً،\nوكالة رقمية`
    );
    window.open(`mailto:${invoice.clientEmail}?subject=${subject}&body=${body}`);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0A" }}>
        <AdminSidebar />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono, monospace" }}>
          جارٍ التحميل...
        </div>
      </div>
    );
  }

  if (!invoice) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0A" }}>
      <AdminSidebar />

      {/* Main */}
      <div style={{ flex: 1, padding: "40px 48px", fontFamily: "'Zain', sans-serif", direction: "rtl" }}>

        {/* Action bar — hidden on print */}
        <div
          className="no-print"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link href="/admin/invoices" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontFamily: "Space Mono, monospace", fontSize: "12px" }}>
                ← الفواتير
              </Link>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "#C8A962" }}>
                {invoice.number}
              </span>
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#FAFAF7", margin: "8px 0 0" }}>
              {invoice.clientName}
            </h1>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {/* Status quick-change */}
            <select
              value={invoice.status}
              onChange={(e) => handleStatusChange(e.target.value as Invoice["status"])}
              disabled={updatingStatus}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#FAFAF7",
                borderRadius: "8px",
                padding: "9px 14px",
                fontFamily: "'Zain', sans-serif",
                fontSize: "13px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="draft">مسودة</option>
              <option value="sent">مُرسلة</option>
              <option value="paid">مدفوعة</option>
              <option value="cancelled">ملغاة</option>
            </select>

            <button
              onClick={handleWhatsApp}
              style={{
                background: "rgba(37,211,102,0.12)",
                border: "1px solid rgba(37,211,102,0.3)",
                color: "#25D366",
                borderRadius: "8px",
                padding: "9px 16px",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "'Zain', sans-serif",
              }}
            >
              واتساب
            </button>

            <button
              onClick={handleEmail}
              style={{
                background: "rgba(66,133,244,0.1)",
                border: "1px solid rgba(66,133,244,0.25)",
                color: "#4285F4",
                borderRadius: "8px",
                padding: "9px 16px",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "'Zain', sans-serif",
              }}
            >
              إيميل
            </button>

            <Link href={`/admin/invoices/${id}/edit`}>
              <button
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.7)",
                  borderRadius: "8px",
                  padding: "9px 16px",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontFamily: "'Zain', sans-serif",
                }}
              >
                تعديل
              </button>
            </Link>

            <button
              onClick={handlePrint}
              style={{
                background: "#C8A962",
                border: "none",
                color: "#0A0A0A",
                borderRadius: "8px",
                padding: "9px 20px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Zain', sans-serif",
              }}
            >
              طباعة / PDF
            </button>

            <button
              onClick={handleDelete}
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#EF4444",
                borderRadius: "8px",
                padding: "9px 16px",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: "'Zain', sans-serif",
              }}
            >
              حذف
            </button>
          </div>
        </div>

        {/* Invoice preview */}
        <div
          ref={printRef}
          style={{
            background: "white",
            boxShadow: "0 4px 40px rgba(0,0,0,0.5)",
            borderRadius: "12px",
            overflow: "hidden",
            width: "fit-content",
            maxWidth: "100%",
          }}
        >
          <InvoicePrintView invoice={invoice} />
        </div>

        {/* Status info */}
        <div
          className="no-print"
          style={{
            marginTop: "24px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "10px",
            padding: "16px 24px",
            display: "flex",
            gap: "32px",
            fontSize: "13px",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "Space Mono, monospace",
          }}
        >
          <span>الحالة: <strong style={{ color: "#C8A962" }}>{STATUS_LABELS[invoice.status]}</strong></span>
          <span>النموذج: <strong style={{ color: "#FAFAF7" }}>{invoice.template}</strong></span>
          <span>أُنشئت: {new Date(invoice.createdAt).toLocaleDateString("ar-SA")}</span>
          <span>آخر تعديل: {new Date(invoice.updatedAt).toLocaleDateString("ar-SA")}</span>
        </div>
      </div>
    </div>
  );
}
