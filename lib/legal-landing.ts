/* ═══════════════════════════════════════════════════════════════════════════
   LEGAL LANDING PAGES — /solutions/legal/practice/<slug> and /city/<slug>
   One page per search a lawyer actually makes ("تصميم موقع محامي عمالي",
   "تصميم موقع محاماة الرياض"). Each page carries its own content — the
   searches a client in that area types, the page structure we build for it,
   and its own questions — so none of them is a doorway copy of another.
═══════════════════════════════════════════════════════════════════════════ */

import type { Pair } from "./legal-data";

export type PracticeLanding = {
  slug: string;
  /** key in PRACTICE_AREAS */
  area: string;
  title: Pair;
  h1: Pair;
  lead: Pair;
  keywords: { ar: string[]; en: string[] };
  /** What the firm's future clients type into Google. */
  searches: string[];
  /** Sections we build on the firm's page for this area. */
  blueprint: Pair[];
  /** A short note on what wins this niche. */
  angle: Pair;
  faq: { q: Pair; a: Pair }[];
};

export type CityLanding = {
  slug: string;
  name: Pair;
  title: Pair;
  h1: Pair;
  lead: Pair;
  keywords: { ar: string[]; en: string[] };
  districts: string[];
  searches: string[];
  local: Pair[];
  faq: { q: Pair; a: Pair }[];
};

