import mongoose from 'mongoose';
import { CONTACT_TYPES } from './enums.js';

const placeContactSchema = new mongoose.Schema({
  place_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  contact_type: { type: String, enum: CONTACT_TYPES, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String }
});

export default mongoose.model('PlaceContact', placeContactSchema);
