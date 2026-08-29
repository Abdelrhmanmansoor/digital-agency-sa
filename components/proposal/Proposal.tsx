"use client";

/* ══════════════════════════════════════════════════════════════════════════
   عرض سعر مؤسسة سليمان — صفحة عرض تجاري مخصّصة للعميل.
   ترتيب السرد: احتياج العميل ← الحل ← ما سنقدمه ← الدليل ← TF1ONE ←
   الأعمال ← المستندات ← العرض المالي ← الخطوة التالية.
   ══════════════════════════════════════════════════════════════════════════ */

import { useCallback, useEffect, useRef, useState } from "react";
import s from "./proposal.module.css";
import {
  CASES,
  CONTACT,
  DOCUMENTS,
  LOGOFOLIO,
  PROJECTS,
  RESULTS,
  WORK_GALLERY,
} from "./data";

const WA = `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, "")}`;
const TF1ONE = PROJECTS.find((p) => p.key === "tf1one");
/* TF1ONE له قسم Case Study مستقل، فلا يُكرَّر داخل الشبكة */
const GRID_PROJECTS = PROJECTS.filter((p) => p.key !== "tf1one");

/* ────────────────────────── أدوات مساعدة صغيرة ────────────────────────── */

/** يضيف .revealed للعنصر عند دخوله الشاشة. يعمل مرة واحدة لكل عنصر. */
function useReveal() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const nodes = root.querySelectorAll<HTMLElement>(`.${s.reveal}`);
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add(s.revealed));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).classList.add(s.revealed);
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    nodes.forEach((n, i) => {
      n.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
      io.observe(n);
    });
    return () => io.disconnect();
  }, []);

  return ref;
}

/** يقفل تمرير الصفحة خلف أي طبقة عرض، ويغلقها بمفتاح Escape. */
function useOverlay(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
}

const Ext = () => (
  <svg viewBox="0 0 24 24" fill="none" width="13" height="13" aria-hidden="true">
    <path
      d="M7 17 17 7M9 7h8v8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="m4 12.5 5.2 5.2L20 7"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Info = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M12 11v5.5M12 7.6v.9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PATH = {
  store: "M4 8h16l-1 12H5L4 8Zm4 0V6a4 4 0 0 1 8 0v2",
  megaphone: "M4 10v4h3l7 4V6l-7 4H4Zm13 .5a3 3 0 0 1 0 3",
  brush: "M5 19c2 0 3-1.2 3-3s3-1.6 4.5-3L19 6.6 17.4 5l-6.4 6.5C9.6 13 9 16 7 16s-2 3-2 3Z",
  cursor: "M6 4l12 7-5 1.4L10.5 18 6 4Z",
  code: "M9 8l-4 4 4 4m6-8 4 4-4 4",
  chart: "M4 19h16M7 16V9m5 7V5m5 11v-5",
  users: "M16 18v-1.5A3.5 3.5 0 0 0 12.5 13h-5A3.5 3.5 0 0 0 4 16.5V18m9-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7 11v-1.5a3.5 3.5 0 0 0-2.6-3.4M16 4.2a3 3 0 0 1 0 5.6",
  doc: "M14 3v5h5M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8l-5-5Z",
  mail: "M4 6h16v12H4V6Zm0 .6 8 6 8-6",
  phone:
    "M6.5 4h3l1.2 3.4-1.8 1.4a11 11 0 0 0 4.9 4.9l1.4-1.8L18.7 13v3a1.6 1.6 0 0 1-1.8 1.6A13.6 13.6 0 0 1 5 7.2 1.6 1.6 0 0 1 6.5 4Z",
  pin: "M12 21s7-5.4 7-10.5A7 7 0 0 0 5 10.5C5 15.6 12 21 12 21Zm0-8.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z",
};

/* ═════════════════════════════ المكوّن الرئيسي ═════════════════════════════ */

