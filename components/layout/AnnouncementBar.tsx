"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import styles from "./AnnouncementBar.module.css";

/* ── Campaign window ────────────────────────────────────────────────
   Saudi National Day 96 falls on 23 September 2026. The strip runs from
   the start of the pre-campaign through the week after, then switches
   itself off — no one has to remember to remove it. Dates are compared as
   plain YYYY-MM-DD strings in Riyadh time, so a visitor's own timezone
   cannot pull the promo forward or push it past its end. */
export const ND = {
  start: "2026-08-24",
  day: "2026-09-23",
  end: "2026-10-01",
  storageKey: "am-nd96-dismissed",
  height: 46,
};

/* Runs before the bar is painted: decides visibility and reserves the
   height in one pass, so neither showing nor hiding it costs a shift. */
const PREPAINT = `(function(){try{
var s="${ND.start}",e="${ND.end}",k="${ND.storageKey}",h=${ND.height};
var n=new Date(Date.now()+(new Date().getTimezoneOffset()+180)*60000);
var t=n.getFullYear()+"-"+String(n.getMonth()+1).padStart(2,"0")+"-"+String(n.getDate()).padStart(2,"0");
var on=t>=s&&t<=e&&localStorage.getItem(k)!=="1";
var r=document.documentElement;
r.dataset.nd=on?"on":"off";
r.style.setProperty("--announce-h",(on?h:0)+"px");
}catch(_){}})();`;

const copy = {
  ar: {
    label: "عرض اليوم الوطني",
    text: "احتفل باليوم الوطني السعودي 96",
    sub: "خصومات على باقات المتاجر الإلكترونية لفترة محدودة",
    cta: "شاهد العروض",
    dismiss: "إغلاق شريط العرض",
    days: (n: number) => (n > 1 ? `باقي ${n} يوم` : n === 1 ? "غدًا" : "اليوم"),
  },
  en: {
    label: "National Day offer",
    text: "Saudi National Day 96",
    sub: "Limited-time pricing on e-commerce store packages",
    cta: "See the offers",
    dismiss: "Dismiss offer bar",
    days: (n: number) => (n > 1 ? `${n} days left` : n === 1 ? "Tomorrow" : "Today"),
  },
  fr: {
    label: "Offre Fête nationale",
    text: "Fête nationale saoudienne 96",
    sub: "Tarifs limités sur les offres e-commerce",
    cta: "Voir les offres",
    dismiss: "Fermer la barre d'offre",
    days: (n: number) => (n > 1 ? `${n} jours restants` : n === 1 ? "Demain" : "Aujourd'hui"),
  },
} as const;

/* Saudi flag — drawn rather than imported so it stays crisp at 22px and
   costs no request. The shahada band is simplified to a wordmark-weight
   stroke; at this size a literal transcription would render as mud. */
function SaudiFlag() {
  return (
    <svg className={styles.flag} width="24" height="16" viewBox="0 0 24 16" aria-hidden focusable="false">
      <rect width="24" height="16" fill="#006C35" />
      <g fill="#fff">
        <rect x="4" y="5" width="16" height="1.4" rx="0.7" />
        <rect x="5.5" y="7.6" width="13" height="1" rx="0.5" opacity="0.85" />
        <rect x="4" y="10.6" width="15" height="1.1" rx="0.55" />
        <path d="M19 10.6h1.6l-.5 1.1H19z" />
      </g>
    </svg>
  );
}

export default function AnnouncementBar() {
  const locale = useLocale();
  const t = copy[(locale in copy ? locale : "en") as keyof typeof copy];
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  /* Rendered only after mount: the server has no idea what day it is in
     the visitor's session, and a mismatched number is a hydration error. */
  useEffect(() => {
    const now = new Date(Date.now() + (new Date().getTimezoneOffset() + 180) * 60000);
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const [y, m, d] = ND.day.split("-").map(Number);
    const target = Date.UTC(y, m - 1, d);
    setDaysLeft(Math.max(0, Math.round((target - today) / 86400000)));
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(ND.storageKey, "1");
    } catch {
      /* private mode — the bar simply comes back next visit */
    }
    const root = document.documentElement;
    root.dataset.nd = "off";
    root.style.setProperty("--announce-h", "0px");
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: PREPAINT }} />
      <aside className={styles.bar} aria-label={t.label}>
        <div className={styles.inner}>
          <SaudiFlag />
          <span className={styles.text}>{t.text}</span>
          <span className={styles.sub}>{t.sub}</span>
          <span className={styles.count} suppressHydrationWarning>
            {daysLeft === null ? "\u00a0" : t.days(daysLeft)}
          </span>
          <Link href={`/${locale}/store`} className={styles.cta}>
            {t.cta}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <button type="button" className={styles.dismiss} onClick={dismiss} aria-label={t.dismiss}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}
