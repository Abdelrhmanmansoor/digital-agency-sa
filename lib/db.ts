import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readData<T>(filename: string, defaultValue: T): T {
  ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return defaultValue;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return defaultValue;
  }
}

function writeData<T>(filename: string, data: T): void {
  ensureDir();
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2), "utf-8");
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
  getAll: (): Article[] => readData<Article[]>("articles.json", SAMPLE_ARTICLES),
  getById: (id: string) => articlesDB.getAll().find((a) => a.id === id),
  create: (article: Omit<Article, "id" | "createdAt" | "updatedAt">) => {
    const all = articlesDB.getAll();
    const newArticle: Article = { ...article, id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    writeData("articles.json", [newArticle, ...all]);
    return newArticle;
  },
  update: (id: string, updates: Partial<Article>) => {
    const all = articlesDB.getAll().map((a) => a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a);
    writeData("articles.json", all);
    return all.find((a) => a.id === id);
  },
  delete: (id: string) => { writeData("articles.json", articlesDB.getAll().filter((a) => a.id !== id)); },
};

export const projectsDB = {
  getAll: (): Project[] => readData<Project[]>("projects.json", SAMPLE_PROJECTS),
  getById: (id: string) => projectsDB.getAll().find((p) => p.id === id),
  create: (project: Omit<Project, "id" | "createdAt">) => {
    const all = projectsDB.getAll();
    const newProject: Project = { ...project, id: Date.now().toString(), createdAt: new Date().toISOString() };
    writeData("projects.json", [...all, newProject]);
    return newProject;
  },
  update: (id: string, updates: Partial<Project>) => {
    const all = projectsDB.getAll().map((p) => p.id === id ? { ...p, ...updates } : p);
    writeData("projects.json", all);
    return all.find((p) => p.id === id);
  },
  delete: (id: string) => { writeData("projects.json", projectsDB.getAll().filter((p) => p.id !== id)); },
};

export const messagesDB = {
  getAll: (): Message[] => readData<Message[]>("messages.json", []),
  create: (message: Omit<Message, "id" | "createdAt" | "status">) => {
    const all = messagesDB.getAll();
    const newMessage: Message = { ...message, id: Date.now().toString(), status: "new", createdAt: new Date().toISOString() };
    writeData("messages.json", [newMessage, ...all]);
    return newMessage;
  },
  update: (id: string, status: Message["status"]) => {
    writeData("messages.json", messagesDB.getAll().map((m) => m.id === id ? { ...m, status } : m));
  },
  delete: (id: string) => { writeData("messages.json", messagesDB.getAll().filter((m) => m.id !== id)); },
};
