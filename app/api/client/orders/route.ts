import { NextRequest, NextResponse } from "next/server";
import { getClientSession } from "@/lib/client-auth";
import { clientOrdersDB } from "@/lib/client-db";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const VALID_SERVICE_TYPES = new Set([
  "salla-design", "store-launch", "store-management", "brand-identity",
  "social-media", "digital-marketing", "content-creation", "custom",
]);

const SERVICE_NAMES: Record<string, { ar: string; en: string }> = {
  "salla-design":      { ar: "تصميم متجر سلة",       en: "Salla Store Design" },
  "store-launch":      { ar: "تأسيس متجر إلكتروني",  en: "E-Commerce Launch" },
  "store-management":  { ar: "إدارة المتجر",          en: "Store Management" },
  "brand-identity":    { ar: "هوية بصرية",            en: "Brand Identity" },
  "social-media":      { ar: "سوشيال ميديا",          en: "Social Media" },
  "digital-marketing": { ar: "تسويق رقمي",            en: "Digital Marketing" },
  "content-creation":  { ar: "إنتاج محتوى",           en: "Content Creation" },
  "custom":            { ar: "خدمة مخصصة",            en: "Custom Service" },
};

export async function GET() {
  const user = await getClientSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const orders = await clientOrdersDB.getByUser(user.id);
  return NextResponse.json({ orders });
}

export async function POST(req: NextRequest) {
  const user = await getClientSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  // Rate limit: 10 orders per user per hour
  const rl = await rateLimit(`new-order:${user.id}`, 10, 3600);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "محاولات كثيرة. حاول بعد قليل." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const { serviceType, title, description, requirements, referenceLinks, budget } = await req.json();

  if (!serviceType || !title || !description || !requirements)
    return NextResponse.json({ error: "جميع الحقول المطلوبة يجب تعبئتها" }, { status: 400 });

  // Strict whitelist validation for serviceType
  if (!VALID_SERVICE_TYPES.has(serviceType))
    return NextResponse.json({ error: "نوع الخدمة غير صحيح" }, { status: 400 });

  // Input length limits
  if (title.length > 200)
    return NextResponse.json({ error: "العنوان طويل جداً" }, { status: 400 });
  if (description.length > 3000)
    return NextResponse.json({ error: "الوصف طويل جداً" }, { status: 400 });
  if (requirements.length > 5000)
    return NextResponse.json({ error: "المتطلبات طويلة جداً" }, { status: 400 });
  if (referenceLinks && typeof referenceLinks === "string" && referenceLinks.length > 500)
    return NextResponse.json({ error: "الروابط المرجعية طويلة جداً" }, { status: 400 });
  if (budget && typeof budget === "string" && budget.length > 100)
    return NextResponse.json({ error: "قيمة الميزانية غير صحيحة" }, { status: 400 });

  const names = SERVICE_NAMES[serviceType];

  const order = await clientOrdersDB.create({
    userId: user.id,
    userEmail: user.email,
    userName: user.name,
    serviceType,
    serviceNameAr: names.ar,
    serviceNameEn: names.en,
    status: "pending",
    title,
    description,
    requirements,
    referenceLinks,
    budget,
  });

  return NextResponse.json({ order }, { status: 201 });
}
