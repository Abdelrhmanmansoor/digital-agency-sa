/* ══════════════════════════════════════════════════════════════════════
   SidraCommandInterpreter — محرّك أوامر محلي بالكامل

   لا نموذج ذكاء اصطناعي ولا API خارجي. المنطق قواعد صريحة:
   تطبيع النص العربي، مطابقة مرادفات، مسافة تحرير للأخطاء الإملائية
   البسيطة، ثم استخراج القيم (لون / مقاس / جهاز / صفحة).

   المخرج دائمًا يحمل درجة ثقة وقائمة بما ينقص، فالواجهة تقرر:
   تولّد كودًا أم تسأل سؤالًا.
   ══════════════════════════════════════════════════════════════════════ */

import {
  SIDRA_COMPONENTS, SIDRA_INTENTS, PAGE_SCOPES,
  type SidraComponent, type SidraIntent, type DeviceScope, type PageScope,
} from "./registry";

/* ─── تطبيع عربي ─────────────────────────────────────────────────────── */
export function normalizeAr(input: string): string {
  return input
    .toLowerCase()
    .replace(/[ً-ْـ]/g, "")   // تشكيل وتطويل
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[^\p{L}\p{N}#.\-_%\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* مسافة تحرير محدودة — تكفي لخطأ إملائي واحد أو حرف مفقود */
function editDistance(a: string, b: string, max = 2): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let last = prev[0];
    prev[0] = i;
    let best = prev[0];
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, last + (a[i - 1] === b[j - 1] ? 0 : 1));
      last = tmp;
      if (prev[j] < best) best = prev[j];
    }
    if (best > max) return max + 1;
  }
  return prev[b.length];
}

/** هل يحتوي النص على المصطلح، أو على تحريف بسيط منه؟ */
function fuzzyHas(haystack: string, needle: string): boolean {
  const n = normalizeAr(needle);
  if (!n) return false;
  if (haystack.includes(n)) return true;
  if (n.length < 5) return false;               // الكلمات القصيرة لا تُقارب
  const tol = n.length >= 8 ? 2 : 1;
  return haystack.split(" ").some((w) => w.length >= 4 && editDistance(w, n, tol) <= tol);
}

/* ─── الألوان ────────────────────────────────────────────────────────── */
const NAMED_COLORS: Record<string, string> = {
  "اسود": "#000000", "ابيض": "#ffffff", "احمر": "#d32f2f", "اخضر": "#2e7d32",
  "ازرق": "#1565c0", "اصفر": "#f9a825", "برتقالي": "#ef6c00", "بنفسجي": "#6a1b9a",
  "رمادي": "#616161", "بني": "#5d4037", "ذهبي": "#b1781b", "وردي": "#d81b60",
  "بيج": "#e8ded0", "كحلي": "#1a237e", "تركوازي": "#00838f", "فضي": "#bdbdbd",
  black: "#000000", white: "#ffffff", red: "#d32f2f", green: "#2e7d32",
  blue: "#1565c0", gold: "#b1781b", gray: "#616161", grey: "#616161",
};

/** كل الألوان بترتيب ورودها — «الفوتر أسود والنص أبيض» أمر مركّب شائع
 *  ولا يصح أن نأخذ أول لون ونتجاهل الثاني. */
