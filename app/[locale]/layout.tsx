import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: {
    default: "وكالة رقمية | Salla Store Design & Digital Marketing",
    template: "%s | وكالة رقمية",
  },
  description: "وكالة رقمية سعودية متخصصة في تصميم متاجر سلة وزد، التسويق الرقمي، والهويات البصرية",
  keywords: ["تصميم متجر سلة", "وكالة تسويق رقمي", "salla store design", "digital marketing saudi"],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "وكالة رقمية",
  },
};

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
    <>
      {/* Set lang and dir on <html> element dynamically */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('lang','${locale}');document.documentElement.setAttribute('dir','${dir}');`,
        }}
      />
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </>
  );
}
