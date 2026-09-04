import { get } from '../../../shared/api/client';

export const fetchTowns = () => get('/towns');
export const fetchTownBySlug = (slug) => get(`/towns/${encodeURIComponent(slug)}`);
export const fetchCorridors = () => get('/corridors');
