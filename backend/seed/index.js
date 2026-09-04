import connectDB from '../config/db.js';
import Notice from '../models/Notice.js';
import Town from '../models/Town.js';
import { TourismDestination } from '../models/index.js';
import { noticesData, townsData, tourismSeedData } from './seedData.js';

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

    console.log('Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();