export default function Proposal() {
  const rootRef = useReveal();
  const [doc, setDoc] = useState<(typeof DOCUMENTS)[number] | null>(null);
  const [shot, setShot] = useState<string | null>(null);

  const closeDoc = useCallback(() => setDoc(null), []);
  const closeShot = useCallback(() => setShot(null), []);
  useOverlay(!!doc, closeDoc);
  useOverlay(!!shot, closeShot);

  return (
    <div
      className={s.page}
      dir="rtl"
      lang="ar"
      ref={rootRef as React.RefObject<HTMLDivElement>}
    >
      {/* ─────────────────────────── شريط التنقّل ─────────────────────────── */}
      <nav className={s.navbar} aria-label="أقسام العرض">
        <div className={`${s.wrap} ${s.navInner}`}>
          <span className={s.navBrand}>مؤسسة سليمان</span>
          <div className={s.navLinks}>
            <a href="#services">الخدمات</a>
            <a href="#experience">الخبرة</a>
            <a href="#tf1one">TF1ONE</a>
            <a href="#work">الأعمال</a>
            <a href="#results">النتائج</a>
            <a href="#documents">المستندات</a>
            <a href="#pricing">العرض المالي</a>
          </div>
          <a
            className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
          >
            تواصل
          </a>
        </div>
      </nav>

      {/* ═══════════════════════════ 01 — HERO ═══════════════════════════ */}
      <header className={s.hero}>
        <div className={s.heroGrid} aria-hidden="true" />
        <div className={s.heroGlow} aria-hidden="true" />
        <div className={s.wrap}>
          <div className={s.heroInner}>
            <span className={s.badge}>
              <span className={s.badgeDot} />
              عرض تجاري مخصص
            </span>

            <h1 className={s.heroTitle}>حلول رقمية متكاملة لتنمية مشروعك</h1>

            <p className={s.heroText}>
              نقدّم لك منظومة متكاملة تجمع بين إدارة المتجر، التسويق الرقمي، تطوير
              تجربة العميل، والحلول الرقمية — من جهة واحدة وبمنهج واضح قابل
              للتوسع.
            </p>

            <div className={s.heroBy}>
              <div>
                <div className={s.heroByLabel}>إعداد</div>
                <div className={s.heroByName}>مؤسسة سليمان</div>
              </div>
            </div>

            <div className={s.btnRow}>
              <button
                type="button"
                className={`${s.btn} ${s.btnPrimary}`}
                onClick={() => setDoc(DOCUMENTS[0])}
              >
                استعراض العرض
              </button>
              <a
                className={`${s.btn} ${s.btnGhostLight}`}
                href={DOCUMENTS[0].file}
                download={DOCUMENTS[0].download}
              >
                تحميل العرض PDF
              </a>
            </div>
          </div>

          {/* أرقام تعريفية — مصدرها صفحة «التحدي والفرصة» في ملف العرض المرفق */}
          <div className={s.heroStats}>
            <div className={s.heroStat}>
              <div className={s.heroStatValue}>18+</div>
              <div className={s.heroStatLabel}>علامة تجارية في السوق السعودي والخليجي</div>
            </div>
            <div className={s.heroStat}>
              <div className={s.heroStatValue}>+5</div>
              <div className={s.heroStatLabel}>سنوات في السوق الخليجي</div>
            </div>
            <div className={s.heroStat}>
              <div className={s.heroStatValue}>360°</div>
              <div className={s.heroStatLabel}>إدارة · تسويق · تطوير</div>
            </div>
            <div className={s.heroStat}>
              <div className={s.heroStatValue}>KSA · GCC</div>
              <div className={s.heroStatLabel}>السعودية · الإمارات · قطر · الكويت</div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════ 02 — لماذا هذا العرض ═══════════════════════ */}
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.splitHead}>
            <div className={s.reveal}>
              <span className={s.eyebrow}>Introduction</span>
              <h2 className={s.h2}>لماذا هذا العرض؟</h2>
            </div>
            <p className={`${s.lead} ${s.reveal}`}>
              المطلوب ليس تنفيذ مهمة منفصلة، بل بناء منظومة رقمية تعمل معاً؛ من
              المتجر والتجربة الرقمية إلى التسويق والمحتوى والتطوير. لذلك صُمم هذا
              العرض ليجمع الخدمات الأساسية في مسار واضح وقابل للتوسع.
            </p>
          </div>

          <div className={s.pillars}>
            {[
              {
                n: "01",
                t: "إدارة متكاملة",
                d: "إدارة وتشغيل وتحسين المتجر بصورة مستمرة.",
              },
              {
                n: "02",
                t: "تسويق رقمي",
                d: "إدارة الأنشطة والحملات التسويقية وفق خطة واضحة.",
              },
              {
                n: "03",
                t: "تجربة أفضل",
                d: "تحسين الواجهة والمحتوى ومسار العميل داخل المتجر.",
              },
              {
                n: "04",
                t: "جهة واحدة",
                d: "تقليل تشتت المشروع بين عدة جهات تنفيذ.",
              },
            ].map((p) => (
              <div key={p.n} className={`${s.pillar} ${s.reveal}`}>
                <span className={s.pillarNum}>{p.n}</span>
                <h3 className={s.h3}>{p.t}</h3>
                <p className={s.muted}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════ 03 — ماذا ستحصل عليه ═════════════════════ */}
      <section className={`${s.section} ${s.tinted}`} id="services">
        <div className={s.wrap}>
          <div className={s.reveal}>
            <span className={s.eyebrow}>Scope of Work</span>
            <h2 className={s.h2}>ماذا ستحصل عليه؟</h2>
            <p className={s.lead}>
              الخدمات التالية هي نطاق العمل المعتمد في ملف العرض المرفق، وتُنفَّذ
              ضمن الباقة المتفق عليها.
            </p>
          </div>

          <div className={s.svcGrid}>
            {[
              {
                icon: PATH.store,
                t: "إدارة المتجر",
                d: "إدارة وتحسين المتجر، المنتجات، المحتوى، الواجهة وتجربة المستخدم.",
                items: [
                  "إضافة وتحديث وتصنيف المنتجات",
                  "تحديث البانرات والصفحة الرئيسية وصفحات العروض",
                  "إعداد وتفعيل العروض الموسمية والكوبونات",
                ],
              },
              {
                icon: PATH.megaphone,
                t: "التسويق الرقمي",
                d: "إدارة وتطوير الأنشطة والحملات التسويقية.",
                items: [
                  "خطة تسويقية شهرية وتحديد الجمهور المستهدف",
                  "إدارة إعلانات Meta وGoogle واختبارها وتحسينها",
                  "إدارة الميزانية الإعلانية وتتبع التحويلات",
                ],
              },
              {
                icon: PATH.brush,
                t: "التصميم والمحتوى",
                d: "إنتاج المواد البصرية والمحتوى الداعم للنشاط التجاري.",
                items: [
                  "تصاميم إعلانية احترافية",
                  "كتابة نصوص تسويقية ومحتوى منصات التواصل",
                  "مواد بصرية للعروض والمناسبات",
                ],
              },
              {
                icon: PATH.cursor,
                t: "تحسين تجربة المستخدم",
                d: "تحسين الواجهة وترتيب المحتوى وعناصر التحويل.",
                items: [
                  "مراجعة مستمرة لتدفق الشراء والتنقل",
                  "تقليص نسبة الخروج وتحسين معدل التحويل",
                  "ترتيب عناصر التحويل داخل الصفحات",
                ],
              },
              {
                icon: PATH.code,
                t: "الحلول الرقمية",
                d: "تطوير وتحسين الحلول الرقمية المرتبطة بالمشروع حسب نطاق العمل.",
                items: [
                  "تطبيق جوال iOS وAndroid مرتبط بمتجر سلة",
                  "ربط مباشر ومتزامن مع المتجر وتحديثات تلقائية",
                  "رفع التطبيق على Google Play وApp Store",
                ],
              },
              {
                icon: PATH.chart,
                t: "التحليل والتقارير",
                d: "رصد مؤشرات الأداء وبناء القرارات على البيانات الفعلية.",
                items: [
                  "تقارير أداء دورية وتحليل مؤشرات الحملات",
                  "رصد سلوك الزوار داخل المتجر",
                  "اقتراحات تحسين مستمرة",
                ],
              },
            ].map((c) => (
              <article key={c.t} className={`${s.svcCard} ${s.reveal}`}>
                <div className={s.svcIcon}>
                  <Icon d={c.icon} />
                </div>
                <h3 className={s.h3}>{c.t}</h3>
                <p className={s.muted}>{c.d}</p>
                <ul className={s.svcList}>
                  {c.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ 04 — خبرة يمكن رؤيتها ══════════════════════ */}
      <section className={`${s.section} ${s.dark}`} id="experience">
        <div className={s.wrap}>
          <div className={s.reveal}>
            <span className={s.eyebrow}>Proof of Work</span>
            <h2 className={s.h2}>خبرة يمكن رؤيتها</h2>
            <p className={s.lead}>
              بدلاً من الاكتفاء بالحديث عن الخبرة، نستعرض نماذج فعلية من المشاريع
              التي عملت عليها مؤسسة سليمان — بشعاراتها الحقيقية وروابطها المباشرة.
            </p>
          </div>

          <div className={s.logoStrip}>
            {LOGOFOLIO.map((l) => (
              <div key={l.key} className={`${s.logoCell} ${s.reveal}`}>
                {/* الشعار الأصلي كما ورد في ملف الأعمال — بلا إعادة رسم أو تلوين */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={`شعار ${l.label}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ 05 — TF1ONE — Featured Case Study ══════════════════ */}
      {TF1ONE && (
        <section className={`${s.section} ${s.dark}`} id="tf1one">
          <div className={s.wrap}>
            <div className={s.reveal}>
              <span className={s.eyebrow}>Featured Case Study</span>
              <div className={s.caseHead}>
                <div className={s.caseLogo}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={TF1ONE.logo!} alt="شعار TF1ONE" />
                </div>
                <div>
                  <h2 className={s.caseTitle}>TF1ONE</h2>
                  <p className={s.caseSub}>
                    منصة سعودية متخصصة في الوظائف والتوظيف
                  </p>
                </div>
              </div>
            </div>

            <div className={s.reveal}>
              <div className={s.browser}>
                <div className={s.browserBar} aria-hidden="true">
                  <span
                    className={s.browserDot}
                    style={{ background: "#ff5f57" }}
                  />
                  <span
                    className={s.browserDot}
                    style={{ background: "#febc2e" }}
                  />
                  <span
                    className={s.browserDot}
                    style={{ background: "#28c840" }}
                  />
                  <span className={s.browserUrl}>https://www.tf1one.com/</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={s.browserShot}
                  src={TF1ONE.shot!}
                  alt="لقطة فعلية من منصة TF1ONE"
                  width={1280}
                  height={800}
                />
              </div>
            </div>

            <div className={s.caseCols}>
              <div className={`${s.caseCol} ${s.reveal}`}>
                <h3 className={s.caseColTitle}>المشروع</h3>
                <p className={s.caseRowText}>
                  منصة رقمية سعودية متخصصة في الوظائف والتوظيف، تربط أصحاب العمل
                  بالكفاءات في السوق المحلي. أحد أبرز المشاريع التي تتولى مؤسسة
                  سليمان تشغيلها وتسويقها الرقمي.
                </p>
              </div>

              <div className={`${s.caseCol} ${s.reveal}`}>
                <h3 className={s.caseColTitle}>نطاق العمل</h3>
                <ul className={s.caseScope}>
                  <li>
                    <strong>الحضور الرقمي</strong> — بناء حضور رقمي موحد يعكس
                    احترافية المنصة ويستهدف شريحتين: أصحاب العمل والباحثين عن فرص.
                  </li>
                  <li>
                    <strong>الحملات الإعلانية</strong> — حملات مدفوعة مدروسة على
                    Meta تستهدف كل فئة بمحتوى ورسالة مختلفة.
                  </li>
                  <li>
                    <strong>المحتوى والتصميم</strong> — إنتاج محتوى منصات يبني
                    الثقة ويوصل قيمة المنصة لكلا الطرفين.
                  </li>
                  <li>
                    <strong>تحليل الأداء</strong> — تقارير دورية ومتابعة مستمرة
                    للحملات وتعديل الاستراتيجية بناءً على الأداء الفعلي.
                  </li>
                </ul>
              </div>

              <div className={`${s.caseCol} ${s.reveal}`}>
                <h3 className={s.caseColTitle}>النتيجة</h3>
                <p className={s.caseRowText}>
                  ما نُفِّذ فعلياً: إدارة الحضور الرقمي، التسويق والمحتوى، التصميم
                  الإعلاني، ومتابعة الأداء — بصفة تشغيل وتسويق رقمي متكامل للمنصة.
                </p>
                <div className={s.caseNote}>
                  ملف العرض المرفق لا يتضمن أرقام أداء منسوبة تحديداً إلى TF1ONE،
                  لذلك لا تُنسب هنا أي نتيجة رقمية للمشروع. الأرقام الموثقة معروضة
                  في قسم <a href="#results" style={{ color: "inherit" }}>النتائج</a>{" "}
                  منسوبة إلى حملاتها الفعلية.
                </div>
                <div className={s.btnRow} style={{ marginTop: 22 }}>
                  <a
                    className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
                    href="https://www.tf1one.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    زيارة منصة TF1ONE <Ext />
                  </a>
                  <button
                    type="button"
                    className={`${s.btn} ${s.btnGhostLight} ${s.btnSm}`}
                    onClick={() => setDoc(DOCUMENTS[0])}
                  >
                    عرض تفاصيل المشروع
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════ 06 — أعمال مختارة ══════════════════════ */}
      <section className={s.section} id="work">
        <div className={s.wrap}>
          <div className={s.reveal}>
            <span className={s.eyebrow}>Selected Work</span>
            <h2 className={s.h2}>أعمال مختارة من مشاريعنا</h2>
            <p className={s.lead}>
              كل بطاقة تحمل الشعار الرسمي للعلامة كما هو مستخدم في موقعها، ولقطة
              فعلية من الموقع، ورابطاً مباشراً يفتح الموقع الأصلي.
            </p>
          </div>

          <div className={s.projGrid}>
            {GRID_PROJECTS.map((p) => (
              <article key={p.key} className={`${s.projCard} ${s.reveal}`}>
                {/* بلا لقطة موقع → تتمدّد مساحة الشعار بدل إظهار صورة بديلة */}
                <div
                  className={[
                    s.projLogo,
                    p.logoOnDark ? s.projLogoDark : "",
                    p.shot ? "" : s.projLogoTall,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {p.logo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={p.logo} alt={`شعار ${p.name}`} loading="lazy" />
                  ) : (
                    /* لا شعار حقيقي متاح — يُكتب الدومين بدل اختلاق شعار */
                    <span className={s.projLogoFallback}>{p.domain}</span>
                  )}
                </div>

                {p.shot && (
                  <div className={s.projShot}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.shot}
                      alt={`لقطة من موقع ${p.name}`}
                      loading="lazy"
                      width={1280}
                      height={800}
                    />
                  </div>
                )}

                <div className={s.projBody}>
                  <h3 className={s.projName}>{p.name}</h3>
                  {p.note && <p className={s.projNote}>{p.note}</p>}
                  <a
                    className={s.projVisit}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    زيارة الموقع <Ext />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ 07 — نتائج موثقة ══════════════════════ */}
      <section className={`${s.section} ${s.dark}`} id="results">
        <div className={s.wrap}>
          <div className={s.reveal}>
            <span className={s.eyebrow}>Documented Results</span>
            <h2 className={s.h2}>نتائج موثقة</h2>
            <p className={s.lead}>
              الأرقام التالية مأخوذة حرفياً من تقارير حملات فعلية أُدِيرَت عبر
              حسابات إعلانية حقيقية، كما وردت في ملف العرض المرفق.
            </p>
          </div>

          <div className={s.resGrid}>
            {RESULTS.map((r) => (
              <div key={r.label} className={`${s.resCard} ${s.reveal}`}>
                <div className={s.resValue}>{r.value}</div>
                <div className={s.resLabel}>{r.label}</div>
                <div className={s.resMeta}>{r.meta}</div>
              </div>
            ))}
          </div>

          <div className={`${s.spendBar} ${s.reveal}`}>
            <div>
              <div className={s.muted}>إجمالي الإنفاق الإعلاني المُدار</div>
              <div className={s.spendValue}>AED 71,460</div>
            </div>
            <p className={s.muted} style={{ maxWidth: "44ch", margin: 0 }}>
              عبر حسابات الإمارات وحدها. كل ريال إعلاني يُتابَع بتقارير يومية
              وأسبوعية، والقرارات تُبنى على الأداء الفعلي لا على التوقعات.
            </p>
          </div>

          {/* نماذج تنفيذ موثّقة */}
          <div className={s.reveal} style={{ marginTop: "clamp(52px,7vw,78px)" }}>
            <h3 className={s.h2} style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>
              نماذج تنفيذ موثّقة
            </h3>
          </div>
          <div className={s.caseRows}>
            {CASES.map((c) => (
              <div key={c.brand} className={`${s.caseRow} ${s.reveal}`}>
                <div>
                  <div className={s.caseRowBrand}>{c.brand}</div>
                  <div className={s.caseRowSector}>{c.sector}</div>
                </div>
                <div>
                  <span className={s.caseRowLabel}>الخدمة</span>
                  <p className={s.caseRowText}>{c.service}</p>
                </div>
                <div>
                  <span className={s.caseRowLabel}>ما نُفِّذ</span>
                  <p className={s.caseRowText}>{c.done}</p>
                </div>
              </div>
            ))}
          </div>

          {/* معرض من صفحات ملف الأعمال المرفق */}
          <div className={s.reveal} style={{ marginTop: "clamp(52px,7vw,78px)" }}>
            <h3 className={s.h2} style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>
              من ملف الأعمال
            </h3>
            <p className={s.lead}>
              صفحات فعلية من ملف الأعمال المرفق — اضغط أي صورة لعرضها بحجم أكبر.
            </p>
          </div>
          <div className={s.workGrid}>
            {WORK_GALLERY.map((w) => (
              <button
                key={w.src}
                type="button"
                className={`${s.workItem} ${s.reveal}`}
                onClick={() => setShot(w.src)}
                aria-label={`تكبير — ${w.label}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.src} alt={w.label} loading="lazy" />
                <span className={s.workLabel}>{w.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ 08 — مستندات العرض ══════════════════════ */}
      <section className={`${s.section} ${s.tinted}`} id="documents">
        <div className={s.wrap}>
          <div className={s.reveal}>
            <span className={s.eyebrow}>Documents</span>
            <h2 className={s.h2}>مستندات العرض</h2>
            <p className={s.lead}>
              الملفات الأصلية بصيغتها الكاملة — تُعرض داخل الصفحة مباشرة، وتُحمَّل
              بضغطة واحدة.
            </p>
          </div>

          <div className={s.docGrid}>
            {DOCUMENTS.map((d) => (
              <article key={d.key} className={`${s.docCard} ${s.reveal}`}>
                <div className={s.docPreview}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.preview}
                    alt={`الصفحة الأولى من ${d.title}`}
                    loading="lazy"
                  />
                </div>
                <div className={s.docBody}>
                  <div className={s.docMeta}>
                    <span className={s.docKind}>{d.kind}</span>
                    <span>{d.pages} صفحة</span>
                  </div>
                  <h3 className={s.h3}>{d.title}</h3>
                  <p className={s.muted}>{d.desc}</p>
                  <div className={s.docActions}>
                    <button
                      type="button"
                      className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
                      onClick={() => setDoc(d)}
                    >
                      عرض الملف
                    </button>
                    <a
                      className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}
                      href={d.file}
                      download={d.download}
                    >
                      تحميل
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ 09 — العرض المالي ══════════════════════ */}
      <section className={s.section} id="pricing">
        <div className={s.wrap}>
          <div className={s.reveal}>
            <span className={s.eyebrow}>Pricing</span>
            <h2 className={s.h2}>العرض المالي</h2>
            <p className={s.lead}>
              باقات الإدارة والتشغيل الشهرية. ميزانية الإعلانات تُضاف بشكل منفصل
              حسب الخطة الإعلانية ولا تشملها أي باقة.
            </p>
          </div>

          <div className={s.planGrid}>
            {[
              {
                name: "الأساسية",
                en: "Basic Package",
                price: "3,500",
                featured: false,
                features: [
                  "إدارة محتوى المتجر وتحديث المنتجات",
                  "تصاميم سوشيال ميديا ومحتوى منتظم",
                  "إدارة العروض والحملات الموسمية",
                  "متابعة تجربة المستخدم",
                  "تقرير أداء شهري",
                ],
              },
              {
                name: "الاحترافية",
                en: "Professional Package",
                price: "6,500",
                featured: true,
                features: [
                  "إدارة كاملة للمتجر وواجهاته",
                  "تصاميم وتصوير ومحتوى متكامل",
                  "إدارة حملة إعلانية مدفوعة",
                  "كتابة محتوى وصفحات المنتجات",
                  "تقارير أسبوعية وتحليل الأداء",
                  "اجتماع استراتيجي شهري",
                ],
              },
              {
                name: "المتكاملة",
                en: "Premium Package",
                price: "10,500",
                featured: false,
                features: [
                  "حضور رقمي كامل بلا حدود في النطاق",
                  "محتوى وتصميم وإنتاج متكامل",
                  "إدارة حملات متعددة بمتابعة يومية",
                  "تقارير يومية وأسبوعية مفصلة",
                  "مدير حساب مخصص",
                  "أولوية في الطلبات والتعديلات",
                ],
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`${s.plan} ${p.featured ? s.planFeatured : ""} ${s.reveal}`}
              >
                {p.featured && <span className={s.planTag}>الأكثر ترشيحاً</span>}
                <h3 className={s.planName}>{p.name}</h3>
                <div className={s.planEn}>{p.en}</div>
                <div className={s.planPrice}>
                  <span className={s.planNum}>{p.price}</span>
                  <span className={s.planUnit}>ريال / شهرياً</span>
                </div>
                <div className={s.planAside}>ميزانية الإعلانات خارج الباقة</div>
                <ul className={s.planFeatures}>
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  className={`${s.btn} ${p.featured ? s.btnPrimary : s.btnGhost}`}
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  اعتماد هذه الباقة
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 10 + 11 — بنود منفصلة عن الاشتراك الشهري ══════════════ */}
      <section className={`${s.section} ${s.dark}`}>
        <div className={s.wrap}>
          <div className={s.divider}>بنود بتكلفة منفصلة عن الاشتراك الشهري</div>

          <div className={s.separateWrap}>
            {/* 10 — التطبيق */}
            <div className={`${s.separateCard} ${s.reveal}`}>
              <span className={s.badge}>
                <span className={s.badgeDot} />
                تكلفة منفصلة
              </span>
              <h2 className={s.h2} style={{ marginTop: 20, marginBottom: 0 }}>
                التطبيق
              </h2>
              <div className={s.separatePrice}>
                <span className={s.separateNum}>2,000</span>
                <span className={s.separateUnit}>ريال · مرة واحدة</span>
              </div>
              <p className={s.lead} style={{ marginTop: 14 }}>
                تصميم التطبيق كخدمة مستقلة، ولا تدخل تكلفته ضمن الاشتراك الشهري
                للإدارة والتشغيل.
              </p>
              <ul className={s.caseScope} style={{ marginTop: 18 }}>
                <li>تطبيق iOS وAndroid مرتبط بمتجرك على سلة</li>
                <li>تصميم واجهة مخصصة تعكس هوية متجرك</li>
                <li>رفع التطبيق على Google Play وApp Store ضمن الخدمة</li>
              </ul>
            </div>

            {/* 11 — اشتراك سلة */}
            <div className={`${s.separateCard} ${s.reveal}`}>
              <span className={s.badge}>
                <span className={s.badgeDot} />
                يُدفع لمنصة سلة
              </span>
              <h2 className={s.h2} style={{ marginTop: 20, marginBottom: 0 }}>
                اشتراك منصة سلة
              </h2>
              <div className={s.separatePrice}>
                <span className={s.separateNum}>5,600</span>
                <span className={s.separateUnit}>ريال / سنة</span>
              </div>
              <p className={s.lead} style={{ marginTop: 14 }}>
                رسوم الاشتراك في منصة سلة تُدفع مباشرة إلى سلة وليست ضمن أتعاب
                مؤسسة سليمان.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 12 — ملخص التكاليف ══════════════════════ */}
      <section className={`${s.section} ${s.tinted}`}>
        <div className={s.wrap}>
          <div className={s.reveal}>
            <span className={s.eyebrow}>Cost Summary</span>
            <h2 className={s.h2}>ملخص التكاليف</h2>
            <p className={s.lead}>
              ثلاثة بنود مستقلة بدوريات دفع مختلفة — لا تُجمع في مبلغ واحد.
            </p>
          </div>

          <div className={`${s.summaryCard} ${s.reveal}`}>
            <div className={s.summaryRows}>
              <div className={s.summaryRow}>
                <span className={`${s.summaryTag} ${s.tagMonthly}`}>شهرياً</span>
                <div className={s.summaryLabel}>الإدارة والتشغيل</div>
                <div className={s.summaryValue}>من 3,500 ريال</div>
              </div>
              <div className={s.summaryRow}>
                <span className={`${s.summaryTag} ${s.tagOnce}`}>مرة واحدة</span>
                <div className={s.summaryLabel}>التطبيق</div>
                <div className={s.summaryValue}>2,000 ريال</div>
              </div>
              <div className={s.summaryRow}>
                <span className={`${s.summaryTag} ${s.tagYearly}`}>سنوياً</span>
                <div className={s.summaryLabel}>اشتراك سلة</div>
                <div className={s.summaryValue}>5,600 ريال</div>
              </div>
            </div>
            <div className={s.summaryNote}>
              <Info />
              <span>
                تكلفة التطبيق واشتراك منصة سلة منفصلان عن الاشتراك الشهري للإدارة
                والتشغيل. ميزانية الإعلانات تُضاف بشكل منفصل حسب الخطة الإعلانية.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 13 — توصيتنا للمشروع ══════════════════════ */}
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.reveal}>
            <span className={s.eyebrow}>Recommendation</span>
            <h2 className={s.h2}>توصيتنا للمشروع</h2>
          </div>

          <div className={`${s.recommend} ${s.reveal}`}>
            <div className={s.recommendPrice}>
              <span className={s.badge}>
                <span className={s.badgeDot} />
                الأكثر ترشيحاً
              </span>
              <h3 className={s.planName} style={{ marginTop: 18 }}>
                الباقة الاحترافية
              </h3>
              <div className={s.planPrice}>
                <span className={s.planNum}>6,500</span>
                <span className={s.planUnit}>ريال / شهرياً</span>
              </div>
              <div className={s.planAside}>ميزانية الإعلانات خارج الباقة</div>
            </div>
            <ul className={s.recommendWhy}>
              <li>
                تغطي نطاق المشروع كاملاً: إدارة المتجر وواجهاته، والتصميم
                والمحتوى، والحملة الإعلانية المدفوعة — في اشتراك واحد بدل تجزئة
                العمل.
              </li>
              <li>
                تشمل كتابة محتوى صفحات المنتجات، وهو العنصر الأقرب أثراً على معدل
                التحويل داخل المتجر.
              </li>
              <li>
                تقاريرها أسبوعية لا شهرية، مع اجتماع استراتيجي شهري — وهو ما يسمح
                بتعديل الخطة أثناء تنفيذها لا بعد انتهائها.
              </li>
              <li>
                الأساسية لا تتضمن إدارة حملة مدفوعة، والمتكاملة موجّهة لنطاق أوسع
                من احتياج المشروع الحالي.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════════ 14 — جهة واحدة لإدارة المنظومة ══════════════════ */}
      <section className={`${s.section} ${s.dark}`}>
        <div className={s.wrap}>
          <div className={s.reveal}>
            <span className={s.eyebrow}>One System</span>
            <h2 className={s.h2}>جهة واحدة لإدارة المنظومة كاملة</h2>
            <p className={s.lead}>
              بدلاً من إدارة فريق متعدد الأطراف — فريق متكامل تحت إدارة واحدة،
              ونقطة تواصل واحدة مع العميل.
            </p>
          </div>

          <div className={s.systemGrid}>
            {[
              { t: "إدارة المتجر", d: PATH.store },
              { t: "التسويق", d: PATH.megaphone },
              { t: "التصميم", d: PATH.brush },
              { t: "المحتوى", d: PATH.doc },
              { t: "التطوير", d: PATH.code },
              { t: "المتابعة", d: PATH.chart },
            ].map((c) => (
              <div key={c.t} className={`${s.systemCell} ${s.reveal}`}>
                <div className={s.systemIcon}>
                  <Icon d={c.d} />
                </div>
                <div className={s.systemLabel}>{c.t}</div>
              </div>
            ))}
          </div>

          <div className={s.systemArrow} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
              <path
                d="M12 4v15m0 0-5-5m5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className={`${s.systemCore} ${s.reveal}`}>
            <h3 className={s.systemCoreName}>مؤسسة سليمان</h3>
            <div className={s.systemCoreLine}>
              منظومة واحدة — جهة واحدة — رؤية واحدة
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ 15 — الخطوة التالية ══════════════════════ */}
      <section className={s.section} id="next">
        <div className={s.wrap}>
          <div className={s.reveal}>
            <span className={s.eyebrow}>Next Steps</span>
            <h2 className={s.h2}>الخطوة التالية</h2>
          </div>

          <div className={s.steps}>
            {[
              { n: "01", t: "اعتماد العرض", d: "الموافقة على الباقة والنطاق العام للعمل." },
              {
                n: "02",
                t: "تحديد نطاق التنفيذ والأولوية",
                d: "ترتيب المهام حسب الأثر، وتحديد ما يبدأ في الأسبوع الأول.",
              },
              {
                n: "03",
                t: "بدء العمل والمتابعة",
                d: "انطلاق التنفيذ مع تقارير دورية واجتماعات منتظمة.",
              },
            ].map((st) => (
              <div key={st.n} className={`${s.step} ${s.reveal}`}>
                <span className={s.stepNum}>{st.n}</span>
                <h3 className={s.h3}>{st.t}</h3>
                <p className={s.muted}>{st.d}</p>
              </div>
            ))}
          </div>

          <div className={`${s.cta} ${s.reveal}`}>
            <div className={s.ctaGlow} aria-hidden="true" />
            <div className={s.ctaInner}>
              <h2 className={s.h2} style={{ marginBottom: 12 }}>
                ابدأ مع مؤسسة سليمان
              </h2>
              <p className={s.lead} style={{ marginInline: "auto" }}>
                نبدأ بمكالمة قصيرة نحدد فيها الباقة المناسبة ونطاق التنفيذ، ثم
                ينطلق العمل خلال أيام قليلة.
              </p>
              <div className={s.btnRow}>
                <a
                  className={`${s.btn} ${s.btnPrimary}`}
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  التواصل واعتماد العرض
                </a>
                <a
                  className={`${s.btn} ${s.btnGhostLight}`}
                  href={DOCUMENTS[0].file}
                  download={DOCUMENTS[0].download}
                >
                  تحميل العرض PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ 16 — الفوتر ═══════════════════════════ */}
      <footer className={s.footer}>
        <div className={s.wrap}>
          <div className={s.footerTop}>
            <div>
              <h2 className={s.footerName}>مؤسسة سليمان</h2>
              <p className={s.muted} style={{ maxWidth: "42ch" }}>
                حلول رقمية وتسويقية متكاملة للأعمال الطموحة.
              </p>
            </div>
            <div className={s.footerContact}>
              <div className={s.footerRow}>
                <Icon d={PATH.phone} />
                <a href={WA} target="_blank" rel="noopener noreferrer">
                  {CONTACT.whatsappLabel}
                </a>
              </div>
              <div className={s.footerRow}>
                <Icon d={PATH.mail} />
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
              <div className={s.footerRow}>
                <Icon d={PATH.pin} />
                <span>{CONTACT.market}</span>
              </div>
            </div>
          </div>
          <div className={s.footerBottom}>
            <span>
              هذا العرض سري ومخصص للعميل. الأسعار قابلة للتعديل حسب نطاق العمل
              المتفق عليه.
            </span>
            <span>مؤسسة سليمان · 2026</span>
          </div>
        </div>
      </footer>

      {/* ═════════════════════════ عارض ملفات PDF ═════════════════════════ */}
      {doc && (
        <div className={s.viewer} role="dialog" aria-modal="true" aria-label={doc.title}>
          <div className={s.viewerBar}>
            <span className={s.viewerTitle}>{doc.title}</span>
            <a
              className={`${s.btn} ${s.btnGhostLight} ${s.btnSm}`}
              href={doc.file}
              download={doc.download}
            >
              تحميل
            </a>
            <a
              className={`${s.btn} ${s.btnGhostLight} ${s.btnSm}`}
              href={doc.file}
              target="_blank"
              rel="noopener noreferrer"
            >
              فتح في تبويب جديد
            </a>
            <button
              type="button"
              className={s.viewerClose}
              onClick={closeDoc}
              aria-label="إغلاق العارض"
            >
              ✕
            </button>
          </div>
          <iframe className={s.viewerFrame} src={doc.file} title={doc.title} />
          <p className={s.viewerHint}>
            إذا لم يظهر الملف على جهازك، افتحه في تبويب جديد أو حمّله مباشرة.
          </p>
        </div>
      )}

      {/* ═══════════════════════════ عارض الصور ═══════════════════════════ */}
      {shot && (
        <div
          className={s.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="عرض الصورة"
          onClick={closeShot}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot} alt="صفحة من ملف الأعمال" />
        </div>
      )}
    </div>
  );
}
