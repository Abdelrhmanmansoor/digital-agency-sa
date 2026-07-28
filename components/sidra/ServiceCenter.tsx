"use client";

/* ══════════════════════════════════════════════════════════════════════
   مركز سِدرة — واجهة على نسق البوابات الحكومية

   الفكرة: بدل جدار توثيق طويل، يرى الزائر أولًا «مركزًا» بترويسة رسمية
   وبطاقات خدمات مرقّمة، فيعرف من النظرة الأولى ماذا يوجد وأين يبدأ.
   كل بطاقة تقود إلى قسم موجود أصلًا في الصفحة — لا محتوى جديد ولا
   محتوى مفقود، فقط مدخل منظّم.
   ══════════════════════════════════════════════════════════════════════ */

import { SIDRA_NAV, SIDRA_INFO } from "@/lib/sidra-data";
import { S } from "./ui";

/* ترتيب المجموعات ولون كل خدمة ورقمها — نفس مجموعات SIDRA_NAV حرفيًا */
const SERVICES: Array<{
  group: string;
  no: string;
  title: string;
  desc: string;
  icon: string;
  tint: string;
}> = [
  {
    group: "تعرف على الثيم",
    no: "٠١",
    title: "التعريف بالثيم",
    desc: "ما الذي يقدّمه سِدرة، ومزاياه، ومقارنته بما قبله.",
    icon: "◈",
    tint: "#a51218",
  },
  {
    group: "الإعداد والتخصيص",
    no: "٠٢",
    title: "الإعداد والتخصيص",
    desc: "من التثبيت إلى الهوية والهيدر والفوتر وبطاقات المنتجات.",
    icon: "⚙",
    tint: "#7a5d10",
  },
  {
    group: "المرجع",
    no: "٠٣",
    title: "المرجع التقني",
    desc: "المكوّنات، مصادر المنتجات، المقاسات، القوالب، والسرعة.",
    icon: "❖",
    tint: "#2c4a63",
  },
  {
    group: "الدعم والتحديثات",
    no: "٠٤",
    title: "الدعم والتحديثات",
    desc: "سجل الإصدارات، الأسئلة الشائعة، حل المشكلات، والتواصل.",
    icon: "☎",
    tint: "#3a5a34",
  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

export default function ServiceCenter() {
  const byGroup = (g: string) => SIDRA_NAV.filter((n) => n.group === g);

  return (
    <section
      id="center"
      aria-labelledby="center-title"
      className="scroll-mt-24 border-b"
      style={{ borderColor: S.border, background: S.bg }}
    >
      {/* شريط رسمي علوي */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${S.red}, ${S.gold}, ${S.red})` }} aria-hidden />

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
        {/* ── ترويسة المركز ── */}
        <header className="mb-9 flex flex-col gap-5 border-b pb-7 sm:flex-row sm:items-end sm:justify-between"
                style={{ borderColor: S.border }}>
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-black text-white"
              style={{ background: S.red, boxShadow: "0 10px 26px -14px rgba(165,18,24,.7)" }}
            >
              س
            </span>
            <div>
              <p className="text-[12px] font-black tracking-widest" style={{ color: S.soft }}>
                المركز الرسمي
              </p>
              <h2 id="center-title" className="text-2xl font-black leading-tight sm:text-3xl" style={{ color: S.ink }}>
                مركز ثيم سِدرة
              </h2>
              <p className="mt-1.5 max-w-xl text-[13.5px] leading-7" style={{ color: S.muted }}>
                كل ما يخصّ الثيم في مكان واحد — مقسّم إلى أربع خدمات، تدخل منها مباشرة إلى ما تحتاجه.
              </p>
            </div>
          </div>

          {/* حالة + أرقام */}
          <dl className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {[
              ["الإصدار", SIDRA_INFO.version],
              ["المكوّنات", String(SIDRA_INFO.stats.components)],
              ["خيارات التخصيص", String(SIDRA_INFO.stats.settings)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] font-bold" style={{ color: S.soft }}>{k}</dt>
                <dd className="text-lg font-black tabular-nums" style={{ color: S.ink }}>{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* ── مدخل المساعد: البطاقة الأبرز ── */}
        <button
          type="button"
          onClick={() => scrollTo("assistant")}
          className="group mb-8 flex w-full flex-col gap-4 rounded-2xl border p-5 text-right transition hover:shadow-lg sm:flex-row sm:items-center sm:gap-6"
          style={{ borderColor: S.border, background: S.ink }}
        >
          <span
            aria-hidden
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl transition group-hover:scale-105"
            style={{ background: S.gold, color: S.ink }}
          >
            ✧
          </span>
          <span className="flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-lg font-black text-white">مساعد تخصيص سِدرة</span>
              <span className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                    style={{ background: "rgba(255,255,255,.14)", color: "#f3e3c6" }}>
                يعمل داخل متصفحك
              </span>
            </span>
            <span className="mt-1.5 block text-[13.5px] leading-7" style={{ color: "#cbbdb0" }}>
              صِف التعديل الذي تريده بالعربية، واحصل على الكود جاهزًا مع شرحه ومعاينته قبل التطبيق.
            </span>
          </span>
          <span
            className="inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-black text-white transition group-hover:gap-3"
            style={{ background: S.red }}
          >
            ابدأ التخصيص
            <span aria-hidden>←</span>
          </span>
        </button>

        {/* ── بطاقات الخدمات ── */}
        <ul className="grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s) => {
            const items = byGroup(s.group);
            return (
              <li key={s.group}>
                <div
                  className="flex h-full flex-col rounded-2xl border bg-white p-5 transition hover:shadow-md"
                  style={{ borderColor: S.border }}
                >
                  <div className="mb-3 flex items-start gap-3">
                    <span
                      aria-hidden
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
                      style={{ background: `${s.tint}14`, color: s.tint }}
                    >
                      {s.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[11px] font-black tabular-nums" style={{ color: s.tint }}>{s.no}</span>
                        <h3 className="text-[15.5px] font-black" style={{ color: S.ink }}>{s.title}</h3>
                      </div>
                      <p className="mt-1 text-[12.5px] leading-6" style={{ color: S.muted }}>{s.desc}</p>
                    </div>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums"
                          style={{ background: S.cream, color: S.soft }}>
                      {items.length}
                    </span>
                  </div>

                  <ul className="mt-auto flex flex-wrap gap-1.5 border-t pt-3" style={{ borderColor: S.borderSoft }}>
                    {items.map((n) => (
                      <li key={n.id}>
                        <button
                          type="button"
                          onClick={() => scrollTo(n.id)}
                          className="rounded-lg border px-2.5 py-1 text-[12px] font-semibold transition hover:shadow-sm"
                          style={{ borderColor: S.border, color: S.muted }}
                        >
                          {n.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
