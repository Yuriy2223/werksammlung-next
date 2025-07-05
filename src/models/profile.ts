import mongoose from "mongoose";

const localizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    de: { type: String, required: true },
    ua: { type: String, required: true },
  },
  { _id: false }
);

const uploadSchema = new mongoose.Schema(
  {
    data: Buffer,
    contentType: String,
    filename: String,
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: localizedStringSchema,
      required: true,
    },
    lastName: {
      type: localizedStringSchema,
      required: true,
    },
    about: {
      type: localizedStringSchema,
      required: true,
    },
    gitHub: String,
    linkedin: String,
    telegram: String,
    avatarUrl: {
      type: uploadSchema,
      required: false,
    },
    viewCV: {
      type: uploadSchema,
      required: false,
    },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

profileSchema.methods.toJSON = function () {
  const obj = this.toObject();

  if (obj.avatarUrl?.data && obj.avatarUrl?.contentType) {
    obj.avatarUrl = `data:${
      obj.avatarUrl.contentType
    };base64,${obj.avatarUrl.data.toString("base64")}`;
  }

  if (obj.viewCV?.data) {
    obj.viewCV = `/api/uploads/cv/${obj._id}`;
  } else {
    obj.viewCV = null;
  }

  obj.viewCV = `/api/uploads/cv/${obj._id}`;

  delete obj.cvFile;
  return obj;
};

export const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);
