"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { AGENCY_INFO, getWhatsAppLink } from "@/lib/utils";
import { ACCOUNT_LINKS, COMPANY_LINKS, LEGAL_LINKS, MARKET_LINKS, SERVICE_LINKS, SOLUTION_LINKS, l, pick } from "@/lib/navigation";
import { WA_PATH } from "./WhatsAppFab";
import styles from "./SiteFooter.module.css";

const copy = {
  ar: {
    kicker: "الخطوة التالية",
    title: "أخبرنا عن مشروعك، ونعود إليك بخطة وسعر خلال ساعة.",
    primary: "تحدث معنا على واتساب",
    secondary: "تصفّح المنتجات",
    hello: "مرحبًا، أريد مناقشة مشروعي.",
    company: "الوكالة",
    services: "الخدمات",
    solutions: "حلول ومنتجات",
    markets: "أسواق الخليج",
    contact: "تواصل",
    phone: "واتساب",
    email: "البريد",
    location: "المقر",
    description: "وكالة رقمية تبني متاجر سلة وزد وهويات العلامات، ثم تطوّر التحويل والتسويق حولها. نخدم السوق السعودي والخليجي.",
    rights: "جميع الحقوق محفوظة",
    trust: ["عقد وفاتورة رسمية لكل مشروع", "دفع على مراحل", "دعم بعد التسليم"],
  },
  en: {
    kicker: "Next step",
    title: "Tell us about your project. A plan and a price within the hour.",
    primary: "Talk to us on WhatsApp",
    secondary: "Browse products",
    hello: "Hi, I would like to discuss my project.",
    company: "Agency",
    services: "Services",
    solutions: "Solutions & products",
    markets: "Gulf markets",
    contact: "Contact",
    phone: "WhatsApp",
    email: "Email",
    location: "Based in",
    description: "A digital agency building Salla and Zid stores and brand identities, then growing conversion and marketing around them. Serving Saudi Arabia and the Gulf.",
    rights: "All rights reserved",
    trust: ["Contract and invoice on every project", "Phased payments", "Support after handover"],
  },
  fr: {
    kicker: "Prochaine étape",
    title: "Parlez-nous de votre projet. Un plan et un prix en une heure.",
    primary: "Discuter sur WhatsApp",
    secondary: "Voir les produits",
    hello: "Bonjour, je souhaite discuter de mon projet.",
    company: "Agence",
    services: "Services",
    solutions: "Solutions & produits",
    markets: "Marchés du Golfe",
    contact: "Contact",
    phone: "WhatsApp",
    email: "E-mail",
    location: "Basés à",
    description: "Agence digitale qui construit des boutiques Salla et Zid et des identités de marque, puis développe la conversion et le marketing. Arabie saoudite et Golfe.",
    rights: "Tous droits réservés",
    trust: ["Contrat et facture pour chaque projet", "Paiement par étapes", "Support après livraison"],
  },
} as const;

const LOCALES = [
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
] as const;

