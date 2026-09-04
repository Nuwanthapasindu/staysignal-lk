import { post, get } from '../../../shared/api/client';

export const signupTraveller = (body) => post('/auth/signup/traveller', body);
export const signupOwner = (body) => post('/auth/signup/owner', body);
export const login = (body) => post('/auth/login', body);
export const refresh = () => post('/auth/refresh');
export const logout = () => post('/auth/logout');
export const me = () => get('/auth/me');
