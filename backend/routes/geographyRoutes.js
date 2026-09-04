import express from 'express';
import {
  getTowns,
  getTownBySlug,
  getCorridors,
  getProperties,
  getImpact
} from '../controllers/geographyController.js';

const router = express.Router();

// Note: GET /towns here is shadowed by townRoutes.js (mounted earlier in
// app.js), which serves the live in-memory town list. Documented once there.
router.get('/towns', getTowns);

/**
 * @swagger
 * /towns/{slug}:
 *   get:
 *     tags: [Geography]
 *     summary: Get a single town by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Town
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Town' } } }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get('/towns/:slug', getTownBySlug);

/**
 * @swagger
 * /corridors:
 *   get:
 *     tags: [Geography]
 *     summary: List road corridors
 *     responses:
 *       200: { description: Corridors }
 */
router.get('/corridors', getCorridors);

/**
 * @swagger
 * /properties:
 *   get:
 *     tags: [Geography]
 *     summary: List guest-house properties
 *     responses:
 *       200: { description: Properties }
 */
router.get('/properties', getProperties);

/**
 * @swagger
 * /impact:
 *   get:
 *     tags: [Geography]
 *     summary: Geography-scoped impact summary
 *     responses:
 *       200: { description: Impact summary }
 */
router.get('/impact', getImpact);

export default router;
