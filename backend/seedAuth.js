import mongoose from 'mongoose';
import env from './config/env.js';
import User from './models/User.js';
import { hashPassword } from './utils/password.js';

const seed = async () => {
  await mongoose.connect(env.MONGO_URI);
  console.log('Connected to DB');

  await User.deleteMany({ email: { $in: ['amali@zionview.lk', 'kasun@gmail.com'] } });
  
  const ownerHash = await hashPassword('Owner123!');
  await User.create({
    name: 'Amali',
    email: 'amali@zionview.lk',
    password_hash: ownerHash,
    role: 'owner',
    phone: '0712345678'
  });

  const travellerHash = await hashPassword('Travel123!');
  await User.create({
    name: 'Kasun',
    email: 'kasun@gmail.com',
    password_hash: travellerHash,
    role: 'traveller'
  });

  console.log('Seeded demo users');
  process.exit(0);
};

seed();
