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
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

const ownerOnly = [requireAuth, requireRole('owner')];

/**
 * @swagger
 * /tourism:
 *   get:
 *     tags: [Tourism]
 *     summary: List tourism destinations
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: province
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [open, caution, danger, draft] }
 *     responses:
 *       200:
 *         description: Destinations + registry stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 stats: { $ref: '#/components/schemas/TourismStats' }
 *                 count: { type: integer }
 *                 data: { type: array, items: { $ref: '#/components/schemas/TourismDestination' } }
 *   post:
 *     tags: [Tourism]
 *     summary: Register a new tourism destination (with optional images)
 *     security: [{ bearerAuth: [] }]
 *     description: Owner role required. The destination is stamped with the creating owner.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema: { $ref: '#/components/schemas/TourismDestinationInput' }
 *     responses:
 *       201:
 *         description: Destination created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: { success: { type: boolean }, data: { $ref: '#/components/schemas/TourismDestination' } }
 *       400:
 *         description: Validation failed / bad image upload
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.route('/')
  .get(getDestinations)
  .post(ownerOnly, uploadTourismImages, createDestination);

/**
 * @swagger
 * /tourism/stats:
 *   get:
 *     tags: [Tourism]
 *     summary: Aggregate registry statistics
 *     responses:
 *       200:
 *         description: Stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: { success: { type: boolean }, data: { $ref: '#/components/schemas/TourismStats' } }
 */
router.get('/stats', getTourismStats);

/**
 * @swagger
 * /tourism/{id}:
 *   put:
 *     tags: [Tourism]
 *     summary: Update a destination (accepts Mongo _id or slug); add/remove images
 *     security: [{ bearerAuth: [] }]
 *     description: Owner role required, and only the owner who created this destination.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Mongo _id or slug
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema: { $ref: '#/components/schemas/TourismDestinationInput' }
 *     responses:
 *       200:
 *         description: Updated destination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: { success: { type: boolean }, data: { $ref: '#/components/schemas/TourismDestination' } }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403:
 *         description: Wrong role, or this destination belongs to a different owner
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } }
 *       404: { $ref: '#/components/responses/NotFound' }
 *   delete:
 *     tags: [Tourism]
 *     summary: Delete a destination and purge its uploaded images from disk
 *     security: [{ bearerAuth: [] }]
 *     description: Owner role required, and only the owner who created this destination.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Deleted }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403:
 *         description: Wrong role, or this destination belongs to a different owner
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.route('/:id')
  .put(ownerOnly, uploadTourismImages, updateDestination)
  .delete(ownerOnly, deleteDestination);

/**
 * @swagger
 * /tourism/{id}/status:
 *   patch:
 *     tags: [Tourism]
 *     summary: Update just the operational status of a destination
 *     security: [{ bearerAuth: [] }]
 *     description: Owner role required, and only the owner who created this destination.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [open, caution, danger, draft] }
 *               statusText: { type: string }
 *               statusSub: { type: string }
 *     responses:
 *       200:
 *         description: Updated destination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: { success: { type: boolean }, data: { $ref: '#/components/schemas/TourismDestination' } }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.patch('/:id/status', ownerOnly, updateStatus);

/**
 * @swagger
 * /tourism/{id}/images:
 *   post:
 *     tags: [Tourism]
 *     summary: Add one or more images to an existing destination
 *     security: [{ bearerAuth: [] }]
 *     description: Owner role required, and only the owner who created this destination.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images: { type: array, items: { type: string, format: binary } }
 *     responses:
 *       200:
 *         description: Destination with the new images appended
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: { success: { type: boolean }, data: { $ref: '#/components/schemas/TourismDestination' } }
 *       400:
 *         description: No files received / invalid image
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.post('/:id/images', ownerOnly, uploadTourismImages, addDestinationImages);

/**
 * @swagger
 * /tourism/{id}/images/{imageId}:
 *   delete:
 *     tags: [Tourism]
 *     summary: Remove a single image from a destination (and delete the file on disk)
 *     security: [{ bearerAuth: [] }]
 *     description: Owner role required, and only the owner who created this destination.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Destination with the image removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: { success: { type: boolean }, data: { $ref: '#/components/schemas/TourismDestination' } }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.delete('/:id/images/:imageId', ownerOnly, deleteDestinationImage);

/**
 * @swagger
 * /tourism/slug/{slug}:
 *   get:
 *     tags: [Tourism]
 *     summary: Get a destination by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Destination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: { success: { type: boolean }, data: { $ref: '#/components/schemas/TourismDestination' } }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get('/slug/:slug', getDestinationBySlug);
router.get('/:slug', getDestinationBySlug);

export default router;
