import axios from 'axios';
import history from '../configuration/history';
import { getAccessToken, setAccessToken } from '../api';
import {
    CHECK_LOGGED_STATUS,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../constants';
import { requestStart, requestComplete } from './request.actions';
import { getRandomString } from '../../helpers/getRandomString';

/* eslint-disable */
const clientId = MAIN_CONFIG.gateway.client_id;
const scope = MAIN_CONFIG.gateway.scope;
const state = getRandomString();
const URL_GET_GITHUB_TOKEN = MAIN_CONFIG.gateway.github_token_url;
const URL_GET_JANUS_TOKEN = MAIN_CONFIG.gateway.janus_token_url;
const URL_GITHUB_AUTHORIZE = MAIN_CONFIG.gateway.github_authorize_url;
/* eslint-enable */

export const getJWTtoken = (hash) => async dispatch => {
    const getParameterByName = (name, url) => {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);

        if (!results) return null;
        if (!results[2]) return '';

        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    const extractToken = (string) => {
        const param = 'access_token';
        const name = param.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp(name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(string);

        if (!results) return null;
        if (!results[2]) return '';

        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    const extractParameter = (hash, parameter, url) => getParameterByName(parameter, url);
    const code = extractParameter(hash, 'code');

    try {
        dispatch(requestStart());
        const response = await axios.post(
            `${URL_GET_GITHUB_TOKEN}?client_id=${clientId}&code=${code}`
        );
        // extract access_token
        const accessToken = await extractToken(response.data);
        // set Authorization headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        const finalResponse = await axios.post(
            `${URL_GET_JANUS_TOKEN}/login?provider=github`,
        );
        // receive JWT token to use Janus-GW
        const JWTtoken = finalResponse.data.access_token;

        setAccessToken(JWTtoken);
        history.push('/');
        dispatch(getUserStatus());
        dispatch(requestComplete());
    } catch (error) {
        console.log(error);
    }
};

export const checkLoggedStatus = () => ({
    type: CHECK_LOGGED_STATUS,
});

export const loginRequest = () => ({
    type: LOGIN_START,
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
});

export const loginFailure = () => ({
    type: LOGIN_FAILURE,
    payload: 'The login or password you entered is incorrect.'
});

export const authorizeThroughGithub = () => async dispatch => {
    dispatch(requestStart());
    window.location.href = `${URL_GITHUB_AUTHORIZE}?response_type=code&state=${state}&client_id=${clientId}&scope=${scope}`;
};

export const getUserStatus = () => dispatch => {
    dispatch(checkLoggedStatus());

    if (getAccessToken()) {
        dispatch(loginSuccess());
    } else {
        history.push('/login');
    }
};
