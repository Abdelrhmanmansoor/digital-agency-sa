"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Props {
  user: { name: string; email: string };
  locale: string;
}

const NAV_ITEMS = [
  {
    href: "",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    labelAr: "نظرة عامة",
    labelEn: "Overview",
  },
  {
    href: "/orders",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    labelAr: "طلباتي",
    labelEn: "My Orders",
  },
  {
    href: "/files",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    labelAr: "ملفاتي",
    labelEn: "My Files",
  },
  {
    href: "/invoices",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    labelAr: "فواتيري",
    labelEn: "Invoices",
  },
  {
    href: "/contracts",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="12" y2="16" />
      </svg>
    ),
    labelAr: "عقودي",
    labelEn: "Contracts",
  },
  {
    href: "/profile",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    labelAr: "حسابي",
    labelEn: "Profile",
  },
];

export default function DashboardSidebar({ user, locale }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const isRTL = locale === "ar";
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const basePath = `/${locale}/dashboard`;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    const full = basePath + href;
    if (href === "") return pathname === basePath;
    return pathname.startsWith(full);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/client/auth/logout", { method: "POST" });
    router.push(`/${locale}/dashboard/login`);
  };

  return (
    <>
      {/* overlay */}
      {isMobile && mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 150, backdropFilter: "blur(2px)" }} />
      )}

      {/* Mobile topbar */}
      {isMobile && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "56px", background: "#111318", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", zIndex: 100, direction: isRTL ? "rtl" : "ltr" }}>
          <a href={`/${locale}`} style={{ textDecoration: "none", fontFamily: "Space Mono, monospace", fontSize: "11px", color: "#C8A962", letterSpacing: "0.15em" }}>DIGITAL AGENCY</a>
          <button onClick={() => setMobileOpen(true)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "8px 12px", cursor: "pointer", color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: "6px", fontFamily: "Space Mono, monospace", fontSize: "10px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            MENU
          </button>
        </div>
      )}

      <aside
        style={{
        position: "fixed",
        top: 0,
        [isRTL ? "right" : "left"]: 0,
        width: "260px",
        height: "100vh",
        background: "#1A1D26",
        borderInlineEnd: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        zIndex: 200,
        direction: isRTL ? "rtl" : "ltr",
        transform: (isMobile && !mobileOpen) ? (isRTL ? "translateX(100%)" : "translateX(-100%)") : "translateX(0)",
        transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href={`/${locale}`} style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", color: "#C8A962", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            DIGITAL AGENCY
          </div>
          <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "3px" }}>
            {isRTL ? "بوابة العملاء" : "Client Portal"}
          </div>
        </a>
        {isMobile && (
          <button onClick={() => setMobileOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", padding: "4px", display: "flex" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <a
              key={item.href}
              href={basePath + item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "11px 14px",
                borderRadius: "10px",
                marginBottom: "4px",
                background: active ? "rgba(200,169,98,0.1)" : "transparent",
                color: active ? "#C8A962" : "rgba(255,255,255,0.45)",
                textDecoration: "none",
                fontFamily: "'Zain', sans-serif",
                fontSize: "15px",
                fontWeight: active ? 700 : 400,
                transition: "all 0.2s",
                borderLeft: active && !isRTL ? "3px solid #C8A962" : "3px solid transparent",
                borderRight: active && isRTL ? "3px solid #C8A962" : "3px solid transparent",
              }}
            >
              {item.icon}
              {isRTL ? item.labelAr : item.labelEn}
            </a>
          );
        })}

        {/* New order CTA */}
        <div style={{ marginTop: "20px", padding: "0 2px" }}>
          <a
            href={`${basePath}/orders/new`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "12px",
              borderRadius: "10px",
              background: "rgba(200,169,98,0.08)",
              border: "1px solid rgba(200,169,98,0.2)",
              color: "#C8A962",
              textDecoration: "none",
              fontFamily: "'Zain', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              transition: "all 0.2s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {isRTL ? "طلب خدمة جديدة" : "New Order"}
          </a>
        </div>
      </nav>

      {/* User + Logout */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(200,169,98,0.15)",
              border: "1px solid rgba(200,169,98,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Space Mono, monospace",
              fontSize: "14px",
              color: "#C8A962",
              flexShrink: 0,
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", fontWeight: 700, color: "#FAFAF7", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.name}
            </div>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.email}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          style={{
            width: "100%",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            padding: "9px",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "'Zain', sans-serif",
            fontSize: "13px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.2s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          {isRTL ? "تسجيل الخروج" : "Sign out"}
        </button>
      </div>
    </aside>
    </>
  );
}
