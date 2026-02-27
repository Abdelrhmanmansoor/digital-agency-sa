"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";

const SERVICES = [
  {
    id: "salla-design",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 8h3M7 11h5"/>
        <rect x="13" y="7" width="5" height="5" rx="1"/>
      </svg>
    ),
    nameAr: "تصميم متجر سلة احترافي",
    nameEn: "Professional Salla Store Design",
    nameFr: "Conception Boutique Salla Pro",
    descAr: "تصميم متجر سلة متكامل يعكس هويتك ويزيد مبيعاتك — ألوان، خطوط، صفحات، وتجربة مستخدم مثالية للجوال",
    descEn: "Complete Salla store design reflecting your brand — colors, fonts, pages & perfect mobile UX",
    descFr: "Conception complète Salla — couleurs, polices, pages et UX mobile parfaite",
    price: "1,299",
    priceNote: "ريال",
    badge: "الأكثر طلباً",
    badgeEn: "Most Requested",
    featuresAr: ["تصميم الصفحة الرئيسية والقوائم", "صفحات المنتجات الاحترافية", "ضبط الألوان والخطوط والشعار", "تهيئة كاملة للجوال", "مراجعتان مجانيتان"],
    featuresEn: ["Homepage & navigation design", "Professional product pages", "Colors, fonts & logo setup", "Full mobile optimization", "Two free revisions"],
    color: "#BDEE63",
    featured: true,
  },
  {
    id: "store-launch",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    nameAr: "تأسيس متجر إلكتروني من الصفر",
    nameEn: "E-Commerce Store from Scratch",
    nameFr: "Boutique E-commerce de Zéro",
    descAr: "إنشاء متجرك على سلة أو زد بالكامل — من إنشاء الحساب حتى رفع المنتجات وربط الدفع والشحن",
    descEn: "Full store on Salla or Zid — account setup to products, payment & shipping",
    descFr: "Boutique complète sur Salla ou Zid — de la création au paiement & livraison",
    price: "799",
    priceNote: "ريال",
    badge: null,
    badgeEn: null,
    featuresAr: ["إنشاء وإعداد الحساب", "رفع المنتجات والأسعار", "ربط بوابة الدفع", "إعداد طرق الشحن", "تدريب مجاني على الإدارة"],
    featuresEn: ["Account creation & setup", "Products & pricing upload", "Payment gateway connection", "Shipping methods setup", "Free admin training"],
    color: "#7C9EFF",
    featured: false,
  },
  {
    id: "store-management",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
      </svg>
    ),
    nameAr: "إدارة وتشغيل المتجر الإلكتروني",
    nameEn: "Store Management & Operation",
    nameFr: "Gestion & Opération de Boutique",
    descAr: "ندير متجرك باحترافية — إضافة المنتجات، متابعة الطلبات، خدمة العملاء، وتقارير شهرية",
    descEn: "Professional store management — products, orders, customer service & monthly reports",
    descFr: "Gestion professionnelle — produits, commandes, service client & rapports",
    price: "999",
    priceNote: "ريال/شهر",
    badge: null,
    badgeEn: null,
    featuresAr: ["إدارة وإضافة المنتجات", "متابعة الطلبات يومياً", "خدمة العملاء والردود", "تقرير شهري مفصل", "دعم طارئ 24/7"],
    featuresEn: ["Product management & adding", "Daily order tracking", "Customer service & replies", "Detailed monthly report", "24/7 emergency support"],
    color: "#F5A623",
    featured: false,
  },
  {
    id: "digital-marketing",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    nameAr: "تسويق رقمي وإعلانات ممولة",
    nameEn: "Digital Marketing & Paid Ads",
    nameFr: "Marketing Digital & Publicités",
    descAr: "حملات إعلانية محترفة على سناب شات، انستغرام، تيك توك، وجوجل — نستهدف جمهورك المثالي لأعلى عائد",
    descEn: "Pro ad campaigns on Snapchat, Instagram, TikTok & Google for maximum ROI",
    descFr: "Campagnes pro sur Snapchat, Instagram, TikTok & Google pour ROI maximum",
    price: "899",
    priceNote: "ريال/شهر",
    badge: null,
    badgeEn: null,
    featuresAr: ["إعلانات سناب شات وتيك توك", "إعلانات انستغرام وفيسبوك", "حملات جوجل ويوتيوب", "إنشاء المحتوى الإعلاني", "تقارير أداء أسبوعية"],
    featuresEn: ["Snapchat & TikTok ads", "Instagram & Facebook ads", "Google & YouTube campaigns", "Ad content creation", "Weekly performance reports"],
    color: "#FF6B6B",
    featured: false,
  },
  {
    id: "branding",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
      </svg>
    ),
    nameAr: "هوية بصرية وتصميم جرافيك",
    nameEn: "Brand Identity & Graphic Design",
    nameFr: "Identité Visuelle & Graphisme",
    descAr: "لوجو احترافي، ألوان العلامة التجارية، تصاميم السوشيال ميديا، وموشن جرافيك لمتجرك",
    descEn: "Professional logo, brand colors, social media designs & motion graphics for your store",
    descFr: "Logo pro, couleurs de marque, designs réseaux sociaux & motion graphics",
    price: "799",
    priceNote: "ريال",
    badge: null,
    badgeEn: null,
    featuresAr: ["لوجو احترافي متعدد الصيغ", "دليل الهوية البصرية", "تصاميم السوشيال ميديا", "بانرات وإعلانات مصورة", "موشن جرافيك بسيط"],
    featuresEn: ["Multi-format professional logo", "Brand identity guide", "Social media designs", "Banners & image ads", "Simple motion graphics"],
    color: "#E8A0BF",
    featured: false,
  },
  {
    id: "seo",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
      </svg>
    ),
    nameAr: "تحسين محركات البحث SEO",
    nameEn: "Search Engine Optimization",
    nameFr: "Optimisation Moteurs de Recherche",
    descAr: "تصدّر نتائج جوجل وسناب شات — تحسين كلماتك المفتاحية، بناء الروابط، وزيادة زوار متجرك",
    descEn: "Rank #1 on Google — keyword optimization, link building & traffic growth for your store",
    descFr: "Classez-vous #1 sur Google — mots-clés, liens et croissance du trafic",
    price: "699",
    priceNote: "ريال/شهر",
    badge: null,
    badgeEn: null,
    featuresAr: ["تحليل الكلمات المفتاحية", "تحسين محتوى المتجر", "بناء الروابط الخارجية", "تحسين سرعة الصفحات", "تقرير SEO شهري"],
    featuresEn: ["Keyword research & analysis", "Store content optimization", "External link building", "Page speed optimization", "Monthly SEO report"],
    color: "#BDEE63",
    featured: false,
  },
  {
    id: "integrations",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    nameAr: "ربط الخدمات والتكاملات",
    nameEn: "Integrations & Connections",
    nameFr: "Intégrations & Connexions",
    descAr: "ربط متجرك بكل الأدوات — تابي، تمارا، STC Pay، Google Analytics، وجوجل ميرشنت",
    descEn: "Connect your store to all tools — Tabby, Tamara, STC Pay, Google Analytics & Merchant",
    descFr: "Connectez à tous les outils — Tabby, Tamara, STC Pay, Google Analytics",
    price: "299",
    priceNote: "ريال",
    badge: "سريع",
    badgeEn: "Fast",
    featuresAr: ["تابي وتمارا (BNPL)", "STC Pay وأبشر", "Google Analytics & Search Console", "جوجل ميرشنت والإعلانات", "ربط خدمات الشحن"],
    featuresEn: ["Tabby & Tamara (BNPL)", "STC Pay & Absher", "Google Analytics & Search Console", "Google Merchant & Ads", "Shipping services link"],
    color: "#7C9EFF",
    featured: false,
  },
  {
    id: "govt",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    nameAr: "الخدمات الحكومية والتجارية",
    nameEn: "Government & Business Services",
    nameFr: "Services Gouvernementaux",
    descAr: "استخراج السجل التجاري، وثيقة العمل الحر، فتح الحساب البنكي، والتسجيل في منصات الأعمال",
    descEn: "Commercial registration, freelance certificate, business bank account & platform registration",
    descFr: "Enregistrement commercial, certificat freelance & ouverture compte bancaire",
    price: "249",
    priceNote: "ريال",
    badge: null,
    badgeEn: null,
    featuresAr: ["إصدار السجل التجاري", "وثيقة عمل حر", "فتح حساب بنكي تجاري", "التسجيل في معروف وأعمال", "تسجيل ضريبة القيمة المضافة"],
    featuresEn: ["Commercial registration", "Freelance work certificate", "Business bank account", "Maroof & Aamal registration", "VAT registration"],
    color: "#F5A623",
    featured: false,
  },
  {
    id: "content",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
        <path d="m15 5 3 3"/>
      </svg>
    ),
    nameAr: "إنتاج المحتوى الرقمي",
    nameEn: "Digital Content Production",
    nameFr: "Production de Contenu Digital",
    descAr: "محتوى سوشيال ميديا بالذكاء الاصطناعي — تصاميم يومية، ريلز، قصص، وكتابة محتوى إبداعي",
    descEn: "AI-powered social media content — daily designs, reels, stories & creative copywriting",
    descFr: "Contenu IA pour réseaux sociaux — designs, reels, stories & rédaction créative",
    price: "1,199",
    priceNote: "ريال/شهر",
    badge: null,
    badgeEn: null,
    featuresAr: ["30 تصميم سوشيال ميديا شهرياً", "كتابة كابشن وهاشتاقات", "ريلز وقصص انستغرام", "جدولة وتنظيم النشر", "تصوير منتجات إبداعي"],
    featuresEn: ["30 social media designs/month", "Caption & hashtag writing", "Instagram reels & stories", "Content scheduling", "Creative product photography"],
    color: "#E8A0BF",
    featured: false,
  },
];

