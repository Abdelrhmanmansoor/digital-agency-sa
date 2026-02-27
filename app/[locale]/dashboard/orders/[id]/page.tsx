import { redirect, notFound } from "next/navigation";
import { getClientSession } from "@/lib/client-auth";
import { clientOrdersDB } from "@/lib/client-db";
import OrderDetailClient from "./OrderDetailClient";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const user = await getClientSession();
  const { locale, id } = await params;
  if (!user) redirect(`/${locale}/dashboard/login`);

  const order = await clientOrdersDB.getById(id);
  if (!order || order.userId !== user.id) notFound();

  return <OrderDetailClient order={order} locale={locale} />;
}
