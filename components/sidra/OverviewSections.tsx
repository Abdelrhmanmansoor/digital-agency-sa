"use client";

/* أقسام التعريف: نظرة عامة + المزايا + قبل وبعد */

import { useState } from "react";
import { SIDRA_INFO, SIDRA_FEATURES, COMPARISON_ROWS } from "@/lib/sidra-data";
import { DocsSection, SectionHeading, NoticeBox, RelatedLinks, Pill } from "./ui";

/* ─── نظرة عامة ──────────────────────────────────────────────────────── */
export function OverviewSection() {
  const facts = [
    { k: "المنصة", v: SIDRA_INFO.platform },
    { k: "الإصدار الحالي", v: SIDRA_INFO.version },
    { k: "المطوّر", v: SIDRA_INFO.author },
    { k: "اللغات", v: "العربية والإنجليزية — RTL/LTR" },
    { k: "الوضع الداكن", v: "مدعوم بألوان مستقلة" },
    { k: "مكونات الرئيسية", v: `${SIDRA_INFO.stats.components} مكونًا` },
    { k: "خيارات التخصيص", v: `${SIDRA_INFO.stats.settings} خيارًا من لوحة سلة` },
    { k: "الخطوط", v: SIDRA_INFO.stats.fonts },
  ];

  return (
    <DocsSection id="overview">
      <SectionHeading
        id="overview"
        kicker="نظرة عامة"
        title="ما هو ثيم سِدرة؟"
        desc="سِدرة ثيم سلة مبني بالطريقة الرسمية لمنصة سلة (Salla Twilight)، بطابع «الفخامة الهادئة» المستوحى من التراث النجدي المعاصر. صُمم ليحل مشكلة واضحة: المتاجر العربية التي تريد هوية فاخرة ومرونة حقيقية دون الحاجة إلى مبرمج عند كل تعديل."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div className="space-y-5 text-base leading-9 text-[#5f5148]">
          <p>
            <strong className="text-[#211711]">لمن هذا الثيم؟</strong> للمتاجر التي تبيع منتجات ذات
            هوية بصرية: العبايات والأزياء، العطور والعود، الهدايا، المنتجات المنزلية، وحتى
            الإلكترونيات — قوالب الألوان الجاهزة تغطي هذه الأنشطة وأكثر.
          </p>
          <p>
            <strong className="text-[#211711]">ما الذي يميزه عن الثيمات التقليدية؟</strong> بدل شكل
            واحد ثابت، يمنحك سِدرة {SIDRA_INFO.stats.components} مكونًا للصفحة الرئيسية، 5 أنماط
            لبطاقة المنتج، وأنماط هيدر وفوتر متعددة — كلها تُضبط من محرر سلة بالسحب والإفلات، مع
            قيم افتراضية احترافية تجعل المتجر جميلًا قبل أن تلمس أي إعداد.
          </p>
          <p>
            <strong className="text-[#211711]">التنقل والسلة والبحث</strong> تُعرض كلها عبر مكونات سلة
            الرسمية، فيبقى متجرك متوافقًا مع تحديثات المنصة وتطبيقاتها.
          </p>

          <NoticeBox kind="important">
            <strong>تعهّد أمان الأسعار:</strong> وظيفة الثيم العرض وتجربة المستخدم فقط. لا يقرأ ولا
            يحسب ولا يعدّل أي سعر أو خصم أو ضريبة أو شحن أو كوبون — كل القيم المالية تأتي من مكونات
            سلة الرسمية كما هي.
          </NoticeBox>
        </div>

        <dl className="rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-[0_16px_45px_rgba(52,35,25,0.06)]">
          {facts.map((f, i) => (
            <div
              key={f.k}
              className={`flex items-center justify-between gap-4 py-3 ${i > 0 ? "border-t border-[#f0e6dc]" : ""}`}
            >
              <dt className="text-sm font-bold text-[#a58f7e]">{f.k}</dt>
              <dd className="text-sm font-black text-[#211711]">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <RelatedLinks next={{ id: "features", label: "أهم المزايا" }} related={[{ id: "quick-start", label: "البدء السريع" }, { id: "components", label: "المكونات" }]} />
    </DocsSection>
  );
}

/* ─── المزايا ────────────────────────────────────────────────────────── */
export function FeaturesSection() {
  const [activeKey, setActiveKey] = useState(SIDRA_FEATURES[0].key);
  const active = SIDRA_FEATURES.find((g) => g.key === activeKey)!;

  return (
    <DocsSection id="features" tone="tinted">
      <SectionHeading
        id="features"
        kicker="أهم المزايا"
        title="خمس زوايا تروي قصة سِدرة"
        desc="المزايا مقسمة حسب من يهمه الأمر: التصميم، التجارة، الأداء، تجربة عميلك، وتجربتك أنت كتاجر."
      />

      {/* تبويبات المجموعات */}
      <div role="tablist" aria-label="مجموعات المزايا" className="mb-6 flex flex-wrap gap-2">
        {SIDRA_FEATURES.map((g) => (
          <button
            key={g.key}
            role="tab"
            aria-selected={activeKey === g.key}
            onClick={() => setActiveKey(g.key)}
            className={`rounded-full px-5 py-2.5 text-sm font-black transition ${
              activeKey === g.key
                ? "bg-[#211711] text-white shadow-[0_10px_25px_rgba(33,23,17,0.25)]"
                : "border border-[#eadfd4] bg-white text-[#6d5f55] hover:border-[#a51218]/30"
            }`}
          >
            <span className="me-1.5 text-[#F0B100]" aria-hidden>{g.icon}</span>
            {g.title}
          </button>
        ))}
      </div>

      <p className="mb-6 text-base leading-8 text-[#6d5f55]">{active.intro}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {active.items.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl border border-[#eadfd4] bg-white p-5 transition hover:border-[#a51218]/25 hover:shadow-[0_16px_45px_rgba(165,18,24,0.07)]"
          >
            <h3 className="font-black text-[#211711]">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#76685d]">{item.desc}</p>
            {item.linkId ? (
              <a href={`#${item.linkId}`} className="mt-3 inline-block text-sm font-black text-[#a51218] opacity-70 transition group-hover:opacity-100">
                الشرح التفصيلي ←
              </a>
            ) : null}
          </div>
        ))}
      </div>

      <RelatedLinks next={{ id: "comparison", label: "قبل وبعد سِدرة" }} related={[{ id: "presets", label: "قوالب جاهزة" }]} />
    </DocsSection>
  );
}

/* ─── قبل وبعد ───────────────────────────────────────────────────────── */
export function ComparisonSection() {
  return (
    <DocsSection id="comparison">
      <SectionHeading
        id="comparison"
        kicker="المقارنة"
        title="متجر بإعدادات أساسية… ومتجر مضبوط بسِدرة"
        desc="المقارنة هنا بين متجر يستخدم الحد الأدنى من الإعدادات وبين متجر استثمر إمكانات سِدرة كاملة — وليست هجومًا على أي منتج آخر."
      />

      <div className="overflow-hidden rounded-3xl border border-[#eadfd4] bg-white">
        {/* رأس الجدول */}
        <div className="grid grid-cols-[90px_1fr_1fr] gap-3 border-b border-[#eadfd4] bg-[#fbf7f2] p-4 text-sm font-black sm:grid-cols-[140px_1fr_1fr]">
          <span className="text-[#a58f7e]">الجانب</span>
          <span className="text-[#76685d]">إعدادات أساسية</span>
          <span className="text-[#a51218]">مع سِدرة كامل الإمكانات</span>
        </div>
        {COMPARISON_ROWS.map((r, i) => (
          <div
            key={r.aspect}
            className={`grid grid-cols-[90px_1fr_1fr] gap-3 p-4 text-sm leading-7 sm:grid-cols-[140px_1fr_1fr] ${
              i % 2 ? "bg-[#fbf7f2]/60" : ""
            }`}
          >
            <span className="font-black text-[#211711]">{r.aspect}</span>
            <span className="text-[#76685d]">{r.before}</span>
            <span className="font-bold text-[#3c2a20]">{r.after}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Pill tone="gold">الفرق ليس في الثيم فقط — بل في ضبطه. هذا الدليل يوصلك للعمود الثالث.</Pill>
      </div>

      <RelatedLinks next={{ id: "quick-start", label: "البدء السريع" }} />
    </DocsSection>
  );
}
