"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";
import { WA_PATH } from "./WhatsAppFab";
import styles from "./OfferPopup.module.css";

/* The 50% store-design offer. It opens once per browser session, 4 seconds
   after the page settles, and never again after the visitor closes it or
   taps through to WhatsApp (remembered for 3 days). Esc, the backdrop and the
   close button all dismiss it; focus moves into the dialog and back out. */

const DELAY_MS = 4000;
const SNOOZE_DAYS = 3;
const KEY = "am-offer50-dismissed";

const copy = {
  ar: {
    badge: "عرض لفترة محدودة",
    off: "خصم",
    title: "على تصميم متجرك",
    sub: "متجر سلة أو زد كامل بهوية علامتك: تصميم يبدأ من الجوال، دفع وتقسيط وشحن مفعّل، واختبار شراء حقيقي قبل التسليم.",
    points: ["عقد وفاتورة رسمية", "دفع على مراحل", "رد خلال ساعة"],
    cta: "احجز الخصم على واتساب",
    later: "ربما لاحقًا",
    close: "إغلاق",
    msg: "مرحبًا، أريد الاستفادة من عرض خصم 50% على تصميم متجري.",
  },
  en: {
    badge: "Limited-time offer",
    off: "OFF",
    title: "your store design",
    sub: "A complete Salla or Zid store in your brand: mobile-first design, payments, BNPL and shipping live, and a real test purchase before handover.",
    points: ["Contract and invoice", "Phased payments", "Reply within the hour"],
    cta: "Claim it on WhatsApp",
    later: "Maybe later",
    close: "Close",
    msg: "Hello, I would like to claim the 50% off store design offer.",
  },
  fr: {
    badge: "Offre limitée",
    off: "de remise",
    title: "sur le design de votre boutique",
    sub: "Une boutique Salla ou Zid complète à votre image : design mobile d’abord, paiement, BNPL et livraison actifs, testée avec un vrai achat.",
    points: ["Contrat et facture", "Paiement par étapes", "Réponse en 1 h"],
    cta: "En profiter sur WhatsApp",
    later: "Plus tard",
    close: "Fermer",
    msg: "Bonjour, je souhaite profiter de l’offre -50 % sur le design de ma boutique.",
  },
} as const;

function isSnoozed() {
  try {
    if (sessionStorage.getItem(KEY)) return true;
    const until = Number(localStorage.getItem(KEY) || 0);
    return until > Date.now();
  } catch {
    return false;
  }
}

function snooze() {
  try {
    sessionStorage.setItem(KEY, "1");
    localStorage.setItem(KEY, String(Date.now() + SNOOZE_DAYS * 864e5));
  } catch {
    /* storage blocked: the popup simply may show again next visit */
  }
}

type Gtag = (...args: unknown[]) => void;
function track(event: string) {
  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[]; fbq?: Gtag };
  try {
    w.gtag?.("event", event, { offer: "store_design_50" });
    w.dataLayer?.push({ event, offer: "store_design_50" });
    if (event === "offer_whatsapp_click") w.fbq?.("track", "Lead", { content_name: "store_design_50" });
  } catch {
    /* analytics is optional */
  }
}

export default function OfferPopup() {
  const locale = useLocale();
  const t = copy[(locale in copy ? locale : "en") as keyof typeof copy];
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<Element | null>(null);

  useEffect(() => {
    if (isSnoozed()) return;
    const id = window.setTimeout(() => {
      lastFocus.current = document.activeElement;
      setOpen(true);
      track("offer_popup_view");
    }, DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  const close = useCallback(() => {
    snooze();
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      (lastFocus.current as HTMLElement | null)?.focus?.();
    }, 280);
  }, []);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div className={styles.overlay} data-closing={closing || undefined} onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div ref={dialogRef} className={styles.card} role="dialog" aria-modal="true" aria-labelledby="offer-title" aria-describedby="offer-sub">
        <button type="button" className={styles.x} onClick={close} aria-label={t.close}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>

        <div className={styles.glow} aria-hidden />

        <p className={styles.badge}>
          <span className={styles.pulse} aria-hidden />
          {t.badge}
        </p>

        <h2 id="offer-title" className={styles.title}>
          <span className={styles.big}>
            <b>50%</b>
            <small>{t.off}</small>
          </span>
          <span className={styles.line}>{t.title}</span>
        </h2>

        <p id="offer-sub" className={styles.sub}>{t.sub}</p>

        <ul className={styles.points}>
          {t.points.map((p) => (
            <li key={p}>
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {p}
            </li>
          ))}
        </ul>

        <a
          href={getWhatsAppLink(t.msg)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
          data-autofocus
          onClick={() => { track("offer_whatsapp_click"); snooze(); setOpen(false); }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden><path d={WA_PATH} /></svg>
          {t.cta}
        </a>
        <button type="button" className={styles.later} onClick={close}>{t.later}</button>
      </div>
    </div>
  );
}
