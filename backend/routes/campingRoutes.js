import express from 'express';
import {
  getCampsites,
  getCampsiteBySlug,
  createCampsite,
  updateCampsite,
  updateStatus,
  deleteCampsite,
  createPermit
} from '../controllers/campingController.js';

const router = express.Router();

router.route('/')
  .get(getCampsites)
  .post(createCampsite);

router.post('/:slug/permit', createPermit);

router.route('/:id')
  .put(updateCampsite)
  .delete(deleteCampsite);

router.patch('/:id/status', updateStatus);

// Slug access
router.get('/slug/:slug', getCampsiteBySlug);
router.get('/:slug', getCampsiteBySlug);

export default router;
