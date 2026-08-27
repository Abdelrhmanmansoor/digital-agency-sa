import type { Metadata } from "next";
import InvoiceNotice from "@/components/invoice/InvoiceNotice";

/* إشعار خاص بعميل واحد: يُستثنى من الفهرسة على نهج صفحة العرض التجاري. */
export const metadata: Metadata = {
  title: "إشعار إصدار فاتورة — AM Design",
  description: "إشعار رسمي خاص بخدمات تصميم متجر إلكتروني عبر منصة سلة.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "إشعار إصدار فاتورة — AM Design",
    description: "إشعار رسمي خاص بخدمات تصميم متجر إلكتروني عبر منصة سلة.",
    type: "website",
  },
};

export default function InvoicePage() {
  return <InvoiceNotice />;
}
