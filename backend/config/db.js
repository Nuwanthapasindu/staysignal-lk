import mongoose from 'mongoose';
import env from './env.js';

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    isMongoConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
