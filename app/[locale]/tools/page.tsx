import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

/* /tools was folded into /radar. A temporary redirect kept the old URL in the
   index and split whatever authority it had; 308 consolidates it. */
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/radar`);
}
