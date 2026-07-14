import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tf1one.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "AM Design | E-commerce Design & Growth", template: "%s | AM Design" },
  description: "E-commerce design, development and growth for Salla and Zid stores in Saudi Arabia.",
  applicationName: "AM Design",
  authors: [{ name: "AM Design", url: SITE_URL }],
  creator: "AM Design",
  publisher: "AM Design",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html suppressHydrationWarning><body>{children}</body></html>;
}
