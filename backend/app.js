import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import env from './config/env.js';
import { swaggerSpec } from './config/swagger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import authRoutes from './routes/auth.routes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import townRoutes from './routes/townRoutes.js';
import apiRoutes from './routes/index.js';
import impactRoutes from './routes/impactRoutes.js';
import { HttpError } from './utils/httpError.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
if (env.NODE_ENV !== 'test') app.use(morgan('dev'));

// Uploaded media (multer local filesystem adapter). helmet's default
// cross-origin-resource-policy would block <img> loads from the Vite origin.
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res) => res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'),
  })
);

// API documentation (Swagger UI). Served outside the /api prefix so it is
// unaffected by the /api 404 catch-all and JSON-only error handler below.
// helmet's default CSP blocks Swagger UI's inline assets, so it is relaxed
// for this path only.
app.use(
  '/api-docs',
  helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'StaySignal LK API Docs',
  })
);
app.get('/api-docs.json', (req, res) => res.json(swaggerSpec));

/**
 * @swagger
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Service health check
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: ok }
 *                 time: { type: string, format: date-time }
 */
// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', noticeRoutes); // /ticker, /notices, /notices/:id, /notices/:id/alternatives
app.use('/api', townRoutes); // /towns
app.use('/api/impact', impactRoutes);
app.use('/api', apiRoutes); // /tourism, geography (/towns/:slug, /corridors)

// 404 for unmatched API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: `No route for ${req.method} ${req.originalUrl}` } });
});

// Centralised error envelope: { error: { code, message, fields? } }
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: { code: err.code, message: err.message, ...(err.fields ? { fields: err.fields } : {}) },
    });
  }
  console.error(err);
  res.status(500).json({ error: { code: 'INTERNAL', message: 'Something went wrong.' } });
});

export default app;
