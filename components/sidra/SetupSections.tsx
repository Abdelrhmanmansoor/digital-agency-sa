"use client";

/* أقسام الإعداد: البدء السريع + الهوية + الهيدر + الفوتر + الجوال + التخصيص */

import { useEffect, useState } from "react";
import {
  QUICK_START,
  IDENTITY_GUIDE,
  HEADER_GUIDE,
  FOOTER_GUIDE,
  MOBILE_GUIDE,
  NO_CODE_TASKS,
  ADVANCED_GUIDE,
} from "@/lib/sidra-data";
import { DocsSection, SectionHeading, NoticeBox, RelatedLinks, Accordion, Pill } from "./ui";

const CHECKLIST_KEY = "sidra-quickstart-v1";

/* ─── البدء السريع (Checklist تفاعلية تُحفظ محليًا) ─────────────────── */
export function QuickStartSection() {
  const [done, setDone] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_KEY);
      if (saved) setDone(JSON.parse(saved));
    } catch {
      /* تجاهل — المتصفح يمنع التخزين */
    }
    setLoaded(true);
  }, []);

  const toggle = (n: number) => {
    const next = done.includes(n) ? done.filter((x) => x !== n) : [...done, n];
    setDone(next);
    try {
      localStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
    } catch {
      /* تجاهل */
    }
  };

  const progress = Math.round((done.length / QUICK_START.length) * 100);

  return (
    <DocsSection id="quick-start" tone="tinted">
      <SectionHeading
        id="quick-start"
        kicker="البدء السريع"
        title="ابدأ مع سِدرة خلال دقائق"
        desc="عشر خطوات من التفعيل حتى النشر. علّم على كل خطوة تنهيها — تقدمك يُحفظ في متصفحك تلقائيًا."
      />

      {/* شريط التقدم */}
      <div className="mb-8 rounded-2xl border border-[#eadfd4] bg-white p-4">
        <div className="flex items-center justify-between text-sm font-black">
          <span className="text-[#211711]">تقدمك في الإعداد</span>
          <span className="text-[#a51218]">{loaded ? `${done.length} / ${QUICK_START.length}` : "…"}</span>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#f4ece5]" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="نسبة إتمام خطوات الإعداد">
          <div
            className="h-full rounded-full bg-gradient-to-l from-[#a51218] to-[#C9A227] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 ? (
          <p className="mt-2 text-sm font-black text-[#3a5a34]">✓ ممتاز! متجرك جاهز — راجع قائمة فحص الأداء قبل الإطلاق.</p>
        ) : null}
      </div>

      {/* الخطوات كمسار */}
      <ol className="relative space-y-4 before:absolute before:inset-y-2 before:start-[21px] before:w-0.5 before:bg-[#eadfd4]">
        {QUICK_START.map((step) => {
          const checked = done.includes(step.n);
          return (
            <li key={step.n} className="relative flex gap-4">
              <button
                type="button"
                onClick={() => toggle(step.n)}
                aria-pressed={checked}
                aria-label={`${checked ? "إلغاء إتمام" : "إتمام"} الخطوة ${step.n}: ${step.title}`}
                className={`relative z-10 mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-black transition ${
                  checked
                    ? "border-[#a51218] bg-[#a51218] text-white"
                    : "border-[#eadfd4] bg-white text-[#a58f7e] hover:border-[#a51218]/40"
                }`}
              >
                {checked ? "✓" : step.n}
              </button>
              <div className={`flex-1 rounded-2xl border bg-white p-5 transition ${checked ? "border-[#a51218]/20 opacity-75" : "border-[#eadfd4]"}`}>
                <h3 className={`font-black text-[#211711] ${checked ? "line-through decoration-[#a51218]/40" : ""}`}>{step.title}</h3>
                <p className="mt-1.5 text-sm leading-8 text-[#6d5f55]">{step.desc}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {step.linkId ? (
                    <a href={`#${step.linkId}`} className="text-sm font-black text-[#a51218] hover:underline">
                      اعرف المزيد ←
                    </a>
                  ) : null}
                </div>
                {step.warning ? <NoticeBox kind="mistake">{step.warning}</NoticeBox> : null}
              </div>
            </li>
          );
        })}
      </ol>

      <RelatedLinks next={{ id: "identity", label: "إعداد الهوية" }} related={[{ id: "image-sizes", label: "مقاسات الصور" }, { id: "performance", label: "فحص ما قبل النشر" }]} />
    </DocsSection>
  );
}

