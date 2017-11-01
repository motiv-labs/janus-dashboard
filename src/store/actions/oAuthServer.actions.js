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
    closeConfirmationModal,
    fetchOAuthServers,
    openConfirmationModal,
    showToaster,
} from './index';
import history from '../configuration/history';
import oAuthServerSchema from '../../configurations/oAuthServerSchema';
import errorHandler from '../../helpers/errorHandler';

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
        errorHandler(dispatch)(error);
    }
};

export const fetchOAuthServerSchema = () => async dispatch => {
    dispatch(getOAuthSchemaRequest);

    try {
        dispatch(getOAuthSchemaSuccess(oAuthServerSchema));
    } catch (error) {
        errorHandler(dispatch)(error);
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

        !isEditing && history.push('/oauth/servers');
        dispatch(showToaster());
    } catch (error) {
        errorHandler(dispatch)(error);
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
        errorHandler(dispatch)(error);
    }
};

export const deleteOAuthServer = serverName => dispatch => {
    dispatch(openConfirmationModal('delete', () => confirmedDeleteOAuthServer(dispatch, serverName), serverName));
};
