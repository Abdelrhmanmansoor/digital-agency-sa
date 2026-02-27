import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { verifyRadarToken } from "./lib/radar-verify";

const intlMiddleware = createMiddleware(routing);

// Matches /ar/radar/dashboard, /en/radar/dashboard, /fr/radar/dashboard
const RADAR_DASHBOARD_RE = /^\/(?:ar|en|fr)\/radar\/dashboard/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Protect radar dashboard
  if (RADAR_DASHBOARD_RE.test(pathname)) {
    const token = request.cookies.get("radar-token")?.value;
    const locale = pathname.split("/")[1] || "ar";
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/radar`, request.url));
    }
    const payload = await verifyRadarToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL(`/${locale}/radar`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|admin|_next|.*\\..*).*)"],
};
