import client from '../api';
import {
    FETCH_OAUTH_SERVERS_START,
    FETCH_OAUTH_SERVERS_SUCCESS,
} from '../constants';

const getOAuthServers = () => ({
    type: FETCH_OAUTH_SERVERS_START,
});

const getOAuthServersSuccess = list => ({
    type: FETCH_OAUTH_SERVERS_SUCCESS,
    payload: list,
});

export const fetchOAuthServers = () => async dispatch => {
    dispatch(getOAuthServers());

    try {
        const response = await client.get('oauth/servers');

        dispatch(getOAuthServersSuccess(response.data));
    } catch (error) {
        console.log('ERRROR', error);
    }
};
