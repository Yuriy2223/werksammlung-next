import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  country: String,
  timeSpent: Number,
  date: { type: Date, default: Date.now },
});

// export const Stat = mongoose.model("Stat", statSchema);
export const Stat = mongoose.models.Stat || mongoose.model("Stat", statSchema);
