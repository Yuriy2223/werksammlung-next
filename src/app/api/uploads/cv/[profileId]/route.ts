import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Profile } from "@/models/profile";
import { Session } from "@/models/session";
import { isValidObjectId } from "mongoose";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ profileId: string }> }
) {
  await connectToDatabase();

  // const profileId = context.params.profileId;
  const { profileId } = await context.params;

  // Перевірка профілю
  if (!isValidObjectId(profileId)) {
    return NextResponse.json(
      { message: "Invalid profile ID format" },
      { status: 400 }
    );
  }

  const profile = await Profile.findById(profileId);
  if (!profile) {
    return NextResponse.json({ message: "Profile not found" }, { status: 404 });
  }

  // Авторизація через cookies
  const accessToken = req.cookies.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json(
      { message: "Unauthorized: No access token" },
      { status: 401 }
    );
  }

  const session = await Session.findOne({ accessToken });
  if (!session || session.accessTokenValidUntil < new Date()) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid session" },
      { status: 401 }
    );
  }

  // Отримання файлу з formData
  const formData = await req.formData();
  const file = formData.get("cv") as File;

  if (!file) {
    return NextResponse.json(
      { message: "No PDF file provided" },
      { status: 400 }
    );
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { message: "Only PDF files are allowed" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  profile.viewCV = {
    data: buffer,
    contentType: file.type,
    filename: file.name,
  };

  await profile.save();

  return NextResponse.json({
    message: "CV uploaded successfully",
    user: profile.toJSON(),
  });
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ profileId: string }> }
) {
  await connectToDatabase();

  const { profileId } = await context.params;

  if (!isValidObjectId(profileId)) {
    return NextResponse.json(
      { message: "Invalid profile ID format" },
      { status: 400 }
    );
  }

  const profile = await Profile.findById(profileId);
  if (!profile || !profile.viewCV?.data) {
    return NextResponse.json({ message: "CV not found" }, { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", profile.viewCV.contentType);
  headers.set(
    "Content-Disposition",
    `inline; filename="${profile.viewCV.filename}"`
  );

  return new NextResponse(profile.viewCV.data.buffer, { status: 200, headers });
}
