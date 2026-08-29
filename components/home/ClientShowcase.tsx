import Image from "next/image";
import { LOGOFOLIO, PROJECTS, RESULTS, WORK_GALLERY } from "@/components/proposal/data";
import styles from "./ClientShowcase.module.css";

/* The real portfolio. The homepage used to show three projects as small logos
   on tinted plates, while twenty live client sites, eight brand identities,
   twelve pages of creative work and six documented campaign results sat in
   /public/proposal — visible only on a noindexed single-client page.

   Server component throughout; every card is static markup.

   Nothing here is invented: each site card carries the brand's own logo, a
   real 1440x900 screenshot, and a link that opens the live site, so a visitor
   can check any claim in one click. Brands whose site was unreachable when the
   shots were taken are absent rather than mocked up. */

const SITES = PROJECTS.filter((p) => p.shot);

const copy = {
  ar: {
    kicker: "أعمال حقيقية",
    title: "متاجر ومواقع تعمل الآن.",
    lead: "كل بطاقة تفتح الموقع الأصلي — الشعار واللقطة من الموقع نفسه.",
    visit: "زيارة الموقع",
    identityKicker: "هوية بصرية",
    identityTitle: "شعارات صمّمناها من الصفر.",
    galleryKicker: "من ملف الأعمال",
    galleryTitle: "محتوى، بانرات، وحملات إعلانية.",
    resultsKicker: "أرقام موثقة",
    resultsTitle: "نتائج حملات فعلية أدرناها.",
    resultsNote: "أرقام مأخوذة من لوحات إعلانات فعلية لحملات نفّذناها لعملائنا.",
  },
  en: {
    kicker: "Real work",
    title: "Stores and sites running right now.",
    lead: "Every card opens the live site — the logo and the screenshot come from it.",
    visit: "Visit site",
    identityKicker: "Brand identity",
    identityTitle: "Logos we designed from scratch.",
    galleryKicker: "From the portfolio",
    galleryTitle: "Content, banners and ad campaigns.",
    resultsKicker: "Documented numbers",
    resultsTitle: "Results from campaigns we ran.",
    resultsNote: "Figures taken from the ad dashboards of campaigns we ran for clients.",
  },
  fr: {
    kicker: "Travaux réels",
    title: "Des boutiques et sites en ligne aujourd’hui.",
    lead: "Chaque carte ouvre le site réel — le logo et la capture en proviennent.",
    visit: "Voir le site",
    identityKicker: "Identité visuelle",
    identityTitle: "Des logos conçus de zéro.",
    galleryKicker: "Du portfolio",
    galleryTitle: "Contenu, bannières et campagnes publicitaires.",
    resultsKicker: "Chiffres documentés",
    resultsTitle: "Résultats de campagnes que nous avons menées.",
    resultsNote: "Chiffres issus des tableaux de bord publicitaires de campagnes clients.",
  },
} as const;

/* RESULTS in the data file is authored in Arabic, because the proposal page it
   was written for is Arabic-only. The figures and the cost-per-result metadata
   are identical in every language — only the label around them is translated
   here, so the numbers keep one source of truth in components/proposal/data.ts.
   Indexed to RESULTS order; a missing entry falls back to the Arabic label. */
const RESULT_TEXT: Record<"en" | "fr", [label: string, meta: string][]> = {
  en: [
    ["reach from a single awareness campaign", "UAE · 2.19 AED per 1,000 reached"],
    ["conversations with new customers — one campaign", "UAE · 5.18 AED per conversation"],
    ["engagements on a single post", "$0.009 per engagement"],
    ["clicks driving YouTube views", "0.41 AED per click"],
    ["clicks — Instagram traffic campaign", "$0.56 per click"],
    ["conversations — Dubai dental clinic", "9.04 AED per conversation"],
  ],
  fr: [
    ["portée sur une seule campagne de notoriété", "EAU · 2,19 AED pour 1 000 personnes"],
    ["conversations avec de nouveaux clients — une campagne", "EAU · 5,18 AED par conversation"],
    ["interactions sur une seule publication", "0,009 $ par interaction"],
    ["clics pour des vues YouTube", "0,41 AED par clic"],
    ["clics — campagne trafic Instagram", "0,56 $ par clic"],
    ["conversations — clinique dentaire à Dubaï", "9,04 AED par conversation"],
  ],
};

