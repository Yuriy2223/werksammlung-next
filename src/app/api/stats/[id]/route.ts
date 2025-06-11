import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Stat } from "@/models/stat";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Invalid content type" },
      { status: 400 }
    );
  }

  type RequestBody = { additionalTime: number };

  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const additionalTime = body.additionalTime;

  if (typeof additionalTime !== "number" || additionalTime <= 0) {
    return NextResponse.json(
      { error: "Invalid additionalTime value" },
      { status: 400 }
    );
  }

  const stat = await Stat.findById(id);
  if (!stat) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  stat.timeSpent = (stat.timeSpent || 0) + additionalTime;
  await stat.save();

  return NextResponse.json(stat);
}
