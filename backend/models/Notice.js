import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      unique: true,
      sparse: true,
    },
    // Owner account that published this notice. Absent on legacy/seed
    // records. Used to scope edit/delete to the creator.
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    town: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    townName: {
      type: String,
      required: true,
      trim: true,
    },
    corridor: {
      type: String,
      required: true,
      trim: true,
    },
    issue: {
      type: String,
      required: true,
      enum: [
        'landslide',
        'road_closed',
        'flooded_access',
        'no_water',
        'power_cut',
        'bridge_unsafe',
        'network_down',
        'relocation',
      ],
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['open', 'caution', 'disrupted', 'closed', 'resolved'],
      default: 'open',
      index: true,
    },
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    bypassAdvice: {
      type: String,
      default: '',
    },
    utilities: {
      generatorStatus: { type: String, default: 'Operational' },
      waterStatus: { type: String, default: 'Normal' },
      connectivityStatus: { type: String, default: 'Active' },
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    verifiedBy: {
      type: String,
      required: true,
      trim: true,
    },
    verifiedAt: {
      type: Date,
      default: Date.now,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Helper virtual for uniform id access
noticeSchema.virtual('id').get(function () {
  return this.customId || this._id.toHexString();
});

noticeSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.customId || ret._id;
    return ret;
  },
});

const Notice = mongoose.models.Notice || mongoose.model('Notice', noticeSchema);
export default Notice;
