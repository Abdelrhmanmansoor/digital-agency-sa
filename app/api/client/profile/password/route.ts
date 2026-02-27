import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getClientSession } from "@/lib/client-auth";
import { clientUsersDB } from "@/lib/client-db";
import { rateLimit } from "@/lib/rate-limit";

export async function PUT(req: NextRequest) {
  const user = await getClientSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  // Rate limit: 5 password change attempts per user per hour
  const rl = await rateLimit(`change-pass:${user.id}`, 5, 3600);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "محاولات كثيرة. حاول بعد ساعة." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword)
    return NextResponse.json({ error: "الحقول مطلوبة" }, { status: 400 });

  if (newPassword.length < 8)
    return NextResponse.json({ error: "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل" }, { status: 400 });

  if (newPassword.length > 128)
    return NextResponse.json({ error: "كلمة المرور طويلة جداً" }, { status: 400 });

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid)
    return NextResponse.json({ error: "كلمة المرور الحالية غير صحيحة" }, { status: 401 });

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await clientUsersDB.update(user.id, { passwordHash });
  return NextResponse.json({ success: true });
}
