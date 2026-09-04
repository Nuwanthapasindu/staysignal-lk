import mongoose from 'mongoose';

const townSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    corridor: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    province: {
      type: String,
      default: 'Central',
    },
  },
  {
    timestamps: true,
  }
);

townSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id;
    return ret;
  },
});

const Town = mongoose.models.Town || mongoose.model('Town', townSchema);
export default Town;
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
