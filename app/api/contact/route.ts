import { NextRequest, NextResponse } from "next/server";
import { messagesDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limit: 5 submissions per IP per 10 minutes
  const ip = getClientIp(req);
  const rl = await rateLimit(`contact:${ip}`, 5, 600);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    // Length limits to prevent large payload injection
    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const savedMessage = await messagesDB.create({ name, email, phone, subject, message });

    return NextResponse.json({
      success: true,
      message: "Message received! We will contact you soon.",
      id: savedMessage.id,
    });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

// Protected: admin only
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  let messages = await messagesDB.getAll();
  if (status) {
    messages = messages.filter((m) => m.status === status);
  }
  return NextResponse.json(messages);
}
