import mongoose from 'mongoose';
import env from '../config/env.js';
import { User } from '../models/index.js';
import { hashPassword } from '../utils/password.js';

const DEMO_USERS = [
  { name: 'Amali Perera', email: 'amali@zionview.lk', password: 'Owner123!', role: 'owner', phone: '0771234567' },
  { name: 'Kasun Silva', email: 'kasun@gmail.com', password: 'Travel123!', role: 'traveller', phone: null },
];

const run = async () => {
  await mongoose.connect(env.MONGO_URI);
  for (const u of DEMO_USERS) {
    const password_hash = await hashPassword(u.password);
    await User.updateOne(
      { email: u.email },
      { $set: { name: u.name, role: u.role, phone: u.phone, password_hash } },
      { upsert: true }
    );
    console.log(`seeded ${u.role}: ${u.email} / ${u.password}`);
  }
  await mongoose.disconnect();
  console.log('done');
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
