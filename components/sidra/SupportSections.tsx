"use client";

/* أقسام الدعم: التحديثات + العروض + الدعم الفني + الأسئلة + حل المشكلات + CTA النهائي */

import { useMemo, useState } from "react";
import {
  SIDRA_INFO,
  CHANGELOG,
  SUPPORT_PLANS,
  SUPPORT_POLICY,
  SIDRA_FAQ,
  TROUBLESHOOTING,
  SIDRA_VIDEOS,
  THEME_REVIEWS,
  type ChangeType,
} from "@/lib/sidra-data";
import { DocsSection, SectionHeading, NoticeBox, RelatedLinks, CopyButton, Pill, Accordion } from "./ui";

/* ─── سجل التحديثات ──────────────────────────────────────────────────── */
const CHANGE_COLORS: Record<ChangeType, { bg: string; text: string }> = {
  "جديد": { bg: "#f4f8f2", text: "#3a5a34" },
  "تحسين": { bg: "#f2f6fa", text: "#2c4a63" },
  "إصلاح": { bg: "#fdf3f0", text: "#8a3a22" },
  "أمان": { bg: "#fbf0f0", text: "#8f2325" },
  "أداء": { bg: "#f3f3f8", text: "#3f3f6e" },
  "تصميم": { bg: "#faf5ea", text: "#7a5d10" },
  "توافق": { bg: "#f1f7f7", text: "#2b5c5c" },
};

export function ChangelogSection() {
  const [filter, setFilter] = useState<ChangeType | "الكل">("الكل");
  const types = useMemo(() => {
    const set = new Set<ChangeType>();
    CHANGELOG.forEach((c) => c.changes.forEach((x) => set.add(x.type)));
    return ["الكل", ...set] as (ChangeType | "الكل")[];
  }, []);

  return (
    <DocsSection id="changelog" tone="tinted">
      <SectionHeading
        id="changelog"
        kicker="سجل التحديثات"
        title="كل إصدار موثق"
        desc="التحديثات تصلك عبر منصة سلة. اقرأ ملاحظات الإصدار هنا قبل التحديث لتعرف الجديد وما إذا كان يلزمك إجراء."
      />

      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="فلترة التحديثات">
        {types.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={filter === t}
            onClick={() => setFilter(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-black transition ${
              filter === t ? "bg-[#211711] text-white" : "border border-[#eadfd4] bg-white text-[#6d5f55]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {CHANGELOG.map((entry) => {
          const changes = filter === "الكل" ? entry.changes : entry.changes.filter((c) => c.type === filter);
          if (!changes.length) return null;
          return (
            <div key={entry.version} className="rounded-3xl border border-[#eadfd4] bg-white p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#a51218] px-4 py-1.5 text-sm font-black text-white">v{entry.version}</span>
                <h3 className="font-black text-[#211711]">{entry.title}</h3>
                <span className="ms-auto text-sm font-bold text-[#a58f7e]">{entry.date}</span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {changes.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-7 text-[#5f5148]">
                    <span
                      className="mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-black"
                      style={{ background: CHANGE_COLORS[c.type].bg, color: CHANGE_COLORS[c.type].text }}
                    >
                      {c.type}
                    </span>
                    {c.text}
                  </li>
                ))}
              </ul>
              {entry.actionRequired ? <NoticeBox kind="important">إجراء مطلوب: {entry.actionRequired}</NoticeBox> : null}
            </div>
          );
        })}
      </div>

      <NoticeBox kind="tip">قبل أي تحديث كبير: وثّق إعداداتك المهمة بلقطات شاشة، خاصة إن كنت عدّلت الألوان يدويًا.</NoticeBox>
      <RelatedLinks next={{ id: "offers", label: "العروض والخصومات" }} />
    </DocsSection>
  );
}

