import Image from "next/image";
import Link from "next/link";
import { MARKETS, type Market } from "@/lib/markets";
import { PRODUCTS } from "@/lib/store-data";
import { PROJECTS } from "@/components/proposal/data";
import { getWhatsAppLink } from "@/lib/utils";
import { formatPrice } from "@/components/store/product-copy";
import styles from "./MarketLanding.module.css";

/* One landing page per Gulf market. Built for a merchant who searched
   "تصميم متجر سلة في الإمارات" and needs three answers fast: can it be done
   in my country, what exactly do I get, and what does it cost. Every section
   ends one tap away from a WhatsApp message that already names the country. */

type Lang = "ar" | "en";

const copy = {
  ar: {
    crumbs: "الرئيسية",
    markets: "أسواق الخليج",
    eyebrow: (m: Market) => `لتجار ${m.name.ar}`,
    title: (m: Market) => `تصميم متجر إلكتروني ${m.inName.ar} على سلة وزد`,
    titleSalla: (m: Market) => `تصميم متجر إلكتروني ${m.inName.ar} على منصة سلة`,
    lead: "نبني متجرك كاملًا عن بُعد — التصميم، المنتجات، الدفع، الشحن، والضريبة — ونسلّمه جاهزًا لأول طلب.",
    cta: "ابدأ على واتساب",
    ctaPrices: "شاهد الباقات والأسعار",
    hello: (m: Market) => `مرحبًا، أنا تاجر ${m.inName.ar} وأريد متجرًا إلكترونيًا.`,
    facts: ["العملة", "المنصات", "الإطلاق", "الدفع"],
    from7: "من 7 أيام عمل",
    phased: "على مراحل",
    platformsKicker: "المنصة المناسبة",
    platformsTitle: (m: Market) => `سلة أم زد ${m.inName.ar}؟`,
    platformsLead: "نعمل على المنصتين يوميًا، ونرشّح لك الأنسب لحجم كتالوجك وطريقة بيعك — لا المنصة الأسهل علينا.",
    salla: {
      name: "سلة",
      line: "الأوسع انتشارًا في الخليج، مع متجر تطبيقات كبير وثيمات قابلة للتخصيص العميق.",
      points: ["متجر تطبيقات واسع للربط والتسويق", "ثيمات مخصصة بالكامل لعلامتك", "شحن داخلي وخليجي عبر شركاء المنصة"],
    },
    zid: {
      name: "زد",
      line: "منصة مرنة بأدوات تشغيل قوية، وخطة بداية مجانية تناسب الانطلاق السريع.",
      points: ["خطة بداية مجانية للانطلاق", "أدوات تشغيل ومخزون متقدمة", "ربط مع منصات بيع خارجية"],
    },
    notListed: "غير مدرجة في هذا السوق حاليًا",
    setupKicker: "ما نجهّزه لك",
    setupTitle: (m: Market) => `متجر مضبوط على سوق ${m.name.ar}، لا نسخة سعودية مترجمة.`,
    setup: (m: Market) => [
      ["العملة والأسعار", `الأسعار بـ${m.currency.ar} مع تنسيق الأرقام والضريبة.`],
      ["الضريبة والفواتير", m.vat.ar],
      ["الدفع", m.payments.ar],
      ["الشحن والتوصيل", m.shipping.ar],
      ["النطاق والهوية", `ربط نطاقك (${m.domain} أو .com) وتطبيق هويتك على كل صفحة.`],
      ["التتبّع والإعلانات", "بكسل Snapchat وTikTok وMeta، وGoogle Analytics 4 وSearch Console."],
      ["لغتان", "متجر عربي وإنجليزي لعملاء المقيمين والمواطنين معًا."],
      ["سياسات واضحة", "صفحات الاسترجاع والشحن والخصوصية بصياغة تبني الثقة."],
    ],
    citiesLabel: "نخدم التجار في",
    packagesKicker: "الباقات",
    packagesTitle: "ابدأ بالباقة التي تناسب مرحلتك.",
    from: "يبدأ من",
    sar: "ر.س",
    month: "/ شهريًا",
    order: "اطلب الآن",
    details: "التفاصيل",
    priceNote: "الأسعار بالريال السعودي، ونؤكد لك المقابل بعملتك قبل البدء.",
    workKicker: "من أعمالنا",
    workTitle: "متاجر خليجية تعمل الآن.",
    stepsKicker: "خطوات العمل",
    stepsTitle: "من رسالة واتساب إلى أول طلب.",
    steps: [
      ["01", "رسالة", "أخبرنا عن نشاطك ومنتجاتك؛ نرد بنطاق وسعر ومدة خلال ساعة."],
      ["02", "تصميم وبناء", "نصمم ونبني ونرسل كل مرحلة لمراجعتك قبل الدفعة التالية."],
      ["03", "إطلاق", "نختبر الشراء الكامل، نسلّم، وندرّبك على إدارة المتجر."],
    ],
    faqKicker: "أسئلة شائعة",
    faqTitle: (m: Market) => `أسئلة تجار ${m.name.ar}`,
    otherMarkets: "أسواق أخرى نخدمها",
    finalTitle: (m: Market) => `جاهز لإطلاق متجرك ${m.inName.ar}؟`,
    finalBody: "أرسل لنا اسم نشاطك ورابط حسابك على إنستغرام إن وجد — ونعود إليك بخطة وسعر.",
  },
  en: {
    crumbs: "Home",
    markets: "Gulf markets",
    eyebrow: (m: Market) => `For merchants in ${m.name.en}`,
    title: (m: Market) => `Online store design ${m.inName.en} on Salla and Zid`,
    titleSalla: (m: Market) => `Online store design ${m.inName.en} on Salla`,
    lead: "We build your whole store remotely — design, products, payments, shipping and tax — and hand it over ready for its first order.",
    cta: "Start on WhatsApp",
    ctaPrices: "See packages and prices",
    hello: (m: Market) => `Hello, I am a merchant ${m.inName.en} and I would like an online store.`,
    facts: ["Currency", "Platforms", "Launch", "Payment"],
    from7: "From 7 working days",
    phased: "Phased",
    platformsKicker: "The right platform",
    platformsTitle: (m: Market) => `Salla or Zid ${m.inName.en}?`,
    platformsLead: "We work on both every day and recommend the one that fits your catalogue and how you sell — not the one easiest for us.",
    salla: {
      name: "Salla",
      line: "The most widely used in the Gulf, with a large app store and deeply customisable themes.",
      points: ["Large app store for integrations and marketing", "Fully custom themes for your brand", "Local and Gulf delivery through platform partners"],
    },
    zid: {
      name: "Zid",
      line: "A flexible platform with strong operations tools and a free starter plan for a fast start.",
      points: ["Free starter plan", "Advanced operations and inventory tools", "Connections to external marketplaces"],
    },
    notListed: "Not listed in this market at present",
    setupKicker: "What we set up",
    setupTitle: (m: Market) => `A store tuned to ${m.name.en}, not a translated Saudi copy.`,
    setup: (m: Market) => [
      ["Currency and prices", `Prices in ${m.currency.en}, with number formats and tax applied.`],
      ["Tax and invoices", m.vat.en],
      ["Payments", m.payments.en],
      ["Shipping", m.shipping.en],
      ["Domain and identity", `Your domain (${m.domain} or .com) connected and your identity on every page.`],
      ["Tracking and ads", "Snapchat, TikTok and Meta pixels; Google Analytics 4 and Search Console."],
      ["Two languages", "An Arabic and English store for residents and nationals alike."],
      ["Clear policies", "Returns, shipping and privacy pages written to build trust."],
    ],
    citiesLabel: "We serve merchants in",
    packagesKicker: "Packages",
    packagesTitle: "Start with the package that fits your stage.",
    from: "From",
    sar: "SAR",
    month: "/ month",
    order: "Order now",
    details: "Details",
    priceNote: "Prices are in SAR; we confirm the amount in your currency before we start.",
    workKicker: "Our work",
    workTitle: "Gulf stores running right now.",
    stepsKicker: "How it works",
    stepsTitle: "From a WhatsApp message to the first order.",
    steps: [
      ["01", "Message", "Tell us about your business; we reply with scope, price and timeline within the hour."],
      ["02", "Design and build", "We design and build, sending each stage for review before the next payment."],
      ["03", "Launch", "We test the full checkout, hand over, and train you to run the store."],
    ],
    faqKicker: "FAQ",
    faqTitle: (m: Market) => `Questions from merchants in ${m.name.en}`,
    otherMarkets: "Other markets we serve",
    finalTitle: (m: Market) => `Ready to launch your store ${m.inName.en}?`,
    finalBody: "Send us your business name and Instagram if you have one — we will come back with a plan and a price.",
  },
} as const;

