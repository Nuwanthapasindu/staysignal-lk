import dotenv from 'dotenv';

dotenv.config();

const { 
  PORT = 5000, 
  MONGO_URI = 'mongodb://127.0.0.1:27017/staysignal', 
  CLIENT_ORIGIN = 'http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174' 
} = process.env;

const allowedOrigins = CLIENT_ORIGIN.split(',').map(o => o.trim());

const env = Object.freeze({
  PORT: parseInt(PORT, 10),
  MONGO_URI,
  CLIENT_ORIGIN: allowedOrigins,
});

export default env;
