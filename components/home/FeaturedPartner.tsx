"use client";

import { useLocale } from "next-intl";
import Link from "next/link";

export default function FeaturedPartner() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const OTHER_PARTNERS = [
    { name: "متجر الأناقة", sector: locale === "ar" ? "أزياء" : "Fashion", logo: "AE" },
    { name: "Tech Hub", sector: "Technology", logo: "TH" },
    { name: "نور الذهب", sector: "عطور", logo: "NG" },
    { name: "FitLife", sector: "Health & Fitness", logo: "FL" },
  ];

  return (
    <section
      className="relative pattern-overlay-dark"
      style={{ background: "#0A0A0A", padding: "120px 0" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        {/* Section Label */}
        <div className="section-label mb-16" style={{ color: "rgba(200,169,98,0.7)" }}>
          {locale === "ar" ? "شريك مميز" : locale === "en" ? "Featured Partner" : "Partenaire Vedette"}
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isRTL ? "" : ""}`}>
          {/* Left: Laptop Mockup */}
          <div className="mockup-frame">
            <div className="mockup-bar">
              <div className="mockup-dot" style={{ background: "#FF5F57" }} />
              <div className="mockup-dot" style={{ background: "#FEBC2E" }} />
              <div className="mockup-dot" style={{ background: "#28C840" }} />
              <div
                style={{
                  flex: 1,
                  height: "18px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "4px",
                  marginLeft: "8px",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "8px",
                }}
              >
                <span style={{ fontFamily: "Space Mono", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
                  tf1one.com
                </span>
              </div>
            </div>
            <div className="mockup-screen">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                alt="TF1ONE"
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </div>

          {/* Right: Content */}
          <div style={{ color: "#FAFAF7" }}>
            <div className="gold-badge mb-6">
              {locale === "ar" ? "★ شريك مميز" : "★ Featured Partner"}
            </div>

            <h2
              style={{
                fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif",
                fontSize: "clamp(36px, 4vw, 56px)",
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: "8px",
              }}
            >
              TF1ONE
            </h2>

            <div
              style={{
                width: "60px",
                height: "2px",
                background: "#C8A962",
                marginBottom: "24px",
              }}
            />

            <p
              style={{
                color: "#8C8C7A",
                fontSize: "16px",
                lineHeight: 1.8,
                marginBottom: "32px",
              }}
            >
              {locale === "ar"
                ? "شراكة استراتيجية بنينا فيها منصة رقمية متكاملة تجمع بين الفخامة والأداء. صممنا تجربة مستخدم استثنائية تعكس هوية العلامة التجارية وتحول كل زيارة إلى فرصة بيع."
                : "A strategic partnership where we built a complete digital platform combining luxury and performance. We designed an exceptional user experience that reflects the brand identity and converts every visit into a sales opportunity."}
            </p>

            {/* Challenge / Solution / Result */}
            <div className="space-y-6 mb-10">
              {[
                {
                  icon: "⚡",
                  title: locale === "ar" ? "التحدي" : "Challenge",
                  text: locale === "ar" ? "منصة قديمة بتجربة مستخدم ضعيفة تفقد 60% من الزوار قبل الشراء" : "Old platform with poor UX losing 60% of visitors before purchase",
                },
                {
                  icon: "✦",
                  title: locale === "ar" ? "الحل" : "Solution",
                  text: locale === "ar" ? "إعادة بناء كاملة بتصميم مخصص وتحسين مسار الشراء بالكامل" : "Complete rebuild with custom design and full purchase funnel optimization",
                },
                {
                  icon: "📈",
                  title: locale === "ar" ? "النتيجة" : "Result",
                  text: "",
                  stats: [
                    { value: "+340%", label: locale === "ar" ? "زيادة المبيعات" : "Sales Increase" },
                    { value: "-45%", label: locale === "ar" ? "معدل التخلي" : "Cart Abandonment" },
                  ],
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div style={{ fontSize: "20px", minWidth: "28px" }}>{item.icon}</div>
                  <div>
                    <div
                      style={{
                        fontFamily: "Space Mono, monospace",
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#C8A962",
                        marginBottom: "6px",
                      }}
                    >
                      {item.title}
                    </div>
                    {item.text && (
                      <div style={{ color: "#8C8C7A", fontSize: "14px", lineHeight: 1.7 }}>
                        {item.text}
                      </div>
                    )}
                    {item.stats && (
                      <div className="flex gap-8 mt-2">
                        {item.stats.map((s) => (
                          <div key={s.label}>
                            <div
                              style={{
                                fontFamily: "Space Mono, monospace",
                                fontSize: "28px",
                                fontWeight: 700,
                                color: "#C8A962",
                              }}
                            >
                              {s.value}
                            </div>
                            <div style={{ color: "#8C8C7A", fontSize: "12px" }}>{s.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://www.tf1one.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              <span>{locale === "ar" ? "زيارة الموقع" : "Visit Website"}</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Other Partners */}
        <div className="mt-20">
          <div className="section-label mb-8" style={{ color: "rgba(200,169,98,0.5)" }}>
            {locale === "ar" ? "شركاء آخرون" : "More Partners"}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {OTHER_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="group cursor-pointer p-6"
                style={{
                  border: "1px solid rgba(200,169,98,0.1)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,169,98,0.3)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(200,169,98,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,169,98,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#C8A962",
                    marginBottom: "8px",
                    transition: "color 0.3s",
                  }}
                >
                  {partner.logo}
                </div>
                <div style={{ color: "#FAFAF7", fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>
                  {partner.name}
                </div>
                <div
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#8C8C7A",
                  }}
                >
                  {partner.sector}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

