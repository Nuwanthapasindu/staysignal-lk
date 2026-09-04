/**
 * Tiny in-memory sliding-window rate limiter. No external dependency.
 * Keyed by IP + route. Good enough for a single-process hackathon deploy.
 */
const buckets = new Map();

export const rateLimit = ({ windowMs = 15 * 60 * 1000, max = 10 } = {}) => (req, res, next) => {
  const key = `${req.ip}:${req.baseUrl}${req.path}`;
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  hits.push(now);
  buckets.set(key, hits);

  if (hits.length > max) {
    return res.status(429).json({
      error: { code: 'RATE_LIMITED', message: 'Too many attempts. Please try again in a few minutes.' },
    });
  }
  next();
};

/** Test helper — wipe all buckets. */
export const _resetRateLimit = () => buckets.clear();
