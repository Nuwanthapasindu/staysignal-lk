import { get, post } from '../../../shared/api/client';

export const fetchNotices = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.town && params.town !== 'all') queryParams.append('town', params.town);
  if (params.issue && params.issue !== 'all') queryParams.append('issue', params.issue);
  if (params.status && params.status !== 'all') queryParams.append('status', params.status);
  if (params.q) queryParams.append('q', params.q);
  if (params.from) queryParams.append('from', params.from);
  if (params.to) queryParams.append('to', params.to);
  if (params.sort) queryParams.append('sort', params.sort);

  const queryString = queryParams.toString();
  const url = queryString ? `/api/notices?${queryString}` : '/api/notices';
  return get(url);
};

export const fetchNoticeById = async (id) => {
  return get(`/api/notices/${encodeURIComponent(id)}`);
};

export const fetchNoticeAlternatives = async (id) => {
  return get(`/api/notices/${encodeURIComponent(id)}/alternatives`);
};

export const fetchTicker = async () => {
  return get('/api/ticker');
};

export const postNotice = async (noticeData) => {
  return post('/api/notices', noticeData);
};
