import { NextRequest, NextResponse } from "next/server";
import { getClientSession } from "@/lib/client-auth";
import { clientUsersDB } from "@/lib/client-db";

export async function PUT(req: NextRequest) {
  const user = await getClientSession();
  if (!user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { name, phone, company } = await req.json();
  if (!name) return NextResponse.json({ error: "الاسم مطلوب" }, { status: 400 });

  await clientUsersDB.update(user.id, { name, phone, company });
  return NextResponse.json({ success: true });
}
