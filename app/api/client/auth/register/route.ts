import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { clientUsersDB } from "@/lib/client-db";
import { createClientToken, CLIENT_COOKIE_NAME } from "@/lib/client-auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  // Rate limit: 5 registrations per IP per hour
  const ip = getClientIp(req);
  const rl = await rateLimit(`register:${ip}`, 5, 3600);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "محاولات كثيرة. حاول بعد قليل." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const body = await req.json();
  const { name, email, password, phone, company } = body;

  // Required fields
  if (!name || !email || !password)
    return NextResponse.json({ error: "الاسم والبريد الإلكتروني وكلمة المرور مطلوبة" }, { status: 400 });

  // Length validation
  if (name.length > 100)
    return NextResponse.json({ error: "الاسم طويل جداً" }, { status: 400 });
  if (email.length > 200)
    return NextResponse.json({ error: "البريد الإلكتروني طويل جداً" }, { status: 400 });
  if (phone && phone.length > 20)
    return NextResponse.json({ error: "رقم الجوال غير صحيح" }, { status: 400 });
  if (company && company.length > 150)
    return NextResponse.json({ error: "اسم الشركة طويل جداً" }, { status: 400 });

  // Email format
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ error: "صيغة البريد الإلكتروني غير صحيحة" }, { status: 400 });

  // Password strength — min 8 chars (server-side enforcement)
  if (password.length < 8)
    return NextResponse.json({ error: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" }, { status: 400 });
  if (password.length > 128)
    return NextResponse.json({ error: "كلمة المرور طويلة جداً" }, { status: 400 });

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
    maxAge: 60 * 60 * 24 * 7, // 7 days (reduced from 30)
  });
  return res;
}
