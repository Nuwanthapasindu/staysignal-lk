import { Router } from 'express';
import { rateLimit } from '../middleware/rateLimit.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import * as controller from '../controllers/auth.controller.js';

const router = Router();

const writeLimit = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });

router.post('/signup/traveller', writeLimit, controller.signupTraveller);
router.post('/signup/owner', writeLimit, controller.signupOwner);
router.post('/login', writeLimit, controller.login);
router.post('/refresh', controller.refresh);
router.post('/logout', controller.logout);
router.get('/me', requireAuth, controller.me);

export default router;
