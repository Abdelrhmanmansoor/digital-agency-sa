import { NextResponse } from "next/server";
import { getClientSession } from "@/lib/client-auth";
import { invoicesDB } from "@/lib/db";

export async function GET() {
  const user = await getClientSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const all = await invoicesDB.getAll();
  const userInvoices = all
    .filter((inv) => inv.clientEmail.toLowerCase() === user.email.toLowerCase())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json(userInvoices);
}
