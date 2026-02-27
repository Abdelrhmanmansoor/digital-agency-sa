"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";

export default function Pricing() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const packages = locale === "ar" ? [
    {
      id: "basic",
      name: "الأساسية",
      price: "2,000",
      description: "مثالية للمشاريع الناشئة",
      features: [
        "تصميم متجر سلة أساسي",
        "إعداد 20 منتج",
        "ربط بوابة دفع واحدة",
        "دعم فني شهر واحد",
        "ثيم جاهز معدّل",
        "تدريب أساسي",
      ],
      featured: false,
    },
    {
      id: "pro",
      name: "الاحترافية",
      price: "5,000",
      description: "الأنسب للمشاريع الجادة",
      features: [
        "تصميم ثيم مخصص كامل",
        "إعداد 100 منتج",
        "ربط جميع بوابات الدفع",
        "دعم فني 3 أشهر",
        "تصميم هوية بصرية",
        "إعداد سوشيال ميديا",
        "حملة إطلاق تسويقية",
        "تقرير أداء شهري",
      ],
      featured: true,
    },
    {
      id: "enterprise",
      name: "المتقدمة",
      price: "8,000+",
      description: "للمشاريع الكبيرة والمتاجر المتطورة",
      features: [
        "كل مميزات الاحترافية",
        "تصميم مخصص من الصفر",
        "منتجات غير محدودة",
        "دعم VIP 6 أشهر",
        "تطبيق جوال مخصص",
        "أدوات تحليل متقدمة",
        "استراتيجية تسويق كاملة",
        "مدير حساب خاص",
      ],
      featured: false,
    },
  ] : [
    {
      id: "basic",
      name: "Basic",
      price: "2,000",
      description: "Perfect for startups",
      features: [
        "Basic Salla store design",
        "Setup 20 products",
        "One payment gateway",
        "1 month support",
        "Modified ready theme",
        "Basic training",
      ],
      featured: false,
    },
    {
      id: "pro",
      name: "Professional",
      price: "5,000",
      description: "Best for serious projects",
      features: [
        "Full custom theme design",
        "Setup 100 products",
        "All payment gateways",
        "3 months support",
        "Brand identity design",
        "Social media setup",
        "Launch marketing campaign",
        "Monthly performance report",
      ],
      featured: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "8,000+",
      description: "For large and advanced stores",
      features: [
        "All Professional features",
        "Fully custom design",
        "Unlimited products",
        "6 months VIP support",
        "Custom mobile app",
        "Advanced analytics",
        "Full marketing strategy",
        "Dedicated account manager",
      ],
      featured: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="relative pattern-overlay-dark"
      style={{ background: "#0A0A0A", padding: "120px 0" }}
    >
      <div ref={ref} className="max-w-[1400px] mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label justify-center mb-6" style={{ color: "rgba(200,169,98,0.7)" }}>
            {isRTL ? "الأسعار" : "Pricing"}
          </div>
          <h2
            style={{
              fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700,
              color: "#FAFAF7",
              marginBottom: "16px",
            }}
          >
            {isRTL ? "باقاتنا" : locale === "en" ? "Our Packages" : "Nos Forfaits"}
          </h2>
          <p style={{ color: "#8C8C7A", fontSize: "16px" }}>
            {isRTL ? "اختر الباقة المناسبة لمشروعك" : "Choose the right package for your project"}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="pricing-card"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? pkg.featured ? "scale(1.03)" : "translateY(0)"
                  : "translateY(30px)",
                transition: `all 0.6s ${index * 0.15}s cubic-bezier(0.19, 1, 0.22, 1)`,
                border: pkg.featured ? "2px solid #C8A962" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Most popular badge */}
              {pkg.featured && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <span
                    style={{
                      background: "#C8A962",
                      color: "#0A0A0A",
                      padding: "6px 20px",
                      fontSize: "11px",
                      fontFamily: "Space Mono, monospace",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    {isRTL ? "★ الأكثر طلباً" : "★ Most Popular"}
                  </span>
                </div>
              )}

              {/* Package Name */}
              <div style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: pkg.featured ? "#C8A962" : "#8C8C7A",
                    marginBottom: "8px",
                  }}
                >
                  {pkg.description}
                </div>
                <h3
                  style={{
                    fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#FAFAF7",
                  }}
                >
                  {pkg.name}
                </h3>
              </div>

              {/* Price */}
              <div className="my-8 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "clamp(36px, 3vw, 48px)",
                    fontWeight: 700,
                    color: "#C8A962",
                    lineHeight: 1,
                  }}
                >
                  {pkg.price}
                  <span style={{ fontSize: "16px", color: "#8C8C7A", marginRight: "4px" }}>
                    {isRTL ? " ر.س" : " SAR"}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-10">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      style={{ color: "#C8A962", fontSize: "14px", marginTop: "2px", flexShrink: 0 }}
                    >
                      ✓
                    </span>
                    <span style={{ color: "#8C8C7A", fontSize: "14px", lineHeight: 1.6 }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={getWhatsAppLink(
                  isRTL
                    ? `مرحباً! أريد الاستفسار عن باقة ${pkg.name} بسعر ${pkg.price} ر.س`
                    : `Hello! I'm interested in the ${pkg.name} package at ${pkg.price} SAR`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <button
                  className="w-full py-4"
                  style={{
                    background: pkg.featured ? "#C8A962" : "transparent",
                    border: pkg.featured ? "none" : "1px solid rgba(200,169,98,0.3)",
                    color: pkg.featured ? "#0A0A0A" : "#C8A962",
                    fontFamily: "Space Mono, monospace",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (pkg.featured) {
                      e.currentTarget.style.background = "#0A0A0A";
                      e.currentTarget.style.border = "1px solid #C8A962";
                      e.currentTarget.style.color = "#C8A962";
                    } else {
                      e.currentTarget.style.background = "rgba(200,169,98,0.1)";
                      e.currentTarget.style.borderColor = "#C8A962";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pkg.featured) {
                      e.currentTarget.style.background = "#C8A962";
                      e.currentTarget.style.border = "none";
                      e.currentTarget.style.color = "#0A0A0A";
                    } else {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "rgba(200,169,98,0.3)";
                    }
                  }}
                >
                  {isRTL ? "اطلب هذه الباقة" : "Request This Package"}
                </button>
              </a>
            </div>
          ))}
        </div>

        {/* Custom Package CTA */}
        <div className="text-center mt-16">
          <p style={{ color: "#8C8C7A", fontSize: "16px", marginBottom: "16px" }}>
            {isRTL ? "هل تحتاج باقة مخصصة؟" : "Need a custom package?"}
          </p>
          <a
            href={getWhatsAppLink(isRTL ? "مرحباً! أريد الاستفسار عن باقة مخصصة لمشروعي" : "Hello! I need a custom package for my project")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            {isRTL ? "تواصل معنا ←" : "Contact Us →"}
          </a>
        </div>
      </div>
    </section>
  );
}