/* ─── العروض والخصومات ───────────────────────────────────────────────── */
export function OffersSection({ orderHref }: { orderHref: string }) {
  const { offer, price, originalPrice, currency } = SIDRA_INFO;
  const cur = currency === "SAR" ? "ر.س" : currency;

  /* حساب حالة انتهاء العرض من تاريخ حقيقي فقط */
  const expired = offer.enabled && offer.endDate ? new Date(offer.endDate).getTime() < Date.now() : false;
  const activeOffer = offer.enabled && !expired;

  return (
    <DocsSection id="offers">
      <SectionHeading
        id="offers"
        kicker="العروض والخصومات"
        title="عروض ثيم سِدرة"
        desc="العروض هنا حقيقية ومرتبطة بتواريخ فعلية — عند انتهاء العرض يختفي تلقائيًا ولا نستخدم عدادات وهمية."
      />

      {activeOffer ? (
        <div className="overflow-hidden rounded-[30px] border border-[#F0B100]/40 bg-[linear-gradient(135deg,#fbf7f2,#faf3e3)] p-8">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex-1">
              {offer.discountLabel ? (
                <span className="rounded-full bg-[#a51218] px-4 py-1.5 text-sm font-black text-white">{offer.discountLabel}</span>
              ) : null}
              <div className="mt-4 flex items-baseline gap-3">
                {price !== null ? (
                  <span className="text-4xl font-black text-[#211711]">
                    {price} <span className="text-lg">{cur}</span>
                  </span>
                ) : null}
                {originalPrice !== null ? <span className="text-xl text-[#a58f7e] line-through">{originalPrice} {cur}</span> : null}
              </div>
              {offer.endDate ? <p className="mt-2 text-sm font-bold text-[#8a3a22]">ينتهي العرض في {offer.endDate}</p> : null}
              {offer.terms ? <p className="mt-2 text-sm leading-7 text-[#6d5f55]">{offer.terms}</p> : null}
            </div>
            <div className="flex flex-col gap-3">
              {offer.couponCode ? (
                <div className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-[#F0B100] bg-white px-5 py-3">
                  <span className="font-mono text-lg font-black tracking-widest text-[#211711]">{offer.couponCode}</span>
                  <CopyButton text={offer.couponCode} label="نسخ الكود" />
                </div>
              ) : null}
              <a
                href={SIDRA_INFO.buyUrl || orderHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#a51218] px-8 py-4 text-center font-black text-white shadow-[0_18px_50px_rgba(165,18,24,0.22)] transition hover:-translate-y-0.5"
              >
                استفد من العرض الآن
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-[30px] border border-[#eadfd4] bg-white p-10 text-center">
          <p className="text-4xl" aria-hidden>٪</p>
          <h3 className="mt-3 text-xl font-black text-[#211711]">لا يوجد عرض فعّال حاليًا</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-8 text-[#6d5f55]">
            {expired
              ? "انتهى العرض السابق. تابعنا أو تواصل معنا لتصلك العروض القادمة أول بأول."
              : "تُعلن عروض سِدرة في المواسم والمناسبات. تواصل معنا لمعرفة أقرب عرض قادم."}
          </p>
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full bg-[#211711] px-7 py-3.5 font-black text-white transition hover:-translate-y-0.5"
          >
            اسأل عن العروض القادمة
          </a>
        </div>
      )}

      <RelatedLinks next={{ id: "support", label: "الدعم الفني" }} />
    </DocsSection>
  );
}

/* ─── الدعم الفني ────────────────────────────────────────────────────── */
const ISSUE_TYPES = ["مشكلة في مكوّن", "مشكلة في الهيدر أو الفوتر", "مشكلة صور أو مقاسات", "مشكلة على الجوال", "استفسار إعدادات", "طلب تخصيص خاص", "أخرى"];
const PRIORITIES = ["عادية", "مهمة", "عاجلة — المتجر متأثر"];

export function SupportSection({ whatsappBase, email }: { whatsappBase: string; email: string }) {
  const [form, setForm] = useState({
    name: "",
    storeUrl: "",
    orderNo: "",
    issueType: ISSUE_TYPES[0],
    component: "",
    desc: "",
    steps: "",
    device: "",
    priority: PRIORITIES[0],
    agree: false,
  });
  const [error, setError] = useState("");

  const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const buildMessage = () =>
    [
      "🎫 تذكرة دعم — ثيم سِدرة",
      `الاسم: ${form.name}`,
      form.orderNo ? `رقم الطلب: ${form.orderNo}` : "",
      `رابط المتجر: ${form.storeUrl}`,
      `نوع المشكلة: ${form.issueType}`,
      form.component ? `المكوّن المتأثر: ${form.component}` : "",
      `الوصف: ${form.desc}`,
      form.steps ? `خطوات التكرار: ${form.steps}` : "",
      form.device ? `الجهاز والمتصفح: ${form.device}` : "",
      `الأولوية: ${form.priority}`,
      "(سأرفق لقطة شاشة أو فيديو للمشكلة في الرسالة التالية)",
    ]
      .filter(Boolean)
      .join("\n");

  const submit = () => {
    if (!form.name.trim() || !form.storeUrl.trim() || !form.desc.trim()) {
      setError("الاسم ورابط المتجر ووصف المشكلة حقول أساسية لنستطيع مساعدتك.");
      return;
    }
    if (!form.agree) {
      setError("فضلًا وافق على سياسة الدعم قبل الإرسال.");
      return;
    }
    setError("");
    window.open(`${whatsappBase.split("?")[0]}?text=${encodeURIComponent(buildMessage())}`, "_blank", "noopener");
  };

  const inputCls =
    "w-full rounded-xl border border-[#eadfd4] bg-white px-4 py-3 text-sm text-[#211711] outline-none transition focus:border-[#a51218]/40";

  return (
    <DocsSection id="support" tone="tinted">
      <SectionHeading
        id="support"
        kicker="الدعم الفني"
        title="دعم واضح… بلا مفاجآت"
        desc={`قنوات الدعم: واتساب والبريد الإلكتروني. أوقات العمل: ${SUPPORT_POLICY.workHours}.`}
      />

      {/* يشمل / لا يشمل */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-[#cfe0c8] bg-[#f4f8f2] p-6">
          <h3 className="mb-3 font-black text-[#3a5a34]">✓ ما يشمله الدعم</h3>
          <ul className="space-y-2 text-sm leading-7 text-[#3c5a36]">
            {SUPPORT_POLICY.includes.map((x) => (
              <li key={x} className="flex gap-2"><span aria-hidden>—</span>{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-[#eadfd4] bg-white p-6">
          <h3 className="mb-3 font-black text-[#8a3a22]">✕ ما لا يشمله الدعم</h3>
          <ul className="space-y-2 text-sm leading-7 text-[#6d5f55]">
            {SUPPORT_POLICY.excludes.map((x) => (
              <li key={x} className="flex gap-2"><span aria-hidden>—</span>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* الباقات */}
      <h3 className="mb-4 text-xl font-black text-[#211711]">باقات الدعم</h3>
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        {SUPPORT_PLANS.map((p) => (
          <div
            key={p.name}
            className={`rounded-3xl border-2 p-6 ${p.featured ? "border-[#a51218]/40 bg-white shadow-[0_16px_45px_rgba(165,18,24,0.08)]" : "border-[#eadfd4] bg-white"}`}
          >
            {p.featured ? <Pill tone="red">مشمول مع الثيم</Pill> : null}
            <h4 className="mt-2 text-lg font-black text-[#211711]">{p.name}</h4>
            <p className="text-sm font-bold text-[#a58f7e]">{p.desc}</p>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[#5f5148]">
              {p.items.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="text-[#F0B100]" aria-hidden>✓</span>
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-[#f0e6dc] pt-3 text-sm font-black text-[#a51218]">{p.priceNote}</p>
          </div>
        ))}
      </div>

      {/* نموذج التذكرة */}
      <h3 className="mb-2 text-xl font-black text-[#211711]">افتح تذكرة دعم</h3>
      <p className="mb-5 text-sm leading-7 text-[#6d5f55]">
        النموذج يجهّز رسالة منظمة ويفتحها في واتساب — لا تُرسل بياناتك لأي مكان آخر. لا تضع بيانات
        حساسة (كلمات مرور أو بيانات دفع) في أي رسالة دعم.
      </p>

      <div className="rounded-3xl border border-[#eadfd4] bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-black text-[#211711]">
            الاسم *
            <input className={`mt-1.5 ${inputCls}`} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="اسمك الكامل" />
          </label>
          <label className="block text-sm font-black text-[#211711]">
            رابط المتجر *
            <input className={`mt-1.5 ${inputCls}`} dir="ltr" value={form.storeUrl} onChange={(e) => set("storeUrl", e.target.value)} placeholder="https://store.example.com" />
          </label>
          <label className="block text-sm font-black text-[#211711]">
            رقم الطلب (إن وجد)
            <input className={`mt-1.5 ${inputCls}`} value={form.orderNo} onChange={(e) => set("orderNo", e.target.value)} placeholder="اختياري" />
          </label>
          <label className="block text-sm font-black text-[#211711]">
            نوع المشكلة
            <select className={`mt-1.5 ${inputCls}`} value={form.issueType} onChange={(e) => set("issueType", e.target.value)}>
              {ISSUE_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-black text-[#211711]">
            المكوّن المتأثر (إن عرفته)
            <input className={`mt-1.5 ${inputCls}`} value={form.component} onChange={(e) => set("component", e.target.value)} placeholder="مثال: السلايدر الرئيسي" />
          </label>
          <label className="block text-sm font-black text-[#211711]">
            الجهاز والمتصفح
            <input className={`mt-1.5 ${inputCls}`} value={form.device} onChange={(e) => set("device", e.target.value)} placeholder="مثال: آيفون 15 — سفاري" />
          </label>
          <label className="block text-sm font-black text-[#211711] sm:col-span-2">
            وصف المشكلة *
            <textarea className={`mt-1.5 min-h-24 ${inputCls}`} value={form.desc} onChange={(e) => set("desc", e.target.value)} placeholder="ماذا توقعت أن يحدث؟ وماذا حدث فعلًا؟" />
          </label>
          <label className="block text-sm font-black text-[#211711] sm:col-span-2">
            خطوات تكرار المشكلة
            <textarea className={`mt-1.5 min-h-20 ${inputCls}`} value={form.steps} onChange={(e) => set("steps", e.target.value)} placeholder="1) فتحت… 2) ضغطت… 3) ظهرت المشكلة" />
          </label>
          <label className="block text-sm font-black text-[#211711]">
            الأولوية
            <select className={`mt-1.5 ${inputCls}`} value={form.priority} onChange={(e) => set("priority", e.target.value)}>
              {PRIORITIES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-5 flex items-start gap-3 text-sm leading-7 text-[#5f5148]">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) => set("agree", e.target.checked)}
            className="mt-1.5 h-4 w-4 accent-[#a51218]"
          />
          أوافق على سياسة الدعم أعلاه، وأفهم أن المشكلات خارج نطاق الثيم قد تُحوَّل لدعم سلة أو لخدمة تخصيص مستقلة.
        </label>

        {error ? <p role="alert" className="mt-3 rounded-xl bg-[#fbf0f0] p-3 text-sm font-bold text-[#8f2325]">{error}</p> : null}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={submit}
            className="rounded-full bg-[#a51218] px-7 py-3.5 font-black text-white shadow-[0_18px_50px_rgba(165,18,24,0.22)] transition hover:-translate-y-0.5 hover:bg-[#8f0f14]"
          >
            إرسال عبر واتساب
          </button>
          <a
            href={`mailto:${email}?subject=${encodeURIComponent("تذكرة دعم — ثيم سِدرة")}&body=${encodeURIComponent(buildMessage())}`}
            className="rounded-full border border-[#eadfd4] bg-white px-7 py-3.5 font-bold text-[#211711] transition hover:border-[#a51218]/35"
          >
            أو أرسل عبر البريد
          </a>
        </div>
      </div>

      <NoticeBox kind="tip">
        لتسريع الحل أرفق دائمًا: {SUPPORT_POLICY.ticketData.join("، ")}.
      </NoticeBox>

      <RelatedLinks next={{ id: "faq", label: "الأسئلة الشائعة" }} related={[{ id: "troubleshooting", label: "جرّب حل المشكلة بنفسك" }]} />
    </DocsSection>
  );
}

/* ─── الأسئلة الشائعة ────────────────────────────────────────────────── */
export function FaqSection() {
  const [cat, setCat] = useState("الكل");
  const cats = useMemo(() => ["الكل", ...new Set(SIDRA_FAQ.map((f) => f.cat))], []);
  const list = cat === "الكل" ? SIDRA_FAQ : SIDRA_FAQ.filter((f) => f.cat === cat);

  return (
    <DocsSection id="faq">
      <SectionHeading id="faq" kicker="الأسئلة الشائعة" title="إجابات مباشرة على ما يُسأل فعلًا" />
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="تصنيفات الأسئلة">
        {cats.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-black transition ${
              cat === c ? "bg-[#a51218] text-white" : "border border-[#eadfd4] bg-white text-[#6d5f55]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-3">
        {list.map((f) => (
          <Accordion key={f.q} title={f.q} summary={cat === "الكل" ? f.cat : undefined}>
            {f.a}
          </Accordion>
        ))}
      </div>
      <RelatedLinks next={{ id: "troubleshooting", label: "حل المشكلات" }} related={[{ id: "support", label: "لم تجد سؤالك؟ اسأل الدعم" }]} />
    </DocsSection>
  );
}

/* ─── حل المشكلات ────────────────────────────────────────────────────── */
export function TroubleshootingSection({ supportHref }: { supportHref: string }) {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const n = q.trim();
    if (!n) return TROUBLESHOOTING;
    return TROUBLESHOOTING.filter((t) => `${t.problem} ${t.cause} ${t.fix.join(" ")}`.includes(n));
  }, [q]);

  return (
    <DocsSection id="troubleshooting" tone="tinted">
      <SectionHeading
        id="troubleshooting"
        kicker="تشخيص المشكلات"
        title="المشكلة… سببها… وحلها خطوة بخطوة"
        desc="ابدأ بالبحث عن مشكلتك — أغلب المشكلات الشائعة تُحل خلال دقيقتين دون انتظار الدعم."
      />

      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="ابحث في المشكلات: صورة، سلايدر، جوال، كاش…"
        aria-label="البحث في حلول المشكلات"
        className="mb-6 w-full rounded-2xl border border-[#eadfd4] bg-white px-5 py-3.5 text-base text-[#211711] outline-none transition focus:border-[#a51218]/40"
      />

      {list.length === 0 ? (
        <div className="rounded-3xl border border-[#eadfd4] bg-white p-10 text-center">
          <p className="font-black text-[#211711]">لم نجد مشكلة مطابقة لـ «{q}»</p>
          <a href={supportHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-full bg-[#a51218] px-6 py-3 font-black text-white">
            افتح تذكرة دعم وسنساعدك
          </a>
        </div>
      ) : (
        <div className="grid gap-3">
          {list.map((t) => (
            <Accordion key={t.problem} title={t.problem} summary={`السبب المحتمل: ${t.cause}`}>
              <ol className="list-decimal space-y-1.5 ps-5">
                {t.fix.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ol>
              {t.escalate ? (
                <p className="mt-3 rounded-xl bg-[#fbf7f2] p-3 text-sm">
                  <strong className="text-[#a51218]">متى تتواصل مع الدعم؟ </strong>
                  {t.escalate}
                </p>
              ) : null}
            </Accordion>
          ))}
        </div>
      )}

      <RelatedLinks related={[{ id: "support", label: "الدعم الفني" }, { id: "faq", label: "الأسئلة الشائعة" }]} />
    </DocsSection>
  );
}

/* ─── فيديوهات + آراء (حالات فارغة صادقة) ───────────────────────────── */
export function ExtrasSection() {
  return (
    <DocsSection id="extras">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-dashed border-[#d8c9bc] bg-white p-8 text-center">
          <p className="text-3xl" aria-hidden>▶</p>
          <h3 className="mt-3 font-black text-[#211711]">مركز الفيديوهات التعليمية</h3>
          {SIDRA_VIDEOS.length === 0 ? (
            <p className="mx-auto mt-2 max-w-sm text-sm leading-8 text-[#6d5f55]">
              الشروحات المرئية قيد الإعداد وستُضاف هنا تباعًا. حتى ذلك الحين، التوثيق المكتوب أعلاه
              يغطي كل خطوة بالتفصيل.
            </p>
          ) : null}
        </div>
        <div className="rounded-3xl border border-dashed border-[#d8c9bc] bg-white p-8 text-center">
          <p className="text-3xl" aria-hidden>★</p>
          <h3 className="mt-3 font-black text-[#211711]">آراء عملاء سِدرة</h3>
          {THEME_REVIEWS.length === 0 ? (
            <p className="mx-auto mt-2 max-w-sm text-sm leading-8 text-[#6d5f55]">
              نعرض هنا آراء حقيقية فقط من متاجر تستخدم الثيم فعلًا — ولا ننشر تقييمات وهمية. كن أول
              من يشارك تجربته بعد إطلاق متجرك.
            </p>
          ) : null}
        </div>
      </div>
    </DocsSection>
  );
}

/* ─── CTA النهائي ────────────────────────────────────────────────────── */
export function FinalCTA({ orderHref, customHref }: { orderHref: string; customHref: string }) {
  const hasPrice = SIDRA_INFO.price !== null;
  const cur = SIDRA_INFO.currency === "SAR" ? "ر.س" : SIDRA_INFO.currency;

  return (
    <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
      <div className="relative overflow-hidden rounded-[36px] bg-[#211711] p-8 text-white shadow-[0_28px_80px_rgba(33,23,17,0.2)] sm:p-12">
        <div aria-hidden className="pointer-events-none absolute -top-24 end-0 h-72 w-72 rounded-full bg-[#F0B100]/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 start-0 h-72 w-72 rounded-full bg-[#a51218]/25 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-black text-[#e5c38f]">جاهز تطلق متجرك؟</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black leading-snug sm:text-4xl">
            ثيم فاخر، توثيق كامل، ودعم يقف معك — كلها في سِدرة
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-9 text-white/70">
            يشمل الشراء: الثيم كاملًا بكل مكوناته، التحديثات الأساسية، والدعم الأساسي (تثبيت، إصلاح
            مشكلات الثيم، وإجابة استفسارات الإعداد).
          </p>

          {hasPrice ? (
            <p className="mt-5 text-3xl font-black">
              {SIDRA_INFO.price} <span className="text-lg">{cur}</span>
              {SIDRA_INFO.originalPrice !== null ? (
                <span className="ms-3 text-xl font-bold text-white/50 line-through">{SIDRA_INFO.originalPrice} {cur}</span>
              ) : null}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={SIDRA_INFO.buyUrl || orderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-black text-[#211711] transition hover:-translate-y-0.5"
            >
              {hasPrice ? "شراء ثيم سِدرة" : "اطلب ثيم سِدرة الآن"}
            </a>
            <a
              href={customHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              اطلب تخصيصًا خاصًا
            </a>
            <a
              href="#support"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 font-bold text-white/70 underline decoration-[#F0B100] decoration-2 underline-offset-8 transition hover:text-white"
            >
              راجع سياسة الدعم
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
