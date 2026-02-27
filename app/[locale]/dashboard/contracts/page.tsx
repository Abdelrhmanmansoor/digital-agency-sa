import { redirect } from "next/navigation";
import { getClientSession } from "@/lib/client-auth";
import { contractsDB } from "@/lib/db";
import ContractsClient from "./ContractsClient";

export default async function ContractsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const user = await getClientSession();
  if (!user) redirect(`/${locale}/dashboard/login`);

  const all = await contractsDB.getAll();
  const contracts = all
    .filter((c) => c.clientEmail.toLowerCase() === user.email.toLowerCase())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return <ContractsClient contracts={contracts} locale={locale} />;
}
