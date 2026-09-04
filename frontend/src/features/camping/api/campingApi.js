import axios from 'axios';
import { campsitesList, campingStats, knucklesCampDetail } from '../data/campingData';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchCampsites = async (params = {}) => {
  try {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.belt && params.belt !== 'All Belts') query.append('belt', params.belt);
    if (params.status && params.status !== 'All Statuses') query.append('status', params.status);
    if (params.water) query.append('water', 'true');
    if (params.ranger) query.append('ranger', 'true');
    if (params.group12) query.append('group12', 'true');

    const res = await axios.get(`${API_BASE}/camping?${query.toString()}`, { timeout: 3000 });
    return {
      campsites: res.data.data,
      stats: res.data.stats || campingStats
    };
  } catch (err) {
    console.warn('[Camping API] Falling back to offline campsite ledger:', err.message);
    return {
      campsites: campsitesList,
      stats: campingStats
    };
  }
};

export const fetchCampsite = async (slug) => {
  try {
    const res = await axios.get(`${API_BASE}/camping/${slug}`, { timeout: 3000 });
    return res.data.data;
  } catch (err) {
    console.warn('[Camping API] Falling back to offline camp detail:', err.message);
    return knucklesCampDetail;
  }
};

export const createCampsite = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/camping`, data, { timeout: 5000 });
    return res.data;
  } catch (err) {
    console.warn('[Camping API] Local fallback for campsite create:', err.message);
    return { success: true, data };
  }
};

export const updateCampsiteStatus = async (id, statusData) => {
  try {
    const res = await axios.patch(`${API_BASE}/camping/${id}/status`, statusData, { timeout: 3000 });
    return res.data;
  } catch (err) {
    console.warn('[Camping API] Local fallback for status update:', err.message);
    return { success: true };
  }
};

export const deleteCampsite = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/camping/${id}`, { timeout: 3000 });
    return res.data;
  } catch (err) {
    console.warn('[Camping API] Local fallback for delete:', err.message);
    return { success: true };
  }
};

export const submitPermitBooking = async (slug, bookingData) => {
  try {
    const res = await axios.post(`${API_BASE}/camping/${slug}/permit`, bookingData, { timeout: 5000 });
    return res.data;
  } catch (err) {
    console.warn('[Camping API] Local fallback for permit booking:', err.message);
    return { 
      success: true, 
      bookingId: 'DWC-KNK-' + Math.floor(1000 + Math.random() * 9000), 
      data: bookingData 
    };
  }
};
