"use client";

import { useLocale } from "next-intl";

const TESTIMONIALS = [
  {
    nameAr: "محمد العنزي",    nameEn: "Mohammed Al-Anazi",
    roleAr: "صاحب متجر سلة", roleEn: "Salla Store Owner",
    textAr: "فريق محترف جداً، صمموا متجري بشكل احترافي وزادوا مبيعاتي بنسبة 40% خلال الشهر الأول. أنصح بهم بقوة.",
    textEn: "Extremely professional team. They designed my store beautifully and increased my sales by 40% in the first month.",
    stars: 5, avatar: "م", accentColor: "#BDEE63",
  },
  {
    nameAr: "سارة الشمري",      nameEn: "Sara Al-Shammari",
    roleAr: "صاحبة متجر عطور", roleEn: "Perfume Store Owner",
    textAr: "الهوية البصرية التي صمموها لمتجري غيّرت كل شيء. العملاء يثنون عليها دائماً.",
    textEn: "The brand identity they designed transformed everything. Customers always compliment it.",
    stars: 5, avatar: "س", accentColor: "#E8A0BF",
  },
  {
    nameAr: "عبدالله الحربي",  nameEn: "Abdullah Al-Harbi",
    roleAr: "صاحب متجر ملابس", roleEn: "Fashion Store Owner",
    textAr: "الحملة التسويقية حققت مبيعات في أسبوع تساوي مبيعات شهر كامل. عمل احترافي بكل معنى الكلمة.",
    textEn: "The marketing campaign achieved in one week what normally takes a month. Truly professional work.",
    stars: 5, avatar: "ع", accentColor: "#BDEE63",
  },
  {
    nameAr: "نورة القحطاني",     nameEn: "Noura Al-Qahtani",
    roleAr: "صاحبة متجر عبايات", roleEn: "Abaya Store Owner",
    textAr: "سرعة التنفيذ مذهلة. التصميم كان جاهزاً في أقل من أسبوعين بجودة تفوق توقعاتي.",
    textEn: "Incredible speed. The design was ready in less than two weeks with quality that exceeded my expectations.",
    stars: 5, avatar: "ن", accentColor: "#F5A623",
  },
  {
    nameAr: "خالد البلوي",    nameEn: "Khaled Al-Balawi",
    roleAr: "صاحب متجر عسل",  roleEn: "Honey Store Owner",
    textAr: "الأدوات المجانية كانت نقطة تحول لمتجري. والدعم الفني لا يقدر بثمن. استمروا في هذا العمل الرائع.",
    textEn: "The free tools were a turning point for my store. The technical support is priceless.",
    stars: 5, avatar: "خ", accentColor: "#BDEE63",
  },
  {
    nameAr: "ريم الزهراني",   nameEn: "Reem Al-Zahrani",
    roleAr: "صاحبة متجر ورد", roleEn: "Flowers Store Owner",
    textAr: "الاحترافية والإبداع والالتزام بالمواعيد شيء نادر. تجربة لن تُنسى في رحلتي التجارية.",
    textEn: "Professionalism, creativity and meeting deadlines — a rare combination. Unforgettable experience.",
    stars: 5, avatar: "ر", accentColor: "#E8A0BF",
  },
];

// Duplicate for seamless loop
const ROW1 = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
const ROW2 = [...TESTIMONIALS].reverse().concat([...TESTIMONIALS].reverse(), [...TESTIMONIALS].reverse());

function TestimonialCard({ t, locale }: { t: typeof TESTIMONIALS[0]; locale: string }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: "320px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        padding: "28px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent top line */}
      <div
        style={{
          position:"absolute", top:0, left:0, right:0, height:"2px",
          background: `linear-gradient(to right, transparent, ${t.accentColor}60, transparent)`,
        }}
      />

      {/* Quote mark */}
      <div
        style={{
          position:"absolute", top:"12px", right:"20px",
          fontFamily:"serif", fontSize:"64px", lineHeight:1,
          color:"rgba(255,255,255,0.04)",
          pointerEvents:"none",
          userSelect:"none",
        }}
      >
        "
      </div>

      {/* Stars */}
      <div style={{ display:"flex", gap:"3px", marginBottom:"14px" }}>
        {Array.from({ length: t.stars }).map((_, i) => (
          <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#BDEE63">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>

      {/* Text */}
      <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"14px", lineHeight:1.7, marginBottom:"22px", minHeight:"64px" }}>
        {locale === "ar" ? t.textAr : t.textEn}
      </p>

      {/* Author */}
      <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
        <div
          style={{
            width:"40px", height:"40px", borderRadius:"50%", flexShrink:0,
            background:`${t.accentColor}18`,
            border:`1px solid ${t.accentColor}40`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"'Zain', sans-serif", fontSize:"17px", fontWeight:700, color:t.accentColor,
          }}
        >
          {t.avatar}
        </div>
        <div>
          <div style={{ fontSize:"14px", fontWeight:700, color:"#FAFAF7" }}>
            {locale === "ar" ? t.nameAr : t.nameEn}
          </div>
          <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.35)", marginTop:"2px" }}>
            {locale === "ar" ? t.roleAr : t.roleEn}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const title = locale === "ar" ? "ماذا يقول عملاؤنا" : locale === "fr" ? "Ce que disent nos clients" : "What Our Clients Say";
  const subtitle = locale === "ar" ? "250+ عميل يثق بنا" : "250+ clients trust us";

  return (
    <section style={{ background:"#0A0A0A", padding:"110px 0", overflow:"hidden" }}>

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-8 text-center mb-16" dir={isRTL ? "rtl" : "ltr"}>
        {/* Rating badge */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", marginBottom:"16px", background:"rgba(200,169,98,0.08)", border:"1px solid rgba(200,169,98,0.2)", borderRadius:"100px", padding:"6px 18px" }}>
          <div style={{ display:"flex", gap:"2px" }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#C8A962">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span style={{ fontFamily:"Space Mono, monospace", fontSize:"11px", color:"#C8A962", letterSpacing:"0.12em" }}>
            5.0 · {subtitle}
          </span>
        </div>

        <h2
          style={{
            fontFamily:"'Zain', sans-serif",
            fontSize:"clamp(30px, 4.5vw, 56px)",
            fontWeight:800, color:"#FFFFFF", lineHeight:1.1,
          }}
        >
          {title}
        </h2>
      </div>

      {/* Row 1 — scrolling right to left (for RTL, LTR direction doesn't matter, CSS handles it) */}
      <div style={{ marginBottom:"16px" }} className="marquee-outer">
        <div className="testimonial-row row-forward">
          {ROW1.map((t, i) => (
            <TestimonialCard key={i} t={t} locale={locale} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolling left to right */}
      <div className="marquee-outer">
        <div className="testimonial-row row-reverse">
          {ROW2.map((t, i) => (
            <TestimonialCard key={i} t={t} locale={locale} />
          ))}
        </div>
      </div>

      {/* Bottom gradient fades */}
      <style>{`
        .marquee-outer {
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .testimonial-row {
          display: flex;
          gap: 16px;
          width: max-content;
          padding: 8px 0;
        }
        .row-forward  { animation: testimonialsScroll 40s linear infinite; }
        .row-reverse  { animation: testimonialsScrollReverse 38s linear infinite; }
        .testimonial-row:hover { animation-play-state: paused !important; }

        @keyframes testimonialsScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes testimonialsScrollReverse {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
