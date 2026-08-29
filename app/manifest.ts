import type { MetadataRoute } from "next";

/* Without a manifest, Android's "add to home screen" fell back to a
   screenshot of the page and a truncated <title>, and the address bar kept
   the browser's default chrome colour rather than the brand's. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AM Design — تصميم وتطوير المتاجر الإلكترونية",
    short_name: "AM Design",
    description:
      "تصميم وتطوير متاجر سلة وزد، تحسين التحويل وSEO، الهوية البصرية والتسويق الرقمي.",
    start_url: "/ar",
    scope: "/",
    display: "standalone",
    dir: "rtl",
    lang: "ar",
    background_color: "#FFFFFF",
    theme_color: "#111111",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
