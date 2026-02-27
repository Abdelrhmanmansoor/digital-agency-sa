import { redirect } from "next/navigation";
import { getClientSession } from "@/lib/client-auth";
import { clientOrdersDB } from "@/lib/client-db";
import OrdersListClient from "./OrdersListClient";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const user = await getClientSession();
  const { locale } = await params;
  if (!user) redirect(`/${locale}/dashboard/login`);

  const orders = await clientOrdersDB.getByUser(user.id);

  return <OrdersListClient orders={orders} locale={locale} />;
}
