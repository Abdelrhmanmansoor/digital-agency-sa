import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/* These headers only ever shipped if this file is the config Next actually
   loads. A second `next.config.mjs` used to sit beside it and win the
   resolution order, so every header below was silently dropped in production. */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  /* A stray lockfile in the user's home directory made Next infer the wrong
     workspace root and trace the whole home folder. Pin it to this project. */
  outputFileTracingRoot: path.join(process.cwd()),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.salla.sa" },
      { protocol: "https", hostname: "media.zid.store" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
    ],
    formats: ["image/webp", "image/avif"],
  },
  /* The blog moved from numeric ids to slugs when it went from three
     articles to fifty. These three URLs existed publicly, so they get a
     permanent redirect to their closest replacement rather than a 404. */
  async redirects() {
    const map: Record<string, string> = {
      "1": "anatomy-of-product-page",
      "2": "snapchat-tiktok-ads-saudi",
      "3": "brand-identity-for-stores",
    };
    return Object.entries(map).map(([from, to]) => ({
      source: `/:locale(ar|en|fr)/blog/${from}`,
      destination: `/:locale/blog/${to}`,
      permanent: true,
    }));
  },

  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      /* Hashed font files never change under the same name — cache hard so a
         repeat visit never re-downloads five woff2 faces. */
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
