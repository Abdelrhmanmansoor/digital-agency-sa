import type { Metadata } from "next";
import { cookies } from "next/headers";
import { invoicesDB } from "@/lib/db";
import {
  evaluateShare,
  isValidPublicId,
  shareCookieName,
  shareCookieValue,
  toPublicInvoice,
} from "@/lib/invoice-share";
import PublicInvoice from "@/components/invoice/PublicInvoice";
import { InvoiceUnavailable, InvoicePasswordGate } from "@/components/invoice/InvoiceGate";

/* الفاتورة تتغيّر بتغيّر حالتها ولا يجوز أن تُخزَّن في أي وسيط مشترك.
   `force-dynamic` يمنع التوليد المسبق، والترويسة في next.config.ts تمنع
   التخزين على الحافة وفي المتصفح. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

/* لا فهرسة ولا أرشفة ولا معاينة. الصفحة أيضًا خارج sitemap.xml وممنوعة في
   robots.txt — ثلاث طبقات لأن كلًّا منها يخاطب زاحفًا مختلفًا. */
export const metadata: Metadata = {
  title: "فاتورة",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default async function PublicInvoicePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  /* تحقّق من الشكل قبل أي استعلام: مقطع مسار مشوَّه لا يصل إلى التخزين. */
  if (!isValidPublicId(token)) return <InvoiceUnavailable reason="not-found" />;

  const invoice = await invoicesDB.getByPublicId(token);
  const state = evaluateShare(invoice);
  if (state !== "ok" || !invoice) return <InvoiceUnavailable reason={state === "ok" ? "not-found" : state} />;

  /* كلمة المرور الاختيارية: الكوكي مشتقّة من سرّ الخادم، فلا تُزوَّر، وتبطل
     تلقائيًا عند تغيير الكلمة لأن الهاش يدخل في اشتقاقها. */
  if (invoice.sharePasswordHash) {
    const cookieStore = await cookies();
    const presented = cookieStore.get(shareCookieName(token))?.value;
    if (presented !== shareCookieValue(token, invoice.sharePasswordHash)) {
      return <InvoicePasswordGate token={token} />;
    }
  }

  /* عدّاد المشاهدة لا يجوز أن يُسقط عرض الفاتورة إن فشل. */
  void invoicesDB.recordView(invoice.id).catch(() => {});

  return <PublicInvoice invoice={toPublicInvoice(invoice)} />;
}
