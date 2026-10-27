(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  var ICONS = {
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    list: '<path d="M4 7h16M4 12h10M4 17h13"/>',
    megaphone: '<path d="M4 10v4h3l7 4V6L7 10H4z"/><path d="M18 9a4 4 0 0 1 0 6"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="M8 15l4-4 3 3 5-6"/>',
    award: '<circle cx="12" cy="9" r="5"/><path d="M9 13l-2 8 5-3 5 3-2-8"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    chat: '<path d="M4 5h16v11H8l-4 4z"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
    box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    video: '<rect x="3" y="5" width="13" height="14" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'
  };

  // One entry per home block declared in twilight.json.
  var BLOCKS = [
    { id: 'hero-slider', cat: 'hero', icon: 'image', ar: 'السلايدر الرئيسي', en: 'Hero Slider',
      sum: 'صور أو فيديوهات رئيسية بعناوين وأزرار، حتى 8 شرائح.',
      groups: [
        ['المظهر', ['نمط التصميم: تحريري، سينمائي، منقسم، حملة', 'ارتفاع السلايدر: ملء الشاشة، كبير، متوسط، أو ارتفاع مخصص من 480 إلى 1080 بكسل']],
        ['الحركة', ['تبديل الشرائح تلقائيًا بسرعة هادئة (8 ث) أو متوسطة (6 ث) أو سريعة (4 ث)', 'الانتقال: تلاشي ناعم، انزلاق، تكبير هادئ', 'أدوات التنقل: نقاط وشريط تقدم، نقاط، أسهم، كلاهما، أو بدون']],
        ['كل شريحة', ['العنوان والوصف والأزرار', 'صورة للكمبيوتر وصورة للجوال، أو فيديو مباشر', 'نقطة التركيز وقوة التعتيم', 'عرض أو كوبون مع تاريخ انتهاء وعدّاد تنازلي']]
      ],
      tip: 'مع التشغيل التلقائي يبقى زر الإيقاف ظاهرًا دائمًا، حتى مع اختيار «بدون» أدوات تنقل.' },
    { id: 'hero-panels', cat: 'hero', icon: 'grid', ar: 'البنرات المقسمة', en: 'Hero Panels',
      sum: 'بانر واحد أو اثنان أو ثلاثة جنبًا إلى جنب.',
      groups: [
        ['التخطيط', ['عدد البنرات: 1، 2، 3', 'الارتفاع: عادي أو طويل', 'موضع النص: أسفل، المنتصف، أعلى', 'تعتيم الصور لوضوح النص: بدون، خفيف، متوسط، قوي']],
        ['كل بانر', ['صورة الكمبيوتر وصورة الجوال', 'عنوان صغير، العنوان، وصف قصير', 'نص الزر ورابطه']]
      ] },
    { id: 'marquee', cat: 'hero', icon: 'list', ar: 'الشريط المتحرك', en: 'Marquee Strip',
      sum: 'شعارات أو نصوص أو أيقونات أو عروض في شريط يتحرك بلا انقطاع.',
      groups: [
        ['المحتوى', ['نوع الشريط: شعارات داخل كروت، نصوص، أيقونة ونص، شريط عروض', 'حتى 16 عنصرًا: أيقونة من سلة أو صورة، نص، رابط']],
        ['الحركة', ['السرعة: بطيء، متوسط، سريع', 'الاتجاه: تلقائي حسب اللغة أو عكسه', 'إيقاف الحركة عند مرور الماوس أو اللمس']],
        ['المظهر', ['مستقيم أو مائل', 'داخل كروت أو بدونها', 'حدود الشريط، ودمجه مع القسم السابق', 'خلفية شريط العروض: لون الهوية، داكن، لون مخصص']]
      ],
      tip: 'اعرض المنصات التي تعمل عليها كقدرات (سلة، زد…) وليس كشراكات، ما لم تكن شريكًا رسميًا.' },
    { id: 'spotlight', cat: 'content', icon: 'layers', ar: 'البطاقات المميزة', en: 'Spotlight Cards',
      sum: 'خدمات أو مشاريع أو عروض داخل بطاقات أنيقة.',
      groups: [
        ['الإعدادات', ['تصميم البطاقات: متساوية، بطاقة رئيسية مميزة، شبكة عروض', 'عدد الأعمدة: 2، 3، 4', 'نسبة الصورة: عريضة، مربعة، طولية', 'إظهار الأزرار']],
        ['كل بطاقة', ['الصورة، عنوان صغير، العنوان، الوصف', 'نص الزر ورابطه: منتج خدمة، مقال، أو ملف PDF']]
      ] },
    { id: 'smart-cta', cat: 'contact', icon: 'megaphone', ar: 'العنوان الترويجي', en: 'Smart CTA',
      sum: 'عنوان قوي ووصف وزر يدفع العميل لخطوة واحدة.',
      groups: [
        ['النص', ['حجم العنوان من صغير إلى ضخم، وسماكته، وأقصى عرض له', 'التفاف أسطر متوازن لتجنّب كلمة وحيدة في آخر سطر', 'لون تلقائي من الهوية أو مخصص']],
        ['الزر', ['ممتلئ أو بإطار، الحجم، الاستدارة، العرض، تأثير المرور، أيقونة', 'الوجهة: منتج، تصنيف، ماركة، صفحة، واتساب، هاتف، بريد، قسم في الصفحة…', 'عند عدم وجود وجهة: إخفاء الزر أو إظهاره كنص']],
        ['القسم', ['المحاذاة، الخلفية، العرض الكامل أو داخل الحاوية، المسافات، الحدود', 'أحجام مستقلة للجوال']]
      ] },
    { id: 'feature-showcase', cat: 'content', icon: 'grid', ar: 'معرض المميزات والشرح', en: 'Smart Feature Showcase',
      sum: 'بطاقات بصور تشرح خدماتك أو مزاياك، شبكة على الكمبيوتر وسلايدر على الجوال.',
      groups: [
        ['العرض', ['تلقائي أو شبكة أو سلايدر', 'الأعمدة للكمبيوتر والتابلت والجوال كلٌّ على حدة', 'تساوي ارتفاع البطاقات ومحاذاة الأزرار', 'السلايدر: أسهم، نقاط، جزء من البطاقة التالية، تشغيل تلقائي']],
        ['البطاقة', ['نسبة الصورة من 1:1 إلى 16:9، واستدارتها', 'شكل البطاقة: بسيط، داخل صندوق، بإطار', 'الصورة فوق النص أو تحته', 'أقصى عدد أسطر للوصف', 'حركة المرور: ارتفاع، تكبير، بدون']]
      ] },
    { id: 'media-content', cat: 'content', icon: 'image', ar: 'المحتوى مع صورة أو فيديو', en: 'Media & Content',
      sum: 'نص وأزرار بجانب صورة أو فيديو أو YouTube أو Vimeo.',
      groups: [
        ['الوسائط', ['صورة (وصورة للجوال)، ملف فيديو MP4/WebM، YouTube، Vimeo، أو بدون', 'النسبة، الملاءمة، موضع التركيز، العرض داخل العمود', 'حاوية بلون وهامش، استدارة، ظل', 'الفيديو: تشغيل تلقائي، كتم، تكرار، أدوات تحكم، زر تشغيل كبير، إيقاف خارج الشاشة، غلاف بدل الفيديو على الجوال']],
        ['التخطيط', ['اتجاه تلقائي حسب اللغة أو الصورة يمين/يسار', 'نسبة الأعمدة 50/50 أو 60/40 أو 40/60 أو مخصصة', 'خلفية بلون أو تدرج']],
        ['الأزرار', ['زر أساسي وزر ثانوي، لكل منهما وجهة مستقلة']],
        ['الجوال', ['الصورة أولًا أو النص أولًا', 'إخفاء الشارة أو الوسائط، تقليل المسافات، خلفية مختلفة', 'إظهار القسم على كل الأجهزة أو الكمبيوتر فقط أو الجوال فقط']]
      ] },
    { id: 'smart-banner', cat: 'hero', icon: 'image', ar: 'البانر التفاعلي المتقدم', en: 'Smart Banner Plus',
      sum: 'بانر بصورة أو فيديو أو صورة شفافة، مع عناصر عائمة ونص وزرين.',
      groups: [
        ['الوسائط', ['صورة، فيديو MP4/WebM، أو صورة شفافة فوق خلفية ملونة', 'صور مستقلة للتابلت والجوال', 'الارتفاع من صغير إلى ملء الشاشة، والعرض، والاستدارة']],
        ['العناصر والمحتوى', ['عناصر عائمة تتجاوز حافة البانر', 'شارة، عنوان، وصف، وموضع النص أفقيًا ورأسيًا', 'زر أساسي وزر ثانوي']],
        ['التأثيرات', ['طبقة تعتيم داكنة أو فاتحة وقوتها', 'ظل، حد رفيع، توهج بلون المتجر أو مخصص', 'لمعان ثابت أو متحرك أو عند المرور']],
        ['الجوال', ['ارتفاع تلقائي 4:5 (موصى به)', 'توزيع العناصر، أقصى عدد لها، إظهار الأوصاف', 'تشغيل الحركات المستمرة على الجوال']]
      ] },
    { id: 'statistics', cat: 'trust', icon: 'chart', ar: 'الإحصائيات والأرقام', en: 'Smart Statistics',
      sum: 'أرقام إنجازاتك تُعدّ تصاعديًا عند ظهورها.',
      groups: [
        ['الإعدادات', ['الشكل: صف بسيط، بطاقات ناعمة، إبراز الأرقام', 'الأعمدة وعرض الجوال', 'حجم الأرقام ولونها', 'فواصل بين الأعمدة', 'عدّ الأرقام تصاعديًا']]
      ],
      tip: 'استخدم أرقامًا حقيقية يمكنك إثباتها: عدد المشاريع، سنوات الخبرة، العملاء.' },
    { id: 'bento', cat: 'content', icon: 'grid', ar: 'البطاقات المتنوعة (بينتو)', en: 'Smart Bento Cards',
      sum: 'شبكة بطاقات بأحجام مختلفة لعرض الخدمات بشكل حديث.',
      groups: [
        ['الإعدادات', ['البطاقات بمحتواها وأحجامها', 'ارتفاع البطاقات واستدارتها', 'عنوان القسم ومحاذاته']]
      ] },
    { id: 'logos', cat: 'trust', icon: 'award', ar: 'الشعارات والشركاء', en: 'Logos & Integrations',
      sum: 'شعارات العملاء أو الأدوات التي تعمل بها، مع زر اختياري.',
      groups: [
        ['الإعدادات', ['الشعارات', 'زر اختياري بوجهة من القائمة', 'عنوان القسم ووصفه']]
      ] },
    { id: 'floating-showcase', cat: 'content', icon: 'image', ar: 'المعرض العائم', en: 'Floating Showcase',
      sum: 'معرض أعمال بصور بارتفاعات متدرجة.',
      groups: [
        ['الإعدادات', ['الشكل: متدرج، شبكة متساوية، صف أفقي', 'عدد العناصر في الصف: 3 أو 4', 'الجوال: سلايدر بالسحب أو عمودان', 'شكل العناصر: مربع، طولي، عرضي']]
      ] },
    { id: 'faq', cat: 'contact', icon: 'help', ar: 'الأسئلة الشائعة', en: 'Smart FAQ',
      sum: 'أسئلة وأجوبة قابلة للفتح والإغلاق.',
      groups: [
        ['الإعدادات', ['الشكل: خطوط فاصلة، صفوف بإطار، بطاقات', 'عمود أو عمودان', 'سؤال واحد مفتوح أو عدة أسئلة', 'عند التحميل: كلها مغلقة أو الأول مفتوح', 'الأيقونة: سهم أو +']]
      ] },
    { id: 'impact', cat: 'trust', icon: 'chart', ar: 'أثرنا بالأرقام', en: 'Impact Metrics',
      sum: 'بطاقات أرقام مع بطاقة مميزة ورسم بياني تفاعلي.',
      groups: [
        ['الإعدادات', ['البطاقات بأرقامها', 'الأعمدة: 2 أو 3', 'حجم الأرقام', 'زخرفة البطاقة المميزة: خط منحني، أعمدة، بدون', 'رسم بياني تفاعلي بأرقامك']]
      ] },
    { id: 'categories', cat: 'sell', icon: 'list', ar: 'الأقسام والقطاعات', en: 'Categories Carousel',
      sum: 'شريط تصنيفات المتجر أو عناصر مخصصة.',
      groups: [
        ['الإعدادات', ['المصدر: تصنيفات المتجر أو عناصر مخصصة', 'اختيار التصنيفات، وأقصى عدد (4 إلى 16)', 'حجم البطاقات والصورة داخلها']]
      ] },
    { id: 'files', cat: 'contact', icon: 'download', ar: 'الملفات والتحميلات', en: 'Files & Downloads',
      sum: 'ملفات للتحميل: بروفايل الشركة، كتالوج، نماذج.',
      groups: [
        ['الإعدادات', ['الملفات', 'داخل صندوق أو صفوف بسيطة', 'زر التحميل: إطار، ممتلئ، أيقونة فقط', 'المسافات، نوع الملف، أيقونة الملف']]
      ] },
    { id: 'contact-cards', cat: 'contact', icon: 'phone', ar: 'بطاقات التواصل', en: 'Contact Cards',
      sum: 'بطاقات لطرق التواصل: هاتف، بريد، واتساب، موقع.',
      groups: [
        ['الإعدادات', ['البطاقات', 'الأعمدة: 2، 3، 4', 'الجوال: بطاقة في كل صف أو سلايدر', 'الرابط: نصي أو زر', 'موضع الصورة: زاوية البطاقة أو أعلاها']]
      ] },
    { id: 'stories', cat: 'trust', icon: 'chat', ar: 'آراء العملاء وقصصهم', en: 'Client Stories',
      sum: 'شهادات العملاء بشعاراتهم وأسمائهم.',
      groups: [
        ['الإعدادات', ['الشهادات', 'الشكل: شهادة كبيرة (سلايدر عند تعددها) أو بطاقات متعددة', 'حجم نص الشهادة ومحاذاته', 'موضع الشعار ورمز الاقتباس']]
      ],
      tip: 'اطلب إذن العميل قبل نشر اسمه أو شعاره.' },
    { id: 'pricing', cat: 'sell', icon: 'tag', ar: 'الباقات والأسعار', en: 'Pricing Plans',
      sum: 'جدول باقات مع إبراز الباقة المميزة.',
      groups: [
        ['الإعدادات', ['الباقات بأسعارها ومزاياها وأزرارها', 'إبراز المميزة: إطار أو خلفية بلون المتجر', 'الجوال: باقة في كل صف أو سلايدر', 'محاذاة النص وخلفية القسم']]
      ] },
    { id: 'build-package', cat: 'sell', icon: 'box', ar: 'كوّن باقتك', en: 'Build Your Package',
      sum: 'يختار العميل مكونات باقته خطوة بخطوة ثم يضيفها للسلة.',
      groups: [
        ['الإعدادات', ['منتج الباقة من سلة', 'صورة القسم', 'خطوات الباقة', 'إظهار مجموعات الباقة ونسبة الخصم', 'نص الزر']]
      ],
      tip: 'أنشئ في سلة منتجًا من نوع «باقة» أولًا، ثم اختره هنا.' },
    { id: 'video-products', cat: 'sell', icon: 'video', ar: 'بطاقات منتجات بالفيديو', en: 'Video Product Cards',
      sum: 'منتجات تعرض فيديو قصيرًا بدل الصورة.',
      groups: [
        ['المصدر', ['منتجات تختارها مع رابط فيديو لكل منها، أو أحدث المنتجات، أو تصنيف', 'استخدام فيديو المنتج المرفوع في سلة', 'أقصى عدد: 4 إلى 12']],
        ['العرض', ['التشغيل: عند ظهور البطاقة أو عند المرور', 'البطاقة: عمودية أو أفقية', 'شريط بالسحب أو شبكة، وعدد البطاقات في الصف']]
      ] }
  ];

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var svg = function (name) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.grid) + '</svg>'; };

  // Blocks catalogue
  var blockHost = $('[data-blocks]');
  if (blockHost) {
    blockHost.innerHTML = BLOCKS.map(function (b) {
      var groups = b.groups.map(function (g) {
        return '<h4>' + esc(g[0]) + '</h4><ul>' + g[1].map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
      }).join('');
      return '<details class="acc block" id="block-' + b.id + '" data-cat="' + b.cat + '">' +
        '<summary><span class="block-head"><span class="block-icon">' + svg(b.icon) + '</span><span><b>' + esc(b.ar) +
        '<span class="block-en">' + esc(b.en) + '</span></b><small>' + esc(b.sum) + '</small></span></span></summary>' +
        '<div class="block-body">' + groups + (b.tip ? '<p class="block-tip"><b>نصيحة:</b> ' + esc(b.tip) + '</p>' : '') + '</div></details>';
    }).join('');
  }

  $$('[data-block-filter] button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-cat');
      $$('[data-block-filter] button').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      $$('.block').forEach(function (el) { el.hidden = cat !== 'all' && el.getAttribute('data-cat') !== cat; });
    });
  });

  // Heading anchors
  $$('.doc h2').forEach(function (h) {
    var id = h.parentElement.id;
    if (!id) return;
    var a = document.createElement('a');
    a.className = 'anchor'; a.href = '#' + id; a.textContent = '#';
    a.setAttribute('aria-label', 'نسخ رابط القسم');
    a.addEventListener('click', function (e) {
      e.preventDefault();
      history.replaceState(null, '', '#' + id);
      copy(location.href, 'تم نسخ رابط القسم');
      h.parentElement.scrollIntoView();
    });
    h.appendChild(a);
  });

  // Toast + copy
  var toastEl = $('[data-toast]'), toastTimer;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 1800);
  }
  function copy(text, msg) {
    var done = function () { toast(msg || 'تم النسخ'); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
    else done();
  }
  $$('[data-copy]').forEach(function (b) { b.addEventListener('click', function () { copy(b.getAttribute('data-copy'), 'تم نسخ البريد'); }); });

  // Theme toggle
  var root = document.documentElement;
  $('[data-theme-toggle]').addEventListener('click', function () {
    var current = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store.set('wk-help-theme', next);
  });

  // Mobile sidebar
  var sidebar = $('#sidebar'), scrim = $('[data-scrim]'), menuBtn = $('[data-menu]');
  function setMenu(open) {
    sidebar.classList.toggle('open', open);
    scrim.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', function () { setMenu(!sidebar.classList.contains('open')); });
  scrim.addEventListener('click', function () { setMenu(false); });
  $$('#sidebar a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  // Scrollspy
  var links = $$('#sidebar a');
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var a = byId[en.target.id];
        if (!a) return;
        links.forEach(function (l) { l.classList.toggle('active', l === a); });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  // Tabs
  $$('[data-tabs]').forEach(function (wrap) {
    var tabs = $$('[role="tab"]', wrap);
    function select(t, focus) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', String(on));
        x.tabIndex = on ? 0 : -1;
        $('[data-panel="' + x.getAttribute('data-tab') + '"]', wrap).hidden = !on;
      });
      if (focus) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.tabIndex = i === 0 ? 0 : -1;
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var rtl = document.dir === 'rtl';
        var step = e.key === 'ArrowLeft' ? (rtl ? 1 : -1) : e.key === 'ArrowRight' ? (rtl ? -1 : 1) : 0;
        if (!step) return;
        e.preventDefault();
        select(tabs[(i + step + tabs.length) % tabs.length], true);
      });
    });
  });

  // Checklist
  var KEY = 'wk-help-checklist';
  var saved = {};
  try { saved = JSON.parse(store.get(KEY) || '{}') || {}; } catch (e) { saved = {}; }
  var boxes = $$('[data-checklist] input');
  function renderProgress() {
    var n = boxes.filter(function (b) { return b.checked; }).length;
    $('[data-progress-bar]').style.width = (n / boxes.length * 100) + '%';
    $('[data-progress-label]').textContent = n === boxes.length ? 'أحسنت، متجرك جاهز.' : n + ' من ' + boxes.length;
  }
  boxes.forEach(function (b) {
    b.checked = !!saved[b.getAttribute('data-step')];
    b.addEventListener('change', function () {
      saved[b.getAttribute('data-step')] = b.checked;
      store.set(KEY, JSON.stringify(saved));
      renderProgress();
    });
  });
  $('[data-checklist-reset]').addEventListener('click', function () {
    boxes.forEach(function (b) { b.checked = false; });
    saved = {}; store.set(KEY, '{}'); renderProgress();
  });
  renderProgress();

  // Search index: sections, table rows, accordions and blocks
  var INDEX = [];
  $$('.doc').forEach(function (sec) {
    var h = $('h2', sec);
    if (!h) return;
    var title = h.firstChild.textContent.trim();
    INDEX.push({ t: title, s: 'قسم', href: '#' + sec.id, body: sec.textContent });
    $$('.settings tr', sec).forEach(function (tr) {
      var first = tr.cells[0];
      if (!first || tr.parentElement.tagName === 'THEAD') return;
      INDEX.push({ t: first.textContent.trim(), s: title, href: '#' + sec.id, body: tr.textContent });
    });
    $$('details:not(.block) > summary', sec).forEach(function (sm) {
      var d = sm.parentElement;
      if (!d.id) d.id = sec.id + '-' + INDEX.length;
      INDEX.push({ t: sm.textContent.trim(), s: title, href: '#' + d.id, body: d.textContent, open: true });
    });
  });
  BLOCKS.forEach(function (b) {
    var body = b.ar + ' ' + b.en + ' ' + b.sum + ' ' + b.groups.map(function (g) { return g[1].join(' '); }).join(' ');
    INDEX.push({ t: b.ar, s: 'قسم للصفحة الرئيسية · ' + b.en, href: '#block-' + b.id, body: body, open: true });
  });

  var norm = function (s) {
    return String(s).toLowerCase()
      .replace(/[ً-ْـ]/g, '')
      .replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي');
  };
  INDEX.forEach(function (e) { e.nt = norm(e.t); e.nb = norm(e.body); });

  var modal = $('[data-search]'), input = $('[data-search-input]'), results = $('[data-search-results]');
  var active = 0, current = [], lastFocus = null;

  function highlight(text, terms) {
    var out = esc(text), nt = norm(text);
    // Indexes only map back to the original when normalisation dropped no characters.
    if (nt.length !== text.length) return out;
    terms.forEach(function (t) {
      var i = nt.indexOf(t);
      if (i < 0) return;
      var raw = text.substr(i, t.length);
      out = out.replace(esc(raw), '<mark>' + esc(raw) + '</mark>');
    });
    return out;
  }

  function search(q) {
    var terms = norm(q).trim().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      current = INDEX.filter(function (e) { return e.s === 'قسم'; }).slice(0, 8);
    } else {
      current = INDEX.map(function (e) {
        var score = 0;
        for (var i = 0; i < terms.length; i++) {
          var t = terms[i];
          if (e.nt.indexOf(t) === 0) score += 6;
          else if (e.nt.indexOf(t) > -1) score += 4;
          else if (e.nb.indexOf(t) > -1) score += 1;
          else return null;
        }
        return { e: e, score: score };
      }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).slice(0, 12).map(function (x) { return x.e; });
    }
    active = 0;
    if (!current.length) {
      results.innerHTML = '<li class="search-empty">لا نتائج. جرّب كلمة أخرى، أو <a href="#support">تواصل معنا</a>.</li>';
      return;
    }
    results.innerHTML = current.map(function (e, i) {
      return '<li role="option" id="sr-' + i + '" aria-selected="' + (i === 0) + '"><a href="' + e.href + '" data-i="' + i + '">' +
        highlight(e.t, terms) + '<small>' + esc(e.s) + '</small></a></li>';
    }).join('');
  }

  function setActive(i) {
    var items = $$('li[role="option"]', results);
    if (!items.length) return;
    active = (i + items.length) % items.length;
    items.forEach(function (li, k) { li.setAttribute('aria-selected', String(k === active)); });
    items[active].scrollIntoView({ block: 'nearest' });
    input.setAttribute('aria-activedescendant', 'sr-' + active);
  }

  function go(entry) {
    closeSearch(false);
    var target = document.getElementById(entry.href.slice(1));
    if (!target) return;
    if (entry.open && target.tagName === 'DETAILS') {
      if (target.hidden) { $('[data-block-filter] [data-cat="all"]').click(); }
      target.open = true;
    }
    history.replaceState(null, '', entry.href);
    target.scrollIntoView({ block: 'start' });
    target.classList.remove('flash'); void target.offsetWidth; target.classList.add('flash');
    var focusable = target.tagName === 'DETAILS' ? $('summary', target) : $('h2', target);
    if (focusable) { focusable.setAttribute('tabindex', focusable.tagName === 'SUMMARY' ? '0' : '-1'); focusable.focus({ preventScroll: true }); }
  }

  function openSearch() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    input.value = '';
    search('');
    input.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeSearch(restore) {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (restore !== false && lastFocus) lastFocus.focus();
  }

  $$('[data-search-open]').forEach(function (b) { b.addEventListener('click', openSearch); });
  input.addEventListener('input', function () { search(input.value); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
    else if (e.key === 'Enter' && current[active]) { e.preventDefault(); go(current[active]); }
  });
  results.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-i]');
    if (!a) return;
    e.preventDefault();
    go(current[+a.getAttribute('data-i')]);
  });
  modal.addEventListener('click', function (e) { if (e.target === modal) closeSearch(); });
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); modal.hidden ? openSearch() : closeSearch(); }
    else if (e.key === '/' && modal.hidden && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); }
    else if (e.key === 'Escape' && !modal.hidden) closeSearch();
    else if (e.key === 'Escape' && sidebar.classList.contains('open')) setMenu(false);
  });

  // Deep link to a block opens it
  if (location.hash.indexOf('#block-') === 0) {
    var d = document.getElementById(location.hash.slice(1));
    if (d) { d.open = true; setTimeout(function () { d.scrollIntoView(); }, 0); }
  }

  // Print everything expanded
  var reopened = [];
  window.addEventListener('beforeprint', function () {
    reopened = $$('details:not([open])');
    reopened.forEach(function (d) { d.open = true; });
  });
  window.addEventListener('afterprint', function () { reopened.forEach(function (d) { d.open = false; }); });
})();
