"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";

const PROJECTS = [
  {
    id: 1,
    name: "TF1ONE",
    nameAr: "TF1ONE",
    sector: "Fashion",
    sectorAr: "أزياء فاخرة",
    category: "salla",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    url: "https://www.tf1one.com/",
  },
  {
    id: 2,
    name: "Nour Perfumes",
    nameAr: "نور للعطور",
    sector: "Perfumes",
    sectorAr: "عطور فاخرة",
    category: "salla",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    url: "#",
  },
  {
    id: 3,
    name: "Tech Solutions",
    nameAr: "حلول تقنية",
    sector: "Technology",
    sectorAr: "تقنية المعلومات",
    category: "websites",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    url: "#",
  },
  {
    id: 4,
    name: "Royal Dates",
    nameAr: "تمور ملكية",
    sector: "Food",
    sectorAr: "منتجات غذائية",
    category: "salla",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
    url: "#",
  },
  {
    id: 5,
    name: "Fitness Hub",
    nameAr: "مركز اللياقة",
    sector: "Fitness",
    sectorAr: "لياقة بدنية",
    category: "branding",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    url: "#",
  },
  {
    id: 6,
    name: "Al-Rashid Jewelry",
    nameAr: "مجوهرات الرشيد",
    sector: "Jewelry",
    sectorAr: "مجوهرات",
    category: "marketing",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    url: "#",
  },
  {
    id: 7,
    name: "Green Organic",
    nameAr: "الأخضر العضوي",
    sector: "Organic Food",
    sectorAr: "منتجات عضوية",
    category: "salla",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    url: "#",
  },
  {
    id: 8,
    name: "HomeDecor Arabia",
    nameAr: "ديكور المنزل",
    sector: "Home Decor",
    sectorAr: "ديكور منزلي",
    category: "websites",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    url: "#",
  },
];

const FILTERS = [
  { key: "all", labelAr: "الكل", labelEn: "All" },
  { key: "salla", labelAr: "متاجر سلة", labelEn: "Salla Stores" },
  { key: "websites", labelAr: "مواقع", labelEn: "Websites" },
  { key: "branding", labelAr: "هويات", labelEn: "Branding" },
  { key: "marketing", labelAr: "تسويق", labelEn: "Marketing" },
];

export default function Portfolio() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(PROJECTS);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const filtered = activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);
    setVisibleProjects(filtered);
  }, [activeFilter]);

  const displayedProjects = showAll ? visibleProjects : visibleProjects.slice(0, 6);

  return (
    <section id="portfolio" ref={sectionRef} style={{ background: "#FFFFFF", padding: "120px 0" }}>
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(20px)",
              transition: "all 0.8s ease",
            }}
          >
            <div className="section-label mb-4">
              {isRTL ? "أعمالنا" : "Portfolio"}
            </div>
            <h2
              style={{
                fontFamily: "'Zain', sans-serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                color: "#0A0A0A",
                lineHeight: 1.1,
              }}
            >
              {isRTL ? "من أعمالنا" : locale === "en" ? "Our Work" : "Nos Réalisations"}
            </h2>
          </div>

          {/* Filters */}
          <div
            className="flex flex-wrap gap-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(20px)",
              transition: "all 0.8s 0.2s ease",
            }}
          >
            {FILTERS.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                style={{
                  padding: "8px 20px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontFamily: "'Zain', sans-serif",
                  fontWeight: 500,
                  color: activeFilter === filter.key ? "#0A0A0A" : "#8C8C7A",
                  borderBottom: activeFilter === filter.key ? "2px solid #C8A962" : "2px solid transparent",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== filter.key) {
                    e.currentTarget.style.color = "#0A0A0A";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== filter.key) {
                    e.currentTarget.style.color = "#8C8C7A";
                  }
                }}
              >
                {isRTL ? filter.labelAr : filter.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="portfolio-grid">
          {displayedProjects.map((project, index) => (
            <a
              key={project.id}
              href={project.url}
              target={project.url !== "#" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="portfolio-item"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translateY(30px)",
                transition: `opacity 0.6s ${index * 0.1}s ease, transform 0.6s ${index * 0.1}s ease`,
                display: "block",
                textDecoration: "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={isRTL ? project.nameAr : project.name}
                loading="lazy"
              />

              <div className="portfolio-overlay">
                <div className="portfolio-info">
                  <div
                    style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#C8A962",
                      marginBottom: "8px",
                    }}
                  >
                    {isRTL ? project.sectorAr : project.sector}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Zain', sans-serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      marginBottom: "12px",
                    }}
                  >
                    {isRTL ? project.nameAr : project.name}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
                    {isRTL ? "عرض المشروع ←" : "View Project →"}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View More */}
        {!showAll && visibleProjects.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              style={{
                background: "transparent",
                border: "1px solid #E8E6E1",
                padding: "16px 48px",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "Space Mono, monospace",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#0A0A0A",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#C8A962";
                e.currentTarget.style.color = "#C8A962";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E8E6E1";
                e.currentTarget.style.color = "#0A0A0A";
              }}
            >
              {isRTL ? "عرض المزيد" : "View More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