export default function Services() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const title = locale === "ar" ? "خدماتنا الرقمية" : locale === "fr" ? "Nos Services Digitaux" : "Our Digital Services";
  const subtitle = locale === "ar"
    ? "تصميم متاجر سلة وزد، تسويق رقمي، هوية بصرية، SEO — كل ما يحتاجه متجرك في مكان واحد بأسعار لا تُنافَس"
    : locale === "fr"
    ? "Conception Salla & Zid, marketing digital, branding, SEO — tout ce dont votre boutique a besoin"
    : "Salla & Zid store design, digital marketing, branding, SEO — everything your store needs at unbeatable prices";
  const label = locale === "ar" ? "أسعار تنافسية جداً" : locale === "fr" ? "Prix très compétitifs" : "Very Competitive Prices";
  const ctaText = locale === "ar" ? "اطلب الآن" : locale === "fr" ? "Commander" : "Order Now";
  const guaranteeText = locale === "ar"
    ? "✓ ضمان جودة 30 يوم  ·  ✓ دفع 50% مقدماً  ·  ✓ تسليم في الوقت المحدد"
    : "✓ 30-day quality guarantee  ·  ✓ 50% upfront  ·  ✓ On-time delivery";

  return (
    <section id="services" style={{ background: "#0D0D0D", padding: "100px 0 120px" }}>
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16" dir={isRTL ? "rtl" : "ltr"}>
          <div className="section-label justify-center mb-4">{label}</div>
          <h2 style={{
            fontFamily: isRTL ? "'Zain', sans-serif" : "sans-serif",
            fontSize: "clamp(32px, 4.5vw, 60px)",
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.05,
            marginBottom: "16px",
            letterSpacing: isRTL ? "0" : "-0.03em",
          }}>
            {title}
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.45)", fontSize: "clamp(15px, 2vw, 18px)",
            maxWidth: "680px", margin: "0 auto", lineHeight: 1.7,
            fontFamily: isRTL ? "'Zain', sans-serif" : "inherit",
          }}>
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className="services-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}
        >
          {SERVICES.map((service) => {
            const name = locale === "ar" ? service.nameAr : locale === "fr" ? service.nameFr : service.nameEn;
            const desc = locale === "ar" ? service.descAr : locale === "fr" ? service.descFr : service.descEn;
            const features = locale === "ar" ? service.featuresAr : service.featuresEn;
            const badge = locale === "ar" ? service.badge : service.badgeEn;
            const isHovered = hoveredId === service.id;
            const isFeatured = service.featured;
            const whatsapp = getWhatsAppLink(
              isRTL
                ? `مرحباً! أريد الاستفسار عن خدمة "${service.nameAr}" — السعر ${service.price} ${service.priceNote}`
                : `Hello! I want to inquire about "${service.nameEn}" — Price ${service.price} SAR`
            );

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: isFeatured ? "rgba(189,238,99,0.04)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isHovered || isFeatured ? service.color + "50" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "20px",
                  padding: "28px",
                  transition: "all 0.35s cubic-bezier(0.19,1,0.22,1)",
                  transform: isHovered ? "translateY(-5px)" : "none",
                  boxShadow: isHovered ? `0 20px 60px ${service.color}10` : "none",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Top glow */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                  background: `linear-gradient(to right, transparent, ${service.color}60, transparent)`,
                  opacity: isHovered || isFeatured ? 1 : 0, transition: "opacity 0.3s",
                }} />

                <div style={{ flex: 1 }}>
                  {/* Icon + Badge */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
                    <div style={{
                      width: "52px", height: "52px", borderRadius: "14px",
                      background: `${service.color}12`,
                      border: `1px solid ${service.color}25`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: service.color,
                      flexShrink: 0,
                    }}>
                      {service.icon}
                    </div>
                    {badge && (
                      <span style={{
                        padding: "4px 12px", borderRadius: "100px",
                        background: isFeatured ? "var(--lime)" : `${service.color}20`,
                        color: isFeatured ? "#0D0D0D" : service.color,
                        fontSize: "11px", fontWeight: 700,
                        fontFamily: isRTL ? "'Zain', sans-serif" : "Space Mono, monospace",
                      }}>
                        {badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: isRTL ? "'Zain', sans-serif" : "sans-serif",
                    fontSize: isRTL ? "20px" : "16px",
                    fontWeight: 700, color: "#FFFFFF",
                    marginBottom: "10px", lineHeight: 1.3,
                  }}>
                    {name}
                  </h3>

                  {/* Description */}
                  <p style={{
                    color: "rgba(255,255,255,0.48)",
                    fontSize: isRTL ? "15px" : "13px",
                    lineHeight: 1.65, marginBottom: "18px",
                    fontFamily: isRTL ? "'Zain', sans-serif" : "inherit",
                  }}>
                    {desc}
                  </p>

                  {/* Features */}
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {features.slice(0, 4).map((f, i) => (
                      <li key={i} style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        color: "rgba(255,255,255,0.6)",
                        fontSize: isRTL ? "14px" : "12px",
                        fontFamily: isRTL ? "'Zain', sans-serif" : "inherit",
                      }}>
                        <span style={{
                          width: "5px", height: "5px", borderRadius: "50%",
                          background: service.color, flexShrink: 0,
                        }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price + CTA */}
                <div>
                  <div style={{ marginBottom: "14px" }}>
                    <span style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: "28px", fontWeight: 700,
                      color: service.color,
                    }}>
                      {service.price}
                    </span>
                    <span style={{
                      color: "rgba(255,255,255,0.35)", fontSize: "13px",
                      [isRTL ? "marginRight" : "marginLeft"]: "6px",
                    }}>
                      {service.priceNote}
                    </span>
                  </div>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                    <button style={{
                      width: "100%", padding: "12px 20px", borderRadius: "100px",
                      background: isHovered || isFeatured ? service.color : "transparent",
                      border: `1px solid ${isHovered || isFeatured ? service.color : "rgba(255,255,255,0.15)"}`,
                      color: isHovered || isFeatured ? "#0D0D0D" : "rgba(255,255,255,0.7)",
                      fontWeight: 700,
                      fontFamily: isRTL ? "'Zain', sans-serif" : "Space Mono, monospace",
                      fontSize: isRTL ? "15px" : "12px",
                      letterSpacing: isRTL ? "0" : "0.05em",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}>
                      {ctaText}
                    </button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee note */}
        <p dir={isRTL ? "rtl" : "ltr"} style={{
          textAlign: "center", marginTop: "48px",
          color: "rgba(255,255,255,0.22)",
          fontSize: "12px", fontFamily: "Space Mono, monospace",
          letterSpacing: "0.12em",
        }}>
          {guaranteeText}
        </p>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
