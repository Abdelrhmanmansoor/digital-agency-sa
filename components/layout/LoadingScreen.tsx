"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 900);
    const t2 = setTimeout(() => setGone(true), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: leaving ? 0 : 1,
        transform: leaving ? "translateY(-8px)" : "translateY(0)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        pointerEvents: leaving ? "none" : "all",
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(200,169,98,0.06) 0%, transparent 70%)",
      }} />

      {/* Corner marks */}
      {[
        { top: 0, left: 0, borderTop: "1px solid rgba(200,169,98,0.18)", borderLeft: "1px solid rgba(200,169,98,0.18)" },
        { top: 0, right: 0, borderTop: "1px solid rgba(200,169,98,0.18)", borderRight: "1px solid rgba(200,169,98,0.18)" },
        { bottom: 0, left: 0, borderBottom: "1px solid rgba(200,169,98,0.18)", borderLeft: "1px solid rgba(200,169,98,0.18)" },
        { bottom: 0, right: 0, borderBottom: "1px solid rgba(200,169,98,0.18)", borderRight: "1px solid rgba(200,169,98,0.18)" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: 60, height: 60, ...s }} />
      ))}

      {/* Content */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 28,
        animation: "enter 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
      }}>
        <Image
          src="/logo.png"
          alt="وكالة رقمية"
          width={180}
          height={72}
          style={{ width: 180, height: "auto", objectFit: "contain", filter: "drop-shadow(0 0 24px rgba(200,169,98,0.25))" }}
          priority
        />

        {/* Three dots pulse */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 4, height: 4, borderRadius: "50%",
              background: "#C8A962",
              animation: `dot 1.2s ease-in-out ${i * 0.15}s infinite`,
              opacity: 0.3,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes enter {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes dot {
          0%, 80%, 100% { opacity: 0.2; transform: scaleY(0.8); }
          40%            { opacity: 1;   transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
}
