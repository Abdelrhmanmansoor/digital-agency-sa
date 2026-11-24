/* Server component. One template for every lawyer-facing landing page:
   a practice area ("تصميم موقع محامي عمالي") or a city ("…في الرياض").
   Each page ends in the same three places: the packages, WhatsApp, and the
   sibling pages — so every landing page also feeds the others. */

import Link from "next/link";
import { getWhatsAppLink } from "@/lib/utils";
import { PACKAGES, type Pair } from "@/lib/legal-data";
import { CITY_LANDINGS, PRACTICE_LANDINGS } from "@/lib/legal-landing";
import styles from "./LegalLanding.module.css";

type Lang = "ar" | "en";

export type LandingProps = {
  lang: Lang;
  kind: "practice" | "city";
  slug: string;
  kicker: string;
  h1: string;
  lead: string;
  searches: string[];
  searchesTitle: string;
  listTitle: string;
  list: Pair[];
  note?: string;
  districts?: string[];
  faq: { q: Pair; a: Pair }[];
  waTopic: string;
};

const ui = {
  ar: {
    home: "الرئيسية",
    hub: "مواقع المحامين",
    cta: "احجز مراجعة مجانية لموقعك",
    ctaAlt: "شاهد الباقات",
    searchesLead: "هذه عبارات حقيقية يكتبها موكّلوك. كل واحدة منها تستحق مكانًا في موقعك.",
    districts: "أحياء نذكرها في صفحاتك وملفك على جوجل",
    packs: "الباقات",
    packsTitle: "سعر ومدة معلنان.",
    days: (n: number) => `${n} يوم عمل`,
    sar: "ر.س",
    order: "اطلب هذه الباقة",
    best: "الأكثر طلبًا",
    faq: "أسئلة شائعة",
    morePractice: "تخصصات أخرى",
    moreCity: "مدن أخرى",
    closeTitle: "مكتبك يستحق موقعًا يأتي بالموكّلين.",
    closeBody: "أرسل رابط موقعك الحالي أو اسم مكتبك، ونرد خلال ساعة بملاحظات مكتوبة ونطاق وسعر واضح — بلا التزام.",
    disclaimer: "AM Design وكالة تصميم وتطوير رقمي ولا تقدّم استشارات قانونية. كل نص قانوني يعتمده محامٍ مرخّص لدى العميل قبل النشر.",
    review: "مرحبًا، أريد مراجعة مجانية لموقع مكتب المحاماة",
    pack: (n: string) => `مرحبًا، أرغب في باقة «${n}» لموقع مكتب محاماة`,
  },
  en: {
    home: "Home",
    hub: "Law firm websites",
    cta: "Get a free site review",
    ctaAlt: "See the packages",
    searchesLead: "Real phrases your future clients type. Each one deserves a place on your site.",
    districts: "Districts we name on your pages and Google profile",
    packs: "Packages",
    packsTitle: "A published price and timeline.",
    days: (n: number) => `${n} working days`,
    sar: "SAR",
    order: "Request this package",
    best: "Most requested",
    faq: "Questions",
    morePractice: "Other practice areas",
    moreCity: "Other cities",
    closeTitle: "Your firm deserves a site that brings in clients.",
    closeBody: "Send your current site or firm name; we reply within the hour with written notes, scope and a clear price — no commitment.",
    disclaimer: "AM Design is a design and development agency and does not give legal advice. All legal copy is approved by the client's licensed lawyer before launch.",
    review: "Hello, I would like a free review of my law firm website",
    pack: (n: string) => `Hello, I am interested in the "${n}" package for a law firm website`,
  },
} as const;

