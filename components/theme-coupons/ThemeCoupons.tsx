import Link from "next/link";
import { ACTIVE_COUPONS } from "@/lib/theme-coupons";
import { getWhatsAppLink } from "@/lib/utils";
import CouponGrid from "./CouponGrid";
import { COPY, type Lang } from "./copy";
import styles from "./ThemeCoupons.module.css";

/* Landing page for merchants who searched "كود خصم ثيمات سلة". It answers
   three things in order: is there a working code for the theme I want, how
   do I use it, and which theme fits my store. The same banner and rhythm as
   the market pages, so it reads as part of the site. */

export default function ThemeCoupons({ lang, locale }: { lang: Lang; locale: string }) {
  const t = COPY[lang];
  const arrow = lang === "ar" ? "←" : "→";

  return (
    <div className={styles.page}>
      {/* ═══ HERO ═══ */}
      <section className={styles.hero} data-own-spacing>
        <picture className={styles.banner}>
          <source media="(max-width: 760px)" srcSet="/hero/hero-mobile.webp" width={1086} height={1448} />
          <img src="/hero/hero-desktop.webp" width={1672} height={941} alt="" fetchPriority="high" decoding="async" />
        </picture>
        <div className={`${styles.shell} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <nav className={styles.crumbs} aria-label="Breadcrumb">
              <Link href={`/${locale}`}>{t.crumbsHome}</Link>
              <span aria-hidden>/</span>
              <span aria-current="page">{t.crumbsHere}</span>
            </nav>
            <p className={styles.eyebrow}>
              <span aria-hidden />
              {t.eyebrow}
            </p>
            <h1>{t.h1}</h1>
            <p className={styles.hook}>{t.hook}</p>
            <p className={styles.lead}>{t.lead}</p>
            <div className={styles.actions}>
              <a href="#themes" className="btn-primary">
                <span className={styles.dot} aria-hidden />
                {t.ctaThemes}
              </a>
              <a href={getWhatsAppLink(t.helpHello)} target="_blank" rel="noreferrer" className="btn-secondary">
                {t.ctaHelp}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FACTS ═══ */}
      <section className={styles.factsWrap} data-own-spacing>
        <div className={styles.shell}>
          <dl className={styles.facts}>
            {t.facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.tags}>
            {ACTIVE_COUPONS.map((x) => (
              <a key={x.slug} href={`#theme-${x.slug}`}>
                {lang === "ar" ? `ثيم ${x.name}` : x.latin}
              </a>
            ))}
          </p>
        </div>
      </section>

      {/* ═══ THEMES ═══ */}
      <section id="themes" className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.headSplit}>
            <div>
              <p className={styles.kicker}>{t.gridKicker}</p>
              <h2>{t.gridTitle}</h2>
            </div>
            <p>{t.gridLead}</p>
          </div>
          <CouponGrid lang={lang} />
        </div>
      </section>

      {/* ═══ STEPS ═══ */}
      <section className={`${styles.section} ${styles.soft}`} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.head}>
            <p className={styles.kicker}>{t.stepsKicker}</p>
            <h2>{t.stepsTitle}</h2>
          </div>
          <ol className={styles.steps}>
            {t.steps.map(([n, title, body]) => (
              <li key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ GUIDE ═══ */}
      <section className={`${styles.section} ${styles.soft}`} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.headSplit}>
            <div>
              <p className={styles.kicker}>{t.guideKicker}</p>
              <h2>{t.guideTitle}</h2>
            </div>
            <p>{t.guideLead}</p>
          </div>
          <div className={styles.guide}>
            {t.guide.map(([sector, title, body]) => (
              <article key={sector}>
                <h3>{title}</h3>
                <p>{body}</p>
                <div className={styles.guideLinks}>
                  {ACTIVE_COUPONS.filter((x) => x.sector === sector)
                    .sort((a, b) => b.reviews - a.reviews)
                    .map((x) => (
                      <a key={x.slug} href={`#theme-${x.slug}`}>
                        {lang === "ar" ? `كود خصم ثيم ${x.name}` : `${x.latin} coupon`}
                      </a>
                    ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CUSTOM ═══ */}
      <section className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.custom}>
            <div>
              <p className={styles.kickerLight}>{t.customKicker}</p>
              <h2>{t.customTitle}</h2>
              <p>{t.customBody}</p>
            </div>
            <ul>
              {t.customLinks.map(([href, label]) => (
                <li key={href}>
                  <Link href={`/${locale}${href}`}>
                    {label} <span aria-hidden>{arrow}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className={`${styles.section} ${styles.soft}`} data-own-spacing>
        <div className={`${styles.shell} ${styles.faqGrid}`}>
          <div>
            <p className={styles.kicker}>{t.faqKicker}</p>
            <h2>{t.faqTitle}</h2>
          </div>
          <div className={styles.faq}>
            {t.faq.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL ═══ */}
      <section className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.final}>
            <div>
              <h2>{t.finalTitle}</h2>
              <p>{t.finalBody}</p>
            </div>
            <a href={getWhatsAppLink(t.finalHello)} target="_blank" rel="noreferrer" className="btn-gold">
              {t.finalCta}
            </a>
          </div>
          <p className={styles.disclaimer}>{t.disclaimer}</p>
        </div>
      </section>
    </div>
  );
}
