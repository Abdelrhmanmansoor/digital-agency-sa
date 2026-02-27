"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

const NAME_POOLS = {
  fashion_ar: ["الأناقة", "الستايل", "الرقي", "المود", "الفاشن", "الشيك", "الكلاس", "الفخامة", "الجمال", "النعمة"],
  fashion_en: ["Elegance", "Luxe", "Chic", "Vogue", "Glam", "Style", "Couture", "Mode", "Drip", "Posh"],
  tech_ar: ["تقني", "ديجيتال", "نكست", "سمارت", "إيناولود", "ذكي", "تك", "إنوف", "بلس", "برو"],
  tech_en: ["TechHub", "Nexus", "Digital", "Smart", "Innovate", "Pixel", "Code", "DataFlow", "ByteBox", "TechVault"],
  food_ar: ["المذاق", "الشهي", "الأصيل", "الطيب", "الحلو", "البيت", "الصحي", "الطبيعي", "الذهبي", "الوفير"],
  food_en: ["Savory", "Delight", "Yummy", "Fresh", "Harvest", "Taste", "Fusion", "Organic", "Pure", "Natural"],
  beauty_ar: ["الجمال", "السحر", "الرونق", "الإشراق", "اللمسة", "النقاء", "الإطار", "السيرين", "البريق", "الأثير"],
  beauty_en: ["Glow", "Radiance", "Bloom", "Pure", "Lush", "Serenity", "Essence", "Luxe", "Grace", "Clarity"],
  jewelry_ar: ["الجوهر", "اللمعة", "الذهب", "الياقوت", "النفيس", "الدر", "الثمين", "البريق", "الألماس", "الزمرد"],
  jewelry_en: ["Gem", "Luxe", "Jewel", "Crystal", "Diamond", "Gold", "Ruby", "Sapphire", "Pearl", "Opal"],
};

const SUFFIXES_AR = ["ستور", "شوب", "مارت", "بلس", "برو", "ون", "كو", "سا", "مول"];
const SUFFIXES_EN = ["Store", "Shop", "Hub", "Plus", "Pro", "One", "Co", "SA", "Mall"];

function generateNames(category: string, style: string, language: string): string[] {
  const isAr = language === "ar" || language === "mixed";
  const pool = NAME_POOLS[`${category}_${isAr ? "ar" : "en"}` as keyof typeof NAME_POOLS]
    || NAME_POOLS.fashion_ar;

  const names: string[] = [];
  const used = new Set<string>();

  for (let i = 0; i < 20 && names.length < 20; i++) {
    const base = pool[Math.floor(Math.random() * pool.length)];
    const suffix = isAr
      ? SUFFIXES_AR[Math.floor(Math.random() * SUFFIXES_AR.length)]
      : SUFFIXES_EN[Math.floor(Math.random() * SUFFIXES_EN.length)];

    const combinations = [
      base,
      `${base} ${suffix}`,
      `${suffix}${base}`,
    ];

    // Add mixed names
    if (language === "mixed") {
      const en = NAME_POOLS[`${category}_en` as keyof typeof NAME_POOLS] || NAME_POOLS.fashion_en;
      const enBase = en[Math.floor(Math.random() * en.length)];
      combinations.push(`${enBase} | ${base}`);
    }

    for (const name of combinations) {
      if (!used.has(name) && names.length < 20) {
        used.add(name);
        names.push(name);
      }
    }
  }

  return names.slice(0, 20);
}

const CATEGORIES = [
  { value: "fashion", labelAr: "أزياء وملابس", labelEn: "Fashion & Clothing", icon: "👗" },
  { value: "tech", labelAr: "إلكترونيات وتقنية", labelEn: "Electronics & Tech", icon: "💻" },
  { value: "food", labelAr: "طعام وأكل", labelEn: "Food & Beverages", icon: "🍽️" },
  { value: "beauty", labelAr: "جمال وعناية", labelEn: "Beauty & Skincare", icon: "💄" },
  { value: "jewelry", labelAr: "مجوهرات وإكسسوار", labelEn: "Jewelry & Accessories", icon: "💎" },
];

