import express from 'express';
import { getStats, getStories, createStory, updateStory, deleteStory, getProblem, updateProblem } from '../controllers/impactController.js';

const router = express.Router();

/**
 * @swagger
 * /impact/stats:
 *   get:
 *     tags: [Impact]
 *     summary: Aggregate impact statistics across all active notices
 *     responses:
 *       200:
 *         description: Stats
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ImpactStats' }
 */
router.get('/stats', getStats);

/**
 * @swagger
 * /impact/stories:
 *   get:
 *     tags: [Impact]
 *     summary: List impact stories
 *     responses:
 *       200: { description: Stories }
 *   post:
 *     tags: [Impact]
 *     summary: Create an impact story
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object }
 *     responses:
 *       201: { description: Created }
 */
router.route('/stories')
  .get(getStories)
  .post(createStory);

/**
 * @swagger
 * /impact/stories/{id}:
 *   put:
 *     tags: [Impact]
 *     summary: Update an impact story
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object }
 *     responses:
 *       200: { description: Updated }
 *       404: { $ref: '#/components/responses/NotFound' }
 *   delete:
 *     tags: [Impact]
 *     summary: Delete an impact story
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Deleted }
 *       404: { $ref: '#/components/responses/NotFound' }
 */
router.route('/stories/:id')
  .put(updateStory)
  .delete(deleteStory);

/**
 * @swagger
 * /impact/problem:
 *   get:
 *     tags: [Impact]
 *     summary: Get "the problem" statement content
 *     responses:
 *       200: { description: Problem statement }
 *   put:
 *     tags: [Impact]
 *     summary: Update "the problem" statement content
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object }
 *     responses:
 *       200: { description: Updated }
 */
router.route('/problem')
  .get(getProblem)
  .put(updateProblem);

export default router;
