import { NextRequest, NextResponse } from "next/server";
import { getRadarSession } from "@/lib/radar-auth";
import { radarProductsDB } from "@/lib/radar-db";

export async function GET() {
  const user = await getRadarSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  const products = await radarProductsDB.getAll(user.id);
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  const user = await getRadarSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();
  const { name, category, userPrice, userCost, shipping, returnRate } = body;

  if (!name || !userPrice || !userCost) {
    return NextResponse.json({ error: "الاسم والسعر والتكلفة مطلوبة" }, { status: 400 });
  }

  const product = await radarProductsDB.create({
    userId: user.id,
    name,
    category: category || "عام",
    userPrice: Number(userPrice),
    userCost: Number(userCost),
    shipping: Number(shipping) || 0,
    returnRate: Number(returnRate) || 5,
  });

  return NextResponse.json({ success: true, product });
}

export async function DELETE(req: NextRequest) {
  const user = await getRadarSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { productId } = await req.json();
  if (!productId) return NextResponse.json({ error: "معرّف المنتج مطلوب" }, { status: 400 });

  await radarProductsDB.delete(user.id, productId);
  return NextResponse.json({ success: true });
}
