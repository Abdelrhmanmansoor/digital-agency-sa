"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";
import {
  DELIVERABLES,
  LEGAL_FAQ,
  OBJECTIONS,
  PACKAGES,
  PLATFORMS,
  PRACTICE_AREAS,
  REFERENCES,
  type Pair,
} from "@/lib/legal-data";
import ReferenceCard from "./ReferenceCard";
import styles from "./LegalSolution.module.css";

/* French has no separate legal copy yet and falls back to English rather
   than shipping half-translated Arabic. */
const p = (pair: Pair, locale: string) => (locale === "ar" ? pair.ar : pair.en);

const copy = {
  ar: {
    kicker: "حلول للقطاع القانوني",
    h1: "موقع لمكتبك القانوني يحوّل الباحث عن محامٍ إلى موعد استشارة.",
    lead:
      "نبني مواقع ومنصات لمكاتب المحاماة والمحامين المستقلين في السعودية والخليج: صفحة لكل تخصص تترتب في البحث، دليل ثقة حقيقي، وطريق قصير من أول زيارة إلى أول مكالمة.",
    ctaPrimary: "احجز مكالمة تعريفية",
    ctaSecondary: "شاهد الباقات",
    proof: [
      ["10 أيام", "أقصر مسار للإطلاق"],
      ["عربي + إنجليزي", "نسختان حقيقيتان"],
      ["< ساعة", "متوسط زمن الرد"],
    ],
    mockUrl: "your-law-firm.sa/practice/labour",
    mockKicker: "قضايا عمالية",
    mockTitle: "فُصلت من عملك؟ اعرف ما تستحقه قبل أن توقّع أي شيء.",
    mockChips: [
      ["19 عامًا", "خبرة المكتب"],
      ["مرخّص", "وزارة العدل"],
      ["30 دقيقة", "الاستشارة الأولى"],
    ],
    mockCta: "احجز استشارة الآن",

    problemsKicker: "التشخيص",
    problemsTitle: "لماذا لا يجلب موقع المحاماة موكّلين؟",
    problemsLead: "ستة أنماط تتكرر في أغلب مواقع المكاتب التي راجعناها. كل واحد منها يقطع المسار في نقطة مختلفة.",

    buildKicker: "ما الذي نبنيه",
    buildTitle: "ثمانية مكوّنات، كل واحد منها يخدم قرار الموكّل.",
    buildLead: "لا يوجد قسم هنا لأن «المواقع فيها هذا القسم عادة». كل مكوّن يزيل اعتراضًا محددًا أو يفتح مصدر زيارات محددًا.",

    areasKicker: "التخصصات",
    areasTitle: "صفحة مستقلة لكل مجال — لأن البحث نفسه منفصل.",
    areasLead:
      "من يبحث عن «محامي قضايا عمالية» لا يريد صفحة تعدّد عشرة تخصصات. كل مجال يحصل على صفحته الخاصة بنصّها ونموذجها وأسئلتها.",

    platformsKicker: "أبعد من موقع",
    platformsTitle: "نبني المنصات القانونية أيضًا، لا الواجهات فقط.",
    platformsLead:
      "إذا كانت الفكرة منتجًا رقميًا لا صفحة تعريفية، نبدأ من التحليل ونطاق العمل الموثّق قبل كتابة أول سطر برمجي.",

    refsKicker: "مراجع من السوق",
    refsTitle: "مواقع نستشهد بها، ونشرح لماذا تعمل.",
    refsLead:
      "هذه مواقع حقيقية لمكاتب محاماة داخل السعودية وخارجها. نعرضها لتوضيح القرارات التي تصنع الفرق — لا لننسخ تصميمًا.",
    refsNote:
      "الروابط تفتح المواقع الأصلية في نافذة جديدة، والصور معاينة حيّة تُولّد عند الطلب. جميع الحقوق تعود لأصحابها، ولا علاقة تجارية تربطنا بهم.",
    visit: "زيارة الموقع",

    packsKicker: "الباقات",
    packsTitle: "سعر ومدة معلنان، ونطاق عمل مكتوب.",
    packsLead: "الأسعار شاملة التصميم والتطوير والنشر. الاستضافة والنطاق تُسجَّل باسمك وتبقى ملكك.",
    packsCta: "اطلب هذه الباقة",
    packsDays: (n: number) => `التسليم خلال ${n} يوم عمل`,
    packsNote: "تحتاج نطاقًا مختلفًا؟ نرسل عرضًا مخصصًا بعد مكالمة قصيرة، بلا التزام.",
    sar: "ر.س",

    faqKicker: "الأسئلة الشائعة",
    faqTitle: "ما يسأل عنه المحامون قبل أن يبدؤوا.",

    disclaimer:
      "تنويه: AM Design وكالة تصميم وتطوير رقمي ولا تقدّم خدمات أو استشارات قانونية. المحتوى القانوني المنشور على أي موقع نبنيه يُراجَع ويُعتمد من محامٍ مرخّص لدى العميل قبل النشر.",
    hello: "مرحبًا، أريد مناقشة موقع لمكتب محاماة.",
    helloPack: (name: string) => `مرحبًا، أرغب في باقة «${name}» لموقع مكتب محاماة.`,
  },
  en: {
    kicker: "Solutions for the legal sector",
    h1: "A law firm website that turns someone searching for a lawyer into a booked consultation.",
    lead:
      "We build websites and platforms for law firms and independent lawyers across Saudi Arabia and the Gulf: a page per practice area that can rank, real proof of standing, and a short path from first visit to first call.",
    ctaPrimary: "Book an intro call",
    ctaSecondary: "See the packages",
    proof: [
      ["10 days", "Fastest route to launch"],
      ["Arabic + English", "Two real versions"],
      ["< 1 hr", "Average reply time"],
    ],
    mockUrl: "your-law-firm.sa/practice/labour",
    mockKicker: "Labour law",
    mockTitle: "Dismissed from your job? Know what you are owed before signing anything.",
    mockChips: [
      ["19 years", "In practice"],
      ["Licensed", "Ministry of Justice"],
      ["30 min", "First consultation"],
    ],
    mockCta: "Book a consultation",

    problemsKicker: "Diagnosis",
    problemsTitle: "Why most law firm websites bring no clients",
    problemsLead: "Six patterns repeat across the firm sites we have reviewed. Each one cuts the path at a different point.",

    buildKicker: "What we build",
    buildTitle: "Eight components, each one serving a client decision.",
    buildLead: "Nothing here is included because websites usually have it. Each part removes a specific objection or opens a specific source of traffic.",

    areasKicker: "Practice areas",
    areasTitle: "A page per area, because the search itself is separate.",
    areasLead:
      "Someone searching for an employment lawyer does not want a page listing ten specialisms. Each area gets its own page, copy, form and questions.",

    platformsKicker: "Beyond a website",
    platformsTitle: "We build legal platforms too, not only front ends.",
    platformsLead: "When the idea is a product rather than a brochure, we start from analysis and a written scope before the first line of code.",

    refsKicker: "Market references",
    refsTitle: "Sites we point to, and why they work.",
    refsLead: "These are real law firm sites inside and outside Saudi Arabia. We show them to explain the decisions that make a difference, not to copy a design.",
    refsNote:
      "Links open the original sites in a new tab, and the images are live previews generated on demand. All rights belong to their owners, and we have no commercial relationship with them.",
    visit: "Visit the site",

    packsKicker: "Packages",
    packsTitle: "A published price, a published timeline and a written scope.",
    packsLead: "Prices cover design, development and launch. Hosting and domain are registered in your name and stay yours.",
    packsCta: "Request this package",
    packsDays: (n: number) => `Delivered in ${n} working days`,
    packsNote: "Need a different scope? We send a tailored proposal after a short call, with no commitment.",
    sar: "SAR",

    faqKicker: "Questions",
    faqTitle: "What lawyers ask before they start.",

    disclaimer:
      "Note: AM Design is a digital design and development agency and does not provide legal services or advice. Legal content published on any site we build is reviewed and approved by a licensed lawyer at the client before launch.",
    hello: "Hi, I would like to discuss a law firm website.",
    helloPack: (name: string) => `Hi, I am interested in the "${name}" package for a law firm website.`,
  },
} as const;

