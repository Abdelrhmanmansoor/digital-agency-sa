"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { WHATSAPP_NUMBER, getWhatsAppLink } from "@/lib/utils";
import PaymentLogos from "@/components/shared/PaymentLogos";

/* ─── Types ─────────────────────────────────────────────── */
interface Product {
  id: number;
  category: "salla" | "design" | "marketing" | "web";
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  isMonthly?: boolean;
  badge?: string;
  badgeColor?: string;
  features: string[];
  delivery?: string;
  rating: number;
  reviewCount: number;
  popular?: boolean;
}

/* ─── Products Data ──────────────────────────────────────── */
const PRODUCTS: Product[] = [
  {
    id: 1,
    category: "salla",
    name: "تصميم ثيم سلة مخصص",
    description: "ثيم سلة احترافي مصمم من الصفر يعكس هوية علامتك التجارية بالكامل ويضاعف مبيعاتك.",
    price: 1499,
    originalPrice: 6500,
    badge: "الأكثر طلباً",
    badgeColor: "#BDEE63",
    features: [
      "تصميم UI/UX مخصص من الصفر",
      "متوافق 100% مع الجوال",
      "سرعة تحميل عالية (Core Web Vitals)",
      "ألوان وخطوط وأيقونات مخصصة",
      "صفحة منتج ومرحبًا محسّنة",
      "مراجعات غير محدودة حتى رضاك",
    ],
    delivery: "7 أيام",
    rating: 4.9,
    reviewCount: 167,
    popular: true,
  },
  {
    id: 2,
    category: "salla",
    name: "إنشاء متجر سلة كامل",
    description: "متجر سلة جاهز للبيع في أقل من أسبوعين — من الإعداد للإطلاق وأنت مرتاح.",
    price: 1999,
    originalPrice: 8000,
    badge: "الأسرع تسليماً",
    badgeColor: "#C8A962",
    features: [
      "إعداد منصة سلة بالكامل",
      "إضافة حتى 50 منتج مع صور",
      "ربط جميع بوابات الدفع",
      "ربط شركات الشحن",
      "ثيم احترافي مخصص",
      "تدريب عملي ساعتين",
    ],
    delivery: "10 أيام",
    rating: 4.8,
    reviewCount: 94,
  },
  {
    id: 3,
    category: "design",
    name: "هوية بصرية احترافية",
    description: "شعار وهوية بصرية تحكي قصة علامتك وتترك أثراً لا يُنسى في ذهن كل عميل.",
    price: 1299,
    originalPrice: 5000,
    features: [
      "شعار بنسختين (عربي + إنجليزي)",
      "دليل الهوية البصرية الكامل",
      "بطاقة أعمال + ورق رسمي",
      "قوالب سوشيال ميديا (8 تصاميم)",
      "ملفات مفتوحة AI / PSD",
      "3 مراجعات مجانية",
    ],
    delivery: "5 أيام",
    rating: 4.9,
    reviewCount: 128,
  },
  {
    id: 4,
    category: "marketing",
    name: "إدارة السوشيال ميديا",
    description: "حضور رقمي قوي ومحتوى يبيع — نديرها لك بينما تركز أنت على عملك.",
    price: 899,
    originalPrice: 3500,
    isMonthly: true,
    badge: "شهري",
    badgeColor: "#C8A962",
    features: [
      "20 منشور شهري (تصميم + كتابة)",
      "إدارة إنستغرام + تويتر + تيك توك",
      "تقرير أداء أسبوعي",
      "رد على التعليقات والرسائل",
      "قصص يومية (Stories)",
      "تحليل المنافسين",
    ],
    rating: 4.7,
    reviewCount: 73,
  },
  {
    id: 5,
    category: "design",
    name: "تصوير منتجات احترافي",
    description: "صور منتجاتك بجودة تجعل العميل يضغط 'أضف للسلة' فوراً — بدون تردد.",
    price: 699,
    originalPrice: 2500,
    features: [
      "تصوير حتى 20 منتج",
      "خلفيات متعددة (أبيض + ملونة)",
      "تعديل احترافي لكل صورة",
      "تسليم بصيغة JPG + PNG",
      "مناسبة لسلة وزد ومنصات متاجر",
      "تسليم خلال 3 أيام",
    ],
    delivery: "3 أيام",
    rating: 4.8,
    reviewCount: 52,
  },
  {
    id: 6,
    category: "marketing",
    name: "إعلانات Google و Meta",
    description: "حملات إعلانية مدروسة تصل لعميلك المثالي وتعود عليك بأضعاف ما أنفقته.",
    price: 999,
    originalPrice: 4000,
    isMonthly: true,
    badge: "ROI مضمون",
    badgeColor: "#BDEE63",
    features: [
      "إعداد وإدارة الحملات كاملاً",
      "استهداف دقيق للجمهور",
      "إعلانات Meta + Google + TikTok",
      "A/B Testing للإعلانات",
      "تقرير أداء أسبوعي مفصّل",
      "تحسين مستمر للحملات",
    ],
    rating: 4.9,
    reviewCount: 88,
  },
  {
    id: 7,
    category: "web",
    name: "تطوير موقع ويب احترافي",
    description: "موقع سريع وجميل وآمن — يعكس احترافية علامتك ويحقق أهدافك الرقمية.",
    price: 2999,
    originalPrice: 10000,
    badge: "مميز",
    badgeColor: "#C8A962",
    features: [
      "تصميم UX/UI مخصص بالكامل",
      "تطوير Next.js / React",
      "لوحة تحكم سهلة الاستخدام",
      "SEO أساسي محسّن",
      "متوافق مع الجوال 100%",
      "صيانة مجانية شهر كامل",
    ],
    delivery: "14 يوم",
    rating: 4.8,
    reviewCount: 41,
  },
  {
    id: 8,
    category: "marketing",
    name: "خدمة SEO متكاملة",
    description: "ظهر في نتائج البحث الأولى على جوجل وزد مبيعاتك بشكل طبيعي ومستدام.",
    price: 799,
    originalPrice: 3000,
    isMonthly: true,
    features: [
      "تحليل الكلمات المفتاحية المنافسة",
      "تحسين On-Page SEO",
      "بناء روابط خارجية (Link Building)",
      "تحسين سرعة الموقع",
      "تقرير ترتيب شهري",
      "خريطة موقع XML محسّنة",
    ],
    rating: 4.7,
    reviewCount: 59,
  },
];