export default function LegalLanding(props: LandingProps) {
  const { lang, kind, slug } = props;
  const t = ui[lang];
  const p = (x: Pair) => x[lang];
  const base = `/${lang}/solutions/legal`;
  const review = getWhatsAppLink(`${t.review} — ${props.waTopic}`);

  const siblings =
    kind === "practice"
      ? PRACTICE_LANDINGS.filter((x) => x.slug !== slug).map((x) => ({ href: `${base}/practice/${x.slug}`, label: p(x.title).split("|")[0].trim() }))
      : CITY_LANDINGS.filter((x) => x.slug !== slug).map((x) => ({ href: `${base}/city/${x.slug}`, label: `${lang === "ar" ? "مواقع المحاماة في" : "Law firm websites in"} ${p(x.name)}` }));
  const cross =
    kind === "practice"
      ? CITY_LANDINGS.map((x) => ({ href: `${base}/city/${x.slug}`, label: p(x.name) }))
      : PRACTICE_LANDINGS.map((x) => ({ href: `${base}/practice/${x.slug}`, label: p(x.title).split("|")[0].trim() }));

  return (
    <div className={styles.page}>
      <section className={styles.hero} data-own-spacing>
        <div className={styles.shell}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href={`/${lang}`}>{t.home}</Link>
            <span aria-hidden>/</span>
            <Link href={base}>{t.hub}</Link>
            <span aria-hidden>/</span>
            <span aria-current="page">{props.kicker}</span>
          </nav>
          <p className={styles.kicker}>{props.kicker}</p>
          <h1 className={styles.h1}>{props.h1}</h1>
          <p className={styles.lead}>{props.lead}</p>
          <div className={styles.actions}>
            <a href={review} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <span className={styles.dot} aria-hidden />
              {t.cta}
            </a>
            <a href="#packages" className="btn-secondary">{t.ctaAlt}</a>
          </div>
        </div>
      </section>

      <section className={styles.section} data-own-spacing>
        <div className={`${styles.shell} ${styles.split}`}>
          <div data-reveal>
            <h2 className={styles.h2}>{props.searchesTitle}</h2>
            <p className={styles.muted}>{t.searchesLead}</p>
          </div>
          <ul className={styles.searches} data-reveal>
            {props.searches.map((s) => (
              <li key={s}>
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                <span dir="auto">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`} data-own-spacing>
        <div className={styles.shell}>
          <h2 className={styles.h2} data-reveal>{props.listTitle}</h2>
          <ol className={styles.blueprint}>
            {props.list.map((item, i) => (
              <li key={item.en} data-spot data-reveal data-reveal-delay={String((i % 3) * 60)}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{p(item)}</p>
              </li>
            ))}
          </ol>
          {props.note && <p className={styles.note} data-reveal>{props.note}</p>}
          {props.districts && (
            <div className={styles.districts} data-reveal>
              <b>{t.districts}</b>
              <div>{props.districts.map((d) => <span key={d}>{d}</span>)}</div>
            </div>
          )}
        </div>
      </section>

      <section id="packages" className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <p className={styles.kicker}>{t.packs}</p>
          <h2 className={styles.h2} data-reveal>{t.packsTitle}</h2>
          <div className={styles.packs}>
            {PACKAGES.map((pack, i) => (
              <article key={pack.key} className={styles.pack} data-best={pack.best || undefined} data-spot data-reveal data-reveal-delay={String(i * 60)}>
                {pack.best && <em className={styles.best}>{t.best}</em>}
                <h3>{p(pack.name)}</h3>
                <p className={styles.muted}>{p(pack.summary)}</p>
                <div className={styles.price}>
                  <strong dir="ltr">{pack.price.toLocaleString("en-US")}</strong>
                  <small>{t.sar}</small>
                  <span>· {t.days(pack.days)}</span>
                </div>
                <ul>
                  {pack.includes.map((x) => <li key={x.en}>{p(x)}</li>)}
                </ul>
                <a href={getWhatsAppLink(`${t.pack(p(pack.name))} — ${props.waTopic}`)} target="_blank" rel="noopener noreferrer" className={styles.packCta}>
                  {t.order}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`} data-own-spacing>
        <div className={`${styles.shell} ${styles.split}`}>
          <h2 className={styles.h2}>{t.faq}</h2>
          <div className={styles.faq}>
            {props.faq.map((f) => (
              <details key={f.q.en}>
                <summary>{p(f.q)}</summary>
                <p>{p(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.links}>
            <div>
              <h2 className={styles.h3}>{kind === "practice" ? t.morePractice : t.moreCity}</h2>
              <ul>{siblings.map((s) => <li key={s.href}><Link href={s.href}>{s.label}</Link></li>)}</ul>
            </div>
            <div>
              <h2 className={styles.h3}>{kind === "practice" ? t.moreCity : t.morePractice}</h2>
              <ul>{cross.map((s) => <li key={s.href}><Link href={s.href}>{s.label}</Link></li>)}</ul>
            </div>
          </div>

          <div className={styles.closing} data-reveal>
            <h2>{t.closeTitle}</h2>
            <p>{t.closeBody}</p>
            <a href={review} target="_blank" rel="noopener noreferrer" className={styles.closingCta}>{t.cta}</a>
          </div>
          <p className={styles.disclaimer}>{t.disclaimer}</p>
        </div>
      </section>
    </div>
  );
}
