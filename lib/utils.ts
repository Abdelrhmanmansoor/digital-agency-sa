export function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(" ");
}

export const WHATSAPP_NUMBER = "+201007835547";

export function getWhatsAppLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;
  if (message) return `${base}?text=${encodeURIComponent(message)}`;
  return base;
}

export const AGENCY_INFO = {
  name: "AM Design",
  nameEn: "AM Design",
  whatsapp: WHATSAPP_NUMBER,
  email: "mansoor77soliman@gmail.com",
  phone: WHATSAPP_NUMBER,
  /* Where the agency actually is. The market it serves is Saudi Arabia and
     the Gulf; the two are declared separately in the structured data
     (address vs areaServed) rather than conflated into one claim. */
  address: "جمهورية مصر العربية — القاهرة",
  addressEn: "Cairo, Egypt",
  addressFr: "Le Caire, Égypte",
  city: "Cairo",
  countryCode: "EG",
  social: {
    instagram: "https://www.instagram.com/amdesign.ksa/",
    twitter: "https://x.com/am_designing",
    tiktok: "https://www.tiktok.com/@amdesigne.sa",
    snapchat: "",
  },
};
