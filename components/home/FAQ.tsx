"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

const FAQ_ITEMS = [
  {
    qAr: "كم يستغرق تصميم متجر سلة؟",
    qEn: "How long does it take to design a Salla store?",
    qFr: "Combien de temps faut-il pour concevoir une boutique Salla?",
    aAr: "يتراوح الوقت بين 7 و 14 يوم عمل حسب تعقيد المشروع ومدى جاهزية المحتوى. نلتزم دائماً بالمواعيد المتفق عليها.",
    aEn: "Turnaround is 7–14 working days depending on project complexity. We always commit to agreed deadlines.",
    aFr: "Le délai est de 7 à 14 jours ouvrables selon la complexité du projet. Nous respectons toujours les délais convenus.",
  },
  {
    qAr: "هل تعملون مع متاجر زد أيضاً؟",
    qEn: "Do you also work with Zid stores?",
    qFr: "Travaillez-vous aussi avec les boutiques Zid?",
    aAr: "نعم، نعمل مع منصتي سلة وزد بخبرة متساوية. نختار المنصة الأنسب بناءً على نوع المنتجات وحجم المشروع.",
    aEn: "Yes, we work with both Salla and Zid with equal expertise and help clients choose the most suitable platform.",
    aFr: "Oui, nous travaillons avec Salla et Zid avec une expertise égale et aidons les clients à choisir la plateforme la plus adaptée.",
  },
  {
    qAr: "هل يمكنني تعديل التصميم بعد التسليم؟",
    qEn: "Can I modify the design after delivery?",
    qFr: "Puis-je modifier le design après la livraison?",
    aAr: "نعم، نقدم مراجعتين مجانيتين بعد التسليم. وفي حال أردت تعديلات إضافية نقدم دعماً مدفوعاً بأسعار معقولة جداً.",
    aEn: "Yes, we provide two free revisions after delivery. Additional changes are available at very reasonable rates.",
    aFr: "Oui, nous fournissons deux révisions gratuites après la livraison. Des modifications supplémentaires sont disponibles à des tarifs très raisonnables.",
  },
  {
    qAr: "كيف تتعاملون مع إدارة الإعلانات الممولة؟",
    qEn: "How do you handle paid advertising management?",
    qFr: "Comment gérez-vous les publicités payantes?",
    aAr: "نتولى إنشاء وإدارة الحملات على جميع المنصات (سناب شات، إنستغرام، تيك توك، جوجل) مع تقارير شهرية مفصلة.",
    aEn: "We manage campaigns across all platforms (Snapchat, Instagram, TikTok, Google) with detailed monthly reports.",
    aFr: "Nous gérons les campagnes sur toutes les plateformes (Snapchat, Instagram, TikTok, Google) avec des rapports mensuels détaillés.",
  },
  {
    qAr: "ما هي طرق الدفع المتاحة؟",
    qEn: "What payment methods are available?",
    qFr: "Quels modes de paiement sont disponibles?",
    aAr: "نقبل التحويل البنكي، مدى، فيزا، ماستركارد. ندفع 50% عند بدء العمل و 50% عند التسليم للمشاريع الكبيرة.",
    aEn: "We accept bank transfer, Mada, Visa, Mastercard. Large projects: 50% upfront and 50% on delivery.",
    aFr: "Nous acceptons les virements bancaires, Mada, Visa, Mastercard. Grands projets: 50% à l'avance et 50% à la livraison.",
  },
  {
    qAr: "هل تقدمون ضماناً على المشاريع؟",
    qEn: "Do you offer any project warranty?",
    qFr: "Offrez-vous une garantie sur les projets?",
    aAr: "نعم، نقدم ضمان صيانة لمدة 30 يوماً بعد التسليم لإصلاح أي أخطاء تقنية، مع عروض صيانة دورية بأسعار مناسبة.",
    aEn: "Yes, a 30-day maintenance warranty after delivery for any technical issues, plus periodic maintenance packages.",
    aFr: "Oui, une garantie de maintenance de 30 jours après livraison pour tout problème technique, plus des forfaits de maintenance périodique.",
  },
  {
    qAr: "هل تعملون مع العملاء خارج السعودية؟",
    qEn: "Do you work with clients outside Saudi Arabia?",
    qFr: "Travaillez-vous avec des clients hors d'Arabie Saoudite?",
    aAr: "بالتأكيد! نتعامل مع عملاء من دول الخليج وعرب في أوروبا وأمريكا. نتواصل عبر واتساب وزوم ونيست.",
    aEn: "Absolutely! Gulf countries and Arab clients in Europe and America. We communicate via WhatsApp, Zoom, and Meet.",
    aFr: "Absolument! Pays du Golfe et clients arabes en Europe et en Amérique. Nous communiquons via WhatsApp, Zoom et Meet.",
  },
  {
    qAr: "هل الأدوات المجانية تحتاج اشتراكاً؟",
    qEn: "Do the free tools require a subscription?",
    qFr: "Les outils gratuits nécessitent-ils un abonnement?",
    aAr: "لا! جميع الأدوات الذكية على موقعنا مجانية 100% بدون أي اشتراك أو تسجيل.",
    aEn: "No! All smart tools on our website are 100% free — no subscription, no registration required.",
    aFr: "Non! Tous les outils intelligents de notre site sont 100% gratuits — sans abonnement, sans inscription requise.",
  },
];

