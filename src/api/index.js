import axios from 'axios';
import { login } from '@/api/auth';
import config from '@/config';

const headers = {
  Accept: 'application/vnd.janus.v1+json',
};

console.log(config.gateway);

const client = axios.create({
  baseURL: config.gateway.uri,
  headers
});

client.interceptors.response.use(undefined, (error) => {
  console.log(error);
  if (error.response.status === 401) {
    return login(config.gateway.username, config.gateway.password).then(() =>
      client(error.config)
    );
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
