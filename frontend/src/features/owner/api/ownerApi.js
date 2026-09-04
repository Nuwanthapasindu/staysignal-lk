// Owner API
import { post, get } from '../../../shared/api/client';

export const postNotice = (data) => post('/api/notices', data);
export const getOwnerDesk = () => get('/api/notices');
