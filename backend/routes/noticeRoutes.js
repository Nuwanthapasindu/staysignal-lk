import express from 'express';
import {
  listNotices,
  getNotice,
  getAlternatives,
  getTicker,
  createNotice,
} from '../controllers/noticeController.js';

const router = express.Router();

// Ticker endpoint
router.get('/ticker', getTicker);

// Notice endpoints
router.get('/notices', listNotices);
router.post('/notices', createNotice);
router.get('/notices/:id', getNotice);
router.get('/notices/:id/alternatives', getAlternatives);

export default router;
