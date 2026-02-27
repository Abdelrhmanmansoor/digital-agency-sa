"use client";

import { useState, useCallback } from "react";
import { useLocale } from "next-intl";

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: number;
  buttonRadius: string;
  cardRadius: string;
}

const ARABIC_FONTS = [
  { name: "Noto Kufi Arabic", label: "نوتو كوفي (عصري)" },
  { name: "Noto Sans Arabic", label: "نوتو سانس (واضح)" },
  { name: "IBM Plex Arabic", label: "IBM بلكس (رسمي)" },
  { name: "Cairo", label: "القاهرة (أنيق)" },
  { name: "Tajawal", label: "تجوال (حديث)" },
];

export default function CSSGenerator({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [config, setConfig] = useState<ThemeConfig>({
    primaryColor: "#C8A962",
    secondaryColor: "#0A0A0A",
    bgColor: "#FFFFFF",
    textColor: "#1A1A1A",
    fontFamily: "Noto Kufi Arabic",
    fontSize: 16,
    buttonRadius: "0",
    cardRadius: "4",
  });
  const [copied, setCopied] = useState(false);

  const generateCSS = useCallback(() => {
    return `:root {
  --primary: ${config.primaryColor};
  --secondary: ${config.secondaryColor};
  --bg: ${config.bgColor};
  --text: ${config.textColor};
  --font: '${config.fontFamily}', sans-serif;
  --font-size-base: ${config.fontSize}px;
  --radius-btn: ${config.buttonRadius}px;
  --radius-card: ${config.cardRadius}px;
}

/* ===== الخلفية والألوان الأساسية ===== */
body {
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--font);
  font-size: var(--font-size-base);
}

/* ===== الأزرار ===== */
.btn,
.button--primary,
[type="submit"],
.checkout-button {
  background-color: var(--primary) !important;
  color: var(--secondary) !important;
  border-radius: var(--radius-btn) !important;
  border: 2px solid var(--primary) !important;
  transition: all 0.3s ease !important;
  font-family: var(--font) !important;
}

.btn:hover,
.button--primary:hover,
.checkout-button:hover {
  background-color: transparent !important;
  color: var(--primary) !important;
}

/* ===== بطاقات المنتجات ===== */
.product-card,
.product-item,
[data-product-card] {
  border-radius: var(--radius-card) !important;
  overflow: hidden !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
}

.product-card:hover,
.product-item:hover {
  transform: translateY(-4px) !important;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
}

/* ===== الهيدر ===== */
header,
.site-header,
[data-header] {
  background-color: var(--secondary) !important;
  color: #ffffff !important;
}

/* ===== الروابط ===== */
a:hover {
  color: var(--primary) !important;
}

/* ===== العنوان الرئيسي ===== */
h1, h2, h3 {
  font-family: var(--font) !important;
  font-weight: 700 !important;
}

/* ===== الأسعار ===== */
.price,
.product-price,
[data-price] {
  color: var(--primary) !important;
  font-weight: 700 !important;
}

/* ===== فاصل قسم اللون ===== */
.badge-sale,
.badge-new,
[data-badge] {
  background-color: var(--primary) !important;
  color: var(--secondary) !important;
  border-radius: 2px !important;
}

/* ===== شريط التقدم ===== */
.progress-bar,
[data-progress] {
  background-color: var(--primary) !important;
}

/* ===== الأيقونات والحدود ===== */
.icon,
.border-accent {
  color: var(--primary) !important;
  border-color: var(--primary) !important;
}`;
  }, [config]);

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        {/* Controls */}
        <div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#0A0A0A",
              marginBottom: "24px",
              fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif",
            }}
          >
            {isRTL ? "إعدادات الثيم" : "Theme Settings"}
          </h3>

          {/* Colors */}
          <div className="space-y-5 mb-8">
            <div>
              <label style={labelStyle}>{isRTL ? "اللون الرئيسي" : "Primary Color"}</label>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <input
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) => setConfig((p) => ({ ...p, primaryColor: e.target.value }))}
                  style={{ width: "48px", height: "48px", cursor: "pointer", border: "none", background: "none" }}
                />
                <input
                  type="text"
                  value={config.primaryColor}
                  onChange={(e) => setConfig((p) => ({ ...p, primaryColor: e.target.value }))}
                  className="form-input"
                  style={{ flex: 1, background: "#FAFAF7", color: "#0A0A0A", border: "1px solid #E8E6E1", fontFamily: "Space Mono, monospace" }}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>{isRTL ? "اللون الثانوي" : "Secondary Color"}</label>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <input
                  type="color"
                  value={config.secondaryColor}
                  onChange={(e) => setConfig((p) => ({ ...p, secondaryColor: e.target.value }))}
                  style={{ width: "48px", height: "48px", cursor: "pointer", border: "none", background: "none" }}
                />
                <input
                  type="text"
                  value={config.secondaryColor}
                  onChange={(e) => setConfig((p) => ({ ...p, secondaryColor: e.target.value }))}
                  className="form-input"
                  style={{ flex: 1, background: "#FAFAF7", color: "#0A0A0A", border: "1px solid #E8E6E1", fontFamily: "Space Mono, monospace" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>{isRTL ? "لون الخلفية" : "Background"}</label>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <input type="color" value={config.bgColor} onChange={(e) => setConfig((p) => ({ ...p, bgColor: e.target.value }))} style={{ width: "40px", height: "40px", cursor: "pointer", border: "none" }} />
                  <input type="text" value={config.bgColor} onChange={(e) => setConfig((p) => ({ ...p, bgColor: e.target.value }))} className="form-input" style={{ flex: 1, background: "#FAFAF7", color: "#0A0A0A", border: "1px solid #E8E6E1", fontFamily: "Space Mono" }} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>{isRTL ? "لون النص" : "Text Color"}</label>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <input type="color" value={config.textColor} onChange={(e) => setConfig((p) => ({ ...p, textColor: e.target.value }))} style={{ width: "40px", height: "40px", cursor: "pointer", border: "none" }} />
                  <input type="text" value={config.textColor} onChange={(e) => setConfig((p) => ({ ...p, textColor: e.target.value }))} className="form-input" style={{ flex: 1, background: "#FAFAF7", color: "#0A0A0A", border: "1px solid #E8E6E1", fontFamily: "Space Mono" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Font */}
          <div className="mb-6">
            <label style={labelStyle}>{isRTL ? "الخط" : "Font Family"}</label>
            <select
              value={config.fontFamily}
              onChange={(e) => setConfig((p) => ({ ...p, fontFamily: e.target.value }))}
              className="form-input"
              style={{ background: "#FAFAF7", color: "#0A0A0A", border: "1px solid #E8E6E1", cursor: "pointer" }}
            >
              {ARABIC_FONTS.map((f) => (
                <option key={f.name} value={f.name}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div className="mb-6">
            <label style={labelStyle}>
              {isRTL ? `حجم الخط: ${config.fontSize}px` : `Font Size: ${config.fontSize}px`}
            </label>
            <input
              type="range"
              min={13}
              max={20}
              value={config.fontSize}
              onChange={(e) => setConfig((p) => ({ ...p, fontSize: parseInt(e.target.value) }))}
              style={{ width: "100%", accentColor: "#C8A962" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#8C8C7A", fontFamily: "Space Mono" }}>
              <span>13px</span>
              <span>20px</span>
            </div>
          </div>

          {/* Button & Card Radius */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label style={labelStyle}>
                {isRTL ? `زوايا الأزرار: ${config.buttonRadius}px` : `Button Radius: ${config.buttonRadius}px`}
              </label>
              <input
                type="range"
                min={0}
                max={50}
                value={config.buttonRadius}
                onChange={(e) => setConfig((p) => ({ ...p, buttonRadius: e.target.value }))}
                style={{ width: "100%", accentColor: "#C8A962" }}
              />
            </div>
            <div>
              <label style={labelStyle}>
                {isRTL ? `زوايا البطاقات: ${config.cardRadius}px` : `Card Radius: ${config.cardRadius}px`}
              </label>
              <input
                type="range"
                min={0}
                max={20}
                value={config.cardRadius}
                onChange={(e) => setConfig((p) => ({ ...p, cardRadius: e.target.value }))}
                style={{ width: "100%", accentColor: "#C8A962" }}
              />
            </div>
          </div>

          {/* Preview Button */}
          <div
            style={{
              padding: "20px",
              background: config.bgColor,
              border: "1px solid #E8E6E1",
              marginTop: "16px",
            }}
          >
            <div style={{ fontSize: "11px", fontFamily: "Space Mono", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8C8C7A", marginBottom: "12px" }}>
              {isRTL ? "معاينة" : "Preview"}
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              <button
                style={{
                  background: config.primaryColor,
                  color: config.secondaryColor,
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: `${config.buttonRadius}px`,
                  fontFamily: config.fontFamily,
                  fontSize: `${config.fontSize}px`,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {isRTL ? "اشتري الآن" : "Buy Now"}
              </button>
              <div
                style={{
                  padding: "12px",
                  border: `1px solid #E8E6E1`,
                  borderRadius: `${config.cardRadius}px`,
                  background: config.bgColor,
                  color: config.textColor,
                  fontFamily: config.fontFamily,
                  fontSize: `${config.fontSize}px`,
                }}
              >
                <div style={{ fontSize: "13px", marginBottom: "4px" }}>{isRTL ? "اسم المنتج" : "Product Name"}</div>
                <div style={{ color: config.primaryColor, fontWeight: 700, fontSize: "18px" }}>150 {isRTL ? "ر.س" : "SAR"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Generated CSS */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#0A0A0A", fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif" }}>
              {isRTL ? "كود CSS المولّد" : "Generated CSS Code"}
            </h3>
            <button
              onClick={copyCSS}
              className="btn-primary"
              style={{ padding: "10px 20px", fontSize: "12px" }}
            >
              <span>{copied ? (isRTL ? "✓ تم النسخ!" : "✓ Copied!") : (isRTL ? "نسخ الكود" : "Copy Code")}</span>
            </button>
          </div>

          <pre
            style={{
              background: "#0A0A0A",
              color: "#E8D5A3",
              padding: "24px",
              fontSize: "12px",
              fontFamily: "Space Mono, monospace",
              lineHeight: 1.7,
              overflow: "auto",
              maxHeight: "500px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {generateCSS()}
          </pre>

          <div
            style={{
              marginTop: "16px",
              padding: "16px",
              background: "rgba(200,169,98,0.08)",
              border: "1px solid rgba(200,169,98,0.2)",
              fontSize: "13px",
              color: "#8C8C7A",
              fontFamily: isRTL ? "Noto Sans Arabic" : "sans-serif",
              lineHeight: 1.7,
            }}
          >
            {isRTL
              ? "📋 انسخ هذا الكود والصقه في: لوحة التحكم سلة > التصميم > إضافة CSS مخصص"
              : "📋 Copy this code and paste it in: Salla Dashboard > Design > Custom CSS"}
          </div>
        </div>
      </div>
    </div>
  );
}
