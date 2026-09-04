import { post, get } from '../../../shared/api/client';

export const postNotice = (data) => post('/notices', data);
export const getOwnerDesk = () => get('/notices');
