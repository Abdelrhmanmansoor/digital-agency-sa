"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import styles from "./Platforms.module.css";

/* Scope of work per platform. These describe what building a store on each
   platform actually involves — no invented credentials, client counts or
   certifications. Delivery windows for Salla match lib/store-data.ts; Zid and
   Shopify quote a range rather than a number the catalogue does not set. */

type Platform = {
  key: string;
  wordmark: string;
  latin: string;
  market: string;
  pitch: string;
  points: string[];
  metaLabel: string;
  metaValue: string;
  href: string;
};

type Copy = {
  kicker: string;
  title: string;
  lead: string;
  platforms: Platform[];
  baselineTitle: string;
  baselineBody: string;
  baseline: string[];
  cta: string;
};

const copy: Record<"ar" | "en" | "fr", Copy> = {
  ar: {
    kicker: "منصات المتاجر",
    title: "نبني على المنصة التي تناسب سوقك، لا التي نفضّلها نحن.",
    lead: "سلة وزد للسوق السعودي والخليجي، وشوبيفاي حين يكون البيع خارج الحدود أو بعملات متعددة. الاختيار يُحسم بعد فهم المنتج والجمهور وطريقة الشحن — لا قبله.",
    platforms: [
      {
        key: "salla",
        wordmark: "سلة",
        latin: "Salla",
        market: "السوق السعودي",
        pitch:
          "المنصة الأوسع انتشارًا في السعودية، ومعها تكاملات محلية جاهزة للدفع والشحن والفوترة الإلكترونية.",
        points: [
          "ثيم مخصص بالكامل بهوية علامتك بدل القوالب الجاهزة",
          "تجهيز المتجر من الصفر: التصنيفات، المنتجات، الخيارات والمخزون",
          "ربط مدى وأبل باي والتقسيط: تابي وتمارا وإمكان ومدفوع",
          "ضبط ضريبة القيمة المضافة والفوترة الإلكترونية ZATCA المرحلة الثانية",
          "إعداد شركات الشحن ومناطق التوصيل وبوالص الشحن وسياسات الإرجاع",
          "تهيئة الصفحات لمحركات البحث قبل الإطلاق لا بعده",
        ],
        metaLabel: "مدة التنفيذ",
        metaValue: "ثيم 5 أيام · متجر كامل 7 أيام",
        href: "/store/salla-store-setup",
      },
      {
        key: "zid",
        wordmark: "زد",
        latin: "Zid",
        market: "السعودية والخليج",
        pitch:
          "خيار قوي للمتاجر التي تعتمد على تطبيق جوال إلى جانب المتجر، مع لوحة تحكم مباشرة للفريق التشغيلي.",
        points: [
          "تصميم واجهة المتجر وتطبيق الجوال بهوية واحدة",
          "بناء شجرة تصنيفات تُسهّل الوصول للمنتج في نقرتين",
          "ضبط الخيارات والمتغيّرات والجرد والمخزون عبر عدة مستودعات وفروع",
          "ربط بوابات الدفع وخدمات التقسيط وشركات الشحن المعتمدة",
          "ضبط الضريبة والفوترة الإلكترونية بما يطابق متطلبات هيئة الزكاة",
          "تدريب فريقك على إدارة الطلبات والمخزون بعد التسليم",
        ],
        metaLabel: "مدة التنفيذ",
        metaValue: "من 7 إلى 12 يوم عمل",
        href: "/store",
      },
      {
        key: "shopify",
        wordmark: "شوبيفاي",
        latin: "Shopify",
        market: "البيع خارج الحدود",
        pitch:
          "الخيار الأنسب حين تبيع بعملات ولغات متعددة أو تشحن دوليًا، مع منظومة تطبيقات واسعة تغطي كل حالة تشغيل تقريبًا.",
        points: [
          "ثيم Liquid مخصص يُبنى من الصفر لا نسخة معدّلة من قالب",
          "متجر متعدد اللغات والعملات مع دعم كامل للاتجاه العربي RTL",
          "تهيئة الـ Checkout وربط بوابات الدفع الدولية، ومدى عبر بوابة طرف ثالث",
          "معالجة ما لا تدعمه المنصة محليًا: الفوترة الإلكترونية والشحن السعودي",
          "اختيار وربط التطبيقات بما يخدم التشغيل دون إبطاء المتجر",
          "ترحيل متجر قائم من منصة أخرى مع الحفاظ على الروابط والسيو",
        ],
        metaLabel: "مدة التنفيذ",
        metaValue: "من 10 إلى 18 يوم عمل",
        href: "/store",
      },
    ],
    baselineTitle: "ما يشمله كل مشروع، أيًّا كانت المنصة",
    baselineBody:
      "هذه ليست إضافات تُحاسب عليها لاحقًا. هي الحد الأدنى الذي نعتبره شرطًا لإطلاق أي متجر.",
    baseline: [
      "تصميم يبدأ من الجوال قبل الشاشة الكبيرة",
      "سرعة تحميل مقاسة قبل التسليم",
      "بنية صفحات ووسوم مهيأة لمحركات البحث",
      "صفحات منتج مكتوبة لتبيع لا لتوصف",
      "مسار شراء مختصر حتى إتمام الطلب",
      "تسليم مع تدريب عملي على الإدارة",
    ],
    cta: "تفاصيل الخدمة",
  },
  en: {
    kicker: "Store platforms",
    title: "We build on the platform your market needs, not the one we prefer.",
    lead: "Salla and Zid for Saudi and the Gulf, Shopify when you sell across borders or in several currencies. The choice is settled after we understand the product, the audience and the shipping model — not before.",
    platforms: [
      {
        key: "salla",
        wordmark: "Salla",
        latin: "سلة",
        market: "Saudi market",
        pitch:
          "The most widely used platform in Saudi Arabia, with local payment, shipping and e-invoicing integrations ready out of the box.",
        points: [
          "A fully custom theme in your brand, not a dressed-up template",
          "Store built from zero: categories, products, options and stock",
          "mada, Apple Pay and BNPL: Tabby, Tamara, Emkan and Madfu",
          "VAT and ZATCA phase-2 e-invoicing configured",
          "Carriers, delivery zones, shipping labels and return policy set up",
          "Pages optimized for search before launch, not after",
        ],
        metaLabel: "Delivery",
        metaValue: "Theme 5 days · Full store 7 days",
        href: "/store/salla-store-setup",
      },
      {
        key: "zid",
        wordmark: "Zid",
        latin: "زد",
        market: "Saudi & Gulf",
        pitch:
          "A strong fit for stores that lean on a mobile app alongside the storefront, with a hands-on dashboard for the operations team.",
        points: [
          "Storefront and mobile app designed as one identity",
          "A category tree that puts any product two clicks away",
          "Options, variants, stocktaking and inventory across warehouses and branches",
          "Payment gateways, BNPL and approved shipping carriers connected",
          "Tax and e-invoicing configured to ZATCA requirements",
          "Your team trained on orders and inventory after handover",
        ],
        metaLabel: "Delivery",
        metaValue: "7 to 12 working days",
        href: "/store",
      },
      {
        key: "shopify",
        wordmark: "Shopify",
        latin: "شوبيفاي",
        market: "Cross-border",
        pitch:
          "The right call when you sell in several languages and currencies or ship internationally, with an app ecosystem that covers almost any operation.",
        points: [
          "A custom Liquid theme built from scratch, not a forked template",
          "Multi-language and multi-currency with full Arabic RTL support",
          "Checkout configured, international gateways wired in, mada via a third-party gateway",
          "The gaps the platform leaves locally handled: e-invoicing and Saudi shipping",
          "Apps chosen for the operation without slowing the storefront down",
          "Migration from another platform with URLs and SEO preserved",
        ],
        metaLabel: "Delivery",
        metaValue: "10 to 18 working days",
        href: "/store",
      },
    ],
    baselineTitle: "What every build includes, whatever the platform",
    baselineBody:
      "None of this is an add-on billed later. It is the floor we treat as a condition for launching a store at all.",
    baseline: [
      "Designed on phone widths before desktop",
      "Load speed measured before handover",
      "Page structure and tags ready for search",
      "Product pages written to sell, not to describe",
      "A short path from landing to completed order",
      "Handover with hands-on admin training",
    ],
    cta: "Service details",
  },
  fr: {
    kicker: "Plateformes e-commerce",
    title: "Nous construisons sur la plateforme qu’exige votre marché.",
    lead: "Salla et Zid pour l’Arabie saoudite et le Golfe, Shopify pour la vente transfrontalière et multidevise. Le choix se décide après avoir compris le produit, l’audience et la logistique.",
    platforms: [
      {
        key: "salla",
        wordmark: "Salla",
        latin: "سلة",
        market: "Marché saoudien",
        pitch:
          "La plateforme la plus utilisée en Arabie saoudite, avec les intégrations locales de paiement, de livraison et de facturation prêtes à l’emploi.",
        points: [
          "Un thème entièrement sur mesure, pas un gabarit remanié",
          "Boutique construite de zéro : catégories, produits, options, stock",
          "mada, Apple Pay et paiement fractionné : Tabby, Tamara, Emkan, Madfu",
          "TVA et facturation électronique ZATCA phase 2 configurées",
          "Transporteurs, zones, étiquettes et politique de retour configurés",
          "Pages optimisées pour la recherche avant le lancement",
        ],
        metaLabel: "Délai",
        metaValue: "Thème 5 j · Boutique complète 7 j",
        href: "/store/salla-store-setup",
      },
      {
        key: "zid",
        wordmark: "Zid",
        latin: "زد",
        market: "Arabie saoudite & Golfe",
        pitch:
          "Un bon choix pour les boutiques qui s’appuient sur une application mobile, avec un back-office direct pour l’équipe opérationnelle.",
        points: [
          "Boutique et application mobile conçues comme une seule identité",
          "Une arborescence qui met chaque produit à deux clics",
          "Options, variantes, inventaire et stock sur plusieurs entrepôts",
          "Passerelles, paiement fractionné et transporteurs agréés connectés",
          "Fiscalité et facturation électronique conformes aux exigences ZATCA",
          "Formation de votre équipe après la livraison",
        ],
        metaLabel: "Délai",
        metaValue: "7 à 12 jours ouvrés",
        href: "/store",
      },
      {
        key: "shopify",
        wordmark: "Shopify",
        latin: "شوبيفاي",
        market: "Vente internationale",
        pitch:
          "Le choix pertinent pour vendre en plusieurs langues et devises ou expédier à l’international, avec un écosystème d’applications très large.",
        points: [
          "Un thème Liquid sur mesure, construit de zéro",
          "Multilingue et multidevise, avec support RTL arabe complet",
          "Checkout configuré, passerelles internationales, mada via un tiers",
          "Les manques locaux traités : facturation électronique et livraison saoudienne",
          "Applications choisies sans ralentir la boutique",
          "Migration depuis une autre plateforme, URLs et SEO préservés",
        ],
        metaLabel: "Délai",
        metaValue: "10 à 18 jours ouvrés",
        href: "/store",
      },
    ],
    baselineTitle: "Ce que comprend chaque projet, quelle que soit la plateforme",
    baselineBody:
      "Rien de tout cela n’est une option facturée plus tard. C’est le socle minimum avant tout lancement.",
    baseline: [
      "Conçu d’abord pour mobile",
      "Vitesse mesurée avant la livraison",
      "Structure et balises prêtes pour la recherche",
      "Fiches produit écrites pour vendre",
      "Un parcours d’achat court",
      "Livraison avec formation pratique",
    ],
    cta: "Détail de la prestation",
  },
};

