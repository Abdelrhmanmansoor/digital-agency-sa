"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Amiri_Quran } from "next/font/google";
import { PRINCIPLES } from "@/lib/principles";
import styles from "./Principles.module.css";

/* The verse is set in Amiri Quran, the face made for Qur'anic text, and is
   revealed a whole word at a time — never letter by letter, which would
   break the joins of the script. The rotation pauses while the visitor
   hovers or focuses the panel, and stops entirely under reduced motion. */
const quran = Amiri_Quran({ weight: "400", subsets: ["arabic"], display: "swap" });

const DURATION = 9000;

type Lang = "ar" | "en" | "fr";

const copy = {
  ar: { kicker: "مبادئنا", title: "ما نؤمن به، نعمل به.", lead: "آيات نعود إليها في كل اتفاق مع عميل — وهذا ما تعنيه في عملنا معك.", surah: "سورة", ayah: "الآية", practice: "في عملنا", list: "المبادئ" },
  en: { kicker: "Our principles", title: "What we believe is how we work.", lead: "Verses we return to in every agreement — and what each one means in our work with you.", surah: "Surah", ayah: "verse", practice: "In our work", list: "Principles" },
  fr: { kicker: "Nos principes", title: "Ce que nous croyons guide notre travail.", lead: "Des versets auxquels nous revenons à chaque accord — et ce qu’ils signifient pour vous.", surah: "Sourate", ayah: "verset", practice: "Dans notre travail", list: "Principes" },
} as const;

export default function Principles({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const started = useRef(Date.now());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = useCallback((i: number) => {
    setActive((i + PRINCIPLES.length) % PRINCIPLES.length);
    started.current = Date.now();
    setProgress(0);
  }, []);

  /* One animation-frame loop drives both the progress fill and the advance,
     so the bar and the change can never drift apart. */
  useEffect(() => {
    if (still) return;
    let raf = 0;
    let pausedAt = 0;
    const tick = () => {
      if (paused) {
        if (!pausedAt) pausedAt = Date.now();
      } else {
        if (pausedAt) {
          started.current += Date.now() - pausedAt;
          pausedAt = 0;
        }
        const p = (Date.now() - started.current) / DURATION;
        if (p >= 1) {
          go(active + 1);
          return;
        }
        setProgress(p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused, still, go]);

  const p = PRINCIPLES[active];
  const words = p.verse.split(" ");

  return (
    <section className={styles.section} data-own-spacing>
      <div className={styles.shell}>
        <div className={styles.head} data-reveal>
          <p className={styles.kicker}>{t.kicker}</p>
          <h2>{t.title}</h2>
          <p>{t.lead}</p>
        </div>

        <div
          className={styles.card}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className={styles.stage} aria-live="polite">
            <figure key={p.key} className={styles.figure}>
              <blockquote className={`${quran.className} ${styles.verse}`} lang="ar" dir="rtl">
                <span className={styles.bracket} aria-hidden>
                  ﴿
                </span>
                {/* The space sits between the inline-blocks, not inside them —
                    a trailing space inside an inline-block collapses. */}
                {words.map((w, i) => (
                  <span key={i}>
                    <span className={styles.word} style={{ animationDelay: `${120 + i * 90}ms` }}>
                      {w}
                    </span>{" "}
                  </span>
                ))}
                <span className={styles.bracket} aria-hidden>
                  ﴾
                </span>
              </blockquote>
              <figcaption className={styles.source}>
                {t.surah} {p.surah[lang]} · {t.ayah} {p.ayah}
              </figcaption>
              {lang !== "ar" && <p className={styles.meaning}>“{p.meaning[lang]}”</p>}

              <div className={styles.practice}>
                <span>{t.practice}</span>
                <b>{p.title[lang]}</b>
                <p>{p.practice[lang]}</p>
              </div>
            </figure>
          </div>

          <ol className={styles.list} aria-label={t.list}>
            {PRINCIPLES.map((x, i) => (
              <li key={x.key}>
                <button type="button" onClick={() => go(i)} aria-current={i === active ? "true" : undefined}>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.itemTitle}>{x.title[lang]}</span>
                  <span className={styles.bar} aria-hidden>
                    <i style={{ transform: `scaleX(${i === active ? (still ? 1 : progress) : i < active ? 1 : 0})` }} />
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
