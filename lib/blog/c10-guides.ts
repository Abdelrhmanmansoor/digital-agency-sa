import type { Article } from "./types";

/* Long-form guides written to answer the highest-intent searches Saudi
   merchants make about Salla and Zid. Regulatory points are written as the
   current public guidance and always point the reader to the official
   portal; where sources disagree (freelance document vs commercial
   register) the article says so rather than picking a side. */

export const GUIDES: Article[] = [
  /* ═══ 1 ═══ */
  {
    id: "salla-vs-zid-2026",
    cluster: "start",
    titleAr: "مقارنة سلة وزد 2026: أيهما أفضل لمتجرك؟ المزايا والفروق والقرار",
    titleEn: "Salla vs Zid in 2026: which is right for your store?",
    excerptAr: "مقارنة محدثة بين منصة سلة ومنصة زد في 2026: الدفع، الشحن، المخزون، الذكاء الاصطناعي، الأسواق، والتطبيقات — ومتى تختار كل منصة.",
    excerptEn: "An updated 2026 comparison of Salla and Zid across payments, shipping, inventory, AI, marketplaces and apps.",
    date: "2026-11-01",
    readTime: 12,
    keywordsAr: ["مقارنة سلة وزد", "سلة ام زد", "أفضل منصة متجر الكتروني في السعودية", "الفرق بين سلة وزد", "سلة وزد 2026", "منصة سلة", "منصة زد"],
    keywordsEn: ["Salla vs Zid", "Salla or Zid 2026", "best ecommerce platform Saudi Arabia"],
    contentAr: `
      <p>«<strong>سلة أم زد؟</strong>» أكثر سؤال يُطرح على أي وكالة تجارة إلكترونية في السعودية. كتبنا سابقًا <a href="/ar/blog/salla-vs-zid-vs-shopify">مقارنة بين سلة وزد وشوبيفاي</a> مبنية على ثلاثة أسئلة أساسية. هذه المقارنة محدثة لعام 2026، بعد موجة تحديثات كبيرة في المنصتين، وتركز على الفروق التي تؤثر فعلًا على قرارك.</p>

      <h2>نظرة سريعة</h2>
      <table>
        <thead><tr><th>المحور</th><th>سلة</th><th>زد</th></tr></thead>
        <tbody>
          <tr><td>الأسواق المعلنة</td><td>السعودية، الإمارات، الكويت، قطر، البحرين، عُمان</td><td>السعودية، الإمارات، الكويت، عُمان، البحرين، مصر، سوريا</td></tr>
          <tr><td>التطبيقات</td><td>أكثر من 900 تكامل حسب بوابة المطورين</td><td>أكثر من 400 تطبيق حسب موقع زد</td></tr>
          <tr><td>الذكاء الاصطناعي</td><td>مشمّر، الربط مع ChatGPT وClaude، بحث ذكي، تحليل المراجعات</td><td>زد فويس لاسترجاع السلات، أدوات مطورين للذكاء الاصطناعي</td></tr>
          <tr><td>الأسواق الخارجية</td><td>منصة محلي المجانية</td><td>أمازون، ترينديول، جاهز، وسوق مزيد</td></tr>
          <tr><td>نقاط البيع والمخزون</td><td>إدارة الفروع والمستودعات</td><td>نقطة قوة تقليدية: POS ومخزون متقدم</td></tr>
          <tr><td>التمويل</td><td>—</td><td>تمويل رأس المال العامل</td></tr>
        </tbody>
      </table>
      <p><em>الأرقام والقوائم كما تعلنها المنصتان على مواقعهما الرسمية في نوفمبر 2026.</em></p>

      <h2>الدفع</h2>
      <p>المنصتان تغطيان أساسيات السوق السعودي: مدى وفيزا وماستركارد وأبل باي والتقسيط. سلة أضافت مؤخرًا <strong>قطاف</strong> وأبل باي من أي جهاز، واستحوذت على بيلينك نحو دفع موحد بين القنوات. زد تقدم «زد باي» ضمن منظومتها. <strong>الحكم:</strong> تعادل تقريبًا لأغلب المتاجر.</p>

      <h2>الشحن</h2>
      <p>سلة وسعت بوليصاتها بشكل واضح: الشحن المبرد مع درب، الاقتصادي مع سبل، وشركات جديدة منها ناقل، إضافة لاتفاقية تخزين وتجهيز مع أرامكس. زد تقدم حلول شحن عبر «زد لوجستكس» وشركاء معتمدين. <strong>الحكم:</strong> سلة أوسع خيارات في 2026، خاصة للمنتجات المبردة.</p>

      <h2>المخزون والفروع</h2>
      <p>هنا تتقدم <strong>زد</strong> تقليديًا: نقاط بيع وإدارة مخزون متقدمة تناسب العلامات التي لديها معارض وفروع. سلة أضافت إدارة الفروع والمستودعات دفعة واحدة، لكن إذا كانت عملياتك ثقيلة ومتعددة المواقع، فزد خيار قوي.</p>

      <h2>التسويق ورفع قيمة الطلب</h2>
      <p>سلة غنية بأدوات مدمجة: بطاقات الهدايا، كاش باك مرتبط بالكوبونات، توصيات «يُشترى معًا»، عروض لكل سوق. <strong>الحكم:</strong> سلة تتقدم لمن يريد أدوات تسويق جاهزة دون تطبيقات خارجية.</p>

      <h2>البيع خارج متجرك</h2>
      <p>إذا كانت خطتك البيع على <strong>أمازون وترينديول وجاهز</strong>، فزد توفر الربط مباشرة. سلة تقدم <strong>منصة محلي</strong> المجانية للمتاجر السعودية. التفاصيل في <a href="/ar/blog/zid-marketplaces-amazon-trendyol-jahez">البيع على الأسواق من زد</a> و<a href="/ar/blog/salla-mahalli-marketplace">منصة محلي</a>.</p>

      <h2>التصميم والثيمات</h2>
      <p>المنصتان تسمحان بثيم مخصص بالكامل. سلة تبني ثيماتها بنظام «توايلايت»، وزد بثيمات «فيترين» التي أضيفت لها مؤخرًا صفحات العلامات التجارية. <strong>الحكم:</strong> النتيجة البصرية تعتمد على المصمم لا المنصة.</p>

      <h2>القرار: متى تختار كل منصة؟</h2>
      <h3>اختر سلة إذا:</h3>
      <ul>
        <li>تنطلق لأول مرة وتريد متجرًا يعمل خلال أيام.</li>
        <li>تعتمد على التسويق والعروض وتريد أدوات مدمجة.</li>
        <li>تبيع منتجات تحتاج شحنًا مبردًا.</li>
        <li>تخطط للبيع لدول الخليج من متجر واحد.</li>
      </ul>
      <h3>اختر زد إذا:</h3>
      <ul>
        <li>لديك فروع أو معارض وتحتاج نقاط بيع مرتبطة بالمخزون.</li>
        <li>تريد البيع على أمازون وترينديول وجاهز من لوحة واحدة.</li>
        <li>عملياتك ثقيلة ومخزونك كبير ومتعدد المستودعات.</li>
      </ul>

      <h2>هل يمكن الانتقال لاحقًا؟</h2>
      <p>نعم، لكنه مكلف: نقل المنتجات والعملاء والروابط مع الحفاظ على ترتيبك في جوجل يحتاج تخطيطًا. الأفضل أن تختار صحيحًا من البداية.</p>
      <p>نعمل على المنصتين يوميًا. إذا أردت رأيًا مبنيًا على نشاطك أنت، <a href="https://wa.me/201007835547">تحدث معنا على واتساب</a> — أو ابدأ مباشرة بـ<a href="/ar/store/salla-store-setup">تجهيز متجر سلة</a>.</p>
    `,
    contentEn: `
      <p>An updated 2026 comparison following a wave of updates on both platforms. Figures are as each platform states on its official site (Nov 2026).</p>
      <ul>
        <li><strong>Markets:</strong> Salla — KSA, UAE, Kuwait, Qatar, Bahrain, Oman. Zid — KSA, UAE, Kuwait, Oman, Bahrain, Egypt, Syria.</li>
        <li><strong>Apps:</strong> Salla 900+ integrations; Zid 400+ apps.</li>
        <li><strong>AI:</strong> Salla's Mushammer, ChatGPT/Claude link and smart search; Zid Voice.</li>
        <li><strong>Marketplaces:</strong> Salla's free Mahalli; Zid's Amazon, Trendyol, Jahez and Mazeed.</li>
        <li><strong>Inventory/POS:</strong> a traditional Zid strength.</li>
      </ul>
      <h2>Decision</h2>
      <p>Choose Salla for a fast first launch, built-in marketing tools, chilled shipping and Gulf selling from one store. Choose Zid for branches with POS, marketplace selling from one dashboard and heavy multi-warehouse operations.</p>
    `,
  },

  /* ═══ 2 ═══ */
  {
    id: "freelance-document-vs-commercial-register",
    cluster: "start",
    titleAr: "وثيقة العمل الحر أم السجل التجاري لمتجرك الإلكتروني في 2026؟",
    titleEn: "Freelance document or commercial register for your online store?",
    excerptAr: "ما الفرق بين وثيقة العمل الحر والسجل التجاري لفتح متجر إلكتروني في السعودية، ومتى يكفي كل منهما، وما الذي يجب أن يظهر في متجرك بعد التوثيق.",
    excerptEn: "The difference between the freelance document and a commercial register for a Saudi online store, and when each fits.",
    date: "2026-10-28",
    readTime: 9,
    keywordsAr: ["وثيقة العمل الحر", "وثيقة العمل الحر للمتجر الالكتروني", "سجل تجاري متجر الكتروني", "شروط فتح متجر الكتروني في السعودية", "توثيق متجر الكتروني", "المركز السعودي للأعمال"],
    keywordsEn: ["freelance document Saudi online store", "commercial register ecommerce Saudi"],
    contentAr: `
      <p>قبل أن تفتح متجرك على سلة أو زد، ستواجه سؤالًا قانونيًا: <strong>هل أحتاج سجلًا تجاريًا أم تكفي وثيقة العمل الحر؟</strong> الإجابة تختلف حسب حجم نشاطك وطبيعته، والمصادر نفسها لا تتفق تمامًا. هذا المقال يعرض الصورة كما هي، ويضع أمامك معايير القرار — مع التنبيه أن المرجع النهائي دائمًا هو البوابات الرسمية.</p>

      <h2>ما وثيقة العمل الحر؟</h2>
      <p>وثيقة تصدر للأفراد الذين يمارسون عملًا حرًا، وتُستخرج عبر منصة العمل الحر. كثير من التجار الأفراد يستخدمونها لبدء متجر صغير. الشروط التي تذكرها أغلب المصادر:</p>
      <ul>
        <li>أن يكون المتقدم سعوديًا مقيمًا في المملكة.</li>
        <li>العمر بين 20 و60 عامًا.</li>
        <li>حساب مفعّل في أبشر.</li>
      </ul>
      <p>وتذكر مصادر متعددة أنها تُصدر دون رسوم. <strong>تحقق من الشروط الحالية في منصة العمل الحر قبل التقديم</strong>، فالاشتراطات تتحدث.</p>

      <h2>ما السجل التجاري؟</h2>
      <p>يصدر من وزارة التجارة، ويُحدد فيه النشاط بوضوح، ومنه نشاط «التجارة الإلكترونية». السجل يمنحك كيانًا تجاريًا كاملًا: فتح حسابات بنكية تجارية بسهولة، التعاقد مع موردين وشركات شحن كمنشأة، والتوسع بموظفين.</p>

      <h2>أين الخلاف؟</h2>
      <p>بعض المصادر ترى أن وثيقة العمل الحر كافية للمتجر الفردي الصغير وتمكّن من فتح حساب بنكي وتوثيق المتجر، وبعضها يرى أن المتجر الإلكتروني كيان تجاري يستوجب السجل. الحقيقة العملية أن <strong>الوثيقة مناسبة للبداية الفردية الصغيرة، والسجل ضرورة عند النمو</strong>.</p>

      <h2>متى تكفي وثيقة العمل الحر؟</h2>
      <ul>
        <li>تبدأ وحدك دون موظفين.</li>
        <li>حجم المبيعات صغير وتختبر الفكرة.</li>
        <li>تبيع منتجات لا تحتاج تراخيص خاصة.</li>
      </ul>

      <h2>متى تحتاج السجل التجاري؟</h2>
      <ul>
        <li>تنوي توظيف فريق.</li>
        <li>تتعامل مع موردين ومستوردين بعقود تجارية.</li>
        <li>تقترب مبيعاتك من حد التسجيل في ضريبة القيمة المضافة — راجع <a href="/ar/blog/vat-setup-for-stores">ضبط الضريبة في متجرك</a>.</li>
        <li>تبيع منتجات تتطلب تراخيص (أغذية، مستحضرات، أجهزة).</li>
      </ul>

      <h2>المقيمون وغير السعوديين</h2>
      <p>تذكر المصادر أن المستثمر الأجنبي يحتاج عادة ترخيصًا استثماريًا من وزارة الاستثمار قبل السجل التجاري. هذا مسار أطول، ويستحق استشارة متخصصة.</p>

      <h2>بعد الوثيقة أو السجل: التوثيق في المتجر</h2>
      <p>يجب أن يعرض متجرك بوضوح بيانات التاجر: الاسم، وسيلة التواصل، ورقم السجل أو الوثيقة. وتوثيق المتجر في المنصة يرفع ثقة العميل. شرحنا الخطوات في <a href="/ar/blog/salla-store-verification">توثيق متجر سلة</a>، وما يجب أن يظهر في المتجر نظاميًا في <a href="/ar/blog/ecommerce-law-store-obligations">التزامات نظام التجارة الإلكترونية</a>.</p>

      <h2>الخلاصة</h2>
      <p>ابدأ بالأبسط الذي يناسب حجمك اليوم، وخطط للانتقال للسجل عندما تنمو. لا تؤخر إطلاق متجرك بسبب هذا القرار — لكن لا تبدأ دون أي منهما. وعندما تكون أوراقك جاهزة، نجهز لك المتجر كاملًا في <a href="/ar/store/salla-store-setup">تجهيز متجر سلة</a>.</p>
      <p><em>هذا المقال للتوعية وليس استشارة قانونية. راجع منصة العمل الحر ووزارة التجارة للاشتراطات الحالية.</em></p>
    `,
    contentEn: `
      <p>Should you start with a freelance document or a commercial register? Sources disagree; practically, the freelance document suits a small solo start, and the commercial register becomes necessary as you grow — staff, supplier contracts, VAT registration or licensed products.</p>
      <p>Foreign investors generally need an investment licence first. Whichever you hold, your store must display the merchant's details clearly. This is general guidance, not legal advice — check the official portals.</p>
    `,
  },

  /* ═══ 3 ═══ */
  {
    id: "ecommerce-law-store-obligations",
    cluster: "start",
    titleAr: "نظام التجارة الإلكترونية في السعودية: ما الذي يجب أن يظهر في متجرك",
    titleEn: "Saudi e-commerce law: what your store must show",
    excerptAr: "التزامات المتجر الإلكتروني تجاه المستهلك: بيانات التاجر، الأسعار، الشحن، الاسترجاع، والخصوصية — قائمة تطبيقية لمتاجر سلة وزد.",
    excerptEn: "A practical compliance checklist for Salla and Zid stores under Saudi e-commerce rules.",
    date: "2026-10-24",
    readTime: 8,
    keywordsAr: ["نظام التجارة الإلكترونية السعودي", "شروط المتجر الالكتروني", "سياسة الاسترجاع متجر الكتروني", "حقوق المستهلك المتاجر الالكترونية", "صفحات السياسات للمتجر"],
    keywordsEn: ["Saudi ecommerce law", "online store compliance Saudi"],
    contentAr: `
      <p>نظام التجارة الإلكترونية في المملكة وُضع لحماية المستهلك وبناء الثقة في الشراء عبر الإنترنت. الالتزام به ليس عبئًا قانونيًا فقط؛ هو نفسه ما يرفع ثقة العميل ومعدل التحويل. هذه قائمة تطبيقية لما يجب أن يظهر في متجرك على سلة أو زد.</p>

      <h2>1. بيانات التاجر بوضوح</h2>
      <ul>
        <li>اسم التاجر أو المنشأة.</li>
        <li>رقم السجل التجاري أو وثيقة العمل الحر.</li>
        <li>وسائل التواصل: بريد، رقم، واتساب.</li>
        <li>العنوان أو المدينة.</li>
      </ul>
      <p>ضعها في التذييل وفي صفحة «من نحن». العميل الذي يرى من يبيع له يشتري بثقة أكبر.</p>

      <h2>2. السعر الكامل قبل الدفع</h2>
      <p>يجب أن يعرف العميل السعر النهائي: سعر المنتج، وتكلفة الشحن، والضريبة إن وجدت، قبل أن يدفع. الرسوم المفاجئة في الخطوة الأخيرة ليست مخالفة لروح النظام فقط، بل أكبر سبب لترك السلة.</p>

      <h2>3. وصف دقيق للمنتج</h2>
      <p>الخامة، المقاس، اللون، والمواصفات كما هي. صورة لا تطابق المنتج تعني إرجاعًا وشكوى. راجع <a href="/ar/blog/anatomy-of-product-page">تشريح صفحة المنتج</a>.</p>

      <h2>4. سياسة الشحن</h2>
      <ul>
        <li>المدن والمناطق التي تشحن إليها.</li>
        <li>المدة المتوقعة للتوصيل.</li>
        <li>التكلفة أو شروط الشحن المجاني.</li>
      </ul>

      <h2>5. سياسة الاسترجاع والاستبدال</h2>
      <p>اكتبها بلغة بسيطة: المدة المسموحة، والحالات المقبولة، ومن يتحمل تكلفة الشحن، وطريقة الاسترداد. واذكر بوضوح المنتجات المستثناة إن وجدت ولماذا. شرحنا البناء الكامل في <a href="/ar/blog/returns-and-refunds">الاسترجاع والاسترداد</a>.</p>

      <h2>6. الخصوصية وملفات تعريف الارتباط</h2>
      <p>صفحة خصوصية توضح البيانات التي تجمعها ولماذا. وأضافت سلة مؤخرًا إمكانية تخصيص ملفات تعريف الارتباط للعملاء — فعّلها.</p>

      <h2>7. فاتورة لكل طلب</h2>
      <p>إذا كنت مسجلًا في الضريبة فالفاتورة الإلكترونية إلزامية بمواصفات هيئة الزكاة والضريبة والجمارك. راجع <a href="/ar/blog/zatca-e-invoicing-waves-2026">الفوترة الإلكترونية وموجات الربط</a>.</p>

      <h2>قائمة مراجعة سريعة</h2>
      <ol>
        <li>بيانات التاجر في التذييل ✔</li>
        <li>صفحة سياسة الشحن ✔</li>
        <li>صفحة سياسة الاسترجاع ✔</li>
        <li>صفحة الخصوصية ✔</li>
        <li>السعر النهائي ظاهر قبل الدفع ✔</li>
        <li>أوصاف منتجات دقيقة ✔</li>
      </ol>
      <p>صفحات السياسات بصياغة متوافقة جزء أساسي من <a href="/ar/store/salla-store-setup">باقة تجهيز متجر سلة</a>.</p>
      <p><em>للتوعية العامة وليس استشارة قانونية؛ راجع وزارة التجارة للنص النظامي.</em></p>
    `,
    contentEn: `
      <p>A practical checklist for Saudi stores: merchant details in the footer, the full price before payment, accurate product descriptions, clear shipping and returns policies, a privacy page with cookie choices, and a compliant e-invoice for every order where VAT applies. General guidance, not legal advice.</p>
    `,
  },

  /* ═══ 4 ═══ */
  {
    id: "zatca-e-invoicing-waves-2026",
    cluster: "payments",
    titleAr: "الفوترة الإلكترونية للمتاجر 2026: الموجة 24 والموجة 25 — هل متجرك ملزم بالربط؟",
    titleEn: "ZATCA e-invoicing 2026: waves 24 and 25 for online stores",
    excerptAr: "المرحلة الثانية من الفوترة الإلكترونية تصل للمنشآت الأصغر. حدود الإيرادات، مواعيد الربط مع منصة فاتورة، وكيف تجهز متجرك على سلة أو زد.",
    excerptEn: "Phase two e-invoicing reaches smaller businesses. Thresholds, deadlines and how to prepare your Salla or Zid store.",
    date: "2026-10-20",
    readTime: 9,
    keywordsAr: ["الفوترة الإلكترونية", "الموجة 24 الفوترة الالكترونية", "الموجة 25", "المرحلة الثانية الفاتورة الالكترونية", "منصة فاتورة", "هيئة الزكاة والضريبة والجمارك", "الفاتورة الالكترونية للمتاجر"],
    keywordsEn: ["ZATCA wave 24", "ZATCA wave 25", "e-invoicing Saudi online store"],
    contentAr: `
      <p>المرحلة الثانية من <strong>الفوترة الإلكترونية</strong> («مرحلة الربط والتكامل» مع منصة فاتورة) تُطبق على موجات، كل موجة تستهدف منشآت بحد إيرادات أقل من السابقة. ومع وصول الموجات لحدود منخفضة، أصبح كثير من المتاجر الإلكترونية الصغيرة والمتوسطة معنيًا مباشرة.</p>

      <h2>أين وصلت الموجات؟</h2>
      <ul>
        <li><strong>الموجة 23:</strong> المنشآت التي تجاوزت إيراداتها 750 ألف ريال في أحد أعوام 2022 أو 2023 أو 2024، وانتهت مهلتها في 31 مارس 2026.</li>
        <li><strong>الموجة 24:</strong> المنشآت التي تجاوزت إيراداتها الخاضعة للضريبة <strong>375 ألف ريال</strong> خلال 2022 أو 2023 أو 2024، وكان موعد الربط <strong>30 يونيو 2026</strong> — وهو نفسه حد التسجيل الإلزامي في ضريبة القيمة المضافة.</li>
        <li><strong>الموجة 25:</strong> نقلت تقارير إخبارية أن الهيئة حددت معاييرها لتبدأ في <strong>1 فبراير 2027</strong> وتستهدف المنشآت التي تجاوزت إيراداتها الخاضعة للضريبة <strong>187,500 ريال</strong> في السنوات من 2022 حتى 2025. هذا وفق مصدر إخباري، فتحقق من إشعار الهيئة الرسمي.</li>
      </ul>
      <p>تُشعر الهيئة المنشآت المستهدفة قبل موعد الإلزام بفترة كافية. <strong>المرجع الوحيد لمعرفة إن كنت مشمولًا هو إشعار الهيئة وبوابة فاتورة.</strong></p>

      <h2>ماذا يعني «الربط» لمتجرك؟</h2>
      <p>في المرحلة الأولى كان يكفي إصدار فاتورة إلكترونية بمواصفات محددة. في المرحلة الثانية يجب أن يتصل نظام الفوترة لديك بمنصة الهيئة «فاتورة» ويرسل الفواتير إليها وفق آلية الربط. أي أن الفاتورة لم تعد ملفًا تحفظه، بل بيانات تُرسل.</p>

      <h2>كيف تجهز متجرك على سلة أو زد؟</h2>
      <ol>
        <li><strong>اعرف وضعك:</strong> راجع إيراداتك الخاضعة للضريبة للسنوات المذكورة، وتابع أي إشعار من الهيئة.</li>
        <li><strong>اضبط بيانات المنشأة:</strong> الرقم الضريبي والعنوان الوطني والسجل في إعدادات المتجر.</li>
        <li><strong>اختر حل الفوترة المتوافق:</strong> عبر الحلول والتطبيقات المتاحة في متجر تطبيقات المنصة أو نظامك المحاسبي، وتأكد أنه يدعم الربط مع فاتورة.</li>
        <li><strong>اختبر قبل الموعد:</strong> أصدر فواتير تجريبية وتأكد من وصولها.</li>
        <li><strong>اربط المحاسبة:</strong> الفاتورة يجب أن تتطابق مع سجلاتك المحاسبية.</li>
      </ol>

      <h2>أخطاء شائعة</h2>
      <ul>
        <li>انتظار اللحظة الأخيرة — الربط قد يحتاج أسابيع من التجربة.</li>
        <li>بيانات منشأة غير مكتملة في المتجر.</li>
        <li>فواتير الطلبات اليدوية ترسل خارج النظام.</li>
        <li>إهمال فواتير الإرجاع (الإشعارات الدائنة).</li>
      </ul>
      <p>للأساسيات اقرأ <a href="/ar/blog/zatca-e-invoicing-stores">الفوترة الإلكترونية للمتاجر</a> و<a href="/ar/blog/vat-setup-for-stores">ضبط ضريبة القيمة المضافة</a>.</p>

      <h2>الخلاصة</h2>
      <p>إذا تجاوزت إيراداتك 187,500 ريال، فاحتمال أن تصلك موجة قريبة كبير. جهز متجرك الآن بدل أن تجهزه تحت ضغط الموعد. ضبط الضريبة والفوترة جزء من <a href="/ar/store/salla-store-setup">تجهيز متجر سلة</a>، وربط الأنظمة المحاسبية من <a href="/ar/store/automation-workflows">الأتمتة وربط الأنظمة</a>.</p>
      <p><em>للتوعية العامة؛ المرجع الرسمي هو هيئة الزكاة والضريبة والجمارك وبوابة فاتورة.</em></p>
    `,
    contentEn: `
      <p>Phase two of ZATCA e-invoicing rolls out in waves with falling revenue thresholds.</p>
      <ul>
        <li><strong>Wave 23:</strong> revenue above SAR 750k in 2022–2024; deadline 31 March 2026.</li>
        <li><strong>Wave 24:</strong> taxable revenue above SAR 375k in 2022–2024; integration due 30 June 2026.</li>
        <li><strong>Wave 25:</strong> reported to start 1 February 2027 for taxable revenue above SAR 187,500 in 2022–2025 — per a news report; confirm with ZATCA.</li>
      </ul>
      <p>Know your status, complete your business data, choose a Fatoora-compatible solution, test early and reconcile with your accounting.</p>
    `,
  },

  /* ═══ 5 ═══ */
  {
    id: "saudi-ecommerce-market-2026",
    cluster: "marketing",
    titleAr: "سوق التجارة الإلكترونية في السعودية 2026: الأرقام كما هي بلا مبالغة",
    titleEn: "The Saudi e-commerce market in 2026: the numbers without hype",
    excerptAr: "تقديرات حجم سوق التجارة الإلكترونية السعودي تختلف بأكثر من عشرة أضعاف بين مصدر وآخر. كيف تقرأ الأرقام، وما المؤشرات التي تهمك كتاجر فعلًا.",
    excerptEn: "Market-size estimates differ more than tenfold. How to read them and which indicators actually matter to a merchant.",
    date: "2026-10-12",
    readTime: 8,
    keywordsAr: ["سوق التجارة الالكترونية في السعودية", "حجم التجارة الالكترونية السعودية 2026", "نمو التجارة الالكترونية", "إحصائيات التجارة الالكترونية السعودية", "مستقبل المتاجر الالكترونية"],
    keywordsEn: ["Saudi ecommerce market 2026", "Saudi ecommerce statistics"],
    contentAr: `
      <p>ابحث عن «حجم سوق التجارة الإلكترونية في السعودية 2026» وستجد أرقامًا لا يمكن أن تكون كلها صحيحة: تقرير يقول نحو 21 مليار دولار، وآخر نحو 31 مليارًا، وثالث يقفز لما يقارب 290 مليارًا. الفرق ليس خطأ مطبعيًا — كل جهة تعرّف «التجارة الإلكترونية» بطريقة مختلفة. هذا المقال يشرح كيف تقرأ هذه الأرقام، وما الذي يهمك أنت كتاجر.</p>

      <h2>لماذا تختلف التقديرات بهذا الشكل؟</h2>
      <ul>
        <li><strong>ماذا يُحسب؟</strong> بعض التقارير تحسب بيع التجزئة للمستهلك فقط، وبعضها يضيف التجارة بين الشركات، والسفر، والخدمات الرقمية.</li>
        <li><strong>المنهجية:</strong> مسوحات، تقديرات من بيانات الدفع، أو نماذج إحصائية.</li>
        <li><strong>الهدف:</strong> بعض التقارير تجارية تُباع للمستثمرين وتميل للأرقام الكبيرة.</li>
      </ul>
      <p>من التقديرات المنشورة لعام 2026: مؤسسة Mordor Intelligence نحو 31.3 مليار دولار مع نمو سنوي مركب قرابة 12% حتى 2031، وMarkNtel Advisors نحو 21.3 مليار دولار، بينما تقدير IMARC يصل لنحو 290.8 مليار دولار ويبدو استثناءً بتعريف أوسع بكثير.</p>

      <h2>المؤشر الرسمي الذي يستحق المتابعة</h2>
      <p>الأهم من حجم السوق المطلق هو <strong>اتجاه النمو</strong>. ونقلت مصادر ثانوية أن مؤشر مبيعات التجارة الإلكترونية الصادر عن الهيئة العامة للإحصاء ارتفع بنحو 13.6% على أساس سنوي في الربع الأول من 2026، مقابل نمو أقل لقطاع تجارة الجملة والتجزئة عمومًا. تحقق من النشرة الرسمية للهيئة للأرقام الدقيقة، لكن الاتجاه واضح: التجارة الإلكترونية تنمو أسرع من التجارة التقليدية.</p>

      <h2>ما الذي يهمك كتاجر فعلًا؟</h2>
      <h3>1. المنافسة تزداد</h3>
      <p>تشير بيانات منصات تتبع المتاجر إلى نمو عدد المتاجر النشطة على المنصات السعودية بنسب كبيرة سنويًا. أي أن «فتح متجر» لم يعد ميزة — التميز هو الميزة.</p>
      <h3>2. العميل أصبح أكثر خبرة</h3>
      <p>العميل السعودي اليوم يقارن الأسعار، ويقرأ التقييمات، ويتوقع شحنًا سريعًا ودفعًا مرنًا. متجر بتجربة متوسطة يخسر أمام متجر بتجربة ممتازة حتى لو كان سعره أقل.</p>
      <h3>3. الجوال هو المتجر</h3>
      <p>أغلب الزيارات من الجوال. صمم لشاشة الجوال أولًا. راجع <a href="/ar/blog/store-speed-and-core-web-vitals">سرعة المتجر</a>.</p>
      <h3>4. الثقة هي العملة</h3>
      <p>التوثيق، التقييمات الحقيقية، سياسات واضحة، وهوية احترافية — هذه ما يحول الزائر الجديد لعميل.</p>

      <h2>كيف تستخدم هذه المعلومات؟</h2>
      <ul>
        <li>لا تبنِ خطة عمل على رقم حجم سوق واحد — استخدم نطاقًا وافترض الأقل.</li>
        <li>ركز على حصتك من سوقك المحدد (فئتك، مدينتك، جمهورك) لا السوق الكلي.</li>
        <li>استثمر في ما يرفع التحويل قبل ما يرفع الزيارات.</li>
      </ul>
      <p>إذا أردت متجرًا ينافس في سوق مزدحم، ابدأ بأساس صحيح: <a href="/ar/store/salla-store-setup">تجهيز متجر</a>، <a href="/ar/store/brand-identity-design">هوية بصرية</a>، و<a href="/ar/store/store-seo">سيو وتحويل</a>.</p>
    `,
    contentEn: `
      <p>2026 estimates of the Saudi e-commerce market vary wildly — about USD 21bn (MarkNtel), USD 31bn (Mordor Intelligence) and USD 290bn (IMARC, likely a much broader definition). The direction matters more: secondary sources report GASTAT's e-commerce sales index up about 13.6% year on year in Q1 2026 — check the official release.</p>
      <p>For merchants: competition is rising, customers are more experienced, mobile is the store, and trust is the currency. Plan on a conservative range and invest in conversion before traffic.</p>
    `,
  },

  /* ═══ 6 ═══ */
  {
    id: "salla-store-design-guide",
    cluster: "design",
    titleAr: "تصميم متجر سلة احترافي: الدليل الكامل خطوة بخطوة 2026",
    titleEn: "Designing a professional Salla store: the complete 2026 guide",
    excerptAr: "من الهوية إلى الصفحة الرئيسية وصفحة المنتج والجوال — دليل شامل لتصميم متجر سلة يبيع، مع أخطاء التصميم الأكثر تكلفة وكيف تتجنبها.",
    excerptEn: "From identity to homepage, product page and mobile — a complete guide to designing a Salla store that sells.",
    date: "2026-10-07",
    readTime: 13,
    keywordsAr: ["تصميم متجر سلة", "تصميم متجر سلة احترافي", "تصميم متجر الكتروني", "ثيم سلة", "تصميم متاجر سلة", "افضل تصميم متجر سلة", "سعر تصميم متجر سلة"],
    keywordsEn: ["Salla store design", "professional Salla store", "Salla theme design"],
    contentAr: `
      <p><strong>تصميم متجر سلة</strong> ليس اختيار ثيم وألوان. التصميم الجيد هو ما يجعل الزائر يثق خلال ثوانٍ، ويجد المنتج خلال نقرتين، ويكمل الدفع دون تردد. هذا الدليل يمشي معك خطوة بخطوة، من الهوية حتى آخر تفصيلة في صفحة الدفع.</p>

      <h2>الخطوة 1: الهوية قبل الثيم</h2>
      <p>أكبر خطأ: اختيار ثيم أولًا ثم محاولة «تركيب» العلامة عليه. ابدأ بالهوية: الشعار، والألوان، والخطوط، ونبرة الكلام. بعدها يصبح الثيم أداة لتطبيق هوية واضحة. اقرأ <a href="/ar/blog/brand-identity-for-stores">الهوية البصرية للمتاجر</a>.</p>
      <p><strong>قاعدة الألوان:</strong> لون أساسي واحد، ولون مساند، وخلفيات محايدة. المتجر بخمسة ألوان متنافسة يبدو غير احترافي مهما كانت منتجاته.</p>

      <h2>الخطوة 2: ثيم جاهز أم مخصص؟</h2>
      <p>الثيم الجاهز أسرع وأرخص، والمخصص يميزك ويُبنى حول منتجاتك. القرار يعتمد على مرحلتك ومنافستك. فصّلنا ذلك في <a href="/ar/blog/ready-theme-vs-custom">الثيم الجاهز أم المخصص</a>.</p>

      <h2>الخطوة 3: الصفحة الرئيسية</h2>
      <p>الصفحة الرئيسية تجيب عن ثلاثة أسئلة في أول شاشة: <strong>ماذا تبيع؟ لمن؟ ولماذا أنت؟</strong></p>
      <ul>
        <li><strong>بانر رئيسي واحد قوي</strong> بدل سلايدر من خمس صور لا يراها أحد.</li>
        <li><strong>التصنيفات الأساسية</strong> بصور واضحة مباشرة تحت البانر.</li>
        <li><strong>الأكثر مبيعًا</strong> — دليل اجتماعي فوري.</li>
        <li><strong>شريط الثقة:</strong> الشحن، والدفع، والاسترجاع.</li>
        <li><strong>التقييمات</strong> الحقيقية.</li>
      </ul>
      <p>التفاصيل في <a href="/ar/blog/homepage-elements-that-sell">عناصر الصفحة الرئيسية التي تبيع</a>.</p>

      <h2>الخطوة 4: صفحة المنتج — أهم صفحة في متجرك</h2>
      <p>هنا يُتخذ قرار الشراء. صفحة المنتج القوية فيها:</p>
      <ol>
        <li>صور متعددة بخلفية نظيفة، وصورة استخدام واحدة على الأقل.</li>
        <li>فيديو قصير — سلة تتيح الآن إضافة فيديو للمنتج من جهازك مباشرة.</li>
        <li>اسم واضح، وسعر ظاهر، وخيارات المقاس واللون سهلة.</li>
        <li>وصف يجيب عن أسئلة العميل: الخامة، المقاس، العناية، الاستخدام.</li>
        <li>زر شراء واضح يبقى ظاهرًا على الجوال.</li>
        <li>التقييمات وسياسة الاسترجاع قريبة من زر الشراء.</li>
      </ol>
      <p>الشرح الكامل في <a href="/ar/blog/anatomy-of-product-page">تشريح صفحة المنتج</a>.</p>

      <h2>الخطوة 5: الجوال أولًا</h2>
      <p>صمم لشاشة الجوال ثم كبّر للكمبيوتر، لا العكس. اختبر على جوالك الحقيقي:</p>
      <ul>
        <li>هل زر الشراء سهل الوصول بالإبهام؟</li>
        <li>هل الخط مقروء دون تكبير؟</li>
        <li>هل الصور تحمل بسرعة على شبكة الجوال؟</li>
      </ul>

      <h2>الخطوة 6: السرعة</h2>
      <p>كل ثانية تأخير تخسرك زوارًا. ضغط الصور، وتقليل التطبيقات غير الضرورية، وتجنب الفيديوهات الثقيلة في أول شاشة. راجع <a href="/ar/blog/store-speed-and-core-web-vitals">سرعة المتجر</a>.</p>

      <h2>الخطوة 7: صفحة السلة والدفع</h2>
      <ul>
        <li>اعرض كل وسائل الدفع المتاحة بشعاراتها.</li>
        <li>اعرض تكلفة الشحن مبكرًا.</li>
        <li>لا تطلب حسابًا إجباريًا قبل الشراء.</li>
      </ul>

      <h2>أخطاء التصميم الأكثر تكلفة</h2>
      <ol>
        <li>سلايدر بخمس صور يبطئ المتجر ولا يُشاهد.</li>
        <li>نوافذ منبثقة فورية تغطي الشاشة.</li>
        <li>صور منتجات بخلفيات وأحجام مختلفة.</li>
        <li>قوائم متشعبة بعشرات التصنيفات.</li>
        <li>نصوص بخط صغير وتباين ضعيف.</li>
      </ol>

      <h2>كم يكلف تصميم متجر سلة؟</h2>
      <p>يختلف حسب النطاق. على سبيل المثال، أسعارنا المعلنة: <a href="/ar/store/salla-custom-theme">تصميم ثيم سلة مخصص</a> يبدأ من 399 ر.س، و<a href="/ar/store/salla-store-setup">تجهيز متجر سلة كامل</a> يبدأ من 1,099 ر.س. اشتراك منصة سلة يُدفع لسلة مباشرة ومنفصل عن أتعاب التصميم. لتفصيل كامل للتكاليف اقرأ <a href="/ar/blog/ecommerce-store-cost-saudi">كم تكلف فعلًا إنشاء متجر</a>.</p>
    `,
    contentEn: `
      <p>Designing a Salla store is not choosing a theme and colours. Start with identity, then pick ready vs custom theme, build a homepage that answers what, for whom and why you, perfect the product page (multiple photos, a short video, a description that answers questions, a sticky buy button), design mobile-first, keep it fast, and simplify checkout.</p>
      <p>Costly mistakes: five-slide carousels, instant pop-ups, inconsistent product photos, sprawling menus and small low-contrast text.</p>
    `,
  },

  /* ═══ 7 ═══ */
  {
    id: "zid-store-setup-guide",
    cluster: "start",
    titleAr: "إنشاء متجر زد من الصفر: دليل خطوة بخطوة 2026",
    titleEn: "Setting up a Zid store from scratch: a 2026 step-by-step guide",
    excerptAr: "كيف تنشئ متجرك على زد بشكل صحيح من أول يوم: الباقة، البيانات، المنتجات، الدفع، الشحن، الثيم، والربط مع الأسواق.",
    excerptEn: "How to set up your Zid store correctly from day one.",
    date: "2026-09-27",
    readTime: 10,
    keywordsAr: ["إنشاء متجر زد", "فتح متجر على زد", "متجر زد", "منصة زد", "شرح زد", "تصميم متجر زد"],
    keywordsEn: ["Zid store setup", "create Zid store"],
    contentAr: `
      <p>اخترت <strong>منصة زد</strong> لمتجرك؟ خيار ممتاز خاصة إذا كانت لديك فروع أو خطط للبيع في الأسواق. هذا الدليل يمشي معك في <strong>إنشاء متجر زد</strong> بالترتيب الصحيح، لأن الترتيب الخاطئ يعني إعادة عمل لاحقًا.</p>

      <h2>1. اختيار الباقة</h2>
      <p>تقدم زد عدة باقات، منها باقة بداية مجانية بوسائل دفع أساسية (التحويل البنكي والدفع عند الاستلام) وربط مع شركات الشحن. ابدأ بما يناسب مرحلتك، وترقّ عندما تحتاج ميزات محددة لا لأنها «أكبر».</p>

      <h2>2. بيانات المتجر والتوثيق</h2>
      <ul>
        <li>اسم المتجر والشعار والألوان.</li>
        <li>بيانات التاجر: السجل التجاري أو وثيقة العمل الحر — راجع <a href="/ar/blog/freelance-document-vs-commercial-register">أيهما يناسبك</a>.</li>
        <li>بيانات التواصل والعنوان.</li>
        <li>الإعدادات الضريبية إن كنت مسجلًا.</li>
      </ul>

      <h2>3. هيكل التصنيفات قبل رفع المنتجات</h2>
      <p>صمم شجرة التصنيفات أولًا: تصنيفات رئيسية قليلة واضحة، وتحتها فرعية عند الحاجة فقط. هذا يسهل التصفح والسيو معًا.</p>

      <h2>4. رفع المنتجات بطريقة صحيحة</h2>
      <ul>
        <li>اسم يحتوي ما يبحث به العميل.</li>
        <li>صور بخلفية موحدة ومقاس موحد.</li>
        <li>وصف يجيب عن الأسئلة.</li>
        <li>الخيارات (المقاس، اللون) مع مخزون كل خيار.</li>
        <li>الوزن الصحيح لحساب الشحن.</li>
      </ul>
      <p>للكميات الكبيرة استخدم الاستيراد — راجع <a href="/ar/blog/import-export-products">استيراد وتصدير المنتجات</a>.</p>

      <h2>5. الدفع</h2>
      <p>فعّل أكبر عدد من وسائل الدفع: مدى، والبطاقات، وأبل باي، والتقسيط. كل وسيلة غائبة تعني عميلًا يغادر.</p>

      <h2>6. الشحن</h2>
      <p>حدد مناطق التوصيل والأسعار والشحن المجاني بشروط واضحة. اعرض خيارين: اقتصادي وسريع.</p>

      <h2>7. الثيم والتصميم</h2>
      <p>ثيمات زد مبنية على نظام «فيترين»، وأضيفت لها مؤخرًا صفحات العلامات التجارية. اختر ثيمًا يناسب نوع منتجاتك، أو ابنِ ثيمًا مخصصًا إن كانت المنافسة في فئتك عالية. المبادئ نفسها في <a href="/ar/blog/salla-store-design-guide">دليل تصميم المتجر</a>.</p>

      <h2>8. القنوات الإضافية</h2>
      <ul>
        <li><strong>نقاط البيع</strong> إن كان لديك فرع.</li>
        <li><strong>الأسواق:</strong> أمازون وترينديول وجاهز — <a href="/ar/blog/zid-marketplaces-amazon-trendyol-jahez">متى تستحق</a>.</li>
        <li><strong>واتساب</strong> لتأكيد الطلبات وخدمة العملاء.</li>
      </ul>

      <h2>9. التتبع</h2>
      <p>اربط Google Analytics وبكسلات الإعلانات قبل الإطلاق — البيانات التي لم تُجمع لا تُسترجع. راجع <a href="/ar/blog/pixels-and-tracking-setup">إعداد البكسلات والتتبع</a>.</p>

      <h2>10. اختبار كامل قبل الإطلاق</h2>
      <p>اشترِ من متجرك بنفسك: من الجوال، بكل وسيلة دفع، حتى وصول الشحنة. هذا الاختبار الوحيد الذي يكشف المشاكل الحقيقية.</p>
      <p>نجهز متاجر زد وسلة كاملة بنفس هذه المنهجية — <a href="https://wa.me/201007835547">تحدث معنا</a> أو اطلع على <a href="/ar/store/salla-store-setup">نطاق التجهيز الكامل</a>.</p>
    `,
    contentEn: `
      <p>The right order for a Zid store: choose a plan, complete store and merchant data, design the category tree before uploading products, upload products properly, enable every payment method, set shipping zones with two clear options, choose or build a Vitrin theme, add channels (POS, marketplaces, WhatsApp), install tracking, then buy from your own store end to end before launch.</p>
    `,
  },

  /* ═══ 8 ═══ */
  {
    id: "best-salla-apps-2026",
    cluster: "marketing",
    titleAr: "أفضل تطبيقات سلة في 2026: ما تحتاجه فعلًا وما يبطئ متجرك",
    titleEn: "The best Salla apps in 2026: what you need and what slows you down",
    excerptAr: "متجر تطبيقات سلة فيه مئات التكاملات وحزم جديدة. كيف تختار التطبيقات حسب احتياج متجرك، وأي فئات تستحق، ومتى يصبح التطبيق عبئًا.",
    excerptEn: "How to choose Salla apps by need, which categories matter, and when an app becomes a burden.",
    date: "2026-09-21",
    readTime: 9,
    keywordsAr: ["تطبيقات سلة", "أفضل تطبيقات سلة", "متجر تطبيقات سلة", "حزم تطبيقات سلة", "تطبيقات متجر سلة"],
    keywordsEn: ["best Salla apps", "Salla app store"],
    contentAr: `
      <p>تعلن سلة أن متجر تطبيقاتها يضم أكثر من 900 تكامل، وأضافت مؤخرًا <strong>حزمًا</strong> تجمع تطبيقات مختارة حسب احتياج المتجر، مع واجهة موحدة لإدارة التطبيقات واشتراكاتها. هذا رائع — ومربك. لأن كل تطبيق تضيفه قد يضيف وزنًا للمتجر وتكلفة شهرية. هذا الدليل يساعدك تختار بذكاء.</p>

      <h2>القاعدة الذهبية</h2>
      <p><strong>لا تثبّت تطبيقًا لميزة موجودة في سلة أصلًا.</strong> سلة أضافت داخليًا كثيرًا مما كان يحتاج تطبيقًا: بطاقات الهدايا، الكاش باك، التوصيات، البحث الذكي، تقييم المنتج، فيديو المنتج، وتخصيص الكوكيز. راجع <a href="/ar/blog/salla-updates-2026">تحديثات سلة 2026</a> قبل أي تثبيت.</p>

      <h2>الفئات التي تستحق غالبًا</h2>
      <h3>1. التواصل وخدمة العملاء</h3>
      <p>ربط واتساب لتأكيد الطلبات وإشعارات الشحن والرد السريع. في السوق السعودي هذه ليست رفاهية.</p>
      <h3>2. المحاسبة والفوترة</h3>
      <p>تطبيق يربط المتجر بنظامك المحاسبي ويدعم متطلبات الفوترة الإلكترونية — خاصة مع <a href="/ar/blog/zatca-e-invoicing-waves-2026">موجات الربط مع فاتورة</a>.</p>
      <h3>3. الشحن المتقدم</h3>
      <p>إذا كنت تحتاج ناقلًا أو ميزة غير متاحة في بوليصات سلة.</p>
      <h3>4. التقييمات والدليل الاجتماعي</h3>
      <p>إذا أردت عرضًا متقدمًا للتقييمات يتجاوز ما توفره سلة.</p>
      <h3>5. التسويق بالرسائل</h3>
      <p>رسائل الحملات واسترجاع السلات عبر قنوات متعددة. راجع <a href="/ar/blog/sms-whatsapp-push-campaigns">حملات الرسائل والواتساب</a>.</p>

      <h2>كيف تقيّم أي تطبيق قبل التثبيت؟</h2>
      <ol>
        <li><strong>ما المشكلة المحددة التي يحلها؟</strong> إن لم تستطع كتابتها في جملة، لا تثبته.</li>
        <li><strong>هل يؤثر على سرعة الواجهة؟</strong> التطبيقات التي تضيف عناصر للواجهة تؤثر غالبًا.</li>
        <li><strong>التكلفة الشهرية مقابل العائد المتوقع.</strong></li>
        <li><strong>التقييمات والدعم الفني.</strong></li>
        <li><strong>هل يمكن إزالته بسهولة؟</strong> بعض التطبيقات تترك أثرًا في الثيم.</li>
      </ol>

      <h2>مراجعة دورية: نظّف متجرك كل ثلاثة أشهر</h2>
      <p>افتح قائمة التطبيقات المثبتة واسأل عن كل تطبيق: هل استخدمته هذا الشهر؟ هل له أثر قابل للقياس؟ احذف ما لا يجيب بنعم. متجر بعشرة تطبيقات ضرورية أسرع وأربح من متجر بثلاثين.</p>

      <h2>متى تحتاج تطبيقًا مخصصًا؟</h2>
      <p>عندما تكون عمليتك فريدة ولا يغطيها تطبيق جاهز: ربط بنظام داخلي، أو منطق تسعير خاص، أو تجربة طلب مختلفة. نبني ذلك في <a href="/ar/store/custom-app-development">برمجة التطبيقات حسب الطلب</a> و<a href="/ar/store/automation-workflows">الأتمتة وربط الأنظمة</a>.</p>
    `,
    contentEn: `
      <p>Salla states 900+ integrations in its app store and has added curated bundles. Golden rule: do not install an app for something Salla now does natively — gift cards, cashback, recommendations, smart search, reviews, product video.</p>
      <p>Usually worth it: WhatsApp and customer service, accounting and e-invoicing, advanced shipping, reviews display, and messaging campaigns. Audit installed apps every quarter and remove what has no measurable effect.</p>
    `,
  },

  /* ═══ 9 ═══ */
  {
    id: "increase-average-order-value",
    cluster: "orders",
    titleAr: "كيف ترفع متوسط قيمة الطلب في متجرك: 12 طريقة مجربة على سلة وزد",
    titleEn: "12 ways to raise average order value on Salla and Zid",
    excerptAr: "رفع متوسط قيمة الطلب أرخص من جلب عميل جديد. الحزم، التوصيات، حد الشحن المجاني، الكاش باك، بطاقات الهدايا، والتقسيط — بالأرقام والأمثلة.",
    excerptEn: "Raising order value is cheaper than finding new customers. Bundles, recommendations, free-shipping thresholds, cashback and more.",
    date: "2026-09-16",
    readTime: 10,
    keywordsAr: ["زيادة متوسط قيمة الطلب", "زيادة مبيعات المتجر الالكتروني", "رفع قيمة السلة", "البيع المتقاطع", "زيادة المبيعات سلة"],
    keywordsEn: ["increase average order value", "raise AOV Salla"],
    contentAr: `
      <p>معادلة مبيعات أي متجر بسيطة: <strong>المبيعات = عدد الزوار × معدل التحويل × متوسط قيمة الطلب</strong>. أغلب التجار يركزون على الزوار فقط — وهو الأغلى. بينما رفع <strong>متوسط قيمة الطلب</strong> 15% يعني مبيعات أعلى 15% بنفس الإعلانات. هذه 12 طريقة عملية.</p>

      <h2>1. حد الشحن المجاني فوق متوسط الطلب الحالي</h2>
      <p>إذا كان متوسط طلباتك 180 ريالًا، اجعل الشحن المجاني من 220–250. العميل يضيف منتجًا صغيرًا ليصل للحد. أعلن الحد في السلة: «تبقى لك 40 ريالًا للشحن المجاني».</p>

      <h2>2. «يُشترى معًا»</h2>
      <p>أضافت سلة اقتراحات المنتجات التي تُشترى معًا. فعّلها على أكثر منتجاتك مبيعًا.</p>

      <h2>3. التوصيات عند الإضافة للسلة</h2>
      <p>لحظة الإضافة للسلة هي لحظة «نعم» — اقتراح منتج مكمل هنا يُقبل كثيرًا.</p>

      <h2>4. الحزم</h2>
      <p>«عطر + لوشن + معطر شعر» بسعر أقل من مجموعها. الحزمة ترفع الطلب وتصرف منتجات أبطأ حركة. راجع <a href="/ar/blog/promotional-offers-bundles">العروض والحزم</a>.</p>

      <h2>5. الكمية: «اشترِ 2 ووفر»</h2>
      <p>تعمل بقوة للمنتجات الاستهلاكية: القهوة، والعناية، والمكملات.</p>

      <h2>6. الكاش باك بدل الخصم</h2>
      <p>كاش باك مرتبط بكوبون يعيد العميل للطلب الثاني. <a href="/ar/blog/salla-qitaf-gift-cards-cashback">كيف تستخدمه في سلة</a>.</p>

      <h2>7. التقسيط</h2>
      <p>تابي وتمارا يجعلان سلة بـ600 ريال تبدو أربع دفعات صغيرة. العملاء يشترون أكثر عندما يتوفر التقسيط. <a href="/ar/blog/bnpl-tabby-tamara">دليل التقسيط</a>.</p>

      <h2>8. بطاقات الهدايا</h2>
      <p>في المواسم تحديدًا، ومستلم البطاقة غالبًا ينفق أكثر من قيمتها.</p>

      <h2>9. هدية عند حد معين</h2>
      <p>«هدية مجانية للطلبات فوق 300 ريال» — منتج تكلفته عليك منخفضة وقيمته المدركة عالية.</p>

      <h2>10. ترقية المنتج</h2>
      <p>اعرض النسخة الأكبر أو الأفضل في صفحة المنتج: «الحجم العائلي يوفر عليك 20%».</p>

      <h2>11. ترتيب الصفحة الرئيسية</h2>
      <p>اعرض المنتجات ذات القيمة الأعلى في الأماكن الأبرز، لا الأرخص فقط.</p>

      <h2>12. برنامج ولاء</h2>
      <p>نقاط تُكسب مع كل ريال تجعل العميل يجمع مشترياته عندك. <a href="/ar/blog/loyalty-programs-for-stores">برامج الولاء</a>.</p>

      <h2>كيف تقيس النتيجة؟</h2>
      <p>سجل متوسط قيمة الطلب الحالي من التقارير، طبّق طريقتين أو ثلاثًا فقط، وقِس بعد أربعة أسابيع. إن ارتفع، أضف التالية. يمكنك أن تطلب من <a href="/ar/blog/mushammer-salla-ai-assistant">مشمّر</a> مقارنة الأرقام لك.</p>
      <p>نطبق هذه الأدوات ضمن <a href="/ar/store/store-seo">تحسين التحويل</a> و<a href="/ar/store/digital-marketing">إدارة التسويق</a>.</p>
    `,
    contentEn: `
      <p>Sales = visitors × conversion rate × average order value. Raising AOV is the cheapest lever.</p>
      <ol>
        <li>Set free shipping above your current average.</li>
        <li>Frequently bought together.</li>
        <li>Add-to-cart recommendations.</li>
        <li>Bundles.</li>
        <li>Quantity deals.</li>
        <li>Cashback instead of discounts.</li>
        <li>BNPL.</li>
        <li>Gift cards.</li>
        <li>A gift above a threshold.</li>
        <li>Upgrades.</li>
        <li>Homepage order.</li>
        <li>Loyalty points.</li>
      </ol>
      <p>Apply two or three at a time and measure after four weeks.</p>
    `,
  },

  /* ═══ 10 ═══ */
  {
    id: "salla-theme-customization-css",
    cluster: "design",
    titleAr: "تخصيص ثيم سلة: من المحرر إلى CSS والبرمجة — ماذا يمكن وماذا لا يمكن",
    titleEn: "Customising a Salla theme: from the editor to CSS and code",
    excerptAr: "ثلاثة مستويات لتخصيص متجر سلة: إعدادات المحرر، تعديلات CSS، وبرمجة ثيم مخصص على توايلايت. متى يكفي كل مستوى وكم يكلف.",
    excerptEn: "Three levels of Salla customisation — editor settings, CSS, and a custom Twilight theme — and when each is enough.",
    date: "2026-09-11",
    readTime: 9,
    keywordsAr: ["تخصيص ثيم سلة", "برمجة ثيم سلة", "CSS سلة", "تعديل تصميم متجر سلة", "ثيم سلة مخصص", "توايلايت سلة"],
    keywordsEn: ["customise Salla theme", "Salla CSS", "Salla Twilight theme"],
    contentAr: `
      <p>كل تاجر على سلة يصل لنقطة يريد فيها شيئًا «غير موجود في الإعدادات». الخبر الجيد: <strong>تخصيص ثيم سلة</strong> ممكن على ثلاثة مستويات، كل مستوى أعمق وأكثر تكلفة من الذي قبله. معرفة المستوى الذي تحتاجه توفر عليك الوقت والمال.</p>

      <h2>المستوى 1: محرر الثيم</h2>
      <p>كل ثيم في سلة يأتي بمحرر يتيح: الألوان، والخطوط، وترتيب أقسام الصفحة الرئيسية، والبانرات، وعناصر جاهزة. وأضافت سلة «العناصر المقترحة من مشمّر» داخل المحرر.</p>
      <p><strong>يكفي إذا:</strong> كنت تريد ترتيبًا وهوية أساسية على ثيم جيد.</p>
      <p><strong>لا يكفي إذا:</strong> أردت شكلًا لعنصر لا يتيحه الثيم، أو تجربة مختلفة في صفحة المنتج.</p>

      <h2>المستوى 2: تعديلات CSS</h2>
      <p>تتيح سلة إضافة CSS مخصص يغيّر مظهر العناصر الموجودة: المسافات، والحواف، والظلال، وأحجام الخطوط، وإخفاء عناصر، وتنسيق أزرار.</p>
      <p><strong>يكفي إذا:</strong> كانت الوظائف موجودة وتريد تغيير شكلها فقط.</p>
      <p><strong>تحذيرات مهمة:</strong></p>
      <ul>
        <li>تعديلات CSS قد تتعطل عند تحديث الثيم — وثّقها.</li>
        <li>اختبر على الجوال دائمًا — كثير من التعديلات تبدو جيدة على الكمبيوتر فقط.</li>
        <li>لا تخفِ عناصر ثقة (السياسات، التقييمات) لأجل الشكل.</li>
      </ul>
      <p>نقدم تعديلات CSS كخدمة مستقلة — <a href="https://wa.me/201007835547?text=${encodeURIComponent("مرحبًا، أريد الاستفسار عن خدمة: برمجة CSS")}">اطلبها عبر واتساب</a>.</p>

      <h2>المستوى 3: ثيم مخصص على توايلايت</h2>
      <p>ثيمات سلة الحديثة تُبنى بنظام <strong>توايلايت Twilight</strong>. الثيم المخصص يعني بناء الواجهة كاملة حول علامتك: صفحة رئيسية بتجربة مختلفة، وصفحة منتج مصممة لنوع منتجاتك، ومكونات قابلة للتحكم من لوحة سلة.</p>
      <p><strong>يستحق إذا:</strong></p>
      <ul>
        <li>المنافسة في فئتك عالية والتميز البصري عامل حاسم.</li>
        <li>منتجاتك تحتاج طريقة عرض خاصة (مجوهرات، عطور فاخرة، أزياء).</li>
        <li>تبني علامة طويلة المدى لا متجرًا مؤقتًا.</li>
      </ul>
      <p>فصّلنا القرار في <a href="/ar/blog/ready-theme-vs-custom">الثيم الجاهز أم المخصص</a>.</p>

      <h2>ماذا عن زد؟</h2>
      <p>زد تبني ثيماتها بنظام «فيترين» بقوالب Jinja، والمستويات نفسها تنطبق: إعدادات، ثم تعديلات، ثم ثيم مخصص.</p>

      <h2>جدول القرار</h2>
      <table>
        <thead><tr><th>تريد</th><th>المستوى</th></tr></thead>
        <tbody>
          <tr><td>تغيير الألوان والترتيب</td><td>المحرر</td></tr>
          <tr><td>تغيير شكل عناصر موجودة</td><td>CSS</td></tr>
          <tr><td>تجربة مختلفة بالكامل</td><td>ثيم مخصص</td></tr>
        </tbody>
      </table>
      <p>نقدم <a href="/ar/store/salla-custom-theme">تصميم ثيم سلة مخصص</a> يبدأ من 399 ر.س، ولدينا منتجنا الخاص <a href="/ar/sidra-theme">ثيم سِدرة</a>.</p>
    `,
    contentEn: `
      <p>Three levels of Salla customisation: the theme editor (colours, fonts, section order, Mushammer's suggested elements), custom CSS (changing how existing elements look — document it and test on mobile), and a custom Twilight theme (a storefront built around your brand). Zid works the same way with Vitrin themes in Jinja.</p>
    `,
  },

  /* ═══ 11 ═══ */
  {
    id: "store-launch-checklist-2026",
    cluster: "start",
    titleAr: "قائمة إطلاق متجر إلكتروني 2026: 40 بندًا قبل أول طلب",
    titleEn: "Online store launch checklist 2026: 40 items before your first order",
    excerptAr: "قائمة مراجعة شاملة قبل إطلاق متجرك على سلة أو زد: القانونية، والمنتجات، والدفع، والشحن، والتصميم، والسيو، والتتبع، والاختبار.",
    excerptEn: "A complete pre-launch checklist for Salla and Zid stores.",
    date: "2026-09-08",
    readTime: 11,
    keywordsAr: ["فتح متجر الكتروني", "خطوات انشاء متجر الكتروني", "قائمة اطلاق متجر", "انشاء متجر الكتروني في السعودية", "تجهيز متجر الكتروني"],
    keywordsEn: ["online store launch checklist", "open online store Saudi"],
    contentAr: `
      <p>الإطلاق المتعجل يكلف أكثر من التأخير: إعلانات تُصرف على متجر بمشكلة في الدفع، أو عملاء يصلهم منتج بوصف خاطئ. هذه <strong>قائمة إطلاق متجر إلكتروني</strong> من 40 بندًا نستخدمها مع عملائنا قبل أي إطلاق على سلة أو زد.</p>

      <h2>القانونية والتوثيق (1–5)</h2>
      <ol>
        <li>سجل تجاري أو وثيقة عمل حر سارية — <a href="/ar/blog/freelance-document-vs-commercial-register">أيهما؟</a></li>
        <li>توثيق المتجر في المنصة.</li>
        <li>الرقم الضريبي إن كنت مسجلًا.</li>
        <li>حساب بنكي مربوط لاستلام المبالغ.</li>
        <li>بيانات التاجر ظاهرة في التذييل.</li>
      </ol>

      <h2>المنتجات (6–13)</h2>
      <ol start="6">
        <li>شجرة تصنيفات واضحة.</li>
        <li>أسماء منتجات بكلمات بحث العميل.</li>
        <li>3 صور على الأقل لكل منتج بخلفية موحدة.</li>
        <li>أوصاف تجيب عن الأسئلة.</li>
        <li>الخيارات والمخزون لكل خيار.</li>
        <li>الأوزان الصحيحة للشحن.</li>
        <li>جداول المقاسات حيث يلزم.</li>
        <li>الأسعار مراجعة مرتين.</li>
      </ol>

      <h2>الدفع (14–18)</h2>
      <ol start="14">
        <li>مدى وفيزا وماستركارد.</li>
        <li>أبل باي.</li>
        <li>التقسيط.</li>
        <li>وسائل إضافية مثل قطاف.</li>
        <li>اختبار دفع حقيقي بكل وسيلة.</li>
      </ol>

      <h2>الشحن (19–23)</h2>
      <ol start="19">
        <li>مناطق التوصيل محددة.</li>
        <li>أسعار شحن مبنية على الوزن الحجمي.</li>
        <li>شروط الشحن المجاني.</li>
        <li>خيار اقتصادي وخيار سريع.</li>
        <li>مواد تغليف جاهزة تعكس الهوية.</li>
      </ol>

      <h2>الصفحات والسياسات (24–28)</h2>
      <ol start="24">
        <li>من نحن.</li>
        <li>سياسة الشحن.</li>
        <li>سياسة الاسترجاع والاستبدال.</li>
        <li>سياسة الخصوصية.</li>
        <li>تواصل معنا مع واتساب. <a href="/ar/blog/ecommerce-law-store-obligations">ما يجب أن يظهر نظاميًا</a>.</li>
      </ol>

      <h2>التصميم (29–33)</h2>
      <ol start="29">
        <li>شعار وهوية واضحان.</li>
        <li>صفحة رئيسية تجيب: ماذا ولمن ولماذا.</li>
        <li>اختبار كامل على الجوال.</li>
        <li>سرعة تحميل مقبولة.</li>
        <li>زر واتساب ظاهر.</li>
      </ol>

      <h2>السيو والتتبع (34–37)</h2>
      <ol start="34">
        <li>عناوين ووصف تعريفي لكل صفحة مهمة.</li>
        <li>نص بديل للصور.</li>
        <li>Google Analytics 4 وSearch Console.</li>
        <li>بكسلات سناب وتيك توك وميتا. <a href="/ar/blog/pixels-and-tracking-setup">الإعداد</a>.</li>
      </ol>

      <h2>الاختبار النهائي (38–40)</h2>
      <ol start="38">
        <li>طلب كامل من الجوال حتى الاستلام.</li>
        <li>طلب إرجاع تجريبي لاختبار السياسة.</li>
        <li>مراجعة كل الرسائل والإشعارات التي تصل العميل.</li>
      </ol>

      <h2>بعد الإطلاق</h2>
      <p>الأسبوع الأول: راقب كل طلب بنفسك، واقرأ كل رسالة عميل. أول عشرين طلبًا تعلمك أكثر من أي تقرير.</p>
      <p>هذه القائمة كاملة هي نطاق <a href="/ar/store/salla-store-setup">خدمة تجهيز متجر سلة</a> — ننفذها ونسلمك متجرًا مختبرًا بعملية شراء حقيقية.</p>
    `,
    contentEn: `
      <p>A 40-item pre-launch checklist grouped into legal and verification, products, payments, shipping, pages and policies, design, SEO and tracking, and final testing — ending with a complete mobile order through to delivery, a test return, and a review of every customer notification.</p>
    `,
  },

  /* ═══ 12 ═══ */
  {
    id: "salla-store-seo-2026",
    cluster: "seo",
    titleAr: "سيو متجر سلة 2026: كيف يظهر متجرك في الصفحة الأولى من جوجل",
    titleEn: "Salla store SEO in 2026: getting onto page one of Google",
    excerptAr: "خطة سيو عملية لمتاجر سلة وزد في 2026: الكلمات المفتاحية، صفحات المنتجات والتصنيفات، المحتوى، السرعة، والروابط — مرتبة حسب الأثر.",
    excerptEn: "A practical 2026 SEO plan for Salla and Zid stores, ranked by impact.",
    date: "2026-09-03",
    readTime: 12,
    keywordsAr: ["سيو متجر سلة", "تحسين محركات البحث للمتاجر", "تصدر نتائج جوجل", "سيو المتاجر الالكترونية", "SEO سلة", "ظهور المتجر في جوجل"],
    keywordsEn: ["Salla SEO", "ecommerce SEO Saudi", "rank Salla store on Google"],
    contentAr: `
      <p><strong>سيو متجر سلة</strong> هو أرخص مصدر زيارات على المدى الطويل: عميل يبحث في جوجل عن منتجك بالضبط، ويصل لمتجرك دون أن تدفع على النقرة. لكن السيو يحتاج وقتًا ومنهجية. هذه خطة 2026 مرتبة حسب الأثر — ابدأ من الأعلى.</p>

      <h2>1. بحث الكلمات المفتاحية: ابدأ من العميل</h2>
      <p>لا تخمّن. اكتب في جوجل بداية اسم منتجك واقرأ الاقتراحات، وراجع «عمليات بحث ذات صلة» أسفل الصفحة. ستجد أن العميل يكتب «عباية سوداء ناعمة للدوام» لا «عباية كلاسيك موديل 22».</p>
      <ul>
        <li><strong>كلمات عامة</strong> (عبايات): منافسة عالية.</li>
        <li><strong>كلمات طويلة</strong> (عباية كريب سوداء بأكمام واسعة): منافسة أقل، ونية شراء أعلى.</li>
      </ul>
      <p>المتجر الجديد يبدأ بالكلمات الطويلة دائمًا.</p>

      <h2>2. صفحات التصنيفات: أقوى صفحاتك في السيو</h2>
      <p>صفحة التصنيف تستهدف الكلمات العامة. أضف لكل تصنيف عنوانًا واضحًا، ونصًا قصيرًا مفيدًا أعلى أو أسفل المنتجات، ووصفًا تعريفيًا. <a href="/ar/blog/category-page-seo">سيو صفحات التصنيفات</a>.</p>

      <h2>3. صفحات المنتجات</h2>
      <ul>
        <li>عنوان يحتوي الكلمة الأساسية بشكل طبيعي.</li>
        <li>وصف فريد — لا تنسخ وصف المورد أبدًا.</li>
        <li>نص بديل للصور يصف الصورة.</li>
        <li>تقييمات حقيقية — سلة تتيح الآن التقييم من صفحة المنتج.</li>
      </ul>
      <p><a href="/ar/blog/product-page-seo">سيو صفحة المنتج بالتفصيل</a>.</p>

      <h2>4. المحتوى: مدونة تجيب عن أسئلة عملائك</h2>
      <p>كل سؤال يسأله عملاؤك على واتساب يمكن أن يكون مقالًا: «كيف أختار مقاس العباية؟»، «الفرق بين أنواع العود». المقال يجلب زائرًا يبحث، ويحيله لمنتجك. وزد أطلقت واجهة برمجة لإدارة مدونة المتجر، ما يعكس أهمية المحتوى في المنصتين. <a href="/ar/blog/store-blog-that-works">مدونة المتجر التي تعمل</a>.</p>

      <h2>5. السرعة وتجربة الجوال</h2>
      <p>جوجل يقيس تجربة الصفحة. ضغط الصور، وتقليل التطبيقات، وتصميم للجوال أولًا. <a href="/ar/blog/store-speed-and-core-web-vitals">السرعة ومؤشرات الويب الأساسية</a>.</p>

      <h2>6. البنية والروابط الداخلية</h2>
      <p>اربط المقالات بالمنتجات، والمنتجات بالتصنيفات، والتصنيفات ببعضها حيث يكون منطقيًا. الروابط الداخلية تساعد جوجل على فهم متجرك وتوزع القوة بين صفحاتك.</p>

      <h2>7. Search Console: عيونك داخل جوجل</h2>
      <p>اربط متجرك بـ Search Console وراقب: أي الكلمات تظهر بها، وأي الصفحات لا تُفهرس، وأين المشاكل التقنية. <a href="/ar/blog/search-console-for-stores">دليل Search Console للمتاجر</a>.</p>

      <h2>8. الروابط الخارجية</h2>
      <p>ذكر متجرك في مواقع موثوقة — مقالات، أدلة، شراكات — يرفع ثقة جوجل. ابتعد عن شراء الروابط الرخيصة؛ ضررها أكبر من نفعها.</p>

      <h2>كم يستغرق السيو؟</h2>
      <p>بصدق: النتائج الأولى خلال 2–4 أشهر للكلمات الطويلة، و6–12 شهرًا للكلمات التنافسية. من يعدك بالصفحة الأولى خلال أسبوع لا يقول الحقيقة.</p>

      <h2>الخطة في 90 يومًا</h2>
      <ol>
        <li><strong>الشهر 1:</strong> الكلمات، وإصلاح العناوين والأوصاف، وSearch Console.</li>
        <li><strong>الشهر 2:</strong> صفحات التصنيفات، والأوصاف الفريدة لأهم 20 منتجًا، والسرعة.</li>
        <li><strong>الشهر 3:</strong> 4–6 مقالات تجيب عن أسئلة العملاء مع روابط داخلية.</li>
      </ol>
      <p>هذا بالضبط نطاق <a href="/ar/store/store-seo">خدمة سيو المتاجر</a> التي تبدأ من 699 ر.س. وللأساس الكامل اقرأ <a href="/ar/blog/ecommerce-seo-guide">دليل سيو المتاجر الإلكترونية</a>.</p>
    `,
    contentEn: `
      <p>A 2026 SEO plan for Salla and Zid stores, ranked by impact: keyword research starting from the customer's words (long-tail first), category pages as your strongest SEO assets, unique product descriptions with alt text and genuine reviews, a blog that answers customer questions, speed and mobile experience, internal linking, Search Console, and earned (not bought) links.</p>
      <p>Honest timeline: 2–4 months for long-tail terms, 6–12 months for competitive ones.</p>
    `,
  },
];