export default function Platforms() {
  const locale = useLocale();
  const t = copy[locale as keyof typeof copy] ?? copy.en;
  const isRTL = locale === "ar";

  return (
    <section id="platforms" className={styles.section} data-own-spacing>
      <div className={styles.shell}>
        <div className={styles.head}>
          <div>
            <p className={styles.kicker}>{t.kicker}</p>
            <h2>{t.title}</h2>
          </div>
          <p>{t.lead}</p>
        </div>

        <div className={styles.grid}>
          {t.platforms.map((platform, index) => (
            <article
              key={platform.key}
              className={styles.panel}
              style={{ ["--edge" as string]: isRTL ? "right" : "left" }}
            >
              <div className={styles.panelTop}>
                <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.market}>{platform.market}</span>
              </div>

              <h3 className={styles.wordmark} style={{ marginTop: "26px" }}>
                {platform.wordmark}
                <span className={styles.latin}>{platform.latin}</span>
              </h3>

              <p className={styles.pitch}>{platform.pitch}</p>

              <ul className={styles.list}>
                {platform.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className={styles.panelFoot}>
                <span className={styles.meta}>
                  {platform.metaLabel}
                  <b>{platform.metaValue}</b>
                </span>
                <Link href={`/${locale}${platform.href}`} className={styles.panelLink}>
                  {t.cta}
                  <span aria-hidden>{isRTL ? "←" : "→"}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.baseline}>
          <div>
            <h3>{t.baselineTitle}</h3>
            <p>{t.baselineBody}</p>
          </div>
          <div className={styles.baseItems}>
            {t.baseline.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
