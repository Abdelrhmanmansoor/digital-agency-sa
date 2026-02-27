import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en", "fr"],
  defaultLocale: "ar",
  pathnames: {
    "/": "/",
    "/blog": { ar: "/blog", en: "/blog", fr: "/blog" },
    "/portfolio": { ar: "/portfolio", en: "/portfolio", fr: "/portfolio" },
    "/tools": { ar: "/tools", en: "/tools", fr: "/tools" },
    "/contact": { ar: "/contact", en: "/contact", fr: "/contact" },
    "/about": { ar: "/about", en: "/about", fr: "/about" },
    "/pricing": { ar: "/pricing", en: "/pricing", fr: "/pricing" },
  },
});
