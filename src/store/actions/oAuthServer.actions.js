import createHistory from 'history/createBrowserHistory';
import R from 'ramda';

import client from '../api';
import {
    FETCH_OAUTH_SERVER_START,
    FETCH_OAUTH_SERVER_SUCCESS,
    FETCH_OAUTH_SERVER_SCHEMA_START,
    FETCH_OAUTH_SERVER_SCHEMA_SUCCESS,
    SAVE_OAUTH_SERVER_START,
    SAVE_OAUTH_SERVER_SUCCESS,
    DELETE_OAUTH_SERVER_START,
    DELETE_OAUTH_SERVER_SUCCESS,
} from '../constants';
import {
    clearConfirmationModal,
    closeConfirmationModal,
    fetchOAuthServers,
    openConfirmationModal,
    openResponseModal,
    showToaster,
} from './index';
import history from '../configuration/history';
import oAuthServerSchema from '../../configurations/oAuthServerSchema';

const getOAuthServerRequest = () => ({
    type: FETCH_OAUTH_SERVER_START,
});

const getOAuthServerSuccess = data => ({
    type: FETCH_OAUTH_SERVER_SUCCESS,
    payload: data,
});

export const getOAuthSchemaRequest = () => ({
    type: FETCH_OAUTH_SERVER_SCHEMA_START,
});

export const getOAuthSchemaSuccess = api => ({
    type: FETCH_OAUTH_SERVER_SCHEMA_SUCCESS,
    payload: api,
});

export const saveOAuthServerRequest = api => ({
    type: SAVE_OAUTH_SERVER_START,
    payload: api,
});

export const saveOAuthServerSuccess = () => ({
    type: SAVE_OAUTH_SERVER_SUCCESS,
});

export const deleteOAuthServerRequest = () => ({
    type: DELETE_OAUTH_SERVER_START,
});

export const deleteOAuthServerSuccess = () => ({
    type: DELETE_OAUTH_SERVER_SUCCESS,
});

export const fetchOAuthServer = path => async dispatch => {
    dispatch(getOAuthServerRequest());

    try {
        const response = await client.get(`${path}`);

        dispatch(getOAuthServerSuccess(response.data));
    } catch (error) {
        console.log('FETCH_OAUTH_SERVER_ERROR', 'Infernal server error', error);
    }
};

export const fetchOAuthServerSchema = () => async dispatch => {
    dispatch(getOAuthSchemaRequest);

    try {
        dispatch(getOAuthSchemaSuccess(oAuthServerSchema));
    } catch (error) {
        console.log('FETCH_OAUTH_SERVER_SCHEMA_ERROR', 'Infernal server error', error);
    }
};

export const confirmedSaveOAuthServer = async (dispatch, pathname, server) => {
    dispatch(saveOAuthServerRequest(server));

    // const preparedPlugins = preparePlugins(api);
    // substitude updated list of plugins
    // const preparedApi = R.set(R.lensPath(['plugins']), preparedPlugins, api);

    try {
        const response = await client.post('oauth/servers', server);

        dispatch(saveOAuthServerSuccess());
        dispatch(closeConfirmationModal());
        dispatch(fetchOAuthServers());
        history.push('/oauth/servers');
        dispatch(showToaster());
    } catch (error) {
        if (error.response) {
            dispatch(openResponseModal({
                status: error.response.status,
                statusText: error.response.statusText,
                message: error.response.data,
            }));

            // eslint-disable-next-line
            console.error(error.response.data);
        } else if (error.request) {
            // eslint-disable-next-line
            console.log(error.request);
        } else {
            // eslint-disable-next-line
            console.log('Error', error.message);
        }
    }
};

export const saveOAuthServer = (pathname, server) => dispatch => {
    dispatch(openConfirmationModal(
        'save',
        () => confirmedSaveOAuthServer(dispatch, pathname, server),
        server.name,
    ));
};

export const confirmedDeleteOAuthServer = async (dispatch, serverName) => {
    dispatch(deleteOAuthServerRequest());

    try {
        const response = await client.delete(`oauth/servers/${serverName}`);

        dispatch(deleteOAuthServerSuccess());
        dispatch(closeConfirmationModal());
        dispatch(fetchOAuthServers());
        history.push('/oauth/servers');
        dispatch(showToaster());
    } catch (error) {
        dispatch(openResponseModal({
            status: error.response.status,
            statusText: error.response.statusText,
            message: error.response.data.error,
        }));
    }
};

export const deleteOAuthServer = serverName => dispatch => {
    dispatch(openConfirmationModal('delete', () => confirmedDeleteOAuthServer(dispatch, serverName), serverName));
};
