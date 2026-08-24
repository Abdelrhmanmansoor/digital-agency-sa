/* ═══════════════════════════════════════════════════════════════════════════
   LEGAL SECTOR — content for /solutions/legal
   Kept out of the component so the copy can be reviewed, translated and
   fed to structured data without reading JSX. Arabic is the source of
   truth; French falls back to English.
═══════════════════════════════════════════════════════════════════════════ */

export type Pair = { ar: string; en: string };

/* ─── 1. Why most law firm sites do not bring clients ───────────────────── */
export const OBJECTIONS: { problem: Pair; consequence: Pair }[] = [
  {
    problem: { ar: "الصفحة الرئيسية تتحدث عن المكتب، لا عن مشكلة الموكّل", en: "The homepage talks about the firm, not the client's problem" },
    consequence: { ar: "الزائر لا يجد نفسه في النص خلال أول عشر ثوانٍ، فيغادر.", en: "The visitor does not see their own situation in the first ten seconds, and leaves." },
  },
  {
    problem: { ar: "صفحة واحدة تجمع كل التخصصات", en: "One page listing every practice area" },
    consequence: { ar: "لا توجد صفحة تستحق الترتيب على «محامي قضايا عمالية» أو «محامي تنفيذ»، فتضيع الزيارات المؤهلة.", en: "No page can rank for a specific intent, so qualified searches never arrive." },
  },
  {
    problem: { ar: "لا يوجد دليل على النتائج", en: "No evidence of outcomes" },
    consequence: { ar: "الموكّل يشتري ثقة قبل أن يشتري خدمة، وبدون سوابق أو أرقام يبقى التردد قائمًا.", en: "Clients buy trust before service; without precedent the hesitation stays." },
  },
  {
    problem: { ar: "طريق الاتصال طويل: نموذج من عشرة حقول أو رقم فقط", en: "A ten-field form, or a bare phone number" },
    consequence: { ar: "أغلب طلبات الاستشارة تأتي من الجوال ليلًا؛ كل حقل إضافي يقتطع من عدد الطلبات.", en: "Most enquiries arrive on mobile at night; every extra field costs enquiries." },
  },
  {
    problem: { ar: "بطء وتصميم غير متجاوب", en: "Slow, and not built for mobile" },
    consequence: { ar: "أكثر من ثلثي الباحثين عن محامٍ يفتحون الموقع من الجوال أولًا.", en: "Two thirds of people searching for a lawyer open the site on a phone first." },
  },
  {
    problem: { ar: "لا شيء يفصل المكتب عن منافسيه", en: "Nothing separates the firm from its competitors" },
    consequence: { ar: "عشرة مواقع بنفس القالب ونفس صورة الميزان تعني أن القرار يعود للسعر وحده.", en: "Ten sites on the same template means the decision falls back to price." },
  },
];

