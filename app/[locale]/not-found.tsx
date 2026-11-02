"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import SiteShell from "@/components/layout/SiteShell";
import { getWhatsAppLink } from "@/lib/utils";
import styles from "./not-found.module.css";

/* A lost visitor is still a lead: the page offers the four places most
   people were heading, and a direct line for the ones who were not. */
const copy = {
  ar: {
    kicker: "خطأ 404",
    title: "هذه الصفحة غير موجودة",
    body: "ربما تغيّر الرابط أو انتقلت الصفحة. هذه أقرب الوجهات لما كنت تبحث عنه:",
    home: "العودة للرئيسية",
    ask: "اسألنا على واتساب",
    hello: "مرحبًا، كنت أبحث عن صفحة في موقعكم ولم أجدها.",
    links: [
      ["المنتجات والأسعار", "/store"],
      ["أعمالنا", "/#work"],
      ["متاجر الإمارات", "/markets/uae"],
      ["المدونة", "/blog"],
    ],
  },
  en: {
    kicker: "Error 404",
    title: "This page doesn’t exist",
    body: "The link may have changed or the page moved. These are the closest places to what you were after:",
    home: "Back to home",
    ask: "Ask us on WhatsApp",
    hello: "Hello, I was looking for a page on your site and could not find it.",
    links: [
      ["Products and prices", "/store"],
      ["Our work", "/#work"],
      ["UAE stores", "/markets/uae"],
      ["Journal", "/blog"],
    ],
  },
  fr: {
    kicker: "Erreur 404",
    title: "Cette page n’existe pas",
    body: "Le lien a peut-être changé. Voici les destinations les plus proches :",
    home: "Retour à l’accueil",
    ask: "Nous écrire sur WhatsApp",
    hello: "Bonjour, je cherchais une page sur votre site sans la trouver.",
    links: [
      ["Produits et tarifs", "/store"],
      ["Réalisations", "/#work"],
      ["Boutiques EAU", "/markets/uae"],
      ["Journal", "/blog"],
    ],
  },
} as const;

export default function NotFound() {
  const locale = useLocale();
  const t = copy[locale as keyof typeof copy] ?? copy.en;

  return (
    <SiteShell>
      <section className={styles.page}>
        <p className={styles.kicker}>{t.kicker}</p>
        <h1>{t.title}</h1>
        <p className={styles.body}>{t.body}</p>
        <div className={styles.links}>
          {t.links.map(([label, href]) => (
            <Link key={href} href={`/${locale}${href}`}>
              {label}
            </Link>
          ))}
        </div>
        <div className={styles.actions}>
          <Link href={`/${locale}`} className="btn-primary">
            {t.home}
          </Link>
          <a href={getWhatsAppLink(t.hello)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            {t.ask}
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
