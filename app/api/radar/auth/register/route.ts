import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { radarUsersDB } from "@/lib/radar-db";
import { createRadarToken, RADAR_COOKIE_NAME } from "@/lib/radar-auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  // Rate limit: 5 registrations per IP per hour
  const ip = getClientIp(req);
  const rl = await rateLimit(`radar-register:${ip}`, 5, 3600);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "محاولات كثيرة. حاول بعد قليل." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  try {
    const { name, email, password, storeName } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "الاسم والبريد وكلمة المرور مطلوبة" }, { status: 400 });
    }

    if (name.length > 100 || email.length > 200) {
      return NextResponse.json({ error: "البيانات المدخلة طويلة جداً" }, { status: 400 });
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "صيغة البريد الإلكتروني غير صحيحة" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" }, { status: 400 });
    }

    if (password.length > 128) {
      return NextResponse.json({ error: "كلمة المرور طويلة جداً" }, { status: 400 });
    }

    const existing = await radarUsersDB.getByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "هذا البريد الإلكتروني مسجل بالفعل" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await radarUsersDB.create({ name, email: email.toLowerCase(), passwordHash, storeName });

    const token = await createRadarToken({ userId: user.id, email: user.email });

    const res = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, storeName: user.storeName },
    });

    res.cookies.set(RADAR_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "حدث خطأ، حاول مرة أخرى" }, { status: 500 });
  }
}
