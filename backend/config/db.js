import mongoose from 'mongoose';
import env from './env.js';

let isMongoConnected = false;

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 800,
      connectTimeoutMS: 800,
    });
    isMongoConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    isMongoConnected = false;
    console.warn('MongoDB connection offline. Operating in fallback seed mode.');
  }
};

export const getIsMongoConnected = () => isMongoConnected;
export default connectDB;
