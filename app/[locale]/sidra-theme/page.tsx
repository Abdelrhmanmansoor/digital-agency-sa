import type { Metadata } from "next";
import Image from "next/image";
import { AGENCY_INFO, getWhatsAppLink } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const siteUrl = "https://www.solimanx.com";
const themeName = "ثيم سدرة";
const pageTitle = "دليل استخدام ثيم سدرة | تصميم متجر متحرك";
const pageDescription =
  "دليل مختصر ومنظم لعناصر ثيم سدرة، مع شرح قابل للقراءة لأقسام الصفحة الرئيسية وخيارات التصميم وطلب تصميم متجر متحرك احترافي.";

const orderMessage =
  "أريد طلب تصميم متجر متحرك احترافي مستوحى من ثيم سدرة.";
const supportMessage =
  "أحتاج استفسار بخصوص دليل استخدام ثيم سدرة.";

const guideItems = [
  {
    title: "البانر الرئيسي المتحرك",
    summary: "واجهة أولى تعرض هوية المتجر والعرض الأساسي بشكل واضح.",
    details:
      "استخدمه لإبراز رسالة المتجر، صورة المنتج الرئيسية، وزر التوجيه للعرض أو التصنيف الأهم. الأفضل أن تكون الصورة نظيفة والعبارة قصيرة ومباشرة.",
  },
  {
    title: "إعلان صور مميز",
    summary: "قسم بصري يجمع النص والصورة بفاصل منحني عضوي.",
    details:
      "مناسب للعروض، الإطلاقات، المنتجات الموسمية، أو إبراز قصة منتج. اختر لونًا قريبًا من هوية المتجر وحافظ على وضوح النص فوق الصورة.",
  },
  {
    title: "شريط صور تلقائي",
    summary: "عرض مستمر للصور أو المنتجات بدون إرباك للزائر.",
    details:
      "يفضل استخدام صور متقاربة في المقاس واللون. هذا العنصر مناسب للعلامات التجارية، لقطات المنتجات، أو إبراز مجموعة مختارة بطريقة ناعمة.",
  },
  {
    title: "المنتجات المختارة",
    summary: "منطقة لإظهار المنتجات المهمة أو الأعلى ربحًا.",
    details:
      "ضع فيها المنتجات التي تريد دفع الزائر نحوها أولًا. العنوان يجب أن يوضح سبب الاختيار مثل الأكثر طلبًا، جديدنا، أو عروض محدودة.",
  },
  {
    title: "الأقسام السريعة",
    summary: "روابط مختصرة تساعد الزائر على الوصول لما يريد بسرعة.",
    details:
      "استخدم أسماء قصيرة وواضحة للأقسام. كل رابط يجب أن يقود لتصنيف أو صفحة مفيدة فعلًا، حتى لا تتحول المنطقة إلى ازدحام بصري.",
  },
  {
    title: "مميزات المتجر",
    summary: "شارات ثقة مختصرة مثل سرعة الشحن، الدفع الآمن، وخدمة العملاء.",
    details:
      "اكتب كل ميزة في سطر بسيط، واجعل عددها محدودًا. الهدف منها تقليل تردد الزائر قبل الشراء وليس شرح سياسات طويلة.",
  },
  {
    title: "الأسئلة الشائعة",
    summary: "إجابات سريعة على أكثر الأسئلة التي تؤثر على قرار الشراء.",
    details:
      "أضف أسئلة عن الشحن، الاستبدال، طرق الدفع، وطريقة استخدام المنتج. اجعل الإجابات مختصرة حتى تبقى الصفحة سهلة القراءة.",
  },
  {
    title: "التذييل وروابط التواصل",
    summary: "نقطة ختامية تجمع وسائل التواصل والروابط المهمة.",
    details:
      "تأكد من ظهور رقم التواصل، البريد، الروابط القانونية، وروابط الحسابات الاجتماعية بطريقة واضحة وسهلة الوصول.",
  },
];