export default function NameGenerator({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [category, setCategory] = useState("fashion");
  const [nameLanguage, setNameLanguage] = useState("ar");
  const [names, setNames] = useState<string[]>([]);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [checkedDomains, setCheckedDomains] = useState<Record<string, boolean>>({});

  const generate = () => {
    const generated = generateNames(category, "modern", nameLanguage);
    setNames(generated);
    setCheckedDomains({});
  };

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 1500);
  };

  const checkDomain = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "").replace(/\s+/g, "-");
    // Open domain checkers
    window.open(`https://www.godaddy.com/domainsearch/find?domainToCheck=${slug}`, "_blank");
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontFamily: "Space Mono, monospace",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#8C8C7A",
    marginBottom: "8px",
  };

  return (
    <div style={{ padding: "0 40px 40px" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings */}
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#0A0A0A", marginBottom: "20px", fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif" }}>
            {isRTL ? "إعدادات المتجر" : "Store Settings"}
          </h3>

          <div className="space-y-6">
            <div>
              <label style={labelStyle}>{isRTL ? "نوع المتجر" : "Store Type"}</label>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    style={{
                      padding: "12px",
                      background: category === cat.value ? "rgba(200,169,98,0.15)" : "#FAFAF7",
                      border: "1px solid",
                      borderColor: category === cat.value ? "#C8A962" : "#E8E6E1",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s",
                      fontSize: "13px",
                      fontFamily: isRTL ? "Noto Sans Arabic" : "sans-serif",
                      color: category === cat.value ? "#C8A962" : "#2D2D2D",
                    }}
                  >
                    <div style={{ fontSize: "24px", marginBottom: "4px" }}>{cat.icon}</div>
                    <div>{isRTL ? cat.labelAr : cat.labelEn}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>{isRTL ? "لغة الاسم" : "Name Language"}</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { value: "ar", labelAr: "عربي", labelEn: "Arabic" },
                  { value: "en", labelAr: "إنجليزي", labelEn: "English" },
                  { value: "mixed", labelAr: "مزيج", labelEn: "Mixed" },
                ].map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => setNameLanguage(lang.value)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: nameLanguage === lang.value ? "#C8A962" : "transparent",
                      border: "1px solid",
                      borderColor: nameLanguage === lang.value ? "#C8A962" : "#E8E6E1",
                      color: nameLanguage === lang.value ? "#0A0A0A" : "#8C8C7A",
                      fontFamily: isRTL ? "Noto Sans Arabic" : "sans-serif",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {isRTL ? lang.labelAr : lang.labelEn}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={generate} className="btn-primary mt-8" style={{ width: "100%", justifyContent: "center" }}>
            <span>🏷 {isRTL ? "أنشئ أسماء" : "Generate Names"}</span>
          </button>
        </div>

        {/* Results */}
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#0A0A0A", marginBottom: "20px", fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif" }}>
            {isRTL ? "20 اقتراح اسم" : "20 Name Suggestions"}
          </h3>

          {names.length > 0 ? (
            <div className="space-y-2" style={{ maxHeight: "450px", overflow: "auto" }}>
              {names.map((name, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    background: "#FAFAF7",
                    border: "1px solid #E8E6E1",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8A962"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E6E1"; }}
                >
                  <span
                    style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "11px",
                      color: "#C8A962",
                      minWidth: "24px",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#0A0A0A",
                    }}
                  >
                    {name}
                  </span>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => copyName(name)}
                      style={{
                        padding: "4px 10px",
                        background: copiedName === name ? "#4A8C6F" : "transparent",
                        border: "1px solid",
                        borderColor: copiedName === name ? "#4A8C6F" : "#E8E6E1",
                        cursor: "pointer",
                        fontSize: "10px",
                        fontFamily: "Space Mono",
                        color: copiedName === name ? "#FFFFFF" : "#8C8C7A",
                        transition: "all 0.2s",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {copiedName === name ? "✓" : (isRTL ? "نسخ" : "Copy")}
                    </button>
                    <button
                      onClick={() => checkDomain(name)}
                      title={isRTL ? "تحقق من النطاق" : "Check domain"}
                      style={{
                        padding: "4px 10px",
                        background: "transparent",
                        border: "1px solid #E8E6E1",
                        cursor: "pointer",
                        fontSize: "10px",
                        fontFamily: "Space Mono",
                        color: "#8C8C7A",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8A962"; e.currentTarget.style.color = "#C8A962"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E6E1"; e.currentTarget.style.color = "#8C8C7A"; }}
                    >
                      .COM
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "60px 20px", textAlign: "center", border: "1px dashed #E8E6E1", color: "#8C8C7A" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏷</div>
              <div style={{ fontFamily: isRTL ? "Noto Sans Arabic" : "sans-serif", fontSize: "15px" }}>
                {isRTL ? "اختر نوع المتجر واضغط 'أنشئ أسماء'" : "Select store type and press 'Generate Names'"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
