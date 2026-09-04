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

// Ticker endpoint
router.get('/ticker', getTicker);

// Notice endpoints — reads are public, writes are owner-only
router.get('/notices', listNotices);
router.post('/notices', ownerOnly, noticeValidationMiddleware, createNotice);
router.get('/notices/:id', getNotice);
router.get('/notices/:id/alternatives', getAlternatives);
router.put('/notices/:id', ownerOnly, updateNotice);
router.delete('/notices/:id', ownerOnly, deleteNotice);

export default router;
