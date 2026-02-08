import mongoose from "mongoose";

const MONGODB_URI = process.env.DB;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Initialize cache if not present
if (!global.mongooseCache) {
  global.mongooseCache = {
    conn: null,
    promise: null,
  };
}

const cache = global.mongooseCache;

export async function connectDb(): Promise<typeof mongoose> {
  if (cache.conn) {
    return cache.conn;
  }

  if (!MONGODB_URI) {
    throw new Error("Please define the DB environment variable in .env");
  }

  if (!cache.promise) {
    console.log("🌐 Creating a new MongoDB connection...");
    cache.promise = mongoose.connect(MONGODB_URI, {
      dbName: "DKSHANDLOOM",
      bufferCommands: false,
    });
  }

  try {
    cache.conn = await cache.promise;
    console.log("✅ MongoDB connected.");
    return cache.conn;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
}
