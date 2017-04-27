import axios from 'axios';

const headers = {
  Accept: 'application/vnd.janus.v1+json',
  Authorization: 'Bearer aaa'
};

console.log(process.env);

const client = axios.create({
  baseURL: process.env.GATEWAY_BASE_URI,
  headers
});

client.interceptors.response.use(response => response, (error) => {
  // TODO: If 401, go to login page...
  Promise.reject(error);
});

export default client;
