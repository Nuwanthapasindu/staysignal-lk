import mongoose from 'mongoose';

const placeImageSchema = new mongoose.Schema({
  place_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  image_url: { type: String, required: true },
  caption: { type: String },
  display_order: { type: Number, default: 0 },
  is_cover: { type: Boolean, default: false }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

export default mongoose.model('PlaceImage', placeImageSchema);
