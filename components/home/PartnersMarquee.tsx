"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

/* ─── Image logos (confirmed transparent PNGs) ─── */
const IMAGE_LOGOS = [
  {
    name: "Oud 1 Scent",
    logo: "https://media.zid.store/1a188c46-3f5d-4c14-89f9-71af67904697/df77a3dc-51d1-4cf9-8c0b-b2c0d5a8af86-200x.png",
    url: "https://oud1scent.com/",
  },
  {
    name: "Black Boutique",
    logo: "https://cdn.salla.sa/form-builder/tx2M2iFSbdW5NJLCtBJ9grQafUG8PtW87q5wnlMi.png",
    url: "https://blackboutique.sa/",
  },
];

/* ─── SVG logo definitions ─── */
type SvgLogo = { id: string; svg: string; width: number; height: number };

// Platform: Salla (green)
const SallaLogo: SvgLogo = {
  id: "salla",
  width: 110, height: 36,
  svg: `<svg viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="18" cy="18" r="14" fill="#2AAD73" fill-opacity="0.15" stroke="#2AAD73" stroke-width="1.5"/>
  <path d="M13 14c0-2.2 1.8-4 4-4h2a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-6a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4" stroke="#2AAD73" stroke-width="1.8" stroke-linecap="round"/>
  <text x="40" y="24" font-family="system-ui,-apple-system,sans-serif" font-size="18" font-weight="700" fill="#2AAD73" letter-spacing="-0.5">salla</text>
</svg>`,
};

// Platform: Zid (purple)
const ZidLogo: SvgLogo = {
  id: "zid",
  width: 80, height: 36,
  svg: `<svg viewBox="0 0 80 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="6" width="24" height="24" rx="5" fill="#7B61FF" fill-opacity="0.15" stroke="#7B61FF" stroke-width="1.5"/>
  <text x="7" y="26" font-family="system-ui,sans-serif" font-size="18" font-weight="700" fill="#7B61FF">زد</text>
  <text x="34" y="24" font-family="system-ui,-apple-system,sans-serif" font-size="17" font-weight="700" fill="#7B61FF" letter-spacing="-0.3">Zid</text>
</svg>`,
};

// عطور — Perfume brands
const perfumeSvgs: SvgLogo[] = [
  { id: "arabian-oud", width: 150, height: 40,
    svg: `<svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 32 C8 22 12 10 20 10 C24 10 27 13 27 18 C27 24 22 30 15 32" stroke="#C8A962" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M20 10 L20 6 M17 7 L23 7" stroke="#C8A962" stroke-width="1.5" stroke-linecap="round"/>
  <text x="35" y="18" font-family="system-ui,sans-serif" font-size="10" font-weight="600" fill="rgba(255,255,255,0.5)" letter-spacing="1.5">ARABIAN</text>
  <text x="35" y="32" font-family="system-ui,sans-serif" font-size="14" font-weight="800" fill="#FAFAF7" letter-spacing="0.5">OUD</text>
</svg>` },
  { id: "ajmal", width: 100, height: 40,
    svg: `<svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 32 L14 8 L22 32 M9 24 L19 24" stroke="#C8A962" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="30" y="26" font-family="system-ui,sans-serif" font-size="19" font-weight="700" fill="#FAFAF7" letter-spacing="0.3">Ajmal</text>
</svg>` },
  { id: "rasasi", width: 110, height: 40,
    svg: `<svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="10" width="16" height="20" rx="3" stroke="#C8A962" stroke-width="1.5"/>
  <line x1="4" y1="16" x2="20" y2="16" stroke="#C8A962" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="28" y="26" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#FAFAF7" letter-spacing="0.2">Rasasi</text>
</svg>` },
  { id: "lattafa", width: 110, height: 40,
    svg: `<svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 14 Q12 8 18 14 Q24 20 18 26" stroke="#C8A962" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <text x="28" y="26" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#FAFAF7" letter-spacing="0.2">Lattafa</text>
</svg>` },
  { id: "al-haramain", width: 150, height: 40,
    svg: `<svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 28 L14 12 L18 28 M12 21 L16 21 M22 12 L22 28 M22 20 L26 20 M26 12 L26 28" stroke="#C8A962" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="36" y="26" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#FAFAF7" letter-spacing="0.3">AL HARAMAIN</text>
</svg>` },
  { id: "orientica", width: 120, height: 40,
    svg: `<svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="20" r="10" stroke="#C8A962" stroke-width="1.5"/>
  <circle cx="16" cy="20" r="5" stroke="#C8A962" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="34" y="26" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#FAFAF7" letter-spacing="0.5">ORIENTICA</text>
</svg>` },
];

