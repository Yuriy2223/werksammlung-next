import { NextRequest, NextResponse } from "next/server";
import { Skill } from "@/models/skill";
import { Profile } from "@/models/profile";
import { authCookie } from "@/middlewares/authCookie";
import type { ValidationError } from "joi";
import { skillSchema } from "@/validation/skillSchema";

export async function GET() {
  const skills = await Skill.find();
  return NextResponse.json({
    status: 200,
    message: "Skills fetched successfully",
    data: skills,
  });
}

export async function POST(req: NextRequest) {
  await authCookie(req);

  const body = await req.json();

  try {
    const validated = await skillSchema.validateAsync(body);

    const skill = await Skill.create(validated);
    const updatedProfile = await Profile.findByIdAndUpdate(
      validated.profileId,
      { $push: { skills: skill._id } },
      { new: true }
    );

    if (!updatedProfile) {
      return NextResponse.json({
        status: 404,
        message: "Profile not found",
      });
    }

    return NextResponse.json({
      status: 201,
      message: "Skill created and added to profile",
      data: skill,
    });
  } catch (err) {
    if ((err as ValidationError).isJoi) {
      return NextResponse.json({
        status: 400,
        message: "Validation failed",
        errors: (err as ValidationError).details,
      });
    }

    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
}
