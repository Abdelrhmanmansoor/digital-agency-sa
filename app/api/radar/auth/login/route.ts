import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { radarUsersDB } from "@/lib/radar-db";
import { createRadarToken, RADAR_COOKIE_NAME } from "@/lib/radar-auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "البريد وكلمة المرور مطلوبان" }, { status: 400 });
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
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return res;
  } catch (e) {
    console.error("Radar login error:", e);
    return NextResponse.json({ error: "حدث خطأ، حاول مرة أخرى" }, { status: 500 });
  }
}
