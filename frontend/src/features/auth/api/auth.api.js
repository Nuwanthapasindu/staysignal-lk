import { post, get } from '../../../shared/api/client';

export const signupTraveller = (body) => post('/api/auth/signup/traveller', body);
export const signupOwner = (body) => post('/api/auth/signup/owner', body);
export const login = (body) => post('/api/auth/login', body);
export const refresh = () => post('/api/auth/refresh');
export const logout = () => post('/api/auth/logout');
export const me = () => get('/api/auth/me');
