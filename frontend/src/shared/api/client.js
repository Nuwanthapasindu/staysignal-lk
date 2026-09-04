import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_URL || '';

const client = axios.create({
  baseURL: rawBaseUrl,
});

// Request interceptor to normalize URLs and prevent duplicate /api prefixes
client.interceptors.request.use((config) => {
  if (config.baseURL === '/api' && config.url?.startsWith('/api/')) {
    config.url = config.url.replace(/^\/api/, '');
  } else if (config.baseURL === '/api' && config.url === '/api') {
    config.url = '';
  }
  return config;
});

export const get = (url, config = {}) => client.get(url, config).then((res) => res.data);
export const post = (url, data, config = {}) => client.post(url, data, config).then((res) => res.data);
export const patch = (url, data, config = {}) => client.patch(url, data, config).then((res) => res.data);

export default client;