// عود — Oud stores
const oudSvgs: SvgLogo[] = [
  { id: "bakhoor", width: 160, height: 40,
    svg: `<svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 30 C8 22 10 14 16 10 C18 9 20 10 20 12 C20 16 14 18 14 22 C14 26 18 30 22 30" stroke="#C8A962" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <path d="M16 6 C16 4 17 3 18 4 C19 3 20 4 20 6" stroke="#C8A962" stroke-width="1.2" stroke-linecap="round"/>
  <text x="32" y="18" font-family="system-ui,sans-serif" font-size="9" font-weight="500" fill="rgba(255,255,255,0.4)" letter-spacing="2">BAIT AL</text>
  <text x="32" y="31" font-family="system-ui,sans-serif" font-size="14" font-weight="800" fill="#FAFAF7" letter-spacing="1">BAKHOOR</text>
</svg>` },
  { id: "maattar", width: 150, height: 40,
    svg: `<svg viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 28 L12 12 L16 22 L20 12 L24 28" stroke="#C8A962" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="34" y="18" font-family="system-ui,sans-serif" font-size="9" font-weight="500" fill="rgba(255,255,255,0.4)" letter-spacing="2">OUD AL</text>
  <text x="34" y="31" font-family="system-ui,sans-serif" font-size="14" font-weight="800" fill="#FAFAF7" letter-spacing="1">MAATTAR</text>
</svg>` },
  { id: "makkah-oud", width: 130, height: 40,
    svg: `<svg viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 30 C10 22 12 12 18 8" stroke="#C8A962" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M18 8 C22 4 26 6 26 12 C26 20 18 28 14 30" stroke="#C8A962" stroke-width="1.5" stroke-linecap="round"/>
  <text x="34" y="18" font-family="system-ui,sans-serif" font-size="9" font-weight="500" fill="rgba(255,255,255,0.4)" letter-spacing="2">MAKKAH</text>
  <text x="34" y="31" font-family="system-ui,sans-serif" font-size="14" font-weight="800" fill="#FAFAF7" letter-spacing="1">OUD</text>
</svg>` },
  { id: "ahmad-maghribi", width: 170, height: 40,
    svg: `<svg viewBox="0 0 170 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 30 L12 10 L20 25 L28 10 L32 30" stroke="#C8A962" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="40" y="26" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#FAFAF7" letter-spacing="0.3">AHMAD AL MAGHRIBI</text>
</svg>` },
];

// عبايات — Abaya stores
const abayaSvgs: SvgLogo[] = [
  { id: "ounass", width: 110, height: 40,
    svg: `<svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 10 L16 10 L20 30 L24 10 L32 10" stroke="#FAFAF7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="40" y="26" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#FAFAF7" letter-spacing="0.5">OUNASS</text>
</svg>` },
  { id: "boutiqaat", width: 130, height: 40,
    svg: `<svg viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 14 Q14 8 20 14 L20 30 L8 30 Z" stroke="#C8A962" stroke-width="1.5" fill="rgba(200,169,98,0.08)"/>
  <text x="30" y="26" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#FAFAF7" letter-spacing="0.2">BOUTIQAAT</text>
</svg>` },
  { id: "modanisa", width: 120, height: 40,
    svg: `<svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="12" r="4" stroke="#FAFAF7" stroke-width="1.5"/>
  <path d="M8 32 C8 20 24 20 24 32" stroke="#FAFAF7" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <text x="32" y="26" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#FAFAF7" letter-spacing="0.2">MODANISA</text>
</svg>` },
  { id: "hayah-abaya", width: 110, height: 40,
    svg: `<svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 8 L14 8 L14 32 M14 20 L20 20 M20 8 L20 32" stroke="#C8A962" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="30" y="26" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#FAFAF7" letter-spacing="0.3">HAYAH</text>
</svg>` },
  { id: "abayati", width: 110, height: 40,
    svg: `<svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 28 L20 8 L30 28 M13 22 L27 22" stroke="#FAFAF7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="38" y="26" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#FAFAF7" letter-spacing="0.3">ABAYATI</text>
</svg>` },
];

