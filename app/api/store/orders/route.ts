import { NextResponse } from "next/server";
import { storeOrdersDB, type StoreOrderItem } from "@/lib/db";
import { getProductById } from "@/lib/store-data";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const VAT_RATE = 0.15; // Saudi VAT
const MAX_QTY = 10;
const MAX_ITEMS = 20;

const PHONE_RE = /^\+?[0-9\s-]{8,15}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(input: unknown, maxLen: number): string {
  if (typeof input !== "string") return "";
  return input.replace(/[<>]/g, "").trim().slice(0, maxLen);
}

/**
 * POST /api/store/orders — create a store order.
 * All prices and totals are recalculated on the server from lib/store-data.ts;
 * client-supplied prices are ignored.
 */
export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = await rateLimit(`store-order:${ip}`, 5, 600);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "too_many_requests" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const customerRaw = (b.customer ?? {}) as Record<string, unknown>;

  const name = sanitize(customerRaw.name, 100);
  const phone = sanitize(customerRaw.phone, 20);
  const email = sanitize(customerRaw.email, 120);
  const city = sanitize(customerRaw.city, 80);
  const notes = sanitize(b.notes, 1000);
  const locale = ["ar", "en", "fr"].includes(b.locale as string) ? (b.locale as string) : "ar";
  const paymentMethod = b.paymentMethod === "bank_transfer" ? "bank_transfer" : "whatsapp";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "invalid_name";
  if (!PHONE_RE.test(phone)) errors.phone = "invalid_phone";
  if (email && !EMAIL_RE.test(email)) errors.email = "invalid_email";

  const itemsRaw = Array.isArray(b.items) ? b.items : [];
  if (itemsRaw.length === 0 || itemsRaw.length > MAX_ITEMS) errors.items = "invalid_items";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "validation_failed", fields: errors }, { status: 400 });
  }

  // Server-side price recalculation — the client only sends productId + qty
  const items: StoreOrderItem[] = [];
  for (const raw of itemsRaw as Array<Record<string, unknown>>) {
    const productId = sanitize(raw.productId, 100);
    const qty = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(raw.qty) || 0)));
    const product = getProductById(productId);
    if (!product || !product.inStock || qty < 1) {
      return NextResponse.json(
        { error: "unknown_product", productId },
        { status: 400 }
      );
    }
    if (items.some((i) => i.productId === productId)) continue; // no duplicates
    items.push({
      productId,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      unitPrice: product.price,
      qty,
      lineTotal: Math.round(product.price * qty * 100) / 100,
    });
  }

  if (items.length === 0) {
    return NextResponse.json({ error: "validation_failed", fields: { items: "invalid_items" } }, { status: 400 });
  }

  const subtotal = Math.round(items.reduce((s, i) => s + i.lineTotal, 0) * 100) / 100;
  const vatAmount = Math.round(subtotal * VAT_RATE * 100) / 100;
  const total = Math.round((subtotal + vatAmount) * 100) / 100;

  try {
    const order = await storeOrdersDB.create({
      customer: { name, phone, email: email || undefined, city: city || undefined, country: "SA" },
      items,
      subtotal,
      vatRate: VAT_RATE,
      vatAmount,
      total,
      currency: "SAR",
      paymentMethod,
      notes: notes || undefined,
      status: "pending",
      locale,
    });

    return NextResponse.json(
      {
        ok: true,
        order: {
          id: order.id,
          number: order.number,
          subtotal: order.subtotal,
          vatAmount: order.vatAmount,
          total: order.total,
          items: order.items,
          paymentMethod: order.paymentMethod,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
