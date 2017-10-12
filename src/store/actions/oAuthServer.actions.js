import createHistory from 'history/createBrowserHistory';
import R from 'ramda';

import client from '../api';
import {
    FETCH_OAUTH_SERVER_START,
    FETCH_OAUTH_SERVER_SUCCESS,
} from '../constants';
import history from '../configuration/history';

const getOAuthServerRequest = () => ({
    type: FETCH_OAUTH_SERVER_START,
});

const getOAuthServerSuccess = data => ({
    type: FETCH_OAUTH_SERVER_SUCCESS,
    payload: data,
});

export const fetchOAuthServer = path => async dispatch => {
    dispatch(getOAuthServerRequest());

    try {
        const response = await client.get(`${path}`);
        console.error('response', response.data);

        dispatch(getOAuthServerSuccess(response.data));
    } catch (error) {
        console.log('FETCH_OAUTH_SERVER_ERROR', 'Infernal server error', error);
    }
};