// عسل — Honey stores
const honeySvgs: SvgLogo[] = [
  { id: "sidr-honey", width: 130, height: 40,
    svg: `<svg viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 28 C8 22 10 10 18 8 C26 6 30 14 28 22 C26 30 18 34 12 28 Z" stroke="#F5A623" stroke-width="1.5" fill="rgba(245,166,35,0.08)"/>
  <path d="M16 16 L20 12 L24 16 L24 22 L16 22 Z" stroke="#F5A623" stroke-width="1.2" fill="rgba(245,166,35,0.1)"/>
  <text x="38" y="18" font-family="system-ui,sans-serif" font-size="9" font-weight="500" fill="rgba(245,166,35,0.7)" letter-spacing="2">PREMIUM</text>
  <text x="38" y="31" font-family="system-ui,sans-serif" font-size="14" font-weight="800" fill="#FAFAF7" letter-spacing="0.5">SIDR</text>
</svg>` },
  { id: "wadi-honey", width: 130, height: 40,
    svg: `<svg viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 28 Q10 16 18 12 Q26 8 28 20 Q30 28 18 32 Q12 34 8 28" stroke="#F5A623" stroke-width="1.5" fill="rgba(245,166,35,0.06)"/>
  <path d="M15 20 L18 14 L21 20" stroke="#F5A623" stroke-width="1.2" stroke-linecap="round"/>
  <text x="38" y="26" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#FAFAF7" letter-spacing="0.5">WADI</text>
</svg>` },
  { id: "jood-honey", width: 130, height: 40,
    svg: `<svg viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 22 Q10 10 20 10 Q30 10 30 22 L28 28 L12 28 Z" stroke="#F5A623" stroke-width="1.5" fill="rgba(245,166,35,0.08)"/>
  <path d="M18 10 L18 6" stroke="#F5A623" stroke-width="1.5" stroke-linecap="round"/>
  <text x="38" y="26" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#FAFAF7" letter-spacing="0.3">JOOD HONEY</text>
</svg>` },
  { id: "hail-honey", width: 110, height: 40,
    svg: `<svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 28 C8 24 8 12 16 10 C20 9 24 12 24 18 C24 24 20 30 14 28" stroke="#F5A623" stroke-width="1.5" fill="none"/>
  <text x="32" y="26" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#FAFAF7" letter-spacing="0.5">HAIL</text>
</svg>` },
];

// ذهب/مجوهرات — Gold & Jewelry stores
const goldSvgs: SvgLogo[] = [
  { id: "pure-gold", width: 130, height: 40,
    svg: `<svg viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 8 L22 8 L26 16 L18 32 L10 16 Z" stroke="#C8A962" stroke-width="1.5" fill="rgba(200,169,98,0.08)"/>
  <line x1="10" y1="16" x2="26" y2="16" stroke="#C8A962" stroke-width="1"/>
  <text x="36" y="18" font-family="system-ui,sans-serif" font-size="10" font-weight="500" fill="rgba(200,169,98,0.6)" letter-spacing="2">PURE</text>
  <text x="36" y="31" font-family="system-ui,sans-serif" font-size="14" font-weight="800" fill="#C8A962" letter-spacing="0.5">GOLD</text>
</svg>` },
  { id: "al-fardan", width: 130, height: 40,
    svg: `<svg viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="20" r="11" stroke="#C8A962" stroke-width="1.5"/>
  <path d="M11 20 L16 12 L21 20 L16 28 Z" stroke="#C8A962" stroke-width="1" fill="rgba(200,169,98,0.1)"/>
  <text x="34" y="26" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#FAFAF7" letter-spacing="0.3">AL FARDAN</text>
</svg>` },
  { id: "almas-jewelry", width: 120, height: 40,
    svg: `<svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 18 L16 8 L24 18 L16 32 Z" stroke="#C8A962" stroke-width="1.5" fill="rgba(200,169,98,0.06)"/>
  <line x1="8" y1="18" x2="24" y2="18" stroke="#C8A962" stroke-width="1"/>
  <text x="32" y="26" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#FAFAF7" letter-spacing="0.5">ALMAS</text>
</svg>` },
  { id: "maz-jewelry", width: 110, height: 40,
    svg: `<svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 26 L12 10 L18 20 L24 10 L28 26" stroke="#C8A962" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="36" y="26" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#FAFAF7" letter-spacing="0.5">MAZ</text>
</svg>` },
];

