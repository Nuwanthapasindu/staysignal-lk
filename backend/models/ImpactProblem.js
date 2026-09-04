import mongoose from 'mongoose';

const impactProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  context: { type: String, required: true },
  description: { type: String, required: true },
  solution: { type: String, required: true },
  details: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('ImpactProblem', impactProblemSchema);
