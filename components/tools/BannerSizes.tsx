"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

const BANNER_SIZES = [
  {
    category: "salla",
    categoryAr: "منصة سلة",
    items: [
      { name: "بنر الصفحة الرئيسية", nameEn: "Homepage Banner", width: 1440, height: 550, tips: "استخدم صورة عالية الجودة | ضع النص في المنتصف أو الجانب", tipsEn: "Use high quality image | Place text in center or side", canva: true },
      { name: "بنر تصنيف المنتجات", nameEn: "Category Banner", width: 1440, height: 350, tips: "أضف اسم التصنيف بوضوح | تجنب الصور المزدحمة", tipsEn: "Add category name clearly | Avoid cluttered images", canva: true },
      { name: "صورة المنتج الرئيسية", nameEn: "Product Main Image", width: 1000, height: 1000, tips: "صورة مربعة 1:1 | خلفية بيضاء أو محايدة | عالية الجودة", tipsEn: "Square 1:1 ratio | White or neutral background | High quality", canva: true },
      { name: "صور إضافية للمنتج", nameEn: "Additional Product Images", width: 1000, height: 1000, tips: "أظهر المنتج من زوايا مختلفة | استخدم نفس الأبعاد", tipsEn: "Show product from different angles | Use same dimensions", canva: false },
      { name: "لوجو المتجر", nameEn: "Store Logo", width: 400, height: 120, tips: "PNG شفاف | أبعاد مرنة بحسب التصميم", tipsEn: "Transparent PNG | Flexible dimensions based on design", canva: true },
      { name: "أيقونة المتجر / Favicon", nameEn: "Store Icon / Favicon", width: 512, height: 512, tips: "صورة مربعة | بسيطة وواضحة | PNG شفاف", tipsEn: "Square image | Simple and clear | Transparent PNG", canva: true },
      { name: "بنر العروض المنبثق", nameEn: "Popup Banner", width: 800, height: 500, tips: "رسالة واضحة ومختصرة | زر CTA واضح", tipsEn: "Clear and brief message | Clear CTA button", canva: true },
    ],
  },
  {
    category: "social",
    categoryAr: "السوشيال ميديا",
    items: [
      { name: "بوست انستقرام مربع", nameEn: "Instagram Square Post", width: 1080, height: 1080, tips: "الأنسب للبوستات العادية | استخدم ألوان متسقة مع هويتك", tipsEn: "Best for regular posts | Use consistent brand colors", canva: true },
      { name: "ستوري انستقرام/سناب", nameEn: "Instagram/Snap Story", width: 1080, height: 1920, tips: "ضع المحتوى في المنتصف | تجنب الزوايا التي تحجبها أيقونات التطبيق", tipsEn: "Place content in center | Avoid corners blocked by app icons", canva: true },
      { name: "تغطية ستوري انستقرام", nameEn: "Instagram Story Highlight Cover", width: 1080, height: 1080, tips: "تصميم بسيط ومعبّر | لون متسق مع هوية الحساب", tipsEn: "Simple and expressive design | Consistent with account identity", canva: true },
      { name: "بانر يوتيوب", nameEn: "YouTube Channel Art", width: 2560, height: 1440, tips: "المحتوى الآمن: 1546×423px وسط الصورة", tipsEn: "Safe area: 1546×423px in center", canva: true },
      { name: "صورة بروفايل تويتر/X", nameEn: "Twitter/X Profile Photo", width: 400, height: 400, tips: "مربعة تُعرض دائرية | استخدم اللوجو أو صورة واضحة", tipsEn: "Square displayed circular | Use logo or clear image", canva: false },
      { name: "بانر تويتر/X", nameEn: "Twitter/X Banner", width: 1500, height: 500, tips: "المحتوى الظاهر: وسط الصورة | حواف قد تُقطع على موبايل", tipsEn: "Visible content: center of image | Edges may be cut on mobile", canva: true },
      { name: "صورة تيكتوك", nameEn: "TikTok Video Cover", width: 1080, height: 1920, tips: "أضف كابشن جذاب في الثلث الأول | ألوان مشرقة تستقطب الانتباه", tipsEn: "Add compelling caption in first third | Bright colors attract attention", canva: false },
    ],
  },
];