// ورد — Flower stores
const flowerSvgs: SvgLogo[] = [
  { id: "mohra-flowers", width: 130, height: 40,
    svg: `<svg viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="18" cy="20" r="5" stroke="#E8A0BF" stroke-width="1.5"/>
  <path d="M18 8 C18 8 14 12 18 15 M18 8 C18 8 22 12 18 15 M8 20 C8 20 12 16 15 20 M8 20 C8 20 12 24 15 20 M18 32 C18 32 14 28 18 25 M18 32 C18 32 22 28 18 25 M28 20 C28 20 24 16 21 20 M28 20 C28 20 24 24 21 20" stroke="#E8A0BF" stroke-width="1.2" stroke-linecap="round"/>
  <text x="36" y="26" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#FAFAF7" letter-spacing="0.3">MOHRA</text>
</svg>` },
  { id: "wardan", width: 110, height: 40,
    svg: `<svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 28 C12 28 8 22 10 16 C12 10 18 8 22 12 C26 8 32 10 30 18 C28 24 22 30 18 28 C18 28 17 28 16 28" stroke="#E8A0BF" stroke-width="1.4" fill="rgba(232,160,191,0.08)"/>
  <path d="M18 28 L18 34" stroke="#E8A0BF" stroke-width="1.2" stroke-linecap="round"/>
  <text x="38" y="26" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#FAFAF7" letter-spacing="0.3">WARDAN</text>
</svg>` },
  { id: "zahra-flowers", width: 110, height: 40,
    svg: `<svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 20 C10 14 12 8 18 8 C24 8 26 14 22 20 M14 20 C14 26 18 32 18 32 C18 32 22 26 22 20 M14 20 L22 20" stroke="#E8A0BF" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <text x="32" y="26" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#FAFAF7" letter-spacing="0.3">ZAHRA</text>
</svg>` },
];

// خدمات — Services / Other
const servicesSvgs: SvgLogo[] = [
  { id: "tamimi-law", width: 130, height: 40,
    svg: `<svg viewBox="0 0 130 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 30 L8 16 L18 8 L28 16 L28 30" stroke="#FAFAF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <rect x="14" y="20" width="8" height="10" stroke="#C8A962" stroke-width="1.2"/>
  <text x="36" y="26" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#FAFAF7" letter-spacing="0.3">AL TAMIMI</text>
</svg>` },
  { id: "nana-delivery", width: 110, height: 40,
    svg: `<svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="6" y="12" width="24" height="16" rx="4" stroke="#FAFAF7" stroke-width="1.5"/>
  <circle cx="12" cy="32" r="3" stroke="#FAFAF7" stroke-width="1.5"/>
  <circle cx="24" cy="32" r="3" stroke="#FAFAF7" stroke-width="1.5"/>
  <text x="36" y="26" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#FAFAF7" letter-spacing="0.3">Nana</text>
</svg>` },
  { id: "noon-shopping", width: 110, height: 40,
    svg: `<svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="18" cy="18" r="12" stroke="#FFCD00" stroke-width="1.5"/>
  <path d="M12 18 C12 14 15 12 18 12 C21 12 24 14 24 18" stroke="#FFCD00" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <text x="36" y="26" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="#FAFAF7" letter-spacing="0.3">Noon</text>
</svg>` },
  { id: "tf1one", width: 110, height: 40,
    svg: `<svg viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 14 L22 14 M14 14 L14 30" stroke="#C8A962" stroke-width="2" stroke-linecap="round"/>
  <path d="M26 14 L32 14 L32 30 M32 22 L28 22" stroke="#C8A962" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="40" y="26" font-family="system-ui,-apple-system,monospace" font-size="16" font-weight="800" fill="#C8A962" letter-spacing="1">ONE</text>
</svg>` },
  { id: "saas-store", width: 120, height: 40,
    svg: `<svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 20 C10 13 14 8 20 8 C26 8 28 13 26 18 C24 22 18 24 18 28" stroke="#FAFAF7" stroke-width="1.6" stroke-linecap="round"/>
  <circle cx="18" cy="32" r="2" fill="#C8A962"/>
  <text x="36" y="26" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#FAFAF7" letter-spacing="0.5">STORE</text>
</svg>` },
  { id: "digital-menu", width: 140, height: 40,
    svg: `<svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="6" y="8" width="22" height="26" rx="3" stroke="#FAFAF7" stroke-width="1.5"/>
  <line x1="10" y1="16" x2="24" y2="16" stroke="#C8A962" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="10" y1="22" x2="24" y2="22" stroke="#C8A962" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="10" y1="28" x2="20" y2="28" stroke="#C8A962" stroke-width="1.2" stroke-linecap="round"/>
  <text x="36" y="26" font-family="system-ui,sans-serif" font-size="13" font-weight="700" fill="#FAFAF7" letter-spacing="0.5">DIGITAL MENU</text>
</svg>` },
];

/* ─── Merged list for marquee ─── */
const ALL_SVG_LOGOS: SvgLogo[] = [
  SallaLogo,
  ZidLogo,
  ...perfumeSvgs,
  ...oudSvgs,
  ...abayaSvgs,
  ...honeySvgs,
  ...goldSvgs,
  ...flowerSvgs,
  ...servicesSvgs,
];

