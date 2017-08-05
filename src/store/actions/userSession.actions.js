import history from '../configuration/history';
import client, { setAccessToken } from '../api';
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

export const loginUser = userData => dispatch => {
    dispatch(loginRequest());

    return client.post('login', userData)
        .then((response) => {
            dispatch(loginSuccess());
            setAccessToken(response.data.token);
            history.push('/');
        })
        .catch((error) => {
            // eslint-disable-next-line
            console.log('FETCH_ENDPOINT_ERROR', 'Infernal server error', error);
        });
};
