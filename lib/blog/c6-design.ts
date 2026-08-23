import type { Article } from "./types";

export const DESIGN: Article[] = [
  {
    id: "ready-theme-vs-custom",
    cluster: "design",
    titleAr: "ثيم جاهز أم مخصص؟ سؤال يُطرح في غير وقته غالبًا",
    titleEn: "Ready-made theme or custom? A question usually asked too early",
    excerptAr: "الثيم الجاهز ليس عيبًا. لكن هناك لحظة يصبح فيها تكلفة لا توفيرًا.",
    excerptEn: "A ready-made theme is not a flaw. But there is a point where it becomes a cost, not a saving.",
    date: "2026-07-18",
    readTime: 6,
    contentAr: `
      <p>كثير من التجّار يسألون عن الثيم المخصص في اليوم الأول، وكثير منهم يستفيد أكثر من تأجيل السؤال.</p>

      <h2>متى يكفي الثيم الجاهز؟</h2>
      <ul>
        <li>لم تتحقق من أن المنتج يُباع أصلًا.</li>
        <li>كتالوجك صغير وبنيته بسيطة.</li>
        <li>ميزانيتك يجب أن تذهب للمنتج والتسويق أولًا.</li>
      </ul>
      <p>في هذه الحالات ثيم جاهز مضبوط الألوان والخطوط والصور يعطيك متجرًا محترمًا. الأهم أن تضبطه لا أن تتركه بإعداداته الافتراضية.</p>

      <h2>متى يصبح المخصص ضرورة؟</h2>
      <ul>
        <li>لديك مبيعات ثابتة وتريد رفع معدل التحويل بنسبة تُترجم إلى مبلغ حقيقي.</li>
        <li>منتجك يحتاج عرضًا لا يدعمه القالب: مقارنة، تخصيص، باقات.</li>
        <li>هويتك البصرية جزء من قيمة العلامة ولا يمكن أن تبدو كمتجر آخر.</li>
        <li>تصارع القالب في كل تعديل — عندها كلفة الترقيع تجاوزت كلفة البناء.</li>
      </ul>

      <h2>الخيار الثالث الذي يُهمل</h2>
      <p>تخصيص عميق لثيم جاهز: تعديل الصفحة الرئيسية وصفحة المنتج والسلة بأكواد نظيفة دون بناء ثيم كامل. يعطي أغلب الفائدة بجزء من التكلفة، ويناسب أغلب المتاجر المتوسطة.</p>

      <h2>احذر التخصيص الذي ينكسر</h2>
      <p>أي تعديل يجب أن يبقى صامدًا بعد تحديثات المنصة. التخصيص الذي ينهار مع كل تحديث ليس توفيرًا بل التزام صيانة دائم.</p>
    `,
    contentEn: `
      <p>Many merchants ask about a custom theme on day one, and many of them would benefit from deferring the question.</p>

      <h2>When a ready-made theme is enough</h2>
      <ul>
        <li>You have not yet proven the product sells.</li>
        <li>Your catalogue is small and simply structured.</li>
        <li>Your budget should go to product and marketing first.</li>
      </ul>
      <p>In those cases a ready theme with properly set colours, fonts and imagery gives you a respectable store. What matters is configuring it rather than leaving the defaults.</p>

      <h2>When custom becomes necessary</h2>
      <ul>
        <li>You have steady sales and want a conversion lift that translates into real money.</li>
        <li>Your product needs a presentation the template does not support: comparison, configuration, bundles.</li>
        <li>Your identity is part of the brand's value and cannot look like another store.</li>
        <li>You fight the template on every change — the patching cost has passed the build cost.</li>
      </ul>

      <h2>The neglected third option</h2>
      <p>Deep customisation of a ready theme: reworking the homepage, product page and cart with clean code without building a full theme. It delivers most of the benefit at a fraction of the cost and suits most mid-sized stores.</p>

      <h2>Beware customisation that breaks</h2>
      <p>Any change must survive platform updates. Customisation that collapses with every update is not a saving but a permanent maintenance commitment.</p>
    `,
  },
  {
    id: "homepage-elements-that-sell",
    cluster: "design",
    titleAr: "الصفحة الرئيسية للمتجر: ما يستحق مكانه وما يجب حذفه",
    titleEn: "Your store homepage: what earns its place and what to delete",
    excerptAr: "الصفحة الرئيسية ليست معرضًا. هي طريق أقصر إلى المنتج الصحيح.",
    excerptEn: "A homepage is not a gallery. It is a shorter route to the right product.",
    date: "2026-07-17",
    readTime: 6,
    contentAr: `
      <p>معظم الصفحات الرئيسية مزدحمة لأن كل قسم بدا فكرة جيدة وقت إضافته. النتيجة صفحة طويلة يمرّ عليها الزائر دون أن يصل لمنتج.</p>

      <h2>الترتيب الذي يعمل</h2>
      <ol>
        <li><strong>بنر واحد واضح:</strong> يقول ماذا تبيع ولمن، لا شعارًا عامًا.</li>
        <li><strong>التصنيفات الرئيسية:</strong> أسرع طريق لمن يعرف ما يريد.</li>
        <li><strong>الأكثر مبيعًا:</strong> دليل اجتماعي واختصار قرار في آنٍ واحد.</li>
        <li><strong>عناصر الثقة:</strong> الشحن، الاسترجاع، وسائل الدفع.</li>
        <li><strong>الجديد أو الموسمي:</strong> إن كان لديك تجديد فعلي.</li>
      </ol>

      <h2>ما يجب حذفه</h2>
      <ul>
        <li>سلايدر بخمس صور — الزائر يرى الأولى فقط غالبًا.</li>
        <li>نص «مرحبًا بكم في متجرنا» الذي لا يضيف معلومة.</li>
        <li>أقسام منتجات متطابقة المحتوى بعناوين مختلفة.</li>
        <li>حركات وتأثيرات تؤخر ظهور المحتوى.</li>
      </ul>

      <h2>اختبر على الجوال أولًا</h2>
      <p>افتح الصفحة على جوالك وعُدّ كم مرة تحتاج التمرير للوصول لأول منتج. إن تجاوزت مرتين فالبنر أطول مما يجب.</p>

      <h2>قاعدة الحكم على أي قسم</h2>
      <p>اسأل: هل يقرّب هذا القسم الزائر من منتج؟ إن لم يفعل، احذفه. المساحة الفارغة أفضل من قسم بلا وظيفة.</p>
    `,
    contentEn: `
      <p>Most homepages are crowded because every section seemed like a good idea when it was added. The result is a long page a visitor scrolls past without reaching a product.</p>

      <h2>The order that works</h2>
      <ol>
        <li><strong>One clear banner:</strong> saying what you sell and for whom, not a generic slogan.</li>
        <li><strong>Main categories:</strong> the fastest route for someone who knows what they want.</li>
        <li><strong>Best sellers:</strong> social proof and a decision shortcut at once.</li>
        <li><strong>Trust elements:</strong> shipping, returns, payment methods.</li>
        <li><strong>New or seasonal:</strong> if you genuinely have something new.</li>
      </ol>

      <h2>What to delete</h2>
      <ul>
        <li>A slider with five slides — visitors usually see only the first.</li>
        <li>"Welcome to our store" text that adds no information.</li>
        <li>Product sections with identical contents under different headings.</li>
        <li>Motion and effects that delay content appearing.</li>
      </ul>

      <h2>Test on mobile first</h2>
      <p>Open the page on your phone and count how many scrolls it takes to reach the first product. More than two means your banner is taller than it should be.</p>

      <h2>How to judge any section</h2>
      <p>Ask: does this move the visitor closer to a product? If not, delete it. Empty space beats a section with no job.</p>
    `,
  },
  {
    id: "anatomy-of-product-page",
    cluster: "design",
    titleAr: "تشريح صفحة منتج تبيع: ما يجب أن يراه العميل دون تمرير",
    titleEn: "Anatomy of a product page that sells: what must be visible without scrolling",
    excerptAr: "قرار الشراء يُتخذ غالبًا في أول شاشة. ما يوجد فيها يقرّر البقية.",
    excerptEn: "The buying decision usually happens on the first screen. What sits there decides the rest.",
    date: "2026-07-16",
    readTime: 7,
    contentAr: `
      <p>صفحة المنتج هي الصفحة الوحيدة التي تُغلق البيع. كل ما عداها يمهّد لها.</p>

      <h2>ما يجب أن يظهر قبل التمرير</h2>
      <ul>
        <li>صورة واضحة كبيرة للمنتج على خلفية نظيفة.</li>
        <li>اسم المنتج بصيغة يفهمها العميل لا برمز داخلي.</li>
        <li>السعر — وتحته خيار التقسيط إن كان مفعّلًا.</li>
        <li>اختيار المقاس أو اللون مع رابط دليل المقاسات بجانبه.</li>
        <li>زر إضافة للسلة واضح ومميز لونيًا.</li>
        <li>سطر واحد عن الشحن: المدة والتكلفة أو حد المجانية.</li>
      </ul>

      <h2>ما يأتي بعده مباشرة</h2>
      <p>وصف قصير يجيب «لماذا هذا المنتج بالذات؟» قبل المواصفات التقنية. العميل يحتاج سببًا قبل أن يحتاج تفصيلًا.</p>

      <h2>عناصر الثقة قرب زر الشراء</h2>
      <p>سياسة الاسترجاع، وسائل الدفع، وطريقة التواصل — ضعها قرب الزر لا في الفوتر. القلق يظهر عند لحظة الضغط، وهناك يجب أن تكون الإجابة.</p>

      <h2>الصور: العدد والزاوية</h2>
      <p>أربع صور على الأقل: المنتج كاملًا، تفصيلة قريبة، المنتج مستخدمًا أو مرتديًا، ومقارنة حجم بشيء مألوف. المقاس المتوهَّم خطأً سبب رئيسي للإرجاع.</p>

      <h2>ما يشتّت ويجب تأخيره</h2>
      <p>المنتجات المشابهة ونوافذ الخصم المنبثقة قبل أن يقرر العميل. أجّلها إلى ما بعد الإضافة للسلة — قبل ذلك هي دعوة للمغادرة.</p>
    `,
    contentEn: `
      <p>The product page is the only page that closes the sale. Everything else prepares for it.</p>

      <h2>What must appear before scrolling</h2>
      <ul>
        <li>A large, clear product image on a clean background.</li>
        <li>The product name in language the customer uses, not an internal code.</li>
        <li>The price — with the instalment option beneath it if enabled.</li>
        <li>Size or colour selection with the size-chart link beside it.</li>
        <li>A clear, colour-distinct add-to-cart button.</li>
        <li>One line on shipping: timing and cost, or the free threshold.</li>
      </ul>

      <h2>What comes immediately after</h2>
      <p>A short description answering "why this product specifically?" before the technical specifications. Customers need a reason before they need detail.</p>

      <h2>Trust elements near the buy button</h2>
      <p>Return policy, payment methods and how to reach you — beside the button, not in the footer. Anxiety appears at the moment of clicking, and that is where the answer belongs.</p>

      <h2>Images: how many and from where</h2>
      <p>At least four: the whole product, a close detail, the product in use or worn, and a scale comparison against something familiar. Misjudged size is a leading cause of returns.</p>

      <h2>What distracts and should wait</h2>
      <p>Related products and discount pop-ups before the customer has decided. Defer them until after add-to-cart — before that they are an invitation to leave.</p>
    `,
  },
  {
    id: "landing-pages-for-campaigns",
    cluster: "design",
    titleAr: "صفحات الهبوط للحملات: متى تحتاجها بدل صفحة المنتج",
    titleEn: "Landing pages for campaigns: when you need one instead of a product page",
    excerptAr: "إرسال إعلان مدفوع إلى الصفحة الرئيسية أسرع طريقة لحرق الميزانية.",
    excerptEn: "Sending paid traffic to your homepage is the fastest way to burn a budget.",
    date: "2026-07-15",
    readTime: 6,
    contentAr: `
      <p>الزائر القادم من إعلان جاء بسبب وعد محدد. إن لم تجد الصفحة التي يفتحها ذلك الوعد فورًا، سيغادر — وأنت دفعت ثمن نقرته.</p>

      <h2>متى تكفي صفحة المنتج؟</h2>
      <p>إن كان الإعلان عن منتج واحد بعرض مباشر، فصفحة المنتج غالبًا كافية وأسرع. لا تصنع صفحة هبوط لأنها تبدو احترافية.</p>

      <h2>متى تحتاج صفحة هبوط؟</h2>
      <ul>
        <li>حملة على مجموعة منتجات لا منتج واحد.</li>
        <li>عرض موسمي بشروط تحتاج شرحًا.</li>
        <li>منتج جديد يحتاج إقناعًا قبل السعر.</li>
        <li>جمهور لا يعرف علامتك ويحتاج سياقًا أولًا.</li>
      </ul>

      <h2>عناصر صفحة الهبوط الجيدة</h2>
      <ol>
        <li>عنوان يكرّر وعد الإعلان بنفس الكلمات — التطابق يطمئن الزائر أنه في المكان الصحيح.</li>
        <li>سبب واحد واضح للشراء الآن.</li>
        <li>المنتجات المعروضة مع أسعارها مباشرة.</li>
        <li>إجابة على أكثر اعتراضين تكرارًا.</li>
        <li>زر واحد متكرر — لا خيارات متنافسة.</li>
      </ol>

      <h2>احذف التنقل</h2>
      <p>صفحة الهبوط لا تحتاج قائمة كاملة تأخذ الزائر بعيدًا. اترك الشعار ورابط العودة فقط.</p>

      <h2>اقس النتيجة لا الانطباع</h2>
      <p>قارن معدل التحويل من صفحة الهبوط بمعدل التحويل من صفحة المنتج لنفس الحملة. إن لم تتفوق، فالمشكلة في الصفحة لا في الحملة.</p>
    `,
    contentEn: `
      <p>A visitor arriving from an ad came for a specific promise. If the page they open does not deliver that promise immediately, they leave — and you paid for the click.</p>

      <h2>When a product page is enough</h2>
      <p>If the ad promotes one product with a direct offer, the product page is usually sufficient and faster. Do not build a landing page because it looks professional.</p>

      <h2>When you need a landing page</h2>
      <ul>
        <li>A campaign for a group of products rather than one.</li>
        <li>A seasonal offer with conditions that need explaining.</li>
        <li>A new product needing persuasion before price.</li>
        <li>An audience unfamiliar with your brand that needs context first.</li>
      </ul>

      <h2>What a good landing page contains</h2>
      <ol>
        <li>A headline repeating the ad's promise in the same words — the match reassures the visitor they are in the right place.</li>
        <li>One clear reason to buy now.</li>
        <li>The featured products with prices, immediately.</li>
        <li>An answer to the two most common objections.</li>
        <li>One repeated button — no competing choices.</li>
      </ol>

      <h2>Remove the navigation</h2>
      <p>A landing page does not need a full menu leading the visitor away. Keep the logo and a way back, nothing more.</p>

      <h2>Measure the result, not the impression</h2>
      <p>Compare the landing page's conversion rate against the product page's for the same campaign. If it does not win, the page is the problem, not the campaign.</p>
    `,
  },
  {
    id: "brand-identity-for-stores",
    cluster: "design",
    titleAr: "الهوية البصرية للمتجر: أبعد من الشعار بكثير",
    titleEn: "Brand identity for a store: far more than a logo",
    excerptAr: "الشعار أصغر جزء. ما يصنع الانطباع هو التكرار المنضبط عبر كل نقطة تماس.",
    excerptEn: "The logo is the smallest part. Impression comes from disciplined repetition across every touchpoint.",
    date: "2026-07-14",
    readTime: 6,
    contentAr: `
      <p>يظن كثير من التجّار أن الهوية شعار وألوان. عمليًا، الهوية هي أن يبدو كل شيء وكأنه صادر عن جهة واحدة.</p>

      <h2>مكوّنات الهوية التي تؤثر فعلًا</h2>
      <ul>
        <li><strong>لوحة ألوان محدودة:</strong> لونان أساسيان ولون تمييز. أكثر من ذلك يفقد الاتساق.</li>
        <li><strong>خط عربي واحد بأوزانه:</strong> لا ثلاثة خطوط في صفحة واحدة.</li>
        <li><strong>أسلوب تصوير موحّد:</strong> نفس الخلفية والإضاءة والزاوية عبر الكتالوج كله.</li>
        <li><strong>نبرة كتابة ثابتة:</strong> إما أن تخاطب العميل بصيغة الاحترام أو بصيغة قريبة — لا الاثنتين.</li>
      </ul>

      <h2>الاختبار العملي</h2>
      <p>ضع صورة منتج من متجرك بجانب صورة من متجر منافس دون شعار. إن لم يستطع أحد التمييز، فليس لديك هوية بل قالب.</p>

      <h2>الخطوط العربية تحديدًا</h2>
      <p>اختر خطًا يحتفظ بوضوحه في الأحجام الصغيرة على الجوال. الخطوط الزخرفية جميلة في الشعار وقاسية على فقرة وصف منتج.</p>

      <h2>الهوية تظهر في التفاصيل غير المرئية</h2>
      <p>رسالة تأكيد الطلب، تغليف الطرد، رد خدمة العملاء، فاتورتك. هذه نقاط تماس يتذكرها العميل أكثر مما يتذكر صفحتك الرئيسية.</p>

      <h2>وثّقها في ملف واحد</h2>
      <p>دليل بسيط بالألوان بأكوادها والخطوط وأمثلة الاستخدام. بدونه ستنحرف الهوية خلال ثلاثة أشهر مع أول مصمم جديد.</p>
    `,
    contentEn: `
      <p>Many merchants think identity means a logo and colours. In practice, identity is everything looking like it came from one place.</p>

      <h2>The parts that actually matter</h2>
      <ul>
        <li><strong>A limited palette:</strong> two primaries and one accent. More than that loses coherence.</li>
        <li><strong>One Arabic typeface with its weights:</strong> not three typefaces on one page.</li>
        <li><strong>A consistent photography style:</strong> same background, lighting and angle across the catalogue.</li>
        <li><strong>A steady tone of voice:</strong> either formal or close — not both.</li>
      </ul>

      <h2>The practical test</h2>
      <p>Put one of your product photos beside a competitor's with the logos removed. If nobody can tell them apart, you have a template, not an identity.</p>

      <h2>Arabic type specifically</h2>
      <p>Choose a face that stays legible at small sizes on a phone. Decorative faces are beautiful in a logo and punishing in a product description.</p>

      <h2>Identity shows in the invisible details</h2>
      <p>The order confirmation message, the packaging, the support reply, your invoice. These touchpoints are remembered more than your homepage.</p>

      <h2>Document it in one file</h2>
      <p>A simple guide with colour codes, typefaces and usage examples. Without it the identity drifts within three months of the next designer arriving.</p>
    `,
  },
  {
    id: "product-photography-that-converts",
    cluster: "design",
    titleAr: "صور المنتجات: أرخص استثمار يرفع التحويل",
    titleEn: "Product photography: the cheapest investment that lifts conversion",
    excerptAr: "لا يستطيع العميل لمس المنتج. الصور هي كل ما لديه ليقرر.",
    excerptEn: "The customer cannot touch the product. Photos are all they have to decide with.",
    date: "2026-07-13",
    readTime: 6,
    contentAr: `
      <p>المتجر الذي يعرض صورة واحدة باهتة يطلب من العميل أن يخاطر بماله. الصور الجيدة تزيل هذه المخاطرة.</p>

      <h2>الحد الأدنى لكل منتج</h2>
      <ul>
        <li>صورة كاملة على خلفية بيضاء أو محايدة.</li>
        <li>تفصيلة قريبة تُظهر الخامة والتشطيب.</li>
        <li>المنتج في سياق الاستخدام أو مرتديًا.</li>
        <li>إشارة للحجم بمقارنة مع شيء مألوف.</li>
      </ul>

      <h2>وحّد قبل أن تُجمّل</h2>
      <p>كتالوج بصور متسقة الحجم والخلفية والإضاءة يبدو احترافيًا حتى لو كانت الصور بسيطة. كتالوج بصور جميلة لكن مختلفة يبدو مشوشًا. الاتساق قبل الجودة.</p>

      <h2>الجوال هو مقياسك</h2>
      <p>افحص كل صورة على شاشة جوال لا على شاشة مكتب. التفاصيل التي تظهر واضحة على 27 بوصة تختفي على ستة.</p>

      <h2>لا تخدع بالألوان</h2>
      <p>الصورة المعالجة بألوان أزهى من الواقع ترفع المبيعات أسبوعًا وترفع الإرجاع شهرًا. اضبط توازن اللون الأبيض ليطابق المنتج الحقيقي.</p>

      <h2>اضغط الصور قبل الرفع</h2>
      <p>الصور الثقيلة أكثر سبب لبطء المتاجر. صدّر بمقاس مناسب للعرض لا بالمقاس الأصلي من الكاميرا، والفرق في سرعة الصفحة يكون ملموسًا فورًا.</p>

      <h2>النص البديل ليس اختياريًا</h2>
      <p>اكتب وصفًا قصيرًا لكل صورة. يخدم من يستخدم قارئ شاشة، ويعطي محركات البحث سياقًا إضافيًا عن المنتج.</p>
    `,
    contentEn: `
      <p>A store showing one dull photo is asking the customer to gamble with their money. Good photography removes that gamble.</p>

      <h2>The minimum per product</h2>
      <ul>
        <li>A full shot on a white or neutral background.</li>
        <li>A close detail showing material and finish.</li>
        <li>The product in use or worn.</li>
        <li>A scale reference against something familiar.</li>
      </ul>

      <h2>Standardise before you beautify</h2>
      <p>A catalogue with consistent size, background and lighting looks professional even when the shots are simple. A catalogue of beautiful but mismatched photos looks chaotic. Consistency before quality.</p>

      <h2>Mobile is your benchmark</h2>
      <p>Check every image on a phone screen, not a desktop. Detail that reads clearly at 27 inches disappears at six.</p>

      <h2>Do not deceive with colour</h2>
      <p>An image processed brighter than reality lifts sales for a week and lifts returns for a month. Set white balance to match the real product.</p>

      <h2>Compress before uploading</h2>
      <p>Heavy images are the leading cause of slow stores. Export at display size rather than straight from the camera; the speed difference is immediate.</p>

      <h2>Alt text is not optional</h2>
      <p>Write a short description for every image. It serves screen-reader users and gives search engines extra context about the product.</p>
    `,
  },
];
