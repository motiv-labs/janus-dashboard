import client from '../api';
import {
    FETCH_OAUTH_SERVERS_LIST_START,
    FETCH_OAUTH_SERVERS_LIST_SUCCESS,
    SET_OAUTH_SERVERS_SORTING_FILTER,
    SET_OAUTH_SERVERS_ASCEND_FILTER,
    DISCARD_OAUTH_SERVERS_PAGINATION,
    SET_OAUTH_SERVERS_PAGINATION_PAGE,
    REFRESH_OAUTH_SERVERS,
} from '../constants';
import {
    openResponseModal,
} from './index';
import errorHandler from '../../helpers/errorHandler';

export const getOAuthServers = () => ({
    type: FETCH_OAUTH_SERVERS_LIST_START,
});

export const getOAuthServersSuccess = list => ({
    type: FETCH_OAUTH_SERVERS_LIST_SUCCESS,
    payload: list,
});

export const discardOAuthServersListPagination = () => ({
    type: DISCARD_OAUTH_SERVERS_PAGINATION,
});

export const setOAuthServersListCurrentPageIndex = index => ({
    type: SET_OAUTH_SERVERS_PAGINATION_PAGE,
    payload: index,
});

export const setOAuthServersSortingFilter = filter => ({
    type: SET_OAUTH_SERVERS_SORTING_FILTER,
    payload: filter,
});

export const setOAuthServersAscendingFilter = () => ({
    type: SET_OAUTH_SERVERS_ASCEND_FILTER,
});

export const fetchOAuthServers = () => async dispatch => {
    dispatch(getOAuthServers());

    try {
        const response = await client.get('oauth/servers');

        dispatch(getOAuthServersSuccess(response.data));
    } catch (error) {
        errorHandler(dispatch)(error);
    }
};

export const refreshOAuthServers = server => ({
    type: REFRESH_OAUTH_SERVERS,
    payload: server,
});
