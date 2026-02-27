/* ─────────────────────────────────────────────────────────
   Centralized service data — used by:
   - components/home/Services.tsx  (card grid)
   - app/[locale]/services/[slug]/page.tsx  (SEO pages)
   ───────────────────────────────────────────────────────── */

export type ServiceData = {
  id: string;
  slug: string;
  color: string;
  price: string;
  priceNote: string;
  priceNoteEn: string;
  badge: string | null;
  badgeEn: string | null;
  featured?: boolean;

  nameAr: string;
  nameEn: string;
  nameFr: string;

  descAr: string;
  descEn: string;
  descFr: string;

  longDescAr: string;
  longDescEn: string;

  featuresAr: string[];
  featuresEn: string[];

  keywordsAr: string[];
  keywordsEn: string[];

  processAr: { title: string; text: string }[];
  processEn: { title: string; text: string }[];

  faqAr: { q: string; a: string }[];
  faqEn: { q: string; a: string }[];
};

export const SERVICES_DATA: ServiceData[] = [
  {
    id: "salla-design",
    slug: "salla-design",
    color: "#BDEE63",
    price: "1,299",
    priceNote: "ريال",
    priceNoteEn: "SAR",
    badge: "الأكثر طلباً",
    badgeEn: "Most Requested",
    featured: true,

    nameAr: "تصميم متجر سلة احترافي",
    nameEn: "Professional Salla Store Design",
    nameFr: "Conception Boutique Salla Pro",

    descAr: "تصميم متجر سلة متكامل يعكس هويتك ويزيد مبيعاتك — ألوان، خطوط، صفحات، وتجربة مستخدم مثالية للجوال",
    descEn: "Complete Salla store design reflecting your brand — colors, fonts, pages & perfect mobile UX",
    descFr: "Conception complète Salla — couleurs, polices, pages et UX mobile parfaite",

    longDescAr: "نقدم تصميماً احترافياً لمتجر سلة يعكس هويتك التجارية بالكامل ويرفع معدلات تحويل الزوار إلى عملاء. فريقنا المتخصص يعمل على كل تفاصيل واجهة المتجر من ألوان وخطوط وتخطيطات صفحات وحتى تجربة المستخدم على الجوال التي تشكّل أكثر من 80% من المبيعات في المملكة العربية السعودية.",
    longDescEn: "We deliver professional Salla store design that fully reflects your brand identity and boosts visitor-to-customer conversion rates. Our specialized team works on every detail of the store interface — from colors and fonts to page layouts and mobile UX, which drives over 80% of sales in Saudi Arabia.",

    featuresAr: ["تصميم الصفحة الرئيسية والقوائم", "صفحات المنتجات الاحترافية", "ضبط الألوان والخطوط والشعار", "تهيئة كاملة للجوال", "مراجعتان مجانيتان", "ثيم مخصص حصري"],
    featuresEn: ["Homepage & navigation design", "Professional product pages", "Colors, fonts & logo setup", "Full mobile optimization", "Two free revisions", "Exclusive custom theme"],

    keywordsAr: ["تصميم متجر سلة", "تصميم متجر سلة احترافي", "ثيم سلة مخصص", "تصميم متجر الكتروني سعودي", "تصميم سلة بالسعودية"],
    keywordsEn: ["Salla store design", "professional Salla theme", "custom Salla store", "Saudi e-commerce design", "Salla design Saudi Arabia"],

    processAr: [
      { title: "استشارة مجانية", text: "نتعرف على علامتك التجارية وأهدافك وجمهورك المستهدف" },
      { title: "تصميم الواجهة", text: "نصمم الثيم كاملاً بالألوان والخطوط وتخطيط الصفحات" },
      { title: "مراجعة وتعديل", text: "مرجعتان مجانيتان حتى تكون راضياً 100%" },
      { title: "تسليم وتدريب", text: "نسلّم المتجر جاهزاً ونشرح لك كيف تديره" },
    ],
    processEn: [
      { title: "Free Consultation", text: "We learn about your brand, goals & target audience" },
      { title: "Interface Design", text: "We design the full theme with colors, fonts & page layouts" },
      { title: "Review & Revise", text: "Two free revisions until you're 100% satisfied" },
      { title: "Delivery & Training", text: "Store delivered ready-to-sell with admin training" },
    ],

    faqAr: [
      { q: "كم يستغرق تصميم متجر سلة؟", a: "عادةً 5-7 أيام عمل حسب تعقيد الطلب." },
      { q: "هل يشمل التصميم رفع المنتجات؟", a: "التصميم هو ثيم المتجر وواجهته، أما رفع المنتجات فهو خدمة منفصلة." },
      { q: "هل يعمل التصميم على الجوال؟", a: "نعم، الثيم متجاوب 100% ومحسّن خصيصاً للجوال." },
      { q: "ماذا يحدث بعد تسليم التصميم؟", a: "نقدم دعماً تقنياً لمدة 30 يوماً بعد التسليم مجاناً." },
    ],
    faqEn: [
      { q: "How long does a Salla store design take?", a: "Usually 5-7 business days depending on complexity." },
      { q: "Does design include product upload?", a: "The design covers the theme & interface. Product upload is a separate service." },
      { q: "Is the design mobile responsive?", a: "Yes, 100% responsive and specifically optimized for mobile." },
      { q: "What happens after delivery?", a: "We provide 30 days of free technical support after delivery." },
    ],
  },
  {
    id: "store-launch",
    slug: "store-launch",
    color: "#7C9EFF",
    price: "799",
    priceNote: "ريال",
    priceNoteEn: "SAR",
    badge: null,
    badgeEn: null,

    nameAr: "تأسيس متجر إلكتروني من الصفر",
    nameEn: "E-Commerce Store from Scratch",
    nameFr: "Boutique E-commerce de Zéro",

    descAr: "إنشاء متجرك على سلة أو زد بالكامل — من إنشاء الحساب حتى رفع المنتجات وربط الدفع والشحن",
    descEn: "Full store on Salla or Zid — account setup to products, payment & shipping",
    descFr: "Boutique complète sur Salla ou Zid — de la création au paiement & livraison",

    longDescAr: "نبني متجرك الإلكتروني على منصة سلة أو زد من الصفر حتى يكون جاهزاً للبيع — نتولى إنشاء الحساب وضبط الإعدادات ورفع المنتجات وربط بوابات الدفع وشركات الشحن وتدريبك على الإدارة اليومية.",
    longDescEn: "We build your online store on Salla or Zid from scratch until it's ready to sell — account creation, settings, product upload, payment gateway & shipping connections, and daily management training included.",

    featuresAr: ["إنشاء وإعداد الحساب", "رفع المنتجات والأسعار", "ربط بوابة الدفع", "إعداد طرق الشحن", "تدريب مجاني على الإدارة"],
    featuresEn: ["Account creation & setup", "Products & pricing upload", "Payment gateway connection", "Shipping methods setup", "Free admin training"],

    keywordsAr: ["إنشاء متجر سلة", "فتح متجر الكتروني سعودي", "تأسيس متجر زد", "إنشاء متجر إلكتروني بالسعودية"],
    keywordsEn: ["create Salla store", "open online store Saudi Arabia", "Salla store setup", "Zid store setup"],

    processAr: [
      { title: "إنشاء الحساب", text: "ننشئ حساب سلة أو زد ونضبط الإعدادات الأساسية" },
      { title: "رفع المحتوى", text: "نرفع منتجاتك مع الأسعار والأوصاف والصور" },
      { title: "ربط الخدمات", text: "نربط بوابة الدفع وشركات الشحن" },
      { title: "التدريب والتسليم", text: "ندرّبك على إدارة المتجر ونسلّمه جاهزاً" },
    ],
    processEn: [
      { title: "Account Creation", text: "Create Salla or Zid account & configure core settings" },
      { title: "Content Upload", text: "Upload your products with prices, descriptions & photos" },
      { title: "Connect Services", text: "Link payment gateway & shipping companies" },
      { title: "Training & Delivery", text: "Train you on store management & deliver ready-to-sell" },
    ],

    faqAr: [
      { q: "هل يشمل السعر ثيم المتجر؟", a: "يشمل إعداد المتجر بثيم جاهز من سلة. للثيم المخصص راجع خدمة التصميم." },
      { q: "كم عدد المنتجات التي يمكن رفعها؟", a: "يشمل رفع حتى 30 منتجاً. ما زاد فبرسوم إضافية بسيطة." },
      { q: "هل يمكن العمل على زد أو شوبيفاي؟", a: "نعم، نعمل على سلة وزد وشوبيفاي." },
    ],
    faqEn: [
      { q: "Does the price include a custom theme?", a: "Includes setup with a Salla ready-made theme. For custom theme, see our Design service." },
      { q: "How many products can be uploaded?", a: "Includes up to 30 products. Additional products for a small fee." },
      { q: "Can you work on Zid or Shopify?", a: "Yes, we work on Salla, Zid & Shopify." },
    ],
  },
  {
    id: "store-management",
    slug: "store-management",
    color: "#F5A623",
    price: "999",
    priceNote: "ريال/شهر",
    priceNoteEn: "SAR/mo",
    badge: null,
    badgeEn: null,

    nameAr: "إدارة وتشغيل المتجر الإلكتروني",
    nameEn: "Store Management & Operation",
    nameFr: "Gestion & Opération de Boutique",

    descAr: "ندير متجرك باحترافية — إضافة المنتجات، متابعة الطلبات، خدمة العملاء، وتقارير شهرية",
    descEn: "Professional store management — products, orders, customer service & monthly reports",
    descFr: "Gestion professionnelle — produits, commandes, service client & rapports",

    longDescAr: "مع خدمة إدارة المتجر، تتفرغ أنت للمنتج والمبيعات بينما يتولى فريقنا كل ما يتعلق بالمتجر — إضافة المنتجات، متابعة الطلبات يومياً، الرد على استفسارات العملاء، وتسليم تقارير أداء شهرية مفصلة.",
    longDescEn: "With our store management service, you focus on products & sales while our team handles everything — adding products, daily order tracking, customer inquiry replies, and detailed monthly performance reports.",

    featuresAr: ["إدارة وإضافة المنتجات", "متابعة الطلبات يومياً", "خدمة العملاء والردود", "تقرير شهري مفصل", "دعم طارئ 24/7"],
    featuresEn: ["Product management & adding", "Daily order tracking", "Customer service & replies", "Detailed monthly report", "24/7 emergency support"],

    keywordsAr: ["إدارة متجر سلة", "إدارة متجر إلكتروني", "تشغيل متجر سلة", "متابعة طلبات سلة"],
    keywordsEn: ["Salla store management", "e-commerce store management Saudi Arabia", "Salla order management", "online store operation"],

    processAr: [
      { title: "تحليل المتجر", text: "ندرس متجرك الحالي ونضع خطة عمل شهرية" },
      { title: "إدارة يومية", text: "نتابع الطلبات والمنتجات ونرد على العملاء كل يوم" },
      { title: "تحسين مستمر", text: "نقترح تحسينات دورية لزيادة المبيعات" },
      { title: "تقرير شهري", text: "تقرير مفصل بالأداء والإنجازات ونقاط التحسين" },
    ],
    processEn: [
      { title: "Store Analysis", text: "Study your store & set a monthly work plan" },
      { title: "Daily Management", text: "Track orders & products, reply to customers every day" },
      { title: "Continuous Improvement", text: "Regular suggestions to boost sales" },
      { title: "Monthly Report", text: "Detailed performance report with achievements & improvements" },
    ],

    faqAr: [
      { q: "هل يشمل الإعلانات الممولة؟", a: "لا، إدارة المتجر منفصلة عن الإعلانات. راجع خدمة التسويق الرقمي." },
      { q: "كيف أتابع ما يحدث في متجري؟", a: "نرسل لك تقريراً أسبوعياً ونكون متاحين للتواصل دائماً." },
      { q: "هل يمكن إلغاء الخدمة في أي وقت؟", a: "نعم، الاشتراك شهري بشهر مسبق." },
    ],
    faqEn: [
      { q: "Does it include paid ads?", a: "No, store management is separate from ads. See our Digital Marketing service." },
      { q: "How do I track what's happening in my store?", a: "We send weekly reports and are always available for communication." },
      { q: "Can I cancel anytime?", a: "Yes, subscription is monthly with one month advance notice." },
    ],
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    color: "#FF6B6B",
    price: "899",
    priceNote: "ريال/شهر",
    priceNoteEn: "SAR/mo",
    badge: null,
    badgeEn: null,

    nameAr: "تسويق رقمي وإعلانات ممولة",
    nameEn: "Digital Marketing & Paid Ads",
    nameFr: "Marketing Digital & Publicités",

    descAr: "حملات إعلانية محترفة على سناب شات، انستغرام، تيك توك، وجوجل — نستهدف جمهورك المثالي لأعلى عائد",
    descEn: "Pro ad campaigns on Snapchat, Instagram, TikTok & Google for maximum ROI",
    descFr: "Campagnes pro sur Snapchat, Instagram, TikTok & Google pour ROI maximum",

    longDescAr: "نُدير حملاتك الإعلانية على أبرز المنصات في المملكة العربية السعودية — سناب شات وانستغرام وتيك توك وجوجل — بأسلوب علمي مبني على البيانات لضمان أعلى عائد على الإنفاق الإعلاني وتوسيع قاعدة عملائك باستمرار.",
    longDescEn: "We manage your ad campaigns on Saudi Arabia's top platforms — Snapchat, Instagram, TikTok & Google — using a data-driven scientific approach to maximize ROAS and continuously grow your customer base.",

    featuresAr: ["إعلانات سناب شات وتيك توك", "إعلانات انستغرام وفيسبوك", "حملات جوجل ويوتيوب", "إنشاء المحتوى الإعلاني", "تقارير أداء أسبوعية"],
    featuresEn: ["Snapchat & TikTok ads", "Instagram & Facebook ads", "Google & YouTube campaigns", "Ad content creation", "Weekly performance reports"],

    keywordsAr: ["تسويق رقمي بالسعودية", "إعلانات سناب شات", "إعلانات انستغرام", "إدارة حملات إعلانية", "تسويق متجر سلة"],
    keywordsEn: ["digital marketing Saudi Arabia", "Snapchat ads agency", "Instagram ads Saudi Arabia", "paid ads management", "Salla store marketing"],

    processAr: [
      { title: "تحليل السوق", text: "ندرس جمهورك ومنافسيك وأفضل المنصات لنشاطك" },
      { title: "إنشاء المحتوى", text: "نصمم الإعلانات ونكتب النصوص الجذابة" },
      { title: "إطلاق الحملات", text: "نطلق الحملات ونتابع الأداء لحظة بلحظة" },
      { title: "تحسين وتقرير", text: "نحسّن الحملات أسبوعياً ونرسل تقارير مفصلة" },
    ],
    processEn: [
      { title: "Market Analysis", text: "Study your audience, competitors & best platforms for your business" },
      { title: "Content Creation", text: "Design ads & write compelling copy" },
      { title: "Campaign Launch", text: "Launch campaigns & monitor performance in real-time" },
      { title: "Optimize & Report", text: "Weekly optimization & detailed performance reports" },
    ],

    faqAr: [
      { q: "هل ميزانية الإعلانات مشمولة؟", a: "لا، ميزانية الإعلانات منفصلة ويقدّمها العميل. رسومنا هي لإدارة الحملات." },
      { q: "ما أقل ميزانية موصى بها للإعلانات؟", a: "نوصي بـ 1000-2000 ريال شهرياً كميزانية إعلانية لنتائج واضحة." },
      { q: "كم وقتاً تستغرق رؤية النتائج؟", a: "عادةً 2-4 أسابيع لتحسين الأداء وبدء ظهور نتائج واضحة." },
    ],
    faqEn: [
      { q: "Is ad budget included?", a: "No, ad budget is separate and provided by the client. Our fee is for campaign management." },
      { q: "What's the minimum recommended ad budget?", a: "We recommend 1,000-2,000 SAR/month ad budget for clear results." },
      { q: "How long until I see results?", a: "Usually 2-4 weeks to optimize performance and see clear results." },
    ],
  },
  {
    id: "branding",
    slug: "branding",
    color: "#E8A0BF",
    price: "799",
    priceNote: "ريال",
    priceNoteEn: "SAR",
    badge: null,
    badgeEn: null,

    nameAr: "هوية بصرية وتصميم جرافيك",
    nameEn: "Brand Identity & Graphic Design",
    nameFr: "Identité Visuelle & Graphisme",

    descAr: "لوجو احترافي، ألوان العلامة التجارية، تصاميم السوشيال ميديا، وموشن جرافيك لمتجرك",
    descEn: "Professional logo, brand colors, social media designs & motion graphics for your store",
    descFr: "Logo pro, couleurs de marque, designs réseaux sociaux & motion graphics",

    longDescAr: "الهوية البصرية هي ما تتذكره العين قبل الاسم. نبني لك هوية متكاملة تحكي قصة علامتك التجارية — لوجو احترافي متعدد الصيغ، دليل هوية بصرية، تصاميم السوشيال ميديا، وموشن جرافيك يجعل متجرك يبرز في السوق السعودي.",
    longDescEn: "Brand identity is what the eye remembers before the name. We build you a complete identity that tells your brand story — professional multi-format logo, brand identity guide, social media designs & motion graphics that make your store stand out in the Saudi market.",

    featuresAr: ["لوجو احترافي متعدد الصيغ", "دليل الهوية البصرية", "تصاميم السوشيال ميديا", "بانرات وإعلانات مصورة", "موشن جرافيك بسيط"],
    featuresEn: ["Multi-format professional logo", "Brand identity guide", "Social media designs", "Banners & image ads", "Simple motion graphics"],

    keywordsAr: ["تصميم هوية بصرية بالسعودية", "تصميم شعار احترافي", "هوية تجارية", "تصميم جرافيك", "شعار متجر سلة"],
    keywordsEn: ["brand identity design Saudi Arabia", "professional logo design", "brand identity Saudi", "graphic design agency", "Salla store logo"],

    processAr: [
      { title: "استطلاع العلامة", text: "نفهم قيمك وجمهورك وشخصية علامتك التجارية" },
      { title: "تصميم اللوجو", text: "نقدم 3 مقترحات ونطوّر المختار" },
      { title: "بناء الهوية", text: "دليل الهوية الكامل مع ألوان وخطوط واستخدامات" },
      { title: "المواد الإضافية", text: "تصاميم السوشيال والبانرات والموشن جرافيك" },
    ],
    processEn: [
      { title: "Brand Discovery", text: "Understand your values, audience & brand personality" },
      { title: "Logo Design", text: "Present 3 proposals & develop the chosen one" },
      { title: "Identity Build", text: "Full brand guide with colors, fonts & usage rules" },
      { title: "Extra Materials", text: "Social media designs, banners & motion graphics" },
    ],

    faqAr: [
      { q: "كم عدد مقترحات اللوجو؟", a: "نقدم 3 مقترحات مختلفة ثم نطور المختار مع مراجعتين." },
      { q: "هل الملفات مفتوحة المصدر؟", a: "نعم، تستلم ملفات AI وPSD وPNG وSVG كاملة." },
      { q: "هل يشمل تصاميم المنتجات؟", a: "يشمل القوالب، أما التصميم المتكرر للمنتجات فيحتاج خدمة المحتوى." },
    ],
    faqEn: [
      { q: "How many logo proposals?", a: "3 different proposals then we develop the chosen one with two revisions." },
      { q: "Are source files included?", a: "Yes, you receive full AI, PSD, PNG & SVG files." },
      { q: "Does it include product designs?", a: "Includes templates; recurring product designs require the content service." },
    ],
  },
  {
    id: "seo",
    slug: "seo",
    color: "#BDEE63",
    price: "699",
    priceNote: "ريال/شهر",
    priceNoteEn: "SAR/mo",
    badge: null,
    badgeEn: null,

    nameAr: "تحسين محركات البحث SEO",
    nameEn: "Search Engine Optimization",
    nameFr: "Optimisation Moteurs de Recherche",

    descAr: "تصدّر نتائج جوجل وسناب شات — تحسين كلماتك المفتاحية، بناء الروابط، وزيادة زوار متجرك",
    descEn: "Rank #1 on Google — keyword optimization, link building & traffic growth for your store",
    descFr: "Classez-vous #1 sur Google — mots-clés, liens et croissance du trafic",

    longDescAr: "نساعد متجرك على التصدر في نتائج البحث على جوجل ليصلك العملاء الباحثون عن منتجاتك مباشرةً. نستهدف الكلمات المفتاحية الأكثر تحويلاً في مجالك في السوق السعودي ونبني روابط ذات جودة عالية لرفع سلطة نطاقك.",
    longDescEn: "We help your store rank in Google search results so customers searching for your products find you directly. We target the highest-converting keywords in your niche in the Saudi market and build high-quality links to boost your domain authority.",

    featuresAr: ["تحليل الكلمات المفتاحية", "تحسين محتوى المتجر", "بناء الروابط الخارجية", "تحسين سرعة الصفحات", "تقرير SEO شهري"],
    featuresEn: ["Keyword research & analysis", "Store content optimization", "External link building", "Page speed optimization", "Monthly SEO report"],

    keywordsAr: ["SEO بالسعودية", "تحسين محركات البحث", "تصدر جوجل", "SEO متجر سلة", "زيادة زوار المتجر"],
    keywordsEn: ["SEO Saudi Arabia", "search engine optimization Salla", "Google ranking Saudi Arabia", "e-commerce SEO", "Salla SEO service"],

    processAr: [
      { title: "تدقيق تقني", text: "نحلل متجرك ونكشف نقاط الضعف التقنية والمحتوى" },
      { title: "بحث الكلمات", text: "نختار أفضل الكلمات المفتاحية بحجم بحث وتحويل عالي" },
      { title: "تحسين الصفحات", text: "نحسّن عناوين المنتجات والأوصاف والبنية الداخلية" },
      { title: "بناء الروابط", text: "نبني روابط خارجية من مواقع موثوقة لرفع السلطة" },
    ],
    processEn: [
      { title: "Technical Audit", text: "Analyze your store & uncover technical and content weaknesses" },
      { title: "Keyword Research", text: "Select best keywords with high search volume & conversion" },
      { title: "Page Optimization", text: "Improve product titles, descriptions & internal structure" },
      { title: "Link Building", text: "Build external links from trusted sites to boost authority" },
    ],

    faqAr: [
      { q: "كم وقتاً يستغرق ظهور نتائج SEO؟", a: "SEO استثمار متوسط الأمد، النتائج تبدأ بالظهور بعد 3-4 أشهر." },
      { q: "هل يشمل كتابة محتوى المدونة؟", a: "يشمل 2 مقال شهرياً. ما زاد فبرسوم إضافية." },
      { q: "هل تضمنون التصدر في جوجل؟", a: "لا أحد يضمن مرتبة معينة في جوجل، لكننا نضمن تطبيق أفضل الممارسات." },
    ],
    faqEn: [
      { q: "How long does SEO take to show results?", a: "SEO is a medium-term investment; results start appearing after 3-4 months." },
      { q: "Does it include blog content writing?", a: "Includes 2 articles/month. Additional articles at extra fee." },
      { q: "Do you guarantee Google ranking?", a: "No one can guarantee specific rankings, but we guarantee best practice implementation." },
    ],
  },
  {
    id: "integrations",
    slug: "integrations",
    color: "#7C9EFF",
    price: "299",
    priceNote: "ريال",
    priceNoteEn: "SAR",
    badge: "سريع",
    badgeEn: "Fast",

    nameAr: "ربط الخدمات والتكاملات",
    nameEn: "Integrations & Connections",
    nameFr: "Intégrations & Connexions",

    descAr: "ربط متجرك بكل الأدوات — تابي، تمارا، STC Pay، Google Analytics، وجوجل ميرشنت",
    descEn: "Connect your store to all tools — Tabby, Tamara, STC Pay, Google Analytics & Merchant",
    descFr: "Connectez à tous les outils — Tabby, Tamara, STC Pay, Google Analytics",

    longDescAr: "نربط متجرك بكل الخدمات الضرورية لرفع المبيعات وتحليل الأداء — تابي وتمارا للتقسيط، STC Pay وأبشر للدفع السعودي، Google Analytics وSearch Console للتتبع، وجوجل ميرشنت للإعلانات الذكية.",
    longDescEn: "We connect your store to all essential services for boosting sales and tracking performance — Tabby & Tamara for installments, STC Pay & Absher for Saudi payments, Google Analytics & Search Console for tracking, and Google Merchant for smart ads.",

    featuresAr: ["تابي وتمارا (BNPL)", "STC Pay وأبشر", "Google Analytics & Search Console", "جوجل ميرشنت والإعلانات", "ربط خدمات الشحن"],
    featuresEn: ["Tabby & Tamara (BNPL)", "STC Pay & Absher", "Google Analytics & Search Console", "Google Merchant & Ads", "Shipping services link"],

    keywordsAr: ["ربط تابي بسلة", "ربط تمارا بسلة", "ربط STC Pay سلة", "ربط جوجل ميرشنت سلة", "تكاملات متجر سلة"],
    keywordsEn: ["Tabby Salla integration", "Tamara Salla setup", "STC Pay Salla", "Google Analytics Salla", "Salla integrations"],

    processAr: [
      { title: "تحديد الخدمات", text: "نحدد الخدمات التي تحتاج ربطها بناءً على نشاطك" },
      { title: "الإعداد والربط", text: "نربط الخدمات ونتحقق من اشتغالها بشكل صحيح" },
      { title: "الاختبار", text: "نجري اختبارات شاملة للتأكد من سلامة كل الروابط" },
      { title: "التسليم", text: "نسلّمك التقرير الكامل بما تم ربطه ونشرح لك التفاصيل" },
    ],
    processEn: [
      { title: "Service Identification", text: "Identify which services to connect based on your business" },
      { title: "Setup & Link", text: "Connect services & verify they work correctly" },
      { title: "Testing", text: "Run comprehensive tests to ensure all connections are working" },
      { title: "Delivery", text: "Deliver full report of what was connected & explain details" },
    ],

    faqAr: [
      { q: "كم يستغرق الربط؟", a: "معظم التكاملات تنجز خلال 24-48 ساعة." },
      { q: "هل تابي وتمارا يحتاجان تسجيلاً مسبقاً؟", a: "نعم، تحتاج حساباً لديهم، يمكننا مساعدتك في التسجيل أيضاً." },
      { q: "هل يشمل التكاملات التقنية المخصصة؟", a: "للتكاملات المعقدة والمخصصة، تواصل معنا للحصول على عرض خاص." },
    ],
    faqEn: [
      { q: "How long do integrations take?", a: "Most integrations are completed within 24-48 hours." },
      { q: "Do Tabby & Tamara require prior registration?", a: "Yes, you need an account with them. We can help you register too." },
      { q: "Does it include custom technical integrations?", a: "For complex custom integrations, contact us for a special quote." },
    ],
  },
  {
    id: "govt",
    slug: "govt",
    color: "#F5A623",
    price: "249",
    priceNote: "ريال",
    priceNoteEn: "SAR",
    badge: null,
    badgeEn: null,

    nameAr: "الخدمات الحكومية والتجارية",
    nameEn: "Government & Business Services",
    nameFr: "Services Gouvernementaux",

    descAr: "استخراج السجل التجاري، وثيقة العمل الحر، فتح الحساب البنكي، والتسجيل في منصات الأعمال",
    descEn: "Commercial registration, freelance certificate, business bank account & platform registration",
    descFr: "Enregistrement commercial, certificat freelance & ouverture compte bancaire",

    longDescAr: "نساعدك في إنجاز كل الإجراءات الحكومية والتجارية اللازمة لتأسيس نشاطك في المملكة العربية السعودية — السجل التجاري، وثيقة العمل الحر، فتح الحساب البنكي التجاري، التسجيل في منصات معروف وأعمال، وتسجيل ضريبة القيمة المضافة.",
    longDescEn: "We help you complete all government and commercial procedures needed to establish your business in Saudi Arabia — commercial registration, freelance certificate, business bank account, Maroof & Aamal registration, and VAT registration.",

    featuresAr: ["إصدار السجل التجاري", "وثيقة عمل حر", "فتح حساب بنكي تجاري", "التسجيل في معروف وأعمال", "تسجيل ضريبة القيمة المضافة"],
    featuresEn: ["Commercial registration", "Freelance work certificate", "Business bank account", "Maroof & Aamal registration", "VAT registration"],

    keywordsAr: ["استخراج سجل تجاري", "وثيقة عمل حر بالسعودية", "تسجيل معروف", "فتح حساب تجاري بالسعودية", "خدمات حكومية رجال أعمال"],
    keywordsEn: ["Saudi commercial registration", "freelance certificate Saudi Arabia", "Maroof registration", "business bank account Saudi Arabia", "VAT registration Saudi Arabia"],

    processAr: [
      { title: "تحديد الاحتياجات", text: "نحدد الوثائق والخدمات الحكومية التي تحتاجها" },
      { title: "جمع المستندات", text: "نرشدك لكل المستندات المطلوبة" },
      { title: "تقديم الطلبات", text: "نتولى تقديم الطلبات بالنيابة عنك" },
      { title: "الاستلام", text: "نسلّمك الوثائق الرسمية كاملة" },
    ],
    processEn: [
      { title: "Identify Needs", text: "Determine the documents & government services you need" },
      { title: "Gather Documents", text: "Guide you on all required documents" },
      { title: "Submit Applications", text: "Handle application submissions on your behalf" },
      { title: "Delivery", text: "Deliver complete official documents to you" },
    ],

    faqAr: [
      { q: "هل تشمل الخدمة رسوم الجهات الحكومية؟", a: "لا، رسوم الجهات الحكومية منفصلة ويتحملها العميل مباشرةً." },
      { q: "كم يستغرق استخراج السجل التجاري؟", a: "عادةً 2-5 أيام عمل حسب نوع النشاط." },
      { q: "هل تقدمون خدمة التسجيل الضريبي VAT؟", a: "نعم، نساعدك في التسجيل في منظومة ضريبة القيمة المضافة." },
    ],
    faqEn: [
      { q: "Do service fees include government charges?", a: "No, government fees are separate and paid directly by the client." },
      { q: "How long does commercial registration take?", a: "Usually 2-5 business days depending on business type." },
      { q: "Do you offer VAT registration?", a: "Yes, we help you register in the VAT system." },
    ],
  },
  {
    id: "content",
    slug: "content",
    color: "#E8A0BF",
    price: "1,199",
    priceNote: "ريال/شهر",
    priceNoteEn: "SAR/mo",
    badge: null,
    badgeEn: null,

    nameAr: "إنتاج المحتوى الرقمي",
    nameEn: "Digital Content Production",
    nameFr: "Production de Contenu Digital",

    descAr: "محتوى سوشيال ميديا بالذكاء الاصطناعي — تصاميم يومية، ريلز، قصص، وكتابة محتوى إبداعي",
    descEn: "AI-powered social media content — daily designs, reels, stories & creative copywriting",
    descFr: "Contenu IA pour réseaux sociaux — designs, reels, stories & rédaction créative",

    longDescAr: "ننتج لك محتوى سوشيال ميديا احترافياً يومياً بمساعدة أحدث أدوات الذكاء الاصطناعي — تصاميم جذابة لانستغرام وسناب وتيك توك، ريلز مونتاج احترافي، كتابة كابشن إبداعية، وجداول نشر منظمة لضمان تواجدك المستمر على المنصات.",
    longDescEn: "We produce professional daily social media content using the latest AI tools — attractive designs for Instagram, Snap & TikTok, professionally edited reels, creative caption writing, and organized posting schedules for consistent platform presence.",

    featuresAr: ["30 تصميم سوشيال ميديا شهرياً", "كتابة كابشن وهاشتاقات", "ريلز وقصص انستغرام", "جدولة وتنظيم النشر", "تصوير منتجات إبداعي"],
    featuresEn: ["30 social media designs/month", "Caption & hashtag writing", "Instagram reels & stories", "Content scheduling", "Creative product photography"],

    keywordsAr: ["إنتاج محتوى سوشيال ميديا", "إدارة سوشيال ميديا بالسعودية", "تصميم منشورات انستغرام", "محتوى تيك توك", "كتابة محتوى تسويقي"],
    keywordsEn: ["social media content production Saudi Arabia", "social media management Saudi Arabia", "Instagram post design", "TikTok content Saudi Arabia", "marketing content writing"],

    processAr: [
      { title: "استراتيجية المحتوى", text: "نضع خطة محتوى شهرية متوافقة مع هويتك وجمهورك" },
      { title: "إنتاج التصاميم", text: "تصاميم يومية وريلز وقصص بأعلى جودة" },
      { title: "الجدولة والنشر", text: "ننشر في أفضل الأوقات لأعلى تفاعل" },
      { title: "التحليل والتطوير", text: "نحلل الأداء شهرياً ونطور الاستراتيجية" },
    ],
    processEn: [
      { title: "Content Strategy", text: "Build monthly content plan aligned with your brand & audience" },
      { title: "Design Production", text: "Daily designs, reels & stories at the highest quality" },
      { title: "Scheduling & Posting", text: "Post at optimal times for maximum engagement" },
      { title: "Analysis & Development", text: "Monthly performance analysis & strategy refinement" },
    ],

    faqAr: [
      { q: "هل يشمل التصوير الفوتوغرافي للمنتجات؟", a: "يشمل إنتاج محتوى رقمي، أما التصوير الميداني فيحتاج اتفاق منفصل." },
      { q: "من يوافق على المحتوى قبل النشر؟", a: "نرسل لك كل المحتوى للموافقة قبل النشر." },
      { q: "هل يشمل الإعلانات الممولة؟", a: "لا، المحتوى العضوي منفصل عن الإعلانات المدفوعة." },
    ],
    faqEn: [
      { q: "Does it include product photography?", a: "Includes digital content production; on-site photography requires a separate agreement." },
      { q: "Who approves content before posting?", a: "We send you all content for approval before publishing." },
      { q: "Does it include paid ads?", a: "No, organic content is separate from paid advertising." },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}

export function getAllSlugs(): string[] {
  return SERVICES_DATA.map((s) => s.slug);
}