export const PRACTICE_LANDINGS: PracticeLanding[] = [
  {
    slug: "labor-lawyer-website",
    area: "labor",
    title: { ar: "تصميم موقع محامي قضايا عمالية | AM Design", en: "Labour Lawyer Website Design in Saudi Arabia | AM Design" },
    h1: { ar: "تصميم موقع لمحامي القضايا العمالية يصل إليه الموظف قبل أن يوقّع المخالصة.", en: "A labour lawyer website that reaches the employee before they sign the settlement." },
    lead: { ar: "الباحث عن محامٍ عمالي يكتب سؤاله في لحظة قلق: فُصل للتو، أو لم تُصرف مستحقاته. نبني لك الصفحة التي تجيبه بلغته، وتنتهي بزر يحجز استشارتك.", en: "People searching for an employment lawyer type in a moment of stress: just dismissed, or unpaid. We build the page that answers them in their words and ends at your booking button." },
    keywords: {
      ar: ["تصميم موقع محامي عمالي", "موقع محامي قضايا عمالية", "تسويق محامي عمالي", "سيو محامي عمالي", "محامي قضايا عمالية"],
      en: ["labour lawyer website", "employment lawyer website design", "employment lawyer SEO Saudi"],
    },
    searches: ["محامي قضايا عمالية", "فصل تعسفي ماذا أفعل", "حساب مكافأة نهاية الخدمة", "رفع قضية عمالية على شركة", "مدة القضية العمالية", "محامي عمالي قريب مني"],
    blueprint: [
      { ar: "قسم «فُصلت من عملك؟» يشرح الخطوات الأولى قبل توقيع أي ورقة", en: "A 'Just dismissed?' block with the first steps before signing anything" },
      { ar: "حاسبة تقديرية لمكافأة نهاية الخدمة تجلب زيارات وتلتقط رقم التواصل", en: "An end-of-service estimate calculator that draws traffic and captures a number" },
      { ar: "مسار القضية: التسوية الودية ثم المحكمة العمالية ومدد كل مرحلة", en: "The case path: amicable settlement, then the labour court, with timelines" },
      { ar: "دراسات حالة مجهولة الهوية: نوع النزاع والنتيجة", en: "Anonymised case studies: dispute type and outcome" },
      { ar: "نموذج حجز من خطوتين يرسل الطلب لواتساب المكتب فورًا", en: "Two-step booking sent straight to the firm's WhatsApp" },
    ],
    angle: { ar: "هذا مجال بحث عالي الحجم ومحلي جدًا؛ الفائز غالبًا من يملك صفحة تجيب السؤال الحرفي ويظهر في خرائط جوجل لمدينته.", en: "A high-volume, very local niche; the winner is usually the firm that answers the literal question and shows in Google Maps for its city." },
    faq: [
      { q: { ar: "هل يمكن إضافة حاسبة مكافأة نهاية الخدمة للموقع؟", en: "Can you add an end-of-service calculator?" }, a: { ar: "نعم، نبنيها بتقدير مبسّط مع تنبيه بأنها ليست حسابًا نهائيًا، ويعتمد محامي مكتبك المعادلة والنص قبل النشر.", en: "Yes, as a simplified estimate with a notice that it is not a final figure; your lawyer approves the formula and copy before launch." } },
      { q: { ar: "كم صفحة نحتاج لتخصص العمالي وحده؟", en: "How many pages does labour law need?" }, a: { ar: "نبدأ عادة بصفحة رئيسية للتخصص وثلاث صفحات فرعية: الفصل التعسفي، المستحقات، والاعتراض على الأحكام، ثم مقالات تدعمها.", en: "Usually one main area page and three sub-pages: unfair dismissal, entitlements and appeals, backed by articles." } },
    ],
  },
  {
    slug: "commercial-lawyer-website",
    area: "commercial",
    title: { ar: "تصميم موقع محامي قضايا تجارية وشركات | AM Design", en: "Commercial Lawyer Website Design | AM Design" },
    h1: { ar: "موقع لمحامي القضايا التجارية يقنع مدير الشركة قبل أن يتصل بأحد غيرك.", en: "A commercial lawyer website that convinces a company director before they call anyone else." },
    lead: { ar: "عميل القضايا التجارية شركة لا فرد؛ يقارن ثلاثة مكاتب ويقرأ أكثر. نبني لك موقعًا رصينًا بلغتين يعرض السوابق والفريق والقطاعات التي تخدمها.", en: "Commercial clients are companies; they compare three firms and read more. We build a sober bilingual site showing precedent, team and the sectors you serve." },
    keywords: {
      ar: ["تصميم موقع محامي تجاري", "موقع محامي شركات", "تسويق مكتب محاماة تجاري", "محامي قضايا تجارية"],
      en: ["commercial lawyer website", "corporate law firm website design", "business lawyer SEO"],
    },
    searches: ["محامي قضايا تجارية", "محامي شركات", "نزاع شراكة تجارية", "المحكمة التجارية رفع دعوى", "محامي عقود تجارية", "commercial lawyer Riyadh"],
    blueprint: [
      { ar: "صفحات حسب القطاع: مقاولات، تجزئة، تقنية، عقار", en: "Pages by sector: construction, retail, tech, real estate" },
      { ar: "ملفات الشركاء مع اللغات والقضايا البارزة", en: "Partner profiles with languages and notable matters" },
      { ar: "نسخة إنجليزية كاملة للشركات الأجنبية والمستثمرين", en: "A full English version for foreign companies and investors" },
      { ar: "صفحة عقود الاستشارات السنوية (Retainer) بنطاق واضح", en: "An annual retainer page with a clear scope" },
      { ar: "نموذج طلب عرض للشركات بحقول اسم الشركة والقطاع", en: "A company enquiry form with company name and sector" },
    ],
    angle: { ar: "الثقة هنا تُبنى بالتفاصيل: سنوات الخبرة، لغات الفريق، وأسماء القطاعات. الموقع الرخيص يخسر هذه الفئة مباشرة.", en: "Trust here is built on detail: years, team languages, named sectors. A cheap-looking site loses this audience immediately." },
    faq: [
      { q: { ar: "هل يمكن عرض عملاء الشركات دون كشف أسمائهم؟", en: "Can we show corporate clients without naming them?" }, a: { ar: "نعم، نعرضهم بالقطاع والحجم ونوع العمل فقط، أو بالأسماء التي توافق عليها كتابيًا.", en: "Yes, by sector, size and type of work only, or by the names you approve in writing." } },
      { q: { ar: "هل تبنون بوابة لعملاء الشركات؟", en: "Do you build a portal for corporate clients?" }, a: { ar: "ضمن باقة المنصة القانونية: لوحة لكل شركة تعرض القضايا المفتوحة واستهلاك العقد السنوي والمستندات.", en: "Within the Legal platform package: a console per company with open matters, retainer usage and documents." } },
    ],
  },
  {
    slug: "family-lawyer-website",
    area: "family",
    title: { ar: "تصميم موقع محامي أحوال شخصية | AM Design", en: "Family Lawyer Website Design | AM Design" },
    h1: { ar: "موقع لمحامي الأحوال الشخصية يطمئن الموكّل قبل أن يشرح مشكلته.", en: "A family lawyer website that reassures a client before they explain their situation." },
    lead: { ar: "قضايا الحضانة والنفقة حسّاسة، والزائر يبحث غالبًا من جواله ليلًا وبخصوصية. نبني صفحات هادئة تشرح الإجراءات، مع تواصل سري مباشر.", en: "Custody and maintenance cases are sensitive, and visitors often search on their phone at night, privately. We build calm pages that explain procedure, with discreet direct contact." },
    keywords: {
      ar: ["تصميم موقع محامي أحوال شخصية", "موقع محامية أحوال شخصية", "تسويق محامي أحوال شخصية", "محامي حضانة ونفقة"],
      en: ["family lawyer website design", "divorce lawyer website", "family law SEO Saudi"],
    },
    searches: ["محامي أحوال شخصية", "محامية حضانة", "كيف أرفع قضية نفقة", "إثبات طلاق", "قضية زيارة الأطفال", "محامية قريبة مني"],
    blueprint: [
      { ar: "صفحات منفصلة: الحضانة، النفقة، الطلاق والخلع، الزيارة", en: "Separate pages: custody, maintenance, divorce and khula, visitation" },
      { ar: "خيار التواصل مع محامية لمن تفضّل ذلك", en: "An option to speak with a female lawyer" },
      { ar: "رسالة خصوصية واضحة: لا يُحفظ شيء خارج المكتب", en: "A clear privacy message: nothing leaves the firm" },
      { ar: "شرح مبسّط للإجراءات والمستندات المطلوبة لكل قضية", en: "Plain explanations of procedure and required documents" },
      { ar: "زر واتساب سري يفتح محادثة دون نموذج", en: "A discreet WhatsApp button with no form" },
    ],
    angle: { ar: "النبرة هنا تصنع الفرق: صور دافئة لا ميزان ومطرقة، ولغة تطمئن ولا تخيف.", en: "Tone decides this niche: warm imagery rather than scales and gavels, and language that reassures." },
    faq: [
      { q: { ar: "هل يمكن إظهار محاميات المكتب بشكل منفصل؟", en: "Can female lawyers be shown separately?" }, a: { ar: "نعم، ونضيف خيارًا في نموذج الحجز لاختيار محامٍ أو محامية، ويصل الطلب للشخص المناسب مباشرة.", en: "Yes, with a booking option to choose a male or female lawyer, routed directly to the right person." } },
      { q: { ar: "هل يمكن نشر الصور الشخصية للمحاميات؟", en: "Must lawyers' photos be published?" }, a: { ar: "لا يلزم. نصمم ملفات احترافية بدون صور أو بصور عامة حسب رغبة كل محامية.", en: "No. Profiles can be designed without photos, as each lawyer prefers." } },
    ],
  },
  {
    slug: "real-estate-lawyer-website",
    area: "realestate",
    title: { ar: "تصميم موقع محامي قضايا عقارية | AM Design", en: "Real Estate Lawyer Website Design | AM Design" },
    h1: { ar: "موقع لمحامي العقار يجذب الملاك والمطوّرين والمستأجرين.", en: "A real estate lawyer website that draws owners, developers and tenants." },
    lead: { ar: "نزاعات الإيجار والإفراغ والمساهمات العقارية تبدأ ببحث في جوجل. نبني صفحاتها كلًّا على حدة، مع نسخة للمطوّرين والشركات.", en: "Tenancy, title and development disputes begin with a Google search. We build a page for each, with a track for developers and companies." },
    keywords: {
      ar: ["تصميم موقع محامي عقاري", "محامي قضايا عقارية", "تسويق محامي عقار", "موقع محامي إيجار"],
      en: ["real estate lawyer website", "property lawyer website design"],
    },
    searches: ["محامي عقاري", "إخلاء مستأجر لا يدفع", "نزاع إفراغ صك", "محامي مساهمات عقارية", "عقد إيجار منصة إيجار نزاع", "محامي بيع أراضي"],
    blueprint: [
      { ar: "صفحات: الإيجار والإخلاء، الإفراغ والملكية، المقاولات، المساهمات", en: "Pages: tenancy and eviction, title transfer, construction, developments" },
      { ar: "قسم خاص بالمطوّرين وعقود البيع على الخارطة", en: "A developers section covering off-plan sales" },
      { ar: "دليل مستندات: الصك، عقد الإيجار، المحاضر", en: "A documents guide: deed, lease, minutes" },
      { ar: "دراسات حالة لنزاعات عقارية مجهولة الهوية", en: "Anonymised property dispute case studies" },
      { ar: "نموذج حجز يسأل عن نوع العقار والمدينة", en: "Booking that asks for property type and city" },
    ],
    angle: { ar: "العقار بحث محلي بامتياز؛ صفحة المدينة وملف جوجل التجاري يجلبان أكثر من أي إعلان.", en: "Real estate is local search par excellence; a city page and a Google Business Profile outperform ads." },
    faq: [
      { q: { ar: "هل نستهدف الملاك أم المستأجرين؟", en: "Do we target owners or tenants?" }, a: { ar: "نبني مسارين منفصلين في الموقع، لأن سؤال كل منهما مختلف تمامًا ويُكتب بكلمات مختلفة.", en: "Two separate tracks, because each asks a different question in different words." } },
      { q: { ar: "هل تكتبون المقالات العقارية؟", en: "Do you write property articles?" }, a: { ar: "نكتب المسودات بناءً على جلسة معك، ويعتمدها محامي المكتب قبل النشر.", en: "We draft from a session with you; your lawyer approves before publishing." } },
    ],
  },
  {
    slug: "criminal-lawyer-website",
    area: "criminal",
    title: { ar: "تصميم موقع محامي جنائي | AM Design", en: "Criminal Defence Lawyer Website Design | AM Design" },
    h1: { ar: "موقع لمحامي القضايا الجنائية يجيب في أصعب لحظة.", en: "A criminal defence website that answers at the hardest moment." },
    lead: { ar: "من يبحث عن محامٍ جنائي يريد ردًا الآن لا غدًا. نبني موقعًا سريعًا، رقمه ظاهر في كل شاشة، وصفحات تشرح الإجراءات بهدوء.", en: "People searching for a defence lawyer need an answer now, not tomorrow. We build a fast site with the number on every screen and calm procedural pages." },
    keywords: {
      ar: ["تصميم موقع محامي جنائي", "محامي قضايا جنائية", "تسويق محامي جنائي"],
      en: ["criminal lawyer website design", "defence lawyer website"],
    },
    searches: ["محامي جنائي", "محامي قضايا جنائية عاجل", "توقيف ماذا أفعل", "محامي قضايا مخدرات", "محامي قضايا احتيال", "محامي جرائم معلوماتية"],
    blueprint: [
      { ar: "شريط اتصال عاجل ثابت أعلى الصفحة وأسفلها على الجوال", en: "A sticky urgent-call bar top and bottom on mobile" },
      { ar: "صفحات حسب نوع القضية: معلوماتية، مالية، احتيال", en: "Pages by case type: cyber, financial, fraud" },
      { ar: "«ماذا تفعل الآن» بخطوات قصيرة دون وعود بنتائج", en: "'What to do now' in short steps, with no promised outcomes" },
      { ar: "سرعة تحميل أقل من ثانيتين على الجوال", en: "Under two seconds to load on mobile" },
      { ar: "توافر خارج الدوام موضح بوضوح إن كان متاحًا", en: "After-hours availability stated clearly if offered" },
    ],
    angle: { ar: "السرعة والوضوح يحسمان الاختيار هنا؛ الزائر لن يقرأ صفحة «من نحن».", en: "Speed and clarity decide here; the visitor will not read an About page." },
    faq: [
      { q: { ar: "هل يمكن عرض رقم طوارئ مختلف عن رقم المكتب؟", en: "Can we show an emergency number separate from the office line?" }, a: { ar: "نعم، ونربطه بزر اتصال مباشر وواتساب، مع ساعات التوفر التي تحددها.", en: "Yes, with direct call and WhatsApp buttons and the hours you set." } },
      { q: { ar: "كيف نلتزم بضوابط الإعلان؟", en: "How do we stay within advertising rules?" }, a: { ar: "لا وعود بالبراءة أو بنتيجة، ولا أسماء أطراف. نعرض الخبرة والإجراءات فقط، والنص النهائي يعتمده مكتبك.", en: "No promises of acquittal or outcomes and no party names; only experience and procedure, with final copy approved by your firm." } },
    ],
  },
  {
    slug: "enforcement-lawyer-website",
    area: "enforcement",
    title: { ar: "تصميم موقع محامي تنفيذ وتحصيل ديون | AM Design", en: "Debt Collection Lawyer Website Design | AM Design" },
    h1: { ar: "موقع لمحامي التنفيذ يجلب الشركات التي تبحث عن تحصيل مستحقاتها.", en: "An enforcement lawyer website that brings in companies chasing what they are owed." },
    lead: { ar: "تحصيل الديون خدمة متكررة للشركات، والعميل الواحد قد يرسل عشرات الملفات. نبني موقعًا يبيع الخدمة كعقد شهري لا كقضية واحدة.", en: "Debt collection is recurring work, and one client may send dozens of files. We build a site that sells it as a monthly contract, not a one-off case." },
    keywords: {
      ar: ["تصميم موقع محامي تنفيذ", "محامي تحصيل ديون", "تسويق محامي تنفيذ", "محامي سندات تنفيذية"],
      en: ["debt collection lawyer website", "enforcement lawyer website"],
    },
    searches: ["محامي تنفيذ", "تحصيل ديون الشركات", "تنفيذ شيك مرتجع", "طلب تنفيذ سند لأمر", "محامي تحصيل مستحقات", "شركة تحصيل ديون الرياض"],
    blueprint: [
      { ar: "باقات تحصيل للشركات بعدد ملفات شهري", en: "Collection plans for companies by monthly file count" },
      { ar: "شرح المسار: المطالبة الودية ثم طلب التنفيذ ومتابعته", en: "The path: amicable demand, enforcement request, follow-up" },
      { ar: "نموذج رفع ملفات الديون بشكل آمن", en: "Secure upload for debt files" },
      { ar: "تقارير متابعة دورية ضمن بوابة العميل", en: "Periodic follow-up reports in a client portal" },
      { ar: "صفحات للشيكات والسندات والكمبيالات", en: "Pages for cheques, promissory notes and bills" },
    ],
    angle: { ar: "هذه الفئة تشتري الانتظام والتقارير؛ بوابة متابعة بسيطة قد تكون سبب التعاقد بحد ذاتها.", en: "This audience buys regularity and reporting; a simple tracking portal can win the contract on its own." },
    faq: [
      { q: { ar: "هل يمكن للشركة متابعة ملفاتها أونلاين؟", en: "Can the company track its files online?" }, a: { ar: "نعم ضمن باقة المنصة: حساب لكل شركة يعرض حالة كل ملف والمبالغ المحصلة.", en: "Yes, within the platform package: a per-company account showing each file's status and collected amounts." } },
      { q: { ar: "هل تبنون صفحة لعقود التحصيل الشهرية؟", en: "Do you build a monthly collection contracts page?" }, a: { ar: "نعم، بنطاق واضح ونموذج طلب عرض للشركات.", en: "Yes, with a clear scope and a company quote form." } },
    ],
  },
  {
    slug: "ip-lawyer-website",
    area: "ip",
    title: { ar: "تصميم موقع محامي ملكية فكرية وعلامات تجارية | AM Design", en: "IP & Trademark Lawyer Website Design | AM Design" },
    h1: { ar: "موقع لمحامي الملكية الفكرية يصل لأصحاب العلامات قبل أن يُنسخ اسمهم.", en: "An IP lawyer website that reaches brand owners before their name is copied." },
    lead: { ar: "رواد الأعمال وأصحاب المتاجر يبحثون عن «تسجيل علامة تجارية» قبل الإطلاق. نبني لك صفحات خدمة واضحة السعر والخطوات.", en: "Founders and store owners search 'register a trademark' before launch. We build service pages with clear steps and pricing." },
    keywords: {
      ar: ["تصميم موقع محامي ملكية فكرية", "محامي علامات تجارية", "تسويق محامي ملكية فكرية", "تسجيل علامة تجارية محامي"],
      en: ["IP lawyer website", "trademark lawyer website design"],
    },
    searches: ["تسجيل علامة تجارية في السعودية", "محامي علامات تجارية", "اعتراض على علامة تجارية", "حماية اسم المتجر", "حقوق المؤلف محامي", "سرقة تصميم ماذا أفعل"],
    blueprint: [
      { ar: "صفحة خدمة لتسجيل العلامة بخطوات وسعر يبدأ من", en: "A trademark registration page with steps and a from-price" },
      { ar: "فحص مبدئي لتوفر الاسم كأداة جذب", en: "A preliminary name-availability check as a lead magnet" },
      { ar: "صفحات: الاعتراض، التجديد، حقوق المؤلف، النطاقات", en: "Pages: opposition, renewal, copyright, domains" },
      { ar: "محتوى موجّه لأصحاب المتاجر الإلكترونية", en: "Content aimed at e-commerce store owners" },
      { ar: "نسخة إنجليزية للعلامات الأجنبية", en: "An English version for foreign brands" },
    ],
    angle: { ar: "خدمة قابلة للتسعير المعلن، ما يجعلها مثالية لصفحات تحويل سريعة وإعلانات بحث.", en: "A service that can carry a published price, ideal for fast-converting pages and search ads." },
    faq: [
      { q: { ar: "هل يمكن بيع خدمة تسجيل العلامة أونلاين؟", en: "Can trademark registration be sold online?" }, a: { ar: "نعم، بصفحة خدمة تجمع البيانات وتستقبل الدفع ثم يتابعها مكتبك.", en: "Yes, a service page that collects details and payment, then your firm takes over." } },
      { q: { ar: "هل تستهدفون أصحاب متاجر سلة وزد؟", en: "Do you target Salla and Zid merchants?" }, a: { ar: "نعم، فنحن نعمل مع هذه الفئة يوميًا ونعرف أسئلتها.", en: "Yes, we work with them daily and know their questions." } },
    ],
  },
  {
    slug: "arbitration-lawyer-website",
    area: "arbitration",
    title: { ar: "تصميم موقع محامي تحكيم ووساطة | AM Design", en: "Arbitration Lawyer Website Design | AM Design" },
    h1: { ar: "موقع لمحامي التحكيم يعكس وزن القضايا التي يتولاها.", en: "An arbitration lawyer website that reflects the weight of the matters it handles." },
    lead: { ar: "التحكيم التجاري يُختار فيه المحامي بالاسم والسمعة. نبني لك موقعًا يقدّم المحكّمين والسوابق والمؤسسات التي تعمل أمامها، بلغتين.", en: "In commercial arbitration, counsel is chosen by name and reputation. We build a bilingual site presenting arbitrators, precedent and institutions." },
    keywords: {
      ar: ["تصميم موقع محامي تحكيم", "محامي تحكيم تجاري", "موقع مركز تحكيم"],
      en: ["arbitration lawyer website", "arbitration centre website design"],
    },
    searches: ["محامي تحكيم تجاري", "شرط التحكيم في العقد", "محكم معتمد", "وساطة تجارية", "تنفيذ حكم تحكيم", "arbitration lawyer Saudi Arabia"],
    blueprint: [
      { ar: "ملفات محكّمين مفصّلة بالمؤهلات والعضويات", en: "Detailed arbitrator profiles with credentials and memberships" },
      { ar: "صفحات حسب القطاع: إنشاءات، طاقة، تجارة", en: "Sector pages: construction, energy, trade" },
      { ar: "منشورات وأوراق بحثية تعزز السمعة", en: "Publications that build reputation" },
      { ar: "نسخة إنجليزية بمستوى المكاتب الدولية", en: "An English version at international-firm standard" },
      { ar: "نموذج تواصل سري لطلبات التحكيم", en: "A confidential enquiry form for arbitration requests" },
    ],
    angle: { ar: "الجمهور صغير وقيمته عالية؛ المهم الجودة والرصانة لا كثرة الزيارات.", en: "A small, high-value audience; quality and gravity matter more than traffic." },
    faq: [
      { q: { ar: "هل يناسب هذا مراكز التحكيم أيضًا؟", en: "Does this suit arbitration centres too?" }, a: { ar: "نعم، ونضيف إدارة القضايا وجدولة الجلسات ضمن باقة المنصة.", en: "Yes, adding case administration and hearing scheduling within the platform package." } },
      { q: { ar: "كم لغة تدعمون؟", en: "How many languages?" }, a: { ar: "العربية والإنجليزية افتراضيًا، ويمكن إضافة لغة ثالثة.", en: "Arabic and English by default; a third language can be added." } },
    ],
  },
  {
    slug: "corporate-lawyer-website",
    area: "corporate",
    title: { ar: "تصميم موقع محامي تأسيس شركات وحوكمة | AM Design", en: "Corporate Formation Lawyer Website Design | AM Design" },
    h1: { ar: "موقع لمحامي تأسيس الشركات يجذب المستثمرين ورواد الأعمال.", en: "A company formation lawyer website that attracts investors and founders." },
    lead: { ar: "المستثمر الأجنبي ورائد الأعمال يبحثان عن «تأسيس شركة في السعودية» بالإنجليزية والعربية. نبني لك صفحات خدمة واضحة بخطوات ومدد ومستندات.", en: "Foreign investors and founders search 'company formation in Saudi Arabia' in English and Arabic. We build clear service pages with steps, timelines and documents." },
    keywords: {
      ar: ["تصميم موقع محامي شركات", "محامي تأسيس شركات", "تسويق محامي حوكمة"],
      en: ["company formation lawyer website", "corporate lawyer website Saudi", "business setup Saudi Arabia lawyer"],
    },
    searches: ["تأسيس شركة في السعودية", "company formation Saudi Arabia", "ترخيص استثمار أجنبي", "عقد تأسيس شركة", "حوكمة الشركات العائلية", "محامي شركات ناشئة"],
    blueprint: [
      { ar: "مسار تأسيس خطوة بخطوة مع المستندات", en: "A step-by-step formation path with documents" },
      { ar: "صفحات إنجليزية موجهة للمستثمرين الأجانب", en: "English pages aimed at foreign investors" },
      { ar: "باقات خدمة للشركات الناشئة", en: "Service bundles for start-ups" },
      { ar: "صفحة حوكمة الشركات العائلية", en: "A family business governance page" },
      { ar: "حجز مكالمة دولية مع مراعاة فروق التوقيت", en: "International call booking across time zones" },
    ],
    angle: { ar: "البحث الإنجليزي هنا ذو قيمة عالية جدًا والمنافسة أقل مما تتوقع.", en: "English-language search here is very valuable and less contested than you would expect." },
    faq: [
      { q: { ar: "هل تكتبون المحتوى الإنجليزي؟", en: "Do you write the English content?" }, a: { ar: "نعم، كتابة أصلية لا ترجمة آلية، ويعتمدها مكتبك.", en: "Yes, written natively rather than machine-translated, approved by your firm." } },
      { q: { ar: "هل يمكن ربط حجز المكالمات بتقويم المكتب؟", en: "Can call booking sync with the firm's calendar?" }, a: { ar: "نعم، مع Google Calendar أو Outlook وتذكير آلي.", en: "Yes, with Google Calendar or Outlook and automatic reminders." } },
    ],
  },
  {
    slug: "insurance-lawyer-website",
    area: "insurance",
    title: { ar: "تصميم موقع محامي تأمين وتعويضات | AM Design", en: "Insurance & Compensation Lawyer Website Design | AM Design" },
    h1: { ar: "موقع لمحامي التعويضات يصل للمتضرر حين يرفض التأمين مطالبته.", en: "A compensation lawyer website that reaches people when their insurer refuses a claim." },
    lead: { ar: "حوادث السير ورفض المطالبات والأخطاء الطبية تبدأ كلها ببحث. نبني صفحات لكل نوع مع طريق تواصل قصير.", en: "Traffic accidents, refused claims and medical errors all start with a search. We build a page per type with a short path to contact." },
    keywords: {
      ar: ["تصميم موقع محامي تعويضات", "محامي تأمين", "محامي أخطاء طبية", "تسويق محامي تعويضات"],
      en: ["compensation lawyer website", "insurance claims lawyer website"],
    },
    searches: ["محامي تعويضات", "رفض شركة التأمين تعويض", "تعويض حادث سير", "محامي أخطاء طبية", "مطالبة تأمين مرفوضة", "تقدير التعويض"],
    blueprint: [
      { ar: "صفحات: حوادث السير، الأخطاء الطبية، رفض المطالبات", en: "Pages: traffic accidents, medical errors, refused claims" },
      { ar: "قائمة مستندات تجهّز الزائر قبل المكالمة", en: "A documents checklist that prepares visitors" },
      { ar: "نموذج تقييم أولي للحالة", en: "An initial case assessment form" },
      { ar: "شرح المسار والمدد المتوقعة دون وعد بمبلغ", en: "Process and timelines without promising an amount" },
      { ar: "واتساب لاستقبال صور المستندات", en: "WhatsApp for receiving document photos" },
    ],
    angle: { ar: "العميل هنا يحتاج أن يعرف هل لحالته فرصة؛ نموذج التقييم الأولي أقوى أداة تحويل.", en: "Clients want to know if they have a case; the initial assessment form converts best." },
    faq: [
      { q: { ar: "هل يمكن عرض مبالغ تعويض سابقة؟", en: "Can past compensation amounts be shown?" }, a: { ar: "بصيغة عامة ودون أسماء، وفق ما يعتمده مكتبك وتسمح به الضوابط.", en: "In general terms and without names, as your firm approves and the rules allow." } },
      { q: { ar: "هل تديرون إعلانات جوجل للمكتب؟", en: "Do you run Google Ads for the firm?" }, a: { ar: "نعم ضمن خدمة التسويق الشهرية، بصفحات هبوط مخصصة لكل نوع قضية.", en: "Yes, under the monthly marketing service, with a landing page per case type." } },
    ],
  },
];

