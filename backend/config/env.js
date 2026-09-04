import dotenv from 'dotenv';

dotenv.config();

const { PORT, MONGO_URI, CLIENT_ORIGIN } = process.env;

if (!PORT) throw new Error('Missing required environment variable: PORT');
if (!MONGO_URI) throw new Error('Missing required environment variable: MONGO_URI');
if (!CLIENT_ORIGIN) throw new Error('Missing required environment variable: CLIENT_ORIGIN');

const env = Object.freeze({
  PORT: parseInt(PORT, 10),
  MONGO_URI,
  CLIENT_ORIGIN,
});

export default env;
