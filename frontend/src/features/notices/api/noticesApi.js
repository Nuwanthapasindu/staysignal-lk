import { get, post } from '../../../shared/api/client';

export const fetchNotices = async (params = {}) => {
  const q = new URLSearchParams();
  if (params.town && params.town !== 'all') q.append('town', params.town);
  if (params.issue && params.issue !== 'all') q.append('issue', params.issue);
  if (params.status && params.status !== 'all') q.append('status', params.status);
  if (params.q) q.append('q', params.q);
  if (params.from) q.append('from', params.from);
  if (params.to) q.append('to', params.to);
  if (params.sort) q.append('sort', params.sort);
  const s = q.toString();
  return get(s ? `/notices?${s}` : '/notices');
};

export const fetchNoticeById = (id) => get(`/notices/${encodeURIComponent(id)}`);
export const fetchNoticeAlternatives = (id) => get(`/notices/${encodeURIComponent(id)}/alternatives`);
export const fetchTicker = () => get('/ticker');
export const postNotice = (noticeData) => post('/notices', noticeData);
