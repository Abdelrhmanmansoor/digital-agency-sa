/* Server component. The homepage, rebuilt around one job: move a visitor from
   "who are these people" to a WhatsApp conversation in as few screens as the
   decision honestly needs.

   What was cut, and why: the platform chooser, the "who we fit" grid, the
   tools brand wall, the SIDRA feature block and the legal-sector bridge all
   answered questions a visitor was not asking yet. SIDRA and the legal page
   keep their own URLs and sit in the footer. Every figure left on the page is
   one the business can stand behind. */

import Image from "next/image";
import Link from "next/link";
import { HOME_FAQ } from "@/lib/home-faq";
import { PRODUCTS } from "@/lib/store-data";
import { PROJECTS, RESULTS } from "@/components/proposal/data";
import { getWhatsAppLink } from "@/lib/utils";
import { SERVICE_CATEGORIES } from "@/lib/categories";
import { MARKETS } from "@/lib/markets";
import HomeFaq from "./HomeFaq";
import CategorySlider from "./CategorySlider";
import Principles from "./Principles";
import styles from "./HomeExperience.module.css";

type Lang = "ar" | "en" | "fr";

const copy = {
  ar: {
    mkKicker: "أسواق الخليج",
    mkTitle: "نبني متاجر لتجار الخليج كله.",
    mkLead: "من الإمارات إلى عُمان: متجر مضبوط على عملتك وضريبتك وشحنك، على سلة أو زد.",
    catKicker: "التصنيفات",
    catTitle: "كل ما يحتاجه متجرك، في مكان واحد.",
    catLead: "اختر الخدمة لترى تفاصيلها وسعرها، أو اطلبها مباشرة على واتساب.",
    catView: "عرض المنتج",
    catAsk: "اطلب عبر واتساب",
    catMsg: "مرحبًا، أريد الاستفسار عن خدمة: ",
    catPrev: "السابق",
    catNext: "التالي",
    eyebrow: "وكالة رقمية للمتاجر والعلامات",
    title: ["متاجر تبيع،", "وعلامات لا تُنسى"],
    intro: "نصمم ونبني متاجر سلة وزد وهويات العلامات بعناية التفاصيل التي تمنح عميلك الثقة ليكمل الطلب.",
    primary: "ابدأ على واتساب",
    secondary: "تصفّح المنتجات",
    builtOn: "نبني على",
    statement: "أكثر من 300 مشروع لعلامات سعودية وخليجية — بعقد وفاتورة ودعم بعد التسليم.",
    statementSide: "نختصر عليك الطريق: سعر معلن، مدة معلنة، وتواصل مباشر مع من ينفّذ.",
    servicesKicker: "الخدمات",
    servicesTitle: "أربع خدمات. كل واحدة بنطاق وسعر ومدة واضحة.",
    from: "يبدأ من",
    perMonth: "/ شهريًا",
    sar: "ر.س",
    details: "التفاصيل",
    order: "اطلب الآن",
    more: "خدمات أخرى",
    workKicker: "أعمالنا",
    workTitle: "متاجر تعمل الآن.",
    workLead: "كل بطاقة تفتح الموقع الحقيقي — اللقطة من المتجر نفسه.",
    visit: "زيارة الموقع",
    proofKicker: "لماذا نحن",
    proofTitle: "الثقة لا تُكتب. تُبنى بالتفاصيل.",
    proof: [
      ["+300", "مشروع منجز"],
      ["60 د", "أقصى زمن للرد في أوقات العمل"],
      ["3", "منصات: سلة، زد، شوبيفاي"],
    ],
    pillars: [
      ["عقد وفاتورة رسمية", "نطاق مكتوب قبل البدء، وفاتورة لكل دفعة."],
      ["دفع على مراحل", "لا تدفع المبلغ كاملًا قبل أن ترى العمل."],
      ["دعم بعد التسليم", "نبقى معك بعد الإطلاق، لا نختفي بعد الدفعة الأخيرة."],
    ],
    resultsTitle: "أرقام من حملات أدرناها",
    processKicker: "طريقة العمل",
    processTitle: "ثلاث خطوات من أول رسالة إلى الإطلاق.",
    process: [
      ["01", "محادثة", "ترسل لنا فكرتك على واتساب، ونرد بنطاق وسعر ومدة خلال ساعة."],
      ["02", "تنفيذ", "نصمم ونبني ونرسل لك المراحل لتراجعها قبل أي دفعة تالية."],
      ["03", "إطلاق", "نختبر رحلة الشراء كاملة، ونسلّم، ونبقى للدعم."],
    ],
    auditKicker: "ابدأ بلا التزام",
    auditTitle: "تحليل مجاني لمتجرك الحالي",
    auditBody: "نراجع السرعة ورحلة الشراء والسيو، ونرسل لك ملاحظات مرتبة حسب أثرها — خلال يومي عمل.",
    auditCta: "اطلب التحليل المجاني",
    faqKicker: "الأسئلة الشائعة",
    faqTitle: "إجابات مباشرة قبل أن نبدأ.",
    hello: "مرحبًا، أريد استشارة بخصوص مشروعي.",
    audit: "مرحبًا، أريد التحليل المجاني لمتجري. رابط المتجر: ",
    orderMsg: "مرحبًا، أريد طلب خدمة: ",
  },
  en: {
    mkKicker: "Gulf markets",
    mkTitle: "We build stores for merchants across the Gulf.",
    mkLead: "From the UAE to Oman: a store set to your currency, tax and shipping, on Salla or Zid.",
    catKicker: "Categories",
    catTitle: "Everything your store needs, in one place.",
    catLead: "Pick a service to see its details and price, or order it directly on WhatsApp.",
    catView: "View product",
    catAsk: "Ask on WhatsApp",
    catMsg: "Hello, I would like to ask about: ",
    catPrev: "Previous",
    catNext: "Next",
    eyebrow: "A digital agency for stores and brands",
    title: ["Stores that sell,", "brands that stay"],
    intro: "We design and build Salla and Zid stores and brand identities with the kind of detail that gives your customer the confidence to complete the order.",
    primary: "Start on WhatsApp",
    secondary: "Browse products",
    builtOn: "We build on",
    statement: "300+ projects for Saudi and Gulf brands — each with a contract, an invoice and support after handover.",
    statementSide: "The short route: a published price, a published timeline, and a direct line to the people doing the work.",
    servicesKicker: "Services",
    servicesTitle: "Four services. Each with a clear scope, price and timeline.",
    from: "From",
    perMonth: "/ month",
    sar: "SAR",
    details: "Details",
    order: "Order now",
    more: "Other services",
    workKicker: "Work",
    workTitle: "Stores running right now.",
    workLead: "Every card opens the live site — the screenshot comes from the store itself.",
    visit: "Visit site",
    proofKicker: "Why us",
    proofTitle: "Trust is not written. It is built in the details.",
    proof: [
      ["300+", "Projects delivered"],
      ["< 1 hr", "Average reply time"],
      ["3", "Platforms: Salla, Zid, Shopify"],
    ],
    pillars: [
      ["Contract and invoice", "A written scope before we start, an invoice for every payment."],
      ["Phased payments", "You never pay in full before you have seen the work."],
      ["Support after handover", "We stay after launch rather than vanishing after the last payment."],
    ],
    resultsTitle: "Numbers from campaigns we ran",
    processKicker: "How we work",
    processTitle: "Three steps from first message to launch.",
    process: [
      ["01", "Conversation", "Send us your idea on WhatsApp; we reply with scope, price and timeline within the hour."],
      ["02", "Build", "We design and build, sending each stage for your review before the next payment."],
      ["03", "Launch", "We test the full checkout, hand over, and stay on for support."],
    ],
    auditKicker: "No commitment",
    auditTitle: "A free audit of your current store",
    auditBody: "We review speed, the purchase journey and SEO, and send notes ranked by impact — within two working days.",
    auditCta: "Request the free audit",
    faqKicker: "FAQ",
    faqTitle: "Straight answers before we begin.",
    hello: "Hello, I would like a consultation about my project.",
    audit: "Hello, I would like the free store audit. Store URL: ",
    orderMsg: "Hello, I would like to order: ",
  },
  fr: {
    mkKicker: "Marchés du Golfe",
    mkTitle: "Des boutiques pour les marchands de tout le Golfe.",
    mkLead: "Des EAU à Oman : une boutique réglée sur votre devise, votre TVA et vos livraisons.",
    catKicker: "Catégories",
    catTitle: "Tout ce dont votre boutique a besoin, au même endroit.",
    catLead: "Choisissez un service pour voir détails et prix, ou commandez-le sur WhatsApp.",
    catView: "Voir le produit",
    catAsk: "Demander sur WhatsApp",
    catMsg: "Bonjour, je souhaite des informations sur : ",
    catPrev: "Précédent",
    catNext: "Suivant",
    eyebrow: "Agence digitale pour boutiques et marques",
    title: ["Des boutiques qui vendent,", "des marques qui restent"],
    intro: "Nous concevons des boutiques Salla et Zid et des identités de marque avec le soin du détail qui donne au client la confiance de commander.",
    primary: "Démarrer sur WhatsApp",
    secondary: "Voir les produits",
    builtOn: "Nous construisons sur",
    statement: "Plus de 300 projets pour des marques saoudiennes et du Golfe — avec contrat, facture et support après livraison.",
    statementSide: "Le chemin court : un prix affiché, un délai affiché, et un contact direct avec ceux qui réalisent.",
    servicesKicker: "Services",
    servicesTitle: "Quatre services. Chacun avec un périmètre, un prix et un délai clairs.",
    from: "Dès",
    perMonth: "/ mois",
    sar: "SAR",
    details: "Détails",
    order: "Commander",
    more: "Autres services",
    workKicker: "Réalisations",
    workTitle: "Des boutiques en ligne aujourd’hui.",
    workLead: "Chaque carte ouvre le site réel — la capture vient de la boutique elle-même.",
    visit: "Voir le site",
    proofKicker: "Pourquoi nous",
    proofTitle: "La confiance ne s’écrit pas. Elle se construit dans les détails.",
    proof: [
      ["300+", "Projets livrés"],
      ["< 1 h", "Délai de réponse moyen"],
      ["3", "Plateformes : Salla, Zid, Shopify"],
    ],
    pillars: [
      ["Contrat et facture", "Un périmètre écrit avant de commencer, une facture par paiement."],
      ["Paiement par étapes", "Vous ne payez jamais tout avant d’avoir vu le travail."],
      ["Support après livraison", "Nous restons après le lancement."],
    ],
    resultsTitle: "Chiffres de campagnes menées",
    processKicker: "Méthode",
    processTitle: "Trois étapes du premier message au lancement.",
    process: [
      ["01", "Échange", "Envoyez votre idée sur WhatsApp ; réponse avec périmètre, prix et délai en une heure."],
      ["02", "Réalisation", "Nous concevons et construisons, chaque étape validée avant le paiement suivant."],
      ["03", "Lancement", "Nous testons tout le parcours d’achat, livrons et restons pour le support."],
    ],
    auditKicker: "Sans engagement",
    auditTitle: "Un audit gratuit de votre boutique",
    auditBody: "Vitesse, parcours d’achat et SEO, avec des notes classées par impact — sous deux jours ouvrés.",
    auditCta: "Demander l’audit gratuit",
    faqKicker: "FAQ",
    faqTitle: "Des réponses claires avant de commencer.",
    hello: "Bonjour, je souhaite une consultation pour mon projet.",
    audit: "Bonjour, je souhaite l’audit gratuit. URL de la boutique : ",
    orderMsg: "Bonjour, je souhaite commander : ",
  },
} as const;

