import R from 'ramda';

import client from '../api';
import {
    FETCH_OAUTH_SERVER_START,
    FETCH_OAUTH_SERVER_SUCCESS,
    FETCH_OAUTH_SERVER_SCHEMA_START,
    FETCH_OAUTH_SERVER_SCHEMA_SUCCESS,
    SAVE_OAUTH_SERVER_START,
    SAVE_OAUTH_SERVER_SUCCESS,
    UPDATE_OAUTH_SERVER_START,
    UPDATE_OAUTH_SERVER_SUCCESS,
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

export const updateOAuthServerRequest = api => ({
    type: UPDATE_OAUTH_SERVER_START,
    payload: api,
});

export const updateOAuthServerSuccess = () => ({
    type: UPDATE_OAUTH_SERVER_SUCCESS,
});

export const deleteOAuthServerRequest = () => ({
    type: DELETE_OAUTH_SERVER_START,
});

export const deleteOAuthServerSuccess = () => ({
    type: DELETE_OAUTH_SERVER_SUCCESS,
});

export const redirectToServersLits = () => history.push('/oauth/servers');

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

export const confirmedSaveOAuthServer = async (dispatch, server, isEditing) => {
    dispatch(saveOAuthServerRequest(server));

    const composeRateLimit = server => {
        const { value, unit } = server.rate_limit.limit;
        const concatenation = `${value}-${unit}`;
        const lens = R.lensPath(['rate_limit', 'limit']);

        return R.set(lens, concatenation, server);
    };

    try {
        await client.post('oauth/servers', composeRateLimit(server));

        dispatch(saveOAuthServerSuccess());
        dispatch(closeConfirmationModal());

        !isEditing && redirectToServersLits();
        dispatch(showToaster());
    } catch (error) {
        dispatch(closeConfirmationModal());
        errorHandler(dispatch)(error);
    }
};

export const saveOAuthServer = (pathname, server, isEditing) => dispatch =>
    dispatch(openConfirmationModal(
        'saveOAuthServer',
        server,
        server.name,
    ));

export const confirmedUpdateOAuthServer = async (dispatch, server) => {
    dispatch(updateOAuthServerRequest(server));

    const composeRateLimit = server => {
        const { value, unit } = server.rate_limit.limit;
        const concatenation = `${value}-${unit}`;
        const lens = R.lensPath(['rate_limit', 'limit']);

        return R.set(lens, concatenation, server);
    };

    try {
        await client.put(`oauth/servers/${server.name}`, composeRateLimit(server));

        dispatch(updateOAuthServerSuccess());
        dispatch(closeConfirmationModal());
        redirectToServersLits();
        dispatch(showToaster());
    } catch (error) {
        dispatch(closeConfirmationModal());
        errorHandler(dispatch)(error);
    }
};

export const updateOAuthServer = (pathname, server) => dispatch =>
    dispatch(openConfirmationModal(
        'updateOAuthServer',
        server,
        server.name,
    ));

export const confirmedDeleteOAuthServer = async (dispatch, serverName, isRedirect) => {
    dispatch(deleteOAuthServerRequest());

    try {
        await client.delete(`oauth/servers/${serverName}`);

        dispatch(deleteOAuthServerSuccess());
        dispatch(closeConfirmationModal());
        dispatch(fetchOAuthServers());
        isRedirect && redirectToServersLits();
        dispatch(showToaster());
    } catch (error) {
        errorHandler(dispatch)(error);
    }
};

export const deleteOAuthServer = (server, isRedirect/*: Boolean*/) => dispatch =>
    dispatch(openConfirmationModal(
        'deleteOAuthServer',
        {},
        server.name,
        isRedirect
    ));
