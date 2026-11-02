import { notFound } from "next/navigation";

/* Any unknown path under a locale lands here, so the visitor gets the
   branded [locale]/not-found — with header, footer and WhatsApp — instead of
   the bare root 404. */
export default function CatchAll() {
  notFound();
}
