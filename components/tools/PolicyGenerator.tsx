"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

interface PolicyInputs {
  storeName: string;
  productType: string;
  returnDays: number;
  shippingCompany: string;
  country: string;
  phone: string;
  email: string;
}

type PolicyType = "return" | "shipping" | "privacy" | "terms";

export default function PolicyGenerator({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [inputs, setInputs] = useState<PolicyInputs>({
    storeName: "",
    productType: "",
    returnDays: 7,
    shippingCompany: "أرامكس",
    country: "المملكة العربية السعودية",
    phone: "",
    email: "",
  });
  const [activePolicy, setActivePolicy] = useState<PolicyType>("return");
  const [generated, setGenerated] = useState(false);
  const [copiedPolicy, setCopiedPolicy] = useState<PolicyType | null>(null);

  const generatePolicies = () => setGenerated(true);

  const getPolicyContent = (type: PolicyType): string => {
    const { storeName, productType, returnDays, shippingCompany, country, phone, email } = inputs;
    const store = storeName || "متجرنا";
    const products = productType || "المنتجات";
    const today = new Date().toLocaleDateString("ar-SA");

    if (type === "return") {
      return `سياسة الاسترجاع والاستبدال — ${store}
آخر تحديث: ${today}

نحن في ${store} نسعى دائماً لضمان رضاكم التام. نوفر لكم سياسة استرجاع واضحة وعادلة.

أولاً: شروط الاسترجاع
• يحق للعميل إرجاع ${products} خلال ${returnDays} أيام من تاريخ الاستلام
• يجب أن يكون المنتج في حالته الأصلية غير مستخدم وبتغليفه الأصلي
• يجب إرفاق فاتورة الشراء الأصلية
• لا يُقبل الاسترجاع في حال وجود علامات استخدام أو تلف من قِبل العميل

ثانياً: الاستثناءات
• المنتجات المخصصة أو المُصممة حسب الطلب
• المنتجات الغذائية والمواد القابلة للتلف
• منتجات العناية الشخصية بعد فتح التغليف
• المنتجات الرقمية والتراخيص البرمجية

ثالثاً: آلية الاسترجاع
1. تواصل معنا على ${phone} أو ${email}
2. أخبرنا بسبب الإرجاع ورقم طلبك
3. سنزودك بتعليمات شحن المنتج
4. سيتم رد المبلغ خلال 5-7 أيام عمل بعد استلام المنتج

رابعاً: الاستبدال
• يمكن استبدال المنتج بمنتج آخر من نفس القيمة أو أعلى مع دفع الفرق
• فترة الاستبدال ${returnDays} يوم من تاريخ الاستلام

للاستفسار: ${phone} | ${email}`;
    }

    if (type === "shipping") {
      return `سياسة الشحن والتوصيل — ${store}
آخر تحديث: ${today}

نتعاون مع ${shippingCompany} لتوصيل طلباتكم بأمان وسرعة.

أولاً: مناطق التوصيل
• ${country} — التوصيل متاح لجميع المدن والمناطق
• الشحن الدولي — متاح لعدد من الدول (راجعوا قائمة الدول عند الطلب)

ثانياً: مدد التوصيل
• الشحن العادي: 3-5 أيام عمل
• الشحن السريع: 1-2 يوم عمل
• المناطق النائية: 5-7 أيام عمل
ملاحظة: المدد المذكورة من تاريخ تأكيد الطلب وليس من تاريخ الشراء

ثالثاً: رسوم الشحن
• مجاني للطلبات التي تتجاوز 200 ر.س
• رسوم الشحن للطلبات الأقل: 25 ر.س
• الشحن السريع: 45 ر.س
• يتم عرض رسوم الشحن بوضوح عند إتمام الطلب

رابعاً: تتبع الطلب
• ستصلكم رسالة نصية برقم التتبع فور شحن طلبكم
• يمكن تتبع الطلب عبر موقع ${shippingCompany}
• للاستفسار: ${phone}

خامساً: الطرود التالفة
• في حال وصول الطلب تالفاً، التقطوا صوراً فورية واتصلوا بنا خلال 24 ساعة
• سنتولى إعادة الشحن أو رد المبلغ بالكامل

للاستفسار: ${phone} | ${email}`;
    }

    if (type === "privacy") {
      return `سياسة الخصوصية — ${store}
آخر تحديث: ${today}

نحن في ${store} نلتزم بحماية خصوصية عملائنا.

أولاً: المعلومات التي نجمعها
• الاسم وبيانات التواصل (الهاتف، البريد الإلكتروني)
• عنوان التوصيل
• بيانات الطلب وسجل المشتريات
• معلومات الجهاز والمتصفح (عبر ملفات تعريف الارتباط)
لا نجمع بيانات بطاقات الائتمان — جميع المدفوعات تتم عبر بوابات دفع آمنة ومرخصة

ثانياً: كيف نستخدم معلوماتكم
• معالجة وتوصيل الطلبات
• التواصل معكم بشأن طلباتكم
• إرسال العروض والتخفيضات (يمكن إلغاء الاشتراك في أي وقت)
• تحسين تجربة التسوق
• الامتثال للمتطلبات القانونية

ثالثاً: مشاركة المعلومات
• لا نبيع أو نؤجر بياناتكم لأطراف ثالثة
• نشارك البيانات الضرورية فقط مع شركات الشحن لإتمام التوصيل

رابعاً: حقوقكم
• حق الاطلاع على بياناتكم المحفوظة لدينا
• حق تصحيح أي معلومات غير دقيقة
• حق حذف بياناتكم (مع مراعاة المتطلبات القانونية)
• حق الاعتراض على معالجة البيانات

للاستفسار: ${phone} | ${email}`;
    }

    // terms
    return `الشروط والأحكام — ${store}
آخر تحديث: ${today}

بتسوقكم من ${store}، فإنكم توافقون على الشروط والأحكام التالية.

أولاً: قبول الشروط
• يُعتبر استخدامكم للموقع أو التطبيق موافقةً على هذه الشروط
• نحتفظ بحق تعديل هذه الشروط في أي وقت مع إشعار العملاء

ثانياً: حساب المستخدم
• أنتم مسؤولون عن الحفاظ على سرية معلومات حسابكم
• يجب أن تكون المعلومات المقدمة صحيحة ودقيقة
• نحتفظ بحق إغلاق الحسابات المخالفة

ثالثاً: الطلبات والمدفوعات
• جميع الأسعار بالريال السعودي وتشمل ضريبة القيمة المضافة 15%
• يُعتبر الطلب مؤكداً بعد اكتمال الدفع
• في حال عدم توفر المنتج، سيتم إشعاركم ورد المبلغ كاملاً

رابعاً: الملكية الفكرية
• جميع محتويات الموقع (صور، نصوص، تصاميم) محمية بحقوق الملكية الفكرية
• لا يُسمح بإعادة استخدام أي محتوى دون إذن خطي مسبق

خامساً: المسؤولية
• نسعى لضمان دقة المعلومات لكننا لا نضمن خلوها من الأخطاء
• لا نتحمل مسؤولية أي أضرار غير مباشرة ناتجة عن استخدام الموقع

للاستفسار: ${phone} | ${email}`;
  };

  const copyPolicy = (type: PolicyType) => {
    navigator.clipboard.writeText(getPolicyContent(type));
    setCopiedPolicy(type);
    setTimeout(() => setCopiedPolicy(null), 2000);
  };

  const POLICY_TYPES: { key: PolicyType; labelAr: string; labelEn: string; icon: string }[] = [
    { key: "return", labelAr: "سياسة الاسترجاع", labelEn: "Return Policy", icon: "↩️" },
    { key: "shipping", labelAr: "سياسة الشحن", labelEn: "Shipping Policy", icon: "🚚" },
    { key: "privacy", labelAr: "سياسة الخصوصية", labelEn: "Privacy Policy", icon: "🔒" },
    { key: "terms", labelAr: "الشروط والأحكام", labelEn: "Terms & Conditions", icon: "📜" },
  ];

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontFamily: "Space Mono, monospace",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#8C8C7A",
    marginBottom: "6px",
  };

  return (
    <div style={{ padding: "0 40px 40px" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#0A0A0A", marginBottom: "20px", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>
            {isRTL ? "بيانات المتجر" : "Store Information"}
          </h3>

          <div className="space-y-4 mb-6">
            {[
              { key: "storeName", labelAr: "اسم المتجر", labelEn: "Store Name", placeholder: isRTL ? "مثال: متجر الأناقة" : "e.g., Fashion Store" },
              { key: "productType", labelAr: "نوع المنتجات", labelEn: "Product Type", placeholder: isRTL ? "مثال: ملابس وأزياء" : "e.g., Clothing & Fashion" },
              { key: "shippingCompany", labelAr: "شركة الشحن", labelEn: "Shipping Company", placeholder: "أرامكس / SMSA / DHL" },
              { key: "phone", labelAr: "رقم الهاتف", labelEn: "Phone Number", placeholder: "+966 5x xxx xxxx" },
              { key: "email", labelAr: "البريد الإلكتروني", labelEn: "Email Address", placeholder: "info@store.com" },
            ].map((field) => (
              <div key={field.key}>
                <label style={labelStyle}>{isRTL ? field.labelAr : field.labelEn}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={inputs[field.key as keyof PolicyInputs] as string}
                  onChange={(e) => setInputs((p) => ({ ...p, [field.key]: e.target.value }))}
                  className="form-input"
                  style={{ background: "#FAFAF7", color: "#0A0A0A", border: "1px solid #E8E6E1" }}
                />
              </div>
            ))}

            <div>
              <label style={labelStyle}>
                {isRTL ? `مدة الاسترجاع: ${inputs.returnDays} أيام` : `Return Period: ${inputs.returnDays} days`}
              </label>
              <input
                type="range"
                min={3}
                max={30}
                value={inputs.returnDays}
                onChange={(e) => setInputs((p) => ({ ...p, returnDays: parseInt(e.target.value) }))}
                style={{ width: "100%", accentColor: "#F0B100" }}
              />
            </div>
          </div>

          <button onClick={generatePolicies} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            <span>📋 {isRTL ? "أنشئ السياسات" : "Generate Policies"}</span>
          </button>
        </div>

        {/* Generated Policies */}
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#0A0A0A", marginBottom: "20px", fontFamily: "'ThmanyahSans', 'Zain', sans-serif" }}>
            {isRTL ? "السياسات المُنشأة" : "Generated Policies"}
          </h3>

          {/* Policy Type Tabs */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "16px", flexWrap: "wrap" }}>
            {POLICY_TYPES.map((p) => (
              <button
                key={p.key}
                onClick={() => setActivePolicy(p.key)}
                style={{
                  padding: "8px 16px",
                  background: activePolicy === p.key ? "#F0B100" : "transparent",
                  border: "1px solid",
                  borderColor: activePolicy === p.key ? "#F0B100" : "#E8E6E1",
                  color: activePolicy === p.key ? "#0A0A0A" : "#8C8C7A",
                  fontSize: "12px",
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {p.icon} {isRTL ? p.labelAr : p.labelEn}
              </button>
            ))}
          </div>

          {generated ? (
            <div>
              <div
                style={{
                  background: "#FAFAF7",
                  border: "1px solid #E8E6E1",
                  padding: "20px",
                  maxHeight: "350px",
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  fontSize: "13px",
                  lineHeight: 1.8,
                  color: "#2D2D2D",
                  fontFamily: "'ThmanyahSans', 'Zain', sans-serif",
                  marginBottom: "12px",
                }}
              >
                {getPolicyContent(activePolicy)}
              </div>

              <button
                onClick={() => copyPolicy(activePolicy)}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: copiedPolicy === activePolicy ? "#4A8C6F" : "transparent",
                  border: "1px solid",
                  borderColor: copiedPolicy === activePolicy ? "#4A8C6F" : "#E8E6E1",
                  cursor: "pointer",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  color: copiedPolicy === activePolicy ? "#FFFFFF" : "#8C8C7A",
                  textTransform: "uppercase",
                  transition: "all 0.3s",
                }}
              >
                {copiedPolicy === activePolicy
                  ? (isRTL ? "✓ تم النسخ!" : "✓ Copied!")
                  : (isRTL ? "نسخ هذه السياسة" : "Copy This Policy")}
              </button>
            </div>
          ) : (
            <div style={{ padding: "60px 20px", textAlign: "center", border: "1px dashed #E8E6E1", color: "#8C8C7A" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
              <div style={{ fontFamily: "'ThmanyahSans', 'Zain', sans-serif", fontSize: "15px" }}>
                {isRTL ? "أدخل بيانات متجرك واضغط 'أنشئ السياسات'" : "Enter store details and press 'Generate Policies'"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
