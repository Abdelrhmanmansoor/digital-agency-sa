"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { getWhatsAppLink } from "@/lib/utils";
import PaymentLogos from "@/components/shared/PaymentLogos";
import { 
  PRODUCTS, 
  CATEGORIES, 
  BADGE_STYLES, 
  COMPETITOR_COMPARISON,
  calculateSavings,
  getProductsByCategory,
  type Product,
  type BadgeType
} from "@/lib/store-data";

/* ─── Favorites Hook ─────────────────────────────────────── */
function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("store-favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem("store-favorites", JSON.stringify(next));
      return next;
    });
  };

  return { favorites, toggleFavorite };
}

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
function ProductCard({ 
  product, 
  locale,
  isFavorite,
  onToggleFavorite 
}: { 
  product: Product; 
  locale: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const isAr = locale === "ar";
  const name = isAr ? product.nameAr : product.nameEn;
  const shortDesc = isAr ? product.shortDescAr : product.shortDescEn;
  const savings = calculateSavings(product);
  const badgeStyle = product.badge ? BADGE_STYLES[product.badge] : null;
  const badgeLabel = product.badge 
    ? (isAr ? product.badgeLabelAr : product.badgeLabelEn) || product.badge
    : null;

  const whatsappMsg = isAr 
    ? `مرحباً، أريد طلب خدمة: ${name} بسعر ${product.price.toLocaleString()} ر.س`
    : `Hello, I want to order: ${name} for ${product.price.toLocaleString()} SAR`;

  return (
    <div
      className="store-product-card"
      style={{
        background: "linear-gradient(160deg, #141414 0%, #111111 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.35s ease",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,169,98,0.3)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 24px 60px rgba(200,169,98,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLDivElement).style.transform = "none";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* ═══ Product Image Area ═══ */}
      <div style={{
        position: "relative",
        height: "200px",
        background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        {/* Decorative pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%23C8A962' stroke-width='0.3'%3E%3Cpolygon points='20,5 35,15 35,30 20,40 5,30 5,15'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
          opacity: 0.06,
        }} />

        {/* Product icon/placeholder */}
        <div style={{
          width: "100px",
          height: "100px",
          background: "linear-gradient(135deg, rgba(200,169,98,0.15) 0%, rgba(200,169,98,0.05) 100%)",
          border: "2px solid rgba(200,169,98,0.2)",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
        }}>
          {product.category === "salla" && "🛒"}
          {product.category === "zid" && "🏪"}
          {product.category === "design" && "🎨"}
          {product.category === "marketing" && "📈"}
          {product.category === "web" && "💻"}
          {product.category === "seo" && "🔍"}
        </div>

        {/* Badge ribbon */}
        {badgeStyle && badgeLabel && (
          <div style={{
            position: "absolute",
            top: "16px",
            [isAr ? "right" : "left"]: "-35px",
            background: badgeStyle.bg,
            border: `1px solid ${badgeStyle.border}`,
            color: badgeStyle.color,
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            padding: "6px 40px",
            transform: isAr ? "rotate(45deg)" : "rotate(-45deg)",
            fontFamily: "'Zain', sans-serif",
            textTransform: "uppercase",
            boxShadow: `0 4px 12px ${badgeStyle.bg}`,
          }}>
            {badgeLabel}
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite(); }}
          style={{
            position: "absolute",
            top: "12px",
            [isAr ? "left" : "right"]: "12px",
            width: "40px",
            height: "40px",
            background: isFavorite ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.08)",
            border: isFavorite ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? "#EF4444" : "none"} stroke={isFavorite ? "#EF4444" : "#fff"} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Savings badge */}
        <div style={{
          position: "absolute",
          bottom: "12px",
          [isAr ? "left" : "right"]: "12px",
          background: "rgba(189,238,99,0.15)",
          border: "1px solid rgba(189,238,99,0.3)",
          color: "#BDEE63",
          fontSize: "11px",
          fontWeight: 700,
          padding: "5px 12px",
          borderRadius: "100px",
          fontFamily: "Space Mono, monospace",
        }}>
          {isAr ? `وفّر ${savings}%` : `Save ${savings}%`}
        </div>
      </div>

      {/* ═══ Card Content ═══ */}
      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Product name - Link to detail page */}
        <Link 
          href={`/${locale}/store/${product.slug}`}
          style={{ textDecoration: "none" }}
        >
          <h3 style={{
            fontFamily: "'Zain', sans-serif",
            fontSize: "20px",
            fontWeight: 800,
            color: "#FAFAF7",
            marginBottom: "8px",
            lineHeight: 1.3,
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLHeadingElement).style.color = "#C8A962"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLHeadingElement).style.color = "#FAFAF7"; }}
          >
            {name}
          </h3>
        </Link>

        {/* Short description */}
        <p style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: "14px",
          lineHeight: 1.6,
          marginBottom: "16px",
          flex: 1,
        }}>
          {shortDesc}
        </p>

        {/* Price block */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "12px",
              color: "rgba(255,255,255,0.3)",
              textDecoration: "line-through",
            }}>
              {product.originalPrice.toLocaleString()} {isAr ? "ر.س" : "SAR"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "28px",
              fontWeight: 700,
              color: "#C8A962",
              lineHeight: 1,
            }}>
              {product.price.toLocaleString()}
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
              {isAr ? "ر.س" : "SAR"}{product.isMonthly ? (isAr ? " / شهر" : " /mo") : ""}
            </span>
          </div>
        </div>

        {/* Rating and delivery */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
          paddingTop: "16px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
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
          <span style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "11px",
            color: "rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}>
            ⏱ {product.deliveryDays} {isAr ? "أيام" : "days"}
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          {/* View details button */}
          <Link
            href={`/${locale}/store/${product.slug}`}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "12px 16px",
              background: "transparent",
              border: "1px solid rgba(200,169,98,0.3)",
              color: "#C8A962",
              borderRadius: "100px",
              fontFamily: "'Zain', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(200,169,98,0.1)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#C8A962";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(200,169,98,0.3)";
            }}
          >
            {isAr ? "التفاصيل" : "Details"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </Link>

          {/* Buy now button */}
          <a
            href={getWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "12px 16px",
              background: product.popular ? "#BDEE63" : "#C8A962",
              border: "none",
              color: "#0A0A0A",
              borderRadius: "100px",
              fontFamily: "'Zain', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(200,169,98,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "none";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            {isAr ? "اشتري الآن" : "Buy Now"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Smart Services ─────────────────────────────────────── */
const SMART_SERVICES = [
  { icon: "✦", titleAr: "دفع بعد الرضا الكامل", titleEn: "Pay After Approval", descAr: "لا تدفع شيئاً إلا بعد مشاهدة العمل والموافقة عليه", descEn: "Don't pay until you see and approve the work" },
  { icon: "∞", titleAr: "مراجعات غير محدودة", titleEn: "Unlimited Revisions", descAr: "عدّل وغيّر حتى يكون العمل تماماً كما تريد", descEn: "Modify until the work is exactly as you want" },
  { icon: "⊙", titleAr: "ضمان التسليم في الموعد", titleEn: "On-Time Delivery", descAr: "نلتزم بالموعد أو نعيد لك جزءاً من المبلغ", descEn: "We deliver on time or refund part of payment" },
  { icon: "◈", titleAr: "دعم واتساب 24/7", titleEn: "24/7 WhatsApp Support", descAr: "فريقنا دائماً متاح للرد على أسئلتك", descEn: "Our team is always available to help" },
  { icon: "⬡", titleAr: "ضمان رضا 7 أيام", titleEn: "7-Day Guarantee", descAr: "إذا لم يعجبك العمل، نرجع لك المبلغ كاملاً", descEn: "Full refund if you're not satisfied" },
  { icon: "◆", titleAr: "تقرير أداء شهري", titleEn: "Monthly Reports", descAr: "احصل على تقرير شامل عن أداء مشروعك", descEn: "Get comprehensive performance reports" },
];

/* ─── FAQ Item ───────────────────────────────────────────── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <button
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
          textAlign: "inherit",
          gap: "16px",
        }}
      >
        <span style={{ flex: 1 }}>{question}</span>
        <span style={{
          color: open ? "#C8A962" : "rgba(255,255,255,0.4)",
          fontSize: "20px",
          transition: "transform 0.3s ease",
          transform: open ? "rotate(45deg)" : "none",
        }}>+</span>
      </button>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.4s ease" }}>
        <div style={{ overflow: "hidden" }}>
          <p style={{ padding: "0 0 22px", color: "rgba(255,255,255,0.5)", fontSize: "15px", lineHeight: 1.8 }}>{answer}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function StoreContent() {
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { favorites, toggleFavorite } = useFavorites();

  const filtered = getProductsByCategory(activeCategory);

  return (
    <div dir={dir} lang={locale} style={{ fontFamily: "'Zain', sans-serif" }}>
      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #111111 100%)",
        padding: "140px 0 100px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Geometric background */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23C8A962' stroke-width='0.4'%3E%3Cpolygon points='30,5 55,20 55,45 30,60 5,45 5,20'/%3E%3Cpolygon points='30,15 45,22.5 45,37.5 30,45 15,37.5 15,22.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
          opacity: 0.04,
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
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#BDEE63" }} />
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", letterSpacing: "0.2em", color: "#C8A962", textTransform: "uppercase" }}>
              {isAr ? "متجر الخدمات الرقمية" : "Digital Services Store"}
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, lineHeight: 1.1, marginBottom: "24px", color: "#FAFAF7" }}>
            {isAr ? "خدمات رقمية احترافية" : "Professional Digital Services"}
            <br />
            <span style={{
              background: "linear-gradient(135deg, #C8A962 0%, #E8D5A3 50%, #C8A962 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {isAr ? "بأسعار لا تُصدَّق" : "Unbeatable Prices"}
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.5)", maxWidth: "600px", margin: "0 auto 48px", lineHeight: 1.7 }}>
            {isAr ? (
              <>أسعارنا أقل من المنافسين بـ <span style={{ color: "#BDEE63", fontWeight: 700 }}>70%</span> — بدون التنازل عن الجودة. ضمان رضا 100%.</>
            ) : (
              <>Our prices are <span style={{ color: "#BDEE63", fontWeight: 700 }}>70% lower</span> than competitors — without compromising quality.</>
            )}
          </p>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap", marginBottom: "48px" }}>
            {[
              { value: "500+", labelAr: "عميل راضٍ", labelEn: "Happy Clients" },
              { value: "4.9/5", labelAr: "متوسط التقييم", labelEn: "Avg. Rating" },
              { value: "70%", labelAr: "وفّر مقارنة بالسوق", labelEn: "Savings" },
              { value: isAr ? "7 أيام" : "7 Days", labelAr: "ضمان استرداد", labelEn: "Money Back" },
            ].map((stat) => (
              <div key={stat.labelAr} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Space Mono, monospace", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#C8A962", marginBottom: "8px" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                  {isAr ? stat.labelAr : stat.labelEn}
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
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#9DC832"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#BDEE63"; }}
          >
            {isAr ? "تصفح الخدمات" : "Browse Services"}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5l0 14M5 12l7 7 7-7"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ═══ TRUST BAR ══════════════════════════════════════ */}
      <div style={{ background: "#111", borderTop: "1px solid rgba(200,169,98,0.1)", borderBottom: "1px solid rgba(200,169,98,0.1)", padding: "20px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            {(isAr ? [
              "ضمان رضا 100%", "دفع بعد الرضا", "تسليم في الموعد", "دعم واتساب 24/7", "مراجعات غير محدودة"
            ] : [
              "100% Satisfaction", "Pay After Approval", "On-Time Delivery", "24/7 Support", "Unlimited Revisions"
            ]).map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#BDEE63", fontSize: "14px" }}>✓</span>
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ COMPARISON TABLE ════════════════════════════════ */}
      <section style={{ background: "#0A0A0A", padding: "100px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#FAFAF7", marginBottom: "16px" }}>
              {isAr ? <>لماذا أسعارنا <span style={{ color: "#C8A962" }}>الأفضل في السوق؟</span></> : <>Why Our Prices Are <span style={{ color: "#C8A962" }}>The Best?</span></>}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px" }}>
              {isAr ? "قارن بنفسك — نفس الجودة، أقل من نصف السعر" : "Compare yourself — same quality, less than half the price"}
            </p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#141414" }}>
                  <th style={{ padding: "16px 20px", textAlign: isAr ? "right" : "left", fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "Space Mono, monospace", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {isAr ? "الخدمة" : "Service"}
                  </th>
                  <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "Space Mono, monospace", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {isAr ? "المنافسون" : "Competitors"}
                  </th>
                  <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "14px", color: "#BDEE63", fontFamily: "Space Mono, monospace", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(189,238,99,0.05)" }}>
                    {isAr ? "نحن ✓" : "Us ✓"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPETITOR_COMPARISON.map((row, i) => (
                  <tr key={row.service} style={{ background: i % 2 === 0 ? "#0D0D0D" : "#111111" }}>
                    <td style={{ padding: "16px 20px", fontSize: "15px", color: "#FAFAF7", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{row.service}</td>
                    <td style={{ padding: "16px 20px", textAlign: "center", fontSize: "14px", color: "rgba(255,100,100,0.7)", fontFamily: "Space Mono, monospace", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{row.competitor}</td>
                    <td style={{ padding: "16px 20px", textAlign: "center", fontSize: "16px", color: "#C8A962", fontFamily: "Space Mono, monospace", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(189,238,99,0.04)" }}>{row.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS GRID ═══════════════════════════════════ */}
      <section id="products" style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #0D0D0D 100%)", padding: "100px 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#FAFAF7", marginBottom: "16px" }}>
              {isAr ? <>اختر الخدمة <span style={{ color: "#C8A962" }}>المناسبة لك</span></> : <>Choose The <span style={{ color: "#C8A962" }}>Right Service</span></>}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px" }}>
              {isAr ? "اضغط على أي منتج لمعرفة التفاصيل الكاملة" : "Click any product to see full details"}
            </p>
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
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>{cat.icon}</span>
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "28px",
          }}>
            {filtered.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                locale={locale}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={() => toggleFavorite(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SMART SERVICES ══════════════════════════════════ */}
      <section style={{ background: "#111", padding: "100px 0", borderTop: "1px solid rgba(200,169,98,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#FAFAF7", marginBottom: "16px" }}>
              {isAr ? <>ضمانات لا تجدها <span style={{ color: "#C8A962" }}>عند أحد غيرنا</span></> : <>Guarantees You Won't Find <span style={{ color: "#C8A962" }}>Anywhere Else</span></>}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
            {SMART_SERVICES.map((service) => (
              <div
                key={service.titleAr}
                style={{
                  background: "linear-gradient(160deg, #141414, #111)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "16px",
                  padding: "28px 24px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,169,98,0.25)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
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
                }}>{service.icon}</div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#FAFAF7", marginBottom: "10px" }}>
                  {isAr ? service.titleAr : service.titleEn}
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                  {isAr ? service.descAr : service.descEn}
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
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "400px",
              height: "200px",
              background: "radial-gradient(ellipse, rgba(200,169,98,0.1) 0%, transparent 70%)",
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
                  ★ {isAr ? "الباقة الذهبية" : "Golden Package"}
                </span>
              </div>

              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#FAFAF7", marginBottom: "16px", lineHeight: 1.2 }}>
                {isAr ? "متجر سلة + هوية بصرية" : "Salla Store + Brand Identity"}
                <br />
                <span style={{ color: "#C8A962" }}>{isAr ? "+ إدارة سوشيال 3 أشهر" : "+ 3 Months Social Media"}</span>
              </h2>

              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", marginBottom: "36px" }}>
                {isAr ? "الباقة الأكثر شمولاً — كل ما تحتاجه لإطلاق مشروعك" : "The most comprehensive package — everything you need to launch"}
              </p>

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "14px", color: "rgba(255,255,255,0.3)", textDecoration: "line-through", marginBottom: "4px" }}>
                    16,000 {isAr ? "ر.س" : "SAR"}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontFamily: "Space Mono, monospace", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 700, color: "#C8A962" }}>4,499</span>
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px" }}>{isAr ? "ر.س" : "SAR"}</span>
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
                  {isAr ? "وفّر 11,500 ر.س" : "Save 11,500 SAR"}
                </div>
              </div>

              <a
                href={getWhatsAppLink(isAr ? "مرحباً، أريد الاستفسار عن الباقة الذهبية بسعر 4,499 ر.س" : "Hello, I want to inquire about the Golden Package for 4,499 SAR")}
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
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#E8D5A3"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#C8A962"; }}
              >
                {isAr ? "اطلب الباقة الذهبية" : "Get Golden Package"}
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
              {isAr ? "أسئلة شائعة" : "FAQ"}
            </h2>
          </div>
          {(isAr ? [
            { q: "كيف أطلب الخدمة؟", a: "اضغط على 'اشتري الآن' أو 'التفاصيل' في أي خدمة، وسيتواصل معك فريقنا فوراً." },
            { q: "هل الجودة مضمونة؟", a: "نعم. نستطيع تقديم هذه الأسعار لأن تكاليفنا التشغيلية منخفضة مع الحفاظ على أعلى معايير الجودة." },
            { q: "هل يمكنني رؤية العمل قبل الدفع؟", a: "بالطبع. نعمل على مرحلة البداية ونشاركك المخرجات الأولية قبل استكمال الدفع." },
            { q: "كم يستغرق التسليم؟", a: "يختلف حسب الخدمة. تصميم الثيم 7 أيام، المتجر الكامل 10 أيام، الهوية البصرية 5 أيام." },
          ] : [
            { q: "How do I order?", a: "Click 'Buy Now' or 'Details' on any service, and our team will contact you immediately." },
            { q: "Is quality guaranteed?", a: "Yes. We offer these prices because our operational costs are low while maintaining the highest quality standards." },
            { q: "Can I see the work before paying?", a: "Of course. We work on the initial phase and share the outputs before completing payment." },
            { q: "How long is delivery?", a: "Varies by service. Theme design 7 days, complete store 10 days, brand identity 5 days." },
          ]).map((item, i) => (
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
            {isAr ? "جاهز تبدأ مشروعك" : "Ready To Start"}
            <br />
            <span style={{ color: "#C8A962" }}>{isAr ? "بأسعار تنافسية؟" : "With Competitive Prices?"}</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px", marginBottom: "40px" }}>
            {isAr ? "تواصل معنا الآن واحصل على استشارة مجانية" : "Contact us now for a free consultation"}
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={getWhatsAppLink(isAr ? "مرحباً، أريد استشارة مجانية" : "Hello, I want a free consultation")}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 32px",
                background: "#BDEE63",
                color: "#0A0A0A",
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: "17px",
                textDecoration: "none",
              }}
            >
              {isAr ? "استشارة مجانية" : "Free Consultation"}
            </a>
            <a
              href="#products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 32px",
                background: "transparent",
                border: "1px solid rgba(200,169,98,0.4)",
                color: "#C8A962",
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: "17px",
                textDecoration: "none",
              }}
            >
              {isAr ? "تصفح الخدمات" : "Browse Services"}
            </a>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section style={{ background: "#f8fafc", padding: "60px 0" }}>
        <div className="max-w-[1400px] mx-auto px-8">
          <PaymentLogos variant="grid" showTitle={true} />
        </div>
      </section>
    </div>
  );
}
