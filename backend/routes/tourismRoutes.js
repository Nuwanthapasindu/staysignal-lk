import express from 'express';
import {
  getDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  updateStatus,
  deleteDestination,
  addDestinationImages,
  deleteDestinationImage,
  getTourismStats,
} from '../controllers/tourismController.js';
import { uploadTourismImages } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getDestinations)
  .post(uploadTourismImages, createDestination);

router.get('/stats', getTourismStats);

router.route('/:id')
  .put(uploadTourismImages, updateDestination)
  .delete(deleteDestination);

router.patch('/:id/status', updateStatus);

// Image sub-resource
router.post('/:id/images', uploadTourismImages, addDestinationImages);
router.delete('/:id/images/:imageId', deleteDestinationImage);

// Slug access
router.get('/slug/:slug', getDestinationBySlug);
router.get('/:slug', getDestinationBySlug);

export default router;
