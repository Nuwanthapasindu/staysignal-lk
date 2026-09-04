import mongoose from 'mongoose';

const impactSnapshotSchema = new mongoose.Schema({
  stays_reporting: { type: Number, required: true },
  towns_affected: { type: Number, required: true },
  guests_warned: { type: Number, required: true },
  taken_at: { type: Date, default: Date.now }
});

export default mongoose.model('ImpactSnapshot', impactSnapshotSchema);
