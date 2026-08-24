"use client";

import PaymentLogos from "@/components/shared/PaymentLogos";
import { PageShell, PageHero, Section } from "@/components/layout/PageShell";

const SECTIONS = [
  {
    id: "privacy",
    titleAr: "سياسة الخصوصية",
    titleEn: "Privacy Policy",
    contentAr: [
      "نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية وفق أعلى المعايير.",
      "نجمع فقط البيانات الضرورية لتقديم خدماتنا: الاسم والبريد الإلكتروني ورقم الجوال.",
      "لن نشارك بياناتك مع أي طرف ثالث دون موافقتك الصريحة، إلا ما تقتضيه المتطلبات القانونية.",
      "نستخدم بروتوكولات تشفير SSL وأنظمة حماية متطورة لضمان أمان معلوماتك.",
      "يحق لك في أي وقت طلب حذف بياناتك أو تعديلها عبر التواصل معنا مباشرة.",
    ],
    contentEn: [
      "We respect your privacy and are committed to protecting your personal data to the highest standards.",
      "We collect only the data necessary to provide our services: name, email address, and phone number.",
      "We will not share your data with any third party without your explicit consent, except as required by law.",
      "We use SSL encryption protocols and advanced security systems to ensure the safety of your information.",
      "You may at any time request deletion or modification of your data by contacting us directly.",
    ],
  },
  {
    id: "payment",
    titleAr: "سياسة الدفع",
    titleEn: "Payment Policy",
    contentAr: [
      "نقبل جميع طرق الدفع الإلكترونية الرئيسية المدرجة أدناه — سواء بطاقات ائتمانية أو محافظ رقمية أو تحويل بنكي.",
      "يتم تأمين جميع معاملات الدفع عبر بروتوكولات تشفير SSL ومعالجة من قِبل مزودي خدمة مرخصين.",
      "يُطلب دفع دفعة أولى بنسبة 50% من إجمالي قيمة المشروع عند الاتفاق، والمبلغ المتبقي عند التسليم.",
      "للمشاريع الكبيرة (أكثر من 10,000 ر.س) يمكن الاتفاق على جدول دفعات مخصص.",
      "جميع الأسعار المذكورة شاملة لضريبة القيمة المضافة 15% وفق الأنظمة السعودية.",
    ],
    contentEn: [
      "We accept all major electronic payment methods listed below — credit cards, digital wallets, or bank transfers.",
      "All payment transactions are secured via SSL encryption and processed by licensed service providers.",
      "A 50% deposit of the total project value is required upon agreement; the remaining balance is due upon delivery.",
      "For large projects (over SAR 10,000), a custom payment schedule can be arranged.",
      "All listed prices include 15% VAT in accordance with Saudi regulations.",
    ],
  },
  {
    id: "returns",
    titleAr: "سياسة الاسترجاع والضمان",
    titleEn: "Return & Guarantee Policy",
    contentAr: [
      "نضمن رضاك التام — إذا لم تكن راضياً عن النتيجة بعد مراجعتين مجانيتين، نُعيد دراسة المشروع معك من البداية.",
      "في حال إلغاء المشروع قبل بدء التنفيذ: يُسترد 100% من الدفعة المقدّمة.",
      "في حال إلغاء المشروع بعد بدء التصميم ولكن قبل التنفيذ التقني: يُسترد 50% من الدفعة المقدّمة.",
      "بعد اكتمال التسليم والموافقة عليه من العميل: لا يُقبل الاسترجاع.",
      "جميع مشاريع المتاجر تأتي مع ضمان تقني مجاني لمدة 30 يوماً بعد الإطلاق يشمل إصلاح أي أخطاء برمجية.",
      "طلبات الاسترجاع يجب تقديمها كتابياً عبر البريد الإلكتروني أو واتساب خلال 7 أيام من تاريخ التسليم.",
    ],
    contentEn: [
      "We guarantee your satisfaction — if you are not satisfied after two free revisions, we'll re-examine the project with you from the start.",
      "If the project is cancelled before development begins: 100% of the deposit is refunded.",
      "If the project is cancelled after design but before technical development: 50% of the deposit is refunded.",
      "After final delivery and client approval: no refunds are accepted.",
      "All store projects include a free 30-day technical warranty after launch covering any coding errors.",
      "Refund requests must be submitted in writing via email or WhatsApp within 7 days of delivery.",
    ],
  },
];

