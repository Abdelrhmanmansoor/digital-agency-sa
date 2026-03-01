"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Product, BADGE_STYLES, calculateSavings, getProductsByCategory } from "@/lib/store-data";
import { getWhatsAppLink } from "@/lib/utils";

interface Props {
  product: Product;
}

/* ─── Star Rating Component ────────────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= Math.floor(rating) ? "#C8A962" : "rgba(200,169,98,0.3)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

/* ─── Image Placeholder ────────────────────────────────────────────────────── */
function ProductImage({ product, isAr }: { product: Product; isAr: boolean }) {
  const [imgError, setImgError] = useState(false);
  
  // Category icons
  const categoryIcons: Record<string, string> = {
    salla: "🛒",
    zid: "🏪",
    design: "🎨",
    marketing: "📈",
    web: "💻",
    seo: "🔍",
  };

  if (product.image && !imgError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={product.image}
        alt={isAr ? product.nameAr : product.nameEn}
        onError={() => setImgError(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    );
  }

  // Placeholder with gradient and icon
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "120px",
          height: "120px",
          background: "rgba(200,169,98,0.08)",
          border: "1px solid rgba(200,169,98,0.2)",
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "48px",
        }}
      >
        {categoryIcons[product.category] || "📦"}
      </div>
      <div
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "12px",
          color: "rgba(200,169,98,0.5)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {product.category}
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────────────────── */
export default function ProductDetailClient({ product }: Props) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const savings = calculateSavings(product);
  const badgeStyle = product.badge ? BADGE_STYLES[product.badge] : null;

  const name = isAr ? product.nameAr : product.nameEn;
  const description = isAr ? product.descriptionAr : product.descriptionEn;
  const shortDesc = isAr ? product.shortDescAr : product.shortDescEn;
  const badgeLabel = isAr ? product.badgeLabelAr : product.badgeLabelEn;

  const whatsappMsg = `مرحباً، أريد طلب خدمة: ${product.nameAr}\nالسعر: ${product.price.toLocaleString()} ر.س${product.isMonthly ? " / شهر" : ""}`;

  // Related products
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div dir={dir} lang={locale} style={{ fontFamily: "'Zain', sans-serif", background: "#0A0A0A", minHeight: "100vh" }}>
      {/* ═══ BREADCRUMB ═══════════════════════════════════════════════════════ */}
      <div style={{ background: "#0D0D0D", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "16px 0" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
            <Link href={`/${locale}`} style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <Link href={`/${locale}/store`} style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
              {isAr ? "المتجر" : "Store"}
            </Link>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ color: "#C8A962" }}>{name}</span>
          </nav>
        </div>
      </div>

      {/* ═══ MAIN PRODUCT SECTION ═════════════════════════════════════════════ */}
      <section style={{ padding: "60px 0 100px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
          <div className="product-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
            
            {/* ─── Product Image ─────────────────────────────────────────────── */}
            <div style={{ position: "sticky", top: "100px" }}>
              <div
                style={{
                  aspectRatio: "4/3",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  position: "relative",
                }}
              >
                {/* Badge */}
                {badgeStyle && badgeLabel && (
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: isAr ? "20px" : "auto",
                      left: isAr ? "auto" : "20px",
                      background: badgeStyle.bg,
                      border: `1px solid ${badgeStyle.border}`,
                      color: badgeStyle.color,
                      padding: "8px 16px",
                      borderRadius: "100px",
                      fontSize: "12px",
                      fontWeight: 700,
                      fontFamily: "Space Mono, monospace",
                      letterSpacing: "0.1em",
                      zIndex: 10,
                    }}
                  >
                    {badgeLabel}
                  </div>
                )}

                {/* Savings badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    left: isAr ? "20px" : "auto",
                    right: isAr ? "auto" : "20px",
                    background: "rgba(189,238,99,0.15)",
                    border: "1px solid rgba(189,238,99,0.4)",
                    color: "#BDEE63",
                    padding: "8px 16px",
                    borderRadius: "100px",
                    fontSize: "12px",
                    fontWeight: 700,
                    fontFamily: "Space Mono, monospace",
                    zIndex: 10,
                  }}
                >
                  {isAr ? `وفّر ${savings}%` : `Save ${savings}%`}
                </div>

                {/* Favorite button */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: isAr ? "20px" : "auto",
                    left: isAr ? "auto" : "20px",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: isFavorite ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.1)",
                    border: isFavorite ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(255,255,255,0.15)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    zIndex: 10,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill={isFavorite ? "#EF4444" : "none"} stroke={isFavorite ? "#EF4444" : "#FFF"} strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>

                <ProductImage product={product} isAr={isAr} />
              </div>
            </div>

            {/* ─── Product Details ───────────────────────────────────────────── */}
            <div>
              {/* Category */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  background: "rgba(200,169,98,0.08)",
                  border: "1px solid rgba(200,169,98,0.2)",
                  borderRadius: "100px",
                  marginBottom: "20px",
                }}
              >
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "11px", color: "#C8A962", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {product.category}
                </span>
              </div>

              {/* Name */}
              <h1
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 900,
                  color: "#FAFAF7",
                  lineHeight: 1.2,
                  marginBottom: "16px",
                }}
              >
                {name}
              </h1>

              {/* Short description */}
              <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "24px" }}>
                {shortDesc}
              </p>

              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                <Stars rating={product.rating} />
                <span style={{ fontFamily: "Space Mono, monospace", fontSize: "14px", color: "#C8A962", fontWeight: 700 }}>
                  {product.rating}
                </span>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
                  ({product.reviewCount} {isAr ? "تقييم" : "reviews"})
                </span>
              </div>

              {/* Price */}
              <div style={{ background: "rgba(200,169,98,0.05)", borderRadius: "20px", padding: "28px", marginBottom: "32px", border: "1px solid rgba(200,169,98,0.1)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "Space Mono, monospace", fontSize: "14px", color: "rgba(255,255,255,0.3)", textDecoration: "line-through" }}>
                    {product.originalPrice.toLocaleString()} {isAr ? "ر.س" : "SAR"}
                  </span>
                  <span style={{ fontSize: "12px", color: "rgba(255,100,100,0.8)", fontFamily: "Space Mono, monospace" }}>
                    {isAr ? "سعر المنافسين" : "Competitor price"}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                  <span style={{ fontFamily: "Space Mono, monospace", fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 700, color: "#C8A962", lineHeight: 1 }}>
                    {product.price.toLocaleString()}
                  </span>
                  <span style={{ fontSize: "20px", color: "rgba(255,255,255,0.5)" }}>
                    {isAr ? "ر.س" : "SAR"}{product.isMonthly ? (isAr ? " / شهر" : " / month") : ""}
                  </span>
                </div>
              </div>

              {/* Delivery */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", padding: "16px 20px", background: "rgba(189,238,99,0.05)", borderRadius: "12px", border: "1px solid rgba(189,238,99,0.15)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BDEE63" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                <span style={{ fontSize: "15px", color: "#BDEE63" }}>
                  {isAr ? `مدة التنفيذ: ${product.deliveryDays} ${product.deliveryDays > 10 ? "يوم" : "أيام"}` : `Delivery: ${product.deliveryDays} days`}
                </span>
              </div>

              {/* Buy Buttons */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <a
                  href={getWhatsAppLink(whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    minWidth: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "18px 32px",
                    background: "#BDEE63",
                    color: "#0A0A0A",
                    borderRadius: "100px",
                    fontSize: "18px",
                    fontWeight: 700,
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  {isAr ? "اطلب الآن" : "Order Now"}
                </a>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  style={{
                    padding: "18px 28px",
                    background: "transparent",
                    border: `1px solid ${isFavorite ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.15)"}`,
                    borderRadius: "100px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "#EF4444" : "none"} stroke={isFavorite ? "#EF4444" : "rgba(255,255,255,0.5)"} strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span style={{ color: isFavorite ? "#EF4444" : "rgba(255,255,255,0.5)", fontSize: "15px" }}>
                    {isAr ? "المفضلة" : "Favorite"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES SECTION ═══════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: "#0D0D0D", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#FAFAF7", marginBottom: "40px", textAlign: "center" }}>
            {isAr ? "ما يشمله هذا المنتج" : "What's Included"}
          </h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {product.features.map((feature, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  padding: "24px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "16px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(189,238,99,0.1)",
                    border: "1px solid rgba(189,238,99,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BDEE63" strokeWidth="3">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                </div>
                <span style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
                  {isAr ? feature.ar : feature.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FULL DESCRIPTION ═══════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: "#0A0A0A" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#FAFAF7", marginBottom: "32px" }}>
            {isAr ? "تفاصيل الخدمة" : "Service Details"}
          </h2>
          <div
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 2,
              whiteSpace: "pre-line",
            }}
          >
            {description}
          </div>
        </div>
      </section>

      {/* ═══ RELATED PRODUCTS ═══════════════════════════════════════════════════ */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: "80px 0", background: "#0D0D0D", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#FAFAF7", marginBottom: "40px", textAlign: "center" }}>
              {isAr ? "خدمات مشابهة" : "Related Services"}
            </h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/${locale}/store/${p.slug}`}
                  style={{
                    display: "block",
                    background: "linear-gradient(160deg, #141414 0%, #111111 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "20px",
                    padding: "28px",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#FAFAF7", marginBottom: "8px" }}>
                    {isAr ? p.nameAr : p.nameEn}
                  </h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>
                    {isAr ? p.shortDescAr : p.shortDescEn}
                  </p>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "20px", color: "#C8A962", fontWeight: 700 }}>
                    {p.price.toLocaleString()} {isAr ? "ر.س" : "SAR"}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA SECTION ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 0", background: "#0A0A0A", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#FAFAF7", marginBottom: "20px" }}>
            {isAr ? "جاهز تبدأ؟" : "Ready to Start?"}
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", marginBottom: "32px" }}>
            {isAr ? "تواصل معنا الآن واحصل على استشارة مجانية" : "Contact us now and get a free consultation"}
          </p>
          <a
            href={getWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "18px 48px",
              background: "#C8A962",
              color: "#0A0A0A",
              borderRadius: "100px",
              fontSize: "18px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {isAr ? "تواصل الآن" : "Contact Now"}
          </a>
        </div>
      </section>

      {/* ═══ RESPONSIVE STYLES ═══════════════════════════════════════════════════ */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
          .product-detail-grid > div:first-child {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
