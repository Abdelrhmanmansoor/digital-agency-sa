/* ══════════════════════════════════════════════════════════════════════
   SidraHistoryManager + SidraStoreContext

   كل شيء داخل المتصفح: لا يُرسل أي بيان إلى خادم. التخزين في
   localStorage تحت مفتاحين فقط، مع حدّ لعدد السجلات حتى لا ينتفخ.
   ══════════════════════════════════════════════════════════════════════ */

export interface StoreContext {
  primaryColor: string;
  secondaryColor: string;
  themeMode: "light" | "dark" | "auto";
  direction: "rtl" | "ltr";
}

export const DEFAULT_CONTEXT: StoreContext = {
  primaryColor: "#b1781b",
  secondaryColor: "#211711",
  themeMode: "auto",
  direction: "rtl",
};

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  /** يُرفق بردود المساعد التي ولّدت كودًا */
  codeId?: string;
  /** أزرار خيارات يعرضها المساعد حين ينقصه شيء */
  options?: Array<{ label: string; value: string }>;
  askFor?: "color" | "size";
  at: number;
}

export interface HistoryEntry {
  id: string;
  request: string;
  component: string;
  intent: string;
  css: string;
  js: string;
  explanation: string;
  install: string[];
  warnings: string[];
  copied: boolean;
  applied: boolean;
  at: number;
}

const K_CHAT = "sidra.assistant.chat.v1";
const K_HIST = "sidra.assistant.history.v1";
const K_CTX = "sidra.assistant.context.v1";
const MAX_CHAT = 60;
const MAX_HIST = 40;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;                 // وضع التصفّح الخاص أو تخزين ممتلئ
  }
}

function write(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* تجاهل بصمت: فشل الحفظ لا يجوز أن يكسر الواجهة */
  }
}

export const store = {
  loadChat: (): ChatMessage[] => read<ChatMessage[]>(K_CHAT, []),
  saveChat: (m: ChatMessage[]) => write(K_CHAT, m.slice(-MAX_CHAT)),
  loadHistory: (): HistoryEntry[] => read<HistoryEntry[]>(K_HIST, []),
  saveHistory: (h: HistoryEntry[]) => write(K_HIST, h.slice(-MAX_HIST)),
  loadContext: (): StoreContext => ({ ...DEFAULT_CONTEXT, ...read<Partial<StoreContext>>(K_CTX, {}) }),
  saveContext: (c: StoreContext) => write(K_CTX, c),
  clearAll: () => {
    if (typeof window === "undefined") return;
    try {
      [K_CHAT, K_HIST].forEach((k) => window.localStorage.removeItem(k));
    } catch { /* لا شيء */ }
  },
};

export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