/* ─── 2. What the build actually includes ───────────────────────────────── */
export const DELIVERABLES: { title: Pair; body: Pair }[] = [
  {
    title: { ar: "صفحة مستقلة لكل تخصص", en: "A page per practice area" },
    body: { ar: "كل مجال يحصل على صفحته: المشكلة، ما نفعله، المدة المتوقعة، الأسئلة، ونموذج حجز في نهايتها. هذه الصفحات هي ما يترتب في البحث.", en: "Each area gets its own page: the problem, the process, expected timelines, questions, and a booking form at the end. These are the pages that rank." },
  },
  {
    title: { ar: "ملفات الشركاء والمحامين", en: "Partner and associate profiles" },
    body: { ar: "صورة احترافية، الترخيص، سنوات الخبرة، المجالات، اللغات، والقضايا التي يقودها كل محامٍ — الموكّل يوظّف شخصًا لا شعارًا.", en: "Photo, licence, years of practice, areas, languages and the matters each lawyer leads. Clients hire a person, not a logo." },
  },
  {
    title: { ar: "دراسات حالة بصيغة تحترم السرية", en: "Case studies that respect confidentiality" },
    body: { ar: "نوع النزاع، حجمه، المسار، والنتيجة — دون أسماء ولا تفاصيل تكشف الأطراف. دليل حقيقي بلا مخالفة مهنية.", en: "Dispute type, scale, route and outcome, with no names and no identifying detail. Real proof without a professional breach." },
  },
  {
    title: { ar: "حجز استشارة في خطوتين", en: "Two-step consultation booking" },
    body: { ar: "نوع القضية ثم رقم التواصل. الباقي يُسأل في المكالمة. يتزامن مع التقويم ويصل إشعار فوري على واتساب.", en: "Case type, then a contact number. The rest is asked on the call. Syncs to a calendar with an instant WhatsApp alert." },
  },
  {
    title: { ar: "مركز محتوى قانوني", en: "A legal content hub" },
    body: { ar: "مقالات تجيب على ما يبحث عنه الموكّل فعلًا: «كم مدة قضية عمالية؟»، «كيف أعترض على حكم؟» — وهي أرخص مصدر عملاء على المدى الطويل.", en: "Articles answering what clients actually search. Long-term, the cheapest acquisition channel a firm has." },
  },
  {
    title: { ar: "بوابة موكّل خاصة", en: "A private client portal" },
    body: { ar: "متابعة مراحل القضية، الملفات، الفواتير والمواعيد بحساب مستقل لكل موكّل — يقلّل مكالمات المتابعة بشكل ملموس.", en: "Case stages, documents, invoices and appointments per client. It visibly reduces status-chasing calls." },
  },
  {
    title: { ar: "عربي وإنجليزي بالكامل", en: "Full Arabic and English" },
    body: { ar: "نسختان حقيقيتان لا ترجمة آلية، مع اتجاه صحيح للنص وروابط hreflang — ضروري لأي مكتب يخدم شركات أجنبية.", en: "Two real versions, correct text direction and hreflang. Essential for any firm serving foreign companies." },
  },
  {
    title: { ar: "امتثال ونشر", en: "Compliance and launch" },
    body: { ar: "إشعار «لا يُعد استشارة قانونية»، سياسة خصوصية، بيانات الترخيص، شهادة SSL، ونسخ احتياطي — وتسليم مع تدريب.", en: "A no-advice notice, privacy policy, licence details, SSL and backups, handed over with training." },
  },
];

/* ─── 3. Practice areas — each becomes its own landing page ─────────────── */
export const PRACTICE_AREAS: { key: string; name: Pair; hint: Pair }[] = [
  { key: "commercial", name: { ar: "القضايا التجارية", en: "Commercial disputes" }, hint: { ar: "نزاعات الشركات والعقود والشراكات", en: "Company, contract and partnership disputes" } },
  { key: "labor", name: { ar: "القضايا العمالية", en: "Labour law" }, hint: { ar: "الفصل التعسفي والمستحقات والاعتراض", en: "Dismissal, entitlements and appeals" } },
  { key: "family", name: { ar: "الأحوال الشخصية", en: "Family law" }, hint: { ar: "الحضانة والنفقة والقسمة", en: "Custody, maintenance and division" } },
  { key: "realestate", name: { ar: "القضايا العقارية", en: "Real estate" }, hint: { ar: "الإفراغ والملكية ونزاعات الإيجار", en: "Title, transfer and tenancy disputes" } },
  { key: "ip", name: { ar: "الملكية الفكرية", en: "Intellectual property" }, hint: { ar: "العلامات التجارية والحقوق الرقمية", en: "Trademarks and digital rights" } },
  { key: "arbitration", name: { ar: "التحكيم والوساطة", en: "Arbitration" }, hint: { ar: "التحكيم التجاري وتسوية النزاعات", en: "Commercial arbitration and settlement" } },
  { key: "corporate", name: { ar: "تأسيس الشركات والحوكمة", en: "Corporate and governance" }, hint: { ar: "التأسيس والعقود والامتثال", en: "Incorporation, contracts and compliance" } },
  { key: "enforcement", name: { ar: "التنفيذ وتحصيل الديون", en: "Enforcement and collection" }, hint: { ar: "طلبات التنفيذ ومتابعة التحصيل", en: "Enforcement filings and collection" } },
  { key: "criminal", name: { ar: "القضايا الجنائية", en: "Criminal defence" }, hint: { ar: "الدفاع والتمثيل أمام الدوائر", en: "Defence and representation" } },
  { key: "insurance", name: { ar: "التأمين والتعويضات", en: "Insurance and claims" }, hint: { ar: "مطالبات التعويض ونزاعات الوثائق", en: "Compensation claims and policy disputes" } },
];

