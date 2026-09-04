import express from 'express';
import {
  getDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  updateStatus,
  deleteDestination,
  getTourismStats
} from '../controllers/tourismController.js';

const router = express.Router();

router.route('/')
  .get(getDestinations)
  .post(createDestination);

router.get('/stats', getTourismStats);

router.route('/:id')
  .put(updateDestination)
  .delete(deleteDestination);

router.patch('/:id/status', updateStatus);

// Slug access
router.get('/slug/:slug', getDestinationBySlug);
router.get('/:slug', getDestinationBySlug);

export default router;
