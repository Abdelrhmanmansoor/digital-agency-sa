import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WHATSAPP_NUMBER = "+201007835547";

export function getWhatsAppLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;
  if (message) return `${base}?text=${encodeURIComponent(message)}`;
  return base;
}

export const AGENCY_INFO = {
  name: "وكالة رقمية",
  nameEn: "Digital Agency",
  whatsapp: WHATSAPP_NUMBER,
  email: "info@digitalagency.sa",
  phone: "+966 5X XXX XXXX",
  address: "المملكة العربية السعودية",
  social: {
    instagram: "",
    twitter: "",
    tiktok: "",
    snapchat: "",
  },
};
