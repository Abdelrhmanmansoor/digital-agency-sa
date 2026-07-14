"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useCart } from "@/components/store/CartContext";
import { getWhatsAppLink } from "@/lib/utils";

const VAT_RATE = 0.15;

export default function CheckoutClient() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();
  const { items, subtotal, isReady, clear } = useCart();

  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", notes: "" });
  const paymentMethod = "whatsapp" as const;
  const [agreed, setAgreed] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const vat = Math.round(subtotal * VAT_RATE * 100) / 100;
  const total = Math.round((subtotal + vat) * 100) / 100;
  const currency = isRTL ? "ر.س" : "SAR";

  const tx = {
    title: isRTL ? "إتمام الطلب" : "Checkout",
    customerInfo: isRTL ? "بيانات العميل" : "Customer Information",
    name: isRTL ? "الاسم الكامل" : "Full Name",
    phone: isRTL ? "رقم الجوال (واتساب)" : "Phone (WhatsApp)",
    email: isRTL ? "البريد الإلكتروني (اختياري)" : "Email (optional)",
    city: isRTL ? "المدينة (اختياري)" : "City (optional)",
    notes: isRTL ? "ملاحظات إضافية (اختياري)" : "Additional notes (optional)",
    payment: isRTL ? "وسيلة إتمام الطلب" : "Order Method",
    payWhatsapp: isRTL ? "تأكيد عبر واتساب" : "Confirm via WhatsApp",
    payWhatsappDesc: isRTL ? "نتواصل معك خلال أقل من ساعة لتأكيد الطلب وترتيب الدفع." : "We contact you within an hour to confirm the order and arrange payment.",
    payBank: isRTL ? "تحويل بنكي" : "Bank Transfer",
    payBankDesc: isRTL ? "نرسل لك بيانات الحساب البنكي بعد إنشاء الطلب." : "We send bank details after the order is created.",
    review: isRTL ? "مراجعة الطلب" : "Order Review",
    subtotal: isRTL ? "المجموع الفرعي" : "Subtotal",
    vat: isRTL ? "ضريبة القيمة المضافة (15%)" : "VAT (15%)",
    total: isRTL ? "الإجمالي النهائي" : "Grand Total",
    terms: isRTL ? "أوافق على الشروط وسياسة الخصوصية" : "I agree to the Terms & Privacy Policy",
    submit: isRTL ? "تأكيد الطلب" : "Place Order",
    submitting: isRTL ? "جارٍ إنشاء الطلب…" : "Placing order…",
    emptyCart: isRTL ? "سلتك فارغة — أضف خدمات من المتجر أولاً." : "Your cart is empty — add services from the store first.",
    browse: isRTL ? "تصفح المتجر" : "Browse Store",
    errName: isRTL ? "أدخل اسماً صحيحاً (حرفان على الأقل)" : "Enter a valid name (at least 2 characters)",
    errPhone: isRTL ? "أدخل رقم جوال صحيحاً" : "Enter a valid phone number",
    errEmail: isRTL ? "أدخل بريداً إلكترونياً صحيحاً" : "Enter a valid email",
    errTerms: isRTL ? "يجب الموافقة على الشروط أولاً" : "You must agree to the terms first",
    errServer: isRTL ? "تعذر إنشاء الطلب. حاول مرة أخرى أو تواصل معنا عبر واتساب — بياناتك محفوظة في النموذج." : "Could not create the order. Try again or contact us on WhatsApp — your form data is preserved.",
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = tx.errName;
    if (!/^\+?[0-9\s-]{8,15}$/.test(form.phone.trim())) errs.phone = tx.errPhone;
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = tx.errEmail;
    if (!agreed) errs.terms = tx.errTerms;
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/store/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            city: form.city.trim(),
          },
          notes: form.notes.trim(),
          paymentMethod,
          locale,
          items: items.map((i) => ({ productId: i.productId, qty: i.qty })),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setSubmitError(tx.errServer);
        setIsSubmitting(false);
        return;
      }

      // Build the WhatsApp handoff message with the full order summary
      const itemLines = (data.order.items as { nameAr: string; nameEn: string; qty: number; lineTotal: number }[])
        .map((i) => `• ${isRTL ? i.nameAr : i.nameEn} × ${i.qty} = ${i.lineTotal.toLocaleString()} ${isRTL ? "ر.س" : "SAR"}`)
        .join("\n");
      const waMessage = isRTL
        ? `طلب جديد ${data.order.number}\n\nالاسم: ${form.name.trim()}\nالجوال: ${form.phone.trim()}${form.city.trim() ? `\nالمدينة: ${form.city.trim()}` : ""}\n\nالخدمات:\n${itemLines}\n\nالمجموع الفرعي: ${data.order.subtotal.toLocaleString()} ر.س\nالضريبة (15%): ${data.order.vatAmount.toLocaleString()} ر.س\nالإجمالي: ${data.order.total.toLocaleString()} ر.س${form.notes.trim() ? `\n\nملاحظات: ${form.notes.trim()}` : ""}`
        : `New order ${data.order.number}\n\nName: ${form.name.trim()}\nPhone: ${form.phone.trim()}${form.city.trim() ? `\nCity: ${form.city.trim()}` : ""}\n\nServices:\n${itemLines}\n\nSubtotal: ${data.order.subtotal.toLocaleString()} SAR\nVAT (15%): ${data.order.vatAmount.toLocaleString()} SAR\nTotal: ${data.order.total.toLocaleString()} SAR${form.notes.trim() ? `\n\nNotes: ${form.notes.trim()}` : ""}`;
      const waLink = getWhatsAppLink(waMessage);

      try {
        sessionStorage.setItem(
          "am_last_order",
          JSON.stringify({ ...data.order, customerName: form.name.trim(), waLink })
        );
      } catch {
        // sessionStorage unavailable — success page falls back to the URL param
      }
      clear();
      // Hand the customer over to WhatsApp with the order details, then show the success page
      window.open(waLink, "_blank", "noopener");
      router.push(`/${locale}/store/checkout/success?n=${encodeURIComponent(data.order.number)}`);
    } catch {
      setSubmitError(tx.errServer);
      setIsSubmitting(false);
    }
  };

  if (!isReady) {
    return (
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-14">
        <div className="skeleton" style={{ height: "36px", width: "220px", marginBottom: "24px" }} />
        <div className="skeleton" style={{ height: "300px" }} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-20 text-center">
        <h1 style={{ fontSize: "26px", marginBottom: "12px" }}>{tx.emptyCart}</h1>
        <Link href={`/${locale}/store`} className="btn-primary" style={{ marginTop: "12px" }}>{tx.browse}</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-12">
      <h1 style={{ fontSize: "30px", marginBottom: "28px" }}>{tx.title}</h1>

      <form onSubmit={handleSubmit} noValidate className="grid gap-8 lg:grid-cols-[1fr_380px]" style={{ alignItems: "start" }}>
        <div className="space-y-6">
          {/* Customer info */}
          <section className="card" style={{ padding: "26px" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>{tx.customerInfo}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="form-label" htmlFor="co-name">{tx.name} *</label>
                <input
                  id="co-name"
                  className="form-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  aria-invalid={!!fieldErrors.name}
                  autoComplete="name"
                  required
                />
                {fieldErrors.name && <p className="form-error" role="alert">{fieldErrors.name}</p>}
              </div>
              <div>
                <label className="form-label" htmlFor="co-phone">{tx.phone} *</label>
                <input
                  id="co-phone"
                  className="form-input"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  aria-invalid={!!fieldErrors.phone}
                  autoComplete="tel"
                  inputMode="tel"
                  dir="ltr"
                  required
                />
                {fieldErrors.phone && <p className="form-error" role="alert">{fieldErrors.phone}</p>}
              </div>
              <div>
                <label className="form-label" htmlFor="co-email">{tx.email}</label>
                <input
                  id="co-email"
                  type="email"
                  className="form-input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  aria-invalid={!!fieldErrors.email}
                  autoComplete="email"
                  dir="ltr"
                />
                {fieldErrors.email && <p className="form-error" role="alert">{fieldErrors.email}</p>}
              </div>
              <div>
                <label className="form-label" htmlFor="co-city">{tx.city}</label>
                <input
                  id="co-city"
                  className="form-input"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  autoComplete="address-level2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="form-label" htmlFor="co-notes">{tx.notes}</label>
                <textarea
                  id="co-notes"
                  className="form-input"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  maxLength={1000}
                />
              </div>
            </div>
          </section>

          {/* How the order completes — WhatsApp handoff */}
          <section className="card" style={{ padding: "26px" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>{tx.payment}</h2>
            <div
              className="flex items-start gap-3"
              style={{
                border: "2px solid #F0B100",
                borderRadius: "10px",
                padding: "16px",
                background: "rgba(240,177,0,0.06)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" aria-hidden style={{ flexShrink: 0, marginTop: "2px" }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>
                <span style={{ display: "block", fontWeight: 700, fontSize: "15px" }}>{tx.payWhatsapp}</span>
                <span style={{ display: "block", color: "#555550", fontSize: "13.5px", marginTop: "4px", lineHeight: 1.8 }}>
                  {isRTL
                    ? "بعد تأكيد الطلب سيتم تحويلك مباشرة إلى واتساب ومعك ملخص طلبك كاملاً برقمه، ليستلمه فريقنا فوراً ويرتّب معك التنفيذ والدفع. لا تدفع أي شيء قبل الاتفاق النهائي."
                    : "After confirming, you are redirected to WhatsApp with your full order summary and number. Our team picks it up immediately and arranges delivery and payment with you. You pay nothing before the final agreement."}
                </span>
              </span>
            </div>
          </section>
        </div>

        {/* Review / submit */}
        <aside className="card" style={{ padding: "26px", position: "sticky", top: "130px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>{tx.review}</h2>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: "14px" }}>
            {items.map((i) => (
              <li key={i.productId} className="flex justify-between gap-3 py-2" style={{ borderBottom: "1px solid #EAEAE6", fontSize: "14px" }}>
                <span style={{ color: "#333" }}>
                  {isRTL ? i.nameAr : i.nameEn}
                  <span style={{ color: "#8A8A84" }}> × {i.qty}</span>
                </span>
                <span style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{(i.price * i.qty).toLocaleString()} {currency}</span>
              </li>
            ))}
          </ul>
          <dl style={{ fontSize: "14.5px" }}>
            <div className="flex justify-between py-1.5">
              <dt style={{ color: "#555550" }}>{tx.subtotal}</dt>
              <dd style={{ fontWeight: 700 }}>{subtotal.toLocaleString()} {currency}</dd>
            </div>
            <div className="flex justify-between py-1.5">
              <dt style={{ color: "#555550" }}>{tx.vat}</dt>
              <dd style={{ fontWeight: 700 }}>{vat.toLocaleString()} {currency}</dd>
            </div>
            <div className="flex justify-between py-2" style={{ borderTop: "1px solid #EAEAE6", marginTop: "6px" }}>
              <dt style={{ fontWeight: 800, fontSize: "16px" }}>{tx.total}</dt>
              <dd style={{ fontWeight: 800, fontSize: "18px", color: "#8A6D00" }}>{total.toLocaleString()} {currency}</dd>
            </div>
          </dl>

          <label className="flex items-start gap-2 cursor-pointer" style={{ margin: "14px 0", fontSize: "13.5px", color: "#333" }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ marginTop: "4px", accentColor: "#F0B100" }}
              aria-invalid={!!fieldErrors.terms}
            />
            <span>
              {tx.terms}{" "}
              <Link href={`/${locale}/policy`} target="_blank" style={{ color: "#8A6D00", fontWeight: 700 }}>
                {isRTL ? "(عرض)" : "(view)"}
              </Link>
            </span>
          </label>
          {fieldErrors.terms && <p className="form-error" role="alert" style={{ marginBottom: "10px" }}>{fieldErrors.terms}</p>}

          {submitError && (
            <div className="alert alert-error" role="alert" style={{ marginBottom: "14px" }}>
              <span>{submitError}</span>
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: "100%" }} disabled={isSubmitting}>
            {isSubmitting ? tx.submitting : tx.submit}
          </button>

          <a
            href={getWhatsAppLink(isRTL ? "أرغب بمساعدة في إتمام طلبي من المتجر" : "I need help completing my store order")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ width: "100%", marginTop: "10px", fontSize: "14px" }}
          >
            {isRTL ? "مساعدة عبر واتساب" : "Help via WhatsApp"}
          </a>
        </aside>
      </form>
    </div>
  );
}
