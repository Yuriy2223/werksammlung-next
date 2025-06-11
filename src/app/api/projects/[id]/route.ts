import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import type { ValidationError } from "joi";
import { connectToDatabase } from "@/lib/mongodb";
import { Project } from "@/models/project";
import { projectSchema, updateProjectSchema } from "@/validation/projectSchema";

function validateObjectId(id: string): boolean {
  return isValidObjectId(id);
}

function formatJoiError(error: ValidationError): string[] {
  return error.details.map((detail) => detail.message);
}

function isJoiValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isJoi" in error &&
    (error as ValidationError).isJoi === true
  );
}

function handleError(error: unknown) {
  if (isJoiValidationError(error)) {
    return NextResponse.json(
      { message: "Validation error", errors: formatJoiError(error) },
      { status: 400 }
    );
  }

  const message = error instanceof Error ? error.message : "Unknown error";
  return NextResponse.json({ message }, { status: 500 });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();

  const { id } = await params;

  if (!validateObjectId(id)) {
    return NextResponse.json(
      { message: "Invalid project ID" },
      { status: 400 }
    );
  }

  const project = await Project.findById(id);

  if (!project) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      message: "Project fetched successfully",
      data: project,
    },
    { status: 200 }
  );
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();

  const { id } = await params;

  if (!validateObjectId(id)) {
    return NextResponse.json(
      { message: "Invalid project ID" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    await projectSchema.validateAsync(body, { abortEarly: false });

    const updated = await Project.findByIdAndUpdate(id, body, {
      new: true,
      upsert: true,
    });

    return NextResponse.json(
      {
        message: "Project updated successfully",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();

  const { id } = await params;

  if (!validateObjectId(id)) {
    return NextResponse.json(
      { message: "Invalid project ID" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    await updateProjectSchema.validateAsync(body, { abortEarly: false });

    const updated = await Project.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Project updated successfully",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();

  const { id } = await params;

  if (!validateObjectId(id)) {
    return NextResponse.json(
      { message: "Invalid project ID" },
      { status: 400 }
    );
  }

  const deleted = await Project.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      message: "Project deleted successfully",
      data: deleted,
    },
    { status: 200 }
  );
}
