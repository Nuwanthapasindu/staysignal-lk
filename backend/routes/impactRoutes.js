import express from 'express';
import { getStats, getStories, createStory, updateStory, deleteStory, getProblem, updateProblem } from '../controllers/impactController.js';

const router = express.Router();

/**
 * @swagger
 * /api/impact/stats:
 *   get:
 *     summary: Get impact stats
 *     description: Aggregates active notices to count unique stays reporting, towns affected, guests warned, and notices resolved today.
 *     responses:
 *       200:
 *         description: A successful response with stats.
 */
router.get('/stats', getStats);

/**
 * @swagger
 * /api/impact/stories:
 *   get:
 *     summary: Get impact stories
 *     description: Returns the seeded user stories.
 *     responses:
 *       200:
 *         description: A successful response with stories.
 *   post:
 *     summary: Create a new impact story
 *     description: Create a new impact story
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               headline:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: A successful response with the created story.
 */
router.route('/stories')
  .get(getStories)
  .post(createStory);

/**
 * @swagger
 * /api/impact/stories/{id}:
 *   put:
 *     summary: Update an impact story
 *     description: Update an impact story by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               headline:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: A successful response with the updated story.
 *   delete:
 *     summary: Delete an impact story
 *     description: Delete an impact story by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Story deleted successfully.
 */
router.route('/stories/:id')
  .put(updateStory)
  .delete(deleteStory);

/**
 * @swagger
 * /api/impact/problem:
 *   get:
 *     summary: Get the impact problem statement
 *     description: Returns the static text about the problem statement.
 *     responses:
 *       200:
 *         description: A successful response with the problem statement.
 *   put:
 *     summary: Update the impact problem statement
 *     description: Updates the impact problem statement.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               context:
 *                 type: string
 *               description:
 *                 type: string
 *               solution:
 *                 type: string
 *               details:
 *                 type: string
 *     responses:
 *       200:
 *         description: A successful response with the updated problem statement.
 */
router.route('/problem')
  .get(getProblem)
  .put(updateProblem);

export default router;
