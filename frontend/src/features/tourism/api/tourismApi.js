import { get, post, patch, del } from '../../../shared/api/client';
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

export const fetchTourismDestinations = async (params = {}) => {
  try {
    const res = await get(`/tourism${buildQuery(params)}`);
    const list = res.data ?? [];
    // Fall back to the bundled dataset when the API has nothing to show.
    if (!list.length) return { destinations: tourismList, stats: tourismStats };
    return { destinations: list, stats: res.stats || tourismStats };
  } catch (err) {
    console.warn('[Tourism API] offline fallback:', err.message);
    return { destinations: tourismList, stats: tourismStats };
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

export const createTourismDestination = async (data) => {
  try {
    return await post('/tourism', data);
  } catch (err) {
    console.warn('[Tourism API] local fallback for create:', err.message);
    return { success: true, data };
  }
};

export const updateTourismDestinationStatus = async (id, statusData) => {
  try {
    return await patch(`/tourism/${encodeURIComponent(id)}/status`, statusData);
  } catch (err) {
    console.warn('[Tourism API] local fallback for status:', err.message);
    return { success: true };
  }
};

export const deleteTourismDestination = async (id) => {
  try {
    return await del(`/tourism/${encodeURIComponent(id)}`);
  } catch (err) {
    console.warn('[Tourism API] local fallback for delete:', err.message);
    return { success: true };
  }
};
