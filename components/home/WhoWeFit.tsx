"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";
import styles from "./WhoWeFit.module.css";

/* Six situations, each ending at the one service that answers it. The links
   go to real product pages, so this section doubles as internal linking
   into the catalogue rather than being a decorative list. */
const FITS: { icon: string; href: string | null; ar: [string, string]; en: [string, string] }[] = [
  {
    icon: "M3 17.5 9 11l4 4 8-8.5M21 6.5V12M21 6.5h-5.5",
    href: "/store/store-seo",
    ar: [
      "متجرك يستقبل زيارات، لكنها لا تتحول إلى طلبات",
      "المشكلة غالبًا ليست في الإعلان بل في الصفحة نفسها: بطء، صفحة منتج لا تجيب على الاعتراضات، أو مسار شراء طويل. نبدأ بمراجعة مكتوبة قبل أن نلمس أي شيء.",
    ],
    en: [
      "You get traffic, but it does not turn into orders",
      "The problem is usually not the ad but the page: speed, a product page that answers no objection, or a long checkout. We start with a written review before touching anything.",
    ],
  },
  {
    icon: "M12 2 4 6v6c0 5 3.4 9.2 8 10 4.6-.8 8-5 8-10V6z M9.5 12l1.8 1.8L15 10",
    href: "/store/salla-store-setup",
    ar: [
      "قررت البيع أونلاين ولا تعرف من أين تبدأ",
      "نبني المتجر من الصفر على سلة أو زد: التصنيفات، المنتجات، الدفع، الشحن، والسياسات — ونسلّمه جاهزًا لاستقبال أول طلب مع تدريب على الإدارة.",
    ],
    en: [
      "You decided to sell online and do not know where to start",
      "We build the store from zero on Salla or Zid: categories, products, payment, shipping and policies, handed over ready for its first order with training.",
    ],
  },
  {
    icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    href: null,
    ar: [
      "تدفع لمصمم ومبرمج ومسوّق، والنتيجة مشتتة",
      "ثلاثة موردين يعني ثلاث رؤى وثلاث جهات تُلقي المسؤولية على غيرها. الفريق نفسه هنا يتولى الهوية والمتجر والحملة، فتصبح المسؤولية في جهة واحدة.",
    ],
    en: [
      "You pay a designer, a developer and a marketer, and the result is scattered",
      "Three vendors means three visions and three parties passing responsibility along. One team here handles identity, store and campaign, so accountability sits in one place.",
    ],
  },
  {
    icon: "M4 19V5M4 19h16M8 15l3.5-4 3 3L20 8",
    href: "/store/digital-marketing",
    ar: [
      "لديك مبيعات، لكنها غير مستقرة من شهر لآخر",
      "التذبذب عادةً نتيجة حملات تُدار بالحدس. نبني قياسًا حقيقيًا أولًا — تتبع التحويلات وGA4 — ثم نقرر أين تُصرف الميزانية بناءً على رقم لا على انطباع.",
    ],
    en: [
      "You have sales, but they swing from month to month",
      "The swing usually comes from campaigns run on instinct. We install real measurement first, conversion tracking and GA4, then decide where budget goes from a number rather than a feeling.",
    ],
  },
  {
    icon: "M12 3 2 8.5 12 14l10-5.5L12 3ZM2 15.5 12 21l10-5.5",
    href: "/store/brand-identity-design",
    ar: [
      "علامتك تكبر وتحتاج شكلًا يليق بها",
      "متجر جيد بهوية ضعيفة يبيع بالسعر وحده. نبني هوية متماسكة تنعكس على المتجر والتغليف والإعلان، فتتوقف المنافسة على الخصم وحده.",
    ],
    en: [
      "Your brand is growing and needs a form that matches it",
      "A good store with a weak identity competes on price alone. We build one identity that carries through the storefront, packaging and advertising.",
    ],
  },
  {
    icon: "m8 17-5-5 5-5M16 7l5 5-5 5M13.5 4l-3 16",
    href: "/store/custom-app-development",
    ar: [
      "احتياجك أكبر مما تسمح به المنصة الجاهزة",
      "عندما يصطدم نشاطك بحدود المنصة، نبني ما ينقص: تطبيقًا، لوحة تحكم، أو ربطًا بين أنظمتك — بنطاق عمل موثّق قبل أول سطر برمجي.",
    ],
    en: [
      "Your need is larger than an off-the-shelf platform allows",
      "When the business hits the platform's limits we build what is missing: an app, a console, or an integration between your systems, with a written scope before the first line of code.",
    ],
  },
];

