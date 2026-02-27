"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

interface ContentInputs {
  productName: string;
  productDescription: string;
  targetAudience: string;
  contentType: string;
}

type ContentType = "product_desc" | "instagram" | "tweet" | "whatsapp" | "email";

const CONTENT_TYPES: { value: ContentType; labelAr: string; labelEn: string }[] = [
  { value: "product_desc", labelAr: "وصف المنتج", labelEn: "Product Description" },
  { value: "instagram", labelAr: "بوست انستقرام", labelEn: "Instagram Post" },
  { value: "tweet", labelAr: "تغريدة تويتر/X", labelEn: "Twitter/X Tweet" },
  { value: "whatsapp", labelAr: "رسالة واتساب", labelEn: "WhatsApp Message" },
  { value: "email", labelAr: "بريد تسويقي", labelEn: "Marketing Email" },
];

// Local content generation (no API needed)
function generateLocalContent(inputs: ContentInputs, type: ContentType, locale: string): string[] {
  const isAr = locale === "ar";
  const { productName, productDescription, targetAudience } = inputs;
  const name = productName || (isAr ? "المنتج" : "Product");
  const desc = productDescription || (isAr ? "منتج متميز" : "A premium product");
  const audience = targetAudience || (isAr ? "العملاء المميزون" : "Premium customers");

  if (type === "product_desc") {
    return isAr ? [
      `✨ ${name}\n\n${desc}\n\nلماذا تختاره؟\n• جودة استثنائية لا مثيل لها\n• مناسب تماماً لـ${audience}\n• تجربة تسوق راقية من البداية حتى النهاية\n\nاطلبه الآن واستمتع بتجربة مختلفة تماماً 🛒`,
      `🌟 اكتشف ${name}\n\n${desc}\n\nنحن لا نبيع مجرد منتج — نقدم تجربة متكاملة لـ${audience} الذين يستحقون الأفضل.\n\n✅ جودة مضمونة\n✅ توصيل سريع\n✅ دعم عملاء 24/7\n\nلا تفوّت الفرصة! 💎`,
      `💫 ${name} — الخيار الأمثل\n\n${desc}\n\nخصيصاً لـ${audience} الذين يقدّرون التميز والجودة.\n\n🎯 منتج مُصمَّم ليكون الأول في فئته\n📦 يصلك في أسرع وقت\n💯 ضمان الرضا التام\n\nاكتشف الفرق بنفسك! ✨`,
    ] : [
      `✨ ${name}\n\n${desc}\n\nWhy choose it?\n• Exceptional quality\n• Perfect for ${audience}\n• Premium shopping experience from start to finish\n\nOrder now and experience the difference 🛒`,
      `🌟 Discover ${name}\n\n${desc}\n\nWe don't just sell a product — we deliver a complete experience for ${audience} who deserve the best.\n\n✅ Quality guaranteed\n✅ Fast delivery\n✅ 24/7 customer support\n\nDon't miss out! 💎`,
      `💫 ${name} — The Perfect Choice\n\n${desc}\n\nSpecially for ${audience} who value excellence.\n\n🎯 Designed to be first in its class\n📦 Delivered fast\n💯 Satisfaction guaranteed\n\nExperience the difference! ✨`,
    ];
  }

  if (type === "instagram") {
    return isAr ? [
      `✨ ${name} — لأنك تستحق الأفضل\n\n${desc}\n\nمتوفر الآن! اضغط على الرابط في البايو 🔗\n\n#${name.replace(/\s/g, "")} #متجر_الكتروني #تسوق_عبر_الانترنت #${audience.replace(/\s/g, "")}`,
      `💎 لمحبي التميز فقط!\n\n${name} — ${desc}\n\nلأن اختياراتك تعكس شخصيتك 🌟\n\nاطلبه الآن ✨\n\n#جودة #تميز #${name.replace(/\s/g, "")} #تسوق`,
      `🛍️ وصل! ${name}\n\n${desc}\n\nمحدود — اطلب قبل النفاد ⚡\n\n..\n..\n#${name.replace(/\s/g, "")} #وصل_جديد #متجر`,
    ] : [
      `✨ ${name} — Because You Deserve the Best\n\n${desc}\n\nAvailable now! Click the link in bio 🔗\n\n#${name.replace(/\s/g, "")} #OnlineShopping #NewArrival`,
      `💎 For excellence lovers only!\n\n${name} — ${desc}\n\nBecause your choices reflect your personality 🌟\n\nOrder now ✨\n\n#Quality #Premium #${name.replace(/\s/g, "")}`,
      `🛍️ New! ${name}\n\n${desc}\n\nLimited stock — Order before it's gone ⚡\n\n#${name.replace(/\s/g, "")} #NewIn #Shop`,
    ];
  }

  if (type === "tweet") {
    return isAr ? [
      `${name} وصل أخيراً! 🎉\n\n${desc}\n\n${audience} — هذا لكم خصيصاً 💎\n\nاطلب الآن 👇`,
      `كنت تبحث عن ${name}؟ 🤔\n\nلا تبحث أكثر — ${desc}\n\nمتوفر الآن! ⚡`,
      `تقدر تحكم على جودتنا من أول منتج 💯\n\n${name} — ${desc}\n\nجرّب وأخبرنا رأيك! 🌟`,
    ] : [
      `${name} is finally here! 🎉\n\n${desc}\n\nFor ${audience} — this is for you 💎\n\nOrder now 👇`,
      `Looking for ${name}? 🤔\n\nLook no further — ${desc}\n\nAvailable now! ⚡`,
      `Judge our quality from the first product 💯\n\n${name} — ${desc}\n\nTry it and tell us! 🌟`,
    ];
  }

  if (type === "whatsapp") {
    return isAr ? [
      `السلام عليكم! 😊\n\nأردنا نخبركم بوصول ${name} الجديد!\n\n${desc}\n\nمناسب تماماً لـ${audience}.\n\n💰 بسعر مميز لفترة محدودة\n📦 توصيل سريع\n\nللطلب: [رابط المتجر] أو ردوا على هذه الرسالة! 🛒`,
      `أهلاً وسهلاً! 🌟\n\nعندنا خبر سار — ${name} متوفر الآن!\n\n${desc}\n\nنفكر انك ستحبه لأنك من ${audience} المميزين 😊\n\nتفاصيل أكثر؟ رد هنا أو زور متجرنا! 📱`,
      `مرحباً! 👋\n\n${name} وصل!\n\n${desc}\n\nسعر الإطلاق لفترة محدودة 🎉\n\nاطلب الآن قبل النفاد! للتواصل: رد هنا ✅`,
    ] : [
      `Hello! 😊\n\nWe want to let you know about our new ${name}!\n\n${desc}\n\nPerfect for ${audience}.\n\n💰 Special price for limited time\n📦 Fast delivery\n\nTo order: [Store link] or reply to this message! 🛒`,
      `Hi there! 🌟\n\nGreat news — ${name} is now available!\n\n${desc}\n\nWe think you'll love it! 😊\n\nMore details? Reply here or visit our store! 📱`,
      `Hey! 👋\n\n${name} just arrived!\n\n${desc}\n\nLaunch price for limited time 🎉\n\nOrder now before it's gone! Reply here ✅`,
    ];
  }

  // email
  return isAr ? [
    `الموضوع: وصل أخيراً — ${name}!\n\nعزيزي العميل،\n\nيسعدنا إعلامكم بتوفر ${name} في متجرنا.\n\n${desc}\n\nهذا المنتج صُمِّم خصيصاً لـ${audience} الذين يقدّرون الجودة والتميز.\n\n✅ جودة مضمونة\n✅ سعر تنافسي\n✅ توصيل سريع\n✅ خدمة عملاء ممتازة\n\n[زر الشراء الآن]\n\nلأي استفسار، لا تترددوا في التواصل معنا.\n\nمع تحياتنا`,
    `الموضوع: عرض خاص لك — ${name}\n\nأهلاً،\n\nبصفتك أحد عملائنا المميزين، نريد أن نشاركك هذا العرض الحصري.\n\n${name} متوفر الآن:\n\n${desc}\n\nمتوفر لفترة محدودة فقط. لا تفوّت هذه الفرصة!\n\n[اكتشف المزيد]\n\nشكراً لثقتك بنا ❤️`,
  ] : [
    `Subject: Finally Available — ${name}!\n\nDear Customer,\n\nWe're excited to announce that ${name} is now available in our store.\n\n${desc}\n\nDesigned specifically for ${audience} who value quality.\n\n✅ Quality guaranteed\n✅ Competitive price\n✅ Fast delivery\n✅ Excellent customer service\n\n[Shop Now Button]\n\nFor any questions, don't hesitate to contact us.\n\nBest regards`,
    `Subject: Special Offer for You — ${name}\n\nHi,\n\nAs one of our valued customers, we want to share this exclusive offer.\n\n${name} is now available:\n\n${desc}\n\nAvailable for a limited time only. Don't miss this opportunity!\n\n[Learn More]\n\nThank you for your trust ❤️`,
  ];
}

