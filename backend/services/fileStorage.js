import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Local filesystem storage adapter.
 *
 * Keeps a single, swappable surface (`root`, `publicBase`, `relativePath`,
 * `absolutePath`, `remove`) so a future S3 / GCS adapter can replace this file
 * without touching controllers or routes.
 */
const UPLOAD_ROOT = path.join(__dirname, '..', 'uploads');
const PUBLIC_BASE = '/uploads';

export const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

ensureDir(UPLOAD_ROOT);

export const localStorageAdapter = {
  root: UPLOAD_ROOT,
  publicBase: PUBLIC_BASE,

  /** Absolute directory for a named bucket, e.g. "tourism". */
  bucketDir(bucket) {
    const dir = path.join(UPLOAD_ROOT, bucket);
    ensureDir(dir);
    return dir;
  },

  /** Public URL the browser uses, e.g. "/uploads/tourism/abc.jpg". */
  publicUrl(bucket, filename) {
    return `${PUBLIC_BASE}/${bucket}/${filename}`;
  },

  /** Storage-relative path persisted in the DB, e.g. "tourism/abc.jpg". */
  relativePath(bucket, filename) {
    return `${bucket}/${filename}`;
  },

  /** Absolute path on disk from a stored relative path or public URL. */
  absolutePath(storedPath) {
    if (!storedPath) return null;
    let rel = String(storedPath);
    if (rel.startsWith(PUBLIC_BASE)) rel = rel.slice(PUBLIC_BASE.length);
    rel = rel.replace(/^[/\\]+/, '');
    // Guard against path traversal.
    const abs = path.normalize(path.join(UPLOAD_ROOT, rel));
    if (!abs.startsWith(UPLOAD_ROOT)) return null;
    return abs;
  },

  /** Delete a file by stored relative path / public URL. Never throws. */
  remove(storedPath) {
    try {
      const abs = this.absolutePath(storedPath);
      if (abs && fs.existsSync(abs)) fs.unlinkSync(abs);
      return true;
    } catch (err) {
      console.warn('[fileStorage] remove failed:', err.message);
      return false;
    }
  },
};

export default localStorageAdapter;
