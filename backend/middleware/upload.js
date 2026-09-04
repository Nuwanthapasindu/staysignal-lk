import crypto from 'crypto';
import path from 'path';
import multer from 'multer';
import { localStorageAdapter } from '../services/fileStorage.js';

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB per image
const MAX_FILES = 10;
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, localStorageAdapter.bucketDir('tourism'));
  },
  filename(req, file, cb) {
    const ext = (path.extname(file.originalname) || '').toLowerCase().replace(/[^.a-z0-9]/g, '');
    const unique = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
    cb(null, `${unique}${ext || '.jpg'}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME.has(file.mimetype)) return cb(null, true);
  cb(new Error('Only image files are allowed (jpeg, png, webp, gif, avif).'));
};

const uploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_BYTES, files: MAX_FILES },
});

/**
 * Accepts up to MAX_FILES images under the `images` field. Tolerates requests
 * with no file part (plain JSON create/update still works). Multer / filter
 * errors are turned into a clean 400 JSON response.
 */
export const uploadTourismImages = (req, res, next) => {
  const handler = uploader.array('images', MAX_FILES);
  handler(req, res, (err) => {
    if (!err) return next();
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'Each image must be 5 MB or smaller.'
        : err.code === 'LIMIT_FILE_COUNT'
        ? `You can upload at most ${MAX_FILES} images.`
        : err.message || 'Image upload failed.';
    return res.status(400).json({ success: false, message });
  });
};

/** Map multer file objects to the image sub-document shape stored on the model. */
export const filesToImageDocs = (files = []) =>
  files.map((f) => ({
    url: localStorageAdapter.publicUrl('tourism', f.filename),
    path: localStorageAdapter.relativePath('tourism', f.filename),
    originalName: f.originalname,
    size: f.size,
  }));

export { MAX_FILE_BYTES, MAX_FILES };
