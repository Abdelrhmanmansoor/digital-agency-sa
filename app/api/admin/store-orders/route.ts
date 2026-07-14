import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { storeOrdersDB, type StoreOrder } from "@/lib/db";

export const dynamic = "force-dynamic";

/** GET /api/admin/store-orders — list store orders (admin only) */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await storeOrdersDB.getAll();
  const sorted = orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json({ orders: sorted });
}

/** PATCH /api/admin/store-orders — update an order's status (admin only) */
export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { id?: string; status?: StoreOrder["status"] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const validStatuses: StoreOrder["status"][] = ["pending", "confirmed", "in_progress", "delivered", "cancelled"];
  if (!body.id || !body.status || !validStatuses.includes(body.status)) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const updated = await storeOrdersDB.updateStatus(body.id, body.status);
  if (!updated) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true, order: updated });
}
