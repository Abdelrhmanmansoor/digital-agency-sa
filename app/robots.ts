import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* Everything below is either private, transactional or a
           per-client document. None of it belongs in an index, and the
           previous blanket allow left all of it crawlable. */
        disallow: [
          "/admin",
          "/api/",
          "/*/dashboard",
          "/*/proposal",
          "/*/store/cart",
          "/*/store/checkout",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
