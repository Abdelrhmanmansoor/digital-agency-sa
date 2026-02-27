// Radar — data layer built on existing Upstash Redis pattern
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisGet<T>(key: string, fallback: T): Promise<T> {
  if (!REDIS_URL || !REDIS_TOKEN) return fallback;
  try {
    const res = await fetch(`${REDIS_URL}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
      cache: "no-store",
    });
    const data = await res.json();
    if (!data.result) return fallback;
    return JSON.parse(data.result) as T;
  } catch {
    return fallback;
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

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RadarUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  storeName?: string;
  plan: "free";
  analysisCount: number;
  createdAt: string;
}

export interface TrackedProduct {
  id: string;
  userId: string;
  name: string;
  category: string;
  userPrice: number;   // سعر البيع
  userCost: number;    // التكلفة
  shipping: number;    // الشحن
  returnRate: number;  // نسبة الإرجاع %
  addedAt: string;
  lastAnalyzedAt?: string;
}

export interface Competitor {
  store: string;
  title: string;
  price: number;
  link: string;
  diff: number;        // % difference from userPrice
}

export interface ProfitMetrics {
  grossMargin: number;          // الهامش الإجمالي ريال
  grossMarginPct: number;       // الهامش %
  trueMargin: number;           // الهامش الحقيقي بعد الإرجاع
  breakevenRoas: number;        // ROAS المطلوب للتعادل
  maxCpa: number;               // أقصى تكلفة اكتساب مسموحة
  verdict: "profitable" | "marginal" | "loss";
}

export interface AnalysisResult {
  id: string;
  productId: string;
  userId: string;
  competitors: Competitor[];
  marketMin: number;
  marketMax: number;
  marketAvg: number;
  userPricePosition: "cheap" | "average" | "expensive";
  userPriceDiff: number;        // % vs market avg
  profitMetrics: ProfitMetrics;
  aiInsight: string;            // Arabic AI analysis
  createdAt: string;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export const radarUsersDB = {
  getByEmail: (email: string) =>
    redisGet<RadarUser | null>(`radar:user:email:${email.toLowerCase()}`, null),

  getById: (id: string) =>
    redisGet<RadarUser | null>(`radar:user:${id}`, null),

  create: async (data: Omit<RadarUser, "id" | "createdAt" | "analysisCount" | "plan">): Promise<RadarUser> => {
    const user: RadarUser = {
      ...data,
      id: `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      plan: "free",
      analysisCount: 0,
      createdAt: new Date().toISOString(),
    };
    await redisSet(`radar:user:${user.id}`, user);
    await redisSet(`radar:user:email:${user.email.toLowerCase()}`, user);
    return user;
  },

  update: async (id: string, updates: Partial<RadarUser>): Promise<void> => {
    const user = await redisGet<RadarUser | null>(`radar:user:${id}`, null);
    if (!user) return;
    const updated = { ...user, ...updates };
    await redisSet(`radar:user:${id}`, updated);
    await redisSet(`radar:user:email:${updated.email.toLowerCase()}`, updated);
  },

  incrementAnalysis: async (id: string): Promise<void> => {
    const user = await redisGet<RadarUser | null>(`radar:user:${id}`, null);
    if (!user) return;
    await radarUsersDB.update(id, { analysisCount: (user.analysisCount || 0) + 1 });
  },
};

// ─── Products ─────────────────────────────────────────────────────────────────

export const radarProductsDB = {
  getAll: (userId: string) =>
    redisGet<TrackedProduct[]>(`radar:products:${userId}`, []),

  create: async (data: Omit<TrackedProduct, "id" | "addedAt">): Promise<TrackedProduct> => {
    const products = await redisGet<TrackedProduct[]>(`radar:products:${data.userId}`, []);
    const product: TrackedProduct = {
      ...data,
      id: `p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      addedAt: new Date().toISOString(),
    };
    await redisSet(`radar:products:${data.userId}`, [product, ...products]);
    return product;
  },

  delete: async (userId: string, productId: string): Promise<void> => {
    const products = await redisGet<TrackedProduct[]>(`radar:products:${userId}`, []);
    await redisSet(`radar:products:${userId}`, products.filter(p => p.id !== productId));
  },

  markAnalyzed: async (userId: string, productId: string): Promise<void> => {
    const products = await redisGet<TrackedProduct[]>(`radar:products:${userId}`, []);
    const updated = products.map(p =>
      p.id === productId ? { ...p, lastAnalyzedAt: new Date().toISOString() } : p
    );
    await redisSet(`radar:products:${userId}`, updated);
  },
};

// ─── Analyses ─────────────────────────────────────────────────────────────────

export const radarAnalysesDB = {
  getLatestForProduct: (productId: string) =>
    redisGet<AnalysisResult | null>(`radar:analysis:latest:${productId}`, null),

  getHistory: (userId: string) =>
    redisGet<AnalysisResult[]>(`radar:analyses:${userId}`, []),

  save: async (result: AnalysisResult): Promise<void> => {
    // Save as latest for this product
    await redisSet(`radar:analysis:latest:${result.productId}`, result);
    // Append to user history (keep last 50)
    const history = await redisGet<AnalysisResult[]>(`radar:analyses:${result.userId}`, []);
    const updated = [result, ...history].slice(0, 50);
    await redisSet(`radar:analyses:${result.userId}`, updated);
  },
};
