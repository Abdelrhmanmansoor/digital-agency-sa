"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

const CONTENT_IDEAS_AR: Record<string, string[]> = {
  fashion: [
    "قدّم منتجك الأكثر مبيعاً بأسلوب إبداعي", "نصائح تنسيق الملابس مع منتجاتك", "قصص عملاء راضين مع صورهم",
    "ريلز: 3 طرق لتنسيق نفس القطعة", "استطلاع: أي لون تفضل؟", "خلف الكواليس: كيف نختار منتجاتنا",
    "نصيحة الأسبوع: العناية بالملابس", "إعلان عرض خاص مع مؤقت عد تنازلي", "بوست تعريفي: من نحن؟",
    "مقارنة: منتجنا vs البدائل الأخرى", "كيف تختار مقاسك الصحيح؟", "عرض الكواليس من مستودعنا",
    "بوست شكر وعيد ميلاد المتجر", "10 طرق لتبديل لوك الصباح بسرعة", "فيديو تغليف الطلبيات",
    "تصويت: أي تصميم تختار للكولكشن الجديد؟", "نصائح التسوق الذكي", "عملاؤنا يتحدثون",
    "خصم يوم الجمعة الخاص", "كولكشن جديد — استعداد للإطلاق",
    "ريلز: OOTD مع منتجاتنا", "بوست تعليمي: أنواع الأقمشة", "لقطات من فوتوشوت المنتجات",
    "مسابقة: شارك صورتك واربح", "إعلان وصول شحنة جديدة", "نصائح الإيكو: كيف تعيد استخدام ملابسك",
    "بوست ترفيهي: أخطاء في اختيار الملابس", "عرض حزمة: اشتري 2 واحصل على خصم",
  ],
  food: [
    "وصفة سريعة تستخدم منتجاتنا", "قصة صباح مثالي مع منتجاتنا", "10 فوائد صحية لمنتجنا",
    "بوست تعليمي: كيف تختار الأجود؟", "تصويت: ما وجبتك المفضلة؟", "لقطات من مطبخنا/مصنعنا",
    "شهادة عميل راضٍ", "مقارنة: طبيعي vs مصنّع", "وصول منتج جديد",
    "خلف الكواليس: قصة منتجنا", "نصائح التخزين الصحيح", "عرض خاص نهاية الأسبوع",
    "مسابقة: أفضل وصفة", "حقائق مذهلة عن منتجاتنا", "من نحن؟ قصة الكواليس",
    "ريلز: طريقة تحضير سريعة", "منتج الشهر بسعر مميز", "دليل التغذية الصحية",
    "استطلاع: ماذا تريد أن نضيف؟", "تغليف صديق للبيئة — قصتنا",
    "بوست عيد الأضحى / رمضان", "شراكات مع مطاعم محلية", "إطلاق منتج جديد",
    "مقاطع تعليمية صحية قصيرة", "قصص عملاء ملهمة", "نصائح للمتسوقين الصحيين",
    "عرض باقة الأسرة", "خلف الكواليس: فريقنا", "فيديو شحن وتوصيل الطلبات",
  ],
};

const PLATFORMS = [
  { value: "instagram", label: "انستقرام", labelEn: "Instagram", icon: "📸" },
  { value: "tiktok", label: "تيكتوك", labelEn: "TikTok", icon: "🎵" },
  { value: "twitter", label: "تويتر/X", labelEn: "Twitter/X", icon: "🐦" },
  { value: "snapchat", label: "سناب شات", labelEn: "Snapchat", icon: "👻" },
];

const POST_TYPES = ["صورة", "فيديو", "ريلز", "ستوري", "كاروسيل"];
const POST_TYPES_EN = ["Photo", "Video", "Reels", "Story", "Carousel"];

const BEST_TIMES_AR: Record<string, string> = {
  instagram: "صباحاً: 7-9 | ظهراً: 12-1 | مساءً: 7-9",
  tiktok: "صباحاً: 9-10 | مساءً: 6-8 | ليلاً: 10-11",
  twitter: "صباحاً: 8-9 | ظهراً: 1-2 | مساءً: 6-7",
  snapchat: "مساءً: 7-9 | ليلاً: 10-11",
};

