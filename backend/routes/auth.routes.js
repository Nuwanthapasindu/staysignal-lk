import { Router } from 'express';
import { rateLimit } from '../middleware/rateLimit.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import * as controller from '../controllers/auth.controller.js';

const router = Router();

const writeLimit = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });

/**
 * @swagger
 * /auth/signup/traveller:
 *   post:
 *     tags: [Auth]
 *     summary: Register a traveller account
 *     description: Creates the account only — no session is started. Redirect the user to /login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, confirmPassword]
 *             properties:
 *               name: { type: string, example: Kasun Silva }
 *               email: { type: string, format: email, example: kasun@gmail.com }
 *               password: { type: string, example: Travel123! }
 *               confirmPassword: { type: string, example: Travel123! }
 *               phone: { type: string, example: "0771234567", description: Optional for travellers }
 *     responses:
 *       201:
 *         description: Account created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: { user: { $ref: '#/components/schemas/User' } }
 *       400:
 *         description: Validation failed
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } }
 *       409:
 *         description: Email already registered
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } }
 */
router.post('/signup/traveller', writeLimit, controller.signupTraveller);

/**
 * @swagger
 * /auth/signup/owner:
 *   post:
 *     tags: [Auth]
 *     summary: Register a guest-house owner account
 *     description: Creates the account only — no session is started. Redirect the user to /login. Phone is required (SL mobile format).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, confirmPassword, phone]
 *             properties:
 *               name: { type: string, example: Amali Perera }
 *               email: { type: string, format: email, example: amali@zionview.lk }
 *               password: { type: string, example: Owner123! }
 *               confirmPassword: { type: string, example: Owner123! }
 *               phone: { type: string, example: "0771234567" }
 *     responses:
 *       201:
 *         description: Account created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: { user: { $ref: '#/components/schemas/User' } }
 *       400:
 *         description: Validation failed (e.g. missing/invalid phone)
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } }
 *       409:
 *         description: Email already registered
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } }
 */
router.post('/signup/owner', writeLimit, controller.signupOwner);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in with email + password
 *     description: Works for both roles. Sets an httpOnly refresh-token cookie scoped to /api/auth and returns an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Authenticated
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AuthTokenResponse' }
 *       401:
 *         description: "Email or password is incorrect."
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } }
 */
router.post('/login', writeLimit, controller.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Rotate the refresh token and issue a new access token
 *     description: Reads the httpOnly refresh cookie. On success, the old refresh token is revoked and a new one is set.
 *     responses:
 *       200:
 *         description: New access token issued
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AuthTokenResponse' }
 *       401:
 *         description: Missing, expired, reused, or revoked refresh token
 *         content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } }
 */
router.post('/refresh', controller.refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Log out
 *     description: Revokes the current refresh token and clears the cookie.
 *     responses:
 *       200:
 *         description: Logged out
 */
router.post('/logout', controller.logout);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get the current authenticated user
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Current user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: { user: { $ref: '#/components/schemas/User' } }
 *       401: { $ref: '#/components/responses/Unauthorized' }
 */
router.get('/me', requireAuth, controller.me);

export default router;