const SOCIAL = [
  {
    name: "Instagram",
    href: AGENCY_INFO.social.instagram,
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07m0-2.16C8.74 0 8.33.01 7.05.07 2.7.27.28 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.28 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z",
  },
  { name: "X", href: AGENCY_INFO.social.twitter, path: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24H16.17l-4.71-6.23-5.4 6.23H2.74l7.73-8.83L1.25 2.25h6.83l4.71 6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12Z" },
  { name: "TikTok", href: AGENCY_INFO.social.tiktok, path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.88-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 1 0 6.33 6.34V8.69a8.19 8.19 0 0 0 4.83 1.56V6.8a4.84 4.84 0 0 1-1.06-.11Z" },
];

/* Contract, phased payment, support — drawn as document, layers, headset. */
const TRUST_ICONS = [
  "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4",
  "M12 3 3 8l9 5 9-5zM3 13l9 5 9-5",
  "M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2zM20 14a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM17 16v1a3 3 0 0 1-3 3h-2",
];

export default function SiteFooter() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = copy[(locale in copy ? locale : "en") as keyof typeof copy];
  const href = (to: string) => l(locale, to);
  const localeHref = (code: string) => `/${code}${pathname.replace(/^\/(ar|en|fr)(?=\/|$)/, "")}`;
  const whatsapp = getWhatsAppLink(t.hello);

  const Column = ({ title, links }: { title: string; links: typeof COMPANY_LINKS }) => (
    <nav className={styles.col} aria-label={title}>
      <h2 className={styles.colTitle}>{title}</h2>
      <ul>
        {links.map((leaf) => (
          <li key={leaf.href}>
            <Link href={href(leaf.href)} className={styles.colLink}>
              {pick(leaf.label, locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  const location = locale === "en" ? AGENCY_INFO.addressEn : locale === "fr" ? AGENCY_INFO.addressFr : AGENCY_INFO.address;

  return (
    <footer className={styles.root}>
      {/* ── The sky returns: the page fades into the same clouds the banner
          opened with, and the last call to action sits in the open sky. ── */}
      <section className={styles.sky} data-own-spacing>
        <div className={styles.skyInner}>
          <p className={styles.kicker}>
            <span aria-hidden />
            {t.kicker}
          </p>
          <h2 className={styles.title}>{t.title}</h2>
          <div className={styles.actions}>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d={WA_PATH} />
              </svg>
              {t.primary}
            </a>
            <Link href={href("/store")} className={styles.ghost}>
              {t.secondary}
            </Link>
          </div>
          <ul className={styles.contact}>
            <li>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                <small>{t.phone}</small>
                <b dir="ltr">{AGENCY_INFO.phone}</b>
              </a>
            </li>
            <li>
              <a href={`mailto:${AGENCY_INFO.email}`}>
                <small>{t.email}</small>
                <b>{AGENCY_INFO.email}</b>
              </a>
            </li>
            <li>
              <span>
                <small>{t.location}</small>
                <b>{location}</b>
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── Directory: one white panel on the cream floor ── */}
      <div className={styles.floor}>
        <div className={styles.panel}>
          <div className={styles.brand}>
            <Image src="/logo-ink.png" alt="AM Design" width={240} height={86} sizes="140px" style={{ width: 140, height: "auto" }} />
            <p className={styles.brandText}>{t.description}</p>
            <div className={styles.social}>
              {SOCIAL.filter((x) => x.href).map((x) => (
                <a key={x.name} href={x.href} target="_blank" rel="noopener noreferrer" aria-label={x.name}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={x.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div className={styles.cols}>
            <Column title={t.services} links={SERVICE_LINKS} />
            <Column title={t.company} links={COMPANY_LINKS} />
            <Column title={t.solutions} links={[...SOLUTION_LINKS, ...ACCOUNT_LINKS]} />
            <Column title={t.markets} links={MARKET_LINKS} />
          </div>
        </div>

        <ul className={styles.trust}>
          {t.trust.map((point, i) => (
            <li key={point}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={TRUST_ICONS[i] ?? TRUST_ICONS[0]} />
              </svg>
              {point}
            </li>
          ))}
        </ul>

        {/* ── The wordmark, set at full width and cut by the floor ── */}
        <div className={styles.signature} aria-hidden>
          <Image src="/logo-ink.png" alt="" width={1600} height={572} sizes="(max-width: 1240px) 92vw, 1160px" />
        </div>

        <div className={styles.bottom}>
          <span>
            © {new Date().getFullYear()} {AGENCY_INFO.name}. {t.rights}.
          </span>
          <div className={styles.bottomLinks}>
            {LEGAL_LINKS.map((leaf) => (
              <Link key={leaf.href} href={href(leaf.href)}>
                {pick(leaf.label, locale)}
              </Link>
            ))}
            <div className={styles.langs}>
              {LOCALES.map((loc) => (
                <Link key={loc.code} href={localeHref(loc.code)} lang={loc.code} hrefLang={loc.code} aria-current={locale === loc.code ? "true" : undefined}>
                  {loc.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
