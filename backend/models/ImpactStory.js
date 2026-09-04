import mongoose from 'mongoose';

const impactStorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  headline: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const ImpactStory = mongoose.models.ImpactStory || mongoose.model('ImpactStory', impactStorySchema);
export default ImpactStory;
