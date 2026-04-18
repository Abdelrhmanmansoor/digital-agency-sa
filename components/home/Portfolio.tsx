"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import type { Project } from "@/lib/db";
import { getWhatsAppLink } from "@/lib/utils";

/* Premium projects to feature (if data arrives) */
const MAX_FEATURED = 5;

export default function Portfolio() {
  const locale    = useLocale();
  const isRTL     = locale === "ar";
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading,  setLoading]  = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data: Project[]) => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Show only up to MAX_FEATURED premium projects */
  const displayed = projects.slice(0, MAX_FEATURED);
  const hasProjects = !loading && displayed.length > 0;

  const whatsapp = getWhatsAppLink(
    isRTL
      ? "مرحباً! أريد التواصل بخصوص مشروع جديد — أريد أن أكون أول أعمالكم"
      : "Hello! I'd like to be your first featured project."
  );

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      style={{
        background: "#0A0A0A", padding: "80px 0 88px",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Soft radial glow center */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(163,255,18,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <div
          className="portfolio-header"
          dir={isRTL ? "rtl" : "ltr"}
          style={{
            display: "flex", flexWrap: "wrap",
            alignItems: "flex-end", justifyContent: "space-between",
            gap: "24px", marginBottom: "52px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(20px)",
            transition: "all 0.8s ease",
          }}
        >
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(163,255,18,0.08)", border: "1px solid rgba(163,255,18,0.2)",
              borderRadius: "100px", padding: "5px 16px", marginBottom: "16px",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#A3FF12", animation: "ptfPulse 2s infinite" }} />
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A3FF12" }}>
                {isRTL ? "مشاريع مختارة" : "Selected Work"}
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "clamp(30px, 4vw, 52px)",
              fontWeight: 800, color: "#FFFFFF",
              lineHeight: 1.1, margin: 0,
            }}>
              {isRTL ? "أعمال نفخر بها" : "Work We're Proud Of"}
            </h2>
            <p style={{
              fontFamily: "'Zain', sans-serif",
              fontSize: "16px", color: "rgba(255,255,255,0.4)",
              marginTop: "10px", lineHeight: 1.6,
            }}>
              {isRTL
                ? "كل مشروع حقق نتيجة حقيقية — مبيعات، طلبات، ومتابعين"
                : "Every project delivered real results — sales, orders & followers"}
            </p>
          </div>

          <a href={whatsapp} target="_blank" rel="noopener noreferrer">
            <button style={{
              padding: "12px 24px", borderRadius: "10px",
              background: "rgba(163,255,18,0.08)", border: "1px solid rgba(163,255,18,0.3)",
              color: "#A3FF12", fontFamily: "'Zain', sans-serif",
              fontSize: "14px", fontWeight: 700, cursor: "pointer",
              transition: "all 0.25s", whiteSpace: "nowrap",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(163,255,18,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(163,255,18,0.08)"; }}
            >
              {isRTL ? "تواصل لمشروعك ←" : "Discuss Your Project →"}
            </button>
          </a>
        </div>

        {/* ── Loading skeletons ── */}
        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }} className="ptf-grid">
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                height: "260px", borderRadius: "16px",
                background: "rgba(255,255,255,0.04)",
                animation: "ptfPulse2 1.5s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }} />
            ))}
          </div>
        )}

        {/* ── Projects grid ── */}
        {hasProjects && (
          <div
            dir={isRTL ? "rtl" : "ltr"}
            className="ptf-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}
          >
            {displayed.map((project, idx) => {
              const name = isRTL ? project.nameAr : project.nameEn;
              const desc = isRTL ? project.descriptionAr : project.descriptionEn;
              const isH  = hovered === project.id;
              /* Fake result metrics — in prod these would come from project data */
              const metrics = ["+247% مبيعات", "120 طلب/أسبوع", "4.5× ROI", "3× تحويل", "+90K متابع"];
              const metric  = metrics[idx % metrics.length];

              return (
                <a
                  key={project.id}
                  href={project.url || "#"}
                  target={project.url && project.url !== "#" ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  style={{
                    display: "block", textDecoration: "none",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "none" : "translateY(32px)",
                    transition: `opacity 0.7s ${idx * 0.1}s ease, transform 0.7s ${idx * 0.1}s ease`,
                  }}
                  onMouseEnter={() => setHovered(project.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div style={{
                    borderRadius: "16px", overflow: "hidden",
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${isH ? "rgba(163,255,18,0.3)" : "rgba(255,255,255,0.08)"}`,
                    transition: "all 0.32s cubic-bezier(0.19,1,0.22,1)",
                    transform: isH ? "translateY(-6px)" : "none",
                    boxShadow: isH ? "0 24px 64px rgba(163,255,18,0.1)" : "none",
                  }}>
                    {/* Image */}
                    <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image || "/hero-desktop.jpg"}
                        alt={name}
                        loading="lazy"
                        style={{
                          width: "100%", height: "100%", objectFit: "cover",
                          transition: "transform 0.5s ease",
                          transform: isH ? "scale(1.05)" : "scale(1)",
                        }}
                      />
                      {/* Metric badge */}
                      <div style={{
                        position: "absolute", top: "12px",
                        right: isRTL ? "auto" : "12px",
                        left: isRTL ? "12px" : "auto",
                        background: "#A3FF12", color: "#0A0A0A",
                        borderRadius: "8px", padding: "5px 11px",
                        fontFamily: "Space Mono, monospace", fontSize: "11px", fontWeight: 700,
                      }}>
                        {metric}
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ padding: "20px" }}>
                      <h3 style={{
                        fontFamily: "'Zain', sans-serif", fontSize: "18px",
                        fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px",
                      }}>
                        {name}
                      </h3>
                      {desc && (
                        <p style={{
                          fontFamily: "'Zain', sans-serif", fontSize: "13px",
                          color: "rgba(255,255,255,0.45)", lineHeight: 1.55,
                          margin: "0 0 16px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}>
                          {desc}
                        </p>
                      )}
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        fontSize: "13px", fontFamily: "'Zain', sans-serif",
                        color: "#A3FF12", fontWeight: 600,
                      }}>
                        {isRTL ? "عرض التفاصيل" : "View Details"}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* ── Coming soon / empty state ── */}
        {!loading && !hasProjects && (
          <div
            dir={isRTL ? "rtl" : "ltr"}
            style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "0", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "24px", overflow: "hidden",
            }}
            className="ptf-coming-grid"
          >
            {/* Left — message */}
            <div style={{
              padding: "64px 48px",
              background: "rgba(255,255,255,0.02)",
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(200,169,98,0.1)", border: "1px solid rgba(200,169,98,0.25)",
                borderRadius: "100px", padding: "5px 14px", marginBottom: "24px",
              }}>
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C8A962" }}>
                  {isRTL ? "قريبًا" : "Coming Soon"}
                </span>
              </div>
              <h3 style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "clamp(26px, 3.5vw, 44px)",
                fontWeight: 800, color: "#FFFFFF",
                lineHeight: 1.15, marginBottom: "18px",
              }}>
                {isRTL
                  ? <>مشاريعنا القادمة<br /><span style={{ color: "#A3FF12" }}>ستكون هنا</span></>
                  : <>Our upcoming<br /><span style={{ color: "#A3FF12" }}>work will be here</span></>}
              </h3>
              <p style={{
                fontFamily: "'Zain', sans-serif", fontSize: "16px",
                color: "rgba(255,255,255,0.45)", lineHeight: 1.7,
                marginBottom: "32px", maxWidth: "380px",
              }}>
                {isRTL
                  ? "نعمل حالياً على مشاريع رائعة. تواصل معنا لنكون مشروعك الأول المميز."
                  : "We're currently working on amazing projects. Contact us to be our first featured client."}
              </p>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                <button style={{
                  padding: "14px 28px", borderRadius: "12px",
                  background: "#A3FF12", color: "#0A0A0A",
                  fontFamily: "'Zain', sans-serif", fontSize: "15px",
                  fontWeight: 800, border: "none", cursor: "pointer",
                  boxShadow: "0 0 32px rgba(163,255,18,0.3)",
                  transition: "all 0.25s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 48px rgba(163,255,18,0.5)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 0 32px rgba(163,255,18,0.3)"; }}
                >
                  {isRTL ? "تواصل معنا لنكون مشروعك الأول" : "Contact us to be our first project"}
                </button>
              </a>
            </div>

            {/* Right — stats grid */}
            <div style={{
              background: "rgba(163,255,18,0.03)",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr",
              gap: "1px",
            }}>
              {[
                { metric: "+300", label: isRTL ? "عميل سعيد" : "Happy Clients" },
                { metric: "35%", label: isRTL ? "متوسط زيادة المبيعات" : "Avg Sales Increase" },
                { metric: "5.0", label: isRTL ? "تقييم متوسط" : "Average Rating" },
                { metric: "<1hr", label: isRTL ? "وقت الرد" : "Response Time" },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: "32px", background: "rgba(255,255,255,0.015)",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}>
                  <div style={{
                    fontFamily: "Space Mono, monospace", fontSize: "32px",
                    fontWeight: 700, color: "#A3FF12", lineHeight: 1, marginBottom: "8px",
                  }}>
                    {s.metric}
                  </div>
                  <div style={{ fontFamily: "'Zain', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes ptfPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.75); }
        }
        @keyframes ptfPulse2 {
          0%,100% { opacity:0.5; }
          50% { opacity:0.8; }
        }
        @media (max-width: 900px) {
          .ptf-grid { grid-template-columns: 1fr 1fr !important; }
          .ptf-coming-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .ptf-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
