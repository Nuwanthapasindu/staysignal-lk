import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, default: 'landmark' }
}, { _id: false });

const galleryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }
}, { _id: false });

// Uploaded site photography (multer local-fs adapter). `path` is the
// storage-relative path used to delete the file; `url` is browser-facing.
const uploadedImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  path: { type: String, required: true },
  originalName: { type: String, default: '' },
  size: { type: Number, default: 0 },
  uploadedAt: { type: Date, default: Date.now }
}, { _id: true });

const siteRuleItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  desc: { type: String, required: true }
}, { _id: false });

const siteRuleQuadrantSchema = new mongoose.Schema({
  title: { type: String, required: true },
  badge: { type: String, default: '' },
  variant: { type: String, default: 'neutral' }, // 'danger', 'caution', 'green', 'neutral'
  desc: { type: String, default: '' },
  rules: [siteRuleItemSchema]
}, { _id: false });

const corridorRadarSchema = new mongoose.Schema({
  route: { type: String, required: true },
  status: { type: String, default: 'Clear' },
  statusVariant: { type: String, default: 'open' },
  desc: { type: String, default: '' }
}, { _id: false });

const campAndStaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  badge: { type: String, default: 'VERIFIED SAFE' },
  variant: { type: String, default: 'open' },
  desc: { type: String, default: '' }
}, { _id: false });

const hotlineSchema = new mongoose.Schema({
  label: { type: String, required: true },
  number: { type: String, required: true },
  isPrimary: { type: Boolean, default: false },
  isEmergency: { type: Boolean, default: false }
}, { _id: false });

const tourismDestinationSchema = new mongoose.Schema({
  // Owner account that registered this destination. Absent on legacy/seed
  // records. Used to scope edit/delete to the creator.
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  nodeId: { type: String, required: true, trim: true }, // e.g. UNESCO-LK-0014
  category: { 
    type: String, 
    required: true,
    enum: [
      'Heritage & Archaeological',
      'Nature & Hiking',
      'Viewpoints & Walking',
      'National Park & Cloud Forest',
      'Waterfalls & Gorges',
      'Coastal & Marine'
    ]
  },
  categoryIcon: { type: String, default: 'landmark' },
  province: { type: String, required: true, trim: true },
  district: { type: String, required: true, trim: true },
  elevation: { type: String, default: '349m ASL' },
  gps: { type: String, default: '' },
  corridor: { type: String, default: '' },
  difficulty: { type: String, enum: ['easy', 'moderate', 'steep'], default: 'moderate' },
  status: { 
    type: String, 
    enum: ['open', 'caution', 'danger', 'draft'], 
    default: 'open' 
  },
  statusText: { type: String, default: 'PUBLISHED / OPEN' },
  statusSub: { type: String, default: '' },
  foreignTariff: { type: String, default: 'USD 36 (Foreign)' },
  localTariff: { type: String, default: 'LKR 150 (Local Citizen)' },
  saarcTariff: { type: String, default: 'USD 18 (SAARC Regional)' },
  operatingHours: { type: String, default: '06:30 – 17:30 Daily' },
  guideRequirement: { type: String, default: 'SLTDA Certified Guide Optional' },
  smsSummary: { type: String, maxLength: 140, default: '' },
  overview: { type: String, default: '' },
  heroImage: { type: String, default: '' },
  images: { type: [uploadedImageSchema], default: [] },
  ecoRestricted: { type: Boolean, default: false },
  verifiedAgo: { type: String, default: 'Just now' },
  verifiedDesk: { type: String, default: 'SLTDA Field Desk' },

  // Detailed fields for dossier view
  subHeading: { type: String, default: '' },
  specs: [{
    label: { type: String, required: true },
    value: { type: String, required: true },
    sub: { type: String, default: '' }
  }],
  dossier: {
    title: { type: String, default: '' },
    badge: { type: String, default: 'FIELD DOSSIER • CULTURAL TRIANGLE' },
    ref: { type: String, default: '' },
    paragraphs: [{ type: String }],
    highlights: [highlightSchema],
    gallery: [galleryItemSchema]
  },
  siteRules: [siteRuleQuadrantSchema],
  corridorRadar: [corridorRadarSchema],
  campAndStay: [campAndStaySchema],
  hotlines: [hotlineSchema],

  // Form check items
  regulations: {
    plastics: { type: Boolean, default: true },
    drones: { type: Boolean, default: true },
    frescoes: { type: Boolean, default: true },
    hornets: { type: Boolean, default: true },
    attire: { type: Boolean, default: true },
    macaques: { type: Boolean, default: true }
  },
  contacts: {
    touristPolice: { type: String, default: '+94 66 228 6520' },
    hospital: { type: String, default: 'Dambulla Base Hospital (14km)' },
    ambulance: { type: String, default: '1990 Suwa Seriya (Free Dispatch)' }
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

tourismDestinationSchema.index({ name: 'text', district: 'text', corridor: 'text', nodeId: 'text' });

export default mongoose.model('TourismDestination', tourismDestinationSchema);