/* ─── 4. Platform work beyond a website ─────────────────────────────────── */
export const PLATFORMS: { title: Pair; body: Pair; points: Pair[] }[] = [
  {
    title: { ar: "منصة استشارات قانونية عن بُعد", en: "Remote legal consultation platform" },
    body: { ar: "سوق مصغّر يربط الباحث عن استشارة بمحامٍ مرخّص: حجز، دفع، مكالمة، وتقييم — بنموذج عمولة أو اشتراك.", en: "A marketplace connecting a person to a licensed lawyer: booking, payment, call and rating, on commission or subscription." },
    points: [
      { ar: "ملفات محامين موثّقة برقم الترخيص", en: "Verified profiles with licence numbers" },
      { ar: "حجز ودفع ومكالمة مرئية داخل المنصة", en: "Booking, payment and video call in-platform" },
      { ar: "محفظة ومحاسبة وتسوية دورية", en: "Wallet, accounting and periodic settlement" },
    ],
  },
  {
    title: { ar: "نظام إدارة قضايا لمكتب المحاماة", en: "Case management system" },
    body: { ar: "لوحة داخلية تحل محل ملفات إكسل: القضايا، الجلسات، المهام، المستندات، ساعات العمل والفوترة في مكان واحد.", en: "An internal console replacing spreadsheets: matters, hearings, tasks, documents, billable hours and invoicing in one place." },
    points: [
      { ar: "تنبيهات الجلسات والمواعيد النظامية", en: "Hearing and statutory deadline alerts" },
      { ar: "صلاحيات لكل دور داخل المكتب", en: "Per-role permissions inside the firm" },
      { ar: "تقارير الإنتاجية والتحصيل", en: "Productivity and collection reporting" },
    ],
  },
  {
    title: { ar: "مولّد عقود ووثائق", en: "Contract and document generator" },
    body: { ar: "قوالب عقود يملؤها العميل بنفسه عبر أسئلة متسلسلة، وتخرج بصيغة PDF جاهزة للتوقيع — منتج رقمي يُباع بالاشتراك.", en: "Contract templates the client fills through guided questions and exports as a signature-ready PDF. A subscription product." },
    points: [
      { ar: "قوالب مراجَعة من محامٍ مرخّص", en: "Templates reviewed by a licensed lawyer" },
      { ar: "تعبئة ذكية وتصدير PDF", en: "Guided fill and PDF export" },
      { ar: "اشتراك شهري أو دفع لكل وثيقة", en: "Monthly plan or pay-per-document" },
    ],
  },
  {
    title: { ar: "بوابة موكّلين للشركات", en: "Corporate client portal" },
    body: { ar: "للمكاتب التي تخدم شركات: لوحة لكل عميل تعرض القضايا المفتوحة، الاستهلاك من العقد السنوي، والمستندات.", en: "For firms serving companies: a per-client console showing open matters, retainer usage and documents." },
    points: [
      { ar: "متابعة استهلاك العقد السنوي", en: "Retainer consumption tracking" },
      { ar: "رفع واعتماد المستندات", en: "Document upload and approval" },
      { ar: "تقارير شهرية آلية", en: "Automated monthly reports" },
    ],
  },
];

