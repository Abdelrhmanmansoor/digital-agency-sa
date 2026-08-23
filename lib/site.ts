/* One definition of the site's own origin.
   Eight files each carried their own `process.env.NEXT_PUBLIC_SITE_URL ||
   "https://tf1one.com"`. NEXT_PUBLIC_SITE_URL is not set in .env.local, and
   tf1one.com is a *client's* domain (it is linked from the portfolio) — so
   every canonical, hreflang, OG url, sitemap entry and JSON-LD @id was
   pointing search engines at someone else's site, which is the strongest
   possible signal to drop this one from the index.

   Set NEXT_PUBLIC_SITE_URL to the production domain in the hosting
   environment. The fallback below is this project's own deployment, never a
   client's. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://digital-agency-sa.vercel.app"
).replace(/\/$/, "");

export const LOCALES = ["ar", "en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

/** hreflang map for a locale-relative path, e.g. "/blog" or "" for the home page. */
export function hreflangMap(path: string) {
  return {
    ...Object.fromEntries(LOCALES.map((l) => [l === "ar" ? "ar-SA" : l, `${SITE_URL}/${l}${path}`])),
    "x-default": `${SITE_URL}/ar${path}`,
  };
}
