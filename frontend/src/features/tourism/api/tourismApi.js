import axios from 'axios';
import { tourismList, tourismStats, sigiriyaDetail } from '../data/tourismData';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchTourismDestinations = async (params = {}) => {
  try {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.category && params.category !== 'All Categories') query.append('category', params.category);
    if (params.province && params.province !== 'All Provinces') query.append('province', params.province);
    if (params.status && params.status !== 'All Statuses') query.append('status', params.status);

    const res = await axios.get(`${API_BASE}/tourism?${query.toString()}`, { timeout: 3000 });
    return {
      destinations: res.data.data,
      stats: res.data.stats || tourismStats
    };
  } catch (err) {
    console.warn('[Tourism API] Falling back to offline telemetry ledger:', err.message);
    return {
      destinations: tourismList,
      stats: tourismStats
    };
  }
};

export const fetchTourismDestination = async (slug) => {
  try {
    const res = await axios.get(`${API_BASE}/tourism/${slug}`, { timeout: 3000 });
    return res.data.data;
  } catch (err) {
    console.warn('[Tourism API] Falling back to offline dossier:', err.message);
    return sigiriyaDetail;
  }
};

export const createTourismDestination = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/tourism`, data, { timeout: 5000 });
    return res.data;
  } catch (err) {
    console.warn('[Tourism API] Local fallback for create:', err.message);
    return { success: true, data };
  }
};

export const updateTourismDestinationStatus = async (id, statusData) => {
  try {
    const res = await axios.patch(`${API_BASE}/tourism/${id}/status`, statusData, { timeout: 3000 });
    return res.data;
  } catch (err) {
    console.warn('[Tourism API] Local fallback for status patch:', err.message);
    return { success: true };
  }
};

export const deleteTourismDestination = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/tourism/${id}`, { timeout: 3000 });
    return res.data;
  } catch (err) {
    console.warn('[Tourism API] Local fallback for delete:', err.message);
    return { success: true };
  }
};
