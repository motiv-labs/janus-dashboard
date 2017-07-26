import createHistory from 'history/createBrowserHistory';
import client from '../api';
import endpointSchema from '../../configurations/apiSchema'; // @TODO: REMOVE
import {
  DELETE_ENDPOINT_START,
  DELETE_ENDPOINT_SUCCESS,
  FETCH_ENDPOINT_START,
  FETCH_ENDPOINT_SUCCESS,
  FETCH_ENDPOINT_SCHEMA_START,
  FETCH_ENDPOINT_SCHEMA_SUCCESS,
  SAVE_ENDPOINT_START,
  SAVE_ENDPOINT_SUCCESS,
  RESET_ENDPOINT,
  WILL_CLONE,
} from '../constants';
import {
  openResponseModal,
  // closeResponseModal, // @TODO: will need thi a bit later
} from './index';

const history = createHistory({
    forceRefresh: true,
});

export const deleteEndpointRequest = () => ({
    type: DELETE_ENDPOINT_START,
});

export const deleteEndpointSuccess = () => ({
    type: DELETE_ENDPOINT_SUCCESS,
});

export const getEndpointRequest = () => ({
    type: FETCH_ENDPOINT_START,
});

export const getEndpointSuccess = api => ({
    type: FETCH_ENDPOINT_SUCCESS,
    payload: api,
});

export const getEndpointSchemaRequest = () => ({
    type: FETCH_ENDPOINT_SCHEMA_START,
});

export const getEndpointSchemaSuccess = api => ({
    type: FETCH_ENDPOINT_SCHEMA_SUCCESS,
    payload: api,
});

export const saveEndpointRequest = () => ({
    type: SAVE_ENDPOINT_START,
});

export const saveEndpointSuccess = api => ({
    type: SAVE_ENDPOINT_SUCCESS,
    payload: api,
});

export const resetEndpoint = () => ({
    type: RESET_ENDPOINT,
});

export const willClone = data => ({
    type: WILL_CLONE,
    payload: data,
});

export const deleteEndpoint = (apiName, callback) => async (dispatch) => {
    dispatch(deleteEndpointRequest());

    try {
        const response = await client.delete(`apis/${apiName}`);

        dispatch(deleteEndpointSuccess());
        dispatch(openResponseModal({ // @FIXME: move to reducers
            status: response.status,
            message: 'Successfuly deleted',
            statusText: response.statusText,
        }));
        dispatch(callback(apiName));
    } catch (error) {
        // console.log('ERROR => ', error);
        dispatch(openResponseModal({
            status: error.response.status,
            statusText: error.response.statusText,
            message: error.response.data.error,
        }));
        // console.log('DELETE_ENDPOINT_ERROR', 'Infernal server error', error.response);
    }
};

export const fetchEndpoint = pathname => (dispatch) => {
    dispatch(getEndpointRequest());

    return client.get(`apis${pathname}`)
        .then((response) => {
            dispatch(getEndpointSuccess(response.data));
        })
        .catch((error) => {
            // eslint-disable-next-line
            console.log('FETCH_ENDPOINT_ERROR', 'Infernal server error', error);
        });
};

export const fetchEndpointSchema = () => (dispatch) => {
    dispatch(getEndpointSchemaRequest());

  // return client.get(`apis${pathname}`) // @TODO: RESTORE when endpoint will be ready
  //   .then((response) => {
  //     dispatch(getApiSchemaSuccess(response.data));
  //   })
  //   .catch((e) => {
  //     console.log('FETCH_API_SCHEMA_ERROR', 'Infernal server error', e);
  //   });

    dispatch(getEndpointSchemaSuccess(endpointSchema)); // @TODO: REMOVE when endpoint will be ready
};

export const updateEndpoint = (pathname, api) => (dispatch) => {
    dispatch(saveEndpointRequest());

    return client.put(`apis${pathname}`, api)
    .then((response) => {
        dispatch(saveEndpointSuccess(JSON.parse(response.config.data)));
        dispatch(openResponseModal({ // @FIXME: move to reducers
            status: response.status,
            message: 'Successfuly saved',
            statusText: response.statusText,
        }));
    })
    .catch((error) => {
        if (error.response) {
            dispatch(openResponseModal({
                status: error.response.status,
                statusText: error.response.statusText,
                message: error.response.data,
            }));
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // More info about error handling in Axios: https://github.com/mzabriskie/axios#handling-errors
            // eslint-disable-next-line
            console.error(error.response.data);
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
            // eslint-disable-next-line
            console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
            // eslint-disable-next-line
            console.log('Error', error.message);
        }
    });
};

export const saveEndpoint = (pathname, api) => (dispatch) => {
    dispatch(saveEndpointRequest());

    return client.post('apis', api)
    .then((response) => {
        dispatch(saveEndpointSuccess(JSON.parse(response.config.data)));
        dispatch(openResponseModal({
            status: response.status,
            message: 'Successfuly saved',
            statusText: response.statusText,
            redirectOnClose: () => (history.push('/')),
        }));
    })
    .catch((error) => {
        if (error.response) {
            dispatch(openResponseModal({
                status: error.response.status,
                statusText: error.response.statusText,
                message: error.response.data,
            }));

        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // More info about error handling in Axios: https://github.com/mzabriskie/axios#handling-errors
            // eslint-disable-next-line
            console.error(error.response.data);
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
            // eslint-disable-next-line
            console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
            // eslint-disable-next-line
            console.log('Error', error.message);
        }
    });
};
