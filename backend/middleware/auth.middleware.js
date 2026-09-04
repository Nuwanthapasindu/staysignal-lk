import { httpError } from '../utils/httpError.js';
import { verifyAccess } from '../utils/jwt.js';

/**
 * Verify the Bearer access token and attach `req.user = { id, email, role }`.
 * Rejects with 401 on any missing / malformed / expired / wrong-type token.
 */
export const requireAuth = (req, _res, next) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return next(httpError(401, 'UNAUTHENTICATED', 'Authentication required.'));
  }
  try {
    const payload = verifyAccess(token);
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    next(httpError(401, 'UNAUTHENTICATED', 'Invalid or expired token.'));
  }
};

/**
 * Gate a route on one or more roles. Must run after `requireAuth`.
 * Traveller hitting an owner route → 403 FORBIDDEN.
 */
export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.user) {
    return next(httpError(401, 'UNAUTHENTICATED', 'Authentication required.'));
  }
  if (!roles.includes(req.user.role)) {
    return next(httpError(403, 'FORBIDDEN', 'Owner account required to post notices.'));
  }
  next();
};
