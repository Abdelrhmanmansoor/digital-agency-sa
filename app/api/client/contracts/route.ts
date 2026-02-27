import { NextResponse } from "next/server";
import { getClientSession } from "@/lib/client-auth";
import { contractsDB } from "@/lib/db";

export async function GET() {
  const user = await getClientSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const all = await contractsDB.getAll();
  const userContracts = all
    .filter((c) => c.clientEmail.toLowerCase() === user.email.toLowerCase())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json(userContracts);
}
