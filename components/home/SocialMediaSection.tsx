"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";

/* ── Platform config ── */
const PLATFORMS = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@amdesign.ksa",
    url: "https://www.instagram.com/amdesign.ksa/",
    followers: "15K+",
    followersAr: "+15K",
    descAr: "تصاميم متاجر، هويات بصرية، وتصوير منتجات AI",
    descEn: "Store designs, brand identities & AI product photography",
    color: "#E1306C",
    gradient: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    posts: [
      { color: "#1a1a2e", emoji: "🎨" },
      { color: "#16213e", emoji: "📸" },
      { color: "#0f3460", emoji: "✨" },
      { color: "#533483", emoji: "🛍️" },
      { color: "#e94560", emoji: "💎" },
      { color: "#1a1a2e", emoji: "🚀" },
    ],
  },
  {
    id: "x",
    name: "X (Twitter)",
    handle: "@am_designing",
    url: "https://x.com/am_designing",
    followers: "3K+",
    followersAr: "+3K",
    descAr: "نصائح تجارة إلكترونية، أفكار تسويق، وأخبار المنصات",
    descEn: "E-commerce tips, marketing ideas & platform news",
    color: "#FFFFFF",
    gradient: "linear-gradient(135deg, #111 0%, #1d1d1d 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    posts: [
      { color: "#111", emoji: "💡" },
      { color: "#1a1a1a", emoji: "📊" },
      { color: "#222", emoji: "🎯" },
      { color: "#111", emoji: "⚡" },
      { color: "#1a1a1a", emoji: "🔥" },
      { color: "#222", emoji: "📈" },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@amdesigne.sa",
    url: "https://www.tiktok.com/@amdesigne.sa",
    followers: "8K+",
    followersAr: "+8K",
    descAr: "فيديوهات تعليمية، ريلز تصميم، وكواليس مشاريعنا",
    descEn: "Tutorial videos, design reels & behind-the-scenes",
    color: "#69C9D0",
    gradient: "linear-gradient(135deg, #010101 0%, #1a1a1a 50%, #2d2d2d 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
    posts: [
      { color: "#010101", emoji: "🎬" },
      { color: "#1a1a1a", emoji: "✂️" },
      { color: "#010101", emoji: "🎵" },
      { color: "#1a1a1a", emoji: "💫" },
      { color: "#010101", emoji: "🎯" },
      { color: "#1a1a1a", emoji: "🌟" },
    ],
  },
];

export default function SocialMediaSection() {
  const locale = useLocale();
  const isRTL  = locale === "ar";
  const ref    = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="social"
      aria-label={isRTL ? "تواصل معنا على السوشيال ميديا" : "Follow us on social media"}
      style={{ background: "#080808", padding: "80px 0 88px", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle purple glow */}
      <div aria-hidden style={{
        position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(137,79,212,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="max-w-[1300px] mx-auto px-6 relative z-10" dir={isRTL ? "rtl" : "ltr"}>

        {/* ── Header ── */}
        <div style={{
          textAlign: "center", marginBottom: "52px",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.8s ease",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "100px", padding: "5px 18px", marginBottom: "18px",
          }}>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              {isRTL ? "تابعنا على السوشيال ميديا" : "Follow Us on Social Media"}
            </span>
          </div>
          <h2 style={{
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "clamp(26px, 3.5vw, 48px)",
            fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "12px",
          }}>
            {isRTL
              ? <>نشارك خلف الكواليس <span style={{ color: "#F0B100" }}>يومياً</span></>
              : <>We share behind-the-scenes <span style={{ color: "#F0B100" }}>daily</span></>}
          </h2>
          <p style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.38)", maxWidth: "500px", margin: "0 auto" }}>
            {isRTL
              ? "نصائح تجارة إلكترونية، كواليس المشاريع، وأفكار تسويقية مجانية كل يوم"
              : "E-commerce tips, project behind-the-scenes & free marketing ideas every day"}
          </p>
        </div>

        {/* ── Platform Cards ── */}
        <div className="social-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {PLATFORMS.map((p, i) => {
            const isH = hovered === p.id;
            return (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{
                  background: isH ? `${p.gradient}` : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isH ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "20px", padding: "28px",
                  transition: "all 0.4s cubic-bezier(0.19,1,0.22,1)",
                  transform: isH ? "translateY(-6px)" : "none",
                  boxShadow: isH ? `0 24px 64px rgba(0,0,0,0.4)` : "none",
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${i * 0.1}s`,
                }}>
                  {/* Header row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ color: p.color, flexShrink: 0 }}>{p.icon}</div>
                      <div>
                        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", fontWeight: 700, color: "#FFFFFF" }}>
                          {p.handle}
                        </div>
                        <div style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
                          {p.name}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      background: "rgba(255,255,255,0.08)", borderRadius: "8px",
                      padding: "5px 12px", textAlign: "center",
                    }}>
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "14px", fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>
                        {isRTL ? p.followersAr : p.followers}
                      </div>
                      <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
                        {isRTL ? "متابع" : "Followers"}
                      </div>
                    </div>
                  </div>

                  {/* Post grid preview */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4px", marginBottom: "16px", borderRadius: "10px", overflow: "hidden" }}>
                    {p.posts.map((post, j) => (
                      <div key={j} style={{
                        aspectRatio: "1", background: post.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "18px", transition: "transform 0.2s",
                        transform: isH ? "scale(0.98)" : "scale(1)",
                      }}>
                        {post.emoji}
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <p style={{
                    fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "13px",
                    color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 16px",
                  }}>
                    {isRTL ? p.descAr : p.descEn}
                  </p>

                  {/* Follow CTA */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.07)",
                  }}>
                    <span style={{
                      fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "13px",
                      color: isH ? p.color : "rgba(255,255,255,0.5)",
                      fontWeight: 600, transition: "color 0.3s",
                    }}>
                      {isRTL ? "تابع الحساب" : "Follow Account"}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isH ? p.color : "rgba(255,255,255,0.3)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s, transform 0.3s", transform: isH ? (isRTL ? "translateX(-4px)" : "translateX(4px)") : "none" }}>
                      <path d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}/>
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .social-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
        @media (max-width: 640px) {
          .social-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
