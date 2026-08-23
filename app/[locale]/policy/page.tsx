import { getLocale } from "next-intl/server";
import PolicyClient from "./PolicyClient";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_URL, hreflangMap } from "@/lib/site";

/* The page had a title but no description, so it inherited the generic
   agency blurb from the locale layout, and no canonical or hreflang. */
const seo = {
  ar: {
    title: "سياسة الخصوصية والدفع والاسترجاع",
    description: "سياسة الخصوصية، شروط الدفع، وسياسة الاسترجاع والاستبدال الخاصة بخدمات AM Design للمتاجر الإلكترونية في السعودية.",
  },
  en: {
    title: "Privacy, Payment & Return Policy",
    description: "Privacy policy, payment terms and the refund and return policy covering AM Design e-commerce services in Saudi Arabia.",
  },
  fr: {
    title: "Confidentialité, paiement et retours",
    description: "Politique de confidentialité, conditions de paiement et politique de remboursement des services e-commerce AM Design.",
  },
} as const;

export async function generateMetadata() {
  const locale = await getLocale();
  const lang = (locale in seo ? locale : "en") as keyof typeof seo;
  const data = seo[lang];
  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `${SITE_URL}/${lang}/policy`, languages: hreflangMap("/policy") },
    robots: { index: true, follow: true },
  };
}

export default async function PolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <PolicyClient locale={locale} />
      <Footer />
    </>
  );
}
