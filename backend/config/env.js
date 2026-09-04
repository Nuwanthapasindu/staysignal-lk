import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  MONGO_URI,
  CLIENT_ORIGIN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES,
  JWT_REFRESH_EXPIRES,
  MONGO_URI_TEST,
  NODE_ENV,
} = process.env;

if (!PORT) throw new Error('Missing required environment variable: PORT');
if (!MONGO_URI) throw new Error('Missing required environment variable: MONGO_URI');
if (!CLIENT_ORIGIN) throw new Error('Missing required environment variable: CLIENT_ORIGIN');
if (!JWT_ACCESS_SECRET) throw new Error('Missing required environment variable: JWT_ACCESS_SECRET');
if (!JWT_REFRESH_SECRET) throw new Error('Missing required environment variable: JWT_REFRESH_SECRET');

const env = Object.freeze({
  PORT: parseInt(PORT, 10),
  MONGO_URI,
  CLIENT_ORIGIN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES: JWT_ACCESS_EXPIRES || '15m',
  JWT_REFRESH_EXPIRES: JWT_REFRESH_EXPIRES || '7d',
  MONGO_URI_TEST: MONGO_URI_TEST || null,
  NODE_ENV: NODE_ENV || 'development',
  IS_PROD: NODE_ENV === 'production',
});

export default env;
