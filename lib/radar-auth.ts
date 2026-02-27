import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { radarUsersDB, type RadarUser } from "./radar-db";

if (process.env.NODE_ENV === "production") {
  if (!process.env.RADAR_JWT_SECRET && !process.env.JWT_SECRET) {
    throw new Error("RADAR_JWT_SECRET (or JWT_SECRET) env var is required in production");
  }
}

const RADAR_SECRET = new TextEncoder().encode(
  process.env.RADAR_JWT_SECRET ||
  process.env.JWT_SECRET ||
  "dev-only-radar-secret-do-not-use-in-production-placeholder"
);

const COOKIE_NAME = "radar-token";

export async function createRadarToken(payload: { userId: string; email: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(RADAR_SECRET);
}

export async function verifyRadarToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, RADAR_SECRET);
    return payload as { userId: string; email: string };
  } catch {
    return null;
  }
}

export async function getRadarSession(): Promise<RadarUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = await verifyRadarToken(token);
  if (!payload) return null;
  return await radarUsersDB.getById(payload.userId);
}

export { COOKIE_NAME as RADAR_COOKIE_NAME };
