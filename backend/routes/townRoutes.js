import express from 'express';
import { listTowns } from '../controllers/townController.js';

const router = express.Router();

/**
 * @swagger
 * /towns:
 *   get:
 *     tags: [Geography]
 *     summary: List all monitored towns
 *     responses:
 *       200:
 *         description: Towns
 *         content:
 *           application/json:
 *             schema: { type: array, items: { $ref: '#/components/schemas/Town' } }
 */
router.get('/towns', listTowns);

export default router;
