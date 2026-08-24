"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { PRACTICE_AREAS } from "@/lib/legal-data";
import { getWhatsAppLink } from "@/lib/utils";
import styles from "./SectorSpotlight.module.css";

const copy = {
  ar: {
    kicker: "قطاع جديد",
    title: "نبني أيضًا مواقع ومنصات لمكاتب المحاماة.",
    body:
      "نفس المنهج الذي نطبّقه على المتاجر، مطبَّق على قطاع يشتري الثقة قبل الخدمة: صفحة مستقلة لكل تخصص تترتب في البحث، دليل خبرة يحترم السرية المهنية، وطريق من سطرين إلى حجز الاستشارة.",
    points: [
      "صفحة لكل مجال قانوني، مهيأة للبحث بنية مستقلة",
      "ملفات المحامين ودراسات حالة دون كشف الأطراف",
      "حجز استشارة في خطوتين مربوط بواتساب والتقويم",
      "بوابة موكّلين لمتابعة القضايا والمستندات والفواتير",
    ],
    primary: "استعرض حلول القطاع القانوني",
    secondary: "تحدث معنا",
    more: "وغيرها",
    hello: "مرحبًا، أريد مناقشة موقع لمكتب محاماة.",
  },
  en: {
    kicker: "New sector",
    title: "We build law firm websites and legal platforms too.",
    body:
      "The same method we apply to stores, applied to a sector that buys trust before service: a standalone page per practice area that can rank, proof of standing that respects confidentiality, and a two-line path to a booked consultation.",
    points: [
      "A search-ready page for each practice area",
      "Lawyer profiles and case studies with no identifying detail",
      "Two-step consultation booking wired to WhatsApp and a calendar",
      "A client portal for matters, documents and invoices",
    ],
    primary: "See the legal sector solutions",
    secondary: "Talk to us",
    more: "and more",
    hello: "Hi, I would like to discuss a law firm website.",
  },
} as const;

export default function SectorSpotlight() {
  const locale = useLocale();
  const t = copy[locale === "ar" ? "ar" : "en"];
  const isAr = locale === "ar";

  return (
    <section className={styles.root} data-own-spacing>
      <div className={`${styles.shell} ${styles.grid}`}>
        <div data-reveal>
          <p className={styles.kicker}>{t.kicker}</p>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.body}>{t.body}</p>
          <ul className={styles.points}>
            {t.points.map((point) => (
              <li key={point}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m4 12 5.5 5.5L20 7" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Link href={`/${locale}/solutions/legal`} className={styles.primary}>
              {t.primary}
            </Link>
            <a href={getWhatsAppLink(t.hello)} target="_blank" rel="noreferrer" className={styles.secondary}>
              {t.secondary}
            </a>
          </div>
        </div>

        <div className={styles.chips} data-reveal data-reveal-delay="120">
          {PRACTICE_AREAS.slice(0, 8).map((area) => (
            <span key={area.key} className={styles.chip}>
              {isAr ? area.name.ar : area.name.en}
            </span>
          ))}
          <span className={styles.chipMore}>+{PRACTICE_AREAS.length - 8} {t.more}</span>
        </div>
      </div>
    </section>
  );
}
