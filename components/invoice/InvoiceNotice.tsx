import Image from "next/image";
import styles from "./invoice.module.css";

/* إشعار رسمي بإصدار فاتورة — صفحة مستقلة بلا هيدر/فوتر الموقع، على نهج
   صفحة العرض التجاري: مستند واحد يُقرأ من أعلى إلى أسفل بلا تشتيت.
   الملف الفعلي للفاتورة في /public/invoice، فيُخدم مباشرة من نفس النطاق. */

const PDF = "/invoice/invoice-salla-design.pdf";

const TRANSFER = [
  { label: "اسم المستفيد", value: "ABDELRHMAN MANSOUR ALI SOLIMAN", ltr: true },
  { label: "الدولة", value: "EGYPT", ltr: true },
  { label: "عملة التحويل", value: "USD — الدولار الأمريكي", ltr: false },
];

export default function InvoiceNotice() {
  return (
    <div className={styles.page}>
      <header className={styles.masthead}>
        {/* الشعار كما هو دون أي تعديل — أبيض على الشريط الأسود */}
        <Image
          src="/logo.png"
          alt="AM Design"
          width={380}
          height={136}
          priority
          sizes="190px"
          className={styles.logo}
        />
      </header>

      <div className={styles.wrap}>
        <section className={styles.intro}>
          <div className={styles.check} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12.5 9.5 18 20 6.5" />
            </svg>
          </div>
          <h1 className={styles.title}>تم إصدار فاتورة خدمات بنجاح</h1>
          <p className={styles.lede}>إشعار رسمي خاص بخدمات تصميم متجر إلكتروني عبر منصة سلة.</p>

          <div className={styles.partner}>
            <span className={styles.partnerLabel}>مُقدَّم إلى</span>
            {/* الملف مقصوص في المستودع إلى حدود العلامة (607×495)، وذهبي
                على خلفية شفافة فيستقر كما هو على ورق الصفحة الفاتح. */}
            <Image
              src="/invoice/hibisca-logo.png"
              alt="HIBISCA — The Power of Beauty"
              width={607}
              height={495}
              sizes="140px"
              className={styles.partnerLogo}
            />
          </div>
        </section>

        <section className={styles.card}>
          <p className={styles.cardLabel}>إجمالي قيمة الفاتورة</p>
          <p className={styles.amount}>
            <span className={styles.amountNum}>300</span>
            <span className={styles.amountUnit}>ريال سعودي</span>
          </p>

          <div className={styles.hair} aria-hidden />

          <p className={styles.vat}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <circle cx="12" cy="12" r="9.2" />
              <path d="M12 11v5.4M12 7.6h.01" />
            </svg>
            <span>هذه الخدمة لا تخضع لضريبة القيمة المضافة</span>
          </p>

          {/* الملف يُفتح في تبويب جديد، و download يمنح المتصفح اسمًا واضحًا
              عند الحفظ بدل الاسم الطويل في المسار. */}
          <a className={styles.cta} href={PDF} target="_blank" rel="noopener noreferrer" download>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3.5v11.5m0 0 4.2-4.2M12 15l-4.2-4.2" />
              <path d="M4.5 17.5v1.2a1.8 1.8 0 0 0 1.8 1.8h11.4a1.8 1.8 0 0 0 1.8-1.8v-1.2" />
            </svg>
            <span>تحميل الفاتورة الرسمية</span>
          </a>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>طريقة الدفع والتحويل</h2>
          </div>

          <div className={styles.methods}>
            <div className={styles.method}>
              {/* الملفان مقصوصان في المستودع إلى حدود العلامة، فيُعرضان
                  بمقاسهما مباشرة. img عادي: مقاس ثابت صغير لا يستفيد من
                  مُحسِّن الصور. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={`${styles.methodLogo} ${styles.logoWu}`} src="/invoice/western-union.png" alt="Western Union" width={738} height={95} loading="lazy" decoding="async" />
            </div>

            <div className={styles.method}>
              {/* لا يوجد ملف شعار مرفق لمحفظة برق، فتُكتب بحروف الموقع */}
              <span className={styles.barq}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M13.6 2 5 13.4h5.2L9.4 22 19 10.2h-5.6L13.6 2Z" />
                </svg>
                محفظة برق
              </span>
            </div>

            <div className={styles.method}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={`${styles.methodLogo} ${styles.logoStc}`} src="/invoice/stc-pay.png" alt="stc pay" width={712} height={218} loading="lazy" decoding="async" />
            </div>
          </div>

          <dl className={styles.details}>
            {TRANSFER.map((row) => (
              <div className={styles.row} key={row.label}>
                <dt className={styles.rowLabel}>{row.label}</dt>
                <dd className={`${styles.rowValue}${row.ltr ? ` ${styles.ltr}` : ""}`}>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className={styles.thanks}>
          <svg className={styles.heart} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 20.7 4.3 13a4.9 4.9 0 0 1 0-6.9 4.7 4.7 0 0 1 6.8 0l.9.9.9-.9a4.7 4.7 0 0 1 6.8 0 4.9 4.9 0 0 1 0 6.9l-7.7 7.7Z" />
          </svg>
          <span>شكراً لتعاملكم معنا</span>
        </p>

        <footer className={styles.footer}>
          <p>يرجى الاحتفاظ بإثبات التحويل حتى تأكيد استلام الدفعة.</p>
        </footer>
      </div>
    </div>
  );
}
