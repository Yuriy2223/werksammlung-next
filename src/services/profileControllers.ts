import { Profile } from "../models/profile.js";

export const getProfileController = async (req, res) => {
  const profile = await Profile.findOne()
    .populate("projects")
    .populate("skills");

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.status(200).json(profile);
};

export const createProfileController = async (req, res) => {
  const newProfile = await Profile.create(req.body);

  res.status(201).json({
    status: 201,
    message: "Profile created successfully",
    data: newProfile.toJSON(),
  });
};

export const updateProfileController = async (req, res) => {
  const profile = await Profile.findOne();

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  const updated = await Profile.findByIdAndUpdate(profile._id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: 200,
    message: "Profile updated successfully",
    data: updated.toJSON(),
  });
};
export const deleteProfileController = async (_req, res) => {
  const profile = await Profile.findOne();

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  await Profile.findByIdAndDelete(profile._id);

  res.status(200).json({ message: "Profile deleted successfully" });
};

import mongoose from "mongoose";
import { Profile } from "../models/profile.js";

export const createProfile = async (profile) => {
  return Profile.create(profile);
};
export const getProfiles = async () => {
  return Profile.find();
};
export const getProfile = async (profileId) => {
  if (!mongoose.Types.ObjectId.isValid(profileId)) return null;
  return Profile.findById(profileId);
};
export const getProfileByEmail = async (email) => {
  return Profile.findOne({ email });
};
export const updateProfile = async (profileId, profileData) => {
  if (!mongoose.Types.ObjectId.isValid(profileId)) return null;
  return Profile.findByIdAndUpdate(profileId, profileData, { new: true });
};
export const deleteProfile = async (profileId) => {
  if (!mongoose.Types.ObjectId.isValid(profileId)) return null;
  return Profile.findByIdAndDelete(profileId);
};
export const replaceProfile = async (profileId, profileData) => {
  if (!mongoose.Types.ObjectId.isValid(profileId)) return null;

  const result = await Profile.findByIdAndUpdate(profileId, profileData, {
    new: true,
    upsert: true,
  });

  return {
    value: result,
    updatedExisting: !!result,
  };
};
