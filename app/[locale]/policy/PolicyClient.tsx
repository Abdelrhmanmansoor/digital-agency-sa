"use client";

import PaymentLogos from "@/components/shared/PaymentLogos";

const SECTIONS = [
  {
    icon: "🔒",
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
    icon: "💳",
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
    icon: "🔄",
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

  return (
    <div
      style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        direction: isRTL ? "rtl" : "ltr",
        paddingTop: "120px",
        paddingBottom: "100px",
      }}
    >
      <div className="max-w-[1000px] mx-auto px-8">

        {/* Page Header */}
        <div style={{ marginBottom: "64px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(240,177,0,0.08)", border: "1px solid rgba(240,177,0,0.2)", borderRadius: "20px", padding: "6px 18px", marginBottom: "20px" }}>
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#F0B100" }}>
              {isRTL ? "الشروط والأحكام" : "Terms & Policies"}
            </span>
          </div>
          <h1 style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800, color: "#FAFAF7", lineHeight: 1.2, marginBottom: "16px" }}>
            {isRTL ? "سياسة الخصوصية والدفع والاسترجاع" : "Privacy, Payment & Return Policy"}
          </h1>
          <p style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.4)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.8 }}>
            {isRTL
              ? "نلتزم بالشفافية الكاملة — اقرأ سياساتنا وتعرّف على حقوقك وضماناتك معنا."
              : "We are committed to full transparency — read our policies and know your rights and guarantees with us."}
          </p>
          <div style={{ marginTop: "16px", fontFamily: "Space Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>
            {isRTL ? "آخر تحديث: فبراير 2026" : "Last updated: February 2026"}
          </div>
        </div>

        {/* TOC */}
        <nav style={{ background: "rgba(240,177,0,0.05)", border: "1px solid rgba(240,177,0,0.12)", borderRadius: "14px", padding: "20px 24px", marginBottom: "48px", display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px", color: "#F0B100", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
            >
              {s.icon} {isRTL ? s.titleAr : s.titleEn}
            </a>
          ))}
        </nav>

        {/* Sections */}
        {SECTIONS.map((section, i) => (
          <div
            key={section.id}
            id={section.id}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              padding: "36px 40px",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(240,177,0,0.1)", border: "1px solid rgba(240,177,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
                {section.icon}
              </div>
              <div>
                <div style={{ fontFamily: "Space Mono, monospace", fontSize: "9px", color: "rgba(240,177,0,0.6)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "4px" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, color: "#FAFAF7", margin: 0 }}>
                  {isRTL ? section.titleAr : section.titleEn}
                </h2>
              </div>
            </div>

            <div style={{ width: "40px", height: "2px", background: "#F0B100", marginBottom: "24px" }} />

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {(isRTL ? section.contentAr : section.contentEn).map((point, j) => (
                <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#F0B100" style={{ marginTop: "5px", flexShrink: 0 }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <p style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: 0 }}>
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Payment Methods Full Section */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            padding: "36px 40px",
            marginBottom: "40px",
          }}
        >
          <PaymentLogos variant="section" showTitle={true} />
        </div>

        {/* Contact CTA */}
        <div style={{ textAlign: "center", padding: "40px", background: "rgba(240,177,0,0.05)", border: "1px solid rgba(240,177,0,0.12)", borderRadius: "16px" }}>
          <h3 style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "22px", fontWeight: 800, color: "#FAFAF7", marginBottom: "12px" }}>
            {isRTL ? "هل لديك استفسار حول سياساتنا؟" : "Questions about our policies?"}
          </h3>
          <p style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.45)", marginBottom: "20px" }}>
            {isRTL ? "تواصل معنا مباشرة عبر واتساب وسنرد خلال ساعة." : "Contact us directly on WhatsApp and we'll reply within an hour."}
          </p>
          <a
            href="https://wa.me/201007835547"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", background: "#F0B100", color: "#0A0A0A", borderRadius: "10px", textDecoration: "none", fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px", fontWeight: 700 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M11.99 0C5.364 0 0 5.364 0 11.99c0 2.11.553 4.09 1.517 5.806L0 24l6.396-1.487A11.954 11.954 0 0011.99 24C18.616 24 24 18.636 24 12.01 24 5.385 18.616 0 11.99 0zm.01 21.818a9.848 9.848 0 01-4.998-1.362l-.36-.214-3.718.863.929-3.628-.234-.373A9.846 9.846 0 012.182 12c0-5.424 4.4-9.818 9.818-9.818 5.418 0 9.818 4.394 9.818 9.818 0 5.425-4.4 9.818-9.818 9.818z"/>
            </svg>
            {isRTL ? "تواصل عبر واتساب" : "Contact via WhatsApp"}
          </a>
        </div>

      </div>
    </div>
  );
}
