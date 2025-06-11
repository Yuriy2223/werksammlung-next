import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

sessionSchema.index({ refreshTokenValidUntil: 1 }, { expireAfterSeconds: 0 });

// export const Session = mongoose.model("Session", sessionSchema);
export const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);
