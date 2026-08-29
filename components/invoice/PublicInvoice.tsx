"use client";

/* ═══════════════════════════════════════════════════════════════════════════
   الفاتورة كما يراها العميل عبر الرابط الخاص.
   لا تصل إلى هذا المكوّن أي بيانات إدارية: الخادم يمرّر حمولة منقّاة فقط
   (انظر `toPublicInvoice` في lib/invoice-share.ts).
   ═══════════════════════════════════════════════════════════════════════════ */

import { useState } from "react";
import Image from "next/image";
import type { PublicInvoice as PublicInvoiceData, PublicPaymentOption } from "@/lib/invoice-share";
import { AGENCY_INFO } from "@/lib/utils";
import s from "./public-invoice.module.css";

type Lang = "ar" | "en";

const CURRENCY_LABEL: Record<string, { ar: string; en: string }> = {
  SAR: { ar: "ريال سعودي", en: "SAR" },
  USD: { ar: "دولار أمريكي", en: "USD" },
  EGP: { ar: "جنيه مصري", en: "EGP" },
  EUR: { ar: "يورو", en: "EUR" },
};

const STATUS: Record<string, { ar: string; en: string; cls: string }> = {
  draft:     { ar: "مسودة",  en: "Draft",     cls: "statusDraft" },
  sent:      { ar: "مُرسلة",  en: "Sent",      cls: "statusSent" },
  paid:      { ar: "مدفوعة", en: "Paid",      cls: "statusPaid" },
  partial:   { ar: "مدفوعة جزئيًا", en: "Partially paid", cls: "statusPartial" },
  cancelled: { ar: "ملغاة",  en: "Cancelled", cls: "statusCancelled" },
};

const PAY_KIND: Record<string, { ar: string; en: string }> = {
  bank:          { ar: "تحويل بنكي",     en: "Bank transfer" },
  western_union: { ar: "ويسترن يونيون",  en: "Western Union" },
  paypal:        { ar: "باي بال",        en: "PayPal" },
  stripe:        { ar: "دفع إلكتروني",   en: "Card / Stripe" },
  custom:        { ar: "وسيلة أخرى",     en: "Other method" },
};

const T = {
  invoice:      { ar: "فاتورة", en: "Invoice" },
  number:       { ar: "رقم الفاتورة", en: "Invoice No." },
  issued:       { ar: "تاريخ الإصدار", en: "Issue date" },
  due:          { ar: "تاريخ الاستحقاق", en: "Due date" },
  from:         { ar: "الجهة المُصدِرة", en: "From" },
  to:           { ar: "فاتورة إلى", en: "Billed to" },
  item:         { ar: "الوصف", en: "Description" },
  qty:          { ar: "الكمية", en: "Qty" },
  price:        { ar: "السعر", en: "Unit price" },
  lineTotal:    { ar: "الإجمالي", en: "Amount" },
  subtotal:     { ar: "المجموع الفرعي", en: "Subtotal" },
  extras:       { ar: "تكاليف إضافية", en: "Additional costs" },
  discount:     { ar: "الخصم", en: "Discount" },
  vat:          { ar: "ضريبة القيمة المضافة", en: "VAT" },
  total:        { ar: "الإجمالي المستحق", en: "Total due" },
  paidBefore:   { ar: "المدفوع سابقًا", en: "Already paid" },
  balance:      { ar: "المتبقي", en: "Remaining balance" },
  exempt:       { ar: "غير خاضعة لضريبة القيمة المضافة", en: "Not subject to VAT" },
  payTitle:     { ar: "طرق السداد", en: "How to pay" },
  payHint: {
    ar: "اختر الوسيلة الأنسب لك. يُرجى ذكر رقم الفاتورة في بيان التحويل، وإرسال إشعار السداد بعد التحويل.",
    en: "Choose whichever method suits you. Please quote the invoice number in the transfer reference and send us the receipt afterwards.",
  },
  print:        { ar: "طباعة / حفظ PDF", en: "Print / Save PDF" },
  whatsapp:     { ar: "تواصل عبر واتساب", en: "Contact on WhatsApp" },
  copy:         { ar: "نسخ", en: "Copy" },
  copied:       { ar: "تم النسخ", en: "Copied" },
  payNow:       { ar: "ادفع الآن", en: "Pay now" },
  thanksFallback: { ar: "شكرًا لثقتكم.", en: "Thank you for your business." },
  legal: {
    ar: "هذه الفاتورة صادرة إلكترونيًا وصالحة دون توقيع أو ختم. الرابط خاص بالعميل المذكور أعلاه.",
    en: "This invoice is issued electronically and is valid without signature or stamp. This link is private to the client named above.",
  },
  fields: {
    accountHolder: { ar: "اسم صاحب الحساب", en: "Account holder" },
    bankName:      { ar: "البنك", en: "Bank" },
    accountNumber: { ar: "رقم الحساب", en: "Account number" },
    iban:          { ar: "الآيبان", en: "IBAN" },
    swift:         { ar: "السويفت", en: "SWIFT" },
    country:       { ar: "الدولة", en: "Country" },
    identifier:    { ar: "المعرّف", en: "Identifier" },
  },
};

