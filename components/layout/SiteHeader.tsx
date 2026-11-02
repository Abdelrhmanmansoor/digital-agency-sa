"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { PRIMARY_NAV, l, pick, type NavGroup } from "@/lib/navigation";
import { getWhatsAppLink } from "@/lib/utils";
import styles from "./SiteHeader.module.css";

/* A floating glass capsule, the way private banks and Framer-built product
   sites frame their first screen. It is transparent over the hero so the
   banner reads as one continuous image, and frosts once the page scrolls.

   Gone from the old bar: search, account, cart, the announcement strip and
   the seasonal banner. The store no longer has a cart, and every action the
   header offers now ends in one place — a WhatsApp conversation. */

const copy = {
  ar: {
    home: "الرئيسية",
    menu: "القائمة",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    cta: "ابدأ مشروعك",
    nav: "التنقل الرئيسي",
    hello: "مرحبًا، أريد مناقشة مشروعي.",
    skip: "تخطَّ إلى المحتوى",
    drawerKicker: "تواصل مباشر",
    drawerNote: "نرد خلال أقل من ساعة في أوقات العمل",
  },
  en: {
    home: "Home",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    cta: "Start a project",
    nav: "Main navigation",
    hello: "Hi, I would like to discuss my project.",
    skip: "Skip to content",
    drawerKicker: "Direct line",
    drawerNote: "We reply within the hour during working hours",
  },
  fr: {
    home: "Accueil",
    menu: "Menu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    cta: "Démarrer",
    nav: "Navigation principale",
    hello: "Bonjour, je souhaite discuter de mon projet.",
    skip: "Aller au contenu",
    drawerKicker: "Ligne directe",
    drawerNote: "Réponse en moins d'une heure aux heures ouvrées",
  },
} as const;

const LOCALES = [
  { code: "ar", label: "العربية", short: "ع" },
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
] as const;

const I = {
  burger: "M4 8h16M4 16h16",
  close: "M18 6 6 18M6 6l12 12",
  chev: "m6 9 6 6 6-6",
  arrow: "M7 17 17 7M8 7h9v9",
};

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <path d={d} />
    </svg>
  );
}

