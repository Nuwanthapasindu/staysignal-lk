// Shared axios instance. Auth wiring is injected by AuthProvider via setAuthAccessor
// so this module stays free of React and of any token storage.
import axios from 'axios';

const client = axios.create({
  // `/api` in dev (Vite proxy → :5000). A full URL ending in `/api` in prod.
  // All api modules pass paths relative to this: `/notices`, `/auth/login`, …
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // send the refresh cookie
});

let accessor = {
  getToken: () => null,
  refresh: async () => null, // returns a fresh access token or throws
  onLogout: () => {},
};

export const setAuthAccessor = (next) => {
  accessor = { ...accessor, ...next };
};

client.interceptors.request.use((config) => {
  const token = accessor.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshing = null;

client.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config, response } = error;
    const isAuthCall = config?.url?.includes('/auth/');
    if (response?.status !== 401 || isAuthCall || config?._retried) {
      return Promise.reject(error);
    }

    config._retried = true;
    try {
      refreshing = refreshing || accessor.refresh();
      const token = await refreshing;
      refreshing = null;
      if (!token) throw new Error('no token');
      config.headers.Authorization = `Bearer ${token}`;
      return client(config);
    } catch (refreshErr) {
      refreshing = null;
      accessor.onLogout();
      return Promise.reject(refreshErr);
    }
  }
);

export const get = (url, config = {}) => client.get(url, config).then((res) => res.data);
export const post = (url, data, config = {}) => client.post(url, data, config).then((res) => res.data);
export const patch = (url, data, config = {}) => client.patch(url, data, config).then((res) => res.data);
export const put = (url, data, config = {}) => client.put(url, data, config).then((res) => res.data);
export const del = (url, config = {}) => client.delete(url, config).then((res) => res.data);

export default client;
