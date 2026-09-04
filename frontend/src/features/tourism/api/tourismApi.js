import { get, post, put, patch, del } from '../../../shared/api/client';
import { tourismList, tourismStats, sigiriyaDetail } from '../data/tourismData';

const buildQuery = (params = {}) => {
  const q = new URLSearchParams();
  if (params.search) q.append('search', params.search);
  if (params.category && params.category !== 'All Categories') q.append('category', params.category);
  if (params.province && params.province !== 'All Provinces') q.append('province', params.province);
  if (params.status && params.status !== 'All Statuses') q.append('status', params.status);
  const s = q.toString();
  return s ? `?${s}` : '';
};

// List — reflects the DB. Bundled data is only a last resort when the API is down.
export const fetchTourismDestinations = async (params = {}) => {
  try {
    const res = await get(`/tourism${buildQuery(params)}`);
    return {
      destinations: res.data ?? [],
      stats: res.stats || tourismStats,
      offline: false,
    };
  } catch (err) {
    console.warn('[Tourism API] offline fallback:', err.message);
    return { destinations: tourismList, stats: tourismStats, offline: true };
  }
};

export const fetchTourismDestination = async (slug) => {
  try {
    const res = await get(`/tourism/${encodeURIComponent(slug)}`);
    return res.data;
  } catch (err) {
    console.warn('[Tourism API] offline fallback:', err.message);
    return sigiriyaDetail;
  }
};

// CRUD — let errors propagate so the page can show them.
export const createTourismDestination = (data) => post('/tourism', data);

export const updateTourismDestination = (id, data) => put(`/tourism/${encodeURIComponent(id)}`, data);

export const updateTourismDestinationStatus = (id, statusData) =>
  patch(`/tourism/${encodeURIComponent(id)}/status`, statusData);

export const deleteTourismDestination = (id) => del(`/tourism/${encodeURIComponent(id)}`);
