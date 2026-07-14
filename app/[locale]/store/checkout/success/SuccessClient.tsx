"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";

interface LastOrder {
  number: string;
  total: number;
  subtotal: number;
  vatAmount: number;
  paymentMethod: string;
  customerName?: string;
  waLink?: string;
  items: { nameAr: string; nameEn: string; qty: number; lineTotal: number }[];
}

function SuccessInner() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<LastOrder | null>(null);

  const orderNumber = order?.number || searchParams.get("n") || "";
  const currency = isRTL ? "ر.س" : "SAR";

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("am_last_order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // no stored order — the URL param alone is enough
    }
  }, []);

  const tx = {
    title: isRTL ? "تم استلام طلبك بنجاح" : "Your order has been received",
    orderNo: isRTL ? "رقم الطلب" : "Order number",
    message: isRTL
      ? "سيتواصل معك فريقنا خلال أقل من ساعة عمل لتأكيد الطلب وترتيب خطوات التنفيذ والدفع."
      : "Our team will contact you within one business hour to confirm the order and arrange delivery and payment.",
    total: isRTL ? "الإجمالي (شامل الضريبة)" : "Total (VAT included)",
    followWhatsapp: isRTL ? "متابعة الطلب عبر واتساب" : "Follow up via WhatsApp",
    backHome: isRTL ? "العودة للرئيسية" : "Back to Home",
    backStore: isRTL ? "متابعة التسوق" : "Continue Shopping",
  };

  return (
    <div className="max-w-[720px] mx-auto px-4 md:px-8 py-20 text-center">
      <div
        aria-hidden
        style={{
          width: "80px", height: "80px", margin: "0 auto 24px", borderRadius: "50%",
          background: "rgba(47,133,90,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2F855A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h1 style={{ fontSize: "30px", marginBottom: "12px" }}>{tx.title}</h1>
      {orderNumber && (
        <p style={{ fontSize: "16px", marginBottom: "8px" }}>
          {tx.orderNo}:{" "}
          <strong style={{ fontFamily: "Space Mono, monospace", color: "#8A6D00" }} dir="ltr">
            {orderNumber}
          </strong>
        </p>
      )}
      <p style={{ color: "#555550", maxWidth: "480px", margin: "0 auto 28px", lineHeight: 1.9 }}>{tx.message}</p>

      {order && (
        <div className="card text-start" style={{ padding: "24px", marginBottom: "28px" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {order.items.map((i, idx) => (
              <li key={idx} className="flex justify-between gap-3 py-2" style={{ borderBottom: "1px solid #EAEAE6", fontSize: "14px" }}>
                <span>
                  {isRTL ? i.nameAr : i.nameEn}
                  <span style={{ color: "#8A8A84" }}> × {i.qty}</span>
                </span>
                <span style={{ fontWeight: 700 }}>{i.lineTotal.toLocaleString()} {currency}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between py-3" style={{ fontWeight: 800, fontSize: "16px" }}>
            <span>{tx.total}</span>
            <span style={{ color: "#8A6D00" }}>{order.total.toLocaleString()} {currency}</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={
            order?.waLink ||
            getWhatsAppLink(
              isRTL
                ? `مرحباً، أود متابعة طلبي رقم ${orderNumber}`
                : `Hello, I'd like to follow up on my order ${orderNumber}`
            )
          }
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          {tx.followWhatsapp}
        </a>
        <Link href={`/${locale}/store`} className="btn-secondary">{tx.backStore}</Link>
        <Link href={`/${locale}`} className="btn-secondary">{tx.backHome}</Link>
      </div>
    </div>
  );
}

export default function SuccessClient() {
  return (
    <Suspense fallback={<div className="max-w-[720px] mx-auto px-4 py-20"><div className="skeleton" style={{ height: "260px" }} /></div>}>
      <SuccessInner />
    </Suspense>
  );
}
