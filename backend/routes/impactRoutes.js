import express from 'express';
import { getStats, getStories, createStory, updateStory, deleteStory, getProblem, updateProblem } from '../controllers/impactController.js';

const router = express.Router();

router.get('/stats', getStats);

router.route('/stories')
  .get(getStories)
  .post(createStory);

router.route('/stories/:id')
  .put(updateStory)
  .delete(deleteStory);

router.route('/problem')
  .get(getProblem)
  .put(updateProblem);

export default router;
