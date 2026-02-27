"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { AGENCY_INFO } from "@/lib/utils";
import PaymentLogos from "@/components/shared/PaymentLogos";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services.list");
  const locale = useLocale();

  const currentYear = new Date().getFullYear();

  const quickLinks = ["home", "portfolio", "blog", "about", "contact"] as const;
  const serviceLinks = [
    { key: "salla_design", label: tServices("salla_design.name") },
    { key: "digital_marketing", label: tServices("digital_marketing.name") },
    { key: "branding", label: tServices("branding.name") },
    { key: "web_dev", label: tServices("web_dev.name") },
    { key: "salla_tools", label: tServices("salla_tools.name") },
  ];

  return (
    <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(200,169,98,0.1)" }}>
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "28px",
                fontWeight: 800,
                color: "#C8A962",
                marginBottom: "16px",
              }}
            >
              وكالة رقمية
            </div>
            <p
              style={{
                color: "#8C8C7A",
                fontSize: "14px",
                lineHeight: 1.8,
                marginBottom: "24px",
              }}
            >
              {t("description")}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                {
                  name: "Instagram",
                  href: AGENCY_INFO.social.instagram,
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                },
                {
                  name: "Twitter",
                  href: AGENCY_INFO.social.twitter,
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                },
                {
                  name: "TikTok",
                  href: AGENCY_INFO.social.tiktok,
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
                  className="flex items-center justify-center transition-all duration-300"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px solid rgba(200,169,98,0.2)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#C8A962";
                    e.currentTarget.style.color = "#C8A962";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(200,169,98,0.2)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C8A962",
                marginBottom: "20px",
              }}
            >
              {t("quick_links")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((key) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${key === "home" ? "" : `#${key}`}`}
                    className="transition-colors duration-200"
                    style={{ color: "#8C8C7A", fontSize: "14px" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FAFAF7")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#8C8C7A")}
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C8A962",
                marginBottom: "20px",
              }}
            >
              {t("our_services")}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.key}>
                  <Link
                    href={`/${locale}#services`}
                    className="transition-colors duration-200"
                    style={{ color: "#8C8C7A", fontSize: "14px" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FAFAF7")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#8C8C7A")}
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C8A962",
                marginBottom: "20px",
              }}
            >
              {t("contact_us")}
            </h4>
            <div className="space-y-4">
              <div>
                <div style={{ color: "#8C8C7A", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                  {t("phone_label")}
                </div>
                <a
                  href={`https://wa.me/${AGENCY_INFO.phone.replace("+", "")}`}
                  style={{ color: "#FAFAF7", fontSize: "16px", fontFamily: "Space Mono, monospace", fontWeight: 600 }}
                  className="hover:text-[#C8A962] transition-colors"
                >
                  {AGENCY_INFO.phone}
                </a>
              </div>
              <div>
                <div style={{ color: "#8C8C7A", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                  {t("email_label")}
                </div>
                <a
                  href={`mailto:${AGENCY_INFO.email}`}
                  style={{ color: "#FAFAF7", fontSize: "14px" }}
                  className="hover:text-[#C8A962] transition-colors"
                >
                  {AGENCY_INFO.email}
                </a>
              </div>
              <div>
                <div style={{ color: "#8C8C7A", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                  {t("location_label")}
                </div>
                <div style={{ color: "#FAFAF7", fontSize: "14px" }}>
                  {t("address")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Strip */}
      <div className="max-w-[1400px] mx-auto px-8 pb-10">
        <PaymentLogos variant="footer" showTitle={true} />
      </div>

      {/* Gold Geometric Divider */}
      <div className="max-w-[1400px] mx-auto px-8">
        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(200,169,98,0.3), rgba(200,169,98,0.6), rgba(200,169,98,0.3), transparent)",
          }}
        />
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div style={{ color: "#8C8C7A", fontSize: "13px" }}>
          © {currentYear} وكالة رقمية. {t("rights")}.
        </div>
        <div
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: "rgba(200,169,98,0.4)",
            textTransform: "uppercase",
          }}
        >
          Crafted with precision
        </div>
      </div>
    </footer>
  );
}
