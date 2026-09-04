import express from 'express';
import { listTowns } from '../controllers/townController.js';

const router = express.Router();

router.get('/towns', listTowns);

export default router;
