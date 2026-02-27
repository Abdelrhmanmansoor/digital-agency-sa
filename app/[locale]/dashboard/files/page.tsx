import { redirect } from "next/navigation";
import { getClientSession } from "@/lib/client-auth";
import { clientOrdersDB } from "@/lib/client-db";
import FilesClient from "./FilesClient";

export default async function FilesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const user = await getClientSession();
  const { locale } = await params;
  if (!user) redirect(`/${locale}/dashboard/login`);

  const orders = await clientOrdersDB.getByUser(user.id);
  const files = orders.flatMap((o) =>
    (o.deliveredFiles || []).map((f) => ({
      ...f,
      orderId: o.id,
      orderTitle: o.title,
      orderServiceAr: o.serviceNameAr,
      orderServiceEn: o.serviceNameEn,
    }))
  );

  return <FilesClient files={files} locale={locale} />;
}
