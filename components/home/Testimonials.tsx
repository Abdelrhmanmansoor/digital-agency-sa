"use client";

import { useLocale } from "next-intl";

const TESTIMONIALS = [
  {
    nameAr: "محمد العنزي",   nameEn: "Mohammed Al-Anazi",  nameFr: "Mohammed Al-Anazi",
    roleAr: "صاحب متجر سلة", roleEn: "Salla Store Owner",  roleFr: "Propriétaire boutique Salla",
    textAr: "فريق محترف جداً، صمموا متجري بشكل احترافي وزادوا مبيعاتي بنسبة 40% خلال الشهر الأول. أنصح بهم بقوة لكل صاحب متجر.",
    textEn: "Extremely professional team, they designed my store beautifully and increased my sales by 40% in the first month. Highly recommend them to every store owner.",
    textFr: "Équipe extrêmement professionnelle, ils ont conçu ma boutique magnifiquement et augmenté mes ventes de 40% en un mois. Je les recommande vivement.",
    stars: 5,
    avatar: "م",
    color: "#BDEE63",
  },
  {
    nameAr: "سارة الشمري",   nameEn: "Sara Al-Shammari",   nameFr: "Sara Al-Shammari",
    roleAr: "صاحبة متجر عطور", roleEn: "Perfume Store Owner", roleFr: "Propriétaire boutique parfums",
    textAr: "أفضل قرار اتخذته هو التعامل معهم. الهوية البصرية التي صمموها لمتجري غيّرت كل شيء. العملاء يثنون عليها دائماً.",
    textEn: "Best decision I ever made was working with them. The brand identity they designed transformed everything. Customers always compliment it.",
    textFr: "La meilleure décision que j'ai prise était de travailler avec eux. L'identité de marque qu'ils ont créée a tout transformé.",
    stars: 5,
    avatar: "س",
    color: "#E8A0BF",
  },
  {
    nameAr: "عبدالله الحربي",  nameEn: "Abdullah Al-Harbi",  nameFr: "Abdullah Al-Harbi",
    roleAr: "صاحب متجر ملابس", roleEn: "Fashion Store Owner",  roleFr: "Propriétaire boutique mode",
    textAr: "الحملة التسويقية التي أطلقوها لمتجري حققت مبيعات في أسبوع تساوي مبيعات شهر كامل. عمل احترافي بكل معنى الكلمة.",
    textEn: "The marketing campaign they launched for my store achieved in one week what normally takes a month. Professional work in every sense.",
    textFr: "La campagne marketing qu'ils ont lancée a réalisé en une semaine ce qui prend normalement un mois. Travail professionnel à tous égards.",
    stars: 5,
    avatar: "ع",
    color: "#BDEE63",
  },
  {
    nameAr: "نورة القحطاني",   nameEn: "Noura Al-Qahtani",   nameFr: "Noura Al-Qahtani",
    roleAr: "صاحبة متجر عبايات", roleEn: "Abaya Store Owner",  roleFr: "Propriétaire boutique abayas",
    textAr: "سرعة التنفيذ مذهلة. طلبت تصميم المتجر وكان جاهزاً في أقل من أسبوعين بجودة تفوق توقعاتي. شكراً جزيلاً.",
    textEn: "Incredible execution speed. I ordered the store design and it was ready in less than two weeks with quality that exceeded my expectations.",
    textFr: "Vitesse d'exécution incroyable. J'ai commandé la conception et c'était prêt en moins de deux semaines avec une qualité dépassant mes attentes.",
    stars: 5,
    avatar: "ن",
    color: "#F5A623",
  },
  {
    nameAr: "خالد البلوي",    nameEn: "Khaled Al-Balawi",   nameFr: "Khaled Al-Balawi",
    roleAr: "صاحب متجر عسل",  roleEn: "Honey Store Owner",  roleFr: "Propriétaire boutique miel",
    textAr: "الأدوات المجانية التي يقدمونها كانت نقطة تحول لمتجري. والدعم الفني لا يقدر بثمن. استمروا في هذا العمل الرائع.",
    textEn: "The free tools they provide were a turning point for my store. The technical support is priceless. Keep up this wonderful work.",
    textFr: "Les outils gratuits ont été un tournant pour ma boutique. Le support technique est précieux. Continuez ce travail formidable.",
    stars: 5,
    avatar: "خ",
    color: "#BDEE63",
  },
  {
    nameAr: "ريم الزهراني",   nameEn: "Reem Al-Zahrani",    nameFr: "Reem Al-Zahrani",
    roleAr: "صاحبة متجر ورد", roleEn: "Flowers Store Owner",  roleFr: "Propriétaire boutique fleurs",
    textAr: "تجربتي معهم كانت من أفضل التجارب في رحلتي التجارية. الاحترافية والإبداع والالتزام بالمواعيد شيء نادر.",
    textEn: "My experience with them was one of the best in my business journey. Professionalism, creativity and meeting deadlines is rare to find.",
    textFr: "Mon expérience avec eux était parmi les meilleures de mon parcours entrepreneurial. Professionnalisme, créativité et respect des délais.",
    stars: 5,
    avatar: "ر",
    color: "#E8A0BF",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#BDEE63">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const title = locale === "ar" ? "ماذا يقول عملاؤنا" : locale === "fr" ? "Ce que disent nos clients" : "What Our Clients Say";
  const subtitle = locale === "ar" ? "250+ عميل يثق بنا" : locale === "fr" ? "Plus de 250 clients nous font confiance" : "250+ clients trust us";

  return (
    <section
      id="about"
      style={{ background: "#0D0D0D", padding: "100px 0" }}
    >
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16" dir={isRTL ? "rtl" : "ltr"}>
          <div className="section-label mb-4">{subtitle}</div>
          <h2
            style={{
              fontFamily: isRTL ? "Noto Kufi Arabic, sans-serif" : "sans-serif",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800,
              color: "#FFFFFF",
              maxWidth: "600px",
              lineHeight: 1.1,
            }}
          >
            {title}
          </h2>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testimonial-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Stars */}
              <StarRating count={t.stars} />

              {/* Quote */}
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "15px",
                  lineHeight: 1.75,
                  margin: "16px 0 24px",
                }}
              >
                {locale === "ar" ? t.textAr : locale === "fr" ? t.textFr : t.textEn}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: "42px", height: "42px",
                    borderRadius: "50%",
                    background: `${t.color}1A`,
                    border: `1px solid ${t.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "17px",
                    fontWeight: 700,
                    color: t.color,
                    fontFamily: "Noto Kufi Arabic, sans-serif",
                    flexShrink: 0,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>
                    {locale === "ar" ? t.nameAr : locale === "fr" ? t.nameFr : t.nameEn}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", marginTop: "2px" }}>
                    {locale === "ar" ? t.roleAr : locale === "fr" ? t.roleFr : t.roleEn}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
