import dns from 'node:dns';
import mongoose from 'mongoose';
import env from './env.js';

/** True once Mongoose has an open connection. Used by stores that fall back to
 *  an in-memory dataset when the DB is unreachable. */
export const getIsMongoConnected = () => mongoose.connection.readyState === 1;

const isDnsError = (err) =>
  err?.message?.includes('querySrv') ||
  err?.message?.includes('ECONNREFUSED') ||
  err?.message?.includes('ENOTFOUND');

/**
 * Connect Mongoose to `uri`, retrying once with public DNS servers if the first
 * attempt fails an SRV lookup (some networks can't resolve mongodb+srv records).
 * Throws on failure — callers decide what to do.
 */
export async function connectMongoose(uri = env.MONGO_URI) {
  mongoose.set('strictQuery', true);
  try {
    const conn = await mongoose.connect(uri);
    return conn.connection.host;
  } catch (err) {
    if (!isDnsError(err)) throw err;
    dns.setServers(['1.1.1.1', '8.8.8.8']);
    const conn = await mongoose.connect(uri);
    return conn.connection.host;
  }
}

async function connectDB() {
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