function fmtMoney(n: number) {
  return (Number(n) || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtDate(value: string, lang: Lang) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  /* تقويم ميلادي بأرقام لاتينية في الحالتين: أوضح للمراجعة المحاسبية
     ولا يتغيّر معناه بين جهاز وآخر. */
  return d.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    numberingSystem: "latn",
  });
}

/* ── حقل قابل للنسخ ──────────────────────────────────────────────────────── */
function CopyField({ label, value, lang }: { label: string; value: string; lang: Lang }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* المتصفحات القديمة وسياقات غير HTTPS: نعود إلى التحديد اليدوي */
      const el = document.createElement("textarea");
      el.value = value;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      try { document.execCommand("copy"); } catch { /* لا شيء نفعله */ }
      document.body.removeChild(el);
    }
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };

  return (
    <div className={s.field}>
      <span className={s.fieldLabel}>{label}</span>
      <span className={s.fieldValueWrap}>
        <span className={s.fieldValue}>{value}</span>
        <button
          type="button"
          onClick={copy}
          className={`${s.copyBtn} ${done ? s.copied : ""} ${s.noPrint}`}
          aria-label={`${done ? T.copied[lang] : T.copy[lang]} — ${label}`}
          title={done ? T.copied[lang] : T.copy[lang]}
        >
          {done ? "✓" : "⧉"}
        </button>
      </span>
    </div>
  );
}

function PaymentCard({ option, lang }: { option: PublicPaymentOption; lang: Lang }) {
  const label =
    lang === "en" ? option.labelEn || option.label : option.label || option.labelEn || "";
  const note = lang === "en" ? option.instructionsEn || option.instructions : option.instructions;

  const fields: { label: string; value: string }[] = [];
  const push = (key: keyof typeof T.fields, value?: string) => {
    if (value && value.trim()) fields.push({ label: T.fields[key][lang], value: value.trim() });
  };
  push("accountHolder", option.accountHolder);
  push("bankName", option.bankName);
  push("accountNumber", option.accountNumber);
  push("iban", option.iban);
  push("swift", option.swift);
  push("country", option.country);
  push("identifier", option.identifier);

  return (
    <div className={s.payCard}>
      <div className={s.payHead}>
        <span className={s.payKind}>{PAY_KIND[option.kind]?.[lang] ?? option.kind}</span>
        <span className={s.payTitle}>{label}</span>
      </div>

      {fields.map((f) => (
        <CopyField key={f.label + f.value} label={f.label} value={f.value} lang={lang} />
      ))}

      {note && <p className={s.payNote}>{note}</p>}

      {option.link && (
        <a
          className={`${s.payLink} ${s.noPrint}`}
          href={option.link}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {T.payNow[lang]} ↗
        </a>
      )}
    </div>
  );
}

