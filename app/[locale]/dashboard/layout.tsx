import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getClientSession } from "@/lib/client-auth";
import DashboardSidebar from "./DashboardSidebar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Read the current pathname injected by middleware
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";

  // Login page must NOT be wrapped with auth — it IS the auth page
  if (pathname.includes("/dashboard/login")) {
    return <>{children}</>;
  }

  const user = await getClientSession();
  if (!user) {
    redirect(`/${locale}/dashboard/login`);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0A", color: "#FAFAF7" }}>
      <DashboardSidebar user={{ name: user.name, email: user.email }} locale={locale} />
      <main
        style={{
          flex: 1,
          marginInlineStart: "260px",
          minHeight: "100vh",
          background: "#0A0A0A",
        }}
      >
        {children}
      </main>
    </div>
  );
}
