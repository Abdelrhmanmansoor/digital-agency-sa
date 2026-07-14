import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/store-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tf1one.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["ar", "en", "fr"];
  const routes = ["/", "/blog", "/tools", "/store"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "/" ? "weekly" : "monthly",
        priority: route === "/" ? 1 : route === "/store" ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${route}`])
          ),
        },
      });
    }

    for (const product of PRODUCTS) {
      const route = `/store/${product.slug}`;
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
