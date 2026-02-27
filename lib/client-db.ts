// Client Dashboard — data layer (follows radar-db.ts pattern)
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

// ─── Types ────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "in_progress"
  | "review"
  | "delivered"
  | "completed"
  | "cancelled";

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  passwordHash: string;
  createdAt: string;
}

export interface DeliveredFile {
  id: string;
  name: string;
  url: string;
  type: string; // "design" | "document" | "video" | "archive" | "other"
  description?: string;
  addedAt: string;
}

export interface StatusHistoryEntry {
  status: OrderStatus;
  note?: string;
  changedAt: string;
}

export interface ServiceOrder {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  serviceType: string;
  serviceNameAr: string;
  serviceNameEn: string;
  status: OrderStatus;
  title: string;
  description: string;
  requirements: string;
  referenceLinks?: string;
  budget?: string;
  deliveredFiles: DeliveredFile[];
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
  statusHistory: StatusHistoryEntry[];
}

// ─── Users ────────────────────────────────────────────────────────────────────

export const clientUsersDB = {
  getByEmail: (email: string) =>
    redisGet<ClientUser | null>(`client:user:email:${email.toLowerCase()}`, null),

  getById: (id: string) =>
    redisGet<ClientUser | null>(`client:user:${id}`, null),

  create: async (data: Omit<ClientUser, "id" | "createdAt">): Promise<ClientUser> => {
    const user: ClientUser = {
      ...data,
      id: `cu_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    await redisSet(`client:user:${user.id}`, user);
    await redisSet(`client:user:email:${user.email.toLowerCase()}`, user);
    return user;
  },

  update: async (id: string, updates: Partial<ClientUser>): Promise<void> => {
    const user = await redisGet<ClientUser | null>(`client:user:${id}`, null);
    if (!user) return;
    const updated = { ...user, ...updates };
    await redisSet(`client:user:${id}`, updated);
    await redisSet(`client:user:email:${updated.email.toLowerCase()}`, updated);
  },
};

// ─── Orders ───────────────────────────────────────────────────────────────────

export const clientOrdersDB = {
  getAll: () => redisGet<ServiceOrder[]>("client:orders:all", []),

  getByUser: async (userId: string): Promise<ServiceOrder[]> => {
    const all = await redisGet<ServiceOrder[]>("client:orders:all", []);
    return all
      .filter((o) => o.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getById: async (id: string): Promise<ServiceOrder | null> => {
    const all = await redisGet<ServiceOrder[]>("client:orders:all", []);
    return all.find((o) => o.id === id) || null;
  },

  create: async (
    data: Omit<ServiceOrder, "id" | "createdAt" | "updatedAt" | "statusHistory" | "deliveredFiles">
  ): Promise<ServiceOrder> => {
    const all = await redisGet<ServiceOrder[]>("client:orders:all", []);
    const now = new Date().toISOString();
    const order: ServiceOrder = {
      ...data,
      id: `co_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      deliveredFiles: [],
      statusHistory: [{ status: data.status, changedAt: now }],
      createdAt: now,
      updatedAt: now,
    };
    await redisSet("client:orders:all", [order, ...all]);
    return order;
  },

  update: async (id: string, updates: Partial<ServiceOrder>): Promise<ServiceOrder | null> => {
    const all = await redisGet<ServiceOrder[]>("client:orders:all", []);
    let updated: ServiceOrder | null = null;
    const newAll = all.map((o) => {
      if (o.id !== id) return o;
      const next: ServiceOrder = {
        ...o,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      if (updates.status && updates.status !== o.status) {
        next.statusHistory = [
          ...(o.statusHistory || []),
          { status: updates.status, changedAt: new Date().toISOString(), note: updates.adminNotes },
        ];
      }
      updated = next;
      return next;
    });
    await redisSet("client:orders:all", newAll);
    return updated;
  },
};