export default function PublicInvoice({ invoice }: { invoice: PublicInvoiceData }) {
  const [lang, setLang] = useState<Lang>("ar");
  const dir = lang === "ar" ? "rtl" : "ltr";

  const currency = CURRENCY_LABEL[invoice.currency]?.[lang] ?? invoice.currency;
  const status = STATUS[invoice.status];
  const title = lang === "en" ? invoice.titleEn || invoice.titleAr : invoice.titleAr || invoice.titleEn;
  const notes = lang === "en" ? invoice.notes || invoice.notesAr : invoice.notesAr || invoice.notes;
  const thanks =
    (lang === "en" ? invoice.thankYouEn || invoice.thankYouAr : invoice.thankYouAr || invoice.thankYouEn) ||
    T.thanksFallback[lang];

  const extrasTotal = (invoice.additionalCosts ?? []).reduce((sum, c) => sum + (Number(c.amount) || 0), 0);
  const discountAmount = Number(invoice.discountAmount) || 0;
  const paid = Number(invoice.totalPaid) || 0;
  const balance = invoice.remainingBalance ?? (paid > 0 ? invoice.total - paid : 0);

  const whatsappHref = `https://wa.me/${AGENCY_INFO.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    lang === "ar"
      ? `السلام عليكم، بخصوص الفاتورة رقم ${invoice.number}`
      : `Hello, regarding invoice ${invoice.number}`
  )}`;

  return (
    <div className={s.page} dir={dir} lang={lang}>
      {/* ── شريط الأدوات ── */}
      <div className={`${s.toolbar} ${s.noPrint}`}>
        <div className={s.langSwitch} role="group" aria-label="Language">
          <button
            type="button"
            onClick={() => setLang("ar")}
            className={`${s.langBtn} ${lang === "ar" ? s.langBtnActive : ""}`}
            aria-pressed={lang === "ar"}
          >
            العربية
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`${s.langBtn} ${lang === "en" ? s.langBtnActive : ""}`}
            aria-pressed={lang === "en"}
          >
            EN
          </button>
        </div>

        <div className={s.toolbarGroup}>
          <a className={s.btn} href={whatsappHref} target="_blank" rel="noopener noreferrer">
            {T.whatsapp[lang]}
          </a>
          <button type="button" className={`${s.btn} ${s.btnPrimary}`} onClick={() => window.print()}>
            {T.print[lang]}
          </button>
        </div>
      </div>

      {/* ── ورقة الفاتورة ── */}
      <article className={s.sheet}>
        <div className={s.inner}>
          <header className={s.header}>
            <div>
              <Image
                src={invoice.logoUrl || "/logo-ink.png"}
                alt={AGENCY_INFO.name}
                width={320}
                height={115}
                className={s.logo}
                priority
                unoptimized
              />
              <div className={s.brandLine}>{AGENCY_INFO.nameEn}</div>
            </div>

            <div className={s.headMeta}>
              <h1 className={s.docLabel}>{T.invoice[lang]}</h1>
              <div className={s.metaRow}>
                <span>{T.number[lang]}</span>
                <strong>{invoice.number}</strong>
              </div>
              <div className={s.metaRow}>
                <span>{T.issued[lang]}</span>
                <strong>{fmtDate(invoice.issueDate, lang)}</strong>
              </div>
              {invoice.dueDate && (
                <div className={s.metaRow}>
                  <span>{T.due[lang]}</span>
                  <strong>{fmtDate(invoice.dueDate, lang)}</strong>
                </div>
              )}
              {status && (
                <div>
                  <span className={`${s.statusPill} ${s[status.cls]}`}>{status[lang]}</span>
                </div>
              )}
            </div>
          </header>

          {/* ── الأطراف ── */}
          <section className={s.parties}>
            <div>
              <p className={s.partyLabel}>{T.from[lang]}</p>
              <p className={s.partyName}>{AGENCY_INFO.name}</p>
              <p className={s.partyDetail}>
                {lang === "en" ? AGENCY_INFO.addressEn : AGENCY_INFO.address}
              </p>
              <p className={s.partyDetail} dir="ltr">{AGENCY_INFO.email}</p>
              <p className={s.partyDetail} dir="ltr">{AGENCY_INFO.phone}</p>
            </div>

            <div>
              <p className={s.partyLabel}>{T.to[lang]}</p>
              <p className={s.partyName}>{invoice.clientName}</p>
              {invoice.clientCompany && <p className={s.partyDetail}>{invoice.clientCompany}</p>}
              {invoice.clientEmail && <p className={s.partyDetail} dir="ltr">{invoice.clientEmail}</p>}
              {invoice.clientPhone && <p className={s.partyDetail} dir="ltr">{invoice.clientPhone}</p>}
            </div>
          </section>

          {title && <h2 className={s.title}>{title}</h2>}

          {/* ── البنود ── */}
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>{T.item[lang]}</th>
                  <th className={s.numHead}>{T.qty[lang]}</th>
                  <th className={s.numHead}>{T.price[lang]}</th>
                  <th className={s.numHead}>{T.lineTotal[lang]}</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, i) => {
                  const name = lang === "en" ? item.descEn || item.descAr : item.descAr || item.descEn;
                  return (
                    <tr key={item.id || i}>
                      <td>
                        <div className={s.itemName}>{name}</div>
                      </td>
                      <td className={s.num}>{item.qty}</td>
                      <td className={s.num}>{fmtMoney(item.unitPrice)}</td>
                      <td className={s.num}>{fmtMoney(item.total)}</td>
                    </tr>
                  );
                })}

                {(invoice.additionalCosts ?? []).map((cost, i) => (
                  <tr key={cost.id || `cost-${i}`}>
                    <td>
                      <div className={s.itemName}>
                        {lang === "en" ? cost.descEn || cost.descAr : cost.descAr || cost.descEn}
                      </div>
                      <div className={s.itemDesc}>{T.extras[lang]}</div>
                    </td>
                    <td className={s.num}>1</td>
                    <td className={s.num}>{fmtMoney(cost.amount)}</td>
                    <td className={s.num}>{fmtMoney(cost.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── الملخّص ── */}
          <div className={s.summary}>
            <div className={s.sumRow}>
              <span className={s.sumLabel}>{T.subtotal[lang]}</span>
              <span className={s.sumValue}>{fmtMoney(invoice.subtotal)} {currency}</span>
            </div>

            {extrasTotal > 0 && (
              <div className={s.sumRow}>
                <span className={s.sumLabel}>{T.extras[lang]}</span>
                <span className={s.sumValue}>{fmtMoney(extrasTotal)} {currency}</span>
              </div>
            )}

            {discountAmount > 0 && (
              <div className={s.sumRow}>
                <span className={s.sumLabel}>
                  {T.discount[lang]}
                  {invoice.discountType === "percent" && invoice.discount
                    ? ` (${invoice.discount}%)`
                    : ""}
                </span>
                <span className={`${s.sumValue} ${s.discountValue}`}>
                  −{fmtMoney(discountAmount)} {currency}
                </span>
              </div>
            )}

            {!invoice.vatExempt && (
              <div className={s.sumRow}>
                <span className={s.sumLabel}>
                  {T.vat[lang]} ({invoice.vatRate}%)
                </span>
                <span className={s.sumValue}>{fmtMoney(invoice.vat)} {currency}</span>
              </div>
            )}

            {invoice.vatExempt && <p className={s.exemptNote}>{T.exempt[lang]}</p>}

            <div className={s.grandTotal}>
              <span className={s.grandLabel}>{T.total[lang]}</span>
              <span className={s.grandValue}>{fmtMoney(invoice.total)} {currency}</span>
            </div>

            {paid > 0 && (
              <>
                <div className={s.sumRow}>
                  <span className={s.sumLabel}>{T.paidBefore[lang]}</span>
                  <span className={s.sumValue}>{fmtMoney(paid)} {currency}</span>
                </div>
                <div className={s.balanceRow}>
                  <span>{T.balance[lang]}</span>
                  <span className={s.sumValue}>{fmtMoney(balance)} {currency}</span>
                </div>
              </>
            )}
          </div>

          {/* ── طرق السداد ── */}
          {invoice.paymentOptions.length > 0 && (
            <section className={s.sectionHead}>
              <h2 className={s.sectionTitle}>{T.payTitle[lang]}</h2>
              <p className={s.sectionHint}>{T.payHint[lang]}</p>
              <div className={s.payGrid}>
                {invoice.paymentOptions.map((option) => (
                  <PaymentCard key={option.id} option={option} lang={lang} />
                ))}
              </div>
            </section>
          )}

          {/* ── التذييل ── */}
          <footer className={s.footer}>
            <div>
              <p className={s.thanks}>{thanks}</p>
              {notes && <p className={s.footNote} style={{ marginTop: "10px" }}>{notes}</p>}
            </div>
            <div>
              <p className={s.footNote}>
                {AGENCY_INFO.name}
                <br />
                <span dir="ltr">{AGENCY_INFO.email}</span>
                <br />
                <span dir="ltr">{AGENCY_INFO.phone}</span>
              </p>
            </div>
          </footer>
        </div>
      </article>

      <p className={s.legal}>{T.legal[lang]}</p>
    </div>
  );
}
