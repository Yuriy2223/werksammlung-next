import { NextResponse } from "next/server";
import { Project } from "@/models/project";
import { uploadImage } from "@/utils/uploadImages";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;
    const uploadResult = await uploadImage(dataUri);
    const imgUrl = uploadResult;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { imgUrl },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Project image updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}
