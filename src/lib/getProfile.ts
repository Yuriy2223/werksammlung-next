import { isValidObjectId } from "mongoose";
import { Profile } from "@/models/profile";

export async function getProfile(profileId: string) {
  if (!isValidObjectId(profileId)) throw new Error("Invalid profile ID");

  const profile = await Profile.findById(profileId);
  if (!profile) throw new Error("Profile not found");

  return profile;
}
