import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import env from '../config/env.js';

const ALG = 'HS256';

export const signAccess = (user) =>
  jwt.sign(
    { email: user.email, role: user.role, typ: 'access' },
    env.JWT_ACCESS_SECRET,
    { algorithm: ALG, subject: String(user._id ?? user.id), expiresIn: env.JWT_ACCESS_EXPIRES }
  );

export const signRefresh = (user) => {
  const jti = crypto.randomUUID();
  const token = jwt.sign(
    { typ: 'refresh', jti },
    env.JWT_REFRESH_SECRET,
    { algorithm: ALG, subject: String(user._id ?? user.id), expiresIn: env.JWT_REFRESH_EXPIRES }
  );
  return { token, jti };
};

export const verifyAccess = (token) => {
  const payload = jwt.verify(token, env.JWT_ACCESS_SECRET, { algorithms: [ALG] });
  if (payload.typ !== 'access') throw new Error('Wrong token type');
  return payload;
};

export const verifyRefresh = (token) => {
  const payload = jwt.verify(token, env.JWT_REFRESH_SECRET, { algorithms: [ALG] });
  if (payload.typ !== 'refresh') throw new Error('Wrong token type');
  return payload;
};

/** Hash a refresh token before storing it, so a DB leak can't be replayed. */
export const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');
