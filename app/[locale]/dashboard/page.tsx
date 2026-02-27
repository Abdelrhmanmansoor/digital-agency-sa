import { redirect } from "next/navigation";
import { getClientSession } from "@/lib/client-auth";
import { clientOrdersDB } from "@/lib/client-db";
import DashboardOverviewClient from "./DashboardOverviewClient";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const user = await getClientSession();
  const { locale } = await params;
  if (!user) redirect(`/${locale}/dashboard/login`);

  const orders = await clientOrdersDB.getByUser(user.id);
  const stats = {
    total: orders.length,
    inProgress: orders.filter((o) => o.status === "in_progress" || o.status === "review").length,
    delivered: orders.filter((o) => o.status === "delivered" || o.status === "completed").length,
    files: orders.reduce((acc, o) => acc + (o.deliveredFiles?.length || 0), 0),
  };
  const recent = orders.slice(0, 5);

  return (
    <DashboardOverviewClient
      userName={user.name}
      stats={stats}
      recentOrders={recent}
      locale={locale}
    />
  );
}
