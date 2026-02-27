import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { clientOrdersDB } from "@/lib/client-db";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await clientOrdersDB.getAll();
  const sorted = orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json({ orders: sorted });
}
