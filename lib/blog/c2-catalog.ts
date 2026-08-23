import type { Article } from "./types";

export const CATALOG: Article[] = [
  {
    id: "product-fields-merchants-skip",
    cluster: "catalog",
    titleAr: "حقول المنتج التي يتخطاها الجميع — ولماذا تكلّفك",
    titleEn: "The product fields everyone skips — and what they cost you",
    excerptAr: "رقم المنتج العالمي ورمز المصنّع والوزن ليست حقولًا اختيارية. هي ما يحدد ظهورك وتكلفة شحنك.",
    excerptEn: "GTIN, MPN and weight are not optional fields. They decide your visibility and your shipping cost.",
    date: "2026-08-11",
    readTime: 6,
    contentAr: `
      <p>عند رفع منتج، معظم التجّار يملؤون الاسم والسعر والصورة ثم يضغطون حفظ. الحقول المتبقية ليست تفاصيل إدارية — لكل منها أثر مباشر.</p>

      <h2>GTIN و MPN</h2>
      <p>الرقم العالمي للمنتج ورمز المصنّع يستخدمهما محرك بحث جوجل لربط منتجك بنفس المنتج في متاجر أخرى ولعرضه في نتائج التسوق. المنتج بدونهما يظهر كمنتج مجهول ويخسر فرص ظهور لا تكلّفك شيئًا.</p>

      <h2>الوزن والأبعاد</h2>
      <p>شركات الشحن تحسب بالوزن الحجمي لا بالوزن الفعلي فقط. منتج خفيف في صندوق كبير يُحاسب على حجمه. إن تركت الحقل فارغًا فأنت تسلّم تقدير التكلفة لمتغيّر لا تتحكم فيه — وغالبًا في غير صالحك.</p>

      <h2>الكمية وحد التنبيه</h2>
      <p>ضبط حد التنبيه للمخزون المنخفض يوفّر عليك أسوأ سيناريو: عميل يشتري منتجًا نفد فعليًا. إلغاء الطلب بعد الدفع يكلّفك العميل ومراجعة سلبية.</p>

      <h2>الماركة والتصنيف</h2>
      <p>التصنيف الصحيح ليس ترتيبًا داخليًا فقط، بل هو ما يبني صفحات التصنيف التي ستجلب لك زيارات بحث. منتج بلا تصنيف منطقي هو منتج لا يصل إليه أحد إلا برابط مباشر.</p>

      <h2>قاعدة عملية</h2>
      <p>خصّص عشرين دقيقة لملء الحقول كاملة عند أول رفع. إعادة تحرير مئة منتج لاحقًا تكلّف أضعاف ذلك.</p>
    `,
    contentEn: `
      <p>When uploading a product, most merchants fill in name, price and image, then hit save. The remaining fields are not administrative detail — each has a direct effect.</p>

      <h2>GTIN and MPN</h2>
      <p>The global product number and manufacturer part number are what Google uses to match your product with the same product elsewhere and to show it in shopping results. Without them your product looks unidentified and loses free visibility.</p>

      <h2>Weight and dimensions</h2>
      <p>Carriers charge on volumetric weight, not just actual weight. A light product in a large box is billed on its volume. Leave the field empty and you hand cost estimation to a variable you do not control — usually not in your favour.</p>

      <h2>Quantity and low-stock alerts</h2>
      <p>Setting a low-stock threshold saves you the worst case: a customer buying something that is actually out of stock. Cancelling after payment costs you the customer and a negative review.</p>

      <h2>Brand and category</h2>
      <p>Correct categorisation is not only internal tidiness — it builds the category pages that bring you search traffic. An uncategorised product is one nobody reaches except by direct link.</p>

      <h2>A practical rule</h2>
      <p>Spend twenty minutes filling the fields properly at first upload. Re-editing a hundred products later costs many times that.</p>
    `,
  },
  {
    id: "product-options-variants",
    cluster: "catalog",
    titleAr: "خيارات المنتج والمتغيّرات: متى تفصل المنتج ومتى تدمجه",
    titleEn: "Product options and variants: when to split, when to merge",
    excerptAr: "قرار بسيط في الظاهر يقرّر شكل كتالوجك ومخزونك وصفحات بحثك.",
    excerptEn: "A deceptively simple decision that shapes your catalogue, your stock and your search pages.",
    date: "2026-08-10",
    readTime: 6,
    contentAr: `
      <p>قميص بأربعة ألوان وأربعة مقاسات: هل هو منتج واحد بستة عشر متغيّرًا، أم أربعة منتجات منفصلة؟ الإجابة تغيّر أشياء كثيرة.</p>

      <h2>ادمجها في منتج واحد حين…</h2>
      <ul>
        <li>الاختلاف في مقاس أو لون لنفس القطعة.</li>
        <li>السعر متقارب أو متطابق.</li>
        <li>العميل يقارن بين الخيارات وهو ينوي شراء واحد منها.</li>
      </ul>
      <p>الدمج يجعل التقييمات تتجمع في صفحة واحدة بدل تشتّتها، وهذا وحده يرفع الثقة.</p>

      <h2>افصلها حين…</h2>
      <ul>
        <li>لكل خيار جمهور بحث مختلف — مثل «عطر رجالي» و«عطر نسائي».</li>
        <li>فرق السعر كبير بحيث يربك العرض.</li>
        <li>تريد صفحة مستقلة تستهدف كلمة بحث مستقلة.</li>
      </ul>

      <h2>المخزون هو الفيصل التشغيلي</h2>
      <p>كل متغيّر له مخزونه المستقل. إن كنت لا تستطيع تتبّع الكمية لكل لون ومقاس على حدة، فالمتغيّرات ستعطيك أرقامًا غير صحيحة ومبيعات لمنتجات نفدت.</p>

      <h2>خطأ يتكرر</h2>
      <p>إنشاء متغيّرات لخيارات لا تؤثر في المخزون ولا السعر — مثل «هل تريد تغليف هدية؟». هذه حقل مخصص لا متغيّر، وجعلها متغيّرًا يضاعف صفوف مخزونك بلا سبب.</p>
    `,
    contentEn: `
      <p>A shirt in four colours and four sizes: is that one product with sixteen variants, or four separate products? The answer changes a lot.</p>

      <h2>Merge into one product when…</h2>
      <ul>
        <li>The difference is size or colour of the same item.</li>
        <li>Prices are close or identical.</li>
        <li>The customer compares options intending to buy one of them.</li>
      </ul>
      <p>Merging pools reviews on one page instead of scattering them, and that alone lifts trust.</p>

      <h2>Split when…</h2>
      <ul>
        <li>Each option has a different search audience — "men's perfume" versus "women's perfume".</li>
        <li>The price gap is wide enough to confuse the listing.</li>
        <li>You want a standalone page targeting a standalone search term.</li>
      </ul>

      <h2>Inventory is the operational deciding factor</h2>
      <p>Every variant carries its own stock. If you cannot track quantity per colour and size separately, variants will hand you wrong numbers and sales of items that ran out.</p>

      <h2>A recurring mistake</h2>
      <p>Creating variants for options that affect neither stock nor price — "would you like gift wrapping?". That is a custom field, not a variant, and making it one multiplies your inventory rows for no reason.</p>
    `,
  },
  {
    id: "size-charts-reduce-returns",
    cluster: "catalog",
    titleAr: "دليل المقاسات: أرخص طريقة لخفض الإرجاع",
    titleEn: "Size charts: the cheapest way to cut returns",
    excerptAr: "الإرجاع بسبب المقاس هو أكثر أنواع الإرجاع كلفة — وأسهلها منعًا.",
    excerptEn: "Size-related returns are the most expensive kind, and the easiest to prevent.",
    date: "2026-08-09",
    readTime: 5,
    contentAr: `
      <p>كل قطعة مرتجعة تكلّفك شحنًا مضاعفًا وفحصًا وإعادة تغليف — وأحيانًا القطعة نفسها. وفي الأزياء، أغلب الإرجاع سببه المقاس.</p>

      <h2>لماذا لا يكفي «S / M / L»؟</h2>
      <p>لا يوجد معيار موحّد بين الموردين. مقاس M عند مورّد قد يعادل L عند آخر. العميل الذي لا يجد أرقامًا فعلية يخمّن، والتخمين يعني إرجاعًا.</p>

      <h2>ما الذي يجب أن يحتويه دليل المقاسات</h2>
      <ul>
        <li>قياسات بالسنتيمتر لا بالحروف فقط: الصدر، الخصر، الطول، الكتف.</li>
        <li>طريقة القياس — العميل لا يعرف من أين يقيس الصدر.</li>
        <li>مقاس القطعة التي يرتديها العارض في الصور.</li>
        <li>ملاحظة عن الخامة: هل تتمدد؟ هل تنكمش بعد الغسيل؟</li>
      </ul>

      <h2>ضعه حيث يُتخذ القرار</h2>
      <p>رابط دليل المقاسات يجب أن يكون بجانب اختيار المقاس مباشرة، لا في صفحة منفصلة في الفوتر. العميل لن يبحث عنه.</p>

      <h2>قِس الأثر</h2>
      <p>سجّل نسبة الإرجاع قبل إضافة الدليل وبعده بشهر. إن لم تنخفض فالمشكلة في المنتج أو الصور لا في المقاسات، وهذه معلومة تستحق المعرفة أيضًا.</p>
    `,
    contentEn: `
      <p>Every returned item costs you shipping twice, inspection and repackaging — sometimes the item itself. In apparel, most returns come down to size.</p>

      <h2>Why "S / M / L" is not enough</h2>
      <p>There is no shared standard between suppliers. An M from one may equal an L from another. A customer who cannot find real numbers guesses, and guessing means returns.</p>

      <h2>What a size chart must contain</h2>
      <ul>
        <li>Measurements in centimetres, not just letters: chest, waist, length, shoulder.</li>
        <li>How to measure — customers do not know where the chest is measured from.</li>
        <li>The size worn by the model in the photos.</li>
        <li>A note on the fabric: does it stretch? does it shrink after washing?</li>
      </ul>

      <h2>Put it where the decision happens</h2>
      <p>The size chart link belongs beside the size selector, not on a separate page in the footer. Customers will not go looking for it.</p>

      <h2>Measure the effect</h2>
      <p>Record your return rate before adding the chart and a month after. If it does not fall, the problem is the product or the photography rather than sizing — also worth knowing.</p>
    `,
  },
  {
    id: "custom-product-fields",
    cluster: "catalog",
    titleAr: "الحقول المخصصة: كيف تبيع منتجًا يحتاج بيانات من العميل",
    titleEn: "Custom fields: selling a product that needs input from the customer",
    excerptAr: "نقش الاسم، تاريخ المناسبة، مقاس الخاتم — بيانات لو جمعتها بعد الطلب خسرت وقتًا وعميلًا.",
    excerptEn: "Engraving, event date, ring size — data you lose time and customers by collecting after the order.",
    date: "2026-08-08",
    readTime: 5,
    contentAr: `
      <p>بعض المنتجات لا تكتمل إلا ببيانات من العميل. المتاجر التي تجمعها بعد الطلب عبر واتساب تخسر يومًا في كل طلب، وأحيانًا تخسر الطلب.</p>

      <h2>متى تحتاج حقلًا مخصصًا؟</h2>
      <ul>
        <li>منتج قابل للتخصيص: نقش اسم، لون خيط، رسالة إهداء.</li>
        <li>منتج مرتبط بموعد: تاريخ المناسبة، وقت التسليم المفضّل.</li>
        <li>منتج يحتاج قياسًا لا يوجد ضمن الخيارات الجاهزة.</li>
        <li>منتج يتطلب ملفًا من العميل: تصميم، صورة، شعار.</li>
      </ul>

      <h2>اجعل الحقل واضحًا لا مبهمًا</h2>
      <p>«اكتب النص المطلوب نقشه (حتى 12 حرفًا، عربي أو إنجليزي)» أفضل بكثير من «ملاحظات». الحقل الغامض يعطيك إجابات غامضة تحتاج متابعة.</p>

      <h2>حدّد الإلزامي والاختياري بدقة</h2>
      <p>كل حقل إلزامي إضافي يزيد احتمال هجر السلة. اجعل الإلزامي هو ما لا يمكن تنفيذ الطلب بدونه فقط، واترك الباقي اختياريًا.</p>

      <h2>اذكر أثر التخصيص على الاسترجاع</h2>
      <p>المنتج المخصص عادة غير قابل للإرجاع. اكتب ذلك بجانب الحقل نفسه لا في صفحة السياسات وحدها، حتى يكون العميل على علم قبل الدفع لا بعده.</p>
    `,
    contentEn: `
      <p>Some products are not complete without input from the customer. Stores that collect it after the order over WhatsApp lose a day per order, and sometimes lose the order.</p>

      <h2>When do you need a custom field?</h2>
      <ul>
        <li>A customisable product: engraved name, thread colour, gift message.</li>
        <li>A date-bound product: event date, preferred delivery time.</li>
        <li>A product needing a measurement that is not in the standard options.</li>
        <li>A product requiring a file from the customer: artwork, photo, logo.</li>
      </ul>

      <h2>Make the field specific, not vague</h2>
      <p>"Text to engrave (up to 12 characters, Arabic or English)" beats "Notes" by a wide margin. A vague field returns vague answers that need follow-up.</p>

      <h2>Be precise about required versus optional</h2>
      <p>Every extra required field raises the chance of cart abandonment. Make required only what the order genuinely cannot be fulfilled without.</p>

      <h2>State the effect on returns</h2>
      <p>Customised products are usually non-returnable. Write that beside the field itself, not only on the policy page, so the customer knows before paying rather than after.</p>
    `,
  },
  {
    id: "multi-warehouse-inventory",
    cluster: "catalog",
    titleAr: "المخزون متعدد المستودعات: متى تحتاجه وكيف تضبطه",
    titleEn: "Multi-warehouse inventory: when you need it and how to set it up",
    excerptAr: "فرعان ومستودع يعني ثلاثة أرقام لكل منتج. بدون ضبط صحيح ستبيع ما لا تملك.",
    excerptEn: "Two branches and a warehouse means three numbers per product. Without proper setup you will sell what you do not have.",
    date: "2026-08-07",
    readTime: 6,
    contentAr: `
      <p>ما دام لديك مستودع واحد فالمخزون رقم واحد بسيط. لحظة إضافة فرع ثانٍ يتحول إلى مسألة تشغيلية كاملة.</p>

      <h2>العلامات التي تقول إنك تحتاجه</h2>
      <ul>
        <li>تبيع من محل وأونلاين في الوقت نفسه.</li>
        <li>لديك أكثر من نقطة تخزين في مدن مختلفة.</li>
        <li>تشحن من أقرب نقطة للعميل لتقليل التكلفة والمدة.</li>
        <li>يحدث لديك بيع لمنتج نفد لأن الرقم غير موحّد.</li>
      </ul>

      <h2>القرار الأهم: من أين يُخصم الطلب؟</h2>
      <p>حدد قاعدة واحدة واضحة — الأقرب للعميل، أو الأكثر مخزونًا، أو مستودع رئيسي دائمًا. القاعدة غير المحسومة تعني أن كل موظف يقرر بطريقته، وينتهي الشهر بجرد لا يطابق النظام.</p>

      <h2>الجرد الدوري ليس اختياريًا</h2>
      <p>الفرق بين المخزون النظامي والفعلي يتراكم بهدوء: تلف، عينات، مرتجعات لم تُسجَّل. جرد شهري لأكثر عشرين منتجًا حركةً يكفي لاكتشاف الانحراف مبكرًا.</p>

      <h2>الشحن يتبع المستودع</h2>
      <p>إن كان لكل مستودع مناطق توصيل وأسعار مختلفة فاضبطها معه، وإلا ستحاسب العميل على شحن من مدينة والمنتج يخرج من أخرى.</p>

      <h2>ابدأ بسيطًا</h2>
      <p>لا تفعّل مستودعات متعددة لأن المنصة تدعمها. فعّلها حين يكون لديك فعلًا أكثر من نقطة تخزين تعمل بانتظام.</p>
    `,
    contentEn: `
      <p>With one warehouse, stock is a single simple number. The moment you add a second location it becomes a full operational question.</p>

      <h2>Signs you need it</h2>
      <ul>
        <li>You sell from a physical shop and online at the same time.</li>
        <li>You hold stock in more than one city.</li>
        <li>You ship from the nearest point to cut cost and time.</li>
        <li>You are already selling out-of-stock items because the number is not unified.</li>
      </ul>

      <h2>The key decision: which location does an order deduct from?</h2>
      <p>Set one clear rule — nearest to the customer, highest stock, or always a main warehouse. An unsettled rule means every staff member decides differently, and the month ends with a count that does not match the system.</p>

      <h2>Periodic stocktaking is not optional</h2>
      <p>The gap between system stock and real stock accumulates quietly: damage, samples, unrecorded returns. A monthly count of your twenty fastest-moving products is enough to catch drift early.</p>

      <h2>Shipping follows the warehouse</h2>
      <p>If each location has different zones and rates, configure them together — otherwise you charge shipping from one city while the product leaves from another.</p>

      <h2>Start simple</h2>
      <p>Do not enable multi-warehouse because the platform supports it. Enable it when you genuinely operate more than one stocking point.</p>
    `,
  },
  {
    id: "import-export-products",
    cluster: "catalog",
    titleAr: "استيراد وتصدير المنتجات: رفع مئة منتج دون أخطاء",
    titleEn: "Importing and exporting products: uploading a hundred without errors",
    excerptAr: "ملف واحد يوفّر أيامًا — أو يفسد كتالوجك كاملًا. الفرق في التحضير.",
    excerptEn: "One file saves days — or corrupts your whole catalogue. The difference is preparation.",
    date: "2026-08-06",
    readTime: 6,
    contentAr: `
      <p>الرفع اليدوي لمئة منتج يستهلك أيامًا. الاستيراد عبر ملف ينهيه في ساعة — بشرط أن يكون الملف صحيحًا.</p>

      <h2>ابدأ من ملف التصدير لا من الصفر</h2>
      <p>أنشئ منتجًا واحدًا يدويًا بكل حقوله، ثم صدّر الكتالوج. الملف الناتج يعطيك أسماء الأعمدة الصحيحة بالضبط. البناء على قالب المنصة نفسها يجنّبك أغلب أخطاء الاستيراد.</p>

      <h2>الأخطاء التي تفسد الملف</h2>
      <ul>
        <li>تغيير أسماء الأعمدة أو ترتيبها.</li>
        <li>حفظ الملف بترميز لا يدعم العربية، فتظهر النصوص كرموز.</li>
        <li>خلط الفاصلة العشرية في الأسعار.</li>
        <li>روابط صور غير عامة، أو صور لم تُرفع بعد.</li>
        <li>تكرار نفس رمز المنتج SKU لمنتجين مختلفين.</li>
      </ul>

      <h2>جرّب على عشرة قبل المئة</h2>
      <p>استورد عشرة صفوف أولًا وافحص النتيجة: هل النصوص العربية سليمة؟ هل الأسعار صحيحة؟ هل الصور ظهرت؟ ثم استورد الباقي.</p>

      <h2>صدّر نسخة احتياطية قبل أي تعديل جماعي</h2>
      <p>قبل أي استيراد يعدّل منتجات قائمة، صدّر الكتالوج واحفظ الملف. التراجع عن استيراد خاطئ بدون نسخة سابقة يعني إعادة العمل من الصفر.</p>

      <h2>الأوصاف تبقى مهمة</h2>
      <p>الاستيراد يجعل الرفع سريعًا، لكنه يغري بنسخ أوصاف المورّد كما هي. خصّص وقتًا بعد الاستيراد لإعادة كتابة أوصاف أهم عشرين منتجًا على الأقل.</p>
    `,
    contentEn: `
      <p>Uploading a hundred products by hand takes days. A file import finishes it in an hour — provided the file is correct.</p>

      <h2>Start from an export, not from scratch</h2>
      <p>Create one product manually with every field filled, then export the catalogue. The resulting file gives you the exact column names. Building on the platform's own template avoids most import errors.</p>

      <h2>Mistakes that corrupt the file</h2>
      <ul>
        <li>Renaming or reordering the columns.</li>
        <li>Saving in an encoding that does not support Arabic, turning text into symbols.</li>
        <li>Mixing up the decimal separator in prices.</li>
        <li>Image URLs that are not public, or images not yet uploaded.</li>
        <li>Reusing the same SKU for two different products.</li>
      </ul>

      <h2>Test with ten before doing a hundred</h2>
      <p>Import ten rows first and inspect: is the Arabic intact? are prices right? did images appear? Then import the rest.</p>

      <h2>Export a backup before any bulk edit</h2>
      <p>Before any import that modifies existing products, export the catalogue and keep the file. Undoing a bad import without a prior copy means redoing the work.</p>

      <h2>Descriptions still matter</h2>
      <p>Importing makes upload fast, but it tempts you to paste supplier descriptions verbatim. Set aside time afterwards to rewrite at least your top twenty.</p>
    `,
  },
  {
    id: "digital-products-and-bookings",
    cluster: "catalog",
    titleAr: "المنتجات الرقمية والحجوزات والبطاقات: ما يختلف في الإعداد",
    titleEn: "Digital products, bookings and cards: what changes in setup",
    excerptAr: "لا شحن ولا مخزون تقليدي — لكن قواعد التسليم والاسترجاع تحتاج ضبطًا مختلفًا تمامًا.",
    excerptEn: "No shipping, no conventional stock — but delivery and refund rules need an entirely different setup.",
    date: "2026-08-05",
    readTime: 6,
    contentAr: `
      <p>بيع ملف أو جلسة أو بطاقة رقمية أبسط لوجستيًا وأعقد نظاميًا. الفروق تظهر في ثلاث نقاط.</p>

      <h2>التسليم فوري وغير قابل للتراجع</h2>
      <p>بمجرد اكتمال الدفع يصل الملف أو الرمز. هذا يعني أن سياسة الاسترجاع التقليدية لا تنطبق — اكتب بوضوح أن المنتج الرقمي غير قابل للاسترجاع بعد التحميل، واعرض ذلك في صفحة المنتج نفسها.</p>

      <h2>احمِ ما تبيعه</h2>
      <p>حدّد عدد مرات التحميل ومدة صلاحية الرابط. الملف بلا حدود سينتشر خارج من دفع ثمنه. وبالنسبة للبطاقات الرقمية، كل رمز يُباع مرة واحدة ويُستهلك من قائمة الرموز.</p>

      <h2>الحجوزات تحتاج تقويمًا لا مخزونًا</h2>
      <p>المنتج الحجزي يبيع وقتًا لا قطعة. اضبط المدة والفترات المتاحة والحد الأقصى للحجوزات المتزامنة، وحدّد بوضوح سياسة التأجيل والإلغاء — هذه أكثر نقطة نزاع في الحجوزات.</p>

      <h2>الضريبة تنطبق أيضًا</h2>
      <p>كون المنتج رقميًا لا يعفيه من ضريبة القيمة المضافة ولا من الفوترة الإلكترونية. اضبط الضريبة على هذه المنتجات كما تضبطها على غيرها.</p>

      <h2>وصف المنتج الرقمي يحتاج تفصيلًا أكثر</h2>
      <p>لا توجد صورة تُظهر ما سيحصل عليه العميل. اذكر الصيغة وعدد الصفحات أو المدة والبرنامج المطلوب لفتحه، وأضف معاينة إن أمكن.</p>
    `,
    contentEn: `
      <p>Selling a file, a session or a digital card is simpler logistically and more complex from a compliance angle. The differences show in three places.</p>

      <h2>Delivery is instant and irreversible</h2>
      <p>Once payment clears, the file or code is delivered. Conventional return policy does not apply — state plainly that digital products are non-refundable after download, and show that on the product page itself.</p>

      <h2>Protect what you sell</h2>
      <p>Set a download limit and a link expiry. An unlimited file spreads beyond whoever paid for it. For digital cards, each code sells once and is consumed from the code list.</p>

      <h2>Bookings need a calendar, not stock</h2>
      <p>A booking sells time, not a unit. Configure duration, available slots and maximum concurrent bookings, and state your reschedule and cancellation policy clearly — the most common point of dispute.</p>

      <h2>Tax still applies</h2>
      <p>Being digital does not exempt a product from VAT or e-invoicing. Configure tax on these products as you would on any other.</p>

      <h2>Digital descriptions need more detail</h2>
      <p>There is no photo showing what the customer receives. State the format, page count or duration, and what software is needed to open it — and add a preview if you can.</p>
    `,
  },
];
