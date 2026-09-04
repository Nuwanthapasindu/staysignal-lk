import mongoose from 'mongoose';

const gearChecklistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true }
}, { _id: false });

const ruleQuadrantItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  desc: { type: String, required: true }
}, { _id: false });

const ruleQuadrantSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  badge: { type: String, default: '' },
  variant: { type: String, default: '' }, // 'danger', 'caution', etc.
  items: [ruleQuadrantItemSchema],
  footnote: { type: String, default: '' }
}, { _id: false });

const corridorAccessSchema = new mongoose.Schema({
  route: { type: String, required: true },
  timeAgo: { type: String, default: '' },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  activeFrom: { type: String, default: '' },
  source: { type: String, default: '' },
  status: { type: String, default: 'open' }
}, { _id: false });

const nearbySpotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  badge: { type: String, default: '' },
  badgeType: { type: String, default: 'open' },
  distance: { type: String, default: '' },
  desc: { type: String, default: '' }
}, { _id: false });

const campsiteSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  classification: { 
    type: String, 
    default: 'Official DWC National Park Camp'
  },
  location: { type: String, required: true, trim: true },
  province: { type: String, required: true, trim: true },
  district: { type: String, required: true, trim: true },
  terrainBelt: { 
    type: String, 
    default: 'Central Highlands' 
  },
  elevation: { type: String, default: '1,480m ASL' },
  gps: { type: String, default: '' },
  rangerStation: { type: String, default: '' },
  difficulty: { 
    type: String, 
    enum: ['easy', 'moderate', 'extreme'], 
    default: 'extreme' 
  },
  featureBadge: { type: String, default: '' },
  featureBadgeType: { type: String, default: 'green' },

  // Pitch capacity & tariffs
  pitchesCount: { type: Number, default: 4 },
  pitchesLabel: { type: String, default: '4 Pitches' },
  maxCampers: { type: Number, default: 16 },
  campersLabel: { type: String, default: 'Max 16 Campers' },
  footprint: { type: String, default: '2-man & 4-man footprint' },
  tariffLkr: { type: String, default: 'LKR 2,500' },
  tariffUnit: { type: String, default: 'pitch' },
  tariffExtra: { type: String, default: '+ DWC Wildlife Entry' },
  tariffUsd: { type: String, default: '$25.00' },
  rangerTariff: { type: String, default: 'Rs. 3,500 / day (DWC Field Guide)' },
  season: { type: String, default: 'Jan – Apr & Jul – Sep' },
  duration: { type: String, default: 'Max 2 consecutive nights' },

  // Status
  status: { 
    type: String, 
    enum: ['open', 'caution', 'danger', 'draft'], 
    default: 'open' 
  },
  statusText: { type: String, default: 'OPEN • SPRING RUNNING' },
  statusSub: { type: String, default: 'No flash-flood warning' },
  clearanceOffice: { type: String, default: 'Forest Dept Range Office' },
  clearanceSub: { type: String, default: 'Hunnasgiriya Sub-Post' },
  lastSynced: { type: String, default: '15 mins ago' },
  lastSyncedChannel: { type: String, default: 'via Matale VHF' },

  // Filter attributes
  hasWaterSpring: { type: Boolean, default: true },
  requiresRanger: { type: Boolean, default: false },
  maxGroup12: { type: Boolean, default: true },

  // Detail view attributes
  subtitle: { type: String, default: '' },
  tagline: { type: String, default: '' },
  trailApproach: { type: String, default: '' },
  temperature: { type: String, default: '16°C (Mist)' },
  image: { type: String, default: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=80' },
  badges: [{
    label: { type: String, required: true },
    variant: { type: String, default: 'green' }
  }],
  specs: [{
    label: { type: String, required: true },
    value: { type: String, required: true },
    sub: { type: String, default: '' }
  }],
  gearChecklist: [gearChecklistSchema],
  rulesQuadrants: [ruleQuadrantSchema],
  rangerOffice: {
    hotline: { type: String, default: '+94 66 222 4110' },
    hotlineSub: { type: String, default: 'Hunnasgiriya Range Headquarters (24/7 Desk)' },
    channel: { type: String, default: 'Channel 88 (146.520 MHz)' },
    channelCallsign: { type: String, default: "Callsign: 'Dumbara Cloud Guard Beta'" },
    rescueSiding: { type: String, default: 'Deanston Beat Office' },
    rescueSub: { type: String, default: 'Satellite link active (Iridium PTT Relay)' }
  },
  corridorAccess: [corridorAccessSchema],
  nearbySpots: [nearbySpotSchema],

  // Form check and input fields
  facilities: {
    spring: { type: Boolean, default: true },
    latrine: { type: Boolean, default: true },
    ring: { type: Boolean, default: true },
    foodCache: { type: Boolean, default: true },
    solar: { type: Boolean, default: false },
    noGenerators: { type: Boolean, default: true }
  },
  rules: {
    general: { type: String, default: '' },
    environmental: { type: String, default: '' },
    fire: { type: String, default: '' },
    wildlife: { type: String, default: '' }
  },
  contacts: {
    hotline: { type: String, default: '+94 66 222 4110' },
    vhfChannel: { type: String, default: 'Channel 88 (146.520 MHz)' },
    medicalCenter: { type: String, default: 'Teldeniya Base (38km)' }
  },
  smsSummary: { type: String, maxLength: 140, default: '' },
  overview: { type: String, default: '' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

campsiteSchema.index({ name: 'text', location: 'text', district: 'text', terrainBelt: 'text' });

export default mongoose.model('Campsite', campsiteSchema);
