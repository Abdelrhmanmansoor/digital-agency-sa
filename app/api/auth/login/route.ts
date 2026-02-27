import { NextRequest, NextResponse } from "next/server";
import { createToken, validateAdmin } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limit: 5 admin login attempts per IP per 15 minutes
  const ip = getClientIp(req);
  const rl = await rateLimit(`admin-login:${ip}`, 5, 900);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many login attempts. Try again in 15 minutes." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Length guard before validation
    if (email.length > 200 || password.length > 128) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = validateAdmin(email, password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createToken({ email, role: "admin" });

    const response = NextResponse.json({ success: true, message: "Login successful" });
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // upgraded from lax — admin panel doesn't need cross-site
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin-token");
  return response;
}