const copy = {
  ar: {
    kicker: "لمن نناسب",
    title: "اعرف خلال دقيقة إن كنّا الفريق المناسب لك.",
    lead:
      "معظم من يصلنا يقع في واحدة من ست حالات. اقرأ التي تشبه وضعك وستعرف تمامًا من أين سنبدأ معك — قبل أن ترسل رسالة واحدة.",
    more: "اقرأ التفاصيل",
    notTitle: "ومتى لا نكون الخيار الصحيح؟",
    notLead: "نفضّل قول هذا مقدّمًا بدل اكتشافه بعد توقيع العقد.",
    not: [
      "إذا كان القرار الأول والأخير هو الأرخص سعرًا — ستجد من يقبل بأقل منّا، وغالبًا ستدفع الفرق مرتين.",
      "إذا كنت تتوقع نتائج إعلانية خلال أسبوع بدون ميزانية إعلانية كافية — لا يوجد تنفيذ يعوّض ذلك.",
      "إذا لم يتوفر لديك وقت لمراجعة المسودات واعتمادها — المشروع يتوقف عندك لا عندنا.",
      "إذا كان المطلوب نسخ متجر منافس كما هو — ننفّذ تصميمًا مبنيًا على نشاطك، لا نسخة من غيرك.",
    ],
    cta: "احكِ لنا وضعك في رسالة قصيرة",
    ctaNote: "نرد خلال أقل من ساعة، وبدون التزام.",
    hello: "مرحبًا، وضع مشروعي هو:",
  },
  en: {
    kicker: "Who this is for",
    title: "Know in a minute whether we are the right team for you.",
    lead:
      "Most people who reach us fall into one of six situations. Read the one that matches yours and you will know exactly where we would start, before sending a single message.",
    more: "Read the details",
    notTitle: "And when are we not the right choice?",
    notLead: "We would rather say this up front than have you discover it after signing.",
    not: [
      "If the first and last decision is the lowest price. Someone will always quote less, and you usually pay the difference twice.",
      "If you expect advertising results within a week without an adequate ad budget. No execution compensates for that.",
      "If you have no time to review and approve drafts. The project then waits on you, not on us.",
      "If the brief is to copy a competitor's store as it stands. We design around your business, not around someone else's.",
    ],
    cta: "Tell us your situation in a short message",
    ctaNote: "We reply in under an hour, with no commitment.",
    hello: "Hi, my project situation is:",
  },
} as const;

export default function WhoWeFit() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const t = copy[isAr ? "ar" : "en"];

  return (
    <section id="fit" className={styles.root} data-own-spacing>
      <div className={`${styles.shell} ${styles.inner}`}>
        <div className={styles.head} data-reveal>
          <p className={styles.kicker}>{t.kicker}</p>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.lead}>{t.lead}</p>
        </div>

        <div className={styles.list}>
          {FITS.map((fit, i) => {
            const [title, body] = isAr ? fit.ar : fit.en;
            return (
              <article key={title} className={styles.item} data-reveal data-reveal-delay={(i % 2) * 60}>
                <span className={styles.mark}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={fit.icon} />
                  </svg>
                </span>
                <div>
                  <h3 className={styles.itemTitle}>{title}</h3>
                  <p className={styles.itemBody}>{body}</p>
                  {fit.href && (
                    <Link href={`/${locale}${fit.href}`} className={styles.itemLink}>
                      {t.more}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ transform: isAr ? "scaleX(-1)" : undefined }}>
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.not} data-reveal>
          <div>
            <h3 className={styles.notTitle}>{t.notTitle}</h3>
            <p className={styles.notLead}>{t.notLead}</p>
          </div>
          <ul className={styles.notList}>
            {t.not.map((line) => (
              <li key={line}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.actions} data-reveal>
          <a href={getWhatsAppLink(t.hello)} target="_blank" rel="noreferrer" className={styles.cta}>
            {t.cta}
          </a>
          <span className={styles.ctaNote}>{t.ctaNote}</span>
        </div>
      </div>
    </section>
  );
}