export default function ContentPlanner({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [storeType, setStoreType] = useState("fashion");
  const [platform, setPlatform] = useState("instagram");
  const [postsPerWeek, setPostsPerWeek] = useState(3);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const ideas = (CONTENT_IDEAS_AR[storeType] || CONTENT_IDEAS_AR.fashion).slice(0, 30);
  const postsPerMonth = postsPerWeek * 4;

  const generateCalendar = () => setGenerated(true);

  const calendarData = ideas.slice(0, postsPerMonth).map((idea, i) => ({
    day: i + 1,
    idea,
    type: POST_TYPES[i % POST_TYPES.length],
    typeEn: POST_TYPES_EN[i % POST_TYPES_EN.length],
  }));

  const copyPlan = () => {
    const text = calendarData.map((d) => `يوم ${d.day}: ${d.idea} (${d.type})`).join("\n");
    navigator.clipboard.writeText(text);
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
      {/* Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label style={labelStyle}>{isRTL ? "نوع المتجر" : "Store Type"}</label>
          <select
            value={storeType}
            onChange={(e) => setStoreType(e.target.value)}
            className="form-input"
            style={{ background: "#FAFAF7", color: "#0A0A0A", border: "1px solid #E8E6E1" }}
          >
            <option value="fashion">{isRTL ? "أزياء وملابس" : "Fashion"}</option>
            <option value="food">{isRTL ? "طعام ومنتجات" : "Food & Products"}</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>{isRTL ? "المنصة" : "Platform"}</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="form-input"
            style={{ background: "#FAFAF7", color: "#0A0A0A", border: "1px solid #E8E6E1" }}
          >
            {PLATFORMS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.icon} {isRTL ? p.label : p.labelEn}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>
            {isRTL ? `بوستات الأسبوع: ${postsPerWeek}` : `Posts per Week: ${postsPerWeek}`}
          </label>
          <input
            type="range"
            min={1}
            max={7}
            value={postsPerWeek}
            onChange={(e) => setPostsPerWeek(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: "#C8A962", marginTop: "12px" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#8C8C7A", fontFamily: "Space Mono", marginTop: "4px" }}>
            <span>1</span><span>7</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button onClick={generateCalendar} className="btn-primary">
          <span>🗓 {isRTL ? "أنشئ الخطة" : "Generate Plan"}</span>
        </button>
        {generated && (
          <button
            onClick={copyPlan}
            style={{
              padding: "16px 32px",
              background: copied ? "#4A8C6F" : "transparent",
              border: "1px solid",
              borderColor: copied ? "#4A8C6F" : "#E8E6E1",
              cursor: "pointer",
              fontFamily: "Space Mono, monospace",
              fontSize: "12px",
              letterSpacing: "0.1em",
              color: copied ? "#FFFFFF" : "#8C8C7A",
              textTransform: "uppercase",
              transition: "all 0.3s",
            }}
          >
            {copied ? (isRTL ? "✓ تم النسخ!" : "✓ Copied!") : (isRTL ? "نسخ الخطة" : "Copy Plan")}
          </button>
        )}
      </div>

      {generated && (
        <>
          {/* Best Times */}
          <div
            style={{
              padding: "16px 20px",
              background: "rgba(200,169,98,0.08)",
              border: "1px solid rgba(200,169,98,0.2)",
              marginBottom: "24px",
              display: "flex",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "20px" }}>⏰</span>
            <div>
              <div style={{ fontFamily: "Space Mono", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C8A962", marginBottom: "4px" }}>
                {isRTL ? "أفضل أوقات النشر" : "Best Posting Times"}
              </div>
              <div style={{ fontSize: "14px", color: "#2D2D2D", fontFamily: "'Zain', sans-serif" }}>
                {BEST_TIMES_AR[platform]}
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px", maxHeight: "500px", overflow: "auto" }}>
            {calendarData.map((item) => (
              <div
                key={item.day}
                style={{
                  padding: "16px",
                  background: "#FAFAF7",
                  border: "1px solid #E8E6E1",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8A962"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E6E1"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "Space Mono, monospace", fontSize: "13px", fontWeight: 700, color: "#C8A962" }}>
                    {isRTL ? `اليوم ${item.day}` : `Day ${item.day}`}
                  </span>
                  <span
                    style={{
                      padding: "2px 8px",
                      background: "rgba(200,169,98,0.1)",
                      border: "1px solid rgba(200,169,98,0.2)",
                      fontSize: "10px",
                      fontFamily: "Space Mono",
                      color: "#C8A962",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {isRTL ? item.type : item.typeEn}
                  </span>
                </div>
                <div style={{ fontSize: "14px", color: "#2D2D2D", lineHeight: 1.6, fontFamily: "'Zain', sans-serif" }}>
                  {item.idea}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "16px", textAlign: "center", color: "#8C8C7A", fontSize: "13px" }}>
            {isRTL
              ? `إجمالي: ${postsPerMonth} بوست لشهر كامل على ${PLATFORMS.find(p => p.value === platform)?.label}`
              : `Total: ${postsPerMonth} posts for a full month on ${PLATFORMS.find(p => p.value === platform)?.labelEn}`}
          </div>
        </>
      )}
    </div>
  );
}
