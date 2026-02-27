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
  name: "",
  nameEn: "",
  whatsapp: WHATSAPP_NUMBER,
  email: "info@digitalagency.sa",
  phone: "+201007835547",
  address: "المملكة العربية السعودية",
  social: {
    instagram: "",
    twitter: "",
    tiktok: "",
    snapchat: "",
  },
};
