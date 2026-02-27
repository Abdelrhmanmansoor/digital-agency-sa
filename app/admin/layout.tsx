import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة التحكم",
  description: "Admin Dashboard",
  robots: "noindex,nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#FAFAF7", color: "#0A0A0A", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
