import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { verifyRadarToken } from "./lib/radar-verify";
import { verifyClientToken } from "./lib/client-verify";

const intlMiddleware = createMiddleware(routing);

// Matches /ar/radar/dashboard, /en/radar/dashboard, /fr/radar/dashboard
const RADAR_DASHBOARD_RE = /^\/(?:ar|en|fr)\/radar\/dashboard/;

// Matches /ar/dashboard, /en/dashboard, /fr/dashboard (but NOT /dashboard/login)
const CLIENT_DASHBOARD_RE = /^\/(?:ar|en|fr)\/dashboard(?!\/login)/;

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

  // Protect client dashboard
  if (CLIENT_DASHBOARD_RE.test(pathname)) {
    const token = request.cookies.get("client-token")?.value;
    const locale = pathname.split("/")[1] || "ar";
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard/login`, request.url));
    }
    const payload = await verifyClientToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard/login`, request.url));
    }
  }

  // Pass the pathname to server components via header (used by dashboard layout)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  const response = await intlMiddleware(
    new NextRequest(request.url, { headers: requestHeaders, method: request.method })
  );
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|admin|_next|.*\\..*).*)"],
};
