"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CategorySlider.module.css";

export interface SlideItem {
  key: string;
  title: string;
  cta: string;
  image: string;
  href: string;
  external: boolean;
}

/* A native scroll-snap track: swipe on touch, wheel or drag on desktop, and
   two arrow buttons that move one card at a time. No library — the browser
   does the physics, the component only reports where the track is. */
export default function CategorySlider({ items, dir, labels }: { items: SlideItem[]; dir: "rtl" | "ltr"; labels: { prev: string; next: string } }) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState<{ start: boolean; end: boolean }>({ start: true, end: false });
  const [progress, setProgress] = useState(0);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft); // negative in RTL
    setEdge({ start: pos < 4, end: pos > max - 4 });
    setProgress(max > 0 ? pos / max : 0);
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const step = (forward: boolean) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const w = card ? card.offsetWidth + 14 : el.clientWidth * 0.8;
    const sign = dir === "rtl" ? -1 : 1;
    el.scrollBy({ left: (forward ? w : -w) * sign, behavior: "smooth" });
  };

  return (
    <div className={styles.root}>
      <div ref={track} className={styles.track}>
        {items.map((c) => {
          const inner = (
            <>
              <Image src={c.image} alt="" width={720} height={1080} sizes="(max-width: 700px) 70vw, 280px" />
              <span className={styles.text}>
                <b>{c.title}</b>
                <small>{c.cta}</small>
              </span>
            </>
          );
          return c.external ? (
            <a key={c.key} data-slide href={c.href} target="_blank" rel="noreferrer" className={styles.card}>
              {inner}
            </a>
          ) : (
            <Link key={c.key} data-slide href={c.href} className={styles.card}>
              {inner}
            </Link>
          );
        })}
      </div>

      <div className={styles.controls}>
        <div className={styles.bar} aria-hidden>
          <span style={{ width: `${Math.max(12, progress * 100)}%` }} />
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={() => step(false)} disabled={edge.start} aria-label={labels.prev}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={dir === "rtl" ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
            </svg>
          </button>
          <button type="button" onClick={() => step(true)} disabled={edge.end} aria-label={labels.next}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={dir === "rtl" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
