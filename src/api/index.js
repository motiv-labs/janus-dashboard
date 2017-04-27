import axios from 'axios';

const headers = {
  Accept: 'application/vnd.janus.v1+json',
  Authorization: 'Bearer aaa'
};

const client = axios.create({
  baseURL: 'http://localhost:8081',
  headers
});

client.interceptors.response.use(response => response, (error) => {
  // TODO: If 401, go to login page...
  Promise.reject(error);
});

export default client;
