import mongoose from "mongoose";

const localizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    de: { type: String, required: true },
    ua: { type: String, required: true },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    imgUrl: {
      type: String,
      default: null,
    },
    title: {
      type: localizedStringSchema,
      required: true,
      trim: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    description: {
      type: localizedStringSchema,
      required: true,
      trim: true,
    },
    role: {
      type: localizedStringSchema,
      required: true,
      trim: true,
    },
    codeUrl: {
      type: String,
      default: null,
    },
    webUrl: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
