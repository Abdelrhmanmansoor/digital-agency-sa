"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { HOME_FAQ } from "@/lib/home-faq";
import Platforms from "./Platforms";
import PlatformChooser from "./PlatformChooser";
import styles from "./HomeExperience.module.css";

const WHATSAPP = "201007835547";

const copy = {
  ar: {
    /* Was five same-page anchors. /sidra-theme, /store and /blog are real
       pages with their own content and were reachable only from the footer
       (or, for SIDRA, one mid-page button) — nothing linked them from the
       top of the site. */
    nav: [
      ["المنصات", "#platforms"],
      ["الخدمات", "#services"],
      ["ثيم سِدرة", "/sidra-theme"],
      ["أعمالنا", "#work"],
      ["متجر الخدمات", "/store"],
      ["المدونة", "/blog"],
    ],
    panelLabel: "المنصات التي نبني عليها",
    panelPlatforms: [
      ["سلة", "SALLA", "من 5 أيام"],
      ["زد", "ZID", "من 7 أيام"],
      ["شوبيفاي", "SHOPIFY", "من 10 أيام"],
    ],
    panelCta: "أي منصة تناسبك؟",
    start: "ابدأ مشروعك",
    eyebrow: "شريكك الرقمي لنمو التجارة الإلكترونية",
    title: "نبني متاجر رقمية واضحة، سريعة، ومهيأة للنمو.",
    intro:
      "نصمم ونطوّر متاجر سلة وزد، ونبني الهوية والتجربة والحملات حول هدف واحد: تحويل الزيارة إلى طلب.",
    primary: "اطلب استشارة مجانية",
    secondary: "استعرض خدماتنا",
    note: "رد خلال أقل من ساعة · نخدم جميع مناطق السعودية",
    /* "سلة + زد" was a label sitting in a number slot, and "5.0" a perfect
       rating with nothing behind it. Both replaced with facts the site can
       stand behind. */
    proof: [
      ["+300", "مشروع منجز"],
      ["3", "منصات نبني عليها"],
      ["< ساعة", "متوسط زمن الرد"],
    ],
    trusted: "خبرة عملية عبر منصات التجارة والإعلان",
    servicesKicker: "الخدمات الأساسية",
    servicesTitle: "كل ما يحتاجه متجرك، دون تشتيت.",
    servicesIntro:
      "اختصرنا خدماتنا في أربعة مسارات مترابطة؛ نبدأ من الأساس الصحيح ثم نقيس ونطوّر.",
    services: [
      [
        "01",
        "الهوية والتصميم الإبداعي",
        "هوية بصرية متماسكة وتطبيقات رقمية تمنح علامتك حضورًا واضحًا ويمكن تذكره.",
      ],
      [
        "02",
        "تحسين التحويل وSEO",
        "بنية محتوى وصفحات منتجات أسرع وأوضح، مع تحسين تقني يساعد العملاء ومحركات البحث.",
      ],
      [
        "03",
        "التسويق وإدارة الحملات",
        "إعلانات مبنية على البيانات في Google وMeta وSnapchat مع متابعة مستمرة للنتائج.",
      ],
      [
        "04",
        "التطبيقات والحلول المخصصة",
        "تصميم وبرمجة تطبيقات ولوحات تحكم ومنصات رقمية مبنية حول طريقة عمل مشروعك.",
      ],
      [
        "05",
        "الأتمتة وربط الأنظمة",
        "ربط الأدوات والبيانات وأتمتة المهام المتكررة لتقليل الوقت والأخطاء التشغيلية.",
      ],
      [
        "06",
        "المحتوى والتصوير بالذكاء الاصطناعي",
        "صور منتجات ومحتوى إعلاني وتصاميم سوشيال تحافظ على هوية العلامة وجودة العرض.",
      ],
      [
        "07",
        "تصميم البوثات وتجهيز المعارض",
        "تصور بصري متكامل للبوث وتجهيز نقاط العرض بما يخدم العلامة وتجربة الزائر.",
      ],
    ],
    sidraKicker: "منتجنا لِمتاجر سلة",
    sidraTitle: "ثيم سِدرة — متجر فاخر، مرن، وموثّق بالكامل.",
    sidraBody:
      "ثيم سعودي لمنصة سلة صُمم ليمنح العلامات التجارية تحكمًا واسعًا دون الحاجة إلى كتابة كود، مع توثيق عملي من التثبيت حتى التخصيص والدعم.",
    sidraStats: [
      ["46", "مكوّنًا للرئيسية"],
      ["5", "أنماط لبطاقة المنتج"],
      ["100%", "متجاوب مع الجوال"],
    ],
    sidraFeatures: [
      "مكوّنات سحب وإفلات",
      "تحكم مستقل للجوال",
      "بحث وقائمة ضخمة",
      "عروض خاطفة وكوبونات",
      "تكاملات سلة الرسمية",
      "دليل مقاسات وحل مشكلات",
    ],
    sidraDocs: "استعرض التوثيق الكامل",
    sidraOrder: "اطلب ثيم سِدرة",
    workKicker: "نماذج مختارة",
    workTitle: "أعمال تركّز على النتيجة، لا على الزخرفة.",
    projects: [
      [
        "TF1",
        "متجر إلكتروني",
        "بناء تجربة تسوق أكثر وضوحًا وسرعة من الصفحة الأولى حتى إتمام الطلب.",
        "/store-logos/tf1.png",
      ],
      [
        "Hala Home",
        "تجارة منزلية",
        "هوية رقمية هادئة وتنظيم كتالوج يساعد العميل على اتخاذ القرار بسهولة.",
        "/store-logos/hala-home.png",
      ],
      [
        "Al Flamanki",
        "مطاعم وضيافة",
        "حضور رقمي متماسك يحافظ على شخصية العلامة في كل نقطة تواصل.",
        "/store-logos/al-flamanki.png",
      ],
      [
        "سِدرة",
        "منتج رقمي لمنصة سلة",
        "تصميم وتطوير ثيم مرن مع 46 مكوّنًا ومركز توثيق متكامل.",
        "/sidra-theme-logo.png",
      ],
      [
        "Salla Custom",
        "تخصيص واجهات المتاجر",
        "حلول وثيمات مخصصة تمنح المتجر شخصية واضحة وتجربة شراء أبسط.",
        "/logos/Screenshot 2026-02-27 at 03-39-41 تخصيص الثيم.png",
      ],
      [
        "Oud Campaign",
        "تصوير وإعلان بالذكاء الاصطناعي",
        "معالجة بصرية لحملة عطور فاخرة تحافظ على طابع المنتج وقيمة العلامة.",
        "/logos/Luxury_arabian_oud_advertisement_composition_inspi_delpmaspu.png",
      ],
    ],
    processKicker: "منهجية العمل",
    processTitle: "مسار واضح من الفكرة إلى الإطلاق.",
    process: [
      [
        "01",
        "نفهم",
        "نراجع النشاط والجمهور والمنتج ونحدد الهدف القابل للقياس.",
      ],
      [
        "02",
        "نصمم ونبني",
        "نحوّل الاستراتيجية إلى تجربة عملية، ثم نختبرها على جميع الشاشات.",
      ],
      [
        "03",
        "نطلق ونطوّر",
        "نطلق المشروع، نراقب الأداء، ونرتب التحسينات بحسب أثرها.",
      ],
    ],
    faqKicker: "الأسئلة الشائعة",
    faqTitle: "إجابات مباشرة قبل أن نبدأ.",
    ctaKicker: "لديك مشروع جاد؟",
    ctaTitle: "لنضع له أساسًا رقميًا يليق به.",
    ctaBody:
      "أرسل نبذة قصيرة عن نشاطك وما تريد تحقيقه، وسنعود إليك بخطوة أولى واضحة.",
    ctaButton: "تحدث معنا عبر واتساب",
    footerText: "تصميم وتطوير وتسويق المتاجر الإلكترونية في السعودية.",
    rights: "جميع الحقوق محفوظة.",
    menu: "القائمة",
  },
  en: {
    nav: [
      ["Platforms", "#platforms"],
      ["Services", "#services"],
      ["SIDRA theme", "/sidra-theme"],
      ["Work", "#work"],
      ["Store", "/store"],
      ["Blog", "/blog"],
    ],
    panelLabel: "Platforms we build on",
    panelPlatforms: [
      ["Salla", "SALLA", "from 5 days"],
      ["Zid", "ZID", "from 7 days"],
      ["Shopify", "SHOPIFY", "from 10 days"],
    ],
    panelCta: "Which one fits you?",
    start: "Start a project",
    eyebrow: "Your e-commerce growth partner",
    title: "We build clear, fast digital stores designed to grow.",
    intro:
      "We design and develop Salla and Zid stores, aligning identity, experience and campaigns around one goal: turning visits into orders.",
    primary: "Book a free consultation",
    secondary: "Explore services",
    note: "Reply in under an hour · Serving all Saudi Arabia",
    proof: [
      ["+300", "Projects delivered"],
      ["3", "Platforms we build on"],
      ["< 1 hr", "Average reply time"],
    ],
    trusted: "Hands-on experience across commerce and advertising platforms",
    servicesKicker: "Core services",
    servicesTitle: "Everything your store needs. Nothing it does not.",
    servicesIntro:
      "Four connected capabilities that give your store the right foundation, then improve it with evidence.",
    services: [
      [
        "01",
        "Brand identity & creative",
        "A cohesive identity and digital system that makes your brand clear and memorable.",
      ],
      [
        "02",
        "Conversion & SEO",
        "Faster, clearer product journeys with technical optimization for customers and search engines.",
      ],
      [
        "03",
        "Marketing & campaigns",
        "Data-led Google, Meta and Snapchat campaigns with continuous performance review.",
      ],
      [
        "04",
        "Custom apps & platforms",
        "Purpose-built apps, dashboards and digital platforms shaped around your workflow.",
      ],
      [
        "05",
        "Automation & integrations",
        "Connected tools and automated repetitive tasks that reduce time and operating errors.",
      ],
      [
        "06",
        "AI content & product visuals",
        "Product imagery, campaign assets and social content aligned with your brand.",
      ],
      [
        "07",
        "Booths & exhibition design",
        "Complete booth concepts and branded display experiences for events and exhibitions.",
      ],
    ],
    sidraKicker: "Our product for Salla",
    sidraTitle: "SIDRA — a premium, flexible and fully documented Salla theme.",
    sidraBody:
      "A Saudi-built Salla theme offering broad no-code control, backed by practical documentation from installation and customization through support.",
    sidraStats: [
      ["46", "Homepage components"],
      ["5", "Product card styles"],
      ["100%", "Mobile responsive"],
    ],
    sidraFeatures: [
      "Drag-and-drop sections",
      "Independent mobile controls",
      "Smart search & mega menu",
      "Flash deals & coupons",
      "Native Salla integrations",
      "Sizing & troubleshooting guides",
    ],
    sidraDocs: "Explore full documentation",
    sidraOrder: "Order SIDRA",
    workKicker: "Selected work",
    workTitle: "Work designed around outcomes, not decoration.",
    projects: [
      [
        "TF1",
        "E-commerce",
        "A faster, clearer shopping journey from the first view through checkout.",
        "/store-logos/tf1.png",
      ],
      [
        "Hala Home",
        "Home retail",
        "A calm digital identity and organized catalog that simplifies decisions.",
        "/store-logos/hala-home.png",
      ],
      [
        "Al Flamanki",
        "Hospitality",
        "A cohesive presence that keeps the brand recognizable at every touchpoint.",
        "/store-logos/al-flamanki.png",
      ],
      [
        "SIDRA",
        "Salla digital product",
        "A flexible theme with 46 components and a complete documentation center.",
        "/sidra-theme-logo.png",
      ],
      [
        "Salla Custom",
        "Storefront customization",
        "Custom themes that give stores a distinct identity and simpler purchase journey.",
        "/logos/Screenshot 2026-02-27 at 03-39-41 تخصيص الثيم.png",
      ],
      [
        "Oud Campaign",
        "AI campaign imagery",
        "Premium oud campaign visuals aligned with the product and brand value.",
        "/logos/Luxury_arabian_oud_advertisement_composition_inspi_delpmaspu.png",
      ],
    ],
    processKicker: "Our process",
    processTitle: "A clear route from idea to launch.",
    process: [
      [
        "01",
        "Understand",
        "We study the business, audience and product, then set a measurable goal.",
      ],
      [
        "02",
        "Design & build",
        "We turn strategy into a practical experience and test it across screens.",
      ],
      [
        "03",
        "Launch & improve",
        "We launch, monitor performance and prioritize improvements by impact.",
      ],
    ],
    faqKicker: "FAQ",
    faqTitle: "Straight answers before we begin.",
    ctaKicker: "Building something serious?",
    ctaTitle: "Give it a digital foundation worthy of it.",
    ctaBody:
      "Send a short brief about your business and goal. We will return with a clear first step.",
    ctaButton: "Talk to us on WhatsApp",
    footerText: "E-commerce design, development and marketing in Saudi Arabia.",
    rights: "All rights reserved.",
    menu: "Menu",
  },
  fr: {
    nav: [
      ["Plateformes", "#platforms"],
      ["Services", "#services"],
      ["Thème SIDRA", "/sidra-theme"],
      ["Projets", "#work"],
      ["Boutique", "/store"],
      ["Blog", "/blog"],
    ],
    panelLabel: "Plateformes utilisées",
    panelPlatforms: [
      ["Salla", "SALLA", "dès 5 jours"],
      ["Zid", "ZID", "dès 7 jours"],
      ["Shopify", "SHOPIFY", "dès 10 jours"],
    ],
    panelCta: "Laquelle vous convient ?",
    start: "Démarrer",
    eyebrow: "Votre partenaire croissance e-commerce",
    title:
      "Nous créons des boutiques claires, rapides et conçues pour grandir.",
    intro:
      "Nous concevons les boutiques Salla et Zid, en alignant identité, expérience et campagnes sur un objectif : convertir les visites en commandes.",
    primary: "Consultation gratuite",
    secondary: "Découvrir nos services",
    note: "Réponse en moins d’une heure · Toute l’Arabie saoudite",
    proof: [
      ["+300", "Projets livrés"],
      ["3", "Plateformes utilisées"],
      ["< 1 h", "Délai de réponse moyen"],
    ],
    trusted:
      "Une expérience concrète des plateformes e-commerce et publicitaires",
    servicesKicker: "Services essentiels",
    servicesTitle: "Tout ce dont votre boutique a besoin. Rien de superflu.",
    servicesIntro:
      "Quatre expertises connectées pour construire une base solide puis l’améliorer avec les données.",
    services: [
      [
        "01",
        "Identité & création",
        "Une identité cohérente qui rend votre marque claire et mémorable.",
      ],
      [
        "02",
        "Conversion & SEO",
        "Des parcours produits plus rapides et une optimisation technique pour les clients et la recherche.",
      ],
      [
        "03",
        "Marketing & campagnes",
        "Campagnes Google, Meta et Snapchat pilotées par les données.",
      ],
      [
        "04",
        "Applications sur mesure",
        "Applications, tableaux de bord et plateformes adaptés à vos opérations.",
      ],
      [
        "05",
        "Automatisation & intégrations",
        "Outils connectés et tâches répétitives automatisées.",
      ],
      [
        "06",
        "Contenu & visuels IA",
        "Images produits, campagnes et contenus sociaux cohérents avec la marque.",
      ],
      [
        "07",
        "Stands & expositions",
        "Concepts de stands et expériences de marque pour les événements.",
      ],
    ],
    sidraKicker: "Notre produit Salla",
    sidraTitle: "SIDRA — un thème premium, flexible et entièrement documenté.",
    sidraBody:
      "Un thème saoudien pour Salla offrant un contrôle no-code étendu, avec une documentation pratique de l’installation au support.",
    sidraStats: [
      ["46", "Composants d’accueil"],
      ["5", "Styles de cartes produit"],
      ["100%", "Responsive mobile"],
    ],
    sidraFeatures: [
      "Sections glisser-déposer",
      "Contrôles mobile indépendants",
      "Recherche et mega menu",
      "Offres flash et coupons",
      "Intégrations Salla natives",
      "Guides et dépannage",
    ],
    sidraDocs: "Voir la documentation",
    sidraOrder: "Commander SIDRA",
    workKicker: "Projets choisis",
    workTitle: "Des créations pensées pour les résultats.",
    projects: [
      [
        "TF1",
        "E-commerce",
        "Un parcours d’achat plus clair et plus rapide jusqu’au paiement.",
        "/store-logos/tf1.png",
      ],
      [
        "Hala Home",
        "Maison",
        "Une identité calme et un catalogue qui simplifie le choix.",
        "/store-logos/hala-home.png",
      ],
      [
        "Al Flamanki",
        "Hospitalité",
        "Une présence cohérente à chaque point de contact.",
        "/store-logos/al-flamanki.png",
      ],
      [
        "SIDRA",
        "Produit Salla",
        "Un thème flexible avec 46 composants et une documentation complète.",
        "/sidra-theme-logo.png",
      ],
      [
        "Salla Custom",
        "Personnalisation boutique",
        "Des thèmes distinctifs et un parcours d’achat simplifié.",
        "/logos/Screenshot 2026-02-27 at 03-39-41 تخصيص الثيم.png",
      ],
      [
        "Oud Campaign",
        "Visuels publicitaires IA",
        "Une campagne premium cohérente avec la valeur de la marque.",
        "/logos/Luxury_arabian_oud_advertisement_composition_inspi_delpmaspu.png",
      ],
    ],
    processKicker: "Notre méthode",
    processTitle: "Un chemin clair, de l’idée au lancement.",
    process: [
      [
        "01",
        "Comprendre",
        "Nous étudions l’activité, le public et fixons un objectif mesurable.",
      ],
      [
        "02",
        "Concevoir",
        "Nous transformons la stratégie en expérience testée sur tous les écrans.",
      ],
      [
        "03",
        "Lancer",
        "Nous suivons la performance et priorisons les améliorations.",
      ],
    ],
    faqKicker: "FAQ",
    faqTitle: "Des réponses claires avant de commencer.",
    ctaKicker: "Un projet sérieux ?",
    ctaTitle: "Donnons-lui une base digitale à sa hauteur.",
    ctaBody:
      "Envoyez-nous une courte présentation de votre activité et de votre objectif.",
    ctaButton: "Parler sur WhatsApp",
    footerText:
      "Design, développement et marketing e-commerce en Arabie saoudite.",
    rights: "Tous droits réservés.",
    menu: "Menu",
  },
} as const;

