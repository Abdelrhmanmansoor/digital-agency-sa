import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { clientUsersDB } from "@/lib/client-db";
import { createClientToken, CLIENT_COOKIE_NAME } from "@/lib/client-auth";

export async function POST(req: NextRequest) {
  const { name, email, password, phone, company } = await req.json();

  if (!name || !email || !password)
    return NextResponse.json({ error: "الاسم والبريد الإلكتروني وكلمة المرور مطلوبة" }, { status: 400 });

  const existing = await clientUsersDB.getByEmail(email);
  if (existing)
    return NextResponse.json({ error: "البريد الإلكتروني مسجل مسبقاً" }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await clientUsersDB.create({ name, email, phone, company, passwordHash });
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
