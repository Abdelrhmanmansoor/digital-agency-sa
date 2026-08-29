/* Server component. It was a client component solely because it called
   `useLocale()` — no state, no effects, no event handlers anywhere in the
   file. The locale is passed down from the homepage instead, so none of this
   markup or its three locales of copy reach the browser as JavaScript. */

import styles from "./PlatformChooser.module.css";

/* Comparison content is grounded in how the three platforms actually differ
   for a Saudi merchant — native mada and ZATCA support through the Salla and
   Zid app stores versus third-party setup on Shopify, native Arabic RTL
   versus development work, Zid's stronger multi-warehouse inventory tooling,
   Shopify's multi-currency reach. No pricing figures are quoted: platform
   subscriptions are set by the platforms, change often, and are billed
   separately from our fee — which is what the closing note says instead. */

type Row = readonly [criterion: string, salla: string, zid: string, shopify: string];

type Copy = {
  kicker: string;
  title: string;
  lead: string;
  fitLabel: string;
  missLabel: string;
  answers: readonly { name: string; latin: string; fit: string; miss: string }[];
  caption: string;
  criterion: string;
  rows: readonly Row[];
  note: string;
};

const copy: Record<"ar" | "en" | "fr", Copy> = {
  ar: {
    kicker: "قبل أن تبدأ",
    title: "أي منصة تناسب متجرك فعلًا؟",
    lead: "أكثر سؤال يصلنا. الإجابة تعتمد على حجم الكتالوج وطريقة الشحن وأين يوجد عملاؤك — لا على أي منصة نجيدها أكثر. هذه مقارنة صريحة، بما فيها متى تكون المنصة خيارًا خاطئًا.",
    fitLabel: "مناسبة إذا",
    missLabel: "ليست الخيار إذا",
    answers: [
      {
        name: "سلة",
        latin: "Salla",
        fit: "تنطلق لأول مرة أو تريد متجرًا يعمل خلال أيام، وعملاؤك داخل السعودية.",
        miss: "تدير آلاف الأصناف عبر مستودعات متعددة، أو تبيع بعملات مختلفة.",
      },
      {
        name: "زد",
        latin: "Zid",
        fit: "علامة قائمة بعمليات أثقل: فروع ومستودعات متعددة وكتالوج كبير وفريق تشغيل.",
        miss: "متجر صغير بمنتجات محدودة — ستدفع مقابل تعقيد لن تستخدمه.",
      },
      {
        name: "شوبيفاي",
        latin: "Shopify",
        fit: "تبيع خارج السعودية أو بعملات ولغات متعددة وتحتاج منظومة تطبيقات واسعة.",
        miss: "كل عملائك سعوديون وتريد مدى والفوترة الإلكترونية جاهزة دون عمل إضافي.",
      },
    ],
    caption: "مقارنة تفصيلية",
    criterion: "المعيار",
    rows: [
      ["الأنسب لـ", "الانطلاق السريع داخل السعودية", "العلامات القائمة ذات العمليات المعقدة", "البيع خارج الحدود"],
      ["مدى وأبل باي", "متاح عبر متجر تطبيقات المنصة", "متاح عبر متجر تطبيقات المنصة", "يحتاج بوابة طرف ثالث"],
      ["تابي وتمارا وخدمات التقسيط", "متاحة (تشمل إمكان ومدفوع وميسباي)", "متاحة", "إعداد طرف ثالث"],
      ["الفوترة الإلكترونية (ZATCA المرحلة الثانية)", "عبر تطبيق مخصص", "عبر تطبيق مخصص", "تطبيق طرف ثالث"],
      ["العربية والاتجاه من اليمين", "أصلية في تصميم المنصة", "أصلية في تصميم المنصة", "تحتاج عمل تطويري"],
      ["شركات الشحن المحلية", "عبر متجر التطبيقات", "عبر متجر التطبيقات", "تطبيقات طرف ثالث"],
      ["المخزون والمستودعات المتعددة", "يغطي الاحتياج المعتاد", "الأقوى بين الثلاثة", "قوي مع تطبيقات إضافية"],
      ["تعدد العملات واللغات", "محدود", "محدود", "الأقوى بين الثلاثة"],
      ["حرية تخصيص الواجهة", "ثيم مخصص بالكامل", "ثيم مخصص بالكامل", "ثيم Liquid يُبنى من الصفر"],
    ],
    note: "اشتراك المنصة نفسها يُدفع لسلة أو زد أو شوبيفاي مباشرة، وهو منفصل تمامًا عن أتعابنا. لا نأخذ عمولة على اختيارك، ولو كان الأنسب لك منصة لا نفضّلها سنقولها لك.",
  },
  en: {
    kicker: "Before you start",
    title: "Which platform actually fits your store?",
    lead: "The question we get most. The answer depends on catalogue size, how you ship and where your customers are — not on which platform we happen to prefer. Here is the honest comparison, including when a platform is the wrong call.",
    fitLabel: "Right if",
    missLabel: "Not the call if",
    answers: [
      {
        name: "Salla",
        latin: "سلة",
        fit: "You are launching for the first time or want a store live in days, and your customers are inside Saudi Arabia.",
        miss: "You run thousands of SKUs across several warehouses, or sell in multiple currencies.",
      },
      {
        name: "Zid",
        latin: "زد",
        fit: "An established brand with heavier operations: multiple branches and warehouses, a large catalogue, an ops team.",
        miss: "A small store with a handful of products — you would pay for complexity you never use.",
      },
      {
        name: "Shopify",
        latin: "شوبيفاي",
        fit: "You sell outside Saudi Arabia, or in several currencies and languages, and want a wide app ecosystem.",
        miss: "Every customer is Saudi and you want mada and e-invoicing working without extra build work.",
      },
    ],
    caption: "Detailed comparison",
    criterion: "Criterion",
    rows: [
      ["Best suited to", "Launching fast inside Saudi Arabia", "Established brands with complex operations", "Cross-border selling"],
      ["mada & Apple Pay", "Via the platform app store", "Via the platform app store", "Needs a third-party gateway"],
      ["Tabby, Tamara & BNPL", "Available (incl. Emkan, Madfu, MisPay)", "Available", "Third-party setup"],
      ["E-invoicing (ZATCA Phase 2)", "Via a dedicated app", "Via a dedicated app", "Third-party app"],
      ["Arabic and right-to-left", "Native to the platform", "Native to the platform", "Requires development work"],
      ["Local shipping carriers", "Via the app store", "Via the app store", "Third-party apps"],
      ["Inventory & multi-warehouse", "Covers the usual need", "Strongest of the three", "Strong with extra apps"],
      ["Multi-currency & multi-language", "Limited", "Limited", "Strongest of the three"],
      ["Storefront customization", "Fully custom theme", "Fully custom theme", "Liquid theme built from scratch"],
    ],
    note: "The platform subscription is paid to Salla, Zid or Shopify directly and is entirely separate from our fee. We take no commission on your choice, and if the right platform is one we would not have picked, we will say so.",
  },
  fr: {
    kicker: "Avant de commencer",
    title: "Quelle plateforme convient réellement à votre boutique ?",
    lead: "La question qui revient le plus. La réponse dépend de la taille du catalogue, de la logistique et de la localisation de vos clients — pas de nos préférences. Voici la comparaison honnête, y compris quand une plateforme est le mauvais choix.",
    fitLabel: "Pertinent si",
    missLabel: "À éviter si",
    answers: [
      {
        name: "Salla",
        latin: "سلة",
        fit: "Vous lancez une première boutique en quelques jours et vos clients sont en Arabie saoudite.",
        miss: "Vous gérez des milliers de références sur plusieurs entrepôts, ou vendez en plusieurs devises.",
      },
      {
        name: "Zid",
        latin: "زد",
        fit: "Marque établie avec des opérations lourdes : plusieurs entrepôts, grand catalogue, équipe dédiée.",
        miss: "Petite boutique avec peu de produits — vous paieriez une complexité inutile.",
      },
      {
        name: "Shopify",
        latin: "شوبيفاي",
        fit: "Vous vendez à l’international, en plusieurs devises et langues, avec un large écosystème d’applications.",
        miss: "Tous vos clients sont saoudiens et vous voulez mada et la facturation électronique sans développement.",
      },
    ],
    caption: "Comparaison détaillée",
    criterion: "Critère",
    rows: [
      ["Convient à", "Un lancement rapide en Arabie saoudite", "Marques établies aux opérations complexes", "La vente transfrontalière"],
      ["mada et Apple Pay", "Via la marketplace de la plateforme", "Via la marketplace de la plateforme", "Passerelle tierce requise"],
      ["Tabby, Tamara et paiement fractionné", "Disponibles (Emkan, Madfu, MisPay)", "Disponibles", "Configuration tierce"],
      ["Facturation électronique (ZATCA phase 2)", "Via une application dédiée", "Via une application dédiée", "Application tierce"],
      ["Arabe et sens droite-à-gauche", "Natif", "Natif", "Développement nécessaire"],
      ["Transporteurs locaux", "Via la marketplace", "Via la marketplace", "Applications tierces"],
      ["Stock et multi-entrepôts", "Couvre le besoin courant", "Le plus complet des trois", "Solide avec des applications"],
      ["Multidevise et multilingue", "Limité", "Limité", "Le plus complet des trois"],
      ["Personnalisation de la vitrine", "Thème entièrement sur mesure", "Thème entièrement sur mesure", "Thème Liquid construit de zéro"],
    ],
    note: "L’abonnement à la plateforme se paie directement à Salla, Zid ou Shopify et reste distinct de nos honoraires. Nous ne touchons aucune commission sur votre choix.",
  },
};

