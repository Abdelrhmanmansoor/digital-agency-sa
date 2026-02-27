import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { contractsDB } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const contracts = await contractsDB.getAll();
  return NextResponse.json(contracts);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const contract = await contractsDB.create(body);
    return NextResponse.json(contract, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid data", detail: String(e) }, { status: 400 });
  }
}
