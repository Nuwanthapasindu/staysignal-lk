import connectDB from '../config/db.js';
import Notice from '../models/Notice.js';
import Town from '../models/Town.js';
import { noticesData, townsData } from './seedData.js';

const seed = async () => {
  try {
    await connectDB();
    console.log('Seeding MongoDB...');

    await Town.deleteMany({});
    await Town.insertMany(townsData);
    console.log(`Seeded ${townsData.length} towns.`);

    await Notice.deleteMany({});
    await Notice.insertMany(
      noticesData.map(n => ({
        ...n,
        _id: undefined, // Mongoose generates valid ObjectId or we use customId
      }))
    );
    console.log(`Seeded ${noticesData.length} notices.`);

    console.log('Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();