/* The four flagship services, each backed by a real product in the store
   so the price and the timeline shown here are the ones the order uses. */
const FLAGSHIP = [
  {
    slug: "salla-store-setup",
    title: { ar: "متجر سلة أو زد كامل", en: "A complete Salla or Zid store", fr: "Boutique Salla ou Zid complète" },
    points: {
      ar: ["تصميم يبدأ من الجوال", "دفع وشحن وتقسيط مفعّل", "اختبار شراء حقيقي قبل التسليم"],
      en: ["Mobile-first design", "Payments, shipping and BNPL live", "Tested with a real purchase"],
      fr: ["Design mobile d’abord", "Paiement, livraison, BNPL actifs", "Testé avec un vrai achat"],
    },
  },
  {
    slug: "salla-custom-theme",
    title: { ar: "ثيم مخصص لعلامتك", en: "A theme made for your brand", fr: "Un thème à votre image" },
    points: {
      ar: ["واجهة لا تشبه غيرك", "صفحات منتج تبيع", "سرعة تحميل عالية"],
      en: ["A storefront like no other", "Product pages that sell", "Fast loading"],
      fr: ["Une vitrine unique", "Des fiches qui vendent", "Chargement rapide"],
    },
  },
  {
    slug: "brand-identity-design",
    title: { ar: "هوية بصرية متكاملة", en: "A complete brand identity", fr: "Identité visuelle complète" },
    points: {
      ar: ["شعار وألوان وخطوط", "دليل استخدام الهوية", "تطبيقات السوشيال والتغليف"],
      en: ["Logo, colour and type", "Brand guidelines", "Social and packaging applications"],
      fr: ["Logo, couleurs, typographie", "Charte graphique", "Déclinaisons réseaux et emballage"],
    },
  },
  {
    slug: "digital-marketing",
    title: { ar: "تسويق وإدارة حملات", en: "Marketing and campaigns", fr: "Marketing et campagnes" },
    points: {
      ar: ["Google وMeta وSnapchat وTikTok", "تقارير أسبوعية واضحة", "تحسين مستمر حسب البيانات"],
      en: ["Google, Meta, Snapchat, TikTok", "Clear weekly reports", "Continuous, data-led tuning"],
      fr: ["Google, Meta, Snapchat, TikTok", "Rapports hebdomadaires", "Optimisation continue"],
    },
  },
] as const;

