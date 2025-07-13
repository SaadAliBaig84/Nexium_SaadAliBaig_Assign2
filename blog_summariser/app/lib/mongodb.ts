import mongoose from "mongoose";

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "";

if (!MONGO_CONNECTION_STRING) {
  throw new Error(
    "MONGO_CONNECTION_STRING is not defined in the environment variables."
  );
}
declare global {
  var mongoose: any;
}
let cached_connection = global.mongoose;

if (!cached_connection) {
  cached_connection = global.mongoose = { conn: null, promise: null };
}
export async function connectToDatabase() {
  if (cached_connection.conn) {
    return cached_connection.conn;
  }

  if (!cached_connection.promise) {
    try {
      cached_connection.promise = mongoose.connect(MONGO_CONNECTION_STRING, {
        bufferCommands: false,
      });
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
  cached_connection.conn = await cached_connection.promise;
  return cached_connection.conn;
}
