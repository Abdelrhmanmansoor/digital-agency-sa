import type { Metadata } from "next";
import Proposal from "@/components/proposal/Proposal";

export const metadata: Metadata = {
  title: "عرض تجاري مخصص — مؤسسة سليمان",
  description:
    "حلول رقمية متكاملة لتنمية مشروعك: إدارة المتجر، التسويق الرقمي، التصميم والمحتوى، والحلول الرقمية — من جهة واحدة.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "عرض تجاري مخصص — مؤسسة سليمان",
    description: "حلول رقمية متكاملة لتنمية مشروعك — من جهة واحدة وبمنهج واضح قابل للتوسع.",
    type: "website",
  },
};

export default function ProposalPage() {
  return <Proposal />;
}
