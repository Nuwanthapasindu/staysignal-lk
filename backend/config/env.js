import dotenv from 'dotenv';

dotenv.config();

const {
  PORT = 5000,
  MONGO_URI = 'mongodb://127.0.0.1:27017/staysignal',
  CLIENT_ORIGIN = 'http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174',
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES,
  JWT_REFRESH_EXPIRES,
  MONGO_URI_TEST,
  NODE_ENV,
  PUBLIC_API_URL,
  PUBLIC_WEB_URL,
} = process.env;

if (!JWT_ACCESS_SECRET) throw new Error('Missing required environment variable: JWT_ACCESS_SECRET');
if (!JWT_REFRESH_SECRET) throw new Error('Missing required environment variable: JWT_REFRESH_SECRET');

const allowedOrigins = CLIENT_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean);

const env = Object.freeze({
  PORT: parseInt(PORT, 10),
  MONGO_URI,
  // Array — passed straight to cors({ origin }). Also exposed as the raw string.
  CLIENT_ORIGIN: allowedOrigins,
  CLIENT_ORIGIN_RAW: CLIENT_ORIGIN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES: JWT_ACCESS_EXPIRES || '15m',
  JWT_REFRESH_EXPIRES: JWT_REFRESH_EXPIRES || '7d',
  MONGO_URI_TEST: MONGO_URI_TEST || null,
  NODE_ENV: NODE_ENV || 'development',
  IS_PROD: NODE_ENV === 'production',
  // Deployed base URLs, used only to label the Swagger "servers" list and in
  // docs/scripts. Safe defaults so local dev needs no extra env vars.
  PUBLIC_API_URL: PUBLIC_API_URL || `http://localhost:${parseInt(PORT, 10)}/api`,
  PUBLIC_WEB_URL: PUBLIC_WEB_URL || 'http://localhost:5173',
});

export default env;
