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
    const host = await connectMongoose(env.MONGO_URI);
    console.log(`Mongo connected: ${host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

export default connectDB;
