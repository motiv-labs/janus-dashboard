import axios from 'axios';
import { login } from '@/api/auth';

const headers = {
  Accept: 'application/vnd.janus.v1+json',
};

const client = axios.create({
  baseURL: process.env.GATEWAY_BASE_URI,
  headers
});

client.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 401 && error.config && !error.config.isRetryRequest) {
    return login(process.env.GATEWAY_USERNAME, process.env.GATEWAY_PASSWORD).then(() => {
      error.config.isRetryRequest = true;
      return client(error.config);
    });
  }

  throw error;
});

export const setAccessToken = (token) => {
  localStorage.setItem('access_token', token);
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getAccessToken = () => localStorage.getItem('access_token');

export const setRefreshToken = token => localStorage.setItem('refresh_token', token);

export const getRefreshToken = () => localStorage.getItem('refresh_token');

if (getAccessToken()) {
  setAccessToken(getAccessToken());
}

export default client;
