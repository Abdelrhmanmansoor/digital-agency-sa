import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

const ARTICLES = [
  {
    id: "1",
    titleAr: "10 أسرار لتصميم متجر سلة يحقق مبيعات عالية",
    titleEn: "10 Secrets to Design a High-Converting Salla Store",
    excerptAr: "اكتشف أهم العوامل التي تجعل متجرك على منصة سلة يتصدر المنافسة ويحقق مبيعات استثنائية.",
    excerptEn: "Discover the key factors that make your Salla store stand out from the competition and achieve exceptional sales.",
    category: "salla",
    categoryAr: "سلة",
    categoryEn: "Salla",
    date: "2025-01-15",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    contentAr: `
      <p>منصة سلة من أقوى منصات التجارة الإلكترونية في المملكة العربية السعودية، لكن النجاح عليها يتطلب معرفة عميقة بأسرار التصميم الذي يحوّل الزوار إلى عملاء.</p>

      <h2>1. تصميم الصفحة الرئيسية</h2>
      <p>الصفحة الرئيسية هي أول ما يراه زائرك. يجب أن تكون واضحة، سريعة، ومحفزة على الشراء. استخدم صور عالية الجودة، وعناوين قوية، وأزرار CTA واضحة.</p>

      <h2>2. سرعة التحميل</h2>
      <p>كل ثانية تأخير في التحميل تكلفك 7% من التحويلات. حسّن صورك، قلل JavaScript غير الضروري، واستخدم CDN لتسريع موقعك.</p>

      <h2>3. تجربة الجوال أولاً</h2>
      <p>أكثر من 80% من مبيعات المتاجر السعودية تأتي من الجوال. تأكد أن متجرك يعمل بشكل مثالي على الشاشات الصغيرة.</p>

      <h2>4. صور المنتجات الاحترافية</h2>
      <p>الصور عالية الجودة تزيد المبيعات بنسبة 30%. استثمر في تصوير احترافي لمنتجاتك من زوايا متعددة.</p>

      <h2>5. وصف المنتجات المقنع</h2>
      <p>اكتب وصفاً يركز على الفوائد لا المواصفات. أجب على سؤال العميل: "ماذا سيستفيد من هذا المنتج؟"</p>

      <h2>6. نظام التقييمات والمراجعات</h2>
      <p>92% من المستهلكين يقرؤون المراجعات قبل الشراء. فعّل نظام التقييمات وشجّع عملاءك على مشاركة تجاربهم.</p>

      <h2>7. عملية الدفع السلسة</h2>
      <p>قلل خطوات الدفع إلى الحد الأدنى. ادعم جميع وسائل الدفع الشائعة: مدى، ماستركارد، تابي، تمارا.</p>

      <h2>8. الشحن المجاني والواضح</h2>
      <p>اعرض تكاليف الشحن بشفافية منذ البداية. الشحن المجاني يزيد معدل التحويل بنسبة 20%.</p>

      <h2>9. سياسة إرجاع واضحة</h2>
      <p>سياسة إرجاع واضحة وسهلة تزيد الثقة وتشجع على الشراء. اجعلها مرئية في جميع صفحات المنتجات.</p>

      <h2>10. تحسين محركات البحث (SEO)</h2>
      <p>استخدم الكلمات المفتاحية المناسبة في عناوين المنتجات والأوصاف والصور لتحسين ظهورك في نتائج البحث.</p>

      <p>تطبيق هذه الأسرار سيضع متجرك في المسار الصحيح نحو النجاح. إذا كنت تحتاج مساعدة في تصميم متجرك على سلة، تواصل معنا اليوم.</p>
    `,
    contentEn: `
      <p>Salla is one of the strongest e-commerce platforms in Saudi Arabia, but success requires deep knowledge of design secrets that convert visitors into customers.</p>

      <h2>1. Homepage Design</h2>
      <p>Your homepage is the first thing visitors see. It should be clear, fast, and motivating for purchases. Use high-quality images, strong headlines, and clear CTA buttons.</p>

      <h2>2. Loading Speed</h2>
      <p>Every second of delay costs you 7% of conversions. Optimize your images, minimize unnecessary JavaScript, and use a CDN to speed up your site.</p>

      <h2>3. Mobile-First Experience</h2>
      <p>More than 80% of Saudi store sales come from mobile. Make sure your store works perfectly on small screens.</p>

      <h2>4. Professional Product Photos</h2>
      <p>High-quality images increase sales by 30%. Invest in professional photography of your products from multiple angles.</p>

      <h2>5. Compelling Product Descriptions</h2>
      <p>Write descriptions focused on benefits, not specifications. Answer the customer's question: "What will I gain from this product?"</p>

      <h2>6. Reviews and Ratings System</h2>
      <p>92% of consumers read reviews before buying. Enable the rating system and encourage your customers to share their experiences.</p>

      <h2>7. Smooth Checkout Process</h2>
      <p>Minimize checkout steps. Support all popular payment methods: Mada, Mastercard, Tabby, Tamara.</p>

      <h2>8. Clear Free Shipping</h2>
      <p>Display shipping costs transparently from the start. Free shipping increases conversion rates by 20%.</p>

      <h2>9. Clear Return Policy</h2>
      <p>A clear and easy return policy builds trust and encourages purchases. Make it visible on all product pages.</p>

      <h2>10. Search Engine Optimization (SEO)</h2>
      <p>Use appropriate keywords in product titles, descriptions, and images to improve your visibility in search results.</p>

      <p>Applying these secrets will put your store on the right path to success. If you need help designing your Salla store, contact us today.</p>
    `,
  },
  {
    id: "2",
    titleAr: "دليل التسويق الرقمي لأصحاب المتاجر الإلكترونية",
    titleEn: "Digital Marketing Guide for E-commerce Store Owners",
    excerptAr: "كل ما تحتاج معرفته عن التسويق الرقمي لزيادة مبيعات متجرك الإلكتروني في المملكة.",
    excerptEn: "Everything you need to know about digital marketing to increase your e-commerce store sales in the Kingdom.",
    category: "marketing",
    categoryAr: "تسويق",
    categoryEn: "Marketing",
    date: "2025-01-10",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    contentAr: `
      <p>التسويق الرقمي لم يعد خياراً بل ضرورة لكل صاحب متجر إلكتروني يريد النجاح في السوق السعودي التنافسي.</p>

      <h2>ما هو التسويق الرقمي؟</h2>
      <p>التسويق الرقمي هو استخدام القنوات الرقمية للترويج لمنتجاتك وخدماتك والوصول إلى عملائك المحتملين.</p>

      <h2>القنوات الرئيسية</h2>
      <p>تشمل القنوات الرئيسية: وسائل التواصل الاجتماعي، الإعلانات المدفوعة، البريد الإلكتروني، SEO، وتسويق المحتوى.</p>

      <h2>السوشيال ميديا للمتاجر السعودية</h2>
      <p>انستغرام وتويتر وسناب شات هي المنصات الأكثر فاعلية في السوق السعودي. احرص على حضور قوي على هذه المنصات.</p>

      <p>استثمر في التسويق الرقمي اليوم وشاهد مبيعاتك ترتفع.</p>
    `,
    contentEn: `
      <p>Digital marketing is no longer optional but a necessity for every e-commerce store owner who wants to succeed in the competitive Saudi market.</p>

      <h2>What is Digital Marketing?</h2>
      <p>Digital marketing is using digital channels to promote your products and services and reach potential customers.</p>

      <h2>Main Channels</h2>
      <p>Main channels include: social media, paid advertising, email, SEO, and content marketing.</p>

      <h2>Social Media for Saudi Stores</h2>
      <p>Instagram, Twitter, and Snapchat are the most effective platforms in the Saudi market. Ensure a strong presence on these platforms.</p>

      <p>Invest in digital marketing today and watch your sales rise.</p>
    `,
  },
  {
    id: "3",
    titleAr: "كيف تبني هوية بصرية قوية لمتجرك",
    titleEn: "How to Build a Strong Brand Identity for Your Store",
    excerptAr: "الهوية البصرية هي روح علامتك التجارية. تعلم كيف تبنيها بشكل صحيح.",
    excerptEn: "Your brand identity is the soul of your brand. Learn how to build it correctly.",
    category: "design",
    categoryAr: "تصميم",
    categoryEn: "Design",
    date: "2025-01-05",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80",
    contentAr: `
      <p>الهوية البصرية القوية تميز متجرك عن آلاف المنافسين وتبني ثقة دائمة مع عملائك.</p>

      <h2>عناصر الهوية البصرية</h2>
      <p>تشمل: الشعار، الألوان، الخطوط، والنبرة البصرية العامة.</p>

      <h2>اختيار الألوان</h2>
      <p>كل لون يحمل معنى نفسي. اختر ألواناً تعكس قيم علامتك التجارية وتتناسب مع جمهورك المستهدف.</p>

      <p>استثمر في هويتك البصرية من البداية لبناء علامة تجارية قوية.</p>
    `,
    contentEn: `
      <p>A strong brand identity distinguishes your store from thousands of competitors and builds lasting trust with your customers.</p>

      <h2>Elements of Brand Identity</h2>
      <p>Includes: logo, colors, fonts, and general visual tone.</p>

      <h2>Choosing Colors</h2>
      <p>Each color carries psychological meaning. Choose colors that reflect your brand values and suit your target audience.</p>

      <p>Invest in your brand identity from the beginning to build a strong brand.</p>
    `,
  },
];

