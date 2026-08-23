"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { getWhatsAppLink } from "@/lib/utils";
import PaymentLogos from "@/components/shared/PaymentLogos";
import { useCart } from "@/components/store/CartContext";
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
import { STORE_FAQ } from "@/lib/store-faq";

/* ─── Store Logos (Hero) ─────────────────────────────────── */
type StoreLogo = {
  nameAr: string;
  nameEn: string;
  file: string;
  featured?: boolean;
  maxHeight?: number;
};

const STORE_LOGOS: StoreLogo[] = [
  {
    nameAr: "TF1",
    nameEn: "TF1 Power Your Passion",
    file: "tf1.png",
    featured: true,
    maxHeight: 62,
  },
  {
    nameAr: "حلا هوم",
    nameEn: "Hala Home",
    file: "hala-home.png",
    maxHeight: 48,
  },
  {
    nameAr: "الفلمنكي",
    nameEn: "Al-Flamanki",
    file: "al-flamanki.png",
    maxHeight: 56,
  },
  {
    nameAr: "أوبيا",
    nameEn: "Obeya",
    file: "obeya.png",
    maxHeight: 46,
  },
  {
    nameAr: "عباية بوتيك",
    nameEn: "Abaya Boutique",
    file: "abaya-boutique.png",
    maxHeight: 56,
  },
  {
    nameAr: "شعار زهري",
    nameEn: "Floral Mark",
    file: "floral-mark.png",
    maxHeight: 50,
  },
];

