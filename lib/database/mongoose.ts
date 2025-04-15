import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend global object type to include our cache
declare global {
  // Only on NodeJS globalThis
  var mongoose: MongooseConnection | undefined;
}

// Use the global cache if available
let cached: MongooseConnection = global.mongoose || {
  conn: null,
  promise: null,
};

// Assign back to global to persist between hot reloads (Next.js dev mode)
global.mongoose = cached;

export const connectToDatabse = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) {
    throw new Error("Missing MONGODB_URL");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "Imaginest",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
