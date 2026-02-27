// Edge-safe JWT verification — no next/headers, no Redis
// Used only in middleware.ts
import { jwtVerify } from "jose";

const RADAR_SECRET = new TextEncoder().encode(
  process.env.RADAR_JWT_SECRET ||
  process.env.JWT_SECRET ||
  "radar-secret-key-change-in-production-min-32-chars-here"
);

export async function verifyRadarToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, RADAR_SECRET);
    return payload as { userId: string; email: string };
  } catch {
    return null;
  }
}