/* ─── Comparison Data ────────────────────────────────────── */
const COMPARISON = [
  { service: "تصميم ثيم سلة", big: "12,000+", mid: "5,500", freelance: "3,500", ours: "1,499" },
  { service: "متجر سلة كامل", big: "15,000+", mid: "8,000", freelance: "5,000", ours: "1,999" },
  { service: "هوية بصرية", big: "10,000+", mid: "5,000", freelance: "2,500", ours: "1,299" },
  { service: "سوشيال / شهر", big: "5,000+", mid: "3,500", freelance: "2,000", ours: "899" },
  { service: "موقع ويب", big: "20,000+", mid: "10,000", freelance: "6,000", ours: "2,999" },
];

/* ─── Smart Services ─────────────────────────────────────── */
const SMART_SERVICES = [
  { icon: "✦", title: "دفع بعد الرضا الكامل", desc: "لا تدفع شيئاً إلا بعد مشاهدة العمل والموافقة عليه" },
  { icon: "∞", title: "مراجعات غير محدودة", desc: "عدّل وغيّر حتى يكون العمل تماماً كما تريد، بدون حدود" },
  { icon: "⊙", title: "ضمان التسليم في الموعد", desc: "نلتزم بالموعد أو نعيد لك جزءاً من المبلغ كتعويض" },
  { icon: "◈", title: "دعم واتساب 24/7", desc: "فريقنا دائماً متاح للرد على أسئلتك ومساعدتك في أي وقت" },
  { icon: "⬡", title: "ضمان رضا 7 أيام", desc: "إذا لم يعجبك العمل لأي سبب، نرجع لك المبلغ كاملاً" },
  { icon: "◆", title: "تقرير أداء شهري مجاني", desc: "احصل على تقرير شامل عن أداء مشروعك كل شهر" },
  { icon: "⬟", title: "صيانة مجانية شهر كامل", desc: "بعد التسليم نكون معك شهراً كاملاً لأي تعديل أو إصلاح" },
  { icon: "✧", title: "استشارة مجانية قبل الطلب", desc: "احجز جلسة استشارة مجانية 30 دقيقة لتحديد احتياجاتك" },
];

