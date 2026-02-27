"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => setIsVisible(false), 600);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="loading-screen"
      style={{
        transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: isLeaving ? 0 : 1,
        transform: isLeaving ? "scale(1.05)" : "scale(1)",
        pointerEvents: isLeaving ? "none" : "all",
      }}
    >
      {/* Islamic pattern background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23C8A962' stroke-width='0.5'%3E%3Cpath d='M40 0 L80 20 L80 60 L40 80 L0 60 L0 20 Z'/%3E%3Cpath d='M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z'/%3E%3Cpath d='M40 20 L60 30 L60 50 L40 60 L20 50 L20 30 Z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
          opacity: 0.04,
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Logo */}
        <div className="loading-logo text-center">
          <div style={{ fontFamily: "Noto Kufi Arabic, sans-serif", fontSize: "52px", fontWeight: 800, color: "#C8A962", letterSpacing: "-0.02em" }}>
            وكالة
          </div>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", letterSpacing: "0.4em", color: "#8C8C7A", marginTop: "4px", textTransform: "uppercase" }}>
            DIGITAL AGENCY
          </div>
        </div>

        {/* Progress bar */}
        <div className="loading-bar-container">
          <div className="loading-bar" />
        </div>

        {/* Loading text */}
        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", letterSpacing: "0.3em", color: "#8C8C7A", textTransform: "uppercase", opacity: 0.6 }}>
          LOADING...
        </div>
      </div>
    </div>
  );
}
