import { NextRequest, NextResponse } from "next/server";
import { getClientSession } from "@/lib/client-auth";
import { contractsDB } from "@/lib/db";

export async function GET() {
  const user = await getClientSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const all = await contractsDB.getAll();
  const userContracts = all
    .filter((c) => c.clientEmail.toLowerCase() === user.email.toLowerCase())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json(userContracts);
}

export async function POST(req: NextRequest) {
  const user = await getClientSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  try {
    const body = await req.json();
    const {
      type, serviceTitle, serviceTitleAr,
      serviceDescription, serviceDescriptionAr,
      totalAmount, paymentTerms, paymentNotes,
      startDate, deliveryDays, deliverables,
    } = body;

    if (!serviceTitleAr || !totalAmount || !deliveryDays) {
      return NextResponse.json({ error: "يجب تعبئة الحقول المطلوبة" }, { status: 400 });
    }

    const contract = await contractsDB.create({
      type: type || "service-agreement",
      clientName: user.name,
      clientEmail: user.email,
      clientPhone: user.phone || "",
      clientCompany: user.company,
      serviceTitle: serviceTitle || serviceTitleAr,
      serviceTitleAr,
      serviceDescription: serviceDescription || serviceDescriptionAr || "",
      serviceDescriptionAr: serviceDescriptionAr || serviceDescription || "",
      totalAmount: Number(totalAmount),
      paymentTerms: paymentTerms || "full",
      paymentNotes,
      startDate: startDate || new Date().toISOString(),
      deliveryDays: Number(deliveryDays),
      deliverables: deliverables || [],
      jurisdiction: "الرياض",
      status: "draft",
    });

    return NextResponse.json(contract, { status: 201 });
  } catch {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
