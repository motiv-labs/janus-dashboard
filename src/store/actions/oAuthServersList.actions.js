import client from '../api';
import {
    FETCH_OAUTH_SERVERS_LIST_START,
    FETCH_OAUTH_SERVERS_LIST_SUCCESS,
    SET_OAUTH_SERVERS_SORTING_FILTER,
    SET_OAUTH_SERVERS_ASCEND_FILTER,
} from '../constants';

const getOAuthServers = () => ({
    type: FETCH_OAUTH_SERVERS_LIST_START,
});

const getOAuthServersSuccess = list => ({
    type: FETCH_OAUTH_SERVERS_LIST_SUCCESS,
    payload: list,
});

export const setSortingFilter = filter => ({
    type: SET_OAUTH_SERVERS_SORTING_FILTER,
    payload: filter,
});

export const setAscendingFilter = () => ({
    type: SET_OAUTH_SERVERS_ASCEND_FILTER,
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
