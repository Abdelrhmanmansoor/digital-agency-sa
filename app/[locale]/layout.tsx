import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CartProvider } from "@/components/store/CartContext";

/* `template: "%s"` is deliberate: it cancels the root layout's
   "%s | AM Design" so each page owns its full title. The fallback title and
   description below only apply to pages that set none of their own — they
   used to be Arabic-only and were served that way on /en and /fr too. */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const fallback = {
    ar: {
      title: "تصميم متاجر سلة وزد في السعودية | AM Design",
      description: "تصميم وتطوير متاجر سلة وزد، تحسين التحويل وSEO، الهوية البصرية والتسويق الرقمي.",
    },
    en: {
      title: "Salla & Zid Store Design in Saudi Arabia | AM Design",
      description: "Salla and Zid store design and development, conversion optimization, SEO, branding and digital marketing.",
    },
    fr: {
      title: "Design de boutiques Salla & Zid en Arabie saoudite | AM Design",
      description: "Design et développement de boutiques Salla et Zid, optimisation de conversion, SEO, identité et marketing digital.",
    },
  } as const;
  const data = fallback[(locale in fallback ? locale : "en") as keyof typeof fallback];

  return {
    title: { default: data.title, template: "%s" },
    description: data.description,
    openGraph: { type: "website", siteName: "AM Design" },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ar" | "en" | "fr")) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <CartProvider>
        {/* Wrapper div carries dir + lang — CSS [dir="rtl"] selectors work from here down */}
        <div
          dir={dir}
          lang={locale}
          id="locale-root"
          /* dvh so mobile browser chrome collapsing does not leave a gap */
          style={{ minHeight: "100dvh", overflowX: "hidden" }}
        >
          {children}
        </div>
      </CartProvider>
    </NextIntlClientProvider>
  );
}