function buildLogoRow(arr: StoreLogo[]) {
  return [...arr, ...arr];
}

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
        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.floor(rating) ? "#F0B100" : "rgba(240,177,0,0.3)"}>
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

  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      price: product.price,
      originalPrice: product.originalPrice,
      isMonthly: product.isMonthly,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div
      className="store-product-card"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "14px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.35s ease",
        overflow: "hidden",
        boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(240,177,0,0.4)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 24px 60px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLDivElement).style.transform = "none";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 24px rgba(0,0,0,0.06)";
      }}
    >
      {/* ═══ Product Image Area ═══ */}
      <div style={{
        position: "relative",
        height: "200px",
        background: "linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}>
        {/* Decorative pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%23C9A227' stroke-width='0.3'%3E%3Cpolygon points='20,5 35,15 35,30 20,40 5,30 5,15'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
          opacity: 0.08,
        }} />

        {/* Product icon/placeholder */}
        <div style={{
          width: "100px",
          height: "100px",
          background: "linear-gradient(135deg, rgba(240,177,0,0.12) 0%, rgba(240,177,0,0.05) 100%)",
          border: "2px solid rgba(240,177,0,0.25)",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
        }}>
          {product.category === "store" && "🛒"}
          {product.category === "integrations" && "🔗"}
          {product.category === "marketing" && "📈"}
          {product.category === "development" && "💻"}
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
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
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
          background: isFavorite ? "rgba(239,68,68,0.12)" : "rgba(0,0,0,0.04)",
          border: isFavorite ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(0,0,0,0.1)",
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
          background: "rgba(240,177,0,0.15)",
          border: "1px solid rgba(240,177,0,0.35)",
          color: "#8A6D00",
          fontSize: "11px",
          fontWeight: 700,
          padding: "5px 12px",
          borderRadius: "10px",
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
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
            fontSize: "20px",
            fontWeight: 800,
            color: "#1A1A1A",
            marginBottom: "8px",
            lineHeight: 1.3,
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLHeadingElement).style.color = "#F0B100"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLHeadingElement).style.color = "#1A1A1A"; }}
          >
            {name}
          </h3>
        </Link>

        {/* Short description */}
        <p style={{
          color: "rgba(26,26,26,0.65)",
          fontSize: "14px",
          lineHeight: 1.6,
          marginBottom: "16px",
          flex: 1,
        }}>
          {shortDesc}
        </p>

        {/* Social proof */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
          marginBottom: "16px",
          padding: "10px 12px",
          background: "rgba(240,177,0,0.08)",
          border: "1px solid rgba(240,177,0,0.2)",
          borderRadius: "12px",
          fontSize: "12px",
          color: "#1A1A1A",
        }}>
          <span>{isAr ? `🔥 طلب ${product.monthlyOrders} شخص هذا الشهر` : `🔥 ${product.monthlyOrders} orders this month`}</span>
          <span style={{ color: "rgba(26,26,26,0.6)" }}>{isAr ? `👀 ${product.views} مشاهدة` : `👀 ${product.views} views`}</span>
        </div>

        {/* Price block */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "12px",
            color: "rgba(26,26,26,0.45)",
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
            color: "#8A6D00",
            lineHeight: 1,
          }}>
            {product.price.toLocaleString()}
          </span>
          <span style={{ color: "rgba(26,26,26,0.6)", fontSize: "14px" }}>
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
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Stars rating={product.rating} />
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", color: "#8A6D00" }}>
              {product.rating}
            </span>
            <span style={{ fontSize: "11px", color: "rgba(26,26,26,0.5)" }}>
              ({product.reviewCount})
            </span>
          </div>
          <span style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "11px",
            color: "rgba(26,26,26,0.6)",
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
            border: "1px solid rgba(240,177,0,0.4)",
            color: "#8A6D00",
            borderRadius: "10px",
            fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(240,177,0,0.12)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#F0B100";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(240,177,0,0.4)";
          }}
        >
          {isAr ? "التفاصيل" : "Details"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </Link>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={isAr ? `أضف ${name} إلى السلة` : `Add ${name} to cart`}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "12px 16px",
              background: justAdded ? "#2F855A" : "#F0B100",
              border: "none",
              color: justAdded ? "#FFFFFF" : "#111111",
              borderRadius: "10px",
              fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              cursor: product.inStock ? "pointer" : "not-allowed",
              opacity: product.inStock ? 1 : 0.5,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!justAdded) (e.currentTarget as HTMLButtonElement).style.background = "#D89E00";
            }}
            onMouseLeave={(e) => {
              if (!justAdded) (e.currentTarget as HTMLButtonElement).style.background = "#F0B100";
            }}
          >
            {justAdded ? (isAr ? "تمت الإضافة ✓" : "Added ✓") : isAr ? "أضف للسلة" : "Add to Cart"}
            {!justAdded && (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            )}
          </button>
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
    <div style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
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
          color: "#111111",
          fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
          fontSize: "17px",
          fontWeight: 600,
          textAlign: "inherit",
          gap: "16px",
        }}
      >
        <span style={{ flex: 1 }}>{question}</span>
        <span style={{
          color: open ? "#F0B100" : "rgba(26,26,26,0.5)",
          fontSize: "20px",
          transition: "transform 0.3s ease",
          transform: open ? "rotate(45deg)" : "none",
        }}>+</span>
      </button>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.4s ease" }}>
        <div style={{ overflow: "hidden" }}>
          <p style={{ padding: "0 0 22px", color: "rgba(26,26,26,0.65)", fontSize: "15px", lineHeight: 1.8 }}>{answer}</p>
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
  const logosRow = buildLogoRow(STORE_LOGOS);

  return (
    <div dir={dir} lang={locale} style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>
      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)",
        padding: "140px 0 100px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Geometric background */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23C9A227' stroke-width='0.4'%3E%3Cpolygon points='30,5 55,20 55,45 30,60 5,45 5,20'/%3E%3Cpolygon points='30,15 45,22.5 45,37.5 30,45 15,37.5 15,22.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
          opacity: 0.08,
        }} />

        {/* Glow */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(240,177,0,0.12) 0%, transparent 70%)",
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Label */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 20px",
            background: "rgba(240,177,0,0.12)",
            border: "1px solid rgba(240,177,0,0.3)",
            borderRadius: "10px",
            marginBottom: "32px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F0B100" }} />
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", letterSpacing: "0.2em", color: "#8A6D00", textTransform: "uppercase" }}>
              {isAr ? "متجر الخدمات الرقمية" : "Digital Services Store"}
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, lineHeight: 1.1, marginBottom: "24px", color: "#1A1A1A" }}>
            {isAr ? "خدمات رقمية احترافية" : "Professional Digital Services"}
            <br />
            <span style={{
              background: "linear-gradient(135deg, #F0B100 0%, #F3DFA0 50%, #F0B100 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {isAr ? "بأسعار لا تُصدَّق" : "Unbeatable Prices"}
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: "18px", color: "rgba(26,26,26,0.65)", maxWidth: "600px", margin: "0 auto 48px", lineHeight: 1.7 }}>
            {isAr ? (
              <>أسعارنا أقل من المنافسين بـ <span style={{ color: "#8A6D00", fontWeight: 700 }}>70%</span> — بدون التنازل عن الجودة. ضمان رضا 100%.</>
            ) : (
              <>Our prices are <span style={{ color: "#8A6D00", fontWeight: 700 }}>70% lower</span> than competitors — without compromising quality. 100% satisfaction guaranteed.</>
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
                <div style={{ fontFamily: "Space Mono, monospace", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#8A6D00", marginBottom: "8px" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "13px", color: "rgba(26,26,26,0.6)" }}>
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
              background: "#F0B100",
              color: "#1A1A1A",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "17px",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#D89E00"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#F0B100"; }}
          >
            {isAr ? "تصفح الخدمات" : "Browse Services"}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5l0 14M5 12l7 7 7-7"/>
            </svg>
          </a>

          {/* ═══ Premium Client Logo Showcase ═══ */}
          <div style={{ marginTop: "72px", position: "relative" }}>
            <style>{`
              @keyframes store-marquee-ltr {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              @keyframes store-marquee-rtl {
                from { transform: translateX(-50%); }
                to { transform: translateX(0); }
              }
              @keyframes store-marquee-ltr-slow {
                from { transform: translateX(-50%); }
                to { transform: translateX(0); }
              }
              @keyframes store-marquee-rtl-slow {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              @keyframes store-featured-glow {
                0%, 100% { 
                  box-shadow: 0 14px 40px rgba(240,177,0,0.25), 0 0 0 1px rgba(240,177,0,0.3);
                  transform: scale(1.08);
                }
                50% { 
                  box-shadow: 0 20px 60px rgba(240,177,0,0.45), 0 0 20px rgba(240,177,0,0.15), 0 0 0 1px rgba(240,177,0,0.5);
                  transform: scale(1.12);
                }
              }
              @keyframes store-logo-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-3px); }
              }
              @keyframes store-shine {
                0% { left: -100%; }
                50%, 100% { left: 200%; }
              }
              @keyframes store-badge-pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.6; }
              }
              .store-logo-card {
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
              }
              .store-logo-card:hover {
                transform: translateY(-4px) scale(1.04) !important;
                box-shadow: 0 20px 50px rgba(0,0,0,0.12) !important;
                border-color: rgba(240,177,0,0.4) !important;
              }
              .store-featured-card:hover {
                transform: translateY(-6px) scale(1.14) !important;
              }
              @media (max-width: 768px) {
                .store-logo-card {
                  height: 72px !important;
                  min-width: 140px !important;
                  padding: 10px 18px !important;
                }
                .store-featured-card {
                  height: 90px !important;
                  min-width: 180px !important;
                }
                .store-logos-title {
                  font-size: 11px !important;
                  letter-spacing: 0.2em !important;
                }
                .store-logos-subtitle {
                  font-size: 13px !important;
                }
              }
            `}</style>

            {/* Section Header */}
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
              }}>
                <div style={{ width: "40px", height: "1px", background: "linear-gradient(to right, transparent, rgba(240,177,0,0.5))" }} />
                <div
                  className="store-logos-title"
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "12px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "rgba(240,177,0,0.7)",
                  }}
                >
                  {isAr ? "عملاء يثقون بنا" : "Clients Who Trust Us"}
                </div>
                <div style={{ width: "40px", height: "1px", background: "linear-gradient(to left, transparent, rgba(240,177,0,0.5))" }} />
              </div>
              <div className="store-logos-subtitle" style={{ color: "rgba(26,26,26,0.55)", fontSize: "15px", lineHeight: 1.6 }}>
                {isAr ? "شعارات مختارة من مشاريعنا الناجحة" : "Selected logos from our successful projects"}
              </div>
            </div>

            {/* Marquee Container */}
            <div
              style={{
                position: "relative",
                padding: "24px 0",
                borderRadius: "24px",
                border: "1px solid rgba(240,177,0,0.15)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)",
                backdropFilter: "blur(12px)",
                overflow: "hidden",
              }}
            >
              {/* Gradient fade edges */}
              {(["left", "right"] as const).map((side) => (
                <div
                  key={side}
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    [side]: 0,
                    width: "140px",
                    background: `linear-gradient(to ${side === "left" ? "right" : "left"}, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, transparent 100%)`,
                    zIndex: 3,
                    pointerEvents: "none",
                  }}
                />
              ))}

              {/* Row 1 — Primary direction */}
              <div style={{ overflow: "hidden", marginBottom: "14px" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    width: "max-content",
                    animation: `${isAr ? "store-marquee-rtl" : "store-marquee-ltr"} 28s linear infinite`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.animationPlayState = "running";
                  }}
                >
                  {logosRow.map((logo, index) => (
                    <div
                      key={`row1-${logo.file}-${index}`}
                      className={`store-logo-card ${logo.featured ? "store-featured-card" : ""}`}
                      style={{
                        height: logo.featured ? "100px" : "82px",
                        minWidth: logo.featured ? "220px" : "160px",
                        padding: logo.featured ? "14px 32px" : "12px 24px",
                        borderRadius: "14px",
                        border: logo.featured 
                          ? "2px solid rgba(240,177,0,0.5)" 
                          : "1px solid rgba(0,0,0,0.06)",
                        background: logo.featured
                          ? "linear-gradient(135deg, rgba(240,177,0,0.12) 0%, #FFFFFF 50%, rgba(240,177,0,0.08) 100%)"
                          : "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: logo.featured
                          ? "0 14px 40px rgba(240,177,0,0.25), 0 0 0 1px rgba(240,177,0,0.3)"
                          : "0 8px 20px rgba(0,0,0,0.04)",
                        transform: logo.featured ? "scale(1.08)" : "none",
                        animation: logo.featured ? "store-featured-glow 3.5s ease-in-out infinite" : "store-logo-float 6s ease-in-out infinite",
                        animationDelay: logo.featured ? "0s" : `${index * 0.5}s`,
                        flexShrink: 0,
                      }}
                    >
                      {/* Shine effect on featured */}
                      {logo.featured && (
                        <div style={{
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          width: "60%",
                          height: "100%",
                          background: "linear-gradient(90deg, transparent 0%, rgba(240,177,0,0.12) 50%, transparent 100%)",
                          animation: "store-shine 4s ease-in-out infinite",
                          pointerEvents: "none",
                        }} />
                      )}
                      
                      {/* Featured badge */}
                      {logo.featured && (
                        <div style={{
                          position: "absolute",
                          top: "6px",
                          [isAr ? "left" : "right"]: "8px",
                          background: "linear-gradient(135deg, #F0B100, #F3DFA0)",
                          color: "#1A1A1A",
                          fontSize: "7px",
                          fontWeight: 800,
                          padding: "2px 8px",
                          borderRadius: "10px",
                          fontFamily: "Space Mono, monospace",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          animation: "store-badge-pulse 2.5s ease-in-out infinite",
                        }}>
                          ★ {isAr ? "مميز" : "FEATURED"}
                        </div>
                      )}

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/store-logos/${logo.file}`}
                        alt={isAr ? logo.nameAr : logo.nameEn}
                        style={{
                          height: `${logo.featured ? (logo.maxHeight ?? 46) + 10 : logo.maxHeight ?? 46}px`,
                          width: "auto",
                          maxWidth: logo.featured ? "200px" : "140px",
                          objectFit: "contain",
                          display: "block",
                          filter: logo.featured ? "none" : "grayscale(0.15)",
                          transition: "filter 0.4s ease",
                        }}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                          const parent = (e.currentTarget as HTMLImageElement).parentElement;
                          if (parent) {
                            const fallback = document.createElement("span");
                            fallback.textContent = isAr ? logo.nameAr : logo.nameEn;
                            fallback.style.cssText = "font-family: 'ThmanyahSans', 'Zain', sans-serif; font-size: 16px; font-weight: 700; color: rgba(26,26,26,0.7); white-space: nowrap;";
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 — Reverse direction, slower */}
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    width: "max-content",
                    animation: `${isAr ? "store-marquee-rtl-slow" : "store-marquee-ltr-slow"} 35s linear infinite`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.animationPlayState = "running";
                  }}
                >
                  {[...logosRow].reverse().map((logo, index) => (
                    <div
                      key={`row2-${logo.file}-${index}`}
                      className={`store-logo-card ${logo.featured ? "store-featured-card" : ""}`}
                      style={{
                        height: logo.featured ? "100px" : "82px",
                        minWidth: logo.featured ? "220px" : "160px",
                        padding: logo.featured ? "14px 32px" : "12px 24px",
                        borderRadius: "14px",
                        border: logo.featured 
                          ? "2px solid rgba(240,177,0,0.5)" 
                          : "1px solid rgba(0,0,0,0.06)",
                        background: logo.featured
                          ? "linear-gradient(135deg, rgba(240,177,0,0.12) 0%, #FFFFFF 50%, rgba(240,177,0,0.08) 100%)"
                          : "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: logo.featured
                          ? "0 14px 40px rgba(240,177,0,0.25), 0 0 0 1px rgba(240,177,0,0.3)"
                          : "0 8px 20px rgba(0,0,0,0.04)",
                        transform: logo.featured ? "scale(1.08)" : "none",
                        animation: logo.featured ? "store-featured-glow 3.5s ease-in-out infinite" : "store-logo-float 6s ease-in-out infinite",
                        animationDelay: logo.featured ? "0s" : `${index * 0.7}s`,
                        flexShrink: 0,
                      }}
                    >
                      {/* Shine effect on featured */}
                      {logo.featured && (
                        <div style={{
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          width: "60%",
                          height: "100%",
                          background: "linear-gradient(90deg, transparent 0%, rgba(240,177,0,0.12) 50%, transparent 100%)",
                          animation: "store-shine 4s ease-in-out infinite",
                          animationDelay: "2s",
                          pointerEvents: "none",
                        }} />
                      )}
                      
                      {/* Featured badge */}
                      {logo.featured && (
                        <div style={{
                          position: "absolute",
                          top: "6px",
                          [isAr ? "left" : "right"]: "8px",
                          background: "linear-gradient(135deg, #F0B100, #F3DFA0)",
                          color: "#1A1A1A",
                          fontSize: "7px",
                          fontWeight: 800,
                          padding: "2px 8px",
                          borderRadius: "10px",
                          fontFamily: "Space Mono, monospace",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          animation: "store-badge-pulse 2.5s ease-in-out infinite",
                        }}>
                          ★ {isAr ? "مميز" : "FEATURED"}
                        </div>
                      )}

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/store-logos/${logo.file}`}
                        alt={isAr ? logo.nameAr : logo.nameEn}
                        style={{
                          height: `${logo.featured ? (logo.maxHeight ?? 46) + 10 : logo.maxHeight ?? 46}px`,
                          width: "auto",
                          maxWidth: logo.featured ? "200px" : "140px",
                          objectFit: "contain",
                          display: "block",
                          filter: logo.featured ? "none" : "grayscale(0.15)",
                          transition: "filter 0.4s ease",
                        }}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                          const parent = (e.currentTarget as HTMLImageElement).parentElement;
                          if (parent) {
                            const fallback = document.createElement("span");
                            fallback.textContent = isAr ? logo.nameAr : logo.nameEn;
                            fallback.style.cssText = "font-family: 'ThmanyahSans', 'Zain', sans-serif; font-size: 16px; font-weight: 700; color: rgba(26,26,26,0.7); white-space: nowrap;";
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Client count indicator */}
            <div style={{
              textAlign: "center",
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}>
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22C55E",
                animation: "store-badge-pulse 2s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "11px",
                color: "rgba(26,26,26,0.5)",
                letterSpacing: "0.05em",
              }}>
                {isAr ? "وأكثر من ١٠٠ عميل آخر..." : "And 100+ more clients..."}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ══════════════════════════════════════ */}
      <div style={{ background: "#FFFFFF", borderTop: "1px solid rgba(0,0,0,0.08)", borderBottom: "1px solid rgba(0,0,0,0.08)", padding: "20px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            {(isAr ? [
              "ضمان رضا 100%", "دفع بعد الرضا", "تسليم في الموعد", "دعم واتساب 24/7", "مراجعات غير محدودة"
            ] : [
              "100% Satisfaction", "Pay After Approval", "On-Time Delivery", "24/7 Support", "Unlimited Revisions"
            ]).map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#8A6D00", fontSize: "14px" }}>✓</span>
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "12px", color: "rgba(26,26,26,0.6)", whiteSpace: "nowrap" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ COMPARISON TABLE ════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", padding: "100px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#1A1A1A", marginBottom: "16px" }}>
              {isAr ? <>لماذا أسعارنا <span style={{ color: "#8A6D00" }}>الأفضل في السوق؟</span></> : <>Why Our Prices Are <span style={{ color: "#8A6D00" }}>The Best?</span></>}
            </h2>
            <p style={{ color: "rgba(26,26,26,0.65)", fontSize: "16px" }}>
              {isAr ? "قارن بنفسك — نفس الجودة، أقل من نصف السعر" : "Compare yourself — same quality, less than half the price"}
            </p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, border: "1px solid rgba(0,0,0,0.08)", borderRadius: "16px", overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#FFFFFF" }}>
                  <th style={{ padding: "16px 20px", textAlign: isAr ? "right" : "left", fontSize: "13px", color: "rgba(26,26,26,0.6)", fontFamily: "Space Mono, monospace", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                    {isAr ? "الخدمة" : "Service"}
                  </th>
                  <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "13px", color: "rgba(26,26,26,0.6)", fontFamily: "Space Mono, monospace", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                    {isAr ? "المنافسون" : "Competitors"}
                  </th>
                  <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "14px", color: "#8A6D00", fontFamily: "Space Mono, monospace", fontWeight: 700, borderBottom: "1px solid rgba(0,0,0,0.08)", background: "rgba(240,177,0,0.08)" }}>
                    {isAr ? "نحن ✓" : "Us ✓"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPETITOR_COMPARISON.map((row, i) => (
                  <tr key={row.service} style={{ background: i % 2 === 0 ? "#FFFFFF" : "#FFFFFF" }}>
                    <td style={{ padding: "16px 20px", fontSize: "15px", color: "#1A1A1A", fontWeight: 600, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>{row.service}</td>
                    <td style={{ padding: "16px 20px", textAlign: "center", fontSize: "14px", color: "rgba(220,90,90,0.8)", fontFamily: "Space Mono, monospace", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>{row.competitor}</td>
                    <td style={{ padding: "16px 20px", textAlign: "center", fontSize: "16px", color: "#8A6D00", fontFamily: "Space Mono, monospace", fontWeight: 700, borderBottom: "1px solid rgba(0,0,0,0.06)", background: "rgba(240,177,0,0.08)" }}>{row.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS GRID ═══════════════════════════════════ */}
      <section id="products" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)", padding: "100px 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#1A1A1A", marginBottom: "16px" }}>
              {isAr ? <>اختر الخدمة <span style={{ color: "#8A6D00" }}>المناسبة لك</span></> : <>Choose The <span style={{ color: "#8A6D00" }}>Right Service</span></>}
            </h2>
            <p style={{ color: "rgba(26,26,26,0.65)", fontSize: "16px" }}>
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
                  borderRadius: "10px",
                  border: activeCategory === cat.key ? "1px solid rgba(240,177,0,0.4)" : "1px solid rgba(0,0,0,0.12)",
                  background: activeCategory === cat.key ? "#F0B100" : "#FFFFFF",
                  color: activeCategory === cat.key ? "#1A1A1A" : "#1A1A1A",
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                  fontSize: "15px",
                  fontWeight: activeCategory === cat.key ? 700 : 600,
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
      <section style={{ background: "#FFFFFF", padding: "100px 0", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#1A1A1A", marginBottom: "16px" }}>
              {isAr ? <>ضمانات لا تجدها <span style={{ color: "#8A6D00" }}>عند أحد غيرنا</span></> : <>Guarantees You Won't Find <span style={{ color: "#8A6D00" }}>Anywhere Else</span></>}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
            {SMART_SERVICES.map((service) => (
              <div
                key={service.titleAr}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "16px",
                  padding: "28px 24px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(240,177,0,0.35)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,0,0,0.08)"; }}
              >
                <div style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(240,177,0,0.12)",
                  border: "1px solid rgba(240,177,0,0.25)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  color: "#8A6D00",
                  marginBottom: "16px",
                }}>{service.icon}</div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#1A1A1A", marginBottom: "10px" }}>
                  {isAr ? service.titleAr : service.titleEn}
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(26,26,26,0.65)", lineHeight: 1.7 }}>
                  {isAr ? service.descAr : service.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GOLDEN BUNDLE ═══════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", padding: "100px 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            background: "#FFFFFF",
            border: "1.5px solid rgba(240,177,0,0.35)",
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
              background: "radial-gradient(ellipse, rgba(240,177,0,0.18) 0%, transparent 70%)",
            }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 20px",
                background: "rgba(240,177,0,0.12)",
                border: "1px solid rgba(240,177,0,0.3)",
                borderRadius: "10px",
                marginBottom: "24px",
              }}>
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", letterSpacing: "0.2em", color: "#8A6D00", textTransform: "uppercase" }}>
                  ★ {isAr ? "الباقة الذهبية" : "Golden Package"}
                </span>
              </div>

              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#1A1A1A", marginBottom: "16px", lineHeight: 1.2 }}>
                {isAr ? "متجر سلة + هوية بصرية" : "Salla Store + Brand Identity"}
                <br />
                <span style={{ color: "#8A6D00" }}>{isAr ? "+ إدارة سوشيال 3 أشهر" : "+ 3 Months Social Media"}</span>
              </h2>

              <p style={{ color: "rgba(26,26,26,0.65)", fontSize: "16px", marginBottom: "36px" }}>
                {isAr ? "الباقة الأكثر شمولاً — كل ما تحتاجه لإطلاق مشروعك" : "The most comprehensive package — everything you need to launch"}
              </p>

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "14px", color: "rgba(26,26,26,0.45)", textDecoration: "line-through", marginBottom: "4px" }}>
                    16,000 {isAr ? "ر.س" : "SAR"}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontFamily: "Space Mono, monospace", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 700, color: "#8A6D00" }}>4,499</span>
                    <span style={{ color: "rgba(26,26,26,0.6)", fontSize: "18px" }}>{isAr ? "ر.س" : "SAR"}</span>
                  </div>
                </div>
                <div style={{
                  background: "rgba(240,177,0,0.12)",
                  border: "1px solid rgba(240,177,0,0.3)",
                  borderRadius: "10px",
                  padding: "10px 24px",
                  color: "#8A6D00",
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
                  background: "#F0B100",
                  color: "#1A1A1A",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "18px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#F3DFA0"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#F0B100"; }}
              >
                {isAr ? "اطلب الباقة الذهبية" : "Get Golden Package"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═════════════════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", padding: "100px 0", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: "#1A1A1A" }}>
              {isAr ? "أسئلة شائعة" : "FAQ"}
            </h2>
          </div>
          {STORE_FAQ[(isAr ? "ar" : locale === "fr" ? "fr" : "en") as "ar" | "en" | "fr"].map((item) => (
            <FAQItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </section>

      {/* ═══ FINAL CTA ═══════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%)",
        padding: "100px 0",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#1A1A1A", marginBottom: "20px", lineHeight: 1.2 }}>
            {isAr ? "جاهز تبدأ مشروعك" : "Ready To Start"}
            <br />
            <span style={{ color: "#8A6D00" }}>{isAr ? "بأسعار تنافسية؟" : "With Competitive Prices?"}</span>
          </h2>
          <p style={{ color: "rgba(26,26,26,0.65)", fontSize: "16px", marginBottom: "40px" }}>
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
                background: "#F0B100",
                color: "#1A1A1A",
                borderRadius: "10px",
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
                background: "#FFFFFF",
                border: "1px solid rgba(240,177,0,0.4)",
                color: "#8A6D00",
                borderRadius: "10px",
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
