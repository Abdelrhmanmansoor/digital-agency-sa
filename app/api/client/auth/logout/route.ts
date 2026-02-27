import { NextResponse } from "next/server";
import { CLIENT_COOKIE_NAME } from "@/lib/client-auth";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(CLIENT_COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}
