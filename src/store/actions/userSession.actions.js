import history from '../configuration/history';
import client, { getAccessToken, setAccessToken } from '../api';
import {
    CHECK_LOGGED_STATUS,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../constants';
import axios from 'axios';

export const GET_TOKEN = (code, state) => async dispatch => {
    console.clear();
    console.error(code, state);
    try {
        const testHeaders = {
            Accept: 'application/vnd.janus.v1+json',
        };
        const b = {
            client_id: 'fab6013f6101e65a811c',
            client_secret: '06d760766b6c4d259cf0fee80cba7116f6f2a3da',
            redirect_uri: 'http://localhost:8082',
            code,
            state,
        };
        const ha = await axios({
            method: 'post',
            url: 'https://github.com/login/oauth/access_token',
            withCredentials: true,
            credentials: 'same-origin',
            mode: 'no-cors',
        }, b);
        const client2 = axios.create({
            url: 'https://github.com/login/oauth',
            // headers: testHeaders,
            data: {
                code,
                state,
            }
        });
        const response = await ha;
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

export const getUserStatus = () => dispatch => {
    dispatch(checkLoggedStatus());

    if (getAccessToken()) {
        dispatch(loginSuccess());
    } else {
        // history.push('/login');
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

        // setAccessToken(response.data.token);
        // history.push('/');
        // dispatch(getUserStatus());
    } catch (error) {
        dispatch(loginFailure());
        console.log('FETCH_ENDPOINT_ERROR', 'Infernal server error', error);
    }
};
