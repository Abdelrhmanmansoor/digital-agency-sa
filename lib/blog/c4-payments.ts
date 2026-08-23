import type { Article } from "./types";

export const PAYMENTS: Article[] = [
  {
    id: "payment-gateways-saudi",
    cluster: "payments",
    titleAr: "بوابات الدفع في السعودية: ما تحتاجه فعلًا وما يمكن تأجيله",
    titleEn: "Payment gateways in Saudi Arabia: what you need and what can wait",
    excerptAr: "مدى ليست خيارًا بين خيارات — هي الوسيلة الأوسع استخدامًا في السوق.",
    excerptEn: "mada is not one option among many — it is the most widely used method in the market.",
    date: "2026-07-29",
    readTime: 6,
    contentAr: `
      <p>تفعيل كل وسائل الدفع المتاحة يبدو قرارًا آمنًا، لكن كل وسيلة لها نسبة تحصيل وإعداد ومتابعة. الأصح أن تبدأ بما يستخدمه سوقك فعلًا.</p>

      <h2>الأساسيات التي لا يستغني عنها متجر سعودي</h2>
      <ul>
        <li><strong>مدى:</strong> البطاقة المحلية الأوسع انتشارًا. متجر بدونها يخسر شريحة كبيرة من العملاء.</li>
        <li><strong>أبل باي:</strong> نسبة استخدام مرتفعة على الجوال، ويختصر خطوات الدفع بشكل ملموس.</li>
        <li><strong>فيزا وماستركارد:</strong> للبطاقات الائتمانية وللعملاء خارج السعودية.</li>
      </ul>

      <h2>ما يمكن إضافته لاحقًا</h2>
      <p>STC Pay والمحافظ الرقمية الأخرى إضافة جيدة لكنها ليست شرطًا للإطلاق. أضفها حين ترى طلبًا فعليًا عليها في محادثات عملائك.</p>

      <h2>الدفع عند الاستلام: سلاح ذو حدين</h2>
      <p>يزيد الطلبات ويزيد الإلغاء معًا. إن فعّلته فحدّد سقفًا لقيمة الطلب، واستثنِ المناطق البعيدة، وراقب نسبة الرفض عند التسليم — إن تجاوزت حدًّا معقولًا فالتكلفة تفوق العائد.</p>

      <h2>انتبه لنسبة التحصيل</h2>
      <p>كل بوابة تأخذ نسبة من كل عملية. هذه تكلفة تشغيل دائمة تؤثر في هامشك على كل طلب — احسبها ضمن تسعيرك لا كمصروف جانبي.</p>

      <h2>اختبر قبل الإطلاق وبعد كل تعديل</h2>
      <p>نفّذ عملية شراء حقيقية بكل وسيلة مفعّلة. الوسيلة التي تظهر في الإعدادات لا تعني بالضرورة أنها تعمل من جهاز العميل.</p>
    `,
    contentEn: `
      <p>Enabling every available payment method looks like a safe decision, but each one carries a fee, a setup and ongoing monitoring. Better to start with what your market actually uses.</p>

      <h2>The essentials for a Saudi store</h2>
      <ul>
        <li><strong>mada:</strong> the most widely held local card. A store without it loses a large share of customers.</li>
        <li><strong>Apple Pay:</strong> high mobile usage, and it visibly shortens checkout.</li>
        <li><strong>Visa and Mastercard:</strong> for credit cards and customers outside Saudi Arabia.</li>
      </ul>

      <h2>What can be added later</h2>
      <p>STC Pay and other digital wallets are good additions but not launch requirements. Add them when you see real demand in customer conversations.</p>

      <h2>Cash on delivery: double-edged</h2>
      <p>It raises orders and cancellations together. If you enable it, cap the order value, exclude remote regions, and watch the refusal-on-delivery rate — past a reasonable threshold the cost exceeds the return.</p>

      <h2>Mind the transaction fee</h2>
      <p>Every gateway takes a percentage of each order. This is a permanent operating cost affecting margin on every sale — build it into pricing rather than treating it as an incidental.</p>

      <h2>Test before launch and after every change</h2>
      <p>Run a real purchase through every enabled method. A method appearing in settings does not guarantee it works from a customer's device.</p>
    `,
  },
  {
    id: "bnpl-tabby-tamara",
    cluster: "payments",
    titleAr: "التقسيط في السوق السعودي: أثره على متوسط السلة وتكلفته",
    titleEn: "BNPL in the Saudi market: its effect on basket size and its cost",
    excerptAr: "تابي وتمارا وإمكان ومدفوع وميسباي — متى يستحق التقسيط نسبته وكيف تعرضه.",
    excerptEn: "Tabby, Tamara, Emkan, Madfu and MisPay — when BNPL earns its fee and how to present it.",
    date: "2026-07-28",
    readTime: 6,
    contentAr: `
      <p>التقسيط لم يعد ميزة إضافية في السوق السعودي، بل أصبح متوقعًا في فئات سعرية معيّنة. لكنه ليس مناسبًا لكل متجر.</p>

      <h2>الخيارات المتاحة</h2>
      <p>الأشهر تابي وتمارا، وإلى جانبهما إمكان ومدفوع وميسباي. لا داعي لتفعيلها كلها — اثنان يغطيان أغلب العملاء، وكل خدمة إضافية تعني إعدادًا ومطابقة حسابات إضافية.</p>

      <h2>متى يستحق التقسيط نسبته؟</h2>
      <ul>
        <li>متوسط سلتك يتجاوز بضع مئات من الريالات.</li>
        <li>منتجك يُشترى بقرار مدروس لا باندفاع.</li>
        <li>ترى في تقاريرك سلات كبيرة تُترك عند خطوة الدفع.</li>
      </ul>
      <p>أما إن كان متوسط طلبك منخفضًا فنسبة التقسيط ستأكل هامشًا لا يحتمل.</p>

      <h2>اعرضه في صفحة المنتج لا في الدفع فقط</h2>
      <p>أهم مكان لذكر التقسيط هو تحت السعر مباشرة: «أو 4 دفعات بـ… ريال». العميل يتخذ قرار القدرة على الشراء وهو ينظر إلى المنتج، لا بعد أن يملأ عنوانه.</p>

      <h2>احسب التكلفة الحقيقية</h2>
      <p>نسبة التقسيط أعلى عادة من نسبة البطاقة العادية. قارن: هل الزيادة في متوسط السلة وعدد الطلبات تغطي الفرق؟ الجواب يظهر بعد شهر من التفعيل في تقاريرك، لا في التوقعات.</p>

      <h2>اذكر الشروط بوضوح</h2>
      <p>الحد الأدنى والأعلى للطلب المؤهل، وأن الموافقة تعود لمزود الخدمة لا لك. العميل الذي يُرفض طلبه عند الدفع دون تفسير مسبق يغادر ولا يعود.</p>
    `,
    contentEn: `
      <p>BNPL is no longer a bonus in the Saudi market; in certain price brackets it is expected. But it does not suit every store.</p>

      <h2>The available options</h2>
      <p>Tabby and Tamara are the best known, alongside Emkan, Madfu and MisPay. There is no need to enable all of them — two cover most customers, and each additional provider means more setup and more reconciliation.</p>

      <h2>When BNPL earns its fee</h2>
      <ul>
        <li>Your average basket is above a few hundred riyals.</li>
        <li>Your product is a considered purchase, not an impulse one.</li>
        <li>Your reports show large carts abandoned at the payment step.</li>
      </ul>
      <p>If your average order is low, the BNPL fee will eat a margin that cannot carry it.</p>

      <h2>Show it on the product page, not just at checkout</h2>
      <p>The most important place to mention instalments is directly under the price: "or 4 payments of…". Customers decide affordability while looking at the product, not after entering their address.</p>

      <h2>Calculate the real cost</h2>
      <p>BNPL fees are usually higher than standard card fees. Compare: does the lift in basket size and order count cover the difference? The answer appears in your reports a month after enabling it, not in forecasts.</p>

      <h2>State the conditions clearly</h2>
      <p>Minimum and maximum eligible order values, and that approval rests with the provider rather than you. A customer declined at checkout with no prior explanation leaves and does not return.</p>
    `,
  },
  {
    id: "zatca-e-invoicing-stores",
    cluster: "payments",
    titleAr: "الفوترة الإلكترونية للمتاجر: ما يجب أن يعرفه كل تاجر",
    titleEn: "E-invoicing for online stores: what every merchant should know",
    excerptAr: "الفاتورة الإلكترونية متطلب نظامي لا إعداد اختياري في لوحة التحكم.",
    excerptEn: "The e-invoice is a regulatory requirement, not an optional dashboard setting.",
    date: "2026-07-27",
    readTime: 6,
    contentAr: `
      <p>كثير من المتاجر الجديدة تكتشف الفوترة الإلكترونية متأخرة، بعد أن تكون قد أصدرت مئات الطلبات بفواتير لا تستوفي المتطلبات.</p>

      <h2>ما المقصود بالفاتورة الإلكترونية؟</h2>
      <p>فاتورة تُنشأ وتُحفظ بصيغة إلكترونية منظمة، تحمل بيانات محددة ورمز استجابة سريعة QR، وتُربط بأنظمة هيئة الزكاة والضريبة والجمارك في المرحلة الثانية.</p>

      <h2>البيانات التي يجب أن تحملها</h2>
      <ul>
        <li>اسم المنشأة ورقم التسجيل الضريبي.</li>
        <li>تاريخ ووقت إصدار الفاتورة.</li>
        <li>تفاصيل الأصناف والكميات والأسعار.</li>
        <li>قيمة الضريبة والإجمالي شاملًا الضريبة.</li>
        <li>رمز QR يمكن قراءته.</li>
      </ul>

      <h2>كيف تُفعّلها على متجرك؟</h2>
      <p>على سلة وزد تتم عبر تطبيق مخصص من متجر التطبيقات يربط متجرك بالمتطلبات. على شوبيفاي ستحتاج تطبيق طرف ثالث. في الحالتين الإعداد لمرة واحدة، لكنه يحتاج بيانات ضريبية صحيحة.</p>

      <h2>الخطأ الأكثر تكرارًا</h2>
      <p>إدخال رقم تسجيل ضريبي خاطئ أو اسم منشأة لا يطابق السجل. الفواتير الصادرة ببيانات خاطئة تحتاج معالجة لاحقة مرهقة. تحقّق من الرقم حرفًا حرفًا قبل أول طلب.</p>

      <h2>لا تنسَ المنتجات الرقمية</h2>
      <p>الفوترة تنطبق على المنتجات الرقمية والخدمات كما تنطبق على المنتجات المشحونة. أي منتج تبيعه بمقابل يحتاج فاتورة نظامية.</p>
    `,
    contentEn: `
      <p>Many new stores discover e-invoicing late, after issuing hundreds of orders with invoices that do not meet the requirements.</p>

      <h2>What is an e-invoice?</h2>
      <p>An invoice created and stored in a structured electronic format, carrying specified data and a QR code, and integrated with the tax authority's systems at phase two.</p>

      <h2>The data it must carry</h2>
      <ul>
        <li>Business name and VAT registration number.</li>
        <li>Issue date and time.</li>
        <li>Line items, quantities and prices.</li>
        <li>Tax amount and the total including tax.</li>
        <li>A readable QR code.</li>
      </ul>

      <h2>How to enable it</h2>
      <p>On Salla and Zid it is handled by a dedicated app from the platform's app store. On Shopify you need a third-party app. Either way it is a one-time setup, but it requires correct tax details.</p>

      <h2>The most common mistake</h2>
      <p>Entering a wrong VAT registration number or a business name that does not match the registration. Invoices issued with wrong data need painful correction later. Verify the number character by character before your first order.</p>

      <h2>Do not forget digital products</h2>
      <p>Invoicing applies to digital goods and services exactly as it does to shipped products. Anything you sell for payment needs a compliant invoice.</p>
    `,
  },
  {
    id: "vat-setup-for-stores",
    cluster: "payments",
    titleAr: "ضبط ضريبة القيمة المضافة: الأسعار شاملة أم غير شاملة؟",
    titleEn: "VAT setup: tax-inclusive or tax-exclusive pricing?",
    excerptAr: "قرار واحد في الإعدادات يغيّر كل سعر يراه العميل — وأثره في التحويل حقيقي.",
    excerptEn: "One setting changes every price a customer sees — and its effect on conversion is real.",
    date: "2026-07-26",
    readTime: 5,
    contentAr: `
      <p>عند إعداد الضريبة ستُسأل سؤالًا يبدو تقنيًا: هل الأسعار المدخلة شاملة للضريبة أم تُضاف عليها؟ الإجابة تغيّر تجربة الشراء بالكامل.</p>

      <h2>الأسعار الشاملة</h2>
      <p>السعر المعروض هو ما سيدفعه العميل. لا مفاجأة عند الدفع، وهذا ما يتوقعه المتسوق في السوق السعودي. عيبه الوحيد أن أرقامك تصبح غير مستديرة إن حسبتها بشكل عكسي.</p>

      <h2>الأسعار غير الشاملة</h2>
      <p>الضريبة تُضاف عند الدفع. ميزتها أن السعر المعروض يبدو أقل، وعيبها أن العميل يرى المبلغ يرتفع في الخطوة الأخيرة — وهذا من أكثر أسباب هجر السلة.</p>

      <h2>التوصية العملية للبيع للأفراد</h2>
      <p>اعرض السعر شاملًا. أي زيادة تظهر في الخطوة الأخيرة تُقرأ كمفاجأة غير سارّة حتى لو كانت نظامية ومتوقعة.</p>

      <h2>البيع للمنشآت مختلف</h2>
      <p>إن كان جمهورك من الشركات فقد يفضّلون رؤية السعر قبل الضريبة لأنهم يستردونها. إن كنت تبيع للفئتين، اذكر الرقمين بوضوح في صفحة المنتج بدل أن تختار واحدًا.</p>

      <h2>لا تغيّر الإعداد بعد الإطلاق</h2>
      <p>تبديل طريقة الحساب على كتالوج قائم يعيد حساب كل الأسعار. احسم القرار قبل رفع المنتجات، وإن اضطررت للتغيير فراجع عيّنة من الأسعار يدويًا بعده مباشرة.</p>
    `,
    contentEn: `
      <p>Setting up tax asks a question that looks technical: are entered prices inclusive of VAT, or is it added on top? The answer changes the entire buying experience.</p>

      <h2>Tax-inclusive pricing</h2>
      <p>The displayed price is what the customer pays. No surprise at checkout, which is what Saudi shoppers expect. Its only drawback is that your numbers become untidy if you calculate backwards.</p>

      <h2>Tax-exclusive pricing</h2>
      <p>Tax is added at checkout. The advantage is a lower displayed price; the drawback is the customer watching the total rise at the final step — among the most common causes of abandonment.</p>

      <h2>The practical recommendation for consumer sales</h2>
      <p>Display inclusive prices. Any increase appearing at the last step reads as an unpleasant surprise, even when it is lawful and expected.</p>

      <h2>Business sales are different</h2>
      <p>If your audience is companies, they may prefer seeing the pre-tax price because they reclaim it. If you sell to both, show both figures clearly on the product page rather than picking one.</p>

      <h2>Do not change the setting after launch</h2>
      <p>Switching the calculation method on an existing catalogue recalculates every price. Settle it before uploading products, and if you must change, manually review a sample of prices straight afterwards.</p>
    `,
  },
  {
    id: "customer-wallet-cashback",
    cluster: "payments",
    titleAr: "محفظة العميل والكاش باك: كيف تعيد العميل دون خصم دائم",
    titleEn: "Customer wallet and cashback: bringing customers back without permanent discounts",
    excerptAr: "الرصيد في المحفظة يعود إليك، بينما الخصم يخرج من هامشك ولا يعود.",
    excerptEn: "Wallet credit comes back to you; a discount leaves your margin and never returns.",
    date: "2026-07-25",
    readTime: 5,
    contentAr: `
      <p>الخصم المتكرر يعلّم العميل انتظار العرض القادم. المحفظة تفعل العكس: تعطيه قيمة لا يمكن صرفها إلا عندك.</p>

      <h2>الفرق الجوهري</h2>
      <p>خصم 20 ريالًا يخرج من هامشك فورًا وينتهي. رصيد 20 ريالًا في المحفظة لا يُستخدم إلا في طلب جديد — أي أنه يكلّفك فقط حين يجلب لك بيعًا إضافيًا.</p>

      <h2>استخدامات المحفظة</h2>
      <ul>
        <li><strong>كاش باك:</strong> نسبة من كل طلب تعود كرصيد.</li>
        <li><strong>بديل للاسترجاع النقدي:</strong> أسرع للعميل وأقل تكلفة عليك — بشرط أن يكون خيارًا لا إلزامًا.</li>
        <li><strong>تعويض عن خطأ:</strong> تأخر شحن أو منتج ناقص.</li>
        <li><strong>مكافأة إحالة:</strong> رصيد لمن يجلب عميلًا جديدًا.</li>
      </ul>

      <h2>اضبط قواعد واضحة</h2>
      <p>هل للرصيد تاريخ انتهاء؟ هل يمكن استخدامه مع كوبون؟ هل يغطي الشحن؟ هذه أسئلة ستصل خدمة العملاء حتمًا — أجب عنها في صفحة واحدة مسبقًا.</p>

      <h2>لا تجبر العميل على المحفظة</h2>
      <p>إن رفض العميل استرجاعًا نقديًا وفرضت عليه رصيدًا، فقد كسبت مبلغًا وخسرت الثقة. اجعلها خيارًا مغريًا — مثلًا رصيد أعلى قليلًا من المبلغ النقدي.</p>

      <h2>راقب الأثر</h2>
      <p>الرقم المهم ليس كم رصيدًا وزّعت، بل كم من حاملي الرصيد عادوا واشتروا فعلًا. إن كان الرصيد يتراكم بلا استخدام فالبرنامج لا يعمل.</p>
    `,
    contentEn: `
      <p>Repeated discounting teaches customers to wait for the next offer. A wallet does the opposite: it gives them value that can only be spent with you.</p>

      <h2>The essential difference</h2>
      <p>A 20-riyal discount leaves your margin immediately and is gone. A 20-riyal wallet balance is only used on a new order — meaning it costs you only when it brings additional business.</p>

      <h2>What a wallet is for</h2>
      <ul>
        <li><strong>Cashback:</strong> a share of each order returned as credit.</li>
        <li><strong>An alternative to cash refunds:</strong> faster for the customer and cheaper for you — provided it is an option, not an imposition.</li>
        <li><strong>Compensation for a mistake:</strong> a late shipment or a missing item.</li>
        <li><strong>Referral reward:</strong> credit for bringing a new customer.</li>
      </ul>

      <h2>Set clear rules</h2>
      <p>Does credit expire? Can it be combined with a coupon? Does it cover shipping? These questions will reach support regardless — answer them on one page in advance.</p>

      <h2>Do not force the wallet</h2>
      <p>If a customer wants a cash refund and you impose credit instead, you have kept the money and lost the trust. Make it an attractive option — for instance, slightly more credit than the cash amount.</p>

      <h2>Watch the effect</h2>
      <p>The number that matters is not how much credit you issued, but how many credit holders came back and actually bought. If credit accumulates unused, the programme is not working.</p>
    `,
  },
  {
    id: "payment-restrictions-limits",
    cluster: "payments",
    titleAr: "قيود الدفع وحدوده: متى تمنع وسيلة دفع عمدًا",
    titleEn: "Payment restrictions and limits: when to deliberately block a method",
    excerptAr: "ليس كل طلب يستحق كل وسيلة دفع. القيود الصحيحة تحمي هامشك من الخسائر الصامتة.",
    excerptEn: "Not every order deserves every payment method. The right limits protect you from quiet losses.",
    date: "2026-07-24",
    readTime: 5,
    contentAr: `
      <p>ترك كل وسائل الدفع مفتوحة لكل طلب يبدو كرمًا مع العميل. عمليًا هو ما يجعل بعض الطلبات تخسرك مالًا.</p>

      <h2>سقف الدفع عند الاستلام</h2>
      <p>طلب كبير القيمة بالدفع عند الاستلام مخاطرة مزدوجة: احتمال الرفض عند الباب، وتكلفة شحن ذهابًا وإيابًا على منتج غالٍ. حدّد سقفًا يتناسب مع متوسط سلتك.</p>

      <h2>استثناء المناطق</h2>
      <p>بعض المناطق البعيدة تكلفة الشحن إليها مرتفعة ونسبة الرفض فيها أعلى. لك أن تستثنيها من الدفع عند الاستلام مع إبقاء الدفع الإلكتروني متاحًا لها.</p>

      <h2>حد أدنى للطلب</h2>
      <p>طلب بقيمة عشرين ريالًا مع شحن وعمولة بوابة قد يخرج بهامش سالب. الحد الأدنى للطلب يحمي هذا، لكن اجعله معقولًا واذكره مبكرًا لا عند الدفع.</p>

      <h2>تقييد التقسيط بقيمة معينة</h2>
      <p>نسبة التقسيط على طلب صغير قد تلتهم هامشه. أغلب مزوّدي الخدمة لديهم حد أدنى أصلًا — تأكد أن حدّك يتوافق معه حتى لا يرى العميل خيارًا يُرفض عند الضغط عليه.</p>

      <h2>القاعدة الحاكمة</h2>
      <p>كل قيد يجب أن يكون مرئيًا قبل خطوة الدفع. القيد الذي يفاجئ العميل في اللحظة الأخيرة يكلّفك الطلب كاملًا، لا الفارق فقط.</p>
    `,
    contentEn: `
      <p>Leaving every payment method open on every order looks generous. In practice it is what makes certain orders lose you money.</p>

      <h2>A cap on cash on delivery</h2>
      <p>A high-value COD order is a double risk: possible refusal at the door, and round-trip shipping on an expensive item. Set a cap proportionate to your average basket.</p>

      <h2>Excluding regions</h2>
      <p>Some remote regions cost more to ship to and have higher refusal rates. You can exclude them from cash on delivery while keeping electronic payment available.</p>

      <h2>A minimum order value</h2>
      <p>A twenty-riyal order carrying shipping and a gateway fee can end up with negative margin. A minimum protects against that — but keep it reasonable and state it early, not at checkout.</p>

      <h2>Restricting BNPL by value</h2>
      <p>The BNPL fee on a small order can swallow its margin. Most providers already have a minimum — make sure yours aligns, so customers do not see an option that is rejected when they click it.</p>

      <h2>The governing rule</h2>
      <p>Every restriction must be visible before the payment step. A restriction that surprises the customer at the last moment costs you the whole order, not just the difference.</p>
    `,
  },
];
