import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

/* One family for the whole site, the way private banks set their pages:
   IBM Plex Sans Arabic carries Arabic and Latin with matched metrics, so a
   price, a heading and a paragraph all sit on the same rhythm. Self-hosted by
   next/font, so there is no Google Fonts request on the critical path. */
const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex",
});

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
  /* /logo.png is a 3200x1144 white-on-transparent wordmark. As a favicon it
     was both illegible (a 200:71 strip squeezed into a 16px box) and
     invisible (white artwork on the light tab strips every desktop browser
     uses), and as the Apple touch icon it made iOS composite 204 KB of
     transparency onto a black home-screen tile. These are square, on the
     brand yellow, at the sizes each surface actually asks for. */
  icons: {
    icon: [
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false },
  /* Search Console / Bing ownership. Set the token in the hosting env and the
     meta tag ships on every page; unset, nothing is emitted. */
  verification: {
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : {}),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } } : {}),
  },
};

/* Analytics are opt-in by environment variable: GA4 (NEXT_PUBLIC_GA_ID, e.g.
   G-XXXX) and the Meta pixel (NEXT_PUBLIC_META_PIXEL_ID). Both load after the
   page is interactive, so they never cost first paint. The offer popup and
   every WhatsApp click report into whichever is present. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const viewport: Viewport = {
  themeColor: "#0B0C0E",
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
    <html lang="ar" dir="rtl" className={plex.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SET_LANG }} />
      </head>
      <body>
        {children}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href*="wa.me"]');if(a)gtag('event','whatsapp_click',{link_url:a.href,page_path:location.pathname});},true);`}
            </Script>
          </>
        )}
        {PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href*="wa.me"]');if(a)fbq('track','Contact');},true);`}
          </Script>
        )}
      </body>
    </html>
  );
}