const designControls = [
  {
    title: "الألوان والهوية",
    details:
      "اضبط اللون الأساسي، لون النص، لون الأزرار، والخلفيات بما يناسب هوية المتجر. لا تستخدم أكثر من لونين رئيسيين حتى يبقى التصميم فاخرًا.",
  },
  {
    title: "الحركة والمؤثرات",
    details:
      "اختر حركة هادئة للصور مثل التحريك البطيء أو التكبير الناعم. الحركة الجيدة تجعل الصفحة حية بدون أن تشتت الزائر.",
  },
  {
    title: "الطبقات البصرية",
    details:
      "يمكن استخدام طبقة تدرج أو تأثير زجاجي فوق الصور لتحسين قراءة النص. احرص على أن تبقى الصورة واضحة والكتابة مقروءة.",
  },
  {
    title: "المسافات وحجم النص",
    details:
      "اترك مساحة كافية بين الأقسام، واجعل العناوين قصيرة. الصفحة المقروءة تبيع أفضل من صفحة مزدحمة بالمؤثرات والكلام.",
  },
];

const seoChecklist = [
  "عنوان الصفحة يوضح اسم الثيم وفائدة الصفحة.",
  "الوصف مختصر ويحتوي على كلمات مثل تصميم متجر متحرك وثيم سدرة.",
  "العناوين مرتبة من H1 إلى H2 بدون تكرار عشوائي.",
  "المحتوى قابل للقراءة على الجوال والديسكتوب.",
  "أزرار التواصل والطلب واضحة في أول وآخر الصفحة.",
];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${siteUrl}/${locale}/sidra-theme`;

  return {
    metadataBase: new URL(siteUrl),
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "ثيم سدرة",
      "دليل استخدام ثيم سدرة",
      "تصميم متجر متحرك",
      "تصميم متجر احترافي",
      "تصميم واجهة متجر",
      "ثيم متجر عربي",
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonical,
      siteName: "SolimanX",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [
        {
          url: "/sidra-theme-logo.png",
          width: 1024,
          height: 1024,
          alt: "شعار ثيم سدرة",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: ["/sidra-theme-logo.png"],
    },
  };
}

function AccordionItem({
  title,
  summary,
  details,
}: {
  title: string;
  summary?: string;
  details: string;
}) {
  return (
    <details className="group rounded-2xl border border-[#eadfd4] bg-white p-5 shadow-[0_16px_45px_rgba(52,35,25,0.06)] transition open:border-[#a51218]/25 open:shadow-[0_20px_60px_rgba(165,18,24,0.08)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
        <span>
          <span className="block text-lg font-black text-[#211711]">
            {title}
          </span>
          {summary ? (
            <span className="mt-2 block text-sm leading-7 text-[#76685d]">
              {summary}
            </span>
          ) : null}
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4ece5] text-xl font-black text-[#a51218] transition group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-5 border-t border-[#f0e6dc] pt-5 text-base leading-9 text-[#5f5148]">
        {details}
      </p>
    </details>
  );
}

export default async function SidraThemePage({ params }: PageProps) {
  const { locale } = await params;
  const orderLink = getWhatsAppLink(orderMessage);
  const supportLink = getWhatsAppLink(supportMessage);

  return (
    <main className="min-h-screen bg-[#f8f2ec] text-[#211711]" dir="rtl">
      <section className="relative overflow-hidden border-b border-[#eadfd4] bg-[linear-gradient(180deg,#fbf7f2_0%,#f3e8df_100%)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-[#a51218]" />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-10 lg:py-20">
          <div className="mx-auto w-full max-w-[320px] lg:order-2">
            <div className="rounded-[30px] border border-[#eadfd4] bg-white p-5 shadow-[0_28px_80px_rgba(80,48,34,0.12)]">
              <Image
                src="/sidra-theme-logo.png"
                alt="شعار ثيم سدرة"
                width={1024}
                height={1024}
                className="h-auto w-full rounded-[22px] object-cover"
                priority
              />
            </div>
          </div>

          <div className="lg:order-1">
            <p className="mb-4 inline-flex rounded-full border border-[#a51218]/15 bg-white px-4 py-2 text-sm font-black text-[#a51218]">
              تجربة فريدة للإبداع والتميز
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-[#211711] sm:text-5xl lg:text-6xl">
              دليل الاستخدام لعناصر الصفحة الرئيسية في {themeName}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-[#6d5f55]">
              دليل مختصر يساعدك على فهم عناصر الثيم، اختيار أماكن استخدامها،
              وتقديم متجر واضح ومقروء للزائر. تم تبسيط المحتوى حتى تحصل على
              فكرة عملية بدون كشف تفاصيل تنفيذية داخلية.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={orderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#a51218] px-7 py-4 text-base font-black text-white shadow-[0_18px_50px_rgba(165,18,24,0.22)] transition hover:-translate-y-0.5 hover:bg-[#8f0f14]"
              >
                طلب تصميم متجر متحرك
              </a>
              <a
                href={supportLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#d8c9bc] bg-white px-7 py-4 text-base font-bold text-[#211711] transition hover:-translate-y-0.5 hover:border-[#a51218]/35"
              >
                تواصل معنا
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black text-[#a51218]">عناصر الثيم</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            قائمة منسدلة لكل عنصر
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6d5f55]">
            افتح العنصر الذي تريد معرفة وظيفته فقط. الصفحة مصممة لتبقى خفيفة
            ومقروءة ولا تعرض تفاصيل لا يحتاجها المستخدم النهائي.
          </p>
        </div>

        <div className="grid gap-4">
          {guideItems.map((item) => (
            <AccordionItem key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="border-y border-[#eadfd4] bg-white/70 py-14">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black text-[#a51218]">
              خيارات التصميم
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              تحكم بصري بدون تعقيد
            </h2>
            <p className="mt-4 text-base leading-8 text-[#6d5f55]">
              هذه النقاط توضح طريقة التفكير في التخصيص، بدون الدخول في أسرار
              أو تفاصيل تقنية غير مطلوبة للزائر.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {designControls.map((item) => (
              <AccordionItem
                key={item.title}
                title={item.title}
                details={item.details}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-black text-[#a51218]">SEO</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              صفحة مقروءة ومناسبة لمحركات البحث
            </h2>
            <p className="mt-4 text-base leading-8 text-[#6d5f55]">
              تم بناء الصفحة بعناوين واضحة، وصف مختصر، ومحتوى قابل للقراءة على
              الجوال والديسكتوب، مع دعوة مباشرة لطلب تصميم متجر متحرك.
            </p>
          </div>

          <div className="rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-[0_16px_45px_rgba(52,35,25,0.06)]">
            <ul className="space-y-4">
              {seoChecklist.map((item) => (
                <li key={item} className="flex gap-3 text-[#5f5148]">
                  <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-[#a51218]/10 text-center text-xs font-black leading-5 text-[#a51218]">
                    ✓
                  </span>
                  <span className="leading-8">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:px-10">
        <div className="rounded-[30px] bg-[#211711] p-8 text-white shadow-[0_28px_80px_rgba(33,23,17,0.18)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black text-[#e5c38f]">
                جاهز لتطوير متجرك؟
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                اطلب تصميم متجر متحرك بواجهة فاخرة ومقروءة
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/70">
                نجهز لك واجهة متجر عصرية، حركة ناعمة، أقسام واضحة، وتجربة
                مناسبة للجوال مع الحفاظ على سرعة الصفحة ووضوح الرسالة.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={orderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-black text-[#211711] transition hover:-translate-y-0.5"
              >
                طلب تصميم متجر متحرك
              </a>
              <a
                href={`mailto:${AGENCY_INFO.email}`}
                className="inline-flex items-center justify-center rounded-full border border-white/18 px-7 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/8"
              >
                تواصل عبر البريد
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
