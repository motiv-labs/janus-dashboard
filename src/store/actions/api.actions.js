import createHistory from 'history/createBrowserHistory';
import R from 'ramda';

import client from '../api';
import endpointSchema from '../../configurations/apiSchema.config'; // @TODO: REMOVE
import {
    DELETE_ENDPOINT_START,
    DELETE_ENDPOINT_SUCCESS,
    FETCH_ENDPOINT_START,
    FETCH_ENDPOINT_SUCCESS,
    FETCH_ENDPOINT_SCHEMA_START,
    FETCH_ENDPOINT_SCHEMA_SUCCESS,
    FILL_SELECTED_PLUGINS,
    SAVE_ENDPOINT_START,
    SAVE_ENDPOINT_SUCCESS,
    SET_DEFAULT_ENDPOINT,
    EXCLUDE_PLUGIN,
    SELECT_PLUGIN,
    RESET_ENDPOINT,
    WILL_CLONE,
} from '../constants';
import {
    clearConfirmationModal,
    closeConfirmationModal,
    fetchEndpoints,
    openConfirmationModal,
    openResponseModal,
    showToaster,
  // closeResponseModal, // @TODO: will need thi a bit later
} from './index';
import history from '../configuration/history';

export const deleteEndpointRequest = () => ({
    type: DELETE_ENDPOINT_START,
});

export const deleteEndpointSuccess = () => ({
    type: DELETE_ENDPOINT_SUCCESS,
});

export const getEndpointRequest = () => ({
    type: FETCH_ENDPOINT_START,
});

export const getEndpointSuccess = (api, response) => ({
    type: FETCH_ENDPOINT_SUCCESS,
    payload: {
        api,
        response,
    },
});

export const getEndpointSchemaRequest = () => ({
    type: FETCH_ENDPOINT_SCHEMA_START,
});

export const getEndpointSchemaSuccess = api => ({
    type: FETCH_ENDPOINT_SCHEMA_SUCCESS,
    payload: api,
});

