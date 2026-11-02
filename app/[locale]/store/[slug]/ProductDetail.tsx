import Link from "next/link";
import { CATEGORIES, PRODUCTS, type Product } from "@/lib/store-data";
import { getWhatsAppLink } from "@/lib/utils";
import {
  daysLabel,
  formatPrice,
  orderMessage,
  productBody,
  productName,
  productShort,
  questionMessage,
  type Lang,
} from "@/components/store/product-copy";
import { ProductsGrid } from "@/components/store/ProductsCatalog";
import styles from "@/components/store/Products.module.css";

/* Server-rendered product page. The old one was a 26 KB client component
   built around an add-to-cart flow; every order now ends in a WhatsApp
   conversation, so the page only has to explain the product and hand over
   one well-written message. */

const copy = {
  ar: {
    home: "الرئيسية",
    products: "المنتجات",
    included: "ما الذي تستلمه",
    about: "عن المنتج",
    next: "ماذا يحدث بعد الطلب",
    steps: [
      ["الخطوة 1", "رسالة واتساب", "تُفتح المحادثة باسم المنتج وسعره، فنرد بتأكيد النطاق."],
      ["الخطوة 2", "دفعة أولى", "تبدأ بدفعة أولى فقط، والباقي على مراحل بعد مراجعتك."],
      ["الخطوة 3", "تسليم ودعم", "نسلّم في المدة المعلنة، ونبقى معك بعد التسليم."],
    ],
    price: "السعر",
    month: "شهريًا",
    sar: "ر.س",
    delivery: "مدة التنفيذ",
    monthly: "اشتراك شهري",
    payment: "الدفع",
    phased: "على مراحل",
    paperwork: "التوثيق",
    contract: "عقد وفاتورة",
    order: "اطلب عبر واتساب",
    ask: "اسأل قبل الطلب",
    note: "الرسالة مكتوبة مسبقًا باسم المنتج وسعره — نرد خلال أقل من ساعة في أوقات العمل.",
    related: "منتجات قريبة",
    from: "يبدأ من",
  },
  en: {
    home: "Home",
    products: "Products",
    included: "What you receive",
    about: "About this product",
    next: "What happens after you order",
    steps: [
      ["Step 1", "A WhatsApp message", "The chat opens with the product and price written in; we reply confirming scope."],
      ["Step 2", "A first payment", "You start with a first instalment only; the rest is phased after your review."],
      ["Step 3", "Delivery and support", "We deliver within the published timeline and stay on after handover."],
    ],
    price: "Price",
    month: "per month",
    sar: "SAR",
    delivery: "Timeline",
    monthly: "Monthly plan",
    payment: "Payment",
    phased: "Phased",
    paperwork: "Paperwork",
    contract: "Contract & invoice",
    order: "Order on WhatsApp",
    ask: "Ask before ordering",
    note: "The message is pre-written with the product and price — we reply within the hour during working hours.",
    related: "Related products",
    from: "From",
  },
  fr: {
    home: "Accueil",
    products: "Produits",
    included: "Ce que vous recevez",
    about: "À propos",
    next: "Après la commande",
    steps: [
      ["Étape 1", "Un message WhatsApp", "La conversation s’ouvre avec le produit et le prix ; nous confirmons le périmètre."],
      ["Étape 2", "Un premier paiement", "Un premier versement seulement, le reste par étapes après validation."],
      ["Étape 3", "Livraison et support", "Livraison dans le délai affiché, et support ensuite."],
    ],
    price: "Prix",
    month: "par mois",
    sar: "SAR",
    delivery: "Délai",
    monthly: "Abonnement mensuel",
    payment: "Paiement",
    phased: "Par étapes",
    paperwork: "Documents",
    contract: "Contrat et facture",
    order: "Commander sur WhatsApp",
    ask: "Poser une question",
    note: "Le message est pré-rempli avec le produit et le prix — réponse en moins d’une heure aux heures ouvrées.",
    related: "Produits proches",
    from: "Dès",
  },
} as const;

