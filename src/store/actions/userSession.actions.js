import history from '../configuration/history';
import client, { getAccessToken, setAccessToken } from '../api';
import {
    CHECK_LOGGED_STATUS,
    LOGIN_START,
    LOGIN_SUCCESS,
} from '../constants';

export const checkLoggedStatus = () => ({
    type: CHECK_LOGGED_STATUS,
});

export const loginRequest = () => ({
    type: LOGIN_START,
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
});

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
        const response = await client.post('login', userData);

        setAccessToken(response.data.token);
        history.push('/');
        dispatch(getUserStatus());
    } catch (error) {
        console.log('FETCH_ENDPOINT_ERROR', 'Infernal server error', error);
    }
};
