import mongoose from 'mongoose';
import env from './env.js';

const connectDB = async () => {
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
};

export default connectDB;
