import { NextRequest, NextResponse } from "next/server";
import { getClientSession } from "@/lib/client-auth";
import { clientOrdersDB } from "@/lib/client-db";

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

  const { serviceType, title, description, requirements, referenceLinks, budget } = await req.json();

  if (!serviceType || !title || !description || !requirements)
    return NextResponse.json({ error: "جميع الحقول المطلوبة يجب تعبئتها" }, { status: 400 });

  const names = SERVICE_NAMES[serviceType] || { ar: "خدمة مخصصة", en: "Custom Service" };

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
