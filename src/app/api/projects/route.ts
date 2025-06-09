import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { projectSchema } from "@/validation/projectSchema";
import { Project } from "@/models/project";
import { Profile } from "@/models/profile";
import { parsePaginationParams } from "@/utils/parsePaginationParams";
import { parseSortParams } from "@/utils/parseSortParams";
import { parseFilterParams } from "@/utils/parseFilterParams";
import type { ValidationError } from "joi";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);
    const sorting = parseSortParams(searchParams);
    const filter = parseFilterParams(searchParams);

    const total = await Project.countDocuments(filter);

    const projects = await Project.find(filter)
      .sort({ [sorting.sortBy]: sorting.sortOrder === "asc" ? 1 : -1 })
      .skip(pagination.skip)
      .limit(pagination.limit);

    return NextResponse.json({
      status: 200,
      message: "Projects fetched successfully",
      data: {
        projects,
        total,
        page: pagination.page,
        perPage: pagination.perPage,
        totalPages: Math.ceil(total / pagination.perPage),
        hasNextPage: pagination.page * pagination.perPage < total,
        hasPreviousPage: pagination.page > 1,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({
      status: 500,
      message: "Server error",
      error: message,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    await projectSchema.validateAsync(body, { abortEarly: false });

    const newProject = await Project.create(body);

    if (body.profileId) {
      await Profile.findByIdAndUpdate(
        body.profileId,
        { $push: { projects: newProject._id } },
        { new: true }
      );
    }

    return NextResponse.json({
      status: 201,
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error: unknown) {
    let errors: string[] = [];

    if (
      typeof error === "object" &&
      error !== null &&
      "isJoi" in error &&
      "details" in error
    ) {
      const joiError = error as ValidationError;
      errors = joiError.details.map((d) => d.message);
    } else if (error instanceof Error) {
      errors = [error.message];
    } else {
      errors = ["Unknown error"];
    }

    return NextResponse.json({
      status: 400,
      message: "Validation error",
      errors,
    });
  }
}
