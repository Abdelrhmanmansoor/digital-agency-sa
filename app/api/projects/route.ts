import { NextRequest, NextResponse } from "next/server";
import { projectsDB } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const projects = projectsDB.getAll();
  return NextResponse.json(projects.sort((a, b) => a.order - b.order));
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const project = projectsDB.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
