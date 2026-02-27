// Edge-safe JWT verification — no next/headers, no Redis
// Used only in middleware.ts
import { jwtVerify } from "jose";

const CLIENT_SECRET = new TextEncoder().encode(
  process.env.CLIENT_JWT_SECRET ||
  process.env.JWT_SECRET ||
  "dev-only-client-secret-do-not-use-in-production-placeholder"
);

export async function verifyClientToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, CLIENT_SECRET);
    return payload as { userId: string; email: string };
  } catch {
    return null;
  }
}