export function extractAllColors(norm: string): string[] {
  const out: Array<{ at: number; value: string }> = [];
  for (const m of norm.matchAll(/#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})\b/gi)) {
    out.push({ at: m.index ?? 0, value: m[0] });
  }
  for (const m of norm.matchAll(/rgba?\(\s*[\d.\s,%/]+\)/gi)) {
    out.push({ at: m.index ?? 0, value: m[0] });
  }
  for (const [name, value] of Object.entries(NAMED_COLORS)) {
    const n = normalizeAr(name);
    const at = norm.indexOf(n);
    if (at >= 0) out.push({ at, value });
  }
  return out.sort((a, b) => a.at - b.at).map((x) => x.value).filter((v, i, a) => a.indexOf(v) === i);
}

export function extractColor(norm: string): string | null {
  return extractAllColors(norm)[0] ?? null;
}

/* ─── المقاسات ───────────────────────────────────────────────────────── */
export function extractSize(norm: string): string | null {
  const withUnit = norm.match(/(\d+(?:\.\d+)?)\s*(px|rem|em|%|vh|vw)\b/);
  if (withUnit) return `${withUnit[1]}${withUnit[2]}`;
  const bare = norm.match(/(?:^|\s)(\d{1,4})(?:\s|$)/);
  if (bare) return `${bare[1]}px`;              // رقم مجرّد = بكسل، وهو الأشيع
  return null;
}

/* ─── النطاق ─────────────────────────────────────────────────────────── */
export function extractDevice(norm: string): DeviceScope {
  const mobile = ["الجوال", "الموبايل", "الهاتف", "mobile", "phone"].some((w) => fuzzyHas(norm, w));
  const desktop = ["الكمبيوتر", "سطح المكتب", "اللاب", "الشاشه الكبيره", "desktop"].some((w) => fuzzyHas(norm, w));
  if (mobile && !desktop) return "mobile";
  if (desktop && !mobile) return "desktop";
  return "all";
}

export function extractPage(norm: string): PageScope {
  if (["الرئيسيه", "الصفحه الرئيسيه", "home"].some((w) => fuzzyHas(norm, w))) return "home";
  if (["صفحه المنتج", "تفاصيل المنتج"].some((w) => fuzzyHas(norm, w))) return "product";
  if (["صفحه التصنيف", "التصنيف", "القسم"].some((w) => fuzzyHas(norm, w))) return "category";
  if (["السله", "العربه"].some((w) => fuzzyHas(norm, w))) return "cart";
  if (["المدونه"].some((w) => fuzzyHas(norm, w))) return "blog";
  return "all";
}

/* ─── الاتجاه: تكبير أم تصغير ────────────────────────────────────────── */
function sizeDirection(norm: string): "up" | "down" | null {
  if (["كبر", "كبّر", "زود", "وسع", "اكبر"].some((w) => fuzzyHas(norm, w))) return "up";
  if (["صغر", "صغّر", "قلل", "ضيق", "اصغر"].some((w) => fuzzyHas(norm, w))) return "down";
  return null;
}

/* ─── النتيجة ────────────────────────────────────────────────────────── */
export type Confidence = "high" | "medium" | "needsInfo" | "unsupported";

export interface Interpretation {
  raw: string;
  normalized: string;
  component: SidraComponent | null;
  part: string | null;
  intent: SidraIntent | null;
  color: string | null;
  /** اللون الثاني في أمر مركّب مثل «الفوتر أسود والنص أبيض» */
  secondColor: string | null;
  size: string | null;
  sizeDirection: "up" | "down" | null;
  device: DeviceScope;
  page: PageScope;
  confidence: Confidence;
  /** ما ينقص لتوليد الكود */
  missing: Array<"component" | "intent" | "color" | "size">;
  /** ملخص عربي لما فُهم */
  summary: string;
}

function matchComponent(norm: string): { component: SidraComponent | null; part: string | null } {
  let best: SidraComponent | null = null;
  let bestLen = 0;
  for (const c of SIDRA_COMPONENTS) {
    for (const a of c.aliases) {
      if (fuzzyHas(norm, a) && a.length > bestLen) { best = c; bestLen = a.length; }
    }
  }
  if (!best) return { component: null, part: null };

  /* هل ذكر المستخدم جزءًا داخل المكوّن؟ */
  let part: string | null = null;
  if (best.parts) {
    let pLen = 0;
    for (const [key, p] of Object.entries(best.parts)) {
      if (fuzzyHas(norm, p.label) && p.label.length > pLen) { part = key; pLen = p.label.length; }
    }
  }
  return { component: best, part };
}

function matchIntent(norm: string): SidraIntent | null {
  let best: SidraIntent | null = null;
  let bestLen = 0;
  for (const i of SIDRA_INTENTS) {
    for (const a of i.aliases) {
      if (fuzzyHas(norm, a) && a.length > bestLen) { best = i; bestLen = a.length; }
    }
  }
  return best;
}

export function interpret(raw: string): Interpretation {
  const normalized = normalizeAr(raw);
  const { component, part } = matchComponent(normalized);
  let intent = matchIntent(normalized);
  const colors = extractAllColors(normalized);
  const color = colors[0] ?? null;
  const secondColor = colors[1] ?? null;
  const size = extractSize(normalized);
  const dir = sizeDirection(normalized);

  /* لو ذُكر لون ولم تُذكر نية صريحة، فالنية الأرجح خلفية أو نص */
  if (!intent && color) {
    intent = SIDRA_INTENTS.find((i) => i.kind === (fuzzyHas(normalized, "النص") ? "textColor" : "background")) || null;
  }

  /* أمر مركّب بلونين: «الفوتر أسود والنص أبيض». كلمة «النص» وحدها ترجّح
     نيّة لون النص، فيضيع الشقّ الأول من الطلب. الأول للخلفية والثاني للنص،
     والمولّد يُخرج الاثنين. */
  if (secondColor && intent?.kind === "textColor" && !/لون النص|لون الخط/.test(normalized)) {
    intent = SIDRA_INTENTS.find((i) => i.kind === "background") || intent;
  }

  const missing: Interpretation["missing"] = [];
  /* نيّة تنشئ عنصرها بنفسها (زر العودة للأعلى مثلًا) لا تحتاج مكوّنًا مستهدفًا */
  if (!component && !intent?.selfContained) missing.push("component");
  if (!intent) missing.push("intent");
  if (intent?.needs === "color" && !color) missing.push("color");
  if (intent?.needs === "size" && !size && !dir) missing.push("size");

  let confidence: Confidence;
  if (!component && !intent) confidence = "unsupported";
  else if (missing.length) confidence = "needsInfo";
  else if (component && intent) confidence = "high";
  else confidence = "medium";

  const bits: string[] = [];
  if (intent) bits.push(intent.label);
  if (component) bits.push(`على ${part && component.parts ? component.parts[part].label : component.label}`);
  if (color) bits.push(`باللون ${color}`);
  if (size) bits.push(`بقيمة ${size}`);
  if (dir && !size) bits.push(dir === "up" ? "بتكبير" : "بتصغير");
  if (extractDevice(normalized) !== "all") bits.push(extractDevice(normalized) === "mobile" ? "للجوال فقط" : "لسطح المكتب فقط");
  if (extractPage(normalized) !== "all") bits.push(`في ${PAGE_SCOPES[extractPage(normalized) as Exclude<PageScope, "all">].label} فقط`);

  return {
    raw, normalized, component, part, intent, color, secondColor, size,
    sizeDirection: dir,
    device: extractDevice(normalized),
    page: extractPage(normalized),
    confidence, missing,
    summary: bits.length ? bits.join(" ") : "لم أتعرّف على الطلب",
  };
}
