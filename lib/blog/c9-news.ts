import type { Article } from "./types";

/* Platform news cluster.
   Every update described here was read on the platforms' own channels in
   November 2026: Salla's official news feed in its merchant community
   (community.salla.sa, "أخبار سلة"), Salla's LEAP 2026 post, zid.sa and Zid's
   developer blog. Where a figure is the platform's own claim it is said so;
   where a point comes from a secondary source it is flagged in the text. */

export const NEWS: Article[] = [
  /* ═══ 1 ═══ */
  {
    id: "salla-updates-2026",
    cluster: "news",
    titleAr: "تحديثات سلة 2026: كل الميزات الجديدة للتجار وما تعنيه لمتجرك",
    titleEn: "Salla updates in 2026: every new merchant feature and what it means for your store",
    excerptAr: "قطاف، بطاقات الهدايا، الشحن المبرد، البحث الذكي، مشمّر، أبل باي من أي جهاز — جولة عملية في أحدث تحديثات منصة سلة وكيف تستفيد من كل واحد.",
    excerptEn: "Qitaf, gift cards, chilled shipping, smart search, Mushammer and Apple Pay on any device — a practical tour of Salla's latest updates.",
    date: "2026-11-02",
    readTime: 11,
    keywordsAr: ["تحديثات سلة", "مميزات سلة الجديدة", "منصة سلة 2026", "أخبار سلة", "ميزات متجر سلة", "تطوير متجر سلة"],
    keywordsEn: ["Salla updates 2026", "Salla new features", "Salla platform news"],
    contentAr: `
      <p>تطلق منصة سلة تحديثات بوتيرة أسبوعية تقريبًا، وتنشرها في قسم «أخبار سلة» داخل مجتمعها الرسمي للتجار. المشكلة أن أغلب التجار لا يتابعونها، فيبقى متجرهم يعمل بإعدادات العام الماضي بينما المنصة نفسها أضافت أدوات ترفع المبيعات مجانًا. في هذا المقال جمعنا أهم <strong>تحديثات سلة في 2026</strong> مرتبة حسب أثرها على المبيعات، مع ما يجب أن تفعله في متجرك اليوم.</p>

      <h2>أولًا: تحديثات الدفع — خيارات أكثر تعني سلات متروكة أقل</h2>
      <h3>قطاف من STC</h3>
      <p>أضافت سلة <strong>قطاف</strong> كوسيلة دفع، وهو برنامج نقاط الولاء من STC. الفكرة بسيطة: عميل يملك رصيد نقاط يستطيع استخدامه في متجرك. هذا يفتح لك شريحة عملاء تبحث عن مكان «تصرف» فيه نقاطها، وهي شريحة تشتري بقرار أسرع لأنها لا تشعر أنها تدفع من جيبها.</p>
      <p><strong>ماذا تفعل:</strong> فعّل قطاف من إعدادات طرق الدفع، ثم أعلن عنه في شريط الإعلانات أعلى المتجر وفي صفحة السلة — الوسيلة التي لا يعرف العميل أنها متاحة لا تبيع.</p>

      <h3>أبل باي من أي جهاز</h3>
      <p>صار بالإمكان تفعيل الدفع بأبل باي بتجربة أكثر مرونة للعملاء. أبل باي من أعلى وسائل الدفع تحويلًا على الجوال لأنه يختصر إدخال بيانات البطاقة بالكامل، وكل خطوة تُحذف من صفحة الدفع تعني نسبة أقل من التخلي عن السلة.</p>

      <h3>الاشتراك في باقات سلة عبر الآيبان الافتراضي</h3>
      <p>للتاجر نفسه: أصبح دفع رسوم باقة سلة ممكنًا بالتحويل البنكي عبر آيبان افتراضي دون انتظار تأكيد يدوي. تفصيلة صغيرة لكنها تحل مشكلة متكررة كان يتوقف فيها المتجر لأن التحويل لم يُطابق بعد.</p>

      <h2>ثانيًا: تحديثات رفع قيمة الطلب</h2>
      <h3>بطاقات الهدايا</h3>
      <p>فعّلت سلة <strong>بطاقات الهدايا</strong> كمنتج يمكن بيعه في متجرك. بطاقة الهدية ليست مجرد منتج إضافي؛ هي عميل جديد يصلك عن طريق عميل حالي، وغالبًا ينفق المستلم أكثر من قيمة البطاقة. تعمل بقوة في المواسم: رمضان، العيد، اليوم الوطني، والجمعة البيضاء.</p>

      <h3>توصيات أذكى: «أضف للسلة» و«يُشترى معًا»</h3>
      <p>أضافت سلة اقتراحات منتجات عند الإضافة للسلة، واقتراحات للمنتجات التي تُشترى معًا عادة. هذا ما يسميه التسويق <em>البيع المتقاطع</em>، وهو أرخص طريقة لرفع متوسط قيمة الطلب لأنك لا تدفع على إعلان جديد — العميل موجود أصلًا.</p>

      <h3>الكاش باك مع الكوبونات</h3>
      <p>يمكنك الآن ربط مكافأة كاش باك بكوبون موجّه لعملاء محددين بدل أن تكون عامة للجميع. الفرق جوهري: الخصم يأخذ من هامشك اليوم، أما الكاش باك فيعود للعميل رصيدًا لا يُصرف إلا في متجرك — أي أنه يشتري منك مرة ثانية.</p>

      <h3>تحديثات العروض الترويجية</h3>
      <p>صار التحكم أدق: يمكنك تحديد أي عرض يُطبّق عند تعديل الطلب، وتحديد أولوية مستقلة للعروض في كل سوق عند تعارضها، وأصبحت قيم العروض متوافقة مع عملة كل سوق. إذا كنت تبيع لأكثر من دولة خليجية فهذه التحديثات تمنع خطأ شائعًا: عرض بقيمة ثابتة بالريال يظهر بلا معنى لعميل يتسوق بالدرهم.</p>

      <h2>ثالثًا: تحديثات الشحن</h2>
      <ul>
        <li><strong>الشحن المبرد مع درب:</strong> أصبحت شركة درب متاحة ضمن بوليصات سلة للمنتجات الحساسة للحرارة — مهم لمتاجر الأغذية والحلويات والعطور ومستحضرات التجميل.</li>
        <li><strong>الشحن الاقتصادي مع سبل SPL:</strong> شحن داخلي في المملكة ضمن بوليصات سلة المخفضة.</li>
        <li><strong>شركات شحن جديدة:</strong> أُضيفت أربع شركات شحن جديدة ضمن بوليصات سلة، منها ناقل.</li>
      </ul>
      <p>كلما زادت الخيارات زادت قدرتك على تسعير الشحن بذكاء: ناقل سريع للطلبات الكبيرة، وخيار اقتصادي للطلبات الصغيرة التي لا تحتمل تكلفة شحن مرتفعة.</p>

      <h2>رابعًا: الذكاء الاصطناعي ومشمّر</h2>
      <p><strong>مشمّر</strong> هو المساعد الذكي في سلة، وتوسعت قدراته كثيرًا: يقترح منتجات أكثر صلة باهتمامات العملاء، ويقترح عناصر جاهزة داخل محرر الثيم، ويشرح لك أرقام تقارير متجرك وأسباب تغيرها، بل ويجهز إعدادات كوبون الخصم عندما تطلبه بدل أن تملأها يدويًا. أفردنا له مقالًا كاملًا في <a href="/ar/blog/mushammer-salla-ai-assistant">دليل مشمّر</a>.</p>
      <p>وأضافت سلة أيضًا تحليل مراجعات المنتجات بالذكاء الاصطناعي، و<strong>بحثًا أذكى</strong> داخل المتجر يساعد العميل على اكتشاف المنتجات والمحتوى. البحث الداخلي من أكثر الأماكن التي يضيع فيها العميل الجاهز للشراء: يكتب اسم المنتج بطريقة مختلفة فلا يجده فيغادر.</p>

      <h2>خامسًا: تجربة العميل والثقة</h2>
      <ul>
        <li><strong>تقييم المنتج من صفحته مباشرة</strong> حتى دون طلب سابق — يعني تقييمات أكثر، والتقييمات من أقوى عوامل التحويل.</li>
        <li><strong>تفاصيل إضافية في ملف تقييمات العملاء:</strong> الطلب المرتبط ومعلومات العميل والردود.</li>
        <li><strong>إضافة فيديو للمنتج من جهازك</strong> مباشرة — والفيديو يجيب عن أسئلة لا تجيب عنها الصور.</li>
        <li><strong>تخصيص ملفات تعريف الارتباط (الكوكيز)</strong> للعملاء — متطلب امتثال متزايد الأهمية.</li>
        <li><strong>مزايا جديدة لتطبيق متجرك</strong> على الجوال لتخصيص تجربة التسوق.</li>
      </ul>

      <h2>سادسًا: التشغيل والإدارة</h2>
      <ul>
        <li><strong>إدارة الفروع والمستودعات دفعة واحدة</strong> بدل تعديل كل فرع على حدة.</li>
        <li><strong>حزم جديدة في متجر التطبيقات</strong> تجمع تطبيقات مختارة حسب احتياج المتجر، مع واجهة موحدة لإدارة التطبيقات واشتراكاتها.</li>
        <li><strong>إدارة إشعارات المحفظة والكاش باك</strong> من مكان واحد.</li>
        <li><strong>جدولة كوبون للتجديد القادم</strong> لباقتك في سلة.</li>
      </ul>

      <h2>من أين تبدأ؟ ترتيب الأولويات</h2>
      <ol>
        <li>فعّل كل وسائل الدفع المتاحة لك (قطاف، أبل باي، التقسيط) — أسرع أثر وأقل جهد.</li>
        <li>شغّل التوصيات و«يُشترى معًا» على أكثر عشرة منتجات مبيعًا.</li>
        <li>أضف فيديو قصيرًا لأهم خمسة منتجات.</li>
        <li>جرّب الكاش باك بدل الخصم المباشر في حملتك القادمة.</li>
        <li>راجع خيارات الشحن الجديدة وأعد حساب أسعار الشحن لعملائك.</li>
      </ol>
      <p>إذا أردت من يطبق هذا كله على متجرك مرة واحدة ويضبطه بشكل صحيح، فهذه بالضبط خدمة <a href="/ar/store/salla-store-setup">تجهيز متجر سلة</a>، أو <a href="/ar/store/store-seo">تحسين التحويل والسيو</a> إذا كان متجرك قائمًا.</p>
    `,
    contentEn: `
      <p>Salla ships updates almost weekly through the "Salla News" section of its official merchant community. Most merchants never read them. These are the 2026 updates that matter most, ranked by their effect on sales.</p>
      <h2>Payments</h2>
      <p>Qitaf (STC's loyalty points) is now a payment method; Apple Pay can be enabled for a more flexible checkout on any device; and plan fees can be paid by bank transfer to a virtual IBAN without waiting for manual confirmation.</p>
      <h2>Order value</h2>
      <p>Gift cards, add-to-cart and frequently-bought-together recommendations, cashback tied to targeted coupons, and finer promotion control — which offer applies when an order is edited, and independent offer priority and currency-matched values per market.</p>
      <h2>Shipping</h2>
      <p>Chilled shipping with Darb, economy domestic shipping with SPL, and four new carriers in Salla's waybills including Naqel.</p>
      <h2>AI and Mushammer</h2>
      <p>Salla's assistant now suggests more relevant products, proposes theme elements, explains your report figures, and prepares coupon settings on request. Reviews are analysed with AI and in-store search is smarter.</p>
      <h2>Where to start</h2>
      <p>Enable every payment method, switch on recommendations for your top sellers, add short videos to your top five products, and try cashback instead of a straight discount in your next campaign.</p>
    `,
  },

  /* ═══ 2 ═══ */
  {
    id: "mushammer-salla-ai-assistant",
    cluster: "news",
    titleAr: "مشمّر: مساعد سلة الذكي — ماذا يفعل وكيف تستخدمه لزيادة مبيعاتك",
    titleEn: "Mushammer, Salla's AI assistant: what it does and how to use it",
    excerptAr: "مشمّر يقرأ تقاريرك ويجهز كوبوناتك ويقترح عناصر الثيم والمنتجات. دليل عملي لاستخدام مساعد سلة الذكي بدل أن يبقى زرًا لا يضغطه أحد.",
    excerptEn: "Mushammer reads your reports, prepares coupons and suggests theme elements and products. A practical guide to Salla's AI assistant.",
    date: "2026-10-30",
    readTime: 9,
    keywordsAr: ["مشمر سلة", "مساعد سلة الذكي", "الذكاء الاصطناعي في سلة", "مشمّر", "أدوات سلة الذكية"],
    keywordsEn: ["Mushammer Salla", "Salla AI assistant"],
    contentAr: `
      <p><strong>مشمّر</strong> هو مساعد الذكاء الاصطناعي داخل لوحة تحكم سلة. الاسم مأخوذ من التعبير الشعبي «مشمّر عن ساعده» — أي جاهز للعمل — وهذا وصف دقيق لما يفعله: يختصر مهامًا كانت تأخذ من التاجر دقائق أو ساعات. في 2026 توسعت قدرات مشمّر بشكل ملحوظ، وهذا دليل عملي لما يستطيع فعله اليوم بحسب إعلانات سلة الرسمية، وكيف توظفه في متجرك.</p>

      <h2>ما الذي يستطيع مشمّر فعله؟</h2>
      <h3>1. شرح أداء متجرك بلغة مفهومة</h3>
      <p>أعلنت سلة أن مشمّر يساعدك على فهم أرقام تقارير متجرك وأسباب تغيرها. هذه أهم قدرة على الإطلاق لأن أغلب التجار يفتحون التقارير ويرون أرقامًا دون أن يعرفوا ماذا يفعلون بها. بدل أن تسأل «لماذا انخفضت المبيعات هذا الأسبوع؟» وتخمّن، اسأل مشمّر مباشرة.</p>
      <p><strong>أسئلة جيدة تطرحها:</strong></p>
      <ul>
        <li>ما المنتجات التي انخفضت مبيعاتها مقارنة بالشهر الماضي؟</li>
        <li>من أين يأتي أغلب العملاء الجدد؟</li>
        <li>ما متوسط قيمة الطلب هذا الشهر وكيف تغيّر؟</li>
      </ul>

      <h3>2. تجهيز كوبونات الخصم عند الطلب</h3>
      <p>بدل أن تملأ إعدادات الكوبون يدويًا — نسبة الخصم، الحد الأدنى، المنتجات المشمولة، تاريخ الانتهاء — تطلب من مشمّر ما تريده بجملة، فيجهز الإعدادات لك. هذا يوفر الوقت، والأهم أنه يقلل أخطاء الإعداد الشائعة مثل كوبون بلا تاريخ انتهاء أو بلا حد أدنى للطلب.</p>
      <p>ننصح بقراءة <a href="/ar/blog/discount-coupons-that-dont-hurt">كوبونات الخصم التي لا تضر هامشك</a> قبل أن تطلب أي كوبون — مشمّر ينفذ ما تطلبه، لكن القرار التسويقي يبقى قرارك.</p>

      <h3>3. اقتراح منتجات أكثر صلة للعملاء</h3>
      <p>صار مشمّر يقترح منتجات أقرب لاهتمامات كل عميل. هذا يعمل في الخلفية على واجهة متجرك ويرفع فرصة أن يرى العميل منتجًا يشتريه فعلًا بدل قائمة عامة.</p>

      <h3>4. اقتراح عناصر داخل محرر الثيم</h3>
      <p>أتاحت سلة «العناصر المقترحة من مشمّر» داخل محرر الثيم. إذا كنت تبني صفحتك الرئيسية بنفسك فهذه الميزة تعطيك نقطة بداية بدل صفحة فارغة. لكن تذكر: الاقتراح عام بطبيعته، ومتجرك يحتاج ترتيبًا مبنيًا على منتجاتك وجمهورك. راجع <a href="/ar/blog/homepage-elements-that-sell">عناصر الصفحة الرئيسية التي تبيع</a>.</p>

      <h2>كيف تستخدم مشمّر بذكاء؟ خمس قواعد</h2>
      <ol>
        <li><strong>اسأل أسئلة محددة:</strong> «ما أكثر ثلاثة منتجات أُضيفت للسلة ولم تُشترَ هذا الشهر؟» أفضل من «كيف حال متجري؟».</li>
        <li><strong>حوّل الإجابة لقرار:</strong> كل إجابة يجب أن تنتهي بإجراء — تعديل سعر، صورة أفضل، عرض، أو إيقاف منتج.</li>
        <li><strong>راجع قبل التفعيل:</strong> خاصة الكوبونات. الذكاء الاصطناعي ينفذ بسرعة، والخطأ ينتشر بسرعة أيضًا.</li>
        <li><strong>استخدمه أسبوعيًا:</strong> جلسة عشر دقائق كل أحد لقراءة الأسبوع الماضي أنفع من جلسة طويلة كل شهرين.</li>
        <li><strong>لا تتركه يصمم هويتك:</strong> العناصر المقترحة بداية، والهوية البصرية تحتاج قرارًا بشريًا.</li>
      </ol>

      <h2>ما الذي لا يفعله مشمّر؟</h2>
      <p>مشمّر أداة داخل المنصة، وليس بديلًا عن استراتيجية. لن يخبرك أن صور منتجاتك ضعيفة، ولا أن وصفك لا يجيب عن أسئلة العميل، ولا أن هويتك تشبه ألف متجر آخر. هذه قرارات تحتاج عينًا خبيرة من خارج الأرقام.</p>

      <h2>مشمّر مقابل ربط المتجر مع ChatGPT وClaude</h2>
      <p>أتاحت سلة أيضًا ربط المتجر مع ChatGPT وClaude لإدارة الطلبات والمنتجات والتقارير بالمحادثة. الفرق: مشمّر مدمج داخل لوحة سلة، أما الربط فيجعلك تدير متجرك من داخل أداة الذكاء الاصطناعي التي تستخدمها أصلًا. شرحنا ذلك في <a href="/ar/blog/salla-chatgpt-claude-integration">ربط سلة مع ChatGPT وClaude</a>.</p>

      <h2>الخلاصة</h2>
      <p>مشمّر يوفر عليك الوقت في المهام المتكررة ويقرأ الأرقام أسرع منك. استخدمه لهذا. واترك للخبرة البشرية ما لا تقيسه الأرقام: الصورة، والنص، والهوية، وتجربة الشراء. إذا أردت مراجعة متجرك من هذه الزاوية، <a href="/ar/store/store-seo">خدمة تحسين التحويل</a> تبدأ من هنا.</p>
    `,
    contentEn: `
      <p>Mushammer is the AI assistant inside the Salla dashboard. In 2026 its scope grew considerably, per Salla's official announcements.</p>
      <h2>What it does</h2>
      <ul>
        <li>Explains your store's report figures and why they changed.</li>
        <li>Prepares discount coupon settings when you ask for one.</li>
        <li>Suggests products more relevant to each customer's interests.</li>
        <li>Proposes ready elements inside the theme editor.</li>
      </ul>
      <h2>How to use it well</h2>
      <p>Ask specific questions, turn every answer into an action, review coupons before activating them, and make it a ten-minute weekly habit. Do not let suggested elements replace a considered brand identity.</p>
      <h2>What it does not do</h2>
      <p>It will not tell you your photos are weak or your copy leaves questions unanswered. Those still need an experienced eye.</p>
    `,
  },

  /* ═══ 3 ═══ */
  {
    id: "salla-chatgpt-claude-integration",
    cluster: "news",
    titleAr: "ربط متجر سلة مع ChatGPT وClaude: إدارة متجرك بالمحادثة",
    titleEn: "Connecting your Salla store to ChatGPT and Claude",
    excerptAr: "أتاحت سلة ربط المتجر مع ChatGPT وClaude لإدارة الطلبات والمنتجات والمخزون والتقارير بأوامر محادثة. ما الذي يمكن فعله، وما الذي يجب الحذر منه.",
    excerptEn: "Salla now lets you link your store to ChatGPT or Claude to manage orders, products, stock alerts and reports by conversation.",
    date: "2026-10-27",
    readTime: 8,
    keywordsAr: ["ربط سلة مع ChatGPT", "سلة Claude", "إدارة متجر سلة بالذكاء الاصطناعي", "ChatGPT للمتاجر", "أتمتة متجر سلة"],
    keywordsEn: ["Salla ChatGPT integration", "Salla Claude"],
    contentAr: `
      <p>من أبرز ما أعلنته سلة مؤخرًا إمكانية <strong>ربط متجرك مع ChatGPT وClaude</strong>، بحيث تدير الطلبات والمنتجات وتنبيهات المخزون والتقارير عبر أوامر محادثة بدل التنقل بين صفحات لوحة التحكم. وصفت سلة الهدف بأنه «تجربة إدارة أذكى وأسرع». هذا المقال يشرح ما الذي يعنيه ذلك عمليًا للتاجر السعودي، وكيف تستفيد منه دون أن تفتح بابًا لأخطاء مكلفة.</p>

      <h2>ما الفكرة ببساطة؟</h2>
      <p>بدل أن تفتح لوحة سلة، وتذهب لصفحة الطلبات، وتطبق فلترًا، ثم تصدّر ملفًا، تكتب في ChatGPT أو Claude جملة مثل: «اعرض لي الطلبات المعلقة منذ أكثر من يومين»، فتأتيك الإجابة من بيانات متجرك مباشرة. نفس الشيء للمنتجات: «أي المنتجات مخزونها أقل من خمس قطع؟».</p>

      <h2>أين يوفر لك هذا الربط وقتًا حقيقيًا؟</h2>
      <h3>متابعة الطلبات اليومية</h3>
      <p>سؤال واحد صباحي يكفي لتعرف الطلبات الجديدة والمتأخرة وتلك التي تحتاج تدخلًا. هذا مفيد خاصة للتاجر الذي يدير المتجر من جواله بين أعمال أخرى.</p>
      <h3>تنبيهات المخزون</h3>
      <p>نفاد منتج رائج دون أن تنتبه يعني مبيعات ضائعة وإعلانات تُصرف على صفحة «غير متوفر». سؤال دوري عن المنتجات القريبة من النفاد يمنع ذلك.</p>
      <h3>قراءة التقارير</h3>
      <p>نماذج الذكاء الاصطناعي ممتازة في تلخيص الأرقام ومقارنتها: «قارن مبيعات هذا الأسبوع بالأسبوع الماضي حسب التصنيف». ستحصل على ملخص يستغرق منك يدويًا نصف ساعة.</p>
      <h3>مراجعة بيانات المنتجات</h3>
      <p>اطلب قائمة المنتجات التي بلا وصف أو بوصف قصير جدًا، أو بلا صور كافية. هذه فجوات تضر السيو والتحويل معًا — راجع <a href="/ar/blog/product-fields-merchants-skip">حقول المنتج التي يتجاهلها التجار</a>.</p>

      <h2>قواعد الأمان قبل أن تبدأ</h2>
      <ol>
        <li><strong>اربط من الطريقة الرسمية فقط:</strong> استخدم مسار الربط الذي تقدمه سلة، ولا تعطِ بيانات دخول لوحة التحكم لأي أداة أو شخص.</li>
        <li><strong>ابدأ بالقراءة قبل التعديل:</strong> استخدم الربط أولًا للأسئلة والتقارير. التعديلات الجماعية على الأسعار أو المخزون عبر المحادثة تحتاج مراجعة مزدوجة.</li>
        <li><strong>تأكد من الأرقام الحساسة:</strong> قبل أن تتخذ قرارًا ماليًا بناءً على ملخص، افتح التقرير الأصلي في سلة وتحقق.</li>
        <li><strong>بيانات العملاء أمانة:</strong> لا تطلب تصدير بيانات عملاء شخصية دون حاجة، ولا تشاركها خارج الأداة.</li>
      </ol>

      <h2>الفرق بين الربط ومشمّر</h2>
      <p><a href="/ar/blog/mushammer-salla-ai-assistant">مشمّر</a> مدمج داخل لوحة سلة ومصمم لمهامها. أما الربط مع ChatGPT وClaude فيناسب من يستخدم هذه الأدوات يوميًا في عمله، ويريد أن يسأل عن متجره من نفس المكان الذي يكتب فيه رسائله ويخطط حملاته. لا تعارض بينهما — استخدم الأقرب لطريقة عملك.</p>

      <h2>هل زد يقدم شيئًا مشابهًا؟</h2>
      <p>نعم بشكل مختلف. زد أعلن عبر مدونة المطورين عن أدوات تربط شراكة المطورين ببيئات الذكاء الاصطناعي، وعن «Zid AI Agent Skill» مفتوح المصدر يساعد وكلاء البرمجة على بناء تكاملات زد. التوجه واضح في المنصتين: <strong>إدارة المتجر بالمحادثة</strong> أصبحت جزءًا من التجارة الإلكترونية السعودية.</p>

      <h2>الخلاصة</h2>
      <p>ربط سلة مع ChatGPT وClaude يختصر الوقت في المتابعة اليومية ويحوّل التقارير لإجابات. ابدأ بالأسئلة، تدرّج نحو التعديلات، واحتفظ بالقرار النهائي لنفسك. وإذا كنت تريد أتمتة أعمق — ربط الطلبات بالمخزون والمحاسبة والشحن تلقائيًا — فهذا ما نبنيه في <a href="/ar/store/automation-workflows">خدمة أتمتة عمليات المتجر</a>.</p>
    `,
    contentEn: `
      <p>Salla now lets merchants link their store to ChatGPT or Claude to manage orders, products, stock alerts and reports through conversational commands.</p>
      <h2>Where it saves time</h2>
      <p>Morning order checks, low-stock alerts, week-on-week report comparisons, and finding products with thin descriptions or missing images.</p>
      <h2>Safety first</h2>
      <p>Connect only through Salla's official route, start with read-only questions before bulk edits, verify sensitive figures in the original report, and treat customer data as a trust.</p>
      <h2>Zid</h2>
      <p>Zid's developer blog announced an open-source AI Agent Skill for building Zid integrations — both platforms are moving toward conversational store management.</p>
    `,
  },

  /* ═══ 4 ═══ */
  {
    id: "salla-leap-2026-paylink-aramex-sawt",
    cluster: "news",
    titleAr: "سلة في ليب 2026: استحواذ بيلينك، شراكة أرامكس، وقناة صوت لاسترجاع السلات",
    titleEn: "Salla at LEAP 2026: PayLink, Aramex fulfilment and Sawt",
    excerptAr: "أهم ما أعلنته سلة في مؤتمر ليب 2026 وما يعنيه للتاجر: الدفع الموحد، خدمات التخزين والتجهيز مع أرامكس، وقناة ذكاء اصطناعي لاسترجاع السلات المتروكة.",
    excerptEn: "What Salla announced at LEAP 2026 and what it means for merchants: PayLink, Aramex fulfilment, Sawt and new carriers.",
    date: "2026-10-22",
    readTime: 9,
    keywordsAr: ["سلة ليب 2026", "استحواذ سلة على بيلينك", "سلة أرامكس", "سلة صوت", "أخبار سلة", "التجارة الإلكترونية السعودية 2026"],
    keywordsEn: ["Salla LEAP 2026", "Salla PayLink", "Salla Aramex fulfilment"],
    contentAr: `
      <p>شاركت سلة في مؤتمر <strong>ليب 2026</strong> في الرياض بحزمة إعلانات تكشف اتجاه المنصة في السنوات القادمة: سلة لم تعد «منصة إنشاء متاجر» فقط، بل تبني منظومة تغطي الدفع والتخزين والشحن والتسويق بالذكاء الاصطناعي. نستعرض هنا أهم الإعلانات كما نشرتها سلة في مدونتها الرسمية، وما الذي يعنيه كل منها عمليًا لصاحب المتجر.</p>

      <h2>1. الاستحواذ على بيلينك PayLink</h2>
      <p>أعلنت سلة استحواذها على <strong>بيلينك</strong>، ووصفت الخطوة بأنها نحو حلول دفع أكثر تكاملًا عبر القنوات الرقمية والمادية. بالنسبة للتاجر، الرسالة واضحة: سلة تتجه لتوحيد تجربة الدفع سواء باع العميل من المتجر الإلكتروني أو من رابط دفع أو من نقطة بيع في معرض أو فرع.</p>
      <p><strong>ماذا يعني لك:</strong> إذا كنت تبيع عبر أكثر من قناة — إنستغرام وواتساب ومعارض موسمية — فراقب التكاملات القادمة؛ توحيد المدفوعات يعني تقارير مالية أوضح ومطابقة أسهل.</p>

      <h2>2. اتفاقية خدمات التجهيز مع أرامكس</h2>
      <p>وقّعت سلة اتفاقية مع أرامكس لتقديم خدمات <strong>التخزين وإدارة المخزون وتجهيز الطلبات والشحن</strong> لتجار سلة. هذا ما يسمى في السوق «الفلفلمنت»: تودع بضاعتك في مستودع، ويتولى الطرف الآخر التغليف والشحن عند كل طلب.</p>
      <p><strong>متى يناسبك الفلفلمنت؟</strong></p>
      <ul>
        <li>عندما تتجاوز طلباتك قدرتك على التغليف بنفسك.</li>
        <li>عندما يصبح مستودعك المنزلي أو مكتبك عائقًا.</li>
        <li>عندما تريد تسليمًا أسرع لمدن بعيدة عنك.</li>
      </ul>
      <p>راجع <a href="/ar/blog/waybills-and-fulfilment">البوالص والتجهيز</a> لفهم الحسابات قبل أن تنتقل.</p>

      <h2>3. شراكة صوت: قناة ذكاء اصطناعي للسلات المتروكة</h2>
      <p>أعلنت سلة شراكة استراتيجية مع <strong>صوت</strong> لقناة مبيعات مدعومة بالذكاء الاصطناعي تساعد التجار على استرجاع السلات المتروكة وإعادة التواصل مع المتسوقين. السلة المتروكة هي أكبر تسرب في أي متجر، وأي قناة جديدة لاسترجاعها — بجانب الرسائل والإشعارات — تستحق التجربة. اقرأ <a href="/ar/blog/abandoned-cart-recovery">استرجاع السلات المتروكة</a> للأساسيات.</p>

      <h2>4. شركات شحن جديدة</h2>
      <p>ذكرت سلة انضمام شركات شحن جديدة لخياراتها منها AJEX وناقل وLogistiq وريدبوكس للتوصيل المنزلي وFastlo. تعدد الناقلين يعني أسعارًا أفضل وخيارات أوسع حسب المدينة وحجم الشحنة.</p>

      <h2>5. «سبّاق»: مسرّع للتجارة الذكية</h2>
      <p>أعلنت سلة عن «سبّاق»، مسرّع للتجارة الذكية مخصص لمؤسسي منتجات الذكاء الاصطناعي. هذا موجه لرواد الأعمال التقنيين أكثر من التجار، لكنه مؤشر على أن متجر تطبيقات سلة سيمتلئ بأدوات ذكاء اصطناعي جديدة في الفترة القادمة.</p>

      <h2>الصورة الكبيرة: إلى أين تتجه سلة؟</h2>
      <p>اجمع هذه الإعلانات مع تحديثات المنصة الأخيرة — <a href="/ar/blog/mushammer-salla-ai-assistant">مشمّر</a>، و<a href="/ar/blog/salla-chatgpt-claude-integration">الربط مع ChatGPT وClaude</a>، و<a href="/ar/blog/salla-mahalli-marketplace">منصة محلي</a> — وستجد اتجاهًا واحدًا: <strong>سلة تريد أن تكون البنية الكاملة لتجارة التاجر</strong>، من أول زيارة حتى وصول الشحنة.</p>
      <p>للتاجر هذا خبر جيد بشرط واحد: أن يكون متجرك نفسه مبنيًا بشكل صحيح ليستفيد. الأدوات الجديدة لا تصلح صفحة منتج ضعيفة ولا هوية غير واضحة.</p>

      <h2>ماذا تفعل الآن؟</h2>
      <ol>
        <li>راجع خيارات الشحن الجديدة وقارن الأسعار لمدنك الأكثر طلبًا.</li>
        <li>إذا كانت طلباتك في نمو، ادرس الفلفلمنت كخيار للربع القادم.</li>
        <li>فعّل كل قنوات استرجاع السلات المتاحة لك.</li>
        <li>تأكد أن متجرك جاهز للتحويل قبل أن تضخ فيه زيارات — وهنا نساعدك في <a href="/ar/store/salla-store-setup">تجهيز متجر سلة</a>.</li>
      </ol>
      <p><em>مصدر الإعلانات: مدونة سلة الرسمية عن مشاركتها في ليب 2026. الإطار الترويجي للإعلانات من سلة نفسها.</em></p>
    `,
    contentEn: `
      <p>At LEAP 2026 in Riyadh, Salla made a set of announcements, per its own blog.</p>
      <ul>
        <li><strong>PayLink acquisition</strong> — toward integrated payments across digital and physical channels.</li>
        <li><strong>Aramex fulfilment</strong> — storage, inventory, order preparation and shipping for Salla merchants.</li>
        <li><strong>Sawt partnership</strong> — an AI-powered channel to recover abandoned carts.</li>
        <li><strong>New carriers</strong> — AJEX, Naqel, Logistiq, RedBox Home Delivery and Fastlo.</li>
        <li><strong>Sabbaq</strong> — a smart-commerce accelerator for AI product founders.</li>
      </ul>
      <p>The direction is clear: Salla wants to be the whole infrastructure of a merchant's business. The tools still depend on a store that is built to convert.</p>
    `,
  },

  /* ═══ 5 ═══ */
  {
    id: "salla-mahalli-marketplace",
    cluster: "news",
    titleAr: "منصة «محلي» من سلة: اعرض متجرك مجانًا بلا عمولة — هل تستحق؟",
    titleEn: "Salla's Mahalli marketplace: free listing with no commission",
    excerptAr: "محلي قناة من سلة تعرض المتاجر السعودية مجانًا دون عمولة أو رسوم إضافية. كيف تجهز متجرك ليبرز فيها، ولماذا لا تكفي وحدها.",
    excerptEn: "Mahalli lists Saudi stores for free with no commission. How to stand out in it, and why it is not enough on its own.",
    date: "2026-10-18",
    readTime: 7,
    keywordsAr: ["منصة محلي سلة", "محلي سلة", "عرض المتجر مجانا", "سوق المتاجر السعودية", "زيادة زوار متجر سلة"],
    keywordsEn: ["Salla Mahalli", "free marketplace Saudi stores"],
    contentAr: `
      <p>أطلقت سلة <strong>منصة محلي</strong>، قناة تعرض المتاجر السعودية مجانًا، وأكدت سلة في إعلانها أنها <strong>بلا عمولة ولا رسوم إضافية</strong>. في سوق تأخذ فيه منصات البيع الكبرى نسبة من كل طلب، قناة مجانية بهذا الشكل تستحق انتباه كل تاجر على سلة.</p>

      <h2>ما الفرق بين محلي ومنصات البيع التقليدية؟</h2>
      <p>في الأسواق الكبرى (ماركت بليس) تبيع منتجك داخل منصة غيرك، بشروطها، وغالبًا مقابل عمولة على كل طلب، وأحيانًا تتنافس مع بائعين آخرين على نفس الصفحة. أما محلي فيعرّف العميل بمتجرك أنت: الهوية هويتك، والعميل عميلك، والطلب طلبك.</p>

      <h2>كيف تبرز في محلي؟</h2>
      <h3>1. شعار وهوية واضحان</h3>
      <p>في قائمة متاجر متجاورة، أول ما يقارنه العميل هو الشعار والاسم. متجر بشعار باهت أو اسم لا يدل على ما يبيعه يخسر النقرة قبل أن يبدأ. هذا بالضبط ما تعالجه <a href="/ar/store/brand-identity-design">الهوية البصرية</a>.</p>
      <h3>2. وصف المتجر بكلمات يبحث بها العميل</h3>
      <p>اكتب وصفًا يقول ما تبيعه ولمن ولماذا أنت مختلف — بكلمات العميل لا بكلماتك. «عبايات يومية بخامات صيفية خفيفة» أفضل من «متجر الأناقة الراقية».</p>
      <h3>3. صفحة أولى تكمل الوعد</h3>
      <p>العميل القادم من محلي يدخل صفحتك الرئيسية مباشرة. إذا لم يجد خلال ثوانٍ ما وعده به الوصف، يعود للقائمة ويختار متجرًا آخر. راجع <a href="/ar/blog/homepage-elements-that-sell">عناصر الصفحة الرئيسية التي تبيع</a>.</p>
      <h3>4. تقييمات حقيقية</h3>
      <p>أضافت سلة إمكانية تقييم المنتج من صفحته مباشرة حتى دون طلب سابق، وتفاصيل أكثر في ملف التقييمات. شجّع عملاءك على التقييم — المتجر بتقييمات يكسب ثقة الزائر الجديد أسرع.</p>

      <h2>لماذا لا تكفي محلي وحدها؟</h2>
      <p>أي قناة مجانية مفيدة، لكنها لا تتحكم أنت في حجم زياراتها. ابنِ دائمًا مصادر زيارات تملكها: <a href="/ar/blog/ecommerce-seo-guide">السيو</a> الذي يجلب عملاء من جوجل دون دفع لكل نقرة، وقاعدة عملاء تعيد مراسلتها، وحملات إعلانية مدروسة. محلي إضافة جيدة فوق هذا، لا بديل عنه.</p>

      <h2>قائمة سريعة قبل الانضمام</h2>
      <ul>
        <li>شعار واضح بمقاس مربع.</li>
        <li>وصف متجر من سطرين بكلمات العميل.</li>
        <li>صفحة رئيسية تعرض أكثر المنتجات مبيعًا في أول شاشة.</li>
        <li>سياسات شحن واسترجاع مكتوبة وواضحة.</li>
        <li>كل وسائل الدفع مفعّلة.</li>
      </ul>
      <p>إذا أردت تجهيز كل ذلك دفعة واحدة، <a href="/ar/store/salla-store-setup">تجهيز متجر سلة</a> يغطيه بالكامل.</p>
    `,
    contentEn: `
      <p>Salla launched Mahalli, a channel that lists Saudi stores for free — with no commission and no additional fees, per Salla's announcement.</p>
      <h2>How to stand out</h2>
      <p>A clear logo and identity, a store description written in the customer's words, a homepage that delivers on that description within seconds, and genuine reviews.</p>
      <h2>Why it is not enough alone</h2>
      <p>You do not control a free channel's traffic. Keep building sources you own — SEO, a customer base you can re-contact, and measured campaigns.</p>
    `,
  },

  /* ═══ 6 ═══ */
  {
    id: "zid-updates-2026",
    cluster: "news",
    titleAr: "تحديثات زد 2026: زد فويس، مزيد، الأسواق، والتمويل — دليل التاجر",
    titleEn: "Zid in 2026: Zid Voice, Mazeed, marketplaces and financing",
    excerptAr: "ما الذي تقدمه منصة زد للتجار في 2026: استرجاع السلات بوكيل صوتي، البيع على أمازون وترينديول وجاهز، سوق مزيد، التمويل، وتحديثات ثيمات فيترين.",
    excerptEn: "What Zid offers merchants in 2026: Zid Voice, marketplaces, Mazeed, financing and Vitrin theme updates.",
    date: "2026-10-14",
    readTime: 10,
    keywordsAr: ["تحديثات زد", "منصة زد 2026", "زد فويس", "مزيد زد", "متجر زد", "مميزات زد"],
    keywordsEn: ["Zid updates 2026", "Zid Voice", "Zid Mazeed"],
    contentAr: `
      <p>منصة <strong>زد</strong> ثاني أكبر منصة متاجر في السعودية، وتتجه بوضوح نحو التاجر الذي يبيع عبر أكثر من قناة. تعلن زد على موقعها أن أكثر من 13,500 تاجر اختاروها، وأن مبيعات متاجرها تجاوزت 10 مليارات ريال لأكثر من 15 مليون عميل — وهي أرقام تعلنها المنصة نفسها. في هذا الدليل نستعرض ما تقدمه زد اليوم للتاجر، وما يستحق التفعيل.</p>

      <h2>زد فويس: استرجاع السلات بوكيل صوتي</h2>
      <p>تقدم زد خدمة <strong>Zid Voice</strong> لاسترجاع السلات المتروكة عبر وكيل صوتي. الفكرة أن العميل الذي ترك سلته يتلقى تواصلًا صوتيًا بدل رسالة نصية قد يتجاهلها. القنوات الصوتية أعلى في الانتباه، لكنها تحتاج صياغة محترمة وتوقيتًا مناسبًا حتى لا تتحول لإزعاج.</p>

      <h2>البيع على الأسواق: أمازون وترينديول وجاهز</h2>
      <p>تتيح زد ربط متجرك بأسواق <strong>أمازون وترينديول وجاهز</strong>. هذا يعني إدارة المنتجات والمخزون من لوحة زد مع الظهور في أسواق ذات زيارات ضخمة. شرحنا متى يستحق ذلك في <a href="/ar/blog/zid-marketplaces-amazon-trendyol-jahez">البيع على أمازون وترينديول وجاهز من زد</a>.</p>

      <h2>سوق مزيد</h2>
      <p><strong>مزيد</strong> هو سوق زد الذي يعرض منتجات تجارها. ميزته أنه داخل منظومة زد، فلا تحتاج إدارة متجر منفصل.</p>

      <h2>التمويل</h2>
      <p>تقدم زد حلول <strong>تمويل</strong> لرأس المال العامل للتجار. التمويل أداة قوية قبل المواسم — شراء مخزون رمضان أو الجمعة البيضاء — لكنه يحتاج حسابًا دقيقًا لهامش الربح ودورة البيع. لا تقترض لتغطية متجر لا يبيع؛ اقترض لتوسيع متجر يبيع ونفد مخزونه.</p>

      <h2>نقاط البيع والمخزون</h2>
      <p>زد قوية تقليديًا في <strong>إدارة المخزون ونقاط البيع (POS)</strong>، وهذا ما يجعلها خيارًا مفضلًا للعلامات التي لديها فروع ومعارض بجانب المتجر الإلكتروني. مخزون واحد يتحدث مع الفرع والمتجر يمنع بيع منتج نفد من الرف.</p>

      <h2>زد أشورنس وواتساب</h2>
      <p>تعرض زد أيضًا «ZID Assurance» وتكامل واتساب ضمن منتجاتها. واتساب تحديدًا قناة لا غنى عنها في السوق السعودي لتأكيد الطلبات وخدمة ما بعد البيع.</p>

      <h2>للمطورين: تحديثات ثيمات فيترين وواجهات البرمجة</h2>
      <p>نشرت زد في مدونة المطورين تحديثات مهمة إن كنت تبني ثيمًا مخصصًا:</p>
      <ul>
        <li><strong>صفحات العلامات التجارية في ثيمات فيترين:</strong> قوالب جديدة لصفحات العلامات وعرض العلامة في صفحة المنتج — مفيد للمتاجر متعددة الماركات وللسيو.</li>
        <li><strong>واجهة برمجة للمدونات:</strong> إدارة إعدادات المدونة والتصنيفات والمقالات والوسوم، مع عمليات جماعية واستيراد وتصدير وجدولة.</li>
        <li><strong>تتبع صحة الويبهوك:</strong> كل ويبهوك يعرض حالته، مع أدوات لاسترجاع المعطل — يقلل الطلبات التي «تضيع» بين المتجر والأنظمة المربوطة.</li>
        <li><strong>Zid AI Agent Skill:</strong> أداة مفتوحة المصدر تساعد وكلاء البرمجة بالذكاء الاصطناعي على بناء تكاملات زد.</li>
      </ul>

      <h2>متجر التطبيقات</h2>
      <p>تعلن زد عن أكثر من 400 تطبيق في سوق تطبيقاتها. نصيحتنا كما في سلة: كل تطبيق إضافي يضيف وزنًا للمتجر، فاختر ما يحل مشكلة حقيقية فقط.</p>

      <h2>زد أم سلة في 2026؟</h2>
      <p>الصورة أصبحت أوضح: <strong>زد</strong> تتفوق للعلامات متعددة القنوات والفروع والمخزون الكبير، و<strong>سلة</strong> تتفوق في اتساع المنظومة وسرعة التحديثات وأدوات التسويق المدمجة. التفاصيل في <a href="/ar/blog/salla-vs-zid-2026">مقارنة سلة وزد 2026</a>.</p>
      <p>نبني ونطور على المنصتين؛ إذا كنت على زد وتحتاج ثيمًا يعكس علامتك، فهذا ضمن <a href="/ar/store/salla-custom-theme">خدمة الثيمات المخصصة</a>.</p>
    `,
    contentEn: `
      <p>Zid states on its site that 13,500+ merchants chose it, with SAR 10bn+ in sales to 15m+ customers — the platform's own figures.</p>
      <h2>What Zid offers</h2>
      <ul>
        <li><strong>Zid Voice</strong> — abandoned-cart recovery with a voice agent.</li>
        <li><strong>Marketplaces</strong> — sell on Amazon, Trendyol and Jahez from Zid.</li>
        <li><strong>Mazeed</strong> — Zid's own marketplace.</li>
        <li><strong>Financing</strong> — working capital for merchants.</li>
        <li><strong>POS and inventory</strong> — a long-standing strength for multi-branch brands.</li>
        <li><strong>400+ apps</strong> in its app market.</li>
      </ul>
      <h2>For developers</h2>
      <p>Brand pages in Vitrin themes, a Blogs API, webhook health tracking, and an open-source Zid AI Agent Skill.</p>
    `,
  },

  /* ═══ 7 ═══ */
  {
    id: "zid-marketplaces-amazon-trendyol-jahez",
    cluster: "news",
    titleAr: "البيع على أمازون وترينديول وجاهز من متجر زد: متى يستحق وكيف تبدأ",
    titleEn: "Selling on Amazon, Trendyol and Jahez from your Zid store",
    excerptAr: "زد تتيح ربط متجرك بأسواق أمازون وترينديول وجاهز. متى تضيف الأسواق قيمة، ومتى تأكل هامشك، وكيف تدير المخزون دون أن تبيع منتجًا نفد.",
    excerptEn: "When marketplaces add value, when they eat your margin, and how to manage stock across channels from Zid.",
    date: "2026-10-09",
    readTime: 8,
    keywordsAr: ["البيع على أمازون السعودية", "ربط زد مع أمازون", "زد ترينديول", "البيع على جاهز", "البيع متعدد القنوات"],
    keywordsEn: ["Zid Amazon integration", "Zid Trendyol", "multichannel selling Saudi"],
    contentAr: `
      <p>من أقوى ما تقدمه <strong>منصة زد</strong> اليوم إمكانية البيع على <strong>أمازون وترينديول وجاهز</strong> من نفس لوحة التحكم. الفكرة مغرية: أسواق بملايين الزيارات، ومخزون واحد تديره من مكان واحد. لكن البيع في الأسواق له حسابات مختلفة تمامًا عن البيع في متجرك، وهذا المقال يساعدك تقرر بوعي.</p>

      <h2>لماذا تبيع في سوق وأنت تملك متجرًا؟</h2>
      <ul>
        <li><strong>زيارات جاهزة:</strong> العميل في أمازون يبحث ليشتري، لا ليتصفح.</li>
        <li><strong>ثقة مسبقة:</strong> العميل الجديد يثق بالسوق أكثر من متجر لا يعرفه.</li>
        <li><strong>اختبار المنتجات:</strong> طريقة سريعة لمعرفة أي منتجاتك يطلبها السوق.</li>
      </ul>

      <h2>ومتى يأكل السوق هامشك؟</h2>
      <p>الأسواق تأخذ عمولة على البيع، وقد تضاف رسوم أخرى حسب السوق. منتج هامشه ضيق قد يصبح خاسرًا في السوق بينما هو رابح في متجرك. احسب قبل أن تدرج:</p>
      <p><strong>الربح في السوق = السعر − تكلفة المنتج − عمولة السوق − الشحن − تكلفة الإرجاع المتوقعة</strong></p>
      <p>إذا كان الناتج أقل مما يستحق جهد التشغيل، أبقِ المنتج في متجرك فقط.</p>

      <h2>أي المنتجات تدرج في الأسواق؟</h2>
      <ul>
        <li>منتجات هامشها مرتفع بما يكفي لتحمل العمولة.</li>
        <li>منتجات يبحث عنها الناس بالاسم (طلب موجود مسبقًا).</li>
        <li>منتجات معيارية لا تحتاج شرحًا طويلًا ولا مقاسات معقدة.</li>
      </ul>
      <p>واترك في متجرك المنتجات التي تحتاج قصة وهوية وتجربة: المجموعات الحصرية، والمنتجات المخصصة، والهدايا الفاخرة.</p>

      <h2>جاهز: قناة مختلفة</h2>
      <p>جاهز معروف بالتوصيل السريع، وهذا يناسب متاجر الأغذية والحلويات والزهور والمنتجات اليومية التي يريدها العميل اليوم لا بعد يومين.</p>

      <h2>المخزون: أخطر نقطة في البيع متعدد القنوات</h2>
      <p>أسوأ ما يحدث أن تبيع نفس القطعة الأخيرة في متجرك وفي أمازون في نفس الساعة. الحل في ثلاث قواعد:</p>
      <ol>
        <li>مخزون واحد مركزي — وهذا ما يوفره الربط عبر زد.</li>
        <li>هامش أمان: لا تعرض في الأسواق آخر قطعتين أو ثلاث.</li>
        <li>مراجعة يومية للطلبات المعلقة في كل قناة.</li>
      </ol>
      <p>للتوسع راجع <a href="/ar/blog/multi-warehouse-inventory">إدارة المخزون في عدة مستودعات</a>.</p>

      <h2>لا تنسَ متجرك</h2>
      <p>العميل الذي اشترى منك في أمازون عميل أمازون، لا عميلك. اجعل تغليفك وبطاقة الشكر داخل الطلب تدعوه لمتجرك — بما يسمح به كل سوق — فالعميل المتكرر في متجرك أربح بكثير من عميل السوق.</p>

      <h2>الخلاصة</h2>
      <p>الأسواق قناة توسع، وليست بديلًا عن متجر قوي. ابدأ بمنتجات قليلة هامشها يتحمل، وراقب الأرقام شهرًا قبل التوسع. وإذا كنت تحتاج ربط أنظمتك ومخزونك بين القنوات بشكل آلي، فهذا ما نبنيه في <a href="/ar/store/automation-workflows">أتمتة عمليات المتجر</a>.</p>
    `,
    contentEn: `
      <p>Zid lets merchants sell on Amazon, Trendyol and Jahez from one dashboard.</p>
      <h2>The maths first</h2>
      <p>Marketplace profit = price − product cost − commission − shipping − expected return cost. Low-margin products can lose money on a marketplace while profiting in your own store.</p>
      <h2>What to list</h2>
      <p>High-margin, searched-by-name, standard products. Keep story-led, exclusive and custom products in your own store.</p>
      <h2>Inventory</h2>
      <p>One central stock, a safety buffer on marketplace listings, and daily checks of pending orders per channel.</p>
    `,
  },

  /* ═══ 8 ═══ */
  {
    id: "salla-zid-merchant-community",
    cluster: "news",
    titleAr: "مجتمع سلة وأكاديمية سلة وزد هب: أين يتعلم التاجر السعودي ويتابع الجديد",
    titleEn: "Salla Community, Salla Academy and Zid Hub: where Saudi merchants learn",
    excerptAr: "دليل لمصادر التعلم الرسمية للتجار: مجتمع سلة التفاعلي وأخباره ونشرة تطبيقات الشركاء، أكاديمية سلة، ومركز زد للورش — وكيف تستفيد منها دون إضاعة وقتك.",
    excerptEn: "The official learning channels for merchants and how to use them without wasting time.",
    date: "2026-10-04",
    readTime: 7,
    keywordsAr: ["مجتمع سلة", "أكاديمية سلة", "زد هب", "تعلم التجارة الإلكترونية", "دورات سلة", "مجتمع التجار السعودي"],
    keywordsEn: ["Salla community", "Salla Academy", "Zid Hub"],
    contentAr: `
      <p>أكبر فرق بين تاجر ينمو وتاجر يراوح مكانه ليس رأس المال، بل سرعة التعلم. ولحسن الحظ، توفر المنصتان الأكبر في السعودية مصادر تعلم رسمية مجانية — لكن أغلب التجار لا يعرفون بها أو لا يعرفون كيف يستخدمونها. هذا دليل مختصر.</p>

      <h2>مجتمع سلة التفاعلي</h2>
      <p><strong>مجتمع سلة</strong> مساحة يلتقي فيها التجار بالخبراء ويتبادلون التجارب. أهم ما فيه للتاجر المشغول:</p>
      <ul>
        <li><strong>قسم أخبار سلة:</strong> كل تحديث جديد للمنصة يُنشر هنا أولًا — من وسائل الدفع إلى خيارات الشحن وميزات الذكاء الاصطناعي. لخصنا أهمها في <a href="/ar/blog/salla-updates-2026">تحديثات سلة 2026</a>.</li>
        <li><strong>نشرة تطبيقات الشركاء:</strong> نشرة دورية تجمع تطبيقات الشركاء لمساعدة التجار على إيجاد الأدوات المناسبة.</li>
        <li><strong>أسئلة التجار:</strong> غالبًا ستجد أن مشكلتك سُئل عنها وأُجيب.</li>
      </ul>
      <p><strong>كيف تستخدمه دون إضاعة وقت:</strong> خصص ربع ساعة أسبوعيًا لقسم الأخبار فقط، واكتب لكل خبر سطرًا: «هل يفيد متجري؟ نعم/لا، ومتى أطبقه؟».</p>

      <h2>أكاديمية سلة</h2>
      <p>توفر سلة منصة تعليمية للتجار تشرح أساسيات إدارة المتجر والتسويق والتشغيل. مفيدة جدًا في الأشهر الأولى، وفي تدريب موظف جديد على لوحة التحكم.</p>

      <h2>زد هب Zid Hub</h2>
      <p>افتتحت زد مركز تجربة يحضر فيه التجار ورش عمل. الورش الحضورية لها قيمة لا تعوضها الدروس المسجلة: تلتقي بتجار في نفس مرحلتك وتسأل أسئلتك مباشرة.</p>

      <h2>مدونة مطوري زد ووثائق سلة</h2>
      <p>إذا كان لديك مطور أو فريق تقني، فمدونة مطوري زد ووثائق مطوري سلة هي المكان الذي تُعلن فيه التغييرات التقنية: واجهات برمجة جديدة، قوالب ثيمات، وتغييرات قد تؤثر على تكاملاتك.</p>

      <h2>ما الذي لا تعلمه هذه المصادر؟</h2>
      <p>مصادر المنصات تعلمك <em>كيف تستخدم الأداة</em>. لكنها لن تخبرك لماذا لا يشتري زوار متجرك تحديدًا، ولا كيف تتميز عن منافس يبيع نفس المنتج. هذا يحتاج قراءة لمتجرك أنت. لهذا كتبنا في مدونتنا أكثر من خمسين مقالًا عمليًا مرتبة حسب المحاور — ابدأ من <a href="/ar/blog/ecommerce-seo-guide">دليل سيو المتاجر</a> أو <a href="/ar/blog/anatomy-of-product-page">تشريح صفحة المنتج</a>.</p>

      <h2>خطة تعلم أسبوعية مقترحة</h2>
      <ol>
        <li><strong>الأحد:</strong> 15 دقيقة لأخبار المنصة.</li>
        <li><strong>الثلاثاء:</strong> درس واحد من الأكاديمية أو مقال واحد من مدونة متخصصة.</li>
        <li><strong>الخميس:</strong> تطبيق شيء واحد تعلمته على متجرك فعلًا.</li>
      </ol>
      <p>التعلم الذي لا يتحول لتعديل في المتجر مجرد تسلية. وإذا كان وقتك لا يسمح بالتطبيق، نطبقه نحن: <a href="/ar/store/digital-marketing">إدارة التسويق</a> أو <a href="/ar/store/store-seo">تحسين التحويل</a>.</p>
    `,
    contentEn: `
      <p>Both major Saudi platforms run free official learning channels that most merchants ignore.</p>
      <ul>
        <li><strong>Salla Community</strong> — the official news feed for every platform update, a partner-apps newsletter, and merchant Q&amp;A.</li>
        <li><strong>Salla Academy</strong> — store management, marketing and operations lessons.</li>
        <li><strong>Zid Hub</strong> — an experience centre with in-person workshops.</li>
        <li><strong>Developer channels</strong> — Zid's developer blog and Salla's docs for technical changes.</li>
      </ul>
      <p>Spend fifteen minutes a week on platform news and apply one thing per week to your store.</p>
    `,
  },

  /* ═══ 9 ═══ */
  {
    id: "ai-in-salla-zid-stores",
    cluster: "news",
    titleAr: "الذكاء الاصطناعي في متاجر سلة وزد: ما الذي يعمل فعلًا في 2026",
    titleEn: "AI in Salla and Zid stores: what actually works in 2026",
    excerptAr: "مشمّر، الربط مع ChatGPT وClaude، زد فويس، تحليل المراجعات، البحث الذكي، وصوت لاسترجاع السلات. خريطة عملية لأدوات الذكاء الاصطناعي المتاحة للتاجر السعودي.",
    excerptEn: "A practical map of the AI tools available to Saudi merchants on Salla and Zid.",
    date: "2026-09-29",
    readTime: 10,
    keywordsAr: ["الذكاء الاصطناعي للمتاجر", "الذكاء الاصطناعي في التجارة الإلكترونية", "أدوات الذكاء الاصطناعي سلة", "زد ذكاء اصطناعي", "تصوير المنتجات بالذكاء الاصطناعي"],
    keywordsEn: ["AI for ecommerce Saudi", "Salla AI", "Zid AI"],
    contentAr: `
      <p>أصبح «الذكاء الاصطناعي» كلمة تُلصق على كل شيء. لكن بالنسبة لتاجر على سلة أو زد، السؤال الوحيد المهم: <strong>أي هذه الأدوات يزيد المبيعات أو يوفر الوقت فعلًا؟</strong> هذه خريطة عملية لما هو متاح اليوم داخل المنصتين وحولهما.</p>

      <h2>1. في التحليل واتخاذ القرار</h2>
      <h3>مشمّر في سلة</h3>
      <p>يشرح أرقام التقارير وأسباب تغيرها، ويجهز الكوبونات عند الطلب. <a href="/ar/blog/mushammer-salla-ai-assistant">الدليل الكامل لمشمّر</a>.</p>
      <h3>الربط مع ChatGPT وClaude</h3>
      <p>إدارة الطلبات والمنتجات والمخزون والتقارير بالمحادثة. <a href="/ar/blog/salla-chatgpt-claude-integration">كيف تستخدمه بأمان</a>.</p>
      <p><strong>الحكم:</strong> يعمل. يوفر وقتًا حقيقيًا في المتابعة اليومية، بشرط أن تسأل أسئلة محددة وتتحقق من الأرقام الحساسة.</p>

      <h2>2. في تجربة العميل</h2>
      <h3>البحث الذكي داخل المتجر</h3>
      <p>أطلقت سلة بحثًا أذكى يساعد العملاء على اكتشاف المنتجات والمحتوى. العميل الذي يستخدم البحث غالبًا يعرف ما يريد — أي أنه أقرب للشراء من أي زائر آخر.</p>
      <h3>توصيات المنتجات</h3>
      <p>«يُشترى معًا» واقتراحات أكثر صلة بالعميل. ترفع متوسط قيمة الطلب دون تكلفة إعلانية إضافية.</p>
      <p><strong>الحكم:</strong> يعمل، وأثره يتضاعف كلما كانت بيانات منتجاتك (الأسماء، التصنيفات، الأوصاف) نظيفة ومكتملة.</p>

      <h2>3. في استرجاع المبيعات</h2>
      <h3>زد فويس</h3>
      <p>وكيل صوتي لاسترجاع السلات المتروكة على زد.</p>
      <h3>قناة صوت مع سلة</h3>
      <p>أعلنت سلة في ليب 2026 شراكة مع صوت لقناة مبيعات بالذكاء الاصطناعي لاسترجاع السلات وإعادة التواصل.</p>
      <p><strong>الحكم:</strong> واعد، ويستحق التجربة. اختبره على شريحة من السلات وقارن النتائج بالرسائل التقليدية قبل التعميم.</p>

      <h2>4. في المحتوى</h2>
      <h3>تحليل المراجعات</h3>
      <p>صار في سلة تحليل لمراجعات المنتجات بالذكاء الاصطناعي. استخدمه لاكتشاف الشكوى المتكررة — مقاس أصغر من المتوقع، لون مختلف عن الصورة — وعالجها في الوصف.</p>
      <h3>تصوير المنتجات بالذكاء الاصطناعي</h3>
      <p>من أكثر الاستخدامات أثرًا للمتاجر الصغيرة: صور منتجات بجودة استوديو دون استوديو. لكن له قاعدة صارمة: الصورة يجب أن تطابق المنتج الحقيقي، وإلا تحولت لإرجاع وتقييم سيئ. هذه خدمة نقدمها في <a href="/ar/store/ai-product-photography">التصوير بالذكاء الاصطناعي</a>.</p>
      <h3>كتابة الأوصاف</h3>
      <p>الذكاء الاصطناعي يكتب مسودة جيدة، لكنه لا يعرف ما يسأل عنه عملاؤك تحديدًا. اكتب المسودة بالأداة، ثم أضف ما تعرفه أنت: الخامة الحقيقية، المقاس الفعلي، وطريقة العناية.</p>

      <h2>5. ما الذي لا يعمل؟</h2>
      <ul>
        <li><strong>محتوى بالجملة بلا مراجعة:</strong> مئة وصف متشابه تضر السيو أكثر مما تنفعه.</li>
        <li><strong>صور مولدة لا تطابق المنتج:</strong> تبيع مرة وتخسر العميل للأبد.</li>
        <li><strong>أتمتة الرد على العملاء بالكامل:</strong> العميل السعودي يقدّر الرد البشري خاصة في الشكاوى.</li>
      </ul>

      <h2>خطة تطبيق في 30 يومًا</h2>
      <ol>
        <li><strong>الأسبوع 1:</strong> نظّف بيانات المنتجات — الأسماء والتصنيفات والأوصاف.</li>
        <li><strong>الأسبوع 2:</strong> فعّل التوصيات والبحث الذكي.</li>
        <li><strong>الأسبوع 3:</strong> اجعل مراجعة التقارير مع مشمّر عادة أسبوعية.</li>
        <li><strong>الأسبوع 4:</strong> اختبر قناة استرجاع السلات الصوتية على شريحة صغيرة.</li>
      </ol>
      <p>إذا أردت أتمتة أعمق تربط متجرك بأنظمتك، راجع <a href="/ar/store/automation-workflows">أتمتة عمليات المتجر</a>.</p>
    `,
    contentEn: `
      <p>A practical map of AI tools for Salla and Zid merchants.</p>
      <ul>
        <li><strong>Analysis:</strong> Mushammer and the ChatGPT/Claude link — they work, with specific questions and verified figures.</li>
        <li><strong>Customer experience:</strong> smart search and recommendations — work best on clean product data.</li>
        <li><strong>Recovery:</strong> Zid Voice and Salla's Sawt channel — promising; test on a segment first.</li>
        <li><strong>Content:</strong> review analysis, AI product photography (must match the real product), and description drafts edited by a human.</li>
      </ul>
      <p>What does not work: unreviewed bulk content, generated photos that misrepresent products, and fully automated customer service.</p>
    `,
  },

  /* ═══ 10 ═══ */
  {
    id: "salla-qitaf-gift-cards-cashback",
    cluster: "news",
    titleAr: "قطاف وبطاقات الهدايا والكاش باك في سلة: ثلاث أدوات ترفع قيمة الطلب",
    titleEn: "Qitaf, gift cards and cashback on Salla",
    excerptAr: "سلة أضافت قطاف كوسيلة دفع، وبطاقات الهدايا، وربط الكاش باك بالكوبونات. كيف تستخدم الثلاثة معًا لرفع متوسط الطلب وتكرار الشراء.",
    excerptEn: "How to combine Qitaf, gift cards and coupon cashback on Salla to raise order value and repeat purchases.",
    date: "2026-09-24",
    readTime: 8,
    keywordsAr: ["قطاف سلة", "الدفع بنقاط قطاف", "بطاقات الهدايا سلة", "كاش باك سلة", "زيادة متوسط قيمة الطلب"],
    keywordsEn: ["Salla Qitaf", "Salla gift cards", "Salla cashback"],
    contentAr: `
      <p>أضافت سلة مؤخرًا ثلاث أدوات تبدو منفصلة، لكنها تعمل معًا بقوة إذا فهمت دور كل واحدة: <strong>قطاف</strong> كوسيلة دفع، و<strong>بطاقات الهدايا</strong>، و<strong>الكاش باك المرتبط بالكوبونات</strong>. الهدف المشترك: عميل يدفع أكثر، ويعود أكثر.</p>

      <h2>قطاف: عميل يدفع بنقاط لا يشعر أنها من جيبه</h2>
      <p>قطاف برنامج نقاط الولاء من STC، وأصبح متاحًا كوسيلة دفع في متاجر سلة. أهميته نفسية قبل أن تكون تقنية: من يملك رصيد نقاط يبحث عن مكان «يستفيد» منه، ويتخذ قرار الشراء أسرع.</p>
      <p><strong>كيف تستفيد:</strong></p>
      <ul>
        <li>فعّله من إعدادات الدفع.</li>
        <li>أعلن عنه: «الآن ادفع بنقاط قطاف» في شريط الإعلانات والسلة.</li>
        <li>اجعله جزءًا من رسائل المواسم.</li>
      </ul>

      <h2>بطاقات الهدايا: عميل جديد يأتي عبر عميل حالي</h2>
      <p>بطاقة الهدية منتج غريب ومربح: تُباع اليوم، وتُستخدم لاحقًا، وغالبًا ينفق المستلم أكثر من قيمتها. والأهم أنها تجلب لمتجرك عميلًا لم يكن يعرفك.</p>
      <p><strong>أفضل توقيت:</strong> رمضان، والعيدين، واليوم الوطني، ويوم التأسيس، والتخرج، ومواسم الأعراس.</p>
      <p><strong>نصيحة:</strong> صمم بطاقة الهدية بعناية — هي أول ما يراه العميل الجديد من علامتك. هوية ضعيفة هنا تهدر الفرصة. راجع <a href="/ar/blog/brand-identity-for-stores">الهوية البصرية للمتاجر</a>.</p>

      <h2>الكاش باك مع الكوبونات: الخصم الذكي</h2>
      <p>أتاحت سلة ربط مكافأة كاش باك بكوبون لعملاء محددين. قارن:</p>
      <ul>
        <li><strong>خصم 15%:</strong> تخسر 15% من الطلب اليوم، والعميل قد لا يعود.</li>
        <li><strong>كاش باك 15%:</strong> يعود للعميل رصيدًا في محفظة متجرك، لا يُصرف إلا عندك — فيعود ليشتري.</li>
      </ul>
      <p>الكاش باك يحول الخصم من تكلفة لمرة واحدة إلى استثمار في الطلب الثاني. راجع أيضًا <a href="/ar/blog/customer-wallet-cashback">محفظة العميل والكاش باك</a>.</p>

      <h2>الخطة المجمعة: موسم واحد، ثلاث أدوات</h2>
      <ol>
        <li><strong>قبل الموسم بأسبوعين:</strong> أطلق بطاقات الهدايا بتصميم موسمي.</li>
        <li><strong>أثناء الموسم:</strong> أعلن عن الدفع بقطاف لجذب حاملي النقاط.</li>
        <li><strong>بعد الطلب الأول:</strong> كوبون بكاش باك للعملاء الجدد يدفعهم للطلب الثاني خلال 30 يومًا.</li>
      </ol>

      <h2>انتبه لهذه الأخطاء</h2>
      <ul>
        <li>كاش باك بلا تاريخ انتهاء — يتحول لالتزام مالي مفتوح.</li>
        <li>بطاقات هدايا بلا شروط استخدام واضحة.</li>
        <li>تفعيل وسيلة دفع دون الإعلان عنها.</li>
      </ul>
      <p>إذا أردت خطة موسمية متكاملة تجمع العروض والحملات، فهذا ما نقدمه في <a href="/ar/store/digital-marketing">إدارة التسويق الإلكتروني</a>.</p>
    `,
    contentEn: `
      <p>Salla recently added Qitaf as a payment method, gift cards, and cashback tied to targeted coupons.</p>
      <h2>How they work together</h2>
      <p>Launch seasonal gift cards two weeks before a season, promote Qitaf payment during it, and follow the first order with a cashback coupon that brings customers back within 30 days.</p>
      <h2>Why cashback beats a discount</h2>
      <p>A discount is a one-off cost; cashback is credit that can only be spent in your store, so it buys you the second order.</p>
    `,
  },

  /* ═══ 11 ═══ */
  {
    id: "salla-shipping-darb-spl-naqel",
    cluster: "news",
    titleAr: "خيارات الشحن الجديدة في سلة: الشحن المبرد مع درب، سبل الاقتصادي، وناقل",
    titleEn: "Salla's new shipping options: Darb chilled, SPL economy and Naqel",
    excerptAr: "سلة وسّعت بوليصاتها: شحن مبرد مع درب للمنتجات الحساسة، شحن اقتصادي مع سبل، وشركات جديدة منها ناقل. كيف تختار الناقل المناسب لكل طلب.",
    excerptEn: "Salla's waybills now include chilled shipping with Darb, economy shipping with SPL and new carriers including Naqel.",
    date: "2026-09-19",
    readTime: 8,
    keywordsAr: ["شحن سلة", "بوليصات سلة", "الشحن المبرد", "شحن درب", "سبل SPL", "ناقل اكسبرس", "أفضل شركة شحن للمتاجر"],
    keywordsEn: ["Salla shipping", "Darb chilled shipping", "SPL Salla", "Naqel Salla"],
    contentAr: `
      <p>الشحن ثاني أكبر سبب لتخلي العميل عن السلة بعد السعر. ولهذا كانت تحديثات <strong>بوليصات سلة</strong> الأخيرة من أهم ما أعلنته المنصة: خيارات أكثر تعني قدرة أكبر على تسعير الشحن بذكاء وتوصيل أنواع منتجات لم تكن ممكنة من قبل.</p>

      <h2>الشحن المبرد مع درب</h2>
      <p>أصبحت شركة <strong>درب</strong> متاحة ضمن بوليصات سلة لشحن المنتجات الحساسة للحرارة. هذا يفتح الباب لفئات كانت تعاني مع الشحن العادي، خاصة في صيف المملكة:</p>
      <ul>
        <li>الحلويات والشوكولاتة والمعجنات.</li>
        <li>الأغذية الطازجة والمجمدة.</li>
        <li>بعض العطور ومستحضرات التجميل التي تتأثر بالحرارة.</li>
      </ul>
      <p><strong>نصيحة تسعير:</strong> الشحن المبرد أعلى تكلفة. لا تخفِ ذلك — اعرض سعره بوضوح واشرح لماذا، أو ارفع الحد الأدنى للطلب المؤهل للشحن المبرد المجاني.</p>

      <h2>الشحن الاقتصادي مع سبل</h2>
      <p>أتاحت سلة الشحن الداخلي في المملكة مع <strong>سبل SPL</strong> ضمن البوليصات المخفضة. خيار مناسب للطلبات الصغيرة التي لا تحتمل تكلفة ناقل سريع، وللعملاء الذين يفضلون السعر على السرعة.</p>

      <h2>ناقل وشركات جديدة</h2>
      <p>أضافت سلة أربع شركات شحن جديدة ضمن بوليصاتها منها <strong>ناقل</strong>. وفي ليب 2026 ذكرت سلة انضمام AJEX وLogistiq وريدبوكس وFastlo لخياراتها.</p>

      <h2>كيف تختار الناقل لكل طلب؟</h2>
      <table>
        <thead><tr><th>نوع الطلب</th><th>الخيار المناسب</th></tr></thead>
        <tbody>
          <tr><td>منتج حساس للحرارة</td><td>شحن مبرد (درب)</td></tr>
          <tr><td>طلب صغير، عميل يهتم بالسعر</td><td>شحن اقتصادي (سبل)</td></tr>
          <tr><td>طلب كبير أو عميل مستعجل</td><td>ناقل سريع</td></tr>
          <tr><td>توصيل لنقطة استلام</td><td>خزائن الاستلام عند توفرها</td></tr>
        </tbody>
      </table>

      <h2>اعرض للعميل خيارين لا عشرة</h2>
      <p>كثرة الخيارات في صفحة الدفع تربك العميل. الأفضل: «اقتصادي» و«سريع» بسعرين ومدتين واضحتين. ويُضاف «مبرد» تلقائيًا للمنتجات التي تحتاجه.</p>

      <h2>الوزن الحجمي: الفخ الذي يأكل الأرباح</h2>
      <p>كثير من التجار يسعّرون الشحن بالوزن الفعلي، ثم يُفاجؤون بفاتورة أعلى لأن الناقل يحاسب بالوزن الحجمي. راجع <a href="/ar/blog/volumetric-weight-shipping-cost">الوزن الحجمي وتكلفة الشحن</a> قبل أن تحدد أسعارك.</p>

      <h2>الخلاصة</h2>
      <p>بوليصات سلة اليوم تغطي احتياجات أغلب المتاجر من البداية. المهم ليس كثرة الناقلين، بل منطق واضح لاختيار كل واحد وتسعير شفاف للعميل. ضبط الشحن والمناطق والأسعار جزء من <a href="/ar/store/salla-store-setup">تجهيز متجر سلة</a>، وربط بوابات الشحن تجده في <a href="/ar/store/payment-shipping-integrations">ربط الدفع والشحن</a>.</p>
    `,
    contentEn: `
      <p>Salla's waybills now include chilled shipping with Darb for temperature-sensitive goods, economy domestic shipping with SPL, and new carriers including Naqel; at LEAP 2026 Salla also named AJEX, Logistiq, RedBox and Fastlo.</p>
      <h2>Choosing per order</h2>
      <p>Chilled for heat-sensitive products, economy for small price-sensitive orders, a fast carrier for large or urgent ones. Show customers two clear options, not ten, and price on volumetric weight.</p>
    `,
  },

  /* ═══ 12 ═══ */
  {
    id: "salla-markets-multi-currency-offers",
    cluster: "news",
    titleAr: "البيع لدول الخليج من متجر سلة: الأسواق والعملات والعروض لكل سوق",
    titleEn: "Selling to the Gulf from Salla: markets, currencies and per-market offers",
    excerptAr: "سلة متاحة في السعودية والإمارات والكويت وقطر والبحرين وعُمان، وأضافت أولوية عروض مستقلة وقيمًا متوافقة مع عملة كل سوق. كيف تبيع للخليج دون أخطاء.",
    excerptEn: "How to sell to Gulf countries from Salla using per-market offer priority and currency-matched values.",
    date: "2026-09-14",
    readTime: 9,
    keywordsAr: ["البيع لدول الخليج", "متجر سلة الإمارات", "سلة متعدد العملات", "التوسع الخليجي للمتاجر", "متجر إلكتروني الكويت", "متجر إلكتروني عمان"],
    keywordsEn: ["sell to GCC from Salla", "Salla multi-currency", "Salla markets"],
    contentAr: `
      <p>تعلن سلة توفرها في <strong>السعودية والإمارات والكويت وقطر والبحرين وعُمان</strong>. وهذا يعني أن متجرك على سلة يمكن أن يخدم السوق الخليجي كله — لكن التوسع الخليجي ليس مجرد تفعيل عملة إضافية. هذا دليل عملي لما يجب ضبطه.</p>

      <h2>ميزات الأسواق الجديدة في سلة</h2>
      <ul>
        <li><strong>عروض متوافقة مع عملة كل سوق:</strong> قيمة العرض تظهر بعملة السوق بدل رقم ثابت بالريال.</li>
        <li><strong>أولوية عروض مستقلة لكل سوق:</strong> عند تعارض عرضين، تحدد أيهما يُطبق في كل سوق على حدة.</li>
      </ul>
      <p>هاتان الميزتان تحلان مشكلة حقيقية: عرض «خصم 50 ريال» يفقد معناه عند عميل يتسوق بالدينار الكويتي.</p>

      <h2>قبل أن تتوسع: أربعة أسئلة</h2>
      <ol>
        <li><strong>هل منتجك مطلوب في هذا السوق؟</strong> ابحث عن منافسين محليين وأسعارهم.</li>
        <li><strong>كم تكلفة الشحن الدولي؟</strong> هل يبقى السعر منافسًا بعدها؟</li>
        <li><strong>ما سياسة الإرجاع عبر الحدود؟</strong> الإرجاع الدولي مكلف.</li>
        <li><strong>هل لديك خدمة عملاء في توقيت ذلك السوق؟</strong></li>
      </ol>

      <h2>ما يختلف في كل سوق</h2>
      <ul>
        <li><strong>الضريبة:</strong> القيمة المضافة 5% في الإمارات وعُمان، و10% في البحرين، ولا ضريبة قيمة مضافة حاليًا في الكويت وقطر.</li>
        <li><strong>الدفع:</strong> وسائل الدفع المفضلة تختلف — كي نت في الكويت، وبنفت باي في البحرين.</li>
        <li><strong>اللغة:</strong> في الإمارات وقطر جمهور كبير يتسوق بالإنجليزية.</li>
      </ul>
      <p>فصّلنا كل سوق في صفحات مخصصة: <a href="/ar/markets/uae">متاجر الإمارات</a>، <a href="/ar/markets/oman">متاجر عُمان</a>، <a href="/ar/markets/kuwait">متاجر الكويت</a>، <a href="/ar/markets/qatar">متاجر قطر</a>، <a href="/ar/markets/bahrain">متاجر البحرين</a>.</p>

      <h2>الشحن الخليجي</h2>
      <p>توفر سلة بوابات شحن دولية تشمل الشحن لدول الخليج. احسب تكلفة الشحن لكل دولة على حدة، واعرضها بوضوح قبل صفحة الدفع — المفاجأة في الشحن أكبر سبب للتخلي عن السلة الدولية.</p>

      <h2>متجر واحد أم متجر لكل دولة؟</h2>
      <p>لأغلب المتاجر: <strong>متجر واحد بأسواق متعددة</strong> أفضل بكثير — مخزون واحد، إدارة واحدة، وسيو موحد. المتجر المنفصل لكل دولة يستحق فقط عندما يصبح لذلك السوق حجم مبيعات وفريق خاص.</p>

      <h2>الخلاصة</h2>
      <p>التوسع الخليجي من سلة أصبح أسهل بعد ميزات الأسواق الأخيرة. ابدأ بسوق واحد قريب من السعودية، اضبطه جيدًا، ثم انتقل للتالي. إذا أردت متجرًا مضبوطًا لعدة أسواق من البداية، تواصل معنا عبر <a href="/ar/store/salla-store-setup">تجهيز متجر سلة</a>.</p>
    `,
    contentEn: `
      <p>Salla lists Saudi Arabia, the UAE, Kuwait, Qatar, Bahrain and Oman as available markets, and now supports currency-matched offer values and independent offer priority per market.</p>
      <h2>Before expanding</h2>
      <p>Check demand, shipping cost, cross-border returns and customer-service hours. VAT is 5% in the UAE and Oman, 10% in Bahrain, and not currently levied in Kuwait or Qatar; preferred payment methods differ too.</p>
      <p>For most stores, one store with several markets beats a store per country.</p>
    `,
  },
];