export const saveEndpointRequest = api => ({
    type: SAVE_ENDPOINT_START,
    payload: api,
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

export const willClone = data => {
    const preparedPlugins = data.plugins.map(plugin => {
        if (plugin.name === 'rate_limit') {
            const pluginFromSchema = endpointSchema.plugins.filter(item => item.name === plugin.name)[0];
            const { units } = pluginFromSchema.config.limit;
            const policyFromSchema = pluginFromSchema.config.policy;
            const getUpdatedLimit = limit => {
                if (R.type(limit) === 'Object') {
                    return {
                        value: limit.value,
                        unit: limit.unit,
                        units,
                    };
                }

                const arr = limit.split('-');
                const valueOfLimit = arr[0]*1;
                const valueOfUnit = arr[1];

                return {
                    value: valueOfLimit,
                    unit: valueOfUnit,
                    units,
                };
            };

            // set the path for the lens
            const lens = R.lensPath(['config', 'limit']);
            const lens2 = R.lensPath(['config', 'policy']);
            const lens3 = R.lensPath(['config', 'policy', 'selected']);
            // substitude the plugin.config.limit
            const updatedPlugin = R.set(lens, getUpdatedLimit(plugin.config.limit), plugin);
            const pluginWithPolicyFromSchema = R.set(lens2, policyFromSchema , updatedPlugin);
            const getSelectedPolicy = policy => {
                if (R.type(policy) === 'Object') {
                    return policy.selected;
                }
                return policy;
            };

            return R.set(lens3, getSelectedPolicy(plugin.config.policy), pluginWithPolicyFromSchema);
        }
        if (plugin.name === 'request_transformer') {
            const transformHeadersToArray = obj => R.toPairs(obj)
                .reduce((acc, item) => {
                    const header = {
                        key: item[0],
                        value: item[1],
                    };

                    acc.push(header);

                    return acc;
                }, []);

            const configWithTransformedHeaders = R.toPairs(plugin.config)
                .reduce((acc, item) => {
                    const transformedHeaders = transformHeadersToArray(item[1].headers);

                    acc[item[0]] = {
                        headers: transformedHeaders,
                        querystring: item[1].querystring,
                    };

                    return acc;
                }, {});

            // set path for lens and substitude config in plugin:
            const lens = R.lensPath(['config']);
            const updatedPlugin = R.set(lens, configWithTransformedHeaders, plugin);

            return updatedPlugin;
        }

        return plugin;
    });

    const lens = R.lensPath(['plugins']);
    const preparedApi = R.set(lens, preparedPlugins, data);

    return {
        type: WILL_CLONE,
        payload: {
            api: preparedApi,
            response: data,
        },
    };
};

export const fillSelected = selectedPlugins => ({
    type: FILL_SELECTED_PLUGINS,
    payload: selectedPlugins,
});

export const fetchEndpoint = pathname => async dispatch => {
    dispatch(getEndpointRequest());

    try {
        const response = await client.get(`apis${pathname}`);
        const preparedPlugins = response.data.plugins.map(plugin => {
            if (plugin.name === 'rate_limit') {
                const pluginFromSchema = endpointSchema.plugins.filter(item => item.name === plugin.name)[0];
                const { units } = pluginFromSchema.config.limit;
                const policyFromSchema = pluginFromSchema.config.policy;
                const arr = plugin.config.limit.split('-');
                const valueOfLimit = arr[0]*1;
                const valueOfUnit = arr[1];
                // @TODO: policy should be also an array like in schema;

                const updatedLimit = {
                    value: valueOfLimit,
                    unit: valueOfUnit,
                    units,
                };

                // set the path for the lens
                const lens = R.lensPath(['config', 'limit']);
                const lens2 = R.lensPath(['config', 'policy']);
                const lens3 = R.lensPath(['config', 'policy', 'selected']);
                // substitude the plugin.config.limit
                const updatedPlugin = R.set(lens, updatedLimit, plugin);
                const pluginWithPolicyFromSchema = R.set(lens2, policyFromSchema , updatedPlugin);

                return R.set(lens3, plugin.config.policy, pluginWithPolicyFromSchema);
            }
            if (plugin.name === 'request_transformer') {
                const transformHeadersToArray = obj => R.toPairs(obj)
                    .reduce((acc, item) => {
                        const header = {
                            key: item[0],
                            value: item[1],
                        };

                        acc.push(header);

                        return acc;
                    }, []);

                const configWithTransformedHeaders = R.toPairs(plugin.config)
                    .reduce((acc, item) => {
                        const transformedHeaders = transformHeadersToArray(item[1].headers);

                        acc[item[0]] = {
                            headers: transformedHeaders,
                            querystring: item[1].querystring,
                        };

                        return acc;
                    }, {});

                // set path for lens and substitude config in plugin:
                const lens = R.lensPath(['config']);
                const updatedPlugin = R.set(lens, configWithTransformedHeaders, plugin);

                return updatedPlugin;
            }

            return plugin;
        });

        const lens = R.lensPath(['plugins']);
        const preparedApi = R.set(lens, preparedPlugins, response.data);

        dispatch(getEndpointSuccess(preparedApi, response.data));
    } catch (error) {
        console.log('FETCH_ENDPOINT_ERROR', 'Infernal server error', error);
    }
};

export const setInitialEndpoint = endpointSchema => ({
    type: SET_DEFAULT_ENDPOINT,
    payload: endpointSchema,
});

export const fetchEndpointSchema = flag => async (dispatch) => {
    dispatch(getEndpointSchemaRequest());

    try {
        // Get all server names
        const response = await client.get('/oauth/servers');
        const serverNames = response.data.reduce((acc, item) => {
            acc.push(item.name);

            return acc;
        }, []);
        const lensOAuth = R.lensPath(['config', 'server_names']);
        const updatePlugin = (lens, serverNames, list) => pluginName => {
            const comparator = string => el => el.name === string;
            const getPluginIndex = comparator => list => list.findIndex(comparator);

            return R.adjust(
                R.set(lens, serverNames),
                getPluginIndex(comparator(pluginName))(list),
                list,
            );
        };
        const pluginsFromApiSchemaWithUpdatedOAuthPlugin = updatePlugin(
            lensOAuth,
            serverNames,
            endpointSchema.plugins,
        )('oauth2');
        const lens = R.lensPath(['plugins']);
        const endpointSchemaWithUpdatedOAuthPlugin = R.set(
            lens,
            pluginsFromApiSchemaWithUpdatedOAuthPlugin,
            endpointSchema
        );

        flag && dispatch(setInitialEndpoint(endpointSchemaWithUpdatedOAuthPlugin));
        dispatch(getEndpointSchemaSuccess(endpointSchemaWithUpdatedOAuthPlugin)); // @TODO: REMOVE when endpoint will be ready
    } catch (error) {
        console.log('FETCH_SERVER_NAMES_ERROR', error);
    }
};

export const preparePlugins = api => api.plugins.map(plugin => {
    switch (plugin.name) {
        case 'rate_limit': {
            const { limit, policy } = plugin.config;
            const { value, unit } = limit;
            const concatenation = `${value}-${unit}`;
            // set the path for the lens
            const lens = R.lensPath(['config', 'limit']);
            const lens2 = R.lensPath(['config', 'policy']);
            // substitude the plugin.config.limit
            const updatedPlugin = R.set(lens, concatenation, plugin);

            return R.set(lens2, policy.selected, updatedPlugin);
        }
        case 'oauth2': {
            return R.dissocPath(['config', 'server_names'], plugin);
        }
        case 'request_transformer': {
            // get all options names
            const options = Object.keys(plugin.config);
            // convert all values of plugin's config to array of objects
            // so then we will be able to map through them:
            const config = R.values(plugin.config);
            const allTransformedHeaders = config.map((item, index) => {
                // headers comes as an array of objects:
                /**
                 * @example #1
                 *
                 * add: {
                 *     header: [
                 *         {someKey: 'someValue'},
                 *         {someAnotherKey: 'someAnotherValue'},
                 *     ]
                 * }
                 */
                const headers = item.headers;

                // we will fill this arrays with keys and values respectively
                let keys = [];
                let values = [];

                // fill key/values arrays
                headers.map(item => {
                    const arr = R.values(item);

                    keys.push(arr[0]);
                    values.push(arr[1]);
                });

                // and now we are creating object that should be placed instead of
                // array of the objects from example #1
                /**
                 * @example #2
                 *
                 * add: {
                 *     headers: {
                 *         someKey: 'someValue',
                 *         someAnotherKey: 'someAnotherValue',
                 *     }
                 * }
                 */
                const transformedHeaders = R.zipObj(keys, values);

                return transformedHeaders;
            });

            // step by step we updating plugins config:
            const updatedPlugin = allTransformedHeaders.reduce((acc, item, index) => {
                const lens = R.lensPath(['config', options[index], 'headers']);

                return R.set(lens, item, acc);
            }, plugin);

            return updatedPlugin;
        }
        default:
            return plugin;
    }
});

export const saveEndpoint = (pathname, api) => dispatch => {
    dispatch(openConfirmationModal(
        'save',
        () => confirmedSaveEndpoint(dispatch, pathname, api),
        api.name,
    ));
};

export const updateEndpoint = (pathname, api) => dispatch => {
    dispatch(openConfirmationModal('update', () => confirmedUpdateEndpoint(dispatch, pathname, api), api.name));
};

export const deleteEndpoint = apiName => dispatch => {
    dispatch(openConfirmationModal('delete', () => confirmedDeleteEndpoint(dispatch, apiName), apiName));
};

export const confirmedSaveEndpoint = (dispatch, pathname, api) => {
    dispatch(saveEndpointRequest(api));

    const preparedPlugins = preparePlugins(api);
    const apiWithoutDefaultUpstreams = R.dissocPath(['proxy', 'upstreams', 'options'], api);
    // substitude updated list of plugins
    const preparedApi = R.set(R.lensPath(['plugins']), preparedPlugins, apiWithoutDefaultUpstreams);

    try {
        const response = client.post('apis', preparedApi);

        dispatch(saveEndpointSuccess());
        dispatch(closeConfirmationModal());

        if (response) {
            dispatch(fetchEndpoints());
            history.push('/');
            dispatch(showToaster());

            return;
        }

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
    }
};

export const confirmedUpdateEndpoint = (dispatch, pathname, api) => {
    dispatch(saveEndpointRequest());

    const preparedPlugins = preparePlugins(api);
    // substitude updated list of plugins
    const preparedApi = R.set(R.lensPath(['plugins']), preparedPlugins, api);

    return client.put(`apis${pathname}`, preparedApi)
        .then((response) => {
            dispatch(saveEndpointSuccess());
            dispatch(closeConfirmationModal());
            dispatch(showToaster());
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

export const confirmedDeleteEndpoint = async (dispatch, apiName) => {
    dispatch(deleteEndpointRequest());

    try {
        const response = await client.delete(`apis/${apiName}`);

        dispatch(deleteEndpointSuccess());
        dispatch(closeConfirmationModal());
        dispatch(fetchEndpoints());
        history.push('/');
        dispatch(showToaster());
    } catch (error) {
        dispatch(openResponseModal({
            status: error.response.status,
            statusText: error.response.statusText,
            message: error.response.data.error,
        }));
    }
};
