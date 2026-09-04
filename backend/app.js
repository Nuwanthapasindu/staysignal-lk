import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import env from './config/env.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));

// Routes
// app.use('/api', apiRoutes);

export default app;
