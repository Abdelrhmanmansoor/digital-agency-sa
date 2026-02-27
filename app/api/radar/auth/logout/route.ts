import { NextResponse } from "next/server";
import { RADAR_COOKIE_NAME } from "@/lib/radar-auth";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(RADAR_COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}
