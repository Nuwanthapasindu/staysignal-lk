import express from 'express';
import {
  listNotices,
  getNotice,
  getAlternatives,
  getTicker,
  createNotice,
  updateNotice,
  deleteNotice,
} from '../controllers/noticeController.js';
import { noticeValidationMiddleware } from '../validators/noticeValidator.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

const ownerOnly = [requireAuth, requireRole('owner')];

/**
 * @swagger
 * /ticker:
 *   get:
 *     tags: [Notices]
 *     summary: Live ticker feed of urgent / disrupted notices
 *     responses:
 *       200:
 *         description: Ticker items + aggregate counts
 */
router.get('/ticker', getTicker);

/**
 * @swagger
 * /notices:
 *   get:
 *     tags: [Notices]
 *     summary: List disruption notices
 *     parameters:
 *       - in: query
 *         name: town
 *         schema: { type: string }
 *       - in: query
 *         name: issue
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [open, caution, disrupted, closed, resolved] }
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *         description: Free-text search across title, headline, description, corridor, town
 *       - in: query
 *         name: from
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: to
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: sort
 *         schema: { type: string, enum: [newest, oldest, severity, town] }
 *     responses:
 *       200:
 *         description: Notices + aggregate stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notices: { type: array, items: { $ref: '#/components/schemas/Notice' } }
 *                 totalCount: { type: integer }
 *                 stats: { type: object }
 *   post:
 *     tags: [Notices]
 *     summary: Publish a new disruption notice
 *     security: [{ bearerAuth: [] }]
 *     description: Owner role required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/NoticeInput' }
 *     responses:
 *       201:
 *         description: Notice created
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Notice' } } }
 *       400:
 *         description: Validation failed
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 */
router.get('/notices', listNotices);
router.post('/notices', ownerOnly, noticeValidationMiddleware, createNotice);

/**
 * @swagger
 * /notices/{id}:
 *   get:
 *     tags: [Notices]
 *     summary: Get a single notice by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Notice
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Notice' } } }
 *       404: { $ref: '#/components/responses/NotFound' }
 *   put:
 *     tags: [Notices]
 *     summary: Update a notice
 *     security: [{ bearerAuth: [] }]
 *     description: Owner role required. Fields are merged into the existing record and re-validated as a whole.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/NoticeInput' }
 *     responses:
 *       200:
 *         description: Updated notice
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Notice' } } }
 *       400:
 *         description: Validation failed
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/NotFound' }
 *   delete:
 *     tags: [Notices]
 *     summary: Delete a notice
 *     security: [{ bearerAuth: [] }]
 *     description: Owner role required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted
 *       401: { $ref: '#/components/responses/Unauthorized' }
 *       403: { $ref: '#/components/responses/Forbidden' }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.get('/notices/:id', getNotice);
router.put('/notices/:id', ownerOnly, updateNotice);
router.delete('/notices/:id', ownerOnly, deleteNotice);

/**
 * @swagger
 * /notices/{id}/alternatives:
 *   get:
 *     tags: [Notices]
 *     summary: Nearby open stays in the same town as an alternative
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Array of alternative notices
 *         content:
 *           application/json:
 *             schema: { type: array, items: { $ref: '#/components/schemas/Notice' } }
 */
router.get('/notices/:id/alternatives', getAlternatives);

export default router;