const auditCopy = {
  ar: {
    kicker: "ابدأ بخطوة ذكية",
    title: "تحليل مجاني لمتجرك يكشف فرص النمو قبل أن تنفق.",
    body: "نراجع متجرك من منظور العميل ومحركات البحث، ثم نرسل لك ملاحظات عملية مرتبة حسب الأولوية — بلا التزام.",
    points: [
      "سرعة وتجربة الجوال",
      "وضوح رحلة الشراء",
      "SEO وبنية الصفحات",
      "فرص رفع معدل التحويل",
    ],
    reportLabel: "محتويات التقرير",
    reportFree: "مجاني",
    report: [
      ["السرعة والجوال", "ما الذي يؤخر ظهور المحتوى، وكيف يبدو المتجر على شاشة صغيرة."],
      ["رحلة الشراء", "أين يتعثر العميل بين المنتج وإتمام الطلب."],
      ["بنية الصفحات والسيو", "ما هو مفهرس، وما يتنافس مع نفسه، وما هو غائب."],
      ["فرص رفع التحويل", "تعديلات مرتبة بحسب أثرها المتوقع لا بحسب سهولتها."],
    ],
    reportTurnaround: "يصلك خلال يومي عمل · بدون التزام",
    action: "اطلب تحليل متجرك مجانًا",
    note: "تقرير مختصر ومفيد · بدون مكالمات بيع مزعجة",
  },
  en: {
    kicker: "Start smart",
    title:
      "A free store audit that finds growth opportunities before you spend.",
    body: "We review your store through the eyes of customers and search engines, then send practical recommendations ranked by priority — no obligation.",
    points: [
      "Mobile speed & usability",
      "Purchase journey clarity",
      "SEO & page structure",
      "Conversion opportunities",
    ],
    reportLabel: "What the report covers",
    reportFree: "Free",
    report: [
      ["Speed & mobile", "What delays content appearing, and how the store reads on a small screen."],
      ["Purchase journey", "Where customers stall between the product and the completed order."],
      ["Page structure & SEO", "What is indexed, what competes with itself, and what is missing."],
      ["Conversion opportunities", "Changes ranked by expected impact, not by how easy they are."],
    ],
    reportTurnaround: "Delivered within two working days · No obligation",
    action: "Request your free store audit",
    note: "A concise, useful report · No pushy sales calls",
  },
  fr: {
    kicker: "Commencez intelligemment",
    title: "Un audit gratuit qui révèle les opportunités avant de dépenser.",
    body: "Nous analysons votre boutique côté client et moteurs de recherche, puis envoyons des recommandations classées par priorité, sans engagement.",
    points: [
      "Vitesse et expérience mobile",
      "Clarté du parcours d’achat",
      "SEO et structure des pages",
      "Opportunités de conversion",
    ],
    reportLabel: "Contenu du rapport",
    reportFree: "Gratuit",
    report: [
      ["Vitesse et mobile", "Ce qui retarde l’affichage et le rendu sur petit écran."],
      ["Parcours d’achat", "Où le client bloque entre le produit et la commande."],
      ["Structure et SEO", "Ce qui est indexé, ce qui se concurrence, ce qui manque."],
      ["Opportunités de conversion", "Des changements classés par impact attendu."],
    ],
    reportTurnaround: "Livré sous deux jours ouvrés · Sans engagement",
    action: "Demander l’audit gratuit",
    note: "Un rapport concis · Aucun appel commercial insistant",
  },
} as const;

