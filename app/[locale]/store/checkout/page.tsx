import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import CheckoutClient from "./CheckoutClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "إتمام الطلب | AM Design" : "Checkout | AM Design";
  return {
    title,
    robots: { index: false, follow: false },
    alternates: { canonical: `/${locale}/store/checkout` },
  };
}

export default function CheckoutPage() {
  return (
    <>
      <SiteShell style={{ background: "#FAFAF8", minHeight: "60vh" }}>
        <CheckoutClient />
      </SiteShell>
    </>
  );
}
