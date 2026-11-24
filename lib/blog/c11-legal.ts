import type { Article } from "./types";

/* Articles written for lawyers, not merchants. Each one links into the
   lawyer landing pages, which is what lets the cluster lift them in search. */

export const LEGAL: Article[] = [
  {
    id: "law-firm-website-clients",
    cluster: "legal",
    titleAr: "كيف يجلب موقع مكتب المحاماة موكّلين من جوجل؟ دليل عملي للمحامين",
    titleEn: "How a law firm website brings in clients from Google: a practical guide",
    excerptAr: "أغلب مواقع المحاماة بطاقة تعريف لا تجلب أحدًا. هذه البنية التي تحوّل الباحث عن محامٍ إلى موعد استشارة.",
    excerptEn: "Most law firm sites are business cards that bring no one. This is the structure that turns a search into a consultation.",
    date: "2026-11-24",
    readTime: 7,
    keywordsAr: ["تصميم موقع محاماة", "تسويق مكتب محاماة", "كيف أجلب موكلين", "سيو المحامين"],
    keywordsEn: ["law firm website", "law firm marketing", "lawyer SEO"],
    faqAr: [
      ["كم يكلف موقع مكتب محاماة احترافي؟", "يبدأ موقع المكتب الفردي من نحو 2,900 ر.س، والموقع المتكامل بعدة تخصصات ولغتين من نحو 6,900 ر.س، والمنصات القانونية من 18,000 ر.س."],
      ["متى يبدأ الموقع بجلب موكّلين؟", "الفهرسة خلال أيام، والزيارات من البحث المحلي خلال أسابيع إذا وُجد ملف جوجل تجاري وصفحات تخصص، والكلمات التنافسية تحتاج أشهرًا من المحتوى."],
    ],
    contentAr: `
      <p>الموكّل اليوم لا يسأل صديقه أولًا؛ يكتب مشكلته في جوجل. «فُصلت من عملي ماذا أفعل»، «محامي أحوال شخصية في الرياض». السؤال الذي يحدد عدد موكّليك: هل يظهر مكتبك في تلك اللحظة، وماذا يجد الزائر حين يصل؟</p>

      <h2>1. صفحة لكل تخصص، لا صفحة واحدة لكل شيء</h2>
      <p>صفحة «خدماتنا» التي تعدّد عشرة مجالات لا تترتب على أي بحث محدد. من يبحث عن «محامي قضايا عمالية» يريد صفحة عن القضايا العمالية وحدها: المشكلة، الخطوات، المدة المتوقعة، الأسئلة، وزر الحجز. هذا ما نبنيه في <a href="/ar/solutions/legal/practice/labor-lawyer-website">صفحة المحامي العمالي</a> مثلًا.</p>

      <h2>2. صفحة للمدينة وملف جوجل التجاري</h2>
      <p>أغلب البحث القانوني محلي. ملف Google Business موثّق بعنوان المكتب وساعاته وصوره وتقييمات موكّليه الحقيقية، مع صفحة في الموقع تذكر المدينة والأحياء، هو أسرع طريق للظهور في الخرائط. راجع ما نبنيه لمكاتب <a href="/ar/solutions/legal/city/riyadh">الرياض</a> و<a href="/ar/solutions/legal/city/jeddah">جدة</a>.</p>

      <h2>3. دليل ثقة حقيقي</h2>
      <p>الموكّل يشتري الثقة قبل الخدمة. رقم الترخيص، سنوات الخبرة، ملف كل محامٍ بتخصصاته ولغاته، ودراسات حالة مجهولة الهوية تذكر نوع النزاع ومساره — دون وعد بنتيجة ودون أسماء أطراف.</p>

      <h2>4. طريق قصير إلى أول مكالمة</h2>
      <p>أغلب طلبات الاستشارة تأتي من الجوال ليلًا. نموذج من عشرة حقول يخسر نصف الطلبات. خطوتان تكفيان: نوع القضية ورقم التواصل، ويصل الطلب لواتساب المكتب فورًا.</p>

      <h2>5. محتوى يجيب الأسئلة الحرفية</h2>
      <p>مقال يجيب «كم مدة القضية العمالية؟» يجلب زيارات لسنوات بتكلفة شبه صفرية. اكتب ما يسأله موكّلوك في المكالمة الأولى، وانشره بعد مراجعة محامٍ من مكتبك.</p>

      <h2>6. السرعة على الجوال</h2>
      <p>موقع يتأخر ثلاث ثوانٍ على الجوال يخسر جزءًا كبيرًا من زواره قبل أن يروا اسم المكتب. السرعة ليست تفصيلًا تقنيًا؛ هي أول انطباع.</p>

      <h2>الخلاصة</h2>
      <p>الموقع الذي يجلب موكّلين ليس الأجمل، بل الأوضح: صفحة للسؤال، دليل على الخبرة، وزر قريب. إن أردت نرسل لك <a href="/ar/solutions/legal">مراجعة مجانية لموقع مكتبك</a> بملاحظات مكتوبة.</p>
    `,
    contentEn: `
      <p>Clients no longer ask a friend first; they type their problem into Google. Whether your firm appears at that moment, and what the visitor finds, decides your caseload.</p>
      <h2>1. A page per practice area</h2>
      <p>A services page listing ten areas ranks for nothing. Someone searching for an employment lawyer wants a page about employment law alone, ending in a booking button.</p>
      <h2>2. A city page and a Google Business Profile</h2>
      <p>Legal search is local. A verified profile with genuine reviews, plus a page naming your city and districts, is the fastest route into Maps.</p>
      <h2>3. Real proof</h2>
      <p>Licence number, years in practice, lawyer profiles and anonymised case studies — without promising outcomes.</p>
      <h2>4. A short path to the first call</h2>
      <p>Two fields — case type and phone — sent straight to the firm's WhatsApp.</p>
      <h2>5. Content that answers literal questions</h2>
      <p>One article answering "how long does a labour case take?" brings visitors for years.</p>
      <p>Want a written review of your site? <a href="/en/solutions/legal">Request a free review</a>.</p>
    `,
  },
  {
    id: "google-business-profile-lawyers",
    cluster: "legal",
    titleAr: "ملف جوجل التجاري لمكاتب المحاماة: كيف تظهر في الخرائط حين يبحث أحد عن «محامي قريب مني»",
    titleEn: "Google Business Profile for law firms: showing up for 'lawyer near me'",
    excerptAr: "أرخص قناة لجلب موكّلين محليين، وأكثرها إهمالًا. الخطوات من الإنشاء إلى التقييمات.",
    excerptEn: "The cheapest local client channel, and the most neglected. From setup to reviews.",
    date: "2026-11-23",
    readTime: 6,
    keywordsAr: ["ملف جوجل التجاري للمحامين", "محامي قريب مني", "ظهور مكتب المحاماة في خرائط جوجل"],
    keywordsEn: ["Google Business Profile lawyers", "lawyer near me SEO"],
    faqAr: [
      ["هل يمكن إنشاء ملف جوجل لمكتب في شقة أو مكتب مشترك؟", "نعم إن كان العنوان يستقبل الموكّلين فعليًا وفي ساعات محددة؛ العناوين الوهمية تُعلّق عادة."],
      ["هل يجوز طلب التقييمات من الموكّلين؟", "يجوز طلبها بلطف بعد انتهاء الخدمة، دون مقابل ودون كتابتها نيابة عنهم، مع مراعاة السرية المهنية في الرد عليها."],
    ],
    contentAr: `
      <p>حين يكتب أحد «محامي قريب مني» أو «مكتب محاماة في جدة»، تظهر الخريطة قبل أي موقع. ثلاثة مكاتب فقط تظهر في تلك الخريطة، والباقي يحتاج نقرة إضافية لا يضغطها أحد تقريبًا.</p>

      <h2>الإنشاء والتوثيق</h2>
      <ul>
        <li>اسم المكتب كما هو في الترخيص — بلا كلمات مفتاحية محشوّة.</li>
        <li>الفئة الأساسية «مكتب محاماة» أو «محامٍ»، وفئات ثانوية حسب التخصص.</li>
        <li>عنوان حقيقي يستقبل الموكّلين، وساعات عمل دقيقة.</li>
        <li>رابط يذهب إلى صفحة المدينة في موقعك، لا للصفحة الرئيسية فقط.</li>
      </ul>

      <h2>ما الذي يرفع الترتيب فعلًا</h2>
      <p>القرب من الباحث، ثم الصلة (هل الملف والموقع يتحدثان عن التخصص المطلوب؟)، ثم البروز: التقييمات وعددها وحداثتها، وذكر المكتب في مواقع أخرى. صفحة المدينة في الموقع تقوّي «الصلة» مباشرة؛ انظر مثال <a href="/ar/solutions/legal/city/dammam-khobar">مكاتب الدمام والخبر</a>.</p>

      <h2>الصور والمنشورات</h2>
      <p>صور حقيقية للمكتب من الخارج والداخل وللفريق ترفع معدل النقر. منشور شهري قصير عن تحديث نظامي أو سؤال شائع يبقي الملف نشطًا.</p>

      <h2>التقييمات دون مخالفة</h2>
      <p>اطلبها بعد انتهاء الخدمة برسالة لطيفة ورابط مباشر. لا تقييمات مدفوعة، ولا تكتبها نيابة عن أحد. في الرد، اشكر دون ذكر أي تفصيل عن القضية.</p>

      <h2>اربط الملف بالموقع</h2>
      <p>الملف يجلب النقرة، والموقع يقنع. لذلك نبني لكل مكتب صفحة مدينة وصفحات تخصص تكمل ما يبدأه الملف. <a href="/ar/solutions/legal">شاهد الباقات</a>.</p>
    `,
    contentEn: `
      <p>When someone searches "lawyer near me", the map appears before any website — and only three firms show in it.</p>
      <h2>Setup</h2>
      <ul><li>Your licensed firm name, no keyword stuffing.</li><li>Primary category "Law firm", secondary by practice.</li><li>A real address that receives clients.</li><li>Link to your city page, not just the homepage.</li></ul>
      <h2>What ranks</h2>
      <p>Proximity, relevance and prominence: reviews and mentions. A city page on your site strengthens relevance.</p>
      <h2>Reviews without a breach</h2>
      <p>Ask after the matter closes, never pay for them, and reply without any case detail.</p>
      <p><a href="/en/solutions/legal">See law firm website packages</a>.</p>
    `,
  },
  {
    id: "lawyer-online-marketing-rules",
    cluster: "legal",
    titleAr: "تسويق المحامي إلكترونيًا في السعودية: ما المسموح وما الذي يضر سمعتك",
    titleEn: "Online marketing for lawyers in Saudi Arabia: what works and what hurts",
    excerptAr: "التسويق للمحامي ليس إعلان منتج. حدود واضحة تحمي سمعتك، وقنوات تعمل دون أن تخالف أخلاقيات المهنة.",
    excerptEn: "Marketing a law practice is not advertising a product. Clear limits that protect your reputation, and channels that work.",
    date: "2026-11-22",
    readTime: 6,
    keywordsAr: ["تسويق المحامي", "ضوابط إعلان المحامين", "تسويق مكتب محاماة في السعودية"],
    keywordsEn: ["lawyer marketing Saudi Arabia", "law firm advertising rules"],
    faqAr: [
      ["أين أجد الضوابط الرسمية؟", "ارجع إلى نظام المحاماة ولائحته التنفيذية وما تصدره الهيئة السعودية للمحامين من قواعد السلوك المهني، فهي المرجع لا هذا المقال."],
      ["هل الإعلانات المدفوعة مسموحة للمحامي؟", "تعامل معها بحذر وراجع الضوابط المعتمدة؛ كثير من المكاتب تكتفي بالظهور العضوي والمحتوى التوعوي وملف جوجل لأنها أقل حساسية."],
    ],
    contentAr: `
      <p><strong>تنبيه:</strong> هذا مقال تسويقي عام وليس رأيًا قانونيًا. المرجع في ضوابط الإعلان هو نظام المحاماة ولائحته وقواعد السلوك المهني الصادرة عن الهيئة السعودية للمحامين.</p>

      <h2>ما يبني السمعة دون أي حساسية</h2>
      <ul>
        <li><strong>المحتوى التوعوي:</strong> شرح الإجراءات والمدد والمستندات بلغة بسيطة.</li>
        <li><strong>موقع واضح:</strong> بيانات الترخيص، التخصصات، ملفات المحامين.</li>
        <li><strong>ملف جوجل التجاري:</strong> عنوان وساعات وتقييمات حقيقية.</li>
        <li><strong>لينكدإن وX:</strong> تعليقات مهنية على التحديثات النظامية.</li>
      </ul>

      <h2>ما يضر غالبًا</h2>
      <ul>
        <li>الوعد بكسب القضية أو بنتيجة محددة.</li>
        <li>ذكر أسماء الموكّلين أو تفاصيل تكشفهم دون إذن.</li>
        <li>المقارنة المسيئة بالمكاتب الأخرى.</li>
        <li>عبارات المبالغة مثل «الأفضل في المملكة» دون دليل.</li>
      </ul>

      <h2>كيف نكتب صفحات المحامي</h2>
      <p>نصف الخدمة والخبرة والإجراءات، ونضيف إشعار «لا يُعد استشارة قانونية»، ويعتمد محامٍ من المكتب كل نص قبل النشر. هكذا نبني صفحات مثل <a href="/ar/solutions/legal/practice/criminal-lawyer-website">صفحة المحامي الجنائي</a> التي لا تَعِد بنتيجة.</p>

      <h2>القناة الأعلى عائدًا</h2>
      <p>لمعظم المكاتب: صفحات تخصص ومدينة تترتب في البحث، مع ملف جوجل وتقييمات. تكلفتها تُدفع مرة وتعمل لسنوات. <a href="/ar/solutions/legal">اطلب مراجعة مجانية لموقعك</a>.</p>
    `,
    contentEn: `
      <p><strong>Note:</strong> general marketing guidance, not legal advice. The reference is the Law of Practice and the Saudi Bar Association's conduct rules.</p>
      <h2>Safe and effective</h2>
      <ul><li>Educational content explaining procedure.</li><li>A clear site with licence details and profiles.</li><li>A Google Business Profile with genuine reviews.</li><li>Professional commentary on LinkedIn and X.</li></ul>
      <h2>Usually harmful</h2>
      <ul><li>Promising outcomes.</li><li>Naming clients without consent.</li><li>Disparaging other firms.</li></ul>
      <p><a href="/en/solutions/legal">Request a free review of your site</a>.</p>
    `,
  },
];
