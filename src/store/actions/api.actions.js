import createHistory from 'history/createBrowserHistory';
import R from 'ramda';

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
    EXCLUDE_PLUGIN,
    SELECT_PLUGIN,
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

export const saveEndpointSuccess = () => ({
    type: SAVE_ENDPOINT_SUCCESS,
});

export const selectPlugin = pluginName/*: string*/ => ({
    type: SELECT_PLUGIN,
    payload: pluginName,
});

export const excludePlugin = pluginName/*: string*/ => ({
    type: EXCLUDE_PLUGIN,
    payload: pluginName,
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
        dispatch(saveEndpointSuccess());
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

    const preparedPlugins = api.plugins.map(plugin => {
        if (plugin.name === 'rate_limit') {
            const { value, units } = plugin.config.limit;
            const concatenation = `${value}-${units}`;
            // set the path for the lens
            const lens = R.lensPath(['config', 'limit']);
            // substitude the plugin.config.limit
            const updatedPlugin = R.set(lens, concatenation, plugin);

            return updatedPlugin;
        }
        if (plugin.name === 'request_transformer') {
            console.error('request_transformer');
            // const config = plugin.config.add.headers;
            // console.log('objectOfObjects', config);
            // const allProps/*: Array<Object> */ = R.values(objectOfObjects);

            // console.error('=========>>>>>>>', R.values(plugin.config))
            const headings = Object.keys(plugin.config);
            const _config = plugin.config;
            // console.error('=========>>>>>>>', headings)
            const config = R.values(plugin.config);

            /*
            config.map((item, index) => {
                console.error('/_/_/_/', item.headers)
                const config = item.headers;

                let keys = [];
                let values = [];

                config.map(item => {
                    const arr = R.values(item);

                    keys.push(arr[0]);
                    values.push(arr[1]);
                });

                const transformedHeaders = R.zipObj(keys, values);
                console.error('===>::: ', transformedHeaders)
                const lens = R.lensPath(['config', headings[index], 'headers']);
                R.set(lens, transformedHeaders, plugin);
                // const updatedPlugin = R.set(lens, transformedHeaders, plugin);
                // console.error('UPDATED PLUFINN', updatedPlugin)

                // return updatedPlugin;
            });
            */
            const arrayOfTransformedHeaders = config.map((item, index) => {
                console.error('/_/_/_/', item.headers);
                const config = item.headers;

                let keys = [];
                let values = [];

                config.map(item => {
                    const arr = R.values(item);

                    keys.push(arr[0]);
                    values.push(arr[1]);
                });

                const transformedHeaders = R.zipObj(keys, values);
                console.error('===>::: ', transformedHeaders);

                return transformedHeaders;

                // const updatedPlugin = R.set(lens, transformedHeaders, plugin);
                // console.error('UPDATED PLUFINN', updatedPlugin)

                // return updatedPlugin;
            });

            // const arrayOfTransformedHeaders = _arrayOfTransformedHeaders.filter(item => !R.isEmpty(item));
            const _arrayOfTransformedHeaders = arrayOfTransformedHeaders.reduce((acc, item, index) => {
                // if (!R.isEmpty(item)) {
                //     //
                // }
                console.warn(index, item, acc);
                const lens = R.lensPath(['config', headings[index], 'headers']);
                return R.set(lens, item, acc);
            }, plugin);

            console.error('TRANSFORMED ARRAY', _arrayOfTransformedHeaders);

            return _arrayOfTransformedHeaders;

            /*
            const JOHNNY = Object.keys(_config).reduce((acc, item) => {
                console.error('ITEM', item)
                const headers = plugin.config[item].headers;
                let keys = [];
                let values = [];
                // acc[item] = _config[item]

                headers.map(item => {
                    const arr = R.values(item);

                    keys.push(arr[0]);
                    values.push(arr[1]);
                });

                const transformedHeaders = R.zipObj(keys, values);
                console.error('===>::: ', transformedHeaders)
                const lens = R.lensPath(['config', item, 'headers']);
                R.set(lens, transformedHeaders, plugin);

                return acc;
            }, {});
            console.error('JOHNYY ==> ', JOHNNY)
            */



            // extract keys and values and fill respectively arrays
            // so in future we will be able to create brand new object
            // with key-value pairs from those two arrays.
            // const transformer = (obj) => {
            //     const vals = R.values(obj);
            //     console.log('save endpoint', obj)

            //     keys.push(vals[0]);
            //     values.push(vals[1]);
            // };


        }

        return plugin;
    });
    // substitude updated list of plugins
    const preparedApi = R.set(R.lensPath(['plugins']), preparedPlugins, api);

    return client.post('apis', preparedApi)
    .then((response) => {
        // dispatch(saveEndpointSuccess(JSON.parse(response.config.data)));
        dispatch(saveEndpointSuccess());
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
