"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { getWhatsAppLink } from "@/lib/utils";

interface Service {
  number: string;
  name: string;
  description: string;
  includes: string[];
  price: string;
  monthly?: boolean;
  free?: boolean;
  badge?: string;
  image: string;
}

const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=600&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
];

function ServiceRow({ service, index, isRTL }: { service: Service; index: number; isRTL: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const waMessage = isRTL
    ? `مرحباً! أنا مهتم بخدمة ${service.name}. أرجو التواصل معي لمناقشة التفاصيل.`
    : `Hello! I'm interested in the ${service.name} service. Please contact me to discuss details.`;

  return (
    <div
      ref={ref}
      className={`service-row ${isOpen ? "is-open" : ""}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(20px)",
        transition: `opacity 0.6s ${index * 0.08}s ease, transform 0.6s ${index * 0.08}s ease, border-color 0.3s`,
      }}
    >
      <div
        className="service-row-header"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      >
        <span className="service-number">{service.number}</span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: isOpen ? "#C8A962" : "#E8E6E1",
            transition: "background 0.3s",
            margin: "0 20px",
          }}
        />
        <span
          className="service-name"
          style={{
            fontFamily: isRTL ? "Noto Kufi Arabic, sans-serif" : "sans-serif",
            fontSize: "clamp(18px, 2vw, 24px)",
          }}
        >
          {service.name}
        </span>
        {service.badge && (
          <span className="gold-badge ms-4">{service.badge}</span>
        )}
        {service.price !== "0" ? (
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "14px",
              color: isOpen ? "#C8A962" : "#8C8C7A",
              transition: "color 0.3s",
              marginRight: isRTL ? "0" : "24px",
              marginLeft: isRTL ? "24px" : "0",
              whiteSpace: "nowrap",
            }}
          >
            {isRTL ? `يبدأ من ${service.price} ر.س` : `From ${service.price} SAR`}
            {service.monthly && (isRTL ? "/شهر" : "/mo")}
          </div>
        ) : (
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "12px",
              color: "#C8A962",
              marginRight: isRTL ? "0" : "24px",
              marginLeft: isRTL ? "24px" : "0",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {isRTL ? "مجانية" : "FREE"}
          </div>
        )}
        <div
          style={{
            width: "24px",
            height: "24px",
            border: "1px solid",
            borderColor: isOpen ? "#C8A962" : "rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
            flexShrink: 0,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{ transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.3s", stroke: isOpen ? "#C8A962" : "currentColor" }}
          >
            <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div className="service-row-body">
        <div className="service-row-body-inner">
          <div className="service-row-content" style={{ padding: "0 0 40px 0" }}>
            {/* Image */}
            <div className="service-image-reveal">
              <div className="service-image-mask" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={service.image} alt={service.name} />
            </div>

            {/* Details */}
            <div>
              <p style={{ color: "#2D2D2D", fontSize: "16px", lineHeight: 1.8, marginBottom: "24px" }}>
                {service.description}
              </p>

              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#8C8C7A",
                    marginBottom: "12px",
                  }}
                >
                  {isRTL ? "يشمل" : "Includes"}:
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.includes.map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: "6px 14px",
                        border: "1px solid #E8E6E1",
                        fontSize: "13px",
                        color: "#2D2D2D",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={getWhatsAppLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-primary">
                  <span>
                    {service.free
                      ? (isRTL ? "جرّب الآن مجاناً" : "Try Free Now")
                      : (isRTL ? "اطلب هذه الخدمة" : "Request This Service")}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const services: Service[] = locale === "ar" ? [
    {
      number: "01",
      name: "تصميم وتطوير متاجر سلة",
      description: "نحوّل رؤيتك إلى متجر رقمي يبيع وأنت نائم. تصميم احترافي مخصص، ثيمات حصرية، تجربة مستخدم تحوّل الزائر لعميل دائم.",
      includes: ["تصميم UI/UX", "ثيم مخصص", "تحسين السرعة", "إعداد بوابات الدفع"],
      price: "3,500",
      image: SERVICE_IMAGES[0],
    },
    {
      number: "02",
      name: "إنشاء متجر إلكتروني من الصفر",
      description: "من الفكرة للإطلاق في أقل من أسبوعين. نبني لك متجراً جاهزاً للبيع مع كل ما تحتاجه: منتجات، شحن، دفع، وتسويق.",
      includes: ["إعداد المنصة", "إضافة المنتجات", "ربط الشحن والدفع", "تدريب شامل"],
      price: "2,000",
      image: SERVICE_IMAGES[1],
    },
    {
      number: "03",
      name: "التسويق الرقمي وإدارة الحملات",
      description: "حملات مدروسة بالأرقام. نعرف كيف نوصل لعميلك المثالي في الوقت المثالي بالرسالة المثالية.",
      includes: ["إدارة السوشيال", "إعلانات مدفوعة", "تحسين محركات البحث", "تحليل البيانات"],
      price: "1,500",
      monthly: true,
      image: SERVICE_IMAGES[2],
    },
    {
      number: "04",
      name: "الهوية البصرية والبراندنق",
      description: "هويتك البصرية هي أول ما يراه عميلك. نبنيها لتحكي قصتك وتترك أثراً لا يُنسى في ذهن كل من يراها.",
      includes: ["شعار احترافي", "دليل الهوية", "تصاميم السوشيال", "مواد تسويقية"],
      price: "2,500",
      image: SERVICE_IMAGES[3],
    },
    {
      number: "05",
      name: "تطوير المواقع والتطبيقات",
      description: "مواقع وتطبيقات سريعة وآمنة تعكس احترافية علامتك التجارية وتحقق أهدافك الرقمية.",
      includes: ["تصميم UX/UI", "تطوير Frontend", "لوحة تحكم", "صيانة دورية"],
      price: "5,000",
      image: SERVICE_IMAGES[4],
    },
    {
      number: "06",
      name: "إنتاج المحتوى الإبداعي",
      description: "محتوى يجذب، يقنع، ويحوّل. نصوص، تصاميم، وفيديوهات تتحدث بلسان علامتك التجارية.",
      includes: ["تصوير منتجات", "تصاميم سوشيال", "كتابة محتوى", "مونتاج فيديو"],
      price: "1,200",
      monthly: true,
      image: SERVICE_IMAGES[5],
    },
    {
      number: "07",
      name: "أدوات سلة الذكية",
      description: "أدوات ذكية مجانية تساعدك على إدارة متجرك وتطويره — من غير ما تحتاج مبرمج.",
      includes: ["حاسبة الأرباح", "مولّد CSS", "منشئ السياسات", "كاتب المحتوى الذكي"],
      price: "0",
      free: true,
      badge: "★ مجانية",
      image: SERVICE_IMAGES[6],
    },
  ] : [
    {
      number: "01",
      name: "Salla Store Design & Development",
      description: "We transform your vision into a digital store that sells while you sleep. Professional custom design, exclusive themes, UX that converts visitors into loyal customers.",
      includes: ["UI/UX Design", "Custom Theme", "Speed Optimization", "Payment Setup"],
      price: "3,500",
      image: SERVICE_IMAGES[0],
    },
    {
      number: "02",
      name: "Complete E-commerce Store from Scratch",
      description: "From idea to launch in less than two weeks. We build you a ready-to-sell store with everything you need.",
      includes: ["Platform Setup", "Product Upload", "Shipping & Payment", "Training"],
      price: "2,000",
      image: SERVICE_IMAGES[1],
    },
    {
      number: "03",
      name: "Digital Marketing & Campaign Management",
      description: "Data-driven campaigns. We know how to reach your ideal customer at the perfect time.",
      includes: ["Social Management", "Paid Ads", "SEO", "Analytics"],
      price: "1,500",
      monthly: true,
      image: SERVICE_IMAGES[2],
    },
    {
      number: "04",
      name: "Brand Identity & Visual Design",
      description: "Your brand identity is the first thing your customer sees. We build it to tell your story.",
      includes: ["Logo Design", "Brand Guide", "Social Designs", "Marketing Materials"],
      price: "2,500",
      image: SERVICE_IMAGES[3],
    },
    {
      number: "05",
      name: "Website & App Development",
      description: "Fast, secure websites and apps that reflect your brand's professionalism.",
      includes: ["UX/UI Design", "Frontend Dev", "Admin Panel", "Maintenance"],
      price: "5,000",
      image: SERVICE_IMAGES[4],
    },
    {
      number: "06",
      name: "Creative Content Production",
      description: "Content that attracts, convinces, and converts. Texts, designs, and videos.",
      includes: ["Product Photography", "Social Designs", "Copywriting", "Video Editing"],
      price: "1,200",
      monthly: true,
      image: SERVICE_IMAGES[5],
    },
    {
      number: "07",
      name: "Salla Smart Tools",
      description: "Free smart tools to help you manage and grow your store — no developer needed.",
      includes: ["Profit Calculator", "CSS Generator", "Policy Builder", "Content Writer"],
      price: "0",
      free: true,
      badge: "★ Free",
      image: SERVICE_IMAGES[6],
    },
  ];

  return (
    <section id="services" style={{ background: "#FFFFFF", padding: "120px 0" }}>
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <div className="section-label mb-4">
              {isRTL ? "خدماتنا" : "Services"}
            </div>
            <h2
              style={{
                fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                color: "#0A0A0A",
                lineHeight: 1.1,
              }}
            >
              {isRTL ? "ما نُتقنه" : locale === "en" ? "What We Master" : "Ce Que Nous Maîtrisons"}
            </h2>
          </div>
          <p style={{ color: "#8C8C7A", fontSize: "16px", maxWidth: "400px", lineHeight: 1.7 }}>
            {isRTL
              ? "من تصميم المتاجر إلى بناء الهويات — كل ما تحتاجه في مكان واحد"
              : "From store design to brand building — everything you need in one place"}
          </p>
        </div>

        {/* Services List */}
        <div>
          {services.map((service, index) => (
            <ServiceRow
              key={service.number}
              service={service}
              index={index}
              isRTL={isRTL}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
