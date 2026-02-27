import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";

// In production: crash loudly if secrets are missing
if (process.env.NODE_ENV === "production") {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET env var is required in production");
  if (!process.env.ADMIN_EMAIL) throw new Error("ADMIN_EMAIL env var is required in production");
  if (!process.env.ADMIN_PASSWORD) throw new Error("ADMIN_PASSWORD env var is required in production");
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-only-jwt-secret-do-not-use-in-production-placeholder"
);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

export async function createToken(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

/** Constant-time string comparison — prevents timing attacks on admin login */
function safeEqual(a: string, b: string): boolean {
  if (!a || !b) return false;
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
      // Run a dummy comparison to avoid timing leak from early return
      timingSafeEqual(bufA, bufA);
      return false;
    }
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export function validateAdmin(email: string, password: string) {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return false;
  return safeEqual(email, ADMIN_EMAIL) && safeEqual(password, ADMIN_PASSWORD);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  if (!token) return null;
  return await verifyToken(token);
}