export default function ProductDetail({ product: p, lang }: { product: Product; lang: Lang }) {
  const t = copy[lang];
  const category = CATEGORIES.find((c) => c.key === p.category);
  const categoryLabel = category ? (lang === "ar" ? category.labelAr : category.labelEn) : "";
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id)
    .concat(PRODUCTS.filter((x) => x.category !== p.category && x.popular && x.id !== p.id))
    .slice(0, 3);
  const order = getWhatsAppLink(orderMessage(p, lang));
  const timeline = p.isMonthly ? t.monthly : daysLabel(p.deliveryDays, lang);

  return (
    <>
      <section className={styles.head} data-own-spacing>
        <div className={styles.shell}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href={`/${lang}`}>{t.home}</Link>
            <span aria-hidden>/</span>
            <Link href={`/${lang}/store`}>{t.products}</Link>
            <span aria-hidden>/</span>
            <span>{productName(p, lang)}</span>
          </nav>
          {categoryLabel && <p className={styles.kicker}>{categoryLabel}</p>}
          <h1 className={styles.title}>{productName(p, lang)}</h1>
          <p className={styles.lead}>{productShort(p, lang)}</p>
          <div className={styles.meta}>
            <span>
              {t.delivery}: {timeline}
            </span>
            <span>
              {t.payment}: {t.phased}
            </span>
            <span>{t.contract}</span>
          </div>
        </div>
      </section>

      <section className={styles.body} data-own-spacing>
        <div className={`${styles.shell} ${styles.layout}`}>
          <div>
            <div className={styles.block}>
              <h2>{t.included}</h2>
              <ul className={styles.features}>
                {p.features.map((f) => (
                  <li key={f.en}>{lang === "ar" ? f.ar : f.en}</li>
                ))}
              </ul>
            </div>

            <div className={styles.block}>
              <h2>{t.about}</h2>
              <p className={styles.desc}>{productBody(p, lang)}</p>
            </div>

            <div className={styles.block}>
              <h2>{t.next}</h2>
              <ol className={styles.next}>
                {t.steps.map(([step, title, body]) => (
                  <li key={step}>
                    <b>{step}</b>
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className={styles.aside}>
            <div className={styles.priceCard}>
              <p className={styles.priceLabel}>{t.from}</p>
              <div className={styles.priceValue}>
                <strong>{formatPrice(p.price)}</strong>
                <span>
                  {t.sar}
                  {p.isMonthly ? ` · ${t.month}` : ""}
                </span>
              </div>
              <dl className={styles.priceRows}>
                <div>
                  <dt>{t.delivery}</dt>
                  <dd>{timeline}</dd>
                </div>
                <div>
                  <dt>{t.payment}</dt>
                  <dd>{t.phased}</dd>
                </div>
                <div>
                  <dt>{t.paperwork}</dt>
                  <dd>{t.contract}</dd>
                </div>
              </dl>
              <div className={styles.priceCta}>
                <a href={order} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  {t.order}
                </a>
                <a href={getWhatsAppLink(questionMessage(p, lang))} target="_blank" rel="noopener noreferrer" className={styles.priceAsk}>
                  {t.ask}
                </a>
              </div>
              <p className={styles.priceNote}>{t.note}</p>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className={`${styles.shell} ${styles.related}`}>
            <h2>{t.related}</h2>
            <ProductsGrid products={related} lang={lang} />
          </div>
        )}
      </section>

      <div className={styles.dock} data-product-dock>
        <div>
          <small>{t.from}</small>
          <strong>
            {formatPrice(p.price)} {t.sar}
          </strong>
        </div>
        <a href={order} target="_blank" rel="noopener noreferrer" className="btn-primary">
          {t.order}
        </a>
      </div>
    </>
  );
}
