import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/store-data";
import { ARTICLES } from "@/lib/articles";
import { SITE_URL, LOCALES } from "@/lib/site";


/* One entry per indexable route. `/tools` is intentionally absent: it only
   redirects. `/sidra-theme`, `/policy` and the blog articles used to be
   missing entirely. */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/store", priority: 0.9, changeFrequency: "weekly" },
  { path: "/solutions/legal", priority: 0.9, changeFrequency: "monthly" },
  { path: "/sidra-theme", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/policy", priority: 0.3, changeFrequency: "yearly" },
];

function alternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      "x-default": `${SITE_URL}/ar${path}`,
    },
  };
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