export default function FAQ() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const title = locale === "ar" ? "الأسئلة الشائعة" : locale === "fr" ? "Questions Fréquentes" : "Frequently Asked Questions";
  const subtitle = locale === "ar" ? "لديك سؤال؟" : locale === "fr" ? "Une question?" : "Got a question?";

  return (
    <section style={{ background:"#0D0D0D", padding:"110px 0", position:"relative" }}>

      {/* Subtle side accent */}
      <div
        aria-hidden
        style={{
          position:"absolute",
          top:0, bottom:0,
          left: isRTL ? "auto" : 0,
          right: isRTL ? 0 : "auto",
          width:"3px",
          background:"linear-gradient(to bottom, transparent, rgba(189,238,99,0.15) 30%, rgba(189,238,99,0.15) 70%, transparent)",
          pointerEvents:"none",
        }}
      />

      <div className="max-w-[900px] mx-auto px-8">

        {/* Header */}
        <div style={{ marginBottom:"60px", textAlign: isRTL ? "right" : "left" }} dir={isRTL ? "rtl" : "ltr"}>
          <div style={{ fontFamily:"Space Mono, monospace", fontSize:"11px", letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--lime)", marginBottom:"12px" }}>
            <span style={{ display:"inline-block", width:"28px", height:"1px", background:"var(--lime)", verticalAlign:"middle", marginLeft: isRTL ? "0" : "8px", marginRight: isRTL ? "8px" : "0" }} />
            {subtitle}
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

        {/* Accordion */}
        <div dir={isRTL ? "rtl" : "ltr"}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            const q = locale === "ar" ? item.qAr : locale === "fr" ? item.qFr : item.qEn;
            const a = locale === "ar" ? item.aAr : locale === "fr" ? item.aFr : item.aEn;
            const num = String(i + 1).padStart(2, "0");

            return (
              <div
                key={i}
                style={{
                  borderBottom:"1px solid rgba(255,255,255,0.07)",
                  overflow:"hidden",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between",
                    width:"100%",
                    padding:"26px 0",
                    background:"none",
                    border:"none",
                    cursor:"pointer",
                    textAlign: isRTL ? "right" : "left",
                    gap:"20px",
                  }}
                  aria-expanded={isOpen}
                >
                  {/* Number + Question */}
                  <div style={{ display:"flex", alignItems:"center", gap:"20px", flex:1 }}>
                    <span
                      style={{
                        fontFamily:"Space Mono, monospace",
                        fontSize:"12px",
                        color: isOpen ? "var(--lime)" : "rgba(255,255,255,0.2)",
                        letterSpacing:"0.12em",
                        flexShrink:0,
                        transition:"color 0.3s",
                        minWidth:"28px",
                      }}
                    >
                      {num}
                    </span>
                    <span
                      style={{
                        fontFamily:"'Zain', sans-serif",
                        fontSize:"17px",
                        fontWeight: isOpen ? 700 : 600,
                        color: isOpen ? "#FAFAF7" : "rgba(255,255,255,0.75)",
                        lineHeight:1.4,
                        textAlign: isRTL ? "right" : "left",
                        transition:"color 0.3s",
                      }}
                    >
                      {q}
                    </span>
                  </div>

                  {/* Toggle icon */}
                  <div
                    style={{
                      width:"34px", height:"34px",
                      borderRadius:"50%",
                      border:"1px solid",
                      borderColor: isOpen ? "var(--lime)" : "rgba(255,255,255,0.12)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      flexShrink:0,
                      background: isOpen ? "rgba(189,238,99,0.1)" : "transparent",
                      transition:"all 0.3s ease",
                    }}
                  >
                    <svg
                      width="13" height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isOpen ? "var(--lime)" : "rgba(255,255,255,0.5)"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ transition:"transform 0.35s ease", transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </div>
                </button>

                {/* Answer */}
                <div
                  style={{
                    display:"grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition:"grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <div style={{ overflow:"hidden" }}>
                    <div
                      style={{
                        paddingBottom:"28px",
                        paddingLeft: isRTL ? "0" : "48px",
                        paddingRight: isRTL ? "48px" : "0",
                        color:"rgba(255,255,255,0.48)",
                        fontSize:"15px",
                        lineHeight:1.8,
                      }}
                    >
                      {a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div
          style={{
            marginTop:"56px",
            display:"flex",
            alignItems:"center",
            justifyContent:"space-between",
            padding:"28px 32px",
            background:"rgba(189,238,99,0.04)",
            border:"1px solid rgba(189,238,99,0.12)",
            borderRadius:"16px",
            flexWrap:"wrap",
            gap:"20px",
          }}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div>
            <div style={{ fontFamily:"'Zain', sans-serif", fontSize:"17px", fontWeight:700, color:"#FAFAF7", marginBottom:"4px" }}>
              {locale === "ar" ? "لم تجد إجابتك؟" : locale === "fr" ? "Vous n'avez pas trouvé votre réponse?" : "Didn't find your answer?"}
            </div>
            <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.38)" }}>
              {locale === "ar" ? "فريقنا متاح للرد على أي سؤال عبر واتساب" : locale === "fr" ? "Notre équipe est disponible pour répondre à vos questions via WhatsApp" : "Our team is available to answer any question via WhatsApp"}
            </div>
          </div>
          <a
            href="https://wa.me/201007835547"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="btn-primary"
              style={{ borderRadius:"10px", padding:"12px 24px", fontSize:"14px" }}
            >
              <span>{locale === "ar" ? "اسألنا الآن" : locale === "fr" ? "Posez Votre Question" : "Ask Us Now"}</span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
