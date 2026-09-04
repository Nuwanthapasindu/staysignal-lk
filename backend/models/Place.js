import mongoose from 'mongoose';
import { PLACE_TYPES } from './enums.js';

const placeSchema = new mongoose.Schema({
  town_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Town', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, enum: PLACE_TYPES, required: true },
  short_description: { type: String },
  description: { type: String },
  lat: { type: Number, default: null },
  lng: { type: Number, default: null },
  entry_fee: { type: Number, default: null },
  opening_time: { type: String },
  closing_time: { type: String },
  best_time_to_visit: { type: String },
  is_active: { type: Boolean, default: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model('Place', placeSchema);