const RELATED_ARTICLES = ARTICLES.slice(0, 2);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const article = ARTICLES.find((a) => a.id === id);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${locale === "ar" ? article.titleAr : article.titleEn} | وكالة رقمية`,
    description: locale === "ar" ? article.excerptAr : article.excerptEn,
    openGraph: {
      images: [article.image],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const isRTL = locale === "ar";
  const article = ARTICLES.find((a) => a.id === id);

  if (!article) notFound();

  const related = RELATED_ARTICLES.filter((a) => a.id !== id).slice(0, 2);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          style={{
            background: "#0A0A0A",
            padding: "120px 0 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="max-w-[900px] mx-auto px-8 pb-12 relative z-10">
            {/* Breadcrumb */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "32px" }}>
              <Link href={`/${locale}`} style={{ color: "#8C8C7A", textDecoration: "none", fontSize: "13px", fontFamily: "Space Mono" }}>
                {isRTL ? "الرئيسية" : "Home"}
              </Link>
              <span style={{ color: "#3A3A35" }}>/</span>
              <Link href={`/${locale}/blog`} style={{ color: "#8C8C7A", textDecoration: "none", fontSize: "13px", fontFamily: "Space Mono" }}>
                {isRTL ? "المدونة" : "Blog"}
              </Link>
              <span style={{ color: "#3A3A35" }}>/</span>
              <span style={{ color: "#C8A962", fontSize: "13px", fontFamily: "Space Mono" }}>
                {isRTL ? article.categoryAr : article.categoryEn}
              </span>
            </div>

            {/* Category */}
            <div className="gold-badge mb-6">
              {isRTL ? article.categoryAr : article.categoryEn}
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif",
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 700,
                color: "#FAFAF7",
                lineHeight: 1.2,
                marginBottom: "24px",
              }}
            >
              {isRTL ? article.titleAr : article.titleEn}
            </h1>

            {/* Meta */}
            <div style={{ display: "flex", gap: "24px", alignItems: "center", color: "#8C8C7A" }}>
              <span style={{ fontFamily: "Space Mono", fontSize: "12px" }}>
                {new Date(article.date).toLocaleDateString(isRTL ? "ar-SA" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span style={{ fontFamily: "Space Mono", fontSize: "12px" }}>
                ⏱ {article.readTime} {isRTL ? "دقيقة قراءة" : "min read"}
              </span>
            </div>
          </div>

          {/* Hero Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt={isRTL ? article.titleAr : article.titleEn}
            style={{
              width: "100%",
              height: "480px",
              objectFit: "cover",
              display: "block",
              opacity: 0.7,
            }}
          />
        </section>

        {/* Article Content */}
        <section style={{ background: "#FAFAF7", padding: "80px 0" }}>
          <div className="max-w-[900px] mx-auto px-8">
            <div
              className="article-content"
              style={{
                fontFamily: isRTL ? "Noto Sans Arabic" : "sans-serif",
                fontSize: "17px",
                lineHeight: 1.9,
                color: "#2A2A25",
                direction: isRTL ? "rtl" : "ltr",
              }}
              dangerouslySetInnerHTML={{
                __html: isRTL ? article.contentAr : article.contentEn,
              }}
            />

            {/* Share & Back */}
            <div
              style={{
                marginTop: "64px",
                paddingTop: "32px",
                borderTop: "1px solid #E8E6E1",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <Link
                href={`/${locale}/blog`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#8C8C7A",
                  textDecoration: "none",
                  fontFamily: "Space Mono",
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
              >
                {isRTL ? "→ العودة للمدونة" : "← Back to Blog"}
              </Link>
              <div style={{ display: "flex", gap: "12px" }}>
                <span style={{ color: "#8C8C7A", fontSize: "13px", fontFamily: "Space Mono" }}>
                  {isRTL ? "مشاركة:" : "Share:"}
                </span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(isRTL ? article.titleAr : article.titleEn)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#C8A962", textDecoration: "none", fontFamily: "Space Mono", fontSize: "13px" }}
                >
                  Twitter
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(isRTL ? article.titleAr : article.titleEn)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#C8A962", textDecoration: "none", fontFamily: "Space Mono", fontSize: "13px" }}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {related.length > 0 && (
          <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
            <div className="max-w-[1400px] mx-auto px-8">
              <h2
                style={{
                  fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#0A0A0A",
                  marginBottom: "40px",
                }}
              >
                {isRTL ? "مقالات ذات صلة" : "Related Articles"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {related.map((rel) => (
                  <Link key={rel.id} href={`/${locale}/blog/${rel.id}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        border: "1px solid #E8E6E1",
                        overflow: "hidden",
                        transition: "border-color 0.3s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C8A962")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E8E6E1")}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rel.image}
                        alt={isRTL ? rel.titleAr : rel.titleEn}
                        style={{ height: "200px", width: "100%", objectFit: "cover", display: "block" }}
                      />
                      <div style={{ padding: "24px" }}>
                        <div className="gold-badge mb-3" style={{ fontSize: "10px" }}>
                          {isRTL ? rel.categoryAr : rel.categoryEn}
                        </div>
                        <h3
                          style={{
                            fontFamily: isRTL ? "Noto Kufi Arabic" : "sans-serif",
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "#0A0A0A",
                            lineHeight: 1.4,
                          }}
                        >
                          {isRTL ? rel.titleAr : rel.titleEn}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />

      <style>{`
        .article-content h2 {
          font-family: ${isRTL ? "'Noto Kufi Arabic'" : "sans-serif"};
          font-size: 24px;
          font-weight: 700;
          color: #0A0A0A;
          margin: 40px 0 16px;
        }
        .article-content p {
          margin-bottom: 20px;
        }
        .article-content ul, .article-content ol {
          margin: 16px 0 20px;
          padding-${isRTL ? "right" : "left"}: 24px;
        }
        .article-content li {
          margin-bottom: 8px;
        }
        .article-content a {
          color: #C8A962;
          text-decoration: none;
        }
      `}</style>
    </>
  );
}