export default function HomeExperience() {
  const locale = useLocale() as keyof typeof copy;
  const t = copy[locale] ?? copy.en;
  const faq = HOME_FAQ[locale] ?? HOME_FAQ.en;
  const audit = auditCopy[locale] ?? auditCopy.en;
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const whatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(locale === "ar" ? "مرحبًا، أريد استشارة بخصوص مشروعي الرقمي." : "Hello, I would like a consultation about my digital project.")}`;
  const auditWhatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(locale === "ar" ? "مرحبًا، أريد التحليل المجاني لمتجري. رابط المتجر: " : "Hello, I would like the free store audit. Store URL: ")}`;

  /* Mobile menu: close on Escape and stop the page scrolling behind it. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.site}>
      <a href="#main" className="skip-link">
        {locale === "ar" ? "تخطَّ إلى المحتوى" : locale === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>
      <header className={styles.header}>
        <div className={styles.shell}>
          <nav className={styles.nav} aria-label={t.menu}>
            <Link
              href={`/${locale}`}
              className={styles.brand}
              aria-label="AM Design"
            >
              <Image
                src="/logo.png"
                alt="AM Design"
                width={178}
                height={70}
                priority
              />
            </Link>
            <div className={styles.navLinks}>
              {t.nav.map(([label, href]) =>
                href.startsWith("#") ? (
                  <a key={href} href={href}>
                    {label}
                  </a>
                ) : (
                  <Link key={href} href={`/${locale}${href}`}>
                    {label}
                  </Link>
                ),
              )}
            </div>
            <div className={styles.navActions}>
              <div className={styles.locales} aria-label="Language">
                {(["ar", "en", "fr"] as const).map((code) => (
                  <Link
                    key={code}
                    href={`/${code}`}
                    className={locale === code ? styles.activeLocale : ""}
                  >
                    {code.toUpperCase()}
                  </Link>
                ))}
              </div>
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className={styles.headerCta}
              >
                {t.start}
              </a>
              <button
                className={styles.menuButton}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label={t.menu}
              >
                <span />
                <span />
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div className={styles.mobileMenu}>
              {t.nav.map(([label, href]) =>
                href.startsWith("#") ? (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                    {label}
                  </a>
                ) : (
                  <Link key={href} href={`/${locale}${href}`} onClick={() => setMenuOpen(false)}>
                    {label}
                  </Link>
                ),
              )}
              <a href={whatsapp} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
                {t.start}
              </a>
            </div>
          )}
        </div>
      </header>

      <main id="main">
        <section className={styles.hero} data-own-spacing>
          <div className={`${styles.shell} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                <span />
                {t.eyebrow}
              </p>
              <h1>{t.title}</h1>
              <p className={styles.lead}>{t.intro}</p>
              <div className={styles.heroActions}>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.primaryButton}
                >
                  {t.primary}
                  <span>↗</span>
                </a>
                <a href="#services" className={styles.secondaryButton}>
                  {t.secondary}
                </a>
              </div>
              <p className={styles.note}>{t.note}</p>
            </div>
            {/* Was a mock browser window whose whole content was the numeral
                "01" set 200px in Arial — decoration that said nothing, in the
                most valuable space on the site. It now carries the three
                platforms and their delivery windows, and links into the
                section that explains how to choose between them. */}
            <div className={styles.heroPanel}>
              <div className={styles.panelTop}>
                <b>{t.panelLabel}</b>
              </div>
              <ul className={styles.panelList}>
                {t.panelPlatforms.map(([name, latin, time]) => (
                  <li key={latin}>
                    <span className={styles.panelName}>
                      {name}
                      <i>{latin}</i>
                    </span>
                    <span className={styles.panelTime}>{time}</span>
                  </li>
                ))}
              </ul>
              <a href="#choose" className={styles.panelBottom}>
                {t.panelCta}
                <span aria-hidden>{locale === "ar" ? "←" : "→"}</span>
              </a>
            </div>
          </div>
          <div className={`${styles.shell} ${styles.proof}`}>
            {t.proof.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Replaced a filler strip that read "SALLA ZID GOOGLE META" as four
            plain words claiming nothing, with the section that carries the
            core offer. */}
        <Platforms />
        <PlatformChooser />

        <section id="services" className={styles.section} data-own-spacing>
          <div className={styles.shell}>
            <div
              className={`${styles.sectionHead} ${styles.reveal}`}
              data-reveal
            >
              <div>
                <p className={styles.kicker}>{t.servicesKicker}</p>
                <h2>{t.servicesTitle}</h2>
              </div>
              <p>{t.servicesIntro}</p>
            </div>
            {/* Platforms, the chooser and Work are all panel grids. A fourth
                in sequence made the page read as one repeated rhythm, so the
                services run as an index of rows instead. */}
            <div className={styles.serviceIndex}>
              {t.services.map(([number, title, body]) => (
                <article
                  key={number}
                  className={`${styles.serviceRow} ${styles.reveal}`}
                  style={{ ["--edge" as string]: locale === "ar" ? "right" : "left" }}
                  data-reveal
                >
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <a href={whatsapp} target="_blank" rel="noreferrer" aria-label={`${t.start}: ${title}`}>
                    <b aria-hidden>{locale === "ar" ? "←" : "→"}</b>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sidra" className={styles.sidraSection} data-own-spacing>
          <div
            className={`${styles.shell} ${styles.sidraGrid} ${styles.reveal}`}
            data-reveal
          >
            <div className={styles.sidraVisual}>
              <div className={styles.sidraTop}>
                <span>SIDRA / SALLA THEME</span>
                <b>V1.0</b>
              </div>
              <Image
                src="/sidra-theme-logo.png"
                alt="SIDRA Salla theme"
                width={360}
                height={360}
              />
              <div className={styles.sidraVisualBottom}>
                <span>MOBILE FIRST</span>
                <span>NO CODE</span>
                <span>RTL READY</span>
              </div>
            </div>
            <div className={styles.sidraCopy}>
              <p className={styles.kicker}>{t.sidraKicker}</p>
              <h2>{t.sidraTitle}</h2>
              <p className={styles.sidraBody}>{t.sidraBody}</p>
              <div className={styles.sidraStats}>
                {t.sidraStats.map(([value, label]) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <ul>
                {t.sidraFeatures.map((feature) => (
                  <li key={feature}>
                    <span>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className={styles.sidraActions}>
                <Link href={`/${locale}/sidra-theme`}>
                  {t.sidraDocs}
                  <span>↗</span>
                </Link>
                <a href={whatsapp} target="_blank" rel="noreferrer">
                  {t.sidraOrder}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="work"
          className={`${styles.section} ${styles.workSection}`}
          data-own-spacing
        >
          <div className={styles.shell}>
            <div
              className={`${styles.sectionHead} ${styles.reveal}`}
              data-reveal
            >
              <div>
                <p className={styles.kicker}>{t.workKicker}</p>
                <h2>{t.workTitle}</h2>
              </div>
            </div>
            <div className={styles.workGrid}>
              {t.projects.map(([name, category, body, image], index) => (
                <article
                  key={name}
                  className={`${styles.projectCard} ${styles.reveal}`}
                  data-reveal
                >
                  <div
                    className={`${styles.projectVisual} ${styles[`visual${index + 1}`]}`}
                  >
                    <span>0{index + 1}</span>
                    <Image
                      src={image}
                      alt={`${name} project`}
                      width={220}
                      height={120}
                    />
                  </div>
                  <p>{category}</p>
                  <h3>{name}</h3>
                  <div>{body}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.auditSection} data-own-spacing>
          <div
            className={`${styles.shell} ${styles.auditGrid} ${styles.reveal}`}
            data-reveal
          >
            <div className={styles.auditCopy}>
              <p className={styles.kicker}>{audit.kicker}</p>
              <h2>{audit.title}</h2>
              <p>{audit.body}</p>
              <ul>
                {audit.points.map((point) => (
                  <li key={point}>
                    <span>✓</span>
                    {point}
                  </li>
                ))}
              </ul>
              <a href={auditWhatsapp} target="_blank" rel="noreferrer">
                {audit.action}
                <b>↗</b>
              </a>
              <small>{audit.note}</small>
            </div>
            {/* This was a mock scorecard reading "84 / 100" over four bars at
                88/72/81/64% and "4 PRIORITY ACTIONS" — numbers describing no
                real store, drawn as though they did. It now shows what the
                report actually contains. */}
            <div className={styles.auditReport}>
              <div className={styles.reportHead}>
                <span>{audit.reportLabel}</span>
                <b>{audit.reportFree}</b>
              </div>
              <ol className={styles.reportList}>
                {audit.report.map(([axis, line], i) => (
                  <li key={axis}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{axis}</strong>
                      <em>{line}</em>
                    </div>
                  </li>
                ))}
              </ol>
              <div className={styles.reportFoot}>
                <span>{audit.reportTurnaround}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className={styles.processSection} data-own-spacing>
          <div
            className={`${styles.shell} ${styles.processGrid} ${styles.reveal}`}
            data-reveal
          >
            <div>
              <p className={styles.kicker}>{t.processKicker}</p>
              <h2>{t.processTitle}</h2>
            </div>
            <div className={styles.steps}>
              {t.process.map(([number, title, body]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className={styles.section} data-own-spacing>
          <div
            className={`${styles.shell} ${styles.faqGrid} ${styles.reveal}`}
            data-reveal
          >
            <div>
              <p className={styles.kicker}>{t.faqKicker}</p>
              <h2>{t.faqTitle}</h2>
            </div>
            <div className={styles.faqList}>
              {faq.map(([question, answer], index) => {
                const isOpen = openFaq === index;
                return (
                  /* The answer stays mounted and is hidden with `hidden`
                     rather than unmounted: the button now has something real
                     to point `aria-controls` at, and the copy ships in the
                     server HTML instead of appearing only on click. */
                  <article key={question} className={styles.faqItem}>
                    <button
                      type="button"
                      id={`faq-q-${index}`}
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${index}`}
                    >
                      <span>{question}</span>
                      <b aria-hidden>{isOpen ? "−" : "+"}</b>
                    </button>
                    <p id={`faq-a-${index}`} role="region" aria-labelledby={`faq-q-${index}`} hidden={!isOpen}>
                      {answer}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className={styles.ctaSection} data-own-spacing>
          <div
            className={`${styles.shell} ${styles.ctaInner} ${styles.reveal}`}
            data-reveal
          >
            <div>
              <p>{t.ctaKicker}</p>
              <h2>{t.ctaTitle}</h2>
              <span>{t.ctaBody}</span>
            </div>
            <a href={whatsapp} target="_blank" rel="noreferrer">
              {t.ctaButton}
              <b>↗</b>
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.shell} ${styles.footerMain}`}>
          <div>
            <Image src="/logo.png" alt="AM Design" width={160} height={63} />
            <p>{t.footerText}</p>
          </div>
          <nav aria-label={t.menu}>
            {t.nav.map(([label, href]) =>
              href.startsWith("#") ? (
                <a key={href} href={href}>
                  {label}
                </a>
              ) : (
                <Link key={href} href={`/${locale}${href}`}>
                  {label}
                </Link>
              ),
            )}
            <Link href={`/${locale}/policy`}>
              {locale === "ar" ? "الشروط والخصوصية" : locale === "fr" ? "Conditions & confidentialité" : "Terms & Privacy"}
            </Link>
          </nav>
          <div className={styles.footerContact}>
            <a href="mailto:mansoor77soliman@gmail.com">
              mansoor77soliman@gmail.com
            </a>
            <a href={whatsapp}>+20 100 783 5547</a>
          </div>
        </div>
        <div className={`${styles.shell} ${styles.footerBottom}`}>
          <span>
            © {new Date().getFullYear()} AM Design. {t.rights}
          </span>
          <div>
            <a href="https://www.instagram.com/amdesign.ksa/">Instagram</a>
            <a href="https://x.com/am_designing">X</a>
            <a href="https://www.tiktok.com/@amdesigne.sa">TikTok</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
