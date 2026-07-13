"use client";

/* أقسام المرجع: المكونات + البطاقات + مصادر المنتجات + التخطيطات + المقاسات + القوالب + الأداء + التكاملات */

import { useMemo, useState } from "react";
import {
  SIDRA_COMPONENTS,
  CARD_STYLES,
  CARD_SCENARIOS,
  CARD_OPTIONS,
  PRODUCT_SOURCES,
  HOME_LAYOUTS,
  IMAGE_SIZES,
  PRESET_TEMPLATES,
  PERFORMANCE_CHECKLIST,
  INTEGRATIONS,
} from "@/lib/sidra-data";
import { DocsSection, SectionHeading, NoticeBox, RelatedLinks, CopyButton, Pill } from "./ui";

/* ─── مستكشف المكونات (46 مكونًا حقيقيًا) ────────────────────────────── */
const COMPONENT_CATS = ["الكل", "أبطال الصفحة", "منتجات", "أقسام وماركات", "محتوى وثقة", "وسائط وقصص", "تسويق وعروض", "أدوات مساعدة"] as const;

export function ComponentsSection() {
  const [cat, setCat] = useState<(typeof COMPONENT_CATS)[number]>("الكل");
  const [open, setOpen] = useState<string | null>(null);

  const list = useMemo(
    () => (cat === "الكل" ? SIDRA_COMPONENTS : SIDRA_COMPONENTS.filter((c) => c.category === cat)),
    [cat]
  );

  return (
    <DocsSection id="components">
      <SectionHeading
        id="components"
        kicker="المرجع الكامل"
        title={`${SIDRA_COMPONENTS.length} مكونًا للصفحة الرئيسية`}
        desc="كل مكون هنا موجود فعليًا في الثيم ويُضاف بالسحب من محرر سلة. اضغط على أي مكون لعرض توثيقه: الاستخدام الأمثل، أهم الإعدادات، مقاس الصور، ونصائح الجوال."
      />

      {/* فلاتر التصنيف */}
      <div role="tablist" aria-label="تصنيفات المكونات" className="mb-6 flex flex-wrap gap-2">
        {COMPONENT_CATS.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => {
              setCat(c);
              setOpen(null);
            }}
            className={`rounded-full px-4 py-2 text-sm font-black transition ${
              cat === c ? "bg-[#a51218] text-white" : "border border-[#eadfd4] bg-white text-[#6d5f55] hover:border-[#a51218]/30"
            }`}
          >
            {c}
            {c === "الكل" ? <span className="ms-1.5 text-xs opacity-70">{SIDRA_COMPONENTS.length}</span> : null}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((c) => {
          const isOpen = open === c.name;
          return (
            <div
              key={c.name}
              className={`rounded-2xl border bg-white transition ${isOpen ? "border-[#a51218]/30 shadow-[0_16px_45px_rgba(165,18,24,0.08)] sm:col-span-2" : "border-[#eadfd4]"}`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : c.name)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 p-5 text-start"
              >
                <span>
                  <span className="block font-black text-[#211711]">{c.name}</span>
                  <span className="mt-0.5 block text-xs font-bold text-[#a58f7e]">
                    {c.nameEn} · {c.category}
                  </span>
                  {!isOpen ? <span className="mt-1.5 block text-sm leading-6 text-[#76685d]">{c.desc}</span> : null}
                </span>
                <span
                  aria-hidden
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4ece5] text-lg font-black text-[#a51218] transition ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>

              {isOpen ? (
                <div className="border-t border-[#f0e6dc] p-5">
                  <p className="text-[15px] leading-8 text-[#5f5148]">{c.desc}</p>
                  <div className="mt-4 grid gap-5 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-sm font-black text-[#a51218]">أفضل استخدام</h4>
                      <p className="text-sm leading-7 text-[#5f5148]">{c.bestUse}</p>
                      {c.imageHint ? (
                        <p className="mt-3 rounded-xl bg-[#fbf7f2] p-3 text-sm leading-7 text-[#5f5148]">
                          <strong className="text-[#211711]">مقاس الصور: </strong>
                          {c.imageHint}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-black text-[#a51218]">أهم الإعدادات</h4>
                      <ul className="space-y-1.5 text-sm leading-7 text-[#5f5148]">
                        {c.keySettings.map((s) => (
                          <li key={s} className="flex gap-2">
                            <span className="text-[#C9A227]" aria-hidden>◆</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {c.mobileTip ? <NoticeBox kind="mobile">{c.mobileTip}</NoticeBox> : null}
                  {c.mistake ? <NoticeBox kind="mistake">{c.mistake}</NoticeBox> : null}
                  <p className="mt-3 text-xs font-bold text-[#a58f7e]">
                    الإضافة: محرر سلة ← الصفحة الرئيسية ← إضافة قسم ← «{c.name}» — ولإخفائه مؤقتًا عطّل مفتاح «تفعيل القسم».
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <RelatedLinks next={{ id: "product-sources", label: "مصادر المنتجات" }} related={[{ id: "home-layout", label: "ترتيب الصفحة" }, { id: "image-sizes", label: "مقاسات الصور" }]} />
    </DocsSection>
  );
}

/* ─── بطاقات المنتجات + أداة الاقتراح ───────────────────────────────── */
export function ProductCardsSection() {
  const [scenario, setScenario] = useState<string | null>(null);

  const recommended = useMemo(() => {
    if (!scenario) return [];
    return CARD_STYLES.filter((c) => c.scenarios.includes(scenario));
  }, [scenario]);

  return (
    <DocsSection id="product-cards" tone="tinted">
      <SectionHeading
        id="product-cards"
        kicker="بطاقات المنتجات"
        title="خمسة أنماط… وبطاقة واحدة صحيحة لمتجرك"
        desc="النمط العام يُختار من «بطاقة المنتج» في محرر الثيم، ويمكن تجاوزه لكل قسم منتجات على حدة. اختر سيناريو متجرك وسنقترح النمط الأنسب."
      />

      {/* أداة الاقتراح */}
      <div className="mb-8 rounded-3xl border border-[#eadfd4] bg-white p-6">
        <p className="mb-3 font-black text-[#211711]">ما الذي يصف متجرك؟</p>
        <div className="flex flex-wrap gap-2">
          {CARD_SCENARIOS.map((s) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={scenario === s.key}
              onClick={() => setScenario(scenario === s.key ? null : s.key)}
              className={`rounded-full px-4 py-2 text-sm font-black transition ${
                scenario === s.key ? "bg-[#211711] text-white" : "border border-[#eadfd4] bg-[#fbf7f2] text-[#6d5f55] hover:border-[#a51218]/30"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        {scenario ? (
          <p className="mt-4 text-sm font-bold text-[#3a5a34]">
            ✓ نقترح: {recommended.map((r) => `«${r.name}»`).join(" أو ")} — مميزة بالإطار الذهبي أدناه.
          </p>
        ) : null}
      </div>

      {/* شبكة الأنماط */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CARD_STYLES.map((c) => {
          const isRec = scenario !== null && c.scenarios.includes(scenario);
          return (
            <div
              key={c.key}
              className={`rounded-2xl border-2 bg-white p-5 transition ${
                isRec ? "border-[#C9A227] shadow-[0_16px_45px_rgba(201,162,39,0.15)]" : scenario ? "border-[#eadfd4] opacity-55" : "border-[#eadfd4]"
              }`}
            >
              {/* رسم توضيحي للبطاقة */}
              <div aria-hidden className="mb-4 flex justify-center rounded-xl bg-[#f8f2ec] p-4">
                <div className="w-24 rounded-lg border border-[#eadfd4] bg-white p-1.5">
                  <div className={`rounded-md bg-[#e9ddd0] ${c.key === "editorial" ? "h-24" : c.key === "compact" ? "h-12" : "h-16"}`} />
                  <span className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-[#eadfd4]" />
                  <span className="mt-1 flex items-center justify-between">
                    <span className="h-1.5 w-1/3 rounded-full bg-[#a51218]/50" />
                    {c.key === "compact" || c.key === "commercial" ? <span className="h-3.5 w-3.5 rounded-full bg-[#a51218]" /> : null}
                  </span>
                  {c.key === "glass" ? <span className="mt-1 block h-2 rounded-full bg-[#211711]/15" /> : null}
                  {c.key === "base" ? <span className="mt-1 block h-2 rounded-md bg-[#a51218]/80" /> : null}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-[#211711]">{c.name}</h3>
                {isRec ? <Pill tone="gold">مقترح لك</Pill> : null}
              </div>
              <p className="mt-1.5 text-sm leading-7 text-[#76685d]">{c.desc}</p>
              <dl className="mt-3 space-y-1 text-xs font-bold">
                <div className="flex gap-2"><dt className="text-[#a58f7e]">الأنسب لـ:</dt><dd className="text-[#5f5148]">{c.bestFor}</dd></div>
                <div className="flex gap-2"><dt className="text-[#a58f7e]">نسبة الصورة:</dt><dd className="text-[#5f5148]">{c.ratio}</dd></div>
              </dl>
            </div>
          );
        })}
      </div>

      <h3 className="mb-3 mt-10 text-xl font-black text-[#211711]">خيارات البطاقة المشتركة</h3>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {CARD_OPTIONS.map((o) => (
          <li key={o} className="flex gap-2.5 rounded-xl bg-white p-3.5 text-sm leading-7 text-[#5f5148]">
            <span className="text-[#C9A227]" aria-hidden>◆</span>
            {o}
          </li>
        ))}
      </ul>

      <NoticeBox kind="important">
        شارات الخصم والأسعار داخل البطاقة تأتي من بيانات سلة الرسمية — الثيم يعرضها فقط ولا يحسبها.
      </NoticeBox>

      <RelatedLinks next={{ id: "home-layout", label: "ترتيب الصفحة الرئيسية" }} related={[{ id: "image-sizes", label: "مقاس صورة المنتج" }]} />
    </DocsSection>
  );
}

/* ─── مصادر المنتجات ─────────────────────────────────────────────────── */
export function ProductSourcesSection() {
  return (
    <DocsSection id="product-sources" tone="tinted">
      <SectionHeading
        id="product-sources"
        kicker="مصادر المنتجات"
        title="من أين تأتي المنتجات في كل قسم؟"
        desc="كل قسم منتجات في سِدرة يسألك عن «مصدر المنتجات». اختيار المصدر الصحيح يوفر عليك صيانة يومية."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {PRODUCT_SOURCES.map((s) => (
          <div key={s.name} className="rounded-2xl border border-[#eadfd4] bg-white p-5">
            <h3 className="font-black text-[#211711]">{s.name}</h3>
            <p className="mt-1.5 text-sm leading-7 text-[#76685d]">
              <strong className="text-[#a51218]">متى؟ </strong>
              {s.when}
            </p>
            {s.note ? <p className="mt-1.5 text-sm leading-7 text-[#a58f7e]">{s.note}</p> : null}
          </div>
        ))}
      </div>
      <NoticeBox kind="tip">
        تجنّب التكرار: لا تجعل قسمين متتاليين يعرضان المصدر نفسه — «الأكثر مبيعًا» ثم «تصنيف موسمي» ثم
        «اختيار يدوي» يعطي تنوعًا حقيقيًا.
      </NoticeBox>
      <RelatedLinks next={{ id: "image-sizes", label: "مقاسات الصور" }} related={[{ id: "components", label: "تبويبات المنتجات" }]} />
    </DocsSection>
  );
}

/* ─── ترتيب الصفحة الرئيسية ──────────────────────────────────────────── */
export function HomeLayoutSection() {
  const [active, setActive] = useState(0);
  const layout = HOME_LAYOUTS[active];

  return (
    <DocsSection id="home-layout">
      <SectionHeading
        id="home-layout"
        kicker="تخطيط الصفحة"
        title="أفضل ترتيب لأقسام الصفحة الرئيسية"
        desc="لا يوجد ترتيب واحد صحيح — يختلف حسب نوع المتجر. اختر السيناريو الأقرب لك واستخدم ترتيبه كنقطة بداية."
      />

      <div role="tablist" aria-label="سيناريوهات المتاجر" className="mb-6 flex flex-wrap gap-2">
        {HOME_LAYOUTS.map((l, i) => (
          <button
            key={l.name}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-2 text-sm font-black transition ${
              active === i ? "bg-[#a51218] text-white" : "border border-[#eadfd4] bg-white text-[#6d5f55]"
            }`}
          >
            {l.name}
          </button>
        ))}
      </div>

      <ol className="relative space-y-2 before:absolute before:inset-y-3 before:start-[15px] before:w-0.5 before:bg-[#eadfd4]">
        {layout.order.map((sec, i) => (
          <li key={sec} className="relative flex items-center gap-4">
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#C9A227] bg-white text-xs font-black text-[#7a5d10]">
              {i + 1}
            </span>
            <span className="flex-1 rounded-xl border border-[#eadfd4] bg-white px-4 py-2.5 text-sm font-bold text-[#3c2a20]">{sec}</span>
          </li>
        ))}
      </ol>

      <NoticeBox kind="perf">6 إلى 10 أقسام هي المساحة الصحية — أكثر من ذلك يبطئ الصفحة ويشتت الزائر.</NoticeBox>
      <RelatedLinks next={{ id: "presets", label: "قوالب جاهزة" }} related={[{ id: "components", label: "توثيق كل مكون" }]} />
    </DocsSection>
  );
}

/* ─── دليل مقاسات الصور + أداة تفاعلية ──────────────────────────────── */
export function ImageSizesSection() {
  const [selected, setSelected] = useState(IMAGE_SIZES[0].key);
  const size = IMAGE_SIZES.find((s) => s.key === selected)!;

  return (
    <DocsSection id="image-sizes" tone="tinted">
      <SectionHeading
        id="image-sizes"
        kicker="مرجع المقاسات"
        title="دليل مقاسات الصور"
        desc="اختر نوع الصورة لعرض المقاس والنسبة والحجم الأقصى والصيغة الموصى بها — ثم انسخ الخلاصة لفريق التصميم."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        {/* قائمة الأنواع */}
        <div className="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap">
          {IMAGE_SIZES.map((s) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={selected === s.key}
              onClick={() => setSelected(s.key)}
              className={`rounded-xl px-4 py-2.5 text-start text-sm font-black transition ${
                selected === s.key ? "bg-[#211711] text-white" : "border border-[#eadfd4] bg-white text-[#6d5f55] hover:border-[#a51218]/30"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* البطاقة التفصيلية */}
        <div className="sticky top-24 rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-[0_16px_45px_rgba(52,35,25,0.06)]">
          <h3 className="text-2xl font-black text-[#211711]">{size.name}</h3>
          <dl className="mt-5 grid grid-cols-2 gap-4">
            {[
              ["المقاس المقترح", size.size],
              ["نسبة الأبعاد", size.ratio],
              ["أقصى حجم ملف", size.maxWeight],
              ["الصيغة", size.format],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-[#fbf7f2] p-4">
                <dt className="text-xs font-black text-[#a58f7e]">{k}</dt>
                <dd className="mt-1 font-black text-[#211711]">{v}</dd>
              </div>
            ))}
          </dl>
          {size.notes ? <p className="mt-4 text-sm leading-8 text-[#5f5148]">{size.notes}</p> : null}
          <div className="mt-5">
            <CopyButton
              label="نسخ الخلاصة"
              text={`${size.name}: المقاس ${size.size} — النسبة ${size.ratio} — أقصى حجم ${size.maxWeight} — الصيغة ${size.format}${size.notes ? ` — ${size.notes}` : ""}`}
            />
          </div>
        </div>
      </div>

      <NoticeBox kind="perf">
        القاعدة الذهبية: WebP بجودة 75–85% تعطي جودة بصرية ممتازة بحجم أقل من نصف JPG. استخدم أداة
        ضغط (مثل Squoosh) قبل رفع أي صورة.
      </NoticeBox>

      <RelatedLinks next={{ id: "performance", label: "السرعة والأداء" }} related={[{ id: "identity", label: "قواعد الصور" }]} />
    </DocsSection>
  );
}

/* ─── القوالب الجاهزة ────────────────────────────────────────────────── */
export function PresetsSection() {
  return (
    <DocsSection id="presets">
      <SectionHeading
        id="presets"
        kicker="ابدأ بتصميم جاهز"
        title="وصفات إعداد كاملة حسب نشاطك"
        desc="كل بطاقة هنا دليل تطبيقي: قالب الألوان من القائمة الجاهزة في الثيم + الخط + الهيدر + البطاقة + ترتيب الأقسام. طبّقها يدويًا من اللوحة خلال دقائق."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {PRESET_TEMPLATES.map((p) => (
          <div key={p.name} className="rounded-3xl border border-[#eadfd4] bg-white p-6 transition hover:border-[#a51218]/25 hover:shadow-[0_16px_45px_rgba(165,18,24,0.07)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-black text-[#211711]">{p.name}</h3>
              <span className="flex gap-1" aria-label={`لوحة ألوان ${p.name}`}>
                {p.palette.map((c) => (
                  <span key={c} className="h-6 w-6 rounded-full border border-black/10" style={{ background: c }} title={c} />
                ))}
              </span>
            </div>
            <p className="mt-1 text-sm font-bold text-[#a58f7e]">{p.audience}</p>
            <dl className="mt-4 space-y-2 text-sm leading-7">
              {[
                ["قالب الألوان", p.colorPreset],
                ["الخط", p.font],
                ["الهيدر", p.header],
                ["الفوتر", p.footer],
                ["بطاقة المنتج", p.card],
                ["نسبة الصور", p.ratio],
                ["ترتيب الأقسام", p.sections],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-2">
                  <dt className="font-black text-[#a58f7e]">{k}</dt>
                  <dd className="text-[#5f5148]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <NoticeBox kind="info">
        هذه أدلة تطبيقية تُنفَّذ يدويًا من لوحة سلة — لا يوجد حاليًا استيراد تلقائي للإعدادات. إن أردت
        أن نطبّقها لك، خدمة «الدعم المتقدم» تشمل الإعداد الكامل.
      </NoticeBox>
      <RelatedLinks next={{ id: "performance", label: "السرعة والأداء" }} related={[{ id: "support", label: "اطلب إعدادًا كاملًا" }]} />
    </DocsSection>
  );
}

/* ─── السرعة والأداء ─────────────────────────────────────────────────── */
export function PerformanceSection() {
  return (
    <DocsSection id="performance" tone="tinted">
      <SectionHeading
        id="performance"
        kicker="السرعة والأداء"
        title="متجر سريع يبيع أكثر"
        desc="سِدرة مبني ليكون خفيفًا، لكن السرعة النهائية قرار مشترك بينك وبين الثيم — هذه قائمة الفحص قبل النشر."
      />
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {PERFORMANCE_CHECKLIST.map((item, i) => (
          <li key={item} className="flex gap-3 rounded-2xl border border-[#eadfd4] bg-white p-4 text-sm leading-7 text-[#5f5148]">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#a51218]/10 text-xs font-black text-[#a51218]">
              {i + 1}
            </span>
            {item}
          </li>
        ))}
      </ul>
      <NoticeBox kind="info">
        لا نعد بأرقام أداء محددة — النتيجة تعتمد على صورك وتطبيقاتك ومحتواك. القياس الصادق الوحيد هو
        اختبار متجرك أنت عبر PageSpeed Insights قبل وبعد تطبيق هذه القائمة.
      </NoticeBox>
      <RelatedLinks next={{ id: "integrations", label: "الربط والتطبيقات" }} related={[{ id: "image-sizes", label: "مقاسات الصور" }, { id: "mobile", label: "سرعة الجوال" }]} />
    </DocsSection>
  );
}

/* ─── الربط والتطبيقات ───────────────────────────────────────────────── */
const TYPE_TONE: Record<string, "red" | "gold" | "neutral"> = {
  "ميزة في الثيم": "red",
  "منصة سلة": "gold",
};

export function IntegrationsSection() {
  return (
    <DocsSection id="integrations">
      <SectionHeading
        id="integrations"
        kicker="الربط والتطبيقات"
        title="ما الذي يوفره الثيم، وما الذي توفره سلة؟"
        desc="حتى لا تبحث في المكان الخطأ: كل تكامل هنا مصنّف حسب مصدره الفعلي — ميزة داخل الثيم، أو ميزة منصة سلة، أو تطبيق خارجي."
      />
      <div className="grid gap-3 md:grid-cols-2">
        {INTEGRATIONS.map((it) => (
          <div key={it.name} className="rounded-2xl border border-[#eadfd4] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-black text-[#211711]">{it.name}</h3>
              <Pill tone={TYPE_TONE[it.type] ?? "neutral"}>{it.type}</Pill>
            </div>
            <p className="mt-2 text-sm leading-7 text-[#76685d]">{it.how}</p>
          </div>
        ))}
      </div>
      <RelatedLinks next={{ id: "changelog", label: "سجل التحديثات" }} related={[{ id: "support", label: "الدعم الفني" }]} />
    </DocsSection>
  );
}
