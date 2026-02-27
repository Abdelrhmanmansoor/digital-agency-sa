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
    nameAr: "TF1ONE",
    nameEn: "TF1ONE",
    descriptionAr: "منصة تسوق إلكترونية فاخرة",
    descriptionEn: "Luxury e-commerce platform",
    category: "salla",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    url: "https://www.tf1one.com/",
    featured: true,
    order: 1,
    createdAt: "2024-12-01T00:00:00.000Z",
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
