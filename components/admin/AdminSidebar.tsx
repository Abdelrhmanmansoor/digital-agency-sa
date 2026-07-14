"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin/dashboard", icon: "🏠", label: "الرئيسية" },
  { href: "/admin/articles", icon: "📄", label: "المقالات" },
  { href: "/admin/portfolio", icon: "💼", label: "الأعمال" },
  { href: "/admin/messages", icon: "📨", label: "الرسائل", badge: true },
  { href: "/admin/clients", icon: "👤", label: "العملاء" },
  { href: "/admin/invoices", icon: "🧾", label: "الفواتير" },
  { href: "/admin/contracts", icon: "📋", label: "العقود" },
  { href: "/admin/settings", icon: "⚙️", label: "الإعدادات" },
];

interface AdminSidebarProps {
  active?: string;
}

export default function AdminSidebar({ active: _active }: AdminSidebarProps = {}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/login", { method: "DELETE" });
    router.push("/admin");
  };

  return (
    <aside className="admin-sidebar is-open" style={{ display: "flex", flexDirection: "column" }}>
      {/* Logo */}
      <div
        style={{
          padding: "24px 24px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="logo"
          style={{
            height: "26px",
            width: "auto",
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
            opacity: 0.85,
            display: "block",
          }}
        />
        <div
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(240,177,0,0.4)",
            marginTop: "2px",
          }}
        >
          ADMIN PANEL
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", overflow: "auto" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ textDecoration: "none", display: "block", marginBottom: "4px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  background: isActive ? "rgba(240,177,0,0.12)" : "transparent",
                  borderRight: isActive ? "2px solid #F0B100" : "2px solid transparent",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <span style={{ fontSize: "16px" }}>{item.icon}</span>
                <span
                  style={{
                    fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                    fontSize: "14px",
                    color: isActive ? "#F0B100" : "#8C8C7A",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            width: "100%",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            borderRadius: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,64,64,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <span style={{ fontSize: "16px" }}>🚪</span>
          <span style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "14px", color: "#8C8C7A" }}>
            تسجيل الخروج
          </span>
        </button>
      </div>
    </aside>
  );
}
