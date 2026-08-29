import { NextRequest, NextResponse } from "next/server";
import { invoicesDB } from "@/lib/db";
import {
  evaluateShare,
  isValidPublicId,
  shareCookieName,
  shareCookieValue,
  verifySharePassword,
} from "@/lib/invoice-share";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/* فتح فاتورة محمية بكلمة مرور.
   الرد واحد في كل حالات الفشل — لا يُفرّق بين «رابط غير موجود» و«كلمة خاطئة»
   حتى لا يصلح المسار لاستكشاف الروابط الصالحة. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const fail = () => NextResponse.json({ error: "invalid" }, { status: 401 });

  if (!isValidPublicId(token)) return fail();

  /* عشر محاولات في الدقيقة لكل IP لكل فاتورة: يكفي للعميل الذي أخطأ الكتابة،
     ولا يكفي لتجربة كلمات المرور آليًا. */
  const limit = await rateLimit(`invoice-unlock:${token}:${getClientIp(req)}`, 10, 60);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "too_many" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return fail();
  }
  if (!password || password.length > 200) return fail();

  const invoice = await invoicesDB.getByPublicId(token);
  if (evaluateShare(invoice) !== "ok" || !invoice?.sharePasswordHash) return fail();
  if (!verifySharePassword(password, invoice.sharePasswordHash)) return fail();

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: shareCookieName(token),
    value: shareCookieValue(token, invoice.sharePasswordHash),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: `/invoice/${token}`,
    maxAge: 60 * 60 * 12, // 12 ساعة — كافية لجلسة مراجعة ودفع
  });
  return res;
}
