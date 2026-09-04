import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  jti: { type: String, required: true, unique: true },
  token_hash: { type: String, required: true },
  expires_at: { type: Date, required: true },
  revoked_at: { type: Date, default: null }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

export default mongoose.model('RefreshToken', refreshTokenSchema);