/* ─── 5. Reference sites — linked, never copied ─────────────────────────── */
export const REFERENCES: { name: string; url: string; note: Pair; tag: Pair }[] = [
  {
    name: "Quinn Emanuel",
    url: "https://www.quinnemanuel.com/",
    tag: { ar: "تقاضٍ دولي", en: "Global litigation" },
    note: { ar: "بنية معلومات ضخمة تُقاد بالنتائج: كل قضية كبرى صفحة، وكل صفحة تنتهي بمحامٍ محدد.", en: "A results-led information architecture: every landmark matter is a page, and every page ends at a named lawyer." },
  },
  {
    name: "Bick Law LLP",
    url: "https://www.bicklawllp.com/",
    tag: { ar: "بيئي وتنظيمي", en: "Environmental" },
    note: { ar: "مرشّح لجائزة Webby — يثبت أن مكتب محاماة يستطيع امتلاك شخصية بصرية دون فقدان الجدية.", en: "A Webby nominee, and proof a firm can hold a visual personality without losing gravity." },
  },
  {
    name: "Hudgell Solicitors",
    url: "https://www.hudgellsolicitors.co.uk/",
    tag: { ar: "إصابات وتعويضات", en: "Personal injury" },
    note: { ar: "ضاعف التحويلات خلال عام واحد بعد إعادة بناء الموقع حول مسار الاستشارة.", en: "Doubled conversions in a year after rebuilding around the enquiry path." },
  },
  {
    name: "شركة العزام والشانف",
    url: "https://shanefazaam.com/",
    tag: { ar: "السعودية", en: "Saudi Arabia" },
    note: { ar: "مثال محلي على عرض التغطية الجغرافية والترخيص بوضوح في أعلى الصفحة.", en: "A local example that puts licensing and geographic coverage high on the page." },
  },
  {
    name: "مكتب د. محمد العيسى",
    url: "https://www.aleissalawfirm.com/",
    tag: { ar: "السعودية", en: "Saudi Arabia" },
    note: { ar: "أقدمية المكتب مستخدمة كإشارة ثقة أساسية بدل أن تكون سطرًا في صفحة «من نحن».", en: "Firm seniority used as a primary trust signal rather than a line in an About page." },
  },
  {
    name: "حقوقك للمحاماة",
    url: "https://www.hoqoqk.com/",
    tag: { ar: "السعودية", en: "Saudi Arabia" },
    note: { ar: "تقسيم واضح للخدمات القانونية يجعل الزائر يصل لتخصصه دون قراءة الصفحة كاملة.", en: "A clear service split that lets a visitor reach their area without reading the whole page." },
  },
];

/* ─── 6. Packages — real scopes, real numbers ───────────────────────────── */
export const PACKAGES: {
  key: string;
  name: Pair;
  price: number;
  days: number;
  best?: boolean;
  summary: Pair;
  includes: Pair[];
}[] = [
  {
    key: "presence",
    name: { ar: "الحضور الأساسي", en: "Essential presence" },
    price: 2900,
    days: 10,
    summary: { ar: "لمكتب فردي يريد موقعًا يستحق أن يُرسل رابطه لموكّل.", en: "For a solo practice that needs a link worth sending to a client." },
    includes: [
      { ar: "خمس صفحات: الرئيسية، عن المكتب، التخصصات، المقالات، التواصل", en: "Five pages: home, about, areas, articles, contact" },
      { ar: "ثلاث صفحات تخصص مستقلة", en: "Three standalone practice-area pages" },
      { ar: "نموذج حجز استشارة مربوط بواتساب", en: "Consultation form wired to WhatsApp" },
      { ar: "إعداد SEO تقني وخريطة موقع", en: "Technical SEO and sitemap" },
      { ar: "عربي كامل مع دعم الاتجاه", en: "Full Arabic with correct direction" },
    ],
  },
  {
    key: "firm",
    name: { ar: "موقع مكتب متكامل", en: "Full firm website" },
    price: 6900,
    days: 21,
    best: true,
    summary: { ar: "الخيار المناسب لمكتب بعدة محامين وتخصصات متعددة يريد أن يترتب في البحث.", en: "The right fit for a multi-lawyer firm that wants to rank." },
    includes: [
      { ar: "كل ما في الباقة الأساسية", en: "Everything in Essential" },
      { ar: "عشر صفحات تخصص مُحسّنة للبحث", en: "Ten search-optimised practice pages" },
      { ar: "ملفات المحامين ودراسات الحالة", en: "Lawyer profiles and case studies" },
      { ar: "عربي وإنجليزي بالكامل", en: "Full Arabic and English" },
      { ar: "مدونة قانونية بلوحة تحرير", en: "Legal blog with an editor" },
      { ar: "بيانات منظمة LegalService وتقييمات", en: "LegalService structured data" },
      { ar: "شهر متابعة وتحسين بعد الإطلاق", en: "One month of post-launch tuning" },
    ],
  },
  {
    key: "platform",
    name: { ar: "منصة قانونية", en: "Legal platform" },
    price: 18000,
    days: 45,
    summary: { ar: "لبناء منتج رقمي: بوابة موكّلين، نظام قضايا، أو منصة استشارات.", en: "For a digital product: client portal, case system or consultation platform." },
    includes: [
      { ar: "تحليل ونطاق عمل موثّق قبل البرمجة", en: "Documented analysis and scope first" },
      { ar: "لوحة تحكم وصلاحيات متعددة الأدوار", en: "Multi-role console and permissions" },
      { ar: "حسابات موكّلين ومستندات وفوترة", en: "Client accounts, documents and billing" },
      { ar: "ربط بوابة دفع ومزوّد رسائل", en: "Payment gateway and messaging provider" },
      { ar: "استضافة ونسخ احتياطي ومراقبة", en: "Hosting, backups and monitoring" },
      { ar: "تدريب الفريق وتوثيق تشغيلي", en: "Team training and runbook" },
    ],
  },
];

