"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { AGENCY_INFO, getWhatsAppLink } from "@/lib/utils";
import { CHECKOUT_BRANDS } from "@/lib/brands";
import { BrandStrip } from "@/components/shared/BrandWall";
import { ACCOUNT_LINKS, COMPANY_LINKS, LEGAL_LINKS, SERVICE_LINKS, SOLUTION_LINKS, l, pick } from "@/lib/navigation";
import styles from "./SiteFooter.module.css";

const copy = {
  ar: {
    kicker: "الخطوة التالية",
    title: "أخبرنا عن مشروعك، ونعود إليك بخطوة أولى واضحة.",
    body: "أرسل نبذة قصيرة عن نشاطك وما تريد تحقيقه. نراجعها ونرد بخطة مبدئية ونطاق عمل وسعر تقديري — بدون التزام.",
    primary: "تحدث معنا على واتساب",
    secondary: "تصفّح الباقات والأسعار",
    note: "متوسط زمن الرد أقل من ساعة · نخدم جميع مناطق السعودية",
    hello: "مرحبًا، أريد مناقشة مشروع متجر إلكتروني.",
    company: "الوكالة",
    services: "الخدمات",
    solutions: "الحلول",
    account: "المتجر والحساب",
    contact: "تواصل",
    phone: "واتساب",
    email: "البريد",
    location: "الموقع",
    description: "وكالة رقمية متخصصة في تصميم وتطوير المتاجر الإلكترونية على سلة وزد، وتحسين التحويل والتسويق حولها. مقرّنا القاهرة، ونخدم السوق السعودي والخليجي.",
    rights: "جميع الحقوق محفوظة",
    trust: [
      "دفع آمن عبر بوابات معتمدة",
      "عقد وفاتورة رسمية لكل مشروع",
      "دعم فني بعد التسليم",
    ],
    pay: "طرق الدفع",
  },
  en: {
    kicker: "Next step",
    title: "Tell us about your project and get a clear first step.",
    body: "Send a short brief on your business and what you want to achieve. We reply with an initial plan, a scope and an indicative price. No commitment.",
    primary: "Talk to us on WhatsApp",
    secondary: "See packages and pricing",
    note: "Average reply under one hour · Serving all of Saudi Arabia",
    hello: "Hi, I would like to discuss an e-commerce project.",
    company: "Agency",
    services: "Services",
    solutions: "Solutions",
    account: "Store and account",
    contact: "Contact",
    phone: "WhatsApp",
    email: "Email",
    location: "Location",
    description: "A digital agency building Salla and Zid storefronts, then improving conversion and marketing around them. Based in Cairo, serving Saudi Arabia and the Gulf.",
    rights: "All rights reserved",
    trust: ["Secure payment via licensed gateways", "Contract and invoice on every project", "Support after handover"],
    pay: "Payment methods",
  },
  fr: {
    kicker: "Prochaine étape",
    title: "Parlez-nous de votre projet et recevez une première étape claire.",
    body: "Envoyez un bref résumé de votre activité et de votre objectif. Nous répondons avec un plan initial, un périmètre et un prix indicatif. Sans engagement.",
    primary: "Discuter sur WhatsApp",
    secondary: "Voir les offres et tarifs",
    note: "Réponse en moins d'une heure · Toute l'Arabie saoudite",
    hello: "Bonjour, je souhaite discuter d'un projet e-commerce.",
    company: "Agence",
    services: "Services",
    solutions: "Solutions",
    account: "Boutique et compte",
    contact: "Contact",
    phone: "WhatsApp",
    email: "E-mail",
    location: "Localisation",
    description: "Agence digitale spécialisée dans les boutiques Salla et Zid, la conversion et le marketing. Basée au Caire, au service de l'Arabie saoudite et du Golfe.",
    rights: "Tous droits réservés",
    trust: ["Paiement sécurisé via passerelles agréées", "Contrat et facture sur chaque projet", "Support après livraison"],
    pay: "Moyens de paiement",
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

/* The rails the checkout accepts come from the brand registry now, so this
   row can never drift from the ones the store page and the product pages
   advertise. */

export default function SiteFooter() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = copy[(locale in copy ? locale : "en") as keyof typeof copy];
  const href = (to: string) => l(locale, to);
  const localeHref = (code: string) => `/${code}${pathname.replace(/^\/(ar|en|fr)(?=\/|$)/, "")}`;

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
        <div className={styles.ctaInner}>
          <p className={styles.ctaKicker} data-reveal>
            {t.kicker}
          </p>
          <h2 className={styles.ctaTitle} data-reveal data-reveal-delay="60">
            {t.title}
          </h2>
          <p className={styles.ctaBody} data-reveal data-reveal-delay="120">
            {t.body}
          </p>
          <div className={styles.ctaActions} data-reveal data-reveal-delay="180">
            <a href={getWhatsAppLink(t.hello)} target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.89S18.6 0 12.05 0Zm0 21.79a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.27c0-5.45 4.44-9.88 9.89-9.88a9.89 9.89 0 0 1 0 19.78Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97s-.47-.15-.67.15-.77.96-.94 1.16-.35.22-.64.08c-.3-.15-1.26-.47-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06s-.02-.46.13-.6c.14-.14.3-.35.44-.53s.2-.3.3-.5-.05-.37-.03-.52-.67-1.61-.92-2.2c-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42s-.27-.2-.57-.34Z" />
              </svg>
              {t.primary}
            </a>
            <Link href={href("/store")} className={styles.ctaSecondary}>
              {t.secondary}
            </Link>
          </div>
          <p className={styles.ctaNote}>{t.note}</p>
        </div>
      </section>

      {/* ── Navigation columns ── */}
      <div className={styles.main}>
        <div className={styles.brand}>
          <Image src="/logo.png" alt="AM Design" width={240} height={94} className={styles.brandLogo} sizes="120px" style={{ width: 120, height: "auto" }} />
          <p className={styles.brandText}>{t.description}</p>
          <div className={styles.social}>
            {SOCIAL.filter((s) => s.href).map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className={styles.socialLink}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <Column title={t.company} links={COMPANY_LINKS} />
        <Column title={t.services} links={SERVICE_LINKS} />
        <Column title={t.solutions} links={SOLUTION_LINKS} />

        <div className={styles.col}>
          <h2 className={styles.colTitle}>{t.contact}</h2>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>{t.phone}</span>
            <a href={getWhatsAppLink(t.hello)} target="_blank" rel="noopener noreferrer" className={`${styles.contactValue} ${styles.mono}`} dir="ltr">
              {AGENCY_INFO.phone}
            </a>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>{t.email}</span>
            <a href={`mailto:${AGENCY_INFO.email}`} className={styles.contactValue}>
              {AGENCY_INFO.email}
            </a>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>{t.location}</span>
            <span className={styles.contactValue}>
              {locale === "en" ? AGENCY_INFO.addressEn : locale === "fr" ? AGENCY_INFO.addressFr : AGENCY_INFO.address}
            </span>
          </div>
          <ul style={{ listStyle: "none", margin: "4px 0 0", padding: 0 }}>
            {ACCOUNT_LINKS.map((leaf) => (
              <li key={leaf.href}>
                <Link href={href(leaf.href)} className={styles.colLink}>
                  {pick(leaf.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Trust row ── */}
      <div className={styles.trust}>
        <div className={styles.trustInner}>
          <div className={styles.trustPoints}>
            {t.trust.map((point) => (
              <span key={point} className={styles.trustPoint}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m4 12 5.5 5.5L20 7" />
                </svg>
                {point}
              </span>
            ))}
          </div>
          <div className={styles.pays}>
            <BrandStrip brands={CHECKOUT_BRANDS} label={t.pay} dark height={20} />
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span>
            © {new Date().getFullYear()} {AGENCY_INFO.name}. {t.rights}.
          </span>
          <div className={styles.bottomLinks}>
            {LEGAL_LINKS.map((leaf) => (
              <Link key={leaf.href} href={href(leaf.href)} className={styles.bottomLink}>
                {pick(leaf.label, locale)}
              </Link>
            ))}
            {LOCALES.map((loc) => (
              <Link
                key={loc.code}
                href={localeHref(loc.code)}
                lang={loc.code}
                hrefLang={loc.code}
                className={styles.bottomLink}
                aria-current={locale === loc.code ? "true" : undefined}
              >
                {loc.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
