import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  town_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Town', required: true },
  owner_name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  typical_occupancy: { type: Number, required: true },
  is_active: { type: Boolean, default: null },
  lat: { type: Number, default: null },
  lng: { type: Number, default: null }
});

export default mongoose.model('Property', propertySchema);
