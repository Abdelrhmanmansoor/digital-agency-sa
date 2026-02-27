"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

const FAQ_ITEMS = [
  {
    qAr: "كم يستغرق تصميم متجر سلة؟",
    qEn: "How long does it take to design a Salla store?",
    qFr: "Combien de temps prend la conception d'une boutique Salla?",
    aAr: "يتراوح الوقت بين 7 و 14 يوم عمل حسب تعقيد المشروع ومدى جاهزية المحتوى والصور من طرف العميل. نلتزم دائماً بالمواعيد المتفق عليها.",
    aEn: "Turnaround time ranges between 7 to 14 working days depending on the project complexity and how ready the client's content and images are. We always commit to agreed deadlines.",
    aFr: "Le délai varie entre 7 et 14 jours ouvrables selon la complexité du projet. Nous respectons toujours les délais convenus.",
  },
  {
    qAr: "هل تعملون مع متاجر زد أيضاً؟",
    qEn: "Do you also work with Zid stores?",
    qFr: "Travaillez-vous aussi avec les boutiques Zid?",
    aAr: "نعم، نعمل مع منصتي سلة وزد بخبرة متساوية. نختار المنصة الأنسب مع العميل بناءً على نوع المنتجات وحجم المشروع.",
    aEn: "Yes, we work with both Salla and Zid platforms with equal expertise. We help clients choose the most suitable platform based on their products and business scale.",
    aFr: "Oui, nous travaillons avec les deux plateformes Salla et Zid avec la même expertise. Nous aidons les clients à choisir la plateforme la plus adaptée.",
  },
  {
    qAr: "هل يمكنني تعديل التصميم بعد التسليم؟",
    qEn: "Can I modify the design after delivery?",
    qFr: "Puis-je modifier le design après la livraison?",
    aAr: "نعم، نقدم مراجعتين مجانيتين بعد التسليم. وفي حال أردت تعديلات إضافية نقدم دعماً مدفوعاً بأسعار معقولة جداً.",
    aEn: "Yes, we provide two free revisions after delivery. For additional changes we offer paid support at very reasonable rates.",
    aFr: "Oui, nous fournissons deux révisions gratuites après la livraison. Pour des modifications supplémentaires, nous offrons un support payant à des tarifs très raisonnables.",
  },
  {
    qAr: "كيف تتعاملون مع إدارة الإعلانات الممولة؟",
    qEn: "How do you handle paid advertising management?",
    qFr: "Comment gérez-vous la publicité payante?",
    aAr: "نتولى إنشاء وإدارة الحملات على جميع المنصات (سناب شات، إنستغرام، تيك توك، جوجل). نقدم تقارير شهرية مفصلة مع استراتيجيات تحسين مستمرة.",
    aEn: "We handle campaign creation and management across all platforms (Snapchat, Instagram, TikTok, Google). We provide detailed monthly reports with ongoing optimization strategies.",
    aFr: "Nous gérons la création et la gestion des campagnes sur toutes les plateformes. Nous fournissons des rapports mensuels détaillés avec des stratégies d'optimisation continues.",
  },
  {
    qAr: "ما هي طرق الدفع المتاحة؟",
    qEn: "What payment methods are available?",
    qFr: "Quels modes de paiement sont disponibles?",
    aAr: "نقبل التحويل البنكي، مدى، فيزا، ماستركارد، وتحويل واتساب. ندفع 50% عند بدء العمل و 50% عند التسليم للمشاريع الكبيرة.",
    aEn: "We accept bank transfer, Mada, Visa, Mastercard, and WhatsApp transfer. For large projects we take 50% upfront and 50% on delivery.",
    aFr: "Nous acceptons les virements bancaires, Mada, Visa, Mastercard. Pour les grands projets, nous prenons 50% d'avance et 50% à la livraison.",
  },
  {
    qAr: "هل تقدمون ضماناً على المشاريع؟",
    qEn: "Do you offer any project warranty?",
    qFr: "Offrez-vous une garantie sur les projets?",
    aAr: "نعم، نقدم ضمان صيانة لمدة 30 يوماً بعد التسليم لإصلاح أي أخطاء تقنية. كما نقدم عروض صيانة دورية بأسعار مناسبة.",
    aEn: "Yes, we provide a 30-day maintenance warranty after delivery to fix any technical issues. We also offer periodic maintenance packages at competitive prices.",
    aFr: "Oui, nous fournissons une garantie de maintenance de 30 jours après la livraison. Nous proposons également des forfaits de maintenance périodique.",
  },
  {
    qAr: "هل تعملون مع العملاء خارج السعودية؟",
    qEn: "Do you work with clients outside Saudi Arabia?",
    qFr: "Travaillez-vous avec des clients hors d'Arabie Saoudite?",
    aAr: "بالتأكيد! نتعامل مع عملاء من جميع دول الخليج وكذلك عملاء عرب في أوروبا وأمريكا. نتواصل عبر واتساب وزوم ونيست.",
    aEn: "Absolutely! We work with clients from all Gulf countries as well as Arab clients in Europe and America. We communicate via WhatsApp, Zoom, and Meet.",
    aFr: "Absolument! Nous travaillons avec des clients de tous les pays du Golfe ainsi qu'en Europe et en Amérique. Nous communiquons via WhatsApp, Zoom et Meet.",
  },
  {
    qAr: "هل الأدوات المجانية تحتاج اشتراكاً؟",
    qEn: "Do the free tools require a subscription?",
    qFr: "Les outils gratuits nécessitent-ils un abonnement?",
    aAr: "لا! جميع الأدوات الذكية على موقعنا (حاسبة الأرباح، مولد CSS، منشئ السياسات وغيرها) مجانية 100% بدون أي اشتراك.",
    aEn: "No! All smart tools on our website (profit calculator, CSS generator, policy builder, etc.) are 100% free with no subscription required.",
    aFr: "Non! Tous les outils intelligents de notre site (calculatrice, générateur CSS, générateur de politiques, etc.) sont 100% gratuits sans abonnement.",
  },
];

export default function FAQ() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const title = locale === "ar" ? "الأسئلة الشائعة" : locale === "fr" ? "Questions Fréquentes" : "Frequently Asked Questions";
  const subtitle = locale === "ar" ? "لديك سؤال؟" : locale === "fr" ? "Une question?" : "Got a question?";

  return (
    <section style={{ background: "#0D0D0D", padding: "100px 0" }}>
      <div className="max-w-[860px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-14" dir={isRTL ? "rtl" : "ltr"}>
          <div className="section-label justify-center mb-4">{subtitle}</div>
          <h2
            style={{
              fontFamily: isRTL ? "Noto Kufi Arabic, sans-serif" : "sans-serif",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
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
            return (
              <div key={i} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{q}</span>
                  <span
                    style={{
                      width: "32px", height: "32px",
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.3s",
                      background: isOpen ? "var(--lime)" : "transparent",
                      color: isOpen ? "#0D0D0D" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <svg
                      width="14" height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ transition: "transform 0.3s", transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </span>
                </div>
                <div className={`faq-answer ${isOpen ? "is-open" : ""}`}>
                  <div className="faq-answer-inner">
                    <div className="faq-answer-content">{a}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
