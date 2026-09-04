import mongoose from 'mongoose';

const placePermitSchema = new mongoose.Schema({
  place_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  name: { type: String, required: true },
  description: { type: String },
  authority: { type: String },
  required: { type: Boolean, default: true },
  instructions: { type: String }
});

export default mongoose.model('PlacePermit', placePermitSchema);
