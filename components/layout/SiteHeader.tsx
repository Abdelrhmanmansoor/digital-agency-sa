"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useCart } from "@/components/store/CartContext";
import { PRIMARY_NAV, l, pick, type NavGroup } from "@/lib/navigation";
import { getWhatsAppLink } from "@/lib/utils";
import AnnouncementBar from "./AnnouncementBar";
import styles from "./SiteHeader.module.css";

/* The palette is a few kilobytes of index-building that no visitor needs
   before they press the search button, so it loads on demand. */
const HeaderSearch = dynamic(() => import("./HeaderSearch"), { ssr: false });

const copy = {
  ar: {
    home: "الرئيسية",
    menu: "القائمة",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    search: "بحث",
    account: "حسابي",
    cart: "سلة المشتريات",
    cta: "ابدأ مشروعك",
    whatsapp: "واتساب",
    store: "المتجر",
    nav: "التنقل الرئيسي",
    talk: "تحدث معنا على واتساب",
    hello: "مرحبًا، أريد مناقشة مشروع متجر إلكتروني.",
    skip: "تخطَّ إلى المحتوى",
    currentPage: "الصفحة الحالية",
  },
  en: {
    home: "Home",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    search: "Search",
    account: "Account",
    cart: "Cart",
    cta: "Start a project",
    whatsapp: "WhatsApp",
    store: "Store",
    nav: "Main navigation",
    talk: "Talk to us on WhatsApp",
    hello: "Hi, I would like to discuss an e-commerce project.",
    skip: "Skip to content",
    currentPage: "current page",
  },
  fr: {
    home: "Accueil",
    menu: "Menu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    search: "Recherche",
    account: "Compte",
    cart: "Panier",
    cta: "Démarrer un projet",
    whatsapp: "WhatsApp",
    store: "Boutique",
    nav: "Navigation principale",
    talk: "Discuter sur WhatsApp",
    hello: "Bonjour, je souhaite discuter d'un projet e-commerce.",
    skip: "Aller au contenu",
    currentPage: "page actuelle",
  },
} as const;

const LOCALES = [
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
] as const;

/* ── Icons: one stroke weight, one corner treatment, no emoji anywhere ── */
const I = {
  search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM21 21l-4.35-4.35",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  cart: "M2.5 3h2.2l2.5 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21.5 7H6M9 21h.01M18 21h.01",
  burger: "M3 6h18M3 12h18M3 18h18",
  close: "M18 6 6 18M6 6l12 12",
  chev: "m6 9 6 6 6-6",
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  chat: "M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.7L3 21l1.9-5A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4Z",
};

type Tab = { key: "home" | "store" | "cart" | "whatsapp"; href: string; icon: keyof typeof I; external?: boolean };

const TABS: Tab[] = [
  { key: "home", href: "/", icon: "home" },
  { key: "store", href: "/store", icon: "grid" },
  { key: "cart", href: "/store/cart", icon: "cart" },
  { key: "whatsapp", href: "", icon: "chat", external: true },
];

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <path d={d} />
    </svg>
  );
}

