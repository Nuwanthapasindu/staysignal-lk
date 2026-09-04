import express from 'express';
import {
  getNotices,
  getNoticeById,
  createNotice,
  updateNotice
} from '../controllers/noticesController.js';

const router = express.Router();

router.route('/')
  .get(getNotices)
  .post(createNotice);

router.route('/:id')
  .get(getNoticeById)
  .put(updateNotice);

export default router;
