import axios from 'axios';
import config from '@/config';
import store from '@/store';

const headers = {
  Accept: 'application/vnd.janus.v1+json',
  Authorization: `Bearer ${store.state.token}`
};

const client = axios.create({
  baseUrl: config.gatewayBaseUri,
  headers
});

export default client;
