"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { WHATSAPP_NUMBER } from "@/lib/utils";
import { useCart } from "@/components/store/CartContext";

const locales = [
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { count, isReady } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isRTL = locale === "ar";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile panel on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /* The panel stays mounted when closed, so without Escape (and `inert`
     below) a keyboard user could tab into an off-screen menu with no way
     out. */
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  /* `#portfolio` and `#pricing` pointed at section ids the homepage does not
     have — two nav items that scrolled nowhere. The homepage exposes
     #services, #sidra, #work, #process, #faq and #contact; pricing lives on
     the store page. SIDRA and Radar were reachable from no menu at all. */
  const navItems = [
    { key: "home", href: `/${locale}` },
    { key: "services", href: `/${locale}#services` },
    { key: "sidra", href: `/${locale}/sidra-theme` },
    { key: "work", href: `/${locale}#work` },
    { key: "store", href: `/${locale}/store` },
    { key: "blog", href: `/${locale}/blog` },
    { key: "contact", href: `/${locale}#contact` },
  ];

  /* Switching language used to throw the visitor back to the homepage of the
     new locale. Keep them on the page they are reading. */
  const localeHref = (code: string) => {
    const rest = pathname.replace(/^\/(ar|en|fr)(?=\/|$)/, "");
    return `/${code}${rest}`;
  };

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Top utility strip ── */}
      <div
        className="hidden md:flex items-center justify-between fixed top-0 left-0 right-0"
        style={{
          background: "#111111",
          color: "rgba(255,255,255,0.85)",
          fontSize: "12.5px",
          padding: "0 32px",
          zIndex: 1001,
          height: "34px",
        }}
      >
        <div className="flex items-center gap-5">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#F0B100] transition-colors"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span dir="ltr">{WHATSAPP_NUMBER}</span>
          </a>
          <span style={{ opacity: 0.3 }} aria-hidden>|</span>
          <span>{isRTL ? "رد خلال أقل من ساعة" : locale === "fr" ? "Réponse en moins d'1 heure" : "Reply in under 1 hour"}</span>
        </div>
        <div className="flex items-center gap-3">
          {locales.map((l, i) => (
            <span key={l.code} className="flex items-center gap-3">
              <Link
                href={localeHref(l.code)}
                lang={l.code}
                hrefLang={l.code}
                aria-current={locale === l.code ? "true" : undefined}
                style={{
                  color: locale === l.code ? "#F0B100" : "inherit",
                  fontWeight: locale === l.code ? 700 : 400,
                  textDecoration: "none",
                }}
                className="hover:text-[#F0B100] transition-colors"
              >
                {l.label}
              </Link>
              {i < locales.length - 1 && <span style={{ opacity: 0.3 }} aria-hidden>|</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main header ── */}
      <header className={`site-header top-0 md:!top-[34px] ${isScrolled ? "is-scrolled" : ""}`}>
        <div
          className="max-w-[1400px] mx-auto flex items-center justify-between gap-6 px-4 md:px-8"
          style={{ height: isScrolled ? "64px" : "76px", transition: "height 0.3s" }}
        >
          {/* Logo */}
          <Link href={`/${locale}`} aria-label={isRTL ? "الصفحة الرئيسية" : "Homepage"} style={{ flexShrink: 0 }}>
            <Image
              src="/logo.png"
              alt="AM Design"
              width={120}
              height={48}
              style={{ width: isScrolled ? "100px" : "116px", height: "auto", objectFit: "contain", transition: "width 0.3s" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label={isRTL ? "التنقل الرئيسي" : "Main navigation"}>
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`nav-link ${isActive(item.href) ? "is-active" : ""}`}
              >
                {t(item.key as "home")}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Account */}
            <Link
              href={`/${locale}/dashboard`}
              className="hidden md:inline-flex items-center justify-center hover:border-[#111] transition-colors"
              aria-label={t("my_account")}
              title={t("my_account")}
              style={{
                width: "42px",
                height: "42px",
                border: "1px solid #DCDCD6",
                borderRadius: "10px",
                color: "#111111",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              href={`/${locale}/store/cart`}
              className="inline-flex items-center justify-center relative hover:border-[#111] transition-colors"
              aria-label={isRTL ? `سلة المشتريات — ${count} عناصر` : `Shopping cart — ${count} items`}
              style={{
                width: "42px",
                height: "42px",
                border: "1px solid #DCDCD6",
                borderRadius: "10px",
                color: "#111111",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {isReady && count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-7px",
                    insetInlineEnd: "-7px",
                    minWidth: "20px",
                    height: "20px",
                    background: "#F0B100",
                    color: "#111",
                    borderRadius: "10px",
                    fontSize: "11px",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 5px",
                    border: "2px solid #fff",
                  }}
                >
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>

            {/* Primary CTA */}
            <Link href={`/${locale}#contact`} className="btn-primary hidden md:inline-flex" style={{ padding: "11px 22px", fontSize: "14px" }}>
              {isRTL ? "ابدأ مشروعك" : locale === "fr" ? "Démarrer" : "Start Project"}
            </Link>

            {/* Hamburger — mobile / tablet */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label={isRTL ? "فتح القائمة" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="lg:hidden inline-flex items-center justify-center"
              style={{
                width: "42px",
                height: "42px",
                border: "1px solid #DCDCD6",
                borderRadius: "10px",
                background: "#fff",
                cursor: "pointer",
                color: "#111",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer so content never hides under the fixed header */}
      <div aria-hidden className="h-[76px] md:h-[110px]" />

      {/* ── Mobile panel ── */}
      <div
        className={`mobile-nav-backdrop ${isMenuOpen ? "is-open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden
      />
      <aside
        className={`mobile-nav-panel ${isMenuOpen ? "is-open" : ""}`}
        aria-label={isRTL ? "قائمة الجوال" : "Mobile menu"}
        inert={!isMenuOpen}
      >
        <div className="flex items-center justify-between" style={{ padding: "18px 20px", borderBottom: "1px solid #EAEAE6" }}>
          <Image src="/logo.png" alt="AM Design" width={92} height={36} style={{ width: "92px", height: "auto", objectFit: "contain" }} />
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label={isRTL ? "إغلاق القائمة" : "Close menu"}
            style={{ width: "38px", height: "38px", border: "1px solid #DCDCD6", borderRadius: "10px", background: "#fff", cursor: "pointer", color: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav style={{ padding: "12px 8px" }} aria-label={isRTL ? "روابط القائمة" : "Menu links"}>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: "block",
                padding: "13px 16px",
                fontSize: "17px",
                fontWeight: 700,
                color: "#111",
                textDecoration: "none",
                borderRadius: "10px",
              }}
              className="hover:bg-[#F7F7F5] transition-colors"
            >
              {t(item.key as "home")}
            </Link>
          ))}
          <Link
            href={`/${locale}/dashboard`}
            onClick={() => setIsMenuOpen(false)}
            style={{ display: "block", padding: "13px 16px", fontSize: "17px", fontWeight: 700, color: "#111", textDecoration: "none", borderRadius: "10px" }}
            className="hover:bg-[#F7F7F5] transition-colors"
          >
            {t("my_account")}
          </Link>
        </nav>

        <div style={{ padding: "16px 20px", borderTop: "1px solid #EAEAE6", marginTop: "8px" }}>
          <Link href={`/${locale}#contact`} onClick={() => setIsMenuOpen(false)} className="btn-primary" style={{ width: "100%" }}>
            {isRTL ? "ابدأ مشروعك الآن" : locale === "fr" ? "Démarrer votre projet" : "Start your project"}
          </Link>
          <div className="flex items-center justify-center gap-4" style={{ marginTop: "16px" }}>
            {locales.map((l) => (
              <Link
                key={l.code}
                href={localeHref(l.code)}
                lang={l.code}
                hrefLang={l.code}
                aria-current={locale === l.code ? "true" : undefined}
                style={{
                  minHeight: "44px",
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: locale === l.code ? 800 : 500,
                  color: locale === l.code ? "#8A6D00" : "#6B6B6B",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
