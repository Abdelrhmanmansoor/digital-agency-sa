"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => setIsVisible(false), 800);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="loading-screen"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: isLeaving ? 0 : 1,
        transform: isLeaving ? "scale(1.04)" : "scale(1)",
        pointerEvents: isLeaving ? "none" : "all",
        overflow: "hidden",
      }}
    >
      {/* Animated radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,169,98,0.07) 0%, transparent 70%)",
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      />

      {/* Subtle geometric grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(200,169,98,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,169,98,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner decorations */}
      {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos}`}
          style={{
            width: "80px",
            height: "80px",
            borderTop: i < 2 ? "1px solid rgba(200,169,98,0.2)" : "none",
            borderBottom: i >= 2 ? "1px solid rgba(200,169,98,0.2)" : "none",
            borderLeft: i % 2 === 0 ? "1px solid rgba(200,169,98,0.2)" : "none",
            borderRight: i % 2 === 1 ? "1px solid rgba(200,169,98,0.2)" : "none",
          }}
        />
      ))}

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{ gap: "40px" }}
      >
        {/* Logo */}
        <div
          style={{
            animation: "logo-entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          <Image
            src="/logo.png"
            alt="وكالة رقمية"
            width={200}
            height={80}
            style={{
              width: "200px",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 0 30px rgba(200,169,98,0.3))",
            }}
            priority
          />
        </div>

        {/* Gold divider line */}
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, transparent, rgba(200,169,98,0.6), transparent)",
            animation: "fade-in 0.6s ease 0.4s forwards",
            opacity: 0,
          }}
        />

        {/* Progress container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            animation: "fade-in 0.6s ease 0.5s forwards",
            opacity: 0,
          }}
        >
          {/* Progress bar */}
          <div
            style={{
              width: "180px",
              height: "1px",
              background: "rgba(200,169,98,0.15)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(to right, rgba(200,169,98,0.5), #C8A962)",
                transition: "width 0.05s linear",
                boxShadow: "0 0 8px rgba(200,169,98,0.6)",
              }}
            />
          </div>

          {/* Loading text */}
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "10px",
              letterSpacing: "0.4em",
              color: "rgba(200,169,98,0.4)",
              textTransform: "uppercase",
            }}
          >
            {progress < 100 ? "LOADING" : "READY"} — {Math.min(progress, 100)}%
          </div>
        </div>
      </div>

      <style>{`
        @keyframes logo-entrance {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          to { opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
