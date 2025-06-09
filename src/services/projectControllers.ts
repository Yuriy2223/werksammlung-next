import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { uploadCloudinary } from "../utils/uploadCloudinary.js";
import { Project } from "../models/project.js";
import { Profile } from "../models/profile.js";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  replaceProject,
  updateProject,
} from "../services/projects.js";

export const getProjectsController = async (req, res) => {
  const pagination = parsePaginationParams(req.query);
  const sorting = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const response = await getProjects({
    ...pagination,
    ...sorting,
    filter,
  });

  res.json({
    status: 200,
    message: "Projects fetched successfully",
    data: response,
  });
};
export const getProjectController = async (req, res) => {
  const { id } = req.params;
  const project = await getProject(id);
  if (!project) {
    throw new createHttpError.NotFound("Project not found");
  }

  res.json({
    status: 200,
    message: "Project fetched successfully",
    data: project,
  });
};

export const createProjectController = async (req, res) => {
  const project = await createProject(req.body);
  const updatedProfile = await Profile.findByIdAndUpdate(
    req.body.profileId,
    { $push: { projects: project._id } },
    { new: true }
  );

  if (!updatedProfile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.status(201).json({
    status: 201,
    message: "Project created successfully",
    data: project,
  });
};

// // якщо через фром дату все разом
// export const createProjectController = async (req, res, next) => {
//   try {
//     let imgUrl = null;

//     if (req.file) {
//       const base64Str = req.file.buffer.toString("base64");
//       const mimeType = req.file.mimetype;
//       const dataUri = `data:${mimeType};base64,${base64Str}`;

//       const uploadResult = await uploadCloudinary.uploader.upload(dataUri, {
//         folder: "portfolio",
//       });

//       imgUrl = uploadResult.secure_url;
//     }

//     const projectData = {
//       ...req.body,
//       imgUrl,
//     };

//     const result = await createProject(projectData);

//     await User.findByIdAndUpdate(req.body.userId, {
//       $push: { projects: result._id },
//     });

//     res.status(201).json({
//       status: 201,
//       message: "Project created successfully",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const updateProjectController = async (req, res) => {
  const { id } = req.params;
  const project = await getProject(id);
  if (!project) {
    throw new createHttpError.NotFound("Project not found");
  }

  const updatedProject = await updateProject(id, req.body);

  res.json({
    status: 200,
    message: "Project updated successfully",
    data: updatedProject,
  });
};

// // якщо через фром дату все разом
// export const updateProjectController = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const project = await getProject(id);
//     if (!project) {
//       throw new createHttpError.NotFound("Project not found");
//     }

//     const updateData = { ...req.body };

//     if (req.file) {
//       const base64Str = req.file.buffer.toString("base64");
//       const mimeType = req.file.mimetype;
//       const dataUri = `data:${mimeType};base64,${base64Str}`;

//       const uploadResult = await uploadCloudinary.uploader.upload(dataUri, {
//         folder: "portfolio",
//       });

//       updateData.imgUrl = uploadResult.secure_url;
//     }

//     const updatedProject = await updateProject(id, updateData);

//     res.json({
//       status: 200,
//       message: "Project updated successfully",
//       data: updatedProject,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteProjectController = async (req, res) => {
  const { id } = req.params;
  const result = await deleteProject(id);

  if (result === null) {
    throw new createHttpError.NotFound("Project not found");
  }

  res.json({
    status: 200,
    message: "Project deleted successfully",
    data: result,
  });
};
export const replaceProjectController = async (req, res) => {
  const { id } = req.params;
  const project = req.body;
  const result = await replaceProject(id, project);

  res.status(result.updatedExisting ? 200 : 201).json({
    status: result.updatedExisting ? 200 : 201,
    message: result.updatedExisting
      ? "Project updated successfully"
      : "Project created successfully",
    data: result.value,
  });
};

// // якщо окремо завантажувати картинку в проєкт
export const uploadImageController = async (req, res, next) => {
  const { id } = req.params;

  if (!req.file) {
    throw new createHttpError.BadRequest("Image file is required");
  }

  const base64Str = req.file.buffer.toString("base64");
  const mimeType = req.file.mimetype;
  const dataUri = `data:${mimeType};base64,${base64Str}`;
  const uploadResult = await uploadCloudinary(dataUri);
  const imgUrl = uploadResult.secure_url;

  const updatedProject = await Project.findByIdAndUpdate(
    id,
    { imgUrl },
    { new: true }
  );

  if (!updatedProject) {
    throw new createHttpError.NotFound("Project not found");
  }

  res.json({
    status: 200,
    message: "Project image updated successfully",
    data: updatedProject,
  });
};

import mongoose from "mongoose";
import { Project } from "../models/project.js";

export const getProjects = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const skip = (page - 1) * perPage;
  const queryFilter = {};

  if (filter.minYear) {
    queryFilter.createdAt = { ...queryFilter.createdAt, $gte: filter.minYear };
  }
  if (filter.maxYear) {
    queryFilter.createdAt = { ...queryFilter.createdAt, $lte: filter.maxYear };
  }

  const [total, projects] = await Promise.all([
    Project.countDocuments(queryFilter),
    Project.find(queryFilter)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(perPage),
  ]);

  return {
    projects,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
    hasNextPage: page * perPage < total,
    hasPreviousPage: page > 1,
  };
};
export const getProject = async (projectId) => {
  if (!mongoose.Types.ObjectId.isValid(projectId)) return null;
  return Project.findById(projectId);
};
export const createProject = async (project) => {
  return Project.create(project);
};
export const updateProject = async (projectId, project) => {
  if (!mongoose.Types.ObjectId.isValid(projectId)) return null;
  return Project.findByIdAndUpdate(projectId, project, { new: true });
};
export const deleteProject = async (projectId) => {
  if (!mongoose.Types.ObjectId.isValid(projectId)) return null;
  return Project.findByIdAndDelete(projectId);
};
export const replaceProject = async (projectId, project) => {
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return null;
  }

  const result = await Project.findByIdAndUpdate(projectId, project, {
    new: true,
    upsert: true,
  });

  return {
    value: result,
    updatedExisting: !!result,
  };
};
