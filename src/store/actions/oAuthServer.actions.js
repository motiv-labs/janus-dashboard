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
        const oAuthServer = response.data;
        const rateLimit = oAuthServer.rate_limit.limit.split('-');
        const rateLimitValues = {
            value: rateLimit[0]*1,
            unit: rateLimit[1],
        };
        const lens = R.lensPath(['rate_limit', 'limit']);
        const updatedOAuthServer = R.set(lens, rateLimitValues, oAuthServer);

        dispatch(getOAuthServerSuccess(updatedOAuthServer));
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

export const confirmedSaveOAuthServer = async (dispatch, pathname, server, isEditing) => {
    dispatch(saveOAuthServerRequest(server));

    const composeRateLimit = server => {
        const { value, unit } = server.rate_limit.limit;
        const concatenation = `${value}-${unit}`;
        const lens = R.lensPath(['rate_limit', 'limit']);

        return R.set(lens, concatenation, server);
    };

    try {
        const response = await client.post('oauth/servers', composeRateLimit(server));

        dispatch(saveOAuthServerSuccess());
        dispatch(closeConfirmationModal());

        if (response) {
            !isEditing && history.push('/oauth/servers');
            dispatch(showToaster());

            return;
        }

        // TODO: need to put here real error message, once it will implemented on backend
        dispatch(openResponseModal({
            message: 'Unable to save :( Something went wrong...',
        }));
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

export const saveOAuthServer = (pathname, server, isEditing) => dispatch => {
    dispatch(openConfirmationModal(
        'save',
        () => confirmedSaveOAuthServer(dispatch, pathname, server, isEditing),
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
