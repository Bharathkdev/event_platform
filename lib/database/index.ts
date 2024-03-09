import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * This line initializes a variable named cached. It checks if there is an existing 
 mongoose object in the global scope. If it exists, it uses it; otherwise, it creates 
 a new object with conn and promise properties set to null.

 *This approach is used to cache the connection and promise objects to avoid unnecessary 
 reconnects and promise re-creation, improving performance.

 *Problem it avoids: In a serverless environment(like Vercel), functions can be stateless, meaning 
 they start with a fresh execution environment for each invocation. Establishing a 
 new database connection for every request can be resource-intensive and slow.
 */
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing!");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
