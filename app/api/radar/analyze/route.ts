import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getRadarSession } from "@/lib/radar-auth";
import { radarUsersDB, radarProductsDB, radarAnalysesDB } from "@/lib/radar-db";
import type { Competitor, ProfitMetrics, AnalysisResult } from "@/lib/radar-db";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Price parser (handles Arabic + Latin numerals, SAR/ريال/ر.س) ──────────
function parsePrice(raw: string): number | null {
  if (!raw) return null;
  const normalized = raw
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[,،]/g, "")
    .replace(/[^\d.]/g, " ")
    .trim()
    .split(/\s+/)[0];
  const n = parseFloat(normalized);
  return isNaN(n) || n <= 0 ? null : n;
}

// ─── Serper.dev Google Shopping call ─────────────────────────────────────────
async function fetchCompetitorPrices(query: string): Promise<Competitor[]> {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch("https://google.serper.dev/shopping", {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: query, gl: "sa", hl: "ar", num: 10 }),
    });

    if (!res.ok) return [];
    const data = await res.json();
    const items: Competitor[] = [];

    for (const item of data.shopping || []) {
      const price = parsePrice(item.price || "");
      if (!price) continue;
      items.push({
        store: item.source || "متجر",
        title: item.title || query,
        price,
        link: item.link || "#",
        diff: 0, // calculated later
      });
    }

    return items;
  } catch (e) {
    console.error("Serper error:", e);
    return [];
  }
}

// ─── Profit calculations ──────────────────────────────────────────────────────
function calcProfitMetrics(
  userPrice: number,
  userCost: number,
  shipping: number,
  returnRate: number
): ProfitMetrics {
  const grossMargin = userPrice - userCost - shipping;
  const grossMarginPct = (grossMargin / userPrice) * 100;
  const returnCost = (returnRate / 100) * (shipping * 2 + userCost * 0.1);
  const trueMargin = grossMargin - returnCost;
  const breakevenRoas = trueMargin > 0 ? userPrice / trueMargin : 99;
  const maxCpa = trueMargin > 0 ? trueMargin * 0.5 : 0;

  let verdict: ProfitMetrics["verdict"] = "profitable";
  if (trueMargin < 0) verdict = "loss";
  else if (trueMargin / userPrice < 0.1) verdict = "marginal";

  return {
    grossMargin: Math.round(grossMargin * 100) / 100,
    grossMarginPct: Math.round(grossMarginPct * 10) / 10,
    trueMargin: Math.round(trueMargin * 100) / 100,
    breakevenRoas: Math.round(breakevenRoas * 10) / 10,
    maxCpa: Math.round(maxCpa * 100) / 100,
    verdict,
  };
}

// ─── AI insight (Arabic) ──────────────────────────────────────────────────────
async function generateInsight(params: {
  productName: string;
  userPrice: number;
  marketAvg: number;
  marketMin: number;
  competitors: Competitor[];
  profitMetrics: ProfitMetrics;
}): Promise<string> {
  const { productName, userPrice, marketAvg, marketMin, competitors, profitMetrics } = params;
  const topCompetitors = competitors.slice(0, 3).map(c => `${c.store}: ${c.price}ر`).join("، ");

  try {
    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `أنت محلل تجارة إلكترونية خبير بالسوق السعودي. اكتب تحليلاً موجزاً (3-4 جمل فقط) باللغة العربية السعودية العامية عن هذا الموقف التسويقي:

المنتج: ${productName}
سعر البائع: ${userPrice} ريال
متوسط السوق: ${marketAvg} ريال
أرخص منافس: ${marketMin} ريال
أبرز المنافسين: ${topCompetitors || "لا توجد بيانات"}
الهامش الحقيقي: ${profitMetrics.trueMargin} ريال
ROAS المطلوب: ${profitMetrics.breakevenRoas}x
الحكم: ${profitMetrics.verdict === "profitable" ? "مربح" : profitMetrics.verdict === "marginal" ? "هامش ضعيف" : "خسارة"}

قدّم توصية عملية مباشرة بدون مقدمات. لا تستخدم نقاط أو أرقام. جملة واحدة للموقف وجملة واحدة أو اثنتان للتوصية.`,
        },
      ],
    });

    const content = msg.content[0];
    return content.type === "text" ? content.text : "تعذّر توليد التحليل.";
  } catch (e) {
    console.error("Anthropic error:", e);
    return "تعذّر توليد التحليل في الوقت الحالي.";
  }
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const user = await getRadarSession();
    if (!user) {
      return NextResponse.json({ error: "يجب تسجيل الدخول أولاً" }, { status: 401 });
    }

    const { productId, productName, userPrice, userCost, shipping, returnRate, category } =
      await req.json();

    if (!productName || !userPrice || !userCost) {
      return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
    }

    const price = Number(userPrice);
    const cost = Number(userCost);
    const ship = Number(shipping) || 0;
    const ret = Number(returnRate) || 5;

    // 1. Fetch competitor prices
    const rawCompetitors = await fetchCompetitorPrices(productName);

    // 2. Calculate price diff for each competitor
    const competitors: Competitor[] = rawCompetitors.map((c) => ({
      ...c,
      diff: Math.round(((c.price - price) / price) * 100),
    }));

    // 3. Market stats
    const prices = competitors.map((c) => c.price).filter((p) => p > 0);
    const marketMin = prices.length ? Math.min(...prices) : price;
    const marketMax = prices.length ? Math.max(...prices) : price;
    const marketAvg = prices.length
      ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
      : price;

    const avgDiff = prices.length
      ? Math.round(((price - marketAvg) / marketAvg) * 100)
      : 0;
    const userPricePosition: AnalysisResult["userPricePosition"] =
      avgDiff > 10 ? "expensive" : avgDiff < -10 ? "cheap" : "average";

    // 4. Profit metrics
    const profitMetrics = calcProfitMetrics(price, cost, ship, ret);

    // 5. AI insight
    const aiInsight = await generateInsight({
      productName,
      userPrice: price,
      marketAvg,
      marketMin,
      competitors,
      profitMetrics,
    });

    // 6. Save result
    const result: AnalysisResult = {
      id: `a_${Date.now()}`,
      productId: productId || "manual",
      userId: user.id,
      competitors,
      marketMin,
      marketMax,
      marketAvg,
      userPricePosition,
      userPriceDiff: avgDiff,
      profitMetrics,
      aiInsight,
      createdAt: new Date().toISOString(),
    };

    await radarAnalysesDB.save(result);
    await radarUsersDB.incrementAnalysis(user.id);
    if (productId && productId !== "manual") {
      await radarProductsDB.markAnalyzed(user.id, productId);
    }

    return NextResponse.json({ success: true, result });
  } catch (e) {
    console.error("Analyze error:", e);
    return NextResponse.json({ error: "حدث خطأ في التحليل، حاول مرة أخرى" }, { status: 500 });
  }
}
