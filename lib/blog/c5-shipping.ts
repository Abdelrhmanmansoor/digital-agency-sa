import type { Article } from "./types";

export const SHIPPING: Article[] = [
  {
    id: "volumetric-weight-shipping-cost",
    cluster: "shipping",
    titleAr: "الوزن الحجمي: لماذا تدفع أكثر مما يزنه منتجك",
    titleEn: "Volumetric weight: why you pay more than your product weighs",
    excerptAr: "شركات الشحن تحاسبك على المساحة التي يشغلها الطرد، لا على ثقله فقط.",
    excerptEn: "Carriers bill you for the space a parcel occupies, not only for how heavy it is.",
    date: "2026-07-23",
    readTime: 5,
    contentAr: `
      <p>تشحن وسادة تزن نصف كيلو فتُحاسب على ثلاثة كيلوات. السبب ليس خطأ من شركة الشحن، بل الوزن الحجمي.</p>

      <h2>كيف يُحسب؟</h2>
      <p>الشركة تحسب حجم الطرد (الطول × العرض × الارتفاع) ثم تقسمه على معامل ثابت تحدده. النتيجة هي «الوزن الحجمي». تُقارن بالوزن الفعلي، ويُحاسب على <strong>الأكبر منهما</strong>.</p>

      <h2>لماذا يهمك هذا؟</h2>
      <p>لأن أغلب خسائر الشحن الصامتة تأتي من هنا. تحسب سعر الشحن على وزن المنتج، ثم تكتشف في فاتورة آخر الشهر أنك دفعت ضعف ما حصّلته من العملاء.</p>

      <h2>كيف تقلّله؟</h2>
      <ul>
        <li>استخدم أصغر صندوق يحمي المنتج فعلًا — لا الصندوق الموجود لديك.</li>
        <li>تخلَّص من الفراغ الداخلي: الحشو الكثير يزيد الحجم بلا فائدة.</li>
        <li>للمنتجات المرنة، استخدم أظرفًا بدل الصناديق.</li>
        <li>وحّد مقاسات التغليف في ثلاثة أحجام تعرف تكلفتها بدقة.</li>
      </ul>

      <h2>أدخل الأبعاد في كل منتج</h2>
      <p>حقول الطول والعرض والارتفاع في صفحة المنتج ليست شكلية — بدونها لا يستطيع المتجر تقدير الشحن بدقة، وستدفع الفرق أنت.</p>

      <h2>اختبر بطرد حقيقي</h2>
      <p>خذ أكثر ثلاثة منتجات مبيعًا، غلّفها كما تُغلّف فعلًا، واحسب وزنها الحجمي. الفارق بين هذا الرقم وما تحصّله من العميل هو ربحك أو خسارتك على كل طلب.</p>
    `,
    contentEn: `
      <p>You ship a cushion weighing half a kilo and get billed for three. That is not a carrier error — it is volumetric weight.</p>

      <h2>How it is calculated</h2>
      <p>The carrier takes the parcel's volume (length × width × height) and divides it by a fixed factor. The result is the volumetric weight. It is compared with the actual weight, and you are billed on <strong>whichever is greater</strong>.</p>

      <h2>Why it matters</h2>
      <p>Because most quiet shipping losses come from here. You price shipping on product weight, then discover at month-end that you paid double what you collected from customers.</p>

      <h2>How to reduce it</h2>
      <ul>
        <li>Use the smallest box that genuinely protects the product — not the box you happen to have.</li>
        <li>Remove internal void: excess filler adds volume for nothing.</li>
        <li>For soft goods, use mailers instead of boxes.</li>
        <li>Standardise packaging into three sizes whose cost you know precisely.</li>
      </ul>

      <h2>Enter dimensions on every product</h2>
      <p>The length, width and height fields are not cosmetic — without them the store cannot estimate shipping accurately, and you absorb the difference.</p>

      <h2>Test with a real parcel</h2>
      <p>Take your three best sellers, pack them the way you actually pack them, and calculate volumetric weight. The gap between that figure and what you charge is your profit or loss on every order.</p>
    `,
  },
  {
    id: "choosing-shipping-carrier",
    cluster: "shipping",
    titleAr: "اختيار شركة الشحن: خمسة معايير أهم من السعر",
    titleEn: "Choosing a carrier: five criteria that matter more than price",
    excerptAr: "أرخص شركة شحن قد تكون أغلى ما في متجرك إن ارتفعت شكاوى التأخير.",
    excerptEn: "The cheapest carrier can be the most expensive thing in your store once delay complaints start.",
    date: "2026-07-22",
    readTime: 6,
    contentAr: `
      <p>الفارق بين شركتي شحن قد يكون ريالين للطرد. لكن الشكوى الواحدة وإعادة الشحن تكلّفك أضعاف هذا الفارق.</p>

      <h2>1. التغطية الفعلية لا المعلنة</h2>
      <p>كل شركة تقول إنها تغطي المملكة. اسأل تحديدًا عن المناطق التي يأتيك منها طلبات فعلًا، وعن مدة التوصيل لكل منها — لا المتوسط العام.</p>

      <h2>2. نسبة التسليم من أول محاولة</h2>
      <p>هذا أهم رقم ولا أحد يعلنه. اسأل عنه صراحة. كل محاولة إضافية تعني تأخيرًا وشكوى واحتمال رفض.</p>

      <h2>3. جودة التتبع للعميل</h2>
      <p>رابط تتبع يعمل ويُحدَّث يقلّل رسائل «وين طلبي؟» أكثر من أي شيء آخر. الشركة التي لا تعطي تتبعًا موثوقًا تحوّل خدمة عملائك إلى مركز استعلام.</p>

      <h2>4. طريقة التعامل مع المرتجعات</h2>
      <p>كم تكلفة الإرجاع؟ كم يستغرق وصول الطرد إليك؟ من يتحمل تكلفة الرفض عند الباب؟ اسأل قبل التوقيع لا بعد أول مرتجع.</p>

      <h2>5. الدفع عند الاستلام والتحويل</h2>
      <p>إن كنت تعتمد الدفع عند الاستلام فاسأل: متى تُحوَّل المبالغ المحصّلة؟ أسبوعيًا أم شهريًا؟ التأخير هنا يضغط على سيولتك مباشرة.</p>

      <h2>لا تعتمد على شركة واحدة</h2>
      <p>فعّل شركتين على الأقل. حين تتعطل واحدة في موسم الذروة — وسيحدث — يبقى متجرك يعمل.</p>
    `,
    contentEn: `
      <p>The difference between two carriers might be a couple of riyals per parcel. One complaint and a reshipment costs many times that gap.</p>

      <h2>1. Real coverage, not advertised coverage</h2>
      <p>Every carrier claims national coverage. Ask specifically about the regions your orders actually come from, and delivery times for each — not the overall average.</p>

      <h2>2. First-attempt delivery rate</h2>
      <p>The most important number, and nobody publishes it. Ask directly. Every extra attempt means delay, a complaint, and a chance of refusal.</p>

      <h2>3. Tracking quality for the customer</h2>
      <p>A tracking link that works and updates reduces "where is my order?" messages more than anything else. A carrier without reliable tracking turns your support into an enquiry desk.</p>

      <h2>4. How returns are handled</h2>
      <p>What does a return cost? How long until the parcel reaches you? Who absorbs a refusal at the door? Ask before signing, not after the first return.</p>

      <h2>5. Cash on delivery and settlement</h2>
      <p>If you rely on COD, ask when collected amounts are transferred — weekly or monthly? A delay here squeezes your cash flow directly.</p>

      <h2>Do not depend on one carrier</h2>
      <p>Enable at least two. When one fails during peak season — and it will — your store keeps running.</p>
    `,
  },
  {
    id: "waybills-and-fulfilment",
    cluster: "shipping",
    titleAr: "بوالص الشحن والتجهيز: كيف تختصر ساعة يوميًا",
    titleEn: "Waybills and fulfilment: how to save an hour a day",
    excerptAr: "طباعة البوالص واحدة واحدة عادة تكلّف أكثر مما تظن حين يصل عدد الطلبات.",
    excerptEn: "Printing waybills one by one costs more than you think once order volume arrives.",
    date: "2026-07-21",
    readTime: 5,
    contentAr: `
      <p>عشرة طلبات يوميًا يمكن تجهيزها بأي طريقة. خمسون طلبًا تكشف أن طريقتك لا تتوسّع.</p>

      <h2>اطبع دفعة واحدة</h2>
      <p>حدّد كل الطلبات الجاهزة واطبع بوالصها معًا. الفارق بين الطباعة المجمّعة والفردية يظهر بوضوح بعد الطلب العشرين.</p>

      <h2>رتّب البوالص بترتيب التغليف</h2>
      <p>اطبع بترتيب مطابق لترتيب المنتجات على الرف. الموظف الذي يمشي في المستودع بترتيب عشوائي يضيّع أكثر مما يتخيل.</p>

      <h2>افحص قبل الإغلاق لا بعده</h2>
      <p>ضع قاعدة: البوليصة تُلصق بعد مطابقة محتوى الطرد بالطلب لا قبلها. أغلب أخطاء «منتج خاطئ» تحدث لأن البوليصة لُصقت أولًا.</p>

      <h2>وحّد نقطة التسليم</h2>
      <p>اتفق مع شركة الشحن على موعد استلام يومي ثابت. الاستلام العشوائي يعني طرودًا تنتظر يومًا إضافيًا بلا سبب.</p>

      <h2>سجّل ما يتأخر ولماذا</h2>
      <p>احتفظ بقائمة بسيطة: أي طلب تأخّر عن التسليم للشركة وما السبب. بعد أسبوعين ستظهر لك نقطة الاختناق الحقيقية — وغالبًا لن تكون شركة الشحن.</p>
    `,
    contentEn: `
      <p>Ten orders a day can be fulfilled any way at all. Fifty reveals that your method does not scale.</p>

      <h2>Print in batches</h2>
      <p>Select all ready orders and print their waybills together. The gap between batch and individual printing becomes obvious after the twentieth order.</p>

      <h2>Order waybills the way you pack</h2>
      <p>Print in the same order as products sit on the shelf. Staff walking the warehouse in random order waste more time than you would guess.</p>

      <h2>Check before sealing, not after</h2>
      <p>Make it a rule: the waybill goes on after the parcel contents are matched to the order, never before. Most "wrong item" errors happen because the label went on first.</p>

      <h2>Standardise handover</h2>
      <p>Agree a fixed daily pickup time with your carrier. Ad-hoc pickups mean parcels waiting an extra day for no reason.</p>

      <h2>Log what is late and why</h2>
      <p>Keep a simple list: which orders missed handover and why. After two weeks your real bottleneck will surface — and it usually is not the carrier.</p>
    `,
  },
  {
    id: "delivery-zones-and-rates",
    cluster: "shipping",
    titleAr: "مناطق التوصيل وأسعار الشحن: كيف تسعّر دون أن تخسر",
    titleEn: "Delivery zones and rates: pricing shipping without losing money",
    excerptAr: "سعر شحن موحّد للمملكة كلها يعني أنك تربح من مدينة وتخسر من أخرى.",
    excerptEn: "A single flat rate for the whole country means profiting in one city and losing in another.",
    date: "2026-07-20",
    readTime: 6,
    contentAr: `
      <p>السعر الموحّد بسيط للعميل ومريح لك — إلى أن ترى كم تكلّفك الطلبات البعيدة فعلًا.</p>

      <h2>ثلاثة نماذج للتسعير</h2>
      <ul>
        <li><strong>سعر موحّد:</strong> الأبسط، ويعمل إن كانت أغلب طلباتك من مناطق متقاربة التكلفة.</li>
        <li><strong>حسب المنطقة:</strong> أدق وأعدل، لكنه يتطلب ضبطًا ومتابعة.</li>
        <li><strong>حسب الوزن أو قيمة الطلب:</strong> مناسب حين تتفاوت أحجام منتجاتك كثيرًا.</li>
      </ul>

      <h2>ابدأ من بياناتك لا من التخمين</h2>
      <p>استخرج طلبات آخر شهرين وصنّفها حسب المدينة. سترى أن نسبة كبيرة تأتي من عدد محدود من المدن — سعّر على أساسها، وعامل الباقي كاستثناء.</p>

      <h2>الشحن المجاني: ضعه فوق متوسط سلتك</h2>
      <p>حد الشحن المجاني الفعّال يكون أعلى قليلًا من متوسط قيمة طلبك، بحيث يدفع العميل لإضافة صنف آخر. إن وضعته تحت المتوسط فأنت تتنازل عن تكلفة شحن كنت ستحصّلها.</p>

      <h2>أظهر التكلفة مبكرًا</h2>
      <p>ذكر تكلفة الشحن أو حده المجاني في صفحة المنتج يقلّل هجر السلة أكثر من أي رسالة استرجاع. المفاجأة في الخطوة الأخيرة أغلى من الشحن نفسه.</p>

      <h2>راجع الأسعار كل ربع سنة</h2>
      <p>تعرفة شركات الشحن تتغير. السعر الذي ضبطته قبل عام قد يكون اليوم أقل من تكلفتك الفعلية دون أن تلاحظ.</p>
    `,
    contentEn: `
      <p>A flat rate is simple for the customer and comfortable for you — until you see what distant orders actually cost.</p>

      <h2>Three pricing models</h2>
      <ul>
        <li><strong>Flat rate:</strong> simplest, and it works if most orders come from regions of similar cost.</li>
        <li><strong>By zone:</strong> more accurate and fairer, but needs setup and monitoring.</li>
        <li><strong>By weight or order value:</strong> suitable when your product sizes vary widely.</li>
      </ul>

      <h2>Start from your data, not a guess</h2>
      <p>Export the last two months of orders and group them by city. You will find a large share comes from a handful of cities — price for those, and treat the rest as exceptions.</p>

      <h2>Free shipping: set it above your average basket</h2>
      <p>An effective free-shipping threshold sits slightly above your average order value, so the customer adds one more item to reach it. Set it below the average and you are giving away shipping you would have collected.</p>

      <h2>Show the cost early</h2>
      <p>Stating shipping cost or the free threshold on the product page cuts abandonment more than any recovery email. The surprise at the last step costs more than the shipping itself.</p>

      <h2>Review rates quarterly</h2>
      <p>Carrier tariffs change. The rate you set a year ago may now be below your actual cost without you noticing.</p>
    `,
  },
  {
    id: "international-shipping-basics",
    cluster: "shipping",
    titleAr: "الشحن الدولي: ما يجب حسمه قبل أول طلب خارجي",
    titleEn: "International shipping: what to settle before the first overseas order",
    excerptAr: "الرسوم الجمركية والإرجاع الدولي مسألتان تُحسمان قبل البيع لا بعده.",
    excerptEn: "Customs duties and cross-border returns are settled before you sell, not after.",
    date: "2026-07-19",
    readTime: 6,
    contentAr: `
      <p>أول طلب من خارج المملكة يبدو إنجازًا. ثم تأتي أسئلة الجمارك والإرجاع، وتكتشف أنك لم تحسمها.</p>

      <h2>من يدفع الرسوم الجمركية؟</h2>
      <p>هذا أول ما يجب أن تحدده وتكتبه بوضوح. إن كانت على العميل فاذكر ذلك في صفحة الشحن وفي صفحة إتمام الطلب — العميل الذي يفاجأ برسوم عند الاستلام قد يرفض الطرد كليًا وتتحمل أنت تكلفة الرحلتين.</p>

      <h2>ابدأ بدول محدودة</h2>
      <p>لا تفتح الشحن للعالم. ابدأ بدول الخليج حيث القرب والتشابه التنظيمي، وتوسّع بعد أن تستقر العملية.</p>

      <h2>المنتجات الممنوعة تختلف من دولة لأخرى</h2>
      <p>بعض المنتجات — مواد سائلة، مستحضرات، بطاريات — لها قيود مختلفة. راجع قائمة الممنوعات لكل وجهة قبل تفعيلها لا بعد رفض أول شحنة.</p>

      <h2>الإرجاع الدولي مكلف</h2>
      <p>تكلفة إعادة طرد من خارج الحدود قد تتجاوز قيمة المنتج. ضع سياسة واضحة: هل تقبل الإرجاع الدولي؟ ومن يتحمل تكلفته؟ الغموض هنا ينتهي بنزاع.</p>

      <h2>العملة والسعر</h2>
      <p>اعرض السعر بعملة العميل إن استطعت، ووضّح أن التحصيل قد يتم بعملة أخرى وأن بنكه قد يطبّق فرق صرف. اذكرها في الأسئلة الشائعة بدل أن تصلك كشكوى.</p>
    `,
    contentEn: `
      <p>The first order from abroad feels like an achievement. Then the customs and returns questions arrive, and you realise you never settled them.</p>

      <h2>Who pays the customs duty?</h2>
      <p>The first thing to decide and state plainly. If it falls on the customer, say so on your shipping page and at checkout — a customer surprised by fees on delivery may refuse the parcel outright, leaving you with both legs of the journey.</p>

      <h2>Start with a limited set of countries</h2>
      <p>Do not open shipping to the world. Begin with the Gulf, where distance and regulation are closest, and expand once the process is stable.</p>

      <h2>Prohibited items differ by country</h2>
      <p>Some products — liquids, cosmetics, batteries — carry different restrictions. Check the prohibited list for each destination before enabling it, not after your first rejected shipment.</p>

      <h2>Cross-border returns are expensive</h2>
      <p>Returning a parcel from abroad can cost more than the product. Set a clear policy: do you accept international returns, and who pays? Ambiguity here ends in a dispute.</p>

      <h2>Currency and price</h2>
      <p>Show the price in the customer's currency where you can, and make clear that settlement may occur in another and that their bank may apply a conversion difference. Put it in the FAQ rather than receiving it as a complaint.</p>
    `,
  },
];
