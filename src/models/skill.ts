import mongoose from "mongoose";

const localizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    de: { type: String, required: true },
    ua: { type: String, required: true },
  },
  { _id: false }
);

const itemSchema = new mongoose.Schema({
  name: { type: localizedStringSchema, required: true },
  link: { type: String, required: true },
});

const skillSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },

    category: { type: localizedStringSchema, required: true },
    items: { type: [itemSchema], required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Skill = mongoose.model("Skill", skillSchema);
