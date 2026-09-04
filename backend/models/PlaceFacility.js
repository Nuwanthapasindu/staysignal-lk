import mongoose from 'mongoose';
import { FACILITIES } from './enums.js';

const placeFacilitySchema = new mongoose.Schema({
  place_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  facility_type: { type: String, enum: FACILITIES, required: true },
  description: { type: String }
});

export default mongoose.model('PlaceFacility', placeFacilitySchema);
