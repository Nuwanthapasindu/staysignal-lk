import express from 'express';
import {
  getTowns,
  getTownBySlug,
  getCorridors,
  getProperties,
  getImpact
} from '../controllers/geographyController.js';

const router = express.Router();

router.get('/towns', getTowns);
router.get('/towns/:slug', getTownBySlug);
router.get('/corridors', getCorridors);
router.get('/properties', getProperties);
router.get('/impact', getImpact);

export default router;
