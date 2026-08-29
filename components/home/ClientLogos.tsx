import { PROJECTS } from "@/components/proposal/data";
import styles from "./ClientLogos.module.css";

/* Client logo wall — the strongest proof the site had and never showed.
   Twenty real brands were sitting in /public/proposal, reachable only from a
   single-client proposal page that robots.txt keeps out of the index.

   Static and centred, not a marquee. A strip that never stops moving asks the
   reader to catch each name as it passes; the whole list laid out at once lets
   them scan it, and there is no seam, no duplicate half to hide from screen
   readers, and no animation to stand down under reduced motion.

   Server component: none of this costs a byte of JavaScript.

   Six of these logos are drawn in near-white and one carries its own dark
   plate; `logoOnDark` in the data marks them, and those tiles invert. A white
   logo on a white tile is exactly the bug that hid this site's own wordmark in
   its header for months. */

const LOGOS = PROJECTS.filter((p) => p.logo);

const copy = {
  ar: {
    title: "علامات وثقت بنا",
    lead: "متاجر ومكاتب سعودية وخليجية نبني معها ونشغّل متاجرها.",
  },
  en: {
    title: "Brands that trusted us",
    lead: "Saudi and Gulf stores and firms we build and run storefronts for.",
  },
  fr: {
    title: "Des marques qui nous font confiance",
    lead: "Boutiques et cabinets saoudiens et du Golfe que nous accompagnons.",
  },
} as const;

export default function ClientLogos({ locale }: { locale: string }) {
  const t = copy[(locale in copy ? locale : "en") as keyof typeof copy];

  return (
    <section className={styles.root} aria-labelledby="clients-title">
      <div className={styles.shell}>
        <div className={styles.head}>
          <h2 id="clients-title" className={styles.title}>
            {t.title}
          </h2>
          <p className={styles.lead}>{t.lead}</p>
        </div>

        <ul className={styles.grid}>
          {LOGOS.map((p) => (
            <li
              key={p.key}
              className={`${styles.tile} ${p.logoOnDark ? styles.tileDark : ""}`}
            >
              {/* Plain <img>: these are 5-60 KB marks at a fixed 34px optical
                  height, and one is an SVG the optimiser will not touch. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo!} alt={p.name} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
