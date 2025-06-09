import { NextRequest, NextResponse } from "next/server";
import { Profile } from "@/models/profile";
import { profileSchema } from "@/validation/profileSchema";
import { connectToDatabase } from "@/lib/mongodb";
import "@/models/project";
import "@/models/skill";

export async function GET() {
  await connectToDatabase();

  const profile = await Profile.findOne()
    .populate("projects")
    .populate("skills");

  if (!profile) {
    return NextResponse.json({ message: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { error, value } = profileSchema.validate(body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((d) => d.message);
      return NextResponse.json({ errors }, { status: 400 });
    }

    const newProfile = await Profile.create(value);

    return NextResponse.json(
      {
        status: 201,
        message: "Profile created successfully",
        data: newProfile.toJSON(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const { error, value } = profileSchema.validate(body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((d) => d.message);
      return NextResponse.json({ errors }, { status: 400 });
    }

    const profile = await Profile.findOne();

    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    const updated = await Profile.findByIdAndUpdate(profile._id, value, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { message: "Failed to update profile" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Profile updated successfully",
      data: updated.toJSON(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    await Profile.findByIdAndDelete(profile._id);

    return NextResponse.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