/* ─── إعداد الهوية ───────────────────────────────────────────────────── */
function IdentityBlock({ block }: { block: { title: string; rows: string[][]; wrong: string; right: string } }) {
  return (
    <div className="rounded-3xl border border-[#eadfd4] bg-white p-6">
      <h3 className="mb-4 text-xl font-black text-[#211711]">{block.title}</h3>
      <dl className="space-y-3">
        {block.rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[110px_1fr] gap-3 text-sm sm:grid-cols-[150px_1fr]">
            <dt className="font-black text-[#a58f7e]">{k}</dt>
            <dd className="leading-7 text-[#5f5148]">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#ecc7c8] bg-[#fbf0f0] p-4 text-sm leading-7 text-[#8f2325]">
          <p className="mb-1 font-black">✕ غير صحيح</p>
          {block.wrong}
        </div>
        <div className="rounded-2xl border border-[#cfe0c8] bg-[#f4f8f2] p-4 text-sm leading-7 text-[#3a5a34]">
          <p className="mb-1 font-black">✓ صحيح</p>
          {block.right}
        </div>
      </div>
    </div>
  );
}

export function IdentitySection() {
  return (
    <DocsSection id="identity">
      <SectionHeading
        id="identity"
        kicker="إعداد الهوية"
        title="الشعار والألوان والخطوط والصور"
        desc="هوية متجرك تُضبط من مجموعتي «الشعار والخطوط» و«الألوان والمظهر» في محرر الثيم. هذه القواعد تضمن نتيجة فاخرة من أول مرة."
      />
      <div className="grid gap-6">
        <IdentityBlock block={IDENTITY_GUIDE.logo} />
        <IdentityBlock block={IDENTITY_GUIDE.colors} />
        <IdentityBlock block={IDENTITY_GUIDE.fonts} />
        <IdentityBlock block={IDENTITY_GUIDE.images} />
      </div>
      <NoticeBox kind="tip">
        أسرع طريق لهوية متناسقة: اختر <a className="font-black underline" href="#presets">قالب ألوان جاهزًا</a> يقارب
        نشاطك، ثم عدّل اللون الرئيسي فقط ليطابق شعارك.
      </NoticeBox>
      <RelatedLinks next={{ id: "header", label: "الهيدر" }} related={[{ id: "presets", label: "قوالب جاهزة" }, { id: "image-sizes", label: "مقاسات الصور" }]} />
    </DocsSection>
  );
}

/* ─── الهيدر ─────────────────────────────────────────────────────────── */
export function HeaderSection() {
  return (
    <DocsSection id="header" tone="tinted">
      <SectionHeading
        id="header"
        kicker="الهيدر"
        title="واجهة متجرك الأولى"
        desc="ثلاثة أنماط أساسية مع تحكم دقيق بالأدوات والأبعاد والألوان — كل شيء من مجموعة «الهيدر» في محرر الثيم."
      />

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {HEADER_GUIDE.styles.map((s) => (
          <div key={s.name} className="rounded-2xl border border-[#eadfd4] bg-white p-5">
            {/* رسم توضيحي مبسط للنمط */}
            <div aria-hidden className="mb-4 flex h-10 items-center justify-between rounded-xl bg-[#f4ece5] px-3">
              {s.name === "شعار وسط" ? (
                <>
                  <span className="h-2 w-8 rounded-full bg-[#d8c9bc]" />
                  <span className="h-4 w-4 rounded-md bg-[#a51218]" />
                  <span className="h-2 w-8 rounded-full bg-[#d8c9bc]" />
                </>
              ) : s.name === "Split منقسم" ? (
                <>
                  <span className="flex gap-1"><span className="h-2 w-6 rounded-full bg-[#d8c9bc]" /><span className="h-2 w-6 rounded-full bg-[#d8c9bc]" /></span>
                  <span className="flex gap-1"><span className="h-3 w-3 rounded-full bg-[#C9A227]" /><span className="h-3 w-3 rounded-full bg-[#d8c9bc]" /></span>
                </>
              ) : (
                <>
                  <span className="h-4 w-4 rounded-md bg-[#a51218]" />
                  <span className="flex gap-1"><span className="h-2 w-6 rounded-full bg-[#d8c9bc]" /><span className="h-2 w-6 rounded-full bg-[#d8c9bc]" /><span className="h-2 w-6 rounded-full bg-[#d8c9bc]" /></span>
                </>
              )}
            </div>
            <h3 className="font-black text-[#211711]">{s.name}</h3>
            <p className="mt-1.5 text-sm leading-7 text-[#76685d]">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {HEADER_GUIDE.options.map((o) => (
          <Accordion key={o.name} title={o.name}>
            {o.desc}
          </Accordion>
        ))}
      </div>

      <h3 className="mb-4 mt-10 text-xl font-black text-[#211711]">وصفات جاهزة حسب نوع متجرك</h3>
      <div className="space-y-3">
        {HEADER_GUIDE.recipes.map((r) => (
          <div key={r.store} className="flex flex-col gap-1 rounded-2xl border border-[#eadfd4] bg-white p-4 sm:flex-row sm:items-center sm:gap-4">
            <span className="shrink-0 font-black text-[#a51218] sm:w-56">{r.store}</span>
            <span className="text-sm leading-7 text-[#5f5148]">{r.tip}</span>
          </div>
        ))}
      </div>

      <NoticeBox kind="mobile">
        على الجوال أبقِ الهيدر مختصرًا: قائمة + شعار + سلة + بحث. انقل الحساب والمفضلة إلى
        <a className="ms-1 font-black underline" href="#mobile">شريط الجوال السفلي</a>.
      </NoticeBox>

      <RelatedLinks next={{ id: "footer", label: "الفوتر" }} related={[{ id: "mobile", label: "إعداد الجوال" }]} />
    </DocsSection>
  );
}

/* ─── الفوتر ─────────────────────────────────────────────────────────── */
export function FooterSection() {
  return (
    <DocsSection id="footer">
      <SectionHeading
        id="footer"
        kicker="الفوتر"
        title="ختام يجمع الثقة والتواصل"
        desc="تخطيطان جاهزان مع تحكم كامل بالأعمدة والمحتوى من مجموعة «الفوتر» في محرر الثيم."
      />

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        {FOOTER_GUIDE.layouts.map((l) => (
          <div key={l.name} className="rounded-2xl border border-[#eadfd4] bg-white p-5">
            <h3 className="font-black text-[#211711]">{l.name}</h3>
            <p className="mt-1.5 text-sm leading-7 text-[#76685d]">{l.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="mb-4 text-xl font-black text-[#211711]">ما الذي يمكن ضبطه؟</h3>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {FOOTER_GUIDE.options.map((o) => (
          <li key={o} className="flex gap-2.5 rounded-xl bg-white p-3.5 text-sm leading-7 text-[#5f5148]">
            <span className="mt-1 h-4 w-4 shrink-0 rounded-full bg-[#C9A227]/20 text-center text-[10px] font-black leading-4 text-[#7a5d10]">✓</span>
            {o}
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#eadfd4] bg-white p-5">
          <Pill tone="neutral">مثال — فوتر بسيط</Pill>
          <p className="mt-3 text-sm leading-8 text-[#5f5148]">{FOOTER_GUIDE.simple}</p>
        </div>
        <div className="rounded-2xl border border-[#C9A227]/40 bg-[#faf5ea] p-5">
          <Pill tone="gold">مثال — فوتر متكامل</Pill>
          <p className="mt-3 text-sm leading-8 text-[#5f5148]">{FOOTER_GUIDE.full}</p>
        </div>
      </div>

      {FOOTER_GUIDE.tips.map((t) => (
        <NoticeBox key={t} kind="tip">{t}</NoticeBox>
      ))}

      <RelatedLinks next={{ id: "product-cards", label: "بطاقات المنتجات" }} />
    </DocsSection>
  );
}

/* ─── إعداد الجوال ───────────────────────────────────────────────────── */
export function MobileSection() {
  const [device, setDevice] = useState<"sm" | "md" | "lg" | "tab">("md");
  const widths = { sm: 200, md: 240, lg: 270, tab: 380 } as const;
  const labels = { sm: "جوال صغير", md: "جوال متوسط", lg: "جوال كبير", tab: "تابلت" } as const;

  return (
    <DocsSection id="mobile" tone="tinted">
      <SectionHeading
        id="mobile"
        kicker="إعداد الجوال"
        title="ضبط متجر سِدرة للجوال"
        desc="أغلب زوار المتاجر السعودية يتصفحون من الجوال — لذلك لكل مكون رئيسي في سِدرة إعدادات جوال مستقلة."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="grid gap-4 sm:grid-cols-2">
          {MOBILE_GUIDE.map((m) => (
            <div key={m.title} className="rounded-2xl border border-[#eadfd4] bg-white p-5">
              <h3 className="font-black text-[#211711]">{m.title}</h3>
              <p className="mt-1.5 text-sm leading-7 text-[#76685d]">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* معاينة توضيحية داخل إطار جهاز */}
        <div className="mx-auto">
          <div role="tablist" aria-label="حجم الجهاز" className="mb-4 flex flex-wrap justify-center gap-1.5">
            {(Object.keys(labels) as (keyof typeof labels)[]).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={device === k}
                onClick={() => setDevice(k)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-black transition ${
                  device === k ? "bg-[#211711] text-white" : "border border-[#eadfd4] bg-white text-[#6d5f55]"
                }`}
              >
                {labels[k]}
              </button>
            ))}
          </div>
          <div
            className="mx-auto overflow-hidden rounded-[28px] border-4 border-[#211711] bg-[#f8f2ec] shadow-xl transition-all duration-300"
            style={{ width: widths[device] }}
            aria-label={`محاكاة توضيحية لعرض المتجر على ${labels[device]}`}
          >
            <div aria-hidden className="select-none">
              <div className="flex items-center justify-between bg-white px-3 py-2">
                <span className="h-2.5 w-6 rounded-full bg-[#eadfd4]" />
                <span className="h-3.5 w-3.5 rounded-md bg-[#a51218]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#C9A227]/60" />
              </div>
              <div className="m-2 flex h-20 items-end rounded-lg bg-[linear-gradient(135deg,#a51218,#211711)] p-2">
                <span className="block h-2 w-16 rounded-full bg-white/80" />
              </div>
              <div className={`grid gap-1.5 px-2 ${device === "tab" ? "grid-cols-3" : "grid-cols-2"}`}>
                {Array.from({ length: device === "tab" ? 3 : 2 }).map((_, i) => (
                  <div key={i} className="rounded-lg bg-white p-1.5">
                    <div className="h-10 rounded-md bg-[#f4ece5]" />
                    <span className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-[#eadfd4]" />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-around bg-[#211711] px-3 py-2.5">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={`h-2 w-2 rounded-full ${i === 0 ? "bg-[#C9A227]" : "bg-white/30"}`} />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-xs font-bold text-[#a58f7e]">محاكاة توضيحية لتخطيط الجوال</p>
        </div>
      </div>

      <RelatedLinks next={{ id: "no-code", label: "تخصيص بدون كود" }} related={[{ id: "performance", label: "سرعة الجوال" }, { id: "troubleshooting", label: "مشكلة على الجوال فقط؟" }]} />
    </DocsSection>
  );
}

/* ─── تخصيص بدون كود ─────────────────────────────────────────────────── */
export function NoCodeSection() {
  return (
    <DocsSection id="no-code">
      <SectionHeading
        id="no-code"
        kicker="تخصيص سريع"
        title="عدّل كل شيء بدون سطر كود واحد"
        desc="أكثر التعديلات طلبًا، وأين تجدها في لوحة سلة، وكيف تنفذها — مكتوبة لصاحب متجر غير تقني."
      />
      <div className="overflow-hidden rounded-3xl border border-[#eadfd4] bg-white">
        <div className="hidden grid-cols-[1fr_1.1fr_1.6fr] gap-3 border-b border-[#eadfd4] bg-[#fbf7f2] p-4 text-sm font-black text-[#a58f7e] sm:grid">
          <span>ماذا تريد؟</span>
          <span>أين تجده؟</span>
          <span>كيف تنفذه؟</span>
        </div>
        {NO_CODE_TASKS.map((t, i) => (
          <div key={t.task} className={`grid gap-1.5 p-4 text-sm leading-7 sm:grid-cols-[1fr_1.1fr_1.6fr] sm:gap-3 ${i % 2 ? "bg-[#fbf7f2]/60" : ""}`}>
            <span className="font-black text-[#211711]">{t.task}</span>
            <span className="font-bold text-[#a51218]">{t.where}</span>
            <span className="text-[#5f5148]">{t.how}</span>
          </div>
        ))}
      </div>
      <RelatedLinks next={{ id: "advanced", label: "تخصيص متقدم" }} />
    </DocsSection>
  );
}

/* ─── تخصيص متقدم ────────────────────────────────────────────────────── */
export function AdvancedSection() {
  return (
    <DocsSection id="advanced" tone="tinted">
      <SectionHeading
        id="advanced"
        kicker="للمستخدم المتقدم"
        title="التخصيص المتقدم — بحدود آمنة"
        desc="ما هو مسموح وآمن، وما الذي يعرّض متجرك للمشاكل. القاعدة الذهبية: أي تعديل لا يمكن التراجع عنه بسهولة، وثّق قبله واختبر بعده."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {ADVANCED_GUIDE.allowed.map((a) => (
          <Accordion key={a.title} title={a.title}>
            {a.desc}
          </Accordion>
        ))}
      </div>
      <div className="mt-8 rounded-3xl border border-[#f0cabe] bg-[#fdf3f0] p-6">
        <h3 className="mb-3 font-black text-[#8a3a22]">⚠ تحذيرات لا تتجاوزها</h3>
        <ul className="space-y-2 text-sm leading-7 text-[#7a3a24]">
          {ADVANCED_GUIDE.warnings.map((w) => (
            <li key={w} className="flex gap-2">
              <span aria-hidden>—</span>
              {w}
            </li>
          ))}
        </ul>
      </div>
      <RelatedLinks next={{ id: "components", label: "مكونات الصفحة الرئيسية" }} related={[{ id: "support", label: "اطلب الدعم قبل التعديل" }]} />
    </DocsSection>
  );
}
