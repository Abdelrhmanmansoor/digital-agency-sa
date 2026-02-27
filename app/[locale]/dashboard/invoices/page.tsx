import { redirect } from "next/navigation";
import { getClientSession } from "@/lib/client-auth";
import { invoicesDB } from "@/lib/db";
import InvoicesClient from "./InvoicesClient";

export default async function InvoicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await getClientSession();
  if (!user) redirect(`/${locale}/dashboard/login`);

  const all = await invoicesDB.getAll();
  const invoices = all
    .filter((inv) => inv.clientEmail.toLowerCase() === user.email.toLowerCase())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return <InvoicesClient invoices={invoices} locale={locale} />;
}