export default function ClientShowcase({ locale }: { locale: string }) {
  const lang = (locale in copy ? locale : "en") as keyof typeof copy;
  const t = copy[lang];
  const isAr = lang === "ar";

  return (
    <>
      <section id="work" className={styles.root} data-own-spacing>
        <div className={styles.shell}>
          <div className={`${styles.head} ${styles.reveal}`} data-reveal>
            <p className={styles.kicker}>{t.kicker}</p>
            <h2 className={styles.h2}>{t.title}</h2>
            <p className={styles.lead}>{t.lead}</p>
          </div>

          <ul className={styles.siteGrid}>
            {SITES.map((p, i) => (
              <li key={p.key} className={`${styles.siteCard} ${styles.reveal}`} data-reveal>
                {/* The whole card is one link, so the brand name is the
                    accessible name and the images below need no alt of their
                    own — repeating it would make a screen reader say the brand
                    three times per card. */}
                <a
                  className={styles.siteLink}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} — ${t.visit}`}
                >
                  <span className={styles.shot}>
                    <Image
                      src={p.shot!}
                      alt=""
                      width={1280}
                      height={800}
                      sizes="(max-width: 640px) 92vw, (max-width: 1080px) 46vw, 30vw"
                      /* The first row can sit above the fold on a tall desktop;
                         the rest wait until they are scrolled near. */
                      loading={i < 3 ? "eager" : "lazy"}
                    />
                  </span>

                  <span className={styles.cardBody}>
                    <span className={`${styles.mark} ${p.logoOnDark ? styles.markDark : ""}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.logo!} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span className={styles.meta}>
                      <strong className={styles.name}>{p.name}</strong>
                      {/* `note` is authored in Arabic only; the domain is the
                          honest fallback rather than a machine translation. */}
                      <span className={styles.note}>{isAr && p.note ? p.note : p.domain}</span>
                    </span>
                    <span className={styles.visit} aria-hidden>
                      {t.visit} <b>↗</b>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.root} ${styles.tinted}`} data-own-spacing>
        <div className={styles.shell}>
          <div className={`${styles.head} ${styles.reveal}`} data-reveal>
            <p className={styles.kicker}>{t.identityKicker}</p>
            <h2 className={styles.h2}>{t.identityTitle}</h2>
          </div>
          <ul className={styles.logoGrid}>
            {LOGOFOLIO.map((l) => (
              <li key={l.key} className={`${styles.logoCard} ${styles.reveal}`} data-reveal>
                <Image
                  src={l.src}
                  alt={l.label}
                  width={900}
                  height={449}
                  sizes="(max-width: 640px) 46vw, 23vw"
                  loading="lazy"
                />
                <span>{l.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.root} data-own-spacing>
        <div className={styles.shell}>
          <div className={`${styles.head} ${styles.reveal}`} data-reveal>
            <p className={styles.kicker}>{t.galleryKicker}</p>
            <h2 className={styles.h2}>{t.galleryTitle}</h2>
          </div>
          <ul className={styles.gallery}>
            {WORK_GALLERY.map((w) => (
              <li key={w.src} className={`${styles.galleryItem} ${styles.reveal}`} data-reveal>
                <Image
                  src={w.src}
                  alt={w.label}
                  width={1400}
                  height={788}
                  sizes="(max-width: 640px) 92vw, (max-width: 1080px) 46vw, 30vw"
                  loading="lazy"
                />
                <span>{w.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.root} ${styles.dark}`} data-own-spacing>
        <div className={styles.shell}>
          <div className={`${styles.head} ${styles.reveal}`} data-reveal>
            <p className={styles.kicker}>{t.resultsKicker}</p>
            <h2 className={styles.h2}>{t.resultsTitle}</h2>
            <p className={styles.lead}>{t.resultsNote}</p>
          </div>
          <ul className={styles.resultGrid}>
            {RESULTS.map((r, i) => {
              const [label, meta] = isAr
                ? [r.label, r.meta]
                : RESULT_TEXT[lang as "en" | "fr"][i] ?? [r.label, r.meta];
              return (
                <li key={r.label} className={`${styles.resultCard} ${styles.reveal}`} data-reveal>
                  {/* Latin digits stay LTR inside the RTL column. */}
                  <strong dir="ltr">{r.value}</strong>
                  <span>{label}</span>
                  <em>{meta}</em>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
