import mongoose from 'mongoose';
import env from '../config/env.js';
import connectDB from '../config/db.js';
import { 
  TourismDestination, 
  Campsite, 
  Town, 
  PermitBooking 
} from '../models/index.js';
import { 
  tourismSeedData, 
  campsiteSeedData, 
  townSeedData 
} from './seedData.js';

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await connectDB();

    console.log('[Seed] Clearing existing collections...');
    await TourismDestination.deleteMany({});
    await Campsite.deleteMany({});
    await Town.deleteMany({});

    console.log('[Seed] Inserting Tourism Destinations...');
    const insertedTourism = await TourismDestination.insertMany(tourismSeedData);
    console.log(`[Seed] Inserted ${insertedTourism.length} tourism destinations.`);

    console.log('[Seed] Inserting Wilderness Campsites...');
    const insertedCamping = await Campsite.insertMany(campsiteSeedData);
    console.log(`[Seed] Inserted ${insertedCamping.length} campsites.`);

    console.log('[Seed] Inserting Towns...');
    const insertedTowns = await Town.insertMany(townSeedData);
    console.log(`[Seed] Inserted ${insertedTowns.length} towns.`);

    // Add a baseline verified permit booking for Knuckles
    const knucklesCamp = insertedCamping.find(c => c.slug === 'knuckles-01');
    if (knucklesCamp) {
      await PermitBooking.deleteMany({});
      const seedBooking = new PermitBooking({
        bookingId: 'DWC-KNK-8921',
        campsiteId: knucklesCamp._id,
        campsiteSlug: knucklesCamp.slug,
        campsiteName: knucklesCamp.name,
        applicantName: 'Julian Meyer (German Alpine Club)',
        email: 'jmeyer@alpenverein.de',
        phone: '+49 171 9845210',
        numCampers: 2,
        numPitches: 1,
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000 * 2),
        numNights: 2,
        totalFee: 'USD $50',
        status: 'confirmed'
      });
      await seedBooking.save();
      console.log(`[Seed] Created baseline DWC permit booking ${seedBooking.bookingId}.`);
    }

    console.log('\n========================================');
    console.log('StaySignal LK Database Seed Complete!');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedDatabase();
