import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { radarUsersDB } from "@/lib/radar-db";
import { createRadarToken, RADAR_COOKIE_NAME } from "@/lib/radar-auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limit: 10 attempts per IP per 15 minutes
  const ip = getClientIp(req);
  const rl = await rateLimit(`radar-login:${ip}`, 10, 900);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "محاولات كثيرة. حاول بعد 15 دقيقة." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "البريد وكلمة المرور مطلوبان" }, { status: 400 });
    }

    if (email.length > 200 || password.length > 128) {
      return NextResponse.json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 });
    }

    const user = await radarUsersDB.getByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 });
    }

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
