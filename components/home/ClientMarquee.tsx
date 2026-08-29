import { PROJECTS } from "@/components/proposal/data";
import styles from "./ClientMarquee.module.css";

/* Client logo wall — the strongest proof the site had and never showed.
   Twenty-one real brands were sitting in /public/proposal, reachable only
   from a single-client proposal page that robots.txt keeps out of the index.

   Server component: the strip scrolls on a CSS animation, so none of this
   costs a byte of JavaScript.

   Five of these logos are drawn in near-white and one carries its own dark
   plate; `logoOnDark` in the data marks them, and those tiles invert. A white
   logo on a white tile is exactly the bug that hid this site's own wordmark
   in its header for months. */

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

export default function ClientMarquee({ locale }: { locale: string }) {
  const t = copy[(locale in copy ? locale : "en") as keyof typeof copy];

  /* The track holds the list twice. The animation travels exactly -50%, so the
     second copy lands where the first began and the loop has no visible seam.
     The duplicate is aria-hidden — a screen reader should hear each brand once. */
  const track = [
    { items: LOGOS, hidden: false },
    { items: LOGOS, hidden: true },
  ];

  return (
    <section className={styles.root} aria-labelledby="clients-title">
      <div className={styles.head}>
        <h2 id="clients-title" className={styles.title}>
          {t.title}
        </h2>
        <p className={styles.lead}>{t.lead}</p>
      </div>

      <div className={styles.viewport}>
        <div className={styles.track}>
          {track.map((half, i) => (
            <ul key={i} className={styles.row} aria-hidden={half.hidden || undefined}>
              {half.items.map((p) => (
                <li
                  key={`${i}-${p.key}`}
                  className={`${styles.tile} ${p.logoOnDark ? styles.tileDark : ""}`}
                >
                  {/* Plain <img>: these are 5-60 KB marks at a fixed 34px optical
                      height, and one is an SVG the optimiser will not touch. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo!} alt={half.hidden ? "" : p.name} loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
