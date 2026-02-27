import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { invoicesDB } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const invoices = await invoicesDB.getAll();
  return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const invoice = await invoicesDB.create(body);
    return NextResponse.json(invoice, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid data", detail: String(e) }, { status: 400 });
  }
}