const HASHTAGS_AR = ["#سلة", "#متجر_الكتروني", "#تسوق", "#عروض", "#جديد", "#منتجات"];
const HASHTAGS_EN = ["#OnlineShopping", "#Ecommerce", "#NewArrival", "#Sale", "#Shop"];

export default function ContentWriter({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [inputs, setInputs] = useState<ContentInputs>({
    productName: "",
    productDescription: "",
    targetAudience: "",
    contentType: "product_desc",
  });
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = async () => {
    setIsLoading(true);
    // Simulate a brief delay
    await new Promise((r) => setTimeout(r, 800));
    const content = generateLocalContent(inputs, inputs.contentType as ContentType, locale);
    setResults(content);
    setIsLoading(false);
  };

  const copyContent = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontFamily: "Space Mono, monospace",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#8C8C7A",
    marginBottom: "6px",
  };

  return (
    <div style={{ padding: "0 40px 40px" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#0A0A0A", marginBottom: "20px", "'Zain', sans-serif" }}>
            {isRTL ? "تفاصيل المنتج" : "Product Details"}
          </h3>

          <div className="space-y-4">
            <div>
              <label style={labelStyle}>{isRTL ? "اسم المنتج" : "Product Name"}</label>
              <input
                type="text"
                placeholder={isRTL ? "مثال: عطر الورد الذهبي" : "e.g., Golden Rose Perfume"}
                value={inputs.productName}
                onChange={(e) => setInputs((p) => ({ ...p, productName: e.target.value }))}
                className="form-input"
                style={{ background: "#FAFAF7", color: "#0A0A0A", border: "1px solid #E8E6E1" }}
              />
            </div>

            <div>
              <label style={labelStyle}>{isRTL ? "وصف مختصر / مميزات" : "Brief Description / Features"}</label>
              <textarea
                placeholder={isRTL ? "مثال: عطر فاخر بمكونات طبيعية، رائحة تدوم 12 ساعة..." : "e.g., Luxury perfume with natural ingredients, 12-hour lasting scent..."}
                value={inputs.productDescription}
                onChange={(e) => setInputs((p) => ({ ...p, productDescription: e.target.value }))}
                className="form-input"
                rows={3}
                style={{ background: "#FAFAF7", color: "#0A0A0A", border: "1px solid #E8E6E1", resize: "vertical" }}
              />
            </div>

            <div>
              <label style={labelStyle}>{isRTL ? "الفئة المستهدفة" : "Target Audience"}</label>
              <input
                type="text"
                placeholder={isRTL ? "مثال: محبي العطور الفاخرة" : "e.g., Luxury perfume lovers"}
                value={inputs.targetAudience}
                onChange={(e) => setInputs((p) => ({ ...p, targetAudience: e.target.value }))}
                className="form-input"
                style={{ background: "#FAFAF7", color: "#0A0A0A", border: "1px solid #E8E6E1" }}
              />
            </div>

            <div>
              <label style={labelStyle}>{isRTL ? "نوع المحتوى" : "Content Type"}</label>
              <select
                value={inputs.contentType}
                onChange={(e) => setInputs((p) => ({ ...p, contentType: e.target.value }))}
                className="form-input"
                style={{ background: "#FAFAF7", color: "#0A0A0A", border: "1px solid #E8E6E1", cursor: "pointer" }}
              >
                {CONTENT_TYPES.map((ct) => (
                  <option key={ct.value} value={ct.value}>
                    {isRTL ? ct.labelAr : ct.labelEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={generate}
            disabled={isLoading}
            className="btn-primary mt-6"
            style={{ width: "100%", justifyContent: "center", opacity: isLoading ? 0.7 : 1 }}
          >
            <span>
              {isLoading
                ? (isRTL ? "⏳ جاري الكتابة..." : "⏳ Generating...")
                : `✍️ ${isRTL ? "أنشئ المحتوى" : "Generate Content"}`}
            </span>
          </button>

          {/* Suggested Hashtags */}
          <div style={{ marginTop: "24px" }}>
            <label style={labelStyle}>{isRTL ? "هاشتاقات مقترحة" : "Suggested Hashtags"}</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {(isRTL ? HASHTAGS_AR : HASHTAGS_EN).map((tag) => (
                <span
                  key={tag}
                  onClick={() => navigator.clipboard.writeText(tag)}
                  style={{
                    padding: "4px 10px",
                    background: "rgba(200,169,98,0.1)",
                    border: "1px solid rgba(200,169,98,0.2)",
                    color: "#C8A962",
                    fontSize: "12px",
                    fontFamily: "Space Mono",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,169,98,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(200,169,98,0.1)"; }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#0A0A0A", marginBottom: "20px", "'Zain', sans-serif" }}>
            {isRTL ? "النسخ المُنشأة (3 نسخ)" : "Generated Versions (3 Copies)"}
          </h3>

          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((text, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #E8E6E1",
                    background: "#FAFAF7",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "10px 16px",
                      background: "#F0EDE8",
                      borderBottom: "1px solid #E8E6E1",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Space Mono, monospace",
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#8C8C7A",
                      }}
                    >
                      {isRTL ? `نسخة ${index + 1}` : `Version ${index + 1}`}
                    </span>
                    <button
                      onClick={() => copyContent(text, index)}
                      style={{
                        background: copiedIndex === index ? "#4A8C6F" : "transparent",
                        border: "1px solid",
                        borderColor: copiedIndex === index ? "#4A8C6F" : "#E8E6E1",
                        padding: "4px 12px",
                        fontSize: "11px",
                        fontFamily: "Space Mono, monospace",
                        letterSpacing: "0.1em",
                        cursor: "pointer",
                        color: copiedIndex === index ? "#FFFFFF" : "#8C8C7A",
                        transition: "all 0.2s",
                        textTransform: "uppercase",
                      }}
                    >
                      {copiedIndex === index ? (isRTL ? "✓ تم" : "✓ Done") : (isRTL ? "نسخ" : "Copy")}
                    </button>
                  </div>
                  <div
                    style={{
                      padding: "16px",
                      whiteSpace: "pre-wrap",
                      fontSize: "14px",
                      lineHeight: 1.8,
                      color: "#2D2D2D",
                      "'Zain', sans-serif",
                    }}
                  >
                    {text}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "60px 20px", textAlign: "center", border: "1px dashed #E8E6E1", color: "#8C8C7A" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✍️</div>
              <div style={{ "'Zain', sans-serif", fontSize: "15px" }}>
                {isRTL ? "أدخل تفاصيل منتجك واضغط 'أنشئ المحتوى'" : "Enter your product details and press 'Generate Content'"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
