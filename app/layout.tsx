import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  /* No template here. The locale layout declares `template: "%s"` so each
     page owns its full title, but the root template was still being applied
     to the locale home page — which authors its own "| AM Design" — and
     produced "… | AM Design | AM Design". */
  title: "AM Design | E-commerce Design & Growth",
  description: "E-commerce design, development and growth for Salla and Zid stores in Saudi Arabia.",
  applicationName: "AM Design",
  authors: [{ name: "AM Design", url: SITE_URL }],
  creator: "AM Design",
  publisher: "AM Design",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  colorScheme: "light",
};

/* The locale lives one segment below this layout, so `lang`/`dir` cannot be
   resolved here without `headers()` — which would opt all 155 prerendered
   pages into dynamic rendering. The static default is the site's x-default
   locale (Arabic); this script corrects the two attributes from the URL
   before first paint for the other locales. */
const SET_LANG = `(function(){try{var m=location.pathname.match(/^\\/(ar|en|fr)(\\/|$)/);if(!m)return;var l=m[1];var e=document.documentElement;e.lang=l;e.dir=l==="ar"?"rtl":"ltr";}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* The stylesheet pulls Zain and Space Mono from Google Fonts via
            @import; without these the browser cannot open the connection
            until the CSS has already parsed. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: SET_LANG }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
