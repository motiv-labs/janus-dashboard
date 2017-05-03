import axios from 'axios';

const headers = {
  Accept: 'application/vnd.janus.v1+json',
};

const client = axios.create({
  baseURL: process.env.GATEWAY_BASE_URI,
  headers
});

client.interceptors.response.use(response => response, (error) => {
  console.log(error.response.status);
  if (error.response.status === 401) {
    location('/login');
  }
  Promise.reject(error);
});

export const setToken = (token) => {
  localStorage.setItem('token', token);
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getToken = () => localStorage.getItem('token');

if (getToken()) {
  setToken(getToken());
}

export default client;
