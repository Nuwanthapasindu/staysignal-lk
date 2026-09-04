import mongoose from 'mongoose';
import { REGULATION_CATEGORIES, REGULATION_SEVERITIES } from './enums.js';

const placeRegulationSchema = new mongoose.Schema({
  place_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  category: { type: String, enum: REGULATION_CATEGORIES, required: true },
  title: { type: String, required: true },
  description: { type: String },
  severity: { type: String, enum: REGULATION_SEVERITIES, required: true },
  is_mandatory: { type: Boolean, default: false },
  display_order: { type: Number, default: 0 }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model('PlaceRegulation', placeRegulationSchema);
