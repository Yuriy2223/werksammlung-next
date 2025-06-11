import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Profile } from "@/models/profile";
import { Session } from "@/models/session";
import { isValidObjectId } from "mongoose";

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

function parseCookies(header: string | null): Record<string, string> {
  if (!header) return {};
  return Object.fromEntries(
    header.split(";").map((c) => {
      const [k, ...v] = c.trim().split("=");
      return [k, v.join("=")];
    })
  );
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ profileId: string }> }
) {
  try {
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
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    const cookies = parseCookies(req.headers.get("cookie"));
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
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    if (!allowedImageTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Invalid image type" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    profile.avatarUrl = {
      data: buffer,
      contentType: file.type,
      filename: file.name,
    };

    await profile.save();

    return NextResponse.json({
      message: "Avatar uploaded successfully",
      user: {
        ...profile.toObject(),
        avatarUrl: `/api/avatar/${profile._id}`,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ profileId: string }> }
) {
  try {
    await connectToDatabase();
    const { profileId } = await params;
    if (!isValidObjectId(profileId)) {
      return NextResponse.json(
        { message: "Invalid profile ID format" },
        { status: 400 }
      );
    }

    const profile = await Profile.findById(profileId);

    if (!profile || !profile.avatarUrl?.data) {
      return NextResponse.json(
        { message: "Avatar not found" },
        { status: 404 }
      );
    }

    const headers = new Headers();
    headers.set("Content-Type", profile.avatarUrl.contentType);
    headers.set(
      "Content-Disposition",
      `inline; filename="${profile.avatarUrl.filename}"`
    );

    return new NextResponse(profile.avatarUrl.data.buffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Get avatar error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