const PACKAGES = ["salla-store-setup", "salla-custom-theme", "brand-identity-design", "digital-marketing"];
const WORK = ["lelast", "haraer", "jilanoud"];

export default function MarketLanding({ market: m, lang, locale }: { market: Market; lang: Lang; locale: string }) {
  const t = copy[lang];
  const wa = getWhatsAppLink(t.hello(m));
  const arrow = lang === "ar" ? "←" : "→";
  const onlySalla = !m.platforms.includes("zid");
  const work = WORK.map((k) => PROJECTS.find((p) => p.key === k)).filter((p): p is (typeof PROJECTS)[number] => Boolean(p?.shot));

  return (
    <div className={styles.page}>
      {/* ═══ HERO ═══ */}
      <section className={styles.hero} data-own-spacing>
        <picture className={styles.banner}>
          <source media="(max-width: 760px)" srcSet="/hero/hero-mobile.webp" width={1086} height={1448} />
          <img src="/hero/hero-desktop.webp" width={1672} height={941} alt="" fetchPriority="high" decoding="async" />
        </picture>
        <div className={`${styles.shell} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <nav className={styles.crumbs} aria-label="Breadcrumb">
              <Link href={`/${locale}`}>{t.crumbs}</Link>
              <span aria-hidden>/</span>
              <span>{t.markets}</span>
              <span aria-hidden>/</span>
              <span>{m.name[lang]}</span>
            </nav>
            <p className={styles.eyebrow}>
              <span aria-hidden />
              {t.eyebrow(m)}
            </p>
            <h1>{onlySalla ? t.titleSalla(m) : t.title(m)}</h1>
            <p className={styles.hook}>{m.hook[lang]}</p>
            <p className={styles.lead}>{t.lead}</p>
            <div className={styles.actions}>
              <a href={wa} target="_blank" rel="noreferrer" className="btn-primary">
                <span className={styles.dot} aria-hidden />
                {t.cta}
              </a>
              <a href="#packages" className="btn-secondary">
                {t.ctaPrices}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FACTS ═══ */}
      <section className={styles.factsWrap} data-own-spacing>
        <div className={`${styles.shell}`}>
          <dl className={styles.facts}>
            <div>
              <dt>{t.facts[0]}</dt>
              <dd>{m.currency[lang]}</dd>
            </div>
            <div>
              <dt>{t.facts[1]}</dt>
              <dd>{m.platforms.map((p) => (p === "salla" ? t.salla.name : t.zid.name)).join(lang === "ar" ? " و" : " & ")}</dd>
            </div>
            <div>
              <dt>{t.facts[2]}</dt>
              <dd>{t.from7}</dd>
            </div>
            <div>
              <dt>{t.facts[3]}</dt>
              <dd>{t.phased}</dd>
            </div>
          </dl>
          <p className={styles.cities}>
            <span>{t.citiesLabel}</span>
            {m.cities[lang].map((c) => (
              <b key={c}>{c}</b>
            ))}
          </p>
        </div>
      </section>

      {/* ═══ PLATFORMS ═══ */}
      <section className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.headSplit}>
            <div>
              <p className={styles.kicker}>{t.platformsKicker}</p>
              <h2>{t.platformsTitle(m)}</h2>
            </div>
            <p>{t.platformsLead}</p>
          </div>
          <div className={styles.platforms}>
            {(["salla", "zid"] as const).map((key) => {
              const p = t[key];
              const available = m.platforms.includes(key);
              return (
                <article key={key} className={styles.platform} data-off={!available || undefined}>
                  <div className={styles.platformTop}>
                    <Image src={`/logos/${key}.svg`} alt={p.name} width={88} height={30} />
                    {!available && <span>{t.notListed}</span>}
                  </div>
                  <p>{p.line}</p>
                  <ul>
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ SETUP ═══ */}
      <section className={`${styles.section} ${styles.night}`} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.head}>
            <p className={styles.kicker}>{t.setupKicker}</p>
            <h2>{t.setupTitle(m)}</h2>
          </div>
          <div className={styles.setup}>
            {t.setup(m).map(([title, body], i) => (
              <article key={title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PACKAGES ═══ */}
      <section id="packages" className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.head}>
            <p className={styles.kicker}>{t.packagesKicker}</p>
            <h2>{t.packagesTitle}</h2>
          </div>
          <div className={styles.packages}>
            {PACKAGES.map((slug) => {
              const p = PRODUCTS.find((x) => x.slug === slug);
              if (!p) return null;
              const name = lang === "ar" ? p.nameAr : p.nameEn;
              return (
                <article key={slug} className={styles.package}>
                  <h3>{name}</h3>
                  <p>{lang === "ar" ? p.shortDescAr : p.shortDescEn}</p>
                  <div className={styles.price}>
                    <span>{t.from}</span>
                    <strong>{formatPrice(p.price)}</strong>
                    <small>{t.sar}</small>
                    {p.isMonthly && <em>{t.month}</em>}
                  </div>
                  <div className={styles.packageActions}>
                    <a href={getWhatsAppLink(`${t.hello(m)} ${name}`)} target="_blank" rel="noreferrer">
                      {t.order}
                    </a>
                    <Link href={`/${locale}/store/${slug}`}>
                      {t.details} <span aria-hidden>{arrow}</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          <p className={styles.note}>{t.priceNote}</p>
        </div>
      </section>

      {/* ═══ WORK ═══ */}
      <section className={`${styles.section} ${styles.soft}`} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.head}>
            <p className={styles.kicker}>{t.workKicker}</p>
            <h2>{t.workTitle}</h2>
          </div>
          <div className={styles.work}>
            {work.map((p) => (
              <a key={p.key} href={p.url} target="_blank" rel="noreferrer" className={styles.workCard}>
                <div>
                  <Image src={p.shot!} alt={p.name} width={1280} height={800} sizes="(max-width: 800px) 92vw, 400px" />
                </div>
                <b>{p.name}</b>
                <span>{p.domain}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STEPS ═══ */}
      <section className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.head}>
            <p className={styles.kicker}>{t.stepsKicker}</p>
            <h2>{t.stepsTitle}</h2>
          </div>
          <ol className={styles.steps}>
            {t.steps.map(([n, title, body]) => (
              <li key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className={`${styles.section} ${styles.soft}`} data-own-spacing>
        <div className={`${styles.shell} ${styles.faqGrid}`}>
          <div>
            <p className={styles.kicker}>{t.faqKicker}</p>
            <h2>{t.faqTitle(m)}</h2>
          </div>
          <div className={styles.faq}>
            {m.faq[lang].map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL + OTHER MARKETS ═══ */}
      <section className={styles.section} data-own-spacing>
        <div className={styles.shell}>
          <div className={styles.final}>
            <div>
              <h2>{t.finalTitle(m)}</h2>
              <p>{t.finalBody}</p>
            </div>
            <a href={wa} target="_blank" rel="noreferrer" className="btn-gold">
              {t.cta}
            </a>
          </div>
          <nav className={styles.others} aria-label={t.otherMarkets}>
            <span>{t.otherMarkets}</span>
            {MARKETS.filter((x) => x.slug !== m.slug).map((x) => (
              <Link key={x.slug} href={`/${locale}/markets/${x.slug}`}>
                {x.name[lang]}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}