const CHECK = "m4 12 5.5 5.5L20 7";

function Check({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={CHECK} />
    </svg>
  );
}

/* Eight line icons, one per deliverable, at one stroke weight. */
const DELIVERABLE_ICONS = [
  "M4 4h16v16H4zM4 9h16M9 9v11",
  "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  "M6 3h9l4 4v14H6zM15 3v4h4M9 13h6M9 17h4",
  "M8 2v3M16 2v3M3.5 8.5h17M4 6h16v15H4zM9.5 14.5l2 2 3.5-4",
  "M4 5h16v11H8l-4 4z M8 9h8M8 12.5h5",
  "M12 3 3 7v5c0 4.6 3.7 8.4 9 9.5 5.3-1.1 9-4.9 9-9.5V7z M9.5 12l1.8 1.8L15 10",
  "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M3.5 9h17M3.5 15h17 M12 3c2.5 3 2.5 15 0 18M12 3C9.5 6 9.5 18 12 21",
  "M12 2 4 6v6c0 5 3.4 9.2 8 10 4.6-.8 8-5 8-10V6z M9.5 12l1.8 1.8L15 10",
];

export default function LegalSolution() {
  const locale = useLocale();
  const t = copy[locale === "ar" ? "ar" : "en"];
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const mockRef = useRef<HTMLDivElement>(null);

  /* Pointer-driven tilt. Values are written straight to CSS custom
     properties instead of through state, so moving the mouse never
     re-renders the tree. Touch and reduced-motion never reach it: the
     handler is bound to pointer events on a fine pointer only, and the
     stylesheet zeroes the transform under reduced motion. */
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const node = mockRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--ry", `${x * 9}deg`);
    node.style.setProperty("--rx", `${-y * 7}deg`);
  };
  const resetTilt = () => {
    mockRef.current?.style.setProperty("--ry", "0deg");
    mockRef.current?.style.setProperty("--rx", "0deg");
  };

  const href = (to: string) => `/${locale}${to}`;

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className={styles.hero} data-own-spacing>
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div>
            <p className={`${styles.kicker} ${styles.kickerLight}`}>{t.kicker}</p>
            <h1 className={styles.h1}>{t.h1}</h1>
            <p className={styles.heroLead}>{t.lead}</p>
            <div className={styles.heroActions}>
              <a href={getWhatsAppLink(t.hello)} target="_blank" rel="noopener noreferrer" className={styles.primary}>
                {t.ctaPrimary}
              </a>
              <a href="#packages" className={styles.ghost}>
                {t.ctaSecondary}
              </a>
            </div>
            <div className={styles.heroProof}>
              {t.proof.map(([value, label]) => (
                <div key={label} className={styles.proofItem}>
                  <span className={styles.proofValue}>{value}</span>
                  <span className={styles.proofLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* A practice-area page, drawn rather than screenshotted: it shows
              the exact structure the section below argues for. */}
          <div className={styles.stage} onPointerMove={onPointerMove} onPointerLeave={resetTilt}>
            <div className={styles.mock} ref={mockRef} aria-hidden>
              <div className={styles.mockBar}>
                <span className={styles.dot} style={{ background: "#FF5F57" }} />
                <span className={styles.dot} style={{ background: "#FFBD2E" }} />
                <span className={styles.dot} style={{ background: "#28CA41" }} />
                <span className={styles.mockUrl} dir="ltr">
                  {t.mockUrl}
                </span>
              </div>
              <div className={styles.mockBody}>
                <span className={styles.mockKicker}>{t.mockKicker}</span>
                <h2 className={styles.mockTitle}>{t.mockTitle}</h2>
                <div className={styles.mockLine} style={{ width: "92%" }} />
                <div className={styles.mockLine} style={{ width: "74%" }} />
                <div className={styles.mockRow}>
                  {t.mockChips.map(([value, label]) => (
                    <div key={label} className={styles.mockChip}>
                      <span className={styles.mockChipValue}>{value}</span>
                      <span className={styles.mockChipLabel}>{label}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.mockCta}>{t.mockCta}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DIAGNOSIS ═══ */}
      <section className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.head} data-reveal>
            <p className={styles.kicker}>{t.problemsKicker}</p>
            <h2 className={styles.h2}>{t.problemsTitle}</h2>
            <p className={styles.lead}>{t.problemsLead}</p>
          </div>
          <div className={styles.problems}>
            {OBJECTIONS.map((item, i) => (
              <div key={item.problem.en} className={styles.problem} data-reveal data-reveal-delay={i * 50}>
                <span className={styles.problemNo}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.problemTitle}>{p(item.problem, locale)}</h3>
                <p className={styles.problemWhy}>{p(item.consequence, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DELIVERABLES ═══ */}
      <section className={`${styles.section} ${styles.sectionAlt}`} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.head} data-reveal>
            <p className={styles.kicker}>{t.buildKicker}</p>
            <h2 className={styles.h2}>{t.buildTitle}</h2>
            <p className={styles.lead}>{t.buildLead}</p>
          </div>
          <div className={styles.deliverables}>
            {DELIVERABLES.map((item, i) => (
              <article key={item.title.en} className={styles.deliverable} data-reveal data-reveal-delay={(i % 2) * 60}>
                <span className={styles.deliverableIcon}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={DELIVERABLE_ICONS[i] ?? DELIVERABLE_ICONS[0]} />
                  </svg>
                </span>
                <h3 className={styles.deliverableTitle}>{p(item.title, locale)}</h3>
                <p className={styles.deliverableBody}>{p(item.body, locale)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRACTICE AREAS ═══ */}
      <section className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.head} data-reveal>
            <p className={styles.kicker}>{t.areasKicker}</p>
            <h2 className={styles.h2}>{t.areasTitle}</h2>
            <p className={styles.lead}>{t.areasLead}</p>
          </div>
          <div className={styles.areas}>
            {PRACTICE_AREAS.map((area, i) => (
              <a
                key={area.key}
                className={styles.area}
                href={getWhatsAppLink(`${t.hello} (${p(area.name, locale)})`)}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                data-reveal-delay={(i % 4) * 45}
              >
                <span className={styles.areaName}>
                  {p(area.name, locale)}
                  <span className={styles.areaArrow}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </span>
                <span className={styles.areaHint}>{p(area.hint, locale)}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PLATFORMS ═══ */}
      <section className={`${styles.section} ${styles.sectionDark}`} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.head} data-reveal>
            <p className={`${styles.kicker} ${styles.kickerLight}`}>{t.platformsKicker}</p>
            <h2 className={styles.h2}>{t.platformsTitle}</h2>
            <p className={styles.lead}>{t.platformsLead}</p>
          </div>
          <div className={styles.platforms}>
            {PLATFORMS.map((platform, i) => (
              <article key={platform.title.en} className={styles.platform} data-reveal data-reveal-delay={(i % 2) * 70}>
                <h3 className={styles.platformTitle}>{p(platform.title, locale)}</h3>
                <p className={styles.platformBody}>{p(platform.body, locale)}</p>
                <ul className={styles.platformPoints}>
                  {platform.points.map((point) => (
                    <li key={point.en}>
                      <Check />
                      {p(point, locale)}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REFERENCES ═══ */}
      <section className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.head} data-reveal>
            <p className={styles.kicker}>{t.refsKicker}</p>
            <h2 className={styles.h2}>{t.refsTitle}</h2>
            <p className={styles.lead}>{t.refsLead}</p>
          </div>
          <div className={styles.refs}>
            {REFERENCES.map((ref, i) => (
              <div key={ref.url} data-reveal data-reveal-delay={(i % 3) * 60}>
                <ReferenceCard
                  name={ref.name}
                  url={ref.url}
                  tag={p(ref.tag, locale)}
                  note={p(ref.note, locale)}
                  visitLabel={t.visit}
                />
              </div>
            ))}
          </div>
          <p className={styles.refNote}>{t.refsNote}</p>
        </div>
      </section>

      {/* ═══ PACKAGES ═══ */}
      <section id="packages" className={`${styles.section} ${styles.sectionAlt}`} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.head} data-reveal>
            <p className={styles.kicker}>{t.packsKicker}</p>
            <h2 className={styles.h2}>{t.packsTitle}</h2>
            <p className={styles.lead}>{t.packsLead}</p>
          </div>
          <div className={styles.packs}>
            {PACKAGES.map((pack, i) => (
              <article key={pack.key} className={styles.pack} data-best={pack.best || undefined} data-reveal data-reveal-delay={i * 70}>
                {pack.best && <span className={styles.packBest}>{locale === "ar" ? "الأكثر طلبًا" : "Most requested"}</span>}
                <h3 className={styles.packName}>{p(pack.name, locale)}</h3>
                <p className={styles.packSummary}>{p(pack.summary, locale)}</p>
                <div className={styles.packPrice}>
                  <span className={styles.packAmount} dir="ltr">
                    {pack.price.toLocaleString("en-US")}
                  </span>
                  <span className={styles.packCur}>{t.sar}</span>
                </div>
                <p className={styles.packDays}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  {t.packsDays(pack.days)}
                </p>
                <ul className={styles.packList}>
                  {pack.includes.map((line) => (
                    <li key={line.en}>
                      <Check />
                      {p(line, locale)}
                    </li>
                  ))}
                </ul>
                <a
                  className={styles.packCta}
                  href={getWhatsAppLink(t.helloPack(p(pack.name, locale)))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.packsCta}
                </a>
              </article>
            ))}
          </div>
          <p className={styles.packNote}>
            {t.packsNote}{" "}
            <Link href={href("/store")} style={{ color: "var(--ink)", fontWeight: 700 }}>
              {locale === "ar" ? "أو تصفّح متجر الخدمات" : "Or browse the services store"}
            </Link>
          </p>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.head} data-reveal>
            <p className={styles.kicker}>{t.faqKicker}</p>
            <h2 className={styles.h2}>{t.faqTitle}</h2>
          </div>
          <div className={styles.faq}>
            {LEGAL_FAQ.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q.en} className={styles.faqItem}>
                  <button
                    type="button"
                    className={styles.faqQ}
                    aria-expanded={open}
                    aria-controls={`legal-faq-${i}`}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    {p(item.q, locale)}
                    <span className={styles.faqIcon}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div className={styles.faqBody} data-open={open || undefined} id={`legal-faq-${i}`} role="region">
                    <div className={styles.faqInner}>
                      <p className={styles.faqText}>{p(item.a, locale)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className={styles.disclaimer}>{t.disclaimer}</p>
        </div>
      </section>
    </>
  );
}
