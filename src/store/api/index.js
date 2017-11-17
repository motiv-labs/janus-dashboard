/* eslint-disable */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { login } from './auth';
import history from '../configuration/history';

const headers = {
    Accept: 'application/vnd.janus.v1+json',
};

const client = axios.create({
    baseURL: process.env.REACT_APP_JANUS_URI || MAIN_CONFIG.gateway.uri,
    headers,
});

export const setAccessToken = (token) => {
    localStorage.setItem('access_token', token);
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getAccessToken = () => {
    const token = localStorage.getItem('access_token');

    if (!token) return;

    const expirationTime = jwt.decode(token).exp * 1000;
    const dateNow = new Date();

    if (expirationTime > dateNow.getTime()) {
        return token;
    }
};

export const setRefreshToken = token => localStorage.setItem('refresh_token', token);

export const getRefreshToken = () => localStorage.getItem('refresh_token');

export const removeAccessToken = () => {
    localStorage.removeItem('access_token');
}

if (getAccessToken()) {
    setAccessToken(getAccessToken());
}

client.interceptors.response.use(undefined, error => {
    if (error.response.status === 401) {
        history.push('/login');
    }

    throw error;
});

export default client;