/* ─── Star Rating Component ──────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.floor(rating) ? "#C8A962" : "rgba(200,169,98,0.3)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

/* ─── Product Card ───────────────────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  const savings = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const whatsappMsg = `مرحباً، أريد الاستفسار عن خدمة: ${product.name} بسعر ${product.price.toLocaleString()} ر.س`;

  return (
    <div
      className="store-product-card"
      style={{
        background: "linear-gradient(160deg, #141414 0%, #111111 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        padding: "32px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.35s ease",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,169,98,0.3)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 24px 60px rgba(200,169,98,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLDivElement).style.transform = "none";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Gold top gradient line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "2px",
        background: product.popular
          ? "linear-gradient(to right, transparent, #BDEE63, transparent)"
          : "linear-gradient(to right, transparent, #C8A962, transparent)",
        opacity: 0.6,
      }} />

      {/* Popular badge */}
      {product.popular && (
        <div style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          background: "rgba(189,238,99,0.12)",
          border: "1px solid rgba(189,238,99,0.3)",
          color: "#BDEE63",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          padding: "4px 10px",
          borderRadius: "100px",
          textTransform: "uppercase",
          fontFamily: "Space Mono, monospace",
        }}>
          {product.badge}
        </div>
      )}
      {product.badge && !product.popular && (
        <div style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          background: "rgba(200,169,98,0.1)",
          border: "1px solid rgba(200,169,98,0.25)",
          color: "#C8A962",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          padding: "4px 10px",
          borderRadius: "100px",
          textTransform: "uppercase",
          fontFamily: "Space Mono, monospace",
        }}>
          {product.badge}
        </div>
      )}

      {/* Savings badge */}
      <div style={{
        position: "absolute",
        top: "16px",
        right: "16px",
        background: "rgba(189,238,99,0.15)",
        border: "1px solid rgba(189,238,99,0.25)",
        color: "#BDEE63",
        fontSize: "11px",
        fontWeight: 700,
        padding: "4px 10px",
        borderRadius: "100px",
        fontFamily: "Space Mono, monospace",
      }}>
        وفّر {savings}%
      </div>

      {/* Main content */}
      <div style={{ marginTop: "36px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Product name */}
        <h3 style={{
          fontFamily: "'Zain', sans-serif",
          fontSize: "22px",
          fontWeight: 800,
          color: "#FAFAF7",
          marginBottom: "10px",
          lineHeight: 1.2,
        }}>
          {product.name}
        </h3>

        {/* Description */}
        <p style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: "14px",
          lineHeight: 1.7,
          marginBottom: "20px",
        }}>
          {product.description}
        </p>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "20px" }} />

        {/* Price block */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "12px",
              color: "rgba(255,255,255,0.3)",
              textDecoration: "line-through",
            }}>
              {product.originalPrice.toLocaleString()} ر.س
            </span>
            <span style={{
              fontSize: "11px",
              color: "rgba(255,100,100,0.8)",
              fontFamily: "Space Mono, monospace",
            }}>سعر المنافسين</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "32px",
              fontWeight: 700,
              color: "#C8A962",
              lineHeight: 1,
            }}>
              {product.price.toLocaleString()}
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
              ر.س{product.isMonthly ? " / شهر" : ""}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "20px" }} />

        {/* Features */}
        <ul style={{ listStyle: "none", margin: 0, padding: 0, marginBottom: "20px", flex: 1 }}>
          {product.features.map((f, i) => (
            <li key={i} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              marginBottom: "10px",
              color: "rgba(255,255,255,0.7)",
              fontSize: "14px",
            }}>
              <span style={{
                color: "#BDEE63",
                marginTop: "2px",
                flexShrink: 0,
                fontSize: "12px",
              }}>✓</span>
              {f}
            </li>
          ))}
        </ul>

        {/* Footer info */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Stars rating={product.rating} />
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", color: "#C8A962" }}>
              {product.rating}
            </span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
              ({product.reviewCount})
            </span>
          </div>
          {product.delivery && (
            <span style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "11px",
              color: "rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}>
              ⏱ {product.delivery}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <a
          href={getWhatsAppLink(whatsappMsg)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "14px 24px",
            background: product.popular ? "#BDEE63" : "transparent",
            border: product.popular ? "none" : "1px solid rgba(200,169,98,0.4)",
            color: product.popular ? "#0A0A0A" : "#C8A962",
            borderRadius: "100px",
            fontFamily: "'Zain', sans-serif",
            fontSize: "16px",
            fontWeight: 700,
            textDecoration: "none",
            transition: "all 0.3s ease",
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            if (product.popular) {
              el.style.background = "#9DC832";
            } else {
              el.style.borderColor = "#C8A962";
              el.style.background = "rgba(200,169,98,0.08)";
            }
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            if (product.popular) {
              el.style.background = "#BDEE63";
            } else {
              el.style.borderColor = "rgba(200,169,98,0.4)";
              el.style.background = "transparent";
            }
          }}
        >
          اطلب الآن عبر واتساب
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
const CATEGORIES = [
  { key: "all", label: "جميع الخدمات" },
  { key: "salla", label: "متاجر سلة" },
  { key: "design", label: "التصميم والهوية" },
  { key: "marketing", label: "التسويق الرقمي" },
  { key: "web", label: "تطوير الويب" },
];

export default function StoreContent() {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = activeCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div dir={dir} lang={locale} style={{ fontFamily: "'Zain', sans-serif" }}>
      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section
        style={{
          background: "linear-gradient(180deg, #0A0A0A 0%, #111111 100%)",
          padding: "140px 0 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Geometric background pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23C8A962' stroke-width='0.4'%3E%3Cpolygon points='30,5 55,20 55,45 30,60 5,45 5,20'/%3E%3Cpolygon points='30,15 45,22.5 45,37.5 30,45 15,37.5 15,22.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
          opacity: 0.04,
          pointerEvents: "none",
        }} />

        {/* Glow */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(200,169,98,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Label */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 20px",
            background: "rgba(200,169,98,0.08)",
            border: "1px solid rgba(200,169,98,0.2)",
            borderRadius: "100px",
            marginBottom: "32px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#BDEE63", flexShrink: 0 }} />
            <span style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "#C8A962",
              textTransform: "uppercase",
            }}>
              متجر الخدمات الرقمية
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "24px",
            color: "#FAFAF7",
          }}>
            خدمات رقمية احترافية
            <br />
            <span style={{
              background: "linear-gradient(135deg, #C8A962 0%, #E8D5A3 50%, #C8A962 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              بأسعار لا يُصدَّق
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.5)",
            maxWidth: "600px",
            margin: "0 auto 48px",
            lineHeight: 1.7,
          }}>
            أسعارنا أقل من المنافسين بـ{" "}
            <span style={{ color: "#BDEE63", fontWeight: 700 }}>70%</span>
            {" "}— بدون التنازل عن الجودة. ضمان رضا 100%.
          </p>

          {/* Stats */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "48px",
            flexWrap: "wrap",
            marginBottom: "48px",
          }}>
            {[
              { value: "500+", label: "عميل راضٍ" },
              { value: "4.9/5", label: "متوسط التقييم" },
              { value: "70%", label: "وفّر مقارنة بالسوق" },
              { value: "7 أيام", label: "ضمان استرداد" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "Space Mono, monospace",
                  fontSize: "clamp(24px, 3vw, 32px)",
                  fontWeight: 700,
                  color: "#C8A962",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 40px",
              background: "#BDEE63",
              color: "#0A0A0A",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "17px",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#9DC832"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#BDEE63"; (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}
          >
            تصفح الخدمات
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5l0 14M5 12l7 7 7-7"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ═══ TRUST BAR ══════════════════════════════════════ */}
      <div style={{ background: "#111", borderTop: "1px solid rgba(200,169,98,0.1)", borderBottom: "1px solid rgba(200,169,98,0.1)", padding: "20px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: "32px", overflowX: "auto", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            {[
              "ضمان رضا 100%",
              "دفع بعد الرضا",
              "تسليم في الموعد",
              "دعم واتساب 24/7",
              "مراجعات غير محدودة",
              "صيانة مجانية شهر",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                <span style={{ color: "#BDEE63", fontSize: "14px" }}>✓</span>
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap", letterSpacing: "0.05em" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ COMPARISON TABLE ════════════════════════════════ */}
      <section style={{ background: "#0A0A0A", padding: "100px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="section-label" style={{ justifyContent: "center", marginBottom: "16px" }}>
              مقارنة الأسعار
            </div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              color: "#FAFAF7",
              marginBottom: "16px",
            }}>
              لماذا أسعارنا{" "}
              <span style={{ color: "#C8A962" }}>الأفضل في السوق؟</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px", maxWidth: "500px", margin: "0 auto" }}>
              قارن بنفسك — نفس الجودة، أقل من نصف السعر
            </p>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table
              className="store-comparison-table"
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: 0,
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <thead>
                <tr style={{ background: "#141414" }}>
                  <th style={{ padding: "16px 20px", textAlign: "right", fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "Space Mono, monospace", fontWeight: 400, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>الخدمة</th>
                  <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "Space Mono, monospace", fontWeight: 400, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>وكالات كبيرة</th>
                  <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "Space Mono, monospace", fontWeight: 400, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>وكالات متوسطة</th>
                  <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "Space Mono, monospace", fontWeight: 400, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>مستقلون</th>
                  <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "14px", color: "#BDEE63", fontFamily: "Space Mono, monospace", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(189,238,99,0.05)" }}>
                    نحن ✓
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.service} style={{ background: i % 2 === 0 ? "#0D0D0D" : "#111111" }}>
                    <td style={{ padding: "16px 20px", fontSize: "15px", color: "#FAFAF7", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{row.service}</td>
                    <td style={{ padding: "16px 20px", textAlign: "center", fontSize: "14px", color: "rgba(255,100,100,0.7)", fontFamily: "Space Mono, monospace", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{row.big}</td>
                    <td style={{ padding: "16px 20px", textAlign: "center", fontSize: "14px", color: "rgba(255,150,100,0.7)", fontFamily: "Space Mono, monospace", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{row.mid}</td>
                    <td style={{ padding: "16px 20px", textAlign: "center", fontSize: "14px", color: "rgba(255,200,100,0.7)", fontFamily: "Space Mono, monospace", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{row.freelance}</td>
                    <td style={{ padding: "16px 20px", textAlign: "center", fontSize: "16px", color: "#C8A962", fontFamily: "Space Mono, monospace", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(189,238,99,0.04)" }}>{row.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "13px", color: "rgba(255,255,255,0.25)", fontFamily: "Space Mono, monospace" }}>
            * جميع الأسعار بالريال السعودي (ر.س) — أسعار المنافسين تقريبية بناءً على أبحاث السوق 2025
          </p>
        </div>
      </section>

      {/* ═══ PRODUCTS GRID ═══════════════════════════════════ */}
      <section id="products" style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #0D0D0D 100%)", padding: "100px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="section-label" style={{ justifyContent: "center", marginBottom: "16px" }}>
              خدماتنا
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#FAFAF7", marginBottom: "16px" }}>
              اختر الخدمة{" "}
              <span style={{ color: "#C8A962" }}>المناسبة لك</span>
            </h2>
          </div>

          {/* Category Filters */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "48px" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "100px",
                  border: activeCategory === cat.key ? "none" : "1px solid rgba(255,255,255,0.1)",
                  background: activeCategory === cat.key ? "#C8A962" : "transparent",
                  color: activeCategory === cat.key ? "#0A0A0A" : "rgba(255,255,255,0.5)",
                  fontFamily: "'Zain', sans-serif",
                  fontSize: "15px",
                  fontWeight: activeCategory === cat.key ? 700 : 400,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SMART SERVICES ══════════════════════════════════ */}
      <section style={{ background: "#111", padding: "100px 0", borderTop: "1px solid rgba(200,169,98,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div className="section-label" style={{ justifyContent: "center", marginBottom: "16px" }}>
              ما يميزنا
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#FAFAF7", marginBottom: "16px" }}>
              ضمانات لا تجدها{" "}
              <span style={{ color: "#C8A962" }}>عند أحد غيرنا</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px", maxWidth: "500px", margin: "0 auto" }}>
              قررنا نكسر القواعد ونضع العميل أولاً — دائماً
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}>
            {SMART_SERVICES.map((service) => (
              <div
                key={service.title}
                style={{
                  background: "linear-gradient(160deg, #141414, #111)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "16px",
                  padding: "28px 24px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,169,98,0.25)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLDivElement).style.transform = "none";
                }}
              >
                <div style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(200,169,98,0.08)",
                  border: "1px solid rgba(200,169,98,0.15)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  color: "#C8A962",
                  marginBottom: "16px",
                  fontFamily: "Space Mono, monospace",
                }}>
                  {service.icon}
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#FAFAF7", marginBottom: "10px" }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GOLDEN BUNDLE ═══════════════════════════════════ */}
      <section style={{ background: "#0A0A0A", padding: "100px 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            background: "linear-gradient(135deg, #141414 0%, #1A1508 100%)",
            border: "1.5px solid rgba(200,169,98,0.3)",
            borderRadius: "24px",
            padding: "60px 48px",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}>
            {/* Background glow */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "400px",
              height: "200px",
              background: "radial-gradient(ellipse, rgba(200,169,98,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 20px",
                background: "rgba(200,169,98,0.12)",
                border: "1px solid rgba(200,169,98,0.3)",
                borderRadius: "100px",
                marginBottom: "24px",
              }}>
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", letterSpacing: "0.2em", color: "#C8A962", textTransform: "uppercase" }}>
                  ★ الباقة الذهبية
                </span>
              </div>

              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#FAFAF7", marginBottom: "16px", lineHeight: 1.2 }}>
                متجر سلة + هوية بصرية
                <br />
                <span style={{ color: "#C8A962" }}>+ إدارة سوشيال 3 أشهر</span>
              </h2>

              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", marginBottom: "36px", lineHeight: 1.7 }}>
                الباقة الأكثر شمولاً — كل ما تحتاجه لإطلاق مشروعك في مكان واحد
              </p>

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "14px", color: "rgba(255,255,255,0.3)", textDecoration: "line-through", marginBottom: "4px" }}>
                    16,000 ر.س (السوق)
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontFamily: "Space Mono, monospace", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 700, color: "#C8A962", lineHeight: 1 }}>4,499</span>
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px" }}>ر.س</span>
                  </div>
                </div>
                <div style={{
                  background: "rgba(189,238,99,0.12)",
                  border: "1px solid rgba(189,238,99,0.3)",
                  borderRadius: "100px",
                  padding: "10px 24px",
                  color: "#BDEE63",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "14px",
                  fontWeight: 700,
                }}>
                  وفّر 11,500 ر.س
                </div>
              </div>

              <a
                href={getWhatsAppLink("مرحباً، أريد الاستفسار عن الباقة الذهبية (متجر سلة + هوية بصرية + سوشيال 3 أشهر) بسعر 4,499 ر.س")}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 48px",
                  background: "#C8A962",
                  color: "#0A0A0A",
                  borderRadius: "100px",
                  fontWeight: 700,
                  fontSize: "18px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#E8D5A3"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#C8A962"; (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}
              >
                اطلب الباقة الذهبية
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═════════════════════════════════════════════ */}
      <section style={{ background: "#111", padding: "100px 0", borderTop: "1px solid rgba(200,169,98,0.08)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: "#FAFAF7" }}>
              أسئلة شائعة
            </h2>
          </div>
          {[
            { q: "كيف أطلب الخدمة؟", a: "اضغط على 'اطلب الآن عبر واتساب' في أي خدمة، وسيتواصل معك فريقنا فوراً لتحديد تفاصيل مشروعك." },
            { q: "هل الجودة مضمونة بهذه الأسعار المنخفضة؟", a: "نعم بالتأكيد. نستطيع تقديم هذه الأسعار لأن تكاليفنا التشغيلية منخفضة مع الحفاظ على أعلى معايير الجودة. لدينا أكثر من 500 عميل راضٍ." },
            { q: "هل يمكنني رؤية العمل قبل الدفع؟", a: "بالطبع. نعمل على مرحلة البداية ونشاركك المخرجات الأولية قبل استكمال الدفع. رضاك يأتي أولاً دائماً." },
            { q: "كم يستغرق التسليم؟", a: "يختلف حسب الخدمة. تصميم الثيم 7 أيام، المتجر الكامل 10 أيام، الهوية البصرية 5 أيام، والموقع الإلكتروني 14 يوماً. نلتزم بهذه المواعيد." },
            { q: "هل تقدمون خدمات خارج المملكة العربية السعودية؟", a: "نعم، نخدم عملاء في السعودية والإمارات والكويت وقطر والبحرين وجميع دول الخليج، بالإضافة لبقية الدول العربية." },
          ].map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </section>

      {/* ═══ FINAL CTA ═══════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(135deg, #0A0A0A 0%, #141414 100%)",
        padding: "100px 0",
        borderTop: "1px solid rgba(200,169,98,0.1)",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#FAFAF7", marginBottom: "20px", lineHeight: 1.2 }}>
            جاهز تبدأ مشروعك
            <br />
            <span style={{ color: "#C8A962" }}>باسعار تنافسية؟</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px", marginBottom: "40px", lineHeight: 1.7 }}>
            تواصل معنا الآن واحصل على استشارة مجانية — نساعدك تختار الخدمة المناسبة لمشروعك
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={getWhatsAppLink("مرحباً، أريد استشارة مجانية حول الخدمات الرقمية")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "17px" }}
            >
              استشارة مجانية الآن
            </a>
            <a
              href="#products"
              className="btn-secondary"
              style={{ fontSize: "17px" }}
            >
              تصفح الخدمات
            </a>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section style={{ background: "#080808", padding: "60px 0", borderTop: "1px solid rgba(200,169,98,0.08)" }}>
        <div className="max-w-[1400px] mx-auto px-8">
          <PaymentLogos variant="section" showTitle={true} />
        </div>
      </section>
    </div>
  );
}

/* ─── FAQ Item ───────────────────────────────────────────── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="faq-item"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#FAFAF7",
          fontFamily: "'Zain', sans-serif",
          fontSize: "17px",
          fontWeight: 600,
          textAlign: "right",
          gap: "16px",
        }}
      >
        <span style={{ flex: 1 }}>{question}</span>
        <span style={{
          color: open ? "#C8A962" : "rgba(255,255,255,0.4)",
          fontSize: "20px",
          flexShrink: 0,
          transition: "transform 0.3s ease",
          transform: open ? "rotate(45deg)" : "none",
          display: "inline-block",
        }}>
          +
        </span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.4s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p style={{
            padding: "0 0 22px",
            color: "rgba(255,255,255,0.5)",
            fontSize: "15px",
            lineHeight: 1.8,
          }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
