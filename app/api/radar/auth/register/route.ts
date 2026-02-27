import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { radarUsersDB } from "@/lib/radar-db";
import { createRadarToken, RADAR_COOKIE_NAME } from "@/lib/radar-auth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, storeName } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "الاسم والبريد وكلمة المرور مطلوبة" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }, { status: 400 });
    }

    const existing = await radarUsersDB.getByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "هذا البريد الإلكتروني مسجل بالفعل" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
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
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return res;
  } catch (e) {
    console.error("Radar register error:", e);
    return NextResponse.json({ error: "حدث خطأ، حاول مرة أخرى" }, { status: 500 });
  }
}
