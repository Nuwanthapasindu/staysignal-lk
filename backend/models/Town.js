import mongoose from 'mongoose';
import { BELTS } from './enums.js';

const townSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  district: { type: String, required: true },
  province: { type: String, required: true },
  belt: { type: String, enum: BELTS, required: true },
  lat: { type: Number, default: null },
  lng: { type: Number, default: null }
});

export default mongoose.model('Town', townSchema);
