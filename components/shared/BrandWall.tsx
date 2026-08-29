/* Server component. It was a client component solely because it called
   `useLocale()` — no state, no effects, no event handlers anywhere in the
   file. The locale is passed down from the homepage instead, so none of this
   markup or its three locales of copy reach the browser as JavaScript. */

import { BRAND_GROUPS, type Brand } from "@/lib/brands";
import BrandLogo from "./BrandLogo";
import styles from "./BrandWall.module.css";

const copy = {
  ar: {
    kicker: "المنصات والأدوات",
    title: "نبني على المنصات التي يستخدمها سوقك فعلًا.",
    lead:
      "لا نعمل على منصة لم نطلق عليها متجرًا حقيقيًا. القائمة أدناه هي ما نصمّم ونبرمج ونربط عليه اليوم، مقسّمة حسب دورها في المشروع.",
    note:
      "جميع الشعارات والعلامات التجارية الظاهرة هنا ملك لأصحابها، وتُعرض للدلالة على المنصات والأدوات التي نعمل عليها ونربط بها. لا يعني عرضها وجود شراكة أو رعاية.",
  },
  en: {
    kicker: "Platforms and tools",
    title: "We build on the platforms your market actually uses.",
    lead:
      "We do not work on a platform we have not launched a real store on. Everything below is what we design, build and integrate with today, grouped by the role it plays.",
    note:
      "All logos and trademarks shown here belong to their respective owners and are displayed to indicate the platforms and tools we work with. Their presence does not imply a partnership or endorsement.",
  },
} as const;

/** The full grouped wall. Used on the home page. */
export default function BrandWall({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const t = copy[isAr ? "ar" : "en"];

  return (
    <section className={styles.root} data-own-spacing>
      <div className={`${styles.shell} ${styles.inner}`}>
        <div className={styles.head} data-reveal>
          <p className={styles.kicker}>{t.kicker}</p>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.lead}>{t.lead}</p>
        </div>

        <div className={styles.groups}>
          {BRAND_GROUPS.map((group, i) => (
            <div key={group.key} className={styles.group} data-reveal data-reveal-delay={i * 55}>
              <div>
                <h3 className={styles.groupTitle}>{isAr ? group.titleAr : group.titleEn}</h3>
                <p className={styles.groupNote}>{isAr ? group.noteAr : group.noteEn}</p>
              </div>
              <div className={styles.marks}>
                {group.brands.map((brand) => (
                  <span key={brand.id} className={styles.slot}>
                    <BrandLogo brand={brand} height={26} />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className={styles.note}>{t.note}</p>
      </div>
    </section>
  );
}

/** A single labelled row, for pages that need the proof without the section. */
export function BrandStrip({
  brands,
  label,
  dark = false,
  height = 22,
}: {
  brands: Brand[];
  label: string;
  dark?: boolean;
  height?: number;
}) {
  return (
    <div className={dark ? styles.stripDark : undefined}>
      <div className={styles.strip}>
        <span className={styles.stripLabel}>{label}</span>
        {brands.map((brand) => (
          <BrandLogo key={brand.id} brand={brand} height={height} />
        ))}
      </div>
    </div>
  );
}
