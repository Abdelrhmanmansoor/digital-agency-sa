import type { Article } from "./types";

export const ORDERS: Article[] = [
  {
    id: "custom-order-statuses",
    cluster: "orders",
    titleAr: "حالات الطلب المخصصة: كيف تجعل لوحة التحكم تعكس تشغيلك الحقيقي",
    titleEn: "Custom order statuses: making the dashboard match how you actually work",
    excerptAr: "الحالات الافتراضية تكفي متجرًا بسيطًا. لحظة وجود تجهيز أو تصنيع تحتاج حالاتك أنت.",
    excerptEn: "Default statuses suit a simple store. The moment preparation or production is involved, you need your own.",
    date: "2026-08-04",
    readTime: 5,
    contentAr: `
      <p>«قيد التنفيذ» حالة تصلح ليوم واحد. إن كان الطلب يمرّ بتجهيز وتغليف وتصنيع فأنت وفريقك تفقدون تتبّع الطلبات داخل حالة واحدة واسعة.</p>

      <h2>ابدأ من رسم تشغيلك على ورقة</h2>
      <p>اكتب ما يحدث فعلًا للطلب من لحظة الدفع حتى التسليم. كل خطوة يتغير فيها المسؤول أو المكان تستحق حالة مستقلة.</p>

      <h2>مثال عملي لمتجر يصنّع عند الطلب</h2>
      <ul>
        <li>بانتظار تأكيد التصميم</li>
        <li>قيد التصنيع</li>
        <li>جاهز للتغليف</li>
        <li>تم التسليم لشركة الشحن</li>
      </ul>
      <p>أربع حالات تخبرك في ثانية أين يقف كل طلب، وأين يتكدّس العمل.</p>

      <h2>اربط الحالة برسالة للعميل</h2>
      <p>أهم فائدة ليست داخلية. العميل الذي يصله إشعار «قيد التصنيع» يتوقف عن السؤال «وين طلبي؟». كل حالة تُبلَّغ للعميل تقلّل رسائل خدمة العملاء.</p>

      <h2>لا تبالغ</h2>
      <p>أكثر من ست أو سبع حالات يجعل الفريق يتردد في التصنيف فتصبح البيانات غير موثوقة. الحالة التي لا يستخدمها أحد أسوأ من عدم وجودها.</p>

      <h2>راجعها بعد شهر</h2>
      <p>انظر أي حالة يتكدّس فيها أكبر عدد من الطلبات لأطول وقت. تلك هي نقطة الاختناق الحقيقية في تشغيلك.</p>
    `,
    contentEn: `
      <p>"Processing" works as a status for one day. If an order passes through preparation, packing and production, you and your team lose track inside one broad bucket.</p>

      <h2>Start by mapping your operation on paper</h2>
      <p>Write what actually happens to an order from payment to delivery. Every step where the owner or the location changes deserves its own status.</p>

      <h2>A worked example for made-to-order</h2>
      <ul>
        <li>Awaiting design approval</li>
        <li>In production</li>
        <li>Ready to pack</li>
        <li>Handed to the carrier</li>
      </ul>
      <p>Four statuses tell you in a second where each order stands and where work is piling up.</p>

      <h2>Tie each status to a customer message</h2>
      <p>The biggest benefit is not internal. A customer who receives an "in production" notification stops asking "where is my order?". Every status you communicate reduces support messages.</p>

      <h2>Do not overdo it</h2>
      <p>More than six or seven statuses makes the team hesitate when classifying, and the data stops being reliable. A status nobody uses is worse than none.</p>

      <h2>Review after a month</h2>
      <p>Look at which status holds the most orders for the longest. That is your real bottleneck.</p>
    `,
  },
  {
    id: "abandoned-cart-recovery",
    cluster: "orders",
    titleAr: "السلات المتروكة: لماذا تُترك وكيف تسترجع جزءًا منها",
    titleEn: "Abandoned carts: why they happen and how to recover some",
    excerptAr: "معظم من أضاف للسلة لن يشتري. لكن نسبة منهم تحتاج تذكيرًا واحدًا فقط.",
    excerptEn: "Most people who add to cart will not buy. But a share of them need only one reminder.",
    date: "2026-08-03",
    readTime: 6,
    contentAr: `
      <p>السلة المتروكة ليست فشلًا بالضرورة — كثير منها تردد طبيعي. المهم أن تفرّق بين من غيّر رأيه ومن منعه عائق يمكنك إزالته.</p>

      <h2>الأسباب الأربعة الأكثر تكرارًا</h2>
      <ul>
        <li><strong>الشحن ظهر متأخرًا:</strong> السعر تغيّر عند الخطوة الأخيرة فشعر العميل بأنه فوجئ.</li>
        <li><strong>إجبار على إنشاء حساب:</strong> خطوة إضافية قبل الدفع تكفي لخسارة جزء من الطلبات.</li>
        <li><strong>وسيلة الدفع المفضلة غير متاحة:</strong> غياب التقسيط تحديدًا يوقف سلات كبيرة.</li>
        <li><strong>تصفّح ومقارنة:</strong> نيّة شراء مؤجلة لا مفقودة.</li>
      </ul>

      <h2>رسالة الاسترجاع: واحدة تكفي غالبًا</h2>
      <p>ذكّر بما في السلة بصورة واسم واضحين، واجعل الرابط يعيده للسلة نفسها ممتلئة لا للصفحة الرئيسية. التوقيت المعقول من ساعة إلى ثلاث ساعات بعد الترك.</p>

      <h2>لا تبدأ بالخصم</h2>
      <p>إن أرسلت كوبونًا مع كل تذكير فستعلّم عملاءك أن ترك السلة يمنحهم خصمًا. ابدأ بتذكير بلا خصم، واحتفظ بالكوبون لرسالة لاحقة لمن لم يستجب.</p>

      <h2>عالج السبب لا العرَض</h2>
      <p>إن كانت أغلب السلات تُترك عند خطوة الشحن، فالحل ليس رسائل أكثر بل إظهار تكلفة الشحن مبكرًا في صفحة المنتج.</p>
    `,
    contentEn: `
      <p>An abandoned cart is not necessarily a failure — much of it is ordinary hesitation. What matters is separating those who changed their mind from those blocked by something you can remove.</p>

      <h2>The four most common causes</h2>
      <ul>
        <li><strong>Shipping appeared late:</strong> the price changed at the final step and felt like a surprise.</li>
        <li><strong>Forced account creation:</strong> one extra step before payment is enough to lose a share of orders.</li>
        <li><strong>Preferred payment method missing:</strong> absent BNPL in particular stops larger carts.</li>
        <li><strong>Browsing and comparing:</strong> deferred intent, not lost intent.</li>
      </ul>

      <h2>The recovery message: usually one is enough</h2>
      <p>Remind them what is in the cart with a clear image and name, and make the link return them to the filled cart rather than the homepage. One to three hours after abandonment is a sensible window.</p>

      <h2>Do not lead with a discount</h2>
      <p>Send a coupon with every reminder and you teach customers that abandoning earns them one. Start with a plain reminder and keep the coupon for a later message to non-responders.</p>

      <h2>Treat the cause, not the symptom</h2>
      <p>If most carts are abandoned at the shipping step, the answer is not more messages but showing shipping cost earlier, on the product page.</p>
    `,
  },
  {
    id: "returns-and-refunds",
    cluster: "orders",
    titleAr: "الإرجاع والاسترداد: سياسة تحمي المتجر دون أن تخيف العميل",
    titleEn: "Returns and refunds: a policy that protects the store without scaring customers",
    excerptAr: "السياسة المتشددة تقلّل الإرجاع وتقلّل الشراء معًا. الاتزان في التفاصيل.",
    excerptEn: "A harsh policy reduces returns and purchases alike. The balance is in the detail.",
    date: "2026-08-02",
    readTime: 6,
    contentAr: `
      <p>سياسة الاسترجاع أكثر صفحة يقرؤها العميل المتردد. ما تكتبه فيها يؤثر في قرار الشراء قبل أن يؤثر في عدد المرتجعات.</p>

      <h2>ما يجب أن تحدده بوضوح</h2>
      <ul>
        <li>المدة المسموحة بالأيام، ومن أي تاريخ تُحسب: الطلب أم الاستلام؟</li>
        <li>حالة المنتج المقبولة: بغلافه الأصلي؟ غير مستخدم؟</li>
        <li>من يتحمّل شحن الإرجاع في حالة العيب وفي حالة تغيير الرأي.</li>
        <li>مدة إعادة المبلغ وإلى أين يعود: البطاقة أم محفظة المتجر.</li>
        <li>المنتجات المستثناة: المخصص، المنتجات الرقمية، ما يفتح ولا يعاد.</li>
      </ul>

      <h2>الاستثناءات هي أهم بند</h2>
      <p>معظم النزاعات تنشأ حول منتج يعتبره التاجر مستثنى ولا يعرف العميل ذلك. اكتب الاستثناء في صفحة المنتج نفسها لا في السياسة وحدها.</p>

      <h2>سهّل الطلب لا تعقّده</h2>
      <p>طلب الإرجاع الذي يتطلب مكالمة ورسالة ونموذجًا يدفع العميل لفتح نزاع مع بنكه بدلًا منك — وهذا أسوأ لك بكثير.</p>

      <h2>سجّل السبب في كل مرة</h2>
      <p>«مقاس غير مناسب» و«مختلف عن الصورة» و«وصل تالفًا» ثلاث مشكلات مختلفة تمامًا: الأولى في دليل المقاسات، والثانية في التصوير، والثالثة في التغليف. بدون تسجيل السبب لن تعرف أيها يكلّفك.</p>
    `,
    contentEn: `
      <p>The return policy is the page a hesitant customer reads most. What you write there affects the purchase decision before it affects the number of returns.</p>

      <h2>What to state plainly</h2>
      <ul>
        <li>The window in days, and from which date it counts: order or delivery?</li>
        <li>Acceptable condition: original packaging? unused?</li>
        <li>Who pays return shipping for a defect versus a change of mind.</li>
        <li>Refund timing and destination: card or store wallet.</li>
        <li>Excluded products: customised, digital, anything not returnable once opened.</li>
      </ul>

      <h2>The exclusions clause matters most</h2>
      <p>Most disputes arise over a product the merchant treats as excluded and the customer never knew about. Put the exclusion on the product page, not only in the policy.</p>

      <h2>Make the request easy, not obstructive</h2>
      <p>A return process requiring a call, a message and a form pushes customers to open a dispute with their bank instead — far worse for you.</p>

      <h2>Record the reason every time</h2>
      <p>"Wrong size", "different from the photo" and "arrived damaged" are three entirely different problems: the first is your size chart, the second your photography, the third your packaging. Without recording the reason you will not know which is costing you.</p>
    `,
  },
  {
    id: "manual-orders",
    cluster: "orders",
    titleAr: "الطلبات اليدوية: بيع عبر واتساب دون أن تفقد بياناتك",
    titleEn: "Manual orders: selling over WhatsApp without losing your data",
    excerptAr: "نصف مبيعات كثير من المتاجر تتم في المحادثات. إن لم تدخل النظام فهي غير موجودة في تقاريرك.",
    excerptEn: "Half of many stores' sales happen in chat. If they never enter the system, they do not exist in your reports.",
    date: "2026-08-01",
    readTime: 5,
    contentAr: `
      <p>في السوق السعودي جزء كبير من البيع يحدث في محادثة واتساب. المشكلة أن هذه الطلبات كثيرًا ما تُنفَّذ خارج المتجر تمامًا.</p>

      <h2>ما الذي تخسره حين لا تسجّل الطلب؟</h2>
      <ul>
        <li>المخزون لا يُخصم، فتبيع ما نفد.</li>
        <li>التقارير لا تعكس مبيعاتك الحقيقية، فتتخذ قرارات بأرقام ناقصة.</li>
        <li>لا فاتورة إلكترونية للطلب.</li>
        <li>لا سجل للعميل، فلا يمكنك إعادة استهدافه لاحقًا.</li>
      </ul>

      <h2>الطلب اليدوي يحل هذا</h2>
      <p>أنشئ الطلب داخل لوحة التحكم باسم العميل ومنتجاته، وأرسل له رابط الدفع. الطلب يدخل النظام ككل الطلبات: يخصم المخزون، ويصدر فاتورة، ويظهر في التقارير.</p>

      <h2>متى يكون الطلب اليدوي هو الصواب؟</h2>
      <ul>
        <li>عميل جملة بسعر متفق عليه.</li>
        <li>منتج مخصص اتُّفق على تفاصيله في المحادثة.</li>
        <li>عميل يواجه مشكلة تقنية في إتمام الطلب بنفسه.</li>
        <li>بيع من معرض أو نقطة بيع خارجية.</li>
      </ul>

      <h2>لكن لا تجعله القاعدة</h2>
      <p>إذا كانت أغلب طلباتك يدوية فالمشكلة في المتجر لا في العملاء. راجع لماذا لا يكمل الناس الشراء بأنفسهم — غالبًا صفحة منتج ناقصة أو وسيلة دفع مفقودة.</p>
    `,
    contentEn: `
      <p>In the Saudi market a large share of selling happens in a WhatsApp conversation. The problem is that these orders are often fulfilled entirely outside the store.</p>

      <h2>What you lose by not recording them</h2>
      <ul>
        <li>Stock is not deducted, so you sell what has run out.</li>
        <li>Reports do not reflect real sales, so you decide on incomplete numbers.</li>
        <li>No e-invoice for the order.</li>
        <li>No customer record, so no retargeting later.</li>
      </ul>

      <h2>Manual orders solve this</h2>
      <p>Create the order in the dashboard with the customer and their items, and send a payment link. It enters the system like any other order: stock deducted, invoice issued, visible in reports.</p>

      <h2>When a manual order is the right call</h2>
      <ul>
        <li>A wholesale customer on an agreed price.</li>
        <li>A custom product whose details were settled in conversation.</li>
        <li>A customer hitting a technical problem completing checkout.</li>
        <li>Selling at an exhibition or an offline point of sale.</li>
      </ul>

      <h2>But do not let it become the norm</h2>
      <p>If most of your orders are manual, the problem is the store, not the customers. Look at why people are not completing checkout themselves — usually an incomplete product page or a missing payment method.</p>
    `,
  },
  {
    id: "store-reports-what-to-read",
    cluster: "orders",
    titleAr: "تقارير المتجر: الأرقام الخمسة التي تستحق وقتك أسبوعيًا",
    titleEn: "Store reports: the five numbers worth your time each week",
    excerptAr: "لوحة التحكم تعرض عشرات المؤشرات. خمسة منها فقط تغيّر قراراتك.",
    excerptEn: "The dashboard shows dozens of metrics. Only five of them change your decisions.",
    date: "2026-07-31",
    readTime: 6,
    contentAr: `
      <p>معظم التجّار ينظرون لرقم واحد: المبيعات. وهو أقل الأرقام إفادة لأنه نتيجة لا سبب.</p>

      <h2>1. معدل التحويل</h2>
      <p>كم زائرًا يتحول إلى طلب. إن كانت زياراتك تزيد ومبيعاتك ثابتة فالمشكلة في المتجر لا في التسويق. هذا الرقم يخبرك أين تنفق: على جلب زوار أم على إصلاح الصفحات.</p>

      <h2>2. متوسط قيمة الطلب</h2>
      <p>رفعه أرخص كثيرًا من جلب عملاء جدد. راقبه بعد كل تغيير في العروض أو التوصيات أو حد الشحن المجاني.</p>

      <h2>3. معدل هجر السلة</h2>
      <p>ارتفاعه المفاجئ يعني عادة عطلًا تقنيًا: وسيلة دفع توقفت، أو خطأ في حساب الشحن. راقبه يوميًا لا شهريًا.</p>

      <h2>4. أكثر المنتجات مشاهدةً مقابل أكثرها مبيعًا</h2>
      <p>المنتج الذي يُشاهد كثيرًا ولا يُباع لديه مشكلة محددة: السعر، أو الصور، أو الوصف، أو نفاد المقاسات. هذه أسرع فرصة تحسين في متجرك.</p>

      <h2>5. مصدر الزيارات</h2>
      <p>من أين يأتي من يشتري فعلًا — لا من أين يأتي أكبر عدد. قناة تجلب مئة زائر يشتري منهم خمسة أفضل من قناة تجلب ألفًا بلا طلب.</p>

      <h2>قاعدة القراءة</h2>
      <p>قارن بالفترة نفسها من الشهر الماضي لا باليوم السابق. تقلّب اليوم الواحد ضجيج، والاتجاه على أربعة أسابيع هو الإشارة.</p>
    `,
    contentEn: `
      <p>Most merchants look at one number: sales. It is the least useful one, because it is an outcome rather than a cause.</p>

      <h2>1. Conversion rate</h2>
      <p>How many visitors become orders. If traffic rises and sales stay flat, the problem is the store, not the marketing. This number tells you where to spend: on attracting visitors or on fixing pages.</p>

      <h2>2. Average order value</h2>
      <p>Raising it is far cheaper than acquiring new customers. Watch it after every change to offers, recommendations or your free-shipping threshold.</p>

      <h2>3. Cart abandonment rate</h2>
      <p>A sudden rise usually means a technical fault: a payment method stopped working, or shipping is miscalculating. Watch this daily, not monthly.</p>

      <h2>4. Most-viewed versus best-selling products</h2>
      <p>A product viewed often but rarely bought has a specific problem: price, images, description, or sold-out sizes. This is the fastest improvement opportunity in your store.</p>

      <h2>5. Traffic source</h2>
      <p>Where buyers come from — not where the most visitors come from. A channel bringing a hundred visitors of whom five buy beats one bringing a thousand with no orders.</p>

      <h2>How to read them</h2>
      <p>Compare with the same period last month, not with yesterday. Single-day movement is noise; the four-week trend is the signal.</p>
    `,
  },
  {
    id: "preparing-store-for-peak-season",
    cluster: "orders",
    titleAr: "تجهيز المتجر لموسم الذروة: قائمة ما قبل الحملة",
    titleEn: "Preparing for peak season: the pre-campaign checklist",
    excerptAr: "رمضان والجمعة البيضاء واليوم الوطني تكشف كل ضعف في تشغيلك دفعة واحدة.",
    excerptEn: "Ramadan, White Friday and National Day expose every operational weakness at once.",
    date: "2026-07-30",
    readTime: 6,
    contentAr: `
      <p>الموسم لا يخلق مشاكل جديدة، بل يضاعف المشاكل القائمة حتى تصبح مرئية. الاستعداد يبدأ قبل الحملة بأسابيع لا بأيام.</p>

      <h2>قبل الموسم بثلاثة أسابيع</h2>
      <ul>
        <li>راجع المخزون لأكثر عشرين منتجًا مبيعًا، واطلب إعادة التوريد الآن.</li>
        <li>اتفق مع شركة الشحن على استيعاب الكمية المتوقعة ومواعيد الاستلام.</li>
        <li>اختبر المتجر تحت ضغط: افتح عدة صفحات ثقيلة وتابع السرعة.</li>
      </ul>

      <h2>قبل الموسم بأسبوع</h2>
      <ul>
        <li>جهّز البنرات والصفحات الموسمية وانشرها كمسودة جاهزة.</li>
        <li>اضبط الكوبونات وحدّد لها تاريخ انتهاء — الكوبون المفتوح يُتداول بعد الموسم.</li>
        <li>اكتب ردود خدمة العملاء الجاهزة لأكثر عشرة أسئلة تتكرر.</li>
        <li>نفّذ عملية شراء اختبارية كاملة بعد كل تغيير في الأسعار.</li>
      </ul>

      <h2>أثناء الموسم</h2>
      <p>راقب معدل هجر السلة يوميًا. أي قفزة مفاجئة تعني عطلًا لا تغيّرًا في سلوك العملاء. وراقب المخزون مرتين يوميًا في الأيام الأولى.</p>

      <h2>وضع الصيانة ليس عيبًا</h2>
      <p>إن احتجت تعديلًا كبيرًا وسط الموسم، فعّل وضع الصيانة لدقائق بدل أن يرى العملاء متجرًا نصف مكسور. الرسالة الواضحة أفضل من الصفحة المعطّلة.</p>

      <h2>بعد الموسم</h2>
      <p>سجّل ما تعطّل ولماذا وأنت لا تزال تذكر. هذه القائمة هي خطة استعدادك للموسم القادم.</p>
    `,
    contentEn: `
      <p>A peak season does not create new problems; it multiplies existing ones until they become visible. Preparation starts weeks before the campaign, not days.</p>

      <h2>Three weeks out</h2>
      <ul>
        <li>Review stock on your twenty best sellers and reorder now.</li>
        <li>Agree expected volumes and pickup times with your carrier.</li>
        <li>Test the store under load: open several heavy pages and watch the speed.</li>
      </ul>

      <h2>One week out</h2>
      <ul>
        <li>Prepare seasonal banners and pages and stage them as ready drafts.</li>
        <li>Set coupons with an expiry date — an open-ended coupon circulates after the season.</li>
        <li>Write canned support replies for the ten most repeated questions.</li>
        <li>Run a full test purchase after every price change.</li>
      </ul>

      <h2>During the season</h2>
      <p>Watch cart abandonment daily. Any sudden jump means a fault, not a change in customer behaviour. Check stock twice a day in the first days.</p>

      <h2>Maintenance mode is not a failure</h2>
      <p>If you need a major change mid-season, enable maintenance mode for a few minutes rather than letting customers see a half-broken store. A clear message beats a broken page.</p>

      <h2>After the season</h2>
      <p>Write down what broke and why while you still remember. That list is your preparation plan for next time.</p>
    `,
  },
];
