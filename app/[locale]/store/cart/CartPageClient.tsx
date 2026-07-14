"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useCart } from "@/components/store/CartContext";

const VAT_RATE = 0.15;

export default function CartPageClient() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { items, subtotal, isReady, removeItem, setQty, clear } = useCart();

  const vat = Math.round(subtotal * VAT_RATE * 100) / 100;
  const total = Math.round((subtotal + vat) * 100) / 100;
  const currency = isRTL ? "ر.س" : "SAR";

  const tx = {
    title: isRTL ? "سلة المشتريات" : "Shopping Cart",
    empty: isRTL ? "سلتك فارغة حالياً" : "Your cart is empty",
    emptyHint: isRTL ? "تصفح خدمات المتجر وأضف ما يناسب مشروعك." : "Browse the store and add services that fit your project.",
    browse: isRTL ? "تصفح المتجر" : "Browse Store",
    product: isRTL ? "الخدمة" : "Service",
    qty: isRTL ? "الكمية" : "Qty",
    price: isRTL ? "السعر" : "Price",
    lineTotal: isRTL ? "الإجمالي" : "Total",
    remove: isRTL ? "حذف" : "Remove",
    monthly: isRTL ? "/شهرياً" : "/mo",
    summary: isRTL ? "ملخص الطلب" : "Order Summary",
    subtotal: isRTL ? "المجموع الفرعي" : "Subtotal",
    vat: isRTL ? "ضريبة القيمة المضافة (15%)" : "VAT (15%)",
    total: isRTL ? "الإجمالي النهائي" : "Grand Total",
    checkout: isRTL ? "إتمام الطلب" : "Proceed to Checkout",
    continueShopping: isRTL ? "متابعة التسوق" : "Continue Shopping",
    clear: isRTL ? "تفريغ السلة" : "Clear Cart",
    vatNote: isRTL ? "يُعاد احتساب الأسعار والإجمالي من الخادم عند إنشاء الطلب." : "Prices and totals are recalculated on the server when the order is placed.",
  };

  if (!isReady) {
    return (
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-14">
        <div className="skeleton" style={{ height: "36px", width: "220px", marginBottom: "24px" }} />
        <div className="skeleton" style={{ height: "120px", marginBottom: "12px" }} />
        <div className="skeleton" style={{ height: "120px" }} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-20 text-center">
        <div
          aria-hidden
          style={{
            width: "72px", height: "72px", margin: "0 auto 20px", borderRadius: "50%",
            background: "rgba(240,177,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8A6D00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <h1 style={{ fontSize: "26px", marginBottom: "8px" }}>{tx.empty}</h1>
        <p style={{ color: "#6B6B6B", marginBottom: "24px" }}>{tx.emptyHint}</p>
        <Link href={`/${locale}/store`} className="btn-primary">{tx.browse}</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-12">
      <h1 style={{ fontSize: "30px", marginBottom: "28px" }}>{tx.title}</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]" style={{ alignItems: "start" }}>
        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="card" style={{ padding: "20px" }}>
              <div className="flex flex-wrap items-center gap-4">
                <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                  <Link
                    href={`/${locale}/store/${item.slug}`}
                    style={{ fontSize: "17px", fontWeight: 700, color: "#111", textDecoration: "none" }}
                    className="hover:text-[#8A6D00] transition-colors"
                  >
                    {isRTL ? item.nameAr : item.nameEn}
                  </Link>
                  <div style={{ color: "#6B6B6B", fontSize: "13px", marginTop: "4px" }}>
                    {item.price.toLocaleString()} {currency}
                    {item.isMonthly ? tx.monthly : ""}
                    {item.originalPrice > item.price && (
                      <span style={{ textDecoration: "line-through", marginInlineStart: "8px", opacity: 0.6 }}>
                        {item.originalPrice.toLocaleString()} {currency}
                      </span>
                    )}
                  </div>
                </div>

                {/* Qty */}
                <div className="flex items-center gap-2" aria-label={tx.qty}>
                  <button className="qty-btn" onClick={() => setQty(item.productId, item.qty - 1)} aria-label={isRTL ? "تقليل الكمية" : "Decrease quantity"}>−</button>
                  <span style={{ minWidth: "32px", textAlign: "center", fontWeight: 700 }}>{item.qty}</span>
                  <button className="qty-btn" onClick={() => setQty(item.productId, item.qty + 1)} disabled={item.qty >= 10} aria-label={isRTL ? "زيادة الكمية" : "Increase quantity"}>+</button>
                </div>

                {/* Line total */}
                <div style={{ fontWeight: 800, fontSize: "16px", minWidth: "110px", textAlign: "end" }}>
                  {(item.price * item.qty).toLocaleString()} {currency}
                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  aria-label={`${tx.remove} ${isRTL ? item.nameAr : item.nameEn}`}
                  className="hover:text-[#D64545] transition-colors"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#8A8A84", padding: "8px" }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-2">
            <Link href={`/${locale}/store`} className="btn-secondary" style={{ padding: "10px 20px", fontSize: "14px" }}>
              {tx.continueShopping}
            </Link>
            <button
              onClick={clear}
              className="hover:text-[#D64545] transition-colors"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#8A8A84", fontSize: "14px", fontWeight: 600 }}
            >
              {tx.clear}
            </button>
          </div>
        </div>

        {/* Summary */}
        <aside className="card" style={{ padding: "26px", position: "sticky", top: "130px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "18px" }}>{tx.summary}</h2>
          <dl style={{ fontSize: "14.5px" }}>
            <div className="flex justify-between py-2" style={{ borderBottom: "1px solid #EAEAE6" }}>
              <dt style={{ color: "#555550" }}>{tx.subtotal}</dt>
              <dd style={{ fontWeight: 700 }}>{subtotal.toLocaleString()} {currency}</dd>
            </div>
            <div className="flex justify-between py-2" style={{ borderBottom: "1px solid #EAEAE6" }}>
              <dt style={{ color: "#555550" }}>{tx.vat}</dt>
              <dd style={{ fontWeight: 700 }}>{vat.toLocaleString()} {currency}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt style={{ fontWeight: 800, fontSize: "16px" }}>{tx.total}</dt>
              <dd style={{ fontWeight: 800, fontSize: "18px", color: "#8A6D00" }}>{total.toLocaleString()} {currency}</dd>
            </div>
          </dl>
          <Link href={`/${locale}/store/checkout`} className="btn-primary" style={{ width: "100%", marginTop: "10px" }}>
            {tx.checkout}
          </Link>
          <p style={{ color: "#8A8A84", fontSize: "12px", marginTop: "14px", lineHeight: 1.7 }}>{tx.vatNote}</p>
        </aside>
      </div>
    </div>
  );
}
