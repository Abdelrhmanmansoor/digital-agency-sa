import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { clientOrdersDB, type DeliveredFile } from "@/lib/client-db";

const VALID_STATUSES = new Set([
  "pending", "in_progress", "review", "delivered", "completed", "cancelled",
]);

const VALID_FILE_TYPES = new Set(["design", "document", "video", "archive", "other"]);

function isValidHttpUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  // Validate order ID format (prevent path traversal / injection)
  if (!id || !/^[a-zA-Z0-9_-]{1,64}$/.test(id)) {
    return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
  }

  const body = await req.json();
  const { status, adminNotes, newFile } = body;

  const order = await clientOrdersDB.getById(id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updates: Parameters<typeof clientOrdersDB.update>[1] = {};

  // Whitelist valid status values
  if (status !== undefined) {
    if (!VALID_STATUSES.has(status))
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    updates.status = status;
  }

  // Sanitize adminNotes
  if (adminNotes !== undefined) {
    if (typeof adminNotes !== "string" || adminNotes.length > 3000)
      return NextResponse.json({ error: "Admin notes too long" }, { status: 400 });
    updates.adminNotes = adminNotes;
  }

  // Validate delivered file
  if (newFile && newFile.name && newFile.url) {
    if (typeof newFile.name !== "string" || newFile.name.length > 200)
      return NextResponse.json({ error: "File name too long" }, { status: 400 });

    if (!isValidHttpUrl(newFile.url))
      return NextResponse.json({ error: "Invalid file URL" }, { status: 400 });

    if (newFile.url.length > 1000)
      return NextResponse.json({ error: "File URL too long" }, { status: 400 });

    const fileType = VALID_FILE_TYPES.has(newFile.type) ? newFile.type : "other";

    const file: DeliveredFile = {
      id: `f_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: newFile.name,
      url: newFile.url,
      type: fileType,
      description: typeof newFile.description === "string"
        ? newFile.description.slice(0, 500)
        : undefined,
      addedAt: new Date().toISOString(),
    };
    updates.deliveredFiles = [...(order.deliveredFiles || []), file];
  }

  const updated = await clientOrdersDB.update(id, updates);
  return NextResponse.json({ order: updated });
}
