import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "cdn.salla.sa", "via.placeholder.com"],
    formats: ["image/webp", "image/avif"],
  },
  experimental: {
    optimizePackageImports: ["gsap", "framer-motion"],
  },
};

export default withNextIntl(nextConfig);
