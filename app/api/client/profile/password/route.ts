import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getClientSession } from "@/lib/client-auth";
import { clientUsersDB } from "@/lib/client-db";

export async function PUT(req: NextRequest) {
  const user = await getClientSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword)
    return NextResponse.json({ error: "الحقول مطلوبة" }, { status: 400 });

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid)
    return NextResponse.json({ error: "كلمة المرور الحالية غير صحيحة" }, { status: 401 });

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await clientUsersDB.update(user.id, { passwordHash });
  return NextResponse.json({ success: true });
}
