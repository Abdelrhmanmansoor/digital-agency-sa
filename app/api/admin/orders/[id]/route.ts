import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { clientOrdersDB, type DeliveredFile } from "@/lib/client-db";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { status, adminNotes, newFile } = body;

  const order = await clientOrdersDB.getById(id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updates: Parameters<typeof clientOrdersDB.update>[1] = {};
  if (status) updates.status = status;
  if (adminNotes !== undefined) updates.adminNotes = adminNotes;

  if (newFile && newFile.name && newFile.url) {
    const file: DeliveredFile = {
      id: `f_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: newFile.name,
      url: newFile.url,
      type: newFile.type || "other",
      description: newFile.description,
      addedAt: new Date().toISOString(),
    };
    updates.deliveredFiles = [...(order.deliveredFiles || []), file];
  }

  const updated = await clientOrdersDB.update(id, updates);
  return NextResponse.json({ order: updated });
}
