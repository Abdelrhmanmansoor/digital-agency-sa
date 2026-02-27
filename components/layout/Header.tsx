"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { WHATSAPP_NUMBER } from "@/lib/utils";

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
  const isRTL = locale === "ar";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
    { key: "tools", href: `/${locale}/tools`, badge: "★" },
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
          height: isScrolled ? "64px" : "80px",
          background: isScrolled ? "rgba(10,10,10,0.96)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(200,169,98,0.1)" : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 h-full flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-6">
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

            {/* WhatsApp */}
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
              width={isScrolled ? 110 : 130}
              height={isScrolled ? 44 : 52}
              style={{
                width: isScrolled ? "110px" : "130px",
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
            className="relative flex flex-col gap-1.5 items-end cursor-pointer group"
            aria-label="Toggle menu"
            style={{ padding: "8px", background: "none", border: "none" }}
          >
            <span
              className="block transition-all duration-300"
              style={{
                width: "28px",
                height: "1.5px",
                background: isMenuOpen ? "#C8A962" : "rgba(255,255,255,0.8)",
                transform: isMenuOpen ? "translateY(6px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block transition-all duration-300"
              style={{
                width: "20px",
                height: "1.5px",
                background: isMenuOpen ? "#C8A962" : "rgba(255,255,255,0.8)",
                opacity: isMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="block transition-all duration-300"
              style={{
                width: "28px",
                height: "1.5px",
                background: isMenuOpen ? "#C8A962" : "rgba(255,255,255,0.8)",
                transform: isMenuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Full-Screen Menu */}
      <div
        className={`fullscreen-menu ${isMenuOpen ? "is-open" : ""}`}
        style={{ flexDirection: isRTL ? "row" : "row-reverse" }}
      >
        {/* Pattern overlay */}
        <div className="absolute inset-0 pattern-overlay-dark" style={{ opacity: 0.03 }} />

        {/* Left column — Contact Info */}
        <div
          className="relative z-10 flex flex-col justify-end p-16 border-t border-[rgba(200,169,98,0.1)]"
          style={{ width: "35%" }}
        >
          <div className="space-y-6">
            <div>
              <div className="section-label mb-3">تواصل معنا</div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
                className="block text-white hover:text-[#C8A962] transition-colors"
                style={{ fontSize: "20px", fontWeight: 600 }}
              >
                {WHATSAPP_NUMBER}
              </a>
            </div>

            <div className="flex gap-4 mt-8">
              {[
                { icon: "IG", href: "#" },
                { icon: "TW", href: "#" },
                { icon: "LI", href: "#" },
                { icon: "TK", href: "#" },
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  className="flex items-center justify-center border border-[rgba(200,169,98,0.2)] hover:border-[#C8A962] hover:text-[#C8A962] transition-all duration-300 text-[rgba(255,255,255,0.5)]"
                  style={{ width: "44px", height: "44px", fontFamily: "Space Mono", fontSize: "10px", letterSpacing: "0.05em" }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — Nav Links */}
        <div
          className="relative z-10 flex flex-col justify-center px-16"
          style={{ width: "65%", borderRight: isRTL ? "1px solid rgba(200,169,98,0.1)" : "none", borderLeft: !isRTL ? "1px solid rgba(200,169,98,0.1)" : "none" }}
        >
          <ul className="menu-links space-y-2" dir={isRTL ? "rtl" : "ltr"}>
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center gap-4 py-3"
                  style={{ textDecoration: "none" }}
                >
                  <span
                    className="transition-all duration-300 group-hover:text-[#C8A962]"
                    style={{
                      fontFamily: "Noto Kufi Arabic, sans-serif",
                      fontSize: isRTL ? "48px" : "42px",
                      fontWeight: 700,
                      color: "#FAFAF7",
                      lineHeight: 1.1,
                    }}
                  >
                    {t(item.key as "home")}
                  </span>
                  {item.badge && (
                    <span className="gold-badge text-xs">{item.badge}</span>
                  )}
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                    style={{ color: "#C8A962", fontSize: "24px" }}
                  >
                    {isRTL ? "←" : "→"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
