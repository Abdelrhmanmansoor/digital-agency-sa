import { NextResponse } from "next/server";
import { getClientSession } from "@/lib/client-auth";

export async function GET() {
  const user = await getClientSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const { passwordHash: _pw, ...safe } = user;
  void _pw;
  return NextResponse.json({ user: safe });
}
