import mongoose from 'mongoose';
import { STATUSES } from './enums.js';

const noticeEventSchema = new mongoose.Schema({
  notice_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Notice', required: true },
  event_type: { type: String, required: true },
  from_status: { type: String, enum: STATUSES, default: null },
  to_status: { type: String, enum: STATUSES, default: null },
  actor_phone: { type: String, required: true },
  note: { type: String, default: null },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('NoticeEvent', noticeEventSchema);
