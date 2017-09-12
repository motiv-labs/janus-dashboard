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

const clientId = process.env.REACT_APP_CLIENT_ID;
const scope =  process.env.REACT_APP_SCOPE;
const state = getRandomString();
const URL_EXCHANGE_CODE_ON_TOKEN = process.env.REACT_APP_EXCHANGE_CODE_ON_TOKEN_URL;
const URL_GET_ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN_URL;

export const getJWTtoken = (hash) => async dispatch => {
    const getParameterByName = (name, url) => {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
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
            `${URL_EXCHANGE_CODE_ON_TOKEN}?client_id=${clientId}&code=${code}`
        );
        // extract access_token
        const accessToken = await extractToken(response.data);
        // set Authorization headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        const finalResponse = await axios.post(
            `${URL_GET_ACCESS_TOKEN}/login?provider=github`,
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
    window.location.href = `https://gw-staging.hellofresh.com/auth/github/authorize?response_type=code&state=${state}&client_id=${clientId}&scope=${scope}`;
};

export const getUserStatus = () => dispatch => {
    dispatch(checkLoggedStatus());

    if (getAccessToken()) {
        dispatch(loginSuccess());
    } else {
        history.push('/login');
    }
};

export const loginUser = userData => async dispatch => {
    dispatch(loginRequest());

    try {
        /*
        https://github.com/login/oauth/authorize?response_type=code&client_id=07d212d657ed8f988287
        */
        // const response = await client.post('login', userData);
        const testHeaders = {
            Accept: 'application/vnd.janus.v1+json',
        };
        const client2 = axios.create({
            baseURL: 'https://github.com/login/oauth',
            headers: testHeaders,
        });
        const response = await client2.get('authorize?response_type=code&client_id=07d212d657ed8f988287');
        // const response = await client.get('auth/github/authorize?response_type=code&client_id=07d212d657ed8f988287');
        // const response = await client.get('status');

        // setAccessToken(response.data.access_token);
        // history.push('/');
        // dispatch(getUserStatus());
    } catch (error) {
        dispatch(loginFailure());
        console.log('FETCH_ENDPOINT_ERROR', 'Infernal server error', error);
    }
};
