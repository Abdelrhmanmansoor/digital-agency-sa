"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { WHATSAPP_NUMBER, AGENCY_INFO } from "@/lib/utils";

const locales = [
  { code: "ar", label: "AR", dir: "rtl" },
  { code: "en", label: "EN", dir: "ltr" },
  { code: "fr", label: "FR", dir: "ltr" },
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isRTL = locale === "ar";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const navItems = [
    { key: "home", href: `/${locale}` },
    { key: "services", href: `/${locale}#services` },
    { key: "portfolio", href: `/${locale}#portfolio` },
    { key: "store", href: `/${locale}/store`, badge: "جديد" },
    { key: "tools", href: `/${locale}/radar`, badge: "★" },
    { key: "blog", href: `/${locale}/blog` },
    { key: "pricing", href: `/${locale}#pricing` },
    { key: "about", href: `/${locale}#about` },
    { key: "contact", href: `/${locale}#contact` },
  ];

  return (
    <>
      {/* Main Header */}
      <header
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
        style={{
          height: isScrolled ? "60px" : "72px",
          background: isScrolled ? "rgba(10,10,10,0.96)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(200,169,98,0.1)" : "none",
        }}
      >
        <div
          className="max-w-[1400px] mx-auto h-full flex items-center justify-between relative z-10"
          style={{ padding: isMobile ? "0 16px" : "0 32px" }}
        >
          {/* Left side */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1">
              {locales.map((l, i) => (
                <span key={l.code} className="flex items-center gap-1">
                  <Link
                    href={`/${l.code}`}
                    className="transition-colors duration-200 hover:text-[#C8A962]"
                    style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      color: locale === l.code ? "#C8A962" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {l.label}
                  </Link>
                  {i < locales.length - 1 && (
                    <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px" }}>|</span>
                  )}
                </span>
              ))}
            </div>

            {/* WhatsApp — desktop only */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 transition-colors duration-200 hover:text-[#C8A962]"
              style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontFamily: "Space Mono, monospace" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {WHATSAPP_NUMBER}
            </a>
          </div>

          {/* Center Logo */}
          <Link
            href={`/${locale}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/logo.png"
              alt="وكالة رقمية"
              width={isScrolled ? 100 : 120}
              height={isScrolled ? 40 : 48}
              style={{
                width: isMobile ? "90px" : isScrolled ? "100px" : "120px",
                height: "auto",
                transition: "all 0.3s ease",
                objectFit: "contain",
              }}
              priority
            />
          </Link>

          {/* Right side — Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            style={{
              padding: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                display: "block",
                width: "28px",
                height: "1.5px",
                background: isMenuOpen ? "#C8A962" : "rgba(255,255,255,0.8)",
                transform: isMenuOpen ? "translateY(7.5px) rotate(45deg)" : "none",
                transition: "all 0.3s ease",
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                background: isMenuOpen ? "#C8A962" : "rgba(255,255,255,0.8)",
                opacity: isMenuOpen ? 0 : 1,
                transition: "all 0.3s ease",
              }}
            />
            <span
              style={{
                display: "block",
                width: "28px",
                height: "1.5px",
                background: isMenuOpen ? "#C8A962" : "rgba(255,255,255,0.8)",
                transform: isMenuOpen ? "translateY(-7.5px) rotate(-45deg)" : "none",
                transition: "all 0.3s ease",
              }}
            />
          </button>
        </div>
      </header>

      {/* Full-Screen Menu */}
      <div
        className={`fullscreen-menu ${isMenuOpen ? "is-open" : ""}`}
        style={{
          flexDirection: isMobile ? "column" : isRTL ? "row" : "row-reverse",
          overflowY: isMobile ? "auto" : "hidden",
        }}
      >
        {/* Pattern overlay */}
        <div className="absolute inset-0 pattern-overlay-dark" style={{ opacity: 0.03, pointerEvents: "none" }} />

        {/* Nav Links column */}
        <div
          className="relative z-10 flex flex-col justify-center"
          style={{
            width: isMobile ? "100%" : "65%",
            padding: isMobile ? "80px 24px 32px" : "0 64px",
            borderRight: !isMobile && isRTL ? "1px solid rgba(200,169,98,0.1)" : "none",
            borderLeft: !isMobile && !isRTL ? "1px solid rgba(200,169,98,0.1)" : "none",
          }}
        >
          <ul className="menu-links" style={{ margin: 0, padding: 0, listStyle: "none" }} dir={isRTL ? "rtl" : "ltr"}>
            {navItems.map((item) => (
              <li key={item.key} style={{ marginBottom: isMobile ? "4px" : "0" }}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-3"
                  style={{ textDecoration: "none", padding: isMobile ? "10px 0" : "12px 0" }}
                >
                  <span
                    className="transition-all duration-300 group-hover:text-[#C8A962]"
                    style={{
                      fontFamily: "'Zain', sans-serif",
                      fontSize: isMobile ? "34px" : isRTL ? "48px" : "42px",
                      fontWeight: 700,
                      color: "#FAFAF7",
                      lineHeight: 1.1,
                    }}
                  >
                    {t(item.key as "home")}
                  </span>
                  {item.badge && (
                    <span className="gold-badge" style={{ fontSize: "10px" }}>{item.badge}</span>
                  )}
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ color: "#C8A962", fontSize: "20px", marginRight: isRTL ? "auto" : "0", marginLeft: !isRTL ? "auto" : "0" }}
                  >
                    {isRTL ? "←" : "→"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info column */}
        <div
          className="relative z-10 flex flex-col"
          style={{
            width: isMobile ? "100%" : "35%",
            padding: isMobile ? "24px 24px 40px" : "0 64px",
            justifyContent: isMobile ? "flex-start" : "flex-end",
            paddingBottom: isMobile ? "40px" : "64px",
            borderTop: isMobile ? "1px solid rgba(200,169,98,0.1)" : "none",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <div className="section-label" style={{ marginBottom: "12px" }}>{t("contact")}</div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white hover:text-[#C8A962] transition-colors"
                style={{ fontSize: isMobile ? "18px" : "20px", fontWeight: 600, fontFamily: "Space Mono, monospace" }}
              >
                {WHATSAPP_NUMBER}
              </a>
              {AGENCY_INFO.email && (
                <a
                  href={`mailto:${AGENCY_INFO.email}`}
                  className="block transition-colors mt-2"
                  style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}
                >
                  {AGENCY_INFO.email}
                </a>
              )}
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {[
                ...(AGENCY_INFO.social.instagram ? [{
                  label: "Instagram",
                  href: AGENCY_INFO.social.instagram,
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                }] : []),
                ...(AGENCY_INFO.social.twitter ? [{
                  label: "X",
                  href: AGENCY_INFO.social.twitter,
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                }] : []),
                ...(AGENCY_INFO.social.tiktok ? [{
                  label: "TikTok",
                  href: AGENCY_INFO.social.tiktok,
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.83 1.56V6.8a4.84 4.84 0 01-1.06-.11z"/>
                    </svg>
                  ),
                }] : []),
                {
                  label: "WhatsApp",
                  href: `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`,
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center border border-[rgba(200,169,98,0.2)] hover:border-[#C8A962] hover:text-[#C8A962] transition-all duration-300 text-[rgba(255,255,255,0.5)]"
                  style={{ width: "44px", height: "44px" }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
