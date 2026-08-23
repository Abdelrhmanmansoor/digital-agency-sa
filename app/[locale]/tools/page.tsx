import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

/* /tools previously redirected to the Radar tool, which has been removed.
   The old URL still gets a 308 rather than a 404 so any existing link lands
   somewhere useful. */
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/store`);
}
