import express from 'express';
import tourismRoutes from './tourismRoutes.js';
import noticesRoutes from './noticesRoutes.js';
import geographyRoutes from './geographyRoutes.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'StaySignal LK Operational Field Ledger API',
    timestamp: new Date().toISOString()
  });
});

router.use('/tourism', tourismRoutes);
router.use('/notices', noticesRoutes);
router.use('/', geographyRoutes);

export default router;
