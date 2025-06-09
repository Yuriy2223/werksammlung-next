// import mongoose from "mongoose";

// export const connectToDatabase = async () => {
//   const DB_URI = process.env.DB_URI;

//   if (!DB_URI) {
//     throw new Error("DB_URI is not defined");
//   }

//   try {
//     if (mongoose.connection.readyState >= 1) return;

//     await mongoose.connect(DB_URI);
//     console.log("Database connection successful");
//   } catch (error) {
//     console.error("Database connection error:", error);
//     process.exit(1);
//   }
// };
import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  const DB_URI = process.env.DB_URI;
  if (!DB_URI) throw new Error("DB_URI is not defined");

  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  try {
    await mongoose.connect(DB_URI);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
