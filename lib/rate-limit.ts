/**
 * Redis-based rate limiter using sliding window (per IP).
 * Falls back to "allow" if Redis is unavailable (dev mode).
 */

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export async function rateLimit(
  identifier: string,
  limit: number,
  windowSeconds: number
): Promise<{ ok: boolean; remaining: number; retryAfter: number }> {
  if (!REDIS_URL || !REDIS_TOKEN) {
    // Dev mode — no Redis, allow all
    return { ok: true, remaining: limit, retryAfter: 0 };
  }

  const windowKey = `rate:${identifier}:${Math.floor(Date.now() / 1000 / windowSeconds)}`;

  try {
    const res = await fetch(`${REDIS_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", windowKey],
        ["EXPIRE", windowKey, windowSeconds],
      ]),
      cache: "no-store",
    });

    const data = await res.json();
    const count: number = data[0]?.result ?? 0;
    const remaining = Math.max(0, limit - count);
    const ok = count <= limit;
    const retryAfter = ok ? 0 : windowSeconds;

    return { ok, remaining, retryAfter };
  } catch {
    // Fail open — don't block users if Redis is down
    return { ok: true, remaining: limit, retryAfter: 0 };
  }
}

/** Extract best-available IP from request headers (Vercel / Cloudflare / etc.) */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
