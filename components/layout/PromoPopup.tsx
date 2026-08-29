"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";
import styles from "./PromoPopup.module.css";

/* Saudi National Day 96 promo card.

   Deliberately not a modal. A full-screen interstitial that covers the content
   right after a visitor lands is what Google's intrusive-interstitial rule
   targets, and on an SEO-driven site that is a ranking risk, not just a
   nuisance. This is a bounded card in the corner on desktop and a compact bar
   on mobile — it never covers the page, so it stays on the safe side of that
   rule and is far less irritating besides.

   The restraint is in the timing:
   - it waits for the page to settle before appearing, so it never competes
     with the LCP paint or shifts anything;
   - it leaves on its own after a few seconds;
   - hovering or focusing it stops the countdown, so it cannot vanish out from
     under someone who is reading it or tabbing through it;
   - once dismissed — by the close button, by Escape, or by timing out — it
     stays gone for the rest of the session rather than reappearing on every
     page the visitor opens. */

/* Campaign window. Saudi National Day falls on 23 September; the card retires
   itself a week later rather than advertising a national holiday in December.
   Change this date (or delete the component from SiteShell) when the campaign
   ends. Parsed as UTC midnight — the exact hour does not matter here. */
const CAMPAIGN_END = Date.parse("2026-09-30T23:59:59Z");

/* Long enough to read the headline and the price, short enough not to loiter. */
const VISIBLE_MS = 6000;
/* Let the hero paint and the visitor orient themselves first. */
const DELAY_MS = 2500;

const STORAGE_KEY = "promo-nd96-seen";

const copy = {
  ar: {
    eyebrow: "عرض اليوم الوطني ٩٦",
    title: "متجر إلكتروني احترافي بـ 396 ريال",
    body: "تصميم متجر سلة أو زد جاهز للبيع — عرض لفترة محدودة.",
    cta: "اطلب عبر واتساب",
    close: "إغلاق الإعلان",
    alt: "عرض اليوم الوطني السعودي 96 — متجر إلكتروني بـ 396 ريال سعودي",
    wa: "مرحبًا، أريد الاستفادة من عرض اليوم الوطني — متجر إلكتروني بـ 396 ريال.",
  },
  en: {
    eyebrow: "National Day 96 offer",
    title: "A professional online store for 396 SAR",
    body: "A Salla or Zid store ready to sell — limited time.",
    cta: "Order on WhatsApp",
    close: "Close the offer",
    alt: "Saudi National Day 96 offer — an online store for 396 SAR",
    wa: "Hello, I would like the National Day offer — an online store for 396 SAR.",
  },
  fr: {
    eyebrow: "Offre Fête nationale 96",
    title: "Une boutique en ligne professionnelle à 396 SAR",
    body: "Une boutique Salla ou Zid prête à vendre — durée limitée.",
    cta: "Commander sur WhatsApp",
    close: "Fermer l’offre",
    alt: "Offre Fête nationale saoudienne 96 — une boutique en ligne à 396 SAR",
    wa: "Bonjour, je souhaite profiter de l’offre Fête nationale — une boutique à 396 SAR.",
  },
} as const;

export default function PromoPopup() {
  const locale = useLocale();
  const t = copy[(locale in copy ? locale : "en") as keyof typeof copy];

  /* "enter" exists only so the card mounts at its starting offset for one
     frame. Mounting straight into "in" would apply the final opacity and
     transform in the same frame the node appears, and the browser has nothing
     to transition from — the card would pop rather than slide. */
  const [state, setState] = useState<"idle" | "enter" | "in" | "out">("idle");
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const paused = useRef(false);

  const dismiss = useCallback(() => {
    setState((s) => (s === "in" || s === "enter" ? "out" : s));
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* Private mode or blocked storage: the card simply shows again next
         page. Never let a storage failure break the dismissal itself. */
    }
  }, []);

  const startHideTimer = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!paused.current) dismiss();
    }, VISIBLE_MS);
  }, [dismiss]);

  /* Everything time- and storage-dependent runs here rather than during
     render, so the server HTML and the first client render always agree. */
  useEffect(() => {
    if (Date.now() > CAMPAIGN_END) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* Unreadable storage is not a reason to suppress the card. */
    }

    const openTimer = setTimeout(() => setState("enter"), DELAY_MS);

    return () => {
      clearTimeout(openTimer);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  /* One frame after the node is in the DOM, flip to the resting state so the
     transition has somewhere to travel from, and start the countdown. */
  useEffect(() => {
    if (state !== "enter") return;
    const raf = requestAnimationFrame(() => {
      setState("in");
      startHideTimer();
    });
    return () => cancelAnimationFrame(raf);
  }, [state, startHideTimer]);

  useEffect(() => {
    if (state !== "in") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state, dismiss]);

  if (state === "idle") return null;

  /* Reading it should not be a race. Any pointer or keyboard attention holds
     the card open, and the countdown restarts once attention leaves. */
  const hold = () => {
    paused.current = true;
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };
  const release = () => {
    paused.current = false;
    if (state === "in") startHideTimer();
  };

  return (
    <aside
      className={styles.root}
      data-state={state}
      aria-label={t.eyebrow}
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocusCapture={hold}
      onBlurCapture={release}
      /* Once it has slid out, take it out of the tree for good. */
      onTransitionEnd={() => state === "out" && setState("idle")}
    >
      {/* The card is one link; the close button is a sibling laid over it,
          because a <button> nested inside an <a> is invalid and unusable. */}
      <a
        className={styles.card}
        href={getWhatsAppLink(t.wa)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={dismiss}
      >
        <span className={styles.figure}>
          <Image
            src="/promo/national-day-96.webp"
            alt={t.alt}
            width={760}
            height={760}
            sizes="(max-width: 767px) 84px, 300px"
          />
        </span>

        <span className={styles.body}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <strong className={styles.title}>{t.title}</strong>
          <span className={styles.text}>{t.body}</span>
          <span className={styles.cta}>
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden focusable="false">
              <path
                fill="currentColor"
                d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.16c-.25.69-1.43 1.32-1.98 1.4-.53.08-1.19.11-1.92-.12-.44-.14-1.01-.33-1.74-.64-3.06-1.32-5.06-4.4-5.21-4.6-.15-.2-1.24-1.65-1.24-3.15s.79-2.24 1.07-2.54c.28-.31.61-.38.81-.38.2 0 .41 0 .58.01.19.01.44-.07.69.53.25.61.86 2.11.94 2.26.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.31.39-.45.53-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.77.83 2.07.98.3.15.5.23.58.35.07.13.07.73-.18 1.42Z"
              />
            </svg>
            {t.cta}
          </span>
        </span>
      </a>

      <button type="button" className={styles.close} onClick={dismiss} aria-label={t.close}>
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden focusable="false">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            d="M6 6l12 12M18 6L6 18"
          />
        </svg>
      </button>
    </aside>
  );
}
