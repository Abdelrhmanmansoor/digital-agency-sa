"use client";

/* بوابة كلمة المرور + شاشات الحالة (رابط غير موجود / موقوف / منتهٍ).
   الشاشات الثلاث الأخيرة لا تكشف أي فرق بينها للزائر إلا ما قرّره صاحب
   الفاتورة: رسالة واحدة محايدة، فلا يُستدلّ من الرد على وجود فاتورة أصلًا. */

import { useState } from "react";
import Image from "next/image";
import s from "./public-invoice.module.css";

export function InvoiceUnavailable({ reason }: { reason: "not-found" | "disabled" | "expired" }) {
  const text = {
    "not-found": "هذا الرابط غير صحيح أو لم يعد متاحًا.",
    disabled: "تم إيقاف هذا الرابط من قبل الجهة المُصدِرة.",
    expired: "انتهت صلاحية هذا الرابط.",
  }[reason];

  return (
    <div className={s.gate} dir="rtl">
      <div className={s.gateCard}>
        <Image src="/logo-ink.png" alt="AM Design" width={320} height={115} className={s.gateLogo} unoptimized />
        <h1 className={s.gateTitle}>الفاتورة غير متاحة</h1>
        <p className={s.gateText}>
          {text}
          <br />
          يرجى التواصل معنا للحصول على رابط جديد.
        </p>
        <a className={s.gateBtn} href="https://wa.me/201007835547" style={{ display: "grid", placeItems: "center", textDecoration: "none" }}>
          تواصل عبر واتساب
        </a>
      </div>
    </div>
  );
}

export function InvoicePasswordGate({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError("");

    const res = await fetch(`/api/invoice/${token}/unlock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }).catch(() => null);

    if (res?.ok) {
      /* الكوكي ضُبطت على الخادم — إعادة تحميل كاملة تُعيد بناء الصفحة. */
      window.location.reload();
      return;
    }

    setBusy(false);
    setPassword("");
    setError(res?.status === 429 ? "محاولات كثيرة. يرجى المحاولة بعد قليل." : "كلمة المرور غير صحيحة.");
  };

  return (
    <div className={s.gate} dir="rtl">
      <form className={s.gateCard} onSubmit={submit}>
        <Image src="/logo-ink.png" alt="AM Design" width={320} height={115} className={s.gateLogo} unoptimized />
        <h1 className={s.gateTitle}>فاتورة محمية</h1>
        <p className={s.gateText}>
          هذه الفاتورة محمية بكلمة مرور.
          <br />
          أدخل الكلمة التي وصلتك مع الرابط لعرضها.
        </p>

        <input
          className={s.gateInput}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="off"
          autoFocus
          aria-label="كلمة مرور الفاتورة"
        />

        <button className={s.gateBtn} type="submit" disabled={busy || !password}>
          {busy ? "جارٍ التحقق..." : "عرض الفاتورة"}
        </button>

        <p className={s.gateError} role="alert">{error}</p>
      </form>
    </div>
  );
}
