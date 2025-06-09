import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Skill } from "@/models/skill";
import { authCookie } from "@/middlewares/authCookie";
import { updateSkillSchema } from "@/validation/skillSchema";
import type { ValidationError } from "joi";

export async function GET(
  _: NextRequest,
  // { params }: { params: { id: string } }
  context: { params: { id: string } }
) {
  // const { id } = params;
  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ status: 400, message: "Invalid ID" });
  }

  const skill = await Skill.findById(id);
  if (!skill) {
    return NextResponse.json({ status: 404, message: "Skill not found" });
  }

  return NextResponse.json({
    status: 200,
    message: "Skill fetched successfully",
    data: skill,
  });
}

export async function PATCH(
  req: NextRequest,
  // { params }: { params: { id: string } }
  context: { params: { id: string } }
) {
  await authCookie(req);
  // const { id } = params;
  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ status: 400, message: "Invalid ID" });
  }

  const body = await req.json();

  try {
    const validated = await updateSkillSchema.validateAsync(body);

    const updatedSkill = await Skill.findByIdAndUpdate(id, validated, {
      new: true,
    });

    if (!updatedSkill) {
      return NextResponse.json({ status: 404, message: "Skill not found" });
    }

    return NextResponse.json({
      status: 200,
      message: "Skill updated successfully",
      data: updatedSkill,
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

export async function DELETE(
  req: NextRequest,
  // { params }: { params: { id: string } }
  context: { params: { id: string } }
) {
  await authCookie(req);
  // const { id } = params;
  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ status: 400, message: "Invalid ID" });
  }

  const deletedSkill = await Skill.findByIdAndDelete(id);

  if (!deletedSkill) {
    return NextResponse.json({ status: 404, message: "Skill not found" });
  }

  return NextResponse.json({
    status: 200,
    message: "Skill deleted successfully",
    data: deletedSkill,
  });
}