export default function PlatformChooser({ locale }: { locale: string }) {
  const t = copy[locale as keyof typeof copy] ?? copy.en;

  return (
    <section id="choose" className={styles.section} data-own-spacing>
      <div className={styles.shell}>
        <div className={styles.head}>
          <div>
            <p className={styles.kicker}>{t.kicker}</p>
            <h2>{t.title}</h2>
          </div>
          <p>{t.lead}</p>
        </div>

        <div className={styles.answers}>
          {t.answers.map((a) => (
            <div key={a.name} className={styles.answer}>
              <h3 className={styles.answerName}>{a.name}</h3>
              <span className={styles.answerLatin}>{a.latin}</span>
              <p className={styles.answerFit}>
                <span>
                  <span className={styles.answerLabel}>{t.fitLabel}</span>
                  {a.fit}
                </span>
              </p>
              <p className={styles.answerMiss}>
                <span>
                  <span className={styles.answerLabel}>{t.missLabel}</span>
                  {a.miss}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption>{t.caption}</caption>
            <thead>
              <tr>
                <th scope="col">{t.criterion}</th>
                <th scope="col">{t.answers[0].name}</th>
                <th scope="col">{t.answers[1].name}</th>
                <th scope="col">{t.answers[2].name}</th>
              </tr>
            </thead>
            <tbody>
              {t.rows.map(([criterion, salla, zid, shopify]) => (
                <tr key={criterion}>
                  <th scope="row" className={styles.rowLabel}>
                    {criterion}
                  </th>
                  <td>{salla}</td>
                  <td>{zid}</td>
                  <td>{shopify}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.note}>
          <p>{t.note}</p>
        </div>
      </div>
    </section>
  );
}
