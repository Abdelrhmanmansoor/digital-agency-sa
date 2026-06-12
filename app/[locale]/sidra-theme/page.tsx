import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AGENCY_INFO, getWhatsAppLink } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const themeName = "ثيم سدرة";
const pageTitle = "توثيق ثيم سدرة | AM Design";
const pageDescription =
  "صفحة توثيق وبيع احترافية لثيم سدرة: شرح الأقسام، إعدادات التصميم، عناصر CSS، الحركة، التخصيص، وخطوات الاستخدام داخل سلة.";

const buyMessage =
  "أريد شراء ثيم سدرة الآن، وأحتاج تفاصيل التركيب والتخصيص.";
const contactMessage =
  "أريد التواصل بخصوص ثيم سدرة وتخصيصه لمتجري.";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/sidra-theme`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: path,
      siteName: AGENCY_INFO.name,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: themeName,
        },
      ],
    },
  };
}

const highlights = [
  "تصميم فاخر مخصص لمتاجر سلة",
  "أقسام قابلة للتعديل بدون كود",
  "توثيق CSS واضح لأي أداة ذكاء اصطناعي",
  "جاهز للجوال والتابلت والديسكتوب",
];

const sections = [
  {
    title: "الهيدر والتنقل",
    body: "شريط علوي متجاوب يدعم RTL/LTR، روابط المتجر، البحث، السلة، وأزرار الوصول السريع بدون ازدحام بصري.",
    tokens: ["sidra-header", "sidra-nav", "sidra-mobile-menu"],
  },
  {
    title: "البانر الرئيسي",
    body: "منطقة افتتاحية بصرية تعرض الهوية والعرض الرئيسي مع أزرار CTA، طبقات Gradient، وحركة صورة اختيارية.",
    tokens: ["sidra-hero", "sidra-hero__media", "sidra-hero__content"],
  },
  {
    title: "إعلان الصور التجاري",
    body: "قسم صور فاخر بفاصل عضوي SVG/Clip Path بدل الخط المستقيم، مع مكتبة فواصل وطبقات زجاجية اختيارية.",
    tokens: ["sidra-commercial", "sidra-divider", "sidra-glass-layer"],
  },
  {
    title: "شريط صور تلقائي",
    body: "ماركيه صور مستمر يعرض منتجات أو لقطات براند، مع حركة ناعمة لا تتوقف وتوافق كامل مع الجوال.",
    tokens: ["sidra-auto-image-marquee", "sidra-marquee-track", "sidra-marquee-item"],
  },
  {
    title: "بطاقات المنتجات",
    body: "بطاقات نظيفة تعرض الصورة، السعر، الحالة، التقييم، وزر الإضافة للسلة مع مساحات ثابتة تمنع الاهتزاز.",
    tokens: ["sidra-product-card", "sidra-price", "sidra-add-to-cart"],
  },
  {
    title: "الفوتر والثقة",
    body: "منطقة ختامية تجمع روابط السياسات، بيانات التواصل، طرق الدفع، وشارات الثقة بشكل منظم وسهل القراءة.",
    tokens: ["sidra-footer", "sidra-trust-badges", "sidra-payments"],
  },
];

const dividerStyles = [
  "Soft Curve",
  "Wave",
  "Deep Arc",
  "Luxury Curve",
  "Sadu Inspired",
  "Diagonal Curve",
  "Floating Shape",
  "Glass Curve",
  "Layered Curve",
  "Premium Editorial",
];

const gradientStyles = [
  "Dark Luxury",
  "Gold Glow",
  "Navy Premium",
  "Sadu Red",
  "Soft White",
  "Black Fade",
  "Transparent Fade",
  "Custom",
];

const motionStyles = [
  "No Motion",
  "Zoom In",
  "Zoom Out",
  "Parallax",
  "Floating",
  "Slow Pan",
  "Ken Burns",
];

const settings = [
  ["enable_curve_divider", "تشغيل الفاصل العضوي بين المحتوى والصورة"],
  ["divider_style", "اختيار شكل الفاصل، والافتراضي Luxury Curve"],
  ["divider_height", "ارتفاع الفاصل على الديسكتوب والجوال"],
  ["divider_color", "لون طبقة الفاصل أو لون امتداد البانر"],
  ["divider_overlap", "مقدار تداخل الفاصل مع الصورة لمنع أي فراغ"],
  ["enable_gradient", "تشغيل طبقة الجرادينت فوق الصورة"],
  ["gradient_style", "اختيار نمط الجرادينت الجاهز أو Custom"],
  ["gradient_color_1", "اللون الأول في الجرادينت"],
  ["gradient_color_2", "اللون الثاني في الجرادينت"],
  ["gradient_opacity", "درجة شفافية الجرادينت من 0 إلى 1"],
  ["enable_glass", "تشغيل طبقة الزجاج فوق الصورة أو المحتوى"],
  ["glass_color", "لون طبقة الزجاج"],
  ["glass_opacity", "شفافية طبقة الزجاج"],
  ["glass_blur", "قوة blur في backdrop-filter"],
  ["glass_border", "حد زجاجي ناعم حول المحتوى"],
  ["glass_shadow", "ظل فاخر للطبقة الزجاجية"],
  ["image_animation", "حركة الصورة: zoom, pan, floating, parallax"],
  ["content_position", "مكان النص داخل القسم: يمين، وسط، يسار، أعلى، أسفل"],
];

const cssMap = [
  [".sidra-theme", "جذر الثيم العام وتخزين متغيرات الألوان والمسافات."],
  [".sidra-container", "حاوية عرض داخلية تتحكم في عرض المحتوى على الشاشات الكبيرة."],
  [".sidra-header", "الهيدر الرئيسي: الخلفية، الالتصاق، الشفافية، وارتفاع الشريط."],
  [".sidra-nav", "قائمة التنقل وروابط الأقسام واتجاه RTL/LTR."],
  [".sidra-btn", "نمط الأزرار العام، ويعدل radius وpadding والانتقالات."],
  [".sidra-btn--primary", "زر الشراء أو الإجراء الأساسي بلون البراند."],
  [".sidra-btn--secondary", "زر ثانوي للتواصل أو معرفة المزيد."],
  [".sidra-hero", "قسم البطل الرئيسي، الخلفيات، ومحاذاة النص والصورة."],
  [".sidra-hero__badge", "الوسم الصغير أعلى العنوان."],
  [".sidra-hero__title", "العنوان الرئيسي وحجمه ووزنه واستجابته."],
  [".sidra-hero__subtitle", "العنوان الفرعي والوصف المختصر."],
  [".sidra-hero__media", "منطقة صورة البطل وحركتها وقصها."],
  [".sidra-commercial", "قسم إعلان الصور التجاري كاملًا."],
  [".sidra-commercial__head", "الجزء العلوي من الإعلان بدون border مستقيم."],
  [".sidra-commercial__divider", "SVG أو mask للفاصل العضوي بين البانر والصورة."],
  [".sidra-commercial__image", "صورة المنتج داخل الإعلان وإعدادات object-fit."],
  [".sidra-gradient-overlay", "طبقة الجرادينت فوق الصورة واتجاهها وشفافيتها."],
  [".sidra-glass-layer", "طبقة glassmorphism: blur, opacity, border, shadow."],
  [".sidra-auto-image-marquee", "قسم شريط الصور التلقائي المستمر."],
  [".sidra-marquee-track", "المسار المتحرك ويجب أن يحتوي نسختين من الصور للاستمرارية."],
  [".sidra-marquee-item", "عنصر الصورة الفردي داخل الشريط."],
  [".sidra-product-grid", "شبكة المنتجات وعدد الأعمدة حسب الشاشة."],
  [".sidra-product-card", "بطاقة المنتج: الصورة، النص، السعر، وزر السلة."],
  [".sidra-section-title", "عنوان الأقسام الداخلي."],
  [".sidra-section-subtitle", "وصف الأقسام الداخلي."],
  [".sidra-footer", "الفوتر وروابطه وبيانات التواصل."],
];

const aiInstructions = [
  "عند تعديل الألوان ابدأ من CSS variables داخل .sidra-theme قبل تعديل العناصر الفردية.",
  "لا تستخدم border-bottom أو hr بين عنوان إعلان الصور والصورة؛ استخدم .sidra-commercial__divider فقط.",
  "لمنع قص الصور على الجوال اضبط object-fit: cover مع min-height مناسب وراجع focal point.",
  "أي حركة يجب أن تكون transform/opacity فقط قدر الإمكان للحفاظ على الأداء.",
  "عند تعديل شريط الصور التلقائي تأكد من تكرار نفس العناصر داخل track حتى تصبح الحركة مستمرة.",
];

const implementationSteps = [
  "ارفع ملفات الثيم من لوحة سلة ثم فعله على نسخة تجريبية أولًا.",
  "اضبط الشعار، الألوان، الخطوط، وروابط التواصل من إعدادات الثيم.",
  "ابدأ بالأقسام الأساسية: الهيدر، البانر، إعلان الصور، المنتجات، الفوتر.",
  "أدخل صورًا عالية الجودة ومقاسات ثابتة، ثم راجع الجوال قبل النشر.",
  "اختبر الشراء، السلة، البحث، واتجاه RTL/LTR بعد كل تعديل كبير.",
];

export default async function SidraThemePage({ params }: PageProps) {
  const { locale } = await params;
  const buyLink = getWhatsAppLink(buyMessage);
  const contactLink = getWhatsAppLink(contactMessage);

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#15110b]" dir="rtl">
      <section className="relative overflow-hidden bg-[#17110b] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(201,158,86,0.32),transparent_34%),linear-gradient(135deg,rgba(15,12,9,0.98),rgba(58,35,20,0.92)_46%,rgba(13,18,22,0.98))]" />
        <div className="relative mx-auto grid min-h-[86vh] max-w-7xl items-center gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10">
          <div className="max-w-3xl">
            <Link
              href={`/${locale}`}
              className="mb-9 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/85 backdrop-blur-xl transition hover:bg-white/14"
            >
              <Image
                src="/logo.png"
                alt="AM Design"
                width={34}
                height={34}
                className="h-8 w-8 rounded-full object-cover"
                priority
              />
              <span>AM Design تقدم</span>
            </Link>

            <p className="mb-5 inline-flex rounded-full border border-[#d5aa62]/35 bg-[#d5aa62]/12 px-4 py-2 text-sm font-semibold text-[#f1d69c]">
              توثيق رسمي + صفحة بيع احترافية
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">
              {themeName}
              <span className="mt-4 block text-[#e7c47a]">
                متجر سلة بمظهر فاخر قابل للتخصيص
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-white/78">
              دليل شامل لاستخدام الثيم وتعديل أقسامه وألوانه وحركاته، مع خريطة
              واضحة لأسماء عناصر CSS حتى تستطيع أي أداة ذكاء اصطناعي تعديل
              الثيم بسرعة وبنظام.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#d6ad63] px-7 py-4 text-base font-black text-[#17110b] shadow-[0_20px_55px_rgba(214,173,99,0.28)] transition hover:-translate-y-0.5 hover:bg-[#edca82]"
              >
                اشتري الثيم الآن
              </a>
              <a
                href={contactLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/8 px-7 py-4 text-base font-bold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/14"
              >
                تواصل معنا
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/7 p-4 text-sm text-white/78 backdrop-blur-xl"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -inset-6 rounded-[44px] bg-[#d6ad63]/18 blur-3xl" />
            <div className="relative overflow-hidden rounded-[34px] border border-white/14 bg-[#f7f3ec] p-4 shadow-2xl">
              <div className="overflow-hidden rounded-[26px] bg-[#bd1c23]">
                <div className="flex h-36 items-start justify-between p-6 text-white sm:h-48">
                  <div>
                    <p className="text-xs font-bold text-white/70">
                      Luxury Curve
                    </p>
                    <h2 className="mt-2 text-3xl font-black">سدرة</h2>
                  </div>
                  <span className="rounded-full bg-white/18 px-3 py-1 text-xs">
                    Premium
                  </span>
                </div>
                <svg
                  viewBox="0 0 1440 160"
                  className="-mb-1 block h-20 w-full text-[#f7f3ec]"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M0,96 C220,150 388,3 620,62 C849,121 1010,174 1440,54 L1440,160 L0,160 Z"
                  />
                </svg>
              </div>
              <div className="relative -mt-1 overflow-hidden rounded-b-[26px] bg-[#28342e]">
                <Image
                  src="/hero-desktop.jpg"
                  alt="معاينة ثيم سدرة"
                  width={760}
                  height={760}
                  className="h-[430px] w-full object-cover opacity-75"
                  priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,10,0.1),rgba(14,12,10,0.74)),radial-gradient(circle_at_50%_30%,rgba(214,173,99,0.3),transparent_34%)]" />
                <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/18 bg-white/12 p-5 text-white shadow-2xl backdrop-blur-xl">
                  <p className="text-xs text-white/70">Glass Layer Enabled</p>
                  <h3 className="mt-2 text-2xl font-black">
                    بانر وصورة ككتلة واحدة
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-white/78">
                    بدون خط مستقيم، بدون فراغ، وبتدرج داخلي قابل للتخصيص.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["10", "أنماط فواصل عضوية"],
            ["8", "أنماط Gradient جاهزة"],
            ["7", "حركات صور حديثة"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-[28px] border border-[#251b12]/10 bg-white p-7 shadow-[0_22px_60px_rgba(36,27,18,0.08)]"
            >
              <p className="text-5xl font-black text-[#bd1c23]">{value}</p>
              <p className="mt-3 text-lg font-bold text-[#2c241b]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-black text-[#bd1c23]">خريطة الثيم</p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              كل قسم موثق باسم واضح ووظيفة مباشرة
            </h2>
            <p className="mt-5 text-lg leading-9 text-[#685b4c]">
              تم تنظيم الثيم بحيث يعرف المصمم أو المطور أو أداة الذكاء
              الاصطناعي أين يبدأ التعديل، وما العنصر المسؤول عن كل جزء في
              الواجهة.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-[26px] border border-[#23180f]/10 bg-[#fbf8f2] p-6"
              >
                <h3 className="text-2xl font-black">{section.title}</h3>
                <p className="mt-4 min-h-[112px] leading-8 text-[#66594a]">
                  {section.body}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {section.tokens.map((token) => (
                    <code
                      key={token}
                      className="rounded-full bg-[#17110b] px-3 py-1.5 text-xs text-[#f3d18d]"
                    >
                      .{token}
                    </code>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black text-[#bd1c23]">
              Organic Divider
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              فاصل منحني يدمج البانر مع الصورة
            </h2>
            <p className="mt-5 text-lg leading-9 text-[#685b4c]">
              الفاصل في ثيم سدرة لا يعتمد على border-bottom أو hr أو خط
              مستقيم. يتم بناؤه باستخدام SVG Shape Divider أو Clip Path أو Mask
              حتى يصبح العنوان والصورة كتلة بصرية واحدة.
            </p>
          </div>

          <div className="rounded-[30px] border border-[#24180f]/10 bg-[#17110b] p-5 text-white shadow-2xl">
            <div className="grid gap-3 sm:grid-cols-2">
              {dividerStyles.map((style, index) => (
                <div
                  key={style}
                  className="rounded-2xl border border-white/10 bg-white/7 p-4"
                >
                  <p className="text-xs text-white/55">Style {index + 1}</p>
                  <p className="mt-1 font-bold">{style}</p>
                  {style === "Luxury Curve" ? (
                    <span className="mt-3 inline-flex rounded-full bg-[#d6ad63] px-3 py-1 text-xs font-black text-[#17110b]">
                      Default
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#17110b] py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-black text-[#d6ad63]">
                Gradient + Glass
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">
                طبقات احترافية فوق الصور
              </h2>
              <p className="mt-5 text-lg leading-9 text-white/72">
                يمكن تشغيل Overlay متقدم فوق الصورة مع تحديد الألوان، اتجاه
                التدرج، الشفافية، أو استخدام نمط جاهز. وعند تفعيل Glass Layer
                يتم تطبيق blur وborder وshadow لبناء واجهة فاخرة.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {gradientStyles.map((style, index) => (
                <div
                  key={style}
                  className="rounded-2xl border border-white/10 bg-white/7 p-5"
                >
                  <p className="text-xs text-white/50">Gradient {index + 1}</p>
                  <p className="mt-2 text-lg font-black">{style}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {["Top", "Bottom", "Left", "Right", "Center", "Custom"].map(
              (direction) => (
                <div
                  key={direction}
                  className="rounded-2xl border border-[#d6ad63]/18 bg-[#d6ad63]/8 p-5"
                >
                  <p className="font-bold">Gradient Direction: {direction}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-black text-[#bd1c23]">إعدادات القسم</p>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">
            مفاتيح تحكم واضحة للتخصيص
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-[28px] border border-[#24180f]/10 bg-white shadow-[0_22px_60px_rgba(36,27,18,0.08)]">
          <div className="grid bg-[#17110b] px-5 py-4 text-sm font-black text-white md:grid-cols-[270px_1fr]">
            <span>اسم الخيار</span>
            <span>وظيفته</span>
          </div>
          {settings.map(([name, description]) => (
            <div
              key={name}
              className="grid border-t border-[#24180f]/8 px-5 py-4 text-sm md:grid-cols-[270px_1fr]"
            >
              <code className="mb-2 font-bold text-[#bd1c23] md:mb-0">
                {name}
              </code>
              <span className="leading-7 text-[#685b4c]">{description}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-black text-[#bd1c23]">
                Motion System
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">
                حركة الصورة بدون إزعاج
              </h2>
              <p className="mt-5 text-lg leading-9 text-[#685b4c]">
                الحركة مصممة لتخدم المنتج لا أن تسرق الانتباه. اختر نمط الحركة
                المناسب حسب نوع الصورة وحجم البانر.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {motionStyles.map((style) => (
                <div
                  key={style}
                  className="rounded-2xl border border-[#24180f]/10 bg-[#fbf8f2] p-5"
                >
                  <p className="text-lg font-black">{style}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="max-w-4xl">
          <p className="text-sm font-black text-[#bd1c23]">
            CSS Reference
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">
            توثيق أسماء العناصر لتعديل الثيم بالذكاء الاصطناعي
          </h2>
          <p className="mt-5 text-lg leading-9 text-[#685b4c]">
            استخدم هذه الخريطة عند طلب تعديل من أي أداة AI. أعطها اسم العنصر
            والنتيجة المطلوبة، وسيكون التعديل أكثر دقة وأقل عشوائية.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {cssMap.map(([selector, description]) => (
            <div
              key={selector}
              className="rounded-2xl border border-[#24180f]/10 bg-white p-5 shadow-[0_16px_40px_rgba(36,27,18,0.06)]"
            >
              <code className="text-sm font-black text-[#bd1c23]">
                {selector}
              </code>
              <p className="mt-3 leading-8 text-[#685b4c]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#efe6d8] py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[28px] bg-white p-7 shadow-[0_22px_60px_rgba(36,27,18,0.08)]">
              <h2 className="text-3xl font-black">طريقة الاستخدام داخل سلة</h2>
              <ol className="mt-7 space-y-4">
                {implementationSteps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#bd1c23] text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <span className="pt-1 leading-8 text-[#5f5346]">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[28px] bg-[#17110b] p-7 text-white shadow-2xl">
              <h2 className="text-3xl font-black">قواعد تعديل AI</h2>
              <div className="mt-7 space-y-4">
                {aiInstructions.map((instruction) => (
                  <div
                    key={instruction}
                    className="rounded-2xl border border-white/10 bg-white/7 p-4 leading-8 text-white/78"
                  >
                    {instruction}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="rounded-[34px] bg-[#bd1c23] p-8 text-white shadow-[0_28px_80px_rgba(189,28,35,0.28)] sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black text-white/65">جاهز للانطلاق</p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">
                حوّل متجر سلة إلى واجهة فاخرة قابلة للبيع من أول زيارة
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-9 text-white/78">
                احصل على ثيم سدرة مع توثيق منظم، دعم تخصيص، وبنية CSS واضحة
                لأي تعديل مستقبلي.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-black text-[#bd1c23] transition hover:-translate-y-0.5"
              >
                اشتري الثيم الآن
              </a>
              <a
                href={`mailto:${AGENCY_INFO.email}`}
                className="inline-flex items-center justify-center rounded-full border border-white/22 px-7 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                تواصل معنا
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
