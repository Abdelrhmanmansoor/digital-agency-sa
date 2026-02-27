import { NextRequest, NextResponse } from "next/server";
import { getClientSession } from "@/lib/client-auth";
import { clientOrdersDB } from "@/lib/client-db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getClientSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { id } = await params;
  const order = await clientOrdersDB.getById(id);
  if (!order || order.userId !== user.id)
    return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 });

  return NextResponse.json({ order });
}