export default function SiteHeader() {
  const locale = useLocale();
  const pathname = usePathname();
  const { count, isReady } = useCart();
  const t = copy[(locale in copy ? locale : "en") as keyof typeof copy];

  const [stuck, setStuck] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerGroup, setDrawerGroup] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  /* Compact state without a scroll listener: watch a 1px sentinel that sits
     immediately above the bar. When it leaves the viewport, the bar is
     stuck. Costs one observer callback per crossing instead of one per
     frame of scrolling. */
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), { threshold: 0 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  /* Any navigation closes everything. Without this the drawer stays open
     over the page the visitor just asked for. */
  useEffect(() => {
    setDrawerOpen(false);
    setOpenGroup(null);
    setSearchOpen(false);
  }, [pathname]);

  /* Scroll lock while the drawer is open, restoring whatever the page had
     rather than assuming it was "visible". */
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  /* Escape closes the topmost layer, and focus goes back to the control
     that opened it so keyboard users are never dropped at the page top. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (drawerOpen) {
          setDrawerOpen(false);
          burgerRef.current?.focus();
        }
        setOpenGroup(null);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  /* A dropdown left open behind a click elsewhere on the page is a trap for
     pointer users the same way a missing Escape is for keyboard users. */
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

  const renderGroup = (group: NavGroup) => {
    const label = pick(group.label, locale);
    const open = openGroup === label;

    if (!group.children) {
      return (
        <li key={label} className={styles.navItem}>
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
          {group.children.map((leaf) => (
            <Link key={leaf.href} href={href(leaf.href)} className={styles.panelLink} tabIndex={open ? 0 : -1}>
              <span className={styles.panelTitle}>
                {pick(leaf.label, locale)}
                {leaf.badge && <span className={styles.panelBadge}>{pick(leaf.badge, locale)}</span>}
              </span>
              {leaf.hint && <span className={styles.panelHint}>{pick(leaf.hint, locale)}</span>}
            </Link>
          ))}
        </div>
      </li>
    );
  };

  /* The four destinations that carry the mobile funnel. Order is fixed so
     the sliding highlight can be positioned from an index alone. */
  const activeTab = TABS.findIndex((tab) => !tab.external && isCurrent(tab.href));

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <AnnouncementBar />
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden />

      <div className={styles.root} data-stuck={stuck || undefined}>
        <div className={styles.bar}>
          {/* Ink variant, not /logo.png. The supplied wordmark is white with a
              yellow swoosh; on this bar — rgba(255,255,255,0.86) over a white
              page — every letter of it was painting white on white, so the
              brand name was invisible sitewide and only the swoosh showed.
              /logo.png stays as-is for the dark footer and admin chrome. */}
          <Link href={href("/")} className={styles.logo} aria-label={t.home}>
            <Image src="/logo-ink.png" alt="AM Design" width={224} height={88} priority sizes="112px" />
          </Link>

          <nav ref={navRef} className={styles.nav} aria-label={t.nav}>
            <ul style={{ display: "flex", alignItems: "center", gap: 2, listStyle: "none", margin: 0, padding: 0 }}>
              {PRIMARY_NAV.map(renderGroup)}
            </ul>
          </nav>

          <div className={styles.actions}>
            <button type="button" className={styles.iconBtn} onClick={() => setSearchOpen(true)} aria-label={t.search} title={`${t.search} (Ctrl K)`}>
              <Icon d={I.search} />
            </button>

            <Link href={href("/dashboard")} className={`${styles.iconBtn} ${styles.hideSm}`} aria-label={t.account} title={t.account}>
              <Icon d={I.user} />
            </Link>

            <Link
              href={href("/store/cart")}
              className={styles.iconBtn}
              aria-label={isReady && count > 0 ? `${t.cart} (${count})` : t.cart}
              title={t.cart}
            >
              <Icon d={I.cart} />
              {isReady && count > 0 && <span className={styles.count}>{count > 99 ? "99+" : count}</span>}
            </Link>

            <Link href={href("/#contact")} className={styles.cta}>
              {t.cta}
            </Link>

            <button
              ref={burgerRef}
              type="button"
              className={`${styles.iconBtn} ${styles.burger}`}
              onClick={() => setDrawerOpen(true)}
              aria-label={t.openMenu}
              aria-expanded={drawerOpen}
              aria-controls="site-drawer"
            >
              <Icon d={I.burger} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={styles.scrim} data-open={drawerOpen || undefined} onClick={() => setDrawerOpen(false)} aria-hidden />
      <aside id="site-drawer" className={styles.drawer} data-open={drawerOpen || undefined} aria-label={t.menu} inert={!drawerOpen}>
        <div className={styles.drawerHead}>
          <Image src="/logo-ink.png" alt="AM Design" width={184} height={72} sizes="92px" style={{ width: 92, height: "auto" }} />
          <button type="button" className={styles.iconBtn} onClick={() => setDrawerOpen(false)} aria-label={t.closeMenu}>
            <Icon d={I.close} size={16} />
          </button>
        </div>

        <div className={styles.drawerBody}>
          <Link href={href("/")} className={styles.mLink}>
            {t.home}
          </Link>
          {PRIMARY_NAV.map((group) => {
            const label = pick(group.label, locale);
            if (!group.children) {
              return (
                <Link key={label} href={href(group.href!)} className={styles.mLink}>
                  {label}
                </Link>
              );
            }
            const open = drawerGroup === label;
            return (
              <div key={label}>
                <button
                  type="button"
                  className={styles.mLink}
                  aria-expanded={open}
                  onClick={() => setDrawerGroup(open ? null : label)}
                >
                  {label}
                  <span className={styles.chev} data-open={open || undefined} style={{ transform: open ? "rotate(180deg)" : undefined, display: "inline-flex" }} aria-hidden>
                    <Icon d={I.chev} size={16} />
                  </span>
                </button>
                <div className={styles.mGroup} data-open={open || undefined}>
                  <div className={styles.mGroupInner}>
                    <div className={styles.mSub}>
                      {group.children.map((leaf) => (
                        <Link key={leaf.href} href={href(leaf.href)} className={styles.mSubLink} tabIndex={open ? 0 : -1}>
                          {pick(leaf.label, locale)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <Link href={href("/dashboard")} className={styles.mLink}>
            {t.account}
          </Link>
        </div>

        <div className={styles.drawerFoot}>
          <Link href={href("/#contact")} className="btn-primary" style={{ width: "100%", minHeight: 50 }}>
            {t.cta}
          </Link>
          <a href={getWhatsAppLink(t.hello)} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ width: "100%", minHeight: 50 }}>
            {t.talk}
          </a>
          <div className={styles.locales}>
            {LOCALES.map((loc) => (
              <Link
                key={loc.code}
                href={localeHref(loc.code)}
                lang={loc.code}
                hrefLang={loc.code}
                className={styles.locale}
                aria-current={locale === loc.code ? "true" : undefined}
              >
                {loc.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Mobile action bar: a floating glass capsule, four destinations ── */}
      <nav className={styles.tabbar} aria-label={t.nav} style={{ ["--tab-i" as string]: activeTab < 0 ? 0 : activeTab }}>
        <span className={styles.tabPill} data-hidden={activeTab < 0 || undefined} aria-hidden />
        {TABS.map((tab, i) => {
          const current = activeTab === i;
          const label = t[tab.key];
          const content = (
            <>
              <Icon d={I[tab.icon]} size={22} />
              {tab.key === "cart" && isReady && count > 0 && (
                <span className={styles.tabCount}>{count > 9 ? "9+" : count}</span>
              )}
            </>
          );
          /* WhatsApp leaves the site, so it is an anchor, not a Link. */
          return tab.external ? (
            <a
              key={tab.key}
              href={getWhatsAppLink(t.hello)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.tab}
              data-accent="true"
              aria-label={label}
              title={label}
            >
              {content}
            </a>
          ) : (
            <Link
              key={tab.key}
              href={href(tab.href)}
              className={styles.tab}
              aria-current={current ? "page" : undefined}
              aria-label={current ? `${label} — ${t.currentPage}` : label}
              title={label}
            >
              {content}
            </Link>
          );
        })}
      </nav>

      {searchOpen && <HeaderSearch onClose={() => setSearchOpen(false)} />}
    </>
  );
}