/* ─── 7. FAQ — also emitted as FAQPage structured data ──────────────────── */
export const LEGAL_FAQ: { q: Pair; a: Pair }[] = [
  {
    q: { ar: "هل تلتزمون بضوابط الإعلان لمكاتب المحاماة في السعودية؟", en: "Do you follow Saudi advertising rules for law firms?" },
    a: { ar: "نعم. نبني المحتوى على وصف الخدمة والخبرة دون وعد بنتيجة أو ضمان كسب قضية، ونعرض رقم الترخيص وبيانات المكتب، ونضيف إشعارًا بأن محتوى الموقع لا يُعد استشارة قانونية. المراجعة النهائية للنص تبقى لديك قبل النشر.", en: "Yes. Content describes services and experience without promising outcomes, licence details are shown, and a notice states the site is not legal advice. Final copy approval stays with you before launch." },
  },
  {
    q: { ar: "كم يستغرق بناء موقع مكتب محاماة؟", en: "How long does a law firm website take?" },
    a: { ar: "من 10 أيام عمل للباقة الأساسية، و21 يومًا لموقع مكتب متكامل، و45 يومًا فأكثر للمنصات. العامل الأبطأ عادةً ليس التطوير بل انتظار النصوص وصور المحامين، ولذلك نرسل قائمة المواد المطلوبة في اليوم الأول.", en: "From 10 working days for Essential, 21 for a full firm site and 45 or more for platforms. The slowest factor is usually waiting on copy and lawyer photos, so we send the asset list on day one." },
  },
  {
    q: { ar: "هل تكتبون المحتوى القانوني؟", en: "Do you write the legal content?" },
    a: { ar: "نكتب المسودة الكاملة لكل صفحة بناءً على جلسة معك، ثم يراجعها محامٍ من مكتبك ويعتمدها. لا ننشر رأيًا قانونيًا دون اعتماد مهني.", en: "We draft every page from a session with you, then a lawyer at your firm reviews and signs off. No legal position is published without professional approval." },
  },
  {
    q: { ar: "هل أستطيع تحديث الموقع بنفسي بعد التسليم؟", en: "Can I update the site myself after handover?" },
    a: { ar: "نعم. المقالات وملفات المحامين ودراسات الحالة تُدار من لوحة تحرير بسيطة، ويشمل التسليم تدريبًا مسجّلًا. التغييرات الهيكلية تبقى لدينا ضمن باقة الدعم.", en: "Yes. Articles, lawyer profiles and case studies are managed from a simple editor, and handover includes recorded training. Structural changes stay with us under support." },
  },
  {
    q: { ar: "ماذا لو كان لدي موقع بالفعل؟", en: "What if I already have a site?" },
    a: { ar: "نبدأ بمراجعة مكتوبة: ما الذي يترتب في البحث اليوم، أين يتوقف الزائر، وما الذي يستحق النقل. في كثير من الحالات إعادة بناء الصفحات المهمة أسرع وأرخص من ترقيع قالب قديم — وسنقول لك ذلك بصراحة.", en: "We start with a written review: what ranks today, where visitors stop and what is worth keeping. Often rebuilding the pages that matter is faster and cheaper than patching an old template, and we will say so." },
  },
  {
    q: { ar: "هل تعملون خارج السعودية؟", en: "Do you work outside Saudi Arabia?" },
    a: { ar: "نعم، ونبني بنسختين عربية وإنجليزية عندما يخدم المكتب عملاء أجانب. الضوابط المهنية تختلف من دولة لأخرى، لذا نلتزم بما يعتمده مكتبك.", en: "Yes, and we build Arabic and English versions when the firm serves foreign clients. Professional rules differ by jurisdiction, so we follow what your firm approves." },
  },
];
