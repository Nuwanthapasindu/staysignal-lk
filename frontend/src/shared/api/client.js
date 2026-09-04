// M2 notices + shared chrome
import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const get = (url, config = {}) => client.get(url, config).then(res => res.data);
export const post = (url, data, config = {}) => client.post(url, data, config).then(res => res.data);
export const patch = (url, data, config = {}) => client.patch(url, data, config).then(res => res.data);

export default client;
