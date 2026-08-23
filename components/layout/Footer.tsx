"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { AGENCY_INFO } from "@/lib/utils";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services.list");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const currentYear = new Date().getFullYear();

  /* These were all rendered as `/{locale}#{key}`, so `#portfolio`, `#about`
     and `#blog` scrolled nowhere — and the blog is a page, not a section. */
  const quickLinks = [
    { key: "home", href: `/${locale}` },
    { key: "services", href: `/${locale}#services` },
    { key: "work", href: `/${locale}#work` },
    { key: "sidra", href: `/${locale}/sidra-theme` },
    { key: "blog", href: `/${locale}/blog` },
    { key: "contact", href: `/${locale}#contact` },
  ] as const;
  const serviceLinks = [
    { key: "salla_design", label: tServices("salla_design.name") },
    { key: "digital_marketing", label: tServices("digital_marketing.name") },
    { key: "branding", label: tServices("branding.name") },
    { key: "web_dev", label: tServices("web_dev.name") },
    { key: "salla_tools", label: tServices("salla_tools.name") },
  ];
  const storeLinks = [
    { href: `/${locale}/store`, label: isRTL ? "المتجر الإلكتروني" : locale === "fr" ? "Boutique" : "Store" },
    { href: `/${locale}/store/cart`, label: isRTL ? "سلة المشتريات" : locale === "fr" ? "Panier" : "Cart" },
    { href: `/${locale}/dashboard`, label: tNav("my_account") },
    { href: `/${locale}/policy`, label: isRTL ? "الشروط وسياسة الخصوصية" : locale === "fr" ? "Conditions & Confidentialité" : "Terms & Privacy" },
  ];

  const colTitle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: 800,
    color: "#111111",
    marginBottom: "18px",
    paddingBottom: "10px",
    borderBottom: "2px solid #F0B100",
    display: "inline-block",
  };
  const linkStyle: React.CSSProperties = { color: "#555550", fontSize: "14px", textDecoration: "none" };

  return (
    <footer style={{ background: "#FFFFFF", borderTop: "1px solid #EAEAE6" }}>
      {/* Main grid */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
        <div className="footer-grid grid gap-10" style={{ gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr" }}>
          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="AM Design"
              loading="lazy"
              style={{ height: "36px", width: "auto", objectFit: "contain", marginBottom: "16px", display: "block" }}
            />
            <p style={{ color: "#555550", fontSize: "14px", lineHeight: 1.9, marginBottom: "22px", maxWidth: "320px" }}>
              {t("description")}
            </p>
            <div className="flex gap-3">
              {[
                {
                  name: "Instagram",
                  href: AGENCY_INFO.social.instagram,
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                },
                {
                  name: "X",
                  href: AGENCY_INFO.social.twitter,
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                },
                {
                  name: "TikTok",
                  href: AGENCY_INFO.social.tiktok,
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.83 1.56V6.8a4.84 4.84 0 01-1.06-.11z"/>
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex items-center justify-center transition-all duration-200 hover:border-[#111] hover:text-[#111]"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px solid #DCDCD6",
                    borderRadius: "10px",
                    color: "#6B6B6B",
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label={isRTL ? "روابط سريعة" : "Quick links"}>
            <h4 style={colTitle}>{t("quick_links")}</h4>
            <ul className="space-y-3" style={{ listStyle: "none", padding: 0 }}>
              {quickLinks.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="hover:text-[#111] transition-colors" style={linkStyle}>
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services + Store */}
          <nav aria-label={isRTL ? "الخدمات والمتجر" : "Services & store"}>
            <h4 style={colTitle}>{t("our_services")}</h4>
            <ul className="space-y-3" style={{ listStyle: "none", padding: 0 }}>
              {serviceLinks.map((service) => (
                <li key={service.key}>
                  <Link href={`/${locale}#services`} className="hover:text-[#111] transition-colors" style={linkStyle}>
                    {service.label}
                  </Link>
                </li>
              ))}
              {storeLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="hover:text-[#111] transition-colors" style={linkStyle}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 style={colTitle}>{t("contact_us")}</h4>
            <div className="space-y-4">
              <div>
                <div style={{ color: "#8A8A84", fontSize: "12px", marginBottom: "4px" }}>{t("phone_label")}</div>
                <a
                  href={`https://wa.me/${AGENCY_INFO.phone.replace("+", "")}`}
                  style={{ color: "#111111", fontSize: "16px", fontFamily: "Space Mono, monospace", fontWeight: 700, textDecoration: "none" }}
                  className="hover:text-[#8A6D00] transition-colors"
                  dir="ltr"
                >
                  {AGENCY_INFO.phone}
                </a>
              </div>
              <div>
                <div style={{ color: "#8A8A84", fontSize: "12px", marginBottom: "4px" }}>{t("email_label")}</div>
                <a
                  href={`mailto:${AGENCY_INFO.email}`}
                  style={{ color: "#111111", fontSize: "14px", textDecoration: "none" }}
                  className="hover:text-[#8A6D00] transition-colors"
                >
                  {AGENCY_INFO.email}
                </a>
              </div>
              <div>
                <div style={{ color: "#8A8A84", fontSize: "12px", marginBottom: "4px" }}>{t("location_label")}</div>
                <div style={{ color: "#111111", fontSize: "14px" }}>{t("address")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #EAEAE6", background: "#FAFAF8" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div style={{ color: "#6B6B6B", fontSize: "13px" }}>
            © {currentYear} {AGENCY_INFO.name}. {t("rights")}.
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 hover:text-[#111] transition-colors"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#6B6B6B", fontSize: "13px", fontWeight: 600 }}
            aria-label={isRTL ? "العودة إلى الأعلى" : "Back to top"}
          >
            {isRTL ? "العودة للأعلى" : locale === "fr" ? "Haut de page" : "Back to top"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
