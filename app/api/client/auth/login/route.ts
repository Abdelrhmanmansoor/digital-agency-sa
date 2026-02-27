import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { clientUsersDB } from "@/lib/client-db";
import { createClientToken, CLIENT_COOKIE_NAME } from "@/lib/client-auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ error: "البريد الإلكتروني وكلمة المرور مطلوبان" }, { status: 400 });

  const user = await clientUsersDB.getByEmail(email);
  if (!user)
    return NextResponse.json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid)
    return NextResponse.json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 });

  const token = await createClientToken({ userId: user.id, email: user.email });

  const res = NextResponse.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email },
  });
  res.cookies.set(CLIENT_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
