import { get } from '../../../shared/api/client';

export const fetchTowns = async () => {
  return get('/api/towns');
};