/* ─── Logo item components ─── */
function ImageLogoItem({ client }: { client: typeof IMAGE_LOGOS[0] }) {
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center flex-shrink-0"
      style={{ height: "56px", minWidth: "140px", padding: "0 32px", opacity: 0.6, transition: "opacity 0.3s" }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; }}
    >
      <Image
        src={client.logo}
        alt={client.name}
        width={110}
        height={44}
        style={{ width: "auto", height: "36px", objectFit: "contain", filter: "brightness(0) invert(1)" }}
        unoptimized
      />
    </a>
  );
}

function SvgLogoItem({ logo }: { logo: SvgLogo }) {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{
        height: "56px",
        minWidth: `${logo.width + 40}px`,
        padding: "0 20px",
        opacity: 0.5,
        transition: "opacity 0.3s ease",
        borderLeft: "1px solid rgba(255,255,255,0.05)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.5"; }}
      dangerouslySetInnerHTML={{
        __html: `<svg width="${logo.width}" height="${logo.height}" viewBox="0 0 ${logo.width} ${logo.height}">${logo.svg.replace(/^<svg[^>]*>/, "").replace("</svg>", "")}</svg>`,
      }}
    />
  );
}

/* ─── Build rows ─── */
type LogoItem =
  | { kind: "image"; data: typeof IMAGE_LOGOS[0] }
  | { kind: "svg"; data: SvgLogo };

const ALL_ITEMS: LogoItem[] = [
  ...IMAGE_LOGOS.map((d) => ({ kind: "image" as const, data: d })),
  ...ALL_SVG_LOGOS.map((d) => ({ kind: "svg" as const, data: d })),
];

const ROW1 = ALL_ITEMS.slice(0, Math.ceil(ALL_ITEMS.length / 2));
const ROW2 = ALL_ITEMS.slice(Math.ceil(ALL_ITEMS.length / 2));

function LogoItem({ item }: { item: LogoItem }) {
  if (item.kind === "image") return <ImageLogoItem client={item.data as typeof IMAGE_LOGOS[0]} />;
  return <SvgLogoItem logo={item.data as SvgLogo} />;
}

/* ─── Main component ─── */
export default function PartnersMarquee() {
  const t = useTranslations("partners");
  const row1 = [...ROW1, ...ROW1, ...ROW1];
  const row2 = [...ROW2, ...ROW2, ...ROW2];

  return (
    <section
      style={{
        background: "#0A0A0A",
        padding: "80px 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(200,169,98,0.08)",
        borderBottom: "1px solid rgba(200,169,98,0.08)",
        position: "relative",
      }}
    >
      {/* Radial glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,169,98,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Title */}
      <div className="max-w-[1400px] mx-auto px-8 mb-14 relative z-10">
        <div className="flex items-center justify-center gap-5">
          <div style={{ flex: 1, maxWidth: "120px", height: "1px", background: "linear-gradient(to right, transparent, rgba(200,169,98,0.3))" }} />
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(200,169,98,0.55)", whiteSpace: "nowrap" }}>
            {t("title")}
          </div>
          <div style={{ flex: 1, maxWidth: "120px", height: "1px", background: "linear-gradient(to left, transparent, rgba(200,169,98,0.3))" }} />
        </div>
        <div style={{ textAlign: "center", marginTop: "8px", fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.12)" }}>
          +50 BRAND
        </div>
      </div>

      {/* Fade edges */}
      {["left" as const, "right" as const].map((side) => (
        <div
          key={side}
          style={{
            position: "absolute", top: 0, bottom: 0, [side]: 0, width: "140px",
            background: `linear-gradient(to ${side === "left" ? "right" : "left"}, #0A0A0A, transparent)`,
            zIndex: 10, pointerEvents: "none",
          }}
        />
      ))}

      {/* Row 1 */}
      <div style={{ overflow: "hidden", marginBottom: "12px" }}>
        <div
          style={{ display: "flex", animation: "marquee 70s linear infinite", width: "max-content" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "running"; }}
        >
          {row1.map((item, i) => <LogoItem key={`r1-${i}`} item={item} />)}
        </div>
      </div>

      {/* Row 2 */}
      <div style={{ overflow: "hidden" }}>
        <div
          style={{ display: "flex", animation: "marquee-reverse 55s linear infinite", width: "max-content" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "running"; }}
        >
          {row2.map((item, i) => <LogoItem key={`r2-${i}`} item={item} />)}
        </div>
      </div>
    </section>
  );
}
