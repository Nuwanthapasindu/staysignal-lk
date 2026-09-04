import { get, post, put, patch, del } from '../../../shared/api/client';

const EMPTY_STATS = {
  totalDestinations: 0,
  totalDestinationsSub: '',
  activeOpen: 0,
  activeOpenSub: '',
  weatherAdvisory: 0,
  weatherAdvisorySub: '',
  draftRevisions: 0,
  draftRevisionsSub: '',
};

const buildQuery = (params = {}) => {
  const q = new URLSearchParams();
  if (params.search) q.append('search', params.search);
  if (params.category && params.category !== 'All Categories') q.append('category', params.category);
  if (params.province && params.province !== 'All Provinces') q.append('province', params.province);
  if (params.status && params.status !== 'All Statuses') q.append('status', params.status);
  const s = q.toString();
  return s ? `?${s}` : '';
};

/**
 * Resolve a stored media path (e.g. "/uploads/tourism/x.jpg") to a URL the
 * browser can load. Same-origin in dev (Vite proxies /uploads); in prod it is
 * derived from the API origin.
 */
export const resolveMediaUrl = (u) => {
  if (!u) return '';
  if (/^(https?:)?\/\//i.test(u) || u.startsWith('data:') || u.startsWith('blob:')) return u;
  const base = import.meta.env.VITE_API_URL || '';
  if (/^https?:\/\//i.test(base)) {
    try {
      return new URL(u, base).origin + (u.startsWith('/') ? u : `/${u}`);
    } catch {
      return u;
    }
  }
  return u;
};

/** Build a multipart body from a plain object + File[] + removal ids. */
const toFormData = (data = {}, { imageFiles = [], removeImageIds = [] } = {}) => {
  const fd = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (typeof value === 'object') fd.append(key, JSON.stringify(value));
    else fd.append(key, value);
  });
  if (removeImageIds.length) fd.append('removeImageIds', JSON.stringify(removeImageIds));
  imageFiles.forEach((file) => fd.append('images', file));
  return fd;
};

// List — reflects the DB only. No bundled fallback data.
export const fetchTourismDestinations = async (params = {}) => {
  try {
    const res = await get(`/tourism${buildQuery(params)}`);
    return {
      destinations: res.data ?? [],
      stats: res.stats || EMPTY_STATS,
      offline: false,
    };
  } catch (err) {
    console.warn('[Tourism API] request failed:', err.message);
    return { destinations: [], stats: EMPTY_STATS, offline: true };
  }
};

export const fetchTourismDestination = async (slug) => {
  const res = await get(`/tourism/${encodeURIComponent(slug)}`);
  return res.data;
};

// CRUD — multipart so images ride along with the text fields.
export const createTourismDestination = (data, imageFiles = []) =>
  post('/tourism', toFormData(data, { imageFiles }));

export const updateTourismDestination = (id, data, { imageFiles = [], removeImageIds = [] } = {}) =>
  put(`/tourism/${encodeURIComponent(id)}`, toFormData(data, { imageFiles, removeImageIds }));

export const updateTourismDestinationStatus = (id, statusData) =>
  patch(`/tourism/${encodeURIComponent(id)}/status`, statusData);

export const deleteTourismDestination = (id) => del(`/tourism/${encodeURIComponent(id)}`);

// Image sub-resource
export const addTourismImages = (id, imageFiles = []) =>
  post(`/tourism/${encodeURIComponent(id)}/images`, toFormData({}, { imageFiles }));

export const deleteTourismImage = (id, imageId) =>
  del(`/tourism/${encodeURIComponent(id)}/images/${encodeURIComponent(imageId)}`);
