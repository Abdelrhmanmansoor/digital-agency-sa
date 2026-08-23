import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en", "fr"],
  defaultLocale: "ar",
  /* Only routes that exist. `/portfolio`, `/contact`, `/about` and
     `/pricing` were declared here but no such pages were ever built, so any
     typed navigation to them produced a 404. */
  pathnames: {
    "/": "/",
    "/blog": "/blog",
    "/store": "/store",
    "/sidra-theme": "/sidra-theme",
    "/radar": "/radar",
    "/policy": "/policy",
  },
});
