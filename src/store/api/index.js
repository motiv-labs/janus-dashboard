/* eslint-disable */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { login } from './auth';
import history from '../configuration/history';

const headers = {
    Accept: 'application/vnd.janus.v1+json',
};

const client = axios.create({
    baseURL: localStorage.admin_url,
    headers,
});

export const setAccessToken = (token) => {
    localStorage.setItem('access_token', token);
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const setGatewayAdminURL = url => {
    localStorage.setItem("admin_url", url)
    client.defaults.baseURL = url;
}

export const setUserName = username => {
    localStorage.setItem('username', username)
}

export const setCSRFToken = token => {
    localStorage.setItem('csrf_token', token)
}

export const removeCSRFToken = () => {
  localStorage.removeItem('csrf_token')
}

export const getAccessToken = () => {
    const token = localStorage.getItem('access_token');

    if (!token) return;

    const expirationTime = jwt.decode(token).exp * 1000;
    const dateNow = new Date();

    if (expirationTime > dateNow.getTime()) {
        return token;
    }
};

export const getUserName = () => localStorage.getItem('username')

export const setRefreshToken = token => localStorage.setItem('refresh_token', token);

export const getRefreshToken = () => localStorage.getItem('refresh_token');

export const clearLocalStorage = () => {
    localStorage.clear()
}

if (getAccessToken()) {
    setAccessToken(getAccessToken());
}

client.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status !== 401) {
            return Promise.reject(error);
        }

        clearLocalStorage();
        history.push('/login');

        return Promise.reject({
            response: {
                data: {},
            }
        });
    }
);

export default client;