const SECONDARY = ["store-seo", "ai-product-photography", "landing-page-funnel", "custom-app-development", "automation-workflows", "social-media-management"];

const WORK = ["essence", "lelast", "haraer", "jilanoud", "tooz", "ivaraline"]
  .map((key) => PROJECTS.find((p) => p.key === key))
  .filter((p): p is (typeof PROJECTS)[number] => Boolean(p && p.shot));

/* Logos that are dark-on-transparent read cleanly as one ink silhouette;
   the light ones are listed with `logoOnDark` and are skipped here. */
const LOGOS = PROJECTS.filter(
  (p) => p.logo && !p.logoOnDark && p.key !== "khayala" /* opaque black plate */ && /\/clients\/.+\.(png|svg)$/.test(p.logo)
);

const RESULT_EN: [string, string][] = [
  ["reach from one awareness campaign", "UAE · 2.19 AED per 1,000"],
  ["conversations with new customers", "UAE · 5.18 AED each"],
  ["engagements on a single post", "$0.009 each"],
];

/* Western digits throughout, as Saudi banks and fintechs set prices. */
function fmt(n: number) {
  return n.toLocaleString("en-US");
}

function daysLabel(n: number, lang: Lang) {
  if (lang === "ar") return `${n} ${n >= 3 && n <= 10 ? "أيام" : "يومًا"}`;
  return `${n} ${lang === "fr" ? "jours" : "days"}`;
}

