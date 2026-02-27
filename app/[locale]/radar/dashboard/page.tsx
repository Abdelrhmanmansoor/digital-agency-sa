import { redirect } from "next/navigation";
import { getRadarSession } from "@/lib/radar-auth";
import RadarDashboard from "@/components/radar/RadarDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "داشبورد رادار",
  robots: { index: false },
};

export default async function RadarDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await getRadarSession();
  if (!user) redirect(`/${locale}/radar`);

  return (
    <RadarDashboard
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        storeName: user.storeName,
        analysisCount: user.analysisCount,
      }}
      locale={locale}
    />
  );
}
