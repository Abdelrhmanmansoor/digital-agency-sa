"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import styles from "./HomeExperience.module.css";

const WHATSAPP = "201007835547";

const copy = {
  ar: {
    nav: [
      ["الخدمات", "#services"],
      ["ثيم سِدرة", "#sidra"],
      ["أعمالنا", "#work"],
      ["منهجية العمل", "#process"],
      ["الأسئلة", "#faq"],
    ],
    start: "ابدأ مشروعك",
    eyebrow: "شريكك الرقمي لنمو التجارة الإلكترونية",
    title: "نبني متاجر رقمية واضحة، سريعة، ومهيأة للنمو.",
    intro:
      "نصمم ونطوّر متاجر سلة وزد، ونبني الهوية والتجربة والحملات حول هدف واحد: تحويل الزيارة إلى طلب.",
    primary: "اطلب استشارة مجانية",
    secondary: "استعرض خدماتنا",
    note: "رد خلال أقل من ساعة · نخدم جميع مناطق السعودية",
    proof: [
      ["+300", "مشروع منجز"],
      ["سلة + زد", "خبرة متخصصة"],
      ["5.0", "تقييم العملاء"],
    ],
    trusted: "خبرة عملية عبر منصات التجارة والإعلان",
    servicesKicker: "الخدمات الأساسية",
    servicesTitle: "كل ما يحتاجه متجرك، دون تشتيت.",
    servicesIntro:
      "اختصرنا خدماتنا في أربعة مسارات مترابطة؛ نبدأ من الأساس الصحيح ثم نقيس ونطوّر.",
    services: [
      [
        "01",
        "تصميم وتطوير متاجر سلة وزد",
        "تصميم واجهة مخصصة، تحسين تجربة الشراء، إعداد الدفع والشحن، وتهيئة المتجر للإطلاق.",
      ],
      [
        "02",
        "الهوية والتصميم الإبداعي",
        "هوية بصرية متماسكة وتطبيقات رقمية تمنح علامتك حضورًا واضحًا ويمكن تذكره.",
      ],
      [
        "03",
        "تحسين التحويل وSEO",
        "بنية محتوى وصفحات منتجات أسرع وأوضح، مع تحسين تقني يساعد العملاء ومحركات البحث.",
      ],
      [
        "04",
        "التسويق وإدارة الحملات",
        "إعلانات مبنية على البيانات في Google وMeta وSnapchat مع متابعة مستمرة للنتائج.",
      ],
      [
        "05",
        "التطبيقات والحلول المخصصة",
        "تصميم وبرمجة تطبيقات ولوحات تحكم ومنصات رقمية مبنية حول طريقة عمل مشروعك.",
      ],
      [
        "06",
        "الأتمتة وربط الأنظمة",
        "ربط الأدوات والبيانات وأتمتة المهام المتكررة لتقليل الوقت والأخطاء التشغيلية.",
      ],
      [
        "07",
        "المحتوى والتصوير بالذكاء الاصطناعي",
        "صور منتجات ومحتوى إعلاني وتصاميم سوشيال تحافظ على هوية العلامة وجودة العرض.",
      ],
      [
        "08",
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
    faq: [
      [
        "كم يستغرق تصميم المتجر؟",
        "غالبًا من 10 إلى 20 يوم عمل، بحسب حجم المتجر والمحتوى والتخصيص المطلوب.",
      ],
      [
        "هل تعملون على سلة وزد؟",
        "نعم. نتخصص في تصميم وتطوير متاجر سلة وزد، إضافة إلى المواقع المخصصة عند الحاجة.",
      ],
      [
        "هل تشمل الخدمة تحسين الظهور في Google؟",
        "نهيئ البنية التقنية، العناوين، المحتوى، البيانات المنظمة، السرعة، وخريطة الموقع. التحسن العضوي يحتاج أيضًا إلى محتوى مستمر ووقت.",
      ],
      [
        "هل يمكن البدء باستشارة فقط؟",
        "نعم. نراجع وضع المشروع ونقترح الأولويات قبل اختيار الخدمة المناسبة.",
      ],
    ],
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
      ["Services", "#services"],
      ["SIDRA", "#sidra"],
      ["Work", "#work"],
      ["Process", "#process"],
      ["FAQ", "#faq"],
    ],
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
      ["Salla + Zid", "Specialized expertise"],
      ["5.0", "Client rating"],
    ],
    trusted: "Hands-on experience across commerce and advertising platforms",
    servicesKicker: "Core services",
    servicesTitle: "Everything your store needs. Nothing it does not.",
    servicesIntro:
      "Four connected capabilities that give your store the right foundation, then improve it with evidence.",
    services: [
      [
        "01",
        "Salla & Zid store design",
        "Custom interfaces, smoother purchasing, payment and shipping setup, and launch readiness.",
      ],
      [
        "02",
        "Brand identity & creative",
        "A cohesive identity and digital system that makes your brand clear and memorable.",
      ],
      [
        "03",
        "Conversion & SEO",
        "Faster, clearer product journeys with technical optimization for customers and search engines.",
      ],
      [
        "04",
        "Marketing & campaigns",
        "Data-led Google, Meta and Snapchat campaigns with continuous performance review.",
      ],
      [
        "05",
        "Custom apps & platforms",
        "Purpose-built apps, dashboards and digital platforms shaped around your workflow.",
      ],
      [
        "06",
        "Automation & integrations",
        "Connected tools and automated repetitive tasks that reduce time and operating errors.",
      ],
      [
        "07",
        "AI content & product visuals",
        "Product imagery, campaign assets and social content aligned with your brand.",
      ],
      [
        "08",
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
    faq: [
      [
        "How long does a store take?",
        "Most projects take 10–20 working days, depending on store size, content and customization.",
      ],
      [
        "Do you work with Salla and Zid?",
        "Yes. They are our core specialty, alongside custom websites when needed.",
      ],
      [
        "Is Google visibility included?",
        "We optimize structure, titles, content, structured data, speed and sitemap. Organic growth also requires consistent content and time.",
      ],
      [
        "Can we start with consultation only?",
        "Yes. We can review your current position and recommend priorities before selecting a service.",
      ],
    ],
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
      ["Services", "#services"],
      ["SIDRA", "#sidra"],
      ["Projets", "#work"],
      ["Méthode", "#process"],
      ["FAQ", "#faq"],
    ],
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
      ["Salla + Zid", "Expertise spécialisée"],
      ["5.0", "Note clients"],
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
        "Design Salla & Zid",
        "Interfaces sur mesure, achat fluide, paiement, livraison et préparation au lancement.",
      ],
      [
        "02",
        "Identité & création",
        "Une identité cohérente qui rend votre marque claire et mémorable.",
      ],
      [
        "03",
        "Conversion & SEO",
        "Des parcours produits plus rapides et une optimisation technique pour les clients et la recherche.",
      ],
      [
        "04",
        "Marketing & campagnes",
        "Campagnes Google, Meta et Snapchat pilotées par les données.",
      ],
      [
        "05",
        "Applications sur mesure",
        "Applications, tableaux de bord et plateformes adaptés à vos opérations.",
      ],
      [
        "06",
        "Automatisation & intégrations",
        "Outils connectés et tâches répétitives automatisées.",
      ],
      [
        "07",
        "Contenu & visuels IA",
        "Images produits, campagnes et contenus sociaux cohérents avec la marque.",
      ],
      [
        "08",
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
    faq: [
      [
        "Combien de temps faut-il ?",
        "La plupart des projets prennent 10 à 20 jours ouvrés.",
      ],
      [
        "Travaillez-vous avec Salla et Zid ?",
        "Oui, c’est notre spécialité principale.",
      ],
      [
        "Le SEO est-il inclus ?",
        "Nous optimisons la structure, le contenu, les données structurées, la vitesse et le sitemap.",
      ],
      [
        "Peut-on commencer par une consultation ?",
        "Oui. Nous pouvons d’abord auditer votre situation et définir les priorités.",
      ],
    ],
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

export default function HomeExperience() {
  const locale = useLocale() as keyof typeof copy;
  const t = copy[locale] ?? copy.en;
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const whatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(locale === "ar" ? "مرحبًا، أريد استشارة بخصوص مشروعي الرقمي." : "Hello, I would like a consultation about my digital project.")}`;

  return (
    <div className={styles.site}>
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
              {t.nav.map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
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
              {t.nav.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ))}
              <a href={whatsapp}>{t.start}</a>
            </div>
          )}
        </div>
      </header>

      <main>
        <section className={styles.hero}>
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
            <div className={styles.heroPanel} aria-hidden="true">
              <div className={styles.panelTop}>
                <span />
                <span />
                <span />
                <b>AM / COMMERCE</b>
              </div>
              <div className={styles.panelBody}>
                <span className={styles.panelLabel}>
                  STRATEGY · DESIGN · GROWTH
                </span>
                <strong>01</strong>
                <div className={styles.panelMetric}>
                  <i>CONVERSION SYSTEM</i>
                  <em>READY TO SCALE</em>
                </div>
              </div>
              <div className={styles.panelBottom}>
                <span>SALLA</span>
                <span>ZID</span>
                <span>SEO</span>
                <span>CRO</span>
              </div>
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

        <section className={styles.platforms}>
          <div className={`${styles.shell} ${styles.platformRow}`}>
            <p>{t.trusted}</p>
            <div>
              <span>SALLA</span>
              <span>ZID</span>
              <span>GOOGLE</span>
              <span>META</span>
            </div>
          </div>
        </section>

        <section id="services" className={styles.section}>
          <div className={styles.shell}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.kicker}>{t.servicesKicker}</p>
                <h2>{t.servicesTitle}</h2>
              </div>
              <p>{t.servicesIntro}</p>
            </div>
            <div className={styles.serviceGrid}>
              {t.services.map(([number, title, body]) => (
                <article key={number} className={styles.serviceCard}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <a href={whatsapp} aria-label={`${t.start}: ${title}`}>
                    ↗
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sidra" className={styles.sidraSection}>
          <div className={`${styles.shell} ${styles.sidraGrid}`}>
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
        >
          <div className={styles.shell}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.kicker}>{t.workKicker}</p>
                <h2>{t.workTitle}</h2>
              </div>
            </div>
            <div className={styles.workGrid}>
              {t.projects.map(([name, category, body, image], index) => (
                <article key={name} className={styles.projectCard}>
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

        <section id="process" className={styles.processSection}>
          <div className={`${styles.shell} ${styles.processGrid}`}>
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

        <section id="faq" className={styles.section}>
          <div className={`${styles.shell} ${styles.faqGrid}`}>
            <div>
              <p className={styles.kicker}>{t.faqKicker}</p>
              <h2>{t.faqTitle}</h2>
            </div>
            <div className={styles.faqList}>
              {t.faq.map(([question, answer], index) => (
                <article key={question} className={styles.faqItem}>
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    aria-expanded={openFaq === index}
                  >
                    <span>{question}</span>
                    <b>{openFaq === index ? "−" : "+"}</b>
                  </button>
                  {openFaq === index && <p>{answer}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className={styles.ctaSection}>
          <div className={`${styles.shell} ${styles.ctaInner}`}>
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
          <nav>
            {t.nav.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            <Link href={`/${locale}/blog`}>
              {locale === "ar" ? "المدونة" : "Blog"}
            </Link>
            <Link href={`/${locale}/store`}>
              {locale === "ar" ? "متجر الخدمات" : "Store"}
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
