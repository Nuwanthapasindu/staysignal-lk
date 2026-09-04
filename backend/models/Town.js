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

