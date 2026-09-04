import connectDB from '../config/db.js';
import Notice from '../models/Notice.js';
import Town from '../models/Town.js';
import { TourismDestination, User } from '../models/index.js';
import { hashPassword } from '../utils/password.js';
import { noticesData, townsData, tourismSeedData } from './seedData.js';

// Fallback demo accounts (separate from the real test accounts documented
// in README.md, which were created via normal signup, not this script).
const DEMO_USERS = [
  { name: 'Amali Perera', email: 'amali@zionview.lk', password: 'Owner123!', role: 'owner', phone: '0771234567' },
  { name: 'Kasun Silva', email: 'kasun@gmail.com', password: 'Travel123!', role: 'traveller' },
];

const seedDemoUsers = async () => {
  for (const demo of DEMO_USERS) {
    const password_hash = await hashPassword(demo.password);
    await User.findOneAndUpdate(
      { email: demo.email },
      { name: demo.name, email: demo.email, password_hash, role: demo.role, phone: demo.phone },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  console.log(`Seeded ${DEMO_USERS.length} demo users (upserted).`);
};

const seed = async () => {
  try {
    await connectDB();
    console.log('Seeding MongoDB...');

    await Town.deleteMany({});
    await Town.insertMany(townsData);
    console.log(`Seeded ${townsData.length} towns.`);

    await Notice.deleteMany({});
    await Notice.insertMany(noticesData.map((n) => ({ ...n, _id: undefined })));
    console.log(`Seeded ${noticesData.length} notices.`);

    await TourismDestination.deleteMany({});
    await TourismDestination.insertMany(tourismSeedData);
    console.log(`Seeded ${tourismSeedData.length} tourism destinations.`);

    await seedDemoUsers();

    console.log('Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();
