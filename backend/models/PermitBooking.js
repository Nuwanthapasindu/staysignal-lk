import mongoose from 'mongoose';

const permitBookingSchema = new mongoose.Schema({
  bookingId: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true, 
    trim: true,
    default: () => 'DWC-KNK-' + Math.floor(1000 + Math.random() * 9000)
  },
  campsiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campsite' },
  campsiteSlug: { type: String, required: true },
  campsiteName: { type: String, required: true },
  applicantName: { type: String, required: true, trim: true },
  email: { type: String, default: '' },
  phone: { type: String, required: true, trim: true },
  numCampers: { type: Number, required: true, min: 1, max: 24, default: 2 },
  numPitches: { type: Number, required: true, min: 1, max: 6, default: 1 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  numNights: { type: Number, required: true, min: 1, max: 2, default: 1 },
  totalFee: { type: String, default: 'USD $25' },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'rejected'], 
    default: 'confirmed' 
  },
  rangerVerificationDesk: { type: String, default: 'Deanston Beat Office' },
  notes: { type: String, default: 'DWC Paper Receipt copy required upon trail entry.' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model('PermitBooking', permitBookingSchema);
