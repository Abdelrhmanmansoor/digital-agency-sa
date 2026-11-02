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

  return (
    <footer className={styles.root}>
      {/* ── Final conversion band ── */}
      <section className={styles.cta} data-own-spacing>
        <div className={styles.ctaCard}>
          <div className={styles.ctaCopy}>
            <p className={styles.ctaKicker}>{t.kicker}</p>
            <h2 className={styles.ctaTitle}>{t.title}</h2>
          </div>
          <div className={styles.ctaActions}>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d={WA_PATH} />
              </svg>
              {t.primary}
            </a>
            <Link href={href("/store")} className={styles.ctaGhost}>
              {t.secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Columns ── */}
      <div className={styles.main}>
        <div className={styles.brand}>
          <Image src="/logo.png" alt="AM Design" width={240} height={86} sizes="128px" style={{ width: 128, height: "auto" }} />
          <p className={styles.brandText}>{t.description}</p>
          <ul className={styles.trust}>
            {t.trust.map((point) => (
              <li key={point}>
                <span aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <Column title={t.services} links={SERVICE_LINKS} />
        <Column title={t.company} links={COMPANY_LINKS} />
        <Column title={t.solutions} links={[...SOLUTION_LINKS, ...ACCOUNT_LINKS]} />
        <Column title={t.markets} links={MARKET_LINKS} />

        <div className={styles.col}>
          <h2 className={styles.colTitle}>{t.contact}</h2>
          <dl className={styles.contact}>
            <div>
              <dt>{t.phone}</dt>
              <dd>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" dir="ltr">
                  {AGENCY_INFO.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt>{t.email}</dt>
              <dd>
                <a href={`mailto:${AGENCY_INFO.email}`}>{AGENCY_INFO.email}</a>
              </dd>
            </div>
            <div>
              <dt>{t.location}</dt>
              <dd>{locale === "en" ? AGENCY_INFO.addressEn : locale === "fr" ? AGENCY_INFO.addressFr : AGENCY_INFO.address}</dd>
            </div>
          </dl>
          <div className={styles.social}>
            {SOCIAL.filter((s) => s.href).map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Signature: the wordmark, set large and faded into the floor ── */}
      <div className={styles.signature} aria-hidden>
        <Image src="/logo.png" alt="" width={1600} height={572} sizes="(max-width: 1240px) 90vw, 1100px" />
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
          {LOCALES.map((loc) => (
            <Link key={loc.code} href={localeHref(loc.code)} lang={loc.code} hrefLang={loc.code} aria-current={locale === loc.code ? "true" : undefined}>
              {loc.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