export default function PolicyClient({ locale }: { locale: string }) {
  const isRTL = locale === "ar";

  /* Rebuilt on the shared page shell. This used to open on a near-black hero
     with emoji section icons and rounded translucent cards — a different
     product from every other page, and too informal for a legal document. */
  const t = {
    home: isRTL ? "الرئيسية" : locale === "fr" ? "Accueil" : "Home",
    kicker: isRTL ? "الشروط والسياسات" : locale === "fr" ? "Conditions" : "Terms & policies",
    title: isRTL
      ? "سياسة الخصوصية والدفع والاسترجاع"
      : locale === "fr"
        ? "Confidentialité, paiement et retours"
        : "Privacy, Payment & Return Policy",
    lead: isRTL
      ? "نلتزم بالشفافية الكاملة. هذه الصفحة تشرح كيف نتعامل مع بياناتك، وكيف تُدفع المشاريع، ومتى يحق لك الاسترجاع."
      : locale === "fr"
        ? "Transparence totale : cette page explique le traitement de vos données, les modalités de paiement et vos droits au remboursement."
        : "We are committed to full transparency. This page covers how we handle your data, how projects are paid for, and when a refund applies.",
    updated: isRTL
      ? "آخر تحديث: فبراير 2026"
      : locale === "fr"
        ? "Mis à jour : février 2026"
        : "Last updated: February 2026",
    toc: isRTL ? "محتويات الصفحة" : locale === "fr" ? "Sommaire" : "On this page",
    ctaTitle: isRTL
      ? "هل لديك استفسار حول سياساتنا؟"
      : locale === "fr"
        ? "Une question sur nos conditions ?"
        : "Questions about our policies?",
    ctaBody: isRTL
      ? "تواصل معنا مباشرة عبر واتساب وسنرد خلال ساعة."
      : locale === "fr"
        ? "Écrivez-nous sur WhatsApp, nous répondons en moins d’une heure."
        : "Contact us directly on WhatsApp and we’ll reply within an hour.",
    ctaAction: isRTL
      ? "تواصل عبر واتساب"
      : locale === "fr"
        ? "Écrire sur WhatsApp"
        : "Contact via WhatsApp",
  };

  return (
    <PageShell>
      <div>
        <PageHero
          kicker={t.kicker}
          title={t.title}
          lead={t.lead}
          crumbs={[{ label: t.home, href: `/${locale}` }, { label: t.kicker }]}
          crumbsLabel={t.kicker}
          aside={
            <span
              style={{
                alignSelf: "start",
                fontFamily: "Space Mono, monospace",
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "#8d8a82",
                borderTop: "2px solid #f0b100",
                paddingTop: "12px",
              }}
            >
              {t.updated}
            </span>
          }
        />

        <Section tone="paper">
          <div className="policy-layout">
            <nav className="policy-toc" aria-label={t.toc}>
              <p className="policy-toc-title">{t.toc}</p>
              <ol>
                {SECTIONS.map((section, i) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>
                      <span aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                      {isRTL ? section.titleAr : section.titleEn}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="policy-body">
              {SECTIONS.map((section, i) => (
                <article key={section.id} id={section.id} className="policy-section">
                  <span className="policy-index">{String(i + 1).padStart(2, "0")}</span>
                  <h2>{isRTL ? section.titleAr : section.titleEn}</h2>
                  <ul>
                    {(isRTL ? section.contentAr : section.contentEn).map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}

              <div className="policy-payments">
                <PaymentLogos variant="section" showTitle={true} />
              </div>

              <aside className="policy-cta">
                <div>
                  <h3>{t.ctaTitle}</h3>
                  <p>{t.ctaBody}</p>
                </div>
                <a href="https://wa.me/201007835547" target="_blank" rel="noopener noreferrer">
                  {t.ctaAction}
                  <span aria-hidden>{isRTL ? "←" : "→"}</span>
                </a>
              </aside>
            </div>
          </div>
        </Section>
      </div>

      <style>{`
        .policy-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 64px;
          align-items: start;
        }
        .policy-toc { position: sticky; top: 130px; }
        .policy-toc-title {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8b6900;
          margin: 0 0 16px;
        }
        .policy-toc ol {
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid #e6e2d8;
        }
        .policy-toc li { border-bottom: 1px solid #e6e2d8; }
        .policy-toc a {
          display: flex;
          gap: 12px;
          padding: 14px 0;
          font-size: 15px;
          color: #56534b;
          text-decoration: none;
          transition: color .2s;
        }
        .policy-toc a span {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #a9a498;
        }
        .policy-toc a:hover { color: #14140f; }

        .policy-body {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: #e6e2d8;
          border: 1px solid #e6e2d8;
        }
        .policy-section { background: #fff; padding: 40px 42px; scroll-margin-top: 130px; }
        .policy-index {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.16em;
          color: #8b6900;
        }
        .policy-section h2 {
          font-family: var(--font-arabic-display);
          font-size: clamp(22px, 2.6vw, 30px);
          letter-spacing: -0.02em;
          color: #14140f;
          margin: 14px 0 0;
          padding-bottom: 22px;
          border-bottom: 2px solid #f0b100;
          display: inline-block;
        }
        .policy-section ul {
          list-style: none;
          padding: 0;
          margin: 26px 0 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .policy-section li {
          display: grid;
          grid-template-columns: 14px 1fr;
          gap: 14px;
          font-size: 15.5px;
          line-height: 1.9;
          color: #56534b;
        }
        .policy-section li::before {
          content: "";
          width: 6px;
          height: 6px;
          margin-top: 11px;
          background: #f0b100;
          transform: rotate(45deg);
        }
        .policy-payments { background: #fff; padding: 40px 42px; }
        .policy-cta {
          background: #14140f;
          padding: 36px 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .policy-cta h3 {
          font-family: var(--font-arabic-display);
          font-size: 22px;
          color: #fff;
          margin: 0 0 8px;
          letter-spacing: -0.02em;
        }
        .policy-cta p { color: #a9a59b; font-size: 15px; margin: 0; }
        .policy-cta a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 50px;
          padding-inline: 26px;
          background: #f0b100;
          color: #14140f;
          font-weight: 800;
          text-decoration: none;
          white-space: nowrap;
        }
        @media (max-width: 1000px) {
          .policy-layout { grid-template-columns: 1fr; gap: 36px; }
          .policy-toc { position: static; }
        }
        @media (max-width: 640px) {
          .policy-section, .policy-payments, .policy-cta { padding: 28px 22px; }
        }
      `}</style>
    </PageShell>
  );
}
