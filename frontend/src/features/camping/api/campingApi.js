import { get, post, patch, del } from '../../../shared/api/client';
import { campsitesList, campingStats, knucklesCampDetail } from '../data/campingData';

const buildQuery = (params = {}) => {
  const q = new URLSearchParams();
  if (params.search) q.append('search', params.search);
  if (params.belt && params.belt !== 'All Belts') q.append('belt', params.belt);
  if (params.status && params.status !== 'All Statuses') q.append('status', params.status);
  if (params.water) q.append('water', 'true');
  if (params.ranger) q.append('ranger', 'true');
  if (params.group12) q.append('group12', 'true');
  const s = q.toString();
  return s ? `?${s}` : '';
};

export const fetchCampsites = async (params = {}) => {
  try {
    const res = await get(`/camping${buildQuery(params)}`);
    return { campsites: res.data, stats: res.stats || campingStats };
  } catch (err) {
    console.warn('[Camping API] offline fallback:', err.message);
    return { campsites: campsitesList, stats: campingStats };
  }
};

export const fetchCampsite = async (slug) => {
  try {
    const res = await get(`/camping/${encodeURIComponent(slug)}`);
    return res.data;
  } catch (err) {
    console.warn('[Camping API] offline fallback:', err.message);
    return knucklesCampDetail;
  }
};

export const createCampsite = async (data) => {
  try {
    return await post('/camping', data);
  } catch (err) {
    console.warn('[Camping API] local fallback for create:', err.message);
    return { success: true, data };
  }
};

export const updateCampsiteStatus = async (id, statusData) => {
  try {
    return await patch(`/camping/${encodeURIComponent(id)}/status`, statusData);
  } catch (err) {
    console.warn('[Camping API] local fallback for status:', err.message);
    return { success: true };
  }
};

export const deleteCampsite = async (id) => {
  try {
    return await del(`/camping/${encodeURIComponent(id)}`);
  } catch (err) {
    console.warn('[Camping API] local fallback for delete:', err.message);
    return { success: true };
  }
};

export const submitPermitBooking = async (slug, bookingData) => {
  try {
    return await post(`/camping/${encodeURIComponent(slug)}/permit`, bookingData);
  } catch (err) {
    console.warn('[Camping API] local fallback for permit booking:', err.message);
    return {
      success: true,
      bookingId: 'DWC-KNK-' + Math.floor(1000 + Math.random() * 9000),
      data: bookingData,
    };
  }
};
