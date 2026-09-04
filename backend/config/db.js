import dns from 'node:dns';
import mongoose from 'mongoose';
import env from './env.js';

async function connectDB() {
  mongoose.set("strictQuery", true);

  // First attempt: system default DNS
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`Database connected: ${conn.connection.host} ...`);
    return;
  } catch (err) {
    const issDNSError =
      err.message?.includes("querySrv") ||
      err.message?.includes("ECONNREFUSED") ||
      err.message?.includes("ENOTFOUND");

    if (!issDNSError) {
      // Not a DNS issue, don't retry
      console.error("Database connection failed:", err.message);
      process.exit(1);
    }

    console.warn("DNS resolution failed, retrying with fallback DNS servers...");
  }

  // Second attempt: fallback DNS
  try {
    const conn = await mongoose.connect(env.MONGO_URI, { serverSelectionTimeoutMS: 3000 });
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}, DB: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB Primary Connection Failed]: ${error.message}. Connecting to local MongoDB at mongodb://127.0.0.1:27017/staysignal...`);
    try {
      const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/staysignal', { serverSelectionTimeoutMS: 3000 });
      console.log(`[MongoDB Connected to Local Fallback] Host: ${localConn.connection.host}, DB: ${localConn.connection.name}`);
      return localConn;
    } catch (localErr) {
      console.error('[MongoDB Fallback Connection Error]:', localErr.message);
      throw localErr;
    }
  }
}

export default connectDB;
