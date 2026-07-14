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
  address: "المملكة العربية السعودية",
  social: {
    instagram: "https://www.instagram.com/amdesign.ksa/",
    twitter: "https://x.com/am_designing",
    tiktok: "https://www.tiktok.com/@amdesigne.sa",
    snapchat: "",
  },
};
