import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { invoicesDB, type Invoice } from "@/lib/db";
import { generatePublicId, hashSharePassword } from "@/lib/invoice-share";

export const dynamic = "force-dynamic";

/* إعدادات الرابط الخاص. مسار منفصل عن PUT العام للفاتورة لسببين:
   كلمة المرور تُهشَّم على الخادم ولا تعبر أبدًا كنص في اتجاه العودة، و
   `publicId` لا يمكن أن يُملى من العميل — يُولّد هنا فقط. */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const invoice = await invoicesDB.getById(id);
  if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const updates: Partial<Invoice> = {};

  /* إنشاء الرابط أو تدويره. التدوير يُبطل الرابط القديم فورًا — الغرض منه
     أن يُستخدم عندما يصل الرابط إلى من لا يُقصد. */
  if (body.action === "generate" || body.action === "regenerate") {
    updates.publicId = generatePublicId();
    updates.shareCreatedAt = new Date().toISOString();
    updates.shareEnabled = true;
    updates.viewCount = 0;
  }

  if (typeof body.shareEnabled === "boolean") updates.shareEnabled = body.shareEnabled;

  /* تاريخ الانتهاء: سلسلة YYYY-MM-DD أو "" للإلغاء. */
  if (typeof body.shareExpiresAt === "string") {
    const value = body.shareExpiresAt.trim();
    if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }
    updates.shareExpiresAt = value || undefined;
  }

  /* كلمة المرور: نص للتعيين، أو null/"" للإزالة. لا تُخزَّن أبدًا كنص. */
  if ("password" in body) {
    const password = body.password;
    if (password === null || password === "") {
      updates.sharePasswordHash = undefined;
    } else if (typeof password === "string" && password.length >= 4 && password.length <= 200) {
      updates.sharePasswordHash = hashSharePassword(password);
    } else {
      return NextResponse.json({ error: "Password must be 4–200 characters" }, { status: 400 });
    }
  }

  const updated = await invoicesDB.update(id, updates);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  /* لا يعود الهاش إلى الواجهة — فقط ما إذا كانت هناك كلمة مرور. */
  return NextResponse.json({
    publicId: updated.publicId,
    shareEnabled: updated.shareEnabled ?? false,
    shareExpiresAt: updated.shareExpiresAt ?? "",
    hasPassword: Boolean(updated.sharePasswordHash),
    viewCount: updated.viewCount ?? 0,
    lastViewedAt: updated.lastViewedAt ?? null,
  });
}