export default function HomeExperience({ locale: rawLocale }: { locale: string }) {
  const lang = (rawLocale in copy ? rawLocale : "en") as Lang;
  const t = copy[lang];
  const faq = HOME_FAQ[lang] ?? HOME_FAQ.en;
  const arrow = lang === "ar" ? "←" : "→";
  const whatsapp = getWhatsAppLink(t.hello);
  const name = (p: (typeof PRODUCTS)[number]) => (lang === "ar" ? p.nameAr : p.nameEn);

  return (
    <div className={styles.site}>
      {/* ═══ HERO — the banner is the background; its cream floor runs
          straight into the page, so there is no edge between them ═══ */}
      <section className={styles.hero} data-own-spacing>
        <picture className={styles.banner}>
          <source media="(max-width: 760px)" srcSet="/hero/hero-mobile.webp" width={1086} height={1448} />
          <img
            src="/hero/hero-desktop.webp"
            width={1672}
            height={941}
            alt={lang === "ar" ? "متجر إلكتروني بهوية سليمان على هاتف" : "A store built by AM Design on a phone"}
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        <div className={`${styles.shell} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span aria-hidden />
              {t.eyebrow}
            </p>
            <h1>
              {t.title[0]}
              <br />
              <em>{t.title[1]}</em>
            </h1>
            <p className={styles.lead}>{t.intro}</p>
            <div className={styles.heroActions}>
              <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-primary">
                <span className={styles.dot} aria-hidden />
                {t.primary}
              </a>
              <Link href={`/${lang}/store`} className="btn-secondary">
                {t.secondary}
              </Link>
            </div>
            <div className={styles.builtOn}>
              <span>{t.builtOn}</span>
              <Image src="/logos/salla.svg" alt="Salla" width={64} height={22} />
              <Image src="/logos/zid.svg" alt="Zid" width={48} height={22} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statementWrap} data-own-spacing>
        <div className={`${styles.shell} ${styles.statement}`}>
          <h2>{t.statement}</h2>
          <p>{t.statementSide}</p>
        </div>
      </section>

      {/* ═══ LOGOS ═══ */}
      <section className={styles.logos} aria-label={lang === "ar" ? "عملاؤنا" : "Clients"} data-own-spacing>
        <div className={styles.logoTrack}>
          {[...LOGOS, ...LOGOS].map((p, i) => (
            <span key={`${p.key}-${i}`} className={styles.logo} aria-hidden={i >= LOGOS.length || undefined}>
              <Image src={p.logo!} alt={i < LOGOS.length ? p.name : ""} width={140} height={56} />
            </span>
          ))}
        </div>
      </section>

      {/* ═══ CATEGORIES — the visual index; each opens its product or a
          WhatsApp conversation already naming the category ═══ */}
      <section id="categories" className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.headSplit} data-reveal>
            <div>
              <p className={styles.kicker}>{t.catKicker}</p>
              <h2>{t.catTitle}</h2>
            </div>
            <p>{t.catLead}</p>
          </div>
          <CategorySlider
            dir={lang === "ar" ? "rtl" : "ltr"}
            labels={{ prev: t.catPrev, next: t.catNext }}
            items={SERVICE_CATEGORIES.map((c) => {
              const title = c.title[lang];
              return {
                key: c.key,
                title,
                image: c.image,
                cta: `${c.product ? t.catView : t.catAsk} ${arrow}`,
                href: c.product ? `/${lang}/store/${c.product}` : getWhatsAppLink(`${t.catMsg}${title}`),
                external: !c.product,
              };
            })}
          />
        </div>
      </section>

      {/* ═══ PRINCIPLES — the verses the work answers to ═══ */}
      <Principles lang={lang} />

      {/* ═══ SERVICES ═══ */}
      <section id="services" className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.head} data-reveal>
            <p className={styles.kicker}>{t.servicesKicker}</p>
            <h2>{t.servicesTitle}</h2>
          </div>

          <div className={styles.services}>
            {FLAGSHIP.map((item, i) => {
              const product = PRODUCTS.find((p) => p.slug === item.slug)!;
              return (
                <article key={item.slug} className={styles.service} data-reveal data-reveal-delay={String(i * 60)}>
                  <div className={styles.serviceTop}>
                    <span className={styles.serviceNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.serviceDays}>
                      {product.isMonthly ? (lang === "ar" ? "اشتراك شهري" : lang === "fr" ? "Mensuel" : "Monthly") : daysLabel(product.deliveryDays, lang)}
                    </span>
                  </div>
                  <h3>{item.title[lang]}</h3>
                  <ul>
                    {item.points[lang].map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className={styles.servicePrice}>
                    <span>{t.from}</span>
                    <strong>
                      {fmt(product.price)} <small>{t.sar}</small>
                    </strong>
                    {product.isMonthly && <em>{t.perMonth}</em>}
                  </div>
                  <div className={styles.serviceActions}>
                    <a href={getWhatsAppLink(`${t.orderMsg}${name(product)}`)} target="_blank" rel="noreferrer" className={styles.serviceOrder}>
                      {t.order}
                    </a>
                    <Link href={`/${lang}/store/${product.slug}`} className={styles.serviceLink}>
                      {t.details} <span aria-hidden>{arrow}</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.secondary} data-reveal>
            <span>{t.more}</span>
            {SECONDARY.map((slug) => {
              const p = PRODUCTS.find((x) => x.slug === slug);
              if (!p) return null;
              return (
                <Link key={slug} href={`/${lang}/store/${slug}`}>
                  {name(p)}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ WORK ═══ */}
      <section id="work" className={`${styles.section} ${styles.work}`} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.headSplit} data-reveal>
            <div>
              <p className={styles.kicker}>{t.workKicker}</p>
              <h2>{t.workTitle}</h2>
            </div>
            <p>{t.workLead}</p>
          </div>
          <div className={styles.workGrid}>
            {WORK.map((p, i) => (
              <a key={p.key} href={p.url} target="_blank" rel="noreferrer" className={styles.workCard} data-reveal data-reveal-delay={String((i % 3) * 60)}>
                <div className={styles.workShot}>
                  <Image src={p.shot!} alt={p.name} width={1280} height={800} sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 400px" />
                </div>
                <div className={styles.workMeta}>
                  <div>
                    <b>{p.name}</b>
                    <span>{p.domain}</span>
                  </div>
                  <span className={styles.workVisit}>
                    {t.visit} <i aria-hidden>↗</i>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROOF — night section ═══ */}
      <section className={styles.night} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.headSplit} data-reveal>
            <div>
              <p className={styles.kicker}>{t.proofKicker}</p>
              <h2>{t.proofTitle}</h2>
            </div>
          </div>

          <div className={styles.stats}>
            {t.proof.map(([value, label]) => (
              <div key={label} data-reveal>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className={styles.pillars}>
            {t.pillars.map(([title, body], i) => (
              <article key={title} data-reveal data-reveal-delay={String(i * 60)}>
                <span className={styles.pillarIcon} aria-hidden>
                  {["◆", "◇", "✦"][i]}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>

          <div className={styles.results} data-reveal>
            <p>{t.resultsTitle}</p>
            <div>
              {RESULTS.slice(0, 3).map((r, i) => (
                <div key={r.value}>
                  <strong>{r.value}</strong>
                  <span>{lang === "ar" ? r.label : RESULT_EN[i][0]}</span>
                  <small>{lang === "ar" ? r.meta : RESULT_EN[i][1]}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GULF MARKETS — one landing page per country ═══ */}
      <section className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.headSplit} data-reveal>
            <div>
              <p className={styles.kicker}>{t.mkKicker}</p>
              <h2>{t.mkTitle}</h2>
            </div>
            <p>{t.mkLead}</p>
          </div>
          <div className={styles.markets}>
            {MARKETS.map((m, i) => (
              <Link key={m.slug} href={`/${lang}/markets/${m.slug}`} className={styles.market} data-reveal data-reveal-delay={String(i * 50)}>
                <span className={styles.marketCode}>{m.slug === "uae" ? "AE" : m.slug === "oman" ? "OM" : m.slug === "kuwait" ? "KW" : m.slug === "qatar" ? "QA" : "BH"}</span>
                <b>{m.name[lang === "ar" ? "ar" : "en"]}</b>
                <small>{m.cities[lang === "ar" ? "ar" : "en"].slice(0, 2).join(lang === "ar" ? " · " : " · ")}</small>
                <em>
                  {m.platforms.includes("zid") ? (lang === "ar" ? "سلة · زد" : "Salla · Zid") : lang === "ar" ? "سلة" : "Salla"}
                  <i aria-hidden>{arrow}</i>
                </em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section id="process" className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.head} data-reveal>
            <p className={styles.kicker}>{t.processKicker}</p>
            <h2>{t.processTitle}</h2>
          </div>
          <ol className={styles.steps}>
            {t.process.map(([num, title, body], i) => (
              <li key={num} data-reveal data-reveal-delay={String(i * 80)}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>

          <div className={styles.audit} data-reveal>
            <div>
              <p className={styles.kicker}>{t.auditKicker}</p>
              <h3>{t.auditTitle}</h3>
              <p>{t.auditBody}</p>
            </div>
            <a href={getWhatsAppLink(t.audit)} target="_blank" rel="noreferrer" className="btn-primary">
              {t.auditCta}
              <span aria-hidden>{arrow}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className={`${styles.section} ${styles.faq}`} data-own-spacing>
        <div className={`${styles.shell} ${styles.faqGrid}`}>
          <div data-reveal>
            <p className={styles.kicker}>{t.faqKicker}</p>
            <h2>{t.faqTitle}</h2>
          </div>
          <HomeFaq faq={faq} />
        </div>
      </section>
    </div>
  );
}
