import mongoose from 'mongoose';
import { ACTIVITIES } from './enums.js';

const placeActivitySchema = new mongoose.Schema({
  place_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  activity_type: { type: String, enum: ACTIVITIES, required: true },
  description: { type: String }
});

export default mongoose.model('PlaceActivity', placeActivitySchema);
