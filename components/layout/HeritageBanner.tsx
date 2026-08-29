import styles from "./HeritageBanner.module.css";

/* بانر اليوم الوطني كطبقة خلفية.

   نسختان من اللوحة نفسها، وكل واحدة تُستدعى بحجمها: العريضة (1600×854)
   للهيدر وسطح المكتب، والطولية (760×1602) للجوال — حيث تقتطع النسخة
   العريضة الأشخاص والقلعة تمامًا لو مُدّت على إطار طولي.

   `<picture>` وليس next/image: هذه خلفية زخرفية بمقاس معروف مسبقًا، لا
   تحتاج srcset متدرّجًا ولا layout shift فيها أصلًا، والاختيار بين
   النسختين قرار فنّي (art direction) لا قرار عرض بالبكسل — وهو بالضبط ما
   وُجد له عنصر <source media>. */
export default function HeritageBanner({ variant }: { variant: "header" | "hero" }) {
  return (
    <div className={`${styles.layer} ${styles[variant]}`} aria-hidden>
      <picture>
        {/* الطولية للجوال فقط، وفي الهيدر لا داعي لها: شريط بارتفاع 76px
            يعرض شريحة أفقية في الحالتين. */}
        {variant === "hero" && (
          <source media="(max-width: 720px)" srcSet="/banner/national-tall.webp" />
        )}
        <img
          src="/banner/national-wide.webp"
          alt=""
          className={styles.image}
          loading={variant === "hero" ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
      </picture>
      <div className={styles.veil} />
    </div>
  );
}
