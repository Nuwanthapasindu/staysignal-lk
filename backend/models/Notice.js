import mongoose from 'mongoose';
import { ISSUES, STATUSES } from './enums.js';

const noticeSchema = new mongoose.Schema({
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  town_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Town', required: true },
  corridor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Corridor', default: null },
  issue_type: { type: String, enum: ISSUES, required: true },
  status: { type: String, enum: STATUSES, required: true },
  title: { type: String, required: true },
  guest_instruction: { type: String, required: true },
  valid_from: { type: Date, required: true },
  valid_until: { type: Date, required: true },
  alternate_property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', default: null },
  resolved_at: { type: Date, default: null }
}, { 
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model('Notice', noticeSchema);
