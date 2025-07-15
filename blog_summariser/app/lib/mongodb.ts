import mongoose from "mongoose";

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "";

if (!MONGO_CONNECTION_STRING) {
  throw new Error("MONGO_CONNECTION_STRING is not defined.");
}

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    // Already connected
    return mongoose.connection;
  }

  // Connect fresh
  return mongoose.connect(MONGO_CONNECTION_STRING, {
    bufferCommands: false,
  });
}
