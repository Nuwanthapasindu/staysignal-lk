import mongoose from 'mongoose';

const corridorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  from_town_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Town', required: true },
  to_town_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Town', required: true },
  notes: { type: String, default: null }
});

export default mongoose.model('Corridor', corridorSchema);
