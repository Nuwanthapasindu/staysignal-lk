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
 */
router.route('/')
  .get(getDestinations)
  .post(uploadTourismImages, createDestination);

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
 *       404: { $ref: '#/components/responses/NotFound' }
 *   delete:
 *     tags: [Tourism]
 *     summary: Delete a destination and purge its uploaded images from disk
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Deleted }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.route('/:id')
  .put(uploadTourismImages, updateDestination)
  .delete(deleteDestination);

/**
 * @swagger
 * /tourism/{id}/status:
 *   patch:
 *     tags: [Tourism]
 *     summary: Update just the operational status of a destination
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
router.patch('/:id/status', updateStatus);

/**
 * @swagger
 * /tourism/{id}/images:
 *   post:
 *     tags: [Tourism]
 *     summary: Add one or more images to an existing destination
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
router.post('/:id/images', uploadTourismImages, addDestinationImages);

/**
 * @swagger
 * /tourism/{id}/images/{imageId}:
 *   delete:
 *     tags: [Tourism]
 *     summary: Remove a single image from a destination (and delete the file on disk)
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
router.delete('/:id/images/:imageId', deleteDestinationImage);

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
