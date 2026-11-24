import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/store-data";
import { ARTICLES } from "@/lib/articles";
import { MARKETS } from "@/lib/markets";
import { CITY_LANDINGS, PRACTICE_LANDINGS } from "@/lib/legal-landing";
import { SITE_URL, LOCALES, hreflangMap } from "@/lib/site";


/* One entry per indexable route. `/tools` is intentionally absent: it only
   redirects. `/sidra-theme`, `/policy` and the blog articles used to be
   missing entirely. */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/store", priority: 0.9, changeFrequency: "weekly" },
  { path: "/solutions/legal", priority: 0.9, changeFrequency: "monthly" },
  { path: "/sidra-theme", priority: 0.9, changeFrequency: "monthly" },
  { path: "/salla-theme-coupons", priority: 0.9, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  ...PRACTICE_LANDINGS.map((p) => ({ path: `/solutions/legal/practice/${p.slug}`, priority: 0.85, changeFrequency: "monthly" as const })),
  ...CITY_LANDINGS.map((c) => ({ path: `/solutions/legal/city/${c.slug}`, priority: 0.85, changeFrequency: "monthly" as const })),
  ...MARKETS.map((m) => ({ path: `/markets/${m.slug}`, priority: 0.9, changeFrequency: "monthly" as const })),
  { path: "/policy", priority: 0.3, changeFrequency: "yearly" },
];

/* Same hreflang map the pages emit in <head>. The sitemap used to declare
   "ar" while every page declared "ar-SA", and Google treats a mismatch
   between the two sources as conflicting annotations. */
function alternates(path: string) {
  return { languages: hreflangMap(path) };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      entries.push({
        url: `${SITE_URL}/${locale}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: alternates(route.path),
      });
    }

    for (const product of PRODUCTS) {
      const path = `/store/${product.slug}`;
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: alternates(path),
      });
    }

    for (const article of ARTICLES) {
      const path = `/blog/${article.id}`;
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: new Date(article.date),
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: alternates(path),
      });
    }
  }

  return entries;
}