export default function SiteHeader() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = copy[(locale in copy ? locale : "en") as keyof typeof copy];

  const [stuck, setStuck] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), { threshold: 0 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (drawerOpen) {
        setDrawerOpen(false);
        burgerRef.current?.focus();
      }
      setOpenGroup(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  useEffect(() => {
    if (!openGroup) return;
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenGroup(null);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [openGroup]);

  const href = useCallback((to: string) => l(locale, to), [locale]);

  const isCurrent = (to: string) => {
    if (to.includes("#")) return false;
    const full = href(to);
    if (to === "/") return pathname === full;
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  const localeHref = (code: string) => `/${code}${pathname.replace(/^\/(ar|en|fr)(?=\/|$)/, "")}`;
  const whatsapp = getWhatsAppLink(t.hello);

  const renderGroup = (group: NavGroup) => {
    const label = pick(group.label, locale);
    const open = openGroup === label;

    if (!group.children) {
      return (
        <li key={label}>
          <Link href={href(group.href!)} className={styles.navLink} aria-current={isCurrent(group.href!) ? "page" : undefined}>
            {label}
          </Link>
        </li>
      );
    }

    return (
      <li
        key={label}
        className={styles.navItem}
        onMouseEnter={() => setOpenGroup(label)}
        onMouseLeave={() => setOpenGroup((c) => (c === label ? null : c))}
      >
        <button
          type="button"
          className={styles.navLink}
          data-open={open || undefined}
          aria-expanded={open}
          aria-haspopup="true"
          onClick={() => setOpenGroup(open ? null : label)}
        >
          {label}
          <span className={styles.chev} aria-hidden>
            <Icon d={I.chev} size={14} />
          </span>
        </button>
        <div className={styles.panel} data-open={open || undefined} role="group" aria-label={label}>
          <div className={styles.panelGrid}>
            {group.children.map((leaf, i) => (
              <Link key={leaf.href} href={href(leaf.href)} className={styles.panelLink} tabIndex={open ? 0 : -1}>
                <span className={styles.panelNum}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className={styles.panelTitle}>{pick(leaf.label, locale)}</span>
                  {leaf.hint && <span className={styles.panelHint}>{pick(leaf.hint, locale)}</span>}
                </span>
              </Link>
            ))}
          </div>
          <Link href={href("/store")} className={styles.panelFoot} tabIndex={open ? 0 : -1}>
            {locale === "ar" ? "كل المنتجات والأسعار" : locale === "fr" ? "Tous les produits et tarifs" : "All products and pricing"}
            <Icon d={I.arrow} size={15} />
          </Link>
        </div>
      </li>
    );
  };

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden />

      <header className={styles.root} data-stuck={stuck || undefined}>
        <div className={styles.capsule}>
          <Link href={href("/")} className={styles.logo} aria-label={t.home}>
            <Image src="/logo-ink.png" alt="AM Design" width={224} height={80} priority sizes="104px" />
          </Link>

          <nav ref={navRef} className={styles.nav} aria-label={t.nav}>
            <ul>{PRIMARY_NAV.map(renderGroup)}</ul>
          </nav>

          <div className={styles.actions}>
            <div className={styles.langs}>
              {LOCALES.filter((loc) => loc.code !== locale).map((loc) => (
                <Link key={loc.code} href={localeHref(loc.code)} lang={loc.code} hrefLang={loc.code} className={styles.lang} title={loc.label}>
                  {loc.short}
                </Link>
              ))}
            </div>

            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={styles.cta}>
              <span className={styles.ctaDot} aria-hidden />
              {t.cta}
            </a>

            <button
              ref={burgerRef}
              type="button"
              className={styles.burger}
              onClick={() => setDrawerOpen(true)}
              aria-label={t.openMenu}
              aria-expanded={drawerOpen}
              aria-controls="site-drawer"
            >
              <Icon d={I.burger} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer: full-height ink sheet ── */}
      <div className={styles.scrim} data-open={drawerOpen || undefined} onClick={() => setDrawerOpen(false)} aria-hidden />
      <aside id="site-drawer" className={styles.drawer} data-open={drawerOpen || undefined} aria-label={t.menu} inert={!drawerOpen}>
        <div className={styles.drawerHead}>
          <Image src="/logo-ink.png" alt="AM Design" width={224} height={80} sizes="104px" style={{ width: 104, height: "auto" }} />
          <button type="button" className={styles.drawerClose} onClick={() => setDrawerOpen(false)} aria-label={t.closeMenu}>
            <Icon d={I.close} size={18} />
          </button>
        </div>

        <nav className={styles.drawerNav} aria-label={t.nav}>
          <Link href={href("/")} className={styles.mLink}>
            {t.home}
          </Link>
          {PRIMARY_NAV.map((group) => {
            const label = pick(group.label, locale);
            return (
              <div key={label}>
                <Link href={href(group.href ?? "/")} className={styles.mLink}>
                  {label}
                </Link>
                {group.children && (
                  <div className={styles.mSub}>
                    {group.children.map((leaf) => (
                      <Link key={leaf.href} href={href(leaf.href)} className={styles.mSubLink}>
                        {pick(leaf.label, locale)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className={styles.drawerFoot}>
          <p className={styles.drawerKicker}>{t.drawerKicker}</p>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ width: "100%" }}>
            {t.cta}
          </a>
          <p className={styles.drawerNote}>{t.drawerNote}</p>
          <div className={styles.drawerLangs}>
            {LOCALES.map((loc) => (
              <Link
                key={loc.code}
                href={localeHref(loc.code)}
                lang={loc.code}
                hrefLang={loc.code}
                aria-current={locale === loc.code ? "true" : undefined}
              >
                {loc.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