export const CITY_LANDINGS: CityLanding[] = [
  {
    slug: "riyadh",
    name: { ar: "الرياض", en: "Riyadh" },
    title: { ar: "تصميم مواقع مكاتب المحاماة في الرياض | AM Design", en: "Law Firm Website Design in Riyadh | AM Design" },
    h1: { ar: "تصميم مواقع المحامين ومكاتب المحاماة في الرياض.", en: "Website design for lawyers and law firms in Riyadh." },
    lead: { ar: "الرياض أكبر سوق قانوني في المملكة وأشدّه منافسة. نبني لمكتبك موقعًا يظهر حين يبحث أحد في حيّه عن «محامي قريب مني»، ويحوّل الزيارة إلى موعد.", en: "Riyadh is the Kingdom's largest and most competitive legal market. We build a site that shows when someone nearby searches for a lawyer, and turns the visit into a booking." },
    keywords: { ar: ["تصميم موقع محاماة الرياض", "تصميم مواقع محامين بالرياض", "تسويق مكاتب محاماة الرياض", "سيو محامي الرياض"], en: ["law firm website Riyadh", "lawyer website design Riyadh"] },
    districts: ["العليا", "الملقا", "النرجس", "الياسمين", "الصحافة", "السليمانية", "الورود", "حطين"],
    searches: ["محامي في الرياض", "مكتب محاماة شمال الرياض", "محامي عمالي الرياض", "محامية أحوال شخصية الرياض", "محامي تجاري الرياض"],
    local: [
      { ar: "ملف Google Business موثّق بعنوان المكتب وساعاته وصوره", en: "A verified Google Business Profile with address, hours and photos" },
      { ar: "صفحة لكل تخصص مقرونة باسم المدينة", en: "Each practice page paired with the city name" },
      { ar: "خريطة المكتب واتجاهات الوصول ومواقف السيارات", en: "Office map, directions and parking" },
      { ar: "نسخة إنجليزية لمقرات الشركات الأجنبية في الرياض", en: "An English version for foreign company HQs in Riyadh" },
    ],
    faq: [
      { q: { ar: "كيف يظهر مكتبي في خرائط جوجل بالرياض؟", en: "How does my firm show in Google Maps in Riyadh?" }, a: { ar: "بملف تجاري موثّق ومكتمل، وتقييمات حقيقية من الموكّلين، وصفحات في الموقع تذكر المدينة والأحياء التي تخدمها.", en: "A complete, verified business profile, genuine client reviews, and site pages naming the city and districts you serve." } },
      { q: { ar: "هل تعملون مع مكاتب الرياض عن بُعد؟", en: "Do you work with Riyadh firms remotely?" }, a: { ar: "نعم، العمل كله عبر مكالمات وواتساب، مع عقد وفاتورة ودفع على مراحل.", en: "Yes, entirely over calls and WhatsApp, with a contract, invoices and phased payments." } },
    ],
  },
  {
    slug: "jeddah",
    name: { ar: "جدة", en: "Jeddah" },
    title: { ar: "تصميم مواقع مكاتب المحاماة في جدة | AM Design", en: "Law Firm Website Design in Jeddah | AM Design" },
    h1: { ar: "تصميم مواقع المحامين ومكاتب المحاماة في جدة.", en: "Website design for lawyers and law firms in Jeddah." },
    lead: { ar: "جدة مركز التجارة والموانئ في الغرب، وقضاياها التجارية والبحرية والعقارية كثيرة. نبني لمكتبك موقعًا يجذب هذه الفئات بلغتين.", en: "Jeddah is the west's trade and port hub, with heavy commercial, maritime and property caseloads. We build a bilingual site that draws them." },
    keywords: { ar: ["تصميم موقع محاماة جدة", "تصميم مواقع محامين بجدة", "تسويق مكاتب محاماة جدة"], en: ["law firm website Jeddah", "lawyer website design Jeddah"] },
    districts: ["الروضة", "الأندلس", "الشاطئ", "السلامة", "الزهراء", "النهضة", "البوادي", "الحمراء"],
    searches: ["محامي في جدة", "محامي تجاري جدة", "محامي عقاري جدة", "محامية جدة أحوال شخصية", "محامي قضايا بحرية"],
    local: [
      { ar: "صفحة للقضايا التجارية والجمركية المرتبطة بالميناء", en: "A page for port-related commercial and customs matters" },
      { ar: "ملف Google Business بأحياء الخدمة في جدة", en: "A Google Business Profile listing Jeddah service districts" },
      { ar: "نسخة إنجليزية للمستوردين والشركات الأجنبية", en: "An English version for importers and foreign companies" },
      { ar: "مقالات تجيب الأسئلة المحلية الشائعة", en: "Articles answering common local questions" },
    ],
    faq: [
      { q: { ar: "هل نحتاج صفحة منفصلة لكل مدينة إن كان لنا فرعان؟", en: "Do we need a page per city with two branches?" }, a: { ar: "نعم، صفحة لكل فرع بعنوانه وفريقه ورقمه، مع ملف جوجل لكل فرع.", en: "Yes, a page per branch with its address, team and number, and a Google profile for each." } },
      { q: { ar: "كم يستغرق ظهور الموقع في البحث؟", en: "How long until the site appears in search?" }, a: { ar: "الفهرسة خلال أيام، والترتيب على الكلمات التنافسية يحتاج أسابيع إلى أشهر من المحتوى والتحسين.", en: "Indexing within days; ranking on competitive terms takes weeks to months of content and tuning." } },
    ],
  },
  {
    slug: "dammam-khobar",
    name: { ar: "الدمام والخبر", en: "Dammam & Khobar" },
    title: { ar: "تصميم مواقع مكاتب المحاماة في الدمام والخبر | AM Design", en: "Law Firm Website Design in Dammam & Khobar | AM Design" },
    h1: { ar: "تصميم مواقع المحامين ومكاتب المحاماة في الدمام والخبر.", en: "Website design for lawyers and law firms in Dammam and Khobar." },
    lead: { ar: "المنطقة الشرقية سوق الطاقة والصناعة والشركات الكبرى، وقضاياها العمالية والتجارية واسعة. نبني لمكتبك موقعًا يخاطب الأفراد والشركات معًا.", en: "The Eastern Province is the energy, industry and big-company market, with large labour and commercial caseloads. We build a site that speaks to individuals and companies alike." },
    keywords: { ar: ["تصميم موقع محاماة الدمام", "تصميم موقع محامي الخبر", "تسويق مكاتب محاماة الشرقية"], en: ["law firm website Dammam", "lawyer website Khobar"] },
    districts: ["الشاطئ", "الفيصلية", "العقربية", "الراكة", "الحمراء", "الثقبة", "الجلوية", "الخزامى"],
    searches: ["محامي في الدمام", "محامي في الخبر", "محامي عمالي الشرقية", "محامي شركات الدمام", "محامي مقاولات الخبر"],
    local: [
      { ar: "صفحات للقضايا العمالية والمقاولات الشائعة في المنطقة", en: "Pages for the region's common labour and contracting matters" },
      { ar: "ملف Google Business لكل مدينة إن وُجد فرع", en: "A Google Business Profile per city where there is a branch" },
      { ar: "نسخة إنجليزية لموظفي الشركات الأجانب", en: "An English version for expatriate employees" },
      { ar: "مسار خاص بعقود الشركات السنوية", en: "A dedicated track for corporate annual retainers" },
    ],
    faq: [
      { q: { ar: "هل نستهدف الدمام والخبر بصفحة واحدة؟", en: "One page for Dammam and Khobar?" }, a: { ar: "نبدأ بصفحة مشتركة إن كان لديك مقر واحد، ونفصلها عند وجود فرعين أو عند نمو البحث المحلي.", en: "A shared page if you have one office, split once there are two branches or local demand grows." } },
      { q: { ar: "هل تديرون الإعلانات المحلية؟", en: "Do you run local ads?" }, a: { ar: "نعم ضمن خدمة التسويق الشهرية، باستهداف جغرافي للمنطقة الشرقية.", en: "Yes, under the monthly marketing service, geo-targeted to the Eastern Province." } },
    ],
  },
  {
    slug: "makkah",
    name: { ar: "مكة المكرمة", en: "Makkah" },
    title: { ar: "تصميم مواقع مكاتب المحاماة في مكة المكرمة | AM Design", en: "Law Firm Website Design in Makkah | AM Design" },
    h1: { ar: "تصميم مواقع المحامين ومكاتب المحاماة في مكة المكرمة.", en: "Website design for lawyers and law firms in Makkah." },
    lead: { ar: "سوق مكة يجمع قضايا العقار والأوقاف والأحوال الشخصية والاستثمار الفندقي. نبني لمكتبك موقعًا يظهر للباحث المحلي ويخدمه بوضوح.", en: "Makkah's market blends property, endowments, family and hospitality investment matters. We build a site that shows for local searches and serves them clearly." },
    keywords: { ar: ["تصميم موقع محاماة مكة", "تصميم مواقع محامين مكة المكرمة", "تسويق مكتب محاماة مكة"], en: ["law firm website Makkah", "lawyer website Makkah"] },
    districts: ["العزيزية", "الشوقية", "النسيم", "العوالي", "الزاهر", "الشرائع", "الرصيفة", "بطحاء قريش"],
    searches: ["محامي في مكة", "محامي عقاري مكة", "محامي أوقاف", "محامي أحوال شخصية مكة", "محامي ورث وتركات"],
    local: [
      { ar: "صفحات للعقار والأوقاف والتركات", en: "Pages for property, endowments and estates" },
      { ar: "ملف Google Business بأحياء مكة", en: "A Google Business Profile with Makkah districts" },
      { ar: "صفحة للمستثمرين في القطاع الفندقي", en: "A page for hospitality investors" },
      { ar: "تواصل سريع بواتساب لأهل المدينة والزوار", en: "Fast WhatsApp contact for residents and visitors" },
    ],
    faq: [
      { q: { ar: "هل صفحة المدينة مهمة إن كان المكتب صغيرًا؟", en: "Does a city page matter for a small firm?" }, a: { ar: "هي الأهم للمكتب الصغير؛ لأنها تنافس على البحث المحلي حيث المكاتب الكبيرة أضعف.", en: "It matters most for a small firm, competing on local search where big firms are weaker." } },
      { q: { ar: "ما الباقة المناسبة لمكتب فردي؟", en: "Which package suits a solo lawyer?" }, a: { ar: "الحضور الأساسي يكفي للبداية، ثم نضيف صفحات تخصص ومحتوى مع النمو.", en: "Essential presence is enough to start; we add practice pages and content as you grow." } },
    ],
  },
  {
    slug: "madinah",
    name: { ar: "المدينة المنورة", en: "Madinah" },
    title: { ar: "تصميم مواقع مكاتب المحاماة في المدينة المنورة | AM Design", en: "Law Firm Website Design in Madinah | AM Design" },
    h1: { ar: "تصميم مواقع المحامين ومكاتب المحاماة في المدينة المنورة.", en: "Website design for lawyers and law firms in Madinah." },
    lead: { ar: "في المدينة المنورة، المنافسة الرقمية بين المكاتب ما زالت محدودة — فرصة لمن يبني موقعًا جيدًا الآن ليتصدر البحث المحلي.", en: "In Madinah, digital competition among firms is still limited — an opening for whoever builds a good site now to lead local search." },
    keywords: { ar: ["تصميم موقع محاماة المدينة المنورة", "تصميم مواقع محامين المدينة", "تسويق مكتب محاماة المدينة"], en: ["law firm website Madinah", "lawyer website Madinah"] },
    districts: ["قباء", "العزيزية", "الراية", "العوالي", "سلطانة", "الحرة الشرقية", "شوران", "الخالدية"],
    searches: ["محامي في المدينة المنورة", "محامي أحوال شخصية المدينة", "محامي عقاري المدينة", "محامي عمالي المدينة", "مكتب محاماة المدينة"],
    local: [
      { ar: "ملف Google Business كامل مع صور المكتب", en: "A complete Google Business Profile with office photos" },
      { ar: "صفحة لكل تخصص مقرونة باسم المدينة", en: "Each practice page paired with the city name" },
      { ar: "مقالات محلية تبني السبق في البحث", en: "Local articles that build an early search lead" },
      { ar: "زر اتصال وواتساب ظاهر على الجوال", en: "Visible call and WhatsApp buttons on mobile" },
    ],
    faq: [
      { q: { ar: "لماذا الآن؟", en: "Why now?" }, a: { ar: "لأن أول من يبني محتوى محليًا جيدًا يحجز المراكز الأولى، ويصعب إزاحته لاحقًا.", en: "Because the first firm to build good local content takes the top positions and is hard to displace." } },
      { q: { ar: "هل تساعدون في إعداد ملف جوجل التجاري؟", en: "Do you set up the Google Business Profile?" }, a: { ar: "نعم، ضمن باقة موقع المكتب المتكامل، مع إرشادات طلب التقييمات من الموكّلين.", en: "Yes, within the Full firm website package, with guidance on requesting client reviews." } },
    ],
  },
];

export const getPractice = (slug: string) => PRACTICE_LANDINGS.find((x) => x.slug === slug);
export const getCity = (slug: string) => CITY_LANDINGS.find((x) => x.slug === slug);

/** Monthly growth services sold after launch, mapped to real store products. */
export const LEGAL_GROWTH = [
  { slug: "store-seo", name: { ar: "سيو مكتب المحاماة", en: "Law firm SEO" }, body: { ar: "صفحات التخصص والمدينة، المحتوى، وملف جوجل التجاري — شهريًا.", en: "Practice and city pages, content and Google Business Profile — monthly." } },
  { slug: "digital-marketing", name: { ar: "إعلانات جوجل وسناب للمكاتب", en: "Google & Snap ads for firms" }, body: { ar: "حملات بحث موجهة لكل تخصص بصفحة هبوط خاصة، وتقارير أسبوعية.", en: "Search campaigns per practice area with dedicated landing pages and weekly reports." } },
  { slug: "social-media-management", name: { ar: "إدارة حسابات المكتب", en: "Firm social media" }, body: { ar: "محتوى توعوي قانوني يبني الثقة على X ولينكدإن وإنستغرام.", en: "Educational legal content that builds trust on X, LinkedIn and Instagram." } },
] as const;
