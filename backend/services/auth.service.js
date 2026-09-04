import { User, RefreshToken } from '../models/index.js';
import { httpError } from '../utils/httpError.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signAccess, signRefresh, verifyRefresh, hashToken } from '../utils/jwt.js';
import { MESSAGES } from '../validators/auth.validation.js';

const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const publicUser = (user) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone ?? null,
});

const issueSession = async (user) => {
  const accessToken = signAccess(user);
  const { token: refreshToken, jti } = signRefresh(user);
  await RefreshToken.create({
    user_id: user._id,
    jti,
    token_hash: hashToken(refreshToken),
    expires_at: new Date(Date.now() + REFRESH_TTL_MS),
  });
  return { accessToken, refreshToken };
};

export const signup = async ({ name, email, password, phone, role }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw httpError(409, 'EMAIL_TAKEN', MESSAGES.emailTaken, { email: MESSAGES.emailTaken });
  }

  let user;
  try {
    user = await User.create({
      name,
      email,
      password_hash: await hashPassword(password),
      phone: phone ?? null,
      role, // set by the route, never from the request body
    });
  } catch (err) {
    if (err?.code === 11000) {
      throw httpError(409, 'EMAIL_TAKEN', MESSAGES.emailTaken, { email: MESSAGES.emailTaken });
    }
    throw err;
  }

  const session = await issueSession(user);
  return { user: publicUser(user), ...session };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  const ok = user && (await comparePassword(password, user.password_hash));
  if (!ok) {
    throw httpError(401, 'INVALID_CREDENTIALS', MESSAGES.credentials);
  }
  const session = await issueSession(user);
  return { user: publicUser(user), ...session };
};

export const refresh = async (rawToken) => {
  if (!rawToken) throw httpError(401, 'INVALID_REFRESH', 'Missing refresh token.');

  let payload;
  try {
    payload = verifyRefresh(rawToken);
  } catch {
    throw httpError(401, 'INVALID_REFRESH', 'Invalid or expired refresh token.');
  }

  const row = await RefreshToken.findOne({ jti: payload.jti });
  if (!row || row.revoked_at || row.expires_at < new Date() || row.token_hash !== hashToken(rawToken)) {
    throw httpError(401, 'INVALID_REFRESH', 'Invalid or expired refresh token.');
  }

  const user = await User.findById(payload.sub);
  if (!user) throw httpError(401, 'INVALID_REFRESH', 'Invalid or expired refresh token.');

  row.revoked_at = new Date();
  await row.save();

  const session = await issueSession(user);
  return { user: publicUser(user), ...session };
};

export const logout = async (rawToken) => {
  if (!rawToken) return;
  try {
    const { jti } = verifyRefresh(rawToken);
    await RefreshToken.updateOne({ jti, revoked_at: null }, { $set: { revoked_at: new Date() } });
  } catch {
    // already invalid — nothing to revoke
  }
};

export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw httpError(401, 'UNAUTHENTICATED', 'Not authenticated.');
  return publicUser(user);
};
