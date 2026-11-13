/* Live portfolio screenshots.

   Every work card used to show a JPEG captured once and committed to
   /public — so when a client redesigned their store, the portfolio kept
   showing the old one. This route captures the client's live site instead,
   and the CDN keeps the result for a day: the card refreshes itself daily
   with no redeploy and no manual re-capture.

   Why not an iframe: Salla stores send `frame-ancestors` limited to Salla's
   own domains, so they refuse to render inside any other site.

   Capture services, tried in order (all free, none needs a key):
     1. WordPress mShots — no quota; answers 307 → /default while a capture
        is still being generated, which we treat as "not ready".
     2. thum.io          — free tier, capped per month.
     3. Microlink        — free tier, only a handful of captures a day.
   If all fail, the committed screenshot is served, then a neutral card.

   Only keys listed in PROJECTS are accepted, so this cannot be used as an
   open screenshot proxy for arbitrary URLs. */

import { PROJECTS } from "@/components/proposal/data";

export const runtime = "nodejs";

const DAY = 60 * 60 * 24;
const FRESH = `public, max-age=3600, s-maxage=${DAY}, stale-while-revalidate=${DAY * 7}`;
const SHORT = "public, max-age=120, s-maxage=600";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

const SOURCES = [
  (u: string) => `https://s0.wp.com/mshots/v1/${encodeURIComponent(u)}?w=1000&h=625&vpw=1440&vph=900`,
  (u: string) => `https://image.thum.io/get/viewportWidth/1440/width/1000/crop/900/noanimate/${u}`,
  (u: string) =>
    `https://api.microlink.io/?${new URLSearchParams({
      url: u,
      screenshot: "true",
      meta: "false",
      embed: "screenshot.url",
      "viewport.width": "1440",
      "viewport.height": "900",
      "viewport.deviceScaleFactor": "1",
      "screenshot.type": "jpeg",
      waitForTimeout: "2500",
    })}`,
];

async function capture(target: string): Promise<Response | null> {
  for (const source of SOURCES) {
    try {
      /* `manual` so mShots' "still generating" redirect is seen as a miss
         instead of being followed to its loading placeholder. Microlink's
         embed answer is itself a redirect to the image, so follow that one. */
      const isMicrolink = source === SOURCES[2];
      const res = await fetch(source(target), {
        cache: "no-store",
        redirect: isMicrolink ? "follow" : "manual",
        headers: { "User-Agent": UA },
        signal: AbortSignal.timeout(25_000),
      });
      const type = res.headers.get("content-type") ?? "";
      if (res.status === 200 && type.startsWith("image/") && res.body) {
        return new Response(res.body, { headers: { "Content-Type": type, "Cache-Control": FRESH } });
      }
    } catch {
      /* try the next service */
    }
  }
  return null;
}

function placeholder(domain: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900"><rect width="1440" height="900" fill="#F4F2EC"/><text x="720" y="462" text-anchor="middle" font-family="system-ui,sans-serif" font-size="44" fill="#6E6A61">${domain.replace(/[<&>"]/g, "")}</text></svg>`;
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml", "Cache-Control": SHORT } });
}

export async function GET(request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const project = PROJECTS.find((p) => p.key === key);
  if (!project) return new Response("Not found", { status: 404 });

  const live = await capture(project.url);
  if (live) return live;

  if (project.shot) {
    return new Response(null, {
      status: 307,
      headers: { Location: new URL(project.shot, request.url).toString(), "Cache-Control": SHORT },
    });
  }
  return placeholder(project.domain);
}
