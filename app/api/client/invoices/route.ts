import { NextRequest, NextResponse } from "next/server";
import { getClientSession } from "@/lib/client-auth";
import { invoicesDB } from "@/lib/db";

export async function GET() {
  const user = await getClientSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const all = await invoicesDB.getAll();
  const userInvoices = all
    .filter((inv) => inv.clientEmail.toLowerCase() === user.email.toLowerCase())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json(userInvoices);
}

export async function POST(req: NextRequest) {
  const user = await getClientSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  try {
    const body = await req.json();
    const { items, dueDate, notes, notesAr } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "يجب إضافة بند واحد على الأقل" }, { status: 400 });
    }

    const subtotal = items.reduce((s: number, item: { total: number }) => s + (item.total || 0), 0);
    const vatRate = 15;
    const vat = Math.round(subtotal * vatRate) / 100;
    const total = subtotal + vat;

    const invoice = await invoicesDB.create({
      template: "classic",
      clientName: user.name,
      clientEmail: user.email,
      clientPhone: user.phone || "",
      clientCompany: user.company,
      items,
      subtotal,
      vatRate,
      vat,
      total,
      currency: "SAR",
      status: "draft",
      issueDate: new Date().toISOString(),
      dueDate: dueDate || new Date(Date.now() + 7 * 86400000).toISOString(),
      notes,
      notesAr,
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
