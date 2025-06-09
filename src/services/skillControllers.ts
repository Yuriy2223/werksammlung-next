import createHttpError from "http-errors";
import { Profile } from "../models/profile.js";
import {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../services/skills.js";

export const getSkillsController = async (req, res) => {
  const skills = await getSkills();

  res.json({
    status: 200,
    message: "Skills fetched successfully",
    data: skills,
  });
};

export const getSkillController = async (req, res) => {
  const { id } = req.params;
  const skill = await getSkill(id);
  if (!skill) {
    throw new createHttpError.NotFound("Skill not found");
  }

  res.json({
    status: 200,
    message: "Skill fetched successfully",
    data: skill,
  });
};

export const createSkillController = async (req, res) => {
  const skill = await createSkill(req.body);
  const updatedProfile = await Profile.findByIdAndUpdate(
    req.body.profileId,
    { $push: { skills: skill._id } },
    { new: true }
  );

  if (!updatedProfile) {
    throw new createHttpError.NotFound("Profile not found");
  }

  res.status(201).json({
    status: 201,
    message: "Skill created and added to profile",
    data: skill,
  });
};

export const updateSkillController = async (req, res) => {
  const { id } = req.params;
  const updated = await updateSkill(id, req.body);
  if (!updated) {
    throw new createHttpError.NotFound("Skill not found");
  }

  res.json({
    status: 200,
    message: "Skill updated successfully",
    data: updated,
  });
};

export const deleteSkillController = async (req, res) => {
  const { id } = req.params;
  const deleted = await deleteSkill(id);
  if (!deleted) {
    throw new createHttpError.NotFound("Skill not found");
  }

  res.json({
    status: 200,
    message: "Skill deleted successfully",
    data: deleted,
  });
};

import mongoose from "mongoose";
import { Skill } from "../models/skill.js";

export const getSkills = async () => {
  return Skill.find();
};

export const getSkill = async (skillId) => {
  if (!mongoose.Types.ObjectId.isValid(skillId)) return null;
  return Skill.findById(skillId);
};

export const createSkill = async (skillData) => {
  return Skill.create(skillData);
};

export const updateSkill = async (skillId, updatedData) => {
  if (!mongoose.Types.ObjectId.isValid(skillId)) return null;
  return Skill.findByIdAndUpdate(skillId, updatedData, { new: true });
};

export const deleteSkill = async (skillId) => {
  if (!mongoose.Types.ObjectId.isValid(skillId)) return null;
  return Skill.findByIdAndDelete(skillId);
};
