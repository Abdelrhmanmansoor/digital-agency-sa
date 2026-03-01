// Upstash Redis REST API — no packages needed, works on Vercel serverless
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisGet<T>(key: string, defaultValue: T): Promise<T> {
  if (!REDIS_URL || !REDIS_TOKEN) return defaultValue;
  try {
    const res = await fetch(`${REDIS_URL}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
      cache: "no-store",
    });
    const data = await res.json();
    if (!data.result) return defaultValue;
    return JSON.parse(data.result) as T;
  } catch {
    return defaultValue;
  }
}

async function redisSet<T>(key: string, value: T): Promise<void> {
  if (!REDIS_URL || !REDIS_TOKEN) return;
  try {
    await fetch(`${REDIS_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([["SET", key, JSON.stringify(value)]]),
      cache: "no-store",
    });
  } catch (e) {
    console.error("Redis SET error:", e);
  }
}

export interface Article {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  excerptAr: string;
  excerptEn: string;
  category: string;
  image: string;
  status: "draft" | "published" | "scheduled";
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Project {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  image: string;
  url?: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

const SAMPLE_ARTICLES: Article[] = [
  {
    id: "1",
    titleAr: "10 أسرار لتصميم متجر سلة يحقق مبيعات عالية",
    titleEn: "10 Secrets to Design a High-Converting Salla Store",
    contentAr: "<p>محتوى المقال الكامل هنا...</p>",
    contentEn: "<p>Full article content here...</p>",
    excerptAr: "اكتشف أهم العوامل التي تجعل متجرك على منصة سلة يتصدر المنافسة...",
    excerptEn: "Discover the key factors that make your Salla store stand out...",
    category: "سلة",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    status: "published",
    publishedAt: "2025-01-15T00:00:00.000Z",
    createdAt: "2025-01-14T00:00:00.000Z",
    updatedAt: "2025-01-15T00:00:00.000Z",
  },
  {
    id: "2",
    titleAr: "دليل التسويق الرقمي لأصحاب المتاجر",
    titleEn: "Digital Marketing Guide for Store Owners",
    contentAr: "<p>محتوى المقال الكامل...</p>",
    contentEn: "<p>Full content...</p>",
    excerptAr: "كل ما تحتاج معرفته عن التسويق الرقمي...",
    excerptEn: "Everything you need to know about digital marketing...",
    category: "تسويق",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    status: "published",
    publishedAt: "2025-01-10T00:00:00.000Z",
    createdAt: "2025-01-09T00:00:00.000Z",
    updatedAt: "2025-01-10T00:00:00.000Z",
  },
];

const SAMPLE_PROJECTS: Project[] = [
  {
    id: "1",
    nameAr: "TF1ONE — منصة التوظيف الرياضي",
    nameEn: "TF1ONE — Sports Employment Platform",
    descriptionAr: "أول منصة توظيف رياضي ووكالة لاعبين في المملكة العربية السعودية",
    descriptionEn: "Saudi Arabia's first sports employment & player agency platform",
    category: "websites",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    url: "https://www.tf1one.sa/",
    featured: true,
    order: 1,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "26",
    nameAr: "جوخ — مجوهرات فاخرة",
    nameEn: "JOGH — Luxury Jewelry",
    descriptionAr: "متجر إلكتروني فاخر للمجوهرات والإكسسوارات يجمع بين الأصالة واللمسة العصرية، مع خامات مختارة بعناية وفخامة تنبع من الهوية",
    descriptionEn: "Premium e-commerce store for luxury jewelry and accessories blending authenticity with modern elegance, featuring carefully selected materials",
    category: "websites",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    url: "https://joghstore.com/ar/",
    featured: true,
    order: 2,
    createdAt: "2025-03-01T00:00:00.000Z",
  },
  {
    id: "2",
    nameAr: "سرداب — أزياء فاخرة",
    nameEn: "Serdab — Luxury Fashion",
    descriptionAr: "متجر سلة متكامل لعلامة الأزياء الفاخرة سرداب",
    descriptionEn: "Full Salla store for luxury fashion brand Serdab",
    category: "salla",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    url: "#",
    featured: true,
    order: 2,
    createdAt: "2024-02-01T00:00:00.000Z",
  },
  {
    id: "3",
    nameAr: "برونز عباية",
    nameEn: "Bronze Abaya",
    descriptionAr: "هوية بصرية كاملة ومتجر سلة لعلامة برونز للعبايات الفاخرة",
    descriptionEn: "Complete brand identity & Salla store for Bronze Abaya luxury brand",
    category: "branding",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    url: "#",
    featured: false,
    order: 3,
    createdAt: "2024-02-15T00:00:00.000Z",
  },
  {
    id: "4",
    nameAr: "عود الصفوة",
    nameEn: "Oud Al Safwa",
    descriptionAr: "تصميم متجر سلة وهوية بصرية لعلامة عود الصفوة الفاخرة",
    descriptionEn: "Salla store design & branding for Oud Al Safwa luxury brand",
    category: "salla",
    image: "https://images.unsplash.com/photo-1599839619163-e50d71fce4ac?w=800&q=80",
    url: "#",
    featured: false,
    order: 4,
    createdAt: "2024-03-01T00:00:00.000Z",
  },
  {
    id: "5",
    nameAr: "بانافع للعود",
    nameEn: "Banafa for Oud",
    descriptionAr: "إدارة حملات إعلانية وتسويق رقمي لمتجر بانافع للعود",
    descriptionEn: "Ad campaign management & digital marketing for Banafa Oud store",
    category: "marketing",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    url: "#",
    featured: false,
    order: 5,
    createdAt: "2024-03-15T00:00:00.000Z",
  },
  {
    id: "6",
    nameAr: "JR Line",
    nameEn: "JR Line",
    descriptionAr: "هوية بصرية فاخرة وثيم سلة مخصص لعلامة JR Line",
    descriptionEn: "Luxury brand identity & custom Salla theme for JR Line",
    category: "branding",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    url: "#",
    featured: false,
    order: 6,
    createdAt: "2024-04-01T00:00:00.000Z",
  },
  {
    id: "7",
    nameAr: "عسل وعافية",
    nameEn: "Asal & Afia",
    descriptionAr: "تصميم متجر سلة وإطلاق حملة تسويقية لمتجر عسل وعافية",
    descriptionEn: "Salla store design & marketing campaign launch for Asal & Afia",
    category: "salla",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    url: "#",
    featured: false,
    order: 7,
    createdAt: "2024-04-15T00:00:00.000Z",
  },
  {
    id: "8",
    nameAr: "دارلينا",
    nameEn: "Darlena",
    descriptionAr: "هوية بصرية وتصميم متجر سلة لعلامة دارلينا للأزياء",
    descriptionEn: "Brand identity & Salla store design for Darlena fashion brand",
    category: "branding",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    url: "#",
    featured: false,
    order: 8,
    createdAt: "2024-05-01T00:00:00.000Z",
  },
  {
    id: "9",
    nameAr: "العواج للعسل",
    nameEn: "Al Awaj Honey",
    descriptionAr: "تصميم وإطلاق متجر سلة لمنتجات العواج الطبيعية",
    descriptionEn: "Salla store design & launch for Al Awaj natural products",
    category: "salla",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80",
    url: "#",
    featured: false,
    order: 9,
    createdAt: "2024-05-15T00:00:00.000Z",
  },
  {
    id: "10",
    nameAr: "إبرة وخيط",
    nameEn: "Needle & Thread",
    descriptionAr: "تصميم متجر سلة لعلامة إبرة وخيط للأزياء والخياطة",
    descriptionEn: "Salla store design for Needle & Thread fashion brand",
    category: "salla",
    image: "https://images.unsplash.com/photo-1558171813-1ea5d394b768?w=800&q=80",
    url: "#",
    featured: false,
    order: 10,
    createdAt: "2024-06-01T00:00:00.000Z",
  },
  {
    id: "11",
    nameAr: "السعودي ترند",
    nameEn: "Saudi Trend",
    descriptionAr: "إدارة سوشيال ميديا وحملات إعلانية للسعودي ترند",
    descriptionEn: "Social media management & ad campaigns for Saudi Trend",
    category: "marketing",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    url: "#",
    featured: false,
    order: 11,
    createdAt: "2024-06-15T00:00:00.000Z",
  },
  {
    id: "12",
    nameAr: "زيت الزيتون روماني",
    nameEn: "Romany Olive Oil",
    descriptionAr: "تصميم هوية بصرية كاملة لمنتجات زيت الزيتون روماني",
    descriptionEn: "Full brand identity design for Romany Olive Oil products",
    category: "branding",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
    url: "#",
    featured: false,
    order: 12,
    createdAt: "2024-07-01T00:00:00.000Z",
  },
  {
    id: "13",
    nameAr: "JOGH — مجوهرات",
    nameEn: "JOGH — Jewelry",
    descriptionAr: "موقع احترافي وهوية بصرية لعلامة JOGH للمجوهرات الفاخرة",
    descriptionEn: "Professional website & brand identity for JOGH luxury jewelry brand",
    category: "websites",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    url: "https://www.jogh.sa",
    featured: false,
    order: 13,
    createdAt: "2024-07-15T00:00:00.000Z",
  },
  {
    id: "14",
    nameAr: "LP — أزياء",
    nameEn: "LP — Fashion",
    descriptionAr: "تصميم ثيم سلة مخصص وإطلاق تسويقي لعلامة LP",
    descriptionEn: "Custom Salla theme & marketing launch for LP brand",
    category: "salla",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    url: "#",
    featured: false,
    order: 14,
    createdAt: "2024-08-01T00:00:00.000Z",
  },
  {
    id: "15",
    nameAr: "متجر العطور الفاخرة",
    nameEn: "Luxury Perfume Store",
    descriptionAr: "تصميم متجر سلة لمجموعة عطور شرقية فاخرة",
    descriptionEn: "Salla store design for a luxury oriental perfume collection",
    category: "salla",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80",
    url: "#",
    featured: false,
    order: 15,
    createdAt: "2024-08-15T00:00:00.000Z",
  },
  {
    id: "16",
    nameAr: "تطبيق خدمات منزلية",
    nameEn: "Home Services App",
    descriptionAr: "تطوير تطبيق ويب لخدمات صيانة وتنظيف المنازل",
    descriptionEn: "Web app development for home maintenance & cleaning services",
    category: "websites",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    url: "https://www.mrsool.sa",
    featured: false,
    order: 16,
    createdAt: "2024-09-01T00:00:00.000Z",
  },
  {
    id: "17",
    nameAr: "متجر التمور الفاخرة",
    nameEn: "Premium Dates Store",
    descriptionAr: "متجر سلة متكامل مع حملة تسويقية لتمور فاخرة سعودية",
    descriptionEn: "Full Salla store + marketing campaign for premium Saudi dates",
    category: "salla",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
    url: "#",
    featured: false,
    order: 17,
    createdAt: "2024-09-15T00:00:00.000Z",
  },
  {
    id: "18",
    nameAr: "علامة العبايات الفاخرة",
    nameEn: "Luxury Abaya Brand",
    descriptionAr: "هوية بصرية وثيم سلة مخصص لعلامة عبايات فاخرة",
    descriptionEn: "Brand identity & custom Salla theme for a luxury abaya brand",
    category: "branding",
    image: "https://images.unsplash.com/photo-1583394293869-55b27ba4dc4f?w=800&q=80",
    url: "#",
    featured: false,
    order: 18,
    createdAt: "2024-10-01T00:00:00.000Z",
  },
  {
    id: "19",
    nameAr: "حملة سناب شات",
    nameEn: "Snapchat Campaign",
    descriptionAr: "إدارة حملة سناب شات بميزانية 50 ألف ريال لمتجر إلكتروني",
    descriptionEn: "Snapchat campaign management with 50K SAR budget for e-store",
    category: "marketing",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    url: "#",
    featured: false,
    order: 19,
    createdAt: "2024-10-15T00:00:00.000Z",
  },
  {
    id: "20",
    nameAr: "متجر المنتجات الطبيعية",
    nameEn: "Natural Products Store",
    descriptionAr: "تصميم وإطلاق متجر سلة لمنتجات طبيعية وعضوية",
    descriptionEn: "Design & launch of Salla store for natural & organic products",
    category: "salla",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    url: "#",
    featured: false,
    order: 20,
    createdAt: "2024-11-01T00:00:00.000Z",
  },
  {
    id: "21",
    nameAr: "موقع شركة تقنية",
    nameEn: "Tech Company Website",
    descriptionAr: "موقع احترافي لشركة تقنية سعودية مع لوحة تحكم مخصصة",
    descriptionEn: "Professional website for Saudi tech company with custom dashboard",
    category: "websites",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    url: "https://www.stc.com.sa",
    featured: false,
    order: 21,
    createdAt: "2024-11-15T00:00:00.000Z",
  },
  {
    id: "22",
    nameAr: "متجر الملابس الرياضية",
    nameEn: "Sportswear Store",
    descriptionAr: "تصميم متجر سلة لعلامة ملابس رياضية سعودية ناشئة",
    descriptionEn: "Salla store design for emerging Saudi sportswear brand",
    category: "salla",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    url: "#",
    featured: false,
    order: 22,
    createdAt: "2024-12-01T00:00:00.000Z",
  },
  {
    id: "23",
    nameAr: "هوية مطعم فاخر",
    nameEn: "Luxury Restaurant Identity",
    descriptionAr: "هوية بصرية كاملة لمطعم فاخر في الرياض",
    descriptionEn: "Complete visual identity for a luxury restaurant in Riyadh",
    category: "branding",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    url: "#",
    featured: false,
    order: 23,
    createdAt: "2024-12-15T00:00:00.000Z",
  },
  {
    id: "24",
    nameAr: "حملة انستغرام وتيك توك",
    nameEn: "Instagram & TikTok Campaign",
    descriptionAr: "حملة محتوى شهرية على انستغرام وتيك توك لعلامة أزياء",
    descriptionEn: "Monthly content campaign on Instagram & TikTok for fashion brand",
    category: "marketing",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3037e8aa?w=800&q=80",
    url: "#",
    featured: false,
    order: 24,
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "25",
    nameAr: "متجر الإلكترونيات",
    nameEn: "Electronics Store",
    descriptionAr: "تصميم وإعداد متجر سلة لبيع الإلكترونيات والأجهزة الذكية",
    descriptionEn: "Design & setup of Salla store for electronics & smart devices",
    category: "salla",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    url: "#",
    featured: false,
    order: 25,
    createdAt: "2025-01-15T00:00:00.000Z",
  },
];

export const articlesDB = {
  getAll: () => redisGet<Article[]>("articles", SAMPLE_ARTICLES),
  getById: async (id: string) => {
    const all = await redisGet<Article[]>("articles", SAMPLE_ARTICLES);
    return all.find((a) => a.id === id);
  },
  create: async (article: Omit<Article, "id" | "createdAt" | "updatedAt">) => {
    const all = await redisGet<Article[]>("articles", SAMPLE_ARTICLES);
    const newArticle: Article = {
      ...article,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await redisSet("articles", [newArticle, ...all]);
    return newArticle;
  },
  update: async (id: string, updates: Partial<Article>) => {
    const all = await redisGet<Article[]>("articles", SAMPLE_ARTICLES);
    const updated = all.map((a) =>
      a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a
    );
    await redisSet("articles", updated);
    return updated.find((a) => a.id === id);
  },
  delete: async (id: string) => {
    const all = await redisGet<Article[]>("articles", SAMPLE_ARTICLES);
    await redisSet("articles", all.filter((a) => a.id !== id));
  },
};

export const projectsDB = {
  getAll: () => redisGet<Project[]>("projects", SAMPLE_PROJECTS),
  getById: async (id: string) => {
    const all = await redisGet<Project[]>("projects", SAMPLE_PROJECTS);
    return all.find((p) => p.id === id);
  },
  create: async (project: Omit<Project, "id" | "createdAt">) => {
    const all = await redisGet<Project[]>("projects", SAMPLE_PROJECTS);
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    await redisSet("projects", [...all, newProject]);
    return newProject;
  },
  update: async (id: string, updates: Partial<Project>) => {
    const all = await redisGet<Project[]>("projects", SAMPLE_PROJECTS);
    const updated = all.map((p) => (p.id === id ? { ...p, ...updates } : p));
    await redisSet("projects", updated);
    return updated.find((p) => p.id === id);
  },
  delete: async (id: string) => {
    const all = await redisGet<Project[]>("projects", SAMPLE_PROJECTS);
    await redisSet("projects", all.filter((p) => p.id !== id));
  },
};

export const messagesDB = {
  getAll: () => redisGet<Message[]>("messages", []),
  create: async (message: Omit<Message, "id" | "createdAt" | "status">) => {
    const all = await redisGet<Message[]>("messages", []);
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      status: "new",
      createdAt: new Date().toISOString(),
    };
    await redisSet("messages", [newMessage, ...all]);
    return newMessage;
  },
  update: async (id: string, status: Message["status"]) => {
    const all = await redisGet<Message[]>("messages", []);
    await redisSet("messages", all.map((m) => (m.id === id ? { ...m, status } : m)));
  },
  delete: async (id: string) => {
    const all = await redisGet<Message[]>("messages", []);
    await redisSet("messages", all.filter((m) => m.id !== id));
  },
};

// ── Auto-increment counter via Redis INCR ─────────────────────────────────────
async function redisIncr(key: string): Promise<number> {
  if (!REDIS_URL || !REDIS_TOKEN) return Date.now();
  try {
    const res = await fetch(`${REDIS_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([["INCR", key]]),
      cache: "no-store",
    });
    const data = await res.json();
    return data[0]?.result ?? 1;
  } catch {
    return 1;
  }
}

// ── Invoice ───────────────────────────────────────────────────────────────────
export interface InvoiceItem {
  id: string;
  descAr: string;
  descEn: string;
  qty: number;
  unitPrice: number;
  total: number;
}

// Payment method types
export type PaymentMethodType = "bank" | "western_union" | "paypal" | "cash" | "instapay" | "vodafone_cash";

export interface PaymentMethod {
  type: PaymentMethodType;
  // Bank Transfer
  bankName?: string;
  iban?: string;
  accountHolder?: string;
  accountNumber?: string;
  swiftCode?: string;
  // Western Union / Money Transfer
  receiverName?: string;
  receiverCountry?: string;
  receiverCity?: string;
  receiverPhone?: string;
  // PayPal
  paypalEmail?: string;
  // Vodafone Cash / InstaPay
  walletNumber?: string;
  walletHolder?: string;
}

// Previous payment record
export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  method: PaymentMethodType;
  transferNumber?: string; // رقم الحوالة
  notes?: string;
}

// Additional costs (hosting, fees, etc.)
export interface AdditionalCost {
  id: string;
  descAr: string;
  descEn?: string;
  amount: number;
  type: "hosting" | "domain" | "fee" | "other";
}

export interface Invoice {
  id: string;
  number: string;
  template: "classic" | "modern" | "minimal";
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany?: string;
  items: InvoiceItem[];
  subtotal: number;
  vatRate: number;
  vat: number;
  total: number;
  currency: "SAR" | "USD" | "EGP" | "EUR";
  status: "draft" | "sent" | "paid" | "partial" | "cancelled";
  issueDate: string;
  dueDate: string;
  notes?: string;
  notesAr?: string;
  
  // Legacy bank fields (kept for compatibility)
  bankName?: string;
  iban?: string;
  accountHolder?: string;
  
  // New payment methods system
  paymentMethods?: PaymentMethod[];
  selectedPaymentMethod?: PaymentMethodType;
  
  // Payment history
  payments?: PaymentRecord[];
  totalPaid?: number;
  remainingBalance?: number;
  
  // Additional costs
  additionalCosts?: AdditionalCost[];
  additionalCostsTotal?: number;
  
  // Related invoices (for tracking)
  relatedInvoices?: string[]; // Invoice numbers
  parentInvoice?: string; // If this is a follow-up invoice
  
  createdAt: string;
  updatedAt: string;
}

export const invoicesDB = {
  getAll: () => redisGet<Invoice[]>("invoices", []),
  getById: async (id: string) => {
    const all = await redisGet<Invoice[]>("invoices", []);
    return all.find((inv) => inv.id === id);
  },
  create: async (data: Omit<Invoice, "id" | "number" | "createdAt" | "updatedAt">) => {
    const all = await redisGet<Invoice[]>("invoices", []);
    const year = new Date().getFullYear();
    const counter = await redisIncr(`invoice_counter_${year}`);
    const newInvoice: Invoice = {
      ...data,
      id: Date.now().toString(),
      number: `INV-${year}-${String(counter).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await redisSet("invoices", [newInvoice, ...all]);
    return newInvoice;
  },
  update: async (id: string, updates: Partial<Invoice>) => {
    const all = await redisGet<Invoice[]>("invoices", []);
    const updated = all.map((inv) =>
      inv.id === id ? { ...inv, ...updates, updatedAt: new Date().toISOString() } : inv
    );
    await redisSet("invoices", updated);
    return updated.find((inv) => inv.id === id);
  },
  delete: async (id: string) => {
    const all = await redisGet<Invoice[]>("invoices", []);
    await redisSet("invoices", all.filter((inv) => inv.id !== id));
  },
};

// ── Contract ──────────────────────────────────────────────────────────────────
export interface Contract {
  id: string;
  number: string;
  type: "service-agreement" | "maintenance" | "marketing" | "custom";

  // ── الطرف الأول (Service Provider) ─────────────────────────────────────────
  providerType?: "institution" | "individual-saudi" | "individual-expat";
  providerEntityName?: string;   // اسم المؤسسة / الشركة
  providerOwnerName?: string;    // اسم المالك / الممثل القانوني
  providerFullName?: string;     // الاسم الكامل (للأفراد)
  providerNationalId?: string;   // رقم الهوية الوطنية
  providerIqama?: string;        // رقم الإقامة
  providerIqamaExpiry?: string;  // تاريخ انتهاء الإقامة
  providerFreelanceDoc?: string; // رقم وثيقة العمل الحر
  providerCR?: string;           // رقم السجل التجاري
  providerVAT?: string;          // رقم ضريبة القيمة المضافة
  providerProfession?: string;   // المهنة / النشاط
  providerPhone?: string;
  providerEmail?: string;
  providerAddress?: string;
  providerCity?: string;

  // ── الطرف الثاني (Client) ───────────────────────────────────────────────────
  clientType?: "individual" | "institution";
  clientName: string;
  clientNationalId?: string;
  clientIqama?: string;          // رقم إقامة العميل
  clientCR?: string;             // سجل تجاري العميل
  clientVAT?: string;            // رقم ضريبة القيمة المضافة العميل
  clientPhone: string;
  clientEmail: string;
  clientAddress?: string;
  clientCompany?: string;        // اسم مؤسسة / شركة العميل

  // ── الخدمة ──────────────────────────────────────────────────────────────────
  serviceTitle: string;
  serviceTitleAr: string;
  serviceDescription: string;
  serviceDescriptionAr: string;

  // ── المالية ─────────────────────────────────────────────────────────────────
  totalAmount: number;
  paymentTerms: "full" | "50-50" | "3-installments" | "custom";
  paymentNotes?: string;
  revisions?: number;            // عدد جولات المراجعة
  penaltyPerDay?: number;        // غرامة التأخير اليومية (ريال)

  // ── التنفيذ ─────────────────────────────────────────────────────────────────
  startDate: string;
  deliveryDays: number;
  deliverables: string[];

  // ── القانوني ────────────────────────────────────────────────────────────────
  jurisdiction: string;
  useArbitration?: boolean;      // true = SCCA التحكيم، false = المحاكم التجارية

  status: "draft" | "active" | "completed" | "terminated";
  createdAt: string;
  updatedAt: string;
}

export const contractsDB = {
  getAll: () => redisGet<Contract[]>("contracts", []),
  getById: async (id: string) => {
    const all = await redisGet<Contract[]>("contracts", []);
    return all.find((c) => c.id === id);
  },
  create: async (data: Omit<Contract, "id" | "number" | "createdAt" | "updatedAt">) => {
    const all = await redisGet<Contract[]>("contracts", []);
    const year = new Date().getFullYear();
    const counter = await redisIncr(`contract_counter_${year}`);
    const newContract: Contract = {
      ...data,
      id: Date.now().toString(),
      number: `CTR-${year}-${String(counter).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await redisSet("contracts", [newContract, ...all]);
    return newContract;
  },
  update: async (id: string, updates: Partial<Contract>) => {
    const all = await redisGet<Contract[]>("contracts", []);
    const updated = all.map((c) =>
      c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
    );
    await redisSet("contracts", updated);
    return updated.find((c) => c.id === id);
  },
  delete: async (id: string) => {
    const all = await redisGet<Contract[]>("contracts", []);
    await redisSet("contracts", all.filter((c) => c.id !== id));
  },
};
