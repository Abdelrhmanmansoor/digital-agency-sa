import { NextRequest, NextResponse } from "next/server";
import { messagesDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
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
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  let messages = await messagesDB.getAll();
  if (status) {
    messages = messages.filter((m) => m.status === status);
  }
  return NextResponse.json(messages);
}
