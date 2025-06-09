import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";
import { Project } from "../models/project.js";

export const isValidProjectID = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(new createHttpError.BadRequest("ID is not valid"));
  }

  try {
    const project = await Project.findById(id);
    if (!project) {
      return next(new createHttpError.NotFound("Project not found"));
    }

    req.project = project;

    next();
  } catch (error) {
    next(new createHttpError.InternalServerError("Database error"));
  }
};
