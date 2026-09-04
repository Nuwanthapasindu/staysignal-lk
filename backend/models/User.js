import mongoose from 'mongoose';
import { USER_ROLES } from './enums.js';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: USER_ROLES, required: true },
  phone: { type: String, default: null }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: {
    transform(_doc, ret) {
      delete ret.password_hash;
      delete ret.__v;
      return ret;
    }
  }
});

export default mongoose.model('User', userSchema);