export default function BannerSizes({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [activeCategory, setActiveCategory] = useState("salla");
  const [copiedSize, setCopiedSize] = useState<string | null>(null);

  const copySize = (size: { width: number; height: number; name: string; nameEn: string }) => {
    const text = `${isRTL ? size.name : size.nameEn}: ${size.width} × ${size.height}px`;
    navigator.clipboard.writeText(text);
    setCopiedSize(size.name);
    setTimeout(() => setCopiedSize(null), 1500);
  };

  const activeItems = BANNER_SIZES.find((b) => b.category === activeCategory)?.items || [];

  return (
    <div style={{ padding: "0 40px 40px" }}>
      {/* Category Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {BANNER_SIZES.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            style={{
              padding: "10px 24px",
              background: activeCategory === cat.category ? "#F0B100" : "transparent",
              border: "1px solid",
              borderColor: activeCategory === cat.category ? "#F0B100" : "#E8E6E1",
              color: activeCategory === cat.category ? "#0A0A0A" : "#8C8C7A",
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              fontSize: "14px",
              fontWeight: activeCategory === cat.category ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {isRTL ? cat.categoryAr : cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
          </button>
        ))}
      </div>

      {/* Sizes Grid */}
      <div className="space-y-3">
        {activeItems.map((item) => (
          <div
            key={item.name}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              gap: "16px",
              alignItems: "start",
              padding: "20px",
              background: "#FAFAF7",
              border: "1px solid #E8E6E1",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#F0B100"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E6E1"; }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#0A0A0A",
                  marginBottom: "4px",
                }}
              >
                {isRTL ? item.name : item.nameEn}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#8C8C7A",
                  lineHeight: 1.6,
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                }}
              >
                {isRTL ? item.tips : item.tipsEn}
              </div>
            </div>

            <div style={{ textAlign: "center", minWidth: "100px" }}>
              <div
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#F0B100",
                  lineHeight: 1,
                }}
              >
                {item.width} × {item.height}
              </div>
              <div style={{ fontSize: "10px", color: "#8C8C7A", fontFamily: "Space Mono", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>
                PX
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <button
                onClick={() => copySize(item)}
                style={{
                  padding: "6px 14px",
                  background: copiedSize === item.name ? "#4A8C6F" : "transparent",
                  border: "1px solid",
                  borderColor: copiedSize === item.name ? "#4A8C6F" : "#E8E6E1",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontFamily: "Space Mono",
                  color: copiedSize === item.name ? "#FFFFFF" : "#8C8C7A",
                  transition: "all 0.2s",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  whiteSpace: "nowrap",
                }}
              >
                {copiedSize === item.name ? "✓" : (isRTL ? "نسخ" : "Copy")}
              </button>
              {item.canva && (
                <a
                  href={`https://www.canva.com/design?width=${item.width}&height=${item.height}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "6px 14px",
                    background: "transparent",
                    border: "1px solid rgba(240,177,0,0.3)",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontFamily: "Space Mono",
                    color: "#F0B100",
                    textDecoration: "none",
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(240,177,0,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  Canva ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div
        style={{
          marginTop: "20px",
          padding: "16px",
          background: "rgba(240,177,0,0.08)",
          border: "1px solid rgba(240,177,0,0.2)",
          fontSize: "13px",
          color: "#8C8C7A",
          fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
          lineHeight: 1.7,
        }}
      >
        💡 {isRTL
          ? "نصيحة: صمّم دائماً بأبعاد أكبر (2x) للحصول على جودة أعلى على شاشات الرتينا. استخدم صيغة PNG للصور ذات الشفافية وJPG للصور الكاملة."
          : "Tip: Always design at larger dimensions (2x) for higher quality on retina displays. Use PNG for transparent images and JPG for full images."}
      </div>
    </div>
  );
}
