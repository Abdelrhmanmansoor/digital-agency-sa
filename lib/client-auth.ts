import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { clientUsersDB, type ClientUser } from "./client-db";

const CLIENT_SECRET = new TextEncoder().encode(
  process.env.CLIENT_JWT_SECRET ||
  process.env.JWT_SECRET ||
  "client-secret-key-change-in-production-min-32-chars-here"
);

export const CLIENT_COOKIE_NAME = "client-token";

export async function createClientToken(payload: { userId: string; email: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(CLIENT_SECRET);
}

export async function verifyClientToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, CLIENT_SECRET);
    return payload as { userId: string; email: string };
  } catch {
    return null;
  }
}

export async function getClientSession(): Promise<ClientUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CLIENT_COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = await verifyClientToken(token);
  if (!payload) return null;
  return await clientUsersDB.getById(payload.userId);
}
