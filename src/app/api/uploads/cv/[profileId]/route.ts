import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Profile } from "@/models/profile";
import { Session } from "@/models/session";
import { isValidObjectId } from "mongoose";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ profileId: string }> }
) {
  await connectToDatabase();

  const { profileId } = await params;

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

  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) {
    return NextResponse.json(
      { message: "Unauthorized: No access token" },
      { status: 401 }
    );
  }

  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [k, ...v] = c.trim().split("=");
      return [k, v.join("=")];
    })
  );

  const accessToken = cookies["accessToken"];
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
  _req: Request,
  { params }: { params: Promise<{ profileId: string }> }
) {
  await connectToDatabase();

  const { profileId } = await params;

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

  return new NextResponse(profile.viewCV.data.buffer, {
    status: 200,
    headers,
  });
}
