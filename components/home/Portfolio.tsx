"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";

const PRODUCT_ENHANCEMENT = [
  "/الصور/69ec4331fee419c1c2784f68.webp",
  "/الصور/69ec4326cecd6aa2ac82f56d.webp",
  "/الصور/69ec431c1e2af1a7abe35a78.webp",
  "/الصور/69ec4293fee419c1c2782b4e.webp",
  "/الصور/69ec42891e2af1a7abe3392b.webp",
  "/الصور/69ec4271fee419c1c278241f.webp",
  "/الصور/69ec42641e2af1a7abe3313f.webp",
  "/الصور/69ec424dcecd6aa2ac82c534.webp",
  "/الصور/69ec4243cecd6aa2ac82c2e1.webp",
  "/الصور/69ec422d1e2af1a7abe325aa.webp",
  "/الصور/69ec42031e2af1a7abe31cf1.webp",
  "/الصور/69ec4194fee419c1c277f790.webp",
];

const INFOGRAPHICS = [
  "/أنفوجرافيك/content(1).webp",
  "/أنفوجرافيك/content(2).webp",
  "/أنفوجرافيك/content(3).webp",
  "/أنفوجرافيك/content(4).webp",
  "/أنفوجرافيك/content(5).webp",
  "/أنفوجرافيك/content(7).webp",
  "/أنفوجرافيك/content(9).webp",
  "/أنفوجرافيك/content(10).webp",
  "/أنفوجرافيك/content(12).webp",
];

const AI_RESTAURANTS = [
  "/الصور المعتمدة تحتاج تعديلات - بوست انستقرام/flaminkey1 (1).webp",
  "/الصور المعتمدة تحتاج تعديلات - بوست انستقرام/عصائر.webp",
  "/الصور المعتمدة تحتاج تعديلات - بوست انستقرام/عصائر طازجة.webp",
  "/الصور المعتمدة تحتاج تعديلات - بوست انستقرام/عرايس لحم.webp",
  "/الصور المعتمدة تحتاج تعديلات - بوست انستقرام/طاولة مع أصدقاء.webp",
  "/الصور المعتمدة تحتاج تعديلات - بوست انستقرام/خبز لبناني.webp",
  "/الصور المعتمدة تحتاج تعديلات - بوست انستقرام/تبولة رمان.webp",
  "/الصور المعتمدة تحتاج تعديلات - بوست انستقرام/المناقيش السخنة 2.webp",
  "/الصور المعتمدة تحتاج تعديلات - بوست انستقرام/المناقيش الساخنة.webp",
  "/الصور المعتمدة تحتاج تعديلات - بوست انستقرام/أصدقاء.webp",
  "/الصور المعتمدة تحتاج تعديلات - بوست انستقرام/Ultra_realistic_lifestyle_202604182157.webp",
  "/الصور المعتمدة تحتاج تعديلات - بوست انستقرام/LEBANESE_COFFEE_—_202604100226.webp",
];

const TABS = [
  { id: "product", labelAr: "تحسين جودة المنتجات", labelEn: "Product Enhancement", images: PRODUCT_ENHANCEMENT },
  { id: "infographic", labelAr: "تصاميم إنفوجرافيك", labelEn: "Infographics", images: INFOGRAPHICS },
  { id: "ai-restaurants", labelAr: "تصوير AI للمطاعم", labelEn: "AI Restaurant Visuals", images: AI_RESTAURANTS },
];

export default function Portfolio() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [activeTab, setActiveTab] = useState("product");

  const activeImages = useMemo(
    () => TABS.find((t) => t.id === activeTab)?.images || [],
    [activeTab]
  );

  return (
    <section
      id="portfolio"
      style={{
        background: "#FFFFFF",
        padding: "90px 0 96px",
        position: "relative",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div style={{ textAlign: "center", marginBottom: "32px" }} dir={isRTL ? "rtl" : "ltr"}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(240,177,0,0.12)",
              border: "1px solid rgba(240,177,0,0.3)",
              borderRadius: "100px",
              padding: "6px 16px",
              marginBottom: "16px",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F0B100" }} />
            <span
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#F0B100",
              }}
            >
              {isRTL ? "أعمالنا" : "Portfolio"}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              color: "#1A1A1A",
              marginBottom: "12px",
            }}
          >
            {isRTL ? "مشاريع نفخر بها" : "Work We’re Proud Of"}
          </h2>
          <p style={{ color: "rgba(26,26,26,0.65)", fontSize: "16px", margin: 0 }}>
            {isRTL ? "عرض احترافي لأعمالنا مع تقسيم واضح حسب النوع" : "A clean showcase segmented by category"}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            marginBottom: "28px",
          }}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "100px",
                  border: `1px solid ${isActive ? "#F0B100" : "rgba(0,0,0,0.12)"}`,
                  background: isActive ? "#F0B100" : "#FFFFFF",
                  color: isActive ? "#1A1A1A" : "#1A1A1A",
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {isRTL ? tab.labelAr : tab.labelEn}
              </button>
            );
          })}
        </div>

        <div
          className="portfolio-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {activeImages.map((src, idx) => (
            <div
              key={`${activeTab}-${idx}`}
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={encodeURI(src)}
                alt={isRTL ? "عمل من أعمالنا" : "Portfolio item"}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: "4/3",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <a
            href="https://tf1one.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              color: "#F0B100",
              textDecoration: "none",
            }}
          >
            {isRTL ? "شوف المزيد من أعمالنا على tf1one.com" : "See more on tf1one.com"}
          </a>
        </div>
      </div>
    </section>
  );
}
