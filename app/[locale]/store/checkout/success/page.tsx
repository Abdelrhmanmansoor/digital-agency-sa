import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import SuccessClient from "./SuccessClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "تم استلام طلبك | AM Design" : "Order Received | AM Design";
  return { title, robots: { index: false, follow: false } };
}

export default function OrderSuccessPage() {
  return (
    <>
      <SiteShell style={{ background: "#FAFAF8", minHeight: "60vh" }}>
        <SuccessClient />
      </SiteShell>
    </>
  );
}
